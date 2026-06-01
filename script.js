// script.js

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const notification = document.getElementById("notification");

// ★ブラウザの自動再生制限対策：最初の1秒後の自動再生はエラーになるので削除
// もしどうしても通知音を鳴らしたいなら、下のmusicBtnをクリックした時に一緒に鳴らすのが安全やで
setTimeout(() => {
  // 音を出さずにポップアップの表示（CSS）だけに任せるか、
  // もしユーザーがすでに画面を触っていれば鳴るかもしれない（一応残すならtry-catchで囲む）
  try {
    notification.volume = 0.7;
    notification.play().catch(e => console.log("自動再生がブロックされたで（仕様やから気にするな）"));
  } catch(e) {}
}, 1000);

musicBtn.addEventListener("click", () => {
  bgm.volume = 0.45;
  bgm.play();
  musicBtn.style.opacity = 0;
  
  // ボタンを押した時に「ついでに」ボタンを消すだけでなく、クリックできなくしておくと親切
  musicBtn.style.pointerEvents = "none";
});

// スクロールフェードイン（IntersectionObserver）
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Canvasアニメーション
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = []; // ★リサイズ時に再生成できるようにletに変更

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // ★リサイズ時に粒子が画面外に消えないよう、再生成する処理を追加
  initParticles();
}

// ★粒子を初期化する関数に分離
function initParticles() {
  particles = [];
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.6
    });
  }
}

// 最初に1回実行
resize();

window.addEventListener("resize", resize);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,220,120,${p.opacity})`;
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#ffe08a";
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // 粒子を上に移動
    p.y -= p.speed;

    // 画面の一番上に行ったら下から戻す
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animate);
}

animate();
