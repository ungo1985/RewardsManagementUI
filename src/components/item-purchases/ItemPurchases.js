import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import './Collapsible.css';

export default class ItemPurchases extends Component {

    setStateForPropChange = () => {
        let isDisabled = false;
        let children = this.props.children;
        if (!children || children === "") {
            isDisabled = true;
        }
       return isDisabled;
    }

    /**
     * This function takes the first word from otherLocationTitle and returns it for ID purposes
     * @method  getCollapsibleId
     * @param  {}
     * @returns  {String}
     */
    getCollapsibleId = () => {
        if (!this.props.otherLocationTitle) {
            return;
        }
        let ids = this.props.otherLocationTitle.split(" ");
        return ids[0].toString();
    }

    /**
     * This function takes the element id and focuses on the appropriate collapsible component
     * @method  focus
     * @property loc    object    The html element to scroll too.
     * @returns  element
     */
    focus = () => {
        // Set the page scroll to the element's position
        // on the page minus the offset of 120 pixels
        let loc = document.getElementById(this.props.id);
        let heightOfHeaderAndSkuNumberDiv = document.getElementsByClassName("header")[0].clientHeight + document.getElementsByClassName("sku-div-header")[0].clientHeight;
        return window.scroll(0,loc.offsetTop - heightOfHeaderAndSkuNumberDiv);

    }

    render() {
        return (
            <div id={this.props.id}>
                <Collapsible trigger={this.props.purchasesTitle} triggerDisabled={this.setStateForPropChange()} open={this.props.isOpen} transitionTime={100}>
                <div id={this.getCollapsibleId()}>{this.props.children}</div>
                </Collapsible>
            </div>
        );

    }
    
}


