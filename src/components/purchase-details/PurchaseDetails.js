import React, { Component } from 'react';
import './PurchaseDetails.css'
import Context from '../contexts/Context';
import ItemPurchases from './../item-purchases/ItemPurchases';
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
            purchaseInfo: this.props.purchaseInfo
        }

    }

    
    /**
     * This function used to set the default input qty 1 when scan carton
     * Also calculate default totalUnits and set it in state 
     */
    componentDidMount() {
    }


    /**
     * This Function is used to render purchases
     * @returns {*}
     */
    renderPurchases = (purchaseInfo) => {
            return (purchaseInfo) ? (
                    <React.Fragment> <div className="purchase-titles">
                                        <span className="item-title">Item</span>
                                        <span className="price-title">Price</span>
                                        <span className="type-title">Type</span>
                                        <span className="purchased-date-title">Purchased Date</span>
                                        <span className="pre-orderd-title">PreOrdered?</span>
                                    </div>
                        {this.framePurchases(purchaseInfo) } </React.Fragment>): null;
    }

    /**
     * This Function is used to create location tag for other locations [eg: OHM, Secondary locations, Picked/Staged Location].
     * If there are three locations then this method will get called 3 times.
     * renderLocationsList is validating the locations not to be null or undefined and call this method for each locations.
     * Also this method will show the location that comes from backend, if not null or undefined.
     * There is no specific format given by UX at this point.
     * @param locations
     */
    framePurchases = (purchaseInfo) => {

            let items = purchaseInfo.purchasedItems;
            return items.map(function (items, index) {
                let availableItem = purchaseInfo.purchasedItems[index].availableItem, price = purchaseInfo.purchasedItems[index].price,
                type = purchaseInfo.purchasedItems[index].type, purchasedDate = purchaseInfo.purchasedItems[index].purchasedDate,
                preOrderedFlag = purchaseInfo.purchasedItems[index].preOrderedFlag;
                return (<div key={index} id={'overheadLocations' + index} className="overhead-locations">
                    <span className="aisleBay">{availableItem}</span>
                    <span className="quantity">{price}</span>
                    <span className="tagID">{type}</span>
                    <span className="tagID">{purchasedDate}</span>
                    <span className="tagID">{preOrderedFlag}</span>
                </div>);
            });
        

    }   

    render() {

        let purchaseObject = this.props.purchaseInfo;

        let opacityEnabled = this.props.errorBox && (!this.props.errorBox.printError);

        return (
            <div className={"purchase-details-div " + (opacityEnabled ? 'opacity' : '')} >

                    <ItemPurchases purchasesTitle="Customer Purchases" isOpen={false} id="CustomerPurchases">
                        {this.renderPurchases(purchaseObject)}
                    </ItemPurchases>  

            </div>
        );


    }

   
}
PurchaseDetails.contextType = Context;
export default PurchaseDetails;