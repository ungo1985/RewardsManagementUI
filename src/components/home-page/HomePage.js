import React, {Component} from 'react';
import './HomePage.css'
import scanImage from './../../images/scan_sku_to_start.svg'
import scanTypesImage from './../../images/scan_types_320x134.png'
import Header from './../header/Header'
import SearchModal from "./../search-modal/SearchModal"
import Scan from './../scan/Scan';
import ItemContext from '../../components/contexts/ItemContext'
import PrinterContext from '../contexts/PrinterContext';
import PrintComponent from '../print-component/PrintComponent';
import { HOME_PAGE_LABEL} from '../../models/Constants';
import {SCAN_SEARCH} from '../../models/Constants';

class HomePage extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            showSearchModal: false,
            bluetoothPrinterList: [],
            selectedPrinter: [],
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
                pathname: './product', 
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
            <ItemContext.Consumer>
            {({ searchedInput }) => (
                <PrinterContext.Consumer>
                {(printerContext) => (
                    <div className="homePage">
                        <Header headerTextClassName="titleTxt" id="titleTxt">Rewards Management System</Header>
                        <div id="scan-image" className="scan-image">
                            <div className="scan-types-image"><img src={scanTypesImage} alt=""/></div>
                            <img src={scanImage} alt=""/>
                        </div>
                        <div className={"label " + (this.state.showSearchModal ? 'hide': '')} id="label">{HOME_PAGE_LABEL}</div>
                        <div className={"search-text-box "+(this.state.showSearchModal ? 'hide': '')} onClick={() => {this.setStateForModal(true)}}></div>
                        {this.renderSearchModal(this.state.showSearchModal)}
                        <PrintComponent {...this.props} selectedPrinter={printerContext.selectedPrinter} ></PrintComponent>
                    </div>
                )}
                </PrinterContext.Consumer>
            )}
	        </ItemContext.Consumer>
        );
    }
}

  HomePage.contextType = ItemContext;
  export default HomePage;