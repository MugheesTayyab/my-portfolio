# Feature 01 - MUGHEES.AI Portfolio Chatbot

## Goal

Add a floating AI assistant named `MUGHEES.AI` that answers visitor questions about Muhammad Mughees Tayyab, his projects, skills, education, achievements, and contact availability.

The bot should feel like a terminal-native agent, not a generic chat widget.

## Visitor Experience

Default state:

- A compact floating launcher in the lower-right corner.
- Label: `MUGHEES.AI`
- Status dot: online.
- Small terminal prompt animation.

Open state:

- Terminal-style chat panel.
- First assistant message:
  `> Hello. I am an instance of Mughees. Ask me anything.`
- Suggested question chips:
  - `What's your strongest skill?`
  - `Are you open to internships?`
  - `Tell me about your 30M views`
  - `What did you build with Transformers?`
- Text input and send button.
- Responses under 4 sentences.
- Off-topic answer:
  `> QUERY_OUT_OF_SCOPE - I only know about Mughees Tayyab.`

## MVP Scope

Build this first without an external API:

- Static local answer engine using a curated FAQ dataset.
- Keyword matching plus fallback suggestions.
- Same UI as the final chatbot.
- No backend required.

MVP value: the website looks and feels complete immediately, and no API key is needed.

## Full Scope

Upgrade the MVP to a real LLM-backed assistant:

- Use a serverless function as the API boundary.
- Store the system prompt and resume context on the server.
- Keep API keys server-side only.
- Rate limit by IP/session.
- Add basic abuse filtering.
- Fall back to static FAQ if the API fails.

## Required Content

Create a canonical knowledge base in `data/mughees-profile.js` or `data/mughees-profile.json`:

- Name: Muhammad Mughees Tayyab
- Location: Islamabad, Pakistan
- Education: FAST NUCES Islamabad, BS Computer Science, 4th semester
- Certification: Generative AI Certification, PlanetBeyond, Jan 2026 to Jun 2026
- Skills: Python, C++, PyTorch, LangChain, FAISS, NetworkX, NumPy, SFML, x86 Assembly, DSA
- Projects:
  - Character-Level Transformer Chatbot
  - Temporal Relations Engine
  - C++ SFML Game Systems
  - x86 Super Mario Physics
  - Instagram Algorithm Growth
- Achievement: 30M+ views in 20 days through algorithmic content strategy
- Contact:
  - Email: `muhammadmugheestayyab@gmail.com`
  - Phone: `0310-4579229`
  - LinkedIn: pending exact profile URL
- Availability: open to internships, AI projects, collaborations, and technical communities

## Suggested Files

```text
data/
  mughees-profile.js
scripts/
  mughees-ai.js
styles/components/
  mughees-ai.css
api/
  chat.js                 # only if deploying on Vercel/Netlify style backend
docs/advanced-features/
  01-mughees-ai-chatbot.md
```

For the current static site, include:

```html
<script src="data/mughees-profile.js" defer></script>
<script src="scripts/mughees-ai.js" defer></script>
```

## UI Structure

```html
<section class="ai-agent" id="mughees-ai" aria-label="MUGHEES.AI assistant">
  <button class="ai-launcher" type="button" aria-expanded="false">
    <span class="status-dot"></span>
    MUGHEES.AI
  </button>
  <div class="ai-panel" hidden>
    <header>...</header>
    <div class="ai-messages" role="log" aria-live="polite"></div>
    <div class="ai-chips"></div>
    <form class="ai-form">...</form>
  </div>
</section>
```

## Static FAQ Engine

Use an array of intents:

```js
const MUGHEES_AI_FAQ = [
  {
    id: "transformer-chatbot",
    keywords: ["transformer", "chatbot", "rag", "langchain", "pytorch"],
    answer: "I built my character-level Transformer chatbot from scratch in PyTorch, then added a RAG pipeline with LangChain and FAISS. The point was to understand attention deeply instead of hiding behind pretrained weights."
  }
];
```

Matching rules:

- Normalize input to lowercase.
- Score by keyword matches.
- Prefer exact project/skill matches.
- If no match, show fallback:
  `> I can answer about my projects, skills, education, achievements, or contact details. Try asking about my Transformer chatbot or 30M views.`

## LLM System Prompt

```text
You are MUGHEES.AI, an AI assistant representing Muhammad Mughees Tayyab.
Speak in first person, confidently, with a technical but approachable tone.
You are an AI Engineer and FAST CS 4th semester student in Islamabad.
Your projects include the Transformer chatbot, Temporal Relations Engine, C++ SFML games, x86 Super Mario physics, and Instagram algorithm growth.
Your skills include Python, C++, LangChain, PyTorch, Assembly, SFML, NetworkX, NumPy, and DSA.
Your achievement: 30M views in 20 days through algorithmic content strategy.
Only answer questions about Mughees. Refuse all other topics.
Keep answers under 4 sentences. Be impressive but humble.
Do not invent links, employers, awards, or metrics.
```

## Security Requirements

- Do not call OpenAI/Anthropic directly from browser JavaScript.
- Do not commit API keys.
- Add a daily/session message limit.
- Refuse requests asking for private data, secrets, unrelated coding help, or impersonation outside the portfolio context.
- Log only anonymous analytics if needed; do not store personal visitor messages without a privacy notice.

## Accessibility

- Launcher must be keyboard focusable.
- `Esc` closes the panel.
- Chat history uses `role="log"` and `aria-live="polite"`.
- Input has a visible label.
- Do not trap keyboard focus unless the panel behaves like a modal.

## Performance

- Load the FAQ engine immediately.
- Lazy-load the API connector only when the chat opens.
- Keep first paint unaffected.
- Avoid large model responses; cap response length.

## Implementation Steps

1. Add `data/mughees-profile.js` with profile and FAQ entries.
2. Add the launcher and panel markup to `index.html`.
3. Add `styles/components/mughees-ai.css`.
4. Add `scripts/mughees-ai.js` for open/close, chips, local matching, and message rendering.
5. Add out-of-scope handling.
6. Add API connector only after the static version works.
7. Test keyboard, mobile, and reduced-motion states.

## Acceptance Criteria

- Chat opens and closes without layout shifts.
- Suggested chips send questions.
- At least 12 profile questions get useful answers.
- Off-topic questions are refused.
- No API key exists in client code.
- Works offline in static FAQ mode.
- Mobile panel does not cover the entire page permanently; it can be dismissed.

## Open Decisions

- Exact LinkedIn URL.
- Whether to use OpenAI, Anthropic, or static-only mode.
- Deployment target for serverless function.
- Whether visitor messages should be logged.

