import { formatPrinterList, getThermalPrinters } from "./print-util";

describe('testing Utility functions', () => {

    let validPrinterList = [{ "departmentNumber": 0, "printerAttribute": "lang:CPL", "printerDescription": "Barcode Blaster D6-2L", "printerHostName": "10.2.81.215", "printerId": "stprb001", "printerModelId": "BLASTER", "printerUxQueueName": "stprb001", "shortPrinterDescription": "stprb001", "uxServerHostName": "stuxsh01.st9771.homedepot.com" }, 
    { "departmentNumber":0, "printerAttribute":"lang:CPL", "printerDescription":"Barcode Blaster D6-10R", "printerHostName":"10.1.149.113", "printerId":"stprb002", "printerModelId":"BLASTER", "printerUxQueueName":"stprb002", "shortPrinterDescription":"stprb002", "uxServerHostName":"stuxsh01.st9771.homedepot.com"}, 
    { "departmentNumber":0, "printerAttribute":"lang:CPL", "printerDescription":"Barcode Blaster Offshore Lab1", "printerHostName":"stprb003.st9850.homedepot.com", "printerId":"stprb003", "printerModelId":"BLASTER", "printerUxQueueName":"stprb003", "shortPrinterDescription":"stprb003", "uxServerHostName":"stuxsh01.st9771.homedepot.com"}];

    let expectedPrinters = [{
        printerUxQueueName: 'stprb001',
        printerType: 'CART_PRINTER',
        printerDescription: 'Barcode Blaster D6-2L'
    },
    {
        printerUxQueueName: 'stprb002',
        printerType: 'CART_PRINTER',
        printerDescription: 'Barcode Blaster D6-10R'
    },
    {
        printerUxQueueName: 'stprb003',
        printerType: 'CART_PRINTER',
        printerDescription: 'Barcode Blaster Offshore Lab1'
    }]

    let mockResponseObj = {"storeNumber":"9771","printerList":[{ "departmentNumber": 0, "printerAttribute": "lang:CPL", "printerDescription": "Barcode Blaster D6-2L", "printerHostName": "10.2.81.215", "printerId": "stprb001", "printerModelId": "BLASTER", "printerUxQueueName": "stprb001", "shortPrinterDescription": "stprb001", "uxServerHostName": "stuxsh01.st9771.homedepot.com" }, 
    { "departmentNumber":0, "printerAttribute":"lang:CPL", "printerDescription":"Barcode Blaster D6-10R", "printerHostName":"10.1.149.113", "printerId":"stprb002", "printerModelId":"BLASTER", "printerUxQueueName":"stprb002", "shortPrinterDescription":"stprb002", "uxServerHostName":"stuxsh01.st9771.homedepot.com"}, 
    { "departmentNumber":0, "printerAttribute":"lang:CPL", "printerDescription":"Barcode Blaster Offshore Lab1", "printerHostName":"stprb003.st9850.homedepot.com", "printerId":"stprb003", "printerModelId":"BLASTER", "printerUxQueueName":"stprb003", "shortPrinterDescription":"stprb003", "uxServerHostName":"stuxsh01.st9771.homedepot.com"}]};


    //formatPrinterList
    it('testing Util method validateForNumericInput with null', () => {
        let response = formatPrinterList(null);
        expect(response).toStrictEqual([]);
    });

    it('testing Util method validateForNumericInput with valid data', () => {
        let response = formatPrinterList(validPrinterList);
        expect(response.length).toBe(3);
        expect(response).toStrictEqual(expectedPrinters);
    });

    //getThermalPrinters
    it('testing Util method getThermalPrinters with valid data', async () => {
        
        fetch.mockResponse(JSON.stringify(mockResponseObj))

        function callBackLogFx(printers){
            expect(printers.length).toBe(3);
            expect(printers).toStrictEqual(expectedPrinters);
        }
        getThermalPrinters(callBackLogFx);
    });
});