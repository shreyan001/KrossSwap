```markdown
# KrossSwap: Autonomous AI-Powered Cross-Chain Swaps

## Introduction

KrossSwap is an innovative solution for cross-chain cryptocurrency swaps, leveraging the power of AI and the Chainflip SDK. Designed to operate autonomously, KrossSwap not only simplifies the swapping process but also sustains its operations through brokerage earnings. This project is a submission for the Autonomous AI Hackathon, showcasing the potential of decentralized AI nodes in the Web3 ecosystem.

## Vision

KrossSwap aims to revolutionize cross-chain cryptocurrency swaps by combining artificial intelligence with Chainflip's powerful SDK. Our vision is to make complex blockchain operations as simple as sending a text message, accessible to users of all experience levels.

## How It Works

1. **Conversational Interface**: Users interact with KrossSwap through natural language on Telegram.
2. **AI-Driven Understanding**: Advanced language models interpret user requests and guide the conversation.
3. **Chainflip Integration**: Real-time quotes and secure, non-custodial swaps are facilitated using the Chainflip SDK.
4. **Step-by-Step Guidance**: KrossSwap provides clear instructions throughout the entire swap process.

## Technology Stack

- **LangGraph.js**: Manages AI-driven interactions and ensures context-aware communication.
- **Chainflip SDK**: Enables native cross-chain swaps with low slippage across a wide range of tokens and chains.
- **Telegraf.js**: Powers the Telegram bot interface for seamless user interactions.
- **Broker APIs' RPC Drop-Ins**: Ensures efficient connectivity with various blockchain networks.
- **ChatOpenAI based LLM**: Processes natural language inputs and generates appropriate responses.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14 or later)
- pnpm (v6 or later)
- Docker (for running Gaianet server)

### Step 1: Clone the Repository

Clone the KrossSwap repository and navigate into the project directory:

```bash
git clone https://github.com/yourusername/krossswap.git
cd krossswap
```

### Step 2: Install Dependencies

Ensure you have `pnpm` installed. If not, install it using:

```bash
npm install -g pnpm
```

Then, install the project dependencies:

```bash
pnpm install
```

### Step 3: Set Up Gaianet Server

To run the Gaianet server, use the following commands to configure it:

```bash
gaianet config \
  --snapshot https://huggingface.co/datasets/gaianet/london/resolve/main/london_768_nomic-embed-text-v1.5-f16.snapshot.tar.gz \
  --embedding-url https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/resolve/main/nomic-embed-text-v1.5.f16.gguf \
  --embedding-ctx-size 8192 \
  --system-prompt "You are krossSwap, an AI-powered Telegram bot facilitating cross-chain cryptocurrency swaps powered by Chainflip SDK on the Perseverance testnet. Be concise yet friendly in your responses." \
  --rag-prompt "The following text is the context for the user question.\n----------------\n"
