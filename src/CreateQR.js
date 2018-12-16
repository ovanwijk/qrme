import {SHA256, AES, enc} from 'crypto-js';

/**
 * e=encrypted true/false
 * b=base64 value
 * s=sha256keychecksum
 * k=transfer key
 * c=checksumvalue
 */

var qrTransferDefaultSettings = {
    filename: "qrtransfer",
    window_stay_open: 0, //0=close, !=0 == stay open
    qrsize: 256, //must factor of 2
    ipfs_location: "QmeyUe1AU959U2xEWYQtgK196Ercree3o4ao4VVNfFawDp",
    ipfs_node: "https://ipfs.io/ipfs/"
}

export function setConfig(newConfig = {}){
    Object.assign(qrTransferDefaultSettings, newConfig);
}

export function getConfig(){
    return qrTransferDefaultSettings;
}

export function unencryptedTransferQR(textValue, options = {}){
    var toReturn =  JSON.stringify({
        e: false,    
        b: btoa(textValue)
      });
    var filename = options.filename || qrTransferDefaultSettings.filename;
    var window_stay_open = options.window_stay_open || qrTransferDefaultSettings.window_stay_open;
    var qrsize = options.qrsize || qrTransferDefaultSettings.qrsize;
    var ipfs_location = qrTransferDefaultSettings.ipfs_location;
    var ipfs_node = qrTransferDefaultSettings.ipfs_node;
    return ipfs_node +
        ipfs_location + "/#/qr/" +
        filename + "/" + qrsize + "/" +
        window_stay_open + "/"+  encodeURIComponent(toReturn);
}

export function encryptedTransferQR(textValue, randomSet, options = {}){
    var encrypted_value = AES.encrypt(textValue, randomSet.transfer_key).toString();
    var toReturn =  JSON.stringify({
      e: true,    
      b: encrypted_value,
      s: SHA256(randomSet.random_value).toString().substr(60)
    }); 
    var filename = options.filename || qrTransferDefaultSettings.filename;
    var window_stay_open = options.window_stay_open || qrTransferDefaultSettings.window_stay_open;
    var qrsize = options.qrsize || qrTransferDefaultSettings.qrsize;
    var ipfs_location = qrTransferDefaultSettings.ipfs_location;
    return "https://ipfs.io/ipfs/" +
        ipfs_location + "/#/qr/" +
        filename + "/" + qrsize + "/" +
        window_stay_open + "/"+ encodeURIComponent(toReturn);
  }

  export function generateRandomValues(randomLength = 16, passwordLength = 16){
    const validChars = 'abcdefghijklmnopqrstuvwqxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const newRandom = Array.from(new Array(randomLength), (x, i) => validChars[Math.floor(Math.random() * validChars.length)]).join('');
    const newPassword = Array.from(new Array(passwordLength), (x, i) => validChars[Math.floor(Math.random() * validChars.length)]).join('');
    return {
        random_value: newRandom,
        transfer_key: newPassword
    }
  }

  
export function transferKeyQR(randomSet){
    var toReturn = JSON.stringify({
       k: randomSet.transfer_key,
       c: AES.encrypt(randomSet.random_value, randomSet.transfer_key).toString()
    });
    return toReturn;
  }