let countdown = 5;
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

    clickButton.addEventListener("click", () => {
        if (countdown === 5) {
            countdownElement.textContent = countdown;
            clickCount = 0;
            clickCountElement.textContent = `Clicks: ${clickCount}`;
            countdownInterval = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;
                if (countdown === 0) {
                    clearInterval(countdownInterval);
                    clickButton.disabled = true;
                    latestScore = clickCount;
                    if (clickCount > highestScore) {
                        highestScore = clickCount;
                    }
                    latestScoreElement.textContent = `Latest Score: ${latestScore}`;
                    highestScoreElement.textContent = `Highest Score: ${highestScore}`;
                    setTimeout(() => {
                        countdown = 5;
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