import React, {Component} from 'react';
import './Popup.css';

class Popup extends Component {

    render() {
    return(
        <div className="popup" style={this.props.style}>
            <div className="popupCloseButton-icon">&times;</div>
            {this.props.children}
        </div>
    );
}

}

export default Popup;