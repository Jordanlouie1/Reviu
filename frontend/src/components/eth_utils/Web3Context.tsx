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

    useEffect(() => {
        const updateContract = async () => {
            if (signer && contractAddress) {
                console.log(contractAddress)
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
