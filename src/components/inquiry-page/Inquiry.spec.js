import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import Inquiry from './Inquiry'
import Context from '../contexts/Context'
import customerDataSet from '../../mock-utils/MockCustomerDetails'
import purchaseDataSet from '../../mock-utils/MockPurchaseDetails'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const customerInfo = customerDataSet.customerInfo 
const purchaseInfo = purchaseDataSet.purchaseInfo

const customerId = "EXA6777"
const history = createMemoryHistory()

function getInquiry(customerId, history) {
    return (
    		<Router history={history}>
            <Context.Provider value={{
                searchedInput: customerId,
                setSearchedInput: jest.fn(),
                customerInfo: customerInfo,
                setCustomerInfo: jest.fn(),
                customerId: customerId,
                setCustomerId: jest.fn(),
                purchaseInfo: purchaseInfo,
                setPurchaseInfo: jest.fn()
            }}>
            	<Inquiry customerId={customerId} customerInfo={customerInfo} purchaseInfo={purchaseInfo}/>
    	 </Context.Provider>
    	 </Router>
    )
}

describe('Inquiry', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getInquiry(customerId, history)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders inquiry page', () => {                        
        render(getInquiry(customerId, history))
        screen.getByTestId("inquiryPage")                      
    })
})