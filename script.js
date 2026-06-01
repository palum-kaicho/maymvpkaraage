// script.js

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const notification = document.getElementById("notification");
const envelopeSE = document.getElementById("envelope");

setTimeout(()=>{
  notification.play();
},2000);

musicBtn.addEventListener("click",()=>{

  bgm.volume = 0.5;
  bgm.play();

  musicBtn.style.opacity = 0;
});

const observer = new IntersectionObserver(entries=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }

  });

},{threshold:.2});

document.querySelectorAll(".timeline-item").forEach(el=>{
  observer.observe(el);
});

const envelopeBtn = document.getElementById("envelopeBtn");
const letter = document.getElementById("letter");

envelopeBtn.addEventListener("click",()=>{

  envelopeSE.play();

  letter.classList.remove("hidden");

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

for(let i=0;i<120;i++){

  particles.push({

    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*3+1,
    speed:Math.random()*0.3+0.1,
    opacity:Math.random()

  });

}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    ctx.beginPath();

    ctx.fillStyle=`rgba(255,230,120,${p.opacity})`;

    ctx.shadowBlur=20;
    ctx.shadowColor="#ffe8a0";

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

window.addEventListener("scroll",()=>{

  const scrolled = window.scrollY;

  document.querySelectorAll(".chapter").forEach((el,index)=>{

    const speed = (index + 1) * 0.03;

    el.style.transform = `translateY(${scrolled * speed * -0.08}px)`;

  });

});
