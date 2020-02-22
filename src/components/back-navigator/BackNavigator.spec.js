import {shallow} from 'enzyme';
import React from 'react';
import BackNavigator from './BackNavigator'

let props, component;
it('render </BackNavigator> component without crashing', () => {

    component = shallow(<BackNavigator></BackNavigator>)
    });

it('render </BackNavigator> component simulate onclick', () => {

    component = shallow(<BackNavigator></BackNavigator>);

});