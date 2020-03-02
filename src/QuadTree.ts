import Rectangle from './Rectangle';

export default class QuadTree {
  readonly bounds: Rectangle;
  readonly nodes: QuadTree[]; // [tl, tr, bl, br]

  constructor(bounds: Rectangle) {
    this.bounds = bounds;
    this.nodes = [];
  }

  split(): void {
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.nodes.push(new QuadTree({
          x: this.bounds.x + subWidth * i,
          y: this.bounds.y + subHeight * j,
          width: subWidth,
          height: subHeight,
        }));
      }  
    }
  }
}
