import React from 'react';
import {shallow} from 'enzyme';
import OtherLocations from './OtherLocations';

let component;

it('Makes sure the <OtherLocations/> renders without any issue', () => {

    component = shallow(<OtherLocations/>);
});

it('Makes sure the <OtherLocations/> renders title', () => {

    component = shallow(<OtherLocations otherLocationTitle="Secondary Locations"/>);
    expect(component.find("Collapsible").prop('trigger')).toBe("Secondary Locations");
});

it('Makes sure the <OtherLocations/> renders children', () => {

    component = shallow(<OtherLocations otherLocationTitle="Secondary Locations">E2-004-014</OtherLocations>);
    expect(component.find("Collapsible").children().text()).toBe("E2-004-014");
    expect(component.find("Collapsible").dive().find(".is-disabled").exists()).toBe(false);
});

it('Makes sure the <OtherLocations/> disable the component when no children is available', () => {

    component = shallow(<OtherLocations otherLocationTitle="Secondary Locations" />);
    expect(component.find("Collapsible").dive().find(".is-disabled").exists()).toBe(true);
});

it('Makes sure the <OtherLocations/> renders OtherLocations when available', () => {

    component = shallow(<OtherLocations otherLocationTitle="Overhead Locations">22-002</OtherLocations>);
    expect(component.find("Collapsible").dive().find(".is-disabled").exists()).toBe(false);
});