/*eslint-disable */

import React from 'react'
import { shallow, mount } from 'enzyme'
import CrudComponent from './CrudComponent'
import { createMemoryHistory } from 'history'

let component;
let props = {
    location: { pathname: "/" },
};
let historyMock = {   push: jest.fn(),
    location: 
        {pathname: "/" ,state: {fromPage: "test"}} 
};

describe('Test Button component', () => {


    beforeEach(() => {

    });    

    it('Makes sure the <CrudComponent/> will render without any issue', () => {
        const history = createMemoryHistory('/printer')
        let props = {
            location: { pathname: "/" },
        };
        component = shallow(<CrudComponent  {...props}  history={historyMock} />);
    expect(component).toMatchSnapshot();
    });

    it('Makes sure the <CrudComponent/> renders without any issue', () => {
        let props = {
            location: { pathname: "/" },
        };
        component = shallow(<CrudComponent  {...props}  history={historyMock} />)
        expect(component.find('.printContainer').exists()).toBeTruthy();
    })

    it('Test Change Printer Button click event', () => {
        let props = {
            location: { pathname: "/inquiry" },
        }; 
       const history = createMemoryHistory('/printer');
       component = shallow(
            <CrudComponent {...props} history={history} />
            )
        const spyClickHandlerFn = jest.spyOn(
            component.instance(),
            'handleSelectPrinterBtnClick'
        );
        component.find('.change-printer').simulate('click');
        expect(spyClickHandlerFn).toHaveBeenCalledOnce;
    });

    it('Test Print Label Button click event', () => {
        let props = {
            skuNbr: 161640,
            Context: {itemQuantity: 1, searchedInput: 161640},
            selectedPrinter: [{
                printerUxQueueName:'rfprs001',
                printerDescription:'TECLBL1'}],
            printLabelClicked: jest.fn(),
            handleLoading: jest.fn(),
            location: { pathname: "/inquiry" }, state: {fromPage: "test"}
        }
        component = mount(<CrudComponent {...props} history={historyMock}/>)

        const spyClickHandlerFn = jest.spyOn(
            component.instance(),
            'handlePrintLabelClicked'
        );

        component.find('.printerInfo').simulate('click');
        expect(spyClickHandlerFn).toHaveBeenCalledOnce;
    });
});