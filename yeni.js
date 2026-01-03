window.addEventListener('DOMContentLoaded', () => {
    // 1. Ana sisteme "Ben hazırım" sinyali gönder
    window.parent.postMessage({ type: 'GAME_READY', gameId: 1 }, '*');
});

// 2. My Store'dan Gelen Kullanıcı Verisini İşle
window.addEventListener('message', function (event) {
    const data = event.data;

    // Sadece INIT_USER mesajını dinle
    if (data && data.type === 'INIT_USER') {
        user.name = data.username;
        user.money = data.balance;

        // Arayüzü güncelle
        const nameInput = document.getElementById("username-input");
        const nameDisplay = document.getElementById("username-display");
        const moneyDisplay = document.getElementById("money-display");

        if (nameInput) nameInput.value = user.name;
        if (nameDisplay) nameDisplay.textContent = user.name;
        if (moneyDisplay) moneyDisplay.textContent = user.money + " ₺";

        // Tabloyu Anında Güncelle (Veri geldiği gibi listeye işlesin)
        saveUserData();

        console.log("My Store: Giriş yapıldı ve tablo güncellendi.", user);
    }
});

let user = {
    name: "Misafir",
    money: 1000,
    betAmount: 0,
    selectedTeam: "",
    reachedStage: "",
    groupPosition: 0
};

// Takım Listesi
const takimlar = [
    "MANCHESTER UNITED", "MANCHESTER CITY", "CHELSEA", "ARSENAL",
    "LIVERPOOL", "JUVENTUS", "TOTTENHAM HOTSPUR FC", "REAL MADRID",
    "BAYERN MUNICH", "BORUSSIA DORTMUND", "FC INTERNAZIONALE MILANO", "PARIS SAINT GERMAIN",
    "BARCELONA", "ATLETICO MADRID", "BESIKTAS", "GALATASARAY",
    "AC MILAN", "AJAX AMSTERDAM", "FC PORTO", "SL BENFICA",
    "OLYMPIQUE MARSILYA", "OLYMPIQUE LYON", "PSV EINDHOVEN", "SSC NAPOLI",
    "ATHLETIC BILBAO", "FEYENOORD", "FK KIZILYILDIZ", "SEVILLA FC",
    "BAYER 04 LEVERKUSEN", "VILLARREAL CF", "CSKA MOSKOVA", "FENERBAHCE"
];

// Güç Klasmanları
const MAXIMUM_GUC = ["REAL MADRID", "MANCHESTER CITY", "BAYERN MUNICH", "LIVERPOOL", "BARCELONA", "MANCHESTER UNITED"];
const YUKSEK_GUC = ["PARIS SAINT GERMAIN", "CHELSEA", "JUVENTUS", "ARSENAL", "AC MILAN", "TOTTENHAM HOTSPUR FC"];
const ORTA_GUC = ["ATLETICO MADRID", "BORUSSIA DORTMUND", "FC INTERNAZIONALE MILANO", "FC PORTO", "SL BENFICA"];
const DUSUK_GUC = ["AJAX AMSTERDAM", "BAYER 04 LEVERKUSEN", "PSV EINDHOVEN", "OLYMPIQUE LYON", "OLYMPIQUE MARSILYA", "FEYENOORD", "GALATASARAY", "BESIKTAS"];
const MINIMUM_GUC = ["SEVILLA FC", "SSC NAPOLI", "VILLARREAL CF", "ATHLETIC BILBAO", "FK KIZILYILDIZ", "FENERBAHCE", "CSKA MOSKOVA"];

// Güç Seviyesi Çarpanları
const gucSeviyesiCarpanlari = {
    'MAXIMUM_GUC': { kazanim: 0.5, kaybetme: 2.5 },
    'YUKSEK_GUC': { kazanim: 1.0, kaybetme: 2.0 },
    'ORTA_GUC': { kazanim: 1.5, kaybetme: 1.5 },
    'DUSUK_GUC': { kazanim: 2.5, kaybetme: 1.0 },
    'MINIMUM_GUC': { kazanim: 2.5, kaybetme: 0.5 }
};

