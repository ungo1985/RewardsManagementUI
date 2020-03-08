/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './SubHeader.css';
import deleteIcon from '../../images/deleteIcon.PNG';
import editIcon from '../../images/editIcon.PNG';
import { Link } from 'react-router-dom';

export default class SubHeader extends Component {

    render() {
        return (
            <div className="sku-div-header">
                <div className="sku-div-child">
                    <span className="sku-number-sub-header">{this.props.customerId}</span>
                </div>
                { this.props.hideGeoLocation ? null : 
                <div className="sku-div-child">
                        <Link to="/form">
                            <span className="edit-customer"><img src={editIcon}  alt="Edit Customer"/></span>
                        </Link>
                        <Link to="/delete">
                        <span className="delete-customer"><img src={deleteIcon}  alt="Delete Customer"/></span>
                        </Link>
                </div>}
            </div>
        );
    }
}