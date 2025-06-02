# LSTM-based Intrusion Detection System (IDS) with Flask and Frontend GUI

web link : https://sahilsharma-ss.github.io/intrusion_detection_model/

This project implements a machine learning-based Intrusion Detection System (IDS) using **Long Short-Term Memory (LSTM)** for anomaly detection, deployed with a **Flask** backend and a simple **HTML/CSS/JavaScript** frontend for user interaction. The backend serves the machine learning model, and the frontend provides an intuitive interface to input feature values and get anomaly predictions.

---

## Project Structure

```plaintext
lstm_ids_gui_project/
│
├── backend/                  # Flask backend with LSTM model for anomaly detection
│   ├── app.py                # Flask app for the backend API
│   ├── model/                # Folder containing trained model and related scripts
│   ├── requirements.txt      # List of required Python libraries
│   ├── venv/                 # Virtual environment folder (created when activating the environment)
│
├── frontend/                 # Frontend folder with the user interface
│   ├── index.html            # Main HTML page for feature input and anomaly prediction
│   ├── styles.css            # CSS for styling the frontend
│   └── script.js             # JavaScript to handle user interaction with the backend
│
└── README.md                 # This file
```
**How to Use**
1. Enter the 8 feature values in the input fields on the frontend.
2. Click on "Check Anomaly" to send the feature data to the Flask backend.
   
3.The system will process the input and display the prediction, either Anomaly or Normal, based on the trained LSTM model.









