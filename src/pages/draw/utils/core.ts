import {
  SVG,
  extend as SVGextend,
  Element as SVGElement,
} from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import styles from "../styles/core.module.css";
import { eventNames } from "process";
import { de } from "element-plus/es/locale/index.mjs";
import { node } from "./draw";
import { YTextRefID } from "node_modules/yjs/dist/src/internals";
const gap = {
  x: 40,
  y: 20,
};

const nodeArea = {
  width: 100,
  height: 40,
};


abstract class composition {
  public item: any;
  protected isActive = false;
  constructor(item: any) {
    this.item = item;
  }
  put(parentx: number, parenty: number) {
    const bbox = this.item.bbox();
    const { width, height } = bbox;
    this.item?.move(parentx - width / 2, parenty - height / 2);
  }
  // 重写
  abstract active(): void;
  // if (!this.isActive) {
  //   this.toggleActive()
  // }
  // }
  abstract deactive(): void;
  // if (this.isActive) {
  //   this.toggleActive()
  // }
  // }
  toggleActive() {
    this.isActive = !this.isActive
  }
}
const RectConfig = {
  Strokecolor: '#000',
  StrokeWidth: 1
}
class Rect extends composition {
  constructor(item: any) {
    super(item)
    this.item.node.addEventListener('click', (e: any) => {
      e.stopPropagation()
      this.active()
      activeNode = e.target.instance.n
    })
  }
  active() {
    // if (!this.isActive) {
    this.toggleActive()
    this.item.stroke({
      color: RectConfig.Strokecolor,
      width: RectConfig.StrokeWidth
    })
    // }
  }
  deactive(): void {
    if (this.isActive) {
      this.toggleActive()
      this.item.stroke({
        color: RectConfig.Strokecolor,
        width: 0
      })
    }
  }
}

export class Node {
  private isActive = false;
  private parent?: Node;
  private children: Node[];
  private compositions: composition[];
  public x: number;
  public y: number;
  private lines = new Array<any>();
  constructor() {
    this.children = new Array<Node>();
    this.compositions = new Array<composition>();
    this.x = 0;
    this.y = 0;
  }

  setX(x: number) {
    this.x = x;
    this.composition();
  }

  setY(y: number) {
    this.y = y;
    this.composition();
  }

