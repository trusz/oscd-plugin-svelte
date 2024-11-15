var Pt = Object.defineProperty;
var Lt = (t, n, r) => n in t ? Pt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[n] = r;
var j = (t, n, r) => Lt(t, typeof n != "symbol" ? n + "" : n, r);
const Mt = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Mt);
const It = 1, qt = 2, Bt = !1;
var Ut = Array.isArray, Vt = Array.from, Ht = Object.defineProperty, tt = Object.getOwnPropertyDescriptor;
const K = 2, _t = 4, z = 8, ct = 16, y = 32, I = 64, q = 128, L = 256, g = 512, J = 1024, B = 2048, N = 4096, U = 8192, $t = 16384, Q = 32768, jt = 1 << 18, Wt = 1 << 19;
function Yt() {
  throw new Error("effect_update_depth_exceeded");
}
function vt(t) {
  var n = t.children;
  if (n !== null) {
    t.children = null;
    for (var r = 0; r < n.length; r += 1) {
      var e = n[r];
      e.f & K ? dt(
        /** @type {Derived} */
        e
      ) : b(
        /** @type {Effect} */
        e
      );
    }
  }
}
function Gt(t) {
  var n, r = E;
  R(t.parent);
  try {
    vt(t), n = Tt(t);
  } finally {
    R(r);
  }
  return n;
}
function Kt(t) {
  var n = Gt(t), r = (C || t.f & q) && t.deps !== null ? B : g;
  F(t, r), t.equals(n) || (t.v = n, t.version = nn());
}
function dt(t) {
  vt(t), D(t, 0), F(t, U), t.v = t.children = t.deps = t.ctx = t.reactions = null;
}
function zt(t, n) {
  var r = n.last;
  r === null ? n.last = n.first = t : (r.next = t, t.prev = r, n.last = t);
}
function V(t, n, r, e = !0) {
  var l = (t & I) !== 0, i = E, u = {
    ctx: w,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: t | J,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: l ? null : i,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (r) {
    var o = k;
    try {
      et(!0), $(u), u.f |= $t;
    } catch (v) {
      throw b(u), v;
    } finally {
      et(o);
    }
  } else n !== null && sn(u);
  var a = r && u.deps === null && u.first === null && u.nodes_start === null && u.teardown === null && (u.f & Wt) === 0;
  if (!a && !l && e && (i !== null && zt(u, i), h !== null && h.f & K)) {
    var s = (
      /** @type {Derived} */
      h
    );
    (s.children ?? (s.children = [])).push(u);
  }
  return u;
}
function Jt(t) {
  const n = V(I, t, !0);
  return () => {
    b(n);
  };
}
function Qt(t) {
  return V(_t, t, !1);
}
function Xt(t) {
  return pt(t);
}
function pt(t, n = 0) {
  return V(z | ct | n, t, !0);
}
function W(t, n = !0) {
  return V(z | y, t, !0, n);
}
function ht(t) {
  var n = t.teardown;
  if (n !== null) {
    const r = h;
    S(null);
    try {
      n.call(null);
    } finally {
      S(r);
    }
  }
}
function Et(t) {
  var n = t.deriveds;
  if (n !== null) {
    t.deriveds = null;
    for (var r = 0; r < n.length; r += 1)
      dt(n[r]);
  }
}
function gt(t, n = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    var e = r.next;
    b(r, n), r = e;
  }
}
function Zt(t) {
  for (var n = t.first; n !== null; ) {
    var r = n.next;
    n.f & y || b(n), n = r;
  }
}
function b(t, n = !0) {
  var r = !1;
  if ((n || t.f & jt) && t.nodes_start !== null) {
    for (var e = t.nodes_start, l = t.nodes_end; e !== null; ) {
      var i = e === l ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ X(e)
      );
      e.remove(), e = i;
    }
    r = !0;
  }
  gt(t, n && !r), Et(t), D(t, 0), F(t, U);
  var u = t.transitions;
  if (u !== null)
    for (const a of u)
      a.stop();
  ht(t);
  var o = t.parent;
  o !== null && o.first !== null && mt(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.parent = t.fn = t.nodes_start = t.nodes_end = null;
}
function mt(t) {
  var n = t.parent, r = t.prev, e = t.next;
  r !== null && (r.next = e), e !== null && (e.prev = r), n !== null && (n.first === t && (n.first = e), n.last === t && (n.last = r));
}
function nt(t, n) {
  var r = [];
  wt(t, r, !0), tn(r, () => {
    b(t), n && n();
  });
}
function tn(t, n) {
  var r = t.length;
  if (r > 0) {
    var e = () => --r || n();
    for (var l of t)
      l.out(e);
  } else
    n();
}
function wt(t, n, r) {
  if (!(t.f & N)) {
    if (t.f ^= N, t.transitions !== null)
      for (const u of t.transitions)
        (u.is_global || r) && n.push(u);
    for (var e = t.first; e !== null; ) {
      var l = e.next, i = (e.f & Q) !== 0 || (e.f & y) !== 0;
      wt(e, n, i ? r : !1), e = l;
    }
  }
}
function rt(t) {
  xt(t, !0);
}
function xt(t, n) {
  if (t.f & N) {
    H(t) && $(t), t.f ^= N;
    for (var r = t.first; r !== null; ) {
      var e = r.next, l = (r.f & Q) !== 0 || (r.f & y) !== 0;
      xt(r, l ? n : !1), r = e;
    }
    if (t.transitions !== null)
      for (const i of t.transitions)
        (i.is_global || n) && i.in();
  }
}
let M = !1, k = !1;
function et(t) {
  k = t;
}
let Y = [], A = 0;
let h = null;
function S(t) {
  h = t;
}
let E = null;
function R(t) {
  E = t;
}
let p = null, d = 0, yt = 0, C = !1, w = null;
function nn() {
  return ++yt;
}
function H(t) {
  var u, o;
  var n = t.f;
  if (n & J)
    return !0;
  if (n & B) {
    var r = t.deps, e = (n & q) !== 0;
    if (r !== null) {
      var l;
      if (n & L) {
        for (l = 0; l < r.length; l++)
          ((u = r[l]).reactions ?? (u.reactions = [])).push(t);
        t.f ^= L;
      }
      for (l = 0; l < r.length; l++) {
        var i = r[l];
        if (H(
          /** @type {Derived} */
          i
        ) && Kt(
          /** @type {Derived} */
          i
        ), e && E !== null && !C && !((o = i == null ? void 0 : i.reactions) != null && o.includes(t)) && (i.reactions ?? (i.reactions = [])).push(t), i.version > t.version)
          return !0;
      }
    }
    e || F(t, g);
  }
  return !1;
}
function rn(t, n, r) {
  throw t;
}
function Tt(t) {
  var v;
  var n = p, r = d, e = h, l = C, i = w, u = t.f;
  p = /** @type {null | Value[]} */
  null, d = 0, h = u & (y | I) ? null : t, C = !k && (u & q) !== 0, w = t.ctx;
  try {
    var o = (
      /** @type {Function} */
      (0, t.fn)()
    ), a = t.deps;
    if (p !== null) {
      var s;
      if (D(t, d), a !== null && d > 0)
        for (a.length = d + p.length, s = 0; s < p.length; s++)
          a[d + s] = p[s];
      else
        t.deps = a = p;
      if (!C)
        for (s = d; s < a.length; s++)
          ((v = a[s]).reactions ?? (v.reactions = [])).push(t);
    } else a !== null && d < a.length && (D(t, d), a.length = d);
    return o;
  } finally {
    p = n, d = r, h = e, C = l, w = i;
  }
}
function en(t, n) {
  let r = n.reactions;
  if (r !== null) {
    var e = r.indexOf(t);
    if (e !== -1) {
      var l = r.length - 1;
      l === 0 ? r = n.reactions = null : (r[e] = r[l], r.pop());
    }
  }
  r === null && n.f & K && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (p === null || !p.includes(n)) && (F(n, B), n.f & (q | L) || (n.f ^= L), D(
    /** @type {Derived} **/
    n,
    0
  ));
}
function D(t, n) {
  var r = t.deps;
  if (r !== null)
    for (var e = n; e < r.length; e++)
      en(t, r[e]);
}
function $(t) {
  var n = t.f;
  if (!(n & U)) {
    F(t, g);
    var r = E;
    E = t;
    try {
      n & ct ? Zt(t) : gt(t), Et(t), ht(t);
      var e = Tt(t);
      t.teardown = typeof e == "function" ? e : null, t.version = yt;
    } catch (l) {
      rn(
        /** @type {Error} */
        l
      );
    } finally {
      E = r;
    }
  }
}
function ln() {
  A > 1e3 && (A = 0, Yt()), A++;
}
function un(t) {
  var n = t.length;
  if (n !== 0) {
    ln();
    var r = k;
    k = !0;
    try {
      for (var e = 0; e < n; e++) {
        var l = t[e];
        l.f & g || (l.f ^= g);
        var i = [];
        Ct(l, i), on(i);
      }
    } finally {
      k = r;
    }
  }
}
function on(t) {
  var n = t.length;
  if (n !== 0)
    for (var r = 0; r < n; r++) {
      var e = t[r];
      !(e.f & (U | N)) && H(e) && ($(e), e.deps === null && e.first === null && e.nodes_start === null && (e.teardown === null ? mt(e) : e.fn = null));
    }
}
function an() {
  if (M = !1, A > 1001)
    return;
  const t = Y;
  Y = [], un(t), M || (A = 0);
}
function sn(t) {
  M || (M = !0, queueMicrotask(an));
  for (var n = t; n.parent !== null; ) {
    n = n.parent;
    var r = n.f;
    if (r & (I | y)) {
      if (!(r & g)) return;
      n.f ^= g;
    }
  }
  Y.push(n);
}
function Ct(t, n) {
  var r = t.first, e = [];
  t: for (; r !== null; ) {
    var l = r.f, i = (l & y) !== 0, u = i && (l & g) !== 0;
    if (!u && !(l & N))
      if (l & z) {
        i ? r.f ^= g : H(r) && $(r);
        var o = r.first;
        if (o !== null) {
          r = o;
          continue;
        }
      } else l & _t && e.push(r);
    var a = r.next;
    if (a === null) {
      let _ = r.parent;
      for (; _ !== null; ) {
        if (t === _)
          break t;
        var s = _.next;
        if (s !== null) {
          r = s;
          continue t;
        }
        _ = _.parent;
      }
    }
    r = a;
  }
  for (var v = 0; v < e.length; v++)
    o = e[v], n.push(o), Ct(o, n);
}
const fn = ~(J | B | g);
function F(t, n) {
  t.f = t.f & fn | n;
}
function kt(t, n = !1, r) {
  w = {
    p: w,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  };
}
function Nt(t) {
  const n = w;
  if (n !== null) {
    const u = n.e;
    if (u !== null) {
      var r = E, e = h;
      n.e = null;
      try {
        for (var l = 0; l < u.length; l++) {
          var i = u[l];
          R(i.effect), S(i.reaction), Qt(i.fn);
        }
      } finally {
        R(r), S(e);
      }
    }
    w = n.p, n.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
var lt, St, Rt;
function _n() {
  if (lt === void 0) {
    lt = window;
    var t = Element.prototype, n = Node.prototype;
    St = tt(n, "firstChild").get, Rt = tt(n, "nextSibling").get, t.__click = void 0, t.__className = "", t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function cn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function G(t) {
  return St.call(t);
}
// @__NO_SIDE_EFFECTS__
function X(t) {
  return Rt.call(t);
}
function vn(t, n) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ G(
        /** @type {Node} */
        t
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ X(r) : r;
  }
}
function it(t, n = 1, r = !1) {
  let e = t;
  for (; n--; )
    e = /** @type {TemplateNode} */
    /* @__PURE__ */ X(e);
  return e;
}
const dn = /* @__PURE__ */ new Set(), ut = /* @__PURE__ */ new Set();
function P(t) {
  var Z;
  var n = this, r = (
    /** @type {Node} */
    n.ownerDocument
  ), e = t.type, l = ((Z = t.composedPath) == null ? void 0 : Z.call(t)) || [], i = (
    /** @type {null | Element} */
    l[0] || t.target
  ), u = 0, o = t.__root;
  if (o) {
    var a = l.indexOf(o);
    if (a !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var s = l.indexOf(n);
    if (s === -1)
      return;
    a <= s && (u = a);
  }
  if (i = /** @type {Element} */
  l[u] || t.target, i !== n) {
    Ht(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || r;
      }
    });
    var v = h, _ = E;
    S(null), R(null);
    try {
      for (var f, c = []; i !== null; ) {
        var m = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var x = i["__" + e];
          if (x !== void 0 && !/** @type {any} */
          i.disabled)
            if (Ut(x)) {
              var [Dt, ...Ot] = x;
              Dt.apply(i, [t, ...Ot]);
            } else
              x.call(i, t);
        } catch (O) {
          f ? c.push(O) : f = O;
        }
        if (t.cancelBubble || m === n || m === null)
          break;
        i = m;
      }
      if (f) {
        for (let O of c)
          queueMicrotask(() => {
            throw O;
          });
        throw f;
      }
    } finally {
      t.__root = n, delete t.currentTarget, S(v), R(_);
    }
  }
}
function pn(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function ot(t, n) {
  var r = (
    /** @type {Effect} */
    E
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function bt(t, n) {
  var r = (n & It) !== 0, e = (n & qt) !== 0, l, i = !t.startsWith("<!>");
  return () => {
    l === void 0 && (l = pn(i ? t : "<!>" + t), r || (l = /** @type {Node} */
    /* @__PURE__ */ G(l)));
    var u = (
      /** @type {TemplateNode} */
      e ? document.importNode(l, !0) : l.cloneNode(!0)
    );
    if (r) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ G(u)
      ), a = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      ot(o, a);
    } else
      ot(u, u);
    return u;
  };
}
function at(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
const hn = ["touchstart", "touchmove"];
function En(t) {
  return hn.includes(t);
}
function gn(t, n) {
  return mn(t, n);
}
const T = /* @__PURE__ */ new Map();
function mn(t, { target: n, anchor: r, props: e = {}, events: l, context: i, intro: u = !0 }) {
  _n();
  var o = /* @__PURE__ */ new Set(), a = (_) => {
    for (var f = 0; f < _.length; f++) {
      var c = _[f];
      if (!o.has(c)) {
        o.add(c);
        var m = En(c);
        n.addEventListener(c, P, { passive: m });
        var x = T.get(c);
        x === void 0 ? (document.addEventListener(c, P, { passive: m }), T.set(c, 1)) : T.set(c, x + 1);
      }
    }
  };
  a(Vt(dn)), ut.add(a);
  var s = void 0, v = Jt(() => {
    var _ = r ?? n.appendChild(cn());
    return W(() => {
      if (i) {
        kt({});
        var f = (
          /** @type {ComponentContext} */
          w
        );
        f.c = i;
      }
      l && (e.$$events = l), s = t(_, e) || {}, i && Nt();
    }), () => {
      var m;
      for (var f of o) {
        n.removeEventListener(f, P);
        var c = (
          /** @type {number} */
          T.get(f)
        );
        --c === 0 ? (document.removeEventListener(f, P), T.delete(f)) : T.set(f, c);
      }
      ut.delete(a), st.delete(s), _ !== r && ((m = _.parentNode) == null || m.removeChild(_));
    };
  });
  return st.set(s, v), s;
}
let st = /* @__PURE__ */ new WeakMap();
function wn(t, n, r, e = null, l = !1) {
  var i = t, u = null, o = null, a = null, s = l ? Q : 0;
  pt(() => {
    a !== (a = !!n()) && (a ? (u ? rt(u) : u = W(() => r(i)), o && nt(o, () => {
      o = null;
    })) : (o ? rt(o) : e && (o = W(() => e(i))), u && nt(u, () => {
      u = null;
    })));
  }, s);
}
function ft(t, n) {
  var r = t.__attributes ?? (t.__attributes = {});
  r.value === (r.value = n) || // @ts-expect-error
  // `progress` elements always need their value set when its `0`
  t.value === n && (n !== 0 || t.nodeName !== "PROGRESS") || (t.value = n);
}
const Ft = "new-oscd-plugin", At = "0.0.1";
var xn = /* @__PURE__ */ bt("<h2>Welcome to new-oscd-plugin</h2>"), yn = /* @__PURE__ */ bt('<!> <input type="hidden" name="package-name"> <input type="hidden" name="package-version">', 1);
function Tn(t, n) {
  kt(n, !0);
  var r = yn(), e = vn(r);
  wn(e, () => n.doc, (u) => {
    var o = xn();
    at(u, o);
  });
  var l = it(e, 2), i = it(l, 2);
  Xt(() => {
    ft(l, Ft), ft(i, At);
  }), at(t, r), Nt();
}
class Sn extends HTMLElement {
  constructor() {
    super(...arguments);
    j(this, "plugin");
    j(this, "_doc");
  }
  connectedCallback() {
    var e;
    this.attachShadow({ mode: "open" }), this.plugin = gn(Tn, {
      target: this.shadowRoot,
      props: {
        doc: this._doc,
        editCount: -1
      }
    });
    const r = Cn();
    (e = this.shadowRoot) == null || e.appendChild(r);
  }
  set doc(r) {
    this._doc = r, this.plugin && this.plugin.$set({ doc: r });
  }
  set editCount(r) {
    this.plugin && this.plugin.$set({ editCount: r });
  }
}
function Cn() {
  const t = `${Ft}-v${At}-style`, n = kn(), r = document.createElement("link");
  return r.rel = "stylesheet", r.type = "text/css", r.href = n, r.id = t, r;
}
function kn() {
  const t = new URL(import.meta.url), n = t.origin, r = t.pathname.split("/").slice(0, -1).filter(Boolean).join("/");
  return [n, r, "style.css"].filter(Boolean).join("/");
}
export {
  Sn as default
};
