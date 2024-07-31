import { Node, Tree, prettyPrint } from "./index.js";

function randomNumber(min, max) {
  // The maximum is exclusive and the minimum is inclusive
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function numbersTree(num = 10) {
  if (num > 100) return null;
  let allData = [];
  while (allData.length < num) {
    const addData = randomNumber(1, 101);
    allData.push(addData);
    if (num === allData.length) {
      allData = [...new Set(allData)];
    }
  }
  return allData;
}

// Create a binary search tree from an array of random numbers

const tree = new Tree();
const data = numbersTree();
tree.buildTree(data);
const root = tree.get_root();

prettyPrint(root);
console.log(tree.isBalanced());

console.log(tree.preOrder());
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
