import { fetchPrinters } from "../../api/endpoints";
import { THERMAL_PRINTER_TYPE, CART_PRINTER } from "../../models/Constants";

export function getThermalPrinters(callBackFn) {
    fetchPrinters(THERMAL_PRINTER_TYPE)   
        .then(response =>{        
            if(response && response.printerList && response.printerList.length>0){
                console.log("printers length: ", response.printerList.length);
                let thermalPrinters =  formatPrinterList(response.printerList);
                callBackFn(thermalPrinters);
            }
        }).catch(error => {            
            console.log("ERROR FETCHING PRINTER LIST: ", error);       
        });
}

export function formatPrinterList (printers) {
    let formattedPrinterList = [];

    if (printers && printers.length) {
        for (let index = 0; index < printers.length; index++) {
            const element = printers[index];
            let obj = {}
            obj.printerUxQueueName = element.printerId;
            obj.printerDescription = element.printerDescription;
            obj.printerType = CART_PRINTER;
            formattedPrinterList.push(obj);
        }
    }
    return formattedPrinterList;
}