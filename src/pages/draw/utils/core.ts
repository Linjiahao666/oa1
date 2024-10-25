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
const gap = {
  x: 40,
  y: 20,
};

const nodeArea = {
  width: 100,
  height: 45,
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
  setParent(parent: Node) {
    this.parent = parent;
    parent.appendChild(this);
  }
  getChildren() {
    return this.children;
  }
  appendChild(child: Node) {
    this.children?.push(child);
  }
  removeChild(child: Node) {
    this.children = this.children.filter((item) => item !== child);
  }
  _getLeafNum(): number {
    if (this.children.length === 0) {
      return 1;
    } else {
      return this.children.reduce((acc, item) => acc + item._getLeafNum(), 0);
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
}
export class Root {
  private root: Node;
  constructor(root: Node) {
    this.root = root;
  }
  getAccumulateLeafNum() { }
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
            // 两个中心上面的那个
            // 第一个一个gap加上一个高度 mid = 2 index = 1
            // 第二个两个gap加上两个高度
            // accUp 距离为index到mid-1
            const accUp = leafs.slice(index, mid).reduce((total, cur, idx) => {
              if (idx === 0 || idx === mid - 1) {
                return total + Math.ceil(cur / 2);
              } else {
                return total + cur;
              }
            }, 0);
            item.setY(
              node.y -
              (gap.y + nodeArea.height) * (mid - index + accUp) +
              nodeArea.height / 2
            );
          } else if (index >= mid) {
            //下面的中心
            // mid = 2 index = 2 一个gap加上一个高度
            const accDown = leafs
              .slice(mid, index + 1)
              .reduce((total, cur, idx) => {
                if (idx === 0 || idx === index - mid) {
                  return total + cur / 2;
                } else {
                  return total + cur;
                }
              }, 0);
            item.setY(
              node.y +
              (gap.y + nodeArea.height) * (index + 1 - mid + accDown) -
              nodeArea.height / 2
            );
          }
        } else {
          // 奇数节点
          if (index < mid) {
            // mid = 1 index = 0 一个gap一个高度
            const accUp = leafs.slice(index, mid + 1).reduce((total, cur, idx) => {
              if (idx === 0 || idx === mid) {
                return total + Math.ceil(cur / 2);
              } else {
                return total + cur;
              }
            }, 0);
            item.setY(
              node.y - (gap.y + nodeArea.height) * (mid - index + (leafs[index] === 0 ? 0 : accUp))
            );
          } else if (index > mid) {
            // mid = 1 index = 2 一个gap一个高度
            const accDown = leafs.slice(mid).reduce((total, cur, idx) => {
              if (idx === 0 || idx === index - mid) {
                return total + Math.floor(cur / 2);
              }
              else {
                return total + cur;
              }
            }, 0);
            item.setY(
              node.y + (gap.y + nodeArea.height) * (index - mid + (leafs[index] === 0 ? 0 : accDown))
            );
          }
        }
        this.put(item);
      });
    }
  }
}

