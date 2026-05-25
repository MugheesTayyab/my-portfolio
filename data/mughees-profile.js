window.MUGHEES_PROFILE = {
  identity: {
    name: "Muhammad Mughees Tayyab",
    assistantName: "MUGHEES.AI",
    location: "Islamabad, Pakistan",
    role: "AI Engineer | Systems Developer | FAST CS",
    education: "BS Computer Science, FAST NUCES Islamabad (4th Sem)",
    certification: "Generative AI Certification, PlanetBeyond Islamabad",
    availability: "Open to internships, AI/ML engineering, systems development, and research-style collaborations"
  },
  contact: {
    email: "muhammadmugheestayyab@gmail.com",
    phone: "0310-4579229",
    linkedin: "https://linkedin.com/in/mugheestayyabkundi",
    github: "https://github.com/MugheesTayyab"
  },
  suggestedQuestions: [
    "Tell me about Aetheris research agent",
    "What's your strongest skill?",
    "What did you build with Transformers?",
    "Are you open to internships?"
  ],
  fallback:
    "I can answer about Aetheris, my custom Transformer chatbot, CityMind simulator, skills, education, and achievements. Try asking about Aetheris or my 30M views.",
  outOfScope:
    "QUERY_OUT_OF_SCOPE - I only know about Muhammad Mughees Tayyab.",
  faq: [
    {
      id: "strongest-skill",
      keywords: ["strongest", "best", "main skill", "core skill", "specialty", "speciality", "skills", "stack", "tech"],
      answer:
        "My strongest area is building rigorous AI systems and low-level software. My core stack includes Python (LangGraph, LangChain, PyTorch), FastAPI, C++, and x86 MASM Assembly. I specialize in agentic workflows, custom Transformer architectures, and complex optimization algorithms."
    },
    {
      id: "aetheris",
      keywords: ["aetheris", "research", "agent", "deep research", "langgraph", "gemini", "tavily"],
      answer:
        "Aetheris is an AI Deep Research Assistant. I engineered a LangGraph-powered multi-agent workflow featuring clarity, research, validation, and synthesis agents. It integrates Tavily Search and Gemini API to retrieve web data, score confidence (0-10), and autonomously retry low-confidence paths. It also supports graph checkpointing for human-in-the-loop query clarification."
    },
    {
      id: "transformer-chatbot",
      keywords: ["transformer", "chatbot", "attention", "rag", "langchain", "faiss", "pytorch"],
      answer:
        "I built a character-level Transformer chatbot from scratch in PyTorch, following the Attention Is All You Need architecture instead of relying on pretrained weights. I then integrated a RAG pipeline with LangChain and FAISS for factual grounding and persona-driven dialogue optimization."
    },
    {
      id: "citymind",
      keywords: ["citymind", "smart city", "simulator", "a*", "genetic", "annealing", "csp"],
      answer:
        "CityMind is a 144-node smart city emergency response simulator. I integrated CSP layout validation, Genetic Algorithm road optimization, Simulated Annealing ambulance placement, dynamic A* rerouting, and a Random Forest crime-risk classification into a shared NetworkX graph."
    },
    {
      id: "economic-network",
      keywords: ["economic", "network", "cpi", "pakistan", "networkx", "hasse"],
      answer:
        "I modeled Pakistan's economic connectivity using a NetworkX pipeline to compute cosine similarity, adjacency matrices, and centrality metrics on multi-year Consumer Price Index (CPI) data, visualizing structural shifts with Hasse diagrams."
    },
    {
      id: "games-systems",
      keywords: ["game", "games", "c++", "sfml", "assembly", "mario", "masm", "x86"],
      answer:
        "I engineered three C++/SFML games (Space Wars, Buzz Bomber, Xonix) implementing dynamic AI, pathfinding, and OOP design. Additionally, I built an x86 Assembly Super Mario platformer in MASM with sprite rendering and manual physics loops close to the metal."
    },
    {
      id: "internships",
      keywords: ["internship", "internships", "hire", "available", "availability", "work", "job", "open"],
      answer:
        "Yes, I am actively seeking internships, research-style AI projects, and systems development roles. I am excited to work on agentic GenAI, complex algorithm design, or core backend/low-level systems."
    },
    {
      id: "views",
      keywords: ["30m", "30 million", "views", "instagram", "growth", "algorithm", "content"],
      answer:
        "I generated 30M+ organic views in 20 days through algorithmic content strategy, not paid boosts. I treated content creation as an optimization problem, testing retention loops, timing, and posting cadence."
    },
    {
      id: "education",
      keywords: ["education", "fast", "nuces", "university", "semester", "degree", "college"],
      answer:
        "I am a CS Undergraduate at FAST NUCES Islamabad, currently in my 4th Semester (June 2024 - Expected May 2028). I'm also GenAI Certified from PlanetBeyond Islamabad (Jan 2026 - Jun 2026)."
    },
    {
      id: "achievements",
      keywords: ["achievements", "awards", "hackathon", "atomcamp", "runner-up", "lms"],
      answer:
        "My key achievements include reaching 30M+ Instagram views in 20 days and securing Runner-Up in the Atomcamp Hackathon, where I co-developed an adaptive LMS product recognized among top submissions."
    },
    {
      id: "community",
      keywords: ["community", "pehli", "kiran", "fcss", "nascon", "teaching", "leadership", "assistant"],
      answer:
        "I served as a Computer Lab Assistant at Pehli Kiran Schools, teaching AI fundamentals and lesson plans to underprivileged children. I am also active on campus with FCSS (Fast CS Society) and NASCON."
    },
    {
      id: "contact",
      keywords: ["contact", "email", "phone", "linkedin", "github", "reach", "message"],
      answer:
        "You can email me at muhammadmugheestayyab@gmail.com, call 0310-4579229, or connect via LinkedIn: https://linkedin.com/in/mugheestayyabkundi and GitHub: https://github.com/MugheesTayyab."
    }
  ]
};
