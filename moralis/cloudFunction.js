Moralis.Cloud.define("addCuration", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    var curation = new Moralis.Object("Curation");    
    curation.set("valid", request.params.valid)
    curation.set("grantId", request.params.grantId)
    curation.set("user", "asssa")
    curation.set("verifiable", false)

    var userQuery = new Moralis.Query("UserStats");    
    userQuery.equalTo("ethAddress", request.user.get("ethAddress"))
    var user = await userQuery.first()
    logger.info("user", JSON.stringify(user))
    if (user == null){
        user = new Moralis.Object("UserStats")
        user.set("ethAddress", request.user.get("ethAddress"))
        user.set("numCurations", 1)
    }
    else{
        user.increment("numCurations")
    }

    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("grantId", request.params.grantId)
    grantQuery.equalTo("curationsCompleted", false)
    var grant = await grantQuery.first()

    if (grant.get("numYes") + grant.get("numNo") + grant.get("numUnsure") === grant.get("maxCurations") - 1){
        grant.set("curationsCompleted", true)
    }

    if (request.params.valid == 'Yes'){
        grant.increment("numYes")
    }
    else if (request.params.valid == 'No'){
        grant.increment("numNo")
    }
    else if (request.params.valid == 'Unsure'){
        grant.increment("numUnsure")
    }


    saveArray = [curation, user, grant]
    try {
        Moralis.Object.saveAll(saveArray, { useMasterKey: true });
        logger.info(`Added curation`);
    }
    catch (err) {
        logger.error(`Failed to find proposals`);
    }
},{
    fields : {
        valid : {
            required: true,
            type: String,
            error: "Valid must be provided"
        },
        grantId : {
            required: true,
            type: String,
            error: "Grant Id must be provided"
        }
    }
});


Moralis.Cloud.define("getPendingGrantProposals", async (request) => {
    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("curationsCompleted", false)

    try {
        var grants = await grantQuery.find()
        return grants
    }
    catch (err) {
        logger.error(err);
    }
})


Moralis.Cloud.define("getCompletedCurationStats", async (request) => {
    var singleGrant = {'grantId':null, 'grantName':null, 'pass': null, 'confidence':null, 'numYes':null, 'numNo':null, 'numUnsure':null}
    var response = {'completedGrants':[], 'errorMessage':null}

    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("curationsCompleted", true)

    try {
        var grants = await grantQuery.find()
    }
    catch (err) {
        logger.error(err);
        response.errorMessage = err;
        return response
    }

    for (var grant of grants){
        singleGrant.grantId = grant.grantId
        singleGrant.grantName = grant.grantName
        singleGrant.pass = (grant.numYes / grant.maxCurations) > 0.80 ? true : false
        singleGrant.confidence = grant.numYes / grant.maxCurations
        singleGrant.numYes = grant.numYes
        singleGrant.numNo = grant.numNo
        singleGrant.numUnsure = grant.numUnsure
        response.completedGrants.push(singleGrant)
    }

    return response
})


Moralis.Cloud.define("getGrantByGrantId", async (request) => {
    var grantQuery = new Moralis.Query("Grant"); 
    grantQuery.equalTo("grantId", request.params.grantId)
    try {
        var grant = await grantQuery.first()
    }
    catch (err) {
        logger.error(err);
        response.errorMessage = err;
        return response
    }

    if (grant.curationsCompleted){
        grant.pass = (grant.numYes / grant.maxCurations) > 0.80 ? true : false
        grant.confidence = grant.numYes / grant.maxCurations
    }

    return grant
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
    userStatsQuery.equalTo("ethAddress", request.user.get("ethAddress"))
    try {
        var user = await userStatsQuery.first()
    }
    catch (err) {
        logger.error(err);
    }

    return user
})