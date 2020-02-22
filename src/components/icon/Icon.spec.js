import React from 'react'
import {shallow} from 'enzyme'
import Icon from './Icon'

let component;
it('Makes sure the <Icon/> renders without any issue', () => {

    component = shallow(<Icon/>)
})