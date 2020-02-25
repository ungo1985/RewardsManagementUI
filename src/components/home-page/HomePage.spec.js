/* eslint-disable no-unused-expressions */
import React from 'react'
import { mount } from 'enzyme'
import HomePage from './HomePage'
import Context from '../contexts/Context';
import PrinterContext from '../contexts/PrinterContext';
import { HOME_PAGE_LABEL, SCAN_OR_SELECT_PRINT } from '../../models/Constants';


let component;
let searchedInput = '161640'
let setSearchedInput = jest.fn();
let selectedPrinter = [];
let historyMock = {   push: jest.fn(),
                        location: 
                            {pathname: "/" ,state: {fromPage: "test"}} 
                    };

describe('Testing HomePage', () => {

    beforeEach(() => {
        let props = {
            location: { pathname: "/" },
        };
        component = mount(<Context.Provider value={{ searchedInput }}>
                            <PrinterContext.Provider value={{ selectedPrinter }}>
                                <HomePage {...props}  history={historyMock}></HomePage>
                            </PrinterContext.Provider>
                        </Context.Provider>)
    })

    it('Makes sure the <HomePage/> renders without any issue', () => {
        expect(component.find('.homePage').exists()).toBeTruthy();
        let search_Modal = component.find('.searchModal')
        expect(search_Modal.exists()).toBeFalsy();
    })

    it('Makes sure the <HomePage/> renders header component', () => {
        expect(component.childAt(0).find('#titleTxt').length).toEqual(1)
        expect(component.childAt(0).find('#titleTxt').text()).toBe('Inventory Prep')
    })

    it('Makes sure the <HomePage/> renders image ', () => {
        expect(component.find("#scan-image").length).toEqual(1)
    })


    it('Makes sure the <HomePage/> renders label ', () => {
        expect(component.find("#label").length).toEqual(1)
        expect(component.find("#label").text()).toBe(HOME_PAGE_LABEL);
    })

    it('Makes sure the <HomePage/> renders search text box', () => {
        const spySetStateForModal = jest.spyOn(
            component.instance(),
            'setStateForModal'
        );

        const spyRenderSearchModal = jest.spyOn(
            component.instance(),
            'renderSearchModal'
        );
        document.body.innerHTML = '<div id="searchTextbox"></div>'

        let search_txt_box = component.find('.search-text-box')
        expect(search_txt_box.exists()).toBeTruthy();
        search_txt_box.simulate('click');

        let search_Modal = component.find('.searchModal')
        expect(search_Modal.exists()).toBeTruthy();
        expect(spySetStateForModal).toHaveBeenLastCalledWith(true);
        expect(spyRenderSearchModal).toHaveBeenLastCalledWith(true);

    });

    it('Makes sure the <HomePage/> renders the print container', () => {
        let print_container = component.find('.printContainer')
        expect(print_container.exists()).toBeTruthy();
        expect(print_container.text()).toBe(SCAN_OR_SELECT_PRINT);
    });

    it('Makes sure the <HomePage/> renders the default constructor', () => {
        let home_page = component.instance().state
        expect(home_page.value).toBe("");
        expect(home_page.showSearchModal).toBeFalsy;
    });

    it('<HomePage/> calls the sku scan function', () => {

        let expectedPath = { pathname: './inquiry', state: { skuNbr: '161640' } };
        let props = {
            location: { pathname: "/" },
        };
        component = mount(<Context.Provider value={{ searchedInput, setSearchedInput }}>
            <PrinterContext.Provider value={{ selectedPrinter }}>
                <HomePage {...props} history={historyMock} />
            </PrinterContext.Provider>
        </Context.Provider>)

        // const spySetSearchedInput = jest.spyOn(
        //                             component.instance().context,
        //                             "setSearchedInput");
        component.instance().skuScanFxn('161640')

        //expect(spySetSearchedInput).toHaveBeenLastCalledWith('161640');
        //expect( historyMock.push ).toHaveBeenLastCalledWith(expectedPath);
    });

});
