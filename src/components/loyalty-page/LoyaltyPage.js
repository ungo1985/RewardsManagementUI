import React, { Component } from 'react';
import './LoyaltyPage.css';
import Header from './../header/Header';
import { Link } from 'react-router-dom';
import BackNavigator from "../back-navigator/BackNavigator";
import Context from '../../components/contexts/Context';

class LoyaltyPage extends Component{

	render(){
        return(
                <Context.Consumer>
                    {(context) => (
                        <div className="loyalty-page">
                                <Header>
                                    <BackNavigator {...this.props} />
                                    <div className="headerTxt">Loyalty Card</div>
                                    <div>&nbsp;</div>
                                </Header>
                            <div className="line">
                                <div className="loyalty_label">Thank you {this.context.customerInfo.firstName} {this.context.customerInfo.lastName} for being a loyal customer</div>
                                <div className="loyalty_label">VIP ID: {this.context.customerId}</div>
                            </div>
                                <Link to="/inquiry">
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