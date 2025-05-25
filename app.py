from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained LSTM model
model = tf.keras.models.load_model("ids_model.h5")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["features"]  # 8 feature values
    input_data = np.array(data).reshape(1, 1, 8)  # Shape for LSTM
    prediction = model.predict(input_data)[0][0]
    label = "Anomaly" if prediction > 0.5 else "Normal"
    return jsonify({"result": label, "probability": float(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
