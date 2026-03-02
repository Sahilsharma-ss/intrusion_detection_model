# 🛡️ LSTM-based Network Intrusion Detection System (IDS)

**Live Demo:** [https://sahilsharma-ss.github.io/intrusion_detection_model/](https://sahilsharma-ss.github.io/intrusion_detection_model/)

---

## 📖 Description

This project is a **deep-learning powered Network Intrusion Detection System (IDS)** that analyses statistical features extracted from network traffic flows and classifies them as either **Normal** or an **Anomaly** (a potential intrusion or attack).

At its core, a **Long Short-Term Memory (LSTM)** neural network — trained on the **CIC-IDS-2017** benchmark dataset — learns the temporal patterns that distinguish benign traffic from malicious activity. The trained model is served through a lightweight **Flask REST API**, and a clean **HTML / CSS / JavaScript** frontend lets anyone submit a set of network-flow features and instantly receive a prediction along with a confidence probability score.

Whether you are a network security professional wanting a quick sanity-check tool, or a student exploring how deep learning can be applied to cybersecurity, this project provides an end-to-end, easy-to-use demonstration of AI-driven intrusion detection.

---

## ✨ Features

- **LSTM anomaly detection** — captures temporal dependencies in network traffic to improve detection accuracy.
- **Probability score** — the model returns an anomaly probability (0 – 1), not just a binary label, giving you more context.
- **8 key network-flow features** — Flow Duration, Total Forward/Backward Packets, Packet Length Mean & Std, Flow Inter-Arrival Time Mean, Idle Mean & Std.
- **REST API** — a `/predict` endpoint accepts JSON feature data and returns predictions, making integration with other tools straightforward.
- **Responsive web UI** — works on desktop and mobile browsers; includes descriptive tooltips for every input field.
- **CORS enabled** — the API can be consumed from any origin, including the GitHub Pages frontend.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| ML Model | TensorFlow / Keras (LSTM) |
| Backend API | Python · Flask · Flask-CORS |
| Frontend | HTML5 · CSS3 · Vanilla JavaScript |
| Hosting (frontend) | GitHub Pages |
| Dataset | CIC-IDS-2017 |

---

## 🔍 How It Works

1. **Feature extraction** – capture network traffic with a tool such as [CICFlowMeter](https://www.unb.ca/cic/research/applications.html) and note the 8 statistical values for the flow you want to inspect.
2. **Enter values** – open the [live web app](https://sahilsharma-ss.github.io/intrusion_detection_model/) and fill in the 8 input fields.
3. **Submit** – click **Analyse Traffic**; the frontend sends the values as JSON to the Flask `/predict` endpoint.
4. **Prediction** – the LSTM model processes the input and returns a label (`Normal` / `Anomaly`) together with the raw probability score, which is displayed on screen with a visual progress bar.

### Input Features

| # | Feature | Unit | Description |
|---|---|---|---|
| 1 | Flow Duration | µs | Total duration from first to last packet |
| 2 | Total Forward Packets | — | Packets sent client → server |
| 3 | Total Backward Packets | — | Packets sent server → client |
| 4 | Packet Length Mean | bytes | Average size of all packets |
| 5 | Packet Length Std | bytes | Size variability; high values suggest irregular traffic |
| 6 | Flow IAT Mean | µs | Average inter-arrival time between packets |
| 7 | Idle Mean | µs | Mean idle period within the flow |
| 8 | Idle Std | µs | Idle-time variability; high values may indicate evasion |

---

## 📁 Project Structure

```plaintext
intrusion_detection_model/
│
├── app.py            # Flask backend – loads LSTM model and exposes /predict API
├── ids_model.h5      # Pre-trained LSTM model weights (Keras HDF5 format)
├── index.html        # Frontend entry point (served via GitHub Pages)
├── style.css         # Stylesheet for the web UI
├── script.js         # Frontend logic – form handling & API calls
├── frontend/         # Additional frontend assets
├── requirement.txt   # Python dependencies
└── README.md         # Project documentation (this file)
```

---

## 🚀 Running Locally

### Prerequisites
- Python 3.8+
- pip

### Backend (Flask API)

```bash
# 1. Clone the repository
git clone https://github.com/Sahilsharma-ss/intrusion_detection_model.git
cd intrusion_detection_model

# 2. Install dependencies
pip install -r requirement.txt

# 3. Start the Flask server
python app.py
# API is now running at http://localhost:5000
```

### Frontend

Open `index.html` directly in your browser, **or** serve it with any static file server:

```bash
python -m http.server 8080
# Then visit http://localhost:8080
```

> **Note:** The live web app points to a hosted version of the API. When running locally, update the `API_URL` variable in `script.js` to `http://localhost:5000`.

---

## 📡 API Reference

### `POST /predict`

**Request body (JSON):**
```json
{ "features": [120000, 10, 8, 512, 120, 5000, 300000, 15000] }
```

**Response (JSON):**
```json
{ "result": "Normal", "probability": 0.12 }
```

| Field | Type | Description |
|---|---|---|
| `result` | string | `"Normal"` or `"Anomaly"` |
| `probability` | float | Anomaly probability in the range [0, 1] |









