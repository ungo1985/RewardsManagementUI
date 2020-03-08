import React, { Component } from 'react';
import ReactGA from 'react-ga';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Inquiry from '../../components/inquiry-page/Inquiry'
import HomePage from '../home-page/HomePage'
import Context from '../../components/contexts/Context'
import PrinterPage from '../printer-page/PrinterPage';
import Profile from "../../models/Profile";
import { getToken, manageRecentSearchList } from '../Util/util';
import { APP_VERSION_FILE} from '../../models/Constants';
import FormPage from '../form-page/FormPage';
import DeletePage from '../delete-page/DeletePage';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchedInput: '',
            customerId: '',
            customerInfo: null,
            purchaseInfo: null,
            savedRecentSearches: [],
            showSearchModal: false,
            isLoading: true,
            itemQuantity: '',
            errorBox: null
        }

        this.readTextFile(APP_VERSION_FILE);
        this.readIntentFromDevice();
    }

    readIntentFromDevice() {
        getToken(this.deviceCallBackFn);
    }

    deviceCallBackFn = (e) => {
        Profile.setTokenData(e.userData.thdSsoToken);
        Profile.userId(e.userData.associateUserID);
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

    setCustomerInfo = (value) => {
        this.setState({
        	customerInfo: value
        });
    }

    setPurchaseInfo = (value) => {
        this.setState({
        	purchaseInfo: value
        });
    }

    setCustomerId = (value) => {
        this.setState({
        	customerId: value
        });
    }


    setSavedRecentSearches = (value) => {

        let newList = manageRecentSearchList(this.state.savedRecentSearches, value )

        this.setState({
        	savedRecentSearches: newList
        }, ()=> {
        });
    }


    render = () => (

        <Context.Provider value={{
            searchedInput: this.state.searchedInput,
            setSearchedInput: this.setSearchedInput,
            savedRecentSearches: this.state.savedRecentSearches,
            setSavedRecentSearches: this.setSavedRecentSearches,
            setErrorBox : this.setErrorBox,
            errorBox: this.state.errorBox,
            customerInfo: this.state.customerInfo,
            setCustomerInfo: this.setCustomerInfo,
            purchaseInfo: this.state.purchaseInfo,
            setPurchaseInfo: this.setPurchaseInfo,
            customerId: this.state.customerId,
            setCustomerId: this.setCustomerId
        }}>
                <div className='application-container'>
                    <Router>
                            <Switch>
                                <Route exact path='/' render={props => <HomePage {...props}/>} />
                                <Route path='/inquiry' render={props => <Inquiry {...props}/>} />
                                <Route path='/form' render={props => <FormPage {...props}/>} />
                                <Route path='/delete' render={props => <DeletePage {...props}/>} />
                            </Switch>
                    </Router>
                </div>
        </Context.Provider>
    )


}

export default App;
