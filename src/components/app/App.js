import React, { Component } from 'react';
import ReactGA from 'react-ga';

import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Inquiry from '../../components/inquiry-page/Inquiry'
import HomePage from '../home-page/HomePage'
import ItemContext from '../../components/contexts/ItemContext'
import PrinterContext from '../../components/contexts/PrinterContext'
import PrinterPage from '../printer-page/PrinterPage';
import Profile from "../../models/Profile";
import { getToken, manageRecentSearchList } from '../Util/util';
import { APP_VERSION_FILE} from '../../models/Constants';
import { getThermalPrinters } from '../Util/print-util';
import { enableBlueTooth } from '../Util/bluetooth-util';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchedInput: '',
            skuNbr: '',
            savedRecentSearches: [],
            showSearchModal: false,
            selectedPrinter: [],
            thermalPrinterList: [],
            bluetoothPrinterList: [],
            isLoading: true,
            itemQuantity: '',
            errorBox: null,
            skuBasicInfoBySkuStore: null,
            totalUnits: 0,
            isCarton: false,
            cartonCount: 0
        }

        this.readTextFile(APP_VERSION_FILE);
        this.readIntentFromDevice();
        this.retrievePrinters();
        this.initBlueTooth();
    }
    
    retrievePrinters(){
        setTimeout(() => {
            getThermalPrinters(this.setThermalPrinters);
        }, 2000);
    }

    readIntentFromDevice() {
        getToken(this.deviceCallBackFn);
    }

    deviceCallBackFn = (e) => {
        Profile.setTokenData(e.userData.thdSsoToken);
        Profile.userId(e.userData.associateUserID);
    }

    initBlueTooth() {
        enableBlueTooth((result) => {
            console.log("APP: BT enable ", result);
        });
    }

    readTextFile = (file) => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    let versionNbr = rawFile.responseText;
                    console.log("App Version: ", versionNbr);
                }
            }
        };
        rawFile.send(null);
    }

   
    /**
     * This function is used to set a boolean value of true or false to
     * showSearchModal attribute. If true, the app will display the SearchModal.
     * If false, it will hide it.
     * @param boolean value
     */
    setStateForModal = (value) => {
        this.setState({showSearchModal: value})
    }

    setErrorBox = (value) => {
        this.setState({errorBox: value})
    }
    
    setSearchedInput = (value) => {
        this.setState({
        	searchedInput: value
        });
    }


    setSavedRecentSearches = (value) => {

        let newList = manageRecentSearchList(this.state.savedRecentSearches, value )

        this.setState({
        	savedRecentSearches: newList
        }, ()=> {
        });
    }
    
    setSelectedPrinter = (value) => {
             
        this.setState({
            selectedPrinter: value,
            errorBox:null
        });
    }

    setSkuNbr = (value) => {
             
        this.setState({
        	skuNbr: value
        });
    }

    setIsCarton = (value) => {
             
        this.setState({
        	isCarton: value
        });
    }

    setSkuBasicInfoBySkuStore = (value) => {
             
        this.setState({
        	skuBasicInfoBySkuStore: value
        });
    }

    setThermalPrinters = (formattedPrinterList) => {
        this.setState({
            thermalPrinterList: formattedPrinterList
        });
    }

    setBluetoothPrinters = (formattedPrinterList) => {
        this.setState({
            bluetoothPrinterList: formattedPrinterList
        });
    }

    setItemQuantity = (value) => {
         this.setState({
        	itemQuantity: value
        });
    }

    setTotalUnits = (value) => {
             
        this.setState({
        	totalUnits: value
        });
    }

    setCartonCount = (value) => {
             
        this.setState({
        	cartonCount: value
        });
    }


    render = () => (

        <ItemContext.Provider value={{
            searchedInput: this.state.searchedInput,
            setSearchedInput: this.setSearchedInput,
            skuNbr: this.state.skuNbr,
            setSkuNbr: this.setSkuNbr,
            savedRecentSearches: this.state.savedRecentSearches,
            setSavedRecentSearches: this.setSavedRecentSearches,
            itemQuantity: this.state.itemQuantity,
            setItemQuantity: this.setItemQuantity,
            skuBasicInfoBySkuStore: this.state.skuBasicInfoBySkuStore,
            setSkuBasicInfoBySkuStore: this.setSkuBasicInfoBySkuStore,
            setErrorBox : this.setErrorBox,
            errorBox: this.state.errorBox,
            totalUnits: this.state.totalUnits,
            setTotalUnits: this.setTotalUnits,
            selectedPrinter: this.state.selectedPrinter,
            setSelectedPrinter: this.setSelectedPrinter,
            isCarton: this.state.isCarton,
            setIsCarton: this.setIsCarton,
            cartonCount: this.state.cartonCount,
            setCartonCount: this.setCartonCount
        }}>
            <PrinterContext.Provider value={{
                selectedPrinter: this.state.selectedPrinter,
                setSelectedPrinter: this.setSelectedPrinter,
                thermalPrinterList: this.state.thermalPrinterList,
                setThermalPrinters: this.setThermalPrinters,
                bluetoothPrinterList: this.state.bluetoothPrinterList,
                setBluetoothPrinters: this.setBluetoothPrinters
            }}>
                <div className='application-container'>
                    <Router>
                            <Switch>
                                <Route exact path='/' render={props => <HomePage {...props}/>} />
                                <Route path='/product' render={props => <Inquiry {...props}/>} />
                                <Route path='/printers' render={props => <PrinterPage {...props}/>} />	
                            </Switch>
                    </Router>
                </div>
            </PrinterContext.Provider>
        </ItemContext.Provider>
    )


}

export default App;
