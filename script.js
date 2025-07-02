// === MUSIC CONTROL ===
const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");

toggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggle.textContent = "🔊";
  } else {
    music.pause();
    toggle.textContent = "🔇";
  }
});

// === PAGE LOGIC ===
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });
  }

  const quizDiv = document.getElementById("quiz");
  if (quizDiv) {
    const questions = [
      {q: "তুমি জানো কী, তুমি ছাড়া আমার সকাল শুরু হয় না?", o: ["হ্যাঁ, আমি জানি ❤️", "হয়তো না 🥺"]},
      {q: "আমরা একসাথে কফি খেতে গেলে কে বেশি কথা বলবে?", o: ["আমি! 😄", "তুমি! 😘"]},
      {q: "যখন তুমি আমাকে দেখো, তুমি কী অনুভব করো?", o: ["তোমার চোখে হাসি ফুটে উঠে😊", "মনে হয় সব ঠিক আছে, আমি নিরাপদ 💖"]},
      {q: "যদি আমি বলি, “চলো চাঁদে যাই”, তুমি যাবে?", o: ["হ্যাঁ, তোমার সাথে যেকোনো জায়গায় 🌙", "না, তুমি আছো বলেই পৃথিবী সুন্দর 🌎"]},

      // tricky confirmation question
      {q: "আপনি কি সত্যিই আমার কাছে যেতে চান?", o: ["হ্যাঁ, আমি যেতে চাই!", "না, একটু পরে আসবো"]},

      // extra romantic question after YES
      {q: "তুমি কেমন করে আমার ভালবাসা অনুভব করো?", o: ["তোমার কথা ভাবলে হৃদয় গরম হয় ❤️", "তুমি পাশে থাকলে সব ভালো লাগে 😊"]}
    ];

    let index = 0;

    function showQuestion() {
      quizDiv.innerHTML = "";
      if(index < questions.length) {
        const div = document.createElement("div");
        div.className = "quiz-question";
        div.innerHTML = `
          <h3>${questions[index].q}</h3>
          <div class="quiz-options">
            <button>${questions[index].o[0]}</button>
            <button>${questions[index].o[1]}</button>
          </div>
        `;
        quizDiv.appendChild(div);

        div.querySelectorAll("button").forEach(btn => {
          btn.addEventListener("click", () => {
            if(index === questions.length - 2) {
              // tricky confirmation question (second last)
              if(btn.textContent === questions[index].o[0]) {
                index++; // move to extra romantic question
                showQuestion();
              } else {
                showFinalMessage(false);
              }
            } else if(index === questions.length - 1) {
              // extra romantic question (last)
              showFinalMessage(true);
            } else {
              index++;
              showQuestion();
            }
          });
        });
      }
    }

    function showFinalMessage(isYes) {
      quizDiv.innerHTML = "";
      if(isYes) {
        quizDiv.innerHTML = `
          <h3>এখন আপনি চলে যান আয়ানের কাছে 💖</h3>
          <button onclick="window.location.href='https://www.facebook.com/mdayan15'">চলো!</button>
        `;
      } else {
        quizDiv.innerHTML = `
          <h3>আচ্ছা, যখন মন করবে তখন আসো, আয়ান অপেক্ষা করবে 🥰</h3>
          <button id="retryBtn">আবার চেষ্টা করো</button>
        `;
        document.getElementById("retryBtn").addEventListener("click", () => {
          index = questions.length - 2; // tricky confirmation question থেকে শুরু
          showQuestion();
        });
      }
    }

    showQuestion();
  }
});

// === HEART CURSOR EFFECT ===
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", e => {
  for (let i = 0; i < 2; i++) {
    hearts.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 4 + 2,
      alpha: 1,
      dx: (Math.random() - 0.5) * 2,
      dy: -Math.random() * 2
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    h.x += h.dx;
    h.y += h.dy;
    h.alpha -= 0.02;
    if (h.alpha <= 0) hearts.splice(i, 1);
    else {
      ctx.fillStyle = `rgba(255,105,180,${h.alpha})`;
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  requestAnimationFrame(animate);
}
animate();
