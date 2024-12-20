"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAutonomousPayment = setupAutonomousPayment;
exports.litPaymentsFunctions = litPaymentsFunctions;
const auth_helpers_1 = require("@lit-protocol/auth-helpers");
const constants_1 = require("@lit-protocol/constants");
const lit_node_client_1 = require("@lit-protocol/lit-node-client");
const ethers_1 = __importDefault(require("ethers"));
const LitJsSdk = __importStar(require("@lit-protocol/lit-node-client"));
// Ethereum addresses and subscription contract addresses
const nodeJsServerAddress = "0x7A3d05c70498e2A93b487c1A1d9d5CF61f757e42";
const gaianetServerAddress = "0x2E8f4e1f77c2CF2Bd2B8DBd568Ee1E4e57f6E2a9";
const subscriptionContractAddress = "0x9B3a45D2b6537fe3609E69e90AB6E96d2E2F75E1";
// Function to create a Lit PKP and manage payments
function setupAutonomousPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const litPrivateKey = "your-private-key";
        const litNetwork = constants_1.LIT_NETWORK.DatilDev;
        const signer = new ethers_1.default.Wallet(litPrivateKey, new ethers_1.default.JsonRpcProvider(constants_1.LIT_RPC.CHRONICLE_YELLOWSTONE));
        const litNodeClient = new lit_node_client_1.LitNodeClient();
        yield litNodeClient.connect();
        const contractClient = new LitJsSdk.LitContracts({
            signer: signer,
            network: litNetwork,
            debug: true,
        });
        yield contractClient.connect();
        const toSign = yield (0, auth_helpers_1.createSiweMessage)({
            uri: "http://localhost/createWallet",
            expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(),
            resources: [
                {
                    resource: new auth_helpers_1.LitActionResource("*"),
                },
                {
                    resource: new auth_helpers_1.LitPKPResource("*"),
                },
            ],
            walletAddress: signer.address,
            nonce: yield litNodeClient.getLatestBlockhash(),
            litNodeClient: litNodeClient,
        });
        const authSig = yield (0, auth_helpers_1.generateAuthSig)({
            signer: signer,
            toSign,
        });
        const authMethod = {
            authMethodType: constants_1.AuthMethodType.EthWallet,
            accessToken: JSON.stringify(authSig),
        };
        const mintInfo = yield contractClient.mintWithAuth({
            authMethod: authMethod,
            scopes: [constants_1.AuthMethodScope.SignAnything],
        });
        console.log("Minted PKP:", mintInfo.pkp);
        // Addresses to pay
        const addresses = [
            "0x7A3d05c70498e2A93b487c1A1d9d5CF61f757e42", // nodeJsServerAddress
            "0x2E8f4e1f77c2CF2Bd2B8DBd568Ee1E4e57f6E2a9", // gaianetServerAddress
            "0x9B3a45D2b6537fe3609E69e90AB6E96d2E2F75E1", // subscriptionContractAddress
        ];
        const chainInfo = getChainInfo("yellowstone");
        const ethersProvider = new ethers_1.default.providers.JsonRpcProvider(chainInfo.rpcUrl);
        const gasPrice = yield ethersProvider.getGasPrice();
        for (const address of addresses) {
            const unsignedTransaction = {
                to: address,
                gasLimit: 21000,
                gasPrice: gasPrice.toHexString(),
                nonce: yield ethersProvider.getTransactionCount(signer.address),
                chainId: chainInfo.chainId,
                value: ethers_1.default.utils.parseUnits("0.01", "ether").toHexString(), // Example amount
            };
            const unsignedTransactionHash = ethers_1.default.utils.keccak256(ethers_1.default.utils.serializeTransaction(unsignedTransaction));
            const litActionResponse = yield litNodeClient.executeJs({
                code: transactionActionCode,
                jsParams: {
                    toSign: ethers_1.default.utils.arrayify(unsignedTransactionHash),
                    publicKey: LIT_PKP_PUBLIC_KEY,
                    sigName: "signedtx",
                    chain: "yellowstone",
                    unsignedTransaction,
                },
                sessionSigs: sessionSigs,
            });
            console.log(`Transaction to ${address} completed with hash:`, litActionResponse.response);
        }
    });
}
// Additional function to demonstrate more usage of Lit Protocol
function createLangGraphNode() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Creating a LangGraph node...");
        // Placeholder for creating a LangGraph node
        // Ensure no access is given to this node
        const langGraphNode = {
            id: "exampleLangGraphNodeId",
            data: "This is a demonstration node using Lit Protocol",
        };
        console.log("LangGraph node created:", langGraphNode);
    });
}
// Function to demonstrate Lit Protocol usage
function litPaymentsFunctions() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Executing Lit Protocol functions...");
        // Example: Fetching some data from the Lit Node
        const litNodeClient = new lit_node_client_1.LitNodeClient();
        yield litNodeClient.connect();
        const latestBlockhash = yield litNodeClient.getLatestBlockhash();
        console.log("Latest Blockhash:", latestBlockhash);
        // Example: Creating a new Lit Action
        const litAction = new auth_helpers_1.LitActionResource("example-action");
        console.log("Created Lit Action:", litAction);
        // Example: Signing a message with PKP
        const litPKP = new auth_helpers_1.LitPKPResource("example-pkp");
        console.log("Created Lit PKP:", litPKP);
        // Placeholder for additional Lit Protocol operations
        console.log("Performing additional Lit Protocol operations...");
    });
}
// Call the function to setup autonomous payment
setupAutonomousPayment();
// Call the function to create a LangGraph node
