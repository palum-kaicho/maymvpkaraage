// script.js

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const notification = document.getElementById("notification");

setTimeout(()=>{

  notification.volume = 0.7;
  notification.play();

},1000);

musicBtn.addEventListener("click",()=>{

  bgm.volume = 0.45;
  bgm.play();

  musicBtn.style.opacity = 0;

});

const observer = new IntersectionObserver((entries)=>{

  entries.forEach((entry)=>{

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},{
  threshold:0.15
});

document.querySelectorAll(".reveal").forEach((el)=>{

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

for(let i=0;i<70;i++){

  particles.push({

    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*2+1,
    speed:Math.random()*0.25+0.05,
    opacity:Math.random()*0.6

  });

}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach((p)=>{

    ctx.beginPath();

    ctx.fillStyle=`rgba(255,220,120,${p.opacity})`;

    ctx.shadowBlur=14;
    ctx.shadowColor="#ffe08a";

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
