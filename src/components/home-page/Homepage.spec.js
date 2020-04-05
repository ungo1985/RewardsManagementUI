import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import Homepage from './Homepage'
import Context from '../contexts/Context'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'

const history = createMemoryHistory()

function getHomepage() {
    return (
    		<Router history={history}>
            <Context.Provider value={{
                searchedInput: '',
                setSearchedInput: jest.fn(),
                setCustomerInfo: jest.fn(),
                setPurchaseInfo: jest.fn(),
                setCustomerId: jest.fn()
            }}>
            	<Homepage/>
    	 </Context.Provider>
    	 </Router>
    )
}

describe('Homepage', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getHomepage()
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders Homepage title', () => {                        
        render(getHomepage())
        screen.getByTestId("titleTxt")                      
    })
    it('renders rewards image', () => {                        
        render(getHomepage())
        screen.getByTestId("rewardsImage")                      
    })
    it('renders homepage label', () => {                        
        render(getHomepage())
        screen.getByTestId("homepageLabel")                      
    })
    it('renders search box', () => {                        
        render(getHomepage())
        screen.getByTestId("searchBox")                      
    })
    it('renders daily report button', () => {                        
        render(getHomepage())
        screen.getByTestId("dailyReportButton")                      
    })
    it('renders add customer button', () => {                        
        render(getHomepage())
        screen.getByTestId("addCustomerButton")                      
    })
    it('renders Customer Form when add customer button has been clicked', async () => {                        
    	const { container } = render(getHomepage())
        const addCustomerButton = await screen.getByTestId("addCustomerButton") //needs await bc of var assignment
        userEvent.click(addCustomerButton) // click the link to change route
        screen.findByText('Customer Form')             // verify that the form route is loaded
    })
    it('renders Daily Report when daily purchase report button has been clicked', async () => {                        
    	const { container } = render(getHomepage())
        const dailyReportButton = await screen.getByTestId("dailyReportButton") //needs await bc of var assignment
        userEvent.click(dailyReportButton) // click the link to change route
        screen.findByText('Daily Purchase Report')             
    })
    it('renders Search Modal when search box has been clicked', async () => {                        
    	const { container } = render(getHomepage())
        const searchBox = await screen.getByTestId("searchBox") //needs await bc of var assignment
        userEvent.click(searchBox) // click the link to change route
        screen.findByText('Search')             
    })
})