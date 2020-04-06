import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react' 
import DailyReport from './DailyReport'
import purchaseDataSet from '../../mock-utils/MockPurchaseDetails'

const purchaseInfo = purchaseDataSet.purchaseInfo

function getDailyReport(purchaseInfo) {
    return (
         <DailyReport purchaseInfo={purchaseInfo} />
    )
}

describe('DailyReport', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getDailyReport(purchaseInfo)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
        screen.getByTestId("dailyReportPage")
    })
    it('renders back navigator', () => {                        
        render(getDailyReport(purchaseInfo))
        screen.getByTestId("backNav")                      
    })
    it('renders daily report header', () => {                        
        render(getDailyReport(purchaseInfo))
        screen.getByTestId("dailyReportHeader")                      
    })
})