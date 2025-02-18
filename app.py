from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = "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"

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

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}]
    )

    return jsonify({"response": response["choices"][0]["message"]["content"]})

if __name__ == "__main__":
    app.run(debug=True)
