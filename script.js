import { Queue } from "./queueEngine.js"
import { makeError, makeToastNotification } from "./helper.js"

let queue = new Queue()

document.querySelector(".start").addEventListener("click", () => {
    if (document.querySelector(".menu-input").value != "" && document.querySelector(".start").getAttribute("data-option") == 'circular-queue') {
        queue.size = parseInt(document.querySelector(".menu-input").value)
        show()
        document.querySelector(".menu").classList.remove("active")
    } else if (document.querySelector(".start").getAttribute("data-option") == 'queue') {
        queue.infinity = 'true'
        queue.size = 0
        show()
        document.querySelector(".menu").classList.remove("active")
    } else if (document.querySelector(".start").getAttribute("data-option") == 'circular-queue' && document.querySelector(".start").style.color == "blue") {
        makeToastNotification("Add a size to start")
    }
})

const arrayParent = document.querySelector(".array-container")

function show() {
    const array = document.createElement("div")
    array.className = "array"
    if (arrayParent.firstElementChild != null) {
        arrayParent.firstElementChild.setAttribute("id", "first-array")
    }

    arrayParent.appendChild(array)

    if (arrayParent.children.length > 13) {
        arrayParent.removeChild(document.getElementById("first-array"))
    }

    if (queue.size == 0) {
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

    if (array.children[queue.getFirst()] != null) {
        array.children[queue.getFirst()].setAttribute("id", "first")
        array.children[queue.getLast()].setAttribute("id", "last")
    }

    if (parseInt(queue.getFirst()) === 0 && parseInt(queue.getLast()) == 0) {
        if (array.children[queue.getFirst()] != null) {
            array.children[queue.getLast()].style.backgroundColor = "orange"
        }
    } else {
        array.children[queue.getFirst()].style.backgroundColor = "blue"
        array.children[queue.getLast()].style.backgroundColor = "red"
    }

    console.log(`current added values: ${queue.valuesAdded}`);
    console.log(`current first values: ${queue.first}`);
    console.log(`current last values: ${queue.last}`);
    console.log(`current queue size: ${queue.size}`);
    console.log(queue.getQueue());
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".menu").classList.add("active")
})

const text = document.getElementById("inputHolder")

document.querySelector("#inputHolder").addEventListener("click", () => {
    document.querySelector("#hint").classList.remove("active")
})

document.querySelector("#source").addEventListener("click", () => {
    window.location.href = 'https://github.com/AceBurgundy/Aceburgundy.github.io'
})

document.querySelector("#queue").addEventListener("click", () => {
    document.querySelector(".start").setAttribute("data-option", "queue")
    document.querySelector(".start").style.color = "red"
    document.querySelector("#circular-queue-text").nextElementSibling.style.display = "none"
    document.querySelector("#circular-queue-text").parentElement.style.backgroundColor = "inherit"
    document.querySelector(".start").textContent = "START"
})

document.querySelector(".menu-input").addEventListener("click", () => {
    document.querySelector(".menu-input").parentElement.style.backgroundColor = "blue"
    document.querySelector(".start").setAttribute("data-option", "circular-queue")
    document.querySelector(".start").style.color = "blue"
    document.querySelector(".start").textContent = "START"
    document.querySelector("#circular-queue-text").parentElement.style.padding = "0.5em"
})
document.querySelector("#circular-queue-text").addEventListener("click", () => {
    document.querySelector("#circular-queue-text").nextElementSibling.style.display = "block"
    document.querySelector("#circular-queue-text").parentElement.style.backgroundColor = "blue"
    document.querySelector("#circular-queue-text").parentElement.style.padding = "0.5em"
    document.querySelector(".start").setAttribute("data-option", "circular-queue")
    document.querySelector(".start").style.color = "blue"
    document.querySelector(".start").textContent = "START"
})

document.querySelector(".start").addEventListener("click", () => {
    setTimeout(() => {
        document.querySelector("#hint").classList.add("active")
    }, 2000);
})

function insertQueue() {
    document.querySelector("#hint").classList.remove("active")
    if (queue.insert(text.value) == "Queue overflow!") {
        makeError("Queue Overflow!")
    } else if (text.value.length > 2) {
        makeToastNotification("Choose 2 or less!")
    } else if (text.value.trim() == "") {
        makeToastNotification("Input Needed!")
    } else {
        text.value = ""
        let sound = new Audio(`sounds/green.mp3`)
        sound.play()
        show()
    }
}

document.addEventListener("keyup", (e) => {
    if (!document.querySelector(".menu").classList.contains("active")) {
        if (e.key == 'Enter') {
            insertQueue()
        }
    }
})

document.getElementById("insert").addEventListener("click", () => {
    insertQueue()
})

document.getElementById("remove").addEventListener("click", () => {
    if (queue.remove() == "Queue underflow") {
        makeError("Queue Underflow!")
    } else {
        let sound = new Audio(`sounds/yellow.mp3`)
        sound.play()
        show()
    }
})

document.querySelector(".reset").addEventListener("click", () => {
    document.querySelector(".prompt").classList.add("active")
})

document.querySelector("#yes").addEventListener("click", () => {
    window.location.reload();
})

document.querySelector("#no").addEventListener("click", () => {
    document.querySelector(".prompt").classList.remove("active")
})

document.querySelector("#empty").addEventListener("click", () => {
    makeToastNotification(queue.empty())
})