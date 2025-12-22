async function generateSlogan() {
    const product = document.getElementById('productInput').value;
    const keywords = document.getElementById('keywordInput').value;
    const tone = document.getElementById('toneInput').value; // YENİ
    const language = document.getElementById('langInput').value; // YENİ
    
    const resultList = document.getElementById('resultList');
    const loading = document.getElementById('loading');

    if (!product) {
        alert("Please enter a product name.");
        return;
    }

    // Listeyi temizle
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
            data.slogan.forEach(text => {
                const li = document.createElement('li');
                
                // Slogan metni
                const span = document.createElement('span');
                span.innerText = text;
                
                // Kopyalama butonu
                const btn = document.createElement('button');
                btn.innerHTML = "📋";
                btn.className = "copy-btn";
                btn.title = "Copy to clipboard";
                
                // Tıklayınca kopyala
                btn.onclick = () => {
                    navigator.clipboard.writeText(text);
                    btn.innerHTML = "✅"; // İkonu değiştir
                    setTimeout(() => btn.innerHTML = "📋", 2000); // 2 sn sonra eski haline getir
                };

                li.appendChild(span);
                li.appendChild(btn);
                resultList.appendChild(li);
            });
        } else {
            resultList.innerHTML = "<li style='color:red'>Slogan üretilemedi.</li>";
        }

    } catch (error) {
        loading.classList.add('hidden');
        resultList.innerHTML = "<li style='color:red'>Sunucu hatası.</li>";
        console.error(error);
    }
}