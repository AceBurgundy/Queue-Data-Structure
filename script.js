import { Queue } from "./queue.js"
import { makeError, makeToastNotification } from "./helper.js"

let queue = new Queue()

const startButton = document.getElementById("start")
const menuInput = document.querySelector(".menu-input")
const menu = document.querySelector(".menu")
const circularQueueTitle = document.getElementById("circular-queue-text")

// shows input for size
circularQueueTitle.addEventListener("click", (event) => {
    event.target.nextElementSibling.style.display = 'block'
})

// start logic
startButton.addEventListener("click", (event) => {

    if (startButton.getAttribute("data-option") == 'circular-queue') {
        if (menuInput.value == "") {
            makeToastNotification("Cannot be empty")
            event.preventDefault()
            return false
        } else if (menuInput.value > 6) {
            makeToastNotification("You can choose up to 6 only")
            event.preventDefault()
            return false
        } else {
            queue.setSize(menuInput.value)
            queue.playWithNoSize(false)
            show()
            menu.classList.remove("active")
        }
    } else {
        queue.playWithNoSize(true)
        queue.setSize(0)
        show()
        menu.classList.remove("active")
    }

    setTimeout(() => {
        gameHint.classList.add("active")
    }, 2000)

})


const arrayParent = document.querySelector(".array-container")

// shows queue
function show() {

    const array = document.createElement("div")
    array.className = "array"

    if (arrayParent.firstElementChild != null) {
        arrayParent.firstElementChild.setAttribute("id", "first-array")
    }

    arrayParent.appendChild(array)

    if (arrayParent.children.length > 18) {
        arrayParent.removeChild(document.getElementById("first-array"))
    }

    if (queue.getSize() == 0) {
        let boxes = document.createElement('div')
        boxes.className = 'box'
        queue.getQueue()[0] == undefined ? "" : boxes.innerHTML = queue.getQueue()[0]
        array.appendChild(boxes)
    }

    for (let index = 0; index < queue.size; index++) {
        let boxes = document.createElement('div')
        boxes.className = 'box'
        queue.getQueue()[index] == undefined ? "" : boxes.innerHTML = queue.getQueue()[index]
        array.appendChild(boxes)
    }

    const arrayFirst = array.children[queue.getFirst()]
    const arrayLast = array.children[queue.getLast()]

    if (arrayFirst != null) {
        arrayFirst.setAttribute("id", "first")
        arrayLast.setAttribute("id", "last")
    }

    if (queue.getFirst() == 0 && queue.getLast() == 0) {
        if (arrayFirst != null) {
            arrayLast.style.backgroundColor = "orange"
            document.getElementById("orange").textContent = queue.getQueue()[queue.getFirst()]
        }
    } else {
        arrayFirst.style.backgroundColor = "blue"
        arrayLast.style.backgroundColor = "red"
        document.getElementById("blue").textContent = queue.getQueue()[queue.getFirst()]
        document.getElementById("red").textContent = queue.getQueue()[queue.getLast()]
    }

}

// menu UI logic 91-139

document.addEventListener("DOMContentLoaded", () => {
    menu.classList.add("active")
})

const gameInput = document.getElementById("inputHolder")
const gameHint = document.getElementById("hint")

gameInput.addEventListener("click", (event) => {
    event.target.classList.remove("active")
})

const queueText = document.getElementById("queue")

queueText.addEventListener("click", (event) => {
    startButton.setAttribute("data-option", "queue")
    startButton.style.color = "red"
    circularQueueTitle.nextElementSibling.style.display = "none"
    circularQueueTitle.parentElement.style.backgroundColor = "inherit"
    startButton.textContent = "START"
    event.target.style.backgroundColor = "red"
    event.target.style.padding = "0.2em"
})

menuInput.addEventListener("click", (event) => {
    event.target.parentElement.style.backgroundColor = "blue"
    startButton.setAttribute("data-option", "circular-queue")
    startButton.style.color = "blue"
    startButton.textContent = "START"
    circularQueueTitle.parentElement.style.padding = "0.5em"
})

circularQueueTitle.addEventListener("click", (event) => {
    event.target.nextElementSibling.style.display = "block"
    event.target.parentElement.style.backgroundColor = "blue"
    event.target.parentElement.style.padding = "0.5em"
    queueText.style.backgroundColor = "inherit"
    startButton.setAttribute("data-option", "circular-queue")
    startButton.style.color = "blue"
    startButton.textContent = "START"
})

// insertQueue() function
function insertQueue() {

    gameHint.classList.remove("active")

    if (queue.insert(gameInput.value) == "Queue overflow!") {
        makeError("Queue Overflow!")
        return false
    }

    if (gameInput.value.length > 2) {
        makeToastNotification("Choose 2 or less!")
        return false
    }

    if (gameInput.value.trim() == "") {
        makeToastNotification("Input Needed!")
        return false
    }

    let sound = new Audio(`sounds/green.mp3`)
    sound.play()
    gameInput.value = ""
    show()

}

// calls insert function on keypress
document.addEventListener("keyup", (event) => {
    if (!menu.classList.contains("active")) {
        if (event.key == 'Enter') {
            insertQueue()
        }
    }
})

// calls insert function on click
document.getElementById("insert").addEventListener("click", (event) => {
    insertQueue()
})

// calls remove() method on click else underflow
document.getElementById("remove").addEventListener("click", () => {
    if (queue.remove() == "Queue underflow") {
        makeError("Queue Underflow!")
    } else {
        let sound = new Audio(`sounds/yellow.mp3`)
        sound.play()
        show()
    }
})

// reset logic lines 193-204
document.querySelector(".reset").addEventListener("click", () => {
    document.querySelector(".prompt").classList.add("active")
})

document.getElementById("yes").addEventListener("click", () => {
    window.location.reload()
})

document.getElementById("no").addEventListener("click", () => {
    document.querySelector(".prompt").classList.remove("active")
})

// calls empty() method on click
document.getElementById("empty").addEventListener("click", () => {
    if (queue.empty()) {
        makeToastNotification("Queue is empty")
    } else {
        makeToastNotification("Queue is not empty")
    }
})

// media querries lines 216-235
if (window.screen.availHeight > window.screen.availWidth) {
    document.querySelector(".error-message").classList.add("phone")
    document.querySelector(".menu-options-container").style.flexDirection = 'column'
    document.querySelector(".menu-options").style.marginBottom = '0.5em'
    document.getElementById("start").textContent = '^ CHOOSE'
    document.getElementById("insert").textContent = 'I'
    document.getElementById("remove").textContent = 'R'
    document.getElementById("empty").textContent = 'E'
    document.querySelector(".controls").style.gap = "0.2rem"
    document.querySelector(".array-container").style.height = "fit-content"
    document.querySelectorAll(".button").forEach(button => {
        button.style.width = "90%"
    })
    document.getElementById("game").style.overflowY = "hidden"
    document.querySelector(".legend").style.flexDirection = "column"
    gameHint.style.display = 'none'
    document.getElementById("bottom").style.position = "fixed"
    document.getElementById("bottom").style.bottom = "1%"
    document.getElementById("top").style.position = "fixed"
    document.getElementById("top").style.top = "1%"
    document.querySelector("#middle").style.alignItems = "flex-end"
}