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

    getQueue() {
        // returns the queue
        return this.array
    }

    getFirst() {
        // return first element pushed inside queue
        return this.first
    }

    insert(element) {
        /* this will check if the values that had been added
         is also equal to the size of the queue. */
        if (this.infinity) {
            if (element.length > 2) {
                return
            } else {
                this.size += 1
                this.array.push(element)
                this.last = this.array.lastIndexOf(element)
                this.valuesAdded += 1
            }
        } else {
            if (this.valuesAdded == this.size) {
                return "Queue overflow!";
            } else {
                /* this will allow values to be added to the array if
                    the length of the array is not equal to the size of the array */
                if (element.length > 2) {
                    return
                } else if (this.array.length != this.size) {
                    this.array.push(element)
                    this.last = this.array.lastIndexOf(element)
                    this.valuesAdded += 1
                } else {
                    /* if it is it will loop through the list and get the index of the first element that
                        is an empty string and use that to add the newly added element there */
                    let firstEmptyString = this.array.indexOf("")
                    this.array[firstEmptyString] = element
                    this.valuesAdded += 1
                    this.last = firstEmptyString
                }
            }
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
            // returns the number of empty strings
            let emptyStrings = () => {
                return this.array.filter(x => x == "").length
            }

            // if there are 4 empty strings, reset the queue
            if (emptyStrings() == 4) {
                this.valuesAdded -= 1
                this.array[this.first] = ""
                this.array = []
                this.first = 0
                this.last = 0
                    // if the array is empty or the array contains only empty strings 
            } else if (this.array.length <= 0 || emptyStrings() == this.array.length) {
                return "Queue underflow"
                    // if the array only has 1 value and the variable holding the first is not empty
            } else if (this.array.length == 1 && this.array[this.first] != "") {
                this.array[this.first] = ""
                this.valuesAdded -= 1
                this.first = 0;
            } else if (this.first == this.last) {
                this.array = []
                this.valuesAdded = 0
                this.first = 0;
                this.last = 0;
            } else {
                // change element to an empty string
                this.array[this.first] = ""
                this.valuesAdded -= 1
                this.first == this.size - 1 ? this.first = 0 : this.first += 1
            }
        }
    }

    getLast() {
        // returns last element
        return this.last
    }
}