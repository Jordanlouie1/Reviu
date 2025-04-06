// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract dPairReview {
    struct Paper {
        address author;
        string title;
        string abs;
        string tags;
        string url;
    }

    // Review Not Stored On Chain
    // struct Review {
    //     address reviewer;
    //     string url;
    //     uint timestamp;
    // }

    mapping(uint => Paper) public papers;
    uint public paperCount;

    event PaperSubmitted(uint indexed paperId, address indexed author, string title, string abs, string tags, string url);
    event ReviewSubmitted(uint indexed paperId, address indexed reviewer, string url);

    function getPaper(uint paperId) public view returns (
        uint id,
        address author,
        string memory title,
        string memory abs,
        string memory tags,
        string memory url
    ) {
        Paper memory paper = papers[paperId];
        return (paperId, paper.author, paper.title, paper.abs, paper.tags, paper.url);
    }

    function submitPaper(string memory title, string memory abs, string memory tags, string memory url) public returns (uint) {
        paperCount++;
        papers[paperCount] = Paper(msg.sender, title, abs, tags, url);
        emit PaperSubmitted(paperCount, msg.sender, title, abs, tags, url);
        return paperCount;
    }

    function reviewPaper(uint paperId, string memory url) public {
        require(paperId > 0 && paperId <= paperCount, "Paper index error");
        emit ReviewSubmitted(paperId, msg.sender, url);
    }
}
