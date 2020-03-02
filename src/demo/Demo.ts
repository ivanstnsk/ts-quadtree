import QuadTree from '../QuadTree';

let canvasElem: HTMLCanvasElement;

function renderTree(tree: QuadTree, ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return;

  ctx.beginPath();
  ctx.moveTo(tree.bounds.x, tree.bounds.y);
  ctx.lineTo(tree.bounds.x + tree.bounds.width, tree.bounds.y);
  ctx.lineTo(tree.bounds.x + tree.bounds.width, tree.bounds.y + tree.bounds.height);
  ctx.lineTo(tree.bounds.x, tree.bounds.y + tree.bounds.height);
  ctx.lineTo(tree.bounds.x, tree.bounds.y);
  ctx.stroke();
  
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
  const tree = new QuadTree(bounds);

  //demo split
  tree.split();
  tree.nodes[0].split();
  tree.nodes[0].nodes[1].split();
  tree.nodes[0].nodes[1].nodes[2].split();

  renderTree(tree, ctx);
}
