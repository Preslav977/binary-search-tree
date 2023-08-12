/* eslint-disable no-underscore-dangle */
class Node {
  constructor(data) {
    this.data = data;
    this.leftChildren = null;
    this.rightChildren = null;
  }

  get leftChildren() {
    return this._leftChildren;
  }

  set leftChildren(value) {
    this._leftChildren = value;
  }

  get rightChildren() {
    return this._rightChildren;
  }

  set rightChildren(value) {
    this._rightChildren = value;
  }
}

export default Node;
