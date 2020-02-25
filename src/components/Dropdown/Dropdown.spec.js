/*eslint-disable */

import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Dropdown from './Dropdown'

let component;

let printerList = [{
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

describe('Testing Dropdown component', () => {

    it('Makes sure the Dropdown component renders without any issue', () => {
        component = mount(<Dropdown />)
        expect(component.find('.border').exists()).toBeTruthy();
    });

    it('Makes sure the Dropdown component renders when passing valid data', () => {

        component = mount(<Dropdown data={printerList} selectedPrinter={selectedPrinter}/>)

        expect(component.find('option')).toHaveLength(4);
        expect(component.find('select').props().value).toBe('rfprs007');
    });

    it('Makes sure the Dropdown component renders when passing invalid data', () => {

        let printerList = [];
        let selectedPrinter = []

        component = mount(<Dropdown data={printerList} selectedPrinter={selectedPrinter}/>)

        expect(component.find('option')).toHaveLength(1);
        expect(component.find('select').props().value).toBe('');

    });

    it('Test PrinterList dropdown change event', () => {
        let props = {
            data: [{
                printerUxQueueName:'rfprs001',
                printerDescription:'TECLBL1'}],
            history : {location: { pathname: "/inquiry" }},
            getInput : jest.fn()
        }
        let expectedPrinterId = [{
            printerUxQueueName:'rfprs001',
            printerDescription:'TECLBL1'}];

        component = mount(<Dropdown {...props}/>)

        const spyClickHandlerFn = jest.spyOn(
            component.instance(),
            'handlePrinterChange'
        );

        //Passing valid printer object
        const mockedEvent = { target: {value: 'rfprs001' } }
        component.find('select').simulate('change', mockedEvent);
        expect(spyClickHandlerFn).toHaveBeenCalledOnce;
        expect(component.instance().state.newSelectedPrinter).toStrictEqual(expectedPrinterId);    

        //Passing invalid printer object    
        const mockedEvent_2 = { target: {value: 'rfprs003' } }
        component.find('select').simulate('change', mockedEvent_2);
        expect(spyClickHandlerFn).toHaveBeenCalledOnce;
        expect(component.instance().state.newSelectedPrinter).toBeEmpty;    
    
    });
});
