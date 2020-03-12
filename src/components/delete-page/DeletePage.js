import React, { Component } from 'react';
import './DeletePage.css';
import Header from './../header/Header';
import { deleteCustomer } from '../../api/endpoints';
import Context from '../../components/contexts/Context';
import { Link } from 'react-router-dom';
import {
    RESOURCE_NOT_AVAILABLE_CODE
} from '../../models/Constants';
import ResponseHelper from '../Util/ResponseHelper.js';

class DeletePage extends Component{

    removeCustomer = () => {
        let customerId = this.context.customerInfo.customerId;
        console.log("removeCustomer: " + customerId);
        deleteCustomer(customerId).then(data =>{
                            let custId = data.customerId;
                            let errorObject = data.errorResponse;

                            console.log("custId: " + JSON.stringify(custId));
                            console.log("errorResponse: " + JSON.stringify(errorObject));

                            if(errorObject){
                                if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                                    this.setState({
                                        customerNotFound: true,
                                        serviceDown: false,
                                        isLoading: false
                                    });
                                }
                                else{
                                    this.setState({
                                        customerNotFound: false,
                                        serviceDown: true,
                                        isLoading: false
                                    });
                                }
                            }
                            else{
                                console.log("DeletePage Success");
                                this.context.setSearchedInput("");

                                this.props.history.push({pathname: '/', state:{
                                    value: '',
                                    showSearchModal: false,
                                    fromPage: ''
                                }})
                            }
                        }).catch(error => {
                        console.log("ERROR PROCESSING CUSTOMER" + error.message);
                        try {
                            let response = JSON.parse(error.message);
                            let errorResponse = response.errorResponse;
                            let helper = new ResponseHelper();
                            this.handleError(errorResponse, helper);
                             this.setState({
                                serviceDown: true,
                                isLoading: false
                            });
                        }
                        catch (err) {
                            this.setState({
                                serviceDown: true,
                                isLoading: false
                            });
                        }
                        });
    }

	render(){
        return(
         <Context.Consumer>
         {(context) => (
            <div className="delete-page">
                    <Header>
                        <div className="headerTxt">Delete Customer</div>
                        <div>&nbsp;</div>
                    </Header>
                <div className="delete_label">Are you sure you would like to delete this customer?</div>
                <div className="delete_label">{context.customerInfo.customerId}</div>
                <div><button id="delete-button" className="delete-button button-enable" onClick={this.removeCustomer}>YES</button></div>
                <Link to="/inquiry">
                    <button id="delete-button" className="delete-button button-disable">NO</button>
                </Link>
            </div>
            )}
         </Context.Consumer>
        );
    }

}
DeletePage.contextType = Context;
export default DeletePage;