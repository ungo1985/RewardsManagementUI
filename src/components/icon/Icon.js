import React, {Component} from 'react';
import "./Icon.css"
import '../../dist/uxicon.min.css';
import PropTypes from 'prop-types'

export default class Icon extends Component {

    getIcon = () => {
        return (this.props.src === null || this.props.src === "undefined" || this.props.src === undefined)
            ? <i className={this.props.iconClass + " icon"}></i>
            : <img  src={this.props.src} className={this.props.iconClass + " icon"} alt=""></img>
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.getIcon()
                }

            </React.Fragment>
        );
    }
}

Icon.propTypes = {
    src: PropTypes.string,
    iconClass: PropTypes.string
}