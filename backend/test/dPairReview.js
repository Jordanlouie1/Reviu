const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const dPairReview = require("../ignition/modules/dPairReview");

describe("dPairReview", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployFixure() {
        return ignition.deploy(dPairReview);
    }

    describe("Deployment", function () {
        it("Should set paper count to 0", async function () {
            const { dPairReview } = await deployFixure();

            expect(await dPairReview.paperCount()).to.equal(0);
        });
    });

    describe("Submission", function () {
        it("Should emit event and increment paper by one", async function () {
            const { dPairReview } = await deployFixure();
            const [author] = await ethers.getSigners();

            title = "ASKLDJALSKDJ ASDKJLASD";
            url = "SAKLDJALKSDJASKLDJLKASD.dsaflksdafj@fksdlafj.com";

            // const response = await dPairReview.callStatic.submitPaper(title, url);
            // expect(response).to.equal(0);

            await expect(dPairReview.submitPaper(title, url))
                .to.emit(dPairReview, "PaperSubmitted")
                .withArgs(1, author.address, title, url);


            const paper = await dPairReview.papers[0];
            expect(paper.author).to.equal(author.address);
            // expect(paper.title).to.equal(title);
            // expect(paper.url).to.equal(url);
            expect(await dPairReview.paperCount()).to.equal(1);
        });
    });

    describe("Review", function () {
        it("Should emit event", async function () {
            const { dPairReview } = await deployFixure();
            const [ author, reviewer ] = await ethers.getSigners();

            title = "ASKLDJALSKDJ ASDKJLASD";
            url = "SAKLDJALKSDJASKLDJLKASD.dsaflksdafj@fksdlafj.com";
            await expect(dPairReview.submitPaper(title, url))
                .to.emit(dPairReview, "PaperSubmitted")
                .withArgs(1, author.address, title, url);

            comment_url = "adsfsadfjsadlfjsadlfk!@.com"

            await expect(dPairReview.connect(reviewer).reviewPaper(1, comment_url))
                .to.emit(dPairReview, "ReviewSubmitted")
                .withArgs(1, reviewer.address, comment_url);
        });
    });
});