// Dinamik Gol Veri Yapısı
const takimGolVerisi = {
    "REAL MADRID": { MAX: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 10], YUKSEK: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7], ORTA: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6], DUSUK: [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4], MINIMUM: [0, 1, 1, 1, 1, 2, 2, 2] },
    "MANCHESTER CITY": { MAX: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9], YUKSEK: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 6], ORTA: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6], DUSUK: [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4], MINIMUM: [0, 1, 1, 1, 1, 2, 2, 2] },
    "BAYERN MUNICH": { MAX: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 8], YUKSEK: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 6, 6], ORTA: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6], DUSUK: [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4], MINIMUM: [0, 1, 1, 1, 1, 2, 2, 2] },
    "LIVERPOOL": { MAX: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8], YUKSEK: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6], ORTA: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6], DUSUK: [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4], MINIMUM: [0, 1, 1, 1, 1, 2, 2, 2] },
    "BARCELONA": { MAX: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 7], YUKSEK: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 5, 5, 6, 6], ORTA: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6], DUSUK: [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4], MINIMUM: [0, 1, 1, 1, 1, 2, 2, 2] },
    "MANCHESTER UNITED": { MAX: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 7, 7, 8, 8, 7], YUKSEK: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6], ORTA: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6], DUSUK: [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4], MINIMUM: [0, 1, 1, 1, 1, 2, 2, 2] },
    "PARIS SAINT GERMAIN": { MAX: [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8], YUKSEK: [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6], ORTA: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], DUSUK: [1, 1, 2, 2, 2, 2, 3, 3, 3, 4], MINIMUM: [0, 0, 1, 1, 1, 2, 2] },
    "CHELSEA": { MAX: [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7], YUKSEK: [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 5], ORTA: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], DUSUK: [1, 1, 2, 2, 2, 2, 3, 3, 3, 4], MINIMUM: [0, 0, 1, 1, 1, 2, 2] },
    "JUVENTUS": { MAX: [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 6, 7], YUKSEK: [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5], ORTA: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], DUSUK: [1, 1, 2, 2, 2, 2, 3, 3, 3, 4], MINIMUM: [0, 0, 1, 1, 1, 2, 2] },
    "ARSENAL": { MAX: [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 6, 6, 6], YUKSEK: [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 4, 5, 5], ORTA: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], DUSUK: [1, 1, 2, 2, 2, 2, 3, 3, 3, 4], MINIMUM: [0, 0, 1, 1, 1, 2, 2] },
    "AC MILAN": { MAX: [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 5, 6, 6, 6, 6], YUKSEK: [2, 3, 3, 3, 4, 4, 4, 4, 5, 4, 4, 4, 5, 5], ORTA: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], DUSUK: [1, 1, 2, 2, 2, 2, 3, 3, 3, 4], MINIMUM: [0, 0, 1, 1, 1, 2, 2] },
    "TOTTENHAM HOTSPUR FC": { MAX: [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 5, 5, 5, 6, 6, 6], YUKSEK: [2, 3, 3, 3, 4, 4, 4, 3, 4, 4, 4, 4, 5, 5], ORTA: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], DUSUK: [1, 1, 2, 2, 2, 2, 3, 3, 3, 4], MINIMUM: [0, 0, 1, 1, 1, 2, 2] },
    "ATLETICO MADRID": { MAX: [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7], YUKSEK: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5], ORTA: [1, 2, 2, 2, 3, 3, 3, 3, 4, 4], DUSUK: [1, 1, 1, 2, 2, 2, 3, 3], MINIMUM: [0, 0, 1, 1, 1, 2] },
    "BORUSSIA DORTMUND": { MAX: [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6], YUKSEK: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 4], ORTA: [1, 2, 2, 2, 3, 3, 3, 3, 4, 4], DUSUK: [1, 1, 1, 2, 2, 2, 3, 3], MINIMUM: [0, 0, 1, 1, 1, 2] },
    "FC INTERNAZIONALE MILANO": { MAX: [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 5, 6], YUKSEK: [2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4], ORTA: [1, 2, 2, 2, 3, 3, 3, 3, 4, 4], DUSUK: [1, 1, 1, 2, 2, 2, 3, 3], MINIMUM: [0, 0, 1, 1, 1, 2] },
    "FC PORTO": { MAX: [2, 3, 3, 3, 4, 4, 4, 5, 5, 4, 5, 5, 5], YUKSEK: [2, 2, 2, 3, 3, 2, 3, 3, 3, 4, 4], ORTA: [1, 2, 2, 2, 3, 3, 3, 3, 4, 4], DUSUK: [1, 1, 1, 2, 2, 2, 3, 3], MINIMUM: [0, 0, 1, 1, 1, 2] },
    "SL BENFICA": { MAX: [2, 3, 3, 3, 4, 4, 3, 4, 4, 4, 5, 5, 5], YUKSEK: [2, 2, 1, 2, 2, 2, 3, 3, 3, 3, 4], ORTA: [1, 2, 2, 2, 3, 3, 3, 3, 4, 4], DUSUK: [1, 1, 1, 2, 2, 2, 3, 3], MINIMUM: [0, 0, 1, 1, 1, 2] },
    "AJAX AMSTERDAM": { MAX: [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6], YUKSEK: [1, 2, 2, 2, 3, 3, 3, 4, 4], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "BAYER 04 LEVERKUSEN": { MAX: [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5], YUKSEK: [1, 2, 2, 2, 3, 3, 3, 4, 3], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "PSV EINDHOVEN": { MAX: [2, 2, 3, 3, 3, 4, 4, 4, 5, 4, 5], YUKSEK: [1, 2, 2, 2, 3, 3, 3, 3, 3], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "OLYMPIQUE LYON": { MAX: [2, 2, 3, 3, 3, 4, 4, 3, 4, 4, 5], YUKSEK: [1, 2, 2, 2, 3, 2, 2, 3, 3], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "OLYMPIQUE MARSILYA": { MAX: [2, 2, 3, 3, 3, 4, 3, 3, 3, 4, 4], YUKSEK: [1, 2, 2, 1, 2, 2, 2, 2, 3], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "FEYENOORD": { MAX: [2, 2, 3, 3, 2, 3, 3, 3, 3, 4, 4], YUKSEK: [1, 2, 1, 1, 1, 1, 2, 2, 3], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "GALATASARAY": { MAX: [2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 4], YUKSEK: [1, 1, 1, 1, 1, 1, 1, 2, 2], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "BESIKTAS": { MAX: [2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 4], YUKSEK: [1, 1, 1, 1, 1, 1, 1, 2, 2], ORTA: [1, 1, 2, 2, 3, 3, 3, 4], DUSUK: [0, 1, 1, 2, 2, 2], MINIMUM: [0, 0, 1, 1] },
    "SEVILLA FC": { MAX: [1, 2, 2, 2, 3, 3, 4, 4, 5], YUKSEK: [1, 1, 2, 2, 2, 3, 3, 4], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] },
    "SSC NAPOLI": { MAX: [1, 2, 2, 2, 3, 3, 4, 4, 4], YUKSEK: [1, 1, 2, 2, 2, 3, 3, 3], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] },
    "VILLARREAL CF": { MAX: [1, 2, 2, 2, 3, 3, 4, 3, 4], YUKSEK: [1, 1, 2, 2, 2, 3, 2, 3], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] },
    "ATHLETIC BILBAO": { MAX: [1, 2, 2, 2, 3, 3, 3, 3, 3], YUKSEK: [1, 1, 2, 2, 1, 2, 2, 2], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] },
    "FK KIZILYILDIZ": { MAX: [1, 2, 2, 2, 3, 2, 2, 3, 3], YUKSEK: [1, 1, 2, 1, 1, 1, 2, 2], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] },
    "FENERBAHCE": { MAX: [1, 2, 2, 1, 2, 2, 2, 2, 3], YUKSEK: [1, 0, 1, 1, 1, 1, 1, 2], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] },
    "CSKA MOSKOVA": { MAX: [1, 1, 1, 1, 2, 2, 2, 2, 2], YUKSEK: [0, 0, 0, 1, 1, 1, 1, 1], ORTA: [1, 1, 1, 2, 2, 3, 3], DUSUK: [0, 0, 1, 1, 2, 2], MINIMUM: [0, 0, 1] }
};

