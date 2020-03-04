import React, {Component} from 'react';
import './HomePage.css'
import rewardsImage from './../../images/Rewards.PNG'
import scanTypesImage from './../../images/scan_types_320x134.png'
import Header from './../header/Header'
import SearchModal from "./../search-modal/SearchModal"
import Scan from './../scan/Scan';
import Context from '../../components/contexts/Context'
import { HOME_PAGE_LABEL, SCAN_SEARCH, ADD_CUSTOMER} from '../../models/Constants';
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
        this.skuScanFxn = this.skuScanFxn.bind(this);
    }

    componentDidMount() {
        Scan.getScans(this.skuScanFxn);

        this.setState({
            fromPage:this.props.location.pathname
        });
    }

    componentDidUpdate() {
        Scan.getScans(this.skuScanFxn);
    }

    skuScanFxn = (e) => {
        let scannedInput = e;
        if (!scannedInput) {
            return;
        }
        console.log("Homepage scannedInput = " + scannedInput);
        this.context.setSearchedInput(scannedInput);
        this.props.history.push(
            { 
                pathname: './inquiry', 
                state: 
                { 
                    searchInput: scannedInput,
                    fromPage: this.state.fromPage
                }
            }
        );
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
                            <div className="rewards-image"><img src={rewardsImage} alt="rewards image"/></div>
                        </div>
                        <div className={"label " + (this.state.showSearchModal ? 'hide': '')} id="label">{HOME_PAGE_LABEL}</div>
                        <div className={"search-text-box "+(this.state.showSearchModal ? 'hide': '')} onClick={() => {this.setStateForModal(true)}}></div>
                        {this.renderSearchModal(this.state.showSearchModal)}
                        <Link to="/form">
                            <button type="button" className="button btnContainer">{ADD_CUSTOMER}</button>
                        </Link>
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