let currentLevel = 0;
let heroLives = 3;
let isEnemyDefeated = false;

const levels = [
  {
    question: `📘 Level 1: Understanding <h1>
<h1> is used for the main title of a webpage — the biggest and most important heading.<br>
Write: <h1>My Coding Blog</h1>`,
    correctCode: "<h1>My Coding Blog</h1>",
  },
  {
    question: `📘 Level 2: Introducing <h2>
<h2> is used for main sections under your page title.<br>
Write: <h2>About Me</h2>`,
    correctCode: "<h2>About Me</h2>",
  },
  {
    question: `📘 Level 3: Using <h3>
<h3> is used inside a section to break it into parts.<br>
Write: <h3>My Skills</h3>`,
    correctCode: "<h3>My Skills</h3>",
  },
  {
    question: `📘 Level 4: Detail with <h4>
<h4> is for smaller sub-sections within <h3>.<br>
Write: <h4>JavaScript</h4>`,
    correctCode: "<h4>JavaScript</h4>",
  },
  {
    question: `📘 Level 5: Minor info with <h5>
<h5> is for less important subheadings.<br>
Write: <h5>React v18</h5>`,
    correctCode: "<h5>React v18</h5>",
  },
  {
    question: `📘 Level 6: The smallest heading <h6>
<h6> is rarely used — it's for the least important headings.<br>
Write: <h6>Last updated: 2025</h6>`,
    correctCode: "<h6>Last updated: 2025</h6>",
  },
];

// On page load
window.onload = () => {
  loadLevel(currentLevel);
  updateHeroLives();
};

function loadLevel(levelIndex) {
  isEnemyDefeated = false;
  const question = document.getElementById("question");
  const codeInput = document.getElementById("codeInput");
  const result = document.getElementById("result");

  document.getElementById("enemy").src = "images/idle.gif";
  document.getElementById("hero").src = "images/idle.gif";

  question.innerHTML = levels[levelIndex].question;
  codeInput.value = "";
  result.textContent = "";
}

function submitCode() {
  if (isEnemyDefeated) return;

  const input = document.getElementById("codeInput").value.trim().toLowerCase();
  const correctCode = levels[currentLevel].correctCode.toLowerCase();
  const hero = document.getElementById("hero");
  const enemy = document.getElementById("enemy");
  const result = document.getElementById("result");

  if (input === correctCode) {
    hero.src = "images/run.gif";
    hero.classList.add("run");
    setTimeout(() => {
      hero.src = "images/attack.gif";

      // Calculate enemy health %
      const newHealth = 100 - (currentLevel + 1) * (100 / levels.length);
      const enemyHealthFill = document.getElementById("enemy-health-fill");
      enemyHealthFill.style.width = `${newHealth}%`;
      document.getElementById("enemy-health-text").textContent = `${Math.round(
        newHealth
      )}%`;

      // Update health bar color by health
      if (newHealth > 60) {
        enemyHealthFill.style.background =
          "linear-gradient(90deg, #28a745, #70e36b)";
      } else if (newHealth > 30) {
        enemyHealthFill.style.background =
          "linear-gradient(90deg, #ffc107, #ffd86b)";
      } else {
        enemyHealthFill.style.background =
          "linear-gradient(90deg, #dc3545, #ff7676)";
      }

      setTimeout(() => {
        if (currentLevel === levels.length - 1) {
          enemy.src = "images/death.gif";
          result.textContent = "✅ Final hit! Enemy defeated! You won!";
          isEnemyDefeated = true;
        } else {
          enemy.src = "images/hurt.gif";
          result.textContent = "✅ Correct! Good hit!";
          hero.src = "images/idle.gif";
        }

        currentLevel++;
        if (currentLevel < levels.length) {
          setTimeout(() => loadLevel(currentLevel), 2000);
        }
      }, 1000);
    }, 500);
  } else {
    enemy.src = "images/attack.gif";

    setTimeout(() => {
      heroLives--;
      updateHeroLives();

      if (heroLives <= 0) {
        document.getElementById("hero-health-fill").style.width = "0%";
        enemy.src = "images/idle.gif";
        hero.src = "images/death.gif";
        result.textContent = "💀 You lost all lives! Game Over!";
        disableButtons();
      } else {
        document.getElementById("hero-health-fill").style.width = `${
          (heroLives / 3) * 100
        }%`;
        enemy.src = "images/idle.gif";
        hero.src = "images/hurt.gif";
        setTimeout(() => {
          hero.src = "images/idle.gif";
          result.textContent = "❌ Incorrect! Try again!";
        }, 800);
      }
    }, 800);
  }
}

function updateHeroLives() {
  const livesEl = document.getElementById("lives");
  livesEl.textContent = "❤️".repeat(heroLives) + "🤍".repeat(3 - heroLives);
}

function resetGame() {
  currentLevel = 0;
  heroLives = 3;
  isEnemyDefeated = false;

  document.getElementById("codeInput").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("hero").src = "images/idle.gif";
  document.getElementById("enemy").src = "images/idle.gif";
  document.getElementById("enemy-health-fill").style.width = "100%";
  document.getElementById("enemy-health-fill").style.background =
    "linear-gradient(90deg, #28a745, #70e36b)";
  document.getElementById("enemy-health-text").textContent = "100%";

  updateHeroLives();
  enableButtons();
  loadLevel(currentLevel);
}

function disableButtons() {
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("resetBtn").disabled = false;
}

function enableButtons() {
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("resetBtn").disabled = false;
}
