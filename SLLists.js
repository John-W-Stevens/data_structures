// Overview
// My implementation of a singly-linked list in JavaScript
// This file contains two classes (SLNode and SLList)

// SLList has the following methods:
    // a. isEmpty()            -> Returns boolean based on whether or not SLList is empty
    // b. push(value)          -> Returns this, creates a new node and adds to back of list
    // c. pushFront(value)     -> Returns this, creates a new node and adds to front of list
    // d. pop()                -> Removes the last node in the list and returns it's value
    // e. popFront()           -> Removes this.head and returns it's value
    // f. includes(value)      -> Returns a boolean based on whether or not the list has a node with the specificed value 
    // g. removeByValue(value) -> Returns the first node with targeted value and removes it from list, returns false if no node exists
    // h. removeAt(idx)        -> Returns this, removes node at the specified index position
    // i. insertAt(value, idx) -> Returns this, inserts a new node in the idx position in the list
    // j. getNodeAt(idx)       -> Returns the node at the idx position in the list
    // k. hasCycle()           -> Returns boolean based on whether or not a cycle exists
    // l. forEach(aFunction)   -> Returns this, input is a function. Applies function to each element in instance.
    // m. secondToLast         -> Returns the value of the node in the second to last position
    // n. concat               -> Returns this, input is another SLList object, concats both lists together
    // o. splitOnValue         -> Returns a new SLList object, or false if value doesn't exist, splits current list on value
    // p. reverse()            -> Returns this, reverses the list
    // q. removeDuplicates()   -> Returns this, removes all duplicate values from list (ASSUMES LIST IS SORTED)
    // r. removeNegatives()    -> Returns this, removes all negative values from list
    // s. help()               -> Prints these comments to the console
// SLList has the following features:
    // a. console.log(myList)  -> Prints a string [node1.value,node2.value...] representing the values in the list"
    // b. myList.length        -> Returns the number of elements in instance

// Util allows us to set a custom inspect
const util = require("util")

class SLNode {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SLList {
    constructor(){
        this.head = null;
        this.length = 0;
    }
    
    [util.inspect.custom](){
        if (this.isEmpty()){
            return "[]"
        }
        let runner = this.head;
        let line = `[${runner.value}`
        while (runner.next !== null){
            line += `, ${runner.next.value}`
            runner = runner.next;
        }
        line += "]"
        return line;
    }

    help(){
        console.log()
        console.log("SLList class has the following methods:")
        console.log("    a. isEmpty()            -> Returns boolean based on whether or not SLList is empty.")
        console.log("    b. push(value)          -> Returns this, creates a new node and adds to back of list.")
        console.log("    c. pushFront(value)     -> Returns this, creates a new node and adds to front of list.")
        console.log("    d. pop()                -> Removes the last node in the list and returns it's value.")
        console.log("    e. popFront()           -> Removes this.head and returns it's value.")
        console.log("    f. includes(value)      -> Returns a boolean based on whether or not the list has a node with the specificed value ")
        console.log("    g. removeByValue(value) -> Returns the first node with targeted value and removes it from list, returns false if no node exists")
        console.log("    h. removeAt(idx)        -> Returns this, removes node at the specified index position.")
        console.log("    i. insertAt(value, idx) -> Returns this, inserts a new node in the idx position in the list.")
        console.log("    j. getNodeAt(idx)       -> Returns the node at the idx position in the list.")
        console.log("    k. hasCycle()           -> Returns boolean based on whether or not a cycle exists. Prints cycle length, start index, & end index")
        console.log("    l. forEach(aFunction)   -> Input is a function, applies input function to each element in instance.")
        console.log("    m. secondToLast         -> Returns the value of the node in the second to last position.")
        console.log("    n. concat               -> Returns this, input is another SLList object, concats both lists together.") 
        console.log("    o. splitOnValue         -> Returns a new SLList object, or false if value doesn't exist, splits current list on value.")
        console.log("    p. reverse()            -> Returns this, reverses a singly-linked list")
        console.log()
        console.log("NOTE: For the purposes of accessing entries by index position, this class follows standard JavaScript practice and begins indexing at 0.")
        console.log("SLList class has the following features:")
        console.log("    1. console.log(myList)  -> Prints a string [node1.value,node2.value...] representing the values in the list")
        console.log("    2. myList.length        -> Returns the number of nodes in the list")
        console.log()
    }

    isEmpty(){ return this.head === null; }

    push(value){
        let newNode = new SLNode(value);
        this.length += 1;
        if (this.isEmpty()){
            this.head = newNode;
        }
        else {
            let runner = this.head;
            while (runner.next !== null){
                runner = runner.next;
            }
            runner.next = newNode;
        }
        return this;
    }

    pushFront(value){
        let newNode = new SLNode(value);
        let currentHead = this.head;
        newNode.next = currentHead;
        this.head = newNode;
        this.length += 1;
        return this
    }

