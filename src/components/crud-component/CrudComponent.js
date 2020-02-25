import React, { Component } from 'react';
import "./CrudComponent.css";

import { validateSelectedPrinter } from '../Util/util';
import { pairWirelessDevice, printToBtDevice } from '../Util/bluetooth-util';
import { postPrint } from '../../api/endpoints';
import Profile from '../../models/Profile';
import {
    PRINTER_THRESHOLD, SCAN_OR_SELECT_PRINT, PRINTER_LABEL,
    CHANGE_PRINTER, PRINTER_NAME, BROWSER, SCAN, PRINT, HOMEPAGE, INQUIRY,
    BT_PRINT_FAILURE, CART_PRINT_FAILURE, PRINT_SUCCESS, PRINT_SCAN, TOTAL_UNIT_COUNT_THRESHOLD,
    ADD_CUSTOMER
} from '../../models/Constants';

class CrudComponent extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            fromPage: ''
        }
        this.handlePrintLabelClicked = this.handlePrintLabelClicked.bind(this);
        this.handleSelectPrinterBtnClick = this.handleSelectPrinterBtnClick.bind(this);
        this.handleChangePrinterLinkClick = this.handleChangePrinterLinkClick.bind(this);
    }

    componentDidMount() {
        //this.setState({
        //    fromPage:this.props.location.pathname
        //});
    }

    isItemValid(itemInfo, skuNbr) {
        if (itemInfo.itemQuantity && itemInfo.searchedInput && skuNbr !== ''){
            return true;
        } 
        return false;
    }

    /** This function will be callied user click Print Label
     * Calling Print Service for Post printerInfo Object
     * @param  {} printerInfo
     */
    handlePrintLabelClicked(eventType,scannedInput) {

        let printerInfo = this.props.selectedPrinter;
        // Format PrinterInfo Object
        let printerObj = validateSelectedPrinter(printerInfo);

        if (this.isItemValid(this.props.Context, this.props.skuNbr)
            && printerInfo && printerInfo.length > 0) {
           
            // Loading Image while calling Print Service
            this.props.handleLoading(true);
            
            let labelQty = 0;
            //Assigning the quantity for carton and simple sku
            if(this.props.Context.isCarton){
                labelQty = this.props.Context.totalUnits
            } else {
                labelQty = this.props.Context.itemQuantity;
            }

            postPrint(this.props.skuNbr, this.props.Context.searchedInput, labelQty, printerObj)
                .then(response => {
                    if (printerObj.isThermal) {
                        // Thermal Response Handler
                        if (response && response.errorResponse === null) {
                            this.props.handleLoading(false);
                            console.debug('Print THERMAL Service Response' + response);
                            if(eventType !== SCAN){
                                this.goBackHomePage();
                            }
                            else if(eventType === SCAN){
                                this.props.multiScanFetchSkudetails(scannedInput);
                            }
                        } else {
                            //Show errorBox while Print fail
                            console.debug("PRINT FAILED");
                            this.props.handlePrintError();
                        }
                    } else {
                        //BLUETOOTH RESPONSE HANDLER
                        if (response && response.printData) {
                            console.debug('Print BLUETOOTH Service Response' + response.printData.length);
                            this.printToBluetoothPrinter(response.printData, printerObj.printerName, eventType, scannedInput);
                        }
                    }
                }).catch(error => {
                    console.debug("ERROR FETCHING PRINTER LIST: ", error);
                    console.log("throwing error ", error);
                    this.props.handlePrintError();
                });

                //this.props.handleLoading(false);
        } else {
            this.props.setErrorFlag(true);
        }
    }

    /**
     * This function will be called while select Bluetooth Printer
     * Post object into Print Service
     * @param  {} signData
     * @param  {} printerName
     */
    printToBluetoothPrinter(signData, printerName, eventType, scannedInput) {
        if (Profile.getEnvironment() === BROWSER) {
            console.log("MOCK printing for browser");
            this.props.handleLoading(false);
            if(eventType === SCAN) {
                this.props.multiScanFetchSkudetails(scannedInput);
            } else {
                this.goBackHomePage();
            }
        } else {
            console.log("START of method printToBluetoothPrinter");
            const MAX_RETRY = 3;
            let checkPrint = 0;
            let retnVal = '';
            var printBt = () => {

                //Sending the print info to Bluetooth device
                printToBtDevice(signData, (value) => {
                    console.debug("util success return value", value)
                    retnVal = value;
                    this.setState({
                        isLoading: true
                    });
                    if (!retnVal && checkPrint < MAX_RETRY) {
                        checkPrint++;
                        
                        // Pair Wirelesss Device
                        pairWirelessDevice(printerName);
                        console.debug("printToBluetoothPrinter counter: " + checkPrint);
                        setTimeout(() => {
                            printBt();
                        }, 5000);
                    } else if (!retnVal && checkPrint === MAX_RETRY) {

                        //SHOW BLUETOOTH FAILED AFTER RETRY
                        console.debug(" SHOW BLUETOOTH FAILED AFTER RETRY " + MAX_RETRY);
                        this.props.handlePrintError();
                    } else if (retnVal) {
                        console.debug("SUCCESS of method printToBluetoothPrinter");
                        if(eventType !== SCAN){
                            this.goBackHomePage();
                        }
                        else if(eventType === SCAN){
                            this.props.multiScanFetchSkudetails(scannedInput);
                        }
                    }
                });
            }
            printBt();
        }
    }

        /**
     * This function will be called when user click on cancel button
     */
    goBackHomePage() {
        console.log("On Successful print!");
       this.props.resetItemQuantity();
        //this.props.resetContext();
        this.props.history.replace({ pathname: './' });
    }

    handleSelectPrinterBtnClick() {

        this.props.history.push({
            pathname: '/printers' ,
            state: { 
                fromPage: this.state.fromPage
            }
          });
    }

    handleChangePrinterLinkClick() {
        this.props.history.push({
            pathname: '/printers' ,
            state: { 
                fromPage: this.state.fromPage
            }
          });       
    }

    render() {

        let isPrinterSelected = false;
        let printerSelectedDesc = '';
        let printerDescLimitExceeds = false;
        if (this.props.selectedPrinter && this.props.selectedPrinter.length > 0) {
            isPrinterSelected = true;
            printerSelectedDesc = this.props.selectedPrinter[0].printerDescription;
            printerDescLimitExceeds = (printerSelectedDesc.length > PRINTER_THRESHOLD) ? true : false;
        }

        return (

            <div className="printContainer">
                {isPrinterSelected && this.props.history.location.pathname === "/inquiry" &&
                    <div>
                        <div className="printerInfo">
                            <span className={"printerLabel " + (printerDescLimitExceeds ? 'fontReduced' : '')}>{PRINTER_NAME} {printerSelectedDesc}</span>
                            <span className="orangeColor change-printer" onClick={this.handleChangePrinterLinkClick}>{CHANGE_PRINTER}</span>
                        </div>
                        {   
                            (this.props.totalUnits >= TOTAL_UNIT_COUNT_THRESHOLD) || (this.props.errorBox) ?
                            <div className="print-label btnContainer print-button-disabled" >
                                {PRINTER_LABEL}
                            </div>
                            :
                            <div className="print-label btnContainer  print-button-search" onClick={this.handlePrintLabelClicked}>
                            {PRINTER_LABEL}
                            </div>
                        }
                    </div>
                }

                {isPrinterSelected && this.props.history.location.pathname === "/" &&
                    <div>
                        <div className="printerInfo">
                            <span className={"printerLabel " + (printerDescLimitExceeds ? 'fontReduced' : '')}>{PRINTER_NAME} {printerSelectedDesc}</span>
                            <span className="orangeColor change-printer" onClick={this.handleChangePrinterLinkClick}>{CHANGE_PRINTER}</span>
                        </div>
                    </div>
                }

                {!isPrinterSelected && 
                    <div className="change-printer btnContainer  print-button-search" onClick={this.handleSelectPrinterBtnClick}>
                        {ADD_CUSTOMER}
                    </div>
                }
            </div>
        )
    }
}


export default CrudComponent;