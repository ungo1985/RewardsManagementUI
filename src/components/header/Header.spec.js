import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import Header from './Header'

const text = "Customer Info"

function getHeader(text) {
    return (
    	<Header>
            <div className="headerTxt">{text}</div>
        </Header>
    )
}

describe('Header', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getHeader(text)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders Header Text', () => {                        
        render(getHeader(text))
        screen.findByText(text)                      
    })
})