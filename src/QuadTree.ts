import Rectangle from './Rectangle';

export default class QuadTree {
  readonly bounds: Rectangle;
  readonly nodes: QuadTree[];

  constructor(bounds: Rectangle) {
    this.bounds = bounds;
    this.nodes = [];
  }

  split(): void {
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;

    const topLeftBounds = {
      x: this.bounds.x,
      y: this.bounds.y,
      width: subWidth,
      height: subHeight
    };
    const topRightBounds = {
      x: this.bounds.x + subWidth,
      y: this.bounds.y,
      width: subWidth,
      height: subHeight,
    };
    const bottomLeftBounds = {
      x: this.bounds.x,
      y: this.bounds.y + subHeight,
      width: subWidth,
      height: subHeight
    };
    const bottomRightBounds = {
      x: this.bounds.x + subWidth,
      y: this.bounds.y + subHeight,
      width: subWidth,
      height: subHeight,
    };

    this.nodes.push(new QuadTree(topLeftBounds));
    this.nodes.push(new QuadTree(topRightBounds));
    this.nodes.push(new QuadTree(bottomLeftBounds));
    this.nodes.push(new QuadTree(bottomRightBounds));
  }
}
