export const SITE = {
  name: "Attest",
  tagline: "Proof of reserves, on-chain.",
  summary: "Chainlink nodes check reserves against supply and publish the result on-chain.",
  description:
    "Attest is a Chainlink CRE workflow that checks token reserves against supply and writes a verifiable risk status on-chain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  network: "Sepolia testnet",
  contract: "0x92bc132002694088c8afE4f09EEA87c46fF5902f",
  explorer: "https://sepolia.etherscan.io/address/0x92bc132002694088c8afE4f09EEA87c46fF5902f",
} as const;
