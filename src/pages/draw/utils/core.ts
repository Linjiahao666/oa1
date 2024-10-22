import {
  SVG,
  extend as SVGextend,
  Element as SVGElement,
} from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import styles from "../styles/core.module.css";
const gap = {
  x: 20,
  y: 20,
};

const nodeArea = {
  width: 100,
  height: 45,
};

class composition {
  public item: any;
  constructor(item: any) {
    this.item = item;
  }
  put(parentx: number, parenty: number) {
    const bbox = this.item.bbox();
    const { width, height } = bbox;
    this.item?.move(parentx - width / 2, parenty - height / 2);
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
  }

  setY(y: number) {
    this.y = y;
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
  getLeafNum(): number {
    if (this.children.length === 0) {
      return 1;
    } else {
      return this.children.reduce((acc, item) => acc + item.getLeafNum(), 0);
    }
  }
  addComposition(c: composition) {
    this.compositions.push(c);
    c.put(this.x, this.y);
  }
  removeComposition(c: composition) {
    this.compositions = this.compositions.filter((item) => item !== c);
  }
}
export class Root {
  private root: Node;
  constructor(root: Node) {
    this.root = root;
  }
  getAccumulateLeafNum() {}
  // 排列虚拟节点的位置
  // 2-2节点的位置取决于在父节点的位置和叶子节点的个数
  // 例如根节点下是3个节点，那么2-2处在中心位置，但是2-1和2-3必须根据2-2叶子节点的个数腾出半数节点的位置
  put(node = this.root) {
    function odd(n: number) {
      return n % 2 === 1;
    }
    const children = node.getChildren();
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
            console.log(accUp);
            item.setY(
              node.y - (gap.y + nodeArea.height) * (mid - index + accUp)
            );
          } else if (index >= mid) {
            //下面的中心
            // mid = 2 index = 2 一个gap加上一个高度
            const accDown = leafs.slice(mid).reduce((total, cur, idx) => {
              if (idx === 0 || idx === leafs.length - 1) {
                return total + Math.ceil(cur / 2);
              } else {
                return total + cur;
              }
            }, 0);
            item.setY(
              node.y + (gap.y + nodeArea.height) * (index + 1 - mid + accDown)
            );
          }
        } else {
          // 奇数节点
          if (index < mid) {
            // mid = 1 index = 0 一个gap一个高度
            const accUp = leafs.slice(0, mid).reduce((total, cur, idx) => {
              if (idx === 0 || idx === mid - 1) {
                return total + Math.ceil(cur / 2);
              } else {
                return total + cur;
              }
            }, 0);
            item.setY(
              node.y - (gap.y + nodeArea.height) * (mid - index + accUp)
            );
          } else if (index > mid) {
            // mid = 1 index = 2 一个gap一个高度
            const accDown = leafs.slice(mid + 1).reduce((total, cur, idx) => {
              if (idx === 0 || idx === leafs.length - 1) {
                return total + Math.ceil(cur / 2);
              } else {
                return total + cur;
              }
            }, 0);
            item.setY(
              node.y + (gap.y + nodeArea.height) * (index - mid + accDown)
            );
          }
        }
        if (item.getChildren().length !== 0) {
          this.put(item);
        }
      });
    }
  }
}

function composify(target: any, propertyKey: any, descriptor: any) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    return new composition(result);
  };
  return descriptor;
}

export class Paper {
  public draw: any;
  public R: Root;
  public activeNode: Node;
  constructor(wrapper: string) {
    this.draw = SVG().addTo(wrapper).size("100%", "100%").group();
    this.draw.draggable();
    this.activeNode = new Node();
    this.R = new Root(this.activeNode);
    console.log(this.drawRect(100, 100));
  }
  @composify
  drawRect(x: number, y: number) {
    return this.draw
      .rect(x, y)
      .attr({
        rx: 5,
        ry: 5,
      })
      .fill("#c82")
      .stroke({ color: "#000", width: 1 });
  }
}
// export class Center {
//   private x: number;
//   private y: number;
//   private screenX: number;
//   private screenY: number;
//   constructor(wrapper: string) {
//     const clinetRect = document.querySelector(wrapper)?.getBoundingClientRect();
//     this.screenX = clinetRect?.width || 0;
//     this.screenY = clinetRect?.height || 0;
//     this.x = (this.screenX) * 0.25;
//     this.y = (this.screenY) * 0.5;
//   }
//   getX() {
//     return this.x;
//   }
//   getY() {
//     return this.y;
//   }
// }
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
