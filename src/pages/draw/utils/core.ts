import {
  SVG,
  extend as SVGextend,
  Element as SVGElement,
} from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import { ga } from './listen'
import styles from '../styles/core.module.css'
export interface DrawConfig {
  wrapper: string,
  color: string,
}
import { PaperConfig } from './config';

const { xGap, yGap } = PaperConfig;

export class Center {
  private x: number;
  private y: number;
  private screenX: number;
  private screenY: number;
  constructor(wrapper: string) {
    const clinetRect = document.querySelector(wrapper)?.getBoundingClientRect();
    this.screenX = clinetRect?.width || 0;
    this.screenY = clinetRect?.height || 0;
    this.x = (this.screenX) * 0.25;
    this.y = (this.screenY) * 0.5;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
export class Drawer {
  public static draw(node: Node) {
    return true;
  }
}
export class Paper {
  private draw: any;
  private group: any;
  private activeItem?: Node;
  private root?: Node;
  private center: Center
  constructor(config: DrawConfig) {
    const { wrapper, color } = config;
    this.draw = SVG().addTo(wrapper).size("100%", "100%");
    this.group = this.draw.group();
    this.group.draggable();
    this.group.fill(color);
    this.center = new Center(wrapper);
    // this.group.draggable();
    this.initDrawEvent();
    this.initGlobalEvent();
  }
  init() {
    this.root = new Node({
      paper: this,
    }).init()

  }
  getDraw() {
    return this.draw;
  }
  getCenter() {
    return this.center;
  }
  getGroup() {
    return this.group;
  }
  initGlobalEvent() {
    ga("keydown", (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && this.activeItem) {
        this.activeItem.getEl().remove();
      }
      else if (e.ctrlKey && e.key === "z") {
        console.log("cancel");
      }
      else if (e.key === "a" && this.activeItem) {
        this.append();
      }
      else if (e.key === 'Enter' && this.activeItem) {
        this.sibling();
      }
    });
  }
  initDrawEvent() {
    this.draw.on("click", (event: any) => {
      if (event.target.instance !== 'rect') {
        this.changeActive();
      }
    });
  }

  changeActive(item?: any) {
    const el = item?.getEl();
    const activeEl = this.activeItem?.getEl();
    activeEl && activeEl.stroke({ color: '#fff', width: 0 });
    if (!item) {
      this.activeItem?.setActive(false)
      this.activeItem = undefined;
      return
    }
    this.activeItem = item;
    el.stroke({ color: '#3bf', width: 2 });
  }

  son() {
    const node = new Node({
      paper: this,
      parent: this.activeItem
    }).setDepth(this.activeItem?.getDepth() as number + 1).init()
    this.changeActive(node)
    Drawer.draw(this.root as roo)
  }
  sibling() {
    const node = new Node({
      paper: this,
      parent: this.activeItem?.getParent()
    }).setDepth(this.activeItem?.getDepth() || 0).setNo(this.activeItem?.getNo() as number + 1).init()
    this.changeActive(node)
  }
  append() {
    this.son()
  }
}
interface NodeConfig {
  el?: any,
  parent?: Node,
  children?: Node[],
  isActive?: boolean,
  paper: Paper,
}
export class Node {
  private isActive: boolean;
  private parent?: Node;
  private chilren: Node[];
  private el?: any;
  private text: any;
  private group: any;
  private paper: Paper;
  private isEdit: boolean = false;
  private depth = 0;
  private no = 0;
  constructor(config: NodeConfig) {
    const { isActive, parent, children, el, paper } = config;
    this.isActive = isActive || false;
    this.setParent(parent as Node);
    this.chilren = children || new Array<Node>();
    this.el = el;
    this.paper = paper;
    this.group = paper.getDraw().group();
    this.initGroup();
    this.initNodeEvent();
  }
  setEl(el: any) {
    this.el = el
    return this
  }
  getEl() {
    return this.el
  }
  getParent() {
    return this.parent;
  }
  getPosition() {
    return this.el.bbox();
  }
  getChildren() {
    return this.chilren;
  }
  setParent(parent: Node) {
    if (!parent) return this;
    this.parent = parent;
    parent.chilren.push(this)
    return this
  }
  setActive(value: boolean) {
    this.isActive = value;
    if (value) {
      this.paper.changeActive(this)
    }
    return this
  }
  getCenter() {
    return this.paper.getCenter()
  }
  getRect() {
    return this.group
  }
  getDraw() {
    return this.paper.getDraw()
  }
  changeActive() {
    this.isActive = !this.isActive;
    this.paper.changeActive(this)
  }
  initNodeEvent() {
    this.group.on("click", (event: any) => {
      event.stopPropagation();
      this.changeActive()
    });
    this.group.on("dblclick", (event: any) => {
      event.stopPropagation();
      this.makeEditable();
    });
  }
  initGroup() {
    this.paper.getGroup().add(this.group)
  }
  getDepth(): number {
    return this.depth;
  }
  setDepth(value: number) {
    this.depth = value;
    return this
  }
  getNo(): number {
    return this.no;
  }
  setNo(no: number) {
    this.no = no
    return this;
  }
  getText() {
    return this.text.value;
  }
  setText(value?: string) {
    if (!this.text) {
      const bbox = this.el.bbox();
      const div = document.createElement('div');
      div.style.width = bbox.width + 'px';
      div.style.height = bbox.height + 'px';
      div.style.background = 'transparent';
      const input = document.createElement('input');
      input.className = styles['inp'];
      div.appendChild(input);
      const foreignObject = this.group.foreignObject(bbox.width, bbox.height)
        .attr({ x: bbox.x, y: bbox.y })
        .add(div);
      this.group.add(foreignObject);
      this.text = input;
      return
    }
    this.text.value = value;
  }
  setRect(width = 100, height = 45) {
    const center = this.getCenter();
    const rect = this.group.rect(width, height).attr({
      rx: 5,
      ry: 5,
      x: center.getX(),
      y: center.getY(),
    });
    this.el = rect;
    this.setText()
    return rect;
  }
  setIsEdit(value: boolean) {
    this.isEdit = value;
  }
  init() {
    this.setRect()
    return this
  }
  makeEditable() {

    this.text.focus();

    this.text?.addEventListener('blur', () => {
      // this.text.text(input.value);
      // foreignObject.remove();
    });
  }
}