import React, { Component } from 'react';
import './CustomerDetails.css'
//import {  } from '../Util/util.js';
import Context from '../contexts/Context';
import { CLEARANCE, PENNY_SKU, ZERO_RETAIL, 
    THREE_DIGITS_OR_LESS, ENTER_QTY_BEFORE_PRINT, TOTAL_UNIT_EXCEEDED,
    TOTAL_PRICE_EXCEEDED_1, TOTAL_PRICE_EXCEEDED_2, 
    TOTAL_PRICE_THRESHOLD, PACK_SIZE_NOT_FOUND,
    PENNY_SKU_MESSAGE, ZERO_RETAIL_MESSAGE, MAMA_SKU, BABY_SKU,
     MAMA_SKU_MESSAGE, BABY_SKU_MESSAGE, TOTAL_UNIT_COUNT_THRESHOLD} from '../../models/Constants';
class CustomerDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            customerInfo: this.props.customerInfo
        }
    }

    
    /**
     * This function used to set the default input qty 1 when scan carton
     * Also calculate default totalUnits and set it in state 
     */
    componentDidMount() {

    }
  

   

    render() {

        let custInfo = this.props.customerInfo;

        let opacityEnabled = this.props.errorBox && (!this.props.errorBox.printError);

        return (
            <div className={"customer-details-div " + (opacityEnabled ? 'opacity' : '')} >

                <div>
                <span className="sku-number">Name: </span><div className="sku-details-desc">{custInfo.firstName} {custInfo.lastName}</div>
                <span className="sku-number">Address: </span><div className="sku-details-desc">{custInfo.streetAddress} <br/> {custInfo.city} {custInfo.state} {custInfo.zipCode}</div>
                <span className="sku-number">Birthday: </span><div className="sku-details-desc">{custInfo.birthday}</div>
                <span className="sku-number">Points: </span><div className="sku-details-desc">{custInfo.points}</div>
                <span className="sku-number">Gold Status: </span><div className="sku-details-desc">{custInfo.goldStatusFlag}</div>
                </div>

            </div>
        );


    }

   
}
CustomerDetails.contextType = Context;
export default CustomerDetails;