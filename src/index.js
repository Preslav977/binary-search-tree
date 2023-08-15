import Tree from "./Tree";
import "./style.css";

const balancedTree = new Tree();

console.log(balancedTree.buildTree([0, 6, 1, 2, 5, 3, 7, 8, 9, 6], 0, 8));

balancedTree.prettyPrint();

// balancedTree.insert();
