 // Kullanıcı ve Bakiye Bilgileri
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

        // Takım Gol Dağılımları
        const takimGolDagilimlari = {
            "JUVENTUS": [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5],
            "REAL MADRID": [0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6],
            "MANCHESTER CITY": [0, 1, 1, 2, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
            "BAYERN MUNICH": [0, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5],
            "PARIS SAINT GERMAIN": [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5],
            "BARCELONA": [0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
            "MANCHESTER UNITED": [0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5],
            "CHELSEA": [0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5],
            "ARSENAL": [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 4, 4, 4, 5],
            "LIVERPOOL": [0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 6, 5, 8],
            "TOTTENHAM HOTSPUR FC": [0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6],
            "BORUSSIA DORTMUND": [0, 1, 1, 1, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 7],
            "FC INTERNAZIONALE MILANO": [0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4],
            "ATLETICO MADRID": [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4],
            "BESIKTAS": [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
            "GALATASARAY": [0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
            "AC MILAN": [0, 2, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 7, 9],
            "AJAX AMSTERDAM": [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
            "FC PORTO": [0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5],
            "SL BENFICA": [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5],
            "OLYMPIQUE MARSILYA": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 4, 4, 4, 4],
            "OLYMPIQUE LYON": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 4, 4, 4, 4],
            "PSV EINDHOVEN": [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
            "SSC NAPOLI": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 4, 4, 4, 4],
            "ATHLETIC BILBAO": [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
            "FEYENOORD": [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5],
            "FK KIZILYILDIZ": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 4, 4, 4, 4],
            "SEVILLA FC": [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5],
            "BAYER 04 LEVERKUSEN": [0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5],
            "VILLARREAL CF": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
            "CSKA MOSKOVA": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 4, 4, 4, 4],
            "FENERBAHCE": [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 4, 4]
        };

        // Logo Haritası
        const logoMap = {
            "CHELSEA": "chepng.png",
            "MANCHESTER UNITED": "mcu1.png",
            "MANCHESTER CITY": "mcupng.png",
            "ARSENAL": "ars1.png",
            "LIVERPOOL": "livpng.png",
            "JUVENTUS": "juv.jpg",
            "TOTTENHAM HOTSPUR FC": "totarmakare.png",
            "REAL MADRID": "rmailk.jpeg",
            "BAYERN MUNICH": "munıcpng.png",
            "BORUSSIA DORTMUND": "bvb-Photoroom.png",
            "FC INTERNAZIONALE MILANO": "interpng.png",
            "PARIS SAINT GERMAIN": "psgpng.jpeg",
            "BARCELONA": "barca-Photoroom%20(1).png",
            "ATLETICO MADRID": "atlpng.png",
            "BESIKTAS": "bjk2.-removebg-preview.png",
            "GALATASARAY": "gs5.jpeg",
            "AC MILAN": "acmilanarma.png",
            "AJAX AMSTERDAM": "ajaxarma.png",
            "FC PORTO": "portoson.png",
            "SL BENFICA": "benficaarma.png",
            "OLYMPIQUE MARSILYA": "marpng-Photoroom.png",
            "OLYMPIQUE LYON": "lyon-Photoroom.png",
            "PSV EINDHOVEN": "psvpng.png",
            "SSC NAPOLI": "napoliarma.jpeg",
            "ATHLETIC BILBAO": "bilbaoarma.png",
            "FEYENOORD": "feypng.png",
            "FK KIZILYILDIZ": "kizilyildiz-Photoroom.png",
            "SEVILLA FC": "sevilla-Photoroom.png",
            "BAYER 04 LEVERKUSEN": "leverkusenarma.png",
            "VILLARREAL CF": "villareal-Photoroom.png",
            "CSKA MOSKOVA": "cskaarma.png",
            "FENERBAHCE": "fbarma.png"
        };

        // Yeni Eklenen: Takım Güç Oranları (0-100 arası)
        const teamPowerRatings = {
            "REAL MADRID": 95,
            "MANCHESTER CITY": 94,
            "BAYERN MUNICH": 93,
            "PARIS SAINT GERMAIN": 92,
            "LIVERPOOL": 91,
            "BARCELONA": 90,
            "MANCHESTER UNITED": 89,
            "CHELSEA": 88,
            "JUVENTUS": 87,
            "ARSENAL": 86,
            "BORUSSIA DORTMUND": 85,
            "ATLETICO MADRID": 84,
            "FC INTERNAZIONALE MILANO": 83,
            "TOTTENHAM HOTSPUR FC": 82,
            "AC MILAN": 81,
            "AJAX AMSTERDAM": 80,
            "FC PORTO": 79,
            "SL BENFICA": 78,
            "SEVILLA FC": 77,
            "BAYER 04 LEVERKUSEN": 76,
            "SSC NAPOLI": 75,
            "PSV EINDHOVEN": 74,
            "OLYMPIQUE LYON": 73,
            "OLYMPIQUE MARSILYA": 72,
            "VILLARREAL CF": 71,
            "ATHLETIC BILBAO": 70,
            "FEYENOORD": 69,
            "GALATASARAY": 68,
            "BESIKTAS": 67,
            "FK KIZILYILDIZ": 66,
            "FENERBAHCE": 65,
            "CSKA MOSKOVA": 64
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
            setupQuickNav(); // Yeni: Hızlı Menüyü Ayarla
            setupTeamPowerMenu(); // **DÜZELTİLDİ**: Takım Güçleri Menüsünü Ayarla (DOMContentLoaded içinde)
        });

        // Yeni Eklenen: Takım Güçleri Menüsü İşlevleri
        function setupTeamPowerMenu() {
            const toggleBtn = document.getElementById('teamPowerToggle');
            const menu = document.getElementById('teamPowerMenu');
            const list = document.getElementById('teamPowerList');

            // Başlık ekle
    const menuTitle = document.createElement('div');
    menuTitle.className = 'team-power-menu-title';
    menuTitle.innerHTML = `
        <h3 style="
            color: #ffd700; 
            text-align: center; 
            padding: 10px; 
            border-bottom: 2px solid rgba(255, 215, 0, 0.2);
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
        ">🏆 TAKIM GÜÇ SEVİYELERİ 🏆</h3>
    `;
    list.parentNode.insertBefore(menuTitle, list);

            // Her bir takım için güç puanı oluştur ve listeye ekle
            takimlar.forEach(takimAdi => {
                const item = document.createElement('div');
                item.className = 'team-power-item';

                const logo = document.createElement('img');
                logo.src = `image/${logoMap[takimAdi] || 'default.png'}`;
                logo.alt = takimAdi;
                logo.className = 'team-power-logo';
                logo.onerror = function () { this.src = 'image/default.png'; };

                const nameContainer = document.createElement('div');
                nameContainer.className = 'team-power-name-container';

                const name = document.createElement('div');
                name.className = 'team-power-name';
                name.textContent = takimAdi;

                // Güç çubuğu ekle
                const powerBar = document.createElement('div');
                powerBar.className = 'team-power-bar';

                const powerBarFill = document.createElement('div');
                powerBarFill.className = 'team-power-bar-fill';

                // Güç puanını al
                const gucPuani = teamPowerRatings[takimAdi] || 0;

                // Güç çubuğunun genişliğini ayarla
                powerBarFill.style.width = `${gucPuani}%`;
                powerBarFill.style.backgroundColor = getColorForPowerBar(gucPuani);

                powerBar.appendChild(powerBarFill);

                const rating = document.createElement('div');
                rating.className = 'team-power-rating';
                rating.textContent = `${gucPuani}`;

                nameContainer.appendChild(name);
                nameContainer.appendChild(powerBar);

                item.appendChild(logo);
                item.appendChild(nameContainer);
                item.appendChild(rating);
                list.appendChild(item);

                powerBarFill.classList.add('team-power-bar-fill');
                powerBarFill.classList.add(getColorForPowerBar(gucPuani));

            });

            // Menüyü aç/kapa
            toggleBtn.addEventListener('click', function () {
                menu.classList.toggle('active');
            });
        }

        // Güç çubuğu için renk belirleme fonksiyonu
        function getColorForPowerBar(power) {
            if (power >= 90) return 'power-excellent';  // Yeşil (çok güçlü)
            if (power >= 80) return 'power-strong';     // Mavi (güçlü)
            if (power >= 70) return 'power-medium';     // Sarı (orta)
            if (power >= 60) return 'power-weak';       // Turuncu (zayıf)
            return 'power-very-weak';                   // Kırmızı (çok zayıf)
        }



        // Yeni Eklenen: Hızlı Navigasyon Menüsü İşlevleri
        function setupQuickNav() {
            const toggleBtn = document.getElementById('quickNavToggle');
            const menu = document.getElementById('quickNavMenu');
            const buttons = document.querySelectorAll('.quick-nav-button');

            // Menüyü aç/kapa
            toggleBtn.addEventListener('click', function () {
                menu.classList.toggle('active');
            });

            // Butonlara tıklama olayları
            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const targetId = this.getAttribute('data-target');
                    menu.classList.remove('active'); // Tıklanınca menüyü kapat
                    if (targetId === 'user-group') {
                        // "Gruplar" butonu için özel davranış
                        scrollToUserGroup();
                    } else {
                        // Diğer butonlar için normal kaydırma
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                });
            });
        }

        // Kullanıcının takımının olduğu gruba kaydır
        function scrollToUserGroup() {
            if (!user.selectedTeam) {
                alert("Lütfen önce bir takım seçin!");
                return;
            }
            // Kullanıcının takımını içeren ilk grup bloğunu bul
            for (let g = 0; g < gruplar.length; g++) {
                const userIndex = gruplar[g].findIndex(t => t.isim === user.selectedTeam);
                if (userIndex !== -1) {
                    const targetBlockId = `group-block-${g}`;
                    const targetElement = document.getElementById(targetBlockId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        return;
                    }
                }
            }
            // Eğer bulunamazsa, ilk grup bloğuna kaydır
            const fallbackElement = document.querySelector('.result-block');
            if (fallbackElement) {
                fallbackElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Liderlik Tablosu Aç/Kapa Fonksiyonu
        function toggleLeaderboard() {
            const content = document.getElementById("leaderboardContent");
            content.classList.toggle("active");
        }

        // Yerel Depodan Kullanıcı Verilerini Yükle
        function loadUserData() {
            const savedName = localStorage.getItem('userName');
            const savedMoney = localStorage.getItem('userMoney');
            if (savedName) {
                user.name = savedName;
                document.getElementById("username-input").value = savedName;
                document.getElementById("username-display").textContent = savedName;
            }
            if (savedMoney) {
                user.money = parseInt(savedMoney);
                document.getElementById("money-display").textContent = user.money + " ₺";
            }
        }

        // Günlük Ödül Kontrolü
        function checkDailyReward() {
            const lastLogin = localStorage.getItem('lastLogin');
            const now = new Date();
            const oneDayInMs = 24 * 60 * 60 * 1000;
            if (!lastLogin || (now - new Date(parseInt(lastLogin))) > oneDayInMs) {
                user.money += 100;
                document.getElementById("money-display").textContent = user.money + " ₺";
                localStorage.setItem('userMoney', user.money);
                localStorage.setItem('lastLogin', now.getTime());
                showMoneyNotification(100, true, "100₺ Günlük Ödül Kazandınız!");
                updateLeaderboard();
            }
        }

        // Liderlik Tablosu Güncelleme
        function updateLeaderboard() {
            let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
            // Mevcut kullanıcının bakiyesini güncelle veya ekle
            const userIndex = leaderboard.findIndex(entry => entry.username === user.name);
            if (userIndex !== -1) {
                leaderboard[userIndex].balance = user.money;
            } else {
                leaderboard.push({ username: user.name, balance: user.money });
            }
            // Bakiyeye göre sırala ve en fazla 10 oyuncu göster
            leaderboard.sort((a, b) => b.balance - a.balance);
            leaderboard = leaderboard.slice(0, 10);
            // Yerel depoya kaydet
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
            // Tabloyu güncelle
            const tbody = document.getElementById('leaderboardBody');
            tbody.innerHTML = '';
            leaderboard.forEach((entry, index) => {
                const row = document.createElement('tr');
                if (entry.username === user.name) {
                    row.className = 'highlighted-team';
                }
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.username}</td>
                    <td>${entry.balance} ₺</td>
                `;
                tbody.appendChild(row);
            });
        }

        // Kullanıcı Verilerini Yerel Depoya Kaydet
        function saveUserData() {
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userMoney', user.money);
            updateLeaderboard();
        }

        // Oyun Başlatma
        function initializeGame() {
            const select = $('#takimSecimi');
            select.select2({
                placeholder: "-- Takımınızı Seçin --",
                allowClear: true,
                templateResult: formatTeam,
                templateSelection: formatTeam,
                dropdownCssClass: 'custom-select2-dropdown'
            });
            // Takımları dropdown'a ekle
            takimlar.forEach(takim => {
                select.append(new Option(takim, takim, false, false));
            });
            // İlk seçeneği varsayılan olarak seçili yap
            select.val(null).trigger('change');
        }

        // Takım formatlama fonksiyonu (logo ve isim)
        function formatTeam(team) {
            if (!team.id) {
                return team.text;
            }
            const logoUrl = `image/${logoMap[team.text] || 'default.png'}`;
            return $(`
                <span style="display: flex; align-items: center; gap: 8px;">
                    <img src="${logoUrl}" class="select2-team-logo" alt="${team.text}" onerror="this.onerror=null; this.src='image/default.png';">
                    <span> ${team.text}</span>
                </span>
            `);
        }

        // Scroll Button Setup
        function setupScrollButton() {
            const scrollBtn = document.getElementById("scrollTop");
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
            });
            scrollBtn.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Bahis Formu Aç/Kapa
        function toggleBettingForm() {
            const form = document.getElementById("bettingForm");
            form.classList.toggle("active");
        }

        // Utility Functions
        function shuffle(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        function rastgeleGolUret(takimAdi) {
            const dagilim = takimGolDagilimlari[takimAdi] || [0, 1, 1, 2, 2, 3, 3, 4, 4, 5];
            return dagilim[Math.floor(Math.random() * dagilim.length)];
        }

        function oynaMac(t1, t2) {
            let g1 = rastgeleGolUret(t1);
            let g2 = rastgeleGolUret(t2);
            let kazanan = g1 > g2 ? t1 : g2 > g1 ? t2 : (Math.random() > 0.5 ? t1 : t2);
            return {
                skor: `${t1} ${g1} - ${g2} ${t2}`,
                kazanan: kazanan,
                goller: [g1, g2]
            };
        }

        // Blok Oluşturma Fonksiyonu
        function createResultBlock(title, subtitle, content, customId = null) {
            return new Promise((resolve) => {
                const container = document.getElementById("sonuclar");
                const block = document.createElement("div");
                block.className = "result-block";
                if (customId) {
                    block.id = customId; // Özel ID ekle
                }
                block.style.animationDelay = `${currentBlockIndex * 0.1}s`;
                const header = document.createElement("div");
                header.className = "block-header";
                const titleEl = document.createElement("div");
                titleEl.className = "block-title";
                titleEl.textContent = title;
                const subtitleEl = document.createElement("div");
                subtitleEl.className = "block-subtitle";
                subtitleEl.textContent = subtitle;
                header.appendChild(titleEl);
                header.appendChild(subtitleEl);
                block.appendChild(header);
                block.appendChild(content);
                container.appendChild(block);
                currentBlockIndex++;
                setTimeout(() => {
                    resolve();
                }, 600);
            });
        }

        // Grup Tablosu Oluşturma
        function createGroupTable(grup, grupAdi) {
            const table = document.createElement("table");
            table.className = "group-table";
            const thead = document.createElement("thead");
            thead.innerHTML = `
                <tr>
                    <th>Takım</th>
                    <th>O</th>
                    <th>G</th>
                    <th>B</th>
                    <th>M</th>
                    <th>AG</th>
                    <th>YG</th>
                    <th>Puan</th>
                    <th>Averaj</th>
                </tr>
            `;
            table.appendChild(thead);
            const tbody = document.createElement("tbody");
            grup.forEach(takim => {
                const row = document.createElement("tr");
                if (takim.isim === user.selectedTeam) {
                    row.className = "highlighted-team";
                }
                row.innerHTML = `
                    <td class="team-cell">
                        <img src="image/${logoMap[takim.isim] || 'default.png'}" alt="${takim.isim}" class="team-logo" onerror="this.onerror=null; this.src='image/default.png';">
                        <span>${takim.isim}</span>
                    </td>
                    <td>${takim.oynanan}</td>
                    <td>${takim.galibiyet}</td>
                    <td>${takim.beraberlik}</td>
                    <td>${takim.maglubiyet}</td>
                    <td>${takim.atilanGol}</td>
                    <td>${takim.yenilenGol}</td>
                    <td>${takim.puan}</td>
                    <td>${takim.averaj}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            return table;
        }

        // Maç Listesi Oluşturma
        function createMatchesList(matches, isGroup = false) {
            const container = document.createElement("div");
            container.className = "matches-list";
            matches.forEach((match, index) => {
                const matchEl = document.createElement("div");
                matchEl.className = "match-result";
                if (match.includes(user.selectedTeam)) {
                    matchEl.classList.add("highlighted-match");
                    const parts = match.match(/(\w+[\w\s]*)\s(\d+)\s-\s(\d+)\s(\w+[\w\s]*)/);
                    if (parts) {
                        const t1 = parts[1].trim();
                        const g1 = parseInt(parts[2]);
                        const g2 = parseInt(parts[3]);
                        const t2 = parts[4].trim();
                        if (t1 === user.selectedTeam) {
                            if (g1 > g2) {
                                matchEl.classList.add("win");
                            } else if (g1 < g2) {
                                matchEl.classList.add("lose");
                            } else if (isGroup) {
                                matchEl.classList.add("draw");
                            } else {
                                matchEl.classList.add(Math.random() > 0.5 ? "win" : "lose");
                            }
                        } else if (t2 === user.selectedTeam) {
                            if (g2 > g1) {
                                matchEl.classList.add("win");
                            } else if (g2 < g1) {
                                matchEl.classList.add("lose");
                            } else if (isGroup) {
                                matchEl.classList.add("draw");
                            } else {
                                matchEl.classList.add(Math.random() > 0.5 ? "win" : "lose");
                            }
                        }
                    }
                }
                // Maç skoru için logo ekleme
                const parts = match.match(/(\w+[\w\s]*)\s(\d+)\s-\s(\d+)\s(\w+[\w\s]*)/);
                if (parts) {
                    const t1 = parts[1].trim();
                    const g1 = parts[2];
                    const g2 = parts[3];
                    const t2 = parts[4].trim();
                    matchEl.innerHTML = `
                        <img src="image/${logoMap[t1] || 'default.png'}" alt="${t1}" class="match-team-logo" onerror="this.onerror=null; this.src='image/default.png';">
                        <span>${t1} ${g1} - ${g2} ${t2}</span>
                        <img src="image/${logoMap[t2] || 'default.png'}" alt="${t2}" class="match-team-logo" onerror="this.onerror=null; this.src='image/default.png';">
                    `;
                } else {
                    matchEl.textContent = match;
                }
                matchEl.style.animationDelay = `${index * 0.1}s`;
                container.appendChild(matchEl);
            });
            return container;
        }

        // Grup İçeriği Oluşturma (Maçlar + Tablo)
        function createGroupContent(matches, grup) {
            const content = document.createElement("div");
            content.appendChild(createMatchesList(matches, true));
            content.appendChild(createGroupTable(grup));
            return content;
        }

        // Kullanıcı Bilgilerini Güncelleme
        function updateUserInfo() {
            const nameInput = document.getElementById("username-input").value.trim();
            const betInput = parseInt(document.getElementById("bet-amount").value);
            const selectedTeam = $('#takimSecimi').val();
            if (!nameInput) {
                alert("❌ Lütfen kullanıcı adınızı girin!");
                return false;
            }
            if (!selectedTeam) {
                alert("❌ Lütfen bir takım seçin!");
                return false;
            }
            if (isNaN(betInput) || betInput < 10) {
                alert("❌ Minimum bahis miktarı 10₺'dir!");
                return false;
            }
            if (betInput > user.money) {
                alert(`❌ Yetersiz bakiye! Maksimum bahis: ${user.money}₺`);
                return false;
            }
            user.name = nameInput;
            user.betAmount = betInput;
            user.selectedTeam = selectedTeam;
            document.getElementById("username-display").textContent = user.name;
            saveUserData();
            return true;
        }

        // Para Animasyonu (Özelleştirilmiş Mesaj Desteği)
        // Maç Başladı Bildirimi ve Parçacıklar (1 saniye sürümü)
        function showMatchStartNotification() {
            // Ana bildirim div'ini oluştur
            const notification = document.createElement('div');
            notification.className = 'match-start-notification';
            notification.innerHTML = '<div class="match-start-text">⚽ MAÇ BAŞLADI! ⚽</div>';
            document.body.appendChild(notification);
            // Parçacıkları oluştur ve animasyonu başlat
            createMatchParticles();
            // Bildirimi 1 saniye sonra DOM'dan kaldır (CSS animasyonu da 1s olmalı)
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 1000); // <-- SADECE 1 SANİYE GÖSTER
        }

        // Konfeti Efekti
        function createConfetti() {
            const colors = ['#ffd700', '#ff6b35', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722'];
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    document.body.appendChild(confetti);
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }, i * 30);
            }
        }

        // Maç Başladı Bildirimi ve Parçacıklar
        function showMatchStartNotification() {
            // Ana bildirim div'ini oluştur
            const notification = document.createElement('div');
            notification.className = 'match-start-notification';
            notification.innerHTML = '<div class="match-start-text">⚽ MAÇ BAŞLADI! ⚽</div>';
            document.body.appendChild(notification);
            // Parçacıkları oluştur ve animasyonu başlat
            createMatchParticles();
            // Bildirimi belirli süre sonra DOM'dan kaldır
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 6000); // CSS animasyonuyla eşleşmeli (6s)
        }

        // Maç için özel parçacıklar
        function createMatchParticles() {
            const colors = ['#ffd700', '#ff6b35', '#4CAF50', '#2196F3', '#FF5722', '#ffffff'];
            const notification = document.querySelector('.match-start-notification');
            if (!notification) return;
            const rect = notification.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            for (let i = 0; i < 150; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'match-particle';
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    // Rastgele yön ve dönüş
                    const angle = Math.random() * 360;
                    const distance = Math.random() * 300 + 100;
                    const tx = Math.cos(angle * Math.PI / 180) * distance;
                    const ty = Math.sin(angle * Math.PI / 180) * distance;
                    const r = Math.random() * 360;
                    particle.style.setProperty('--tx', `${tx}px`);
                    particle.style.setProperty('--ty', `${ty}px`);
                    particle.style.setProperty('--r', `${r}deg`);
                    // Parçacığı ekranın ortasına yerleştir
                    particle.style.left = `${centerX}px`;
                    particle.style.top = `${centerY}px`;
                    // Animasyon süresi ve gecikmesi
                    particle.style.animation = `particleBurst ${Math.random() * 1 + 1}s ease-out forwards`;
                    particle.style.animationDelay = `${Math.random() * 0.5}s`;
                    document.body.appendChild(particle);
                    // Parçacığı temizle
                    setTimeout(() => {
                        particle.remove();
                    }, 3000);
                }, i * 20);
            }
        }

        // Bakiye Güncelleme
        function updateMoney(amount) {
            user.money += amount;
            if (user.money < 0) user.money = 0;
            document.getElementById("money-display").textContent = user.money + " ₺";
            saveUserData();
        }

        // Kazanç Hesaplama
        function calculateWinnings(reachedStage, grupSirasi) {
            const stageMultipliers = {
                "Şampiyon": 10,
                "Final": 6,
                "Yarı Final": 4,
                "Çeyrek Final": 2.5,
                "Son 16": 1.5,
                "Grup Aşaması": 0
            };
            const groupBonuses = {
                1: 0.5,
                2: 0,
                3: -0.5,
                4: -1
            };
            let message, amount, isWin;
            if (grupSirasi >= 3 && reachedStage === "Grup Aşaması") {
                const factor = (grupSirasi === 3 ? 0.5 : 1);
                const lossAmountPositive = Math.floor(user.betAmount * factor);
                amount = -lossAmountPositive;
                isWin = false;
                message = `😢 Grup ${grupSirasi}. sırası - ${lossAmountPositive}₺ kaybettiniz`;
            } else {
                const baseMultiplier = stageMultipliers[reachedStage] || 0;
                const groupBonus = groupBonuses[grupSirasi] || -1;
                const totalMultiplier = Math.max(baseMultiplier + groupBonus, 0);
                const payout = Math.floor(user.betAmount * totalMultiplier);
                amount = payout - user.betAmount;
                isWin = amount > 0;
                if (totalMultiplier > 0) {
                    message = `🎉 ${reachedStage} - ${amount}₺ kazandınız! (x${totalMultiplier.toFixed(1)})`;
                } else {
                    message = `😢 Bahis kaybedildi - ${-amount}₺ kaybettiniz`;
                }
            }
            return { message, amount, isWin };
        }

        // Ana Turnuva Fonksiyonu
        async function baslatTurnuva() {
            showMatchStartNotification(); // "MAÇ BAŞLADI!" bildirimini göster
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2 saniye bekle
            if (!updateUserInfo()) {
                return;
            }
            document.getElementById("sonuclar").innerHTML = "";
            currentBlockIndex = 0;
            const takimlarKopya = [...takimlar];
            shuffle(takimlarKopya);
            gruplar = Array.from({ length: 8 }, () => []);
            for (let i = 0; i < 32; i++) {
                gruplar[Math.floor(i / 4)].push({
                    isim: takimlarKopya[i],
                    puan: 0,
                    averaj: 0,
                    oynanan: 0,
                    galibiyet: 0,
                    beraberlik: 0,
                    maglubiyet: 0,
                    atilanGol: 0,
                    yenilenGol: 0
                });
            }
            // Grup Aşaması
            for (let g = 0; g < 8; g++) {
                const grup = gruplar[g];
                const matches = [];
                for (let i = 0; i < 4; i++) {
                    for (let j = i + 1; j < 4; j++) {
                        let gol1 = rastgeleGolUret(grup[i].isim);
                        let gol2 = rastgeleGolUret(grup[j].isim);
                        matches.push(`${grup[i].isim} ${gol1} - ${gol2} ${grup[j].isim}`);
                        grup[i].oynanan += 1;
                        grup[j].oynanan += 1;
                        grup[i].atilanGol += gol1;
                        grup[j].atilanGol += gol2;
                        grup[i].yenilenGol += gol2;
                        grup[j].yenilenGol += gol1;
                        grup[i].averaj = grup[i].atilanGol - grup[i].yenilenGol;
                        grup[j].averaj = grup[j].atilanGol - grup[j].yenilenGol;
                        if (gol1 > gol2) {
                            grup[i].puan += 3;
                            grup[i].galibiyet += 1;
                            grup[j].maglubiyet += 1;
                        } else if (gol2 > gol1) {
                            grup[j].puan += 3;
                            grup[j].galibiyet += 1;
                            grup[i].maglubiyet += 1;
                        } else {
                            grup[i].puan += 1;
                            grup[j].puan += 1;
                            grup[i].beraberlik += 1;
                            grup[j].beraberlik += 1;
                        }
                    }
                }
                grup.sort((a, b) => b.puan - a.puan || b.averaj - a.averaj);
                const groupContent = createGroupContent(matches, grup);
                await createResultBlock(
                    `🏆 GRUP ${g + 1}`,
                    `${grup[0].isim} ve ${grup[1].isim} bir sonraki tura geçti`,
                    groupContent,
                    `group-block-${g}` // Özel ID: grup bloklarını tanımlamak için
                );
            }
            let son16 = [];
            gruplar.forEach(g => {
                son16.push(g[0].isim, g[1].isim);
            });
            shuffle(son16);
            let userGroupPosition = 0;
            for (let g = 0; g < 8; g++) {
                const userIndex = gruplar[g].findIndex(t => t.isim === user.selectedTeam);
                if (userIndex !== -1) {
                    userGroupPosition = userIndex + 1;
                    break;
                }
            }
            const eliminationStages = [
                { name: "SON 16", teams: son16, icon: "🎯", id: "stage-son16" },
                { name: "ÇEYREK FİNAL", teams: [], icon: "🥉", id: "stage-ceyrek" },
                { name: "YARI FİNAL", teams: [], icon: "🥈", id: "stage-yari" },
                { name: "FİNAL", teams: [], icon: "🏆", id: "stage-final" }
            ];
            let currentTeams = [...son16];
            let userReachedStage = son16.includes(user.selectedTeam) ? "Son 16" : "Grup Aşaması";
            for (let stage = 0; stage < eliminationStages.length; stage++) {
                const stageInfo = eliminationStages[stage];
                const matches = [];
                const nextRoundTeams = [];
                for (let i = 0; i < currentTeams.length; i += 2) {
                    if (i + 1 < currentTeams.length) {
                        const mac = oynaMac(currentTeams[i], currentTeams[i + 1]);
                        matches.push(`${mac.skor} → Kazanan: ${mac.kazanan}`);
                        nextRoundTeams.push(mac.kazanan);
                        if (mac.kazanan === user.selectedTeam) {
                            userReachedStage = stage === 0 ? "Çeyrek Final" :
                                stage === 1 ? "Yarı Final" :
                                    stage === 2 ? "Final" : "Şampiyon";
                        }
                    }
                }
                const matchesContainer = createMatchesList(matches);
                await createResultBlock(
                    `${stageInfo.icon} ${stageInfo.name}`,
                    `${nextRoundTeams.length} takım bir sonraki tura geçti`,
                    matchesContainer,
                    stageInfo.id // Özel ID: tur bloklarını tanımlamak için
                );
                currentTeams = [...nextRoundTeams];
                if (currentTeams.length <= 1) break;
            }
            const champion = currentTeams[0];
            const winnings = calculateWinnings(userReachedStage, userGroupPosition);
            const finalMoney = user.money + winnings.amount;
            const finalResultsContainer = document.createElement("div");
            finalResultsContainer.className = "final-results";
            finalResultsContainer.id = "finalResults"; // ID: Sonuçlar bölümü için
            finalResultsContainer.innerHTML = `
                <div class="champion-announcement">
                    🏆 ŞAMPİYON: ${champion} 🏆
                </div>
                <div class="user-performance">
                    <h3 style="color: #ffd700; margin-bottom: 15px;">📊 PERFORMANSINIZ</h3>
                    <div class="performance-grid">
                        <div class="performance-item">
                            <div class="performance-label">Seçilen Takım</div>
                            <div class="performance-value">${user.selectedTeam}</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">Grup Sıralaması</div>
                            <div class="performance-value">${userGroupPosition}. sıra</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">Ulaşılan Tur</div>
                            <div class="performance-value">${userReachedStage}</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">Kazanç/Kayıp</div>
                            <div class="performance-value" style="color: ${winnings.amount > 0 ? '#4CAF50' : '#f44336'}">${winnings.amount > 0 ? '+' : ''}${winnings.amount}₺</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">Güncel Bakiye</div>
                            <div class="performance-value">${finalMoney}₺</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">Sonuç</div>
                            <div class="performance-value">${winnings.message}</div>
                        </div>
                    </div>
                </div>
            `;
            await createResultBlock(
                "🎊 TURNUVA SONUÇLARI",
                `Şampiyon belli oldu! Performansınızı inceleyin`,
                finalResultsContainer,
                "finalResults" // Özel ID: Sonuçlar bloğu için
            );
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && winnings.amount !== 0) {
                        updateMoney(winnings.amount);
                        showMoneyNotification(winnings.amount, winnings.isWin);
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(document.getElementById("finalResults"));
        }
