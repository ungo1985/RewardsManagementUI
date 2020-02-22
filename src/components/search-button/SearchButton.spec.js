import React from 'react'
import {shallow} from 'enzyme'
import SearchButton from './SearchButton'

let component;

describe('Test Search Button component', () => {

    it('Make sure the <SearchButton/> contains a button', () =>{
        component = shallow(<SearchButton/>)
        expect(component.find('button').exists()).toBeTruthy();
    })

    it('Makes sure the <SearchButton/> renders without any issue', () => {

        component = shallow(<SearchButton/>)
        expect(component.find('.button_search').exists()).toBeTruthy();
        expect(component.find('.button_search').text()).toBe('Search');
    })

})