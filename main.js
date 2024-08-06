let countdown;
let clickCount = 0;
let highestScore = 0;
let latestScore = 0;
let countdownInterval;

function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    const clickButton = document.getElementById("clickButton");
    const clickCountElement = document.getElementById("clickCount");
    const latestScoreElement = document.getElementById("latestScore");
    const highestScoreElement = document.getElementById("highestScore");
    const timeSelect = document.getElementById("timeSelect");

    clickButton.addEventListener("click", () => {
        if (!countdownInterval) {
            countdown = parseInt(timeSelect.value);
            countdownElement.textContent = countdown;
            clickCount = 0;
            clickCountElement.textContent = `Clicks: ${clickCount}`;
            countdownInterval = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;
                if (countdown === 0) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                    clickButton.disabled = true;
                    latestScore = clickCount;
                    if (clickCount > highestScore) {
                        highestScore = clickCount;
                    }
                    latestScoreElement.textContent = `Latest Score: ${latestScore}`;
                    highestScoreElement.textContent = `Highest Score: ${highestScore}`;
                    setTimeout(() => {
                        clickButton.disabled = false;
                    }, 1000);
                }
            }, 1000);
        }
        clickCount++;
        clickCountElement.textContent = `Clicks: ${clickCount}`;
    });
}

startCountdown();