  setPos(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }
  getParent() {
    return this.parent;
  }
  getChildren() {
    return this.children;
  }
  appendChild(child: Node) {
    this.children?.push(child);
    child.parent = this
  }
  getHeadConnectionPos() {
    this.adjust()
    return [this.x - nodeArea.width / 2, this.y]
  }
  getTailConnectionPos() {
    this.adjust()
    return [this.x + nodeArea.width / 2, this.y]
  }
  removeChild(child: Node) {
    this.children = this.children.filter((item) => item !== child);
  }
  _getUpLeafNum(): number {
    if (this.children.length === 0) return 1
    const n = this.children.length
    const mid = Math.floor(n / 2)
    const odd = n % 2 === 1
    if (odd) {
      const temp = this.children.slice(0, mid).reduce((t, cur) => {
        return t + cur._getLeafNum()
      }, 0)
      if (!this.children[mid].children.length) {
        return temp + 0.5
      } else {
        return temp + this.children[mid].getUpLeafNum()
      }
    } else {
      return this.children.slice(0, mid).reduce((t, cur) => {
        return t + cur._getLeafNum()
      }, 0)
    }
  }
  getUpLeafNum() {
    if (this.children.length === 0) return 0
    return this._getUpLeafNum()
  }
  _getDownLeafNum(): number {
    if (this.children.length === 0) return 1
    const n = this.children.length
    const mid = Math.floor(n / 2)
    const odd = n % 2 === 1
    if (odd) {
      const temp = this.children.slice(mid + 1).reduce((t, cur) => {
        return t + cur._getLeafNum()
      }, 0)
      if (!this.children[mid].children.length) {
        return temp + 0.5
      } else {
        return temp + this.children[mid].getDownLeafNum()
      }
    } else {
      return this.children.slice(mid).reduce((t, cur) => {
        return t + cur._getLeafNum()
      }, 0)
    }
  }
  getDownLeafNum() {
    if (this.children.length === 0) return 0
    return this._getDownLeafNum()
  }
  _getLeafNum(): number {
    if (this.children.length === 0) {
      return 1
    } else {
      return this.children.reduce((t, cur) => {
        return t + cur._getLeafNum()
      }, 0)
    }
  }
  getLeafNum() {
    if (this.children.length === 0) return 0;
    return this._getLeafNum();
  }
  addComposition(c: composition) {
    this.compositions.push(c);
    c.put(this.x, this.y);
  }
  removeComposition(c: composition) {
    this.compositions = this.compositions.filter((item) => item !== c);
  }
  composition() {
    if (this.compositions.length !== 0) {
      this.compositions.forEach((item) => {
        item.put(this.x, this.y);
      });
    }
  }
  active() {
    this.isActive = true;
    if (this.compositions.length) {
      this.compositions.forEach((item, index) => {
        item.active()
      })
    }
  }
  deactive() {
    this.isActive = false;
    if (this.compositions.length) {
      this.compositions.forEach((item, index) => {
        item.deactive()
      })
    }
  }
  adjust() {
    const leader = this.compositions[0]
    const leaderPos = leader.item.bbox()
    const { x = 0, y = 0 } = leaderPos
    this.setPos(x + nodeArea.width / 2, y + nodeArea.height / 2)
  }
  connect(draw: any) {
    if (this.children.length !== 0) {
      const [x, y] = this.getTailConnectionPos()
      this.lines.forEach(v => {
        v.remove()
      })
      this.children.forEach(v => {
        this.lines.push(draw.line(x, y, ...v.getHeadConnectionPos()).stroke({
          with: 2,
          color: "#000"
        }))
      })
    }
  }
  allReconnection(draw: any) {
    this.connect(draw)
    if (this.children.length !== 0) {
      this.children.forEach(v => {
        v.allReconnection(draw)
      })
    }
  }
}
export class Root {
  private root: Node;
  constructor(root: Node) {
    this.root = root;
  }
  // 排列虚拟节点的位置
  // 2-2节点的位置取决于在父节点的位置和叶子节点的个数
  // 例如根节点下是3个节点，那么2-2处在中心位置，但是2-1和2-3必须根据2-2叶子节点的个数腾出半数节点的位置
  put(node = this.root) {
    function odd(n: number) {
      return n % 2 === 1;
    }
    const children = node.getChildren();
    if (children.length === 0) return;
    const oddFlag = odd(children.length);
    if (children.length !== 0) {
      const mid = Math.floor(children.length / 2);
      const leafs = new Array<number>();
      // 获取前面和后面的叶子节点的个数
      children.forEach((item, index) => {
        // 3 -> mid = 1 (0) 1 (2)
        // 4 -> mid = 2 (0 1) (2 3)
        leafs.push(item.getLeafNum());
      });
      children.forEach((item, index) => {
        item.setX(node.x + nodeArea.width + gap.x);
        // 奇数节点特殊处理中心,不需要叶子节点处理
        if (oddFlag && index === mid) {
          item.setY(node.y);
        } else if (!oddFlag) {
          //偶数节点处理，从中心扩散叶子节点
          if (index <= mid - 1) {
            let accUp = 0
            for (let i = index; i <= mid - 1; i++) {
              if (i === index) {
                const d = children[i].getDownLeafNum()
                accUp += d < 1 ? 0 : d
              } else {
                accUp += leafs[i] === 1 ? 0 : leafs[i]
              }
            }
            const fix = Math.max(children[index].getDownLeafNum() - children[index].getUpLeafNum())
            console.log(item, 'up:' + (accUp));
            item.setY(
              node.y - nodeArea.height -
              (gap.y + nodeArea.height) * (mid - index - 1 + accUp) - (nodeArea.height - gap.y) * fix
            );
          } else if (index >= mid) {
            let accDown = 0
            for (let i = mid; i < children.length; i++) {
              if (i === index) {
                const d = children[i].getUpLeafNum()
                accDown += d < 1 ? 0 : d
              } else {
                accDown += leafs[i] === 1 ? 0 : leafs[i]
              }
            }
            const fix = Math.max(children[index].getUpLeafNum() - children[index].getDownLeafNum())
            console.log(item, 'down:' + (accDown));
            item.setY(
              node.y + nodeArea.height +
              (gap.y + nodeArea.height) * (index - mid + accDown) + (nodeArea.height - gap.y) * fix
            );
          }
        } else {
          // 奇数节点
          if (index < mid) {
            let accUp = 0
            for (let i = index; i < mid; i++) {
              if (i === index) {
                accUp += children[i].getDownLeafNum()
              } else {
                accUp += leafs[i]
              }
            }
            accUp += children[mid].getUpLeafNum()
            item.setY(
              node.y - (gap.y + nodeArea.height) * (mid - index + accUp)
            );
          } else if (index > mid) {
            let accDown = 0
            for (let i = mid + 1; i < children.length; i++) {
              if (i === mid + 1) {
                accDown += children[i].getUpLeafNum()
              } else {
                accDown += leafs[i]
              }
            }
            accDown += children[mid].getDownLeafNum()
            item.setY(
              node.y + (gap.y + nodeArea.height) * (index - mid + accDown)
            );
          }
        }
        this.put(item);
      });
    }
  }
  connection(draw: any) {
    this.root.allReconnection(draw)
  }
}

