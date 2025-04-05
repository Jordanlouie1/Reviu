import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

interface Web3ContextType {
    account: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    contractAddress: string | null;
    contract: ethers.Contract | null;
    connectWallet: () => Promise<void>;
    setContractAddress: (address: string) => void;
}

const Web3Context = createContext<Web3ContextType>({
    account: null,
    provider: null,
    signer: null,
    contractAddress: null,
    contract: null,
    connectWallet: async () => { },
    setContractAddress: () => { }
});

const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "paperId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "PaperSubmitted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "paperId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "reviewer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "ReviewSubmitted",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "paperCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "papers",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "paperId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "reviewPaper",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "submitPaper",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [contractAddress, setContractAddress] = useState<string | null>(null);

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
            }
        };

        updateContract();
    }, [signer, contractAddress]);

    return (
        <Web3Context.Provider value={{ account, provider, signer, contract, contractAddress, connectWallet, setContractAddress }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
