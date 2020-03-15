import React, {Component} from 'react';
import './HomePage.css'
import rewardsImage from './../../images/Rewards.PNG'
import Header from './../header/Header'
import SearchModal from "./../search-modal/SearchModal"
import Context from '../../components/contexts/Context'
import { HOME_PAGE_LABEL, ADD_CUSTOMER, DAILY_PURCHASE_REPORT} from '../../models/Constants';
import { Link } from 'react-router-dom';

class HomePage extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            showSearchModal: false,
            fromPage: ''
        }
        this.renderSearchModal = this.renderSearchModal.bind(this);
        this.setStateForModal = this.setStateForModal.bind(this);
    }

    componentDidMount() {
        this.setState({
            fromPage:this.props.location.pathname
        });
                //resetting context
         this.context.setSearchedInput("");
         this.context.setCustomerInfo(null);
         this.context.setPurchaseInfo(null);
         this.context.setCustomerId("");
    }

    renderSearchModal(value){
        let display = value;
        
        if(display && display === true){
            return <SearchModal {...this.props} setStateForModal={this.setStateForModal}></SearchModal>
        }
    }

    setStateForModal(value){
        this.setState({
            showSearchModal: value
        }, () => this.renderSearchModal(value));
       
    }

    render(){
        return(
            <Context.Consumer>
            {({ searchedInput }) => (
                <Context.Consumer>
                {(context) => (
                    <div className="homePage">
                        <Header headerTextClassName="titleTxt" id="titleTxt">Rewards Management System</Header>
                        <div id="rewards-image">
                            <div className="rewards-image"><img src={rewardsImage} alt="rewards"/></div>
                        </div>
                        <div className={"label " + (this.state.showSearchModal ? 'hide': '')} id="label">{HOME_PAGE_LABEL}</div>
                        <div className={"search-text-box "+(this.state.showSearchModal ? 'hide': '')} onClick={() => {this.setStateForModal(true)}}></div>
                        {this.renderSearchModal(this.state.showSearchModal)}
                        <div>
                            <Link to="/dailyReport">
                                <button type="button" className="button btnContainer reportButton">{DAILY_PURCHASE_REPORT}</button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/form">
                                <button type="button" className="button btnContainer addCustomerButton">{ADD_CUSTOMER}</button>
                            </Link>
                        </div>
                    </div>
                )}
                </Context.Consumer>
            )}
	        </Context.Consumer>
        );
    }
}

  HomePage.contextType = Context;
  export default HomePage;