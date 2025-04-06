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
}

const Web3Context = createContext<Web3ContextType>({
    account: null,
    provider: null,
    signer: null,
    contractAddress: null,
    contract: null,
    paperCount: 0n,
    connectWallet: async () => { },
    setContractAddress: () => { }
});

const ABI = contractJSON.abi;

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
                const dPeerReview = new ethers.Contract(contractAddress, ABI, provider)
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
        <Web3Context.Provider value={{ account, provider, signer, contract, contractAddress, paperCount, connectWallet, setContractAddress }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
