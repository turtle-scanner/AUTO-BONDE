const gCanvas = document.getElementById('gameCanvas');
const gctx = gCanvas.getContext('2d');
const bCanvas = document.getElementById('bgCanvas');
const bctx = bCanvas.getContext('2d');

gCanvas.width = bCanvas.width = 600;
gCanvas.height = bCanvas.height = 800;

// --- Assets with Loading Safety ---
const assets = { ninja: new Image(), heroine: new Image(), alien: new Image(), wrestler: new Image(), enemy1: new Image(), bgs: {} };
const assetStatus = { ninja: false, heroine: false, alien: false, wrestler: false };

function loadAsset(key, src) {
    assets[key].src = src;
    assets[key].onload = () => assetStatus[key] = true;
    assets[key].onerror = () => console.warn(`Asset failed to load: ${key}. Using fallback visuals.`);
}

loadAsset('ninja', 'assets/ninja_tactical_official.png');
loadAsset('heroine', 'assets/elisha_official.png');
loadAsset('alien', 'assets/alien_xenon_official.png');
loadAsset('wrestler', 'assets/tanker_titan_official.png');
assets.enemy1.src = 'assets/enemy1.png';
for (let i = 1; i <= 5; i++) { assets.bgs[i] = new Image(); assets.bgs[i].src = `assets/bg${i}.png`; }

// --- Game State Management ---
let players = [], enemies = [], bullets = [], enemyBullets = [], particles = [], navalUnits = [];
let gold = 0, currentScore = 0, isGameActive = false, difficulty = 'med';
let shakeAmount = 0, hitStopTimer = 0;

// --- Tactical Sound Engine ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, type, duration) {
    if (audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
}

// --- Player Class with Fallback & Logic ---
class Player {
    constructor(id, type) {
        this.type = type; this.x = 300; this.y = 700; this.w = 80; this.h = 80;
        this.hp = 100; this.alive = true; this.lastShot = 0;
        this.skillGauge = 0;
    }
    draw() {
        if (!this.alive) return;
        gctx.save();
        const colors = { ninja: '#00f3ff', heroine: '#ff3131', alien: '#bf00ff', wrestler: '#ffae00' };
        gctx.shadowBlur = 15; gctx.shadowColor = colors[this.type];
        
        if (assetStatus[this.type]) {
            gctx.drawImage(assets[this.type], this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        } else {
            // Fallback Tactical Shape
            gctx.fillStyle = colors[this.type];
            gctx.beginPath(); gctx.moveTo(this.x, this.y - 20); gctx.lineTo(this.x + 20, this.y + 20); gctx.lineTo(this.x - 20, this.y + 20); gctx.closePath(); gctx.fill();
        }
        gctx.restore();
    }
    update(keys) {
        const s = 8;
        if (keys['w']) this.y -= s; if (keys['s']) this.y += s;
        if (keys['a']) this.x -= s; if (keys['d']) this.x += s;
        if (keys['f']) this.shoot();
        this.x = Math.max(40, Math.min(560, this.x)); this.y = Math.max(300, Math.min(760, this.y));
    }
    shoot() {
        if (Date.now() - this.lastShot > 150) {
            bullets.push(new Bullet(this.x, this.y - 20, 4, 15));
            playSound(600, 'sine', 0.05); this.lastShot = Date.now();
        }
    }
}

// --- Game Engine Logic ---
const game = {
    setDifficulty: (level) => { difficulty = level; playSound(880, 'square', 0.1); document.getElementById('diff-screen').classList.add('hidden'); document.getElementById('select-screen').classList.remove('hidden'); },
    pickChar: (type) => { players = [new Player(1, type)]; playSound(1000, 'square', 0.2); document.getElementById('select-screen').classList.add('hidden'); isGameActive = true; animate(); }
};

function animate() {
    if (!isGameActive) return;
    if (hitStopTimer > 0) { hitStopTimer--; requestAnimationFrame(animate); return; }

    gctx.save();
    if (shakeAmount > 0) { gctx.translate((Math.random()-0.5)*shakeAmount, (Math.random()-0.5)*shakeAmount); shakeAmount *= 0.9; }
    
    gctx.clearRect(-50, -50, 700, 900);
    bctx.drawImage(assets.bgs[1], 0, 0, 600, 800);
    
    players.forEach(p => { p.update(keys); p.draw(); });
    [bullets, enemyBullets, enemies, particles, navalUnits].forEach(arr => {
        for (let i = arr.length-1; i >= 0; i--) {
            arr[i].update(); arr[i].draw();
            if (arr[i].y > 900 || arr[i].y < -200 || (arr[i].alive === false)) arr.splice(i, 1);
        }
    });
    
    spawnLogic(); handleCollisions();
    gctx.restore();
    requestAnimationFrame(animate);
}

// --- Bullet & Enemy definitions (Stable) ---
class Bullet { constructor(x,y,s,sp){this.x=x;this.y=y;this.s=s;this.sp=sp;} draw(){gctx.fillStyle='#00f3ff';gctx.fillRect(this.x-this.s/2,this.y,this.s,this.s*4);} update(){this.y-=this.sp;} }
class Enemy { constructor(x,y){this.x=x;this.y=y;this.w=45;this.h=45;this.alive=true;} draw(){gctx.fillStyle='#f00';gctx.fillRect(this.x-this.w/2,this.y,this.w,this.h);} update(){this.y+=3;} }

function spawnLogic() { if (Math.random() < 0.05) enemies.push(new Enemy(Math.random()*500+50, -100)); }
function handleCollisions() {
    bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
            if (e.alive && b.x > e.x-22 && b.x < e.x+22 && b.y > e.y && b.y < e.y+45) {
                e.alive = false; bullets.splice(bi, 1); shakeAmount = 5;
            }
        });
    });
}

const keys={}; window.addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true); window.addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
document.addEventListener('click', () => { if (audioCtx.state === 'suspended') audioCtx.resume(); }, { once: true });