// Logo Haritası
const logoMap = {
    "CHELSEA": "chepng.png", "MANCHESTER UNITED": "mcu1.png", "MANCHESTER CITY": "mcupng.png", "ARSENAL": "ars1.png", "LIVERPOOL": "livpng.png", "JUVENTUS": "juv.jpg", "TOTTENHAM HOTSPUR FC": "totarmakare.png", "REAL MADRID": "rmailk.jpeg", "BAYERN MUNICH": "munıcpng.png", "BORUSSIA DORTMUND": "bvb-Photoroom.png", "FC INTERNAZIONALE MILANO": "interpng.png", "PARIS SAINT GERMAIN": "psgpng.jpeg", "BARCELONA": "barca-Photoroom%20(1).png", "ATLETICO MADRID": "atlpng.png", "BESIKTAS": "bjk2.-removebg-preview.png", "GALATASARAY": "gs5.jpeg", "AC MILAN": "acmilanarma.png", "AJAX AMSTERDAM": "ajaxarma.png", "FC PORTO": "portoson.png", "SL BENFICA": "benficaarma.png", "OLYMPIQUE MARSILYA": "marpng-Photoroom.png", "OLYMPIQUE LYON": "lyon-Photoroom.png", "PSV EINDHOVEN": "psvpng.png", "SSC NAPOLI": "napoliarma.jpeg", "ATHLETIC BILBAO": "bilbaoarma.png", "FEYENOORD": "feypng.png", "FK KIZILYILDIZ": "kizilyildiz-Photoroom.png", "SEVILLA FC": "sevilla-Photoroom.png", "BAYER 04 LEVERKUSEN": "leverkusenarma.png", "VILLARREAL CF": "villareal-Photoroom.png", "CSKA MOSKOVA": "cskaarma.png", "FENERBAHCE": "fbarma.png"
};

// Takım Güç Oranları
const teamPowerRatings = {
    "REAL MADRID": 99, "MANCHESTER CITY": 98, "BAYERN MUNICH": 97, "LIVERPOOL": 96, "BARCELONA": 95, "MANCHESTER UNITED": 94, "PARIS SAINT GERMAIN": 93, "CHELSEA": 92, "JUVENTUS": 91, "ARSENAL": 90, "AC MILAN": 89, "TOTTENHAM HOTSPUR FC": 88, "ATLETICO MADRID": 87, "BORUSSIA DORTMUND": 86, "FC INTERNAZIONALE MILANO": 85, "FC PORTO": 83, "SL BENFICA": 82, "AJAX AMSTERDAM": 81, "BAYER 04 LEVERKUSEN": 80, "PSV EINDHOVEN": 79, "OLYMPIQUE LYON": 78, "OLYMPIQUE MARSILYA": 77, "FEYENOORD": 76, "GALATASARAY": 75, "BESIKTAS": 75, "SEVILLA FC": 74, "SSC NAPOLI": 73, "VILLARREAL CF": 72, "ATHLETIC BILBAO": 71, "FK KIZILYILDIZ": 70, "FENERBAHCE": 69, "CSKA MOSKOVA": 68
};

let gruplar = [];
let currentBlockIndex = 0;

// Sayfa Yüklendiğinde Çalışacaklar
window.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    checkDailyReward();
    updateLeaderboard();
    initializeGame();
    setupScrollButton();
    setupQuickNav();
    addPowerLevelStyles();
});