    popFront(){
        // Removes the head and returns its value
        if (this.isEmpty()){
            console.log("The list is empty.")
            return this;
        }
        let currentHead = this.head;
        this.head = currentHead.next;
        currentHead.next = null;
        this.length -= 1;
        return currentHead.value
    }

    pop(){
        if (this.isEmpty()){
            console.log("This list is empty.")
            return this;
        }
        else {
            let runner = this.head;
            var current;
            while (runner.next !== null){
                current = runner;
                runner = runner.next;
            }
            current.next = null;
            this.length -= 1;
            return runner.value;
        }
    }

    removeByValue(value){
        if (this.isEmpty()){
            console.log("The list is empty.");
            return this;
        }
        let runner = this.head;
        let current;
        if (runner.value == value){
            this.length -= 1
            return this.popFront();
        }
        else {
            while (runner.next !== null){
                current = runner;
                runner = runner.next;
                if (runner.value == value){
                    break;
                }
            }
            if (runner.next === null && runner.value !== value){
                return false;
            }
            current.next = runner.next;
            runner.next = null;
            this.length -= 1
            return runner;
        }
    }

    removeAt(idx){
        if (this.isEmpty()){
            console.log("The list is empty.")
            return this;
        }
        else if (idx === 0){
            this.length -= 1;
            return this.popFront();

        }
        else if (this.length - 1 < idx){
            console.log("No entry exists at this index position.")
            return this;
        }
        let count = 0;
        let previous = this.head;
        let runner = this.head;
        while(count < idx){
            previous = runner;
            runner = runner.next;
            count += 1;
        }
        this.length -= 1;
        if (runner.next === null){
            previous.next = null;
            return runner;
        }
        else{
            previous.next = runner.next;
            runner.next = null;
            return runner;
        }

    }

    getNodeAt(idx){
        // Returns the node at the specified index position
        if (this.isEmpty()){
            console.log("The list is empty.")
            return this;
        }
        let count = 0;
        let runner = this.head;
        while (count < idx && runner.next !== null){
            count += 1;
            runner = runner.next;
        }
        return runner
    }

    secondToLast(){
        if (this.length < 2){
            console.log("The list has less than 2 elements.")
            return false;
        }
        return this.getNodeAt(this.length - 2);
    }

    concat(other){
        if (other.isEmpty()){
            return this;
        }
        let tail = this.getNodeAt(this.length -1)
        tail.next = other.head;
        return this
    }

    splitOnValue(value){

        let idx = this.includes(value, true)

        if (idx){
            let other = new SLList();
            other.head = this.getNodeAt(idx)
            other.length = this.length - idx;

            let newTailIdx = idx - 1;
            let node = this.getNodeAt(newTailIdx);
            node.next = null;
            this.length = idx;
            return other
        }
        return false;
    }

    insertAt(value, idx){
        
        if (this.isEmpty() || idx === 0){
            this.pushFront(value)
            return this;
        }

        let count = 0;
        let runner = this.head;

        while (count < idx -1  && runner.next !== null){
            count += 1;
            runner = runner.next;
        }
        if (runner.next === null){
            this.push(value);
            return this;
        }
        this.length += 1;
        let newNode = new SLNode(value);
        newNode.next = runner.next;
        runner.next = newNode;
        return this;
    }

    removeDuplicates(){
        if (this.isEmpty()){ return this }
        if (this.head.next === null){ return this }
        let walker = this.head;
        let runner = this.head.next;
        while (true){
            while (walker.value == runner.value){
                walker.next = runner.next;
                runner = walker.next;
                if (runner === null){ return this }
            }
            walker = walker.next;
            runner = runner.next;
            if (walker.next === null){ break }
        }
        return this
    }

    removeNegatives(){
        this.forEach( n => {
            if (n.value < 0){
                this.removeByValue(n.value)
                this.removeNegatives()
            }
        })
    }

    reverse(){

        let previous_node = null;
        let runner = this.head;
        while (runner !== null){
            var next_node = runner.next // the next node is runner.next
            runner.next = previous_node // point runner.next at the previous node
            previous_node = runner // the previous node becomes current runner
            runner = next_node // next runner is next_node
        }
        this.head = previous_node // the last node in the list becomes the new head
        return this
    }

    includes(value, returnIdx = false){
        if (this.isEmpty()){
            return false;
        }
        let runner = this.head;
        let count = 0;
        while (runner.value !== value){
            if (runner.next === null){ return false }
            runner = runner.next;
            count += 1;
        }
        if (returnIdx){
            return count;
        }
        return true;
    }

