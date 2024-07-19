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
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      console.log(true, this.root);

      return this.root;
    } else {
      insertVal(this.root, value);
    }
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
        console.log(false, nodeElement.data);

        arr.push(nodeElement.rightNode);
      }
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

//prettyPrint(root);
tree.insert(20);
tree.insert(13);
tree.insert(17);
tree.insert(5);
tree.insert(8);

tree.insert(4);
tree.insert(50);

tree.insert(6);

tree.insert(2);
tree.insert(3);

tree.insert(10);
// tree.insert(10);

//tree.delete(10);
let root = tree.get_root();
console.log("\n");

console.log(root);
console.log("\n");

prettyPrint(root);
tree.delete(5);
prettyPrint(root);

// console.log(tree.find(5));
// console.log(tree.find(20));
// console.log(tree.find(13));
// console.log(tree.find(6));
// console.log(tree.find(8));
// console.log(tree.find(4));
// console.log(tree.find(2));

console.log(tree.levelOrder());
console.log(
  tree.levelOrder(function callback(node) {
    return node.data * 2;
  })
);
