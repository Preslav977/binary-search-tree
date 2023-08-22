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

  // eslint-disable-next-line default-param-last
  delete(data, root = this.root) {
    if (root === null) {
      return root;
    }

    if (root.data > data) {
      root.leftChildren = this.delete(data, root.leftChildren);
    } else if (root.data < data) {
      root.rightChildren = this.delete(data, root.rightChildren);
      return root;
    }

    // if one of the children is empty
    if (root.leftChildren === null) {
      const temp = root.rightChildren;
      return temp;
    }
    if (root.rightChildren === null) {
      const temp = root.leftChildren;
      return temp;
    }

    let successorParent = root;
    let successor = root.rightChildren;
    while (successor.leftChildren !== null) {
      successorParent = successor;
      successor = successor.leftChildren;
    }

    // delete successor since it's always left child of it's parent
    // we can safely make successor's right, right children as left
    // of it's parent.
    // If there are no successor, then assign successor right to
    // successorParent right
    if (successorParent !== root) {
      successorParent.leftChildren = successor.rightChildren;
    } else {
      successorParent.rightChildren = successor.rightChildren;
    }
    // copy successor data to the root
    root.data = successor.data;
    return root;
  }

  find(data, root = this.root) {
    if (data < root.data) {
      const findNode = this.find(data, root.leftChildren);
      return findNode;
    }
    if (data > root.data) {
      const findNode = this.find(data, root.rightChildren);
      return findNode;
    }
    if (data === root.data) {
      return root;
    }
  }

  levelOrder(root = this.root) {
    const traverseNodes = [];

    if (root === null) {
      return null;
    }

    const newArray = [...this.array];

    newArray.push(root);

    while (newArray.length !== 0) {
      const breadthFirstSearch = newArray[0];

      if (breadthFirstSearch.leftChildren !== null) {
        newArray.push(breadthFirstSearch.leftChildren);
      }
      if (breadthFirstSearch.rightChildren !== null) {
        newArray.push(breadthFirstSearch.rightChildren);
      }

      newArray.shift(breadthFirstSearch);
      traverseNodes.push(breadthFirstSearch);
    }

    return traverseNodes;
  }
}

export default Tree;
