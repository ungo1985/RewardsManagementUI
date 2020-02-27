import {
    TEST_USER_ID, TEST_TOKEN, SKU, UPC, OMS_ID,
    DATAMAX_PRINTER, ZEBRA_PRINTER, UNKNOWN_INPUT,
    RECENT_SEARCH_THRESHOLD, ZEBRA_MAC_ADDRESS_LENGTH, 
    BROWSER, DATAMAX_PREFIX, ZEBRA, DATAMAX, CARTON_UPC,
    CASE, NULL, 
    BLUETOOTH_PRINTER_TYPE, 
    THERMAL_PRINTER_TYPE, VIP_ID
}
    from '../../models/Constants';
import Profile from '../../models/Profile';
import { fetchConfigParms } from "../../api/endpoints";

export function validateForNumericInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let numericRegEx  = /\D/gm;
    if(!(numericRegEx.test(input)) && Number(input) > 0) {
        isValid = true;
    }
    return isValid;
}


export function validateForAlphaInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let alphaRegEx  = /[^a-zA-Z]/i;
    isValid = !(alphaRegEx.test(input));
    return isValid;
}

export function validateForAlphaNumericInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let alphaNumericRegEx  = /[^a-z\d]/i;
    isValid = !(alphaNumericRegEx.test(input));
    return isValid;
}


/**
 * This function will return input type
 * @method validateUserInput
 * @param String input
 * @returns String
 * @example 
 *  ///returns VIP_ID
 *  this.validateUserInput(EXA6777);
 *  
 *  @example
 *  ///returns UNKNOWN_INPUT
 *  this.validateUserInput(123456789121);
 */
export function validateUserInput(input) {
    if(validateForAlphaNumericInput(input)){
        if (input.length === 7) {

            var letters = input.substring(0,2);
            var numbers = input.substring(3,6);
            if(validateForAlphaInput(letters) && validateForNumericInput(numbers)){return VIP_ID;}
        }
        return UNKNOWN_INPUT;
    } else {
        return UNKNOWN_INPUT;
    }
}

export function validatePrinterInput(input) {
    if(validateForDatamaxPrinter(input)){
        return DATAMAX_PRINTER;
    }
    else if(validateForZebraPrinter(input)){
        return ZEBRA_PRINTER;
    }
}

export function validateForDatamaxPrinter (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    isValid = input.startsWith(DATAMAX_PREFIX);
    return isValid;
}

export function validateForZebraPrinter (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    isValid = validateForAlphaNumericInput(input) && input.length === ZEBRA_MAC_ADDRESS_LENGTH;
    return isValid;
}

export function validateSelectedPrinter (printerSelected) {
    let printerObj = {}
    if (printerSelected.length>0) {
        printerObj.printerName = printerSelected[0].printerUxQueueName;
        let printerType = printerSelected[0].printerType;
        if (printerType.includes(ZEBRA) || printerType.includes(DATAMAX)) {
            printerObj.printerType = BLUETOOTH_PRINTER_TYPE;
            printerObj.isThermal = false;
            printerObj.bluetoothModel =  printerSelected[0].printerModel
        } else {
            printerObj.isThermal = true;
            printerObj.printerType = THERMAL_PRINTER_TYPE;
        }
    }

    return printerObj;
}


export function transformToMac(barcodeString) {
    var regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
    let mac = '';
    if(regexp.test(barcodeString)) {
        mac = barcodeString;
    } else {
        mac = barcodeString.trim().match(/.{1,2}/g).join(':');
    }
    return mac;
}


export function getToken (callback) {
    
    if (Profile.getEnvironment() === BROWSER) {
        console.log("THIS IS CHROME BROWSER");

        let userDetails = {
            associateUserID: TEST_USER_ID,
            thdSsoToken: TEST_TOKEN
        };
        callback({
            userData: userDetails
        });
        
        //OPTIONAL
        exposeTokenHandler(callback);
    } else {
        console.log("THIS IS CORDOVA BROWSER");

        let success = function (intent) {
            console.log("getUser intent is successfull ", intent);
            callback({
                userData: intent
            });
        };

        let fail = function (error) {
            console.log("Error ", error);
            callback({
                userData: error
            });
        };
        
        window.plugin.firstphone.launcher.getUser(success, fail);
    }
}

