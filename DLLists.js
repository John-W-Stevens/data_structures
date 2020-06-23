
// This is barely started... it doesn't work yet

const util = require("util")


class Node{
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    [util.inspect.custom](){return `${this.value}`}
}

class DLList{
    constructor(){
        this.head = null;
        this.tail = null;
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
    isEmpty(){
        return this.length === 0;
    }
    Push(value){
        let newNode = new Node(value);
        if (this.isEmpty()){
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            let currentTail = this.tail
            newNode.prev = currentTail;
            currentTail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
        return this;
    }
    PushFront(value){
        let newNode = new Node(value);
        if (this.isEmpty()){
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            let currentHead = this.head;
            newNode.next = currentHead;
            currentHead.prev = newNode;
            this.head = newNode;
        }

        this.length += 1;
        return this;
    }
    Insert(value, idx){
        if (idx > this.length )
    }

}

let myList = new DLList();
myList.Push(4)
myList.Push(5)
myList.Push(6)
myList.PushFront(7)
console.log(myList)



// console.log(myList.head)
// console.log(myList.tail)
// console.log(myList.length)

// console.log(myList.head.next)
// console.log(myList.head.next.next)
// console.log(myList.head.next.next.next)
// console.log(myList.head.next.next.next.next)

// console.log(myList.tail)
// console.log(myList.tail.prev)
// console.log(myList.tail.prev.prev)
// console.log(myList.tail.prev.prev.prev)


// isEmpty()
// push()
// pushFront()