    hasCycle(){
        // Returns a boolean based on whether or not a List has a cycle
        if (this.isEmpty()){
            console.log("The list is empty.")
            return this;
        }

        let slowRunner = this.head;
        let fastRunner = this.head;

        while (slowRunner.next !== null){
            slowRunner = slowRunner.next;
            if (fastRunner.next === null || fastRunner.next.next === null){return false}
            else {fastRunner = fastRunner.next.next}

            if (slowRunner === fastRunner){
                let cycle = [slowRunner.value]
                let cycleMap = {}
                slowRunner = slowRunner.next;
                while (slowRunner !== fastRunner){
                    cycle.push(slowRunner.value)
                    cycleMap[slowRunner.value] = slowRunner
                    slowRunner = slowRunner.next
                }

                console.log(`There is a cycle involving the following ${cycle.length} elements: ${cycle}.`)

                // find cycle start
                let cycleStart = this.head
                let startIdx = 0;
                let searching = true
                while (searching){
                    if (!cycleMap[cycleStart.value]){
                        cycleStart = cycleStart.next;
                        startIdx += 1;
                    }
                    else if (cycleStart === cycleMap[cycleStart.value]){
                        console.log(`The cycle starts at index ${startIdx}, which has a value of ${cycleStart.value}`)
                        searching = false
                    }
                }
                // find cycle end:
                let cycleLength = cycle.length;
                let count = 1
                let cycleRunner = cycleStart;
                let endIdx = startIdx;
                while (count < cycleLength){
                    cycleRunner = cycleRunner.next
                    count += 1
                    endIdx += 1
                }
                let cycleEnd = cycleRunner
                console.log(`The cycle ends at index ${endIdx}, which has a value of ${cycleEnd.value}`)
                
                // console.log(endIdx)
                return true
            }
        }
        console.log("There is no cycle in this list.")
        return false

    }

    forEach(aFunction){
        // Input is a function, applies function to each element in the linked list
        if (this.Length === 0){return false}
        let element = this.head
        aFunction(element)
        while (element.next !== null){
            element = element.next;
            aFunction(element);
        }
        return this
    }

}


// const myList = new SLList()

// // console.log(myList) // Output: []
// myList.push(211)
// myList.push(333)

// myList.pushFront(10)


// // console.log(myList) // Output: [10, 211, 333]
// myList.pop()

// // console.log(myList) // Output: [10, 211]
// myList.popFront()

// // console.log(myList) // Output: [211]

// myList.insertAt(100, 0)
// // console.log(myList) // Output: [100, 211]

// myList.push(10).push(20).push(30)

// // console.log(myList) // Output: [100, 211, 10, 20, 30]

// // myList.removeAt(1)
// console.log(myList) // Output: [100, 10, 20, 30]

// console.log(myList.length) // Output: 6
// console.log(myList.hasCycle()) // Output: false

// let node1 = myList.getNodeAt(1)
// let node2 = myList.getNodeAt(3)
// node2.next = node1
// console.log(myList.hasCycle())
//     // Output:     The list has a cycle.
//                 // There is a cycle involving the following 3 elements: 20,211,10.
//                 // The cycle starts at index 1, which has a value of 211
//                 // The cycle ends at index 3, which has a value of 20
//                 // true
// myList.getNodeAt(3).next = null; // Break the cycle

// console.log(myList.hasCycle()) // Output: false
// console.log(myList) // Output: [100, 211, 10, 20]

// console.log(myList.forEach( node => {node.value += 2})) // Output: [102, 213, 12, 22]

// console.log(myList.removeByValue(102))
// console.log(myList)

// // secondToLast(){}
// console.log(myList.length)
// // console.log(myList.secondToLast())

// let otherList = new SLList();
// otherList.push(14)
// otherList.push(13)
// otherList.push(12)

// console.log(myList)
// // console.log(myList.length)
// console.log(otherList)
// myList.concat(otherList)
// console.log(myList)
// // console.log(myList.length)

// // console.log(myList.includes(50))
// // console.log(myList.includes(10, returnIdx=true))

// let otherList2 = myList.splitOnValue(20);
// console.log(myList) // Output -> [100, 211, 10]
// console.log(otherList2) // Output -> [20, 30, 14, 13, 12]
// // console.log(otherList2.length)
// // console.log(myList.length)

// console.log(otherList2.reverse())

// const myList = new SLList();

// console.log(myList.push(10).push(16).push(84).push(13).push(56).push(74))
//     // Output -> [10, 16, 84, 13, 56, 74]
// console.log(myList.hasCycle()) 
//     // Output -> false

// // create a cycle
// node1 = myList.getNodeAt(1)
// node2 = myList.getNodeAt(4)
// node2.next = node1

// console.log(myList.hasCycle()) 
    // Output -> true
    // There is a cycle involving the following 4 elements: 56,16,84,13.
    // The cycle starts at index 1, which has a value of 16
    // The cycle ends at index 4, which has a value of 56

// const myList = new SLList().push(5).push(6).push(6).push(6).push(6).push(6).push(7).push(7)
// console.log(myList)

// myList.removeDuplicatesFromSortedSLList()
// console.log(myList)

const myList = new SLList().push(0).push(1).push(-7).push(2).push(-5)
console.log(myList)

myList.removeNegatives()
console.log(myList)

