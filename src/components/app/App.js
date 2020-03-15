import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Inquiry from '../../components/inquiry-page/Inquiry'
import HomePage from '../home-page/HomePage'
import Context from '../../components/contexts/Context'
import { manageRecentSearchList } from '../Util/util';
import FormPage from '../form-page/FormPage';
import DeletePage from '../delete-page/DeletePage';
import DailyReport from '../daily-report/DailyReport';
import LoyaltyPage from '../loyalty-page/LoyaltyPage';

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
            serviceDown: false,
            customerNotFound: false
        }
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

    setServiceDown = (value) => {
        this.setState({
        	serviceDown: value
        });
    }

    setCustomerNotFound = (value) => {
        this.setState({
        	customerNotFound: value
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
            setCustomerId: this.setCustomerId,
            serviceDown: this.state.serviceDown,
            setServiceDown: this.setServiceDown,
            customerNotFound: this.state.customerNotFound,
            setCustomerNotFound: this.setCustomerNotFound
        }}>
                <div className='application-container'>
                    <Router>
                            <Switch>
                                <Route exact path='/' render={props => <HomePage {...props}/>} />
                                <Route path='/inquiry' render={props => <Inquiry {...props}/>} />
                                <Route path='/form' render={props => <FormPage {...props}/>} />
                                <Route path='/delete' render={props => <DeletePage {...props}/>} />
                                <Route path='/dailyReport' render={props => <DailyReport {...props}/>} />
                                <Route path='/loyalty' render={props => <LoyaltyPage {...props}/>} />
                            </Switch>
                    </Router>
                </div>
        </Context.Provider>
    )


}

export default App;
