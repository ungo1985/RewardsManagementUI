/**
 * Created by txs6533 on 6/22/18.
 */

import React, {Component} from 'react';
import './SkuNotFound.css'
import skuNotFoundIcon from '../../../images/skuNotFoundIcon.png'

export default class SkuNotFound extends Component {
    
    
    getErrorMessage(param){
        
        let SKU_NOT_FOUND = "SKU # " + this.props.sku_nbr + " not found. Scan or enter valid SKU number.",
            SERVICE_DOWN = "SERVICE IS UNAVAILABLE",
            PRINTER_NOT_SELECTED = "PRINTING FAILED - Printer Not Selected - Please Select a Printer",
            PRINT_ERROR= "PRINTING FAILED - Please try again or select another printer",
            PRINTER_PAIRING_FAILED= "INVALID PRINTER SCANNED";

        switch (param) {
            case "SKU_NOT_FOUND":
                return SKU_NOT_FOUND;
            case "SERVICE_DOWN":
                return SERVICE_DOWN;
            case "PRINT_ERROR":
                return PRINT_ERROR;
            case "PRINTER_NOT_SELECTED":
                return PRINTER_NOT_SELECTED;
            case "PRINTER_PAIRING_FAILED":
                return PRINTER_PAIRING_FAILED;
            default:
                return 'PLEASE_CONTACT_SUPPORT_TEAM';
        }
    }

    render() {
        
        return (
            <div className="skuNotFoundDiv" style={this.props.style}>
                <div className="skuNotFoundIconDiv">
                    <img className='skuNotFoundIcon' src={skuNotFoundIcon} alt="SKU Not Found"/>
                </div>
                <div className="skuNotFoundText">{this.getErrorMessage(this.props.message)}</div>
            </div>
        );
    }
}
