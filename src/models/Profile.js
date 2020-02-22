import {
    QA_INQUIRY_DOMAIN,
    PROD_INQUIRY_DOMAIN,
    QA_INQUIRY_CLIENT_ID,
    PROD_INQUIRY_CLIENT_ID,
    QA_PRINT_CLIENT_ID,
    PROD_PRINT_CLIENT_ID,
    QA_PRINT_DOMAIN,
    PROD_PRINT_DOMAIN,
    MOBILE, BROWSER,
    QA_REDIS_DOMAIN, PROD_REDIS_DOMAIN
} from './Constants';
import { getConfigParms } from '../components/Util/util';

class Profile {

    static getStoreNumber() {
        return this._storeNumber;
    }

    set storeNumber(theStoreNumber) {
        this._storeNumber = theStoreNumber;
    }

    static getUserId() {
        return this._userId;
    }

    static userId(theUserId) {
        this._userId = theUserId;
    }

    static getInquiryDomain() {
        return this._inquiryDomain;
    }

    set inquiryDomain(theDomain) {
        this._inquiryDomain = theDomain;
    }

    static getPrintDomain() {
        return this._printDomain;
    }

    set printDomain(theDomain) {
        this._printDomain = theDomain;
    }

    static getTestEnv() {
        return this._testEnv;
    }

    set testEnv(theTestEnv) {
        this._testEnv = theTestEnv;
    }

    static getInquiryClientId() {
        return this._inquiryClientId;
    }

    set inquiryClientId(theClientId) {
        this._inquiryClientId = theClientId;
    }

    static getPrintClientId() {
        return this._printClientId;
    }

    set printClientId(theClientId) {
        this._printClientId = theClientId;
    }
    
    static getRedisDomain() {
        return this._redisDomain;
    }

    set redisDomain(theDomain) {
        this._redisDomain = theDomain;
    }

    static getThdSsoToken() {
        return this._thdSsoToken;
    }

     set thdSsoToken(thethdSsoToken) {
        this._thdSsoToken = thethdSsoToken;
    }

    static getTodayDate() {

        var date = new Date();
        // getMonth() returns the month number zero based (0-11) therefore a +1 is needed
        // "0" is prefixed to keep 2 digits consistantly
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
                            + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) 
                            + '/' + date.getFullYear();
    }

    static getEnvironment() {
        return this._environment;
    }

    static setEnvironment(callBackFn) {
        if (navigator.userAgent.indexOf('TC70') >= 0) {
            this._environment = MOBILE;
        } else {
            this._environment = BROWSER;
        }
        
        let index = window.location.href.search("storeNumber=");
        this._storeNumber = window.location.href.substr(index+12, 4); //setting store number in profile
        let nStoreNumber = parseInt(this._storeNumber, 10); //create integer of store number for number comparison
        if ((nStoreNumber >= 9000) || (nStoreNumber <= 100) || (nStoreNumber >= 5000 && nStoreNumber < 6000)) {
        this._testEnv = true;
        this._redisDomain = QA_REDIS_DOMAIN;
        } else {
            this._testEnv = false;
            this._redisDomain = PROD_REDIS_DOMAIN;
        }
        
    	this.getConfigParms();

        callBackFn(this._environment);

    }

    static setTokenData(thdSsoToken) {
        console.log("token received in profile ",thdSsoToken);    
        this._thdSsoToken = thdSsoToken;
    }
    
    static setConfigParms = (parms) => {        
        if(parms.statusCode){
            if (this._testEnv === true) {
            	console.log("SETTING CONFIG PARMS FROM INTERNAL CONFIG for QA");
            	this._inquiryDomain = QA_INQUIRY_DOMAIN;
                this._inquiryClientId = QA_INQUIRY_CLIENT_ID;
                this._printDomain = QA_PRINT_DOMAIN;
                this._printClientId = QA_PRINT_CLIENT_ID;
                } else {
                	console.log("SETTING CONFIG PARMS FROM INTERNAL CONFIG for PROD");
                	this._inquiryDomain = PROD_INQUIRY_DOMAIN;
                    this._inquiryClientId = PROD_INQUIRY_CLIENT_ID;
                    this._printDomain = PROD_PRINT_DOMAIN;
                    this._printClientId = PROD_PRINT_CLIENT_ID;
                }
        }
        else{
            if (this._testEnv === true) {
            	console.log("SETTING CONFIG PARMS FROM REDIS UTILS SERVICE for QA");
            	this._inquiryDomain = parms.QA_INQUIRY_DOMAIN.toLowerCase();
                this._inquiryClientId = parms.QA_INQUIRY_CLIENT_ID.toLowerCase();
                this._printDomain = parms.QA_PRINT_DOMAIN.toLowerCase();
                this._printClientId = parms.QA_PRINT_CLIENT_ID.toLowerCase();
                } else {
                	console.log("SETTING CONFIG PARMS FROM REDIS UTILS SERVICE for PROD");
                	this._inquiryDomain = parms.PROD_INQUIRY_DOMAIN.toLowerCase();
                    this._inquiryClientId = parms.PROD_INQUIRY_CLIENT_ID.toLowerCase();
                    this._printDomain = parms.PROD_PRINT_DOMAIN.toLowerCase();
                    this._printClientId = parms.PROD_PRINT_CLIENT_ID.toLowerCase();
                }
        }
        
    }
    
    static getConfigParms(){
        setTimeout(() => {
        	getConfigParms(this.setConfigParms);
        }, 1000);
    }

}

export default Profile; 