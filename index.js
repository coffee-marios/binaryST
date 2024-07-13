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
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      console.log(true, this.root);

      return this.root;
    } else {
      insertVal(this.root, value);
    }
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

//const root = tree.buildTree([]);

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

tree.insert(14);
tree.insert(10);
tree.insert(10);
//
let root = tree.get_root();
console.log("\n");

console.log(root);
console.log("\n");

prettyPrint(root);