export function exposeTokenHandler (callback) {
    window['sso'] = (token) => {
        if(validateForAlphaNumericInput(token)) {
            callback({ userData: { thdSsoToken: token } });
        }
    };
}

export function manageRecentSearchList(list, value) {

    if(list.length>=RECENT_SEARCH_THRESHOLD) {
        list.shift();
        list.push(value);
    } else {
        list.push(value);
    }
    return list;    
}

    
    /** Create User Defined New SKUBasicInfo Object from Service Response
     * @param  {} response
     */
export function formatSkuBasicInfo (response) {
    let skuInformation = {}
    let skuBasicInfo = response.skuBasicInfoBySkuStore && response.skuBasicInfoBySkuStore.skuBasicInfo
    if (skuBasicInfo) {
        if (skuBasicInfo.skuDescription) {
            skuInformation.skuDescription = skuBasicInfo.skuDescription;
        }

        if (skuBasicInfo.prices && skuBasicInfo.prices.length > 0) {
            skuInformation.prices = skuBasicInfo.prices;
        }

        if (skuBasicInfo.skuStatus) {
            skuInformation.skuStatus = skuBasicInfo.skuStatus
        }

        if (response.searchInput) {
            skuInformation.searchedInput = response.searchInput
        }

        if (response.skuNbr) {
            skuInformation.skuNbr = response.skuNbr
        }

        if (skuBasicInfo.mamaSku && skuBasicInfo.mamaSku !== NULL) {
            skuInformation.isRelativeSku = true;
            skuInformation.babySku = true;
            skuInformation.mamaSku = response.mamaSku;
        }
        
        if (skuBasicInfo.babySku && skuBasicInfo.babySku !== NULL) {
            skuInformation.isRelativeSku = true;
            skuInformation.mamaSku = true;
            skuInformation.babySku = response.babySku;
        }

    }

    return skuInformation;
}

    /**
     * This function is used to get carton count (packageEachQty) from packaging hierarchy list.
     * @method getCartonCount
     * @param {} response
     * @returns int
     */
export function getCartonCount(response){
    let cartonCount = 0;
    let packagingHierarchiesList = response.skuVendorDetailsByStore && 
            response.skuVendorDetailsByStore.productAssortmentList && 
            response.skuVendorDetailsByStore.productAssortmentList[0].vendorDetails && 
            response.skuVendorDetailsByStore.productAssortmentList[0].vendorDetails[0].packagingHierarchies;

    if(packagingHierarchiesList && packagingHierarchiesList.length > 0){
        var combinedPackagingHierarchiesList = [];
        for (var i = 0; i < packagingHierarchiesList.length; i++) {
            var innerPackagingList = packagingHierarchiesList[i];
            for (var j = 0; j < innerPackagingList.length; j++) {
                combinedPackagingHierarchiesList.push(innerPackagingList[j]);
            }
        }
        
        var filteredPackagingHierarchies =  combinedPackagingHierarchiesList.filter(function(hierarchy) {
            return hierarchy.hierarchyLevelCode === CASE;
        });

        if(filteredPackagingHierarchies.length > 0){
            cartonCount = filteredPackagingHierarchies[0].packageEachQty;
        }
    }
    return cartonCount;

}

    /**
     * This function is used to validate whether or not the searchedInput is a Carton UPC.
     * @method validateCarton
     * @param int searchedInput
     * @returns boolean
     */
    export function validateCarton(searchedInput) {

        var inputType = validateUserInput(searchedInput);
        var isCarton = false;

        if(inputType === CARTON_UPC){
            isCarton = true;
        }

        return isCarton;
    }
    
    export function getConfigParms(callBackFn) {
    	fetchConfigParms()   
            .then(response =>{        
                if(response){
                    let configParms =  response;
                    callBackFn(configParms);
                }
            }).catch(error => {            
                console.log("ERROR FETCHING CONFIG PARMS: " + error);
            });
    }


