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
// Example Ethereum addresses and subscription contract addresses
const nodeJsServerAddress = "0xExampleNodeJsServerAddress";
const gaianetServerAddress = "0xExampleGaianetServerAddress";
const subscriptionContractAddress = "0xExampleSubscriptionContractAddress";
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
        // Logic to monitor balance and make payments
        // This is a placeholder for the actual implementation
        console.log("Monitoring balance and making payments...");
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
createLangGraphNode();
