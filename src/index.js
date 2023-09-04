import Tree from "./Tree";
import "./style.css";

const balancedTree = new Tree();

console.log(balancedTree.createRandomNumbers(0, 4));

balancedTree.prettyPrint();

console.log(balancedTree.isBalanced());

// console.log(balancedTree.levelOrder());

// console.log(balancedTree.inOrder());

// console.log(balancedTree.preOrder());

// console.log(balancedTree.postOrder());

console.log(balancedTree.insert(102));

console.log(balancedTree.insert(110));

console.log(balancedTree.insert(120));

balancedTree.prettyPrint();

console.log(balancedTree.isBalanced());

console.log(balancedTree.reBalance(0, 12));

balancedTree.prettyPrint();

console.log(balancedTree.isBalanced());

// console.log(balancedTree.levelOrder());

// console.log(balancedTree.inOrder());

// console.log(balancedTree.preOrder());

// console.log(balancedTree.postOrder());

console.log(balancedTree.insert(20));

balancedTree.prettyPrint();

// console.log(balancedTree.delete(20));

// balancedTree.prettyPrint();

console.log(balancedTree.find(20));

console.log(balancedTree.height(balancedTree.find(20)));

// console.log(balancedTree.depth(new Node(20)));
