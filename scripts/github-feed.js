(() => {
  const GITHUB_USERNAME = "MugheesTayyab";
  const tickerContent = document.getElementById("github-ticker-content");
  const cacheKey = "mughees.githubFeed";
  const cacheExpiry = 5 * 60 * 1000; // 5 minutes

  async function fetchEvents() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
      if (!response.ok) throw new Error("GitHub API unavailable");
      const events = await response.ok ? await response.json() : [];
      return events;
    } catch (error) {
      console.error("GitHub Fetch Error:", error);
      return null;
    }
  }

  function formatTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 172800) return "yesterday";
    
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function normalizeEvent(event) {
    const repoName = event.repo.name.split("/")[1];
    const repoUrl = `https://github.com/${event.repo.name}`;
    const time = formatTime(event.created_at);

    let action = "";
    switch (event.type) {
      case "PushEvent":
        action = `pushed to <a href="${repoUrl}" target="_blank">${repoName}</a>`;
        break;
      case "CreateEvent":
        action = `created ${event.payload.ref_type} in <a href="${repoUrl}" target="_blank">${repoName}</a>`;
        break;
      case "PullRequestEvent":
        action = `${event.payload.action} PR in <a href="${repoUrl}" target="_blank">${repoName}</a>`;
        break;
      case "IssuesEvent":
        action = `${event.payload.action} issue in <a href="${repoUrl}" target="_blank">${repoName}</a>`;
        break;
      case "WatchEvent":
        action = `starred <a href="${repoUrl}" target="_blank">${repoName}</a>`;
        break;
      case "ForkEvent":
        action = `forked <a href="${repoUrl}" target="_blank">${repoName}</a>`;
        break;
      default:
        return null;
    }

    return `<div class="github-event"><span>${action}</span> <span class="time">${time}</span></div>`;
  }

  function renderEvents(events) {
    if (!tickerContent) return;

    if (!events || events.length === 0) {
      tickerContent.innerHTML = '<div class="github-event">LIVE - GitHub signal temporarily unavailable</div>';
      return;
    }

    const html = events
      .map(normalizeEvent)
      .filter(Boolean)
      .slice(0, 8)
      .join("");

    // Duplicate content for seamless loop
    tickerContent.innerHTML = html + html;
  }

  function renderMomentum(events) {
    const momentumContainer = document.querySelector("#github-momentum .momentum-bars");
    if (!momentumContainer || !events) return;

    // Calculate activity for last 14 days
    const activity = new Array(14).fill(0);
    const now = new Date();

    events.forEach(event => {
      const date = new Date(event.created_at);
      const dayDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      if (dayDiff >= 0 && dayDiff < 14) {
        activity[13 - dayDiff]++;
      }
    });

    const maxActivity = Math.max(...activity, 1);
    momentumContainer.innerHTML = activity
      .map(count => {
        const height = (count / maxActivity) * 100;
        return `<div class="momentum-bar ${count > 0 ? 'active' : ''}" style="height: ${Math.max(height, 10)}%"></div>`;
      })
      .join("");
  }

  async function init() {
    if (!tickerContent) return;

    const cached = JSON.parse(localStorage.getItem(cacheKey));
    const now = Date.now();

    if (cached && now - cached.fetchedAt < cacheExpiry) {
      renderEvents(cached.events);
      renderMomentum(cached.events);
    } else {
      const events = await fetchEvents();
      if (events) {
        localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: now, events }));
        renderEvents(events);
        renderMomentum(events);
      } else if (cached) {
        // Use stale cache if fetch fails
        renderEvents(cached.events);
        renderMomentum(cached.events);
      } else {
        renderEvents([]);
      }
    }
  }

  // Load after page content to prioritize hero render
  window.addEventListener("load", init);
})();
