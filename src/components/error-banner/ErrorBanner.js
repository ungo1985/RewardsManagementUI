import React, {Component} from 'react';
import './ErrorBanner.css'
import custNotFoundIcon from '../../images/custNotFoundIcon.png'

export default class ErrorBanner extends Component {
    
    
    getErrorMessage =(param) =>{
        
        let CUSTOMER_NOT_FOUND = "CUSTOMER ID # " + this.props.customerId + " not found. Enter valid Customer ID.",
            SERVICE_DOWN = "SERVICE IS UNAVAILABLE",
            REPORT_NOT_FOUND = "There are no customer purchases for today. Please try again tomorrow.";

        switch (param) {
            case "CUSTOMER_NOT_FOUND":
                return CUSTOMER_NOT_FOUND;
            case "REPORT_NOT_FOUND":
                return REPORT_NOT_FOUND;
            case "SERVICE_DOWN":
                return SERVICE_DOWN;
            default:
                return 'PLEASE_CONTACT_SUPPORT_TEAM';
        }
    }

    render() {
        
        return (
            <div className="customerNotFoundDiv" style={this.props.style}>
                <div className="customerNotFoundIconDiv">
                    <img className='customerNotFoundIcon' src={custNotFoundIcon} alt="Customer Not Found"/>
                </div>
                <div className="customerNotFoundText">{this.getErrorMessage(this.props.message)}</div>
            </div>
        );
    }
}
