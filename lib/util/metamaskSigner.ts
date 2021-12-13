import { metamaskProvider } from "./metamaskProvider";

export const metamaskSigner = typeof window !== 'undefined' && metamaskProvider.getSigner();