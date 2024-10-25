import { Node, Root } from "./core.ts";

const _11 = new Node();
_11.setX(0);
_11.setY(0);
const _21 = new Node();
_21.setParent(_11);

const _31 = new Node();
_31.setParent(_21);
const _32 = new Node();
_32.setParent(_21);
const _33 = new Node();
_33.setParent(_21);

const _41 = new Node();
_41.setParent(_31);

const _22 = new Node();
_22.setParent(_11);

const _23 = new Node();
_23.setParent(_11);

const _34 = new Node();
_34.setParent(_22);

const _35 = new Node();
_35.setParent(_23);
const _36 = new Node();
_36.setParent(_23);

const _37 = new Node();
_37.setParent(_23);

const r = new Root(_11);
console.log(r.put());
export { _11 };