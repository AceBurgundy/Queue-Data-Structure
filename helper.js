export const togglePopper = function(popperInstance, button) {

    function show() {
        tooltip.setAttribute('data-show', '');

        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.update();
    }

    function hide() {
        tooltip.removeAttribute('data-show');
    }

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach((event) => {
        button.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
        button.addEventListener(event, hide);
    });
}

export function makeToastNotification(message) {
    let toastBox = document.querySelector(".toast-message")
    toastBox.textContent = message
    toastBox.classList.add("active")
    setTimeout(() => {
        toastBox.classList.remove("active")
    }, 2000);
}

export function makeError(message) {
    let sound = new Audio(`sounds/wrong.mp3`)
    sound.play()
    document.querySelector(".error-message").textContent = message
    document.querySelector(".error").classList.add("active")
    setTimeout(() => {
        document.querySelector(".error").classList.remove("active")
    }, 800);
}