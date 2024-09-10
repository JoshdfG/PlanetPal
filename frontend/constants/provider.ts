import { ethers } from "ethers";

//when wallet is not connected, connects to the base sepolia rpc
export const readOnlyProvider = new ethers.JsonRpcProvider(
  `${process.env.NEXT_PUBLIC_HTTP_RPC}`
);

//when wallet is connected, gets the websocket provider
export const wssProvider = new ethers.WebSocketProvider(
  `${process.env.NEXT_PUBLIC_WEBSOCKET_RPC}`
);

//when wallet is connected, gets the provider
export const getProvider = (walletProvider: any) =>
  new ethers.BrowserProvider(walletProvider);

//when wallet is connected, gets the signer
export const getTheSigner = (walletProvider: any) => walletProvider.getSigner();
