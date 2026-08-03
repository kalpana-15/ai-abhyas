export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface ModuleAssessment {
  id: string;
  moduleNumber: number;
  title: string;
  courseId: string;
  courseTitle: string;
  type: string;
  questionsCount: number;
  duration: string;
  retakePolicy: string;
  status: string;
  score: number | null;
  total: number;
  threshold: number;
  questions: QuizQuestion[];
}

export const quizzesMod1To5: ModuleAssessment[] = [
  {
    id: "eval-mod-1",
    moduleNumber: 1,
    title: "Module 1: GenAI 2027 Roadmap & Foundation Models Evaluation",
    courseId: "c1",
    courseTitle: "Generative AI Masterclass",
    type: "Proctored Evaluation",
    questionsCount: 10,
    duration: "20 mins",
    retakePolicy: "Unlimited retakes permitted",
    status: "passed",
    score: 96,
    total: 100,
    threshold: 70,
    questions: [
      {
        q: "In Nitish's Generative AI 2027 roadmap, how does the Builder's Track fundamentally differ from the User's Track?",
        options: [
          "The Builder Track focuses on internal mechanics like transformer architectures and fine-tuning weights, whereas the User Track emphasizes practical applications using Prompt Engineering, RAG, and AI Agents.",
          "The Builder Track involves designing hardware cooling systems, while the User Track is strictly for non-programmers using ChatGPT web interfaces.",
          "The User Track requires training 100B parameter models from scratch on GPU clusters, while the Builder Track consumes read-only REST APIs.",
          "There is no real architectural difference; both tracks write Identical assembly code for microcontrollers."
        ],
        correct: 0,
        explanation: "Nitish splits Generative AI into Builders (architectures, training, fine-tuning) and Users (applying existing foundation models via RAG, prompting, and tool calling)."
      },
      {
        q: "What defines a Foundation Model (like GPT-4, Claude, or Llama 3) compared to traditional machine learning classifiers?",
        options: [
          "It is trained on broad, unlabeled web-scale datasets using self-supervised learning, making it adaptable to wide varieties of downstream tasks without rebuilding architectures.",
          "It is limited to classifying positive or negative sentiment on IMDB movie reviews using small labeled CSV spreadsheets.",
          "It requires human engineers to hard-code every grammatical rule and if-else logic branching statement manually.",
          "It can only run inside offline mainframe SQL database engines."
        ],
        correct: 0,
        explanation: "Foundation Models leverage massive self-supervised learning on billions of tokens, producing versatile representations that adapt to multi-modal tasks."
      },
      {
        q: "Which mathematical innovation in Transformer architectures solved the vanishing gradient problem seen in classic Recurrent Neural Networks (RNNs)?",
        options: [
          "Self-attention mechanics combined with positional embeddings and residual connections allowing simultaneous parallel token processing across sequences.",
          "Alphabetical indexing of dictionary terms using binary search trees.",
          "Replacing matrix multiplications with single sequential linear regression loops.",
          "Increasing the physical temperature of the computer processors during backward passes."
        ],
        correct: 0,
        explanation: "Transformers replaced recurrence with parallel self-attention mechanisms and skip connections, enabling robust gradient backpropagation across long contexts."
      },
      {
        q: "Why is 'Context Window Length' a critical constraint when building complex Generative AI applications?",
        options: [
          "It dictates the maximum number of tokens (words and system instructions) the model can hold in RAM memory for a single inference call.",
          "It sets the physical diameter of the LCD screen required to render chatbot responses.",
          "It restricts the number of concurrent internet users who can load the webpage simultaneously.",
          "It caps the total size of the persistent PostgreSQL relational database."
        ],
        correct: 0,
        explanation: "The context window defines how much total text (prompt + retrieved context + conversation history) the neural attention matrices can analyze during one generation pass."
      },
      {
        q: "What is the core distinction between Pre-training and Instruction Fine-Tuning (SFT) in modern LLM pipelines?",
        options: [
          "Pre-training teaches broad linguistic patterns and factual world predictions via next-token completion, while Fine-Tuning shapes model responses to behave as a helpful, compliant dialog assistant.",
          "Pre-training is performed by end-users in Google Chrome, whereas Fine-Tuning happens in silicon chip manufacturing fabs.",
          "Pre-training deletes neural weights to save disk storage, whereas Fine-Tuning reinstalls Linux operating systems.",
          "There is no functional distinction; both refer to formatting HTML stylesheets."
        ],
        correct: 0,
        explanation: "Pre-training models merely predict the most statistical next token (often finishing sentences like Wikipedia articles), whereas fine-tuning transforms them into instruction-following agents."
      },
      {
        q: "When navigating the rapid influx of generative AI research in 2026-2027, what architectural layer is currently seeing the most commercial production value?",
        options: [
          "Application development integrating compound AI systems, Retrieval-Augmented Generation (RAG), and autonomous agent workflows.",
          "Re-training identical open-source LLM baseline pre-training runs from zero every single week.",
          "Downgrading from neural transformers back to statistical N-Gram lookup frequency tables.",
          "Hand-crafting custom silicon motherboard logic gates for every web user."
        ],
        correct: 0,
        explanation: "While training base models requires multi-million dollar investments, the real enterprise value lies in compound application layers (RAG, tool orchestration, workflows)."
      },
      {
        q: "How do tokens relate to human language words when large language models parse text input?",
        options: [
          "Tokens are sub-word semantic units (approximately 0.75 words per token in English), created by algorithms like Byte Pair Encoding (BPE) to efficiently encode roots, suffixes, and punctuation.",
          "Every single character in the alphabet is strictly equal to one permanent immutable database token.",
          "Tokens are physical hardware encryption keys plugged into USB sockets.",
          "A token corresponds directly to an entire chapter of a hardbound print textbook."
        ],
        correct: 0,
        explanation: "LLMs do not read letters or whole words; tokenizers compress common sub-word sequences into numeric token IDs (approx 4 characters per token in English)."
      },
      {
        q: "What is 'Hallucination' in the context of Large Language Model inference?",
        options: [
          "The generation of grammatically fluent and convincing assertions that are factually inaccurate or unsupported by training evidence.",
          "When the display computer screen flickers due to a disconnected power cord.",
          "When a user accidentally types a syntax typo in their terminal command prompt.",
          "A safety security feature that locks out unrecognized IP addresses."
        ],
        correct: 0,
        explanation: "Because LLMs are autoregressive probability engines rather than truth verified query engines, they can generate confident yet incorrect assertions known as hallucinations."
      },
      {
        q: "Why is Prompt Engineering considered a foundational skill before advancing to fine-tuning weights?",
        options: [
          "Optimizing zero-shot and few-shot instructions guides existing pre-trained parameters instantly without incurring heavy compute retraining costs or catastrophic forgetting.",
          "Prompt engineering automatically triples the GPU hardware core frequencies.",
          "It lets you delete all external relational databases from your server stack.",
          "It converts Python source code into compiled Java archives."
        ],
        correct: 0,
        explanation: "Well-structured prompt engineering unlocks latent capabilities inside pre-trained weights without the cost, complexity, and maintenance burden of fine-tuning model checkpoints."
      },
      {
        q: "What is an autonomous AI Agent in the Generative AI paradigm?",
        options: [
          "An LLM-driven system capable of reasoning, planning, observing environment responses, and autonomously executing external functions or APIs to accomplish complex goals.",
          "A static automated chatbot that only replies with pre-recorded static FAQ text paragraphs.",
          "A human customer support operator sitting in a live call center.",
          "An antivirus scanner that inspects incoming email attachments for phishing links."
        ],
        correct: 0,
        explanation: "AI agents elevate LLMs from simple question-answering calculators into dynamic reasoning engines that orchestrate multi-step actions using tools and environmental observations."
      }
    ]
  },
  {
    id: "eval-mod-2",
    moduleNumber: 2,
    title: "Module 2: GenAI using LangChain SDK Fundamentals",
    courseId: "c1",
    courseTitle: "Generative AI Masterclass",
    type: "Proctored Evaluation",
    questionsCount: 10,
    duration: "20 mins",
    retakePolicy: "Unlimited retakes permitted",
    status: "passed",
    score: 94,
    total: 100,
    threshold: 70,
    questions: [
      {
        q: "Why was the LangChain orchestration framework originally created by Harrison Chase?",
        options: [
          "To bridge the gap between powerful standalone large language models and real-world external enterprise resources (databases, tools, prompts, and application state).",
          "To replace Python syntax with a specialized compiler built exclusively for gaming graphical cards.",
          "To compete directly against cloud hosting providers by offering bare-metal virtual machines.",
          "To convert relational database SQL query statements into older spreadsheet spreadsheets."
        ],
        correct: 0,
        explanation: "LangChain was developed as an abstraction layer to connect LLMs with external data sources, memory persistence, and programmatic action tools."
      },
      {
        q: "What is the primary operational problem that LangChain aims to solve for LLM application developers?",
        options: [
          "The 'Glue Code' problem: eliminating hundreds of lines of fragile, ad-hoc API HTTP parsing code by providing standardized modular components and chain abstractions.",
          "Preventing developers from writing Python code entirely by forcing manual GUI dragging.",
          "Eliminating the requirement for internet bandwidth during large model downloads.",
          "Enforcing strict HTML5 accessibility color palettes across frontend UI design components."
        ],
        correct: 0,
        explanation: "Without a modular orchestration SDK like LangChain, engineering teams waste massive effort writing custom API wrappers, prompt formatting scripts, and retry retry loops."
      },
      {
        q: "In LangChain's evolutionary timeline, how did developers build GenAI features before orchestration frameworks emerged?",
        options: [
          "By making raw HTTP POST requests to provider completions APIs (like OpenAI's REST endpoint), writing custom regex string formatters, and manually managing conversation state in global variables.",
          "By physically writing hex code instructions onto magnetic floppy diskettes.",
          "By relying strictly on human operators to type answers back via email relays.",
          "They could not build anything; no APIs existed prior to LangChain release."
        ],
        correct: 0,
        explanation: "Before orchestration frameworks, engineering teams relied on tedious raw API calls, custom JSON parsers, and fragmented memory tracking scripts."
      },
      {
        q: "What is the benefit of LangChain being provider-agnostic across disparate inference backends?",
        options: [
          "Developers can swap out an underlying model (e.g., transitioning from OpenAI GPT-4 to Anthropic Claude or local Ollama Llama-3) by simply altering a one-line model wrapper instantiation without rewriting logic pipelines.",
          "It forces every LLM in the world to output identically identical English word choices.",
          "It prevents any user from running local open-source models on their private desktop hardware.",
          "It eliminates API bearer authentication keys entirely across all commercial AI providers."
        ],
        correct: 0,
        explanation: "LangChain abstracts model interface layers, insulating application code from vendor lock-in and allowing effortless testing across open-source and closed commercial models."
      },
      {
        q: "Which core design principle ensures LangChain components remain interoperable?",
        options: [
          "Modularity: individual building blocks (prompts, retrievers, models, parsers) adhere to standardized interfaces so they can be mixed, matched, and chained cleanly.",
          "Monolithic coupling: every single database and API tool is permanently welded into one immutable binary execution file.",
          "Randomization: input parameters change their syntax structure automatically on every function execution.",
          "Obscurity: variable naming conventions are deliberately scrambled to prevent external developers from inspecting code methods."
        ],
        correct: 0,
        explanation: "Modularity allows developers to independently test, swap, and chain diverse structural pieces across complex enterprise AI pipelines."
      },
      {
        q: "When comparing LangChain Python vs. LangChain.js (TypeScript/JavaScript), what architectural distinction is important for web platform builders?",
        options: [
          "LangChain.js brings identical orchestration primitives into serverless edge environments (like Next.js API routes and Cloudflare Workers) while sharing foundational conceptual design with the Python ecosystem.",
          "LangChain.js only functions inside ancient web browsers without internet connectivity.",
          "The Python library cannot invoke open-source local LLM weights.",
          "LangChain.js requires Compiling code into native iOS machine language before execution."
        ],
        correct: 0,
        explanation: "LangChain is implemented natively in both Python (for data science/backend heavy stacks) and TypeScript/JavaScript (for high-performance web edge computing in Next.js)."
      },
      {
        q: "What is meant by a 'Compound AI System' in the modern LangChain paradigm?",
        options: [
          "An architecture where intelligence emerges from collaborating components—LLMs, vector databases, web scrapers, code evaluators, and validation tools—rather than relying solely on a standalone single model call.",
          "A physically enormous hardware supercomputer rack housed inside a secure concrete warehouse.",
          "A simple spreadsheet macro that calculates compound bank savings interest rates.",
          "An LLM that generates responses simultaneously in ten different spoken human languages."
        ],
        correct: 0,
        explanation: "Industry leaders recognize that production performance is achieved through compound AI orchestration systems where models operate as reasoning coordinators alongside domain tools."
      },
      {
        q: "Why is error handling and automatic retry abstraction critical when consuming commercial LLM APIs via LangChain?",
        options: [
          "Cloud provider endpoints frequently experience transient rate-limiting (429 HTTP errors), timeout network drops, or JSON formatting failures that require automated exponential back-off and validation retry loops.",
          "API servers require manual human keystrokes every fifteen minutes to keep authentication active.",
          "Without retries, computer displays permanently freeze their mouse cursor inputs.",
          "It lowers billing invoices by intentionally dropping every second network request packets."
        ],
        correct: 0,
        explanation: "LangChain wraps model communications in resilient retry, rate-limiting, and error fallback mechanisms to guarantee stable user experience during high web volume."
      },
      {
        q: "What is the core role of LangSmith inside the extended LangChain ecosystem?",
        options: [
          "It provides observability, debugging, latency tracing, prompt evaluation, and production monitoring for complex multi-step LangChain executions.",
          "It is a social media chatting platform designed exclusively for sharing AI generated cat pictures.",
          "It is an offline hardware GPU driver update utility for Linux terminal workstations.",
          "It converts LangChain Python code into simple HTML presentation slides."
        ],
        correct: 0,
        explanation: "LangSmith serves as the companion platform for enterprise LLM ops, recording trace evaluations, token usage metrics, and pipeline latencies across production runs."
      },
      {
        q: "What first step should an engineer take after installing `pip install langchain` in a new local environment?",
        options: [
          "Configure environmental variable secret keys (such as `OPENAI_API_KEY` or custom provider endpoints) so model wrappers can authenticate over TLS encrypted connections.",
          "Immediately format their local hard disk drive to clean up old browser caching folders.",
          "Uninstall their operating system terminal emulator and install a manual ASCII text viewer.",
          "Disable all firewall security rules across their domestic Wi-Fi routers."
        ],
        correct: 0,
        explanation: "LangChain wrappers automatically inspect environment variable registries for provider authentication keys upon module import, making secure API configuration step one."
      }
    ]
  },
  {
    id: "eval-mod-3",
    moduleNumber: 3,
    title: "Module 3: Impact of DeepSeek R1 & Enterprise AI Economics",
    courseId: "c1",
    courseTitle: "Generative AI Masterclass",
    type: "Proctored Evaluation",
    questionsCount: 10,
    duration: "20 mins",
    retakePolicy: "Unlimited retakes permitted",
    status: "passed",
    score: 98,
    total: 100,
    threshold: 70,
    questions: [
      {
        q: "What revolutionary architectural achievement made DeepSeek R1 a seismic turning point in generative AI economics in early 2025?",
        options: [
          "It achieved state-of-the-art mathematical and scientific reasoning performance rivaling closed proprietary frontier models while training at a fraction of the budget using innovative Multi-Head Latent Attention and Mixture of Experts (MoE).",
          "It was the very first large language model ever developed in history without using any GPUs.",
          "It charges enterprise users $100 per token generated during basic chat conversations.",
          "It completely abandoned all attention mechanisms in favor of manual human proofreading."
        ],
        correct: 0,
        explanation: "DeepSeek R1 proved that elite chain-of-thought reasoning could be achieved through algorithmic efficiency (Multi-Head Latent Attention and MoE routing) at radically lowered compute costs."
      },
      {
        q: "What is the difference between standard autoregressive text generation and 'Reasoning Models' (like OpenAI o1 and DeepSeek R1)?",
        options: [
          "Reasoning models employ reinforcement learning to generate internal invisible chain-of-thought thought tokens, verifying hypotheses and correcting errors before producing the final public answer.",
          "Reasoning models only operate on audio sound waves without understanding alphanumeric vocabulary.",
          "Standard generators take an hour per word, whereas reasoning models respond in one microsecond.",
          "There is no technical difference; both rely on simple hardcoded SQL table lookup commands."
        ],
        correct: 0,
        explanation: "Reasoning models spend compute test-time scaling on internal self-reflective thinking tokens, enabling deeper logical deductions on complex code and mathematical problems."
      },
      {
        q: "In Nitish's economic breakdown, why did DeepSeek R1 create a 'commoditization shift' in foundational inference AI prices?",
        options: [
          "By releasing highly efficient open weights and API pricing orders of magnitude lower than industry benchmarks, it forced competitors to drastically slash inference billing costs across the market.",
          "It patented every word in the English language so no other developer could print strings.",
          "It forced enterprises to abandon AI applications entirely due to excessive licensing tariffs.",
          "It restricted usage exclusively to Fortune 50 corporate boardrooms."
        ],
        correct: 0,
        explanation: "DeepSeek R1 demonstrated that raw inference token generation is commoditizing, shifting the true economic competitive edge toward proprietary enterprise data integration and application domain workflows."
      },
      {
        q: "What is 'Model Distillation' as highlighted in the DeepSeek R1 ecosystem?",
        options: [
          "Using the rich reasoned explanations and reasoning outputs of an oversized teacher model to fine-tune compact, high-speed student models (like Llama or Qwen 7B/14B) for local efficiency.",
          "Boiling physical computer processor hardware in distilled deionized water to prevent heat throttling.",
          "Deleting half of the tokens from an input document to shrink network bandwidth usage.",
          "Converting color image pixels into grayscale ASCII characters to save storage disk space."
        ],
        correct: 0,
        explanation: "Model distillation transfers complex reasoning capabilities from huge multi-billion parameter teacher checkpoints into agile, specialized open student weights capable of running on laptop edge hardware."
      },
      {
        q: "How does a 'Mixture of Experts' (MoE) architecture reduce inference computational latency in models like DeepSeek R1?",
        options: [
          "While the total checkpoint contains hundreds of billions of parameters, a gating router only activates a small specialized subset of neural experts (e.g. 37B out of 671B) for any given token generation pass.",
          "It connects ten separate laptops over Bluetooth to share Word document files.",
          "It forces human experts to type the answers manually whenever an AI encounters a tough math equation.",
          "It ignores user prompts completely and replies from a cached dictionary file."
        ],
        correct: 0,
        explanation: "MoE divides layers into specialized neural expert modules; during inference, routing algorithms only trigger relevant experts per token, vastly reducing floating-point operations per word generated."
      },
      {
        q: "When assessing AI Enterprise ROI (Return on Investment), why is custom RAG over proprietary domain documents considered lower risk than building foundation models from scratch?",
        options: [
          "RAG avoids immense pre-training GPU compute expenditures, guarantees factual traceability to internal enterprise documents, and updates instantly when source files change without costly re-training runs.",
          "RAG runs on solar-powered calculators without electricity or software dependencies.",
          "Building foundation models from scratch is completely free and requires zero clean data sets.",
          "RAG automatically removes all security passwords across enterprise network drives."
        ],
        correct: 0,
        explanation: "For 99% of enterprises, training foundational LLMs from scratch is financially irrational; RAG pairs commoditized inference weights with private, high-value corporate domain data."
      },
      {
        q: "What does 'Test-Time Scaling' (or Inference Compute Scaling) refer to in next-generation reasoning architectures?",
        options: [
          "Allowing the model to consume more computational cycles (and internal tokens) at question-answering time to explore branching problem-solving paths, leading to significantly higher solution accuracy.",
          "Enlarging the font size of the web browser display screen so users can read output clearly.",
          "Adding extra hard disk drives to a database cluster during nightly backups.",
          "Upgrading fiber optic cables to speed up file downloading over local intranets."
        ],
        correct: 0,
        explanation: "Traditionally, AI scaling applied only to pre-training datasets; test-time scaling proves that letting models think longer during inference dramatically improves logical reasoning success."
      },
      {
        q: "Why did the DeepSeek R1 release challenge the conventional wisdom regarding hardware GPU monopolies in AI scaling?",
        options: [
          "It demonstrated that mathematical algorithmic optimization, memory compression, and communication scheduling could circumvent strict brute-force compute hardware reliance.",
          "It proved that artificial neural networks can operate entirely inside standard Excel macro spreadsheets.",
          "It revealed that modern GPUs do not actually compute floating point math accurately.",
          "It forced all developers to switch from Linux operating systems back to MS-DOS terminals."
        ],
        correct: 0,
        explanation: "DeepSeek's engineering team utilized extraordinary software memory optimization and kernel efficiency to achieve world-class intelligence despite severe hardware compute constraints."
      },
      {
        q: "What should an enterprise AI architect prioritize when designing future-proof Generative AI applications in a commoditized model landscape?",
        options: [
          "Modular orchestration design that decouples business logic, evaluation testing, and proprietary vector indexing from any single AI vendor's model checkpoint.",
          "Signing 10-year exclusive contract binding agreements with a single cloud LLM API endpoint vendor.",
          "Hardcoding proprietary model version numbers directly into every single database table row.",
          "Refusing to use open-source weights out of concern that open code is too fast."
        ],
        correct: 0,
        explanation: "In an era of plummeting inference costs and weekly model breakthroughs, architectures must remain decoupled so engineering teams can hot-swap foundational weights without breaking domain application logic."
      },
      {
        q: "How does open-weight availability impact corporate data privacy when deploying specialized RAG assistants?",
        options: [
          "Enterprises can host powerful open weights (like distilled reasoning models) completely within their on-premise or private Virtual Private Cloud (VPC) networks, ensuring zero confidential data leaks to public APIs.",
          "Open weights require uploading all company employee payroll spreadsheets to public GitHub wikis.",
          "It makes it impossible to apply SSL encryption across local intranet web interfaces.",
          "Open weights automatically turn off user authentication screens across internal software."
        ],
        correct: 0,
        explanation: "Self-hosting high-efficiency open weights enables strict data compliance (HIPAA, GDPR, SOC2) by keeping sensitive user prompt text and vector chunks inside secure corporate network perimeters."
      }
    ]
  },
  {
    id: "eval-mod-4",
    moduleNumber: 4,
    title: "Module 4: Components & Modular Architecture of LangChain",
    courseId: "c1",
    courseTitle: "Generative AI Masterclass",
    type: "Proctored Evaluation",
    questionsCount: 10,
    duration: "20 mins",
    retakePolicy: "Unlimited retakes permitted",
    status: "passed",
    score: 92,
    total: 100,
    threshold: 75,
    questions: [
      {
        q: "What are the six foundational architectural component categories across the classical LangChain framework?",
        options: [
          "Model I/O (Models, Prompts, Parsers), Retrieval (Loaders, Splitters, VectorStores), Chains, Agents, Memory, and Callbacks/Observability.",
          "Spreadsheets, Word Processors, Presentation Slides, Email Clients, Calculators, and Web Games.",
          "SQL tables, NoSQL documents, FTP servers, USB thumb drives, HDMI monitors, and Keyboard devices.",
          "Compilers, Assemblers, Linkers, Debuggers, Decompilers, and Hexadecimal Editors."
        ],
        correct: 0,
        explanation: "LangChain organizes Generative AI development around six foundational pillars: Model I/O, Retrieval (RAG), Chains, Agents, Memory, and Callbacks."
      },
      {
        q: "In LangChain's modular architecture, what is the specific role of the 'Model I/O' building block?",
        options: [
          "It provides unified interfaces for formatting input prompts, interacting with diverse language model wrappers, and structuring raw text responses into predictable application data types.",
          "It physically spins up cooling fans on local motherboard workstation processors.",
          "It compresses MP4 video files into audio podcast sound recordings.",
          "It intercepts incoming VoIP phone calls for sales team routing."
        ],
        correct: 0,
        explanation: "Model I/O handles the core communication bridge: converting structured user inputs via Prompts, calling Models, and executing OutputParsers on the reply strings."
      },
      {
        q: "Why is 'Separation of Concerns' a crucial benefit when structuring LangChain Chains and Runnables?",
        options: [
          "Each module (e.g., PromptTemplate vs. Retriever vs. OutputParser) executes a single dedicated responsibility, allowing unit testing, performance benchmarking, and easy swapping of individual stages.",
          "It forces every developer on the engineering team to work in separate isolated offices.",
          "It divides internet Wi-Fi bandwidth evenly across desktop workstation hardware.",
          "It splits single words in half to make them fit inside mobile screens."
        ],
        correct: 0,
        explanation: "Modular separation means you can tweak prompt phrasing or swap embedding algorithms without rewriting your overarching conversational management logic."
      },
      {
        q: "What is the function of the 'Retrieval' (or Data Connection) module in LangChain's component hierarchy?",
        options: [
          "It supplies the end-to-end data processing infrastructure: loading external file formats, splitting chunks, generating numerical vector embeddings, and retrieving relevant contextual knowledge for LLMs.",
          "It deletes expired cookies from internet browser history folders.",
          "It automatically sends password reset emails to forgotten user accounts.",
          "It compresses database tables into static read-only PDF document files."
        ],
        correct: 0,
        explanation: "The Retrieval architecture manages the lifecycle of un-indexed enterprise unstructured documents, converting them into searchable high-dimensional vector spaces for RAG."
      },
      {
        q: "How does the 'Memory' abstraction augment stateless foundation models within LangChain conversational pipelines?",
        options: [
          "Because LLMs inherently lack memory across separate API requests, LangChain memory modules record, prune, summarizing, and re-inject previous dialog exchanges into subsequent prompts.",
          "It physically upgrades the computer hardware DDR5 memory RAM sticks by soldering new chips.",
          "It saves user passwords in unencrypted plain text across desktop desktop folders.",
          "It prevents users from closing their web browser windows during long operations."
        ],
        correct: 0,
        explanation: "LLM endpoints are purely stateless; LangChain Memory wrappers bridge this gap by capturing prior chat interactions and formatted context for ongoing conversation continuity."
      },
      {
        q: "What is the purpose of 'Callbacks' inside LangChain's execution pipeline?",
        options: [
          "Callbacks provide hooks to tap into intermediate application stages (such as prompt rendering, LLM token streaming, tool execution starts, and errors) for logging, observability, and GUI feedback.",
          "They instruct human call center staff to telephone customer service inquiries back after hours.",
          "They automatically reboot the Linux Linux web hosting servers every midnight.",
          "They reverse the order of alphanumeric words during database query searches."
        ],
        correct: 0,
        explanation: "Callbacks allow developers to intercept real-time operational state—such as streaming individual tokens to a web UI or recording trace execution latencies inside LangSmith."
      },
      {
        q: "In modular AI application design, why is hard-coding user prompt instruction strings inside raw API calling functions considered a poor architectural practice?",
        options: [
          "It creates fragile, unmaintainable spaghetti code where business prompt instructions cannot be easily version-controlled, tested across diverse LLM backends, or securely validated against injection attacks.",
          "It makes the text font color appear too bright on external OLED monitor displays.",
          "It causes the computer motherboard speaker to emit warning sound beeps.",
          "It physically prevents SQL relational database servers from starting up properly."
        ],
        correct: 0,
        explanation: "Decoupling prompts into standardized `PromptTemplate` objects allows prompt versioning, automated parameter sanitization, and seamless re-use across complex AI engineering codebases."
      },
      {
        q: "What role do 'Agents' fulfill that simple sequential 'Chains' cannot achieve?",
        options: [
          "While Chains execute a deterministic, hardcoded sequence of steps, Agents empower an LLM to dynamically reason about tasks and determine its own non-linear tool-calling execution path at runtime.",
          "Agents are expensive human contractors, whereas Chains are physical iron security links.",
          "Chains can execute thousands of tasks simultaneously, while Agents only run on weekends.",
          "There is no functional distinction; both refer to standard loop conditionals."
        ],
        correct: 0,
        explanation: "Chains follow fixed programmatic scripts (Step 1 -> Step 2 -> Step 3); Agents pass control to the LLM reasoning engine to dynamically decide what tools to invoke based on intermediate observations."
      },
      {
        q: "When evaluating LangChain's modular component integration, what does 'Interoperability' mean for external ecosystem providers?",
        options: [
          "LangChain provides standardized integration interfaces for hundreds of third-party platforms (Chroma, Pinecone, OpenAI, HuggingFace, Google Vertex) ensuring uniform API interaction methods.",
          "It means all software engineers must use the exact same brand of wireless keyboard hardware.",
          "It forces every company to open-source their private billing system algorithms.",
          "It prohibits developers from deploying code onto cloud server platforms."
        ],
        correct: 0,
        explanation: "LangChain acts as a standardized adapter ecosystem where dozens of diverse vector stores, LLM providers, and data loaders implement uniform methods for effortless developer composition."
      },
      {
        q: "Why is understanding these architectural components foundational before building advanced RAG or Autonomous Agent applications?",
        options: [
          "Mastering these independent atomic modules ensures developers can diagnose debugging trace bottlenecks, tune retrieval parameters, and compose resilient production-grade AI pipelines without getting overwhelmed.",
          "It allows you to skip writing tests and deploy untested binary files straight to servers.",
          "It prevents any user from typing incorrect syntax into chatbot text boxes.",
          "It eliminates the need for software engineering logic completely."
        ],
        correct: 0,
        explanation: "Complex agentic workflows are simply composed assemblies of these underlying atomic building blocks; mastering Model I/O, Retrieval, and Memory is essential for enterprise AI engineering."
      }
    ]
  },
  {
    id: "eval-mod-5",
    moduleNumber: 5,
    title: "Module 5: Models & Prompts Fundamentals in LangChain",
    courseId: "c1",
    courseTitle: "Generative AI Masterclass",
    type: "Proctored Evaluation",
    questionsCount: 10,
    duration: "20 mins",
    retakePolicy: "Unlimited retakes permitted",
    status: "passed",
    score: 94,
    total: 100,
    threshold: 70,
    questions: [
      {
        q: "What is the critical architectural difference between legacy `LLMs` (like pure completion wrappers) and modern `ChatModels` (like `ChatOpenAI` or `ChatAnthropic`) in LangChain?",
        options: [
          "`LLMs` operate purely on unstructured text string in/out, whereas `ChatModels` process structured sequences of dialog messages (System, Human, AI) enabling sophisticated conversational role conditioning.",
          "`ChatModels` can only operate on mobile phones, while `LLMs` require enterprise server farms.",
          "`LLMs` cost one dollar per character, while `ChatModels` are completely free forever.",
          "There is no distinction; both refer to running simple SQL database select queries."
        ],
        correct: 0,
        explanation: "While legacy LLMs predict raw string continuations, modern ChatModels consume structured message lists with explicit role tagging (System, Human, Assistant), yielding far superior instruction adherence."
      },
      {
        q: "What does the 'Temperature' parameter (e.g., `temperature=0.7` vs `temperature=0.0`) control during LLM sampling?",
        options: [
          "It regulates the randomness of next-token selection: a temperature of 0.0 forces deterministic, highly analytical output (greedy sampling), while higher temperatures introduce creative variability and exploration.",
          "It adjusts the electrical wattage and physical heat dissipation of the GPU silicon processors.",
          "It controls the number of words generated per second across internet connections.",
          "It sets the timeout duration in milliseconds before an API network connection fails."
        ],
        correct: 0,
        explanation: "Temperature scales Logit probabilities before softmax calculation: lower values sharpen probability peaks (ideal for RAG/coding), while higher values flatten peaks for varied creative prose."
      },
      {
        q: "Why should an engineer typically configure `temperature=0.0` when executing enterprise Retrieval-Augmented Generation (RAG) pipelines or structured JSON tool extraction?",
        options: [
          "To minimize hallucination risks and enforce strictly deterministic adherence to retrieved factual evidence or strict syntax schemas without creative deviation.",
          "To prevent the server hardware cooling fans from running too loudly.",
          "Because setting a temperature above 0 automatically deletes the vector database index.",
          "Because higher temperatures cost ten times more billing credits per API token."
        ],
        correct: 0,
        explanation: "In factual enterprise workflows and syntax-sensitive JSON tool extraction, creative randomness is undesirable; greedy sampling (`0.0`) maximizes fidelity to source facts and structure."
      },
      {
        q: "In LangChain, what is the core architectural purpose of a `PromptTemplate` object?",
        options: [
          "It decouples dynamic parameter variables (like `{user_name}` or `{query}`) from static instruction rules, allowing parameterized compilation of prompts before model execution.",
          "It automatically designs colorful HTML webpage background graphics for chat windows.",
          "It encrypts passwords before saving them into local database disk files.",
          "It checks whether an internet connection is using Wi-Fi or Ethernet cables."
        ],
        correct: 0,
        explanation: "A PromptTemplate converts static instructions into reusable dynamic blueprints, safely injecting runtime variables while keeping core behavioral instruction logic clean and maintainable."
      },
      {
        q: "When utilizing `PromptTemplate.from_template()`, what syntax convention is universally used to denote dynamic input variables inside the template string?",
        options: [
          "Single curly brackets enclosing the parameter name (for example: `'Explain the concept of {topic} to a {role}'`).",
          "Double dollar symbols surrounding text (for example: `$$topic$$`).",
          "Percent signs at the start and end of paragraphs (for example: `%topic%`).",
          "Backslash quotation marks before every word (for example: `\\topic\\`)."
        ],
        correct: 0,
        explanation: "LangChain standardizes Python format-string conventions, utilizing single curly braces `{variable_name}` to delineate runtime parameter replacement placeholders."
      },
      {
        q: "What occurs if you attempt to invoke a LangChain `PromptTemplate` without passing one of its mandatory defined variables (e.g. omitting `role` when `{role}` is specified)?",
        options: [
          "LangChain raises a missing variable verification error before calling the expensive LLM API, saving tokens and preventing incomplete instruction execution.",
          "The model assumes the variable name is a password and hacks into the system.",
          "The computer automatically reboots without saving any open file modifications.",
          "The API silent fills in random dictionary words from Shakespeare plays."
        ],
        correct: 0,
        explanation: "PromptTemplates provide client-side input validation, raising immediate exceptions for missing parameter keys before transmitting erroneous requests over expensive external API network calls."
      },
      {
        q: "What is the function of `ChatOpenAI(model='gpt-4o', max_tokens=500)` when instantiating a model wrapper in LangChain?",
        options: [
          "It sets up an authenticated wrapper targeting OpenAI's GPT-4o engine while capping the maximum length of generated response tokens to 500 to prevent runaway output costs.",
          "It installs a local copy of GPT-4 onto your home laptop hard drive permanently.",
          "It restricts the chatbot to only speaking 500 English words for the rest of the year.",
          "It automatically sends $500 directly from your bank account to OpenAI HQ."
        ],
        correct: 0,
        explanation: "`max_tokens` establishes a hard production limit on the length of the generated AI reply, safeguarding applications against infinite repetition loops and unexpected billing spikes."
      },
      {
        q: "Why might a Generative AI application switch from a hosted cloud endpoint (`ChatOpenAI`) to a local open-source inference wrapper (`Ollama` or `HuggingFacePipeline`) in LangChain?",
        options: [
          "To achieve strict air-gapped enterprise data sovereignty, eliminate recurrent token usage billing fees, or conduct offline edge evaluations on secure private hardware.",
          "Because local open-source models generate answers at ten times the speed of cloud clusters.",
          "Because cloud endpoints cannot comprehend English grammar rules correctly.",
          "Because open-source wrappers do not require any computer processor CPU memory."
        ],
        correct: 0,
        explanation: "Local inference wrappers empowers organizations to run high-security conversational applications completely offline within private network boundaries without third-party vendor data exposure."
      },
      {
        q: "In prompt architecture, what is 'System Conditioning' or a 'System Prompt' designed to accomplish?",
        options: [
          "It establishes persistent overarching behavioral personas, security boundary guardrails, tone constraints, and format instructions that govern the LLM across all user turn interactions.",
          "It configures the Wi-Fi network routing protocol tables inside internet modems.",
          "It checks whether the operating system is running Windows 11 or macOS Sonoma.",
          "It deletes all saved documents from the local hard storage disk."
        ],
        correct: 0,
        explanation: "System instructions act as the constitutional rulebook for ChatModels, setting professional tone, role constraints (e.g. 'You are an AI Math Tutor'), and safety limits."
      },
      {
        q: "What is the main engineering benefit of using LangChain model abstractions rather than writing provider-specific vendor SDK syntax (e.g., direct `openai.Chat.create` vs `anthropic.messages.create`)?",
        options: [
          "It eliminates vendor API lock-in by utilizing a single unified invocation protocol (`.invoke()`), allowing instant experimentation across rival model providers with zero application logic refactoring.",
          "It automatically converts English text into computer hardware machine code binaries.",
          "It prevents users from typing questions faster than ten words per minute.",
          "It makes internet web hosting completely free on cloud platform infrastructures."
        ],
        correct: 0,
        explanation: "By standardizing invocation methods (`.invoke()`, `.stream()`), LangChain allows developers to benchmark different foundation models by changing just one line of wrapper setup."
      }
    ]
  }
];
