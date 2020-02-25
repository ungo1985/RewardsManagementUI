import {shallow, mount} from 'enzyme';
import React from 'react';
import SearchModal from './SearchModal';
import Context from '../contexts/Context';
import { RECENT_SEARCHES } from '../../models/Constants';

let component;

describe('Testing SearchModal component', () => {

    let setSearchedInput = jest.fn();
    let propsMock = {
        setStateForModal: jest.fn(),
        fetchSkuDetails: jest.fn()
    }

    document.body.innerHTML = '<div id="searchTextbox"></div>'

    it('Make sure <SearchModal/> component renders fine', () => {

        component = mount(<Context.Provider value={{ setSearchedInput }}>
            <SearchModal fetchSkuDetails={propsMock.fetchSkuDetails} setStateForModal={propsMock.setStateForModal}></SearchModal>
        </Context.Provider>)
        expect(component.find('.searchModal').exists()).toBeTruthy();
        //expect(component.find('.label').exists()).toBeTruthy();
        // expect(component.find('.label').text()).toBe(RECENT_SEARCHES);
        // expect(component.find('hr').exists()).toBeTruthy();
    })
})
