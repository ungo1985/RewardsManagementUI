import React, { Component } from 'react';
import './CustomerDetails.css'
import Context from '../contexts/Context';
class CustomerDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            customerInfo: this.props.customerInfo
        }
    }

    render() {

        let custInfo = this.props.customerInfo;

        let opacityEnabled = (this.props.serviceDown || this.props.customerNotFound);

        return (
            <div className={"customer-details-div " + (opacityEnabled ? 'opacity' : '')} >

                <div>
                <span className="sku-number">Name: </span><div className="sku-details-desc" data-testid="customerName">{custInfo.firstName} {custInfo.lastName}</div>
                <span className="sku-number">Address: </span><div className="sku-details-desc" data-testid="streetAddress">{custInfo.streetAddress} <br/> {custInfo.city} {custInfo.state} {custInfo.zipCode}</div>
                <span className="sku-number">Birthday: </span><div className="sku-details-desc" data-testid="birthday">{custInfo.birthday}</div>
                <span className="sku-number">Points: </span><div className="sku-details-desc" data-testid="points">{custInfo.points}</div>
                <span className="sku-number">Gold Status: </span><div className="sku-details-desc" data-testid="goldStatusFlag">{custInfo.goldStatusFlag}</div>
                </div>

            </div>
        );


    }

   
}
CustomerDetails.contextType = Context;
export default CustomerDetails;