import React from 'react';
import {shallow} from 'enzyme';
import Price from './Price';
import { render } from 'enzyme';


describe ('Price component test', () => {

    let component;
    
    it('Verify price element exists', () => {
        component = shallow(<Price/>)
        expect(component.find(".price-div")).toHaveLength(1);
    })

    it('Verify current price element exists', () => {
        component = shallow(<Price/>)
        expect(component.find(".price")).toHaveLength(1);
    })

    it('Verify previous price div element exists', () => {
        component = shallow(<Price/>)
        expect(component.find(".previousPrice")).toHaveLength(1);
    })

    it('Validate props of Price component', () => {
        component = shallow(<Price retailPrice="543.65" uom="EA" previousPrice="600.99"/>);
        console.log(component.instance().props.uom);
        expect(component.instance().props.uom).toBe("EA");
        expect(component.instance().props.retailPrice).toBe("543.65");
        expect(component.instance().props.previousPrice).toBe("600.99");

    })

})