function Composify<T extends composition>(constructor: new (...args: any[]) => T) {
  return function (target: any, propertyKey: any, descriptor: any) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      // console.log(new constructor(result))
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
  constructor(wrapper: string) {
    this.globalEvent = document.querySelector(wrapper);
    this.draw = SVG().addTo(wrapper).size("100%", "100%").group();
    this.draw.draggable().on('dragend', (e) => {
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
  }
  @load()
  @Composify(Rect)
  drawRect(x = 100, y = 45) {
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
    console.log(activeNode)
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
// export class Drawer {
//   public static draw(node: Node) {
//     return true;
//   }
// }
// export class Paper {
//   private draw: any;
//   private group: any;
//   private activeItem?: Node;
//   private root?: Node;
//   private center: Center
//   constructor(config: DrawConfig) {
//     const { wrapper, color } = config;
//     this.draw = SVG().addTo(wrapper).size("100%", "100%");
//     this.group = this.draw.group();
//     this.group.draggable();
//     this.group.fill(color);
//     this.center = new Center(wrapper);
//     // this.group.draggable();
//     this.initDrawEvent();
//     this.initGlobalEvent();
//   }
//   init() {
//     this.root = new Node({
//       paper: this,
//     }).init()

//   }
//   getDraw() {
//     return this.draw;
//   }
//   getCenter() {
//     return this.center;
//   }
//   getGroup() {
//     return this.group;
//   }
//   initGlobalEvent() {
//     ga("keydown", (e) => {
//       if ((e.key === "Delete" || e.key === "Backspace") && this.activeItem) {
//         this.activeItem.getEl().remove();
//       }
//       else if (e.ctrlKey && e.key === "z") {
//         console.log("cancel");
//       }
//       else if (e.key === "a" && this.activeItem) {
//         this.append();
//       }
//       else if (e.key === 'Enter' && this.activeItem) {
//         this.sibling();
//       }
//     });
//   }
//   initDrawEvent() {
//     this.draw.on("click", (event: any) => {
//       if (event.target.instance !== 'rect') {
//         this.changeActive();
//       }
//     });
//   }

//   changeActive(item?: any) {
//     const el = item?.getEl();
//     const activeEl = this.activeItem?.getEl();
//     activeEl && activeEl.stroke({ color: '#fff', width: 0 });
//     if (!item) {
//       this.activeItem?.setActive(false)
//       this.activeItem = undefined;
//       return
//     }
//     this.activeItem = item;
//     el.stroke({ color: '#3bf', width: 2 });
//   }

//   son() {
//     const node = new Node({
//       paper: this,
//       parent: this.activeItem
//     }).setDepth(this.activeItem?.getDepth() as number + 1).init()
//     this.changeActive(node)
//     Drawer.draw(this.root as roo)
//   }
//   sibling() {
//     const node = new Node({
//       paper: this,
//       parent: this.activeItem?.getParent()
//     }).setDepth(this.activeItem?.getDepth() || 0).setNo(this.activeItem?.getNo() as number + 1).init()
//     this.changeActive(node)
//   }
//   append() {
//     this.son()
//   }
// }
// interface NodeConfig {
//   el?: any,
//   parent?: Node,
//   children?: Node[],
//   isActive?: boolean,
//   paper: Paper,
// }
// export class Node {
//   private isActive: boolean;
//   private parent?: Node;
//   private chilren: Node[];
//   private el?: any;
//   private text: any;
//   private group: any;
//   private paper: Paper;
//   private isEdit: boolean = false;
//   private depth = 0;
//   private no = 0;
//   constructor(config: NodeConfig) {
//     const { isActive, parent, children, el, paper } = config;
//     this.isActive = isActive || false;
//     this.setParent(parent as Node);
//     this.chilren = children || new Array<Node>();
//     this.el = el;
//     this.paper = paper;
//     this.group = paper.getDraw().group();
//     this.initGroup();
//     this.initNodeEvent();
//   }
//   setEl(el: any) {
//     this.el = el
//     return this
//   }
//   getEl() {
//     return this.el
//   }
//   getParent() {
//     return this.parent;
//   }
//   getPosition() {
//     return this.el.bbox();
//   }
//   getChildren() {
//     return this.chilren;
//   }
//   setParent(parent: Node) {
//     if (!parent) return this;
//     this.parent = parent;
//     parent.chilren.push(this)
//     return this
//   }
//   setActive(value: boolean) {
//     this.isActive = value;
//     if (value) {
//       this.paper.changeActive(this)
//     }
//     return this
//   }
//   getCenter() {
//     return this.paper.getCenter()
//   }
//   getRect() {
//     return this.group
//   }
//   getDraw() {
//     return this.paper.getDraw()
//   }
//   changeActive() {
//     this.isActive = !this.isActive;
//     this.paper.changeActive(this)
//   }
//   initNodeEvent() {
//     this.group.on("click", (event: any) => {
//       event.stopPropagation();
//       this.changeActive()
//     });
//     this.group.on("dblclick", (event: any) => {
//       event.stopPropagation();
//       this.makeEditable();
//     });
//   }
//   initGroup() {
//     this.paper.getGroup().add(this.group)
//   }
//   getDepth(): number {
//     return this.depth;
//   }
//   setDepth(value: number) {
//     this.depth = value;
//     return this
//   }
//   getNo(): number {
//     return this.no;
//   }
//   setNo(no: number) {
//     this.no = no
//     return this;
//   }
//   getText() {
//     return this.text.value;
//   }
//   setText(value?: string) {
//     if (!this.text) {
//       const bbox = this.el.bbox();
//       const div = document.createElement('div');
//       div.style.width = bbox.width + 'px';
//       div.style.height = bbox.height + 'px';
//       div.style.background = 'transparent';
//       const input = document.createElement('input');
//       input.className = styles['inp'];
//       div.appendChild(input);
//       const foreignObject = this.group.foreignObject(bbox.width, bbox.height)
//         .attr({ x: bbox.x, y: bbox.y })
//         .add(div);
//       this.group.add(foreignObject);
//       this.text = input;
//       return
//     }
//     this.text.value = value;
//   }
//   setRect(width = 100, height = 45) {
//     const center = this.getCenter();
//     const rect = this.group.rect(width, height).attr({
//       rx: 5,
//       ry: 5,
//       x: center.getX(),
//       y: center.getY(),
//     });
//     this.el = rect;
//     this.setText()
//     return rect;
//   }
//   setIsEdit(value: boolean) {
//     this.isEdit = value;
//   }
//   init() {
//     this.setRect()
//     return this
//   }
//   makeEditable() {

//     this.text.focus();

//     this.text?.addEventListener('blur', () => {
//       // this.text.text(input.value);
//       // foreignObject.remove();
//     });
//   }
// }
