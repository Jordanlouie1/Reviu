import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import contractJSON from "./dPairReview.json";
import { Paper } from "../../types";

interface Web3ContextType {
    account: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    contractAddress: string | null;
    contract: ethers.Contract | null;
    paperCount: BigInt;
    papers: Paper[];
    connectWallet: () => Promise<void>;
    setContractAddress: (address: string) => void;
    submitPaper: (title: string, abs: string, tags: string, url: string) => Promise<string>;
}

const Web3Context = createContext<Web3ContextType>({
    account: null,
    provider: null,
    signer: null,
    contractAddress: null,
    contract: null,
    paperCount: 0n,
    papers: [],
    connectWallet: async () => { },
    setContractAddress: () => { },
    submitPaper: async () => ""
});

const ABI = contractJSON.abi;
const INTERFACE = new ethers.Interface(ABI);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [contractAddress, setContractAddress] = useState<string | null>(null);
    const [paperCount, setPaperCount] = useState<BigInt>(0n);
    const [papers, setPapers] = useState<Paper[]>([]);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }

        const _provider = new ethers.BrowserProvider(window.ethereum);
        const _accounts = await _provider.send("eth_requestAccounts", []);
        const _signer = await _provider.getSigner();

        setAccount(_accounts[0]);
        setProvider(_provider);
        setSigner(_signer);
        setContract(null);
        setContractAddress(null);
        setPapers([])
    };

    const submitPaper = async (title: string, abs: string, tags: string, url: string): Promise<string> => {
        console.log('signer', signer);
        console.log('contract', contract);
        if (!contract || !signer) {
            throw new Error("Contract or signer not available");
        }

        try {
            // Send the transaction
            const tx = await contract.submitPaper(title, abs, tags, url);
            const receipt = await tx.wait();

            // Decode logs to find the PaperSubmitted event
            const parsedLog = receipt.logs
                .map((log: { topics: ReadonlyArray<string>; data: string; }) => {
                    try {
                        return INTERFACE.parseLog(log);
                    } catch (e) {
                        return null;
                    }
                })
                .find((log: { name: string; }) => log?.name === "PaperSubmitted");

            if (!parsedLog) {
                throw new Error("PaperSubmitted event not found in transaction logs");
            }

            const paperId = parsedLog.args.paperId.toString(); // BigNumber to string
            return paperId;

        } catch (err) {
            console.error("Failed to submit paper:", err);
            throw err;
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            connectWallet();
        }
    }, []);

    // Contract Address Update Logic
    useEffect(() => {
        const updateContract = async () => {
            if (signer && contractAddress) {
                console.log(contractAddress)
                const dPeerReview = new ethers.Contract(contractAddress, ABI, signer);
                setContract(dPeerReview);
                console.log(dPeerReview);
                console.log('paper count', await dPeerReview.paperCount());
                setPaperCount(await dPeerReview.paperCount());

                const _papers: Paper[] = [];
                for (let i = 0n; i < 3n; i++) {
                    const paper = await dPeerReview.getPaper(i);
                    console.log(paper);
                    if (!paper) break;
                    const _words = paper.abs.trim().split(/\s+/);
                    const _newPaper: Paper = {
                        id: paper.paperId.toString(),
                        title: paper.title,
                        abstract: (_words.length <= 30) ? paper.abs : _words.slice(0, 30).join(" ") + " ...",
                        content: paper.abs,
                        author: paper.author,
                        dateSubmitted: new Date().toISOString(),
                        status: "pending",
                        reviews: [],
                        tags: paper.tags
                    };
                    _papers.unshift(_newPaper);
                }
                console.log(_papers);
                setPapers(_papers);
            }
        };

        updateContract();
    }, [signer, contractAddress]);

    // Submission Event subscription
    useEffect(() => {
        if (!contract) return;

        const handlePaperSubmitted = (
            paperId: BigInt,
            author: string,
            title: string,
            abs: string,
            tags: string,
            url: string
        ) => {
            console.log("PaperSubmitted 📄:", {
                paperId: paperId.toString(),
                author,
                title,
                abs,
                tags,
                url,
            });

            if (paperId > paperCount) {
                setPaperCount(paperId)
            }
            const _papers = papers;
            const _words = abs.trim().split(/\s+/);

            const _newPaper: Paper = {
                id: paperId.toString(),
                title: title,
                abstract: (_words.length <= 30) ? abs : _words.slice(0, 30).join(" ") + " ...",
                content: abs,
                author: author,
                dateSubmitted: new Date().toISOString(),
                status: "pending",
                reviews: [],
                tags: tags
            };
            if (_papers.length >= 3) {
                _papers.pop();
            }
            _papers.unshift(_newPaper);
            setPapers(_papers)
        };

        contract.on("PaperSubmitted", handlePaperSubmitted);

        return () => {
            contract.off("PaperSubmitted", handlePaperSubmitted);
        };
    }, [contract]);

    return (
        <Web3Context.Provider value={{ account, provider, signer, contract, contractAddress, paperCount, papers, connectWallet, setContractAddress, submitPaper }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