// Güç seviyesi stilleri ekleme
function addPowerLevelStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .power-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            flex-shrink: 0;
        }
        .power-maximum { background: linear-gradient(135deg, #FFD700, #FFA500); box-shadow: 0 0 8px #FFD700; }
        .power-high { background: linear-gradient(135deg, #4CAF50, #2E7D32); box-shadow: 0 0 8px #4CAF50; }
        .power-medium { background: linear-gradient(135deg, #2196F3, #1565C0); box-shadow: 0 0 8px #2196F3; }
        .power-low { background: linear-gradient(135deg, #FF9800, #E65100); box-shadow: 0 0 8px #FF9800; }
        .power-minimum { background: linear-gradient(135deg, #F44336, #C62828); box-shadow: 0 0 8px #F44336; }
        
        .info-section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
        }
        .info-title {
            color: #FFD700;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        .info-text {
            color: #ffffff;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 8px;
        }
        .multiplier-table {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
        }
        .multiplier-table th,
        .multiplier-table td {
            padding: 8px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 13px;
        }
        .multiplier-table th {
            background: rgba(255, 215, 0, 0.2);
            color: #FFD700;
            font-weight: 700;
        }
        .multiplier-table td {
            color: #ffffff;
        }
        .win-color { color: #4CAF50; font-weight: 700; }
        .lose-color { color: #F44336; font-weight: 700; }
        
        #infoMenu {
            max-height: 80vh;
            overflow-y: auto;
        }
        
        #infoMenu::-webkit-scrollbar {
            width: 8px;
        }
        #infoMenu::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        #infoMenu::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.3);
            border-radius: 4px;
        }
        #infoMenu::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
}

// Hızlı Navigasyon Menüsü İşlevleri
function setupQuickNav() {
    const toggleBtn = document.getElementById('quickNavToggle');
    const menu = document.getElementById('quickNavMenu');

    menu.innerHTML = `
        <button class="quick-nav-button" data-action="user-group">💠 1. Gruplar</button>
        <button class="quick-nav-button" data-action="stage-son16">💠 2. Son 16</button>
        <button class="quick-nav-button" data-action="stage-ceyrek">💠 3. Çeyrek Final</button>
        <button class="quick-nav-button" data-action="stage-yari">💠 4. Yarı Final</button>
        <button class="quick-nav-button" data-action="stage-final">💠 5. Final</button>
        <button class="quick-nav-button" data-action="finalResults">💠 6. Sonuçlar</button>
        <button class="quick-nav-button" data-action="teamPower" style="border-top: 2px solid rgba(255, 215, 0, 0.2); margin-top: 10px; padding-top: 10px;">💪 Takım Güçleri</button>
        <button class="quick-nav-button" data-action="info">ℹ️ Oyun Bilgileri</button>
    `;

    const buttons = menu.querySelectorAll('.quick-nav-button');

    toggleBtn.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            menu.classList.remove('active');

            if (action === 'user-group') {
                scrollToUserGroup();
            } else if (action === 'teamPower') {
                showTeamPowerInfo();
            } else if (action === 'info') {
                showGameInfo();
            } else {
                const targetElement = document.getElementById(action);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

function scrollToUserGroup() {
    if (!user.selectedTeam) {
        alert("Lütfen önce bir takım seçin!");
        return;
    }
    for (let g = 0; g < gruplar.length; g++) {
        if (gruplar[g].some(t => t.isim === user.selectedTeam)) {
            const targetElement = document.getElementById(`group-block-${g}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }
    }
}

function showTeamPowerInfo() {
    const overlay = document.createElement('div');
    overlay.className = 'info-overlay';

    // Takımları güç puanına göre sırala (yüksekten düşüğe)
    const sortedTeams = [...takimlar].sort((a, b) => {
        const powerA = teamPowerRatings[a] || 0;
        const powerB = teamPowerRatings[b] || 0;
        return powerB - powerA; // Büyükten küçüğe sıralama
    });

    overlay.innerHTML = `
        <div class="info-modal">
            <button class="info-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            <h3 style="color: #ffd700; text-align: center; padding: 10px; border-bottom: 2px solid rgba(255, 215, 0, 0.2); font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">🏆 TAKIM GÜÇ SEVİYELERİ 🏆</h3>
            <div style="max-height: 70vh; overflow-y: auto; padding: 15px;">
                ${sortedTeams.map((takim, index) => {
        const gucPuani = teamPowerRatings[takim] || 0;
        const colorClass = gucPuani >= 94 ? 'power-excellent' :
            gucPuani >= 88 ? 'power-strong' :
                gucPuani >= 82 ? 'power-medium' :
                    gucPuani >= 75 ? 'power-weak' : 'power-very-weak';

        // Sıralama numarası ekle
        return `
                        <div class="team-power-item">
                            <div style="font-weight: bold; color: #ffd700; min-width: 30px; text-align: center;">#${index + 1}</div>
                            <img src="image/${logoMap[takim] || 'default.png'}" class="team-power-logo" onerror="this.src='image/default.png';">
                            <div class="team-power-name-container">
                                <div class="team-power-name">${getPowerIndicator(takim)}${takim}</div>
                                <div class="team-power-bar">
                                    <div class="team-power-bar-fill ${colorClass}" style="width: ${gucPuani}%"></div>
                                </div>
                            </div>
                            <div class="team-power-rating">${gucPuani}</div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Oyun Bilgileri Göster
function showGameInfo() {
    const overlay = document.createElement('div');
    overlay.className = 'info-overlay';
    overlay.innerHTML = `
        <div class="info-modal">
            <button class="info-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            <h3 style="color: #ffd700; text-align: center; padding: 10px; border-bottom: 2px solid rgba(255, 215, 0, 0.2); font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">ℹ️ OYUN BİLGİLERİ</h3>
            <div style="max-height: 70vh; overflow-y: auto; padding: 15px;">
                <div class="info-section">
                    <div class="info-title">🎨 Güç Seviyeleri</div>
                    <div class="info-text">
                        <span class="power-indicator power-maximum"></span> <strong>Maximum Güç:</strong> En güçlü takımlar<br>
                        <span class="power-indicator power-high"></span> <strong>Yüksek Güç:</strong> Güçlü takımlar<br>
                        <span class="power-indicator power-medium"></span> <strong>Orta Güç:</strong> Dengeli takımlar<br>
                        <span class="power-indicator power-low"></span> <strong>Düşük Güç:</strong> Zayıf takımlar<br>
                        <span class="power-indicator power-minimum"></span> <strong>Minimum Güç:</strong> En zayıf takımlar
                    </div>
                </div>
                <div class="info-section">
                    <div class="info-title">💰 Kazanç/Kayıp Katsayıları</div>
                    <div class="info-text">Takım gücüne göre kazancınız ve kaybınız farklı oranlarda çarpılır:</div>
                    <table class="multiplier-table">
                        <thead>
                            <tr>
                                <th>Güç Seviyesi</th>
                                <th class="win-color">Kazanç Çarpanı</th>
                                <th class="lose-color">Kayıp Çarpanı</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span class="power-indicator power-maximum"></span> Maximum</td>
                                <td class="win-color">x0.5</td>
                                <td class="lose-color">x2.5</td>
                            </tr>
                            <tr>
                                <td><span class="power-indicator power-high"></span> Yüksek</td>
                                <td class="win-color">x1.0</td>
                                <td class="lose-color">x2.0</td>
                            </tr>
                            <tr>
                                <td><span class="power-indicator power-medium"></span> Orta</td>
                                <td class="win-color">x1.5</td>
                                <td class="lose-color">x1.5</td>
                            </tr>
                            <tr>
                                <td><span class="power-indicator power-low"></span> Düşük</td>
                                <td class="win-color">x2.5</td>
                                <td class="lose-color">x1.0</td>
                            </tr>
                            <tr>
                                <td><span class="power-indicator power-minimum"></span> Minimum</td>
                                <td class="win-color">x2.5</td>
                                <td class="lose-color">x0.5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="info-section">
                    <div class="info-title">📊 Örnek Hesaplar</div>
                    <div class="info-text">
                        <strong>Örnek 1:</strong> Yüksek Güç takımı (Chelsea) - 100₺ bahis<br>
                        • Şampiyon: (100×10 - 100) × 1.0 = <span class="win-color">900₺ kazanç</span><br>
                        • Kaybeder: 100 × 2.0 = <span class="lose-color">200₺ kayıp</span>
                    </div>
                    <div class="info-text" style="margin-top: 10px;">
                        <strong>Örnek 2:</strong> Düşük Güç takımı (Galatasaray) - 100₺ bahis<br>
                        • Şampiyon: (100×10 - 100) × 2.5 = <span class="win-color">2,250₺ kazanç 🚀</span><br>
                        • Kaybeder: 100 × 1.0 = <span class="lose-color">100₺ kayıp</span>
                    </div>
                </div>
                <div class="info-section">
                    <div class="info-title">🎯 Strateji İpuçları</div>
                    <div class="info-text">
                        • <strong>Güvenli Oyun:</strong> Maximum/Yüksek Güç takımları seçin<br>
                        • <strong>Riskli Yüksek Kazanç:</strong> Düşük/Minimum Güç takımları<br>
                        • <strong>Dengeli Seçim:</strong> Orta Güç takımları ideal denge sağlar
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function toggleLeaderboard() {
}

function loadUserData() {
    const savedName = localStorage.getItem('userName');
    const savedMoney = localStorage.getItem('userMoney');
    if (savedName) {
        user.name = savedName;
        document.getElementById("username-input").value = savedName;
        document.getElementById("username-display").textContent = savedName;
    }
    if (savedMoney) {
        user.money = parseInt(savedMoney, 10);
        document.getElementById("money-display").textContent = `${user.money} ₺`;
    }
}

function checkDailyReward() {
    const lastLogin = localStorage.getItem('lastLogin');
    const now = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (!lastLogin || (now - new Date(parseInt(lastLogin))) > oneDayInMs) {
        user.money += 100;
        document.getElementById("money-display").textContent = `${user.money} ₺`;
        localStorage.setItem('userMoney', user.money);
        localStorage.setItem('lastLogin', now.getTime());
        showMoneyNotification(100, true, "100₺ Günlük Ödül Kazandınız!");
        updateLeaderboard();
    }
}

// yeni.js -> updateLeaderboard fonksiyonunu bununla DEĞİŞTİR:

function updateLeaderboard() {
}

function saveUserData() {
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userMoney', user.money);
    updateLeaderboard();
}

function updateMoney(amount) {
    user.money += amount;
    document.getElementById("money-display").textContent = `${user.money} ₺`;
    saveUserData();
}

function getPowerIndicator(teamName) {
    const klasman = getTakimKlasmani(teamName);
    let colorClass = '';

    switch (klasman) {
        case 'MAXIMUM_GUC':
            colorClass = 'power-maximum';
            break;
        case 'YUKSEK_GUC':
            colorClass = 'power-high';
            break;
        case 'ORTA_GUC':
            colorClass = 'power-medium';
            break;
        case 'DUSUK_GUC':
            colorClass = 'power-low';
            break;
        case 'MINIMUM_GUC':
            colorClass = 'power-minimum';
            break;
    }

    return `<span class="power-indicator ${colorClass}"></span>`;
}

function initializeGame() {
    const select = $('#takimSecimi');
    select.select2({
        placeholder: "-- Takımınızı Seçin --",
        allowClear: true,
        templateResult: formatTeamWithPower,
        templateSelection: formatTeamWithPower,
        dropdownCssClass: 'custom-select2-dropdown'
    });
    takimlar.forEach(takim => {
        select.append(new Option(takim, takim, false, false));
    });
    select.val(null).trigger('change');
}

function formatTeamWithPower(team) {
    if (!team.id) {
        return team.text;
    }
    const logoUrl = `image/${logoMap[team.text] || 'default.png'}`;
    const powerIndicator = getPowerIndicator(team.text);

    return $(`
        <span style="display: flex; align-items: center; gap: 8px;">
            <img src="${logoUrl}" class="select2-team-logo" alt="${team.text}" onerror="this.onerror=null; this.src='image/default.png';">
            ${powerIndicator}
            <span>${team.text}</span>
        </span>
    `);
}

function setupScrollButton() {
    const scrollBtn = document.getElementById("scrollTop");
    window.addEventListener('scroll', function () {
        scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function toggleBettingForm() {
    document.getElementById("bettingForm").classList.toggle("active");
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function getTakimKlasmani(takimAdi) {
    if (MAXIMUM_GUC.includes(takimAdi)) return 'MAXIMUM_GUC';
    if (YUKSEK_GUC.includes(takimAdi)) return 'YUKSEK_GUC';
    if (ORTA_GUC.includes(takimAdi)) return 'ORTA_GUC';
    if (DUSUK_GUC.includes(takimAdi)) return 'DUSUK_GUC';
    if (MINIMUM_GUC.includes(takimAdi)) return 'MINIMUM_GUC';
    return 'MINIMUM_GUC';
}

function getMacStratejisi(kendiKlasmanin, rakipKlasmanin) {
    const klasmanlar = ['MAXIMUM_GUC', 'YUKSEK_GUC', 'ORTA_GUC', 'DUSUK_GUC', 'MINIMUM_GUC'];
    const stratejiler = ['MAX', 'YUKSEK', 'ORTA', 'DUSUK', 'MINIMUM'];

    const kendiIndex = klasmanlar.indexOf(kendiKlasmanin);
    const rakipIndex = klasmanlar.indexOf(rakipKlasmanin);

    const fark = rakipIndex - kendiIndex;

    if (fark >= 2) return stratejiler[0];
    if (fark === 1) return stratejiler[1];
    if (fark === 0) return stratejiler[2];
    if (fark === -1) return stratejiler[3];
    if (fark <= -2) return stratejiler[4];

    return stratejiler[2];
}

function oynaMac(t1, t2) {
    const klasmanT1 = getTakimKlasmani(t1);
    const klasmanT2 = getTakimKlasmani(t2);
    const stratejiT1 = getMacStratejisi(klasmanT1, klasmanT2);
    const stratejiT2 = getMacStratejisi(klasmanT2, klasmanT1);

    const golListesiT1 = takimGolVerisi[t1]?.[stratejiT1] || [0];
    const golListesiT2 = takimGolVerisi[t2]?.[stratejiT2] || [0];

    let g1 = golListesiT1[Math.floor(Math.random() * golListesiT1.length)];
    let g2 = golListesiT2[Math.floor(Math.random() * golListesiT2.length)];

    let kazanan = g1 > g2 ? t1 : g2 > g1 ? t2 : (Math.random() > 0.5 ? t1 : t2);
    return { skor: `${t1} ${g1} - ${g2} ${t2}`, kazanan, goller: [g1, g2] };
}

function createResultBlock(title, subtitle, content, customId = null) {
    return new Promise((resolve) => {
        const container = document.getElementById("sonuclar");
        const block = document.createElement("div");
        block.className = "result-block";
        if (customId) block.id = customId;
        block.style.animationDelay = `${currentBlockIndex * 0.1}s`;

        const header = document.createElement("div");
        header.className = "block-header";
        header.innerHTML = `<div class="block-title">${title}</div><div class="block-subtitle">${subtitle}</div>`;

        block.appendChild(header);
        block.appendChild(content);
        container.appendChild(block);

        currentBlockIndex++;
        setTimeout(resolve, 600);
    });
}

function createGroupTable(grup) {
    const table = document.createElement("table");
    table.className = "group-table";
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr><th>Takım</th><th>O</th><th>G</th><th>B</th><th>M</th><th>AG</th><th>YG</th><th>Averaj</th><th>Puan</th></tr>`;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    grup.forEach(takim => {
        const row = document.createElement("tr");
        if (takim.isim === user.selectedTeam) row.className = "highlighted-team";
        row.innerHTML = `
            <td class="team-cell">
                <img src="image/${logoMap[takim.isim] || 'default.png'}" alt="${takim.isim}" class="team-logo" onerror="this.onerror=null; this.src='image/default.png';">
                <span>${takim.isim}</span>
            </td>
            <td>${takim.oynanan}</td><td>${takim.galibiyet}</td><td>${takim.beraberlik}</td><td>${takim.maglubiyet}</td>
            <td>${takim.atilanGol}</td><td>${takim.yenilenGol}</td><td>${takim.puan}</td><td>${takim.averaj}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    return table;
}

function createMatchesList(matches, isGroup = false) {
    const container = document.createElement("div");
    container.className = "matches-list";
    matches.forEach((match, index) => {
        const matchEl = document.createElement("div");
        matchEl.className = "match-result";
        matchEl.style.animationDelay = `${index * 0.1}s`;

        const parts = match.match(/(.+?)\s(\d+)\s-\s(\d+)\s(.+?)(?:\s→\sKazanan:\s(.+))?$/);
        if (parts) {
            const t1 = parts[1].trim();
            const g1 = parts[2].trim();
            const g2 = parts[3].trim();
            const t2 = parts[4].trim();

            if (t1 === user.selectedTeam || t2 === user.selectedTeam) {
                matchEl.classList.add("highlighted-match");
                const userWon = (t1 === user.selectedTeam && parseInt(g1) > parseInt(g2)) || (t2 === user.selectedTeam && parseInt(g2) > parseInt(g1));
                const userLost = (t1 === user.selectedTeam && parseInt(g1) < parseInt(g2)) || (t2 === user.selectedTeam && parseInt(g2) < parseInt(g1));

                if (userWon) matchEl.classList.add("win");
                else if (userLost) matchEl.classList.add("lose");
                else if (isGroup) matchEl.classList.add("draw");
            }

            const logo1 = document.createElement('img');
            logo1.src = `image/${logoMap[t1] || 'default.png'}`;
            logo1.alt = t1;
            logo1.className = 'match-team-logo';
            logo1.onerror = function () { this.onerror = null; this.src = 'image/default.png'; };

            const logo2 = document.createElement('img');
            logo2.src = `image/${logoMap[t2] || 'default.png'}`;
            logo2.alt = t2;
            logo2.className = 'match-team-logo';
            logo2.onerror = function () { this.onerror = null; this.src = 'image/default.png'; };

            const matchText = document.createElement('span');
            matchText.textContent = match;

            matchEl.appendChild(logo1);
            matchEl.appendChild(matchText);
            matchEl.appendChild(logo2);
        } else {
            matchEl.textContent = match;
        }
        container.appendChild(matchEl);
    });
    return container;
}

function createGroupContent(matches, grup) {
    const content = document.createElement("div");
    content.appendChild(createMatchesList(matches, true));
    content.appendChild(createGroupTable(grup));
    return content;
}

function updateUserInfo() {
    const nameInput = document.getElementById("username-input").value.trim();
    const betInput = parseInt(document.getElementById("bet-amount").value, 10);
    const selectedTeam = $('#takimSecimi').val();

    if (!nameInput) { alert("❌ Lütfen kullanıcı adınızı girin!"); return false; }
    if (!selectedTeam) { alert("❌ Lütfen bir takım seçin!"); return false; }
    if (isNaN(betInput) || betInput < 10) { alert("❌ Minimum bahis miktarı 10₺'dir!"); return false; }
    if (betInput > user.money) { alert(`❌ Yetersiz bakiye! Maksimum bahis: ${user.money}₺`); return false; }

    user.name = nameInput;
    user.betAmount = betInput;
    user.selectedTeam = selectedTeam;
    document.getElementById("username-display").textContent = user.name;
    saveUserData();
    return true;
}

function showMoneyNotification(amount, isWin, customMessage = "") {
    const notification = document.createElement('div');
    notification.className = `money-notification ${isWin ? 'win' : 'lose'}`;
    const icon = isWin ? '🎉' : '😢';
    const amountText = `${isWin ? '+' : ''}${amount}₺`;

    const messageLines = customMessage.split('\n');
    const messageHTML = messageLines.map(line => `<div style="margin: 5px 0;">${line}</div>`).join('');

    notification.innerHTML = `
        <div class="money-icon">${icon}</div>
        <div class="money-amount">${amountText}</div>
        <div class="notification-text" style="font-size: 14px; line-height: 1.8; max-width: 400px; margin: 15px auto;">
            ${messageHTML}
        </div>
    `;

    document.body.appendChild(notification);
    if (isWin) createConfetti();
    setTimeout(() => notification.remove(), 6000);
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function showMatchStartNotification() {
    const notification = document.createElement('div');
    notification.className = 'match-start-notification';
    notification.innerHTML = '<div class="match-start-text">⚽ MAÇ BAŞLADI! ⚽</div>';
    document.body.appendChild(notification);
    createMatchParticles();
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 2000);
}

function createMatchParticles() {
    const container = document.querySelector('.match-start-notification') || document.body;
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.className = 'match-particle';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        const angle = Math.random() * 360;
        const distance = Math.random() * 200 + 50;
        particle.style.setProperty('--tx', `${Math.cos(angle * Math.PI / 180) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle * Math.PI / 180) * distance}px`);
        particle.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
        particle.style.animation = `particleBurst ${Math.random() * 1 + 0.5}s ease-out forwards`;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

function calculateWinnings(reachedStage, grupSirasi) {
    const stageMultipliers = { "Şampiyon": 10, "Final": 6, "Yarı Final": 4, "Çeyrek Final": 2.5, "Son 16": 1.5, "Grup Aşaması": 0 };
    const groupBonuses = { 1: 0.5, 2: 0, 3: -0.5, 4: -1 };

    // Seçilen takımın güç seviyesini bul
    const takimGucSeviyesi = getTakimKlasmani(user.selectedTeam);
    const carpanlar = gucSeviyesiCarpanlari[takimGucSeviyesi] || { kazanim: 1.0, kaybetme: 1.0 };

    // Güç seviyesi adını al
    const gucSeviyesiAdi = {
        'MAXIMUM_GUC': 'Maximum Güç',
        'YUKSEK_GUC': 'Yüksek Güç',
        'ORTA_GUC': 'Orta Güç',
        'DUSUK_GUC': 'Düşük Güç',
        'MINIMUM_GUC': 'Minimum Güç'
    }[takimGucSeviyesi] || 'Bilinmeyen';

    if (grupSirasi >= 3 && reachedStage === "Grup Aşaması") {
        const baseLoss = Math.floor(user.betAmount * (grupSirasi === 3 ? 0.5 : 1));
        const finalLoss = Math.floor(baseLoss * carpanlar.kaybetme);
        return {
            message: `😢 Grup ${grupSirasi}. sırası`,
            detailedMessage: `💸 Temel Kayıp: ${baseLoss}₺\n🎯 Takım Seviyesi: ${gucSeviyesiAdi}\n⚡ Kayıp Çarpanı: x${carpanlar.kaybetme}\n💰 Toplam Kayıp: ${finalLoss}₺`,
            amount: -finalLoss,
            baseAmount: baseLoss,
            multiplier: carpanlar.kaybetme,
            powerLevel: gucSeviyesiAdi,
            isWin: false
        };
    }

    const totalMultiplier = Math.max((stageMultipliers[reachedStage] || 0) + (groupBonuses[grupSirasi] || 0), 0);
    const basePayout = Math.floor(user.betAmount * totalMultiplier);

    if (basePayout > user.betAmount) {
        // KAZANMA DURUMU - Kazanım çarpanı uygula
        const baseProfit = basePayout - user.betAmount;
        const finalProfit = Math.floor(baseProfit * carpanlar.kazanim);
        return {
            message: `🎉 ${reachedStage} Tebrikler!`,
            detailedMessage: `💰 Temel Kazanç: ${baseProfit}₺ (Tur çarpanı: x${totalMultiplier.toFixed(1)})\n🎯 Takım Seviyesi: ${gucSeviyesiAdi}\n⚡ Kazanç Çarpanı: x${carpanlar.kazanim}\n🏆 Toplam Kazanç: ${finalProfit}₺`,
            amount: finalProfit,
            baseAmount: baseProfit,
            multiplier: carpanlar.kazanim,
            powerLevel: gucSeviyesiAdi,
            isWin: true
        };
    } else {
        // KAYBETME DURUMU - Kaybetme çarpanı uygula
        const baseLoss = user.betAmount;
        const finalLoss = Math.floor(baseLoss * carpanlar.kaybetme);
        return {
            message: `😢 Bahis Kaybedildi`,
            detailedMessage: `💸 Temel Kayıp: ${baseLoss}₺\n🎯 Takım Seviyesi: ${gucSeviyesiAdi}\n⚡ Kayıp Çarpanı: x${carpanlar.kaybetme}\n💰 Toplam Kayıp: ${finalLoss}₺`,
            amount: -finalLoss,
            baseAmount: baseLoss,
            multiplier: carpanlar.kaybetme,
            powerLevel: gucSeviyesiAdi,
            isWin: false
        };
    }
}

async function baslatTurnuva() {
    if (!updateUserInfo()) return;

    showMatchStartNotification();
    await new Promise(resolve => setTimeout(resolve, 2000));

    document.getElementById("sonuclar").innerHTML = "";
    currentBlockIndex = 0;

    const takimlarKopya = [...takimlar];
    shuffle(takimlarKopya);

    gruplar = Array.from({ length: 8 }, (_, i) =>
        takimlarKopya.slice(i * 4, i * 4 + 4).map(isim => ({
            isim, puan: 0, averaj: 0, oynanan: 0, galibiyet: 0, beraberlik: 0, maglubiyet: 0, atilanGol: 0, yenilenGol: 0
        }))
    );

    for (let g = 0; g < 8; g++) {
        const grup = gruplar[g];
        const matches = [];
        for (let i = 0; i < 4; i++) {
            for (let j = i + 1; j < 4; j++) {
                const mac = oynaMac(grup[i].isim, grup[j].isim);
                const [gol1, gol2] = mac.goller;
                matches.push(mac.skor);

                grup[i].oynanan++;
                grup[j].oynanan++;
                grup[i].atilanGol += gol1;
                grup[j].atilanGol += gol2;
                grup[i].yenilenGol += gol2;
                grup[j].yenilenGol += gol1;
                grup[i].averaj = grup[i].atilanGol - grup[i].yenilenGol;
                grup[j].averaj = grup[j].atilanGol - grup[j].yenilenGol;

                if (gol1 > gol2) {
                    grup[i].puan += 3;
                    grup[i].galibiyet++;
                    grup[j].maglubiyet++;
                } else if (gol2 > gol1) {
                    grup[j].puan += 3;
                    grup[j].galibiyet++;
                    grup[i].maglubiyet++;
                } else {
                    grup[i].puan += 1;
                    grup[j].puan += 1;
                    grup[i].beraberlik++;
                    grup[j].beraberlik++;
                }
            }
        }
        grup.sort((a, b) => b.puan - a.puan || b.averaj - a.averaj || b.atilanGol - a.atilanGol);
        await createResultBlock(`🏆 GRUP ${g + 1}`, `${grup[0].isim} ve ${grup[1].isim} bir sonraki tura geçti`, createGroupContent(matches, grup), `group-block-${g}`);
    }

    let son16 = gruplar.flatMap(g => [g[0].isim, g[1].isim]);
    shuffle(son16);

    let userGroupPosition = 0;
    const userGroup = gruplar.find(g => g.some(t => t.isim === user.selectedTeam));
    if (userGroup) {
        userGroupPosition = userGroup.findIndex(t => t.isim === user.selectedTeam) + 1;
    }

    const eliminationStages = [
        { name: "SON 16", icon: "🎯", id: "stage-son16" },
        { name: "ÇEYREK FİNAL", icon: "🥉", id: "stage-ceyrek" },
        { name: "YARI FİNAL", icon: "🥈", id: "stage-yari" },
        { name: "FİNAL", icon: "🏆", id: "stage-final" }
    ];

    let currentTeams = son16;
    let userReachedStage = currentTeams.includes(user.selectedTeam) ? "Son 16" : "Grup Aşaması";

    for (const stage of eliminationStages) {
        if (currentTeams.length < 2) break;
        const matches = [];
        const nextRoundTeams = [];
        for (let i = 0; i < currentTeams.length; i += 2) {
            const mac = oynaMac(currentTeams[i], currentTeams[i + 1]);
            matches.push(`${mac.skor} → Kazanan: ${mac.kazanan}`);
            nextRoundTeams.push(mac.kazanan);
        }

        if (nextRoundTeams.includes(user.selectedTeam)) {
            userReachedStage = stage.name === "SON 16" ? "Çeyrek Final" :
                stage.name === "ÇEYREK FİNAL" ? "Yarı Final" :
                    stage.name === "YARI FİNAL" ? "Final" : "Şampiyon";
        }

        await createResultBlock(`${stage.icon} ${stage.name}`, `${nextRoundTeams.length} takım bir sonraki tura geçti`, createMatchesList(matches, false), stage.id);
        currentTeams = nextRoundTeams;
    }

    const champion = currentTeams[0] || "Belli Değil";
    if (champion === user.selectedTeam) userReachedStage = "Şampiyon";

    const winnings = calculateWinnings(userReachedStage, userGroupPosition);

    const finalResultsContainer = document.createElement("div");
    finalResultsContainer.className = "final-results";
    finalResultsContainer.innerHTML = `
        <div class="champion-announcement">🏆 ŞAMPİYON: ${champion} 🏆</div>
        <div class="user-performance">
            <h3 style="color: #ffd700; margin-bottom: 15px;">📊 PERFORMANSINIZ</h3>
            <div class="performance-grid">
                <div class="performance-item"><div class="performance-label">Seçilen Takım</div><div class="performance-value">${user.selectedTeam}</div></div>
                <div class="performance-item"><div class="performance-label">Grup Sıralaması</div><div class="performance-value">${userGroupPosition > 0 ? `${userGroupPosition}. sıra` : 'Elendi'}</div></div>
                <div class="performance-item"><div class="performance-label">Ulaşılan Tur</div><div class="performance-value">${userReachedStage}</div></div>
                <div class="performance-item"><div class="performance-label">Kazanç/Kayıp</div><div class="performance-value" style="color: ${winnings.isWin ? '#4CAF50' : '#f44336'}">${winnings.amount > 0 ? '+' : ''}${winnings.amount}₺</div></div>
                <div class="performance-item"><div class="performance-label">Güncel Bakiye</div><div class="performance-value">${user.money + winnings.amount}₺</div></div>
                <div class="performance-item"><div class="performance-label">Sonuç</div><div class="performance-value">${winnings.message}</div></div>
            </div>
        </div>`;

    // Detaylı hesaplama bölümü oluştur
    const calculationDetails = document.createElement("div");
    calculationDetails.className = "calculation-details";
    calculationDetails.innerHTML = `
        <div class="calculation-title">💰 DETAYLI HESAPLAMA</div>
        
        <div class="calculation-row">
            <span class="calculation-label">Bahis Miktarı:</span>
            <span class="calculation-value">${user.betAmount}₺</span>
        </div>
        
        <div class="calculation-row">
            <span class="calculation-label">Seçilen Takım:</span>
            <span class="calculation-value">${getPowerIndicator(user.selectedTeam)}${user.selectedTeam}</span>
        </div>
        
        <div class="calculation-row">
            <span class="calculation-label">Güç Klasmanı:</span>
            <span class="calculation-value">${winnings.powerLevel}</span>
        </div>
        
        <div class="calculation-divider"></div>
        
        <div class="calculation-row">
            <span class="calculation-label">Temel ${winnings.isWin ? 'Kazanç' : 'Kayıp'}:</span>
            <span class="calculation-value">${winnings.baseAmount}₺</span>
        </div>
        
        <div class="calculation-row">
            <span class="calculation-label">${winnings.isWin ? 'Kazanç' : 'Kayıp'} Çarpanı:</span>
            <span class="calculation-value" style="color: ${winnings.isWin ? '#4CAF50' : '#f44336'}">×${winnings.multiplier}</span>
        </div>
        
        <div class="calculation-divider"></div>
        
        <div class="calculation-final">
            <div class="calculation-row" style="background: transparent; margin: 0;">
                <span class="calculation-label">Toplam Kazanç/Kayıp:</span>
                <span class="calculation-value" style="color: ${winnings.isWin ? '#4CAF50' : '#f44336'}">${winnings.amount > 0 ? '+' : ''}${winnings.amount}₺</span>
            </div>
        </div>
    `;

    // Detaylı hesaplamayı container'a ekle
    finalResultsContainer.appendChild(calculationDetails);
    await createResultBlock("🎊 TURNUVA SONUÇLARI", "Şampiyon belli oldu! Performansınızı inceleyin", finalResultsContainer, "finalResults");

    // DÜZELTME: Para güncelleme ve bildirim gösterme - IntersectionObserver kullanımı
    const finalResultsEl = document.getElementById("finalResults");
    if (finalResultsEl) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateMoney(winnings.amount);
                showMoneyNotification(winnings.amount, winnings.isWin, winnings.message);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        sendScoreToParent(winnings.amount);
        observer.observe(finalResultsEl);
    }

}
// yeni.js - EN ALTA EKLE

function sendScoreToParent(amount) {
    // Sadece iframe içindeysek gönder
    if (window.self !== window.top) {
        window.parent.postMessage({
            type: 'GAME_OVER',
            gameId: 1,
            score: amount,
            pointName: 'Futbol Parası'
        }, '*');
        console.log("My Store: Sonuç gönderildi ->", amount);
    }
}