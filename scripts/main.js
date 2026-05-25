(() => {
  const track = document.getElementById("site-track");
  const uptime = document.getElementById("uptime");
  const projectList = document.getElementById("project-list");
  const modal = document.getElementById("project-modal");
  const form = document.getElementById("contact-form");
  const output = document.getElementById("contact-output");

  const projects = [
    {
      slug: "aetheris",
      title: "Aetheris — AI Deep Research Assistant",
      tags: "AI | LangGraph | Gemini",
      bars: "█████████",
      accent: "#00ffff",
      desc: "Engineered a LangGraph-powered multi-agent research workflow with dedicated clarity, research, validation, and synthesis agents. Retries low-confidence paths autonomously.",
      tech: "LangGraph, Google Gemini API, Tavily Search, Streamlit",
      impact: "Retrieves live web data and autonomously scores research confidence (0–10)",
      highlight: "Designed graph checkpointing to support dynamic Human-in-the-Loop query clarification"
    },
    {
      slug: "transformer-chatbot",
      title: "Character-Level Transformer Chatbot & RAG System",
      tags: "AI | PyTorch | RAG",
      bars: "████████",
      accent: "#9d00ff",
      desc: "Built a character-level Transformer model from scratch based on the Attention Is All You Need paper, integrating a RAG pipeline via LangChain for real-time factual grounding.",
      tech: "Python, PyTorch, LangChain, custom Transformer, RAG",
      impact: "Persona-driven dialogue optimization and strict character consistency",
      highlight: "No pre-built model shortcut - core transformer logic implemented directly"
    },
    {
      slug: "citymind",
      title: "CityMind — Smart City Simulator",
      tags: "AI | Optimization | CSP",
      bars: "████████░",
      accent: "#00ff9c",
      desc: "Engineered a 144-node emergency response simulator integrating Genetic Algorithms, Simulated Annealing, CSP layout validation, and dynamic A* rerouting.",
      tech: "Python, A*, Genetic Algorithm, Simulated Annealing, Random Forest, CSP, NetworkX",
      impact: "Embedded Random Forest crime-risk classification to influence real-time dispatch and route costs",
      highlight: "Combines multiple search, optimization, and ML techniques into a shared graph model"
    },
    {
      slug: "economic-network",
      title: "Economic Network Analysis (Pakistan CPI)",
      tags: "Data | NetworkX | Graph",
      bars: "███████░",
      accent: "#ffb830",
      desc: "Modeled Pakistan's economic connectivity by computing cosine similarity, adjacency matrices, and four centrality metrics on multi-year CPI data.",
      tech: "Python, NetworkX, NumPy, Hasse Diagrams",
      impact: "Applied entropy-based weighting and Hasse diagrams to identify high-influence economic hubs",
      highlight: "Converts complex, fuzzy chronological constraints into structured, mathematically debuggable graph networks"
    },
    {
      slug: "game-systems",
      title: "C++/SFML & MASM x86 Mario Systems",
      tags: "C++ | x86 ASM | Systems",
      bars: "██████░░",
      accent: "#ff2d55",
      desc: "Engineered 2D games (Space Wars, Buzz Bomber, Xonix) in C++/SFML, and an x86 Assembly Super Mario platformer written in pure MASM close to the metal.",
      tech: "C++, SFML, x86 Assembly, MASM, sprite rendering, manual physics loops",
      impact: "Low-level memory handling, manual sprite rendering, physics loops, and dynamic enemy AI",
      highlight: "Register-level CPU-operation control without modern engine safety nets"
    },
    {
      slug: "instagram-algorithm",
      title: "Instagram Algorithm Growth",
      tags: "Analytics | Growth | Data",
      bars: "█████████",
      accent: "#00c8ff",
      desc: "A data-led content optimization experiment that reached 30M+ views in 20 days.",
      tech: "Analytics, retention loops, posting cadence, content testing",
      impact: "30M+ organic views without paid boosts",
      highlight: "Algorithmic optimization applied outside pure code"
    }
  ];

  const skills = [
    ["Transformers", 450, 80, 112, "#9d00ff", "88% | attention layers, token flow from scratch"],
    ["LangChain", 260, 185, 92, "#9d00ff", "86% | RAG chains and retrieval"],
    ["Python", 450, 185, 118, "#00ff9c", "94% | modeling, AI, systems glue"],
    ["PyTorch", 640, 185, 100, "#9d00ff", "84% | neural nets and training loops"],
    ["LangGraph", 170, 300, 94, "#9d00ff", "88% | multi-agent workflows, checkpointing"],
    ["Algorithms", 450, 300, 112, "#ffb830", "91% | CSP, genetic, search optimization"],
    ["FastAPI", 725, 300, 86, "#00c8ff", "85% | robust backend API services"],
    ["C++ / SFML", 250, 300, 90, "#00ff9c", "82% | OOP, memory, game loops"],
    ["RAG Systems", 650, 300, 92, "#9d00ff", "88% | factual grounding and FAISS"],
    ["x86 Assembly", 450, 410, 86, "#00ff9c", "74% | registers, MASM, control flow"],
    ["Next.js / Docker", 250, 410, 82, "#00c8ff", "80% | containerization & modern frontend"]
  ];

  function renderProjects() {
    if (!projectList) return;
    projectList.innerHTML = projects.map((project, index) => `
      <button class="project-row" type="button" data-magnetic="medium" style="--accent:${project.accent}" data-project="${index}">
        <span>drwxr-xr-x&nbsp;&nbsp;${project.slug}/</span>
        <small>[${project.tags}]</small>
        <span>${project.bars}</span>
      </button>
    `).join("");
  }

  function renderSkills() {
    const map = document.getElementById("skill-map");
    if (!map) return;
    skills.forEach(([name, x, y, size, color, tip]) => {
      const node = document.createElement("button");
      node.className = "skill-node";
      node.type = "button";
      node.dataset.magnetic = "medium";
      node.style.left = `${(x / 900) * 100}%`;
      node.style.top = `${(y / 520) * 100}%`;
      node.style.setProperty("--size", `${size}px`);
      node.style.setProperty("--color", color);
      node.innerHTML = `<span>${name}</span><span class="skill-tip">${tip}</span>`;
      map.appendChild(node);
    });
  }

  function openProject(index) {
    const project = projects[index];
    if (!project || !modal) return;
    modal.style.setProperty("--accent", project.accent);
    document.getElementById("modal-path").textContent = `/projects/${project.slug}`;
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-desc").textContent = project.desc;
    document.getElementById("modal-tech").textContent = project.tech;
    document.getElementById("modal-impact").textContent = project.impact;
    document.getElementById("modal-highlight").textContent = project.highlight;
    modal.showModal();
    document.dispatchEvent(new CustomEvent("portfolio:glitch"));
  }

  function setupModal() {
    projectList?.addEventListener("click", (event) => {
      const row = event.target.closest("[data-project]");
      if (!row) return;
      openProject(Number(row.dataset.project));
    });
    document.getElementById("modal-close")?.addEventListener("click", () => modal?.close());
    document.getElementById("modal-code")?.addEventListener("click", () => {
      window.open("https://github.com/MugheesTayyab/my-portfolio", "_blank");
    });
  }

  function setupUptime() {
    if (!uptime) return;
    const start = Date.now();
    setInterval(() => {
      const seconds = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      uptime.textContent = `UPTIME: ${h}:${m}:${s}`;
    }, 1000);
  }

  function setupSectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: .35 });
    document.querySelectorAll("[data-section]").forEach((section) => observer.observe(section));
  }

  function setupHorizontalScroll() {
    if (!track) return;
    window.addEventListener("wheel", (event) => {
      if (window.innerWidth < 1200) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }, { passive: false });

    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        if (window.innerWidth >= 1200) {
          track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function setupContact() {
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = String(data.get("subject") || "").trim().toLowerCase();
      const body = String(data.get("body") || "").trim().toLowerCase();
      if (`${subject} ${body}`.includes("sudo hire mughees")) {
        output.textContent = "> ROOT ACCESS GRANTED - hire pipeline unlocked";
        document.body.classList.add("confetti");
      } else {
        output.textContent = "> MESSAGE DELIVERED - ACK RECEIVED";
      }
      form.reset();
      document.dispatchEvent(new CustomEvent("portfolio:glitch"));
    });
  }

  renderProjects();
  renderSkills();
  setupModal();
  setupUptime();
  setupSectionObserver();
  setupHorizontalScroll();
  setupContact();
})();
