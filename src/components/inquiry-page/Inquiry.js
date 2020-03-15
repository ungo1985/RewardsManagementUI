import React, { Component } from 'react';
import { fetchCustomerAndPurchaseInfo } from '../../api/endpoints';
import Context from '../../components/contexts/Context';
import Loading from '../../components/Loading';
import BackNavigator from "../back-navigator/BackNavigator";
import ResponseHelper from '../Util/ResponseHelper.js';
import {  validateUserInput } from '../Util/util';
import Header from './../header/Header';
import ErrorBanner from './../error-banner/ErrorBanner';
import CustomerDetails from './../customer-details/CustomerDetails';
import PurchaseDetails from './../purchase-details/PurchaseDetails';
import SubHeader from './../sub-header/SubHeader';
import {
    VIP_ID, RESOURCE_NOT_AVAILABLE_CODE
} from '../../models/Constants';
import './Inquiry.css';


class Inquiry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            customerId: this.props.customerId,
            customerInfo: this.props.customerInfo,
            purchaseInfo: this.props.purchaseInfo,
            isLoading: true,
            showSearchModal: false,
            serviceDown: false,
            customerNotFound: false,
            errorFlag: false
        }

        this.setStateForModal = this.setStateForModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.setErrorFlag = this.setErrorFlag.bind(this);
    }


    /**
     * This function used to Call the Fetch Rewards Management Service
     * Dont Reload the page suppose context has same vipId , Else call Service
     */
    componentDidMount() {
        // Get Customer Information from Context when same vipId entered
        if (this.props.history.location.state 
            && this.props.history.location.state.fromPage 
            && (this.props.history.location.state.fromPage === '/form' 
                || this.props.history.location.state.fromPage === '/delete')
            ) {
            
            this.setState({
                isLoading: false,
                searchedInput: this.context.searchedInput,
                customerId: this.context.customerId,
                customerInfo: this.context.customerInfo,
                purchaseInfo: this.context.purchaseInfo
            });

        } else {
            // For New SKU Call Fetch SKU Details
            this.retreiveCustomerAndPurchaseInfo(this.context.searchedInput);
        }
    }

    componentDidUpdate() {
        this.renderErrorMessage();
    }

    retreiveCustomerAndPurchaseInfo = (input) => {
        var inputType = validateUserInput(input);

        if(inputType === VIP_ID){
            fetchCustomerAndPurchaseInfo(input).then(data =>{
                let custId = data.customerId;
                let customerObject = data.customerInfo;
                let purchaseObject = data.purchaseInfo;
                let errorObject = data.errorResponse;

                console.log("custId: " + custId);
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
                        this.context.setSearchedInput(input);
                        this.context.setCustomerNotFound(true);
                    }
                    else{
                        this.setState({
                            customerNotFound: false,
                            serviceDown: true,
                            isLoading: false
                        });
                        this.context.setSearchedInput(input);
                        this.context.setServiceDown(true);
                    }
                }
                else{
                    //clearing context
                    console.log("setting context in inquiry");
                    this.context.setSavedRecentSearches(custId);
                    this.context.setSearchedInput(custId);
                    this.context.setCustomerId(custId);
                    this.context.setCustomerInfo(customerObject);
                    this.context.setPurchaseInfo(purchaseObject);
                    this.context.setCustomerNotFound(false);
                    this.context.setServiceDown(false);

                    this.setState(
                        {
                            isLoading: false,
                            customerId: custId,
                            customerInfo: customerObject,
                            purchaseInfo: purchaseObject,
                            serviceDown: false,
                            customerNotFound: false
                        });
                }
            }).catch(error => {
            console.log("ERROR FETCHING CUSTOMER AND PURCHASE INFO " + error.message);
            try {
                let response = JSON.parse(error.message);
                let errorResponse = response.errorResponse;
                let helper = new ResponseHelper();
                this.handleError(errorResponse, helper);
            }
            catch (err) {
                this.setState({
                    serviceDown: true,
                    customerNotFound: false,
                    isLoading: false
                });
            }
            });
        }
    }

    /** This is function used to set error message value in state
     * @param  {} errorResponse
     * @param  {} helper
     */
    handleError(errorResponse, helper) {
        if ((errorResponse === "undefined" || errorResponse === null) || helper.servicedown(errorResponse)) {
            this.setState({
                serviceDown: true,
                customerNotFound: false,
                isLoading: false
            });
        }
        else {
            this.setState({
                customerNotFound: true,
                serviceDown: false,
                isLoading: false
            });
        }
    }




    /**
     * This function is used to set a boolean value of true or false to
     * showSearchModal attribute. If true, the app will display the SearchModal.
     * If false, it will hide it.
     * @param boolean value
     */
    setStateForModal(value) {
        this.setState({ showSearchModal: value })
    }


    /**
     * This function is used to set the Error flag
     * @param  {} value
     * 
     */
    setErrorFlag(value) {
        this.setState({ errorFlag: value })
    }

    /**
     * This function is used to Show Error Box While Fetch Call Get the Error Message.
     */
    renderErrorMessage() {
            if(this.context.serviceDown){ return (<ErrorBanner customerId={this.context.searchedInput} message="SERVICE_DOWN"></ErrorBanner>);}
            else if(this.context.customerNotFound){
            return (<ErrorBanner customerId={this.context.searchedInput} message="CUSTOMER_NOT_FOUND"></ErrorBanner>);
            }
        
    }

    /**
     * This function is used to Show Customer Information
     */
   renderCustomerDetails = () => {
        
        if ((!this.state.customerNotFound && !this.state.serviceDown)) {
            let state = this.state;

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            return (
                // To Show CustomerDetails Information
                <CustomerDetails customerInfo={state.customerInfo}
                    errorFlag={state.errorFlag}
                    serviceDown={state.serviceDown}
                    customerNotFound={state.customerNotFound}
                    resetErrorFlg={this.setErrorFlag}>
                </CustomerDetails>
                );
        }  
    }

   /**
     * This function is used to Show Purchase Information
     */
   renderPurchaseDetails = () => {
        
        if ((!this.state.customerNotFound && !this.state.serviceDown)) {
            let state = this.state;

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            return (
                // To Show PurchaseDetails Information
                <PurchaseDetails purchaseInfo={state.purchaseInfo}
                    errorFlag={state.errorFlag}
                    serviceDown={state.serviceDown}
                    customerNotFound={state.customerNotFound}
                    resetErrorFlg={this.setErrorFlag}>
                </PurchaseDetails>
                );
        }  
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                            <div>
                                <Header>
                                    <BackNavigator {...this.props} />
                                    <div className="headerTxt">Customer Info</div>
                                    <div>&nbsp;</div>

                                </Header>
                                <SubHeader customerId={this.state.customerId}></SubHeader>
                                <div className="inquiryPage" onClick={this.closeSkuDetailsImgModal} >

                                    <div className="inquiryBody">
                                        {this.renderErrorMessage()}
                                        {this.renderCustomerDetails()}
                                         {this.renderPurchaseDetails()}
                                        <div className="clearDiv"></div>

                                    </div>
                                </div>
                            </div>
                )}
            </Context.Consumer>
        );
    }
}

Inquiry.contextType = Context;
export default Inquiry;
