var copyObject = function (t) {
  var e = {};

  function r(n) {
    if (e[n]) return e[n].exports;
    var o = e[n] = {i: n, l: !1, exports: {}};
    return t[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
  }

  return r.m = t, r.c = e, r.d = function (t, e, n) {
    r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
  }, r.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, r.t = function (t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) r.d(n, o, function (e) {
      return t[e]
    }.bind(null, o));
    return n
  }, r.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return r.d(e, "a", e), e
  }, r.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, r.p = "", r(r.s = 0)
}([function (t, e, r) {
  "use strict";
  var n = this && this.__assign || function () {
    return (n = Object.assign || function (t) {
      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
      return t
    }).apply(this, arguments)
  };
  Object.defineProperty(e, "__esModule", {value: !0});
  var o = (a.setDataSource = function (t) {
    return new a(t)
  }, a.deepCopy = function (t) {
    if (null === t) return t;
    if (t instanceof Date) return new Date(t.getTime());
    if ("object" != typeof t) return t;
    if ("function" == typeof t[Symbol.iterator]) {
      var e = [];
      if (0 < t.length) for (var r = 0, n = t; r < n.length; r++) {
        var o = n[r];
        e.push(a.deepCopy(o))
      }
      return e
    }
    var u = Object.keys(t);
    if (e = {}, 0 < u.length) for (var i = 0, f = u; i < f.length; i++) {
      var c = f[i];
      e[c] = a.deepCopy(t[c])
    }
    return e
  }, a.prototype.setData = function (t, e, r) {
    var o;
    if (t.hasOwnProperty(e) && typeof t[e] == typeof r) {
      if ("object" == typeof r) for (var a in r) t[e] = n(n({}, t[e]), ((o = {})[a] = r[a], o)); else t[e] = null != r ? r : n({}, t[e]);
      return t
    }
    console.error("key " + e + " of dataSource is not same type with param Value OR not found in dataSource")
  }, a.prototype.copyWithParam = function (t, e) {
    if ("object" != typeof this.dataSource) return this.dataSource;
    var r = t.split("."), o = r[0];
    this.dataSource = n({}, this.dataSource);
    var a = n({}, this.dataSource[o]);
    switch (r.length) {
      case 1:
        return this.setData(this.dataSource, o, e), this;
      default:
        this.dataSource[o] = a;
        for (var u = 1; u < r.length; u++) {
          var i = r[u];
          u === r.length - 1 ? this.setData(a, i, e) : (a[i] = n({}, a[i]), a = a[i])
        }
        return this
    }
  }, a.prototype.getResult = function () {
    return this.dataSource
  }, a);

  function a(t) {
    this.dataSource = t
  }

  e.ObjectHelper = o
}]);