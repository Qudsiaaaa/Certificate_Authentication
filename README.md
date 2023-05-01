# Certificate_Authentication
This decentralized application (DApp) allows users to authenticate certificates, generate digital certificates, and mint NFTs of the digital certificates. It is built using React, Hardhat, Web3.js, and IPFS.

#Features
Certificate authentication: Users can upload a certificate picture, and the DApp will extract data from the image using OCR (React Dropzone or Tesseract.js). It then matches the extracted data with the information available in the IPFS database. If the data matches, the DApp shows a message that the certificate is authentic and rewards the user with ERC721 tokens. If the data does not match, the DApp displays a "fake certificate" message. All authentication attempts are recorded in the certification history.

#Digital certificate generation: Users can enter individual details to generate a digital certificate, which is then stored on the blockchain. The recipient is rewarded with tokens, and the generation is recorded in the certification history connected to the IPFS server.

#NFT minting: The DApp can generate and mint NFTs of the digital certificate created in the second feature and the picture used for data extraction in the first feature.
