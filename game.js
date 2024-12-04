// Variables to track the game state
let playerName = "";
let hitPoints = 5;
let itemsCollected = []; // Array to store the items collected during the game
let currentScenario = 0; // Tracks which scenario the player is on

// Start the game when the player clicks the start button
function startGame() {
  playerName = document.getElementById("player-name").value;
  if (!playerName) {
    alert("Please enter your name to start.");
    return;
  }
  document.getElementById("player-name-display").innerText = playerName;
  document.getElementById("name-input-container").style.display = "none";
  document.getElementById("game-play").style.display = "block";
  loadScenario();
}

// Function to load the current scenario
function loadScenario() {
  if (hitPoints <= 0) {
    return; // Stop if the player is out of hit points
  }
  const scenario = getScenario(currentScenario);
  document.getElementById("scenario-container").innerHTML = scenario.question;
  const answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = "";
  
  scenario.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => handleAnswer(answer.isCorrect, scenario, answer.text);
    answerButtons.appendChild(button);
  });
}

// Handle the player's answer
function handleAnswer(isCorrect, scenario, answerText) {
  const feedback = document.getElementById("feedback");
  if (isCorrect) {
    feedback.innerHTML = "Correct! You move forward.";
    itemsCollected.push(scenario.item); // Add item to collected items
    currentScenario++;
    if (currentScenario < scenarios.length) {
      loadScenario();
    } else {
      endGame();
    }
  } else {
    feedback.innerHTML = `Incorrect. Hint: ${scenario.hint}`;
    hitPoints--;
    document.getElementById("hit-points").innerHTML = "Hit Points: " + hitPoints;
    if (hitPoints <= 0) {
      showRespawnButton();
    }
  }
}

// Show respawn button when the player is out of hit points
function showRespawnButton() {
  document.getElementById("respawn-container").style.display = "block";
}

// Function to respawn and reset the game
function respawnGame() {
  hitPoints = 5;
  currentScenario = 0;
  itemsCollected = [];
  document.getElementById("hit-points").innerHTML = "Hit Points: " + hitPoints;
  document.getElementById("inventory").innerHTML = "Items Collected: None";
  document.getElementById("respawn-container").style.display = "none";
  loadScenario();
}

// Function to end the game and show the results
function endGame() {
  document.getElementById("game-play").style.display = "none";
  document.getElementById("end-game-message").style.display = "block";
  document.getElementById("end-game-message").innerHTML = `
    <h2>Congratulations, ${playerName}! You defeated the End Boss!</h2>
    <p>Items Collected:</p>
    <ul>
      ${itemsCollected.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p>You have earned the title of IT Technician Tier 2!</p>
  `;
}

// List of all scenarios
const scenarios = [
  {
    question: "You encounter a networking issue. What is your first step?",
    answers: [
      { text: "Check the cables", isCorrect: true },
      { text: "Check the power supply", isCorrect: false },
      { text: "Reboot the router", isCorrect: false }
    ],
    item: "Basic Troubleshooting Kit",
    hint: "Think about the most common networking issues."
  },
  {
    question: "The IP address of the device isn't valid. What should you do next?",
    answers: [
      { text: "Check the subnet mask", isCorrect: true },
      { text: "Reboot the device", isCorrect: false },
      { text: "Call the user", isCorrect: false }
    ],
    item: "Subnetting Tool",
    hint: "It's important to verify network settings."
  },
  // Add more scenarios as needed
];
