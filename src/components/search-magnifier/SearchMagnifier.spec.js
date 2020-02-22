import {shallow} from 'enzyme';
import React from 'react';
import SearchMagnifier from './SearchMagnifier'


let component;
it('Make sure <SearchMagnifier/> component renders fine', () => {

    component = shallow(<SearchMagnifier/>)
})

it('Make sure <SearchMagnifier/> component contains search icon', () => {

    component = shallow(<SearchMagnifier/>)
    console.log(component.find(".icon_search").length);
    expect(component.find(".icon_search").length).toEqual(1)
})