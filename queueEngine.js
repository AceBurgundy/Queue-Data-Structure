export class Queue {

    constructor() {
        this.array = []
        this.size = 5 //default queue size
        this.first = 0
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
        if (this.valuesAdded == this.size) {
            return "Queue overflow!";
        } else {
            /* this will allow values to be added to the array if
                the length of the array is not equal to the size of the array */
            if (this.array.length != this.size) {
                this.array.push(element)
                this.last = this.array.lastIndexOf(element)
                this.valuesAdded += 1
            } else {
                /* if it is it will loop through the list and check the first
                    empty string that is present and will instead add the new element there */
                for (let index = 0; index < this.array.length; index++) {
                    if (this.array[index] == "") {
                        this.valuesAdded += 1
                        this.array[index] = element
                        this.last = index
                        break;
                    }
                }
            }
        }
    }

    remove() {
        // this will check if there are no items to be removed
        let allEmptyStrings = this.array.every(element => element == "")
        console.log(allEmptyStrings);
        if (this.array.length <= 0 || allEmptyStrings) {
            return "Queue underflow"
        } else if (this.array.length == 1 && this.array[this.first] != "") {
            this.array[this.first] = ""
            this.valuesAdded -= 1
            this.first = 0;
        } else if (this.array.length == this.size && this.array[this.first] != "" && this.array[this.first + 1] == "") {
            this.array[this.first] = ""
            this.valuesAdded -= 1
            this.first = 0;
        } else if (this.array.length == this.size && this.array[this.last] != "" && this.array[this.last - 1] == "") {
            this.array[this.first] = ""
            this.valuesAdded -= 1
            this.first = 0;
            this.last = 0;
        } else if (this.valuesAdded == 0) {
            return
        } else {
            /* If there is, the element on the index pointed by first will be removed */
            this.array[this.first] = ""
            this.valuesAdded -= 1
            this.first == this.size - 1 ? this.first = 0 : this.first += 1
        }
    }

    getLast() {
        // returns last element
        return this.last
    }
}