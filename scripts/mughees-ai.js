(() => {
  const profile = window.MUGHEES_PROFILE;
  const root = document.getElementById("mughees-ai");
  if (!profile || !root) return;

  const launcher = root.querySelector(".ai-launcher");
  const panel = root.querySelector(".ai-panel");
  const closeButton = root.querySelector(".ai-close");
  const messages = root.querySelector(".ai-messages");
  const chips = root.querySelector(".ai-chips");
  const form = root.querySelector(".ai-form");
  const input = root.querySelector("#ai-question");
  const status = root.querySelector(".ai-limit");
  const maxMessages = 30;
  const storageKey = "mughees.ai.sessionCount";

  function getCount() {
    return Number(sessionStorage.getItem(storageKey) || "0");
  }

  function setCount(value) {
    sessionStorage.setItem(storageKey, String(value));
    if (status) status.textContent = `${value}/${maxMessages} session queries`;
  }

  function openPanel() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    root.classList.add("is-open");
    window.setTimeout(() => input?.focus(), 40);
    document.dispatchEvent(new CustomEvent("portfolio:glitch"));
  }

  function closePanel() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    root.classList.remove("is-open");
    launcher.focus();
  }

  function normalize(text) {
    return text.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ").replace(/\s+/g, " ").trim();
  }

  function isLikelyAboutMughees(query) {
    const scopeWords = [
      "mughees",
      "you",
      "your",
      "project",
      "projects",
      "skill",
      "skills",
      "education",
      "fast",
      "internship",
      "contact",
      "email",
      "phone",
      "ai",
      "transformer",
      "python",
      "c++",
      "cpp",
      "assembly",
      "github",
      "linkedin",
      "30m",
      "views",
      "certification",
      "community"
    ];
    return scopeWords.some((word) => query.includes(word));
  }

  function scoreIntent(intent, query) {
    return intent.keywords.reduce((score, keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (query === normalizedKeyword) return score + 6;
      if (query.includes(normalizedKeyword)) return score + 3;
      return score;
    }, 0);
  }

  function findAnswer(rawQuestion) {
    const query = normalize(rawQuestion);
    if (!query) return "Ask me about projects, skills, education, internships, contact, or the 30M views run.";

    if (query === "sudo game mode" || query === "sudo game-mode" || query === "game mode") {
      document.dispatchEvent(new CustomEvent("portfolio:sudo_game"));
      return "ACCESS_GRANTED - Initializing Game Mode... Done.";
    }

    const ranked = profile.faq
      .map((intent) => ({ intent, score: scoreIntent(intent, query) }))
      .sort((a, b) => b.score - a.score);

    if (ranked[0]?.score > 0) return ranked[0].intent.answer;
    if (isLikelyAboutMughees(query)) return profile.fallback;
    return profile.outOfScope;
  }

  function appendMessage(role, text) {
    const row = document.createElement("div");
    row.className = `ai-message ${role}`;

    const prompt = document.createElement("span");
    prompt.className = "ai-prompt";
    prompt.textContent = role === "user" ? "|" : ">";

    const body = document.createElement("p");
    body.textContent = text;

    row.append(prompt, body);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function answerQuestion(question) {
    const count = getCount();
    if (count >= maxMessages) {
      appendMessage("assistant", "SESSION_LIMIT_REACHED - refresh the page to start a new local chat session.");
      return;
    }

    appendMessage("user", question);
    setCount(count + 1);

    const thinking = document.createElement("div");
    thinking.className = "ai-message assistant is-thinking";
    thinking.innerHTML = '<span class="ai-prompt">&gt;</span><p>computing response...</p>';
    messages.appendChild(thinking);
    messages.scrollTop = messages.scrollHeight;

    window.setTimeout(() => {
      thinking.remove();
      appendMessage("assistant", findAnswer(question));
    }, 260);
  }

  function renderChips() {
    chips.innerHTML = "";
    profile.suggestedQuestions.forEach((question) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ai-chip";
      button.textContent = question;
      button.addEventListener("click", () => {
        if (panel.hidden) openPanel();
        answerQuestion(question);
      });
      chips.appendChild(button);
    });
  }

  launcher?.addEventListener("click", () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });

  closeButton?.addEventListener("click", closePanel);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    answerQuestion(question);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) closePanel();
  });

  renderChips();
  setCount(getCount());
})();
