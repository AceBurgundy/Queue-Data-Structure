export class Queue {

    constructor() {
        this.array = []
        this.size //default queue size
        this.first = 0
        this.infinity = false
        this.last = 0
        this.valuesAdded = 0 //shows all values added (not including "")
    }

    empty() {
        if (this.array.length == 0) {
            return "Queue is empty"
        } else {
            return "Queue is not empty"
        }
    }

    getFirst() {
        return this.first
    }

    getLast() {
        return this.last
    }

    getQueue() {
        return this.array
    }

    insert(element) {
        if (element.length <= 2 && element.length > 0) {
            if (this.infinity) {
                this.size += 1
                this.array.push(element)
                this.last = this.array.lastIndexOf(element)
                this.valuesAdded += 1
            } else {
                if (this.valuesAdded == this.size) {
                    return "Queue overflow!";
                } else if (this.array.length != this.size) {
                    // adds another element if size is still not equal to the length
                    this.array.push(element)
                    this.last = this.array.lastIndexOf(element)
                    this.valuesAdded += 1
                } else {
                    // finds the index of the first "" and swaps it to the user's input
                    let firstEmptyString = this.array.indexOf("")
                    this.array[firstEmptyString] = element
                    this.valuesAdded += 1
                    this.last = firstEmptyString
                }
            }
        } else {
            return
        }
    }

    remove() {
        if (this.infinity) {
            if (this.array.length <= 0) {
                return "Queue underflow"
            } else if (this.array.length == 1 && this.array[0] == "") {
                return "Queue underflow"
            } else if (this.array.length == 1) {
                this.array.splice(this.first, 1)
                this.valuesAdded -= 1
                this.size = 0
            } else {
                this.size -= 1
                this.array.splice(this.first, 1)
                this.valuesAdded -= 1
                this.last = this.array.length - 1
            }
        } else {
            if (this.array.length == 0) {
                return "Queue underflow"
            } else if (this.first == this.last) {
                this.array = []
                this.valuesAdded = 0
                this.first = 0;
                this.last = 0;
            } else {
                // change element to be removed to an empty string
                this.array[this.first] = ""
                this.valuesAdded -= 1
                this.first == this.size - 1 ? this.first = 0 : this.first += 1
            }
        }
    }
}