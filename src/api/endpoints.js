/**
 * This function is used to make the call to the backend Inquiry service.
 * @method  fetchSkuDetails
 * @param  {string}
 * @returns  {response object}
 */
import 'whatwg-fetch';
//whatwg-fetch is required for FETCH api in devices

import {REWARDS_MANAGEMENT_DOMAIN } from '../models/Constants';


/* This function is used to make the call to RewardsManagementService to obtain customer and purchase info
 * @method  fetchCustomerAndPurchaseInfo *
 * @returns  {response object}*/
export async function fetchCustomerAndPurchaseInfo(vipId) {
    console.time('fetchCustomerAndPurchaseInfo');
    const endpoint = '/rws/getCustomerAndPurchaseInfo?vipId=';
    const domain = REWARDS_MANAGEMENT_DOMAIN;

    // Building URL
    var url = domain + endpoint + vipId;
    
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in RewardsManagementService: " + error);
        })

    try{
        const json = await response.json();
        console.timeEnd('fetchCustomerAndPurchaseInfo');
        return json;
    }
    catch(error){
        console.log("ERROR in fetchCustomerAndPurchaseInfo method: " + error);
        let errorJson = {customerId:vipId, customerInfo:{ customerId: vipId, firstName: null}, purchaseInfo:{ customerId: vipId, purchasedItems: []},  errorResponse:{ code: 503, message: "SERVICE UNAVAILABLE"}};
        return errorJson;
    }
}

/* This function is used to make the call to Rewards Management Service to update or add customer
 * @method  postCustomer *
 * @param vipId
 * @param firstName
 * @param lastName
 * @param streetAddress
 * @param city
 * @param state
 * @param zipCode
 * @param birthday
 * @param goldStatusFlag
 * @param points
 * @returns  {response object}*/
export async function postCustomer(vipId, firstName, lastName, streetAddress, city, state, zipCode, birthday, goldStatusFlag, points) {
    console.time('postCustomer');
    console.log("Start postCustomer: " + JSON.stringify(firstName) + " " + JSON.stringify(lastName));
    const endpoint = '/rws/postCustomer';
    const domain = REWARDS_MANAGEMENT_DOMAIN;
    var url = domain + endpoint;

    let json_string = {
        "customerId": vipId,
        "firstName": firstName,
        "lastName": lastName,
        "streetAddress": streetAddress,
        "city" : city,
        "state": state,
        "zipCode": zipCode,
        "birthday": birthday,
        "goldStatusFlag": goldStatusFlag,
        "points": points
    };
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(json_string),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in rewards management service: " + error);
        })

    const json = await response.json();
    console.timeEnd('postCustomer');
    return json;
} 

export async function deleteCustomer(vipId) {
    console.time('deleteCustomer');
    console.log("Start deleteCustomer: " + vipId);
    const endpoint = '/rws/deleteCustomer?vipId=' + vipId;
    const domain = REWARDS_MANAGEMENT_DOMAIN;
    var url = domain + endpoint;

    const response = await fetch(url, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in rewards management service: " + error);
        })

    const json = await response.json();
    console.timeEnd('deleteCustomer');
    return json;
} 

/* This function is used to make the call to RewardsManagementService to obtain daily purchase info
 * @method  fetchDailyPurchaseReport *
 * @returns  {response object}*/
export async function fetchDailyPurchaseReport() {
    console.time('fetchDailyPurchaseReport');
    const endpoint = '/rws/genereateDailyPurchaseReport';
    const domain = REWARDS_MANAGEMENT_DOMAIN;

    // Building URL
    var url = domain + endpoint;
    
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in RewardsManagementService: " + error);
        })

    try{
        const json = await response.json();
        console.timeEnd('fetchDailyPurchaseReport');
        return json;
    }
    catch(error){
        console.log("ERROR in fetchDailyPurchaseReport method: " + error);
        let errorJson = {customerId:'', customerInfo:{ customerId: '', firstName: null}, purchaseInfo:{ customerId: '', purchasedItems: []},  errorResponse:{ code: 503, message: "SERVICE UNAVAILABLE"}};
        return errorJson;
    }
}