import React, { Component } from 'react';
import { fetchCustomerAndPurchaseInfo, fetchSkuDetails } from '../../api/endpoints';
import Context from '../../components/contexts/Context';
import Loading from '../../components/Loading';
import BackNavigator from "../back-navigator/BackNavigator";
import PrinterContext from '../contexts/PrinterContext';
import CrudComponent from '../crud-component/CrudComponent';
import Scan from '../scan/Scan';
import ResponseHelper from '../Util/ResponseHelper.js';
import { formatSkuBasicInfo, validateUserInput, validateCarton, getCartonCount, formatCustomerInfo, formatPurchaseInfo } from '../Util/util';
import Header from './../header/Header';
import SearchModal from './../search-modal/SearchModal';
import SkuNotFound from './../sku-details/sku-not-found/SkuNotFound';
import SkuDetails from './../sku-details/SkuDetails';
import {
    SCAN, SKU, UPC, CARTON_UPC, OMS_ID, SEARCH_CARTON_UPC,
    SEARCH_OMS_ID, SEARCH_UPC, SEARCH_SKU, ENTER_BUTTON, VIP_ID, RESOURCE_NOT_AVAILABLE_CODE, SERVICE_UNAVAILABLE_CODE
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
            errorFlag: false,
            errorBox: null
        }

        this.setStateForModal = this.setStateForModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.skuScanFxn = this.skuScanFxn.bind(this);
        this.setErrorFlag = this.setErrorFlag.bind(this);
        this.printOnQtyEnterBtn = this.printOnQtyEnterBtn.bind(this);
        this.handlePrintError = this.handlePrintError.bind(this);
        this.handleLoading = this.handleLoading.bind(this)
        this.resetItemQuantity = this.resetItemQuantity.bind(this);
    }


    /**
     * This function used to Call the Fetch Inquiry Service
     * Dont Reload the page suppose context has same sku , Else call new Service
     */
    componentDidMount() {
        Scan.getScans(this.skuScanFxn);

        // Get Sku Information from Context when same sku entered
        if (this.context.skuBasicInfoBySkuStore 
            && this.context.skuBasicInfoBySkuStore.searchedInput === this.context.searchedInput
            && this.props.history.location.state 
            && this.props.history.location.state.fromPage 
            && this.props.history.location.state.fromPage === '/printers'
            ) {
            
            this.setState({
                skuBasicInfo: this.context.skuBasicInfoBySkuStore,
                isLoading: false,
                //skuNbr: this.context.skuNbr,
                errorBox: this.context.errorBox,
                isCarton: this.context.isCarton,
                cartonCount: this.context.cartonCount
            });

        } else {
            // For New SKU Call Fetch SKU Details
            this.retreiveCustomerAndPurchaseInfo(this.context.searchedInput);
        }
    }

    componentDidUpdate() {
        Scan.getScans(this.skuScanFxn);
        this.renderErrorMessage();
    }

    retreiveCustomerAndPurchaseInfo = (input) => {
        var inputType = validateUserInput(input);

        if(inputType === VIP_ID){
            fetchCustomerAndPurchaseInfo(input).then(data =>{
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
                        this.context.setErrorBox(errorBox);
                        this.context.setSearchedInput(input);
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
                        this.context.setErrorBox(errorBox);
                        this.context.setSearchedInput(input);
                    }
                }
                else{
                    //clearing context
                    console.log("clearing context");
                    this.context.setSavedRecentSearches(data.searchInput);
                    this.context.setCustomerInfo(customerObject);
                    this.context.setPurchaseInfo(purchaseObject);
                    this.context.setErrorBox(null);

                    this.setState(
                        {
                            isLoading: false,
                            customerId: data.customerId,
                            customerInfo: customerObject,
                            purchaseInfo: purchaseObject,
                            serviceDown: false,
                            errorBox: null
                        });
                }
            }).catch(error => {
            console.log("ERROR FETCHING CUSTOMER AND PURCHASE INFO " + error.message);
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
            this.context.setErrorBox(errorBox);
            this.context.setSearchedInput(input);
            });
        }
        else{}
    }


    /** Reterive SKU Details
     * Intialize all the context value when fetch call success
     * Set Error Box values in Context when fetch call failed
     * Turn off Default loading image
     * @param  {} input
     */
    retreiveSKUDetails = (input) => {

        var inputType = validateUserInput(input);
        let isCartonSku = false;
        
        fetchSkuDetails(input, isCartonSku).then(data => {
            let skuInformation = formatSkuBasicInfo(data);
            let packSize = 0;
            let cartonFailure = false;

            this.context.setIsCarton(isCartonSku);
            if (isCartonSku) {
                packSize = getCartonCount(data);
                if (packSize === 0) {
                    packSize = 1; //defaulting to 1
                    cartonFailure = true;
                    console.log("ERROR GETTING CARTON COUNT FROM SERVICE");
                }
                this.context.setItemQuantity(1);
                this.context.setTotalUnits(1 * packSize);
                this.context.setCartonCount(packSize);
            } else {
                this.context.setItemQuantity("");
            }

            //clearing context
            console.log("clearing context");
            this.context.setSavedRecentSearches(data.searchInput);
            this.context.setSkuBasicInfoBySkuStore(skuInformation);
            this.context.setErrorBox(null);
            //this.context.setSkuNbr(data.skuNbr);

            this.setState(
                {
                    skuBasicInfo: skuInformation,
                    //skuNbr: data.skuNbr,
                    isLoading: false,
                    isCarton: isCartonSku,
                    cartonCount: packSize,
                    cartonCountFailure: cartonFailure,
                    serviceDown: false,
                    errorBox: null
                });


        }).catch(error => {
            console.log("ERROR FETCHING SKU DETAILS " + error.message);
            try {
                let response = JSON.parse(error.message);
                let errorResponse = response.errorResponse;
                let helper = new ResponseHelper();
                this.handleError(errorResponse, helper);
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
            this.context.setErrorBox(errorBox);
            this.context.setSearchedInput(input);
       //     this.context.setItemQuantity("");
        });
    }


    /** This is function used to set error message value in state from CrudComponent
     */
    handlePrintError() {
        console.log("handlePrintError PRINT FAILED");
        const errorBox = { printError: true };
        this.setState({
            printError: true,
            errorBox: errorBox,
            isLoading: false
        });
    }

    handleLoading(value) {
        this.setState({
            isLoading: value
        });
    }

    /** This is function used to set error message value in state from CrudComponent
     */
    resetItemQuantity() {
        console.log("resetting item quantity");
        this.context.setItemQuantity('');
    }

    /** This is function used to set error message value in state
     * @param  {} errorResponse
     * @param  {} helper
     */
    handleError(errorResponse, helper) {
        if ((errorResponse === "undefined" || errorResponse === null) || helper.servicedown(errorResponse)) {
            this.setState({
                serviceDown: true,
                isLoading: false
            });
        }
        else {
            this.setState({
                customerNotFound: true,
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
     * This function is used to set the Error flag for inlineError Message SKU Details
     * and it is a callback function from skudetails component
     * example :  'Four Digits or Less Only',
                  'Enter Qty Before Printing',
                  'Total Unit Count Cannot Exceed 999'
     * @param  {} value
     * 
     */
    setErrorFlag(value) {
        this.setState({ errorFlag: value })
    }

    printOnQtyEnterBtn(val) {
        if(val) {
            if (this.context.selectedPrinter.length > 0) {
                this.printComp.handlePrintLabelClicked(ENTER_BUTTON,"");
            } else {
                this.printComp.handleChangePrinterLinkClick();
            }
        }
    }


    /** This function called while doing scanning
     * Use scan('161640') in console for mock scan
     * @param  {} e
     */
    skuScanFxn = (e) => {
        let scannedInput = e;
        if (!scannedInput) {
            return;
        }
        console.log("Inquiry scannedInput = " + scannedInput);
        
        //This check is needed in the case where the user is in Inquiry page with valid Qty
        //And scans the next valid SKU, attempting to print current SKU
        if ((this.context.selectedPrinter.length > 0) || (this.context.errorBox)) {
            if(!this.state.errorBox){
                this.printComp.handlePrintLabelClicked(SCAN,scannedInput);
            } else {
                //call fetch sku details
                //TODO: Set itemQty default for cartonSku
                this.retreiveSKUDetails(scannedInput);
            }
        } else {
            let errorBox;
            if(this.context.selectedPrinter.length === 0){
                //printing failed, select a printer
                errorBox = { serviceDown: false, customerNotFound: false, printError: false, isPrinterSelected: false };
            } else {
                errorBox = { serviceDown: false, customerNotFound: true, printError: false, isPrinterSelected: false };
            }
            this.setState({
                errorBox: errorBox,
                isLoading: false
            });
            this.context.setErrorBox(errorBox);
        }
    }


   /* multiScanFetchSkudetails(scannedInput) {
        
        if (this.context.skuBasicInfoBySkuStore && this.context.skuBasicInfoBySkuStore.searchedInput === scannedInput) {
            this.setState({
                skuBasicInfo: this.context.skuBasicInfoBySkuStore,
                isLoading: false,
                errorBox: this.context.errorBox,
                isCarton: this.context.isCarton,
                cartonCount: this.context.cartonCount,

            });
            //If isCarton false, then set regular SKU itemQuantity to empty for next SKU
            //Pivotal #171108803 and #171108450
            if(!this.context.isCarton){
                this.context.setItemQuantity("");
            }
            // Also Print the Labels
        }
        else {
            this.setState({ isLoading: true });

            //Call new fetch service
            this.retreiveSKUDetails(scannedInput);
        }
        
    }*/

    /**
     * This function is used to Show Error Box While Fetch Call Get the Error Message.
     * @param int searchedInput
     */
    renderErrorMessage(searchedInput) {

        if (this.state.errorBox && this.state.errorBox.serviceDown) {
            return <SkuNotFound sku_nbr={searchedInput} message="SERVICE_DOWN"></SkuNotFound>
        }
        else if (this.state.errorBox && this.state.errorBox.customerNotFound) {
            return <SkuNotFound sku_nbr={searchedInput} message="SKU_NOT_FOUND"></SkuNotFound>
        }
        else if (this.state.errorBox && this.state.errorBox.printError) {
            return <SkuNotFound sku_nbr={searchedInput} message="PRINT_ERROR"></SkuNotFound>
        }
        else if (this.state.errorBox && this.state.selectedPrinter.length === 0) {
            return <SkuNotFound sku_nbr={searchedInput} message="PRINTER_NOT_SELECTED"></SkuNotFound>
        }
    }

    /**
     * This function is used to Show SKU Information also Set  and Get the ItemQuantity and Total Units from Context.
     * @param  itemQuantity, setItemQuantity, int totalUnits, setTotalUnits
     */
   /* renderSkuDetails = (itemQuantity, setItemQuantity, totalUnits, setTotalUnits) => {
        
        if ((!this.state.errorBox) || (this.state.printError) || (!this.state.errorBox.isPrinterSelected)) {
            let state = this.state;

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            return (
                // To Show SKUDetails Information
                <SkuDetails skuBasicInfo={state.skuBasicInfo}
                    inputQty={itemQuantity} setInputQty={setItemQuantity}
                    totalUnits={totalUnits} setTotalUnits={setTotalUnits}
                    errorFlag={state.errorFlag}
                    errorBox={state.errorBox}
                    resetErrorFlg={this.setErrorFlag}
                    isCarton={state.isCarton}
                    cartonCount={state.cartonCount}
                    cartonCountFailure={state.cartonCountFailure} 
                    handlePrintOnQtyEnterBtn={this.printOnQtyEnterBtn}>
                </SkuDetails>
                );
        }  
    }*/

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                            <div>
                                <Header>
                                    <BackNavigator {...this.props} setItemQuantity={context.setItemQuantity} />
                                    <div className="headerTxt">Customer Info</div>
                                    <div>&nbsp;</div>

                                </Header>

                                <div className="inquiryPage" onClick={this.closeSkuDetailsImgModal} >

                                    <div className="inquiryBody">
                                        {this.renderErrorMessage(context.searchedInput)}
                                        {/*this.renderSkuDetails(context.itemQuantity, context.setItemQuantity, context.totalUnits, context.setTotalUnits)*/}
                                        <div className="clearDiv"></div>

                                    </div>
                                    {/* Search Modal */}
                                    {this.state.showSearchModal && <SearchModal fetchSkuDetails={this.fetchSkuDetails(Context.searchedInput, validateCarton(context.searchedInput))} setStateForModal={this.setStateForModal}></SearchModal>}
                                </div>
                            </div>
                )}
            </Context.Consumer>
        );
    }
}

Inquiry.contextType = Context;
export default Inquiry;
