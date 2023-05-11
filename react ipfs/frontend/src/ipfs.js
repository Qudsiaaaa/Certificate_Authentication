// const ipfsClient = require('ipfs-http-client');
// const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// export default ipfs;
import { create } from 'ipfs-http-client'

const projectId = 'b42fd35de9e94aaab31169c247f8ab9a';
//const projectSecret = '...';
const auth = 'Basic ' + Buffer.from(projectId ).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})
export default ipfs;