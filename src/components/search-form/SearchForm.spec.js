/* eslint-disable no-unused-expressions */
import { mount } from 'enzyme';
import React from 'react';
import SearchForm from './SearchForm'
import Context from '../contexts/Context';
import { log } from 'util';


let component, props, propsMock;
let historyMock = { push: jest.fn(), location: { pathname: "/" } };

beforeEach(() => {
    props = {
        showSearchModal: false,
        setStateForModal(value) {
            this.setState({
                showSearchModal: value
            });
        }
    }
})
describe('Testing SearchForm', () => {

    let setSearchedInput = jest.fn();
    propsMock = {
        setStateForModal: jest.fn()
    }
    document.body.innerHTML = '<div id="searchTextbox"></div>'

    it('Make sure <SearchForm/> component renders fine', () => {

        component = mount(<Context.Provider value={{ setSearchedInput }}>
            <SearchForm setStateForModal={propsMock.setStateForModal}></SearchForm>
        </Context.Provider>)

        expect(component.find('.searchboxDiv').exists()).toBeTruthy();
    })

    it('Testing the function enterInput on entering in the input field', () => {

        propsMock = {
            setStateForModal: jest.fn(),
            fetchSkuDetails: jest.fn(),
            searchInput: '161640'
        }

        component = mount(<Context.Provider value={{ setSearchedInput }}>
            <SearchForm history={historyMock} {...propsMock} setStateForModal={propsMock.setStateForModal}
                fetchSkuDetails={propsMock.fetchSkuDetails} searchInput={propsMock.searchInput}>
            </SearchForm>
        </Context.Provider>)
       
        const mockedEvent1 = {target: {value: '161640' }}
        const mockedEvent2 = {keyCode: 13}
        component.find('#searchTextbox').simulate('change', mockedEvent1);
        component.find('#searchTextbox').simulate('keyDown', mockedEvent2);
        const spySetSearchedInput = jest.spyOn(
            component.instance().context,
            "setSearchedInput");
        
        expect(component.instance().state.value).toBe('161640');
        expect(component.instance().state.buttonCSS).toBe('button_enable');
        expect(spySetSearchedInput).toHaveBeenLastCalledWith('161640');
    });
    it('Testing the function searchAfterClick', () => {

        propsMock = {
            setStateForModal: jest.fn(),
            fetchSkuDetails: jest.fn(),
            searchInput: '161640'
        }

        component = mount(<Context.Provider value={{ setSearchedInput }}>
            <SearchForm history={historyMock} {...propsMock} setStateForModal={propsMock.setStateForModal}
                fetchSkuDetails={propsMock.fetchSkuDetails} searchInput={propsMock.searchInput}>
            </SearchForm>
        </Context.Provider>)


        const spySearchAfterClick = jest.spyOn(component.instance(),'searchAfterClick');

        expect(component.find('#button_search').exists()).toBeTruthy();
        component.find('#button_search').simulate('click');
        expect(component.instance().state.showSearchModal).toBeFalsy();
        expect(spySearchAfterClick).toHaveBeenCalledOnce;
    });
});