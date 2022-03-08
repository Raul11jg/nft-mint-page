import React, {useState} from 'react';
import './App.css';
import web3 from './web3/web3';
import Mint from './components/Mint';
import mint from './mint';

function App() {
  const [numerOfItems, setNumerOfItems] = useState(1)
  const [formValues, setFormValues] = useState(
    {
    creator_wallet_id: "",
    creator_network: "",
    assets: [
    ]
    }
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const asset = {
      asset_id: "",
      name: "",
      picture: "",
      external_link: "",
      description: "",
      collection: "",
      supply: "",
      royalties: "",
      date_of_creation: "",
    }

    const date = new Date();
    asset.date_of_creation = date;
    asset.royalties = web3.utils.toWei('0.1', 'ether')


    try {
        const account = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(account[0]);
        const net = await web3.eth.net.getNetworkType();
        
        console.log("User wallet: ", account[0]);

        setFormValues({creator_wallet_id: account[0]});
        setFormValues({creator_network: net});
        setFormValues({assets: asset});

        validate(account, net);

        mint(numerOfItems, formValues).then(res =>  web3.eth.accounts.signTransaction('tx', "PRIVATE_KEY"));

    } catch (err) {
      console.log(err);
    }
  
  }

  const handleChange = (e) => {
    const {value} = e.target;
    if(value >= 0)
      setNumerOfItems(value);
  }


  const validate = (accounts, net) => {
    if(accounts && net == "goerli" || net == "ropsten")
      return true;
    
    return false;
  }

  return (
    <div className="App">
      <h1>Mint your NFT</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" min="1" max="10" value={numerOfItems} onChange={handleChange} />
        <br></br>
        <button>Mint</button>
      </form>
    </div>
  );
}

export default App;
