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
    keywords = data.get('keywords', '')
    tone = data.get('tone', 'Creative')
    language = data.get('language', 'Turkish')

    if not product:
        return jsonify({'error': 'Ürün adı gerekli!'}), 400

    try:
        # API Motorunu Çalıştır
        slogan_list = generate_slogan(product, keywords, tone, language)
        
        # Sonucu JSON olarak döndür
        return jsonify({'slogan': slogan_list})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)