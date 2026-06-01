// script.js

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const notification = document.getElementById("notification");
const envelopeSe = document.getElementById("envelopeSe");

setTimeout(()=>{

  notification?.play();

},2000);

musicBtn.addEventListener("click",()=>{

  bgm.volume = 0.5;

  bgm.play();

  musicBtn.style.opacity = .3;

});

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},{
  threshold:.25
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

for(let i=0;i<80;i++){

  particles.push({

    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*2+1,
    speed:Math.random()*.3+.05,
    opacity:Math.random()

  });

}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    ctx.beginPath();

    ctx.fillStyle=`rgba(255,225,120,${p.opacity})`;

    ctx.shadowBlur=20;
    ctx.shadowColor="#ffe7a3";

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
