document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        updateClockHands();
        setInterval(() => {
            const clockBtn = document.getElementById("refreshClock");
            if (clockBtn) {
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                clockBtn.dispatchEvent(clickEvent);
            }
            updateClockHands();
        }, 10000);
    }, 200);
});


function updateClockHands() {
    const hourAngle = document.getElementById('hourAngle').value;
    const minuteAngle = document.getElementById('minuteAngle').value;
    const secondAngle = document.getElementById('secondAngle').value;
    const digitalTime = document.getElementById('digitalTime').value;
    const currentDate = document.getElementById('currentDate').value;

    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    if (hourHand) hourHand.setAttribute('transform', `rotate(${hourAngle},100,100)`);
    if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minuteAngle},100,100)`);
    if (secondHand) secondHand.setAttribute('transform', `rotate(${secondAngle},100,100)`);

    const dateText = document.getElementById('date-text');
    const timeText = document.getElementById('time-text');

    if (dateText) dateText.textContent = currentDate;
    if (timeText) timeText.textContent = digitalTime;
}