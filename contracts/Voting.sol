// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is ERC20, Ownable {
    uint256 public votePrice; // Price of one vote in token units

    uint256 public startTime; // Voting start time
    uint256 public endTime;   // Voting end time

    bool public isPaused; // Pause flag

    struct Candidate {
        string name;
        string party;
        string description;
        uint256 voteCount;
    }

    // Mapping to store candidates by ID
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;

    // Mapping to keep track of voters
    mapping(address => bool) public voters;

    // Events to log actions
    event CandidateAdded(string name, string party, string description);
    event VoteCasted(uint256 candidateId, address voter);
    event FundsWithdrawn(address admin, uint256 amount);
    event VotingPaused();
    event VotingResumed();

    // Modifier to ensure that only admin can execute the function
    modifier onlyAdmin() {
        require(msg.sender == owner(), "You are not the admin.");
        _;
    }

    modifier onlyWhenNotPaused() {
        require(!isPaused, "Voting is paused.");
        _;
    }

    modifier onlyDuringVotingPeriod() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Voting period is not active.");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender], "You have already voted.");
        _;
    }
    uint256 public initialSupply = 10000000 * 10 ** 18;

    // Constructor to initialize the contract with the vote price and voting period
    constructor() ERC20("VotingToken", "VT") Ownable(msg.sender) {
        
        votePrice = 0.01 * 10 ** 18;
        startTime = 1730973600;
        endTime = 1731578400;
        isPaused = false;

        _mint(msg.sender, initialSupply); // Mint initial supply to contract deployer
    }

    // Function to add a new candidate (only accessible by the admin)
    function addCandidate(
        string memory _name, 
        string memory _party, 
        string memory _description
    ) public onlyAdmin {
        candidates[candidateCount] = Candidate(_name, _party, _description, 0);
        emit CandidateAdded(_name, _party, _description);
        candidateCount++;
    }

    // Function to cast a vote for a specific candidate
    function vote(uint256 _candidateId) public hasNotVoted onlyDuringVotingPeriod onlyWhenNotPaused {
        require(_candidateId < candidateCount, "Invalid candidate ID.");

        // Transfer the voting tokens to the contract for voting
        require(
            transfer(address(this), votePrice),
            "Token transfer failed"
        );

        // Increment the vote count for the selected candidate
        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;

        emit VoteCasted(_candidateId, msg.sender);
    }

    // Function to withdraw collected tokens (only accessible by the admin)
    function withdrawFunds() public onlyAdmin {
        uint256 balance = balanceOf(address(this));
        require(balance > 0, "No funds to withdraw.");
        _transfer(address(this), msg.sender, balance);

        emit FundsWithdrawn(msg.sender, balance);
    }

    // Function to pause voting (only accessible by admin)
    function pauseVoting() public onlyAdmin {
        isPaused = true;
        emit VotingPaused();
    }

    // Function to resume voting (only accessible by admin)
    function resumeVoting() public onlyAdmin {
        isPaused = false;
        emit VotingResumed();
    }

    // Function to get candidate details
    function getCandidate(uint256 _candidateId) public view returns (Candidate memory) {
        require(_candidateId < candidateCount, "Invalid candidate ID.");
        return candidates[_candidateId];
    }

    // Function to get the total number of votes casted
    function getTotalVotes() public view returns (uint256) {
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < candidateCount; i++) {
            totalVotes += candidates[i].voteCount;
        }
        return totalVotes;
    }

    // Function to check whether an address has voted
    function hasVoted(address _voter) public view returns (bool) {
        return voters[_voter];
    }

    // Function to check if voting is currently active
    function isVotingActive() public view returns (bool) {
        return block.timestamp >= startTime && block.timestamp <= endTime;
    }
}
