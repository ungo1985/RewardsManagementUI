import {validateForNumericInput, validateForAlphaNumericInput, 
    validateUserInput, manageRecentSearchList, transformToMac,
    formatSkuNumber, getToken, validatePrinterInput } from './Util';
import { TEST_USER_ID, TEST_TOKEN } from '../../models/Constants';

describe('testing Utility functions', () => {

    //validateForNumericInput
    it('testing Util method validateForNumericInput with null', () => {
        let response = validateForNumericInput(null);
        expect(response).toBeFalsy();
    });

    it('testing Util method validateForNumericInput with empty string', () => {
        let response = validateForNumericInput("");
        expect(response).toBeFalsy();
    });

    it('testing Util method validateForNumericInput with invalid string', () => {
        let response = validateForNumericInput("$%#2!!8493aksdfjksj");
        expect(response).toBeFalsy();
    });

    it('testing Util method validateForNumericInput with valid string', () => {
        let response = validateForNumericInput("1234567890");
        expect(response).toBeTruthy();
    });

    //validateForAlphaNumericInput
    it('testing Util with invalid string', () => {
        let response = validateForAlphaNumericInput("$%161640$&");
        expect(response).toBeFalsy();
    })

    it('testing Util with empty string', () => {
        let response = validateForAlphaNumericInput("");
        expect(response).toBeFalsy();
    });

    it('testing Util with null', () => {
        let response = validateForAlphaNumericInput(null);
        expect(response).toBeFalsy();
    });


    it('testing util with valid SSO string', () => {
        let response = validateForAlphaNumericInput("8s8AYQRhCX8NfBgEcaep6XFJVKmC14T66Wpzm4qs1owKxMXwNadyzcMjmMNIMTo6Z56C19WqFBj5aPKSBOZr6VlK7w7R1408kwqjKyIIr6581UElVFvSqCCXqoiuXMRcWWXNcWj4hHCnbnO4pBVL31lGkgklDvRwdVrhvVaDIULlaeXVaBkJAQf3zDLgKrbc4Z0bG1XZKsiXp6yuMPmpB8aGpdbwPr2LGLyw3Ey5e5YJM8r3NVnzVYHsNkQi8eOC7XjpwQz63SdF1eq4vcH721waPnpK9kbL8FhmUSPcuHwm8H7DTlGlXS8PRoMACxKEkfzX0NN0UUdiZIZjyCSFCIqe6QZt6WlY7tyNBaIn5UVOSad7Aj9X7SHrH6iCujRQGd1BZDhnRRXOvtD5bSpBSeaSYi97wJ1iqpxA6QIBOmaxJq5KFFWziC5qcrXZx2puk3zzOVOtbKBoXf8vHVnJvUp1AQd7wWEXGhkv5eEoPBAs8TrQYROl6i6yF4EzXE9EaUT5id5oiZhcWYMXzPOifePOuPIlBjf0BxMvlSXgShxDk4B2dUjz6jZyboCgvmVlLgoSnVNpDpVWN0fNb6KTihyeQAuo4trWtH3G3TCJB5KEKOHWE6h8xJgoS7EKnFyw0NOeCx5kNUyVidjtogGSI83puNC9MCpegQTNghOKLxmbiEP24BD9xxaawE3mINhcKsad1xwvA2KiiEa3K9OnMUigZFM2uGYfmrxnbUCKXZtMGEycmWq8POHe5RXOo7487H6egO");
        expect(response).toBeTruthy();
    });

    //validateUserInput
    it('testing validateUserInput for a 10 digit SKU', () => {
        let input = '1000161640';
        let inputType = 'SKU';
        let response = validateUserInput(input)
        expect(response).toBe(inputType)
    })

    it('testing validateUserInput for a 12 digit UPC', () => {
        let input = '050169517505';
        let inputType = 'UPC';
        let response = validateUserInput(input)
        expect(response).toBe(inputType)
    })

    it('testing validateUserInput for a 9 digit OMS', () => {
        let input = '202091220';
        let inputType = 'OMS_ID';
        let response = validateUserInput(input)
        expect(response).toBe(inputType)
    })

    it('testing validateUserInput for a 12 character ZEBRA printer barcode', () => {
        let input = 'AC3FA4F19AF5';
        let inputType = 'ZEBRA_PRINTER';
        let response = validatePrinterInput(input);
        expect(response).toBe(inputType)
    })

    it('testing validateUserInput for a 12 character DATAMAX printer barcode', () => {
        let input = 'OC2BT 0017AC11A4F8';
        let inputType = 'DATAMAX_PRINTER';
        let response = validatePrinterInput(input)
        expect(response).toBe(inputType)
    })

    it('testing validateUserInput for a invalid numbers', () => {
        let input = '12345678901';
        let inputType = 'UNKNOWN_INPUT';
        let response = validateUserInput(input)
        expect(response).toBe(inputType)
    })

    it('testing validateUserInput for a invalid alphanumeric string', () => {
        let invalidInput = 'A1234O5678RT901';
        let invalidInputType = 'UNKNOWN_INPUT';
        let response = validateUserInput(invalidInput)
        expect(response).toBe(invalidInputType)
    })

    //transformToMac
    it('testing validateUserInput for a valid printer barcode of 12 digit', () => {
        let macInput = 'AC3FA4F19AF5';
        let expectedMacAddressFormat = 'AC:3F:A4:F1:9A:F5';
        let response = transformToMac(macInput)
        expect(response).toBe(expectedMacAddressFormat)
    })

    it('testing validateUserInput for a valid printer barcode of 16 digit', () => {
        let macInput = 'AC3FA4F19AF51234';
        let expectedMacAddressFormat = 'AC:3F:A4:F1:9A:F5:12:34';
        let response = transformToMac(macInput)
        expect(response).toBe(expectedMacAddressFormat)
    })

    //formatSkuNumber
    it('testing formatSkuNumber for a 6 digit SKU number', () => {
        let skuNbr = '161640';
        let formattedSkuNbr = '0000-161-640';
        let response = formatSkuNumber(skuNbr)
        expect(response).toBe(formattedSkuNbr)
    })
    
    it('testing formatSkuNumber for a 10 digit SKU number', () => {
        let skuNbr = '1000161640';
        let formattedSkuNbr = '1000-161-640';
        let response = formatSkuNumber(skuNbr)
        expect(response).toBe(formattedSkuNbr)
    })

    it('testing formatSkuNumber for a empty string', () => {
        let skuNbr = '';
        let response = formatSkuNumber(skuNbr)
        expect(response).toBe('')
    })

    //getToken
    it('testing getToken for browser', () => {
        let expectedUser = TEST_USER_ID;
        let expectedSsoToken = TEST_TOKEN;

        let userId, token = ''
        var callingFn = function(intent) {
            userId = intent.userData.associateUserID;   
            token = intent.userData.thdSsoToken;   
        }

        var getUserIntent = 
        {userData: {
            associateUserID: "ASM001",
            departmentNumber: "1",
            firstName: "ASSISTANT",
            imsUserLevel: 40,
            lastName: "MANAGER",
            locationNumber: "9771",
            locationType: "STR",
            middleName: "S",
            thdSsoToken: TEST_TOKEN,
            userType: "0"
        }}

        window.plugin = {
            firstphone: {
                launcher: {
                    getUser: function(successCallback){
                        setTimeout(function (){
                            successCallback(getUserIntent);
                        }, 100);
                    }
                }
            }
        }

        getToken(callingFn(getUserIntent)); //method under test
        expect(userId).toBe(expectedUser);
        expect(token).toBe(expectedSsoToken);
    });

    //manageRecentSearchList
    it('testing manageRecentSearchList with list of already equal to threshold length', () => {

        let savedCurrentList = [1,2,3,4,5,6,7,8,9,10]
        let newValue = 99;
        let expectedList = [2,3,4,5,6,7,8,9,10,99]
        let response = manageRecentSearchList(savedCurrentList,newValue);
        expect(response).toStrictEqual(expectedList);
    });

    it('testing manageRecentSearchList with list less than threshold length', () => {

        let savedCurrentList = [1,2,3,4,5,6,7,8,9]
        let newValue = 99;
        let expectedList = [1,2,3,4,5,6,7,8,9,99]
        let response = manageRecentSearchList(savedCurrentList,newValue);
        expect(response).toStrictEqual(expectedList);
    });

});

