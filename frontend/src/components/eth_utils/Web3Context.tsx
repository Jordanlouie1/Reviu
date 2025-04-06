import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import contractJSON from "./dPairReview.json";

interface Web3ContextType {
    account: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    contractAddress: string | null;
    contract: ethers.Contract | null;
    paperCount: BigInt;
    connectWallet: () => Promise<void>;
    setContractAddress: (address: string) => void;
    submitPaper: (title: string, url: string) => Promise<string>;
}

const Web3Context = createContext<Web3ContextType>({
    account: null,
    provider: null,
    signer: null,
    contractAddress: null,
    contract: null,
    paperCount: 0n,
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
    };

    const submitPaper = async (title: string, url: string): Promise<string> => {
        console.log('signer', signer);
        console.log('contract', contract);
        if (!contract || !signer) {
            throw new Error("Contract or signer not available");
        }

        try {
            // Send the transaction
            const tx = await contract.submitPaper(title, url);
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
            uri: string
        ) => {
            console.log("PaperSubmitted 📄:", {
                paperId: paperId.toString(),
                author,
                title,
                uri,
            });

            if (paperId > paperCount) {
                setPaperCount(paperId)
            }
        };

        contract.on("PaperSubmitted", handlePaperSubmitted);

        return () => {
            contract.off("PaperSubmitted", handlePaperSubmitted);
        };
    }, [contract]);

    return (
        <Web3Context.Provider value={{ account, provider, signer, contract, contractAddress, paperCount, connectWallet, setContractAddress, submitPaper }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
