// import React from 'react';
// import ScanCertificate from './components/ScanCertificate';

// function App() {
//   return (
//     <div className="App">
//       <ScanCertificate />
//     </div>
//   );
// }

// export default App;
import React, { useRef } from 'react';
import ScanCertificate from './components/ScanCertificate';
import handleSubmit from './handles/handlesubmit';
import './App.css';

function App() {
  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit(dataRef.current.value);
    dataRef.current.value = "";
  };

  return (
    <div className="App">
       <ScanCertificate />
       <form onSubmit={submithandler}>
        <input type= "text" ref={dataRef} />
        <button type = "submit">Save</button>
      </form>
       </div>
   
    
  );
}

export default App;
