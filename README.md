# qrme
decentralized IPFS based QRCode download linker.

This is a small library with a single file to create the URL encoding required for an IPFS
based page to react on the visual transfer of QR codes. You are yourself responsible for making the QR code itself.

To support the project please help pinning the exposed app on your IPFS node:

    ipfs pin QmeyUe1AU959U2xEWYQtgK196Ercree3o4ao4VVNfFawDp


## How to use
Generate random values (Random value + AES key):

    var randomSet = QRME.generateRandomValues();

Create the data encrypted data transfer

     var QRCodeData = QRME.encryptedTransferQR("Hello secret world",randomSet, {
          filename: "helloworld"
        }));

This generates URL with encrypted payload that you can use to generate the QR code.

If someone scans that QR code they will be requested to give a key. The key can be entered manually or through a QR code again. The transferKeyQR() code can be generated with the random set:

    var transferKeyQRCodeData = QRME.transferKeyQR(randomSet)


