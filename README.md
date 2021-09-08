# Curated

This project is a grant curation crowdsourcing application that was created during the Decentralized Governance Hackathon on Gitcoin and submitted to this bounty - https://gitcoin.co/issue/gitcoinco/skunkworks/245/100026394.

Deployed site - https://prsjqna10ruh.bigmoralis.com/

## Design Approach

For the prototype, we have thought about and addressed the following in a grant curation crowdsourcing application that is fully decentralized.

### **1. Curation confidence**

How to calculate the confidence of the aggregated curations for many curations for a certain grant?

Currently, our system uses a basic formula for calculating confidence given by,

```shell
confidence = most_frequent_curation / total_curations
```

If confidence is higher than 80% and above the minimum amount of curations required (currently set to 15), a grant is said to have completed curations. Depending on the most commonly picked option, the curation result is set as pass, fail or triage. We also have a maximum number of curations for each grant (currently set to 30) after which a grant cannot be curated any further. If this is the case, that means there is confusion regarding the validity of the grant and thus the system sets it as triage.


### **2. Interface simplicity**

We made the interface similar to Gitcoin grants page and added a bit of gamification. This is to make sure the user (who we are assuming has already interacted with the Gitcoin platform before) will find it very easy to use the curation platform. The UI can be easily integrated in the current Gitcoin application. On top of the gitcoin grant interface we have added 3 curate buttons.

Check the similarities below

**Our app**
![Our app interface](app/public/appimg1.JPG)

**Gitcoin**
![Gitcoin interface](app/public/gitimg1.JPG)

### **3. User Guidance**

The user is given a proper tutorial when they first visit and sign in our app. We also have hints at various sections which indicate the requirements.

**Initial Tutorial**
![Gitcoin interface](app/public/appimg2.JPG)

**Helpers/Hints**
![Gitcoin interface](app/public/appimg3.JPG)

### **4. Sybil Attack/ Bots Prevention**

Users currently login to the app using their Google accounts and can connect Web3 wallets after that similar to how the actual Gitcoin platform does it with an user's Github account. Although this is not fully resistant to Sybil attacks as a person can have multiple Google accounts, it is still an improvement on just signing in from a Web3 wallet. In the future something like a proof of humanity would be ideal to prevent sybil attacks. 
Since in the future we expect this app to be integrated with the Gitcoin app and users to be common accross both these platforms, we can let users have a common login for both the platforms.

**Login page**
![Gitcoin interface](app/public/appimg4.JPG)

### **5. Curator incentivization**

Curators are rewarded for curating a grant based on their streak and the total streak of all curators that have curated that grant. For example, if there are 50 curators for a grant and all of them have a streak of 5, they will all get an equal share of the rewards for that grant. However, if one person has a streak of 10, their reward share will be calculated as follows:

### **6. Verifiability**

We store all the curations for each grant on ipfs. Storing it on IPFS makes it immutable, hence can be used anytime to verify the curations. We send the ipfs link when individual grant result API is called.

```shell
reward = 10 / (5 * 49 + 10 * 1)
```

A streak is only broken if there is high confidence about a curation (above 90) but a curator curates it wrongly.

The advantage of having a streak based system is that a bot or fraudalent user can never get a high reward. This method incentivizes curation correctness (having a streak of 0 would suck) and speed of curation (having a streak much lower than others would mean a smaller share of the pie) at the same time and lets the curator find the optimal balance between the two.

It is not possible to know if this incentivization method works well for such a system without experimentation but its a good starting point.

One disadvantage of this method is that it doesn't completely get rid of bots. Someone can still make an income by running a bot. However, it would be much easier to identify bots as we can easily check the rewards earned against number of total curations. Using this metric it will be possible to fully disincentivize bots and fraudulent curators in the future

## APIS

### Getting curations for individual grants

> https://prsjqna10ruh.bigmoralis.com:2053/server/functions/getCurationsByGrant?_ApplicationId=fXF8ByjZ8EqWNMaKOoPWaZ1Pdd5nuwNB5DBqIaQR&grantId=3474

### Getting all grants' curation results

> https://prsjqna10ruh.bigmoralis.com:2053/server/functions/getAllCurationResults?_ApplicationId=fXF8ByjZ8EqWNMaKOoPWaZ1Pdd5nuwNB5DBqIaQR

Please note that the application Id is given here just for testing purposes. It should not be exposed in production unless necessary security measures have been taken.

## How to run locally

Run the following commands

```shell
git clone https://github.com/adityachakra16/curated.git
cd app
yarn install
yarn start
```

Sign in with any google account


## Backend

We have used **Moralis** as our backend. Main reason for choosing Moralis over more decentralized alternatives is the speed of experimentation. Multiple experiments related to the mechanism design such as rewards and quality of curations should be run initially before we actually decentralize parts of it. In Moralis we have created 3 tables which help us in maintaining the state of our app. The detailed schema is given below.


## How to set up a Moralis server

1. Go to https://moralis.io/ and sign up for free
2. After signing up, choose appropriate settings and start a server instance
3. Add cloud functions to the server defined in cloudFunction.js
4. Following is the schema for our curation database in Moralis - 

### Tables 

1. Grant
    - grantId (string)
    - numYes (integer, default = 0)
    - numNo (integer, default = 0)
    - numUnsure (integer, default = 0)
    - curationsCompleted (bool, default = false)
    - minCurationsForCompletion (integer)
    - maxCurationsForCompletion (integer)
    - status (string, default= = 'pending')
    - confidence (integer, default = 0)

2. Curation
    - grantId (string) - foreign key to Grant table
    - user (string) - foreign key to email in UserStats table
    - valid (string) - This field stroes the curations - yes, not or unsure
3. UserStats
    - email (string)
    - numCurations (integer, default = 0)
    - highestStreak (integer, default = 0)
    - pendingPayment (integer, default = 0)
    - currentStreak (integer, default = 0)
    - badgeName (string)




## Summary and future scope(and some other design considerations)

Although the application in its current state might seem centralized (as it uses a centralized server for storing curation metadata) to create a good user experiance and keep it secure, the way the grants are curated by multiple users and how each users curation has an effect on the result makes the actual system decentralized. The infrastructure however can be progressively decentralized over time with some tradeoffs.

For instance, the IPFS content identifiers can be stored on chain. The curator's transaction fees can be forwarded to the grant owner using something like Biconomy. However, this system would sacrifice on the user experience as the curator would have to sign a transaction for each curation.

Our app is also not currently optimized to be responsive to different screen sizes.
