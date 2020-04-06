import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react' 
import DeletePage from './DeletePage'
import Context from '../contexts/Context'
import customerDataSet from '../../mock-utils/MockCustomerDetails'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const customerId = "EXA6777"
const customerInfo = customerDataSet.customerInfo 
const history = createMemoryHistory()

function getDeletePage(customerId, customerInfo, history) {
    return (
    		<Router history={history}>
            <Context.Provider value={{
                customerInfo: customerInfo,
                setCustomerInfo: jest.fn(),
                customerId: customerId,
                setCustomerId: jest.fn()
            }}>
            	<DeletePage />
    	 </Context.Provider>
    	 </Router>
    )
}

describe('DeletePage', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getDeletePage(customerId, customerInfo, history)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
        screen.getByTestId("deletePage")
    })
    it('renders delete header', () => {                        
        render(getDeletePage(customerId, customerInfo, history))
        screen.getByTestId("deleteHeader")                      
    })
    it('renders delete question', () => {                        
    	render(getDeletePage(customerId, customerInfo, history))
        screen.getByTestId("deleteQuestion")                      
    })
    it('renders customer id', () => {                        
    	render(getDeletePage(customerId, customerInfo, history))
        screen.getByTestId("deleteCustomerId")                      
    })
    it('renders yes button', () => {                        
    	render(getDeletePage(customerId, customerInfo, history))
        screen.getByTestId("yesButton")                      
    })
    it('renders no button', () => {                        
    	render(getDeletePage(customerId, customerInfo, history))
        screen.getByTestId("noButton")                      
    })
    it('renders inquiry page when no button has been clicked', async () => {                        
    	const { container } = render(getDeletePage(customerId, customerInfo, history))
        const noButton = await screen.getByTestId("noButton") //needs await bc of var assignment
        userEvent.click(noButton) // click the link to change route
        screen.findByText('Customer Info')             
    })
})