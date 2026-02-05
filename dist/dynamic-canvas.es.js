import ne, { createContext as hr, useState as Y, useEffect as Pe, useContext as mr, useRef as br } from "react";
import { Check as gr, Copy as xr } from "lucide-react";
var te = { exports: {} }, V = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function yr() {
  if (Oe) return V;
  Oe = 1;
  var i = ne, n = Symbol.for("react.element"), o = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, f = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(x, h, T) {
    var p, R = {}, S = null, P = null;
    T !== void 0 && (S = "" + T), h.key !== void 0 && (S = "" + h.key), h.ref !== void 0 && (P = h.ref);
    for (p in h) s.call(h, p) && !g.hasOwnProperty(p) && (R[p] = h[p]);
    if (x && x.defaultProps) for (p in h = x.defaultProps, h) R[p] === void 0 && (R[p] = h[p]);
    return { $$typeof: n, type: x, key: S, ref: P, props: R, _owner: f.current };
  }
  return V.Fragment = o, V.jsx = y, V.jsxs = y, V;
}
var U = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function Rr() {
  return ke || (ke = 1, process.env.NODE_ENV !== "production" && function() {
    var i = ne, n = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), x = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), N = Symbol.iterator, $ = "@@iterator";
    function O(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = N && e[N] || e[$];
      return typeof r == "function" ? r : null;
    }
    var j = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        $e("error", e, t);
      }
    }
    function $e(e, r, t) {
      {
        var a = j.ReactDebugCurrentFrame, d = a.getStackAddendum();
        d !== "" && (r += "%s", t = t.concat([d]));
        var v = t.map(function(u) {
          return String(u);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var Ae = !1, Fe = !1, Ie = !1, We = !1, Me = !1, ae;
    ae = Symbol.for("react.module.reference");
    function Le(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === s || e === g || Me || e === f || e === T || e === p || We || e === P || Ae || Fe || Ie || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === R || e.$$typeof === y || e.$$typeof === x || e.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function Ye(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var d = r.displayName || r.name || "";
      return d !== "" ? t + "(" + d + ")" : t;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function D(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case s:
          return "Fragment";
        case o:
          return "Portal";
        case g:
          return "Profiler";
        case f:
          return "StrictMode";
        case T:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case x:
            var r = e;
            return oe(r) + ".Consumer";
          case y:
            var t = e;
            return oe(t._context) + ".Provider";
          case h:
            return Ye(e, e.render, "ForwardRef");
          case R:
            var a = e.displayName || null;
            return a !== null ? a : D(e.type) || "Memo";
          case S: {
            var d = e, v = d._payload, u = d._init;
            try {
              return D(u(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, M = 0, se, ie, ce, le, ue, fe, de;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function Ve() {
      {
        if (M === 0) {
          se = console.log, ie = console.info, ce = console.warn, le = console.error, ue = console.group, fe = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        M++;
      }
    }
    function Ue() {
      {
        if (M--, M === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, e, {
              value: se
            }),
            info: A({}, e, {
              value: ie
            }),
            warn: A({}, e, {
              value: ce
            }),
            error: A({}, e, {
              value: le
            }),
            group: A({}, e, {
              value: ue
            }),
            groupCollapsed: A({}, e, {
              value: fe
            }),
            groupEnd: A({}, e, {
              value: de
            })
          });
        }
        M < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var K = j.ReactCurrentDispatcher, G;
    function z(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (d) {
            var a = d.stack.trim().match(/\n( *(at )?)/);
            G = a && a[1] || "";
          }
        return `
` + G + e;
      }
    }
    var H = !1, B;
    {
      var ze = typeof WeakMap == "function" ? WeakMap : Map;
      B = new ze();
    }
    function pe(e, r) {
      if (!e || H)
        return "";
      {
        var t = B.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      H = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = K.current, K.current = null, Ve();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (C) {
              a = C;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (C) {
              a = C;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (C) {
            a = C;
          }
          e();
        }
      } catch (C) {
        if (C && a && typeof C.stack == "string") {
          for (var c = C.stack.split(`
`), _ = a.stack.split(`
`), m = c.length - 1, b = _.length - 1; m >= 1 && b >= 0 && c[m] !== _[b]; )
            b--;
          for (; m >= 1 && b >= 0; m--, b--)
            if (c[m] !== _[b]) {
              if (m !== 1 || b !== 1)
                do
                  if (m--, b--, b < 0 || c[m] !== _[b]) {
                    var w = `
` + c[m].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && B.set(e, w), w;
                  }
                while (m >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        H = !1, K.current = v, Ue(), Error.prepareStackTrace = d;
      }
      var W = e ? e.displayName || e.name : "", F = W ? z(W) : "";
      return typeof e == "function" && B.set(e, F), F;
    }
    function Be(e, r, t) {
      return pe(e, !1);
    }
    function Je(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function J(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, Je(e));
      if (typeof e == "string")
        return z(e);
      switch (e) {
        case T:
          return z("Suspense");
        case p:
          return z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            return Be(e.render);
          case R:
            return J(e.type, r, t);
          case S: {
            var a = e, d = a._payload, v = a._init;
            try {
              return J(v(d), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var L = Object.prototype.hasOwnProperty, he = {}, me = j.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, t = J(e.type, e._source, r ? r.type : null);
        me.setExtraStackFrame(t);
      } else
        me.setExtraStackFrame(null);
    }
    function qe(e, r, t, a, d) {
      {
        var v = Function.call.bind(L);
        for (var u in e)
          if (v(e, u)) {
            var c = void 0;
            try {
              if (typeof e[u] != "function") {
                var _ = Error((a || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              c = e[u](r, u, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (m) {
              c = m;
            }
            c && !(c instanceof Error) && (q(d), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, u, typeof c), q(null)), c instanceof Error && !(c.message in he) && (he[c.message] = !0, q(d), E("Failed %s type: %s", t, c.message), q(null));
          }
      }
    }
    var Ke = Array.isArray;
    function X(e) {
      return Ke(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function He(e) {
      try {
        return be(e), !1;
      } catch {
        return !0;
      }
    }
    function be(e) {
      return "" + e;
    }
    function ge(e) {
      if (He(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), be(e);
    }
    var xe = j.ReactCurrentOwner, Xe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ye, Re;
    function Qe(e) {
      if (L.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ze(e) {
      if (L.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      typeof e.ref == "string" && xe.current;
    }
    function rr(e, r) {
      {
        var t = function() {
          ye || (ye = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          Re || (Re = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, a, d, v, u) {
      var c = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return c._store = {}, Object.defineProperty(c._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(c, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(c, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
    };
    function ar(e, r, t, a, d) {
      {
        var v, u = {}, c = null, _ = null;
        t !== void 0 && (ge(t), c = "" + t), Ze(r) && (ge(r.key), c = "" + r.key), Qe(r) && (_ = r.ref, er(r, d));
        for (v in r)
          L.call(r, v) && !Xe.hasOwnProperty(v) && (u[v] = r[v]);
        if (e && e.defaultProps) {
          var m = e.defaultProps;
          for (v in m)
            u[v] === void 0 && (u[v] = m[v]);
        }
        if (c || _) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && rr(u, b), _ && tr(u, b);
        }
        return nr(e, c, _, d, a, xe.current, u);
      }
    }
    var Q = j.ReactCurrentOwner, Ee = j.ReactDebugCurrentFrame;
    function I(e) {
      if (e) {
        var r = e._owner, t = J(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(t);
      } else
        Ee.setExtraStackFrame(null);
    }
    var Z;
    Z = !1;
    function ee(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function _e() {
      {
        if (Q.current) {
          var e = D(Q.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function or(e) {
      return "";
    }
    var Ce = {};
    function sr(e) {
      {
        var r = _e();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Te(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = sr(r);
        if (Ce[t])
          return;
        Ce[t] = !0;
        var a = "";
        e && e._owner && e._owner !== Q.current && (a = " It was passed a child from " + D(e._owner.type) + "."), I(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), I(null);
      }
    }
    function je(e, r) {
      {
        if (typeof e != "object")
          return;
        if (X(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            ee(a) && Te(a, r);
          }
        else if (ee(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = O(e);
          if (typeof d == "function" && d !== e.entries)
            for (var v = d.call(e), u; !(u = v.next()).done; )
              ee(u.value) && Te(u.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = D(r);
          qe(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !Z) {
          Z = !0;
          var d = D(r);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function cr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            I(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), I(null);
            break;
          }
        }
        e.ref !== null && (I(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), I(null));
      }
    }
    var we = {};
    function Se(e, r, t, a, d, v) {
      {
        var u = Le(e);
        if (!u) {
          var c = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = or();
          _ ? c += _ : c += _e();
          var m;
          e === null ? m = "null" : X(e) ? m = "array" : e !== void 0 && e.$$typeof === n ? (m = "<" + (D(e.type) || "Unknown") + " />", c = " Did you accidentally export a JSX literal instead of a component?") : m = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", m, c);
        }
        var b = ar(e, r, t, d, v);
        if (b == null)
          return b;
        if (u) {
          var w = r.children;
          if (w !== void 0)
            if (a)
              if (X(w)) {
                for (var W = 0; W < w.length; W++)
                  je(w[W], e);
                Object.freeze && Object.freeze(w);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              je(w, e);
        }
        if (L.call(r, "key")) {
          var F = D(e), C = Object.keys(r).filter(function(pr) {
            return pr !== "key";
          }), re = C.length > 0 ? "{key: someKey, " + C.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!we[F + re]) {
            var vr = C.length > 0 ? "{" + C.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, re, F, vr, F), we[F + re] = !0;
          }
        }
        return e === s ? cr(b) : ir(b), b;
      }
    }
    function lr(e, r, t) {
      return Se(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Se(e, r, t, !1);
    }
    var fr = ur, dr = lr;
    U.Fragment = s, U.jsx = fr, U.jsxs = dr;
  }()), U;
}
process.env.NODE_ENV === "production" ? te.exports = yr() : te.exports = Rr();
var l = te.exports;
const k = {
  colors: {
    background: "#ffffff",
    surface: "#f8fafc",
    primary: "#0ea5e9",
    secondary: "#6366f1",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    highlight: "#f1f5f9"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  typography: {
    font: "Inter, system-ui, -apple-system, sans-serif",
    sizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px"
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px"
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)"
  }
}, Cr = {
  ...k,
  colors: {
    ...k.colors,
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    highlight: "#f1f5f9"
  }
}, Tr = {
  ...k,
  colors: {
    ...k.colors,
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
    border: "#334155",
    highlight: "#1e293b"
  }
}, Ne = hr(void 0), jr = ({
  children: i,
  initialTheme: n = k,
  initialThemeMode: o = "light",
  initialContent: s
}) => {
  const [f, g] = Y(n), [y, x] = Y(o), [h, T] = Y(s), [p, R] = Y("side-by-side"), [S, P] = Y(0.4);
  Pe(() => {
    const $ = () => {
      const O = y === "dark" || y === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      g(O ? {
        ...k,
        colors: {
          ...k.colors,
          background: "#0f172a",
          surface: "#1e293b",
          text: "#f8fafc",
          muted: "#94a3b8",
          border: "#334155",
          highlight: "#1e293b"
        }
      } : {
        ...k,
        colors: {
          ...k.colors,
          background: "#ffffff",
          surface: "#f8fafc",
          text: "#0f172a",
          muted: "#64748b",
          border: "#e2e8f0",
          highlight: "#f1f5f9"
        }
      });
    };
    if ($(), y === "system") {
      const O = window.matchMedia("(prefers-color-scheme: dark)"), j = () => $();
      return O.addEventListener("change", j), () => O.removeEventListener("change", j);
    }
  }, [y]);
  const N = {
    theme: f,
    setTheme: g,
    themeMode: y,
    setThemeMode: x
  };
  return /* @__PURE__ */ l.jsx(Ne.Provider, { value: N, children: i });
}, De = () => {
  const i = mr(Ne);
  if (i === void 0)
    throw new Error("useCanvas must be used within a CanvasProvider");
  return i;
}, wr = () => {
  const { content: i, setCanvasContent: n } = De();
  return { content: i, setContent: n };
}, Sr = () => {
  const { layout: i, widthRatio: n, setCanvasLayout: o, setCanvasWidthRatio: s } = De();
  return { layout: i, widthRatio: n, setLayout: o, setWidthRatio: s };
}, Or = ({
  children: i,
  theme: n,
  className: o = ""
}) => {
  const s = {
    container: `
      w-full h-full
      bg-[${n.colors.background}]
      border-[${n.colors.border}]
      rounded-xl
      overflow-hidden
      ${o}
    `,
    header: `
      px-6 py-4
      border-b-[1px]
      border-[${n.colors.border}]
      bg-[${n.colors.surface}]
    `,
    toolbar: `
      flex items-center justify-between
      px-6 py-3
      border-b-[1px]
      border-[${n.colors.border}]
      bg-[${n.colors.surface}]
    `
  };
  return /* @__PURE__ */ l.jsx("div", { className: s.container, children: i });
}, kr = ({
  title: i,
  description: n,
  theme: o
}) => /* @__PURE__ */ l.jsxs("div", { className: `
      px-6 py-4
      border-b-[1px]
      border-[${o.colors.border}]
      bg-[${o.colors.surface}]
    `, children: [
  i && /* @__PURE__ */ l.jsx("h2", { className: `text-xl font-bold text-[${o.colors.text}] mb-1`, children: i }),
  n && /* @__PURE__ */ l.jsx("p", { className: `text-sm text-[${o.colors.muted}]`, children: n })
] }), Pr = ({
  children: i,
  theme: n
}) => /* @__PURE__ */ l.jsx("div", { className: `
      flex-1
      overflow-y-auto
      p-6
      bg-[${n.colors.background}]
    `, children: i }), Nr = ({
  children: i,
  theme: n
}) => /* @__PURE__ */ l.jsx("div", { className: `
      flex items-center justify-between
      px-6 py-3
      border-b-[1px]
      border-[${n.colors.border}]
      bg-[${n.colors.surface}]
    `, children: i }), Dr = ({ content: i, theme: n }) => {
  const o = br(null);
  return Pe(() => {
    if (!o.current) return;
    const s = o.current, f = s.getContext("2d");
    if (!f) return;
    const { data: g, options: y = {} } = i, { colors: x = [] } = y, h = s.width, T = s.height, p = 40, R = (h - p * 2) / g.labels.length - 10, S = Math.max(...g.values, 1);
    g.values.forEach((P, N) => {
      const $ = P / S * (T - p * 2), O = p + N * (R + 10), j = T - p - $;
      f.fillStyle = x[N % x.length] || n.colors.primary, f.fillRect(O, j, R, $), f.fillStyle = n.colors.text, f.font = "12px sans-serif", f.textAlign = "center", f.fillText(g.labels[N], O + R / 2, T - p + 20), f.fillStyle = n.colors.muted, f.fillText(P.toString(), O + R / 2, j - 10);
    }), f.strokeStyle = n.colors.border, f.lineWidth = 1, f.beginPath(), f.moveTo(p, p), f.lineTo(p, T - p), f.lineTo(h - p, T - p), f.stroke();
  }, [i, n]), /* @__PURE__ */ l.jsx("div", { className: "chart-renderer", children: /* @__PURE__ */ l.jsx(
    "canvas",
    {
      ref: o,
      width: 600,
      height: 300,
      style: { width: "100%", height: "auto" }
    }
  ) });
}, $r = ({ content: i, theme: n }) => {
  const { events: o, options: s = {} } = i, { orientation: f = "horizontal", compact: g = !1 } = s, y = f === "horizontal";
  return /* @__PURE__ */ l.jsx("div", { className: "timeline-renderer", children: /* @__PURE__ */ l.jsx("div", { className: `timeline ${y ? "timeline-horizontal" : "timeline-vertical"}`, children: o.map((x, h) => /* @__PURE__ */ l.jsxs("div", { className: "timeline-item", children: [
    /* @__PURE__ */ l.jsx("div", { className: "timeline-marker", children: /* @__PURE__ */ l.jsx("div", { className: "marker-dot" }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "timeline-content", children: [
      /* @__PURE__ */ l.jsx("div", { className: "timeline-date", children: x.date }),
      /* @__PURE__ */ l.jsx("div", { className: "timeline-title", children: x.title }),
      x.description && /* @__PURE__ */ l.jsx("div", { className: "timeline-description", children: x.description })
    ] })
  ] }, h)) }) });
}, Ar = ({ content: i, theme: n }) => {
  const [o, s] = ne.useState(!1), f = () => {
    navigator.clipboard.writeText(i.code), s(!0), setTimeout(() => s(!1), 2e3);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "code-renderer", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "code-header", children: [
      /* @__PURE__ */ l.jsx("span", { className: "code-language", children: i.language }),
      i.filename && /* @__PURE__ */ l.jsx("span", { className: "code-filename", children: i.filename }),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: f,
          className: "code-copy-button",
          style: { color: n.colors.primary },
          children: o ? /* @__PURE__ */ l.jsx(gr, { size: 16 }) : /* @__PURE__ */ l.jsx(xr, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ l.jsx("pre", { className: "code-content", children: /* @__PURE__ */ l.jsx("code", { children: i.code }) })
  ] });
}, Fr = ({ content: i, theme: n }) => /* @__PURE__ */ l.jsx("div", { className: "document-renderer", children: /* @__PURE__ */ l.jsxs("div", { className: "document-content", children: [
  /* @__PURE__ */ l.jsx("h3", { className: "document-title", style: { color: n.colors.text }, children: i.title }),
  /* @__PURE__ */ l.jsx("div", { className: "document-body", style: { color: n.colors.text }, children: i.content })
] }) }), Ir = ({ content: i, theme: n }) => {
  const { component: o, props: s = {} } = i;
  return o ? /* @__PURE__ */ l.jsx("div", { className: "custom-renderer", style: { color: n.colors.text }, children: /* @__PURE__ */ l.jsx(o, { ...s }) }) : /* @__PURE__ */ l.jsx("div", { className: "custom-renderer", style: { color: n.colors.text }, children: /* @__PURE__ */ l.jsx("p", { children: "No custom component provided" }) });
};
class Wr {
  /**
   * Detect the content type from a string
   */
  static detectType(n) {
    const o = n.trim();
    return o.includes("```") || /[\n\s]*\w+\s*=\s*\{/.test(o) ? "code" : o.includes("#") || o.includes("##") ? "document" : /\d{4}-\d{2}-\d{2}/.test(o) ? "timeline" : /\d+\s*%|\[\s*\d+\s*,\s*\d+\s*\]/.test(o) ? "chart" : "custom";
  }
  /**
   * Extract chart data from content
   */
  static extractChartData(n) {
    const o = n.match(/-?\d+(\.\d+)?/g);
    if (!o) return null;
    const s = o.map(Number), f = s.slice(0, Math.ceil(s.length / 2)), g = s.slice(Math.ceil(s.length / 2));
    return {
      labels: f,
      values: g
    };
  }
  /**
   * Extract timeline events from content
   */
  static extractTimelineEvents(n) {
    const o = n.split(`
`), s = [];
    return o.forEach((f) => {
      const g = f.match(/(\d{4}-\d{2}-\d{2})/);
      g && s.push({
        date: g[1],
        title: f.replace(g[0], "").trim(),
        description: ""
      });
    }), s.length > 0 ? s : null;
  }
  /**
   * Extract code from content
   */
  static extractCode(n) {
    const o = n.match(/```(\w+)?\n([\s\S]*?)```/);
    return o ? {
      code: o[2],
      language: o[1] || "text"
    } : null;
  }
  /**
   * Analyze content and return appropriate content object
   */
  static analyze(n) {
    switch (this.detectType(n)) {
      case "chart":
        return {
          type: "chart",
          data: this.extractChartData(n) || { labels: [], values: [] }
        };
      case "timeline":
        return {
          type: "timeline",
          events: this.extractTimelineEvents(n) || []
        };
      case "code": {
        const s = this.extractCode(n);
        return {
          type: "code",
          code: (s == null ? void 0 : s.code) || n,
          language: (s == null ? void 0 : s.language) || "text"
        };
      }
      case "document":
        return {
          type: "document",
          content: n
        };
      default:
        return {
          type: "custom",
          data: n
        };
    }
  }
}
export {
  Or as CanvasContainer,
  Pr as CanvasContent,
  kr as CanvasHeader,
  jr as CanvasProvider,
  Nr as CanvasToolbar,
  Dr as ChartRenderer,
  Ar as CodeRenderer,
  Wr as ContentAnalyzer,
  Ir as CustomRenderer,
  Fr as DocumentRenderer,
  $r as TimelineRenderer,
  Tr as darkTheme,
  k as defaultTheme,
  Cr as lightTheme,
  De as useCanvas,
  wr as useCanvasContent,
  Sr as useCanvasLayout
};
