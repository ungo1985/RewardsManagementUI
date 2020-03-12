import React, { Component } from 'react';
import './PurchaseDetails.css'
import Context from '../contexts/Context';
import ItemPurchases from './../item-purchases/ItemPurchases';
class PurchaseDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            purchaseInfo: this.props.purchaseInfo
        }

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

        let opacityEnabled = (this.props.serviceDown || this.props.customerNotFound);

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