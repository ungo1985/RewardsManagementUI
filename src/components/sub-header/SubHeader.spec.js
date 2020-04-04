import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import userEvent from '@testing-library/user-event'
import SubHeader from './SubHeader'
import Context from '../contexts/Context'
import dataSet from '../../mock-utils/MockCustomerDetails'         // we will use data from this dataSet to test our component
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const customerInfo = dataSet.customerInfo 

const customerId = "EXA6777"
const history = createMemoryHistory()
	
function getSubHeader(customerId, history) {
    return (
    		<Router history={history}>
            <Context.Provider value={{
                searchedInput: customerId,
                setSearchedInput: jest.fn(),
                customerInfo: customerInfo,
                setCustomerInfo: jest.fn(),
                customerId: customerId,
                setCustomerId: jest.fn()
            }}>
            	<SubHeader customerId={customerId}></SubHeader>
    	 </Context.Provider>
    	 </Router>
    )
}

describe('SubHeader', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getSubHeader(customerId, history)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders Customer ID', () => {                        
        render(getSubHeader(customerId, history))
        screen.getByTestId("custIdSubHeader")                      
    })
    it('renders edit icon', () => {                        
        render(getSubHeader(customerId, history))
        screen.getByTestId("editIcon")                      
    })
    it('renders delete icon', () => {                        
        render(getSubHeader(customerId, history))
        screen.getByTestId("deleteIcon")                      
    })
    it('renders loyalty icon', () => {                        
        render(getSubHeader(customerId, history))
        screen.getByTestId("loyaltyIcon")                      
    })
})