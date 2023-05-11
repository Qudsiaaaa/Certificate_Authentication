// import React, { Component } from 'react'
// import ethers from 'ethers'
// import Token from './contracts/Token.json'
// import getWeb3 from './utils/getWeb3'
// import ipfs from './ipfs'

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'

// class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       ipfsHash: '',
//       web3: null,
//       buffer: null,
//       account: null
//     }
//     this.captureFile = this.captureFile.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentWillMount() {
//     // Get network provider and web3 instance.
//     // See utils/getWeb3 for more info.

//     getWeb3
//     .then(results => {
//       this.setState({
//         web3: results.web3
//       })

//       // Instantiate contract once web3 provided.
//       this.instantiateContract()
//     })
//     .catch(() => {
//       console.log('Error finding web3.')
//     })
//   }

//   instantiateContract() {
//     /*
//      * SMART CONTRACT EXAMPLE
//      *
//      * Normally these functions would be called in the context of a
//      * state management library, but for convenience I've placed them here.
//      */

//     const contract = require('truffle-contract')
//     const simpleStorage = contract(Token)
//     simpleStorage.setProvider(this.state.web3.currentProvider)

//     // Get accounts.
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       simpleStorage.deployed().then((instance) => {
//         this.simpleStorageInstance = instance
//         this.setState({ account: accounts[0] })
//         // Get the value from the contract to prove it worked.
//         return this.simpleStorageInstance.get.call(accounts[0])
//       }).then((ipfsHash) => {
//         // Update state with the result.
//         return this.setState({ ipfsHash })
//       })
//     })
//   }

//   captureFile(event) {
//     event.preventDefault()
//     const file = event.target.files[0]
//     const reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)
//     reader.onloadend = () => {
//       this.setState({ buffer: Buffer(reader.result) })
//       console.log('buffer', this.state.buffer)
//     }
//   }

//   onSubmit(event) {
//     event.preventDefault()
//     ipfs.files.add(this.state.buffer, (error, result) => {
//       if(error) {
//         console.error(error)
//         return
//       }
//       this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
//         return this.setState({ ipfsHash: result[0].hash })
//         console.log('ifpsHash', this.state.ipfsHash)
//       })
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         <nav className="navbar pure-menu pure-menu-horizontal">
//           <a href="#" className="pure-menu-heading pure-menu-link">IPFS File Upload DApp</a>
//         </nav>

//         <main className="container">
//           <div className="pure-g">
//             <div className="pure-u-1-1">
//               <h1>Your Image</h1>
//               <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
//               <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
//               <h2>Upload Image</h2>
//               <form onSubmit={this.onSubmit} >
//                 <input type='file' onChange={this.captureFile} />
//                 <input type='submit' />
//               </form>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }

// export default App

import React, { Component } from 'react';
import { ethers } from 'ethers';
import Token from './contracts/Token.json'// Update this path
import getWeb3 from './utils/getWeb3';
import ipfs from './ipfs';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      contract: null,
    };
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      // Create an instance of ethers.Contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Token.networks[networkId];
      const contract = new ethers.Contract(
        deployedNetwork && deployedNetwork.address,
        Token.abi,
        web3.currentProvider // this will work with MetaMask
          ? new ethers.providers.Web3Provider(web3.currentProvider).getSigner()
          : ethers.getDefaultProvider()
      );

      this.setState({ web3, account: accounts[0], contract });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log('buffer', this.state.buffer);
    };
  }

  async onSubmit(event) {
    event.preventDefault();
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      try {
        // Call the contract's `set` function with the hash of the file that was just uploaded to IPFS
        const tx = await this.state.contract.set(result[0].hash);
        // Wait for the transaction to be mined
        await tx.wait();
        // Get the value from the contract to prove it worked
        const response = await this.state.contract.get();
        this.setState({ ipfsHash: response });
      } catch (err) {
        console.error('Error:', err);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">IPFS File Upload DApp</a>
        </nav>
  
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
}

export default App;
