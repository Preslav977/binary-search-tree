/* eslint-disable no-param-reassign */
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

  buildTree(array, start, end) {
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

  // Don't use the original array that was used to build tree
  // for insert and delete function parameter
  // for this method it should traverse the tree and manipulate
  // their connection
  insert(data, root = this.root) {
    if (root === null) {
      root = new Node(data);
    }

    if (data < root.data) {
      root.leftChildren = this.insert(data, root.leftChildren);
    } else if (data > root.data) {
      root.rightChildren = this.insert(data, root.rightChildren);
    }
    return root;
  }
}

export default Tree;
