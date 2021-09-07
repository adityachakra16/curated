const Moralis = require("moralis");

Moralis.initialize("fXF8ByjZ8EqWNMaKOoPWaZ1Pdd5nuwNB5DBqIaQR");
Moralis.serverURL = "https://prsjqna10ruh.bigmoralis.com:2053/server";

export async function getPendingGrants(email) {
  const params = {
    email,
    test: true,
  };
  return Moralis.Cloud.run("getPendingGrantProposals", params);
}

export async function submitCuration(valid, grantId, email) {
  const params = {
    valid,
    grantId,
    email,
  };
  return Moralis.Cloud.run("addCuration", params);
}

export async function getMyStats(email) {
  const params = {
    email,
  };
  return Moralis.Cloud.run("getMyStats", params);
}

export async function addUser(email) {
  const params = {
    email,
  };
  return Moralis.Cloud.run("addUser", params);
}
