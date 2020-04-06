import React, { Component } from 'react';
import './FormPage.css';
import Header from './../header/Header';
import BackNavigator from "../back-navigator/BackNavigator";
import { postCustomer } from '../../api/endpoints';
import {
    RESOURCE_NOT_AVAILABLE_CODE
} from '../../models/Constants';
import ResponseHelper from '../Util/ResponseHelper.js';
import Context from '../../components/contexts/Context';
import { validateForAlphaInput, validateForNumericInput, validateDate, validateForAlphaNumericAndSpaceInput } from '../Util/util';

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
            buttonCSS: 'button_disable',
            fromPage: ''
        }
    }

    componentDidMount(){
       this.setState({
            fromPage:this.props.location.pathname
        });
    }

    validateFirstName = () =>{
        let isValid = validateForAlphaInput(document.getElementById("firstName").value);
        console.log("firstName " + isValid);
        return isValid;
    }

    validateLastName = () =>{
        let isValid = validateForAlphaInput(document.getElementById("lastName").value);
        console.log("lastName " + isValid);
        return isValid;
    }

    validateStreetAddress = () =>{
        let isValid = validateForAlphaNumericAndSpaceInput(document.getElementById("streetAddress").value);
        console.log("streetAddress " + isValid);
        return isValid;
    }

    validateCity = () =>{
        let isValid = validateForAlphaInput(document.getElementById("city").value);
        console.log("city " + isValid);
        return isValid;
    }

   validateZipCode = () =>{
        let zipCode = document.getElementById("zipCode").value;
        let size = zipCode.length;
        let isValid = (validateForNumericInput(zipCode) && (size === 5))
        console.log("zipCode " + isValid);
        return isValid;
    }

    validateBirthday = () =>{
        let birthday = document.getElementById("birthday").value;
        let isValid = validateDate(birthday);
        console.log("birthday " + birthday + " isValid " + isValid);
        return isValid;
    }

    validateFormInput = () =>{
        let isValid = false;
        this.setState({buttonCSS: 'button_disable'});
        if(this.validateFirstName() 
            && this.validateLastName()
            && this.validateStreetAddress()
            && this.validateCity()
            && this.validateZipCode()
            && this.validateBirthday()
            ){
                isValid = true;
                this.setState({buttonCSS: 'button_enable'});
            }
        console.log("validateFormInput: " + isValid);
        return isValid;
    }

    getFormParams = () =>{
        if(this.context.customerInfo !== null){ 
            document.getElementById('firstName').value = this.context.customerInfo.firstName;
            document.getElementById('lastName').value = this.context.customerInfo.lastName;
            document.getElementById('streetAddress').value = this.context.customerInfo.streetAddress;
            document.getElementById('city').value = this.context.customerInfo.city;
            document.getElementById('zipCode').value = this.context.customerInfo.zipCode;
            document.getElementById('birthday').value = this.context.customerInfo.birthday;
            let state = this.context.customerInfo.state;
            document.getElementById('state').options.namedItem(state).selected=true;
            }
    }

    processCustomer = () => {

        if(this.validateFormInput()){
                    console.log("processCustomer: " + document.getElementById("firstName").value);

                    let customerId = "";
                    let firstName = document.getElementById("firstName").value;
                    let lastName = document.getElementById("lastName").value;
                    let streetAddress = document.getElementById("streetAddress").value;
                    let city = document.getElementById("city").value;
                    let state = document.getElementById("state").value;
                    let zipCode = document.getElementById("zipCode").value;
                    let birthday = document.getElementById("birthday").value;
                    let goldStatusFlag = "N";
                    let points = 0;
                    if(this.context.customerInfo !== null){
                        goldStatusFlag = this.context.customerInfo.goldStatusFlag;
                        points = this.context.customerInfo.points;
                        customerId = this.context.customerInfo.customerId;
                    }
                        console.log("FormPage customerId: " + customerId);
                        postCustomer(customerId, firstName, lastName, streetAddress, city, state, zipCode, birthday, goldStatusFlag, points).then(data =>{
                            let customerObject = data.customerInfo;
                            let purchaseObject = data.purchaseInfo;
                            let errorObject = data.errorResponse;

                            console.log("customerInfo: " + JSON.stringify(data.customerInfo));
                            console.log("purchaseInfo: " + JSON.stringify(data.purchaseInfo));
                            console.log("errorResponse: " + JSON.stringify(data.errorResponse));

                            if(errorObject){
                                if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                                    this.setState({
                                        customerNotFound: true,
                                        serviceDown: false,
                                        isLoading: false
                                    });
                                }
                                else{
                                     // To Store local Error Message in Context
                                    this.setState({
                                        customerNotFound: false,
                                        serviceDown: true,
                                        isLoading: false
                                    });
                                }
                            }
                            else{
                                console.log("FormPage Success");
                                this.context.setSearchedInput(data.customerId);
                                this.context.setCustomerInfo(customerObject);
                                this.context.setPurchaseInfo(purchaseObject);
                                this.context.setServiceDown(false);
                                this.context.setCustomerNotFound(false);

                                this.setState(
                                    {
                                        isLoading: false,
                                        customerId: data.customerId,
                                        customerInfo: customerObject,
                                        serviceDown: false,
                                        customerNotFound: false
                                    });

                                this.props.history.push({pathname: '/inquiry', state:{
                                    searchInput: data.customerId,
                                    customerId: data.customerId,
                                    customerInfo: customerObject,
                                    purchaseInfo: purchaseObject,
                                    isLoading: false,
                                    serviceDown: false,
                                    customerNotFound: false
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

    }

    render(){
        return(
         <Context.Consumer>
         {(context) => (
             
            <div className="form-page" onLoad={this.getFormParams}>
                    <Header>
                        <BackNavigator {...this.props} />
                        <div className="headerTxt">Customer Form</div>
                        <div>&nbsp;</div>
                    </Header>
                <div className="form_label">First Name</div>
                <div className="form-textbox"><input type="text" id="firstName" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Last Name</div>
                <div className="form-textbox"><input type="text" id="lastName"  onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Street Address</div>
                <div className="form-textbox"><input type="text" id="streetAddress" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">City</div>
                <div className="form-textbox"><input type="text" id="city"  onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">State</div>
                <div className="form-textbox">
                    <select id="state">
                        <option value="AL" id="AL">Alabama</option>
                        <option value="AK" id="AK">Alaska</option>
                        <option value="AZ" id="AZ">Arizona</option>
                        <option value="AR" id="AR">Arkansas</option>
                        <option value="CA" id="CA">California</option>
                        <option value="CO" id="CO">Colorado</option>
                        <option value="CT" id="CT">Connecticut</option>
                        <option value="DE" id="DE">Delaware</option>
                        <option value="DC" id="DC">District Of Columbia</option>
                        <option value="FL" id="FL">Florida</option>
                        <option value="GA" id="GA">Georgia</option>
                        <option value="HI" id="HI">Hawaii</option>
                        <option value="ID" id="ID">Idaho</option>
                        <option value="IL" id="IL">Illinois</option>
                        <option value="IN" id="IN">Indiana</option>
                        <option value="IA" id="IA">Iowa</option>
                        <option value="KS" id="KS">Kansas</option>
                        <option value="KY" id="KY">Kentucky</option>
                        <option value="LA" id="LA">Louisiana</option>
                        <option value="ME" id="ME">Maine</option>
                        <option value="MD" id="MD">Maryland</option>
                        <option value="MA" id="MA">Massachusetts</option>
                        <option value="MI" id="MI">Michigan</option>
                        <option value="MN" id="MN">Minnesota</option>
                        <option value="MS" id="MS">Mississippi</option>
                        <option value="MO" id="MO">Missouri</option>
                        <option value="MT" id="MT">Montana</option>
                        <option value="NE" id="NE">Nebraska</option>
                        <option value="NV" id="NV">Nevada</option>
                        <option value="NH" id="NH">New Hampshire</option>
                        <option value="NJ" id="NJ">New Jersey</option>
                        <option value="NM" id="NM">New Mexico</option>
                        <option value="NY" id="NY">New York</option>
                        <option value="NC" id="NC">North Carolina</option>
                        <option value="ND" id="ND">North Dakota</option>
                        <option value="OH" id="OH">Ohio</option>
                        <option value="OK" id="OK">Oklahoma</option>
                        <option value="OR" id="OR">Oregon</option>
                        <option value="PA" id="PA">Pennsylvania</option>
                        <option value="RI" id="RI">Rhode Island</option>
                        <option value="SC" id="SC">South Carolina</option>
                        <option value="SD" id="SD">South Dakota</option>
                        <option value="TN" id="TN">Tennessee</option>
                        <option value="TX" id="TX">Texas</option>
                        <option value="UT" id="UT">Utah</option>
                        <option value="VT" id="VT">Vermont</option>
                        <option value="VA" id="VA">Virginia</option>
                        <option value="WA" id="WA">Washington</option>
                        <option value="WV" id="WV">West Virginia</option>
                        <option value="WI" id="WI">Wisconsin</option>
                        <option value="WY" id="WY">Wyoming</option>
                    </select>
                </div>
                <div className="form_label">Zip Code</div>
                <div className="form-textbox"><input type="number" id="zipCode" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Birthday</div>
                <div className="form-textbox"><input type="date" id="birthday" onKeyUp={this.validateFormInput}></input></div>
                <div><button id="submit-button" className={this.state.buttonCSS + " submit-button disabled"} onClick={this.processCustomer}>Submit</button></div>
            </div>
            )}
         </Context.Consumer>
        );
    }
}
FormPage.contextType = Context;
export default FormPage;