// Sayfa yüklendiğinde geçmişi getir
document.addEventListener('DOMContentLoaded', loadHistory);

async function generateSlogan() {
    const product = document.getElementById('productInput').value;
    const keywords = document.getElementById('keywordInput').value;
    const tone = document.getElementById('toneInput').value;
    const language = document.getElementById('langInput').value;
    
    const resultList = document.getElementById('resultList');
    const loading = document.getElementById('loading');

    if (!product) {
        alert("Lütfen bir ürün adı girin!");
        return;
    }

    resultList.innerHTML = "";
    loading.classList.remove('hidden');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                product: product, 
                keywords: keywords,
                tone: tone,
                language: language
            })
        });

        const data = await response.json();
        loading.classList.add('hidden');
        
        if (data.slogan && Array.isArray(data.slogan)) {
            // 1. press the screen
            renderSlogans(data.slogan, resultList);
            
            // 2. save to history
            addToHistory(product, tone, data.slogan);
        } else {
            resultList.innerHTML = "<li style='color:red; text-align:center'>Slogan üretilemedi.</li>";
        }

    } catch (error) {
        loading.classList.add('hidden');
        resultList.innerHTML = "<li style='color:red; text-align:center'>Bağlantı hatası!</li>";
        console.error(error);
    }
}

//
function renderSlogans(slogans, container) {
    slogans.forEach(text => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerText = text;
        
        const btn = document.createElement('button');
        btn.innerHTML = "📋"; 
        btn.className = "copy-btn";
        btn.onclick = () => {
            navigator.clipboard.writeText(text);
            btn.innerHTML = "✅"; 
            setTimeout(() => btn.innerHTML = "📋", 2000);
        };

        li.appendChild(span);
        li.appendChild(btn);
        container.appendChild(li);
    });
}



function addToHistory(product, tone, slogans) {
    // create empty list
    let history = JSON.parse(localStorage.getItem('slogen_history')) || [];
    
    // create new save
    const newEntry = {
        id: Date.now(),
        product: product,
        tone: tone,
        slogans: slogans,
        date: new Date().toLocaleTimeString()
    };
    
    // En başa ekle
    history.unshift(newEntry);
    
    // max 10 history
    if (history.length > 10) history.pop();
    
    // save and update screen
    localStorage.setItem('slogen_history', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('slogen_history')) || [];
    
    historyList.innerHTML = "";
    
    if (history.length === 0) {
        historyList.innerHTML = "<p style='color:#aaa; font-size:0.8rem;'>Henüz geçmiş yok.</p>";
        return;
    }

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="hist-top">
                <strong>${item.product}</strong>
                <small>${item.tone} • ${item.date}</small>
            </div>
            <div class="hist-preview">"${item.slogans[0]}"</div>
        `;
        
        // click to retrieve history
        div.onclick = () => {
            const resultList = document.getElementById('resultList');
            resultList.innerHTML = "";
            renderSlogans(item.slogans, resultList);
            document.getElementById('productInput').value = item.product;
        };
        
        historyList.appendChild(div);
    });
}

function clearHistory() {
    localStorage.removeItem('slogen_history');
    loadHistory();
}
