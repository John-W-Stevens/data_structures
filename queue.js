
// Quick Implementation of the Queue Data-structure 
    // A queue follows a last-in, last-out policy (LILO)

// I represented a queue with a JavaScript object that has the flowing attributes:
    // a. elements -> an array of all items in the queue
    // b. length   -> the pre-specified size limit for the queue
    // c. head     -> index position of element that needs to be dequeued ( removed )
    // d. tail     -> index position of last element enqued ( inserted )
    // e. isEmpty  -> Fuction that returns a boolean based on whether or not head === tail

// I have two methods:
    // a. enqueue -> Inputs a Queue object and item to be inserted, returns nothing, throws overflow error if queue if full
    // b. dequeue -> Inputs nothing, returns oldest item in queue, throws underflow error it queue is empty


// This function constructs a Queue object with a specified length
const buildQueue = length => {
    let Q = {
        elements: new Array(length),
        length: length,
        head: 0,
        tail: 0,
        isEmpty: () => Q.head === Q.tail
    }
    return Q
}
// Create a Queue
let Queue = buildQueue(10)


const enqueue = (Q, item) => {
    if (Q.head == Q.tail + 1){ throw "Queue overflow error."}
    else if(Q.head === 0 && Q.tail == Q.length){ 
        console.log(Q.elements.slice(Q.head, Q.tail))
        throw "Queue overflow error."
    }

    Q.elements[Q.tail] = item;
    if (Q.tail == Q.elements.length){
        Q.tail = 1;
    }
    else {Q.tail += 1}
}

const dequeue = (Q) => {

    if (Q.isEmpty()) {throw "Queue underflow error."}
    let item = Q.elements[Q.head];
    if (Q.head == Q.length){
        Q.head = 1;
    }
    else {Q.head += 1}
    return item;
}

// console.log(dequeue(Queue)) // throws underflow error
enqueue(Queue, 5)
enqueue(Queue, 12)
enqueue(Queue, 17)
enqueue(Queue, 36)
enqueue(Queue, 15)
enqueue(Queue, 2)
enqueue(Queue, 97)
enqueue(Queue, 64)
enqueue(Queue, 39)
enqueue(Queue, 38)

enqueue(Queue, 12) // throws overflow error



