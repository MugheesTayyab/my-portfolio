(() => {
  const track = document.getElementById("site-track");
  const uptime = document.getElementById("uptime");
  const projectList = document.getElementById("project-list");
  const modal = document.getElementById("project-modal");
  const form = document.getElementById("contact-form");
  const output = document.getElementById("contact-output");

  const projects = [
    {
      slug: "transformer-chatbot",
      title: "Character-Level Transformer Chatbot",
      tags: "AI | Python | LangChain",
      bars: "████████",
      accent: "#9d00ff",
      desc: "Built from scratch from the Attention Is All You Need paper, then extended with a RAG pipeline through LangChain and FAISS.",
      tech: "Python, PyTorch, LangChain, FAISS",
      impact: "Hallucinations minimized by 60%+ in constrained retrieval runs",
      highlight: "No pre-built model shortcut - core transformer logic implemented directly"
    },
    {
      slug: "temporal-relations",
      title: "Temporal Relations Engine",
      tags: "Math | NetworkX | PyTorch",
      bars: "███████░",
      accent: "#ffb830",
      desc: "A graph-first approach to modeling time-aware relations, constraints, and inference paths.",
      tech: "Python, NetworkX, PyTorch, NumPy",
      impact: "Turns fuzzy event order into inspectable graph state",
      highlight: "Math-heavy modeling with visual debugging"
    },
    {
      slug: "cpp-sfml-games",
      title: "C++ SFML Game Systems",
      tags: "C++ | SFML | Game AI",
      bars: "█████░░░",
      accent: "#00ff9c",
      desc: "Interactive game loops, state machines, collision systems, and AI behaviors built in C++.",
      tech: "C++, SFML, OOP, DSA",
      impact: "Practical systems programming through real-time constraints",
      highlight: "Gameplay code shaped by algorithms and memory discipline"
    },
    {
      slug: "x86-super-mario",
      title: "x86 Super Mario Physics",
      tags: "Assembly | MASM | Physics",
      bars: "████░░░░",
      accent: "#ff2d55",
      desc: "Mario-inspired motion, collision, and rendering experiments implemented close to the metal.",
      tech: "x86 Assembly, MASM, Irvine, low-level graphics",
      impact: "Shows understanding of CPU-level control flow and constraints",
      highlight: "Game physics without a modern engine safety net"
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
    ["Transformers", 450, 80, 112, "#9d00ff", "88% | attention layers, token flow"],
    ["LangChain", 260, 185, 92, "#9d00ff", "86% | RAG chains and retrieval"],
    ["Python", 450, 185, 118, "#00ff9c", "94% | modeling, scripting, systems glue"],
    ["PyTorch", 640, 185, 100, "#9d00ff", "84% | neural nets and training loops"],
    ["RAG Systems", 170, 300, 86, "#9d00ff", "86% | FAISS and grounded response design"],
    ["Algorithms", 450, 300, 112, "#ffb830", "91% | DSA, graph logic, optimization"],
    ["NumPy", 725, 300, 82, "#ffb830", "80% | numerical computation"],
    ["C++", 250, 300, 90, "#00ff9c", "82% | OOP, memory, game loops"],
    ["DSA", 650, 300, 86, "#ffb830", "90% | problem solving and structures"],
    ["x86 Assembly", 450, 410, 86, "#00ff9c", "74% | registers, MASM, control flow"],
    ["SFML", 250, 410, 76, "#00ff9c", "78% | rendering and interaction"]
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
      document.getElementById("modal-code").textContent = "repo link pending";
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
