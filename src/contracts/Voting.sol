pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;

    mapping(address => bool) public voters;

    event VoteCast(uint candidateId);

    function addCandidate(string memory _name) public {
        candidates.push(Candidate(candidates.length, _name, 0));
    }

    function castVote(uint _candidateId) public {
        require(
            _candidateId >= 0 && _candidateId < candidates.length,
            "Invalid candidate ID"
        );
        require(!voters[msg.sender], "You have already voted");
        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;
        emit VoteCast(_candidateId);
    }

    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    function getCandidateById(
        uint _candidateId
    ) public view returns (uint, string memory, uint) {
        require(
            _candidateId >= 0 && _candidateId < candidates.length,
            "Invalid candidate ID"
        );
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
}
