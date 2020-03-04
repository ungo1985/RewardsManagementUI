import React, { Component } from 'react';
import './FormPage.css';
import Header from './../header/Header';
import BackNavigator from "../back-navigator/BackNavigator";

class FormPage extends Component{
    render(){
        return(
            <div className="form-page">
                    <Header>
                        <BackNavigator {...this.props} />
                        <div className="headerTxt">Customer Form</div>
                        <div>&nbsp;</div>
                    </Header>
                <div className="form_label">First Name</div>
                <div className="form-textbox"><input type="text"></input></div>
                <div className="form_label">Last Name</div>
                <div className="form-textbox"><input type="text"></input></div>
                <div className="form_label">Street Address</div>
                <div className="form-textbox"><input type="text"></input></div>
                <div className="form_label">City</div>
                <div className="form-textbox"><input type="text"></input></div>
                <div className="form_label">State</div>
                <div className="form-textbox">
                    <select>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className="form_label">Zip Code</div>
                <div className="form-textbox"><input type="number"></input></div>
                <div className="form_label">Birthday</div>
                <div className="form-textbox"><input type="date"></input></div>
                <div id="submit-button" className="submit-button"><input type="submit"></input></div>
            </div>
        )
    }
}
export default FormPage;