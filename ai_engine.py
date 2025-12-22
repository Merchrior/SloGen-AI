import requests
import json
import os
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def generate_slogan(product_name, keywords, tone="Creative", language="English"):
    if not GOOGLE_API_KEY:
        return ["Hata: .env dosyasında API anahtarı bulunamadı."]

    model_name = "gemini-3-flash-preview"
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GOOGLE_API_KEY}"
    headers = { 'Content-Type': 'application/json' }
    
    # Dil ve Ton ayarları
    prompt_text = f"""
    Role: You are a world-class marketing copywriter.
    Task: Write 5 distinct marketing slogans for a product.
    
    Product Name: {product_name}
    Keywords/Features: {keywords}
    Target Language: {language}
    Tone of Voice: {tone}
    
    Strict Rules:
    1. Output EXACTLY 5 slogans.
    2. The slogans MUST be in {language} language.
    3. Match the requested tone ({tone}) perfectly.
    4. Keep them short (under 8 words).
    5. Output ONLY the slogans as a bulleted list.
    6. Do not include translations, numbers, or intro text.
    """

    payload = {
        "contents": [{ "parts": [{ "text": prompt_text }] }],
        "generationConfig": { "temperature": 0.85 } # Yaratıcılık oranı
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        
        if response.status_code == 200:
            data = response.json()
            # Cevabı al
            text = data['candidates'][0]['content']['parts'][0]['text'].strip()
            
            # Listeyi temizle (Yıldızları ve tireleri kaldır)
            clean_list = [
                line.replace('*', '').replace('- ', '').strip() 
                for line in text.split('\n') 
                if line.strip()
            ]
            return clean_list
            
        elif response.status_code == 429:
            return ["⚠️ Kota dolu. Lütfen 1 dakika bekleyin."]
        else:
            return [f"API Hatası: {response.status_code}"]

    except Exception as e:
        return [f"Bağlantı Hatası: {str(e)}"]