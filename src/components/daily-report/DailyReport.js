import React, { Component } from 'react';
import { fetchDailyPurchaseReport } from '../../api/endpoints';
import './DailyReport.css';
import {
    RESOURCE_NOT_AVAILABLE_CODE, DAILY_PURCHASE_REPORT
} from '../../models/Constants';
import Loading from '../../components/Loading';
import BackNavigator from "../back-navigator/BackNavigator";
import Header from './../header/Header';
import ErrorBanner from './../error-banner/ErrorBanner';
import PurchaseDetails from './../purchase-details/PurchaseDetails';
import ResponseHelper from '../Util/ResponseHelper.js';


export default class DailyReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            purchaseInfo: null,
            isLoading: true,
            serviceDown: false,
            reportNotFound: false
        }

        //this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }


    componentDidMount() {
       this.generateDailyPurchaseReport();
    }

    componentDidUpdate() {
        this.renderErrorMessage();
    }

    /**
     * This function used to Call the Generate Daily Purchase Report endpoint from Rewards Management Service
     */
    generateDailyPurchaseReport = () => {
            fetchDailyPurchaseReport().then(data =>{
                let purchaseObject = data.purchaseInfo;
                let errorObject = data.errorResponse;

                console.log("generateDailyPurchaseReport purchaseInfo: " + JSON.stringify(data.purchaseInfo));
                console.log("generateDailyPurchaseReport errorResponse: " + JSON.stringify(data.errorResponse));

                if(errorObject){
                    if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                        this.setState({
                            reportNotFound: true,
                            serviceDown: false,
                            isLoading: false
                        });
                        //this.context.setCustomerNotFound(true);
                    }
                    else{
                        this.setState({
                            reportNotFound: false,
                            serviceDown: true,
                            isLoading: false
                        });
                        //this.context.setServiceDown(true);
                    }
                }
                else{
                    //clearing context
                   /* console.log("setting context in inquiry");
                    this.context.setPurchaseInfo(purchaseObject);
                    this.context.setCustomerNotFound(false);
                    this.context.setServiceDown(false);*/

                    this.setState(
                        {
                            isLoading: false,
                            purchaseInfo: purchaseObject,
                            serviceDown: false,
                            reportNotFound: false
                        });
                }
            }).catch(error => {
                        console.log("ERROR FETCHING DAILY PURCHASE REPORT " + error.message);
                        try {
                            let response = JSON.parse(error.message);
                            let errorResponse = response.errorResponse;
                            let helper = new ResponseHelper();
                            this.handleError(errorResponse, helper);
                        }
                        catch (err) {
                            this.setState({
                                serviceDown: true,
                                reportNotFound: false,
                                isLoading: false
                            });
                        }
                });
    }
     
    /** This is function used to set error message value in state
     * @param  {} errorResponse
     * @param  {} helper
     */
    handleError = (errorResponse, helper)=>{
        if ((errorResponse === "undefined" || errorResponse === null) || helper.servicedown(errorResponse)) {
            this.setState({
                serviceDown: true,
                reportNotFound: false,
                isLoading: false
            });
        }
        else {
            this.setState({
                reportNotFound: true,
                serviceDown: false,
                isLoading: false
            });
        }
    }

    /**
     * This function is used to Show Purchase Information
     */
   renderPurchaseDetails = () => {
        
        if ((!this.state.reportNotFound && !this.state.serviceDown)) {
            let state = this.state;

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            return (
                // To Show PurchaseDetails Information
                <PurchaseDetails purchaseInfo={state.purchaseInfo}></PurchaseDetails>
                );
        }  
    }

    /**
     * This function is used to Show Error Box While Fetch Call Get the Error Message.
     */
    renderErrorMessage = () =>{
            if(this.state.serviceDown){ return (<ErrorBanner message="SERVICE_DOWN"></ErrorBanner>);}
            else if(this.state.reportNotFound){
            return (<ErrorBanner message="REPORT_NOT_FOUND"></ErrorBanner>);
            }
        
    }

   render(){
        return (
            <div>
                <Header>
                    <BackNavigator {...this.props} />
                    <div className="headerTxt">{DAILY_PURCHASE_REPORT}</div>
                    <div>&nbsp;</div>
                </Header>
                <div className="dailyReportPage">

                    <div className="dailyReportBody">
                        {this.renderErrorMessage()}
                        {this.renderPurchaseDetails()}

                    </div>
                </div>
            </div>
        );
    }

}