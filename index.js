var mt = (t) => {
  throw TypeError(t);
};
var nn = (t, n, r) => n.has(t) || mt("Cannot " + r);
var ot = (t, n, r) => (nn(t, n, "read from private field"), r ? r.call(t) : n.get(t)), yt = (t, n, r) => n.has(t) ? mt("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, r);
const E = Symbol(), rn = ["touchstart", "touchmove"];
function en(t) {
  return rn.includes(t);
}
const ln = !1;
var Ct = Array.isArray, un = Array.from, sn = Object.defineProperty, H = Object.getOwnPropertyDescriptor, on = Object.prototype, an = Array.prototype, fn = Object.getPrototypeOf;
const k = 2, At = 4, ht = 8, pt = 16, R = 32, et = 64, ft = 128, G = 256, tt = 512, m = 1024, D = 2048, Z = 4096, B = 8192, V = 16384, vn = 32768, wt = 65536, _n = 1 << 19, cn = 1 << 20, at = Symbol("$state");
function dn(t) {
  return t === this.v;
}
function hn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function pn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function wn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function En() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function gn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let mn = !1;
function T(t, n) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: dn,
    version: 0
  };
  return r;
}
function yn(t) {
  return /* @__PURE__ */ xn(T(t));
}
// @__NO_SIDE_EFFECTS__
function xn(t) {
  return w !== null && w.f & k && (x === null ? Fn([t]) : x.push(t)), t;
}
function N(t, n) {
  return w !== null && In() && w.f & (k | pt) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (x === null || !x.includes(t)) && gn(), bn(t, n);
}
function bn(t, n) {
  return t.equals(n) || (t.v = n, t.version = $t(), Dt(t, D), d !== null && d.f & m && !(d.f & R) && (p !== null && p.includes(t) ? (S(d, D), st(d)) : O === null ? Mn([t]) : O.push(t))), n;
}
function Dt(t, n) {
  var r = t.reactions;
  if (r !== null)
    for (var e = r.length, l = 0; l < e; l++) {
      var i = r[l], s = i.f;
      s & D || (S(i, n), s & (m | G) && (s & k ? Dt(
        /** @type {Derived} */
        i,
        Z
      ) : st(
        /** @type {Effect} */
        i
      )));
    }
}
function C(t, n = null, r) {
  if (typeof t != "object" || t === null || at in t)
    return t;
  const e = fn(t);
  if (e !== on && e !== an)
    return t;
  var l = /* @__PURE__ */ new Map(), i = Ct(t), s = T(0);
  i && l.set("length", T(
    /** @type {any[]} */
    t.length
  ));
  var _;
  return new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(f, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && pn();
        var a = l.get(u);
        return a === void 0 ? (a = T(o.value), l.set(u, a)) : N(a, C(o.value, _)), !0;
      },
      deleteProperty(f, u) {
        var o = l.get(u);
        if (o === void 0)
          u in f && l.set(u, T(E));
        else {
          if (i && typeof u == "string") {
            var a = (
              /** @type {Source<number>} */
              l.get("length")
            ), v = Number(u);
            Number.isInteger(v) && v < a.v && N(a, v);
          }
          N(o, E), xt(s);
        }
        return !0;
      },
      get(f, u, o) {
        var h;
        if (u === at)
          return t;
        var a = l.get(u), v = u in f;
        if (a === void 0 && (!v || (h = H(f, u)) != null && h.writable) && (a = T(C(v ? f[u] : E, _)), l.set(u, a)), a !== void 0) {
          var c = Y(a);
          return c === E ? void 0 : c;
        }
        return Reflect.get(f, u, o);
      },
      getOwnPropertyDescriptor(f, u) {
        var o = Reflect.getOwnPropertyDescriptor(f, u);
        if (o && "value" in o) {
          var a = l.get(u);
          a && (o.value = Y(a));
        } else if (o === void 0) {
          var v = l.get(u), c = v == null ? void 0 : v.v;
          if (v !== void 0 && c !== E)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return o;
      },
      has(f, u) {
        var c;
        if (u === at)
          return !0;
        var o = l.get(u), a = o !== void 0 && o.v !== E || Reflect.has(f, u);
        if (o !== void 0 || d !== null && (!a || (c = H(f, u)) != null && c.writable)) {
          o === void 0 && (o = T(a ? C(f[u], _) : E), l.set(u, o));
          var v = Y(o);
          if (v === E)
            return !1;
        }
        return a;
      },
      set(f, u, o, a) {
        var P;
        var v = l.get(u), c = u in f;
        if (i && u === "length")
          for (var h = o; h < /** @type {Source<number>} */
          v.v; h += 1) {
            var y = l.get(h + "");
            y !== void 0 ? N(y, E) : h in f && (y = T(E), l.set(h + "", y));
          }
        v === void 0 ? (!c || (P = H(f, u)) != null && P.writable) && (v = T(void 0), N(v, C(o, _)), l.set(u, v)) : (c = v.v !== E, N(v, C(o, _)));
        var M = Reflect.getOwnPropertyDescriptor(f, u);
        if (M != null && M.set && M.set.call(a, o), !c) {
          if (i && typeof u == "string") {
            var J = (
              /** @type {Source<number>} */
              l.get("length")
            ), I = Number(u);
            Number.isInteger(I) && I >= J.v && N(J, I + 1);
          }
          xt(s);
        }
        return !0;
      },
      ownKeys(f) {
        Y(s);
        var u = Reflect.ownKeys(f).filter((v) => {
          var c = l.get(v);
          return c === void 0 || c.v !== E;
        });
        for (var [o, a] of l)
          a.v !== E && !(o in f) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        wn();
      }
    }
  );
}
function xt(t, n = 1) {
  N(t, t.v + n);
}
var bt, Ft, Mt;
function Tn() {
  if (bt === void 0) {
    bt = window;
    var t = Element.prototype, n = Node.prototype;
    Ft = H(n, "firstChild").get, Mt = H(n, "nextSibling").get, t.__click = void 0, t.__className = "", t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function Nn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function vt(t) {
  return Ft.call(t);
}
// @__NO_SIDE_EFFECTS__
function Et(t) {
  return Mt.call(t);
}
function kn(t, n) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ vt(
        /** @type {Node} */
        t
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ Et(r) : r;
  }
}
function Tt(t, n = 1, r = !1) {
  let e = t;
  for (; n--; )
    e = /** @type {TemplateNode} */
    /* @__PURE__ */ Et(e);
  return e;
}
function It(t) {
  var n = t.children;
  if (n !== null) {
    t.children = null;
    for (var r = 0; r < n.length; r += 1) {
      var e = n[r];
      e.f & k ? gt(
        /** @type {Derived} */
        e
      ) : F(
        /** @type {Effect} */
        e
      );
    }
  }
}
function Rn(t) {
  for (var n = t.parent; n !== null; ) {
    if (!(n.f & k))
      return (
        /** @type {Effect} */
        n
      );
    n = n.parent;
  }
  return null;
}
function Lt(t) {
  var n, r = d;
  j(Rn(t));
  try {
    It(t), n = Gt(t);
  } finally {
    j(r);
  }
  return n;
}
function qt(t) {
  var n = Lt(t), r = (A || t.f & G) && t.deps !== null ? Z : m;
  S(t, r), t.equals(n) || (t.v = n, t.version = $t());
}
function gt(t) {
  It(t), W(t, 0), S(t, V), t.v = t.children = t.deps = t.ctx = t.reactions = null;
}
function Sn(t, n) {
  var r = n.last;
  r === null ? n.last = n.first = t : (r.next = t, t.prev = r, n.last = t);
}
function lt(t, n, r, e = !0) {
  var l = (t & et) !== 0, i = d, s = {
    ctx: b,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: t | D,
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
    var _ = q;
    try {
      kt(!0), ut(s), s.f |= vn;
    } catch (o) {
      throw F(s), o;
    } finally {
      kt(_);
    }
  } else n !== null && st(s);
  var f = r && s.deps === null && s.first === null && s.nodes_start === null && s.teardown === null && (s.f & cn) === 0;
  if (!f && !l && e && (i !== null && Sn(s, i), w !== null && w.f & k)) {
    var u = (
      /** @type {Derived} */
      w
    );
    (u.children ?? (u.children = [])).push(s);
  }
  return s;
}
function On(t) {
  const n = lt(et, t, !0);
  return (r = {}) => new Promise((e) => {
    r.outro ? ct(n, () => {
      F(n), e(void 0);
    }) : (F(n), e(void 0));
  });
}
function Pn(t) {
  return lt(At, t, !1);
}
function Cn(t) {
  return Bt(t);
}
function Bt(t, n = 0) {
  return lt(ht | pt | n, t, !0);
}
function _t(t, n = !0) {
  return lt(ht | R, t, !0, n);
}
function Ut(t) {
  var n = t.teardown;
  if (n !== null) {
    const r = w;
    U(null);
    try {
      n.call(null);
    } finally {
      U(r);
    }
  }
}
function jt(t) {
  var n = t.deriveds;
  if (n !== null) {
    t.deriveds = null;
    for (var r = 0; r < n.length; r += 1)
      gt(n[r]);
  }
}
function Vt(t, n = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    var e = r.next;
    F(r, n), r = e;
  }
}
function An(t) {
  for (var n = t.first; n !== null; ) {
    var r = n.next;
    n.f & R || F(n), n = r;
  }
}
function F(t, n = !0) {
  var r = !1;
  if ((n || t.f & _n) && t.nodes_start !== null) {
    for (var e = t.nodes_start, l = t.nodes_end; e !== null; ) {
      var i = e === l ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Et(e)
      );
      e.remove(), e = i;
    }
    r = !0;
  }
  Vt(t, n && !r), jt(t), W(t, 0), S(t, V);
  var s = t.transitions;
  if (s !== null)
    for (const f of s)
      f.stop();
  Ut(t);
  var _ = t.parent;
  _ !== null && _.first !== null && Yt(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Yt(t) {
  var n = t.parent, r = t.prev, e = t.next;
  r !== null && (r.next = e), e !== null && (e.prev = r), n !== null && (n.first === t && (n.first = e), n.last === t && (n.last = r));
}
function ct(t, n) {
  var r = [];
  Ht(t, r, !0), Dn(r, () => {
    F(t), n && n();
  });
}
function Dn(t, n) {
  var r = t.length;
  if (r > 0) {
    var e = () => --r || n();
    for (var l of t)
      l.out(e);
  } else
    n();
}
function Ht(t, n, r) {
  if (!(t.f & B)) {
    if (t.f ^= B, t.transitions !== null)
      for (const s of t.transitions)
        (s.is_global || r) && n.push(s);
    for (var e = t.first; e !== null; ) {
      var l = e.next, i = (e.f & wt) !== 0 || (e.f & R) !== 0;
      Ht(e, n, i ? r : !1), e = l;
    }
  }
}
function Nt(t) {
  Kt(t, !0);
}
function Kt(t, n) {
  if (t.f & B) {
    z(t) && ut(t), t.f ^= B;
    for (var r = t.first; r !== null; ) {
      var e = r.next, l = (r.f & wt) !== 0 || (r.f & R) !== 0;
      Kt(r, l ? n : !1), r = e;
    }
    if (t.transitions !== null)
      for (const i of t.transitions)
        (i.is_global || n) && i.in();
  }
}
let X = !1, nt = !1, rt = null, q = !1;
function kt(t) {
  q = t;
}
let dt = [], K = 0;
let w = null;
function U(t) {
  w = t;
}
let d = null;
function j(t) {
  d = t;
}
let x = null;
function Fn(t) {
  x = t;
}
let p = null, g = 0, O = null;
function Mn(t) {
  O = t;
}
let Wt = 0, A = !1, b = null;
function $t() {
  return ++Wt;
}
function In() {
  return !mn;
}
function z(t) {
  var s, _;
  var n = t.f;
  if (n & D)
    return !0;
  if (n & Z) {
    var r = t.deps, e = (n & G) !== 0;
    if (r !== null) {
      var l;
      if (n & tt) {
        for (l = 0; l < r.length; l++)
          ((s = r[l]).reactions ?? (s.reactions = [])).push(t);
        t.f ^= tt;
      }
      for (l = 0; l < r.length; l++) {
        var i = r[l];
        if (z(
          /** @type {Derived} */
          i
        ) && qt(
          /** @type {Derived} */
          i
        ), e && d !== null && !A && !((_ = i == null ? void 0 : i.reactions) != null && _.includes(t)) && (i.reactions ?? (i.reactions = [])).push(t), i.version > t.version)
          return !0;
      }
    }
    (!e || d !== null && !A) && S(t, m);
  }
  return !1;
}
function Ln(t, n) {
  for (var r = n; r !== null; ) {
    if (r.f & ft)
      try {
        r.fn(t);
        return;
      } catch {
        r.f ^= ft;
      }
    r = r.parent;
  }
  throw X = !1, t;
}
function qn(t) {
  return (t.f & V) === 0 && (t.parent === null || (t.parent.f & ft) === 0);
}
function it(t, n, r, e) {
  if (X) {
    if (r === null && (X = !1), qn(n))
      throw t;
    return;
  }
  r !== null && (X = !0);
  {
    Ln(t, n);
    return;
  }
}
function Gt(t) {
  var v;
  var n = p, r = g, e = O, l = w, i = A, s = x, _ = b, f = t.f;
  p = /** @type {null | Value[]} */
  null, g = 0, O = null, w = f & (R | et) ? null : t, A = !q && (f & G) !== 0, x = null, b = t.ctx;
  try {
    var u = (
      /** @type {Function} */
      (0, t.fn)()
    ), o = t.deps;
    if (p !== null) {
      var a;
      if (W(t, g), o !== null && g > 0)
        for (o.length = g + p.length, a = 0; a < p.length; a++)
          o[g + a] = p[a];
      else
        t.deps = o = p;
      if (!A)
        for (a = g; a < o.length; a++)
          ((v = o[a]).reactions ?? (v.reactions = [])).push(t);
    } else o !== null && g < o.length && (W(t, g), o.length = g);
    return u;
  } finally {
    p = n, g = r, O = e, w = l, A = i, x = s, b = _;
  }
}
function Bn(t, n) {
  let r = n.reactions;
  if (r !== null) {
    var e = r.indexOf(t);
    if (e !== -1) {
      var l = r.length - 1;
      l === 0 ? r = n.reactions = null : (r[e] = r[l], r.pop());
    }
  }
  r === null && n.f & k && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (p === null || !p.includes(n)) && (S(n, Z), n.f & (G | tt) || (n.f ^= tt), W(
    /** @type {Derived} **/
    n,
    0
  ));
}
function W(t, n) {
  var r = t.deps;
  if (r !== null)
    for (var e = n; e < r.length; e++)
      Bn(t, r[e]);
}
function ut(t) {
  var n = t.f;
  if (!(n & V)) {
    S(t, m);
    var r = d, e = b;
    d = t;
    try {
      n & pt ? An(t) : Vt(t), jt(t), Ut(t);
      var l = Gt(t);
      t.teardown = typeof l == "function" ? l : null, t.version = Wt;
    } catch (i) {
      it(i, t, r, e || t.ctx);
    } finally {
      d = r;
    }
  }
}
function Un() {
  if (K > 1e3) {
    K = 0;
    try {
      hn();
    } catch (t) {
      if (rt !== null)
        it(t, rt, null);
      else
        throw t;
    }
  }
  K++;
}
function jn(t) {
  var n = t.length;
  if (n !== 0) {
    Un();
    var r = q;
    q = !0;
    try {
      for (var e = 0; e < n; e++) {
        var l = t[e];
        l.f & m || (l.f ^= m);
        var i = [];
        Zt(l, i), Vn(i);
      }
    } finally {
      q = r;
    }
  }
}
function Vn(t) {
  var n = t.length;
  if (n !== 0)
    for (var r = 0; r < n; r++) {
      var e = t[r];
      if (!(e.f & (V | B)))
        try {
          z(e) && (ut(e), e.deps === null && e.first === null && e.nodes_start === null && (e.teardown === null ? Yt(e) : e.fn = null));
        } catch (l) {
          it(l, e, null, e.ctx);
        }
    }
}
function Yn() {
  if (nt = !1, K > 1001)
    return;
  const t = dt;
  dt = [], jn(t), nt || (K = 0, rt = null);
}
function st(t) {
  nt || (nt = !0, queueMicrotask(Yn)), rt = t;
  for (var n = t; n.parent !== null; ) {
    n = n.parent;
    var r = n.f;
    if (r & (et | R)) {
      if (!(r & m)) return;
      n.f ^= m;
    }
  }
  dt.push(n);
}
function Zt(t, n) {
  var r = t.first, e = [];
  t: for (; r !== null; ) {
    var l = r.f, i = (l & R) !== 0, s = i && (l & m) !== 0, _ = r.next;
    if (!s && !(l & B))
      if (l & ht) {
        if (i)
          r.f ^= m;
        else
          try {
            z(r) && ut(r);
          } catch (a) {
            it(a, r, null, r.ctx);
          }
        var f = r.first;
        if (f !== null) {
          r = f;
          continue;
        }
      } else l & At && e.push(r);
    if (_ === null) {
      let a = r.parent;
      for (; a !== null; ) {
        if (t === a)
          break t;
        var u = a.next;
        if (u !== null) {
          r = u;
          continue t;
        }
        a = a.parent;
      }
    }
    r = _;
  }
  for (var o = 0; o < e.length; o++)
    f = e[o], n.push(f), Zt(f, n);
}
function Y(t) {
  var o;
  var n = t.f, r = (n & k) !== 0;
  if (r && n & V) {
    var e = Lt(
      /** @type {Derived} */
      t
    );
    return gt(
      /** @type {Derived} */
      t
    ), e;
  }
  if (w !== null) {
    x !== null && x.includes(t) && En();
    var l = w.deps;
    p === null && l !== null && l[g] === t ? g++ : p === null ? p = [t] : p.push(t), O !== null && d !== null && d.f & m && !(d.f & R) && O.includes(t) && (S(d, D), st(d));
  } else if (r && /** @type {Derived} */
  t.deps === null)
    for (var i = (
      /** @type {Derived} */
      t
    ), s = i.parent, _ = i; s !== null; )
      if (s.f & k) {
        var f = (
          /** @type {Derived} */
          s
        );
        _ = f, s = f.parent;
      } else {
        var u = (
          /** @type {Effect} */
          s
        );
        (o = u.deriveds) != null && o.includes(_) || (u.deriveds ?? (u.deriveds = [])).push(_);
        break;
      }
  return r && (i = /** @type {Derived} */
  t, z(i) && qt(i)), t.v;
}
const Hn = ~(D | Z | m);
function S(t, n) {
  t.f = t.f & Hn | n;
}
function zt(t, n = !1, r) {
  b = {
    p: b,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  };
}
function Jt(t) {
  const n = b;
  if (n !== null) {
    const s = n.e;
    if (s !== null) {
      var r = d, e = w;
      n.e = null;
      try {
        for (var l = 0; l < s.length; l++) {
          var i = s[l];
          j(i.effect), U(i.reaction), Pn(i.fn);
        }
      } finally {
        j(r), U(e);
      }
    }
    b = n.p, n.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
const Kn = /* @__PURE__ */ new Set(), Rt = /* @__PURE__ */ new Set();
function Q(t) {
  var I;
  var n = this, r = (
    /** @type {Node} */
    n.ownerDocument
  ), e = t.type, l = ((I = t.composedPath) == null ? void 0 : I.call(t)) || [], i = (
    /** @type {null | Element} */
    l[0] || t.target
  ), s = 0, _ = t.__root;
  if (_) {
    var f = l.indexOf(_);
    if (f !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var u = l.indexOf(n);
    if (u === -1)
      return;
    f <= u && (s = f);
  }
  if (i = /** @type {Element} */
  l[s] || t.target, i !== n) {
    sn(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || r;
      }
    });
    var o = w, a = d;
    U(null), j(null);
    try {
      for (var v, c = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var y = i["__" + e];
          if (y !== void 0 && !/** @type {any} */
          i.disabled)
            if (Ct(y)) {
              var [M, ...J] = y;
              M.apply(i, [t, ...J]);
            } else
              y.call(i, t);
        } catch (P) {
          v ? c.push(P) : v = P;
        }
        if (t.cancelBubble || h === n || h === null)
          break;
        i = h;
      }
      if (v) {
        for (let P of c)
          queueMicrotask(() => {
            throw P;
          });
        throw v;
      }
    } finally {
      t.__root = n, delete t.currentTarget, U(o), j(a);
    }
  }
}
function Wn(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function St(t, n) {
  var r = (
    /** @type {Effect} */
    d
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function Qt(t, n) {
  var r = (n & 1) !== 0, e = (n & 2) !== 0, l, i = !t.startsWith("<!>");
  return () => {
    l === void 0 && (l = Wn(i ? t : "<!>" + t), r || (l = /** @type {Node} */
    /* @__PURE__ */ vt(l)));
    var s = (
      /** @type {TemplateNode} */
      e ? document.importNode(l, !0) : l.cloneNode(!0)
    );
    if (r) {
      var _ = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ vt(s)
      ), f = (
        /** @type {TemplateNode} */
        s.lastChild
      );
      St(_, f);
    } else
      St(s, s);
    return s;
  };
}
function Ot(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
function $n(t, n) {
  return Gn(t, n);
}
const L = /* @__PURE__ */ new Map();
function Gn(t, { target: n, anchor: r, props: e = {}, events: l, context: i, intro: s = !0 }) {
  Tn();
  var _ = /* @__PURE__ */ new Set(), f = (a) => {
    for (var v = 0; v < a.length; v++) {
      var c = a[v];
      if (!_.has(c)) {
        _.add(c);
        var h = en(c);
        n.addEventListener(c, Q, { passive: h });
        var y = L.get(c);
        y === void 0 ? (document.addEventListener(c, Q, { passive: h }), L.set(c, 1)) : L.set(c, y + 1);
      }
    }
  };
  f(un(Kn)), Rt.add(f);
  var u = void 0, o = On(() => {
    var a = r ?? n.appendChild(Nn());
    return _t(() => {
      if (i) {
        zt({});
        var v = (
          /** @type {ComponentContext} */
          b
        );
        v.c = i;
      }
      l && (e.$$events = l), u = t(a, e) || {}, i && Jt();
    }), () => {
      var h;
      for (var v of _) {
        n.removeEventListener(v, Q);
        var c = (
          /** @type {number} */
          L.get(v)
        );
        --c === 0 ? (document.removeEventListener(v, Q), L.delete(v)) : L.set(v, c);
      }
      Rt.delete(f), a !== r && ((h = a.parentNode) == null || h.removeChild(a));
    };
  });
  return Zn.set(u, o), u;
}
let Zn = /* @__PURE__ */ new WeakMap();
function zn(t, n, r = !1) {
  var e = t, l = null, i = null, s = E, _ = r ? wt : 0, f = !1;
  const u = (a, v = !0) => {
    f = !0, o(v, a);
  }, o = (a, v) => {
    s !== (s = a) && (s ? (l ? Nt(l) : v && (l = _t(() => v(e))), i && ct(i, () => {
      i = null;
    })) : (i ? Nt(i) : v && (i = _t(() => v(e))), l && ct(l, () => {
      l = null;
    })));
  };
  Bt(() => {
    f = !1, n(u), f || o(null, null);
  }, _);
}
function Pt(t, n) {
  var r = t.__attributes ?? (t.__attributes = {});
  r.value === (r.value = // treat null and undefined the same for the initial value
  n ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when its `0`
  t.value === n && (n !== 0 || t.nodeName !== "PROGRESS") || (t.value = n);
}
const Jn = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Jn);
const Xt = "new-oscd-plugin", tn = "0.0.1";
var Qn = /* @__PURE__ */ Qt("<h2>Welcome to new-oscd-plugin</h2>"), Xn = /* @__PURE__ */ Qt('<!> <input type="hidden" name="package-name"> <input type="hidden" name="package-version">', 1);
function tr(t, n) {
  zt(n, !0);
  var r = Xn(), e = kn(r);
  {
    var l = (_) => {
      var f = Qn();
      Ot(_, f);
    };
    zn(e, (_) => {
      n.doc && _(l);
    });
  }
  var i = Tt(e, 2), s = Tt(i, 2);
  Cn(() => {
    Pt(i, Xt), Pt(s, tn);
  }), Ot(t, r), Jt();
}
var $;
class lr extends HTMLElement {
  constructor() {
    super(...arguments);
    yt(this, $, yn(C({ doc: void 0, editCount: -1 })));
  }
  get props() {
    return Y(ot(this, $));
  }
  set props(r) {
    N(ot(this, $), C(r));
  }
  connectedCallback() {
    var e;
    this.attachShadow({ mode: "open" }), $n(tr, { target: this.shadowRoot, props: this.props });
    const r = nr();
    (e = this.shadowRoot) == null || e.appendChild(r);
  }
  set doc(r) {
    this.props.doc = r;
  }
  set editCount(r) {
    this.props.editCount = r;
  }
}
$ = new WeakMap();
function nr() {
  const t = `${Xt}-v${tn}-style`, n = rr(), r = document.createElement("link");
  return r.rel = "stylesheet", r.type = "text/css", r.href = n, r.id = t, r;
}
function rr() {
  const t = new URL(import.meta.url), n = t.origin, r = t.pathname.split("/").slice(0, -1).filter(Boolean).join("/");
  return [n, r, "style.css"].filter(Boolean).join("/");
}
export {
  lr as default
};