function Composify<T extends composition>(constructor: new (...args: any[]) => T) {
  return function (target: any, propertyKey: any, descriptor: any) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      return new constructor(result);
    };
    return descriptor;
  }
}
// 将composition装载到node对象上
function load(node?: Node) {
  return function (target: any, propertyKey: any, descriptor: any) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      const n = node || new Node();
      result.item.n = n
      n.addComposition(result);
      return n;
    };
    return descriptor;
  };
}
let root: Node | undefined
let activeNode: Node | undefined
export class Paper {
  public globalEvent: HTMLElement | null;
  public draw: any;
  public R: Root;
  public W: any;
  constructor(wrapper: string) {
    this.globalEvent = document.querySelector(wrapper);
    this.W = SVG().addTo(wrapper).size("100%", "100%")
    this.draw = this.W.group();
    this.draw.draggable().on('dragend', (e: any) => {
      root?.adjust()
    });
    const center = new Center(wrapper);
    const x = center.getX();
    const y = center.getY();
    const rect = this.drawRect();
    root = rect
    activeNode = rect;
    rect.active();
    this.R = new Root(rect);
    rect.setPos(x, y);
    this.init()
  }
  init() {
    this.register('click', (e: any) => {
      const instance = e.target.instance
      this.deactive()
    })
    window.addEventListener('keyup', (e: any) => {
      if (e.key === 'a') {
        this.son()
      }
    })
    this.initScrollBar()
  }
  // initScrollBar() {
  //   const a = 100, b = 10
  //   const f = '#e31'
  //   const x = this.W.rect(a, b).attr({
  //     rx: b / 2,
  //     ry: b / 2
  //   }).fill(f).draggable()
  //   x.on('dragmove', (event: any) => {
  //     const { box } = event.detail;
  //     event.preventDefault();
  //     x.move(box.x, x.y());
  //   })
  //   const y = this.W.rect(b, a).attr({
  //     rx: b / 2,
  //     ry: b / 2
  //   }).fill(f).draggable()
  //   y.on('dragmove', (event: any) => {
  //     const { box } = event.detail;
  //     event.preventDefault();
  //     y.move(y.x(), box.y);
  //   })
  //   const bingo = () => {
  //     const { height: h = 0, width: w = 0 } = this.globalEvent?.getBoundingClientRect() as DOMRect
  //     x.move(0, h - b)
  //     y.move(w - b, 0)
  //   }
  //   bingo()
  //   window.addEventListener('resize', (e) => {
  //     bingo()
  //   })
  // }
  initScrollBar() {
    this.globalEvent?.style.overflow
  }
  @load()
  @Composify(Rect)
  drawRect(x = nodeArea.width, y = nodeArea.height) {
    const rect = this.draw
      .rect(x, y)
      .attr({
        rx: 5,
        ry: 5,
      })
      .fill("#c82")
      .stroke({ color: "#000", width: 0 });
    return rect;
  }
  son(parent = activeNode) {
    if (parent) {
      const son = this.drawRect();
      parent?.appendChild(son);
      this.R.put();
      this.R.connection(this.draw)
      return son;
    }
  }
  sibling(brother = activeNode) {
    if (brother) {
      const sibling = this.drawRect();
      const parent = brother.getParent();
      brother.setParent(parent as Node);
      const idx = parent?.getChildren().indexOf(brother);
      parent?.getChildren().splice(idx as number, 0, sibling);
      this.R.put();
      return sibling;
    }
  }
  active(node: Node) {
    activeNode = node;
    node.active();
  }
  deactive() {
    if (activeNode) {
      activeNode.deactive()
      activeNode = undefined
    }
  }
  changeActive(newActiveNode: Node) {
    activeNode?.deactive();
    this.active(newActiveNode);
  }
  getGlobalEventObj() {
    return this.globalEvent
  }
  register(eventName: string, fn: (e: Event) => any) {
    this.globalEvent?.addEventListener(eventName, fn)
  }
  unregister(eventName: string, fn: (e: Event) => any) {
    this.globalEvent?.removeEventListener(eventName, fn)
  }
}

export class Center {
  private x: number;
  private y: number;
  private screenX: number;
  private screenY: number;
  constructor(wrapper: string) {
    const clinetRect = document.querySelector(wrapper)?.getBoundingClientRect();
    this.screenX = clinetRect?.width || 0;
    this.screenY = clinetRect?.height || 0;
    this.x = this.screenX * 0.25;
    this.y = this.screenY * 0.5;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
