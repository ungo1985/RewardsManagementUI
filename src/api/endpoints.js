/**
 * This function is used to make the call to the backend Inquiry service.
 * @method  fetchSkuDetails
 * @param  {string}
 * @returns  {response object}
 */
import Profile from '../models/Profile';
import 'whatwg-fetch';
//whatwg-fetch is required for FETCH api in devices

import { LABEL, INV_PREP_LABEL_STYLE, DEFAULT_PRINT_QTY, 
    THERMAL_TECH_PRINTER, THERMAL_ZEBRA_PRINTER, APP_NAME } from '../models/Constants';

export async function fetchSkuDetails(searchNbr, isCarton) {
    console.time('fetchSkuDetails');
    const storeNbr = Profile.getStoreNumber();
    const domain = Profile.getInquiryDomain();
    const testEnv = Profile.getTestEnv();
    const thdSsoToken = Profile.getThdSsoToken();
    const inquiryClientId = Profile.getInquiryClientId();


    // Building URL
    var url = domain + "/skuInquiry?storeNbr=" + storeNbr + "&searchInput=" + searchNbr
            + "&productDetails=" + true
            + "&onHands=" + false
            + "&order=" + false
            + "&skuLocations=" + false
            + "&vendor=" + isCarton;


    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'api_key': inquiryClientId,
            'Authorization': thdSsoToken,
            'testEnvEnabled': testEnv
        }
    })
        .then(response => {
            console.timeEnd('fetchSkuDetails');
            return response.json();
        })
        .then(json => {
            if (json.errorResponse) {
                throw new Error(JSON.stringify(json));
            }

            return json;
        }
        )
        .catch((error) => {
            throw new Error((error.message));
        });


    //If the json has inner objects with error response make one more fetch call
    // but return json we currently have



}

/* This function is used to make the call to Inventory Management Print Service
 * @method  fetchPrinters *
 * @param storeNumber
 * @param printerType
 * @returns  {response object}*/
export async function fetchPrinters(printerType) {
    console.time('fetchPrinters');
    const storeNumber = Profile.getStoreNumber();
    const domain = Profile.getPrintDomain();
    const thdSsoToken = Profile.getThdSsoToken();
    const printClientId = Profile.getPrintClientId();
    const printerModels = THERMAL_TECH_PRINTER + "," + THERMAL_ZEBRA_PRINTER;
    const failSafeSwitch = true; //This flag ensures that when the above 2 models 
                            // are not retrieved for some reason, it will fetch all available thermal printers
    console.log("printClientId:::" ,printClientId);
    let url = domain + "/getPrinterList?"
            + "storeNbr=" + storeNumber 
            + "&printerType=" + printerType 
            + "&printerModels=" + printerModels 
            + "&failSwitch=" + failSafeSwitch;
    
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'authorization': thdSsoToken,
            'api_key': printClientId,
            'clientId': APP_NAME
        }
    })
        .catch(function (error) {
            console.log("ERROR in printerlist service: " + error);
        })

    const json = await response.json();
    console.timeEnd('fetchPrinters');
    return json;
} 


/* This function is used to make the call to Inventory Management Print Service for Print Details
 * @method  fetchPrinters *
 * @param storeNumber
 * @param printerType
 * @returns  {response object}*/
export async function postPrint(sku, searchInput, quantity, printerObj) {
    console.time('postPrint');
    console.log("Start postPrint - quantity and Sku" + quantity , sku)
    const storeNumber = Profile.getStoreNumber();
    const domain = Profile.getPrintDomain();
    const thdSsoToken = Profile.getThdSsoToken();
    const user =Profile.getUserId();
    const date =Profile.getTodayDate();
    const printClientId = Profile.getPrintClientId();
    var url = domain + "/print/v2" ;

    let json_string = {
        "storeNumber": storeNumber,
        "printerType": printerObj.printerType,
        "printerName": printerObj.printerName,
        "printDataType": LABEL,
        "printerModel" : printerObj.bluetoothModel,
        "commonLabelItem": [{
                "styleName": INV_PREP_LABEL_STYLE,
                "quantity": DEFAULT_PRINT_QTY,
                "printStatus": null,
                "labelAttrs": [
                    { "name": "ATTRIBUTE_0", "value": sku },
                    { "name": "ATTRIBUTE_1", "value": quantity },
                    { "name": "ATTRIBUTE_5", "value": user },
                    { "name": "ATTRIBUTE_6", "value": date },
                    { "name": "ATTRIBUTE_7", "value": searchInput }
                ]
            }]
    };
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(json_string),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': thdSsoToken,
            'api_key': printClientId,
            'clientId': APP_NAME
        }
    })
        .catch(function (error) {
            console.log("ERROR in print service: " + error);
        })

    const json = await response.json();
    console.timeEnd('postPrint');
    return json;
} 

/* This function is used to make the call to Inventory Management Redis Utils to retrieve UI Config Parms
 * @method  fetchConfigParms *
 * @returns  {response object}*/
export async function fetchConfigParms() {
    console.time('fetchConfigParms');
    const user = Profile.getUserId();
    const key = APP_NAME;
    const endpoint = '/v1/keyValues';
    const domain = Profile.getRedisDomain();
    const thdSsoToken = Profile.getThdSsoToken();

    // Building URL
    var url = domain + endpoint + "?userId=" + user + "&key=" + key;
    
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'sso': thdSsoToken
        }
    })
        .catch(function (error) {
            console.log("ERROR in RedisUtils service: " + error);
        })

    try{
        const json = await response.json();
        console.timeEnd('fetchConfigParms');
        return json;
    }
    catch(error){
        console.log("ERROR in fetchConfigParms method: " + error);
        let errorJson = {statusCode:"503", userMessage:"Service Unavailable", link:"null"};
        return errorJson;
    }
}
