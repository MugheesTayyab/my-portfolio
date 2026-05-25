# Feature 08 - Project Deep Dives

## Goal

Create dedicated cinematic case-study pages for major projects. Project cards show what was built; deep dives show how Mughees thinks.

## Pages To Create

Recommended first wave:

```text
projects/
  transformer-chatbot.html
  temporal-relations.html
  cpp-sfml-games.html
  x86-super-mario.html
  instagram-algorithm.html
```

If using a static site generator later, move to a templated data-driven system.

## Shared Case Study Structure

Each page should include:

1. Hero
2. Problem
3. Constraints
4. Process
5. Architecture / system diagram
6. Implementation details
7. Results
8. What I learned
9. Links / next project

## Visual Style

Each project gets its own accent:

- Transformer Chatbot: neon purple
- Temporal Relations: amber
- C++ SFML Games: terminal green
- x86 Super Mario: error red
- Instagram Algorithm: cyan

The global dark terminal style remains.

## Transformer Chatbot Case Study

URL:

```text
projects/transformer-chatbot.html
```

Hero:

```text
ATTENTION
IS
ALL YOU NEED
```

Problem:

- "I wanted to understand Transformers - really understand them."
- Explain why implementing from scratch matters.

Process:

- Tokenization.
- Embeddings.
- Positional encoding.
- Multi-head attention.
- Feed-forward block.
- Training loop.
- RAG layer with LangChain and FAISS.

Diagram:

```text
Query -> Embed -> Retrieve -> Context -> Generate
```

Results:

- Hallucination reduction claim from spec: 60%+ in constrained tests.
- Add note: exact benchmark details should be documented before public claim.

Reflection:

- What was hardest.
- What improved after adding RAG.
- What would be done differently next.

## Temporal Relations Case Study

Focus:

- Graph modeling.
- Event ordering.
- Constraint solving.
- NetworkX/PyTorch.

Key visual:

- Nodes as events.
- Edges as temporal constraints.
- Conflict edges highlighted in red.

## C++ SFML Games Case Study

Focus:

- Real-time game loops.
- OOP.
- Collision.
- State machines.
- Game AI.

Key visual:

- Top-down grid / game loop diagram.

## x86 Super Mario Case Study

Focus:

- Low-level rendering.
- Registers and memory.
- Physics without engine abstractions.

Key visual:

- Register panel.
- Jump arc.
- Collision boxes.

## Instagram Algorithm Case Study

Focus:

- Content strategy as algorithm design.
- Hypothesis, test, metrics, iteration.
- 30M+ views in 20 days.

Key visual:

- Growth curve.
- Retention loop.
- Posting cadence experiment matrix.

## Suggested Files

```text
projects/
  transformer-chatbot.html
  temporal-relations.html
  cpp-sfml-games.html
  x86-super-mario.html
  instagram-algorithm.html
styles/
  case-study.css
scripts/
  case-study.js
data/
  projects.js
assets/case-studies/
  transformer-attention.svg
  rag-pipeline.svg
  temporal-graph.svg
  sfml-game-loop.svg
  assembly-registers.svg
  instagram-growth.svg
```

## Navigation Integration

Current project modal has `view code` and close. Add:

- `read deep dive`
- Link to project page.

For unavailable pages:

- Hide button until page exists, or show `case study coming soon`.

## Implementation Steps

1. Create shared `case-study.css`.
2. Create first case study: Transformer Chatbot.
3. Add `read deep dive` button in project modal.
4. Build reusable page sections.
5. Add diagrams as SVG assets.
6. Create remaining project pages.
7. Add previous/next navigation.
8. Add back-to-portfolio link.

## Accessibility

- Case studies must be normal readable documents.
- Animated diagrams need text explanations.
- Avoid scroll-jacking in long-form pages.
- Maintain heading hierarchy.

## Performance

- Lazy-load heavy diagrams.
- Avoid loading all case-study assets on the homepage.
- Use SVG for diagrams where possible.
- Keep each page self-contained and cacheable.

## Acceptance Criteria

- At least one complete case study exists.
- Project modal links to the case study.
- Page explains problem, process, result, and learning.
- Mobile reading experience is strong.
- Claims are specific and not inflated.

## Required Content From Mughees

- Real GitHub/repo links.
- Screenshots or demos if available.
- Accurate metrics and benchmark details.
- Honest reflection paragraphs.
- Resume-safe descriptions of unfinished work.

## Risks

- Case studies can become too long without adding clarity.
- Unsupported metrics can reduce credibility.
- Pages need strong writing, not just animation.

