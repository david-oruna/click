const clickButton = document.getElementById("clickButton");
const clickCountElement = document.getElementById("clickCount");
const latestScoreElement = document.getElementById("latestScore");
const highestScoreElement = document.getElementById("highestScore");
const timeSelect = document.getElementById("timeSelect");

let countdown;
let clickCount = 0;
let countdownInterval;

const scores = {
    5: { latest: 0, highest: 0 },
    10: { latest: 0, highest: 0 },
    15: { latest: 0, highest: 0 }
};

function showForm(formType) {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';

    if (formType === 'register') {
      document.getElementById('registerForm').style.display = 'block';
    } else if (formType === 'login') {
      document.getElementById('loginForm').style.display = 'block';
    }
  }


  document.getElementById('registerFormElement').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    console.log(result); // Add this line to log the result
    if (!response.ok) {
        document.getElementById('registerError').textContent = result.message;
    } else {
        window.location.href = '/game';
    }
});


document.getElementById('loginFormElement').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    console.log(result); // Add this line to log the result

    if (!response.ok) {
        document.getElementById('loginError').textContent = result.message;
    } else {
        window.location.href = '/game';
    }
});


clickButton.addEventListener("click", () => {
    if (!countdownInterval) {
        countdown = parseInt(timeSelect.value);
        document.getElementById("countdown").textContent = countdown;
        clickCount = 0;
        clickCountElement.textContent = `Clicks: ${clickCount}`;
        timeSelect.disabled = true; // Disable time selection
        countdownInterval = setInterval(() => {
            countdown--;
            document.getElementById("countdown").textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
                clickButton.disabled = true;
                const selectedTime = timeSelect.value;
                scores[selectedTime].latest = clickCount;
                if (clickCount > scores[selectedTime].highest) {
                    scores[selectedTime].highest = clickCount;
                }
                latestScoreElement.textContent = `Latest Score: ${scores[selectedTime].latest}`;
                highestScoreElement.textContent = `Highest Score: ${scores[selectedTime].highest}`;
                setTimeout(() => {
                    clickButton.disabled = false;
                    timeSelect.disabled = false; // Enable time selection
                }, 1000);
            }
        }, 1000);
    }
    clickCount++;
    clickCountElement.textContent = `Clicks: ${clickCount}`;
});

timeSelect.addEventListener("change", () => {
    const selectedTime = timeSelect.value;
    latestScoreElement.textContent = `Latest Score: ${scores[selectedTime].latest}`;
    highestScoreElement.textContent = `Highest Score: ${scores[selectedTime].highest}`;
});

