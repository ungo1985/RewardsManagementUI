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
            errorBox: null,
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
            }
    }

    processCustomer = () => {

        if(this.validateFormInput()){
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