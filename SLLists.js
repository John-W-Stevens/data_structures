// Overview
// My implementation of a singly-linked list in JavaScript
// This file contains two classes (SLNode and SLList)

// SLList has the following methods:
    // a. isEmpty()            -> Returns boolean based on whether or not SLList is empty
    // b. addToBack(value)     -> Returns this, creates a new node and adds to back of list
    // c. addToFront(value)    -> Returns this, creates a new node and adds to front of list
    // d. removeFromFront()    -> Removes this.head and returns it's value
    // e. removeFromBack()     -> Removes the last node in the list and returns it's value
    // f. insertAt(value, idx) -> Returns this, inserts a new node in the idx position in the list
    // g. editAt(idx)          -> Returns the node at the idx position in the list
    // h. hasCycle()           -> Returns boolean based on whether or not a cycle exists
    // i. printList()          -> Returns this, console.logs node.value for all nodes in list
    // j. forEach(aFunction)   -> Returns this, input is a function. Applies function to each element in instance.
    // k. getLength()          -> Returns the number of elements in instance.
    // j. help()               -> Prints these comments to the console

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

    help(){
        console.log("SLList class has the following methods:")
        console.log("    a. isEmpty()            -> Returns boolean based on whether or not SLList is empty.")
        console.log("    b. addToBack(value)     -> Returns this, creates a new node and adds to back of list.")
        console.log("    c. addToFront(value)    -> Returns this, creates a new node and adds to front of list.")
        console.log("    d. removeFromFront()    -> Removes this.head and returns it's value.")
        console.log("    e. removeFromBack()     -> Removes the last node in the list and returns it's value.")
        console.log("    f. insertAt(value, idx) -> Returns this, inserts a new node in the idx position in the list.")
        console.log("    g. editAt(idx)          -> Returns the node at the idx position in the list.")
        console.log("    h. hasCycle()           -> Returns boolean based on whether or not a cycle exists.")
        console.log("    i. printList()          -> Returns this, console.logs node.value for all nodes in list.")
        console.log("    j. getLength()          -> Returns the number of elements in instance.")
        console.log("    k. forEach(aFunction)   -> Input is a function, applies input function to each element in instance.")
    }

    isEmpty(){ return this.head === null; }

    addToBack(value){
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

    addToFront(value){
        let newNode = new SLNode(value);
        let currentHead = this.head;
        newNode.next = currentHead;
        this.head = newNode;
        this.length += 1;
        return this
    }

    removeFromFront(){
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

    removeFromBack(){
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

    editAt(idx){
        if (this.isEmpty()){
            console.log("The list is empty.")
            return this;
        }
        let count = 1;
        let runner = this.head;
        while (count < idx - 1 && runner.next !== null){
            count += 1;
            runner = runner.next;
        }
        return runner
    }

    insertAt(value, idx){
        this.length += 1;
        if (this.isEmpty() || idx === 0 || idx === 1){
            this.addToBack(value);
            return this
        }
        let count = 1;
        let runner = this.head;

        while (count < idx - 1 && runner.next !== null){
            count += 1;
            runner = runner.next;
        }
        if (runner.next === null){
            this.addToBack(value);
            return this;
        }
        let newNode = new SLNode(value);
        newNode.next = runner.next;
        runner.next = newNode;
        return this;
    }

    hasCycle(){
        // Returns a boolean based on whether or not a List has a cycle
        // If the list does NOT have a cycle: returns false
        if (this.isEmpty()){
            console.log("The list is empty.")
            return this;
        }

        let slowRunner = this.head;
        let fastRunner = this.head;

        while (slowRunner.next !== null){
            slowRunner = slowRunner.next;
            fastRunner = fastRunner.next.next;

            if (slowRunner === fastRunner){
                console.log("The list has a cycle.")
                let cycle = []
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
                let startIdx = 1;
                let searching = true
                while (searching){
                    if (!cycleMap[cycleStart.value]){
                        cycleStart = cycleStart.next;
                        startIdx += 1;
                    }
                    else if (cycleStart === cycleMap[cycleStart.value]){
                        console.log(`The cycle starts at position ${startIdx}, which has a value of ${cycleStart.value}`)
                        searching = false
                    }
                }
                // find cycle end:
                let cycleLength = cycle.length;
                let count = 1
                let cycleRunner = cycleStart;
                let endIdx = startIdx;
                while (count <= cycleLength){
                    cycleRunner = cycleRunner.next
                    count += 1
                    endIdx += 1
                }
                let cycleEnd = cycleRunner
                console.log(`The cycle ends at position ${endIdx}, which has a value of ${cycleEnd.value}`)
                
                console.log(endIdx)
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

    getLength(){
        return this.length;
    }

    printList(){
        if (this.isEmpty()){
            console.log("List is empty.")
            return this
        }
        let runner = this.head;
        let line = `${runner.value}`
        while (runner.next !== null){
            line += ` -> ${runner.next.value}`
            runner = runner.next;
        }
        console.log(line)
        return this        
    }
}


// const list1 = new SLList()
// list1.addToBack(5)
// list1.addToBack(6)
// list1.addToBack(2)

// list1.addToBack(10)

// list1.printList() // Output: 10 -> 5 -> 6 -> 2

// list1.removeFromFront()
// list1.printList() // Output: 5 -> 6 -> 2

// list1.removeFromBack()
// list1.printList() // Output: 5 -> 6

// list1.addToBack(10)
// list1.addToBack(20)
// list1.addToBack(30)
// list1.printList() // Output: 5 -> 6 -> 10 -> 20 -> 30

// list1.insertAt(56, 4)
// list1.printList() // Output: 5 -> 6 -> 10 -> 56 -> 20 -> 30

const list2 = new SLList()

list2.addToBack(10)
list2.addToBack(20)
list2.addToBack(30)
list2.addToBack(40)
list2.addToBack(60)
list2.addToBack(70)
list2.addToBack(80)
list2.addToBack(90)

list2.printList() // Output: 10 -> 20 -> 30 -> 40 -> 60 -> 70 -> 80 -> 90

// UNCOMMENT THIS BLOCK TO TEST hasCycle() method:

// let x = list2.head.next.next
// let y = list2.head.next.next.next.next.next.next.next

// y.next = x // This creates a cycle by pointing the last element to the third
// let idx = list2.hasCycle()
// list2.editAt(idx).next = null;
// list2.hasCycle()

// TEST getLength() method:
console.log(list2.getLength())

// TEST help() method:
list2.help()

// TEST forEach(aFunction) method:
    // For this example, we will use forEach to generate a frequency table of values in list2
let hashMap = {}
const updateMap = element => {
    if (! hashMap[element.value] ){
        hashMap[element.value] = 1
    }
    else { hashMap[element.value] += 1 }
}

list2.forEach(updateMap)

for (const entry of Object.entries(hashMap)){
    console.log(entry[0], entry[1])
}