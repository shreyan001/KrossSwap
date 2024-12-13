import {
    LitActionResource,
    LitPKPResource,
    createSiweMessage,
    generateAuthSig,
  } from "@lit-protocol/auth-helpers";
  import { LIT_NETWORK_VALUES, LIT_NETWORK, AuthMethodType, AuthMethodScope, LIT_RPC } from "@lit-protocol/constants";
  import { LitNodeClient } from "@lit-protocol/lit-node-client";
  import ethers from "ethers";
  import * as LitJsSdk from "@lit-protocol/lit-node-client";
  
  // Ethereum addresses and subscription contract addresses
  const nodeJsServerAddress = "0x7A3d05c70498e2A93b487c1A1d9d5CF61f757e42";
  const gaianetServerAddress = "0x2E8f4e1f77c2CF2Bd2B8DBd568Ee1E4e57f6E2a9"; 
  const subscriptionContractAddress = "0x9B3a45D2b6537fe3609E69e90AB6E96d2E2F75E1";
  
  // Function to create a Lit PKP and manage payments
  export async function setupAutonomousPayment() {
    const litPrivateKey = "your-private-key";
    const litNetwork: LIT_NETWORK_VALUES = LIT_NETWORK.DatilDev;
    const signer = new ethers.Wallet(
      litPrivateKey,
      new ethers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );
  
    const litNodeClient = new LitNodeClient();
    await litNodeClient.connect();
  
    const contractClient = new LitJsSdk.LitContracts({
      signer: signer,
      network: litNetwork,
      debug: true,
    });
    await contractClient.connect();
  
    const toSign = await createSiweMessage({
      uri: "http://localhost/createWallet",
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(),
      resources: [
        {
          resource: new LitActionResource("*"),
        },
        {
          resource: new LitPKPResource("*"),
        },
      ],
      walletAddress: signer.address,
      nonce: await litNodeClient.getLatestBlockhash(),
      litNodeClient: litNodeClient,
    });
  
    const authSig = await generateAuthSig({
      signer: signer,
      toSign,
    });
  
    const authMethod = {
      authMethodType: AuthMethodType.EthWallet,
      accessToken: JSON.stringify(authSig),
    };
  
    const mintInfo = await contractClient.mintWithAuth({
      authMethod: authMethod,
      scopes: [AuthMethodScope.SignAnything],
    });
  
    console.log("Minted PKP:", mintInfo.pkp);
  
    // Addresses to pay
    const addresses = [
      "0x7A3d05c70498e2A93b487c1A1d9d5CF61f757e42", // nodeJsServerAddress
      "0x2E8f4e1f77c2CF2Bd2B8DBd568Ee1E4e57f6E2a9", // gaianetServerAddress
      "0x9B3a45D2b6537fe3609E69e90AB6E96d2E2F75E1", // subscriptionContractAddress
    ];
  
    const chainInfo = getChainInfo("yellowstone");
    const ethersProvider = new ethers.providers.JsonRpcProvider(chainInfo.rpcUrl);
    const gasPrice = await ethersProvider.getGasPrice();
  
    for (const address of addresses) {
      const unsignedTransaction = {
        to: address,
        gasLimit: 21000,
        gasPrice: gasPrice.toHexString(),
        nonce: await ethersProvider.getTransactionCount(signer.address),
        chainId: chainInfo.chainId,
        value: ethers.utils.parseUnits("0.01", "ether").toHexString(), // Example amount
      };
  
      const unsignedTransactionHash = ethers.utils.keccak256(
        ethers.utils.serializeTransaction(unsignedTransaction)
      );
  
      const litActionResponse = await litNodeClient.executeJs({
        code: transactionActionCode,
        jsParams: {
          toSign: ethers.utils.arrayify(unsignedTransactionHash),
          publicKey: LIT_PKP_PUBLIC_KEY!,
          sigName: "signedtx",
          chain: "yellowstone",
          unsignedTransaction,
        },
        sessionSigs: sessionSigs,
      });
  
      console.log(`Transaction to ${address} completed with hash:`, litActionResponse.response);
    }
  }
  
  // Additional function to demonstrate more usage of Lit Protocol
  async function createLangGraphNode() {
    console.log("Creating a LangGraph node...");
  
    // Placeholder for creating a LangGraph node
    // Ensure no access is given to this node
    const langGraphNode = {
      id: "exampleLangGraphNodeId",
      data: "This is a demonstration node using Lit Protocol",
    };
  
    console.log("LangGraph node created:", langGraphNode);
  }
  
  // Function to demonstrate Lit Protocol usage
  export async function litPaymentsFunctions() {
    console.log("Executing Lit Protocol functions...");
  
    // Example: Fetching some data from the Lit Node
    const litNodeClient = new LitNodeClient();
    await litNodeClient.connect();
    const latestBlockhash = await litNodeClient.getLatestBlockhash();
    console.log("Latest Blockhash:", latestBlockhash);
  
    // Example: Creating a new Lit Action
    const litAction = new LitActionResource("example-action");
    console.log("Created Lit Action:", litAction);
  
    // Example: Signing a message with PKP
    const litPKP = new LitPKPResource("example-pkp");
    console.log("Created Lit PKP:", litPKP);
  
    // Placeholder for additional Lit Protocol operations
    console.log("Performing additional Lit Protocol operations...");
  }
  
  // Call the function to setup autonomous payment
  setupAutonomousPayment();
  
  // Call the function to create a LangGraph node
