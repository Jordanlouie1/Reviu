// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract dPairReview {
    struct Paper {
        address author;
        string title;
        string uri;
    }

    // Review Not Stored On Chain
    // struct Review {
    //     address reviewer;
    //     string uri;
    //     uint timestamp;
    // }

    mapping(uint => Paper) public papers;
    uint public paperCount;

    event PaperSubmitted(uint indexed paperId, address indexed author, string title, string uri);
    event ReviewSubmitted(uint indexed paperId, address indexed reviewer, string url);

    function submitPaper(string memory title, string memory url) public returns (uint) {
        paperCount++;
        papers[paperCount] = Paper(msg.sender, title, url);
        emit PaperSubmitted(paperCount, msg.sender, title, url);
        return paperCount;
    }

    function reviewPaper(uint paperId, string memory url) public {
        require(paperId > 0 && paperId <= paperCount, "Paper index error");
        emit ReviewSubmitted(paperId, msg.sender, url);
    }
}
