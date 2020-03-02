import Rectangle from './Rectangle';
import Point from './Point';

enum NodePosition {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
};

export default class QuadTree {
  readonly bounds: Rectangle;
  readonly nodes: QuadTree[]; // [tl, tr, bl, br]
  readonly childrens: Point[];
  readonly maxChildren: number;
  readonly maxDepth: number;
  readonly depth: number;

  constructor(bounds: Rectangle, depth: number, maxChildren: number, maxDepth: number) {
    this.bounds = bounds;
    this.nodes = [];
    this.childrens = [];
    this.depth = depth;
    this.maxChildren = maxChildren;
    this.maxDepth = maxDepth;
  }

  splitNode(): boolean {
    if (this.depth < this.maxDepth - 1) {
      const subWidth = this.bounds.width / 2;
      const subHeight = this.bounds.height / 2;
  
      for (let vertical = 0; vertical < 2; vertical++) {
        for (let horizontal = 0; horizontal < 2; horizontal++) {
          this.nodes.push(new QuadTree({
            x: this.bounds.x + subWidth * horizontal,
            y: this.bounds.y + subHeight * vertical,
            width: subWidth,
            height: subHeight,
          },
          this.depth + 1,
          this.maxChildren,
          this.maxDepth));
        }  
      }
      return true; // done split
    }
    return false; // reached max depth
  }

  insert(children: Point) {
    if (this.childrens.length < this.maxChildren) {
      this.childrens.push(children);
    } else {
      const splitted = this.splitNode();
      if (!splitted) {
        this.childrens.push(children);
      } else {
        const nodePos = this.findNodePosition(children.x, children.y);
        this.nodes[nodePos].insert(children);
      }
    }
  }

  findNodePosition(x: number, y: number): NodePosition {
    const semiWidth = this.bounds.width / 2;
    const semiHeight = this.bounds.height / 2;

    if (x < this.bounds.x + semiWidth) {
      if (y < this.bounds.y + semiHeight) {
        return NodePosition.TOP_LEFT;
      } else {
        return NodePosition.BOTTOM_LEFT;
      }
    } else {
      if (y < this.bounds.y + semiHeight) {
        return NodePosition.TOP_RIGHT;
      } else {
        return NodePosition.BOTTOM_RIGHT;
      }
    }
  }
}
