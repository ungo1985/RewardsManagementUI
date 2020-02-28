import React from 'react';
import {shallow} from 'enzyme';
import SubHeader from './SubHeader';

let component;

it('Make sure <SubHeader/> component is getting rendered without any issues', () => {

    component = shallow(<SubHeader/>);
    expect(component.exists()).toBe(true);
} );

it('Make sure <SubHeader/> component has white background color', () => {

    component = shallow(<SubHeader />);
    expect(component.find(".sku-div-header").exists()).toBe(true);
} );

it('Make sure <SubHeader/> is able to get the children text and pass it to the header', () => {

    component = shallow(<SubHeader skuNbr="161640"  />);
    console.log(component.find(".sku-number-sub-header").text());
    expect(component.find(".sku-number-sub-header").text()).toEqual("0000-161-640");
} );