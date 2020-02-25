/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import PrinterPage from './PrinterPage';
import PrinterContext  from '../contexts/PrinterContext'
import { mount } from 'enzyme';
import React from 'react';
import * as pairWirelessDevice from '../Util/bluetooth-util';

const historyMock = { push: jest.fn() };

const historyBackMock = { push: jest.fn(),
                        goBack: jest.fn() , 
                        location: {pathname: "/printers" , state: {fromPage: "test"}} 
                    };

const setSelectedPrinter = jest.fn()

let props = {
    location: { pathname: "/" },
};

let thermalPrinterList = [{
    printerUxQueueName: 'rfprs001',
    printerDescription: 'TECLBL1'
},
{
    printerUxQueueName: 'rfprs007',
    printerDescription: 'TECLBL7'
},
{
    printerUxQueueName: 'rfprs010',
    printerDescription: 'TECLBL10'
}];

let selectedPrinter = [{
    printerUxQueueName: 'rfprs007',
    printerDescription: 'TECLBL7'
}]

it('Make sure <PrinterPage/> component renders with null printers', () => {

    const thermalPrinterList = [];

    let component = mount(<PrinterContext.Provider value={{thermalPrinterList}}>
                        <PrinterPage {...props}  history={historyBackMock}></PrinterPage>
                    </PrinterContext.Provider>)

    expect(component.find('.printers-page').exists()).toBeTruthy();
    expect(component.find('select').props().value).toBe('');
    expect(component.find('option')).toHaveLength(1);
})

it('Make sure <PrinterPage/> component renders fine with valid printers', () => {

    let component = mount(<PrinterContext.Provider value={{selectedPrinter, thermalPrinterList }}>
                        <PrinterPage {...props}  history={historyBackMock}></PrinterPage>
                    </PrinterContext.Provider>)
    
    expect(component.find('.printers-page').exists()).toBeTruthy();
    expect(component.find('select').props().value).toBe('rfprs007');
    expect(component.find('option')).toHaveLength(4);

})


it('Make sure <PrinterPage/> component renders with default constructor', () => {
    let emptyArray = [];
    selectedPrinter = emptyArray;
    let component = mount(<PrinterContext.Provider value={{selectedPrinter, thermalPrinterList }}>
                        <PrinterPage {...props}  history={historyBackMock}></PrinterPage>
                    </PrinterContext.Provider>)

    expect(component.instance().state.thermalPrinterList).toStrictEqual(thermalPrinterList);
    expect(component.instance().state.selectedPrinter).toStrictEqual(emptyArray);

})

it('Make sure <PrinterPage/> component invokes handlePrinterSelectionInput method successfully', () => {

    let component = mount(<PrinterContext.Provider value={{setSelectedPrinter}}>
                        <PrinterPage  {...props} history={historyMock}></PrinterPage>
                    </PrinterContext.Provider>)
    
    const spyClickHandlerFn = jest.spyOn(
        component.instance(),
        'handlePrinterSelectionInput'
    );
    expect(component.find('.printers-page').exists()).toBeTruthy();
    component.find("Dropdown").prop('getInput')('foo')
    expect(spyClickHandlerFn).toHaveBeenCalledOnce;
    
})

it('Make sure <PrinterPage/> component invokes handlePrinterChange method successfully', () => {

    let props = {
        location: { pathname: "/inquiry" },
    };

    let component = mount(<PrinterContext.Provider value={{setSelectedPrinter}}>
                        <PrinterPage  {...props} history={historyBackMock}></PrinterPage>
                    </PrinterContext.Provider>)
    
    const spyClickHandlerFn = jest.spyOn(
        component.instance(),
        'handlePrinterChange'
    );
  
    let prnt_btn = component.find('.add_printer_btn')
    expect(prnt_btn.exists()).toBeTruthy();
    prnt_btn.simulate('click');
    expect(spyClickHandlerFn).toHaveBeenCalledOnce;
    expect(historyBackMock.push).toHaveBeenCalled();
    
});

it('Make sure <PrinterPage/> component invokes handlePrinterChange method successfully', () => {

    let component = mount(<PrinterContext.Provider value={{setSelectedPrinter}}>
                        <PrinterPage {...props} history={historyMock}></PrinterPage>
                    </PrinterContext.Provider>)
    
    const spyPairWirelessDeviceFn = jest.spyOn(pairWirelessDevice, 'pairWirelessDevice');
    component.instance().skuScanFxn('AC3FA4F19AF5');

    expect( spyPairWirelessDeviceFn ).toHaveBeenCalled();
});
