import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Voting from "./abis/Voting.json";

const App = () => {
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState(null);
  const [candidate_name, setcandi_name] = useState("");
  const [candidates, setCandidates] = useState([]);

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
      console.log("Entered ");

      const contract = new web3.eth.Contract(Voting.abi, voting.address);
      setContract(contract);
    }
  };
  useEffect(() => {
    loadWeb3();
    loadContract();
  }, []);
  useEffect(() => {
    const loadCandidates = async () => {
      const candidateCount = await contract.methods.getCandidateCount().call();
      const candidates = [];
      for (let i = 0; i < candidateCount; i++) {
        const candidate = await contract.methods.getCandidateById(i).call();
        candidates.push(candidate);
      }
      setCandidates(candidates);
      console.log(candidates);
    };
    if (contract !== null) {
      loadCandidates();
    }
  }, [contract]);
  const AddCandidate = async (event) => {
    event.preventDefault();
    await contract.methods
      .addCandidate(candidate_name)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        console.log("candidate added");
        console.log(hash);
      });
      window.location.reload();
    };
  const CastVote = async (candidateId) => {
    console.log("Andar aaa gaya")
    await contract.methods.castVote(candidateId).send({ from: account });
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId) {
        candidate.voteCount++;
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    window.location.reload();
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
          {
            candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate[1]}</td>
              <td>{candidate[2]}</td>
              <td>
                <button onClick={() => CastVote(candidate[0])}>Vote</button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default App;
