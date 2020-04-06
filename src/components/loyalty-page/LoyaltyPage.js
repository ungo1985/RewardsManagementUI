import React, { Component } from 'react';
import './LoyaltyPage.css';
import Header from './../header/Header';
import { Link } from 'react-router-dom';
import BackNavigator from "../back-navigator/BackNavigator";
import Context from '../../components/contexts/Context';
import { CUSTOMER_REWARDS, MONTHLY_POINT_THRESHOLD, GOLD_STATUS } from '../../models/Constants';

class LoyaltyPage extends Component{

    renderRewards = () =>{
        let custInfo = this.context.customerInfo;
        if(custInfo && custInfo.monthlyPoints && custInfo.monthlyPoints > MONTHLY_POINT_THRESHOLD){
            return <div className="loyalty_label" data-testid="nonGoldMessage">Customer has {custInfo.monthlyPoints} points for this month and is entitled to one free ice cream or yogurt for this month</div>
        }
        else if(custInfo && custInfo.goldStatusFlag && custInfo.goldStatusFlag === GOLD_STATUS){
            let pts = 0;
            if(custInfo.monthlyPoints){pts = custInfo.monthlyPoints;}
            return (
                <div className="loyalty_label" data-testid="goldMessage">
                    Customer has {pts} points for this month <br/>
                    This customer is entitled to one free ice cream or yogurt for this month for being a gold status customer<br/>
                    Can buy items at 10% discount <br/>
                    Accrues double points for each purchase <br/>
                </div>
            )
        }
        else{return <div data-testid="newMemberMessage"></div>}
    }

	render(){

        let firstName = "", lastName = "";
        if(this.context.customerInfo && this.context.customerInfo.firstName && this.context.customerInfo.lastName){
            firstName = this.context.customerInfo.firstName;
            lastName = this.context.customerInfo.lastName;
        }
        return(
                <Context.Consumer>
                    {(context) => (
                        <div className="loyalty-page" data-testid="loyaltyPage">
                                <Header>
                                    <div data-testid="backNav"><BackNavigator {...this.props} /></div>
                                    <div className="headerTxt" data-testid="loyaltyHeader">Loyalty Card And Rewards</div>
                                    <div>&nbsp;</div>
                                </Header>
                            <div className="line" data-testid="loyaltyCard">
                                <div className="loyalty_label" data-testid="customerName">Thank you {firstName} {lastName} for being a loyal customer</div>
                                <div className="loyalty_label" data-testid="customerId">VIP ID: {this.context.customerId}</div>
                            </div>
                            <div>
                                <div className="rewards-label" id="rewards-label" data-testid="rewardsLabel">{CUSTOMER_REWARDS}</div>
                                <div>{this.renderRewards()}</div>
                            </div>
                                <Link to="/inquiry" data-testid="backButton">
                                    <button id="loyalty-button" className="loyalty-button button-enable">GO BACK</button>
                                </Link>
                        </div>
                    )}
                </Context.Consumer>
        );
    }

}

  LoyaltyPage.contextType = Context;
  export default LoyaltyPage;