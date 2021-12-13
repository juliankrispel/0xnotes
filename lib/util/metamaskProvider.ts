import { ethers } from "ethers";

export const metamaskProvider = typeof window !== 'undefined' && new ethers.providers.Web3Provider(window.ethereum);