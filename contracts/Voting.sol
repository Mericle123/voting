// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        string party;
        string description;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;
    mapping(address => bool) public voters;

    event CandidateAdded(string name, string party, string description);
    event VoteCasted(uint256 candidateId, address voter);

    function addCandidate(string memory _name, string memory _party, string memory _description) public {
        candidates[candidateCount] = Candidate(_name, _party, _description, 0);
        emit CandidateAdded(_name, _party, _description);
        candidateCount++;
    }

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId < candidateCount, "Invalid candidate ID.");

        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;
        emit VoteCasted(_candidateId, msg.sender);
    }

    function getCandidate(uint256 _candidateId) public view returns (Candidate memory) {
        require(_candidateId < candidateCount, "Invalid candidate ID.");
        return candidates[_candidateId];
    }
}
