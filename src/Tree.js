/* eslint-disable no-underscore-dangle */
import Node from "./Node";

class Tree {
  array = [];

  constructor() {
    this.root = null;
  }

  get root() {
    return this._root;
  }

  set root(value) {
    this._root = value;
  }

  buildTree(array, start = 0, end = array.length - 1) {
    const newArray = [];

    array.sort((smallerValue, biggerValue) => smallerValue - biggerValue);
    array.forEach((element) => {
      if (!newArray.includes(element)) {
        newArray.push(element);
      }
    });

    if (start > end) {
      return null;
    }
    const middle = Math.floor(parseInt(start + end) / 2);

    const node = new Node(newArray[middle]);

    node.leftChildren = this.buildTree(array, start, middle - 1);

    node.rightChildren = this.buildTree(array, middle + 1, end);

    this.root = node;

    return node;
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChildren !== null) {
      this.prettyPrint(
        node.rightChildren,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChildren !== null) {
      this.prettyPrint(
        node.leftChildren,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };
}

export default Tree;
