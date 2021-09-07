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
    if (user === 'undefined'){
        user = new Moralis.Object("UserStats")
        user.set("email", request.params.email)
        user.set("numCurations", 1)
    }
    else{
        user.increment("numCurations")
        if (user.get("numCurations") === 1){
            user.set("badgeName", "Newbie")
        }
        else if (user.get("numCurations") === 10){
            user.set("badgeName", "Amateur")
        }
        else if (user.get("numCurations") === 50){
            user.set("badgeName", "Pro")
        }
    }

    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("grantId", request.params.grantId)
    grantQuery.equalTo("curationsCompleted", false)
    var grant = await grantQuery.first()
    if (request.params.valid == 'Yes'){
        grant.increment("numYes")
        
    }
    else if (request.params.valid == 'No'){
        grant.increment("numNo")
    }
    else if (request.params.valid == 'Unsure'){
        grant.increment("numUnsure")
    }

    var confidenceYes = grant.get("numYes") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure"))

    var confidenceNo = grant.get("numNo") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure"))

    var confidenceUnsure = grant.get("numUnsure") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure"))


    var confidence = Math.max(confidenceYes, confidenceNo, confidenceUnsure)
    logger.info(`confidence ${confidence}, confidenceYes ${confidenceYes}, ${confidenceNo}, ${confidenceUnsure}`)
    if ((grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure") >= grant.get("minCurationsForCompletion") && confidence >= 0.8) || grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure") === grant.get("maxCurationsForCompletion")){
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
            curationSet.add(curation.get("grantId"))
        }
    }
    catch (err) {
        logger.error(err);
    }
    logger.info(`curationSet: ${JSON.stringify(curationSet)}`)

    var pendingGrants = []
    for (var grant of grants){
        if (!curationSet.has(grant.get("grantId"))){
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
        if (grant.get("curationsCompleted") === true){
            response.Grants[grant.get("grantId")] = grant.get("status")
                                    
        }
        else {
            response.Grants[grant.get("grantId")] = 'pending'
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
        response.result = grant.get("status")
        response.confidence = grant.get("confidence")
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
    const logger = Moralis.Cloud.getLogger();

    var userStats = new Moralis.Query("UserStats"); 
    userStats.equalTo("email", request.params.email)
    var user = await userStats.first()

    logger.info(`user: ${JSON.stringify(user)}`)
    if (!user){
        user = new Moralis.Object("UserStats"); 
        user.set("email", request.params.email)
        user.set("numCurations", 0)
        user.set("badgeName", null)
        user.set("currentStreak", 0)
        user.set("highestStreak", 0)
        user.set("totalRewards", 0)
    
        await user.save()
        return 'User added'

    }
    else{
        return 'User already exists'
    }

});



Moralis.Cloud.afterSave("Grant", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    if (request.object?.get("curationsCompleted") === true && request.object?.get("status") === 'pending'){
        
        var saveArray = []
        var grantQuery = new Moralis.Query("Grant")
        grantQuery.equalTo("grantId", request.object.get("grantId"))
        var curationValid = ''
        try {
            var grant = await grantQuery.first()
            logger.info(`Grant ${JSON.stringify(grant)}`)
            
            if (grant.get("numYes") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure")) >= 0.8){
                curationValid = 'Yes'
                grant.set("status", "pass")
            }
            else if (grant.get("numNo") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure")) >= 0.8){
                curationValid = 'No'
                grant.set("status", "fail")

            }
            else if (grant.get("numUnsure") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure")) >= 0.8){
                curationValid = 'Unsure'
                grant.set("status", "triage")
            }
            else {
                grant.set("status", "triage")
            }

            
            if (grant.get("numYes") > grant.get("numNo") && grant.get("numYes") > grant.get("numUnsure")){
                grant.set("confidence", grant.get("numYes") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure")))
            }
            else if (grant.get("numNo") > grant.get("numYes") && grant.get("numNo") > grant.get("numUnsure")){
                grant.set("confidence", grant.get("numNo") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure")))
            }
            else {
                grant.set("confidence", grant.get("numUnsure") / (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure")))
            }
            
            saveArray.push(grant)
            
        }
        catch (err) {
            logger.error(JSON.stringify(err));
        }
        
        var curationQuery = new Moralis.Query("Curation")
        curationQuery.equalTo("grantId", request.object.get("grantId"))
        try {
            var curations = await curationQuery.find()
            logger.info(`Curations ${JSON.stringify(curations)}`)

            var users = []
            var totalCurrentStreak = 0
            
            
            for (var curation of curations){
                var userStatsQuery = new Moralis.Query("UserStats")
                userStatsQuery.equalTo("email", curation.get("user"))
                var user = await userStatsQuery.first()
                logger.info(`User ${JSON.stringify(user)}`)

                
                users.push(user)
                logger.info(`User second log ${JSON.stringify(user)}`)

                if (curation.get("valid") === curationValid || curationValid === ''){
                    user.increment("currentStreak")
                    if (user.get("currentStreak") > user.get("highestStreak")){
                        user.increment("highestStreak")
                    }
                    
                }
                else{
                    user.set("currentStreak",0) 
                }
                totalCurrentStreak += user.get("currentStreak")

            }

            for (var user of users){
                logger.info(`totalRewards: ${user.get("totalRewards")}`)
                logger.info(`curations.length: ${curations.length}`)
                logger.info(`user.get("currentStreak"): ${user.get("currentStreak")}`)
                logger.info(`totalCurrentStreak: ${totalCurrentStreak}`)

                user.set("totalRewards", user.get("totalRewards") + (curations.length * user.get("currentStreak") / totalCurrentStreak))
                saveArray.push(user)
            }
            logger.info(`Save array ${JSON.stringify(saveArray)}`)

            await Moralis.Object.saveAll(saveArray, { useMasterKey: true })
        }
        catch (err) {
            logger.error(err);
        }
    }
});

