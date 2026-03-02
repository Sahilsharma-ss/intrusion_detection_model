function sendData() {
  const features = [];
  for (let i = 1; i <= 8; i++) {
    const val = parseFloat(document.getElementById('f' + i).value);
    if (isNaN(val)) {
      showError("Please fill in all 8 fields with valid numbers before analysing.");
      return;
    }
    features.push(val);
  }

  setLoading(true);
  hideResults();

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features: features })
  })
  .then(res => {
    if (!res.ok) throw new Error("Server responded with status " + res.status);
    return res.json();
  })
  .then(data => {
    setLoading(false);
    showResult(data.result, data.probability);
  })
  .catch(error => {
    setLoading(false);
    showError(
      "Could not reach the backend server. Please ensure the Flask API is running and try again."
    );
  });
}

function setLoading(on) {
  const btn    = document.getElementById("analyseBtn");
  const text   = document.getElementById("btnText");
  const loader = document.getElementById("btnLoader");
  btn.disabled = on;
  text.classList.toggle("hidden", on);
  loader.classList.toggle("hidden", !on);
}

function hideResults() {
  document.getElementById("resultPanel").classList.add("hidden");
  document.getElementById("errorPanel").classList.add("hidden");
}

function showResult(label, probability) {
  const panel  = document.getElementById("resultPanel");
  const icon   = document.getElementById("resultIcon");
  const title  = document.getElementById("resultTitle");
  const detail = document.getElementById("resultDetail");
  const bar    = document.getElementById("probBar");
  const probV  = document.getElementById("probValue");

  const pct = (probability * 100).toFixed(1);

  panel.classList.remove("hidden", "normal", "anomaly");

  if (label === "Anomaly") {
    panel.classList.add("anomaly");
    icon.textContent  = "🚨";
    title.textContent = "Anomaly Detected";
    detail.textContent =
      "The model has flagged this network flow as potentially malicious. " +
      "An anomaly probability above 50% indicates behavior that deviates " +
      "significantly from normal traffic patterns — this may represent a " +
      "port scan, DDoS attempt, or other intrusion activity.";
  } else {
    panel.classList.add("normal");
    icon.textContent  = "✅";
    title.textContent = "Normal Traffic";
    detail.textContent =
      "The model considers this network flow to be within normal parameters. " +
      "The feature values are consistent with benign traffic patterns seen " +
      "during training. No immediate threat is indicated.";
  }

  bar.style.width  = pct + "%";
  probV.textContent = pct + "%";
  panel.classList.remove("hidden");
}

function showError(msg) {
  const panel = document.getElementById("errorPanel");
  document.getElementById("errorMsg").textContent = msg;
  panel.classList.remove("hidden");
}
