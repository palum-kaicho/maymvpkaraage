const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const notificationAudio = document.getElementById("notification");

window.addEventListener("load",()=>{

  setTimeout(()=>{

    if(notificationAudio){

      notificationAudio.volume = 0.7;

      notificationAudio.play().catch(()=>{});

    }

  },2000);

});

musicBtn.addEventListener("click", async ()=>{

  try{

    bgm.currentTime = 0;

    bgm.volume = 0.5;

    await bgm.play();

    musicBtn.innerText = "BGM PLAYING";

    musicBtn.style.opacity = .5;

  }catch(err){

    alert("bgm.mp3 が読み込めてない可能性があります");

    console.log(err);

  }

});

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},{
  threshold:.15
});

document.querySelectorAll(
".text-section,.image-section,.single-line,.final-message"
).forEach(el=>{

  observer.observe(el);

});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize(){

  canvas.width = innerWidth;
  canvas.height = innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles = [];

for(let i=0;i<50;i++){

  particles.push({

    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*2+0.5,
    speed:Math.random()*0.2+0.03,
    opacity:Math.random()*0.7

  });

}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    ctx.beginPath();

    ctx.fillStyle=`rgba(255,225,140,${p.opacity})`;

    ctx.shadowBlur=15;
    ctx.shadowColor="#ffe9a8";

    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);

    ctx.fill();

    p.y -= p.speed;

    if(p.y < 0){

      p.y = canvas.height;
      p.x = Math.random()*canvas.width;

    }

  });

  requestAnimationFrame(animate);

}

animate();
