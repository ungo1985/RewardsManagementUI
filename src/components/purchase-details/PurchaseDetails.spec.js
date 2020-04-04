import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import userEvent from '@testing-library/user-event'
import PurchaseDetails from './PurchaseDetails'
import dataSet from '../../mock-utils/MockPurchaseDetails'         // we will use data from this dataSet to test our component

const purchaseInfo = dataSet.purchaseInfo

function getPurchaseDetails(purchaseInfo) {
    return (
    	<PurchaseDetails purchaseInfo={purchaseInfo}></PurchaseDetails>
    )
}

describe('PurchaseDetails', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn())
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders Customer Purchases title', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("CustomerPurchases")                      
    })
    it('renders Item title', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("item-title")                      
    })
    it('renders Price title', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("price-title")                      
    })
    it('renders Type title', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("type-title")                      
    })
    it('renders Purchased Date title', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("purchased-date-title")                      
    })
    it('renders Pre-Ordered title', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("pre-ordered-title")                      
    })
    it('renders an available item', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("availableItem1")                      
    })
    it('renders a price', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("price1")                      
    })
    it('renders a type', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("type1")                      
    })
    it('renders a purchased date', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("purchasedDate1")                      
    })
    it('renders a preOrderedFlag', () => {                        
        render(getPurchaseDetails(purchaseInfo, jest.fn(), jest.fn()))
        screen.getByTestId("preOrderedFlag1")                      
    })
})