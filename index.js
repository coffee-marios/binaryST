class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.nodeEdge = { left: 0, right: 0 };
  }
  buildTree(array) {
    const unique = [...new Set(array)];
    unique.sort(compare);
    console.log(unique);
    const lenUnique = unique.length;
    this.root = binaryOrg(unique, 0, lenUnique - 1);
    return this.root;
  }
  find(value, node = this.root) {
    if (node === null) {
      return false;
    }
    if (node.data === value) {
      return node;
    }
    if (node.data < value) {
      return this.find(value, node.rightNode);
    } else if (node.data > value) {
      return this.find(value, node.leftNode);
    }
  }
  depth(value, node = this.root, count = 0) {
    if (node === null) return 0;
    count = count + 1;
    if (node.data === value) return count;

    if (node.data < value) {
      return this.depth(value, node.rightNode, count);
    }
    if (node.data > value) {
      return this.depth(value, node.leftNode, count);
    }
  }
  height(value, node = null, start = false) {
    if (start === false) {
      node = this.find(value);
      if (node === false) return null;

      start = true;
    }
    if (node === null) return 0;

    // leftHeight (and rightHeight) will get the value of heightNode (+1 every time it is called)

    let leftHeight = this.height(value, node.leftNode, start);

    let rightHeight = this.height(value, node.rightNode, start);

    let heightNode = Math.max(leftHeight, rightHeight) + 1;

    return heightNode;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      console.log(true, this.root);

      return this.root;
    } else {
      insertVal(this.root, value);
    }
  }
  inOrder(callback, node = this.root, values = []) {
    if (node === null) return;
    if (node.leftNode) {
      this.inOrder(callback, node.leftNode, values);
    }
    if (!callback) {
      values.push(node.data);
    } else {
      values.push(callback(node));
    }
    if (node.rightNode) {
      this.inOrder(callback, node.rightNode, values);
    }
    return values;
  }
  levelOrder(callback, node = this.root) {
    const arr = [];
    const values = [];

    if (node === null) return;
    arr.push(node);
    while (arr.length > 0) {
      let nodeElement = arr.shift();
      if (!callback) {
        values.push(nodeElement.data);
      } else {
        values.push(callback(nodeElement));
      }

      if (nodeElement.leftNode !== null) {
        arr.push(nodeElement.leftNode);
      }
      if (nodeElement.rightNode !== null) {
        arr.push(nodeElement.rightNode);
      }
    }

    return values;
  }
  preOrder(callback, node = this.root, values = []) {
    if (node === null) return;
    if (!callback) {
      values.push(node.data);
    } else {
      values.push(callback(node));
    }

    if (node.leftNode) {
      this.preOrder(callback, node.leftNode, values);
    }
    if (node.rightNode) {
      this.preOrder(callback, node.rightNode, values);
    }
    return values;
  }
  delete(value, node = this.root) {
    if (node === null) return null;

    if (node.data < value) {
      node.rightNode = this.delete(value, node.rightNode);
    }
    if (node.data > value) {
      node.leftNode = this.delete(value, node.leftNode);
    }
    if (node.data === value) {
      if (node.leftNode === null) {
        return node.rightNode;
      }
      if (node.rightNode === null) {
        return node.leftNode;
      }
      // Get the inorder successor (smallest in the right subtree)
      node.data = this.minValue(node.rightNode);

      // Delete the inorder successor
      node.rightNode = this.delete(node.data, node.rightNode);
    }
    return node;
  }
  postOrder(callback, node = this.root, values = []) {
    if (node === null) return;
    if (node.leftNode) {
      this.postOrder(callback, node.leftNode, values);
    }
    if (node.rightNode) {
      this.postOrder(callback, node.rightNode, values);
    }
    if (!callback) {
      values.push(node.data);
    } else {
      values.push(callback(node));
    }
    return values;
  }
  minValue(node) {
    let current = node;
    while (current.leftNode !== null) {
      current = current.leftNode;
    }
    return current.data;
  }

  get_root() {
    return this.root;
  }
  isBalanced() {
    let isBal = true;
    if (this.root === null) return true;

    const depthCompare = function (node) {
      if (node === null) return 0;
      const left = depthCompare(node.leftNode);
      const right = depthCompare(node.rightNode);
      const depthAdd = Math.abs(left - right);
      if (depthAdd > 1) {
        isBal = false;
      }
      return Math.max(left, right) + 1;
    };
    depthCompare(this.root);
    return isBal;
  }

  rebalance() {
    const allNodes = [];
    if (this.root === null) return;
    const getData = function (node) {
      if (node === null) return;
      allNodes.push(node.data);
      const left = getData(node.leftNode);
      const right = getData(node.rightNode);
    };
    getData(this.root);
    this.root = this.buildTree(allNodes);
  }
}

function insertVal(node, value) {
  if (node === null) {
    node = new Node(value);
    return node;
  }

  if (value < node.data) {
    node.leftNode = insertVal(node.leftNode, value);
  }

  if (value > node.data) {
    node.rightNode = insertVal(node.rightNode, value);
  }
  return node;
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  if (a == b) return 0;
}

function binaryOrg(arr, start, end) {
  if (start > end) return null;
  const mid = parseInt((start + end) / 2);
  let node = new Node(arr[mid]);

  node.leftNode = binaryOrg(arr, start, mid - 1);
  node.rightNode = binaryOrg(arr, mid + 1, end);
  return node;
}

const tree = new Tree();

//const root = tree.buildTree([1, 2, 3, 4, 5, 6, 7, 10]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// //prettyPrint(root);
// tree.insert(20);
// tree.insert(13);
// tree.insert(17);
// tree.insert(5);
// tree.insert(8);

// tree.insert(4);
// tree.insert(50);

// tree.insert(6);

// tree.insert(2);
// tree.insert(3);

// tree.insert(10);
// // tree.insert(10);

// //tree.delete(10);
// let root = tree.get_root();
// console.log("\n");

// console.log(root);
// console.log("\n");

// prettyPrint(root);
// tree.delete(5);
// prettyPrint(root);
// console.log(tree.isBalanced());
// tree.rebalance();
// root = tree.get_root();

// prettyPrint(root);
// console.log(tree.isBalanced());

// // console.log(tree.find(5));
// // console.log(tree.find(20));
// // console.log(tree.find(13));
// // console.log(tree.find(6));
// // console.log(tree.find(8));
// // console.log(tree.find(4));
// // console.log(tree.find(2));

// //console.log(tree.levelOrder());
// // console.log(
// //   tree.levelOrder(function callback(node) {
// //     return node.data * 2;
// //   })
// // );
// const tree_2 = new Tree();
// //tree_2.buildTree(["F", "D", "B", "A", "C", "E", "J", "G", "I", "H", "K"]);
// tree_2.buildTree([1, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
// let root_2 = tree_2.get_root();
// prettyPrint(root_2);

// // console.log(tree_2.preOrder());
// // console.log(
// //   tree_2.preOrder(function callback(node) {
// //     return node.data * 2;
// //   })
// // );
// //console.log(tree_2.inOrder());
// // console.log(
// //   tree_2.inOrder(function callback(node) {
// //     return node.data * 3;
// //   })
// // );

// //console.log(tree_2.postOrder());

// // console.log(
// //   tree_2.postOrder(function add(node) {
// //     return node.data + 2;
// //   })
// // );

// //console.log(tree_2.height(6));
// //console.log(tree_2.depth(7));
// console.log(tree_2.isBalanced());

export { Tree, prettyPrint };
