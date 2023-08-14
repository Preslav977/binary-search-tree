import Node from "./Node";
import Tree from "./Tree";
import "./style.css";

const newTree = new Tree(5);

console.log(
  newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
);
