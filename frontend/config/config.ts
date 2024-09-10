import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(`${process.env.NEXT_PUBLIC_HTTP_RPC}`),
  },
});
