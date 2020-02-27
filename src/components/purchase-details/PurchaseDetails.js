import React, { Component } from 'react';
import './PurchaseDetails.css'
import { formatSkuNumber } from '../Util/util.js';
import Context from '../contexts/Context';
import { CLEARANCE, PENNY_SKU, ZERO_RETAIL, 
    THREE_DIGITS_OR_LESS, ENTER_QTY_BEFORE_PRINT, TOTAL_UNIT_EXCEEDED,
    TOTAL_PRICE_EXCEEDED_1, TOTAL_PRICE_EXCEEDED_2, 
    TOTAL_PRICE_THRESHOLD, PACK_SIZE_NOT_FOUND,
    PENNY_SKU_MESSAGE, ZERO_RETAIL_MESSAGE, MAMA_SKU, BABY_SKU,
     MAMA_SKU_MESSAGE, BABY_SKU_MESSAGE, TOTAL_UNIT_COUNT_THRESHOLD} from '../../models/Constants';
class PurchaseDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            purchaseInfo: null
        }

    }

    
    /**
     * This function used to set the default input qty 1 when scan carton
     * Also calculate default totalUnits and set it in state 
     */
    componentDidMount() {
    }



   

    render() {

        let purchaseObject = this.props.purchaseInfo;

        return (
            <div className={"sku-details-div " + (opacityEnabled ? 'opacity' : '')} >

                <div className="sku-div"><span className="sku-text">SKU:</span> <span
                    className="sku-number">{formatSkuNumber(this.props.sku_nbr)}</span></div>

                <div className="sku-details-desc">{skuDesc}
                </div>
                <div className="flexinline">
                    <div className={this.renderStatus(status)} id="sku-details-status">
                        <div className="sku-details-status-text">
                            {status}
                        </div>
                    </div>
                    <div className="sku-details-price">
                        {price}
                    </div>
                </div>

            </div>
        );


    }

   
}
PurchaseDetails.contextType = Context;
export default PurchaseDetails;