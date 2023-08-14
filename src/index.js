import Tree from "./Tree";
import "./style.css";

const newTree = new Tree();

console.log(
  newTree.buildTree([1, 7, 4, 11, 8, 9, 4, 3, 5, 7, 9, 25, 64, 17, 75, 70])
);

newTree.prettyPrint();
