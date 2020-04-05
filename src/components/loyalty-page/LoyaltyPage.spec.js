import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import LoyaltyPage from './LoyaltyPage'
import Context from '../contexts/Context'
import customerDataSet from '../../mock-utils/MockCustomerDetails'
import goldCustomerDataSet from '../../mock-utils/MockGoldCustomerDetails'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const customerId = "EXA6777"
const goldCustomerId = "PXN6778"
const customerInfo = customerDataSet.customerInfo 
const goldCustomerInfo = goldCustomerDataSet.customerInfo
const history = createMemoryHistory()

function getLoyaltyPage(customerId, customerInfo, history) {
    return (
    		<Router history={history}>
            <Context.Provider value={{
                customerInfo: customerInfo,
                setCustomerInfo: jest.fn(),
                customerId: customerId,
                setCustomerId: jest.fn()
            }}>
            	<LoyaltyPage />
    	 </Context.Provider>
    	 </Router>
    )
}

describe('LoyaltyPage', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getLoyaltyPage(customerId, customerInfo, history)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
        screen.getByTestId("loyaltyPage")
    })
    it('renders back navigator', () => {                        
        render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("backNav")                      
    })
    it('renders Loyalty page header', () => {                        
    	render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("loyaltyHeader")                      
    })
    it('renders loyalty card', () => {                        
    	render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("loyaltyCard")                      
    })
    it('renders customer name and message', () => {                        
        render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("customerName")                      
    })
    it('renders customer ID', () => {                        
    	render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("customerId")                      
    })
    it('renders rewards label', () => {                        
    	render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("rewardsLabel")                      
    })
    it('renders GO BACK button', () => {                        
    	render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("backButton")                      
    })
    it('renders non gold member rewards', () => {                        
    	render(getLoyaltyPage(customerId, customerInfo, history))
        screen.getByTestId("nonGoldMessage")                      
    })
    it('renders gold member rewards', () => {                        
    	render(getLoyaltyPage(goldCustomerId, goldCustomerInfo, history))
        screen.getByTestId("goldMessage")                      
    })
    it('renders new member empty message', () => {                        
    	render(getLoyaltyPage('', null, history))
        screen.getByTestId("newMemberMessage")                      
    })
})