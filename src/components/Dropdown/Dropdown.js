import React, {Component} from 'react';	
// import ReactDOM from 'react-dom';	
import './Dropdown.css'
class Dropdown extends Component {  	

    constructor(props) {	
      super(props);    	
      this.state = {	
        newSelectedPrinter: []
      };	

      this.handlePrinterChange = this.handlePrinterChange.bind(this);	
    }	

    handlePrinterChange(e) {	
      console.log("User selected printer ",e.target.value);	
      let selectedPrinterList = this.props.data.filter(function(item){
        if(item.printerUxQueueName === e.target.value)
          { return item} 
        else return null;
      });
    
      this.setState({newSelectedPrinter: selectedPrinterList}, () => {
        this.props.getInput(selectedPrinterList);
      }); 
  }	

    render () {	

      let printers = this.props.data;
      let currentSelectedPrinter = (this.props.selectedPrinter && this.props.selectedPrinter.length > 0)? this.props.selectedPrinter[0].printerUxQueueName : '';

      return (	

        <div className="border">
          <select value={currentSelectedPrinter} 	
                  onChange={ this.handlePrinterChange }>	
                  <option value="">Select Printer</option>	
            { printers && printers.length > 0 && 
            printers.map((item) => <option key={item.printerUxQueueName} value={item.printerUxQueueName}>{item.printerDescription}</option>)
            }
          </select>	
      </div>	
      )	
    }	
  }	


  export default Dropdown