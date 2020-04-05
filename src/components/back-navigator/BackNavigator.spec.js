import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import userEvent from '@testing-library/user-event'
import BackNavigator from './BackNavigator'

const historyMock = {replace: jest.fn()}

function getBackNavigator() {
    return (
    		<BackNavigator history={historyMock}/>
    )
}

describe('BackNavigator', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getBackNavigator()
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders Homepage Text', () => {                        
        render(getBackNavigator())
        screen.getByTestId("backNavTitle")                      
    })
    it('renders homepage when back navigator has been clicked', async () => {      
    	const onBackClick = jest.fn()
    	const { container } = render(getBackNavigator())
        const backButton = await screen.getByTestId("backNavLink") 
        userEvent.click(backButton) 
        screen.findByText('Rewards Management System')             
    })
})