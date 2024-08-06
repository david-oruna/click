document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");
    const loginContainer = document.getElementById("loginContainer");
    const gameContainer = document.getElementById("gameContainer");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple validation (replace with actual validation logic)
        if (username === "admin" && password === "password") {
            loginContainer.style.display = "none";
            gameContainer.style.display = "block";
        } else {
            loginError.textContent = "Invalid username or password";
        }
    });

    // Existing game logic
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
});