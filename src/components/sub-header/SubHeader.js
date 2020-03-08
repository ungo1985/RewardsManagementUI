/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './SubHeader.css';
import deleteIcon from '../../images/deleteIcon.PNG';
import editIcon from '../../images/editIcon.PNG';
import { Link } from 'react-router-dom';
import Context from '../../components/contexts/Context';

class SubHeader extends Component {

    render() {
        return (
        <Context.Consumer>
        {(context) => (
            <div className="sku-div-header">
                <div className="sku-div-child">
                    <span className="sku-number-sub-header">{this.props.customerId}</span>
                </div>
                { this.props.hideGeoLocation ? null : 
                <div className="sku-div-child">
                       <Link to={{
                            pathname: '/form', state: {
                                    searchInput: this.context.searchedInput,
                                    customerId: this.context.customerId,
                                    customerInfo: this.context.customerInfo
                            }
                        }} className="">
                             <span className="edit-customer"><img src={editIcon}  alt="Edit Customer"/></span>
                        </Link>

                        <Link to="/delete">
                        <span className="delete-customer"><img src={deleteIcon}  alt="Delete Customer"/></span>
                        </Link>
                </div>}
            </div>
        )}
        </Context.Consumer>
        );
    }
}

  SubHeader.contextType = Context;
  export default SubHeader;