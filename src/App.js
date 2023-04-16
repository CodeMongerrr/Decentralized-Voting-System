import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import Voting from "./abis/Voting.json";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState(null);
  const [candidate_name, setcandi_name] = useState("");
  const [voter_name, setvoter_name] = useState("");
  const [voterID, setvoterID] = useState("");
  const [candidateID, setcandiID] = useState("");
  const [Loader, setLoader] = useState(true);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non Ethereum browser detected");
    }
  };
  const loadContract = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAccount(account);
    const network_id = await web3.eth.net.getId();
    const voting = Voting.networks[network_id];

    if (voting) {
      setLoader(false);

      const contract = new web3.eth.Contract(Voting.abi, voting.address);
      setContract(contract);
    }
  };
  useEffect(() => {
    loadWeb3();
    loadContract();
  }, []);
  const AddCandidate = async (event) => {
    event.preventDefault();
    await contract.methods
      .addCandidate(candidate_name)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        console.log("candidate added");
        console.log(hash);
      });
  };

  const CreateVoter = async (event) => {
    event.preventDefault();
    console.log("Entered");
  };

  const CastVote = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="App">
      <form>
        <label htmlFor="candidateName">Candidate Name:</label>
        <input
          type="text"
          id="candidateName"
          value={candidate_name}
          onChange={(e) => {
            setcandi_name(e.target.value);
          }}
        />
        <button type="submit" onClick={AddCandidate}>
          Add Candidate
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Vote Count</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>5</td>
            <td>
              <button>Vote</button>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>3</td>
            <td>
              <button>Vote</button>
            </td>
          </tr>
          <tr>
            <td>Bob Smith</td>
            <td>2</td>
            <td>
              <button>Vote</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
