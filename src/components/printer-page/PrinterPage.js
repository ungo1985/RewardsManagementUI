import React, { Component } from 'react';
import scanImage from './../../images/scan_printer.svg'
import Scanner from '../scan/Scan';
import Dropdown from '../Dropdown/Dropdown';
import './PrinterPage.css'
import PrinterContext from '../contexts/PrinterContext'
import { getThermalPrinters } from '../Util/print-util';
import { enableBlueTooth, pairWirelessDevice, getBlueToothObj } from '../Util/bluetooth-util';
import { validatePrinterInput } from '../Util/util';
import { DATAMAX_PREFIX, SELECTED_PRINTER } from '../../models/Constants';
import SkuNotFound from '../sku-details/sku-not-found/SkuNotFound';
import Loading from '../Loading';
class PrinterPage extends Component {	

    constructor(props) {
        super(props)

        this.state = {
            thermalPrinterList: [],
            bluetoothPrinterList: [],
            selectedPrinter: [],
            btPairingError: false,
            showLoading: false,
            fromPage: ''
        }        
        this.handlePrinterChange = this.handlePrinterChange.bind(this);	
        this.handlePrinterSelectionInput = this.handlePrinterSelectionInput.bind(this);
        this.skuScanFxn = this.skuScanFxn.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.renderLoadingBar = this.renderLoadingBar.bind(this);
    }

    componentDidMount() {

        this.setState({
            fromPage:this.props.location.pathname
        });

        if(this.context.thermalPrinterList && this.context.thermalPrinterList.length) {
            this.setState({
                thermalPrinterList: this.context.thermalPrinterList
            })
        } else {
            getThermalPrinters(this.setThermalPrinters);
        }

        if(this.context.bluetoothPrinterList && this.context.bluetoothPrinterList.length) {
            this.setState({
                bluetoothPrinterList: this.context.bluetoothPrinterList
            })
        }

        if(this.context.selectedPrinter && this.context.selectedPrinter.length) {
            this.setState({
                selectedPrinter: this.context.selectedPrinter
            })
        }
        Scanner.getScans(this.skuScanFxn);

        enableBlueTooth((result) => {
            console.log("PRINTERS SELECTION: BT enable ", result);
        });

    }

    componentDidUpdate() {
        Scanner.getScans(this.skuScanFxn);
    }

    setThermalPrinters = (printers) => {
        this.setState({
            thermalPrinterList: printers
        });
    }

    setBluetoothPrinters = (printers) => {
        this.setState({
            bluetoothPrinterList: printers
        });
    }

    handlePrinterSelectionInput(value){

        this.setState({
            selectedPrinter:value,
            btPairingError: false,
        }, () =>
            {
                this.context.setSelectedPrinter(this.state.selectedPrinter);
            }
        );
    }

    handlePrinterChange() {
        if(this.props.history.location.state){
            let pageLocation  = this.props.history.location.state.fromPage
            
            this.props.history.push({
                pathname: pageLocation,
                state: { 
                    fromPage: this.state.fromPage
                }
              });
        }
    }

    skuScanFxn(e) {
        let scannedInput = e;
        if (!scannedInput) {
            return;
        }

        //Resetting the error message
        this.setState({
            btPairingError: false,
            showLoading: true
        });
        console.log("Scanned item: ", scannedInput);

        var inputType = validatePrinterInput(scannedInput);
        scannedInput = scannedInput.replace(DATAMAX_PREFIX, '');
        
        var callbackFn = (res) => {
            console.log("Response from BT pairing  ", res);
            this.setState({
                showLoading: false
            });
            if (res) {


                let btList = [];
                let bluetoothPrinter = getBlueToothObj(scannedInput, inputType);

                btList.push(bluetoothPrinter);
                let newPrinterList = [bluetoothPrinter, ...this.state.bluetoothPrinterList];
                //Remove duplicates in the new printer list
                let uniqueList= Array.from(new Set(newPrinterList.map(JSON.stringify))).map(JSON.parse);

                //set scanned bluetooth printer as newly selected printer
                //add scanned bluetooth printer to bluetoothPrinterList
                this.setState({
                    selectedPrinter: btList,
                    bluetoothPrinterList:  uniqueList
                }, () => {

                        this.context.setSelectedPrinter(this.state.selectedPrinter);
                        this.context.setBluetoothPrinters(this.state.bluetoothPrinterList);
                    }
                );

                this.handlePrinterChange();
            } else {
                //TODO: Show a message to pair right printer again
                // Stay in same page
                this.setState({
                    btPairingError: true
                });
            }
        }

        pairWirelessDevice(scannedInput, callbackFn);

    }

    renderErrorMessage() {
        if (this.state.btPairingError) {
            return <SkuNotFound message="PRINTER_PAIRING_FAILED"></SkuNotFound>
        }
    }

    renderLoadingBar() {
        if (this.state.showLoading) {
            return <Loading/>
        }
    }



    render() {
        let combinedPrinterList = [...this.state.bluetoothPrinterList, ...this.state.thermalPrinterList];

        return (
            <PrinterContext.Consumer>
            {( context ) => (
            <div className="printers-page">
            {this.renderErrorMessage()}
            {this.renderLoadingBar()}
                <div className="print-header">
                   Select a Printer
                </div>
                <div id="print-scan-image">	
                    <img src={scanImage} alt="" />
                </div>
   
                <br/>
                <div className="printer_label">Printer</div>
                <span id="printer_dropdown">
                    <Dropdown data={combinedPrinterList}  selectedPrinter={context.selectedPrinter}
                     getInput={this.handlePrinterSelectionInput} onChange={() => {context.setSelectedPrinter(this.state.selectedPrinter)}}/>
                </span>

                <span id="print_button_search">
                    <button  className="button_enable add_printer_btn" onClick={ this.handlePrinterChange }>Add Printer</button>
                </span>
                
            </div>	
            )}
            </PrinterContext.Consumer>
        );
    }
}

PrinterPage.contextType = PrinterContext;
export default PrinterPage;