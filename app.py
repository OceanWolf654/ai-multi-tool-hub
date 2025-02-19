import os
from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='.', template_folder='.')

# Hugging Face API Endpoint
HF_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

headers = {"Authorization": f"Bearer {HF_API_KEY}"}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calculator')
def calculator():
    return render_template('calculator.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    
    # Send request to Hugging Face model
    response = requests.post(HF_API_URL, headers=headers, json={"inputs": user_input})
    
    if response.status_code == 200:
        bot_reply = response.json().get("generated_text", "I didn't understand that.")
    else:
        bot_reply = "Sorry, I'm having trouble responding right now."

    return jsonify({"response": bot_reply})

@app.route('/weather')
def weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City is required"}), 400

    weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
    response = requests.get(weather_url)
    data = response.json()

    if response.status_code != 200:
        return jsonify({"error": "Could not fetch weather data"}), 400

    return jsonify({
        "weather": data["weather"][0]["description"],
        "temperature": data["main"]["temp"]
    })

@app.route('/timer')
def timer():
    return render_template('timer.html')

@app.route('/stopwatch')
def stopwatch():
    return render_template('stopwatch.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)
