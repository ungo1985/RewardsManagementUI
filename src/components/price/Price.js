import React, {Component} from 'react';
import './Price.css'

class Price extends Component {

    constructor(props) {
        super(props);
        this.renderPrice = this.renderPrice.bind(this);
        this.renderPreviousPrice = this.renderPreviousPrice.bind(this);
    }
    
    renderPreviousPrice(previousRetailPrice, tempUom){
        if(previousRetailPrice !== "0"){
        	return <div className="previousPrice"><span>Was ${previousRetailPrice} /{tempUom}</span></div>
        }
    }


    renderPrice() {

        let tempUom = "--";
        let currentRetailPrice = this.props.retailPrice;
        let uom = this.props.uom;
        let previousRetailPrice = this.props.previousPrice;

        if (uom && uom.toString() !== "") {
            tempUom = uom;
        }

        if (uom === 'EA') {
            tempUom = 'each';
        }

        return (
            <div className="price-div">
                <div className="price"><span className="dollarAmount">${currentRetailPrice}</span> <span>/{tempUom}</span></div>
                {this.renderPreviousPrice(previousRetailPrice, tempUom)}
            </div>
        );

    };

    render() {
        return(
            <div>
                {this.renderPrice()}
            </div>
        );
    }

}

export default Price;