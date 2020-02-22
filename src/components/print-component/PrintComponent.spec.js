/*eslint-disable */

import React from 'react'
import { shallow, mount } from 'enzyme'
import PrintComponent from './PrintComponent'
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

    it('Makes sure the <PrintComponent/> will render without any issue', () => {
        const history = createMemoryHistory('/printer')
        let props = {
            location: { pathname: "/" },
        };
        component = shallow(<PrintComponent  {...props}  history={historyMock} />);
    expect(component).toMatchSnapshot();
    });

    it('Makes sure the <PrintComponent/> renders without any issue', () => {
        let props = {
            location: { pathname: "/" },
        };
        component = shallow(<PrintComponent  {...props}  history={historyMock} />)
        expect(component.find('.printContainer').exists()).toBeTruthy();
    })

    it('Test Change Printer Button click event', () => {
        let props = {
            location: { pathname: "/product" },
        }; 
       const history = createMemoryHistory('/printer');
       component = shallow(
            <PrintComponent {...props} history={history} />
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
            itemContext: {itemQuantity: 1, searchedInput: 161640},
            selectedPrinter: [{
                printerUxQueueName:'rfprs001',
                printerDescription:'TECLBL1'}],
            printLabelClicked: jest.fn(),
            handleLoading: jest.fn(),
            location: { pathname: "/product" }, state: {fromPage: "test"}
        }
        component = mount(<PrintComponent {...props} history={historyMock}/>)

        const spyClickHandlerFn = jest.spyOn(
            component.instance(),
            'handlePrintLabelClicked'
        );

        component.find('.printerInfo').simulate('click');
        expect(spyClickHandlerFn).toHaveBeenCalledOnce;
    });
});