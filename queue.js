export class Queue {

    constructor() {
        this.queue = []
        this.size //default queue size
        this.first = 0
        this.hasNoSize = false
        this.last = 0
        this.valuesAdded = 0 //shows all values added (not including "")
    }

    isEmpty() {

        if (this.valuesAdded == 0) {
            return true
        }

        return false

    }

    getQueue() {
        return this.queue
    }

    getFirst() {
        return this.first
    }

    getLast() {
        return this.last
    }

    getSize() {
        return this.size
    }

    insert(element) {

        if (this.hasNoSize) {

            this.size += 1
            this.queue.push(element)
            this.last = this.queue.lastIndexOf(element)
            this.valuesAdded += 1
            return
        }

        if (this.queue.length != this.size) {
            this.queue.push(element)
            this.last = this.queue.lastIndexOf(element)
            this.valuesAdded += 1

        } else {

            if (this.queue[this.last + 1] == "") {
                this.queue[this.last + 1] = element
                this.valuesAdded += 1
                this.last = this.last + 1
                return
            }

            let firstEmptyString = this.queue.indexOf("")
            this.queue[firstEmptyString] = element
            this.valuesAdded += 1
            this.last = firstEmptyString
        }
    }

    overflow() {
        if (!this.hasNoSize) {
            return this.valuesAdded == this.size;
        }
    }

    remove() {

        if (this.hasNoSize) {

            this.size -= 1
            this.queue.shift()
            this.last == 0 ? this.last == 0 : this.last = this.queue.length - 1
            this.valuesAdded -= 1
            return
        }

        if (this.first == this.last) {
            this.queue = []
            this.valuesAdded = 0
            this.first = 0;
            this.last = 0;
            return
        }

        this.queue[this.first] = ""
        this.valuesAdded -= 1
        this.first == this.size - 1 ? this.first = 0 : this.first += 1

    }

    playWithNoSize(approved) {
        if (approved) {
            this.hasNoSize = true
        } else {
            this.hasNoSize = false
        }
    }

    setSize(size) {
        this.size = size
    }

}
