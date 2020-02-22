/**
 * CAllback function used when the Datawedge receives a scan
 */
let fnCB;

/**
 * Sets the callback function
 * @method      getScans
 * @example
 * let callback =  (barcode) => console.log(`Scanned Value = ${barcode}`);
 * 
 * getscans( callback );
 */
const getScans = (callback) => {
    fnCB = callback;
    exposeScanHandler(callback);
    console.log('Setting the Callback');
};

const exposeScanHandler = (callback) => {
    window['scan'] = (scanString) => {
    //   if(util.validateForNumericInput(scanString)) {
    //     callback(scanString);  
    //   }
        callback(scanString);  
    };
}

/**
 * Enables scanning functionality if the Datawedge is available
 * @method      fnDeviceready
 * @author      Anthony Oliver & Kalai Mani
 * @example
 * fnDeviceReady(); // activates scanning capability
 */
, fnDeviceReady = () => {
    console.log('Device ready, locating datawedge');
    if (!window.datawedge) {
        return console.error("No Datawedge was found.");
    }

    console.log('Datawedge found');
    window.datawedge.start();

    console.log('Scanning enabled');
    window.datawedge.registerForBarcode(fnRegister);


}

/**
 * Executes the callback while passing it the returned barcode from a valid scan
 * @method      fnRegister
 * @property    {string}        barcode         barcode value of the scanned object
 * @param       {object}        data            data object returned from  scan
 * @param       {string}        data.barcode    value of the scanned object
 * @param       {string}        eCategory       analytic event category
 * @param       {string}        eAction         analytic event action
 * @param       {string}        eLabel          analytic event label
 * @author      Anthony Oliver & Kalai Mani
 * @example
 * fnRegister(); // executes callback(barcode)
 */
, fnRegister = (data) => {
    if (!fnCB || !data || !data.barcode) {
        return console.error("No info", fnCB, data, data.barcode);
    }
    let barcode = fnGetBarcode(data)
         , eAction = 'SearchByScan'
         , eLabel = barcode
    ;

    return fnCB(barcode);
}

/**
 * Returns the scanned data's barcode value, truncates the first 4 charactes if they match a valid SKU
 * @method      fnGetBarcode    
 * @property    {string}        barcodePrefix     first 4 characters of the scanned value
 * @property    {object}        barcode           scanned value
 * @author      Anthony Oliver & Kalai Mani
 * @example
 * let data1 = {
 *      barcode: '9807111111'
 * }
 * fnGetBarcode(data1); // returns 111111
 * 
 * let data2 = {
 *      barcode: '123456798'
 * }
 * fnGetBarcode(data2); //returns 123456798
 */
, fnGetBarcode = (data) => {
    if(!data.barcode) {
        return console.error('No barcode value is available.', data);
    }

    let barcode = data.barcode
        , barcodePrefix = barcode.toString().substring(0,4);

    if(barcodePrefix === SKU_PREFIX){
        return data.barcode.toString().substring(4);
    }

    return barcode;
}
;

/**
 * Prefix for valid in store sku's
 */
const SKU_PREFIX = '9807';

/**
 * When the device is ready, fire fnDeviceReady
 */
document.addEventListener('deviceready', fnDeviceReady);

export default {getScans, fnRegister, fnGetBarcode, fnDeviceReady};