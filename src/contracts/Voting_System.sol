// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Voting_System {
    address private owner;
    uint256 private voter_id = 0;
    uint256 private candidate_id = 0;
    uint256 public votes_ = 0;
    struct Voter {
        string name;
        string voterid;
        bool verification;
        bool vote_status;
    }
    mapping(uint256 => Voter) private voters;

    struct Candidate {
        string name;
        bool verification;
        uint256 vote_count;
    }
    mapping(uint256 => Candidate) private candidates;

    struct Votes {
        uint256 votes;
    }
    mapping(uint256 => Votes) private n_votes;

    event VoterCreated(uint256 indexed voter, string name, string voterid);
    event CandidateCreated(uint256 indexed candidate, string name);
    event VoteCast(string indexed name);
    event VoteCount(uint256 indexed vote_count);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Function OnlyOwner");
        _;
    }
    modifier verified_voter(uint256 id) {
        require(voters[id].verification == true, "Voter not Verified");
        _;
    }
    modifier verified_candidate(uint256 id) {
        require(candidates[id].verification == true, "Candidate Not Verified ");
        _;
    }

    function verification_voter(uint256 voter_id) public onlyOwner {
        require(voters[voter_id].verification == false, "Already Verified");
        voters[voter_id].verification = true;
    }

    function verification_candidate(uint256 candidate_id) public onlyOwner {
        require(candidates[candidate_id].verification == false, "Already Verified");
        candidates[candidate_id].verification = true;
    }

    function create_voter(string memory name, string memory voterid) public {
        bool verification;
        bool vote_status;
        voters[voter_id] = Voter(
            name,
            voterid,
            verification = false,
            vote_status = false
        );
        voter_id += 1;
        emit VoterCreated(voter_id, name, voterid);
    }

    function create_candidate(string memory name) public {
        bool verification;
        uint256 vote_count;
        candidates[candidate_id] = Candidate(
            name,
            verification = false,
            vote_count = 0
        );
        candidate_id += 1;
        emit CandidateCreated(candidate_id - 1, name);
    }

    function number_votes(uint256 candidate_id, uint256 voter_id)
        public
        onlyOwner
        returns (uint256)
    {
        require(
            candidates[candidate_id].verification == true,
            "Not a verified Candidate"
        );
        votes_ = candidates[candidate_id].vote_count;
        return (candidates[candidate_id].vote_count);
        emit VoteCount(candidates[candidate_id].vote_count);
    }

    function cast_vote(uint256 candidate_id, uint256 voter_id)
        public
        verified_voter(voter_id)
    {
        require(voters[voter_id].vote_status == false, "Already Voted");
        candidates[candidate_id].vote_count += 1;
        voters[voter_id].vote_status = true;
        emit VoteCast(voters[voter_id].name);
    }
}
