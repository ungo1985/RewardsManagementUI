/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './SubHeader.css';
import deleteIcon from '../../images/deleteIcon.PNG';
import editIcon from '../../images/editIcon.PNG';
import barcodeIcon from '../../images/barcodeIcon.PNG';
import { Link } from 'react-router-dom';
import Context from '../../components/contexts/Context';

class SubHeader extends Component {

    render() {
        return (
        <Context.Consumer>
        {(context) => (
            <div className="customer-div-header">
                <div className="customer-div-child">
                    <span className="cust-id-sub-header" data-testid="custIdSubHeader">{this.props.customerId}</span>
                </div>
                <div className="customer-div-child">
                       <Link data-testid="editLink" to={{
                            pathname: '/form', state: {
                                    searchInput: this.context.searchedInput,
                                    customerId: this.context.customerId,
                                    customerInfo: this.context.customerInfo
                            }
                        }}>
                             <span className="edit-customer" data-testid="editIcon"><img src={editIcon}  alt="Edit Customer"/></span>
                        </Link>
                </div>
                <div className="customer-div-child">
                        <Link data-testid="deleteLink" to="/delete">
                        <span className="delete-customer" data-testid="deleteIcon"><img src={deleteIcon}  alt="Delete Customer"/></span>
                        </Link>
                </div>
                <div className="customer-div-child">
                        <Link data-testid="loyaltyLink" to="/loyalty">
                             <span className="loyalty-card" data-testid="loyaltyIcon"><img src={barcodeIcon}  alt="Loyalty Card"/></span>
                        </Link>
                </div>
            </div>
        )}
        </Context.Consumer>
        );
    }
}

  SubHeader.contextType = Context;
  export default SubHeader;