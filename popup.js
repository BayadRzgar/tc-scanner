chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "scan" }, (response) => {
    const subtitleEl = document.getElementById("subtitle");
    const findingsEl = document.getElementById("findings");
    const scoreNumEl = document.getElementById("scoreNum");

    if (chrome.runtime.lastError || !response || !response.text) {
      subtitleEl.textContent = "Could not read this page";
      scoreNumEl.textContent = "–";
      findingsEl.innerHTML = `<div class="empty-state">Open a regular webpage (not a Chrome settings page) and try again.</div>`;
      return;
    }

    const { score, results } = analyzeText(response.text);

    scoreNumEl.textContent = score;
    subtitleEl.textContent = response.isPolicyPage
      ? `${results.length} clause${results.length === 1 ? "" : "s"} flagged`
      : `${results.length} clause${results.length === 1 ? "" : "s"} flagged · page not auto-detected as policy`;

    updateDial(score);

    if (results.length === 0) {
      findingsEl.innerHTML = `<div class="empty-state">No red-flag language found by the current rule set.</div>`;
      return;
    }

    results
      .sort((a, b) => b.severity - a.severity)
      .forEach((r) => {
        const sevClass = r.severity >= 3 ? "high" : r.severity === 2 ? "moderate" : "low";
        const div = document.createElement("div");
        div.className = "finding";
        div.innerHTML = `
          <div class="finding__meta">
            <span class="finding__dot dot--${sevClass}"></span>
            <span class="finding__category">${r.category}</span>
          </div>
          <p class="finding__excerpt">"${r.excerpt}…"</p>
        `;
        findingsEl.appendChild(div);
      });
  });
});

function updateDial(score) {
  const maxScore = 24; // visual full-scale reference point
  const pct = Math.max(0, Math.min(1, score / maxScore));
  const circumference = 2 * Math.PI * 52;
  const dialFill = document.getElementById("dialFill");
  dialFill.style.strokeDasharray = `${circumference}`;
  dialFill.style.strokeDashoffset = `${circumference * (1 - pct)}`;

  let level, colorVar;
  if (score === 0) { level = "CLEAR"; colorVar = "var(--low)"; }
  else if (score <= 4) { level = "LOW RISK"; colorVar = "var(--low)"; }
  else if (score <= 10) { level = "MODERATE RISK"; colorVar = "var(--moderate)"; }
  else { level = "HIGH RISK"; colorVar = "var(--high)"; }

  dialFill.style.stroke = colorVar;
  const labelEl = document.getElementById("scoreLabel");
  labelEl.textContent = level;
  labelEl.style.color = colorVar;
}