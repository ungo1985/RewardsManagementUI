import Profile from "../../models/Profile";
import { BROWSER, ZEBRA_PRINTER, ZEBRA, DATAMAX_PRINTER,
     DATAMAX_PREFIX, DATAMAX, BLUETOOTH_TIMEOUT, 
     ZEBRA_MODEL_ZQ510, DATAMAX_MODEL_OC2 } from "../../models/Constants";
import { transformToMac } from '../Util/util';

export function enableBlueTooth(callBackFn) {

    var success = function (intent) {
        if (intent && intent === "OK") {
            console.log("Bluetooth is successfull ", intent);
            callBackFn(true);
        } else {
            console.log("Bluetooth is unsuccessfull ", intent)
        }
    };

    var fail = function (error) {
        console.log("Bluetooth enable error ", error);
    };

    if (Profile.getEnvironment() === BROWSER) {
        console.log("Bluetooth enabled in browser")
    } else if (window.plugin && window.plugin.bluetooth) {
        window.plugin.bluetooth.isEnabled((btEnabled) => {
            if (btEnabled && btEnabled === true) {
                console.log("Bluetooth already enabled");
            } else {
                console.log("Enabling the bluetooth ");
                window.plugin.bluetooth.enable(success, fail);
            }
        }, (error) => {
            console.log("Bluetooth errored ", error)
            window.plugin.bluetooth.enable(success, fail);
        })
    }
}

export function disableBlueTooth() {
    if (Profile.getEnvironment() === BROWSER) {
        console.log("Bluetooth disabled in browser")
    } else if (window.plugin && window.plugin.bluetooth) {
        window.plugin.bluetooth.disable((btDisabled) => {
            if (btDisabled && btDisabled === true) {
                console.log("Bluetooth disabled");
            } else {
                console.log("Bluetooth not disabled");
            }
        }, (err) => {
            console.log("Bluetooth disable errored ", err);
        });
    }
}

export function pairWirelessDevice(printerBarcode, printerListCallBack) {
    let macAddress = transformToMac(printerBarcode);
    let pairSuccess = false;
    let counter = 0;
    const MAX_RETRY = 5;

    var btEnableFail = function (error) {
        console.log("Bluetooth not enabled - ", error);
        printerListCallBack(false);
    };

    var pairingFail = function (error) {
        console.log("Bluetooth not paired - ", error);
        printerListCallBack(false);
    };

    var connectionSuccess = function (response) {
        if (response && response === true) {
            console.log("Pairing is connected - ",response);
            printerListCallBack(true);
        } else {
            console.log("Pairing is not connected - ", response);
            pairSuccess = false
            checkPairingSuccess();
        }
    }

    var connectionFail = function (exception) {
        console.log("exception in connection - ", exception);
        pairSuccess = false
        printerListCallBack(false);
    }

    var checkPairingSuccess = () => {
        if (!pairSuccess && counter < MAX_RETRY) {
            console.log("counter " ,counter);
            console.log("pairSuccess"  ,pairSuccess);
            counter++;
            setTimeout(() => {
                window.plugin.bluetooth.isConnected(connectionSuccess, connectionFail);
            }, BLUETOOTH_TIMEOUT);
        } else if (!pairSuccess && counter === MAX_RETRY) {
            printerListCallBack(false);
        }
    }

    if (Profile.getEnvironment() === BROWSER) {
        console.log("Bluetooth disabled in browser");
        setTimeout(() => {
            printerListCallBack(true);
        }, BLUETOOTH_TIMEOUT);
    } else if (window.plugin && window.plugin.bluetooth) {
        window.plugin.bluetooth.isEnabled((sucs) => {
            console.log("Bluetooth is enabled - ", sucs);
            window.plugin.bluetooth.pair(macAddress, () => {
                checkPairingSuccess();
            }, pairingFail);
        }, btEnableFail);
    }
}

export function printToBtDevice(bufferData, callBackFn) {
    window.plugin.bluetooth.writeBinary(bufferData, (suc)=>{
        console.log("success response from bt printer ",suc);
        callBackFn(suc);
    }, (fail)=>{
        console.log("fail response from bt printer ",fail);
        callBackFn(false);
    })
}


export function getBlueToothObj(scannedInput, inputType) {
    let bluetoothPrinter = {};
    if(inputType === ZEBRA_PRINTER){
        bluetoothPrinter = {
            printerUxQueueName: scannedInput,
            printerDescription: ZEBRA + scannedInput,
            printerType: ZEBRA,
            printerModel: ZEBRA_MODEL_ZQ510
        }
    }
    else if(inputType === DATAMAX_PRINTER){
        scannedInput = scannedInput.replace(DATAMAX_PREFIX, '');
        bluetoothPrinter = {
            printerUxQueueName: scannedInput,
            printerDescription: DATAMAX + scannedInput,
            printerType: DATAMAX,
            printerModel: DATAMAX_MODEL_OC2
        }
    }
    return bluetoothPrinter;

}
