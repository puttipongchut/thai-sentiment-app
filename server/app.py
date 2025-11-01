from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://thai-sentiment-app.vercel.app/"]}})

try:
    pipe = pipeline("text-classification", model="SandboxBhh/sentiment-thai-text-model")

except Exception as e:
    print(f"Error loading model: {e}")
    pipe = None

@app.route('/api/analyze', methods=['POST'])
def analyze_sentiment():
    if pipe is None:
        return jsonify({"error": "Model failed to load."}), 500
    
    data = request.get_json(silent=True)
    if not data or 'text' not in data:
        return jsonify({"error": "Invalid input. Please provide a JSON with a 'text' field."}), 400
    
    input_text = data['text']

    try:
        results = pipe(input_text)
        return jsonify(results[0])
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {e}"}), 500

if __name__ == '__main__':
    port = os.environ.get("PORT", 4000)
    app.run(host='0.0.0.0', port=port)