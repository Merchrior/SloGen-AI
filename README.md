# 🚀 SloGen  
**AI-Powered Marketing Slogan Generator**

SloGen is a modern, web-based **SaaS application** designed for marketers, startups, and small business owners.  
Unlike basic slogan generators, SloGen leverages **Google’s Gemini API** to generate **creative, context-aware, and catchy marketing slogans** in real time.

It provides advanced customization options such as **Tone of Voice** and **Target Language**, ensuring the generated slogans align perfectly with your brand identity.

---

## 🌟 Key Features

- 🧠 **Advanced AI Engine**  
  Powered by Google’s **Gemini 1.5 Flash / 3.0 Preview** models via direct REST API integration.

- 🎨 **Tone of Voice Customization**  
  Creative, Professional, Funny, Minimalist, and Luxury styles.

- 🌍 **Multi-Language Support**  
  Generate slogans instantly in **English** or **Turkish**.

- ⚡ **Real-Time & Bulk Generation**  
  Generates **5 unique slogans** per request in milliseconds.

- 📋 **One-Click Copy**  
  Copy any slogan to the clipboard with a single click.

- 🔒 **Secure Architecture**  
  API keys are stored safely using environment variables (`.env`).

---

## 🛠️ Tech Stack

- **Backend:** Python 3.x, Flask  
- **AI Integration:** Google Gemini API (Direct REST Requests)  
- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **Environment Management:** python-dotenv  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/SloGen-AI.git
cd SloGen-AI
```

## 2️⃣ Create a Virtual Environment (Recommended)
Windows

```bash
Kodu kopyala
python -m venv venv
.\venv\Scripts\activate
```
macOS / Linux
```bash
Kodu kopyala
python3 -m venv venv
source venv/bin/activate
```
## 3️⃣ Install Dependencies
```bash
Kodu kopyala
pip install -r requirements.txt
```
## 4️⃣ Configure API Key 🔑
```bash
Create a .env file in the project root directory and add:

env
Kodu kopyala
GOOGLE_API_KEY=AIzaSyYourActualAPIKeyHere
⚠️ Do not use quotes around the key and do not commit .env to GitHub.
```

## 5️⃣ Run the Application
```bash
python app.py
```
Open your browser and go to:
http://127.0.0.1:5000

📸 Usage Guide
```bash
Product Name: Enter your brand (e.g., "Galaxy Coffee").

Keywords: Add descriptive words (e.g., "hot, morning, energy").

Tone: Select a style (e.g., "Luxury").

Language: Choose "Turkish" or "English".

Click Generate!
```

## 📂 Project Structure
```bash
SloGen-AI/
├── static/
│   ├── style.css       # Modern UI Styling
│   └── script.js       # API Communication & Logic
├── templates/
│   └── index.html      # Main Dashboard
├── ai_engine.py        # Google Gemini Integration Logic
├── app.py              # Flask Server Routes
├── requirements.txt    # Dependencies
├── .env                # API Keys (Excluded from Repo)
└── README.md           # Documentation
```

