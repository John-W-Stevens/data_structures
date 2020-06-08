class Node{
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DLList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    isEmpty(){
        return this.length === 0;
    }
    Push(value){
        let newNode = Node(value);
        if (this.isEmpty()){
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            let currentTail = this.tail
        }

        this.length += 1;
        return this;
    }


}