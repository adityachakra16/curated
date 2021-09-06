Moralis.Cloud.define("addCuration", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    var curation = new Moralis.Object("Curation");    
    curation.set("valid", request.params.valid)
    curation.set("grantId", request.params.grantId)
    curation.set("user", request.params.email)
    curation.set("verifiable", false)

    var userQuery = new Moralis.Query("UserStats");    
    userQuery.equalTo("email", request.params.email)
    var user = await userQuery.first()
    logger.info("user", JSON.stringify(user))
    if (user == null){
        user = new Moralis.Object("UserStats")
        user.set("email", request.params.email)
        user.set("numCurations", 1)
    }
    else{
        user.increment("numCurations")
        if (user.numCurations === 1){
            user.set("badgeName", "Newbie")
        }
        else if (user.numCurations === 10){
            user.set("badgeName", "Amateur")
        }
        else if (user.numCurations === 50){
            user.set("badgeName", "Pro")
        }
    }

    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("grantId", request.params.grantId)
    grantQuery.equalTo("curationsCompleted", false)
    var grant = await grantQuery.first()

    if (request.params.valid == 'Yes'){
        grant.increment("numYes")
        var confidence = grant.numYes / (grant.numYes + grant.numNo + grant.numUnsure)
    }
    else if (request.params.valid == 'No'){
        grant.increment("numNo")
        var confidence = grant.numNo / (grant.numYes + grant.numNo + grant.numUnsure)
    }
    else if (request.params.valid == 'Unsure'){
        grant.increment("numUnsure")
        var confidence = grant.numUnsure / (grant.numYes + grant.numNo + grant.numUnsure)
    }

    if (grant.numYes + grant.numNo + grant.numUnsure >= grant.minCurations && confidence > 0.8){
        grant.set("curationsCompleted", true)
    }

    saveArray = [curation, user, grant]
    try {
        Moralis.Object.saveAll(saveArray, { useMasterKey: true });
        logger.info(`Added curation`);
        return 'Added curation'
    }
    catch (err) {
        logger.error(err);
    }
},{
    fields : {
        valid : {
            required: true,
            type: String,
            error: "Valid must be provided and be yes, no or unsure"
        },
        grantId : {
            required: true,
            type: String,
            error: "Grant Id must be provided"
        },
        email : {
            required: true,
            type: String,
            error: "Email must be provided"
        }
    }
});


Moralis.Cloud.define("getPendingGrantProposals", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("curationsCompleted", false)

    try {
        var grants = await grantQuery.find()
        if (request.params.test === true){
            return grants
        }
    }
    catch (err) {
        logger.error(err);
    }
    logger.info(`grants: ${grants}`)

    var curationQuery = new Moralis.Query("Curation")
    curationQuery.equalTo("user", request.params.email)
    curationQuery.select("grantId")

    try {
        var curations = await curationQuery.find()
        logger.info(`curations: ${JSON.stringify(curations)}` )
        var curationSet = new Set()

        for (var curation of curations){
            curationSet.add(curation.grantId)
        }
    }
    catch (err) {
        logger.error(err);
    }
    logger.info(`curationSet: ${JSON.stringify(curationSet)}`)

    var pendingGrants = []
    for (var grant of grants){
        if (!curationSet.has(grant.grantId)){
            pendingGrants.push(grant)
        }
    }
    logger.info(`pendingGrants: ${JSON.stringify(pendingGrants)}`)

    return pendingGrants
},{
    fields : {
        email : {
            required: true,
            type: String,
            error: "Email must be provided"
        }
    }
});


Moralis.Cloud.define("getAllCurationResults", async (request) => {
    var response = {'Grants':{}}

    var grantQuery = new Moralis.Query("Grant"); 

    try {
        var grants = await grantQuery.find()
    }
    catch (err) {
        logger.error(err);
        return err;
    }

    for (var grant of grants){
        if (grant.curationsCompleted === true){
            response.Grants[grant.grantId] = (grant.numYes / (grant.numYes + grant.numNo + grant.numUnsure)) > 0.90 ? 'pass' : 'fail'
        }
        else {
            response.Grants[grant.grantId] = 'pending'
        }

    }

    return response
})


Moralis.Cloud.define("getGrantByGrantId", async (request) => {
    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("grantId", request.params.grantId)
    try {
        var grant = await grantQuery.first()
        return grant
    }
    catch (err) {
        logger.error(err);
        response.errorMessage = err;
        return response
    }
},{
    fields : {
        grantId : {
            required: true,
            type: String,
            error: "Grant Id must be provided"
        }
    }
});


Moralis.Cloud.define("getMyStats", async (request) => {
    var userStatsQuery = new Moralis.Query("UserStats"); 
    userStatsQuery.equalTo("email", request.params.email)
    try {
        var user = await userStatsQuery.first()
    }
    catch (err) {
        logger.error(err);
    }

    return user
})


Moralis.Cloud.define("getCurationsByGrant", async (request) => {
    response = {'id':null, 'result':null, 'data':{'content':null, 'category':null, 'legit':null}}

    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("grantId", request.params.grantId)
    try {
        var grant = await grantQuery.first()
        response.id = request.params.grantId
        response.result = (grant.numYes / (grant.numYes + grant.numNo + grant.numUnsure)) > 0.90 ? 'pass' : 'fail'
        response.data.content = response.result
        response.data.category = response.result
        response.data.legit = response.result

        return response
    }
    catch (err) {
        logger.error(err);
        return err
    }
},{
    fields : {
        grantId : {
            required: true,
            type: String,
            error: "Grant Id must be provided"
        }
    }
});



Moralis.Cloud.define("addUser", async (request) => {
    var userStats = new Moralis.Object("UserStats"); 
    userStats.set("email", request.params.email)
    userStats.set("numCurations", 0)
    userStats.set("badgeName", null)
    userStats.set("currentStreak", 0)
    userStats.set("highestStreak", 0)
    userStats.set("pendingPayment", 0)

});



Moralis.Cloud.afterSave("Grant", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    if (request.object?.get("curationsCompleted") === true){
        var saveArray = []
        var grantQuery = new Moralis.Query("Grant")
        grantQuery.equalTo("grantId", request.object.get("grantId"))
        var curationValid = ''
        try {
            var grant = await grantQuery.first()
            if (grant.numYes / (grant.numYes + grant.numNo + grant.numUnsure) > 0.9){
                curationValid = 'Yes'
            }
            else if (grant.numNo / (grant.numYes + grant.numNo + grant.numUnsure) > 0.9){
                curationValid = 'No'
            }
            else if (grant.numUnsure / (grant.numYes + grant.numNo + grant.numUnsure) > 0.9){
                curationValid = 'Unsure'
            }
        }
        catch (err) {
            logger.error(`Failed to find proposals`);
        }

        var curationQuery = new Moralis.Query("Curation")
        curationQuery.equalTo("grantId", request.object.get("grantId"))
        try {
            var curations = await curationQuery.find()
            for (var curation of curations){
                var userStatsQuery = new Moralis.Query("Curation")
                userStatsQuery.equalTo("email", curation.user)
                var user = await userStatsQuery.first()
                if (curation.valid == curationValid || curationValid === ''){
                    user.increment("currentStreak")
                    if (user.currentStreak > user.highestStreak){
                        user.highestStreak = user.currentStreak
                    }
                }
                else{
                    user.currentStreak = 0
                }

                saveArray.push(user)
            }
            await Moralis.saveAll(saveArray)
        }
        catch (err) {
            logger.error(`Failed to find proposals`);
        }
    }
});

//Weight payments by running streak from the pool for that specific grant