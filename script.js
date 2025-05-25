function sendData() {
  const features = [];
  for (let i = 1; i <= 8; i++) {
    const val = parseFloat(document.getElementById('f' + i).value);
    if (isNaN(val)) {
      alert("Please fill all 8 fields correctly!");
      return;
    }
    features.push(val);
  }

  fetch("https://intrusion-detection-model.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features: features })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText =
      `Result: ${data.result} (Probability: ${data.probability.toFixed(4)})`;
  })
  .catch(error => {
    document.getElementById("result").innerText =
      "Error connecting to backend. Make sure Flask is running.";
  });
}