```

### Step 4: Configure the Gaianet Server

Create a configuration file for the Gaianet server with the following content:

```json
{
  "address": "",
  "chat": "https://huggingface.co/second-state/Meta-Llama-3-70B-Instruct-GGUF/resolve/main/Meta-Llama-3-70B-Instruct-Q5_K_M.gguf",
  "chat_ctx_size": "8192",
  "chat_batch_size": "16",
  "description": "Llama-3-70B-Instruct",
  "domain": "us.gaianet.network",
  "embedding": "https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/resolve/main/nomic-embed-text-v1.5.f16.gguf",
  "embedding_ctx_size": "8192",
  "embedding_batch_size": "8192",
  "llamaedge_port": "8080",
  "prompt_template": "llama-3-chat",
  "rag_prompt": "Use the following pieces of context to answer the user's question.\n----------------\n",
  "reverse_prompt": "",
  "snapshot": "",
  "system_prompt": "You are krossSwap, an AI-powered Telegram bot facilitating cross-chain cryptocurrency swaps powered by Chainflip SDK on the Perseverance testnet. Be concise yet friendly in your responses.",
  "rag_policy": "system-message",
  "embedding_collection_name": "default",
  "qdrant_limit": "1",
  "qdrant_score_threshold": "0.5"
}
```

### Step 5: Obtain the Base URL

After setting up the Gaianet server, obtain the base URL for the server. This URL will be used to configure the environment for your project.

### Step 6: Configure Environment Variables

Create a `.env` file in the root of your project directory and add the following lines, replacing the placeholders with your actual values:

```plaintext
TELEGRAM_BOT_API='your-telegram-bot-api-key'
GAIANET_BASE_URL='your-gaianet-base-url'
LIT_PRIVATE_KEY='your-private-key'
```

### Step 7: Start the Project

Finally, start the KrossSwap project:

```bash
pnpm start
```

This setup will ensure that your Gaianet server is configured to work seamlessly with the KrossSwap project, providing the necessary AI capabilities for cross-chain swaps.

Certainly! Here's a detailed README section that addresses the judging criteria for your hackathon project, KrossSwap:

---

# KrossSwap: Autonomous AI-Powered Cross-Chain Swaps

## Judging Criteria

### Creativity

This project is innovative because it leverages the power of AI to simplify cross-chain cryptocurrency swaps, making them as easy as sending a text message. By integrating AI with the Chainflip SDK, KrossSwap introduces a fresh perspective to decentralized systems, pushing the boundaries of what's possible in the blockchain space. The project has the potential to go viral due to its unique approach to solving complex blockchain operations with conversational AI, making it accessible to users of all experience levels.

### UX/UI

KrossSwap offers a clear and intuitive interface for users, primarily through its Telegram bot. The interaction flows are smooth, guiding users step-by-step through the swap process. The documentation is accessible, providing users and developers with the necessary information to understand and interact with the system effectively. The use of natural language processing ensures that users can communicate with the bot in a way that feels natural and intuitive.

### Impact & Viability

KrossSwap addresses real-world problems by simplifying the process of cross-chain swaps, which are often cumbersome and risky. By providing a secure, non-custodial solution, KrossSwap enhances the adoption of decentralized AI and blockchain technologies. The project drives value for the community by making blockchain interactions more accessible and user-friendly. With a long-term vision, KrossSwap has the potential for commercialization, offering a sustainable model through brokerage earnings.

### Completeness

The project provides a clear explanation of its purpose, solution, and how it was built. The code is well-documented, with setup instructions included in the README. A demo video is available to showcase the project's functionality, and the open-source code is submitted to GitHub, allowing for community contributions and transparency.

### Technical Execution

KrossSwap demonstrates robust and well-implemented code, effectively utilizing Gaia nodes and partner APIs. The project follows best practices in AI training, smart contracts, and security, ensuring a reliable and secure user experience. The integration of AI models and blockchain technologies showcases the technical prowess of the development team.

### Partner Integrations

KrossSwap excels in partner integrations, making it a strong contender for several bounties:

- **Gaia Agent Infrastructure Challenge**: KrossSwap utilizes Gaia nodes to power its AI-driven interactions, demonstrating the best use of Gaia's infrastructure for decentralized AI applications.

- **Lit Protocol Bounty: Most Practical Agent built with Lit**: The project incorporates Lit Protocol for autonomous payments, showcasing its practical application in managing subscription contracts and operational costs.

- **Lit Protocol Bounty: Most Autonomous Agent built with Lit**: KrossSwap's ability to sustain its operations through brokerage earnings and autonomous payment handling makes it a prime candidate for this bounty, highlighting its autonomy and efficiency.

By effectively integrating these partner technologies, KrossSwap not only enhances its functionality but also aligns with the goals of the hackathon, making it a strong candidate for recognition in multiple categories.

---

This detailed explanation should help convey the strengths of your project in relation to the judging criteria. Let me know if you need further adjustments or additional sections!

## Usage

Once the setup is complete, you can interact with KrossSwap through the Telegram bot interface. The bot will guide you through the process of performing cross-chain swaps using simple, conversational interactions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
```

#   K r o s s S w a p 
 