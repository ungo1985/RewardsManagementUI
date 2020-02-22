import Profile from '../models/Profile';
import {
    QA_INQUIRY_DOMAIN,
    PROD_INQUIRY_DOMAIN,
    QA_INQUIRY_CLIENT_ID,
    PROD_INQUIRY_CLIENT_ID,
    QA_PRINT_DOMAIN,
    PROD_PRINT_DOMAIN
} from './Constants';

describe('testing Profile functions', () => {


    it('testingProfile function setEnvironment with QA storeNumber', () => {

        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
        search: '?storeNumber=9771',
        };
        let url = 'https://inventoryprepui-qa.apps-np.homedepot.com/?storeNumber=9771';
        let expectedStoreNbr = '9771';
        // eslint-disable-next-line no-undef
        mockWindowObject(url);

        Profile.setEnvironment(jest.fn());
        
        const parms = {
        	    "QA_INQUIRY_CLIENT_ID": "13BBCDA1-D55C-4671-884C-FC5DB51DAE69",
        	    "PROD_INQUIRY_CLIENT_ID": "058A09FC-250C-45F5-A582-BA30ACF5EC35",
        	    "QA_PRINT_CLIENT_ID": "CCDAF242-B1CC-4E7B-BE97-933B72A304CC",
        	    "PROD_PRINT_CLIENT_ID": "1FCFEDB8-5D23-48F6-9A17-97FEA3198B10",
        	    "QA_INQUIRY_DOMAIN": "HTTPS://THDAPIQAI.HOMEDEPOT.COM/IMG",
        	    "PROD_INQUIRY_DOMAIN": "HTTPS://THDAPIEN.HOMEDEPOT.COM/IMG",
        	    "QA_PRINT_DOMAIN": "HTTPS://THDAPIQAI.HOMEDEPOT.COM/PRINTSERVICE",
        	    "PROD_PRINT_DOMAIN": "HTTPS://THDAPIEN.HOMEDEPOT.COM/PRINTSERVICE",
        	    "LAST_UPDATED_TIMESTAMP": "2020-Feb-03 11:25:49",
        	    "LAST_UPDATED_USER": "exa6777"
        	}
        
        Profile.setConfigParms(parms);
        
        expect(Profile._storeNumber).toBe(expectedStoreNbr);
        expect(Profile._testEnv).toBeTruthy();
        expect(Profile._inquiryDomain).toBe(QA_INQUIRY_DOMAIN);
        expect(Profile._inquiryClientId).toBe(QA_INQUIRY_CLIENT_ID);
        expect(Profile._printDomain).toBe(QA_PRINT_DOMAIN);
        expect(window.location.href).toEqual(url);

    });

    it('testingProfile function setEnvironment with PROD storeNumber', () => {

      
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
        search: '?storeNumber=0121',
        };
        let url = 'https://inventoryprepui.apps.homedepot.com/?storeNumber=0121';
        let expectedProdStoreNbr = '0121';
        // eslint-disable-next-line no-undef
        mockWindowObject(url);

        Profile.setEnvironment(jest.fn());
        
        const parms = {
        	    "QA_INQUIRY_CLIENT_ID": "13BBCDA1-D55C-4671-884C-FC5DB51DAE69",
        	    "PROD_INQUIRY_CLIENT_ID": "058A09FC-250C-45F5-A582-BA30ACF5EC35",
        	    "QA_PRINT_CLIENT_ID": "CCDAF242-B1CC-4E7B-BE97-933B72A304CC",
        	    "PROD_PRINT_CLIENT_ID": "1FCFEDB8-5D23-48F6-9A17-97FEA3198B10",
        	    "QA_INQUIRY_DOMAIN": "HTTPS://THDAPIQAI.HOMEDEPOT.COM/IMG",
        	    "PROD_INQUIRY_DOMAIN": "HTTPS://THDAPIEN.HOMEDEPOT.COM/IMG",
        	    "QA_PRINT_DOMAIN": "HTTPS://THDAPIQAI.HOMEDEPOT.COM/PRINTSERVICE",
        	    "PROD_PRINT_DOMAIN": "HTTPS://THDAPIEN.HOMEDEPOT.COM/PRINTSERVICE",
        	    "LAST_UPDATED_TIMESTAMP": "2020-Feb-03 11:25:49",
        	    "LAST_UPDATED_USER": "exa6777"
        	}
        
        Profile.setConfigParms(parms);
        
        expect(Profile._storeNumber).toBe(expectedProdStoreNbr);
        expect(Profile._testEnv).toBeFalsy();
        expect(Profile._inquiryDomain).toBe(PROD_INQUIRY_DOMAIN);
        expect(Profile._inquiryClientId).toBe(PROD_INQUIRY_CLIENT_ID);
        expect(Profile._printDomain).toBe(PROD_PRINT_DOMAIN);
        expect(window.location.href).toEqual(url);
    });
});