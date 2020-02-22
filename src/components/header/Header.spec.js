import React from 'react'
import {shallow,mount} from 'enzyme'
import Header from './Header'
import BackNavigator from "../back-navigator/BackNavigator";

let component;

it('Make sure <Header/> component is getting rendered without any issues', () => {

    component = shallow(<Header><div className="headerTxt">Inventory Prep</div> </Header>)
    expect(component).toMatchSnapshot();
} )


it('Make sure <Header/> component has black background color', () => {

    component = shallow(<Header />)
    console.log(component.find(".header").exists())
    expect(component.find(".header").exists())
} )

it('Make sure <Header/> is able to get the children text and pass it to the header', () => {

    component = shallow(<Header><div className="headerTxt">Inventory Prep</div></Header>)
    expect(component.find(".headerTxt").text()).toEqual("Inventory Prep")
} )

it('Make sure <Header/> is able to get the cancel text', () => {

    component = shallow(<Header><BackNavigator /><div className="headerTxt">Inventory Prep</div></Header>)
    expect(component.find("BackNavigator").exists())
    expect(component.find(".headerTxt").text()).toEqual("Inventory Prep")
} )


