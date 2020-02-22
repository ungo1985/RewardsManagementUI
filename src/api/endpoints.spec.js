import { fetchPrinters, fetchConfigParms } from "./endpoints";

it('should fetch printer list', () => {

    const mockResponseObj = {"storeNumber":"9771","printerList":[{ "departmentNumber": 0, "printerAttribute": "lang:CPL", "printerDescription": "Barcode Blaster D6-2L", "printerHostName": "10.2.81.215", "printerId": "stprb001", "printerModelId": "BLASTER", "printerUxQueueName": "stprb001", "shortPrinterDescription": "stprb001", "uxServerHostName": "stuxsh01.st9771.homedepot.com" }, 
    { "departmentNumber":0, "printerAttribute":"lang:CPL", "printerDescription":"Barcode Blaster D6-10R", "printerHostName":"10.1.149.113", "printerId":"stprb002", "printerModelId":"BLASTER", "printerUxQueueName":"stprb002", "shortPrinterDescription":"stprb002", "uxServerHostName":"stuxsh01.st9771.homedepot.com"}, 
    { "departmentNumber":0, "printerAttribute":"lang:CPL", "printerDescription":"Barcode Blaster Offshore Lab1", "printerHostName":"stprb003.st9850.homedepot.com", "printerId":"stprb003", "printerModelId":"BLASTER", "printerUxQueueName":"stprb003", "shortPrinterDescription":"stprb003", "uxServerHostName":"stuxsh01.st9771.homedepot.com"}]};

    fetch.mockResponse(JSON.stringify(mockResponseObj))

    fetchPrinters("THERMAL").then(res => {
        expect(res.storeNumber).toBe('9771');
        expect(res.printerList.length).toBe(3);
      })
  });

it('should fetch config parms', () => {
	
    const mockResponseObj = {"FLAG":"Y","FLAG2":"N","LAST_UPDATED_TIMESTAMP":"2020-Jan-27 15:30:59","LAST_UPDATED_USER":"exa6777"};
    
    fetch.mockResponse(JSON.stringify(mockResponseObj))

    fetchConfigParms().then(res => {
        expect(res.FLAG).toBe('Y');
        expect(res.LAST_UPDATED_USER).toBe('exa6777');
      })
  });