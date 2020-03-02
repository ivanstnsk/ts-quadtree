import QuadTree from '../lib/QuadTree';

let canvasElem: HTMLCanvasElement;

function renderCounter(counter: number, depth: number): void {
  const divElem = document.createElement('div');
  divElem.style.position = 'absolute';
  divElem.style.left = '0px';
  divElem.style.top = '0px';
  divElem.style.padding = '4px';
  divElem.style.backgroundColor = 'black';
  divElem.style.color = 'white';
  divElem.innerText = `Objects: ${counter}\nDepth: ${depth}`;
  document.body.appendChild(divElem);
}

function renderTree(tree: QuadTree, ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return;

  ctx.beginPath();
  ctx.moveTo(tree.bounds.x, tree.bounds.y);
  ctx.lineTo(tree.bounds.x + tree.bounds.width, tree.bounds.y);
  ctx.lineTo(tree.bounds.x + tree.bounds.width, tree.bounds.y + tree.bounds.height);
  ctx.lineTo(tree.bounds.x, tree.bounds.y + tree.bounds.height);
  ctx.lineTo(tree.bounds.x, tree.bounds.y);
  ctx.stroke();

  tree.childrens.forEach((child) => {
    ctx.fillStyle = "green";
    ctx.fillRect(child.x - 2, child.y - 2, 4, 4);
  });
  
  if (tree.nodes.length > 0) {
    tree.nodes.forEach((node) => renderTree(node, ctx));
  }
}

export function demo(): void {
  document.body.style.padding = '0px';
  document.body.style.margin = '0px';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.padding = '0px';
  document.documentElement.style.margin = '0px';

  canvasElem = document.createElement('canvas');
  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
  canvasElem.style.width = `${window.innerWidth}px`;
  canvasElem.style.height = `${window.innerHeight}px`;
  canvasElem.style.backgroundColor = 'rgba(0,0,0,0.8)';
  document.body.appendChild(canvasElem);

  const ctx = canvasElem.getContext('2d');
  
  const bounds = {
    x: 10, 
    y: 10, 
    width: window.innerWidth - 20,
    height: window.innerHeight - 20,
  };
  const tree = new QuadTree(bounds, 0, 10, 10);

  // demo insert
  for (let i = 0; i < 30000; i++) {
    tree.insert({
      x: Math.random() * (window.innerWidth - 20) + 10,
      y: Math.random() * (window.innerHeight - 20) + 10,
    });
  }

  renderTree(tree, ctx);

  renderCounter(30000, 0);
}
