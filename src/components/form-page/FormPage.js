import React, { Component } from 'react';
import './FormPage.css';
import Header from './../header/Header';
import BackNavigator from "../back-navigator/BackNavigator";
import { postCustomer } from '../../api/endpoints';
import {
    RESOURCE_NOT_AVAILABLE_CODE, SERVICE_UNAVAILABLE_CODE
} from '../../models/Constants';
import ResponseHelper from '../Util/ResponseHelper.js';
import Context from '../../components/contexts/Context';

class FormPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            customerId: this.props.customerId,
            customerInfo: this.props.customerInfo,
            isLoading: false,
            showSearchModal: false,
            serviceDown: false,
            customerNotFound: false,
            errorFlag: false,
            errorBox: null
        }

       // this.renderErrorMessage = this.renderErrorMessage.bind(this);
       // this.setErrorFlag = this.setErrorFlag.bind(this);
       // this.handleLoading = this.handleLoading.bind(this)
    }

    processCustomer = () => {
        console.log("processCustomer: " + document.getElementById("firstName").value);

        let customerId = this.props.customerId;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let streetAddress = document.getElementById("streetAddress").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let zipCode = document.getElementById("zipCode").value;
        let birthday = document.getElementById("birthday").value;
        let goldStatusFlag = "N";
        let points = 0;

        if(this.props.customerInfo){
            goldStatusFlag = this.props.customerInfo.goldStatusFlag;
            points = this.props.customerInfo.points;
        }

       // var inputType = validateUserInput(input);

        //if(inputType === VIP_ID){
            postCustomer(customerId, firstName, lastName, streetAddress, city, state, zipCode, birthday, goldStatusFlag, points).then(data =>{
                let customerObject = data.customerInfo;
                let purchaseObject = data.purchaseInfo;
                let errorObject = data.errorResponse;

                console.log("customerInfo: " + JSON.stringify(data.customerInfo));
                console.log("purchaseInfo: " + JSON.stringify(data.purchaseInfo));
                console.log("errorResponse: " + JSON.stringify(data.errorResponse));

                if(errorObject){
                    if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                        // To Store local Error Message in Context
                        const errorBox = { serviceDown: this.state.serviceDown, customerNotFound: true };
                        this.setState({
                            errorBox: errorBox,
                            customerNotFound: true,
                            serviceDown: false,
                            isLoading: false
                        });
                       // this.context.setErrorBox(errorBox);
                       // this.context.setSearchedInput(input);
                    }
                    else{
                         // To Store local Error Message in Context
                        const errorBox = { serviceDown: true, customerNotFound: this.state.customerNotFound };
                        this.setState({
                            errorBox: errorBox,
                            customerNotFound: false,
                            serviceDown: true,
                            isLoading: false
                        });
                        //this.context.setErrorBox(errorBox);
                        //this.context.setSearchedInput(input);
                    }
                }
                else{
                    console.log("FormPage Success");
                    this.context.setSearchedInput(data.customerId);
                    this.context.setCustomerInfo(customerObject);
                    this.context.setPurchaseInfo(purchaseObject);
                    this.context.setErrorBox(null);

                    this.setState(
                        {
                            isLoading: false,
                            customerId: data.customerId,
                            customerInfo: customerObject,
                            serviceDown: false,
                            errorBox: null
                        });

                    this.props.history.push({pathname: '/inquiry', state:{
                        searchInput: data.customerId,
                        customerId: data.customerId,
                        customerInfo: customerObject,
                        purchaseInfo: purchaseObject,
                        isLoading: false
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

            // To Store local Error Message in Context
            const errorBox = { serviceDown: this.state.serviceDown, customerNotFound: this.state.customerNotFound };
            this.setState({
                errorBox: errorBox,
                isLoading: false
            });
           // this.context.setErrorBox(errorBox);
           // this.context.setSearchedInput(input);
            });
        //}
        //else{}
    }

    render(){
        return(
         <Context.Consumer>
         {(context) => (
            <div className="form-page">
                    <Header>
                        <BackNavigator {...this.props} />
                        <div className="headerTxt">Customer Form</div>
                        <div>&nbsp;</div>
                    </Header>
                <div className="form_label">First Name</div>
                <div className="form-textbox"><input type="text" id="firstName"></input></div>
                <div className="form_label">Last Name</div>
                <div className="form-textbox"><input type="text" id="lastName"></input></div>
                <div className="form_label">Street Address</div>
                <div className="form-textbox"><input type="text" id="streetAddress"></input></div>
                <div className="form_label">City</div>
                <div className="form-textbox"><input type="text" id="city"></input></div>
                <div className="form_label">State</div>
                <div className="form-textbox">
                    <select id="state">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className="form_label">Zip Code</div>
                <div className="form-textbox"><input type="number" id="zipCode"></input></div>
                <div className="form_label">Birthday</div>
                <div className="form-textbox"><input type="date" id="birthday"></input></div>
                <div id="submit-button" className="submit-button"><button onClick={this.processCustomer}>Submit</button></div>
            </div>
            )}
         </Context.Consumer>
        );
    }
}
FormPage.contextType = Context;
export default FormPage;