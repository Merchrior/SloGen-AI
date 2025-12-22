from flask import Flask, render_template, request, jsonify
from ai_engine import generate_slogan

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    
    # Frontend'den gelen verileri al
    product = data.get('product')
    tags = data.get('keywords')
    tone = data.get('tone', 'Creative')      # Varsayılan: Creative
    language = data.get('language', 'English') # Varsayılan: English

    if not product:
        return jsonify({'error': 'Product name is required'}), 400

    try:
        # 4 parametreyi de fonksiyona gönder
        slogan_list = generate_slogan(product, tags, tone, language)
        return jsonify({'slogan': slogan_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)