
// Quick Implementation of the Stack Data-structure 
// Why use a stack?
    // Speed. A stack follows a LIFO (last-in, first-out) policy.


// I represent the stack as an object with 2x properties
let stack = {
    elements: [],
    top: -1 // The index position of the last item added to the stack
};

// The following 3x methods have a O(1), or 'constant', runtime
    // a. isEmpty(stack)    -> Input: a stack / Returns: a boolean based on whether or not the stack is empty
    // b. Push(stack, item) -> Input: a stack and an item to add / Returns nothing
    // c. Pop(stack)        -> Input: nothing / Returns the last item in the stack

const isEmpty = stack => stack.top === -1;

const Push = (stack, item) => {
    stack.elements.push(item);
    stack.top += 1;
}

const Pop = stack => {
    if (isEmpty(stack)){
        console.log("Stack underflow error.");
    }
    else {
        stack.top -= 1;
        return stack.elements.pop();
    }
} 
console.log(isEmpty(stack))  // Output: -> true
Push(stack, 5)
Push(stack, 12)
Push(stack, 33)
console.log(Pop(stack))     // Returns 33
console.log(stack.top)      // Returns 1
