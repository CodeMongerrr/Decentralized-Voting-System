import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { useState } from "react";
import React from "react";
function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [voting_system, setContract] = useState(null);
  const [candidate_name, setcandi_name] = useState("");
  const [voter_name, setvoter_name] = useState("");
  const [voterID, setvoterID] = useState("");
  const [candidateID, setcandiID] = useState("");



  const loadWeb3 = async () => {
    const web = new Web3(
      new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
    );
    setWeb3(web);
    console.log(web3);
  };

  const loadAccounts = async () => {
    if (web3 != null) {
      const acc = await web3.eth.getAccounts();
      // const temp = acc;
      // console.log(temp);
      setAccounts(acc);
      // console.log(accounts);
      console.log(accounts);
    }
  };

  const loadContract = async () => {
    if (web3 !== null) {
      // Replace with your own contract's ABI and address
      const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "candidate",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "CandidateCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "vote_count",
              "type": "uint256"
            }
          ],
          "name": "VoteCount",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "voterid",
              "type": "string"
            }
          ],
          "name": "VoterCreated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "votes_",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "voter_id",
              "type": "uint256"
            }
          ],
          "name": "verification_voter",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "candidate_id",
              "type": "uint256"
            }
          ],
          "name": "verification_candidate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "voterid",
              "type": "string"
            }
          ],
          "name": "create_voter",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "create_candidate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "candidate_id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voter_id",
              "type": "uint256"
            }
          ],
          "name": "number_votes",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "candidate_id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voter_id",
              "type": "uint256"
            }
          ],
          "name": "cast_vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const address = "0xF2d9ffb1a5663fa80fE1d291043bA06A7084c72E";
      const voting_system = await new web3.eth.Contract(abi, address);
      setContract(voting_system);
    }
  };

  if (web3 === null) {
    // console.log("Web3");
    loadWeb3();
    // console.log("cdscfsd");
  }
  if (accounts.length === 0) {
    // console.log("ajfh");
    loadAccounts();
    // console.log("a");
    // console.log(accounts);
  }
  if (voting_system === null) {
    loadContract();
  }
  const CreateCandidate = (event) => {
    event.preventDefault();
    // console.log(voting_system)
    voting_system.methods.create_candidate(candidate_name);
    voting_system.methods.verification_candidate(voting_system.methods.voter_id);
    console.log("Created Candidate")
    // console.log(acc)
  };
  const CreateVoter = (event) => {
    event.preventDefault();
    voting_system.methods.create_voter(voter_name, "AJ");
    voting_system.methods.verification_voter(voting_system.methods.candidate_id);
    console.log("Created Voter")

  }
  const CastVote = (event) => {
    event.preventDefault();
    voting_system.methods.cast_vote(candidateID, voterID);
    voting_system.methods.number_votes(candidateID, voterID);
    console.log(voting_system.methods.votes_.call())
    console.log("Vote Casted")

  }
  return(
    <div className="App">
      <form>
        <h2>Create Candidate</h2>
        <div className="form-group">
          <label htmlFor="create-candidate">Candidate Name</label>
          <input
            type="text"
            className="form-control"
            id="candidate"
            placeholder="Enter name of the Candidate"
            value = {candidate_name}
            onChange={(e) => {setcandi_name(e.target.value)}}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={CreateCandidate}
          >
            Submit
          </button>
        </div>
        <h2> Create Voter</h2>
        <div className="form-group">
          <label htmlFor="create-voter">Voter Name</label>
          <input
            type="text"
            className="form-control"
            id="voter"
            placeholder="Enter name of the Voter"
            value={voter_name}
            onChange={(event) => {setvoter_name(event.target.value)}}
          />
          <button type="submit" className="btn btn-primary" onClick={CreateVoter}>
            Submit
          </button>
        </div>
        <h2>Cast a Vote</h2>
        <div className="form-group">
          <label htmlFor="vote">Voter ID</label>
          <input
            type="number"
            className="form-control"
            id="VoterID"
            placeholder="VoterID"
            value={voterID}
            onChange={(e) => {setvoterID(e.target.value)}}
          />
          <label htmlFor="casting a vote">Candidate ID</label>
          <input
            type="number"
            className="form-control"
            id="CandidateID"
            placeholder="CandidateID"
            value={candidateID}
            onChange={(e) => {setcandiID(e.target.value)}}
          />
          <button type="submit" className="btn btn-primary" onClick={CastVote}>
            Submit
          </button>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sr. no.</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Number of Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default App;
