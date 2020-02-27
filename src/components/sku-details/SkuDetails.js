import React, { Component } from 'react';
import './SkuDetails.css'
import Context from '../contexts/Context';
import { CLEARANCE, PENNY_SKU, ZERO_RETAIL, 
    THREE_DIGITS_OR_LESS, ENTER_QTY_BEFORE_PRINT, TOTAL_UNIT_EXCEEDED,
    TOTAL_PRICE_EXCEEDED_1, TOTAL_PRICE_EXCEEDED_2, 
    TOTAL_PRICE_THRESHOLD, PACK_SIZE_NOT_FOUND,
    PENNY_SKU_MESSAGE, ZERO_RETAIL_MESSAGE, MAMA_SKU, BABY_SKU,
     MAMA_SKU_MESSAGE, BABY_SKU_MESSAGE, TOTAL_UNIT_COUNT_THRESHOLD} from '../../models/Constants';
class SkuDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            skuBasicInfo: null,
            cartonInputQty: 1,
            isCarton: false,
            inlineErrorMessage: '',
            totalUnits: 0,
            cartonCount: this.props.cartonCount,
            cartonCountFailure: this.props.cartonCountFailure,
            skuBadge: ''
        }

        this.renderStatus = this.renderStatus.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
    }

    
    /**
     * This function used to set the default input qty 1 when scan carton
     * Also calculate default totalUnits and set it in state 
     */
    componentDidMount() {
        if (!this.context.itemQuantity && this.props.isCarton) {
            this.context.setItemQuantity(this.state.cartonInputQty);
            this.context.setTotalUnits(this.state.cartonInputQty * this.state.cartonCount);
        }
    }

    /**
     * This function will be called user change the Quantity
     * Validate the Input Qty and set the InlineErrorMessage
     * @param  {} e
     */
    handleQuantityChange(e) {

        e.target.value = e.target.value.replace(/^0+/, '')
        if (e.target.value > TOTAL_UNIT_COUNT_THRESHOLD) {

            this.setState({
                inlineErrorMessage: 'FOUR_DIGIT_NUMBER',
                errorFlag: true
            });

            e.target.value = e.target.value.slice(0, 4);

        } else {
            this.validateInputQty(e);
        }
    }

    /**
     * This function used to validate InputQty 
     * and set the inlineError Message in state
     * 
     * @param  {} e
     */
    validateInputQty(e) {
        let inputVal = e.target.value;
        let totalUnits = 0;
        if (inputVal <= TOTAL_UNIT_COUNT_THRESHOLD && inputVal > 0) {
            // Total Units Handled With User Input Qty 
            if (inputVal && this.state.cartonCount && typeof this.state.cartonCount == 'number') {
                totalUnits = inputVal * this.state.cartonCount;
            }
        }
        this.context.setItemQuantity(inputVal);
        this.context.setTotalUnits(totalUnits);
        this.setState({inlineErrorMessage: totalUnits > TOTAL_UNIT_COUNT_THRESHOLD ? 'TOTAL_UNIT_MAX' : '', errorFlag: true});

        if (inputVal !== '') {
                this.props.resetErrorFlg(false);
        }
    }

    enterPressed(e) {
        if(e.keyCode === 13 || e.keyCode === 9){
            this.props.handlePrintOnQtyEnterBtn(true);
        }
     }

    /**
     * This function will return CSS class depending on value of param
     * @param String param
     */
    renderStatus = (param) => {

        switch (param) {
            case CLEARANCE:
                return 'sku-details-status-clearance';
            case PENNY_SKU:
            case ZERO_RETAIL:
            case BABY_SKU:
            case MAMA_SKU:
                return 'sku-details-warning-status';
            default:
                return;
        }
    }

    
    /**
     * This function used to render Qty information
     * Qty Information : Carton, Simple Quantity
     */
    renderQty = () => {

        if (this.props.isCarton) {
            // Render Simple Quantity Details
            return this.renderCartonQtyDetails();
        } else {
            // Render Carton Quantity Details
            return this.renderSimpleQtyDetails();
        }
    }

    /**
     * TODO Refactor code since we set the values in the Context
     * */
    calculateTotalUnits = () => {
        
        let totalUnits = this.context.totalUnits;
        if (totalUnits > TOTAL_UNIT_COUNT_THRESHOLD) {
            return (<div className="sku-details-error-validation" > "Error" </div>);
        }
        return totalUnits;
    }

    calculateTotalPrice = () => {
        let totalPrice = 0;
        let itemPrice = this.calculateItemPrice();
        totalPrice = itemPrice * this.context.itemQuantity;
        return totalPrice;
    }

    calculateItemPrice = () => {
        let basicInfo = this.props.skuBasicInfo;
        let itemPrice = "--";
        if (basicInfo && basicInfo.prices && basicInfo.prices.length > 0) {
            itemPrice = this.getCorrectPrice(basicInfo);
        }
        return itemPrice;
    }

    determineRelativeSku = () => {
        let relSku = "";
        let basicInfo = this.props.skuBasicInfo;
        if(basicInfo) {
            if(basicInfo.babySku) {
                relSku = BABY_SKU;
            } else if (basicInfo.mamaSku) {
                relSku = MAMA_SKU;
            }
        }
        return relSku;
    }

    /**
     * TODO : Refactor
     * This function used to Show Inline Error Message
     * 
     */
    getInlineErrorMessage = (param) => {   
        switch (param) {
            case 'FOUR_DIGIT_NUMBER':
                return THREE_DIGITS_OR_LESS;
            case 'MUST_HAVE_QTY_B4_PRINT':
                return ENTER_QTY_BEFORE_PRINT;
            case 'TOTAL_UNIT_MAX':
                return TOTAL_UNIT_EXCEEDED;
            case 'TOTAL_PRICE_EXCEEDED':
                return TOTAL_PRICE_EXCEEDED_1 + TOTAL_PRICE_THRESHOLD + TOTAL_PRICE_EXCEEDED_2;
            case 'CARTON_COUNT_FAILURE':
                return PACK_SIZE_NOT_FOUND;
            case 'PENNY SKU':
                return PENNY_SKU_MESSAGE;
            case 'ZERO RETAIL':
                return ZERO_RETAIL_MESSAGE;
            case MAMA_SKU:
                return MAMA_SKU_MESSAGE;
            case BABY_SKU:
                return BABY_SKU_MESSAGE;
            default:
                return '';
        }
    }


    /**
     * This function used to get SKU Status Information 
     * @param  {} status
     * @param  {} basicInfo
     * @param  {} price
     * Priority of badge displayed - pivotal story #170740827
     */
    getSkuStatus(status, basicInfo, price) {
        status = "";
        let skuStatus = basicInfo.skuStatus ? basicInfo.skuStatus.toUpperCase() : '';
        
        price = Number(price);
        if (price === 0) { 
            status = ZERO_RETAIL;
        }
        else if (price > 0 && price < 0.02) {
            status = PENNY_SKU;
        }
        //Price not obtained from service
        else if(isNaN(price)){
            status = ZERO_RETAIL;
        }

        if(status === "" && basicInfo.isRelativeSku) {
           status = this.determineRelativeSku();
        }

        if (status === "" && skuStatus === CLEARANCE) {
            status = skuStatus;
        }

        return { status };
    }

    
    /**
     * This function used to get Correct Price Information from SKUBasicInfo
     * @param  {} skuBasicInfo
     */
    getCorrectPrice = (skuBasicInfo) => {
        let priceArray = skuBasicInfo.prices;
        if (priceArray) {
            if (priceArray.length === 1) {
                return priceArray[0].price.toFixed(2);
            }
            else {

                // declare variables
                let effective = ""
                    , permanent = ""
                    , temporary = ""
                    , currentPrice = "";

                // First, get all price values
                // ---------------------------
                for (let i = 0; i < priceArray.length; i++) {
                    if (priceArray[i].type.toUpperCase() === 'EFFECTIVE') {
                        effective = priceArray[i].price.toFixed(2);
                    }
                    else if (priceArray[i].type.toUpperCase() === 'PERMANENT') {
                        permanent = priceArray[i].price.toFixed(2);
                    }
                    else if (priceArray[i].type.toUpperCase() === 'TEMPORARY') {
                        temporary = priceArray[i].price.toFixed(2);
                    }
                }

                // This is the Pricing Logic:
                // --------------------------
                if (effective !== "") {
                    currentPrice = effective;
                } else if (permanent !== "") {
                    currentPrice = permanent;
                } else if (temporary !== "") {
                    currentPrice = temporary;
                }

                return currentPrice;

            }
        }
    }

    
    /**
     * This function Used to Render Carton Quantity details
     */
    renderCartonQtyDetails = () => {
        return (<div className="sku-details-quantity">
            <div className="flexinline">
                <div> Carton Qty </div>
                <div> Unit/Carton</div>
                <div> Total Units</div>
            </div>
            <div className="clearDiv"></div>
            <div className="flexinline">
                <div className="sku-quantity-input">
                    <input type="number" className="textbox-border" name="quantity"
                        value={this.context.itemQuantity}
                        onChange={this.handleQuantityChange} 
                        onKeyDown={this.enterPressed}
                    />

                </div>
                <div className="sign">x</div>
                <div className="carton-units">
                    {this.context.cartonCount}
                </div>
                <div className="sign">=</div>
                <div className="unit-total">
                    {this.context.totalUnits > TOTAL_UNIT_COUNT_THRESHOLD ? <div className="sku-details-error-validation" > "Error" </div> : this.context.totalUnits}
                </div>
            </div>
        </div>);
    }

    
    /**
     * This function used to render simple qty details
     */
    renderSimpleQtyDetails = () => {
        return <div className="sku-details-quantity">
            Quantity
            <div className="clearDiv"></div>
            <div className="sku-quantity-input">
                <input type="number" className="textbox-border" name="quantity"
                    value={this.context.itemQuantity} onChange={this.handleQuantityChange}
                    onKeyDown={this.enterPressed}
                />
            </div>

        </div>;
    }

    
    /**
     * This function used to show Inline Error Message
     * example :  'Four Digits or Less Only',
                  'Enter Qty Before Printing',
                  'Total Unit Count Cannot Exceed 999' 
     */
    renderInlineErrorMessage = () => {
        console.log("this.props.errorFlag::::" + this.props.errorFlag);
        let inlineErrorMessage = this.state.inlineErrorMessage;
        let itemPrice = Number(this.calculateItemPrice());
        let skuRelation = this.determineRelativeSku();
        
        if (this.props.errorFlag) {
            inlineErrorMessage = 'MUST_HAVE_QTY_B4_PRINT';
        } 
        else if (this.context.totalUnits > TOTAL_UNIT_COUNT_THRESHOLD) {
            inlineErrorMessage = 'TOTAL_UNIT_MAX';
        }
        else if(this.calculateTotalPrice() > TOTAL_PRICE_THRESHOLD){
            inlineErrorMessage = 'TOTAL_PRICE_EXCEEDED';
        }
        else if(this.state.cartonCountFailure === true){
            inlineErrorMessage = 'CARTON_COUNT_FAILURE';
        }
        else if(itemPrice > 0 && itemPrice < 0.02){
            inlineErrorMessage = 'PENNY SKU';
        }
        else if(itemPrice === 0 || isNaN(itemPrice)){
            inlineErrorMessage = 'ZERO RETAIL';
        }
        else if (skuRelation === MAMA_SKU) {
            inlineErrorMessage = MAMA_SKU ;
        } 
        else if (skuRelation === BABY_SKU) {
            inlineErrorMessage = BABY_SKU ;
        }
        console.log("inlineErrorMessage::::" + inlineErrorMessage);
        return <div className="sku-details-error-validation" > {this.getInlineErrorMessage(inlineErrorMessage)} </div>
    }

   

    render() {

        let basicInfo = this.props.skuBasicInfo;

        let skuDesc = "--", price = "--", status = "--";
        if (basicInfo) {
            if (basicInfo.skuDescription) {
                skuDesc = basicInfo.skuDescription;
            }

            if (basicInfo.prices && basicInfo.prices.length > 0) {
                price = this.getCorrectPrice(basicInfo);
            }

            if (basicInfo.skuStatus) {
                ({ status} = this.getSkuStatus(status, basicInfo, price));
            }
        }
        let opacityEnabled = this.props.errorBox && (!this.props.errorBox.printError);

        return (
            <div className={"sku-details-div " + (opacityEnabled ? 'opacity' : '')} >

                <div className="sku-div"><span className="sku-text">SKU:</span> <span
                    className="sku-number">{this.props.sku_nbr}</span></div>

                <div className="sku-details-desc">{skuDesc}
                </div>
                <div className="flexinline">
                    <div className={this.renderStatus(status)} id="sku-details-status">
                        <div className="sku-details-status-text">
                            {status}
                        </div>
                    </div>
                    <div className="sku-details-price">
                        {price}
                    </div>
                </div>


                {this.renderQty()}

                {this.renderInlineErrorMessage()}

            </div>
        );


    }

   
}
SkuDetails.contextType = Context;
export default SkuDetails;