import Scanner from './Scan';

describe('getScans function', () => {

    let mockCallback, mockDatawedge, mockData;
    
    it('executes the callback function when a scanned value is returned', () => {
        mockCallback =  jest.fn( (returnedValue) => {
            console.log('Test completed', returnedValue);
        });
       
        Scanner.getScans(mockCallback);
        
        mockData = {
            barcode: '98070000161640'
        };
        let event = new Event('deviceready');
        
        mockDatawedge = {
            start: () => {},
            registerForBarcode: () => Scanner.fnRegister(mockData)
        };
        global.window.datawedge = mockDatawedge;
        
        document.dispatchEvent(event);
        
        expect(mockCallback).toHaveBeenCalled();
    });

    it('executes the fnGetBarcode method is should returned skuNumber', () => {
        mockData = {
            barcode: '98070000161640'
        };

        let result = Scanner.fnGetBarcode(mockData);
        
        expect(result).toBe('0000161640');
    });

    it('fnGetBarcode should log a console error if there is no barcode in the scanned data', () => {
        mockData = {};

        let result = Scanner.fnGetBarcode(mockData);
        
        expect(result).toBeUndefined();
    });

    it('returns the full barcode if it does not start with the SKU prefix', () => {
        mockData = {
            barcode: '88880000161640'
        };

        let result = Scanner.fnGetBarcode(mockData);
        
        expect(result).toBe('88880000161640');
    });

    it('fnRegister method called or not while calling fnDeviceReady', () => {
        let fnRegisterReady = jest.spyOn(Scanner, 'fnRegister');
        let event = new Event('deviceready');
        
        mockDatawedge = {
            start: () => {},
            registerForBarcode: () => Scanner.fnRegister(mockData)
        };
        global.window.datawedge = mockDatawedge;
        
        document.dispatchEvent(event);
        
        expect(fnRegisterReady).toHaveBeenCalled();
    });

    it('fnRegister should fail silently when data does not contain a barcode', () => {
        let data = {};
        let result = Scanner.fnRegister(data);
        
        expect(result).toBeUndefined();
    });

    it('fnRegister should fail silently when the callback is not defined', () => {
        let data = { barcode: '9807test'};
        let result = Scanner.fnRegister(data);
        
        expect(result).toBeUndefined();
    });

    it('fnDeviceReady should invoke Datawedge start & registerForBarcode', () => {
        mockDatawedge = {
            start: jest.fn(() => {}),
            registerForBarcode: jest.fn(() => {})
        };
        global.window.datawedge = mockDatawedge;

        Scanner.fnDeviceReady();

        expect(mockDatawedge.start.mock.calls.length).toBe(1);
        expect(mockDatawedge.registerForBarcode.mock.calls.length).toBe(1);
    });

    it('fnDeviceReady should NOT invoke Datawedge start & registerForBarcode', () => {
        global.window.datawedge = null;
        let result = Scanner.fnDeviceReady();

        expect(result).toBeUndefined();
    });

});