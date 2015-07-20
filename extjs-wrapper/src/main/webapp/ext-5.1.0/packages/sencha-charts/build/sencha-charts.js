Ext.define("Ext.draw.ContainerBase", {
    extend: "Ext.panel.Panel",
    requires: ["Ext.window.Window"],
    layout: "container",
    addElementListener: function () {
        var b = this, a = arguments;
        if (b.rendered) {
            b.el.on.apply(b.el, a)
        } else {
            b.on("render", function () {
                b.el.on.apply(b.el, a)
            })
        }
    },
    removeElementListener: function () {
        var b = this, a = arguments;
        if (b.rendered) {
            b.el.un.apply(b.el, a)
        }
    },
    afterRender: function () {
        this.callParent(arguments);
        this.initAnimator()
    },
    getItems: function () {
        var b = this, a = b.items;
        if (!a || !a.isMixedCollection) {
            b.initItems()
        }
        return b.items
    },
    onRender: function () {
        this.callParent(arguments);
        this.element = this.el;
        this.innerElement = this.body
    },
    setItems: function (a) {
        this.items = a;
        return a
    },
    setSurfaceSize: function (b, a) {
        this.resizeHandler({width: b, height: a});
        this.renderFrame()
    },
    onResize: function () {
        this.onBodyResize()
    },
    preview: function () {
        var a = this.getImage();
        new Ext.window.Window({
            title: "Chart Preview",
            closeable: true,
            renderTo: Ext.getBody(),
            autoShow: true,
            maximizeable: true,
            maximized: true,
            border: true,
            layout: {type: "hbox", pack: "center", align: "middle"},
            items: {
                xtype: "container",
                items: {
                    xtype: "image",
                    mode: "img",
                    cls: Ext.baseCSSPrefix + "chart-image",
                    src: a.data,
                    listeners: {
                        afterrender: function () {
                            var e = this, b = e.imgEl.dom, d = a.type === "svg" ? 1 : (window.devicePixelRatio || 1), c;
                            if (!b.naturalWidth || !b.naturalHeight) {
                                b.onload = function () {
                                    var g = b.naturalWidth, f = b.naturalHeight;
                                    e.setWidth(Math.floor(g / d));
                                    e.setHeight(Math.floor(f / d))
                                }
                            } else {
                                c = e.getSize();
                                e.setWidth(Math.floor(c.width / d));
                                e.setHeight(Math.floor(c.height / d))
                            }
                        }
                    }
                }
            }
        })
    },
    privates: {
        getTargetEl: function () {
            return this.innerElement
        }
    }
});
Ext.define("Ext.draw.SurfaceBase", {extend: "Ext.Widget"});
Ext.define("Ext.draw.Color", {
    statics: {
        colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
        rgbToHexRe: /\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
        rgbaToHexRe: /\s*rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\.\d]+)\)/,
        hexRe: /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/,
        NONE: "none",
        RGBA_NONE: "rgba(0, 0, 0, 0)"
    }, isColor: true, lightnessFactor: 0.2, constructor: function (d, b, a, c) {
        this.setRGB(d, b, a, c)
    }, setRGB: function (e, c, a, d) {
        var b = this;
        b.r = Math.min(255, Math.max(0, e));
        b.g = Math.min(255, Math.max(0, c));
        b.b = Math.min(255, Math.max(0, a));
        if (d === undefined) {
            b.a = 1
        } else {
            b.a = Math.min(1, Math.max(0, d))
        }
    }, getGrayscale: function () {
        return this.r * 0.3 + this.g * 0.59 + this.b * 0.11
    }, getHSL: function () {
        var i = this, a = i.r / 255, f = i.g / 255, j = i.b / 255, k = Math.max(a, f, j), d = Math.min(a, f, j), m = k - d, e, n = 0, c = 0.5 * (k + d);
        if (d !== k) {
            n = (c <= 0.5) ? m / (k + d) : m / (2 - k - d);
            if (a === k) {
                e = 60 * (f - j) / m
            } else {
                if (f === k) {
                    e = 120 + 60 * (j - a) / m
                } else {
                    e = 240 + 60 * (a - f) / m
                }
            }
            if (e < 0) {
                e += 360
            }
            if (e >= 360) {
                e -= 360
            }
        }
        return [e, n, c]
    }, getHSV: function () {
        var i = this, a = i.r / 255, f = i.g / 255, j = i.b / 255, k = Math.max(a, f, j), d = Math.min(a, f, j), c = k - d, e, m = 0, l = k;
        if (d != k) {
            m = l ? c / l : 0;
            if (a === k) {
                e = 60 * (f - j) / c
            } else {
                if (f === k) {
                    e = 60 * (j - a) / c + 120
                } else {
                    e = 60 * (a - f) / c + 240
                }
            }
            if (e < 0) {
                e += 360
            }
            if (e >= 360) {
                e -= 360
            }
        }
        return [e, m, l]
    }, setHSL: function (g, f, e) {
        var i = this, d = Math.abs, j, b, a;
        g = (g % 360 + 360) % 360;
        f = f > 1 ? 1 : f < 0 ? 0 : f;
        e = e > 1 ? 1 : e < 0 ? 0 : e;
        if (f === 0 || g === null) {
            e *= 255;
            i.setRGB(e, e, e)
        } else {
            g /= 60;
            j = f * (1 - d(2 * e - 1));
            b = j * (1 - d(g % 2 - 1));
            a = e - j / 2;
            a *= 255;
            j *= 255;
            b *= 255;
            switch (Math.floor(g)) {
                case 0:
                    i.setRGB(j + a, b + a, a);
                    break;
                case 1:
                    i.setRGB(b + a, j + a, a);
                    break;
                case 2:
                    i.setRGB(a, j + a, b + a);
                    break;
                case 3:
                    i.setRGB(a, b + a, j + a);
                    break;
                case 4:
                    i.setRGB(b + a, a, j + a);
                    break;
                case 5:
                    i.setRGB(j + a, a, b + a);
                    break
            }
        }
        return i
    }, setHSV: function (f, e, d) {
        var g = this, i, b, a;
        f = (f % 360 + 360) % 360;
        e = e > 1 ? 1 : e < 0 ? 0 : e;
        d = d > 1 ? 1 : d < 0 ? 0 : d;
        if (e === 0 || f === null) {
            d *= 255;
            g.setRGB(d, d, d)
        } else {
            f /= 60;
            i = d * e;
            b = i * (1 - Math.abs(f % 2 - 1));
            a = d - i;
            a *= 255;
            i *= 255;
            b *= 255;
            switch (Math.floor(f)) {
                case 0:
                    g.setRGB(i + a, b + a, a);
                    break;
                case 1:
                    g.setRGB(b + a, i + a, a);
                    break;
                case 2:
                    g.setRGB(a, i + a, b + a);
                    break;
                case 3:
                    g.setRGB(a, b + a, i + a);
                    break;
                case 4:
                    g.setRGB(b + a, a, i + a);
                    break;
                case 5:
                    g.setRGB(i + a, a, b + a);
                    break
            }
        }
        return g
    }, createLighter: function (b) {
        var a = this.getHSL();
        b = b || this.lightnessFactor;
        a[2] = Ext.Number.constrain(a[2] + b, 0, 1);
        return Ext.draw.Color.fromHSL(a[0], a[1], a[2])
    }, createDarker: function (a) {
        a = a || this.lightnessFactor;
        return this.createLighter(-a)
    }, toString: function () {
        var f = this, c = Math.round;
        if (f.a === 1) {
            var e = c(f.r).toString(16), d = c(f.g).toString(16), a = c(f.b).toString(16);
            e = (e.length === 1) ? "0" + e : e;
            d = (d.length === 1) ? "0" + d : d;
            a = (a.length === 1) ? "0" + a : a;
            return ["#", e, d, a].join("")
        } else {
            return "rgba(" + [c(f.r), c(f.g), c(f.b), f.a === 0 ? 0 : f.a.toFixed(15)].join(", ") + ")"
        }
    }, toHex: function (b) {
        if (Ext.isArray(b)) {
            b = b[0]
        }
        if (!Ext.isString(b)) {
            return ""
        }
        if (b.substr(0, 1) === "#") {
            return b
        }
        var e = Ext.draw.Color.colorToHexRe.exec(b);
        if (Ext.isArray(e)) {
            var f = parseInt(e[2], 10), d = parseInt(e[3], 10), a = parseInt(e[4], 10), c = a | (d << 8) | (f << 16);
            return e[1] + "#" + ("000000" + c.toString(16)).slice(-6)
        } else {
            return ""
        }
    }, setFromString: function (j) {
        var e, h, f, c, d = 1, i = parseInt;
        if (j === Ext.draw.Color.NONE) {
            this.r = this.g = this.b = this.a = 0;
            return this
        }
        if ((j.length === 4 || j.length === 7) && j.substr(0, 1) === "#") {
            e = j.match(Ext.draw.Color.hexRe);
            if (e) {
                h = i(e[1], 16) >> 0;
                f = i(e[2], 16) >> 0;
                c = i(e[3], 16) >> 0;
                if (j.length === 4) {
                    h += (h * 16);
                    f += (f * 16);
                    c += (c * 16)
                }
            }
        } else {
            if ((e = j.match(Ext.draw.Color.rgbToHexRe))) {
                h = +e[1];
                f = +e[2];
                c = +e[3]
            } else {
                if ((e = j.match(Ext.draw.Color.rgbaToHexRe))) {
                    h = +e[1];
                    f = +e[2];
                    c = +e[3];
                    d = +e[4]
                } else {
                    if (Ext.draw.Color.ColorList.hasOwnProperty(j.toLowerCase())) {
                        return this.setFromString(Ext.draw.Color.ColorList[j.toLowerCase()])
                    }
                }
            }
        }
        if (typeof h === "undefined") {
            return this
        }
        this.r = h;
        this.g = f;
        this.b = c;
        this.a = d;
        return this
    }
}, function () {
    var a = new this();
    this.addStatics({
        fly: function (f, e, c, d) {
            switch (arguments.length) {
                case 1:
                    a.setFromString(f);
                    break;
                case 3:
                case 4:
                    a.setRGB(f, e, c, d);
                    break;
                default:
                    return null
            }
            return a
        },
        ColorList: {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        },
        fromHSL: function (d, c, b) {
            return (new this(0, 0, 0, 0)).setHSL(d, c, b)
        },
        fromHSV: function (d, c, b) {
            return (new this(0, 0, 0, 0)).setHSL(d, c, b)
        },
        fromString: function (b) {
            return (new this(0, 0, 0, 0)).setFromString(b)
        },
        create: function (b) {
            if (b instanceof this) {
                return b
            } else {
                if (Ext.isArray(b)) {
                    return new Ext.draw.Color(b[0], b[1], b[2], b[3])
                } else {
                    if (Ext.isString(b)) {
                        return Ext.draw.Color.fromString(b)
                    } else {
                        if (arguments.length > 2) {
                            return new Ext.draw.Color(arguments[0], arguments[1], arguments[2], arguments[3])
                        } else {
                            return new Ext.draw.Color(0, 0, 0, 0)
                        }
                    }
                }
            }
        }
    })
});
Ext.define("Ext.draw.sprite.AnimationParser", function () {
    function a(d, c, b) {
        return d + (c - d) * b
    }

    return {
        singleton: true,
        attributeRe: /^url\(#([a-zA-Z\-]+)\)$/,
        requires: ["Ext.draw.Color"],
        color: {
            parseInitial: function (c, b) {
                if (Ext.isString(c)) {
                    c = Ext.draw.Color.create(c)
                }
                if (Ext.isString(b)) {
                    b = Ext.draw.Color.create(b)
                }
                if ((c instanceof Ext.draw.Color) && (b instanceof Ext.draw.Color)) {
                    return [[c.r, c.g, c.b, c.a], [b.r, b.g, b.b, b.a]]
                } else {
                    return [c || b, b || c]
                }
            }, compute: function (d, c, b) {
                if (!Ext.isArray(d) || !Ext.isArray(c)) {
                    return c || d
                } else {
                    return [a(d[0], c[0], b), a(d[1], c[1], b), a(d[2], c[2], b), a(d[3], c[3], b)]
                }
            }, serve: function (c) {
                var b = Ext.draw.Color.fly(c[0], c[1], c[2], c[3]);
                return b.toString()
            }
        },
        number: {
            parse: function (b) {
                return b === null ? null : +b
            }, compute: function (d, c, b) {
                if (!Ext.isNumber(d) || !Ext.isNumber(c)) {
                    return c || d
                } else {
                    return a(d, c, b)
                }
            }
        },
        angle: {
            parseInitial: function (c, b) {
                if (b - c > Math.PI) {
                    b -= Math.PI * 2
                } else {
                    if (b - c < -Math.PI) {
                        b += Math.PI * 2
                    }
                }
                return [c, b]
            }, compute: function (d, c, b) {
                if (!Ext.isNumber(d) || !Ext.isNumber(c)) {
                    return c || d
                } else {
                    return a(d, c, b)
                }
            }
        },
        path: {
            parseInitial: function (m, n) {
                var c = m.toStripes(), o = n.toStripes(), e, d, k = c.length, p = o.length, h, f, b, g = o[p - 1], l = [g[g.length - 2], g[g.length - 1]];
                for (e = k; e < p; e++) {
                    c.push(c[k - 1].slice(0))
                }
                for (e = p; e < k; e++) {
                    o.push(l.slice(0))
                }
                b = c.length;
                o.path = n;
                o.temp = new Ext.draw.Path();
                for (e = 0; e < b; e++) {
                    h = c[e];
                    f = o[e];
                    k = h.length;
                    p = f.length;
                    o.temp.commands.push("M");
                    for (d = p; d < k; d += 6) {
                        f.push(l[0], l[1], l[0], l[1], l[0], l[1])
                    }
                    g = o[o.length - 1];
                    l = [g[g.length - 2], g[g.length - 1]];
                    for (d = k; d < p; d += 6) {
                        h.push(l[0], l[1], l[0], l[1], l[0], l[1])
                    }
                    for (e = 0; e < f.length; e++) {
                        f[e] -= h[e]
                    }
                    for (e = 2; e < f.length; e += 6) {
                        o.temp.commands.push("C")
                    }
                }
                return [c, o]
            }, compute: function (c, l, m) {
                if (m >= 1) {
                    return l.path
                }
                var e = 0, f = c.length, d = 0, b, k, h, n = l.temp.params, g = 0;
                for (; e < f; e++) {
                    k = c[e];
                    h = l[e];
                    b = k.length;
                    for (d = 0; d < b; d++) {
                        n[g++] = h[d] * m + k[d]
                    }
                }
                return l.temp
            }
        },
        data: {
            compute: function (h, j, k, g) {
                var m = h.length - 1, b = j.length - 1, e = Math.max(m, b), d, l, c;
                if (!g || g === h) {
                    g = []
                }
                g.length = e + 1;
                for (c = 0; c <= e; c++) {
                    d = h[Math.min(c, m)];
                    l = j[Math.min(c, b)];
                    if (isNaN(d)) {
                        g[c] = l
                    } else {
                        g[c] = (l - d) * k + d
                    }
                }
                return g
            }
        },
        text: {
            compute: function (d, c, b) {
                return d.substr(0, Math.round(d.length * (1 - b))) + c.substr(Math.round(c.length * (1 - b)))
            }
        },
        limited: "number",
        limited01: "number"
    }
});
(function () {
    if (!Ext.global.Float32Array) {
        var a = function (d) {
            if (typeof d === "number") {
                this.length = d
            } else {
                if ("length" in d) {
                    this.length = d.length;
                    for (var c = 0, b = d.length; c < b; c++) {
                        this[c] = +d[c]
                    }
                }
            }
        };
        a.prototype = [];
        Ext.global.Float32Array = a
    }
})();
Ext.define("Ext.draw.Draw", {
    singleton: true, radian: Math.PI / 180, pi2: Math.PI * 2, reflectFn: function (b) {
        return b
    }, rad: function (a) {
        return (a % 360) * this.radian
    }, degrees: function (a) {
        return (a / this.radian) % 360
    }, isBBoxIntersect: function (b, a, c) {
        c = c || 0;
        return (Math.max(b.x, a.x) - c > Math.min(b.x + b.width, a.x + a.width)) || (Math.max(b.y, a.y) - c > Math.min(b.y + b.height, a.y + a.height))
    }, isPointInBBox: function (a, c, b) {
        return !!b && a >= b.x && a <= (b.x + b.width) && c >= b.y && c <= (b.y + b.height)
    }, spline: function (m) {
        var e, c, k = m.length, b, h, l, f, a = 0, g = new Float32Array(m.length), n = new Float32Array(m.length * 3 - 2);
        g[0] = 0;
        g[k - 1] = 0;
        for (e = 1; e < k - 1; e++) {
            g[e] = (m[e + 1] + m[e - 1] - 2 * m[e]) - g[e - 1];
            a = 1 / (4 - a);
            g[e] *= a
        }
        for (e = k - 2; e > 0; e--) {
            a = 3.732050807568877 + 48.248711305964385 / (-13.928203230275537 + Math.pow(0.07179676972449123, e));
            g[e] -= g[e + 1] * a
        }
        f = m[0];
        b = f - g[0];
        for (e = 0, c = 0; e < k - 1; c += 3) {
            l = f;
            h = b;
            e++;
            f = m[e];
            b = f - g[e];
            n[c] = l;
            n[c + 1] = (b + 2 * h) / 3;
            n[c + 2] = (b * 2 + h) / 3
        }
        n[c] = f;
        return n
    }, getAnchors: function (e, d, i, h, t, s, o) {
        o = o || 4;
        var n = Math.PI, p = n / 2, k = Math.abs, a = Math.sin, b = Math.cos, f = Math.atan, r, q, g, j, m, l, v, u, c;
        r = (i - e) / o;
        q = (t - i) / o;
        if ((h >= d && h >= s) || (h <= d && h <= s)) {
            g = j = p
        } else {
            g = f((i - e) / k(h - d));
            if (d < h) {
                g = n - g
            }
            j = f((t - i) / k(h - s));
            if (s < h) {
                j = n - j
            }
        }
        c = p - ((g + j) % (n * 2)) / 2;
        if (c > p) {
            c -= n
        }
        g += c;
        j += c;
        m = i - r * a(g);
        l = h + r * b(g);
        v = i + q * a(j);
        u = h + q * b(j);
        if ((h > d && l < d) || (h < d && l > d)) {
            m += k(d - l) * (m - i) / (l - h);
            l = d
        }
        if ((h > s && u < s) || (h < s && u > s)) {
            v -= k(s - u) * (v - i) / (u - h);
            u = s
        }
        return {x1: m, y1: l, x2: v, y2: u}
    }, smooth: function (l, j, o) {
        var k = l.length, h, g, c, b, q, p, n, m, f = [], e = [], d, a;
        for (d = 0; d < k - 1; d++) {
            h = l[d];
            g = j[d];
            if (d === 0) {
                n = h;
                m = g;
                f.push(n);
                e.push(m);
                if (k === 1) {
                    break
                }
            }
            c = l[d + 1];
            b = j[d + 1];
            q = l[d + 2];
            p = j[d + 2];
            if (isNaN(q) || isNaN(p)) {
                f.push(n, c, c);
                e.push(m, b, b);
                break
            }
            a = this.getAnchors(h, g, c, b, q, p, o);
            f.push(n, a.x1, c);
            e.push(m, a.y1, b);
            n = a.x2;
            m = a.y2
        }
        return {smoothX: f, smoothY: e}
    }, updateIOS: Ext.os.is.iOS ? function () {
        var a = Ext.getBody().createChild({style: "position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background: rgba(0,0,0,0.001); z-index: 100000"});
        Ext.draw.Animator.schedule(function () {
            a.destroy()
        })
    } : Ext.emptyFn
});
Ext.define("Ext.draw.gradient.Gradient", {
    requires: ["Ext.draw.Color"],
    isGradient: true,
    config: {stops: []},
    applyStops: function (f) {
        var e = [], d = f.length, c, b, a;
        for (c = 0; c < d; c++) {
            b = f[c];
            a = b.color;
            if (!(a && a.isColor)) {
                a = Ext.draw.Color.fly(a || Ext.draw.Color.NONE)
            }
            e.push({offset: Math.min(1, Math.max(0, "offset" in b ? b.offset : b.position || 0)), color: a.toString()})
        }
        e.sort(function (h, g) {
            return h.offset - g.offset
        });
        return e
    },
    onClassExtended: function (a, b) {
        if (!b.alias && b.type) {
            b.alias = "gradient." + b.type
        }
    },
    constructor: function (a) {
        this.initConfig(a)
    },
    generateGradient: Ext.emptyFn
});
Ext.define("Ext.draw.gradient.GradientDefinition", {
    singleton: true,
    urlStringRe: /^url\(#([\w\-]+)\)$/,
    gradients: {},
    add: function (a) {
        var b = this.gradients, c, e, d;
        for (c = 0, e = a.length; c < e; c++) {
            d = a[c];
            if (Ext.isString(d.id)) {
                b[d.id] = d
            }
        }
    },
    get: function (d) {
        var a = this.gradients, b = d.match(this.urlStringRe), c;
        if (b && b[1] && (c = a[b[1]])) {
            return c || d
        }
        return d
    }
});
Ext.define("Ext.draw.sprite.AttributeParser", {
    singleton: true,
    attributeRe: /^url\(#([a-zA-Z\-]+)\)$/,
    requires: ["Ext.draw.Color", "Ext.draw.gradient.GradientDefinition"],
    "default": function (a) {
        return a
    },
    string: function (a) {
        return String(a)
    },
    number: function (a) {
        if (!isNaN(a)) {
            return a
        }
    },
    angle: function (a) {
        if (!isNaN(a)) {
            a %= Math.PI * 2;
            if (a < -Math.PI) {
                a += Math.PI * 2
            }
            if (a > Math.PI) {
                a -= Math.PI * 2
            }
            return a
        }
    },
    data: function (a) {
        if (Ext.isArray(a)) {
            return a.slice()
        } else {
            if (a instanceof Float32Array) {
                return new Float32Array(a)
            }
        }
    },
    bool: function (a) {
        return !!a
    },
    color: function (a) {
        if (a instanceof Ext.draw.Color) {
            return a.toString()
        } else {
            if (a instanceof Ext.draw.gradient.Gradient) {
                return a
            } else {
                if (!a) {
                    return Ext.draw.Color.NONE
                } else {
                    if (Ext.isString(a)) {
                        if (a.substr(0, 3) === "url") {
                            a = Ext.draw.gradient.GradientDefinition.get(a);
                            if (Ext.isString(a)) {
                                return a
                            }
                        } else {
                            return Ext.draw.Color.fly(a).toString()
                        }
                    }
                }
            }
        }
        if (a.type === "linear") {
            return Ext.create("Ext.draw.gradient.Linear", a)
        } else {
            if (a.type === "radial") {
                return Ext.create("Ext.draw.gradient.Radial", a)
            } else {
                if (a.type === "pattern") {
                    return Ext.create("Ext.draw.gradient.Pattern", a)
                } else {
                    return Ext.draw.Color.NONE
                }
            }
        }
    },
    limited: function (a, b) {
        return function (c) {
            return isNaN(c) ? undefined : Math.min(Math.max(+c, a), b)
        }
    },
    limited01: function (a) {
        return isNaN(a) ? undefined : Math.min(Math.max(+a, 0), 1)
    },
    enums: function () {
        var d = {}, a = Array.prototype.slice.call(arguments, 0), b, c;
        for (b = 0, c = a.length; b < c; b++) {
            d[a[b]] = true
        }
        return function (e) {
            return e in d ? e : undefined
        }
    }
});
Ext.define("Ext.draw.sprite.AttributeDefinition", {
    requires: ["Ext.draw.sprite.AttributeParser", "Ext.draw.sprite.AnimationParser"],
    config: {
        defaults: {},
        aliases: {},
        animationProcessors: {},
        processors: {},
        dirtyTriggers: {},
        triggers: {},
        updaters: {}
    },
    inheritableStatics: {processorFactoryRe: /^(\w+)\(([\w\-,]*)\)$/},
    constructor: function (a) {
        var b = this;
        b.initConfig(a)
    },
    applyDefaults: function (b, a) {
        a = Ext.apply(a || {}, this.normalize(b));
        return a
    },
    applyAliases: function (b, a) {
        return Ext.apply(a || {}, b)
    },
    applyProcessors: function (e, i) {
        this.getAnimationProcessors();
        var j = i || {}, h = Ext.draw.sprite.AttributeParser, a = this.self.processorFactoryRe, g = {}, d, b, c, f;
        for (b in e) {
            f = e[b];
            if (!Ext.isFunction(f)) {
                if (Ext.isString(f)) {
                    c = f.match(a);
                    if (c) {
                        f = h[c[1]].apply(h, c[2].split(","))
                    } else {
                        g[b] = f;
                        d = true;
                        f = h[f]
                    }
                } else {
                    continue
                }
            }
            j[b] = f
        }
        if (d) {
            this.setAnimationProcessors(g)
        }
        return j
    },
    applyAnimationProcessors: function (c, a) {
        var e = Ext.draw.sprite.AnimationParser, b, d;
        if (!a) {
            a = {}
        }
        for (b in c) {
            d = c[b];
            if (d === "none") {
                a[b] = null
            } else {
                if (Ext.isString(d) && !(b in a)) {
                    if (d in e) {
                        while (Ext.isString(e[d])) {
                            d = e[d]
                        }
                        a[b] = e[d]
                    }
                } else {
                    if (Ext.isObject(d)) {
                        a[b] = d
                    }
                }
            }
        }
        return a
    },
    updateDirtyTriggers: function (a) {
        this.setTriggers(a)
    },
    applyTriggers: function (b, c) {
        if (!c) {
            c = {}
        }
        for (var a in b) {
            c[a] = b[a].split(",")
        }
        return c
    },
    applyUpdaters: function (b, a) {
        return Ext.apply(a || {}, b)
    },
    batchedNormalize: function (f, o) {
        if (!f) {
            return {}
        }
        var g = this, k = g.getProcessors(), d = g.getAliases(), a = f.translation || f.translate, p = {}, h, j, b, e, q, c, n, m, l;
        if ("rotation" in f) {
            q = f.rotation
        } else {
            q = ("rotate" in f) ? f.rotate : undefined
        }
        if ("scaling" in f) {
            c = f.scaling
        } else {
            c = ("scale" in f) ? f.scale : undefined
        }
        if (typeof c !== "undefined") {
            if (Ext.isNumber(c)) {
                p.scalingX = c;
                p.scalingY = c
            } else {
                if ("x" in c) {
                    p.scalingX = c.x
                }
                if ("y" in c) {
                    p.scalingY = c.y
                }
                if ("centerX" in c) {
                    p.scalingCenterX = c.centerX
                }
                if ("centerY" in c) {
                    p.scalingCenterY = c.centerY
                }
            }
        }
        if (typeof q !== "undefined") {
            if (Ext.isNumber(q)) {
                q = Ext.draw.Draw.rad(q);
                p.rotationRads = q
            } else {
                if ("rads" in q) {
                    p.rotationRads = q.rads
                } else {
                    if ("degrees" in q) {
                        if (Ext.isArray(q.degrees)) {
                            p.rotationRads = Ext.Array.map(q.degrees, function (i) {
                                return Ext.draw.Draw.rad(i)
                            })
                        } else {
                            p.rotationRads = Ext.draw.Draw.rad(q.degrees)
                        }
                    }
                }
                if ("centerX" in q) {
                    p.rotationCenterX = q.centerX
                }
                if ("centerY" in q) {
                    p.rotationCenterY = q.centerY
                }
            }
        }
        if (typeof a !== "undefined") {
            if ("x" in a) {
                p.translationX = a.x
            }
            if ("y" in a) {
                p.translationY = a.y
            }
        }
        if ("matrix" in f) {
            n = Ext.draw.Matrix.create(f.matrix);
            l = n.split();
            p.matrix = n;
            p.rotationRads = l.rotation;
            p.rotationCenterX = 0;
            p.rotationCenterY = 0;
            p.scalingX = l.scaleX;
            p.scalingY = l.scaleY;
            p.scalingCenterX = 0;
            p.scalingCenterY = 0;
            p.translationX = l.translateX;
            p.translationY = l.translateY
        }
        for (b in f) {
            e = f[b];
            if (typeof e === "undefined") {
                continue
            } else {
                if (Ext.isArray(e)) {
                    if (b in d) {
                        b = d[b]
                    }
                    if (b in k) {
                        p[b] = [];
                        for (h = 0, j = e.length; h < j; h++) {
                            m = k[b].call(this, e[h]);
                            if (typeof m !== "undefined") {
                                p[b][h] = m
                            }
                        }
                    } else {
                        if (o) {
                            p[b] = e
                        }
                    }
                } else {
                    if (b in d) {
                        b = d[b]
                    }
                    if (b in k) {
                        e = k[b].call(this, e);
                        if (typeof e !== "undefined") {
                            p[b] = e
                        }
                    } else {
                        if (o) {
                            p[b] = e
                        }
                    }
                }
            }
        }
        return p
    },
    normalize: function (j, k) {
        if (!j) {
            return {}
        }
        var f = this, g = f.getProcessors(), d = f.getAliases(), a = j.translation || j.translate, l = {}, b, e, m, c, i, h;
        if ("rotation" in j) {
            m = j.rotation
        } else {
            m = ("rotate" in j) ? j.rotate : undefined
        }
        if ("scaling" in j) {
            c = j.scaling
        } else {
            c = ("scale" in j) ? j.scale : undefined
        }
        if (a) {
            if ("x" in a) {
                l.translationX = a.x
            }
            if ("y" in a) {
                l.translationY = a.y
            }
        }
        if (typeof c !== "undefined") {
            if (Ext.isNumber(c)) {
                l.scalingX = c;
                l.scalingY = c
            } else {
                if ("x" in c) {
                    l.scalingX = c.x
                }
                if ("y" in c) {
                    l.scalingY = c.y
                }
                if ("centerX" in c) {
                    l.scalingCenterX = c.centerX
                }
                if ("centerY" in c) {
                    l.scalingCenterY = c.centerY
                }
            }
        }
        if (typeof m !== "undefined") {
            if (Ext.isNumber(m)) {
                m = Ext.draw.Draw.rad(m);
                l.rotationRads = m
            } else {
                if ("rads" in m) {
                    l.rotationRads = m.rads
                } else {
                    if ("degrees" in m) {
                        l.rotationRads = Ext.draw.Draw.rad(m.degrees)
                    }
                }
                if ("centerX" in m) {
                    l.rotationCenterX = m.centerX
                }
                if ("centerY" in m) {
                    l.rotationCenterY = m.centerY
                }
            }
        }
        if ("matrix" in j) {
            i = Ext.draw.Matrix.create(j.matrix);
            h = i.split();
            l.matrix = i;
            l.rotationRads = h.rotation;
            l.rotationCenterX = 0;
            l.rotationCenterY = 0;
            l.scalingX = h.scaleX;
            l.scalingY = h.scaleY;
            l.scalingCenterX = 0;
            l.scalingCenterY = 0;
            l.translationX = h.translateX;
            l.translationY = h.translateY
        }
        for (b in j) {
            e = j[b];
            if (typeof e === "undefined") {
                continue
            }
            if (b in d) {
                b = d[b]
            }
            if (b in g) {
                e = g[b].call(this, e);
                if (typeof e !== "undefined") {
                    l[b] = e
                }
            } else {
                if (k) {
                    l[b] = e
                }
            }
        }
        return l
    },
    setBypassingNormalization: function (a, c, b) {
        return c.pushDown(a, b)
    },
    set: function (a, c, b) {
        b = this.normalize(b);
        return this.setBypassingNormalization(a, c, b)
    }
});
Ext.define("Ext.draw.Matrix", {
    isMatrix: true,
    statics: {
        createAffineMatrixFromTwoPair: function (h, t, g, s, k, o, i, j) {
            var v = g - h, u = s - t, e = i - k, q = j - o, d = 1 / (v * v + u * u), p = v * e + u * q, n = e * u - v * q, m = -p * h - n * t, l = n * h - p * t;
            return new this(p * d, -n * d, n * d, p * d, m * d + k, l * d + o)
        }, createPanZoomFromTwoPair: function (q, e, p, c, h, s, n, g) {
            if (arguments.length === 2) {
                return this.createPanZoomFromTwoPair.apply(this, q.concat(e))
            }
            var k = p - q, j = c - e, d = (q + p) * 0.5, b = (e + c) * 0.5, o = n - h, a = g - s, f = (h + n) * 0.5, l = (s + g) * 0.5, m = k * k + j * j, i = o * o + a * a, t = Math.sqrt(i / m);
            return new this(t, 0, 0, t, f - t * d, l - t * b)
        }, fly: (function () {
            var a = null, b = function (c) {
                a.elements = c;
                return a
            };
            return function (c) {
                if (!a) {
                    a = new Ext.draw.Matrix()
                }
                a.elements = c;
                Ext.draw.Matrix.fly = b;
                return a
            }
        })(), create: function (a) {
            if (a instanceof this) {
                return a
            }
            return new this(a)
        }
    },
    constructor: function (e, d, a, f, c, b) {
        if (e && e.length === 6) {
            this.elements = e.slice()
        } else {
            if (e !== undefined) {
                this.elements = [e, d, a, f, c, b]
            } else {
                this.elements = [1, 0, 0, 1, 0, 0]
            }
        }
    },
    prepend: function (a, l, h, g, m, k) {
        var b = this.elements, d = b[0], j = b[1], e = b[2], c = b[3], i = b[4], f = b[5];
        b[0] = a * d + h * j;
        b[1] = l * d + g * j;
        b[2] = a * e + h * c;
        b[3] = l * e + g * c;
        b[4] = a * i + h * f + m;
        b[5] = l * i + g * f + k;
        return this
    },
    prependMatrix: function (a) {
        return this.prepend.apply(this, a.elements)
    },
    append: function (a, l, h, g, m, k) {
        var b = this.elements, d = b[0], j = b[1], e = b[2], c = b[3], i = b[4], f = b[5];
        b[0] = a * d + l * e;
        b[1] = a * j + l * c;
        b[2] = h * d + g * e;
        b[3] = h * j + g * c;
        b[4] = m * d + k * e + i;
        b[5] = m * j + k * c + f;
        return this
    },
    appendMatrix: function (a) {
        return this.append.apply(this, a.elements)
    },
    set: function (f, e, a, g, c, b) {
        var d = this.elements;
        d[0] = f;
        d[1] = e;
        d[2] = a;
        d[3] = g;
        d[4] = c;
        d[5] = b;
        return this
    },
    inverse: function (i) {
        var g = this.elements, o = g[0], m = g[1], l = g[2], k = g[3], j = g[4], h = g[5], n = 1 / (o * k - m * l);
        o *= n;
        m *= n;
        l *= n;
        k *= n;
        if (i) {
            i.set(k, -m, -l, o, l * h - k * j, m * j - o * h);
            return i
        } else {
            return new Ext.draw.Matrix(k, -m, -l, o, l * h - k * j, m * j - o * h)
        }
    },
    translate: function (a, c, b) {
        if (b) {
            return this.prepend(1, 0, 0, 1, a, c)
        } else {
            return this.append(1, 0, 0, 1, a, c)
        }
    },
    scale: function (f, e, c, a, b) {
        var d = this;
        if (e == null) {
            e = f
        }
        if (c === undefined) {
            c = 0
        }
        if (a === undefined) {
            a = 0
        }
        if (b) {
            return d.prepend(f, 0, 0, e, c - c * f, a - a * e)
        } else {
            return d.append(f, 0, 0, e, c - c * f, a - a * e)
        }
    },
    rotate: function (g, e, c, b) {
        var d = this, f = Math.cos(g), a = Math.sin(g);
        e = e || 0;
        c = c || 0;
        if (b) {
            return d.prepend(f, a, -a, f, e - f * e + c * a, c - f * c - e * a)
        } else {
            return d.append(f, a, -a, f, e - f * e + c * a, c - f * c - e * a)
        }
    },
    rotateFromVector: function (a, h, c) {
        var e = this, g = Math.sqrt(a * a + h * h), f = a / g, b = h / g;
        if (c) {
            return e.prepend(f, b, -b, f, 0, 0)
        } else {
            return e.append(f, b, -b, f, 0, 0)
        }
    },
    clone: function () {
        return new Ext.draw.Matrix(this.elements)
    },
    flipX: function () {
        return this.append(-1, 0, 0, 1, 0, 0)
    },
    flipY: function () {
        return this.append(1, 0, 0, -1, 0, 0)
    },
    skewX: function (a) {
        return this.append(1, Math.tan(a), 0, -1, 0, 0)
    },
    skewY: function (a) {
        return this.append(1, 0, Math.tan(a), -1, 0, 0)
    },
    reset: function () {
        return this.set(1, 0, 0, 1, 0, 0)
    },
    precisionCompensate: function (j, g) {
        var c = this.elements, f = c[0], e = c[1], i = c[2], h = c[3], d = c[4], b = c[5], a = e * i - f * h;
        g.b = j * e / f;
        g.c = j * i / h;
        g.d = j;
        g.xx = f / j;
        g.yy = h / j;
        g.dx = (b * f * i - d * f * h) / a / j;
        g.dy = (d * e * h - b * f * h) / a / j
    },
    precisionCompensateRect: function (j, g) {
        var b = this.elements, f = b[0], e = b[1], i = b[2], h = b[3], c = b[4], a = b[5], d = i / f;
        g.b = j * e / f;
        g.c = j * d;
        g.d = j * h / f;
        g.xx = f / j;
        g.yy = f / j;
        g.dx = (a * i - c * h) / (e * d - h) / j;
        g.dy = -(a * f - c * e) / (e * d - h) / j
    },
    x: function (a, c) {
        var b = this.elements;
        return a * b[0] + c * b[2] + b[4]
    },
    y: function (a, c) {
        var b = this.elements;
        return a * b[1] + c * b[3] + b[5]
    },
    get: function (b, a) {
        return +this.elements[b + a * 2].toFixed(4)
    },
    transformPoint: function (a) {
        var b = this.elements;
        return [a[0] * b[0] + a[1] * b[2] + b[4], a[0] * b[1] + a[1] * b[3] + b[5]]
    },
    transformBBox: function (q, i, j) {
        var b = this.elements, d = q.x, r = q.y, g = q.width * 0.5, o = q.height * 0.5, a = b[0], s = b[1], n = b[2], k = b[3], e = d + g, c = r + o, p, f, m;
        if (i) {
            g -= i;
            o -= i;
            m = [Math.sqrt(b[0] * b[0] + b[2] * b[2]), Math.sqrt(b[1] * b[1] + b[3] * b[3])];
            p = Math.abs(g * a) + Math.abs(o * n) + Math.abs(m[0] * i);
            f = Math.abs(g * s) + Math.abs(o * k) + Math.abs(m[1] * i)
        } else {
            p = Math.abs(g * a) + Math.abs(o * n);
            f = Math.abs(g * s) + Math.abs(o * k)
        }
        if (!j) {
            j = {}
        }
        j.x = e * a + c * n + b[4] - p;
        j.y = e * s + c * k + b[5] - f;
        j.width = p + p;
        j.height = f + f;
        return j
    },
    transformList: function (e) {
        var b = this.elements, a = b[0], h = b[2], l = b[4], k = b[1], g = b[3], j = b[5], f = e.length, c, d;
        for (d = 0; d < f; d++) {
            c = e[d];
            e[d] = [c[0] * a + c[1] * h + l, c[0] * k + c[1] * g + j]
        }
        return e
    },
    isIdentity: function () {
        var a = this.elements;
        return a[0] === 1 && a[1] === 0 && a[2] === 0 && a[3] === 1 && a[4] === 0 && a[5] === 0
    },
    equals: function (a) {
        var c = this.elements, b = a.elements;
        return c[0] === b[0] && c[1] === b[1] && c[2] === b[2] && c[3] === b[3] && c[4] === b[4] && c[5] === b[5]
    },
    toArray: function () {
        var a = this.elements;
        return [a[0], a[2], a[4], a[1], a[3], a[5]]
    },
    toVerticalArray: function () {
        return this.elements.slice()
    },
    toString: function () {
        var a = this;
        return [a.get(0, 0), a.get(0, 1), a.get(1, 0), a.get(1, 1), a.get(2, 0), a.get(2, 1)].join(",")
    },
    toContext: function (a) {
        a.transform.apply(a, this.elements);
        return this
    },
    toSvg: function () {
        var a = this.elements;
        return "matrix(" + a[0].toFixed(9) + "," + a[1].toFixed(9) + "," + a[2].toFixed(9) + "," + a[3].toFixed(9) + "," + a[4].toFixed(9) + "," + a[5].toFixed(9) + ")"
    },
    getScaleX: function () {
        var a = this.elements;
        return Math.sqrt(a[0] * a[0] + a[2] * a[2])
    },
    getScaleY: function () {
        var a = this.elements;
        return Math.sqrt(a[1] * a[1] + a[3] * a[3])
    },
    getXX: function () {
        return this.elements[0]
    },
    getXY: function () {
        return this.elements[1]
    },
    getYX: function () {
        return this.elements[2]
    },
    getYY: function () {
        return this.elements[3]
    },
    getDX: function () {
        return this.elements[4]
    },
    getDY: function () {
        return this.elements[5]
    },
    split: function () {
        var c = this.elements, e = c[0], d = c[1], a = c[2], f = c[3], b = {translateX: c[4], translateY: c[5]};
        b.scaleX = Ext.Number.sign(e) * Math.sqrt(e * e + a * a);
        b.scaleY = Ext.Number.sign(f) * Math.sqrt(d * d + f * f);
        b.rotation = Math.atan2(d, f);
        return b
    }
}, function () {
    function b(e, c, d) {
        e[c] = {
            get: function () {
                return this.elements[d]
            }, set: function (f) {
                this.elements[d] = f
            }
        }
    }

    if (Object.defineProperties) {
        var a = {};
        b(a, "a", 0);
        b(a, "b", 1);
        b(a, "c", 2);
        b(a, "d", 3);
        b(a, "e", 4);
        b(a, "f", 5);
        Object.defineProperties(this.prototype, a)
    }
    this.prototype.multiply = this.prototype.appendMatrix
});
Ext.define("Ext.draw.modifier.Modifier", {
    mixins: {observable: "Ext.mixin.Observable"},
    config: {previous: null, next: null, sprite: null},
    constructor: function (a) {
        this.mixins.observable.constructor.call(this, a)
    },
    updateNext: function (a) {
        if (a) {
            a.setPrevious(this)
        }
    },
    updatePrevious: function (a) {
        if (a) {
            a.setNext(this)
        }
    },
    prepareAttributes: function (a) {
        if (this._previous) {
            this._previous.prepareAttributes(a)
        }
    },
    popUp: function (a, b) {
        if (this._next) {
            this._next.popUp(a, b)
        } else {
            Ext.apply(a, b)
        }
    },
    pushDown: function (a, c) {
        if (this._previous) {
            return this._previous.pushDown(a, c)
        } else {
            for (var b in c) {
                if (c[b] === a[b]) {
                    delete c[b]
                }
            }
            return c
        }
    }
});
Ext.define("Ext.draw.modifier.Target", {
    requires: ["Ext.draw.Matrix"],
    extend: "Ext.draw.modifier.Modifier",
    alias: "modifier.target",
    statics: {uniqueId: 0},
    prepareAttributes: function (a) {
        var b = this.getPrevious();
        if (b) {
            b.prepareAttributes(a)
        }
        a.attributeId = "attribute-" + Ext.draw.modifier.Target.uniqueId++;
        if (!a.hasOwnProperty("canvasAttributes")) {
            a.bbox = {plain: {dirty: true}, transform: {dirty: true}};
            a.dirty = true;
            a.pendingUpdaters = {};
            a.canvasAttributes = {};
            a.matrix = new Ext.draw.Matrix();
            a.inverseMatrix = new Ext.draw.Matrix()
        }
    },
    applyChanges: function (f, k) {
        Ext.apply(f, k);
        var l = this.getSprite(), o = f.pendingUpdaters, h = l.self.def.getTriggers(), p, a, m, b, e, n, d, c, g;
        for (b in k) {
            e = true;
            if ((p = h[b])) {
                l.scheduleUpdaters(f, p, [b])
            }
            if (f.template && k.removeFromInstance && k.removeFromInstance[b]) {
                delete f[b]
            }
        }
        if (!e) {
            return
        }
        if (o.canvas) {
            n = o.canvas;
            delete o.canvas;
            for (d = 0, g = n.length; d < g; d++) {
                b = n[d];
                f.canvasAttributes[b] = f[b]
            }
        }
        if (f.hasOwnProperty("children")) {
            a = f.children;
            for (d = 0, g = a.length; d < g; d++) {
                m = a[d];
                Ext.apply(m.pendingUpdaters, o);
                if (n) {
                    for (c = 0; c < n.length; c++) {
                        b = n[c];
                        m.canvasAttributes[b] = m[b]
                    }
                }
                l.callUpdaters(m)
            }
        }
        l.setDirty(true);
        l.callUpdaters(f)
    },
    popUp: function (a, b) {
        this.applyChanges(a, b)
    },
    pushDown: function (a, b) {
        var c = this.getPrevious();
        if (c) {
            b = c.pushDown(a, b)
        }
        this.applyChanges(a, b);
        return b
    }
});
(function () {
    var f = Math.pow, j = Math.sin, m = Math.cos, k = Math.sqrt, e = Math.PI, c, n, a, h, g, d, b;
    a = ["quad", "cubic", "quart", "quint"];
    c = {
        pow: function (l, i) {
            return f(l, i[0] || 6)
        }, expo: function (i) {
            return f(2, 8 * (i - 1))
        }, circ: function (i) {
            return 1 - k(1 - i * i)
        }, sine: function (i) {
            return 1 - j((1 - i) * e / 2)
        }, back: function (i, l) {
            l = l || 1.616;
            return i * i * ((l + 1) * i - l)
        }, bounce: function (q) {
            var o;
            for (var l = 0, i = 1; 1; l += i, i /= 2) {
                if (q >= (7 - 4 * l) / 11) {
                    o = i * i - f((11 - 6 * l - 11 * q) / 4, 2);
                    break
                }
            }
            return o
        }, elastic: function (l, i) {
            return f(2, 10 * --l) * m(20 * l * e * (i || 1) / 3)
        }
    };
    n = function (l, i) {
        i = i && i.length ? i : [i];
        return Ext.apply(l, {
            easeIn: function (o) {
                return l(o, i)
            }, easeOut: function (o) {
                return 1 - l(1 - o, i)
            }, easeInOut: function (o) {
                return (o <= 0.5) ? l(2 * o, i) / 2 : (2 - l(2 * (1 - o), i)) / 2
            }
        })
    };
    h = function (i) {
        return function (l) {
            return f(l, i)
        }
    };
    for (d = 0, b = a.length; d < b; ++d) {
        c[a[d]] = h(d + 2)
    }
    c.linear = function (i) {
        return i
    };
    for (g in c) {
        if (c.hasOwnProperty(g)) {
            n(c[g])
        }
    }
    Ext.define("Ext.draw.TimingFunctions", {
        singleton: true,
        easingMap: {
            linear: c.linear,
            easeIn: c.quad.easeIn,
            easeOut: c.quad.easeOut,
            easeInOut: c.quad.easeInOut,
            backIn: c.back,
            backOut: function (i, l) {
                return 1 - c.back(1 - i, l)
            },
            backInOut: function (i, l) {
                if (i < 0.5) {
                    return c.back(i * 2, l) * 0.5
                } else {
                    return 1 - c.back((1 - i) * 2, l) * 0.5
                }
            },
            elasticIn: function (i, l) {
                return 1 - c.elastic(1 - i, l)
            },
            elasticOut: c.elastic,
            bounceIn: c.bounce,
            bounceOut: function (i) {
                return 1 - c.bounce(1 - i)
            }
        }
    }, function () {
        Ext.apply(this, c)
    })
})();
Ext.define("Ext.draw.Animator", {
    uses: ["Ext.draw.Draw"],
    singleton: true,
    frameCallbacks: {},
    frameCallbackId: 0,
    scheduled: 0,
    frameStartTimeOffset: Ext.now(),
    animations: [],
    running: false,
    animationTime: function () {
        return Ext.AnimationQueue.frameStartTime - this.frameStartTimeOffset
    },
    add: function (b) {
        var a = this;
        if (!a.contains(b)) {
            a.animations.push(b);
            a.ignite();
            if ("fireEvent" in b) {
                b.fireEvent("animationstart", b)
            }
        }
    },
    remove: function (d) {
        var c = this, e = c.animations, b = 0, a = e.length;
        for (; b < a; ++b) {
            if (e[b] === d) {
                e.splice(b, 1);
                if ("fireEvent" in d) {
                    d.fireEvent("animationend", d)
                }
                return
            }
        }
    },
    contains: function (a) {
        return Ext.Array.indexOf(this.animations, a) > -1
    },
    empty: function () {
        return this.animations.length === 0
    },
    step: function (d) {
        var c = this, f = c.animations, e, a = 0, b = f.length;
        for (; a < b; a++) {
            e = f[a];
            e.step(d);
            if (!e.animating) {
                f.splice(a, 1);
                a--;
                b--;
                if (e.fireEvent) {
                    e.fireEvent("animationend")
                }
            }
        }
    },
    schedule: function (c, a) {
        a = a || this;
        var b = "frameCallback" + (this.frameCallbackId++);
        if (Ext.isString(c)) {
            c = a[c]
        }
        Ext.draw.Animator.frameCallbacks[b] = {fn: c, scope: a, once: true};
        this.scheduled++;
        Ext.draw.Animator.ignite();
        return b
    },
    cancel: function (a) {
        if (Ext.draw.Animator.frameCallbacks[a] && Ext.draw.Animator.frameCallbacks[a].once) {
            this.scheduled--;
            delete Ext.draw.Animator.frameCallbacks[a]
        }
    },
    addFrameCallback: function (c, a) {
        a = a || this;
        if (Ext.isString(c)) {
            c = a[c]
        }
        var b = "frameCallback" + (this.frameCallbackId++);
        Ext.draw.Animator.frameCallbacks[b] = {fn: c, scope: a};
        return b
    },
    removeFrameCallback: function (a) {
        delete Ext.draw.Animator.frameCallbacks[a]
    },
    fireFrameCallbacks: function () {
        var c = this.frameCallbacks, d, b, a;
        for (d in c) {
            a = c[d];
            b = a.fn;
            if (Ext.isString(b)) {
                b = a.scope[b]
            }
            b.call(a.scope);
            if (c[d] && a.once) {
                this.scheduled--;
                delete c[d]
            }
        }
    },
    handleFrame: function () {
        this.step(this.animationTime());
        this.fireFrameCallbacks();
        if (!this.scheduled && this.empty()) {
            Ext.AnimationQueue.stop(this.handleFrame, this);
            this.running = false
        }
    },
    ignite: function () {
        if (!this.running) {
            this.running = true;
            Ext.AnimationQueue.start(this.handleFrame, this);
            Ext.draw.Draw.updateIOS()
        }
    }
});
Ext.define("Ext.draw.modifier.Animation", {
    requires: ["Ext.draw.TimingFunctions", "Ext.draw.Animator"],
    extend: "Ext.draw.modifier.Modifier",
    alias: "modifier.animation",
    config: {
        easing: function (a) {
            return a
        }, duration: 0, customEasings: {}, customDurations: {}, customDuration: null
    },
    constructor: function () {
        this.anyAnimation = false;
        this.anySpecialAnimations = false;
        this.animating = 0;
        this.animatingPool = [];
        this.callParent(arguments)
    },
    prepareAttributes: function (a) {
        if (!a.hasOwnProperty("timers")) {
            a.animating = false;
            a.timers = {};
            a.animationOriginal = Ext.Object.chain(a);
            a.animationOriginal.prototype = a
        }
        if (this._previous) {
            this._previous.prepareAttributes(a.animationOriginal)
        }
    },
    updateSprite: function (a) {
        this.setConfig(a.config.fx)
    },
    updateDuration: function (a) {
        this.anyAnimation = a > 0
    },
    applyEasing: function (a) {
        if (typeof a === "string") {
            return Ext.draw.TimingFunctions.easingMap[a]
        } else {
            return a
        }
    },
    applyCustomEasings: function (a, e) {
        e = e || {};
        var g, d, b, h, c, f;
        for (d in a) {
            g = true;
            h = a[d];
            b = d.split(",");
            if (typeof h === "string") {
                h = Ext.draw.TimingFunctions.easingMap[h]
            }
            for (c = 0, f = b.length; c < f; c++) {
                e[b[c]] = h
            }
        }
        if (g) {
            this.anySpecialAnimations = g
        }
        return e
    },
    setEasingOn: function (a, e) {
        a = Ext.Array.from(a).slice();
        var c = {}, d = a.length, b = 0;
        for (; b < d; b++) {
            c[a[b]] = e
        }
        this.setCustomEasings(c)
    },
    clearEasingOn: function (a) {
        a = Ext.Array.from(a, true);
        var b = 0, c = a.length;
        for (; b < c; b++) {
            delete this._customEasings[a[b]]
        }
    },
    applyCustomDurations: function (g, h) {
        h = h || {};
        var e, c, f, a, b, d;
        for (c in g) {
            e = true;
            f = g[c];
            a = c.split(",");
            for (b = 0, d = a.length; b < d; b++) {
                h[a[b]] = f
            }
        }
        if (e) {
            this.anySpecialAnimations = e
        }
        return h
    },
    applyCustomDuration: function (a, b) {
        if (a) {
            this.getCustomDurations();
            this.setCustomDurations(a)
        }
    },
    setDurationOn: function (b, e) {
        b = Ext.Array.from(b).slice();
        var a = {}, c = 0, d = b.length;
        for (; c < d; c++) {
            a[b[c]] = e
        }
        this.setCustomDurations(a)
    },
    clearDurationOn: function (a) {
        a = Ext.Array.from(a, true);
        var b = 0, c = a.length;
        for (; b < c; b++) {
            delete this._customDurations[a[b]]
        }
    },
    setAnimating: function (a, b) {
        var e = this, d = e.animatingPool;
        if (a.animating !== b) {
            a.animating = b;
            if (b) {
                d.push(a);
                if (e.animating === 0) {
                    Ext.draw.Animator.add(e)
                }
                e.animating++
            } else {
                for (var c = d.length; c--;) {
                    if (d[c] === a) {
                        d.splice(c, 1)
                    }
                }
                e.animating = d.length
            }
        }
    },
    setAttrs: function (r, s) {
        var m = r.timers, h = this._sprite.self.def._animationProcessors, f = this._easing, e = this._duration, j = this._customDurations, i = this._customEasings, g = this.anySpecialAnimations, n = this.anyAnimation || g, o = r.animationOriginal, d = false, k, t, l, p, c, q, a;
        if (!n) {
            for (t in s) {
                if (r[t] === s[t]) {
                    delete s[t]
                } else {
                    r[t] = s[t]
                }
                delete o[t];
                delete m[t]
            }
            return s
        } else {
            for (t in s) {
                l = s[t];
                p = r[t];
                if (l !== p && p !== undefined && p !== null && (c = h[t])) {
                    q = f;
                    a = e;
                    if (g) {
                        if (t in i) {
                            q = i[t]
                        }
                        if (t in j) {
                            a = j[t]
                        }
                    }
                    if (p && p.isGradient || l && l.isGradient) {
                        a = 0
                    }
                    if (a) {
                        if (!m[t]) {
                            m[t] = {}
                        }
                        k = m[t];
                        k.start = 0;
                        k.easing = q;
                        k.duration = a;
                        k.compute = c.compute;
                        k.serve = c.serve || Ext.identityFn;
                        k.remove = s.removeFromInstance && s.removeFromInstance[t];
                        if (c.parseInitial) {
                            var b = c.parseInitial(p, l);
                            k.source = b[0];
                            k.target = b[1]
                        } else {
                            if (c.parse) {
                                k.source = c.parse(p);
                                k.target = c.parse(l)
                            } else {
                                k.source = p;
                                k.target = l
                            }
                        }
                        o[t] = l;
                        delete s[t];
                        d = true;
                        continue
                    } else {
                        delete o[t]
                    }
                } else {
                    delete o[t]
                }
                delete m[t]
            }
        }
        if (d && !r.animating) {
            this.setAnimating(r, true)
        }
        return s
    },
    updateAttributes: function (g) {
        if (!g.animating) {
            return {}
        }
        var h = {}, e = false, d = g.timers, f = g.animationOriginal, c = Ext.draw.Animator.animationTime(), a, b, i;
        if (g.lastUpdate === c) {
            return {}
        }
        for (a in d) {
            b = d[a];
            if (!b.start) {
                b.start = c;
                i = 0
            } else {
                i = (c - b.start) / b.duration
            }
            if (i >= 1) {
                h[a] = f[a];
                delete f[a];
                if (d[a].remove) {
                    h.removeFromInstance = h.removeFromInstance || {};
                    h.removeFromInstance[a] = true
                }
                delete d[a]
            } else {
                h[a] = b.serve(b.compute(b.source, b.target, b.easing(i), g[a]));
                e = true
            }
        }
        g.lastUpdate = c;
        this.setAnimating(g, e);
        return h
    },
    pushDown: function (a, b) {
        b = this.callParent([a.animationOriginal, b]);
        return this.setAttrs(a, b)
    },
    popUp: function (a, b) {
        a = a.prototype;
        b = this.setAttrs(a, b);
        if (this._next) {
            return this._next.popUp(a, b)
        } else {
            return Ext.apply(a, b)
        }
    },
    step: function (h) {
        var g = this, d = g.animatingPool.slice(), a, c, f;
        for (c = 0, f = d.length; c < f; c++) {
            a = d[c];
            var e = this.updateAttributes(a), b;
            for (b in e) {
                if (this._next) {
                    this._next.popUp(a, e)
                }
                break
            }
        }
    },
    stop: function () {
        this.step();
        var d = this, b = d.animatingPool, a, c;
        for (a = 0, c = b.length; a < c; a++) {
            b[a].animating = false
        }
        d.animatingPool.length = 0;
        d.animating = 0;
        Ext.draw.Animator.remove(d)
    },
    destroy: function () {
        var a = this;
        a.animatingPool.length = 0;
        a.animating = 0
    }
});
Ext.define("Ext.draw.modifier.Highlight", {
    extend: "Ext.draw.modifier.Modifier",
    alias: "modifier.highlight",
    config: {enabled: false, highlightStyle: null},
    preFx: true,
    applyHighlightStyle: function (b, a) {
        a = a || {};
        if (this.getSprite()) {
            Ext.apply(a, this.getSprite().self.def.normalize(b))
        } else {
            Ext.apply(a, b)
        }
        return a
    },
    prepareAttributes: function (a) {
        if (!a.hasOwnProperty("highlightOriginal")) {
            a.highlighted = false;
            a.highlightOriginal = Ext.Object.chain(a);
            a.highlightOriginal.prototype = a;
            a.highlightOriginal.removeFromInstance = {}
        }
        if (this._previous) {
            this._previous.prepareAttributes(a.highlightOriginal)
        }
    },
    updateSprite: function (b, a) {
        if (b) {
            if (this.getHighlightStyle()) {
                this._highlightStyle = b.self.def.normalize(this.getHighlightStyle())
            }
            this.setHighlightStyle(b.config.highlight)
        }
        b.self.def.setConfig({defaults: {highlighted: false}, processors: {highlighted: "bool"}});
        this.setSprite(b)
    },
    filterChanges: function (a, d) {
        var e = this, f = a.highlightOriginal, c = e.getHighlightStyle(), b;
        if (a.highlighted) {
            for (b in d) {
                if (c.hasOwnProperty(b)) {
                    f[b] = d[b];
                    delete d[b]
                }
            }
        }
        for (b in d) {
            if (b !== "highlighted" && f[b] === d[b]) {
                delete d[b]
            }
        }
        return d
    },
    pushDown: function (e, g) {
        var f = this.getHighlightStyle(), c = e.highlightOriginal, i = c.removeFromInstance, d, a, h, b;
        if (g.hasOwnProperty("highlighted")) {
            d = g.highlighted;
            delete g.highlighted;
            if (this._previous) {
                g = this._previous.pushDown(c, g)
            }
            g = this.filterChanges(e, g);
            if (d !== e.highlighted) {
                if (d) {
                    for (a in f) {
                        if (a in g) {
                            c[a] = g[a]
                        } else {
                            h = e.template && e.template.ownAttr;
                            if (h && !e.prototype.hasOwnProperty(a)) {
                                i[a] = true;
                                c[a] = h.animationOriginal[a]
                            } else {
                                b = c.timers[a];
                                if (b && b.remove) {
                                    i[a] = true
                                }
                                c[a] = e[a]
                            }
                        }
                        if (c[a] !== f[a]) {
                            g[a] = f[a]
                        }
                    }
                } else {
                    for (a in f) {
                        if (!(a in g)) {
                            g[a] = c[a]
                        }
                        delete c[a]
                    }
                    g.removeFromInstance = g.removeFromInstance || {};
                    Ext.apply(g.removeFromInstance, i);
                    c.removeFromInstance = {}
                }
                g.highlighted = d
            }
        } else {
            if (this._previous) {
                g = this._previous.pushDown(c, g)
            }
            g = this.filterChanges(e, g)
        }
        return g
    },
    popUp: function (a, b) {
        b = this.filterChanges(a, b);
        Ext.draw.modifier.Modifier.prototype.popUp.call(this, a, b)
    }
});
Ext.define("Ext.draw.sprite.Sprite", {
    alias: "sprite.sprite",
    mixins: {observable: "Ext.mixin.Observable"},
    requires: ["Ext.draw.Draw", "Ext.draw.gradient.Gradient", "Ext.draw.sprite.AttributeDefinition", "Ext.draw.modifier.Target", "Ext.draw.modifier.Animation", "Ext.draw.modifier.Highlight"],
    isSprite: true,
    inheritableStatics: {
        def: {
            processors: {
                strokeStyle: "color",
                fillStyle: "color",
                strokeOpacity: "limited01",
                fillOpacity: "limited01",
                lineWidth: "number",
                lineCap: "enums(butt,round,square)",
                lineJoin: "enums(round,bevel,miter)",
                lineDash: "data",
                lineDashOffset: "number",
                miterLimit: "number",
                shadowColor: "color",
                shadowOffsetX: "number",
                shadowOffsetY: "number",
                shadowBlur: "number",
                globalAlpha: "limited01",
                globalCompositeOperation: "enums(source-over,destination-over,source-in,destination-in,source-out,destination-out,source-atop,destination-atop,lighter,xor,copy)",
                hidden: "bool",
                transformFillStroke: "bool",
                zIndex: "number",
                translationX: "number",
                translationY: "number",
                rotationRads: "number",
                rotationCenterX: "number",
                rotationCenterY: "number",
                scalingX: "number",
                scalingY: "number",
                scalingCenterX: "number",
                scalingCenterY: "number",
                constrainGradients: "bool"
            },
            aliases: {
                stroke: "strokeStyle",
                fill: "fillStyle",
                color: "fillStyle",
                "stroke-width": "lineWidth",
                "stroke-linecap": "lineCap",
                "stroke-linejoin": "lineJoin",
                "stroke-miterlimit": "miterLimit",
                "text-anchor": "textAlign",
                opacity: "globalAlpha",
                translateX: "translationX",
                translateY: "translationY",
                rotateRads: "rotationRads",
                rotateCenterX: "rotationCenterX",
                rotateCenterY: "rotationCenterY",
                scaleX: "scalingX",
                scaleY: "scalingY",
                scaleCenterX: "scalingCenterX",
                scaleCenterY: "scalingCenterY"
            },
            defaults: {
                hidden: false,
                zIndex: 0,
                strokeStyle: "none",
                fillStyle: "none",
                lineWidth: 1,
                lineDash: [],
                lineDashOffset: 0,
                lineCap: "butt",
                lineJoin: "miter",
                miterLimit: 10,
                shadowColor: "none",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                globalAlpha: 1,
                strokeOpacity: 1,
                fillOpacity: 1,
                transformFillStroke: false,
                translationX: 0,
                translationY: 0,
                rotationRads: 0,
                rotationCenterX: null,
                rotationCenterY: null,
                scalingX: 1,
                scalingY: 1,
                scalingCenterX: null,
                scalingCenterY: null,
                constrainGradients: false
            },
            triggers: {
                hidden: "canvas",
                zIndex: "zIndex",
                globalAlpha: "canvas",
                globalCompositeOperation: "canvas",
                transformFillStroke: "canvas",
                strokeStyle: "canvas",
                fillStyle: "canvas",
                strokeOpacity: "canvas",
                fillOpacity: "canvas",
                lineWidth: "canvas",
                lineCap: "canvas",
                lineJoin: "canvas",
                lineDash: "canvas",
                lineDashOffset: "canvas",
                miterLimit: "canvas",
                shadowColor: "canvas",
                shadowOffsetX: "canvas",
                shadowOffsetY: "canvas",
                shadowBlur: "canvas",
                translationX: "transform",
                translationY: "transform",
                rotationRads: "transform",
                rotationCenterX: "transform",
                rotationCenterY: "transform",
                scalingX: "transform",
                scalingY: "transform",
                scalingCenterX: "transform",
                scalingCenterY: "transform",
                constrainGradients: "canvas"
            },
            updaters: {
                bbox: function (b) {
                    var c = b.rotationRads !== 0, a = b.scalingX !== 1 || b.scalingY !== 1, d = b.rotationCenterX === null || b.rotationCenterY === null, e = b.scalingCenterX === null || b.scalingCenterY === null;
                    b.bbox.plain.dirty = true;
                    b.bbox.transform.dirty = true;
                    if (c && d || a && e) {
                        this.scheduleUpdaters(b, {transform: []})
                    }
                }, zIndex: function (a) {
                    a.dirtyZIndex = true
                }, transform: function (a) {
                    a.dirtyTransform = true;
                    a.bbox.transform.dirty = true
                }
            }
        }
    },
    attr: {},
    config: {parent: null, surface: null},
    onClassExtended: function (d, c) {
        var b = d.superclass.self.def.initialConfig, a;
        if (c.inheritableStatics && c.inheritableStatics.def) {
            a = Ext.merge({}, b, c.inheritableStatics.def);
            d.def = Ext.create("Ext.draw.sprite.AttributeDefinition", a);
            delete c.inheritableStatics.def
        } else {
            d.def = Ext.create("Ext.draw.sprite.AttributeDefinition", b)
        }
    },
    constructor: function (b) {
        var c = this;
        b = Ext.isObject(b) ? b : {};
        c.id = b.id || Ext.id(null, "ext-sprite-");
        c.attr = {};
        c.mixins.observable.constructor.apply(c, arguments);
        var a = Ext.Array.from(b.modifiers, true);
        c.prepareModifiers(a);
        c.initializeAttributes();
        c.setAttributes(c.self.def.getDefaults(), true);
        c.setAttributes(b)
    },
    getDirty: function () {
        return this.attr.dirty
    },
    setDirty: function (a) {
        if ((this.attr.dirty = a)) {
            if (this._parent) {
                this._parent.setDirty(true)
            }
        }
    },
    addModifier: function (a, b) {
        var c = this;
        if (!(a instanceof Ext.draw.modifier.Modifier)) {
            a = Ext.factory(a, null, null, "modifier")
        }
        a.setSprite(this);
        if (a.preFx || a.config && a.config.preFx) {
            if (c.fx.getPrevious()) {
                c.fx.getPrevious().setNext(a)
            }
            a.setNext(c.fx)
        } else {
            c.topModifier.getPrevious().setNext(a);
            a.setNext(c.topModifier)
        }
        if (b) {
            c.initializeAttributes()
        }
        return a
    },
    prepareModifiers: function (d) {
        var c = this, a, b;
        c.topModifier = new Ext.draw.modifier.Target({sprite: c});
        c.fx = new Ext.draw.modifier.Animation({sprite: c});
        c.fx.setNext(c.topModifier);
        for (a = 0, b = d.length; a < b; a++) {
            c.addModifier(d[a], false)
        }
    },
    initializeAttributes: function () {
        var a = this;
        a.topModifier.prepareAttributes(a.attr)
    },
    callUpdaters: function (a) {
        var e = this, h = a.pendingUpdaters, d = e.self.def.getUpdaters(), f = false, c = false, b, g;
        e.callUpdaters = Ext.emptyFn;
        do {
            f = false;
            for (g in h) {
                f = true;
                b = h[g];
                delete h[g];
                if (d[g]) {
                    d[g].call(e, a, b)
                }
            }
            c = c || f
        } while (f);
        delete e.callUpdaters;
        if (c) {
            e.setDirty(true)
        }
    },
    scheduleUpdaters: function (a, e, c) {
        var h = a.pendingUpdaters, g;

        function f() {
            if (g in h) {
                if (c.length) {
                    h[g] = Ext.Array.merge(h[g], c)
                }
            } else {
                h[g] = c
            }
        }

        if (c) {
            for (var b = 0, d = e.length; b < d; b++) {
                g = e[b];
                f()
            }
        } else {
            for (g in e) {
                c = e[g];
                f()
            }
        }
    },
    setAttributes: function (c, d, b) {
        var a = this.attr;
        if (d) {
            if (b) {
                this.topModifier.pushDown(a, c)
            } else {
                this.topModifier.pushDown(a, Ext.apply({}, c))
            }
        } else {
            this.topModifier.pushDown(a, this.self.def.normalize(c))
        }
    },
    setAttributesBypassingNormalization: function (b, a) {
        return this.setAttributes(b, true, a)
    },
    getBBox: function (d) {
        var e = this, a = e.attr, f = a.bbox, c = f.plain, b = f.transform;
        if (c.dirty) {
            e.updatePlainBBox(c);
            c.dirty = false
        }
        if (d) {
            return c
        } else {
            e.applyTransformations();
            if (b.dirty) {
                e.updateTransformedBBox(b, c);
                b.dirty = false
            }
            return b
        }
    },
    updatePlainBBox: Ext.emptyFn,
    updateTransformedBBox: function (a, b) {
        this.attr.matrix.transformBBox(b, 0, a)
    },
    getBBoxCenter: function (a) {
        var b = this.getBBox(a);
        if (b) {
            return [b.x + b.width * 0.5, b.y + b.height * 0.5]
        } else {
            return [0, 0]
        }
    },
    hide: function () {
        this.attr.hidden = true;
        this.setDirty(true);
        return this
    },
    show: function () {
        this.attr.hidden = false;
        this.setDirty(true);
        return this
    },
    useAttributes: function (i, f) {
        this.applyTransformations();
        var d = this.attr, h = d.canvasAttributes, e = h.strokeStyle, g = h.fillStyle, b = h.lineDash, c = h.lineDashOffset, a;
        if (e) {
            if (e.isGradient) {
                i.strokeStyle = "black";
                i.strokeGradient = e
            } else {
                i.strokeGradient = false
            }
        }
        if (g) {
            if (g.isGradient) {
                i.fillStyle = "black";
                i.fillGradient = g
            } else {
                i.fillGradient = false
            }
        }
        if (b) {
            i.setLineDash(b)
        }
        if (Ext.isNumber(c + i.lineDashOffset)) {
            i.lineDashOffset = c
        }
        for (a in h) {
            if (h[a] !== undefined && h[a] !== i[a]) {
                i[a] = h[a]
            }
        }
        this.setGradientBBox(i, f)
    },
    setGradientBBox: function (b, c) {
        var a = this.attr;
        if (a.constrainGradients) {
            b.setGradientBBox({x: c[0], y: c[1], width: c[2], height: c[3]})
        } else {
            b.setGradientBBox(this.getBBox(a.transformFillStroke))
        }
    },
    applyTransformations: function (d) {
        if (!d && !this.attr.dirtyTransform) {
            return
        }
        var l = this, i = l.attr, a = l.getBBoxCenter(true), h = a[0], g = a[1], p = i.translationX, n = i.translationY, o = i.scalingX, m = i.scalingY === null ? i.scalingX : i.scalingY, f = i.scalingCenterX === null ? h : i.scalingCenterX, e = i.scalingCenterY === null ? g : i.scalingCenterY, k = i.rotationRads, c = i.rotationCenterX === null ? h : i.rotationCenterX, b = i.rotationCenterY === null ? g : i.rotationCenterY, q = Math.cos(k), j = Math.sin(k);
        if (o === 1 && m === 1) {
            f = 0;
            e = 0
        }
        if (k === 0) {
            c = 0;
            b = 0
        }
        i.matrix.elements = [q * o, j * m, -j * o, q * m, f + (c - q * c - f + b * j) * o + p, e + (b - q * b - e + c * -j) * m + n];
        i.matrix.inverse(i.inverseMatrix);
        i.dirtyTransform = false;
        i.bbox.transform.dirty = true
    },
    preRender: Ext.emptyFn,
    render: Ext.emptyFn,
    hitTest: function (b, c) {
        var a = b[0], e = b[1], d = this.getBBox();
        if (d && a >= d.left && a <= d.right && e >= d.top && e <= d.bottom) {
            return {sprite: this}
        }
        return null
    },
    repaint: function () {
        var a = this.getSurface();
        if (a) {
            a.renderFrame()
        }
    },
    destroy: function () {
        var b = this, a = b.topModifier, c;
        while (a) {
            c = a;
            a = a.getPrevious();
            c.destroy()
        }
        delete b.attr;
        b.destroy = Ext.emptyFn;
        if (b.fireEvent("beforedestroy", b) !== false) {
            b.fireEvent("destroy", b)
        }
        this.callParent()
    }
}, function () {
    this.def = Ext.create("Ext.draw.sprite.AttributeDefinition", this.def)
});
Ext.define("Ext.draw.Path", {
    requires: ["Ext.draw.Draw"],
    statics: {pathRe: /,?([achlmqrstvxz]),?/gi, pathRe2: /-/gi, pathSplitRe: /\s|,/g},
    svgString: "",
    constructor: function (a) {
        var b = this;
        b.commands = [];
        b.params = [];
        b.cursor = null;
        b.startX = 0;
        b.startY = 0;
        if (a) {
            b.fromSvgString(a)
        }
    },
    clear: function () {
        var a = this;
        a.params.length = 0;
        a.commands.length = 0;
        a.cursor = null;
        a.startX = 0;
        a.startY = 0;
        a.dirt()
    },
    dirt: function () {
        this.svgString = ""
    },
    moveTo: function (a, c) {
        var b = this;
        if (!b.cursor) {
            b.cursor = [a, c]
        }
        b.params.push(a, c);
        b.commands.push("M");
        b.startX = a;
        b.startY = c;
        b.cursor[0] = a;
        b.cursor[1] = c;
        b.dirt()
    },
    lineTo: function (a, c) {
        var b = this;
        if (!b.cursor) {
            b.cursor = [a, c];
            b.params.push(a, c);
            b.commands.push("M")
        } else {
            b.params.push(a, c);
            b.commands.push("L")
        }
        b.cursor[0] = a;
        b.cursor[1] = c;
        b.dirt()
    },
    bezierCurveTo: function (c, e, b, d, a, g) {
        var f = this;
        if (!f.cursor) {
            f.moveTo(c, e)
        }
        f.params.push(c, e, b, d, a, g);
        f.commands.push("C");
        f.cursor[0] = a;
        f.cursor[1] = g;
        f.dirt()
    },
    quadraticCurveTo: function (b, e, a, d) {
        var c = this;
        if (!c.cursor) {
            c.moveTo(b, e)
        }
        c.bezierCurveTo((2 * b + c.cursor[0]) / 3, (2 * e + c.cursor[1]) / 3, (2 * b + a) / 3, (2 * e + d) / 3, a, d)
    },
    closePath: function () {
        var a = this;
        if (a.cursor) {
            a.commands.push("Z");
            a.dirt()
        }
    },
    arcTo: function (A, f, z, d, j, i, v) {
        var E = this;
        if (i === undefined) {
            i = j
        }
        if (v === undefined) {
            v = 0
        }
        if (!E.cursor) {
            E.moveTo(A, f);
            return
        }
        if (j === 0 || i === 0) {
            E.lineTo(A, f);
            return
        }
        z -= A;
        d -= f;
        var B = E.cursor[0] - A, g = E.cursor[1] - f, C = z * g - d * B, b, a, l, r, k, q, x = Math.sqrt(B * B + g * g), u = Math.sqrt(z * z + d * d), t, e, c;
        if (C === 0) {
            E.lineTo(A, f);
            return
        }
        if (i !== j) {
            b = Math.cos(v);
            a = Math.sin(v);
            l = b / j;
            r = a / i;
            k = -a / j;
            q = b / i;
            var D = l * B + r * g;
            g = k * B + q * g;
            B = D;
            D = l * z + r * d;
            d = k * z + q * d;
            z = D
        } else {
            B /= j;
            g /= i;
            z /= j;
            d /= i
        }
        e = B * u + z * x;
        c = g * u + d * x;
        t = 1 / (Math.sin(Math.asin(Math.abs(C) / (x * u)) * 0.5) * Math.sqrt(e * e + c * c));
        e *= t;
        c *= t;
        var o = (e * B + c * g) / (B * B + g * g), m = (e * z + c * d) / (z * z + d * d);
        var n = B * o - e, p = g * o - c, h = z * m - e, y = d * m - c, w = Math.atan2(p, n), s = Math.atan2(y, h);
        if (C > 0) {
            if (s < w) {
                s += Math.PI * 2
            }
        } else {
            if (w < s) {
                w += Math.PI * 2
            }
        }
        if (i !== j) {
            e = b * e * j - a * c * i + A;
            c = a * c * i + b * c * i + f;
            E.lineTo(b * j * n - a * i * p + e, a * j * n + b * i * p + c);
            E.ellipse(e, c, j, i, v, w, s, C < 0)
        } else {
            e = e * j + A;
            c = c * i + f;
            E.lineTo(j * n + e, i * p + c);
            E.ellipse(e, c, j, i, v, w, s, C < 0)
        }
    },
    ellipse: function (h, f, c, a, q, n, d, e) {
        var o = this, g = o.params, b = g.length, m, l, k;
        if (d - n >= Math.PI * 2) {
            o.ellipse(h, f, c, a, q, n, n + Math.PI, e);
            o.ellipse(h, f, c, a, q, n + Math.PI, d, e);
            return
        }
        if (!e) {
            if (d < n) {
                d += Math.PI * 2
            }
            m = o.approximateArc(g, h, f, c, a, q, n, d)
        } else {
            if (n < d) {
                n += Math.PI * 2
            }
            m = o.approximateArc(g, h, f, c, a, q, d, n);
            for (l = b, k = g.length - 2; l < k; l += 2, k -= 2) {
                var p = g[l];
                g[l] = g[k];
                g[k] = p;
                p = g[l + 1];
                g[l + 1] = g[k + 1];
                g[k + 1] = p
            }
        }
        if (!o.cursor) {
            o.cursor = [g[g.length - 2], g[g.length - 1]];
            o.commands.push("M")
        } else {
            o.cursor[0] = g[g.length - 2];
            o.cursor[1] = g[g.length - 1];
            o.commands.push("L")
        }
        for (l = 2; l < m; l += 6) {
            o.commands.push("C")
        }
        o.dirt()
    },
    arc: function (b, f, a, d, c, e) {
        this.ellipse(b, f, a, a, 0, d, c, e)
    },
    rect: function (b, e, c, a) {
        if (c == 0 || a == 0) {
            return
        }
        var d = this;
        d.moveTo(b, e);
        d.lineTo(b + c, e);
        d.lineTo(b + c, e + a);
        d.lineTo(b, e + a);
        d.closePath()
    },
    approximateArc: function (s, i, f, o, n, d, x, v) {
        var e = Math.cos(d), z = Math.sin(d), k = Math.cos(x), l = Math.sin(x), q = e * k * o - z * l * n, y = -e * l * o - z * k * n, p = z * k * o + e * l * n, w = -z * l * o + e * k * n, m = Math.PI / 2, r = 2, j = q, u = y, h = p, t = w, b = 0.547443256150549, C, g, A, a, B, c;
        v -= x;
        if (v < 0) {
            v += Math.PI * 2
        }
        s.push(q + i, p + f);
        while (v >= m) {
            s.push(j + u * b + i, h + t * b + f, j * b + u + i, h * b + t + f, u + i, t + f);
            r += 6;
            v -= m;
            C = j;
            j = u;
            u = -C;
            C = h;
            h = t;
            t = -C
        }
        if (v) {
            g = (0.3294738052815987 + 0.012120855841304373 * v) * v;
            A = Math.cos(v);
            a = Math.sin(v);
            B = A + g * a;
            c = a - g * A;
            s.push(j + u * g + i, h + t * g + f, j * B + u * c + i, h * B + t * c + f, j * A + u * a + i, h * A + t * a + f);
            r += 6
        }
        return r
    },
    arcSvg: function (j, h, r, m, w, t, c) {
        if (j < 0) {
            j = -j
        }
        if (h < 0) {
            h = -h
        }
        var x = this, u = x.cursor[0], f = x.cursor[1], a = (u - t) / 2, y = (f - c) / 2, d = Math.cos(r), s = Math.sin(r), o = a * d + y * s, v = -a * s + y * d, i = o / j, g = v / h, p = i * i + g * g, e = (u + t) * 0.5, b = (f + c) * 0.5, l = 0, k = 0;
        if (p >= 1) {
            p = Math.sqrt(p);
            j *= p;
            h *= p
        } else {
            p = Math.sqrt(1 / p - 1);
            if (m === w) {
                p = -p
            }
            l = p * j * g;
            k = -p * h * i;
            e += d * l - s * k;
            b += s * l + d * k
        }
        var q = Math.atan2((v - k) / h, (o - l) / j), n = Math.atan2((-v - k) / h, (-o - l) / j) - q;
        if (w) {
            if (n <= 0) {
                n += Math.PI * 2
            }
        } else {
            if (n >= 0) {
                n -= Math.PI * 2
            }
        }
        x.ellipse(e, b, j, h, r, q, q + n, 1 - w)
    },
    fromSvgString: function (e) {
        if (!e) {
            return
        }
        var m = this, h, l = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0,
            A: 7,
            C: 6,
            H: 1,
            L: 2,
            M: 2,
            Q: 4,
            S: 4,
            T: 2,
            V: 1,
            Z: 0
        }, k = "", g, f, c = 0, b = 0, d = false, j, n, a;
        if (Ext.isString(e)) {
            h = e.replace(Ext.draw.Path.pathRe, " $1 ").replace(Ext.draw.Path.pathRe2, " -").split(Ext.draw.Path.pathSplitRe)
        } else {
            if (Ext.isArray(e)) {
                h = e.join(",").split(Ext.draw.Path.pathSplitRe)
            }
        }
        for (j = 0, n = 0; j < h.length; j++) {
            if (h[j] !== "") {
                h[n++] = h[j]
            }
        }
        h.length = n;
        m.clear();
        for (j = 0; j < h.length;) {
            k = d;
            d = h[j];
            a = (d.toUpperCase() !== d);
            j++;
            switch (d) {
                case"M":
                    m.moveTo(c = +h[j], b = +h[j + 1]);
                    j += 2;
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c = +h[j], b = +h[j + 1]);
                        j += 2
                    }
                    break;
                case"L":
                    m.lineTo(c = +h[j], b = +h[j + 1]);
                    j += 2;
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c = +h[j], b = +h[j + 1]);
                        j += 2
                    }
                    break;
                case"A":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.arcSvg(+h[j], +h[j + 1], +h[j + 2] * Math.PI / 180, +h[j + 3], +h[j + 4], c = +h[j + 5], b = +h[j + 6]);
                        j += 7
                    }
                    break;
                case"C":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.bezierCurveTo(+h[j], +h[j + 1], g = +h[j + 2], f = +h[j + 3], c = +h[j + 4], b = +h[j + 5]);
                        j += 6
                    }
                    break;
                case"Z":
                    m.closePath();
                    break;
                case"m":
                    m.moveTo(c += +h[j], b += +h[j + 1]);
                    j += 2;
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c += +h[j], b += +h[j + 1]);
                        j += 2
                    }
                    break;
                case"l":
                    m.lineTo(c += +h[j], b += +h[j + 1]);
                    j += 2;
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c += +h[j], b += +h[j + 1]);
                        j += 2
                    }
                    break;
                case"a":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.arcSvg(+h[j], +h[j + 1], +h[j + 2] * Math.PI / 180, +h[j + 3], +h[j + 4], c += +h[j + 5], b += +h[j + 6]);
                        j += 7
                    }
                    break;
                case"c":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.bezierCurveTo(c + (+h[j]), b + (+h[j + 1]), g = c + (+h[j + 2]), f = b + (+h[j + 3]), c += +h[j + 4], b += +h[j + 5]);
                        j += 6
                    }
                    break;
                case"z":
                    m.closePath();
                    break;
                case"s":
                    if (!(k === "c" || k === "C" || k === "s" || k === "S")) {
                        g = c;
                        f = b
                    }
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.bezierCurveTo(c + c - g, b + b - f, g = c + (+h[j]), f = b + (+h[j + 1]), c += +h[j + 2], b += +h[j + 3]);
                        j += 4
                    }
                    break;
                case"S":
                    if (!(k === "c" || k === "C" || k === "s" || k === "S")) {
                        g = c;
                        f = b
                    }
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.bezierCurveTo(c + c - g, b + b - f, g = +h[j], f = +h[j + 1], c = (+h[j + 2]), b = (+h[j + 3]));
                        j += 4
                    }
                    break;
                case"q":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.quadraticCurveTo(g = c + (+h[j]), f = b + (+h[j + 1]), c += +h[j + 2], b += +h[j + 3]);
                        j += 4
                    }
                    break;
                case"Q":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.quadraticCurveTo(g = +h[j], f = +h[j + 1], c = +h[j + 2], b = +h[j + 3]);
                        j += 4
                    }
                    break;
                case"t":
                    if (!(k === "q" || k === "Q" || k === "t" || k === "T")) {
                        g = c;
                        f = b
                    }
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.quadraticCurveTo(g = c + c - g, f = b + b - f, c += +h[j + 1], b += +h[j + 2]);
                        j += 2
                    }
                    break;
                case"T":
                    if (!(k === "q" || k === "Q" || k === "t" || k === "T")) {
                        g = c;
                        f = b
                    }
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.quadraticCurveTo(g = c + c - g, f = b + b - f, c = (+h[j + 1]), b = (+h[j + 2]));
                        j += 2
                    }
                    break;
                case"h":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c += +h[j], b);
                        j++
                    }
                    break;
                case"H":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c = +h[j], b);
                        j++
                    }
                    break;
                case"v":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c, b += +h[j]);
                        j++
                    }
                    break;
                case"V":
                    while (j < n && !l.hasOwnProperty(h[j])) {
                        m.lineTo(c, b = +h[j]);
                        j++
                    }
                    break
            }
        }
    },
    clone: function () {
        var a = this, b = new Ext.draw.Path();
        b.params = a.params.slice(0);
        b.commands = a.commands.slice(0);
        b.cursor = a.cursor ? a.cursor.slice(0) : null;
        b.startX = a.startX;
        b.startY = a.startY;
        b.svgString = a.svgString;
        return b
    },
    transform: function (j) {
        if (j.isIdentity()) {
            return
        }
        var a = j.getXX(), f = j.getYX(), m = j.getDX(), l = j.getXY(), e = j.getYY(), k = j.getDY(), b = this.params, c = 0, d = b.length, h, g;
        for (; c < d; c += 2) {
            h = b[c];
            g = b[c + 1];
            b[c] = h * a + g * f + m;
            b[c + 1] = h * l + g * e + k
        }
        this.dirt()
    },
    getDimension: function (f) {
        if (!f) {
            f = {}
        }
        if (!this.commands || !this.commands.length) {
            f.x = 0;
            f.y = 0;
            f.width = 0;
            f.height = 0;
            return f
        }
        f.left = Infinity;
        f.top = Infinity;
        f.right = -Infinity;
        f.bottom = -Infinity;
        var d = 0, c = 0, b = this.commands, g = this.params, e = b.length, a, h;
        for (; d < e; d++) {
            switch (b[d]) {
                case"M":
                case"L":
                    a = g[c];
                    h = g[c + 1];
                    f.left = Math.min(a, f.left);
                    f.top = Math.min(h, f.top);
                    f.right = Math.max(a, f.right);
                    f.bottom = Math.max(h, f.bottom);
                    c += 2;
                    break;
                case"C":
                    this.expandDimension(f, a, h, g[c], g[c + 1], g[c + 2], g[c + 3], a = g[c + 4], h = g[c + 5]);
                    c += 6;
                    break
            }
        }
        f.x = f.left;
        f.y = f.top;
        f.width = f.right - f.left;
        f.height = f.bottom - f.top;
        return f
    },
    getDimensionWithTransform: function (n, f) {
        if (!this.commands || !this.commands.length) {
            if (!f) {
                f = {}
            }
            f.x = 0;
            f.y = 0;
            f.width = 0;
            f.height = 0;
            return f
        }
        f.left = Infinity;
        f.top = Infinity;
        f.right = -Infinity;
        f.bottom = -Infinity;
        var a = n.getXX(), k = n.getYX(), q = n.getDX(), p = n.getXY(), h = n.getYY(), o = n.getDY(), e = 0, d = 0, b = this.commands, c = this.params, g = b.length, m, l;
        for (; e < g; e++) {
            switch (b[e]) {
                case"M":
                case"L":
                    m = c[d] * a + c[d + 1] * k + q;
                    l = c[d] * p + c[d + 1] * h + o;
                    f.left = Math.min(m, f.left);
                    f.top = Math.min(l, f.top);
                    f.right = Math.max(m, f.right);
                    f.bottom = Math.max(l, f.bottom);
                    d += 2;
                    break;
                case"C":
                    this.expandDimension(f, m, l, c[d] * a + c[d + 1] * k + q, c[d] * p + c[d + 1] * h + o, c[d + 2] * a + c[d + 3] * k + q, c[d + 2] * p + c[d + 3] * h + o, m = c[d + 4] * a + c[d + 5] * k + q, l = c[d + 4] * p + c[d + 5] * h + o);
                    d += 6;
                    break
            }
        }
        if (!f) {
            f = {}
        }
        f.x = f.left;
        f.y = f.top;
        f.width = f.right - f.left;
        f.height = f.bottom - f.top;
        return f
    },
    expandDimension: function (i, d, p, k, g, j, e, c, o) {
        var m = this, f = i.left, a = i.right, q = i.top, n = i.bottom, h = m.dim || (m.dim = []);
        m.curveDimension(d, k, j, c, h);
        f = Math.min(f, h[0]);
        a = Math.max(a, h[1]);
        m.curveDimension(p, g, e, o, h);
        q = Math.min(q, h[0]);
        n = Math.max(n, h[1]);
        i.left = f;
        i.right = a;
        i.top = q;
        i.bottom = n
    },
    curveDimension: function (p, n, k, j, h) {
        var i = 3 * (-p + 3 * (n - k) + j), g = 6 * (p - 2 * n + k), f = -3 * (p - n), o, m, e = Math.min(p, j), l = Math.max(p, j), q;
        if (i === 0) {
            if (g === 0) {
                h[0] = e;
                h[1] = l;
                return
            } else {
                o = -f / g;
                if (0 < o && o < 1) {
                    m = this.interpolate(p, n, k, j, o);
                    e = Math.min(e, m);
                    l = Math.max(l, m)
                }
            }
        } else {
            q = g * g - 4 * i * f;
            if (q >= 0) {
                q = Math.sqrt(q);
                o = (q - g) / 2 / i;
                if (0 < o && o < 1) {
                    m = this.interpolate(p, n, k, j, o);
                    e = Math.min(e, m);
                    l = Math.max(l, m)
                }
                if (q > 0) {
                    o -= q / i;
                    if (0 < o && o < 1) {
                        m = this.interpolate(p, n, k, j, o);
                        e = Math.min(e, m);
                        l = Math.max(l, m)
                    }
                }
            }
        }
        h[0] = e;
        h[1] = l
    },
    interpolate: function (f, e, j, i, g) {
        if (g === 0) {
            return f
        }
        if (g === 1) {
            return i
        }
        var h = (1 - g) / g;
        return g * g * g * (i + h * (3 * j + h * (3 * e + h * f)))
    },
    fromStripes: function (g) {
        var e = this, c = 0, d = g.length, b, a, f;
        e.clear();
        for (; c < d; c++) {
            f = g[c];
            e.params.push.apply(e.params, f);
            e.commands.push("M");
            for (b = 2, a = f.length; b < a; b += 6) {
                e.commands.push("C")
            }
        }
        if (!e.cursor) {
            e.cursor = []
        }
        e.cursor[0] = e.params[e.params.length - 2];
        e.cursor[1] = e.params[e.params.length - 1];
        e.dirt()
    },
    toStripes: function (k) {
        var o = k || [], p, n, m, b, a, h, g, f, e, c = this.commands, d = this.params, l = c.length;
        for (f = 0, e = 0; f < l; f++) {
            switch (c[f]) {
                case"M":
                    p = [h = b = d[e++], g = a = d[e++]];
                    o.push(p);
                    break;
                case"L":
                    n = d[e++];
                    m = d[e++];
                    p.push((b + b + n) / 3, (a + a + m) / 3, (b + n + n) / 3, (a + m + m) / 3, b = n, a = m);
                    break;
                case"C":
                    p.push(d[e++], d[e++], d[e++], d[e++], b = d[e++], a = d[e++]);
                    break;
                case"Z":
                    n = h;
                    m = g;
                    p.push((b + b + n) / 3, (a + a + m) / 3, (b + n + n) / 3, (a + m + m) / 3, b = n, a = m);
                    break
            }
        }
        return o
    },
    updateSvgString: function () {
        var b = [], a = this.commands, f = this.params, e = a.length, d = 0, c = 0;
        for (; d < e; d++) {
            switch (a[d]) {
                case"M":
                    b.push("M" + f[c] + "," + f[c + 1]);
                    c += 2;
                    break;
                case"L":
                    b.push("L" + f[c] + "," + f[c + 1]);
                    c += 2;
                    break;
                case"C":
                    b.push("C" + f[c] + "," + f[c + 1] + " " + f[c + 2] + "," + f[c + 3] + " " + f[c + 4] + "," + f[c + 5]);
                    c += 6;
                    break;
                case"Z":
                    b.push("Z");
                    break
            }
        }
        this.svgString = b.join("")
    },
    toString: function () {
        if (!this.svgString) {
            this.updateSvgString()
        }
        return this.svgString
    }
});
Ext.define("Ext.draw.overrides.Path", {
    override: "Ext.draw.Path",
    rayOrigin: {x: -10000, y: -10000},
    isPointInPath: function (o, n) {
        var m = this, c = m.commands, q = Ext.draw.PathUtil, p = m.rayOrigin, f = m.params, l = c.length, e = null, d = null, b = 0, a = 0, k = 0, h, g;
        for (h = 0, g = 0; h < l; h++) {
            switch (c[h]) {
                case"M":
                    if (e !== null) {
                        if (q.linesIntersection(e, d, b, a, p.x, p.y, o, n)) {
                            k += 1
                        }
                    }
                    e = b = f[g];
                    d = a = f[g + 1];
                    g += 2;
                    break;
                case"L":
                    if (q.linesIntersection(b, a, f[g], f[g + 1], p.x, p.y, o, n)) {
                        k += 1
                    }
                    b = f[g];
                    a = f[g + 1];
                    g += 2;
                    break;
                case"C":
                    k += q.cubicLineIntersections(b, f[g], f[g + 2], f[g + 4], a, f[g + 1], f[g + 3], f[g + 5], p.x, p.y, o, n).length;
                    b = f[g + 4];
                    a = f[g + 5];
                    g += 6;
                    break;
                case"Z":
                    if (e !== null) {
                        if (q.linesIntersection(e, d, b, a, p.x, p.y, o, n)) {
                            k += 1
                        }
                    }
                    break
            }
        }
        return k % 2 === 1
    },
    isPointOnPath: function (n, m) {
        var l = this, c = l.commands, o = Ext.draw.PathUtil, f = l.params, k = c.length, e = null, d = null, b = 0, a = 0, h, g;
        for (h = 0, g = 0; h < k; h++) {
            switch (c[h]) {
                case"M":
                    if (e !== null) {
                        if (o.pointOnLine(e, d, b, a, n, m)) {
                            return true
                        }
                    }
                    e = b = f[g];
                    d = a = f[g + 1];
                    g += 2;
                    break;
                case"L":
                    if (o.pointOnLine(b, a, f[g], f[g + 1], n, m)) {
                        return true
                    }
                    b = f[g];
                    a = f[g + 1];
                    g += 2;
                    break;
                case"C":
                    if (o.pointOnCubic(b, f[g], f[g + 2], f[g + 4], a, f[g + 1], f[g + 3], f[g + 5], n, m)) {
                        return true
                    }
                    b = f[g + 4];
                    a = f[g + 5];
                    g += 6;
                    break;
                case"Z":
                    if (e !== null) {
                        if (o.pointOnLine(e, d, b, a, n, m)) {
                            return true
                        }
                    }
                    break
            }
        }
        return false
    },
    getSegmentIntersections: function (t, d, s, c, r, b, o, a) {
        var w = this, g = arguments.length, v = Ext.draw.PathUtil, f = w.commands, u = w.params, k = f.length, m = null, l = null, h = 0, e = 0, x = [], q, n, p;
        for (q = 0, n = 0; q < k; q++) {
            switch (f[q]) {
                case"M":
                    if (m !== null) {
                        switch (g) {
                            case 4:
                                p = v.linesIntersection(m, l, h, e, t, d, s, c);
                                if (p) {
                                    x.push(p)
                                }
                                break;
                            case 8:
                                p = v.cubicLineIntersections(t, s, r, o, d, c, b, a, m, l, h, e);
                                x.push.apply(x, p);
                                break
                        }
                    }
                    m = h = u[n];
                    l = e = u[n + 1];
                    n += 2;
                    break;
                case"L":
                    switch (g) {
                        case 4:
                            p = v.linesIntersection(h, e, u[n], u[n + 1], t, d, s, c);
                            if (p) {
                                x.push(p)
                            }
                            break;
                        case 8:
                            p = v.cubicLineIntersections(t, s, r, o, d, c, b, a, h, e, u[n], u[n + 1]);
                            x.push.apply(x, p);
                            break
                    }
                    h = u[n];
                    e = u[n + 1];
                    n += 2;
                    break;
                case"C":
                    switch (g) {
                        case 4:
                            p = v.cubicLineIntersections(h, u[n], u[n + 2], u[n + 4], e, u[n + 1], u[n + 3], u[n + 5], t, d, s, c);
                            x.push.apply(x, p);
                            break;
                        case 8:
                            p = v.cubicsIntersections(h, u[n], u[n + 2], u[n + 4], e, u[n + 1], u[n + 3], u[n + 5], t, s, r, o, d, c, b, a);
                            x.push.apply(x, p);
                            break
                    }
                    h = u[n + 4];
                    e = u[n + 5];
                    n += 6;
                    break;
                case"Z":
                    if (m !== null) {
                        switch (g) {
                            case 4:
                                p = v.linesIntersection(m, l, h, e, t, d, s, c);
                                if (p) {
                                    x.push(p)
                                }
                                break;
                            case 8:
                                p = v.cubicLineIntersections(t, s, r, o, d, c, b, a, m, l, h, e);
                                x.push.apply(x, p);
                                break
                        }
                    }
                    break
            }
        }
        return x
    },
    getIntersections: function (o) {
        var m = this, c = m.commands, g = m.params, l = c.length, f = null, e = null, b = 0, a = 0, d = [], k, h, n;
        for (k = 0, h = 0; k < l; k++) {
            switch (c[k]) {
                case"M":
                    if (f !== null) {
                        n = o.getSegmentIntersections.call(o, f, e, b, a);
                        d.push.apply(d, n)
                    }
                    f = b = g[h];
                    e = a = g[h + 1];
                    h += 2;
                    break;
                case"L":
                    n = o.getSegmentIntersections.call(o, b, a, g[h], g[h + 1]);
                    d.push.apply(d, n);
                    b = g[h];
                    a = g[h + 1];
                    h += 2;
                    break;
                case"C":
                    n = o.getSegmentIntersections.call(o, b, a, g[h], g[h + 1], g[h + 2], g[h + 3], g[h + 4], g[h + 5]);
                    d.push.apply(d, n);
                    b = g[h + 4];
                    a = g[h + 5];
                    h += 6;
                    break;
                case"Z":
                    if (f !== null) {
                        n = o.getSegmentIntersections.call(o, f, e, b, a);
                        d.push.apply(d, n)
                    }
                    break
            }
        }
        return d
    }
});
Ext.define("Ext.draw.sprite.Path", {
    extend: "Ext.draw.sprite.Sprite",
    requires: ["Ext.draw.Draw", "Ext.draw.Path"],
    alias: ["sprite.path", "Ext.draw.Sprite"],
    type: "path",
    isPath: true,
    inheritableStatics: {
        def: {
            processors: {
                path: function (b, a) {
                    if (!(b instanceof Ext.draw.Path)) {
                        b = new Ext.draw.Path(b)
                    }
                    return b
                }
            }, aliases: {d: "path"}, triggers: {path: "bbox"}, updaters: {
                path: function (a) {
                    var b = a.path;
                    if (!b || b.bindAttr !== a) {
                        b = new Ext.draw.Path();
                        b.bindAttr = a;
                        a.path = b
                    }
                    b.clear();
                    this.updatePath(b, a);
                    this.scheduleUpdaters(a, {bbox: ["path"]})
                }
            }
        }
    },
    updatePlainBBox: function (a) {
        if (this.attr.path) {
            this.attr.path.getDimension(a)
        }
    },
    updateTransformedBBox: function (a) {
        if (this.attr.path) {
            this.attr.path.getDimensionWithTransform(this.attr.matrix, a)
        }
    },
    render: function (b, c) {
        var d = this.attr.matrix, a = this.attr;
        if (!a.path || a.path.params.length === 0) {
            return
        }
        d.toContext(c);
        c.appendPath(a.path);
        c.fillStroke(a)
    },
    updatePath: function (b, a) {
    }
});
Ext.define("Ext.draw.overrides.sprite.Path", {
    override: "Ext.draw.sprite.Path",
    requires: ["Ext.draw.Color"],
    isPointInPath: function (c, g) {
        var b = this.attr;
        if (b.fillStyle === Ext.draw.Color.RGBA_NONE) {
            return this.isPointOnPath(c, g)
        }
        var e = b.path, d = b.matrix, f, a;
        if (!d.isIdentity()) {
            f = e.params.slice(0);
            e.transform(b.matrix)
        }
        a = e.isPointInPath(c, g);
        if (f) {
            e.params = f
        }
        return a
    },
    isPointOnPath: function (c, g) {
        var b = this.attr, e = b.path, d = b.matrix, f, a;
        if (!d.isIdentity()) {
            f = e.params.slice(0);
            e.transform(b.matrix)
        }
        a = e.isPointOnPath(c, g);
        if (f) {
            e.params = f
        }
        return a
    },
    hitTest: function (i, m) {
        var e = this, d = e.attr, l = d.path, j = e.getBBox(), g = d.matrix, h = i[0], f = i[1], c = d.fillStyle !== Ext.draw.Color.NONE && d.fillStyle !== Ext.draw.Color.RGBA_NONE, a = j && h >= j.left && h <= j.right && f >= j.top && f <= j.bottom, k = null, b;
        if (!a) {
            return k
        }
        if (!g.isIdentity()) {
            b = l.params.slice(0);
            l.transform(d.matrix)
        }
        if (m.fill && m.stroke) {
            if (c) {
                if (l.isPointInPath(h, f)) {
                    k = {sprite: e}
                }
            } else {
                if (l.isPointInPath(h, f) || l.isPointOnPath(h, f)) {
                    k = {sprite: e}
                }
            }
        } else {
            if (m.stroke && !m.fill) {
                if (l.isPointOnPath(h, f)) {
                    k = {sprite: e}
                }
            } else {
                if (m.fill && !m.stroke) {
                    if (l.isPointInPath(h, f)) {
                        k = {sprite: e}
                    }
                }
            }
        }
        if (b) {
            l.params = b
        }
        return k
    },
    getIntersections: function (j) {
        if (!(j.isSprite && j.isPath)) {
            return []
        }
        var e = this.attr, d = j.attr, i = e.path, h = d.path, g = e.matrix, a = d.matrix, c, f, b;
        if (!g.isIdentity()) {
            c = i.params.slice(0);
            i.transform(e.matrix)
        }
        if (!a.isIdentity()) {
            f = h.params.slice(0);
            h.transform(d.matrix)
        }
        b = i.getIntersections(h);
        if (c) {
            i.params = c
        }
        if (f) {
            h.params = f
        }
        return b
    }
});
Ext.define("Ext.draw.sprite.Circle", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.circle",
    type: "circle",
    inheritableStatics: {
        def: {
            processors: {cx: "number", cy: "number", r: "number"},
            aliases: {radius: "r", x: "cx", y: "cy", centerX: "cx", centerY: "cy"},
            defaults: {cx: 0, cy: 0, r: 4},
            triggers: {cx: "path", cy: "path", r: "path"}
        }
    },
    updatePlainBBox: function (c) {
        var b = this.attr, a = b.cx, e = b.cy, d = b.r;
        c.x = a - d;
        c.y = e - d;
        c.width = d + d;
        c.height = d + d
    },
    updateTransformedBBox: function (b) {
        var f = this.attr, d = f.cx, c = f.cy, a = f.r, g = f.matrix, k = g.getScaleX(), j = g.getScaleY(), i, e;
        i = k * a;
        e = j * a;
        b.x = g.x(d, c) - i;
        b.y = g.y(d, c) - e;
        b.width = i + i;
        b.height = e + e
    },
    updatePath: function (b, a) {
        b.arc(a.cx, a.cy, a.r, 0, Math.PI * 2, false)
    }
});
Ext.define("Ext.draw.sprite.Arc", {
    extend: "Ext.draw.sprite.Circle",
    alias: "sprite.arc",
    type: "arc",
    inheritableStatics: {
        def: {
            processors: {startAngle: "number", endAngle: "number", anticlockwise: "bool"},
            aliases: {from: "startAngle", to: "endAngle", start: "startAngle", end: "endAngle"},
            defaults: {startAngle: 0, endAngle: Math.PI * 2, anticlockwise: false},
            triggers: {startAngle: "path", endAngle: "path", anticlockwise: "path"}
        }
    },
    updatePath: function (b, a) {
        b.arc(a.cx, a.cy, a.r, a.startAngle, a.endAngle, a.anticlockwise)
    }
});
Ext.define("Ext.draw.sprite.Arrow", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.arrow",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", size: "number"},
            defaults: {x: 0, y: 0, size: 4},
            triggers: {x: "path", y: "path", size: "path"}
        }
    },
    updatePath: function (d, b) {
        var c = b.size * 1.5, a = b.x - b.lineWidth / 2, e = b.y;
        d.fromSvgString("M".concat(a - c * 0.7, ",", e - c * 0.4, "l", [c * 0.6, 0, 0, -c * 0.4, c, c * 0.8, -c, c * 0.8, 0, -c * 0.4, -c * 0.6, 0], "z"))
    }
});
Ext.define("Ext.draw.sprite.Composite", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "sprite.composite",
    type: "composite",
    isComposite: true,
    config: {sprites: []},
    constructor: function () {
        this.sprites = [];
        this.sprites.map = {};
        this.callParent(arguments)
    },
    add: function (c) {
        if (!c) {
            return null
        }
        if (!c.isSprite) {
            c = Ext.create("sprite." + c.type, c);
            c.setParent(this);
            c.setSurface(this.getSurface())
        }
        var d = this, a = d.attr, b = c.applyTransformations;
        c.applyTransformations = function () {
            if (c.attr.dirtyTransform) {
                a.dirtyTransform = true;
                a.bbox.plain.dirty = true;
                a.bbox.transform.dirty = true
            }
            b.call(c)
        };
        d.sprites.push(c);
        d.sprites.map[c.id] = c.getId();
        a.bbox.plain.dirty = true;
        a.bbox.transform.dirty = true;
        return c
    },
    updateSurface: function (a) {
        for (var b = 0, c = this.sprites.length; b < c; b++) {
            this.sprites[b].setSurface(a)
        }
    },
    addAll: function (b) {
        if (b.isSprite || b.type) {
            this.add(b)
        } else {
            if (Ext.isArray(b)) {
                var a = 0;
                while (a < b.length) {
                    this.add(b[a++])
                }
            }
        }
    },
    updatePlainBBox: function (g) {
        var e = this, b = Infinity, h = -Infinity, f = Infinity, a = -Infinity, j, k, c, d;
        for (c = 0, d = e.sprites.length; c < d; c++) {
            j = e.sprites[c];
            j.applyTransformations();
            k = j.getBBox();
            if (b > k.x) {
                b = k.x
            }
            if (h < k.x + k.width) {
                h = k.x + k.width
            }
            if (f > k.y) {
                f = k.y
            }
            if (a < k.y + k.height) {
                a = k.y + k.height
            }
        }
        g.x = b;
        g.y = f;
        g.width = h - b;
        g.height = a - f
    },
    render: function (a, b, f) {
        var d = this.attr.matrix, c, e;
        d.toContext(b);
        for (c = 0, e = this.sprites.length; c < e; c++) {
            a.renderSprite(this.sprites[c], f)
        }
    }
});
Ext.define("Ext.draw.sprite.Cross", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.cross",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", size: "number"},
            defaults: {x: 0, y: 0, size: 4},
            triggers: {x: "path", y: "path", size: "path"}
        }
    },
    updatePath: function (d, b) {
        var c = b.size / 1.7, a = b.x - b.lineWidth / 2, e = b.y;
        d.fromSvgString("M".concat(a - c, ",", e, "l", [-c, -c, c, -c, c, c, c, -c, c, c, -c, c, c, c, -c, c, -c, -c, -c, c, -c, -c, "z"]))
    }
});
Ext.define("Ext.draw.sprite.Diamond", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.diamond",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", size: "number"},
            defaults: {x: 0, y: 0, size: 4},
            triggers: {x: "path", y: "path", size: "path"}
        }
    },
    updatePath: function (d, b) {
        var c = b.size * 1.25, a = b.x - b.lineWidth / 2, e = b.y;
        d.fromSvgString(["M", a, e - c, "l", c, c, -c, c, -c, -c, c, -c, "z"])
    }
});
Ext.define("Ext.draw.sprite.Ellipse", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.ellipse",
    type: "ellipse",
    inheritableStatics: {
        def: {
            processors: {
                cx: "number",
                cy: "number",
                rx: "number",
                ry: "number",
                axisRotation: "number"
            },
            aliases: {radius: "r", x: "cx", y: "cy", centerX: "cx", centerY: "cy", radiusX: "rx", radiusY: "ry"},
            defaults: {cx: 0, cy: 0, rx: 1, ry: 1, axisRotation: 0},
            triggers: {cx: "path", cy: "path", rx: "path", ry: "path", axisRotation: "path"}
        }
    },
    updatePlainBBox: function (c) {
        var b = this.attr, a = b.cx, f = b.cy, e = b.rx, d = b.ry;
        c.x = a - e;
        c.y = f - d;
        c.width = e + e;
        c.height = d + d
    },
    updateTransformedBBox: function (d) {
        var i = this.attr, f = i.cx, e = i.cy, c = i.rx, b = i.ry, l = b / c, m = i.matrix.clone(), a, q, k, j, p, o, n, g;
        m.append(1, 0, 0, l, 0, e * (1 - l));
        a = m.getXX();
        k = m.getYX();
        p = m.getDX();
        q = m.getXY();
        j = m.getYY();
        o = m.getDY();
        n = Math.sqrt(a * a + k * k) * c;
        g = Math.sqrt(q * q + j * j) * c;
        d.x = f * a + e * k + p - n;
        d.y = f * q + e * j + o - g;
        d.width = n + n;
        d.height = g + g
    },
    updatePath: function (b, a) {
        b.ellipse(a.cx, a.cy, a.rx, a.ry, a.axisRotation, 0, Math.PI * 2, false)
    }
});
Ext.define("Ext.draw.sprite.EllipticalArc", {
    extend: "Ext.draw.sprite.Ellipse",
    alias: "sprite.ellipticalArc",
    type: "ellipticalArc",
    inheritableStatics: {
        def: {
            processors: {startAngle: "number", endAngle: "number", anticlockwise: "bool"},
            aliases: {from: "startAngle", to: "endAngle", start: "startAngle", end: "endAngle"},
            defaults: {startAngle: 0, endAngle: Math.PI * 2, anticlockwise: false},
            triggers: {startAngle: "path", endAngle: "path", anticlockwise: "path"}
        }
    },
    updatePath: function (b, a) {
        b.ellipse(a.cx, a.cy, a.rx, a.ry, a.axisRotation, a.startAngle, a.endAngle, a.anticlockwise)
    }
});
Ext.define("Ext.draw.sprite.Rect", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.rect",
    type: "rect",
    inheritableStatics: {
        def: {
            processors: {
                x: "number",
                y: "number",
                width: "number",
                height: "number",
                radius: "number"
            },
            aliases: {},
            triggers: {x: "path", y: "path", width: "path", height: "path", radius: "path"},
            defaults: {x: 0, y: 0, width: 8, height: 8, radius: 0}
        }
    },
    updatePlainBBox: function (b) {
        var a = this.attr;
        b.x = a.x;
        b.y = a.y;
        b.width = a.width;
        b.height = a.height
    },
    updateTransformedBBox: function (a, b) {
        this.attr.matrix.transformBBox(b, this.attr.radius, a)
    },
    updatePath: function (f, d) {
        var c = d.x, g = d.y, e = d.width, b = d.height, a = Math.min(d.radius, Math.abs(d.height) * 0.5, Math.abs(d.width) * 0.5);
        if (a === 0) {
            f.rect(c, g, e, b)
        } else {
            f.moveTo(c + a, g);
            f.arcTo(c + e, g, c + e, g + b, a);
            f.arcTo(c + e, g + b, c, g + b, a);
            f.arcTo(c, g + b, c, g, a);
            f.arcTo(c, g, c + a, g, a)
        }
    }
});
Ext.define("Ext.draw.sprite.Image", {
    extend: "Ext.draw.sprite.Rect",
    alias: "sprite.image",
    type: "image",
    statics: {imageLoaders: {}},
    inheritableStatics: {def: {processors: {src: "string"}, defaults: {src: "", width: null, height: null}}},
    render: function (c, o) {
        var j = this, h = j.attr, n = h.matrix, a = h.src, l = h.x, k = h.y, b = h.width, m = h.height, g = Ext.draw.sprite.Image.imageLoaders[a], f, d, e;
        if (g && g.done) {
            n.toContext(o);
            d = g.image;
            o.drawImage(d, l, k, b || (d.naturalWidth || d.width) / c.devicePixelRatio, m || (d.naturalHeight || d.height) / c.devicePixelRatio)
        } else {
            if (!g) {
                f = new Image();
                g = Ext.draw.sprite.Image.imageLoaders[a] = {
                    image: f,
                    done: false,
                    pendingSprites: [j],
                    pendingSurfaces: [c]
                };
                f.width = b;
                f.height = m;
                f.onload = function () {
                    if (!g.done) {
                        g.done = true;
                        for (e = 0; e < g.pendingSprites.length; e++) {
                            g.pendingSprites[e].setDirty(true)
                        }
                        for (e in g.pendingSurfaces) {
                            g.pendingSurfaces[e].renderFrame()
                        }
                    }
                };
                f.src = a
            } else {
                Ext.Array.include(g.pendingSprites, j);
                Ext.Array.include(g.pendingSurfaces, c)
            }
        }
    }
});
Ext.define("Ext.draw.sprite.Instancing", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "sprite.instancing",
    type: "instancing",
    isInstancing: true,
    config: {template: null},
    instances: null,
    applyTemplate: function (a) {
        if (!a.isSprite) {
            if (!a.xclass && !a.type) {
                a.type = "circle"
            }
            a = Ext.create(a.xclass || "sprite." + a.type, a)
        }
        a.setParent(this);
        return a
    },
    updateTemplate: function (a, b) {
        if (b) {
            delete b.ownAttr
        }
        a.setSurface(this.getSurface());
        a.ownAttr = a.attr;
        a.attr.children = this.instances = [];
        this.position = 0
    },
    updateSurface: function (a) {
        var b = this.getTemplate();
        if (b) {
            b.setSurface(a)
        }
    },
    get: function (a) {
        return this.instances[a]
    },
    getCount: function () {
        return this.instances.length
    },
    clearAll: function () {
        this.instances.length = 0;
        this.position = 0
    },
    createInstance: function (d, f, c) {
        var e = this.getTemplate(), b = e.attr, a = Ext.Object.chain(b);
        e.topModifier.prepareAttributes(a);
        e.attr = a;
        e.setAttributes(d, f, c);
        a.template = e;
        this.instances.push(a);
        e.attr = b;
        this.position++;
        return a
    },
    getBBox: function () {
        return null
    },
    getBBoxFor: function (b, d) {
        var c = this.getTemplate(), a = c.attr, e;
        c.attr = this.instances[b];
        e = c.getBBox(d);
        c.attr = a;
        return e
    },
    render: function (b, l, d, h) {
        var g = this, j = g.getTemplate(), k = g.attr.matrix, c = j.attr, a = g.instances, e, f = g.position;
        k.toContext(l);
        j.preRender(b, l, d, h);
        j.useAttributes(l, h);
        for (e = 0; e < f; e++) {
            if (a[e].dirtyZIndex) {
                break
            }
        }
        for (e = 0; e < f; e++) {
            if (a[e].hidden) {
                continue
            }
            l.save();
            j.attr = a[e];
            j.useAttributes(l, h);
            j.render(b, l, d, h);
            l.restore()
        }
        j.attr = c
    },
    setAttributesFor: function (c, e, f) {
        var d = this.getTemplate(), b = d.attr, a = this.instances[c];
        if (!a) {
            return
        }
        d.attr = a;
        if (f) {
            e = Ext.apply({}, e)
        } else {
            e = d.self.def.normalize(e)
        }
        d.topModifier.pushDown(a, e);
        d.attr = b
    },
    destroy: function () {
        this.callParent();
        this.instances.length = 0;
        this.instances = null;
        if (this.getTemplate()) {
            this.getTemplate().destroy()
        }
    }
});
Ext.define("Ext.draw.sprite.Line", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "sprite.line",
    type: "line",
    inheritableStatics: {
        def: {
            processors: {fromX: "number", fromY: "number", toX: "number", toY: "number"},
            defaults: {fromX: 0, fromY: 0, toX: 1, toY: 1, strokeStyle: "black"}
        }
    },
    updatePlainBBox: function (b) {
        var a = this.attr, f = Math.min(a.fromX, a.toX), d = Math.min(a.fromY, a.toY), e = Math.max(a.fromX, a.toX), c = Math.max(a.fromY, a.toY);
        b.x = f;
        b.y = d;
        b.width = e - f;
        b.height = c - d
    },
    render: function (b, c) {
        var a = this.attr, d = this.attr.matrix;
        d.toContext(c);
        c.beginPath();
        c.moveTo(a.fromX, a.fromY);
        c.lineTo(a.toX, a.toY);
        c.stroke()
    }
});
Ext.define("Ext.draw.sprite.Plus", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.plus",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", size: "number"},
            defaults: {x: 0, y: 0, size: 4},
            triggers: {x: "path", y: "path", size: "path"}
        }
    },
    updatePath: function (d, b) {
        var c = b.size / 1.3, a = b.x - b.lineWidth / 2, e = b.y;
        d.fromSvgString("M".concat(a - c / 2, ",", e - c / 2, "l", [0, -c, c, 0, 0, c, c, 0, 0, c, -c, 0, 0, c, -c, 0, 0, -c, -c, 0, 0, -c, "z"]))
    }
});
Ext.define("Ext.draw.sprite.Sector", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.sector",
    type: "sector",
    inheritableStatics: {
        def: {
            processors: {
                centerX: "number",
                centerY: "number",
                startAngle: "number",
                endAngle: "number",
                startRho: "number",
                endRho: "number",
                margin: "number"
            },
            aliases: {rho: "endRho"},
            triggers: {
                centerX: "path,bbox",
                centerY: "path,bbox",
                startAngle: "path,bbox",
                endAngle: "path,bbox",
                startRho: "path,bbox",
                endRho: "path,bbox",
                margin: "path,bbox"
            },
            defaults: {
                centerX: 0,
                centerY: 0,
                startAngle: 0,
                endAngle: 0,
                startRho: 0,
                endRho: 150,
                margin: 0,
                path: "M 0,0"
            }
        }
    },
    getMidAngle: function () {
        return this.midAngle || 0
    },
    updatePath: function (j, h) {
        var g = Math.min(h.startAngle, h.endAngle), c = Math.max(h.startAngle, h.endAngle), b = this.midAngle = (g + c) * 0.5, d = h.margin, f = h.centerX, e = h.centerY, i = Math.min(h.startRho, h.endRho), a = Math.max(h.startRho, h.endRho);
        if (d) {
            f += d * Math.cos(b);
            e += d * Math.sin(b)
        }
        j.moveTo(f + i * Math.cos(g), e + i * Math.sin(g));
        j.lineTo(f + a * Math.cos(g), e + a * Math.sin(g));
        j.arc(f, e, a, g, c, false);
        j.lineTo(f + i * Math.cos(c), e + i * Math.sin(c));
        j.arc(f, e, i, c, g, true)
    }
});
Ext.define("Ext.draw.sprite.Square", {
    extend: "Ext.draw.sprite.Rect",
    alias: "sprite.square",
    inheritableStatics: {
        def: {
            processors: {size: "number"},
            defaults: {size: 4},
            triggers: {size: "size"},
            updaters: {
                size: function (a) {
                    var c = a.size, b = a.lineWidth / 2;
                    this.setAttributes({x: a.x - c - b, y: a.y - c, height: 2 * c, width: 2 * c})
                }
            }
        }
    }
});
Ext.define("Ext.draw.TextMeasurer", {
    singleton: true,
    requires: ["Ext.util.TextMetrics"],
    measureDiv: null,
    measureCache: {},
    precise: Ext.isIE8,
    measureDivTpl: {
        tag: "div",
        style: {overflow: "hidden", position: "relative", "float": "left", width: 0, height: 0},
        children: {
            tag: "div",
            style: {
                display: "block",
                position: "absolute",
                x: -100000,
                y: -100000,
                padding: 0,
                margin: 0,
                "z-index": -100000,
                "white-space": "nowrap"
            }
        }
    },
    actualMeasureText: function (g, b) {
        var e = Ext.draw.TextMeasurer, f = e.measureDiv, a = 100000, c;
        if (!f) {
            var d = Ext.Element.create({
                style: {
                    overflow: "hidden",
                    position: "relative",
                    "float": "left",
                    width: 0,
                    height: 0
                }
            });
            e.measureDiv = f = Ext.Element.create({
                style: {
                    position: "absolute",
                    x: a,
                    y: a,
                    "z-index": -a,
                    "white-space": "nowrap",
                    display: "block",
                    padding: 0,
                    margin: 0
                }
            });
            Ext.getBody().appendChild(d);
            d.appendChild(f)
        }
        if (b) {
            f.setStyle({font: b, lineHeight: "normal"})
        }
        f.setText("(" + g + ")");
        c = f.getSize();
        f.setText("()");
        c.width -= f.getSize().width;
        return c
    },
    measureTextSingleLine: function (h, d) {
        if (this.precise) {
            return this.preciseMeasureTextSingleLine(h, d)
        }
        h = h.toString();
        var a = this.measureCache, g = h.split(""), c = 0, j = 0, l, b, e, f, k;
        if (!a[d]) {
            a[d] = {}
        }
        a = a[d];
        if (a[h]) {
            return a[h]
        }
        for (e = 0, f = g.length; e < f; e++) {
            b = g[e];
            if (!(l = a[b])) {
                k = this.actualMeasureText(b, d);
                l = a[b] = k
            }
            c += l.width;
            j = Math.max(j, l.height)
        }
        return a[h] = {width: c, height: j}
    },
    preciseMeasureTextSingleLine: function (c, a) {
        c = c.toString();
        var b = this.measureDiv || (this.measureDiv = Ext.getBody().createChild(this.measureDivTpl).down("div"));
        b.setStyle({font: a || ""});
        return Ext.util.TextMetrics.measure(b, c)
    },
    measureText: function (e, b) {
        var h = e.split("\n"), d = h.length, f = 0, a = 0, j, c, g;
        if (d === 1) {
            return this.measureTextSingleLine(e, b)
        }
        g = [];
        for (c = 0; c < d; c++) {
            j = this.measureTextSingleLine(h[c], b);
            g.push(j);
            f += j.height;
            a = Math.max(a, j.width)
        }
        return {width: a, height: f, sizes: g}
    }
});
Ext.define("Ext.draw.sprite.Text", {
    extend: "Ext.draw.sprite.Sprite",
    requires: ["Ext.draw.TextMeasurer", "Ext.draw.Color"],
    alias: "sprite.text",
    type: "text",
    lineBreakRe: /\n/g,
    inheritableStatics: {
        shortHand1Re: /'(.*)'/g,
        shortHand2Re: / /g,
        shortHand3Re: /\s*,\s*/g,
        shortHand4Re: /\$\$\$\$/g,
        def: {
            animationProcessors: {text: "text"},
            processors: {
                x: "number",
                y: "number",
                text: "string",
                fontSize: function (a) {
                    if (!isNaN(a)) {
                        return +a + "px"
                    } else {
                        if (a.match(Ext.dom.Element.unitRe)) {
                            return a
                        }
                    }
                },
                fontStyle: "enums(,italic,oblique)",
                fontVariant: "enums(,small-caps)",
                fontWeight: (function (a) {
                    return function (b) {
                        if (!b) {
                            return ""
                        } else {
                            if (b === "normal") {
                                return ""
                            } else {
                                if (!isNaN(b)) {
                                    b = +b;
                                    if (100 <= b && b <= 900) {
                                        return b
                                    }
                                } else {
                                    if (b in a) {
                                        return b
                                    }
                                }
                            }
                        }
                    }
                })({normal: true, bold: true, bolder: true, lighter: true}),
                fontFamily: "string",
                textAlign: (function (a) {
                    return function (b) {
                        return a[b] || "center"
                    }
                })({start: "start", left: "start", center: "center", middle: "center", end: "end", right: "end"}),
                textBaseline: (function (a) {
                    return function (b) {
                        return a[b] || "alphabetic"
                    }
                })({
                    top: "top",
                    hanging: "hanging",
                    middle: "middle",
                    center: "middle",
                    alphabetic: "alphabetic",
                    ideographic: "ideographic",
                    bottom: "bottom"
                }),
                font: "string"
            },
            aliases: {
                "font-size": "fontSize",
                "font-family": "fontFamily",
                "font-weight": "fontWeight",
                "font-variant": "fontVariant",
                "text-anchor": "textAlign"
            },
            defaults: {
                fontStyle: "",
                fontVariant: "",
                fontWeight: "",
                fontSize: "10px",
                fontFamily: "sans-serif",
                font: "10px sans-serif",
                textBaseline: "alphabetic",
                textAlign: "start",
                strokeStyle: "rgba(0, 0, 0, 0)",
                fillStyle: "#000",
                x: 0,
                y: 0,
                text: ""
            },
            triggers: {
                fontStyle: "font,bbox",
                fontVariant: "font,bbox",
                fontWeight: "font,bbox",
                fontSize: "font,bbox",
                fontFamily: "font,bbox",
                font: "font-short-hand,bbox,canvas",
                textBaseline: "bbox",
                textAlign: "bbox",
                x: "bbox",
                y: "bbox",
                text: "bbox"
            },
            updaters: {
                "font-short-hand": (function (a) {
                    return function (c) {
                        var g = c.font, h, b, d, f, e;
                        g = g.replace(Ext.draw.sprite.Text.shortHand1Re, function (i, j) {
                            return j.replace(Ext.draw.sprite.Text.shortHand2Re, "$$$$")
                        });
                        g = g.replace(Ext.draw.sprite.Text.shortHand3Re, ",");
                        h = g.split(" ");
                        c = {};
                        for (d = 0, f = h.length; d < f; d++) {
                            b = h[d];
                            e = a[b];
                            if (e) {
                                c[e] = b
                            } else {
                                if (b.match(Ext.dom.Element.unitRe)) {
                                    c.fontSize = b
                                } else {
                                    c.fontFamily = b.replace(Ext.draw.sprite.Text.shortHand4Re, " ")
                                }
                            }
                        }
                        this.setAttributes(c, true)
                    }
                })({
                    italic: "fontStyle",
                    oblique: "fontStyle",
                    bold: "fontWeight",
                    bolder: "fontWeight",
                    lighter: "fontWeight",
                    "100": "fontWeight",
                    "200": "fontWeight",
                    "300": "fontWeight",
                    "400": "fontWeight",
                    "500": "fontWeight",
                    "600": "fontWeight",
                    "700": "fontWeight",
                    "800": "fontWeight",
                    "900": "fontWeight",
                    "small-caps": "fontVariant"
                }), font: function (b) {
                    var a = "";
                    if (b.fontWeight) {
                        a += b.fontWeight + " "
                    }
                    if (b.fontStyle) {
                        a += b.fontStyle + " "
                    }
                    if (b.fontVariant) {
                        a += b.fontVariant + " "
                    }
                    if (b.fontSize) {
                        a += b.fontSize + " "
                    }
                    if (b.fontFamily) {
                        a += b.fontFamily
                    }
                    this.setAttributes({font: a}, true)
                }
            }
        }
    },
    constructor: function (a) {
        if (a && a.font) {
            a = Ext.clone(a);
            for (var b in a) {
                if (b !== "font" && b.indexOf("font") === 0) {
                    delete a[b]
                }
            }
        }
        Ext.draw.sprite.Sprite.prototype.constructor.call(this, a)
    },
    getBBox: function (c) {
        var d = this, b = d.attr.bbox.plain, a = d.getSurface();
        if (b.dirty) {
            d.updatePlainBBox(b);
            b.dirty = false
        }
        if (a.getInherited().rtl && a.getFlipRtlText()) {
            d.updatePlainBBox(b, true)
        }
        return d.callParent([c])
    },
    rtlAlignments: {start: "end", center: "center", end: "start"},
    updatePlainBBox: function (f, v) {
        var w = this, s = w.attr, k = s.x, j = s.y, m = [], p = s.font, n = s.text, o = s.textBaseline, g = s.textAlign, q = (v && w.oldSize) ? w.oldSize : (w.oldSize = Ext.draw.TextMeasurer.measureText(n, p)), t = w.getSurface(), l = t.getInherited().rtl, r = l && t.getFlipRtlText(), d = t.getRect(), b = q.sizes, c = q.height, e = q.width, h = b ? b.length : 0, a, u = 0;
        switch (o) {
            case"hanging":
            case"top":
                break;
            case"ideographic":
            case"bottom":
                j -= c;
                break;
            case"alphabetic":
                j -= c * 0.8;
                break;
            case"middle":
                j -= c * 0.5;
                break
        }
        if (r) {
            k = d[2] - d[0] - k;
            g = w.rtlAlignments[g]
        }
        switch (g) {
            case"start":
                if (l) {
                    for (; u < h; u++) {
                        a = b[u].width;
                        m.push(-(e - a))
                    }
                }
                break;
            case"end":
                k -= e;
                if (l) {
                    break
                }
                for (; u < h; u++) {
                    a = b[u].width;
                    m.push(e - a)
                }
                break;
            case"center":
                k -= e * 0.5;
                for (; u < h; u++) {
                    a = b[u].width;
                    m.push((l ? -1 : 1) * (e - a) * 0.5)
                }
                break
        }
        s.textAlignOffsets = m;
        f.x = k;
        f.y = j;
        f.width = e;
        f.height = c
    },
    setText: function (a) {
        this.setAttributes({text: a}, true)
    },
    setElementStyles: function (b, d) {
        var e = b.stylesCache || (b.stylesCache = {}), c = b.dom.style, a;
        for (a in d) {
            if (e[a] !== d[a]) {
                e[a] = c[a] = d[a]
            }
        }
    },
    render: function (a, m, f) {
        var d = this, c = d.attr, l = Ext.draw.Matrix.fly(c.matrix.elements.slice(0)), k = d.getBBox(true), o = c.textAlignOffsets, h = Ext.draw.Color.RGBA_NONE, g, e, b, n, j;
        if (c.text.length === 0) {
            return
        }
        n = c.text.split("\n");
        j = k.height / n.length;
        g = c.bbox.plain.x;
        e = c.bbox.plain.y + j * 0.78;
        l.toContext(m);
        if (a.getInherited().rtl) {
            g += c.bbox.plain.width
        }
        for (b = 0; b < n.length; b++) {
            if (m.fillStyle !== h) {
                m.fillText(n[b], g + (o[b] || 0), e + j * b)
            }
            if (m.strokeStyle !== h) {
                m.strokeText(n[b], g + (o[b] || 0), e + j * b)
            }
        }
    }
});
Ext.define("Ext.draw.sprite.Tick", {
    extend: "Ext.draw.sprite.Line",
    alias: "sprite.tick",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", size: "number"},
            defaults: {x: 0, y: 0, size: 4},
            triggers: {x: "tick", y: "tick", size: "tick"},
            updaters: {
                tick: function (b) {
                    var d = b.size * 1.5, c = b.lineWidth / 2, a = b.x, e = b.y;
                    this.setAttributes({fromX: a - c, fromY: e - d, toX: a - c, toY: e + d})
                }
            }
        }
    }
});
Ext.define("Ext.draw.sprite.Triangle", {
    extend: "Ext.draw.sprite.Path",
    alias: "sprite.triangle",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", size: "number"},
            defaults: {x: 0, y: 0, size: 4},
            triggers: {x: "path", y: "path", size: "path"}
        }
    },
    updatePath: function (d, b) {
        var c = b.size * 2.2, a = b.x, e = b.y;
        d.fromSvgString("M".concat(a, ",", e, "m0-", c * 0.58, "l", c * 0.5, ",", c * 0.87, "-", c, ",0z"))
    }
});
Ext.define("Ext.draw.gradient.Linear", {
    extend: "Ext.draw.gradient.Gradient",
    requires: ["Ext.draw.Color"],
    type: "linear",
    config: {degrees: 0, radians: 0},
    applyRadians: function (b, a) {
        if (Ext.isNumber(b)) {
            return b
        }
        return a
    },
    applyDegrees: function (b, a) {
        if (Ext.isNumber(b)) {
            return b
        }
        return a
    },
    updateRadians: function (a) {
        this.setDegrees(Ext.draw.Draw.degrees(a))
    },
    updateDegrees: function (a) {
        this.setRadians(Ext.draw.Draw.rad(a))
    },
    generateGradient: function (q, o) {
        var c = this.getRadians(), p = Math.cos(c), j = Math.sin(c), m = o.width, f = o.height, d = o.x + m * 0.5, b = o.y + f * 0.5, n = this.getStops(), g = n.length, k, a, e;
        if (!isNaN(d) && !isNaN(b) && f > 0 && m > 0) {
            a = (Math.sqrt(f * f + m * m) * Math.abs(Math.cos(c - Math.atan(f / m)))) / 2;
            k = q.createLinearGradient(d + p * a, b + j * a, d - p * a, b - j * a);
            for (e = 0; e < g; e++) {
                k.addColorStop(n[e].offset, n[e].color)
            }
            return k
        }
        return Ext.draw.Color.NONE
    }
});
Ext.define("Ext.draw.gradient.Radial", {
    extend: "Ext.draw.gradient.Gradient",
    type: "radial",
    config: {start: {x: 0, y: 0, r: 0}, end: {x: 0, y: 0, r: 1}},
    applyStart: function (a, b) {
        if (!b) {
            return a
        }
        var c = {x: b.x, y: b.y, r: b.r};
        if ("x" in a) {
            c.x = a.x
        } else {
            if ("centerX" in a) {
                c.x = a.centerX
            }
        }
        if ("y" in a) {
            c.y = a.y
        } else {
            if ("centerY" in a) {
                c.y = a.centerY
            }
        }
        if ("r" in a) {
            c.r = a.r
        } else {
            if ("radius" in a) {
                c.r = a.radius
            }
        }
        return c
    },
    applyEnd: function (b, a) {
        if (!a) {
            return b
        }
        var c = {x: a.x, y: a.y, r: a.r};
        if ("x" in b) {
            c.x = b.x
        } else {
            if ("centerX" in b) {
                c.x = b.centerX
            }
        }
        if ("y" in b) {
            c.y = b.y
        } else {
            if ("centerY" in b) {
                c.y = b.centerY
            }
        }
        if ("r" in b) {
            c.r = b.r
        } else {
            if ("radius" in b) {
                c.r = b.radius
            }
        }
        return c
    },
    generateGradient: function (n, m) {
        var a = this.getStart(), b = this.getEnd(), k = m.width * 0.5, d = m.height * 0.5, j = m.x + k, f = m.y + d, g = n.createRadialGradient(j + a.x * k, f + a.y * d, a.r * Math.max(k, d), j + b.x * k, f + b.y * d, b.r * Math.max(k, d)), l = this.getStops(), e = l.length, c;
        for (c = 0; c < e; c++) {
            g.addColorStop(l[c].offset, l[c].color)
        }
        return g
    }
});
Ext.define("Ext.draw.Surface", {
    extend: "Ext.draw.SurfaceBase",
    xtype: "surface",
    requires: ["Ext.draw.sprite.*", "Ext.draw.gradient.*", "Ext.draw.sprite.AttributeDefinition", "Ext.draw.Matrix", "Ext.draw.Draw"],
    uses: ["Ext.draw.engine.Canvas"],
    devicePixelRatio: window.devicePixelRatio || 1,
    deprecated: {
        "5.0.2": {
            statics: {
                methods: {
                    stableSort: function (a) {
                        return Ext.Array.sort(a, function (d, c) {
                            return d.attr.zIndex - c.attr.zIndex
                        })
                    }
                }
            }
        }
    },
    config: {
        cls: Ext.baseCSSPrefix + "surface",
        rect: null,
        background: null,
        items: [],
        dirty: false,
        flipRtlText: false
    },
    isSurface: true,
    dirtyPredecessor: 0,
    constructor: function (a) {
        var b = this;
        b.predecessors = [];
        b.successors = [];
        b.pendingRenderFrame = false;
        b.map = {};
        b.callParent([a]);
        b.matrix = new Ext.draw.Matrix();
        b.inverseMatrix = b.matrix.inverse(b.inverseMatrix);
        b.resetTransform()
    },
    roundPixel: function (a) {
        return Math.round(this.devicePixelRatio * a) / this.devicePixelRatio
    },
    waitFor: function (a) {
        var b = this, c = b.predecessors;
        if (!Ext.Array.contains(c, a)) {
            c.push(a);
            a.successors.push(b);
            if (a._dirty) {
                b.dirtyPredecessor++
            }
        }
    },
    setDirty: function (d) {
        if (this._dirty !== d) {
            var c = this.successors, a, b, e = c.length;
            for (b = 0; b < e; b++) {
                a = c[b];
                if (d) {
                    a.dirtyPredecessor++;
                    a.setDirty(true)
                } else {
                    a.dirtyPredecessor--;
                    if (a.dirtyPredecessor === 0 && a.pendingRenderFrame) {
                        a.renderFrame()
                    }
                }
            }
            this._dirty = d
        }
    },
    applyElement: function (b, a) {
        if (a) {
            a.set(b)
        } else {
            a = Ext.Element.create(b)
        }
        this.setDirty(true);
        return a
    },
    applyBackground: function (a, b) {
        this.setDirty(true);
        if (Ext.isString(a)) {
            a = {fillStyle: a}
        }
        return Ext.factory(a, Ext.draw.sprite.Rect, b)
    },
    applyRect: function (a, b) {
        if (b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]) {
            return
        }
        if (Ext.isArray(a)) {
            return [a[0], a[1], a[2], a[3]]
        } else {
            if (Ext.isObject(a)) {
                return [a.x || a.left, a.y || a.top, a.width || (a.right - a.left), a.height || (a.bottom - a.top)]
            }
        }
    },
    updateRect: function (i) {
        var h = this, c = i[0], f = i[1], g = c + i[2], a = f + i[3], e = h.getBackground(), d = h.element;
        d.setLocalXY(Math.floor(c), Math.floor(f));
        d.setSize(Math.ceil(g - Math.floor(c)), Math.ceil(a - Math.floor(f)));
        if (e) {
            e.setAttributes({x: 0, y: 0, width: Math.ceil(g - Math.floor(c)), height: Math.ceil(a - Math.floor(f))})
        }
        h.setDirty(true)
    },
    resetTransform: function () {
        this.matrix.set(1, 0, 0, 1, 0, 0);
        this.inverseMatrix.set(1, 0, 0, 1, 0, 0);
        this.setDirty(true)
    },
    get: function (a) {
        return this.map[a] || this.items[a]
    },
    add: function () {
        var g = this, e = Array.prototype.slice.call(arguments), j = Ext.isArray(e[0]), a = [], h, d, f, b, c;
        f = Ext.Array.clean(j ? e[0] : e);
        if (!f.length) {
            return a
        }
        d = g.prepareItems(f);
        for (b = 0, c = d.length; b < c; b++) {
            h = d[b];
            g.map[h.getId()] = h;
            a.push(h);
            h.setParent(g);
            h.setSurface(g);
            g.onAdd(h)
        }
        f = g.getItems();
        if (f) {
            f.push.apply(f, a)
        }
        g.dirtyZIndex = true;
        g.setDirty(true);
        if (!j && a.length === 1) {
            return a[0]
        } else {
            return a
        }
    },
    onAdd: Ext.emptyFn,
    remove: function (a, b) {
        if (a) {
            delete this.map[a.getId()];
            if (b) {
                a.destroy()
            } else {
                a.setParent(null);
                a.setSurface(null);
                Ext.Array.remove(this.getItems(), a)
            }
            this.dirtyZIndex = true;
            this.setDirty(true)
        }
    },
    removeAll: function (d) {
        var a = this.getItems(), b = a.length, c;
        if (d) {
            while (b > 0) {
                a[--b].destroy()
            }
        } else {
            while (b > 0) {
                b--;
                c = a[b];
                c.setParent(null);
                c.setSurface(null)
            }
        }
        a.length = 0;
        this.map = {};
        this.dirtyZIndex = true
    },
    applyItems: function (a) {
        if (this.getItems()) {
            this.removeAll(true)
        }
        return Ext.Array.from(this.add(a))
    },
    prepareItems: function (a) {
        a = [].concat(a);
        var g = this, f, c, e, b, d = function (h) {
            this.remove(h, false)
        };
        for (c = 0, e = a.length; c < e; c++) {
            f = a[c];
            if (!(f instanceof Ext.draw.sprite.Sprite)) {
                f = a[c] = g.createItem(f)
            }
            f.on("beforedestroy", d, g)
        }
        return a
    },
    createItem: function (a) {
        return Ext.create(a.xclass || "sprite." + a.type, a)
    },
    getBBox: function (f, b) {
        var f = Ext.Array.from(f), c = Infinity, h = -Infinity, g = Infinity, a = -Infinity, j, k, d, e;
        for (d = 0, e = f.length; d < e; d++) {
            j = f[d];
            k = j.getBBox(b);
            if (c > k.x) {
                c = k.x
            }
            if (h < k.x + k.width) {
                h = k.x + k.width
            }
            if (g > k.y) {
                g = k.y
            }
            if (a < k.y + k.height) {
                a = k.y + k.height
            }
        }
        return {x: c, y: g, width: h - c, height: a - g}
    },
    emptyRect: [0, 0, 0, 0],
    getEventXY: function (d) {
        var g = this, f = g.getInherited().rtl, c = d.getXY(), a = g.el.up(), i = a.getXY(), h = g.getRect() || g.emptyRect, j = [], b;
        if (f) {
            b = a.getWidth();
            j[0] = i[0] - c[0] - h[0] + b
        } else {
            j[0] = c[0] - i[0] - h[0]
        }
        j[1] = c[1] - i[1] - h[1];
        return j
    },
    clear: Ext.emptyFn,
    orderByZIndex: function () {
        var d = this, a = d.getItems(), e = false, b, c;
        if (d.getDirty()) {
            for (b = 0, c = a.length; b < c; b++) {
                if (a[b].attr.dirtyZIndex) {
                    e = true;
                    break
                }
            }
            if (e) {
                Ext.Array.sort(a, function (g, f) {
                    return g.attr.zIndex - f.attr.zIndex
                });
                this.setDirty(true)
            }
            for (b = 0, c = a.length; b < c; b++) {
                a[b].attr.dirtyZIndex = false
            }
        }
    },
    repaint: function () {
        var a = this;
        a.repaint = Ext.emptyFn;
        Ext.defer(function () {
            delete a.repaint;
            a.element.repaint()
        }, 1)
    },
    renderFrame: function () {
        if (!this.element) {
            return
        }
        if (this.dirtyPredecessor > 0) {
            this.pendingRenderFrame = true;
            return
        }
        var g = this, f = this.getRect(), c = g.getBackground(), a = g.getItems(), e, b, d;
        if (!f) {
            return
        }
        g.orderByZIndex();
        if (g.getDirty()) {
            g.clear();
            g.clearTransform();
            if (c) {
                g.renderSprite(c)
            }
            for (b = 0, d = a.length; b < d; b++) {
                e = a[b];
                if (false === g.renderSprite(e)) {
                    return
                }
                e.attr.textPositionCount = g.textPosition
            }
            g.setDirty(false)
        }
    },
    renderSprite: Ext.emptyFn,
    clearTransform: Ext.emptyFn,
    getDirty: function () {
        return this._dirty
    },
    destroy: function () {
        var a = this;
        a.removeAll();
        a.setBackground(null);
        a.predecessors = null;
        a.successors = null;
        a.callParent()
    }
});
Ext.define("Ext.draw.overrides.Surface", {
    override: "Ext.draw.Surface",
    hitOptions: {fill: true, stroke: true},
    hitTest: function (b, c) {
        var f = this, g = f.getItems(), e, d, a;
        c = c || f.hitOptions;
        for (e = g.length - 1; e >= 0; e--) {
            d = g[e];
            if (d.hitTest) {
                a = d.hitTest(b, c);
                if (a) {
                    return a
                }
            }
        }
        return null
    },
    hitTestEvent: function (b, a) {
        var c = this.getEventXY(b);
        return this.hitTest(c, a)
    }
});
Ext.define("Ext.draw.engine.SvgContext", {
    requires: ["Ext.draw.Color"],
    toSave: ["strokeOpacity", "strokeStyle", "fillOpacity", "fillStyle", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "lineDash", "lineDashOffset", "miterLimit", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "globalCompositeOperation", "position", "fillGradient", "strokeGradient"],
    strokeOpacity: 1,
    strokeStyle: "none",
    fillOpacity: 1,
    fillStyle: "none",
    lineDash: [],
    lineDashOffset: 0,
    globalAlpha: 1,
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "miter",
    miterLimit: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: "none",
    globalCompositeOperation: "src",
    urlStringRe: /^url\(#([\w\-]+)\)$/,
    constructor: function (a) {
        this.surface = a;
        this.state = [];
        this.matrix = new Ext.draw.Matrix();
        this.path = null;
        this.clear()
    },
    clear: function () {
        this.group = this.surface.mainGroup;
        this.position = 0;
        this.path = null
    },
    getElement: function (a) {
        return this.surface.getSvgElement(this.group, a, this.position++)
    },
    removeElement: function (d) {
        var d = Ext.fly(d), h, g, b, f, a, e, c;
        if (!d) {
            return
        }
        if (d.dom.tagName === "g") {
            a = d.dom.gradients;
            for (c in a) {
                a[c].destroy()
            }
        } else {
            h = d.getAttribute("fill");
            g = d.getAttribute("stroke");
            b = h && h.match(this.urlStringRe);
            f = g && g.match(this.urlStringRe);
            if (b && b[1]) {
                e = Ext.fly(b[1]);
                if (e) {
                    e.destroy()
                }
            }
            if (f && f[1]) {
                e = Ext.fly(f[1]);
                if (e) {
                    e.destroy()
                }
            }
        }
        d.destroy()
    },
    save: function () {
        var c = this.toSave, e = {}, d = this.getElement("g"), b, a;
        for (a = 0; a < c.length; a++) {
            b = c[a];
            if (b in this) {
                e[b] = this[b]
            }
        }
        this.position = 0;
        e.matrix = this.matrix.clone();
        this.state.push(e);
        this.group = d;
        return d
    },
    restore: function () {
        var d = this.toSave, e = this.state.pop(), c = this.group.dom.childNodes, b, a;
        while (c.length > this.position) {
            this.removeElement(c[c.length - 1])
        }
        for (a = 0; a < d.length; a++) {
            b = d[a];
            if (b in e) {
                this[b] = e[b]
            } else {
                delete this[b]
            }
        }
        this.setTransform.apply(this, e.matrix.elements);
        this.group = this.group.getParent()
    },
    transform: function (f, b, e, g, d, c) {
        if (this.path) {
            var a = Ext.draw.Matrix.fly([f, b, e, g, d, c]).inverse();
            this.path.transform(a)
        }
        this.matrix.append(f, b, e, g, d, c)
    },
    setTransform: function (e, a, d, f, c, b) {
        if (this.path) {
            this.path.transform(this.matrix)
        }
        this.matrix.reset();
        this.transform(e, a, d, f, c, b)
    },
    scale: function (a, b) {
        this.transform(a, 0, 0, b, 0, 0)
    },
    rotate: function (d) {
        var c = Math.cos(d), a = Math.sin(d), b = -Math.sin(d), e = Math.cos(d);
        this.transform(c, a, b, e, 0, 0)
    },
    translate: function (a, b) {
        this.transform(1, 0, 0, 1, a, b)
    },
    setGradientBBox: function (a) {
        this.bbox = a
    },
    beginPath: function () {
        this.path = new Ext.draw.Path()
    },
    moveTo: function (a, b) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.moveTo(a, b);
        this.path.element = null
    },
    lineTo: function (a, b) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.lineTo(a, b);
        this.path.element = null
    },
    rect: function (b, d, c, a) {
        this.moveTo(b, d);
        this.lineTo(b + c, d);
        this.lineTo(b + c, d + a);
        this.lineTo(b, d + a);
        this.closePath()
    },
    strokeRect: function (b, d, c, a) {
        this.beginPath();
        this.rect(b, d, c, a);
        this.stroke()
    },
    fillRect: function (b, d, c, a) {
        this.beginPath();
        this.rect(b, d, c, a);
        this.fill()
    },
    closePath: function () {
        if (!this.path) {
            this.beginPath()
        }
        this.path.closePath();
        this.path.element = null
    },
    arcSvg: function (d, a, f, g, c, b, e) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.arcSvg(d, a, f, g, c, b, e);
        this.path.element = null
    },
    arc: function (b, f, a, d, c, e) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.arc(b, f, a, d, c, e);
        this.path.element = null
    },
    ellipse: function (a, h, g, f, d, c, b, e) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.ellipse(a, h, g, f, d, c, b, e);
        this.path.element = null
    },
    arcTo: function (b, e, a, d, g, f, c) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.arcTo(b, e, a, d, g, f, c);
        this.path.element = null
    },
    bezierCurveTo: function (d, f, b, e, a, c) {
        if (!this.path) {
            this.beginPath()
        }
        this.path.bezierCurveTo(d, f, b, e, a, c);
        this.path.element = null
    },
    strokeText: function (d, a, e) {
        d = String(d);
        if (this.strokeStyle) {
            var b = this.getElement("text"), c = this.surface.getSvgElement(b, "tspan", 0);
            this.surface.setElementAttributes(b, {
                x: a,
                y: e,
                transform: this.matrix.toSvg(),
                stroke: this.strokeStyle,
                fill: "none",
                opacity: this.globalAlpha,
                "stroke-opacity": this.strokeOpacity,
                style: "font: " + this.font,
                "stroke-dasharray": this.lineDash.join(","),
                "stroke-dashoffset": this.lineDashOffset
            });
            if (this.lineDash.length) {
                this.surface.setElementAttributes(b, {
                    "stroke-dasharray": this.lineDash.join(","),
                    "stroke-dashoffset": this.lineDashOffset
                })
            }
            if (c.dom.firstChild) {
                c.dom.removeChild(c.dom.firstChild)
            }
            this.surface.setElementAttributes(c, {"alignment-baseline": "alphabetic"});
            c.dom.appendChild(document.createTextNode(Ext.String.htmlDecode(d)))
        }
    },
    fillText: function (d, a, e) {
        d = String(d);
        if (this.fillStyle) {
            var b = this.getElement("text"), c = this.surface.getSvgElement(b, "tspan", 0);
            this.surface.setElementAttributes(b, {
                x: a,
                y: e,
                transform: this.matrix.toSvg(),
                fill: this.fillStyle,
                opacity: this.globalAlpha,
                "fill-opacity": this.fillOpacity,
                style: "font: " + this.font
            });
            if (c.dom.firstChild) {
                c.dom.removeChild(c.dom.firstChild)
            }
            this.surface.setElementAttributes(c, {"alignment-baseline": "alphabetic"});
            c.dom.appendChild(document.createTextNode(Ext.String.htmlDecode(d)))
        }
    },
    drawImage: function (c, k, i, l, e, p, n, a, g) {
        var f = this, d = f.getElement("image"), j = k, h = i, b = typeof l === "undefined" ? c.width : l, m = typeof e === "undefined" ? c.height : e, o = null;
        if (typeof g !== "undefined") {
            o = k + " " + i + " " + l + " " + e;
            j = p;
            h = n;
            b = a;
            m = g
        }
        d.dom.setAttributeNS("http://www.w3.org/1999/xlink", "href", c.src);
        f.surface.setElementAttributes(d, {
            viewBox: o,
            x: j,
            y: h,
            width: b,
            height: m,
            opacity: f.globalAlpha,
            transform: f.matrix.toSvg()
        })
    },
    fill: function () {
        if (!this.path) {
            return
        }
        if (this.fillStyle) {
            var c, a = this.fillGradient, d = this.bbox, b = this.path.element;
            if (!b) {
                c = this.path.toString();
                b = this.path.element = this.getElement("path");
                this.surface.setElementAttributes(b, {d: c, transform: this.matrix.toSvg()})
            }
            this.surface.setElementAttributes(b, {
                fill: a && d ? a.generateGradient(this, d) : this.fillStyle,
                "fill-opacity": this.fillOpacity * this.globalAlpha
            })
        }
    },
    stroke: function () {
        if (!this.path) {
            return
        }
        if (this.strokeStyle) {
            var c, b = this.strokeGradient, d = this.bbox, a = this.path.element;
            if (!a || !this.path.svgString) {
                c = this.path.toString();
                if (!c) {
                    return
                }
                a = this.path.element = this.getElement("path");
                this.surface.setElementAttributes(a, {fill: "none", d: c, transform: this.matrix.toSvg()})
            }
            this.surface.setElementAttributes(a, {
                stroke: b && d ? b.generateGradient(this, d) : this.strokeStyle,
                "stroke-linecap": this.lineCap,
                "stroke-linejoin": this.lineJoin,
                "stroke-width": this.lineWidth,
                "stroke-opacity": this.strokeOpacity * this.globalAlpha,
                "stroke-dasharray": this.lineDash.join(","),
                "stroke-dashoffset": this.lineDashOffset
            });
            if (this.lineDash.length) {
                this.surface.setElementAttributes(a, {
                    "stroke-dasharray": this.lineDash.join(","),
                    "stroke-dashoffset": this.lineDashOffset
                })
            }
        }
    },
    fillStroke: function (a, e) {
        var b = this, d = b.fillStyle, g = b.strokeStyle, c = b.fillOpacity, f = b.strokeOpacity;
        if (e === undefined) {
            e = a.transformFillStroke
        }
        if (!e) {
            a.inverseMatrix.toContext(b)
        }
        if (d && c !== 0) {
            b.fill()
        }
        if (g && f !== 0) {
            b.stroke()
        }
    },
    appendPath: function (a) {
        this.path = a.clone()
    },
    setLineDash: function (a) {
        this.lineDash = a
    },
    getLineDash: function () {
        return this.lineDash
    },
    createLinearGradient: function (d, g, b, e) {
        var f = this, c = f.surface.getNextDef("linearGradient"), a = f.group.dom.gradients || (f.group.dom.gradients = {}), h;
        f.surface.setElementAttributes(c, {x1: d, y1: g, x2: b, y2: e, gradientUnits: "userSpaceOnUse"});
        h = new Ext.draw.engine.SvgContext.Gradient(f, f.surface, c);
        a[c.dom.id] = h;
        return h
    },
    createRadialGradient: function (b, j, d, a, i, c) {
        var g = this, e = g.surface.getNextDef("radialGradient"), f = g.group.dom.gradients || (g.group.dom.gradients = {}), h;
        g.surface.setElementAttributes(e, {fx: b, fy: j, cx: a, cy: i, r: c, gradientUnits: "userSpaceOnUse"});
        h = new Ext.draw.engine.SvgContext.Gradient(g, g.surface, e, d / c);
        f[e.dom.id] = h;
        return h
    }
});
Ext.define("Ext.draw.engine.SvgContext.Gradient", {
    statics: {map: {}}, constructor: function (c, a, d, b) {
        var f = this.statics().map, e;
        e = f[d.dom.id];
        if (e) {
            e.element = null
        }
        f[d.dom.id] = this;
        this.ctx = c;
        this.surface = a;
        this.element = d;
        this.position = 0;
        this.compression = b || 0
    }, addColorStop: function (d, b) {
        var c = this.surface.getSvgElement(this.element, "stop", this.position++), a = this.compression;
        this.surface.setElementAttributes(c, {
            offset: (((1 - a) * d + a) * 100).toFixed(2) + "%",
            "stop-color": b,
            "stop-opacity": Ext.draw.Color.fly(b).a.toFixed(15)
        })
    }, toString: function () {
        var a = this.element.dom.childNodes;
        while (a.length > this.position) {
            Ext.fly(a[a.length - 1]).destroy()
        }
        return "url(#" + this.element.getId() + ")"
    }, destroy: function () {
        var b = this.statics().map, a = this.element;
        if (a) {
            delete b[a.dom.id];
            a.destroy()
        }
        this.callParent()
    }
});
Ext.define("Ext.draw.engine.Svg", {
    extend: "Ext.draw.Surface",
    requires: ["Ext.draw.engine.SvgContext"],
    statics: {BBoxTextCache: {}},
    config: {highPrecision: false},
    getElementConfig: function () {
        return {
            reference: "element",
            style: {position: "absolute"},
            children: [{
                reference: "innerElement",
                style: {width: "100%", height: "100%", position: "relative"},
                children: [{
                    tag: "svg",
                    reference: "svgElement",
                    namespace: "http://www.w3.org/2000/svg",
                    width: "100%",
                    height: "100%",
                    version: 1.1
                }]
            }]
        }
    },
    constructor: function (a) {
        var b = this;
        b.callParent([a]);
        b.mainGroup = b.createSvgNode("g");
        b.defElement = b.createSvgNode("defs");
        b.svgElement.appendChild(b.mainGroup);
        b.svgElement.appendChild(b.defElement);
        b.ctx = new Ext.draw.engine.SvgContext(b)
    },
    createSvgNode: function (a) {
        var b = document.createElementNS("http://www.w3.org/2000/svg", a);
        return Ext.get(b)
    },
    getSvgElement: function (d, b, a) {
        var c;
        if (d.dom.childNodes.length > a) {
            c = d.dom.childNodes[a];
            if (c.tagName === b) {
                return Ext.get(c)
            } else {
                Ext.destroy(c)
            }
        }
        c = Ext.get(this.createSvgNode(b));
        if (a === 0) {
            d.insertFirst(c)
        } else {
            c.insertAfter(Ext.fly(d.dom.childNodes[a - 1]))
        }
        c.cache = {};
        return c
    },
    setElementAttributes: function (d, b) {
        var f = d.dom, a = d.cache, c, e;
        for (c in b) {
            e = b[c];
            if (a[c] !== e) {
                a[c] = e;
                f.setAttribute(c, e)
            }
        }
    },
    getNextDef: function (a) {
        return this.getSvgElement(this.defElement, a, this.defPosition++)
    },
    clearTransform: function () {
        var a = this;
        a.mainGroup.set({transform: a.matrix.toSvg()})
    },
    clear: function () {
        this.ctx.clear();
        this.defPosition = 0
    },
    renderSprite: function (b) {
        var d = this, c = d.getRect(), a = d.ctx;
        if (b.attr.hidden || b.attr.opacity === 0) {
            a.save();
            a.restore();
            return
        }
        b.element = a.save();
        b.preRender(this);
        b.useAttributes(a, c);
        if (false === b.render(this, a, [0, 0, c[2], c[3]])) {
            return false
        }
        b.setDirty(false);
        a.restore()
    },
    flatten: function (e, b) {
        var c = '<?xml version="1.0" standalone="yes"?>', f = Ext.getClassName(this), a, g, d;
        c += '<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="' + e.width + '" height="' + e.height + '">';
        for (d = 0; d < b.length; d++) {
            a = b[d];
            if (Ext.getClassName(a) !== f) {
                continue
            }
            g = a.getRect();
            c += '<g transform="translate(' + g[0] + "," + g[1] + ')">';
            c += this.serializeNode(a.svgElement.dom);
            c += "</g>"
        }
        c += "</svg>";
        return {data: "data:image/svg+xml;utf8," + encodeURIComponent(c), type: "svg"}
    },
    serializeNode: function (d) {
        var b = "", c, f, a, e;
        if (d.nodeType === document.TEXT_NODE) {
            return d.nodeValue
        }
        b += "<" + d.nodeName;
        if (d.attributes.length) {
            for (c = 0, f = d.attributes.length; c < f; c++) {
                a = d.attributes[c];
                b += " " + a.name + '="' + a.value + '"'
            }
        }
        b += ">";
        if (d.childNodes && d.childNodes.length) {
            for (c = 0, f = d.childNodes.length; c < f; c++) {
                e = d.childNodes[c];
                b += this.serializeNode(e)
            }
        }
        b += "</" + d.nodeName + ">";
        return b
    },
    destroy: function (c, a, d) {
        var b = this;
        b.ctx.destroy();
        b.mainGroup.destroy();
        delete b.mainGroup;
        delete b.ctx;
        b.callParent(arguments)
    },
    remove: function (a, b) {
        if (a && a.element) {
            if (this.ctx) {
                this.ctx.removeElement(a.element)
            } else {
                a.element.destroy()
            }
            a.element = null
        }
        this.callParent(arguments)
    }
});
Ext.draw || (Ext.draw = {});
Ext.draw.engine || (Ext.draw.engine = {});
Ext.draw.engine.excanvas = true;
if (!document.createElement("canvas").getContext) {
    (function () {
        var ab = Math;
        var n = ab.round;
        var l = ab.sin;
        var A = ab.cos;
        var H = ab.abs;
        var N = ab.sqrt;
        var d = 10;
        var f = d / 2;
        var z = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

        function y() {
            return this.context_ || (this.context_ = new D(this))
        }

        var t = Array.prototype.slice;

        function g(j, m, p) {
            var i = t.call(arguments, 2);
            return function () {
                return j.apply(m, i.concat(t.call(arguments)))
            }
        }

        function af(i) {
            return String(i).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
        }

        function Y(m, j, i) {
            Ext.onReady(function () {
                if (!m.namespaces[j]) {
                    m.namespaces.add(j, i, "#default#VML")
                }
            })
        }

        function R(j) {
            Y(j, "g_vml_", "urn:schemas-microsoft-com:vml");
            Y(j, "g_o_", "urn:schemas-microsoft-com:office:office");
            if (!j.styleSheets.ex_canvas_) {
                var i = j.createStyleSheet();
                i.owningElement.id = "ex_canvas_";
                i.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
            }
        }

        R(document);
        var e = {
            init: function (i) {
                var j = i || document;
                j.createElement("canvas");
                j.attachEvent("onreadystatechange", g(this.init_, this, j))
            }, init_: function (p) {
                var m = p.getElementsByTagName("canvas");
                for (var j = 0; j < m.length; j++) {
                    this.initElement(m[j])
                }
            }, initElement: function (j) {
                if (!j.getContext) {
                    j.getContext = y;
                    R(j.ownerDocument);
                    j.innerHTML = "";
                    j.attachEvent("onpropertychange", x);
                    j.attachEvent("onresize", W);
                    var i = j.attributes;
                    if (i.width && i.width.specified) {
                        j.style.width = i.width.nodeValue + "px"
                    } else {
                        j.width = j.clientWidth
                    }
                    if (i.height && i.height.specified) {
                        j.style.height = i.height.nodeValue + "px"
                    } else {
                        j.height = j.clientHeight
                    }
                }
                return j
            }
        };

        function x(j) {
            var i = j.srcElement;
            switch (j.propertyName) {
                case"width":
                    i.getContext().clearRect();
                    i.style.width = i.attributes.width.nodeValue + "px";
                    i.firstChild.style.width = i.clientWidth + "px";
                    break;
                case"height":
                    i.getContext().clearRect();
                    i.style.height = i.attributes.height.nodeValue + "px";
                    i.firstChild.style.height = i.clientHeight + "px";
                    break
            }
        }

        function W(j) {
            var i = j.srcElement;
            if (i.firstChild) {
                i.firstChild.style.width = i.clientWidth + "px";
                i.firstChild.style.height = i.clientHeight + "px"
            }
        }

        e.init();
        var k = [];
        for (var ae = 0; ae < 16; ae++) {
            for (var ad = 0; ad < 16; ad++) {
                k[ae * 16 + ad] = ae.toString(16) + ad.toString(16)
            }
        }
        function B() {
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        }

        function J(p, m) {
            var j = B();
            for (var i = 0; i < 3; i++) {
                for (var ah = 0; ah < 3; ah++) {
                    var Z = 0;
                    for (var ag = 0; ag < 3; ag++) {
                        Z += p[i][ag] * m[ag][ah]
                    }
                    j[i][ah] = Z
                }
            }
            return j
        }

        function v(j, i) {
            i.fillStyle = j.fillStyle;
            i.lineCap = j.lineCap;
            i.lineJoin = j.lineJoin;
            i.lineDash = j.lineDash;
            i.lineWidth = j.lineWidth;
            i.miterLimit = j.miterLimit;
            i.shadowBlur = j.shadowBlur;
            i.shadowColor = j.shadowColor;
            i.shadowOffsetX = j.shadowOffsetX;
            i.shadowOffsetY = j.shadowOffsetY;
            i.strokeStyle = j.strokeStyle;
            i.globalAlpha = j.globalAlpha;
            i.font = j.font;
            i.textAlign = j.textAlign;
            i.textBaseline = j.textBaseline;
            i.arcScaleX_ = j.arcScaleX_;
            i.arcScaleY_ = j.arcScaleY_;
            i.lineScale_ = j.lineScale_
        }

        var b = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            grey: "#808080",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            oldlace: "#FDF5E6",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            whitesmoke: "#F5F5F5",
            yellowgreen: "#9ACD32"
        };

        function M(j) {
            var p = j.indexOf("(", 3);
            var i = j.indexOf(")", p + 1);
            var m = j.substring(p + 1, i).split(",");
            if (m.length != 4 || j.charAt(3) != "a") {
                m[3] = 1
            }
            return m
        }

        function c(i) {
            return parseFloat(i) / 100
        }

        function r(j, m, i) {
            return Math.min(i, Math.max(m, j))
        }

        function I(ag) {
            var i, ai, aj, ah, ak, Z;
            ah = parseFloat(ag[0]) / 360 % 360;
            if (ah < 0) {
                ah++
            }
            ak = r(c(ag[1]), 0, 1);
            Z = r(c(ag[2]), 0, 1);
            if (ak == 0) {
                i = ai = aj = Z
            } else {
                var j = Z < 0.5 ? Z * (1 + ak) : Z + ak - Z * ak;
                var m = 2 * Z - j;
                i = a(m, j, ah + 1 / 3);
                ai = a(m, j, ah);
                aj = a(m, j, ah - 1 / 3)
            }
            return "#" + k[Math.floor(i * 255)] + k[Math.floor(ai * 255)] + k[Math.floor(aj * 255)]
        }

        function a(j, i, m) {
            if (m < 0) {
                m++
            }
            if (m > 1) {
                m--
            }
            if (6 * m < 1) {
                return j + (i - j) * 6 * m
            } else {
                if (2 * m < 1) {
                    return i
                } else {
                    if (3 * m < 2) {
                        return j + (i - j) * (2 / 3 - m) * 6
                    } else {
                        return j
                    }
                }
            }
        }

        var C = {};

        function F(j) {
            if (j in C) {
                return C[j]
            }
            var ag, Z = 1;
            j = String(j);
            if (j.charAt(0) == "#") {
                ag = j
            } else {
                if (/^rgb/.test(j)) {
                    var p = M(j);
                    var ag = "#", ah;
                    for (var m = 0; m < 3; m++) {
                        if (p[m].indexOf("%") != -1) {
                            ah = Math.floor(c(p[m]) * 255)
                        } else {
                            ah = +p[m]
                        }
                        ag += k[r(ah, 0, 255)]
                    }
                    Z = +p[3]
                } else {
                    if (/^hsl/.test(j)) {
                        var p = M(j);
                        ag = I(p);
                        Z = p[3]
                    } else {
                        ag = b[j] || j
                    }
                }
            }
            return C[j] = {color: ag, alpha: Z}
        }

        var o = {style: "normal", variant: "normal", weight: "normal", size: 10, family: "sans-serif"};
        var L = {};

        function E(i) {
            if (L[i]) {
                return L[i]
            }
            var p = document.createElement("div");
            var m = p.style;
            try {
                m.font = i
            } catch (j) {
            }
            return L[i] = {
                style: m.fontStyle || o.style,
                variant: m.fontVariant || o.variant,
                weight: m.fontWeight || o.weight,
                size: m.fontSize || o.size,
                family: m.fontFamily || o.family
            }
        }

        function u(m, j) {
            var i = {};
            for (var ah in m) {
                i[ah] = m[ah]
            }
            var ag = parseFloat(j.currentStyle.fontSize), Z = parseFloat(m.size);
            if (typeof m.size == "number") {
                i.size = m.size
            } else {
                if (m.size.indexOf("px") != -1) {
                    i.size = Z
                } else {
                    if (m.size.indexOf("em") != -1) {
                        i.size = ag * Z
                    } else {
                        if (m.size.indexOf("%") != -1) {
                            i.size = (ag / 100) * Z
                        } else {
                            if (m.size.indexOf("pt") != -1) {
                                i.size = Z / 0.75
                            } else {
                                i.size = ag
                            }
                        }
                    }
                }
            }
            i.size *= 0.981;
            return i
        }

        function ac(i) {
            return i.style + " " + i.variant + " " + i.weight + " " + i.size + "px " + i.family
        }

        var s = {butt: "flat", round: "round"};

        function S(i) {
            return s[i] || "square"
        }

        function D(i) {
            this.m_ = B();
            this.mStack_ = [];
            this.aStack_ = [];
            this.currentPath_ = [];
            this.strokeStyle = "#000";
            this.fillStyle = "#000";
            this.lineWidth = 1;
            this.lineJoin = "miter";
            this.lineDash = [];
            this.lineCap = "butt";
            this.miterLimit = d * 1;
            this.globalAlpha = 1;
            this.font = "10px sans-serif";
            this.textAlign = "left";
            this.textBaseline = "alphabetic";
            this.canvas = i;
            var m = "width:" + i.clientWidth + "px;height:" + i.clientHeight + "px;overflow:hidden;position:absolute";
            var j = i.ownerDocument.createElement("div");
            j.style.cssText = m;
            i.appendChild(j);
            var p = j.cloneNode(false);
            p.style.backgroundColor = "red";
            p.style.filter = "alpha(opacity=0)";
            i.appendChild(p);
            this.element_ = j;
            this.arcScaleX_ = 1;
            this.arcScaleY_ = 1;
            this.lineScale_ = 1
        }

        var q = D.prototype;
        q.clearRect = function () {
            if (this.textMeasureEl_) {
                this.textMeasureEl_.removeNode(true);
                this.textMeasureEl_ = null
            }
            this.element_.innerHTML = ""
        };
        q.beginPath = function () {
            this.currentPath_ = []
        };
        q.moveTo = function (j, i) {
            var m = V(this, j, i);
            this.currentPath_.push({type: "moveTo", x: m.x, y: m.y});
            this.currentX_ = m.x;
            this.currentY_ = m.y
        };
        q.lineTo = function (j, i) {
            var m = V(this, j, i);
            this.currentPath_.push({type: "lineTo", x: m.x, y: m.y});
            this.currentX_ = m.x;
            this.currentY_ = m.y
        };
        q.bezierCurveTo = function (m, j, ak, aj, ai, ag) {
            var i = V(this, ai, ag);
            var ah = V(this, m, j);
            var Z = V(this, ak, aj);
            K(this, ah, Z, i)
        };
        function K(i, Z, m, j) {
            i.currentPath_.push({type: "bezierCurveTo", cp1x: Z.x, cp1y: Z.y, cp2x: m.x, cp2y: m.y, x: j.x, y: j.y});
            i.currentX_ = j.x;
            i.currentY_ = j.y
        }

        q.quadraticCurveTo = function (ai, m, j, i) {
            var ah = V(this, ai, m);
            var ag = V(this, j, i);
            var aj = {
                x: this.currentX_ + 2 / 3 * (ah.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (ah.y - this.currentY_)
            };
            var Z = {x: aj.x + (ag.x - this.currentX_) / 3, y: aj.y + (ag.y - this.currentY_) / 3};
            K(this, aj, Z, ag)
        };
        q.arc = function (al, aj, ak, ag, j, m) {
            ak *= d;
            var ap = m ? "at" : "wa";
            var am = al + A(ag) * ak - f;
            var ao = aj + l(ag) * ak - f;
            var i = al + A(j) * ak - f;
            var an = aj + l(j) * ak - f;
            if (am == i && !m) {
                am += 0.125
            }
            var Z = V(this, al, aj);
            var ai = V(this, am, ao);
            var ah = V(this, i, an);
            this.currentPath_.push({
                type: ap,
                x: Z.x,
                y: Z.y,
                radius: ak,
                xStart: ai.x,
                yStart: ai.y,
                xEnd: ah.x,
                yEnd: ah.y
            })
        };
        q.rect = function (m, j, i, p) {
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + p);
            this.lineTo(m, j + p);
            this.closePath()
        };
        q.strokeRect = function (m, j, i, p) {
            var Z = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + p);
            this.lineTo(m, j + p);
            this.closePath();
            this.stroke();
            this.currentPath_ = Z
        };
        q.fillRect = function (m, j, i, p) {
            var Z = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + p);
            this.lineTo(m, j + p);
            this.closePath();
            this.fill();
            this.currentPath_ = Z
        };
        q.createLinearGradient = function (j, p, i, m) {
            var Z = new U("gradient");
            Z.x0_ = j;
            Z.y0_ = p;
            Z.x1_ = i;
            Z.y1_ = m;
            return Z
        };
        q.createRadialGradient = function (p, ag, m, j, Z, i) {
            var ah = new U("gradientradial");
            ah.x0_ = p;
            ah.y0_ = ag;
            ah.r0_ = m;
            ah.x1_ = j;
            ah.y1_ = Z;
            ah.r1_ = i;
            return ah
        };
        q.drawImage = function (an, j) {
            var ah, Z, aj, ar, al, ak, ao, av;
            var ai = an.runtimeStyle.width;
            var am = an.runtimeStyle.height;
            an.runtimeStyle.width = "auto";
            an.runtimeStyle.height = "auto";
            var ag = an.width;
            var aq = an.height;
            an.runtimeStyle.width = ai;
            an.runtimeStyle.height = am;
            if (arguments.length == 3) {
                ah = arguments[1];
                Z = arguments[2];
                al = ak = 0;
                ao = aj = ag;
                av = ar = aq
            } else {
                if (arguments.length == 5) {
                    ah = arguments[1];
                    Z = arguments[2];
                    aj = arguments[3];
                    ar = arguments[4];
                    al = ak = 0;
                    ao = ag;
                    av = aq
                } else {
                    if (arguments.length == 9) {
                        al = arguments[1];
                        ak = arguments[2];
                        ao = arguments[3];
                        av = arguments[4];
                        ah = arguments[5];
                        Z = arguments[6];
                        aj = arguments[7];
                        ar = arguments[8]
                    } else {
                        throw Error("Invalid number of arguments")
                    }
                }
            }
            var au = V(this, ah, Z);
            var at = [];
            var i = 10;
            var p = 10;
            var ap = this.m_;
            at.push(" <g_vml_:group", ' coordsize="', d * i, ",", d * p, '"', ' coordorigin="0,0"', ' style="width:', n(i * ap[0][0]), "px;height:", n(p * ap[1][1]), "px;position:absolute;", "top:", n(au.y / d), "px;left:", n(au.x / d), "px; rotation:", n(Math.atan(ap[0][1] / ap[1][1]) * 180 / Math.PI), ";");
            at.push('" >', '<g_vml_:image src="', an.src, '"', ' style="width:', d * aj, "px;", " height:", d * ar, 'px"', ' cropleft="', al / ag, '"', ' croptop="', ak / aq, '"', ' cropright="', (ag - al - ao) / ag, '"', ' cropbottom="', (aq - ak - av) / aq, '"', " />", "</g_vml_:group>");
            this.element_.insertAdjacentHTML("BeforeEnd", at.join(""))
        };
        q.setLineDash = function (i) {
            if (i.length === 1) {
                i = i.slice();
                i[1] = i[0]
            }
            this.lineDash = i
        };
        q.getLineDash = function () {
            return this.lineDash
        };
        q.stroke = function (ak) {
            var ai = [];
            var m = 10;
            var al = 10;
            ai.push("<g_vml_:shape", ' filled="', !!ak, '"', ' style="position:absolute;width:', m, "px;height:", al, 'px;left:0px;top:0px;"', ' coordorigin="0,0"', ' coordsize="', d * m, ",", d * al, '"', ' stroked="', !ak, '"', ' path="');
            var Z = {x: null, y: null};
            var aj = {x: null, y: null};
            for (var ag = 0; ag < this.currentPath_.length; ag++) {
                var j = this.currentPath_[ag];
                var ah;
                switch (j.type) {
                    case"moveTo":
                        ah = j;
                        ai.push(" m ", n(j.x), ",", n(j.y));
                        break;
                    case"lineTo":
                        ai.push(" l ", n(j.x), ",", n(j.y));
                        break;
                    case"close":
                        ai.push(" x ");
                        j = null;
                        break;
                    case"bezierCurveTo":
                        ai.push(" c ", n(j.cp1x), ",", n(j.cp1y), ",", n(j.cp2x), ",", n(j.cp2y), ",", n(j.x), ",", n(j.y));
                        break;
                    case"at":
                    case"wa":
                        ai.push(" ", j.type, " ", n(j.x - this.arcScaleX_ * j.radius), ",", n(j.y - this.arcScaleY_ * j.radius), " ", n(j.x + this.arcScaleX_ * j.radius), ",", n(j.y + this.arcScaleY_ * j.radius), " ", n(j.xStart), ",", n(j.yStart), " ", n(j.xEnd), ",", n(j.yEnd));
                        break
                }
                if (j) {
                    if (Z.x == null || j.x < Z.x) {
                        Z.x = j.x
                    }
                    if (aj.x == null || j.x > aj.x) {
                        aj.x = j.x
                    }
                    if (Z.y == null || j.y < Z.y) {
                        Z.y = j.y
                    }
                    if (aj.y == null || j.y > aj.y) {
                        aj.y = j.y
                    }
                }
            }
            ai.push(' ">');
            if (!ak) {
                w(this, ai)
            } else {
                G(this, ai, Z, aj)
            }
            ai.push("</g_vml_:shape>");
            this.element_.insertAdjacentHTML("beforeEnd", ai.join(""))
        };
        function w(m, ag) {
            var j = F(m.strokeStyle);
            var p = j.color;
            var Z = j.alpha * m.globalAlpha;
            var i = m.lineScale_ * m.lineWidth;
            if (i < 1) {
                Z *= i
            }
            ag.push("<g_vml_:stroke", ' opacity="', Z, '"', ' joinstyle="', m.lineJoin, '"', ' dashstyle="', m.lineDash.join(" "), '"', ' miterlimit="', m.miterLimit, '"', ' endcap="', S(m.lineCap), '"', ' weight="', i, 'px"', ' color="', p, '" />')
        }

        function G(aq, ai, aK, ar) {
            var aj = aq.fillStyle;
            var aB = aq.arcScaleX_;
            var aA = aq.arcScaleY_;
            var j = ar.x - aK.x;
            var p = ar.y - aK.y;
            if (aj instanceof U) {
                var an = 0;
                var aF = {x: 0, y: 0};
                var ax = 0;
                var am = 1;
                if (aj.type_ == "gradient") {
                    var al = aj.x0_ / aB;
                    var m = aj.y0_ / aA;
                    var ak = aj.x1_ / aB;
                    var aM = aj.y1_ / aA;
                    var aJ = V(aq, al, m);
                    var aI = V(aq, ak, aM);
                    var ag = aI.x - aJ.x;
                    var Z = aI.y - aJ.y;
                    an = Math.atan2(ag, Z) * 180 / Math.PI;
                    if (an < 0) {
                        an += 360
                    }
                    if (an < 0.000001) {
                        an = 0
                    }
                } else {
                    var aJ = V(aq, aj.x0_, aj.y0_);
                    aF = {x: (aJ.x - aK.x) / j, y: (aJ.y - aK.y) / p};
                    j /= aB * d;
                    p /= aA * d;
                    var aD = ab.max(j, p);
                    ax = 2 * aj.r0_ / aD;
                    am = 2 * aj.r1_ / aD - ax
                }
                var av = aj.colors_;
                av.sort(function (aN, i) {
                    return aN.offset - i.offset
                });
                var ap = av.length;
                var au = av[0].color;
                var at = av[ap - 1].color;
                var az = av[0].alpha * aq.globalAlpha;
                var ay = av[ap - 1].alpha * aq.globalAlpha;
                var aE = [];
                for (var aH = 0; aH < ap; aH++) {
                    var ao = av[aH];
                    aE.push(ao.offset * am + ax + " " + ao.color)
                }
                ai.push('<g_vml_:fill type="', aj.type_, '"', ' method="none" focus="100%"', ' color="', au, '"', ' color2="', at, '"', ' colors="', aE.join(","), '"', ' opacity="', ay, '"', ' g_o_:opacity2="', az, '"', ' angle="', an, '"', ' focusposition="', aF.x, ",", aF.y, '" />')
            } else {
                if (aj instanceof T) {
                    if (j && p) {
                        var ah = -aK.x;
                        var aC = -aK.y;
                        ai.push("<g_vml_:fill", ' position="', ah / j * aB * aB, ",", aC / p * aA * aA, '"', ' type="tile"', ' src="', aj.src_, '" />')
                    }
                } else {
                    var aL = F(aq.fillStyle);
                    var aw = aL.color;
                    var aG = aL.alpha * aq.globalAlpha;
                    ai.push('<g_vml_:fill color="', aw, '" opacity="', aG, '" />')
                }
            }
        }

        q.fill = function () {
            this.$stroke(true)
        };
        q.closePath = function () {
            this.currentPath_.push({type: "close"})
        };
        function V(j, Z, p) {
            var i = j.m_;
            return {x: d * (Z * i[0][0] + p * i[1][0] + i[2][0]) - f, y: d * (Z * i[0][1] + p * i[1][1] + i[2][1]) - f}
        }

        q.save = function () {
            var i = {};
            v(this, i);
            this.aStack_.push(i);
            this.mStack_.push(this.m_);
            this.m_ = J(B(), this.m_)
        };
        q.restore = function () {
            if (this.aStack_.length) {
                v(this.aStack_.pop(), this);
                this.m_ = this.mStack_.pop()
            }
        };
        function h(i) {
            return isFinite(i[0][0]) && isFinite(i[0][1]) && isFinite(i[1][0]) && isFinite(i[1][1]) && isFinite(i[2][0]) && isFinite(i[2][1])
        }

        function aa(j, i, p) {
            if (!h(i)) {
                return
            }
            j.m_ = i;
            if (p) {
                var Z = i[0][0] * i[1][1] - i[0][1] * i[1][0];
                j.lineScale_ = N(H(Z))
            }
        }

        q.translate = function (m, j) {
            var i = [[1, 0, 0], [0, 1, 0], [m, j, 1]];
            aa(this, J(i, this.m_), false)
        };
        q.rotate = function (j) {
            var p = A(j);
            var m = l(j);
            var i = [[p, m, 0], [-m, p, 0], [0, 0, 1]];
            aa(this, J(i, this.m_), false)
        };
        q.scale = function (m, j) {
            this.arcScaleX_ *= m;
            this.arcScaleY_ *= j;
            var i = [[m, 0, 0], [0, j, 0], [0, 0, 1]];
            aa(this, J(i, this.m_), true)
        };
        q.transform = function (Z, p, ah, ag, j, i) {
            var m = [[Z, p, 0], [ah, ag, 0], [j, i, 1]];
            aa(this, J(m, this.m_), true)
        };
        q.setTransform = function (ag, Z, ai, ah, p, j) {
            var i = [[ag, Z, 0], [ai, ah, 0], [p, j, 1]];
            aa(this, i, true)
        };
        q.drawText_ = function (am, ak, aj, ap, ai) {
            var ao = this.m_, at = 1000, j = 0, ar = at, ah = {x: 0, y: 0}, ag = [];
            var i = u(E(this.font), this.element_);
            var p = ac(i);
            var au = this.element_.currentStyle;
            var Z = this.textAlign.toLowerCase();
            switch (Z) {
                case"left":
                case"center":
                case"right":
                    break;
                case"end":
                    Z = au.direction == "ltr" ? "right" : "left";
                    break;
                case"start":
                    Z = au.direction == "rtl" ? "right" : "left";
                    break;
                default:
                    Z = "left"
            }
            switch (this.textBaseline) {
                case"hanging":
                case"top":
                    ah.y = i.size / 1.75;
                    break;
                case"middle":
                    break;
                default:
                case null:
                case"alphabetic":
                case"ideographic":
                case"bottom":
                    ah.y = -i.size / 3;
                    break
            }
            switch (Z) {
                case"right":
                    j = at;
                    ar = 0.05;
                    break;
                case"center":
                    j = ar = at / 2;
                    break
            }
            var aq = V(this, ak + ah.x, aj + ah.y);
            ag.push('<g_vml_:line from="', -j, ' 0" to="', ar, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !ai, '" stroked="', !!ai, '" style="position:absolute;width:1px;height:1px;left:0px;top:0px;">');
            if (ai) {
                w(this, ag)
            } else {
                G(this, ag, {x: -j, y: 0}, {x: ar, y: i.size})
            }
            var an = ao[0][0].toFixed(3) + "," + ao[1][0].toFixed(3) + "," + ao[0][1].toFixed(3) + "," + ao[1][1].toFixed(3) + ",0,0";
            var al = n(aq.x / d) + "," + n(aq.y / d);
            ag.push('<g_vml_:skew on="t" matrix="', an, '" ', ' offset="', al, '" origin="', j, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', af(am), '" style="v-text-align:', Z, ";font:", af(p), '" /></g_vml_:line>');
            this.element_.insertAdjacentHTML("beforeEnd", ag.join(""))
        };
        q.fillText = function (m, i, p, j) {
            this.drawText_(m, i, p, j, false)
        };
        q.strokeText = function (m, i, p, j) {
            this.drawText_(m, i, p, j, true)
        };
        q.measureText = function (m) {
            if (!this.textMeasureEl_) {
                var i = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                this.element_.insertAdjacentHTML("beforeEnd", i);
                this.textMeasureEl_ = this.element_.lastChild
            }
            var j = this.element_.ownerDocument;
            this.textMeasureEl_.innerHTML = "";
            this.textMeasureEl_.style.font = this.font;
            this.textMeasureEl_.appendChild(j.createTextNode(m));
            return {width: this.textMeasureEl_.offsetWidth}
        };
        q.clip = function () {
        };
        q.arcTo = function () {
        };
        q.createPattern = function (j, i) {
            return new T(j, i)
        };
        function U(i) {
            this.type_ = i;
            this.x0_ = 0;
            this.y0_ = 0;
            this.r0_ = 0;
            this.x1_ = 0;
            this.y1_ = 0;
            this.r1_ = 0;
            this.colors_ = []
        }

        U.prototype.addColorStop = function (j, i) {
            i = F(i);
            this.colors_.push({offset: j, color: i.color, alpha: i.alpha})
        };
        function T(j, i) {
            Q(j);
            switch (i) {
                case"repeat":
                case null:
                case"":
                    this.repetition_ = "repeat";
                    break;
                case"repeat-x":
                case"repeat-y":
                case"no-repeat":
                    this.repetition_ = i;
                    break;
                default:
                    O("SYNTAX_ERR")
            }
            this.src_ = j.src;
            this.width_ = j.width;
            this.height_ = j.height
        }

        function O(i) {
            throw new P(i)
        }

        function Q(i) {
            if (!i || i.nodeType != 1 || i.tagName != "IMG") {
                O("TYPE_MISMATCH_ERR")
            }
            if (i.readyState != "complete") {
                O("INVALID_STATE_ERR")
            }
        }

        function P(i) {
            this.code = this[i];
            this.message = i + ": DOM Exception " + this.code
        }

        var X = P.prototype = new Error();
        X.INDEX_SIZE_ERR = 1;
        X.DOMSTRING_SIZE_ERR = 2;
        X.HIERARCHY_REQUEST_ERR = 3;
        X.WRONG_DOCUMENT_ERR = 4;
        X.INVALID_CHARACTER_ERR = 5;
        X.NO_DATA_ALLOWED_ERR = 6;
        X.NO_MODIFICATION_ALLOWED_ERR = 7;
        X.NOT_FOUND_ERR = 8;
        X.NOT_SUPPORTED_ERR = 9;
        X.INUSE_ATTRIBUTE_ERR = 10;
        X.INVALID_STATE_ERR = 11;
        X.SYNTAX_ERR = 12;
        X.INVALID_MODIFICATION_ERR = 13;
        X.NAMESPACE_ERR = 14;
        X.INVALID_ACCESS_ERR = 15;
        X.VALIDATION_ERR = 16;
        X.TYPE_MISMATCH_ERR = 17;
        G_vmlCanvasManager = e;
        CanvasRenderingContext2D = D;
        CanvasGradient = U;
        CanvasPattern = T;
        DOMException = P
    })()
}
Ext.define("Ext.draw.engine.Canvas", {
    extend: "Ext.draw.Surface",
    requires: ["Ext.draw.engine.excanvas", "Ext.draw.Animator", "Ext.draw.Color"],
    config: {highPrecision: false},
    statics: {
        contextOverrides: {
            setGradientBBox: function (a) {
                this.bbox = a
            }, fill: function () {
                var c = this.fillStyle, a = this.fillGradient, b = this.fillOpacity, d = this.globalAlpha, e = this.bbox;
                if (c !== Ext.draw.Color.RGBA_NONE && b !== 0) {
                    if (a && e) {
                        this.fillStyle = a.generateGradient(this, e)
                    }
                    if (b !== 1) {
                        this.globalAlpha = d * b
                    }
                    this.$fill();
                    if (b !== 1) {
                        this.globalAlpha = d
                    }
                    if (a && e) {
                        this.fillStyle = c
                    }
                }
            }, stroke: function () {
                var e = this.strokeStyle, c = this.strokeGradient, a = this.strokeOpacity, b = this.globalAlpha, d = this.bbox;
                if (e !== Ext.draw.Color.RGBA_NONE && a !== 0) {
                    if (c && d) {
                        this.strokeStyle = c.generateGradient(this, d)
                    }
                    if (a !== 1) {
                        this.globalAlpha = b * a
                    }
                    this.$stroke();
                    if (a !== 1) {
                        this.globalAlpha = b
                    }
                    if (c && d) {
                        this.strokeStyle = e
                    }
                }
            }, fillStroke: function (d, e) {
                var j = this, i = this.fillStyle, h = this.fillOpacity, f = this.strokeStyle, c = this.strokeOpacity, b = j.shadowColor, a = j.shadowBlur, g = Ext.draw.Color.RGBA_NONE;
                if (e === undefined) {
                    e = d.transformFillStroke
                }
                if (!e) {
                    d.inverseMatrix.toContext(j)
                }
                if (i !== g && h !== 0) {
                    j.fill();
                    j.shadowColor = g;
                    j.shadowBlur = 0
                }
                if (f !== g && c !== 0) {
                    j.stroke()
                }
                j.shadowColor = b;
                j.shadowBlur = a
            }, setLineDash: function (a) {
                if (this.$setLineDash) {
                    this.$setLineDash(a)
                }
            }, ellipse: function (g, e, c, a, j, b, f, d) {
                var i = Math.cos(j), h = Math.sin(j);
                this.transform(i * c, h * c, -h * a, i * a, g, e);
                this.arc(0, 0, 1, b, f, d);
                this.transform(i / c, -h / a, h / c, i / a, -(i * g + h * e) / c, (h * g - i * e) / a)
            }, appendPath: function (f) {
                var e = this, c = 0, b = 0, a = f.commands, g = f.params, d = a.length;
                e.beginPath();
                for (; c < d; c++) {
                    switch (a[c]) {
                        case"M":
                            e.moveTo(g[b], g[b + 1]);
                            b += 2;
                            break;
                        case"L":
                            e.lineTo(g[b], g[b + 1]);
                            b += 2;
                            break;
                        case"C":
                            e.bezierCurveTo(g[b], g[b + 1], g[b + 2], g[b + 3], g[b + 4], g[b + 5]);
                            b += 6;
                            break;
                        case"Z":
                            e.closePath();
                            break
                    }
                }
            }, save: function () {
                var c = this.toSave, d = c.length, e = d && {}, b = 0, a;
                for (; b < d; b++) {
                    a = c[b];
                    if (a in this) {
                        e[a] = this[a]
                    }
                }
                this.state.push(e);
                this.$save()
            }, restore: function () {
                var b = this.state.pop(), a;
                if (b) {
                    for (a in b) {
                        this[a] = b[a]
                    }
                }
                this.$restore()
            }
        }
    },
    splitThreshold: 3000,
    toSave: ["fillGradient", "strokeGradient"],
    element: {
        reference: "element",
        style: {position: "absolute"},
        children: [{reference: "innerElement", style: {width: "100%", height: "100%", position: "relative"}}]
    },
    createCanvas: function () {
        var c = Ext.Element.create({tag: "canvas", cls: Ext.baseCSSPrefix + "surface-canvas"});
        window.G_vmlCanvasManager && G_vmlCanvasManager.initElement(c.dom);
        var e = Ext.draw.engine.Canvas.contextOverrides, a = c.dom.getContext("2d"), d = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1, b;
        this.devicePixelRatio /= (Ext.os.is.WindowsPhone) ? window.innerWidth / window.screen.width : d;
        if (a.ellipse) {
            delete e.ellipse
        }
        a.state = [];
        a.toSave = this.toSave;
        for (b in e) {
            a["$" + b] = a[b]
        }
        Ext.apply(a, e);
        if (this.getHighPrecision()) {
            this.enablePrecisionCompensation(a)
        } else {
            this.disablePrecisionCompensation(a)
        }
        this.innerElement.appendChild(c);
        this.canvases.push(c);
        this.contexts.push(a)
    },
    afterCachedConfig: function () {
        this.callParent();
        this.createCanvas()
    },
    updateHighPrecision: function (d) {
        var e = this.contexts, c = e.length, b, a;
        for (b = 0; b < c; b++) {
            a = e[b];
            if (d) {
                this.enablePrecisionCompensation(a)
            } else {
                this.disablePrecisionCompensation(a)
            }
        }
    },
    precisionNames: ["rect", "fillRect", "strokeRect", "clearRect", "moveTo", "lineTo", "arc", "arcTo", "save", "restore", "updatePrecisionCompensate", "setTransform", "transform", "scale", "translate", "rotate", "quadraticCurveTo", "bezierCurveTo", "createLinearGradient", "createRadialGradient", "fillText", "strokeText", "drawImage"],
    disablePrecisionCompensation: function (b) {
        var a = Ext.draw.engine.Canvas.contextOverrides, f = this.precisionNames, e = f.length, d, c;
        for (d = 0; d < e; d++) {
            c = f[d];
            if (!(c in a)) {
                delete b[c]
            }
        }
        this.setDirty(true)
    },
    enablePrecisionCompensation: function (j) {
        var c = this, a = 1, g = 1, l = 0, k = 0, i = new Ext.draw.Matrix(), b = [], e = {}, d = Ext.draw.engine.Canvas.contextOverrides, h = j.constructor.prototype;
        var f = {
            toSave: c.toSave, rect: function (m, p, n, o) {
                return h.rect.call(this, m * a + l, p * g + k, n * a, o * g)
            }, fillRect: function (m, p, n, o) {
                this.updatePrecisionCompensateRect();
                h.fillRect.call(this, m * a + l, p * g + k, n * a, o * g);
                this.updatePrecisionCompensate()
            }, strokeRect: function (m, p, n, o) {
                this.updatePrecisionCompensateRect();
                h.strokeRect.call(this, m * a + l, p * g + k, n * a, o * g);
                this.updatePrecisionCompensate()
            }, clearRect: function (m, p, n, o) {
                return h.clearRect.call(this, m * a + l, p * g + k, n * a, o * g)
            }, moveTo: function (m, n) {
                return h.moveTo.call(this, m * a + l, n * g + k)
            }, lineTo: function (m, n) {
                return h.lineTo.call(this, m * a + l, n * g + k)
            }, arc: function (n, r, m, p, o, q) {
                this.updatePrecisionCompensateRect();
                h.arc.call(this, n * a + l, r * a + k, m * a, p, o, q);
                this.updatePrecisionCompensate()
            }, arcTo: function (o, q, n, p, m) {
                this.updatePrecisionCompensateRect();
                h.arcTo.call(this, o * a + l, q * g + k, n * a + l, p * g + k, m * a);
                this.updatePrecisionCompensate()
            }, save: function () {
                b.push(i);
                i = i.clone();
                d.save.call(this);
                h.save.call(this)
            }, restore: function () {
                i = b.pop();
                d.restore.call(this);
                h.restore.call(this);
                this.updatePrecisionCompensate()
            }, updatePrecisionCompensate: function () {
                i.precisionCompensate(c.devicePixelRatio, e);
                a = e.xx;
                g = e.yy;
                l = e.dx;
                k = e.dy;
                h.setTransform.call(this, c.devicePixelRatio, e.b, e.c, e.d, 0, 0)
            }, updatePrecisionCompensateRect: function () {
                i.precisionCompensateRect(c.devicePixelRatio, e);
                a = e.xx;
                g = e.yy;
                l = e.dx;
                k = e.dy;
                h.setTransform.call(this, c.devicePixelRatio, e.b, e.c, e.d, 0, 0)
            }, setTransform: function (q, o, n, m, r, p) {
                i.set(q, o, n, m, r, p);
                this.updatePrecisionCompensate()
            }, transform: function (q, o, n, m, r, p) {
                i.append(q, o, n, m, r, p);
                this.updatePrecisionCompensate()
            }, scale: function (n, m) {
                this.transform(n, 0, 0, m, 0, 0)
            }, translate: function (n, m) {
                this.transform(1, 0, 0, 1, n, m)
            }, rotate: function (o) {
                var n = Math.cos(o), m = Math.sin(o);
                this.transform(n, m, -m, n, 0, 0)
            }, quadraticCurveTo: function (n, p, m, o) {
                h.quadraticCurveTo.call(this, n * a + l, p * g + k, m * a + l, o * g + k)
            }, bezierCurveTo: function (r, p, o, n, m, q) {
                h.bezierCurveTo.call(this, r * a + l, p * g + k, o * a + l, n * g + k, m * a + l, q * g + k)
            }, createLinearGradient: function (n, p, m, o) {
                this.updatePrecisionCompensateRect();
                var q = h.createLinearGradient.call(this, n * a + l, p * g + k, m * a + l, o * g + k);
                this.updatePrecisionCompensate();
                return q
            }, createRadialGradient: function (p, r, o, n, q, m) {
                this.updatePrecisionCompensateRect();
                var s = h.createLinearGradient.call(this, p * a + l, r * a + k, o * a, n * a + l, q * a + k, m * a);
                this.updatePrecisionCompensate();
                return s
            }, fillText: function (o, m, p, n) {
                h.setTransform.apply(this, i.elements);
                if (typeof n === "undefined") {
                    h.fillText.call(this, o, m, p)
                } else {
                    h.fillText.call(this, o, m, p, n)
                }
                this.updatePrecisionCompensate()
            }, strokeText: function (o, m, p, n) {
                h.setTransform.apply(this, i.elements);
                if (typeof n === "undefined") {
                    h.strokeText.call(this, o, m, p)
                } else {
                    h.strokeText.call(this, o, m, p, n)
                }
                this.updatePrecisionCompensate()
            }, fill: function () {
                var m = this.fillGradient, n = this.bbox;
                this.updatePrecisionCompensateRect();
                if (m && n) {
                    this.fillStyle = m.generateGradient(this, n)
                }
                h.fill.call(this);
                this.updatePrecisionCompensate()
            }, stroke: function () {
                var m = this.strokeGradient, n = this.bbox;
                this.updatePrecisionCompensateRect();
                if (m && n) {
                    this.strokeStyle = m.generateGradient(this, n)
                }
                h.stroke.call(this);
                this.updatePrecisionCompensate()
            }, drawImage: function (u, s, r, q, p, o, n, m, t) {
                switch (arguments.length) {
                    case 3:
                        return h.drawImage.call(this, u, s * a + l, r * g + k);
                    case 5:
                        return h.drawImage.call(this, u, s * a + l, r * g + k, q * a, p * g);
                    case 9:
                        return h.drawImage.call(this, u, s, r, q, p, o * a + l, n * g * k, m * a, t * g)
                }
            }
        };
        Ext.apply(j, f);
        this.setDirty(true)
    },
    updateRect: function (n) {
        this.callParent([n]);
        var m = this, c = Math.floor(n[0]), v = Math.floor(n[1]), a = Math.ceil(n[0] + n[2]), o = Math.ceil(n[1] + n[3]), u = m.devicePixelRatio, s = a - c, j = o - v, p = Math.round(m.splitThreshold / u), q = Math.ceil(s / p), k = m.activeCanvases, f, g, e, d;
        for (f = 0, g = 0; f < q; f++, g += p) {
            if (f >= m.canvases.length) {
                m.createCanvas()
            }
            e = m.canvases[f].dom;
            e.style.left = g + "px";
            if (j * u !== e.height) {
                e.height = j * u;
                e.style.height = j + "px"
            }
            d = Math.min(p, s - g);
            if (d * u !== e.width) {
                e.width = d * u;
                e.style.width = d + "px"
            }
            m.applyDefaults(m.contexts[f])
        }
        for (; f < k; f++) {
            e = m.canvases[f].dom;
            e.width = 0;
            e.height = 0
        }
        m.activeCanvases = q;
        m.clear()
    },
    clearTransform: function () {
        var c = this, d = c.activeCanvases, b, a;
        for (b = 0; b < d; b++) {
            a = c.contexts[b];
            a.translate(-c.splitThreshold * b, 0);
            a.scale(c.devicePixelRatio, c.devicePixelRatio);
            c.matrix.toContext(a)
        }
    },
    renderSprite: function (n) {
        var g = this, j = g.getRect(), f = g.matrix, l = n.getParent(), k = Ext.draw.Matrix.fly([1, 0, 0, 1, 0, 0]), o, d, e, p, b, c = 0, h, m = j[2], a;
        while (l && (l !== g)) {
            k.prependMatrix(l.matrix || l.attr && l.attr.matrix);
            l = l.getParent()
        }
        k.prependMatrix(f);
        o = n.getBBox();
        if (o) {
            o = k.transformBBox(o)
        }
        n.preRender(g);
        if (n.attr.hidden || n.attr.globalAlpha === 0) {
            n.setDirty(false);
            return
        }
        h = 0;
        a = h + j[3];
        for (d = 0, e = 0; d < g.activeCanvases; d++, e += g.splitThreshold / g.devicePixelRatio) {
            p = g.contexts[d];
            b = Math.min(j[2] - e, g.splitThreshold / g.devicePixelRatio);
            c = e;
            m = c + b;
            if (o) {
                if (o.x > m || o.x + o.width < c || o.y > a || o.y + o.height < h) {
                    continue
                }
            }
            p.save();
            n.useAttributes(p, j);
            if (false === n.render(g, p, [c, h, b, a - h], j)) {
                return false
            }
            p.restore()
        }
        n.setDirty(false)
    },
    flatten: function (j, a) {
        var c = document.createElement("canvas"), e = Ext.getClassName(this), f = this.devicePixelRatio, h = c.getContext("2d"), b, g, d;
        c.width = Math.ceil(j.width * f);
        c.height = Math.ceil(j.height * f);
        for (d = 0; d < a.length; d++) {
            b = a[d];
            if (Ext.getClassName(b) !== e) {
                continue
            }
            g = b.getRect();
            h.drawImage(b.canvases[0].dom, g[0] * f, g[1] * f)
        }
        return {data: c.toDataURL(), type: "png"}
    },
    applyDefaults: function (a) {
        var b = Ext.draw.Color.RGBA_NONE;
        a.strokeStyle = b;
        a.fillStyle = b;
        a.textAlign = "start";
        a.textBaseline = "alphabetic";
        a.miterLimit = 1
    },
    clear: function () {
        var d = this, e = this.activeCanvases, c, b, a;
        for (c = 0; c < e; c++) {
            b = d.canvases[c].dom;
            a = d.contexts[c];
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.clearRect(0, 0, b.width, b.height)
        }
        d.setDirty(true)
    },
    destroy: function () {
        var c = this, a, b = c.canvases.length;
        for (a = 0; a < b; a++) {
            c.contexts[a] = null;
            c.canvases[a].destroy();
            c.canvases[a] = null
        }
        delete c.contexts;
        delete c.canvases;
        c.callParent(arguments)
    },
    privates: {
        initElement: function () {
            this.callParent();
            this.canvases = [];
            this.contexts = [];
            this.activeCanvases = 0
        }
    }
}, function () {
    if (Ext.os.is.Android4 && Ext.browser.is.Chrome) {
        this.prototype.splitThreshold = 3000
    } else {
        if (Ext.os.is.Android) {
            this.prototype.splitThreshold = 10000000000
        }
    }
});
Ext.define("Ext.draw.Container", {
    extend: "Ext.draw.ContainerBase",
    alternateClassName: "Ext.draw.Component",
    xtype: "draw",
    defaultType: "surface",
    requires: ["Ext.draw.Surface", "Ext.draw.engine.Svg", "Ext.draw.engine.Canvas", "Ext.draw.gradient.GradientDefinition"],
    engine: "Ext.draw.engine.Canvas",
    config: {
        cls: Ext.baseCSSPrefix + "draw-container",
        resizeHandler: null,
        background: null,
        sprites: null,
        gradients: []
    },
    defaultDownloadServerUrl: "http://svg.sencha.io",
    supportedFormats: ["png", "pdf", "jpeg", "gif"],
    supportedOptions: {
        version: Ext.isNumber,
        data: Ext.isString,
        format: function (a) {
            return Ext.Array.indexOf(this.supportedFormats, a) >= 0
        },
        filename: Ext.isString,
        width: Ext.isNumber,
        height: Ext.isNumber,
        scale: Ext.isNumber,
        pdf: Ext.isObject,
        jpeg: Ext.isObject
    },
    initAnimator: function () {
        this.frameCallbackId = Ext.draw.Animator.addFrameCallback("renderFrame", this)
    },
    applyGradients: function (b) {
        var a = [], c, f, d, e;
        if (!Ext.isArray(b)) {
            return a
        }
        for (c = 0, f = b.length; c < f; c++) {
            d = b[c];
            if (!Ext.isObject(d)) {
                continue
            }
            if (typeof d.type !== "string") {
                d.type = "linear"
            }
            if (d.angle) {
                d.degrees = d.angle;
                delete d.angle
            }
            if (Ext.isObject(d.stops)) {
                d.stops = (function (i) {
                    var g = [], h;
                    for (e in i) {
                        h = i[e];
                        h.offset = e / 100;
                        g.push(h)
                    }
                    return g
                })(d.stops)
            }
            a.push(d)
        }
        Ext.draw.gradient.GradientDefinition.add(a);
        return a
    },
    applySprites: function (d) {
        if (!d) {
            return
        }
        d = Ext.Array.from(d);
        var c = d.length, b, a;
        for (b = 0; b < c; b++) {
            if (d[b].surface instanceof Ext.draw.Surface) {
                a = d[b].surface
            } else {
                if (Ext.isString(d[b].surface)) {
                    a = this.getSurface(d[b].surface)
                } else {
                    a = this.getSurface("main")
                }
            }
            a.add(d[b])
        }
    },
    onPlaceWatermark: Ext.emptyFn,
    onBodyResize: function () {
        if (!this.element) {
            return
        }
        var d = this, c = d.element.getSize(), b = d.getResizeHandler(), a;
        d.fireEvent("resize", d, c);
        a = b.call(d, c);
        if (a !== false) {
            d.renderFrame();
            d.onPlaceWatermark(c.width, c.height)
        }
    },
    resizeHandler: function (a) {
        this.getItems().each(function (b) {
            b.setRect([0, 0, a.width, a.height])
        })
    },
    getSurface: function (d) {
        d = this.getId() + "-" + (d || "main");
        var c = this, b = c.getItems(), a = b.get(d);
        if (!a) {
            a = c.add({xclass: c.engine, id: d});
            c.onBodyResize()
        }
        return a
    },
    renderFrame: function () {
        var e = this, a = e.getItems(), b, d, c;
        for (b = 0, d = a.length; b < d; b++) {
            c = a.items[b];
            if (c.isSurface) {
                c.renderFrame()
            }
        }
    },
    getImage: function (k) {
        var l = this.innerElement.getSize(), a = Array.prototype.slice.call(this.items.items), d, g, c = this.surfaceZIndexes, f, e, b, h;
        for (e = 1; e < a.length; e++) {
            b = a[e];
            h = c[b.type];
            f = e - 1;
            while (f >= 0 && c[a[f].type] > h) {
                a[f + 1] = a[f];
                f--
            }
            a[f + 1] = b
        }
        d = a[0].flatten(l, a);
        if (k === "image") {
            g = new Image();
            g.src = d.data;
            d.data = g;
            return d
        }
        if (k === "stream") {
            d.data = d.data.replace(/^data:image\/[^;]+/, "data:application/octet-stream");
            return d
        }
        return d
    },
    download: function (d) {
        var e = this, a = [], b, c, f;
        d = Ext.apply({version: 2, data: e.getImage().data}, d);
        for (c in d) {
            if (d.hasOwnProperty(c)) {
                f = d[c];
                if (c in e.supportedOptions) {
                    if (e.supportedOptions[c].call(e, f)) {
                        a.push({tag: "input", type: "hidden", name: c, value: Ext.isObject(f) ? Ext.JSON.encode(f) : f})
                    }
                }
            }
        }
        b = Ext.dom.Helper.markup({
            tag: "html",
            children: [{tag: "head"}, {
                tag: "body",
                children: [{
                    tag: "form",
                    method: "POST",
                    action: d.url || e.defaultDownloadServerUrl,
                    children: a
                }, {
                    tag: "script",
                    type: "text/javascript",
                    children: 'document.getElementsByTagName("form")[0].submit();'
                }]
            }]
        });
        window.open("", "ImageDownload_" + Date.now()).document.write(b)
    },
    destroy: function () {
        var a = this.frameCallbackId;
        if (a) {
            Ext.draw.Animator.removeFrameCallback(a)
        }
        this.callParent()
    }
}, function () {
    if (location.search.match("svg")) {
        Ext.draw.Container.prototype.engine = "Ext.draw.engine.Svg"
    } else {
        if ((Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) || (Ext.browser.is.AndroidStock4 && (Ext.os.version.getMinor() === 1 || Ext.os.version.getMinor() === 2 || Ext.os.version.getMinor() === 3))) {
            Ext.draw.Container.prototype.engine = "Ext.draw.engine.Svg"
        }
    }
});
Ext.define("Ext.chart.theme.Base", {
    mixins: {factoryable: "Ext.mixin.Factoryable"},
    requires: ["Ext.draw.Color"],
    factoryConfig: {type: "chart.theme"},
    isTheme: true,
    config: {
        baseColor: null,
        colors: undefined,
        gradients: null,
        chart: {defaults: {background: "white"}},
        axis: {
            defaults: {
                label: {
                    x: 0,
                    y: 0,
                    textBaseline: "middle",
                    textAlign: "center",
                    fontSize: "default",
                    fontFamily: "default",
                    fontWeight: "default",
                    fillStyle: "black"
                },
                title: {fillStyle: "black", fontSize: "default*1.23", fontFamily: "default", fontWeight: "default"},
                style: {strokeStyle: "black"},
                grid: {strokeStyle: "rgb(221, 221, 221)"}
            }, top: {style: {textPadding: 5}}, bottom: {style: {textPadding: 5}}
        },
        series: {
            defaults: {
                label: {
                    fontFamily: "default",
                    fontWeight: "default",
                    fontSize: "default*1.077",
                    textBaseline: "middle",
                    textAlign: "center"
                }, labelOverflowPadding: 5
            }
        },
        sprites: {text: {fontSize: "default", fontWeight: "default", fontFamily: "default", fillStyle: "black"}},
        seriesThemes: undefined,
        markerThemes: {type: ["circle", "cross", "plus", "square", "triangle", "diamond"]},
        useGradients: false,
        background: null
    },
    colorDefaults: ["#94ae0a", "#115fa6", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],
    constructor: function (a) {
        this.initConfig(a);
        this.resolveDefaults()
    },
    defaultRegEx: /^default([+\-/\*]\d+(?:\.\d+)?)?$/,
    defaultOperators: {
        "*": function (b, a) {
            return b * a
        }, "+": function (b, a) {
            return b + a
        }, "-": function (b, a) {
            return b - a
        }
    },
    resolveDefaults: function () {
        var a = this;
        Ext.onReady(function () {
            var f = Ext.clone(a.getSprites()), e = Ext.clone(a.getAxis()), d = Ext.clone(a.getSeries()), g, c, b;
            if (!a.superclass.defaults) {
                g = Ext.getBody().createChild({tag: "div", cls: "x-component"});
                a.superclass.defaults = {
                    fontFamily: g.getStyle("fontFamily"),
                    fontWeight: g.getStyle("fontWeight"),
                    fontSize: parseFloat(g.getStyle("fontSize")),
                    fontVariant: g.getStyle("fontVariant"),
                    fontStyle: g.getStyle("fontStyle")
                };
                g.destroy()
            }
            a.replaceDefaults(f.text);
            a.setSprites(f);
            for (c in e) {
                b = e[c];
                a.replaceDefaults(b.label);
                a.replaceDefaults(b.title)
            }
            a.setAxis(e);
            for (c in d) {
                b = d[c];
                a.replaceDefaults(b.label)
            }
            a.setSeries(d)
        })
    },
    replaceDefaults: function (h) {
        var e = this, g = e.superclass.defaults, a = e.defaultRegEx, d, f, c, b;
        if (Ext.isObject(h)) {
            for (d in g) {
                c = a.exec(h[d]);
                if (c) {
                    f = g[d];
                    c = c[1];
                    if (c) {
                        b = e.defaultOperators[c.charAt(0)];
                        f = Math.round(b(f, parseFloat(c.substr(1))))
                    }
                    h[d] = f
                }
            }
        }
    },
    applyBaseColor: function (c) {
        var a, b;
        if (c) {
            a = c.isColor ? c : Ext.draw.Color.fromString(c);
            b = a.getHSL()[2];
            if (b < 0.15) {
                a = a.createLighter(0.3)
            } else {
                if (b < 0.3) {
                    a = a.createLighter(0.15)
                } else {
                    if (b > 0.85) {
                        a = a.createDarker(0.3)
                    } else {
                        if (b > 0.7) {
                            a = a.createDarker(0.15)
                        }
                    }
                }
            }
            this.setColors([a.createDarker(0.3).toString(), a.createDarker(0.15).toString(), a.toString(), a.createLighter(0.12).toString(), a.createLighter(0.24).toString(), a.createLighter(0.31).toString()])
        }
        return c
    },
    applyColors: function (a) {
        return a || this.colorDefaults
    },
    updateUseGradients: function (a) {
        if (a) {
            this.updateGradients({type: "linear", degrees: 90})
        }
    },
    updateBackground: function (a) {
        if (a) {
            var b = this.getChart();
            b.defaults.background = a;
            this.setChart(b)
        }
    },
    updateGradients: function (a) {
        var c = this.getColors(), e = [], h, b, d, f, g;
        if (Ext.isObject(a)) {
            for (f = 0, g = c && c.length || 0; f < g; f++) {
                b = Ext.draw.Color.fromString(c[f]);
                if (b) {
                    d = b.createLighter(0.15).toString();
                    h = Ext.apply(Ext.Object.chain(a), {
                        stops: [{offset: 1, color: b.toString()}, {
                            offset: 0,
                            color: d.toString()
                        }]
                    });
                    e.push(h)
                }
            }
            this.setColors(e)
        }
    },
    applySeriesThemes: function (a) {
        this.getBaseColor();
        this.getUseGradients();
        this.getGradients();
        var b = this.getColors();
        if (!a) {
            a = {
                fillStyle: Ext.Array.clone(b), strokeStyle: Ext.Array.map(b, function (d) {
                    var c = Ext.draw.Color.fromString(d.stops ? d.stops[0].color : d);
                    return c.createDarker(0.15).toString()
                })
            }
        }
        return a
    }
});
Ext.define("Ext.chart.theme.Default", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.default", "chart.theme.Base"]
});
Ext.define("Ext.chart.Markers", {
    extend: "Ext.draw.sprite.Instancing",
    defaultCategory: "default",
    constructor: function () {
        this.callParent(arguments);
        this.categories = {};
        this.revisions = {}
    },
    clear: function (a) {
        a = a || this.defaultCategory;
        if (!(a in this.revisions)) {
            this.revisions[a] = 1
        } else {
            this.revisions[a]++
        }
    },
    putMarkerFor: function (e, b, c, h, f) {
        e = e || this.defaultCategory;
        var d = this, g = d.categories[e] || (d.categories[e] = {}), a;
        if (c in g) {
            d.setAttributesFor(g[c], b, h)
        } else {
            g[c] = d.getCount();
            d.createInstance(b, h)
        }
        a = d.get(g[c]);
        if (a) {
            a.category = e;
            if (!f) {
                a.revision = d.revisions[e] || (d.revisions[e] = 1)
            }
        }
    },
    getMarkerBBoxFor: function (c, a, b) {
        if (c in this.categories) {
            var d = this.categories[c];
            if (a in d) {
                return this.getBBoxFor(d[a], b)
            }
        }
    },
    getBBox: function () {
        return null
    },
    render: function (a, l, b) {
        var f = this, k = f.revisions, j = f.attr.matrix, h = f.getTemplate(), d = h.attr, g, c, e;
        j.toContext(l);
        h.preRender(a, l, b);
        h.useAttributes(l, b);
        for (c = 0, e = f.instances.length; c < e; c++) {
            g = f.get(c);
            if (g.hidden || g.revision !== k[g.category]) {
                continue
            }
            l.save();
            h.attr = g;
            h.useAttributes(l, b);
            h.render(a, l, b);
            l.restore()
        }
        h.attr = d
    }
});
Ext.define("Ext.chart.label.Callout", {
    extend: "Ext.draw.modifier.Modifier", prepareAttributes: function (a) {
        if (!a.hasOwnProperty("calloutOriginal")) {
            a.calloutOriginal = Ext.Object.chain(a);
            a.calloutOriginal.prototype = a
        }
        if (this._previous) {
            this._previous.prepareAttributes(a.calloutOriginal)
        }
    }, setAttrs: function (e, h) {
        var d = e.callout, i = e.calloutOriginal, l = e.bbox.plain, c = (l.width || 0) + e.labelOverflowPadding, m = (l.height || 0) + e.labelOverflowPadding, p, o;
        if ("callout" in h) {
            d = h.callout
        }
        if ("callout" in h || "calloutPlaceX" in h || "calloutPlaceY" in h || "x" in h || "y" in h) {
            var n = "rotationRads" in h ? i.rotationRads = h.rotationRads : i.rotationRads, g = "x" in h ? (i.x = h.x) : i.x, f = "y" in h ? (i.y = h.y) : i.y, b = "calloutPlaceX" in h ? h.calloutPlaceX : e.calloutPlaceX, a = "calloutPlaceY" in h ? h.calloutPlaceY : e.calloutPlaceY, k = "calloutVertical" in h ? h.calloutVertical : e.calloutVertical, j;
            n %= Math.PI * 2;
            if (Math.cos(n) < 0) {
                n = (n + Math.PI) % (Math.PI * 2)
            }
            if (n > Math.PI) {
                n -= Math.PI * 2
            }
            if (k) {
                n = n * (1 - d) - Math.PI / 2 * d;
                j = c;
                c = m;
                m = j
            } else {
                n = n * (1 - d)
            }
            h.rotationRads = n;
            h.x = g * (1 - d) + b * d;
            h.y = f * (1 - d) + a * d;
            p = b - g;
            o = a - f;
            if (Math.abs(o * c) > Math.abs(p * m)) {
                if (o > 0) {
                    h.calloutEndX = h.x - (m / 2) * (p / o) * d;
                    h.calloutEndY = h.y - (m / 2) * d
                } else {
                    h.calloutEndX = h.x + (m / 2) * (p / o) * d;
                    h.calloutEndY = h.y + (m / 2) * d
                }
            } else {
                if (p > 0) {
                    h.calloutEndX = h.x - c / 2;
                    h.calloutEndY = h.y - (c / 2) * (o / p) * d
                } else {
                    h.calloutEndX = h.x + c / 2;
                    h.calloutEndY = h.y + (c / 2) * (o / p) * d
                }
            }
            if (h.calloutStartX && h.calloutStartY) {
                h.calloutHasLine = (p > 0 && h.calloutStartX < h.calloutEndX) || (p <= 0 && h.calloutStartX > h.calloutEndX) || (o > 0 && h.calloutStartY < h.calloutEndY) || (o <= 0 && h.calloutStartY > h.calloutEndY)
            } else {
                h.calloutHasLine = true
            }
        }
        return h
    }, pushDown: function (a, b) {
        b = Ext.draw.modifier.Modifier.prototype.pushDown.call(this, a.calloutOriginal, b);
        return this.setAttrs(a, b)
    }, popUp: function (a, b) {
        a = a.prototype;
        b = this.setAttrs(a, b);
        if (this._next) {
            return this._next.popUp(a, b)
        } else {
            return Ext.apply(a, b)
        }
    }
});
Ext.define("Ext.chart.label.Label", {
    extend: "Ext.draw.sprite.Text",
    requires: ["Ext.chart.label.Callout"],
    inheritableStatics: {
        def: {
            processors: {
                callout: "limited01",
                calloutHasLine: "bool",
                calloutPlaceX: "number",
                calloutPlaceY: "number",
                calloutStartX: "number",
                calloutStartY: "number",
                calloutEndX: "number",
                calloutEndY: "number",
                calloutColor: "color",
                calloutWidth: "number",
                calloutVertical: "bool",
                labelOverflowPadding: "number",
                display: "enums(none,under,over,rotate,insideStart,insideEnd,inside,outside)",
                orientation: "enums(horizontal,vertical)",
                renderer: "default"
            },
            defaults: {
                callout: 0,
                calloutHasLine: true,
                calloutPlaceX: 0,
                calloutPlaceY: 0,
                calloutStartX: 0,
                calloutStartY: 0,
                calloutEndX: 0,
                calloutEndY: 0,
                calloutWidth: 1,
                calloutVertical: false,
                calloutColor: "black",
                labelOverflowPadding: 5,
                display: "none",
                orientation: "",
                renderer: null
            },
            triggers: {
                callout: "transform",
                calloutPlaceX: "transform",
                calloutPlaceY: "transform",
                labelOverflowPadding: "transform",
                calloutRotation: "transform",
                display: "hidden"
            },
            updaters: {
                hidden: function (a) {
                    a.hidden = a.display === "none"
                }
            }
        }
    },
    config: {fx: {customDurations: {callout: 200}}, field: null, calloutLine: true},
    applyCalloutLine: function (a) {
        if (a) {
            return Ext.apply({}, a)
        }
    },
    prepareModifiers: function () {
        this.callParent(arguments);
        this.calloutModifier = new Ext.chart.label.Callout({sprite: this});
        this.fx.setNext(this.calloutModifier);
        this.calloutModifier.setNext(this.topModifier)
    },
    render: function (b, c) {
        var e = this, a = e.attr, d = a.calloutColor;
        c.save();
        c.globalAlpha *= a.callout;
        if (c.globalAlpha > 0 && a.calloutHasLine) {
            if (d && d.isGradient) {
                d = d.getStops()[0].color
            }
            c.strokeStyle = d;
            c.fillStyle = d;
            c.lineWidth = a.calloutWidth;
            c.beginPath();
            c.moveTo(e.attr.calloutStartX, e.attr.calloutStartY);
            c.lineTo(e.attr.calloutEndX, e.attr.calloutEndY);
            c.stroke();
            c.beginPath();
            c.arc(e.attr.calloutStartX, e.attr.calloutStartY, 1 * a.calloutWidth, 0, 2 * Math.PI, true);
            c.fill();
            c.beginPath();
            c.arc(e.attr.calloutEndX, e.attr.calloutEndY, 1 * a.calloutWidth, 0, 2 * Math.PI, true);
            c.fill()
        }
        c.restore();
        Ext.draw.sprite.Text.prototype.render.apply(e, arguments)
    }
});
Ext.define("Ext.chart.series.Series", {
    requires: ["Ext.chart.Markers", "Ext.chart.label.Label", "Ext.tip.ToolTip"],
    mixins: {observable: "Ext.mixin.Observable"},
    type: null,
    seriesType: "sprite",
    identifiablePrefix: "ext-line-",
    observableType: "series",
    darkerStrokeRatio: 0.15,
    config: {
        chart: null,
        title: null,
        renderer: null,
        showInLegend: true,
        triggerAfterDraw: false,
        style: {},
        subStyle: {},
        themeStyle: {},
        colors: null,
        useDarkerStrokeColor: true,
        store: null,
        label: {},
        labelOverflowPadding: null,
        labelField: null,
        showMarkers: true,
        marker: null,
        markerSubStyle: null,
        itemInstancing: null,
        background: null,
        highlightItem: null,
        surface: null,
        overlaySurface: null,
        hidden: false,
        highlight: false,
        highlightCfg: {
            merge: function (a) {
                return a
            }, $value: {fillStyle: "yellow", strokeStyle: "red"}
        },
        animation: null,
        tooltip: null
    },
    directions: [],
    sprites: null,
    themeColorCount: function () {
        return 1
    },
    themeMarkerCount: function () {
        return 0
    },
    getFields: function (f) {
        var e = this, a = [], c, b, d;
        for (b = 0, d = f.length; b < d; b++) {
            c = e["get" + f[b] + "Field"]();
            if (Ext.isArray(c)) {
                a.push.apply(a, c)
            } else {
                a.push(c)
            }
        }
        return a
    },
    applyAnimation: function (a, b) {
        if (!a) {
            a = {duration: 0}
        } else {
            if (a === true) {
                a = {easing: "easeInOut", duration: 500}
            }
        }
        return b ? Ext.apply({}, a, b) : a
    },
    updateTitle: function (a) {
        var h = this, g = h.getChart();
        if (!g || g.isInitializing) {
            return
        }
        var a = Ext.Array.from(a), c = g.getSeries(), b = Ext.Array.indexOf(c, h), e = g.getLegendStore(), f = Math.min(a.length, h.getYField().length), d, k, j;
        if (b !== -1) {
            for (d = 0; d < f; d++) {
                j = a[d];
                if (j) {
                    k = e.getAt(b + d);
                    k.set("name", j)
                }
            }
        }
    },
    applyHighlight: function (a, b) {
        if (Ext.isObject(a)) {
            a = Ext.merge({}, this.config.highlightCfg, a)
        } else {
            if (a === true) {
                a = this.config.highlightCfg
            }
        }
        return Ext.apply(b || {}, a)
    },
    applyItemInstancing: function (a, b) {
        return Ext.merge(b || {}, a)
    },
    setAttributesForItem: function (a, b) {
        if (a && a.sprite) {
            if (a.sprite.itemsMarker && a.category === "items") {
                a.sprite.putMarker(a.category, b, a.index, false, true)
            }
            if (a.sprite.isMarkerHolder && a.category === "markers") {
                a.sprite.putMarker(a.category, b, a.index, false, true)
            } else {
                if (a.sprite instanceof Ext.draw.sprite.Instancing) {
                    a.sprite.setAttributesFor(a.index, b)
                } else {
                    a.sprite.setAttributes(b)
                }
            }
        }
    },
    getBBoxForItem: function (a) {
        if (a && a.sprite) {
            if (a.sprite.itemsMarker && a.category === "items") {
                return a.sprite.getMarkerBBox(a.category, a.index)
            } else {
                if (a.sprite instanceof Ext.draw.sprite.Instancing) {
                    return a.sprite.getBBoxFor(a.index)
                } else {
                    return a.sprite.getBBox()
                }
            }
        }
        return null
    },
    applyHighlightItem: function (b, a) {
        if (b === a) {
            return
        }
        if (Ext.isObject(b) && Ext.isObject(a)) {
            if (b.sprite === a.sprite && b.index === a.index) {
                return
            }
        }
        return b
    },
    updateHighlightItem: function (b, a) {
        this.setAttributesForItem(a, {highlighted: false});
        this.setAttributesForItem(b, {highlighted: true})
    },
    constructor: function (a) {
        var b = this;
        b.getId();
        b.sprites = [];
        b.dataRange = [];
        Ext.ComponentManager.register(b);
        if (a) {
            if (a.tips) {
                a = Ext.apply({tooltip: a.tips}, a)
            }
            if (a.highlightCfg) {
                a = Ext.apply({highlight: a.highlightCfg}, a)
            }
        }
        b.mixins.observable.constructor.call(b, a)
    },
    applyTooltip: function (f, e) {
        var d = this.getChart(), g = d.getInteractions(), c, b;
        var a = Ext.apply({}, f, {
            renderer: Ext.emptyFn,
            constrainPosition: true,
            shrinkWrapDock: true,
            autoHide: true,
            offsetX: 10,
            offsetY: 10
        });
        for (c = 0; c < g.length; c++) {
            if (g[c].type === "itemhightlight") {
                b = true;
                break
            }
        }
        if (!b) {
            g.push("itemhighlight");
            d.setInteractions(g)
        }
        return new Ext.tip.ToolTip(a)
    },
    showTip: function (l, m) {
        var d = this, n = d.getTooltip(), j, a, i, f, h, k, g, e, b, c;
        if (!n) {
            return
        }
        clearTimeout(d.tooltipTimeout);
        b = n.config;
        if (n.trackMouse) {
            m[0] += b.offsetX;
            m[1] += b.offsetY
        } else {
            j = l.sprite;
            a = j.getSurface();
            i = Ext.get(a.getId());
            if (i) {
                k = l.series.getBBoxForItem(l);
                g = k.x + k.width / 2;
                e = k.y + k.height / 2;
                h = a.matrix.transformPoint([g, e]);
                f = i.getXY();
                c = a.getInherited().rtl;
                g = c ? f[0] + i.getWidth() - h[0] : f[0] + h[0];
                e = f[1] + h[1];
                m = [g, e]
            }
        }
        n.config.renderer.call(n, l.record, l);
        n.show(m)
    },
    hideTip: function (b) {
        var a = this, c = a.getTooltip();
        if (!c) {
            return
        }
        clearTimeout(a.tooltipTimeout);
        a.tooltipTimeout = Ext.defer(function () {
            c.hide()
        }, 1)
    },
    applyStore: function (a) {
        return a && Ext.StoreManager.lookup(a)
    },
    getStore: function () {
        return this._store || this.getChart() && this.getChart().getStore()
    },
    updateStore: function (b, h) {
        var f = this, a = this.getChart() && this.getChart().getStore(), g = f.getSprites(), e = g.length, d, c;
        b = b || a;
        h = h || a;
        if (h) {
            h.un({datachanged: "onDataChanged", update: "onDataChanged", scope: f})
        }
        if (b) {
            b.on({datachanged: "onDataChanged", update: "onDataChanged", scope: f});
            for (d = 0; d < e; d++) {
                c = g[d];
                if (c.setStore) {
                    c.setStore(b)
                }
            }
            f.onDataChanged()
        }
    },
    onStoreChange: function (a, b) {
        if (!this._store) {
            this.updateStore(a, b)
        }
    },
    coordinate: function (o, m, e) {
        var l = this, p = l.getStore(), h = l.getHidden(), k = p.getData().items, b = l["get" + o + "Axis"](), f = {
            min: Infinity,
            max: -Infinity
        }, q = l["fieldCategory" + o] || [o], g = l.getFields(q), d, n, c, a = {}, j = l.getSprites();
        if (j.length > 0) {
            if (!Ext.isBoolean(h) || !h) {
                for (d = 0; d < q.length; d++) {
                    n = g[d];
                    c = l.coordinateData(k, n, b);
                    l.getRangeOfData(c, f);
                    a["data" + q[d]] = c
                }
            }
            l.dataRange[m] = f.min;
            l.dataRange[m + e] = f.max;
            a["dataMin" + o] = f.min;
            a["dataMax" + o] = f.max;
            if (b) {
                b.range = null;
                a["range" + o] = b.getRange()
            }
            for (d = 0; d < j.length; d++) {
                j[d].setAttributes(a)
            }
        }
    },
    coordinateData: function (g, j, b) {
        var c = [], a = g.length, e = b && b.getLayout(), f = b ? function (k, m, i, l) {
            return e.getCoordFor(k, m, i, l)
        } : function (i) {
            return +i
        }, d, h;
        for (d = 0; d < a; d++) {
            h = g[d].data[j];
            c[d] = !Ext.isEmpty(h) ? f(h, j, d, g) : h
        }
        return c
    },
    getRangeOfData: function (g, b) {
        var d, e = g.length, f, c = b.min, a = b.max;
        for (d = 0; d < e; d++) {
            f = g[d];
            if (f < c) {
                c = f
            }
            if (f > a) {
                a = f
            }
        }
        b.min = c;
        b.max = a
    },
    updateLabelData: function () {
        var h = this, l = h.getStore(), g = l.getData().items, f = h.getSprites(), a = h.getLabel().getTemplate(), n = Ext.Array.from(a.getField() || h.getLabelField()), c, b, e, d, m, k;
        if (!f.length || !n.length) {
            return
        }
        for (c = 0; c < f.length; c++) {
            d = [];
            m = f[c];
            k = m.getField();
            if (Ext.Array.indexOf(n, k) < 0) {
                k = n[c]
            }
            for (b = 0, e = g.length; b < e; b++) {
                d.push(g[b].get(k))
            }
            m.setAttributes({labels: d})
        }
    },
    updateLabelField: function (b) {
        var a = this.getLabel().getTemplate();
        if (!a.config.field) {
            a.setField(b)
        }
    },
    processData: function () {
        if (!this.getStore()) {
            return
        }
        var d = this, f = this.directions, a, c = f.length, e, b;
        for (a = 0; a < c; a++) {
            e = f[a];
            if (d["get" + e + "Axis"]) {
                b = d["get" + e + "Axis"]();
                if (b) {
                    b.processData(d);
                    continue
                }
            }
            if (d["coordinate" + e]) {
                d["coordinate" + e]()
            }
        }
        d.updateLabelData()
    },
    applyBackground: function (a) {
        if (this.getChart()) {
            this.getSurface().setBackground(a);
            return this.getSurface().getBackground()
        } else {
            return a
        }
    },
    updateChart: function (c, a) {
        var b = this;
        if (a) {
            a.un("axeschange", "onAxesChange", b);
            b.sprites = [];
            b.setSurface(null);
            b.setOverlaySurface(null);
            b.onChartDetached(a)
        }
        if (c) {
            b.setSurface(c.getSurface("series"));
            b.setOverlaySurface(c.getSurface("overlay"));
            c.on("axeschange", "onAxesChange", b);
            if (c.getAxes()) {
                b.onAxesChange(c)
            }
            b.onChartAttached(c)
        }
        b.updateStore(b._store, null)
    },
    onAxesChange: function (h) {
        var k = this, g = h.getAxes(), c, a = {}, b = {}, e = false, j = this.directions, l, d, f;
        for (d = 0, f = j.length; d < f; d++) {
            l = j[d];
            b[l] = k.getFields(k["fieldCategory" + l])
        }
        for (d = 0, f = g.length; d < f; d++) {
            c = g[d];
            if (!a[c.getDirection()]) {
                a[c.getDirection()] = [c]
            } else {
                a[c.getDirection()].push(c)
            }
        }
        for (d = 0, f = j.length; d < f; d++) {
            l = j[d];
            if (k["get" + l + "Axis"]()) {
                continue
            }
            if (a[l]) {
                c = k.findMatchingAxis(a[l], b[l]);
                if (c) {
                    k["set" + l + "Axis"](c);
                    if (c.getNeedHighPrecision()) {
                        e = true
                    }
                }
            }
        }
        this.getSurface().setHighPrecision(e)
    },
    findMatchingAxis: function (f, e) {
        var d, c, b, a;
        for (b = 0; b < f.length; b++) {
            d = f[b];
            c = d.getFields();
            if (!c.length) {
                return d
            } else {
                if (e) {
                    for (a = 0; a < e.length; a++) {
                        if (Ext.Array.indexOf(c, e[a]) >= 0) {
                            return d
                        }
                    }
                }
            }
        }
    },
    onChartDetached: function (a) {
        var b = this;
        b.fireEvent("chartdetached", a, b);
        a.un("storechange", "onStoreChange", b)
    },
    onChartAttached: function (a) {
        var b = this;
        b.setBackground(b.getBackground());
        b.fireEvent("chartattached", a, b);
        a.on("storechange", "onStoreChange", b);
        b.processData()
    },
    updateOverlaySurface: function (a) {
        var b = this;
        if (a) {
            if (b.getLabel()) {
                b.getOverlaySurface().add(b.getLabel())
            }
        }
    },
    applyLabel: function (a, b) {
        if (!b) {
            b = new Ext.chart.Markers({zIndex: 10});
            b.setTemplate(new Ext.chart.label.Label(a))
        } else {
            b.getTemplate().setAttributes(a)
        }
        return b
    },
    createItemInstancingSprite: function (c, b) {
        var e = this, d, f = new Ext.chart.Markers();
        f.setAttributes({zIndex: Number.MAX_VALUE});
        var a = Ext.apply({}, b);
        if (e.getHighlight()) {
            a.highlight = e.getHighlight();
            a.modifiers = ["highlight"]
        }
        f.setTemplate(a);
        d = f.getTemplate();
        d.setAttributes(e.getStyle());
        d.fx.on("animationstart", "onSpriteAnimationStart", this);
        d.fx.on("animationend", "onSpriteAnimationEnd", this);
        c.bindMarker("items", f);
        e.getSurface().add(f);
        return f
    },
    getDefaultSpriteConfig: function () {
        return {type: this.seriesType, renderer: this.getRenderer()}
    },
    updateRenderer: function (c) {
        var b = this, a = b.getChart(), d;
        if (a && a.isInitializing) {
            return
        }
        d = b.getSprites();
        if (d.length) {
            d[0].setAttributes({renderer: c || null});
            if (a && !a.isInitializing) {
                a.redraw()
            }
        }
    },
    createSprite: function () {
        var f = this, a = f.getSurface(), e = f.getItemInstancing(), b, c, d = a.add(f.getDefaultSpriteConfig());
        d.setAttributes(this.getStyle());
        if (e) {
            d.itemsMarker = f.createItemInstancingSprite(d, e)
        }
        if (d.bindMarker) {
            if (f.getShowMarkers() && f.getMarker()) {
                b = new Ext.chart.Markers();
                c = Ext.Object.chain(f.getMarker());
                if (f.getHighlight()) {
                    c.highlight = f.getHighlight();
                    c.modifiers = ["highlight"]
                }
                b.setTemplate(c);
                b.getTemplate().fx.setCustomDurations({translationX: 0, translationY: 0});
                d.dataMarker = b;
                d.bindMarker("markers", b);
                f.getOverlaySurface().add(b)
            }
            if (f.getLabel().getTemplate().getField() || f.getLabelField()) {
                d.bindMarker("labels", f.getLabel())
            }
        }
        if (d.setStore) {
            d.setStore(f.getStore())
        }
        d.fx.on("animationstart", "onSpriteAnimationStart", f);
        d.fx.on("animationend", "onSpriteAnimationEnd", f);
        f.sprites.push(d);
        return d
    },
    getSprites: Ext.emptyFn,
    onDataChanged: function () {
        var d = this, c = d.getChart(), b = c && c.getStore(), a = d.getStore();
        if (a !== b) {
            d.processData()
        }
    },
    isXType: function (a) {
        return a === "series"
    },
    getItemId: function () {
        return this.getId()
    },
    applyThemeStyle: function (e, a) {
        var b = this, d, c;
        d = e && e.subStyle && e.subStyle.fillStyle;
        c = d && e.subStyle.strokeStyle;
        if (d && !c) {
            e.subStyle.strokeStyle = b.getStrokeColorsFromFillColors(d)
        }
        d = e && e.markerSubStyle && e.markerSubStyle.fillStyle;
        c = d && e.markerSubStyle.strokeStyle;
        if (d && !c) {
            e.markerSubStyle.strokeStyle = b.getStrokeColorsFromFillColors(d)
        }
        return Ext.apply(a || {}, e)
    },
    applyStyle: function (c, b) {
        var a = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias("sprite." + this.seriesType));
        if (a && a.def) {
            c = a.def.normalize(c)
        }
        return Ext.apply(b || {}, c)
    },
    applySubStyle: function (b, c) {
        var a = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias("sprite." + this.seriesType));
        if (a && a.def) {
            b = a.def.batchedNormalize(b, true)
        }
        return Ext.merge(c || {}, b)
    },
    applyMarker: function (c, a) {
        var d = (c && c.type) || (a && a.type) || "circle", b = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias("sprite." + d));
        if (b && b.def) {
            c = b.def.normalize(Ext.isObject(c) ? c : {}, true);
            c.type = d
        }
        return Ext.merge(a || {}, c)
    },
    applyMarkerSubStyle: function (c, a) {
        var d = (c && c.type) || (a && a.type) || "circle", b = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias("sprite." + d));
        if (b && b.def) {
            c = b.def.batchedNormalize(c, true)
        }
        return Ext.merge(a || {}, c)
    },
    updateHidden: function (a) {
        this.getColors();
        this.getSubStyle();
        this.setSubStyle({hidden: a});
        this.processData();
        this.doUpdateStyles()
    },
    setHiddenByIndex: function (a, b) {
        if (Ext.isArray(this.getHidden())) {
            this.getHidden()[a] = b;
            this.updateHidden(this.getHidden())
        } else {
            this.setHidden(b)
        }
    },
    getStrokeColorsFromFillColors: function (a) {
        var c = this, e = c.getUseDarkerStrokeColor(), b = (Ext.isNumber(e) ? e : c.darkerStrokeRatio), d;
        if (e) {
            d = Ext.Array.map(a, function (f) {
                f = Ext.isString(f) ? f : f.stops[0].color;
                f = Ext.draw.Color.fromString(f);
                return f.createDarker(b).toString()
            })
        } else {
            d = Ext.Array.clone(a)
        }
        return d
    },
    updateThemeColors: function (b) {
        var c = this, d = c.getThemeStyle(), a = Ext.Array.clone(b), f = c.getStrokeColorsFromFillColors(b), e = {
            fillStyle: a,
            strokeStyle: f
        };
        d.subStyle = Ext.apply(d.subStyle || {}, e);
        d.markerSubStyle = Ext.apply(d.markerSubStyle || {}, e);
        c.doUpdateStyles()
    },
    themeOnlyIfConfigured: {},
    updateTheme: function (d) {
        var h = this, a = d.getSeries(), n = h.getInitialConfig(), c = h.defaultConfig, f = h.getConfigurator().configs, j = a.defaults, k = a[h.type], g = h.themeOnlyIfConfigured, l, i, o, b, m, e;
        a = Ext.merge({}, j, k);
        for (l in a) {
            i = a[l];
            e = f[l];
            if (i !== null && i !== undefined && e) {
                m = n[l];
                o = Ext.isObject(i);
                b = m === c[l];
                if (o) {
                    if (b && g[l]) {
                        continue
                    }
                    i = Ext.merge({}, i, m)
                }
                if (b || o) {
                    h[e.names.set](i)
                }
            }
        }
    },
    updateChartColors: function (a) {
        var b = this;
        if (!b.getColors()) {
            b.updateThemeColors(a)
        }
    },
    updateColors: function (a) {
        this.updateThemeColors(a)
    },
    updateStyle: function () {
        this.doUpdateStyles()
    },
    updateSubStyle: function () {
        this.doUpdateStyles()
    },
    updateThemeStyle: function () {
        this.doUpdateStyles()
    },
    doUpdateStyles: function () {
        var f = this, g = f.sprites, c = f.getItemInstancing(), b = 0, e = g && g.length, a = f.getMarker(), d;
        for (; b < e; b++) {
            d = f.getStyleByIndex(b);
            if (c) {
                g[b].itemsMarker.getTemplate().setAttributes(d)
            }
            g[b].setAttributes(d);
            if (a && g[b].dataMarker) {
                g[b].dataMarker.getTemplate().setAttributes(f.getMarkerStyleByIndex(b))
            }
        }
    },
    getStyleWithTheme: function () {
        var b = this, c = b.getThemeStyle(), d = (c && c.style) || {}, a = Ext.applyIf(Ext.apply({}, b.getStyle()), d);
        return a
    },
    getSubStyleWithTheme: function () {
        var c = this, d = c.getThemeStyle(), a = (d && d.subStyle) || {}, b = Ext.applyIf(Ext.apply({}, c.getSubStyle()), a);
        return b
    },
    getStyleByIndex: function (b) {
        var e = this, h = e.getThemeStyle(), d, g, c, f, a = {};
        d = e.getStyle();
        g = (h && h.style) || {};
        c = e.styleDataForIndex(e.getSubStyle(), b);
        f = e.styleDataForIndex((h && h.subStyle), b);
        Ext.apply(a, g);
        Ext.apply(a, f);
        Ext.apply(a, d);
        Ext.apply(a, c);
        return a
    },
    getMarkerStyleByIndex: function (d) {
        var g = this, c = g.getThemeStyle(), a, e, k, j, b, l, h, f, m = {};
        a = g.getStyle();
        e = (c && c.style) || {};
        k = g.styleDataForIndex(g.getSubStyle(), d);
        j = g.styleDataForIndex((c && c.subStyle), d);
        b = g.getMarker();
        l = (c && c.marker) || {};
        h = g.getMarkerSubStyle();
        f = g.styleDataForIndex((c && c.markerSubStyle), d);
        Ext.apply(m, e);
        Ext.apply(m, j);
        Ext.apply(m, l);
        Ext.apply(m, f);
        Ext.apply(m, a);
        Ext.apply(m, k);
        Ext.apply(m, b);
        Ext.apply(m, h);
        return m
    },
    styleDataForIndex: function (d, c) {
        var e, b, a = {};
        if (d) {
            for (b in d) {
                e = d[b];
                if (Ext.isArray(e)) {
                    a[b] = e[c % e.length]
                } else {
                    a[b] = e
                }
            }
        }
        return a
    },
    getItemForPoint: Ext.emptyFn,
    getItemByIndex: function (b) {
        if (this.getSprites()) {
            var e = this, c = e.getSprites()[0], a = e.getStore(), d;
            if (c) {
                d = {
                    series: this,
                    category: this.getItemInstancing() ? "items" : "markers",
                    index: b,
                    record: a.getData().items[b],
                    field: this.getYField(),
                    sprite: c
                };
                return d
            }
        }
    },
    onSpriteAnimationStart: function (a) {
        this.fireEvent("animationstart", this, a)
    },
    onSpriteAnimationEnd: function (a) {
        this.fireEvent("animationend", this, a)
    },
    provideLegendInfo: function (a) {
        a.push({
            name: this.getTitle() || this.getId(),
            mark: "black",
            disabled: this.getHidden(),
            series: this.getId(),
            index: 0
        })
    },
    destroy: function () {
        var b = this, a = b.getStore(), c = b.getConfig("tooltip", true);
        b.clearListeners();
        Ext.ComponentManager.unregister(b);
        if (a && a.getAutoDestroy()) {
            Ext.destroy(a)
        }
        b.setStore(null);
        if (c) {
            Ext.destroy(c);
            clearTimeout(b.tooltipTimeout)
        }
        b.callParent()
    }
});
Ext.define("Ext.chart.interactions.Abstract", {
    xtype: "interaction",
    mixins: {observable: "Ext.mixin.Observable"},
    config: {gestures: {tap: "onGesture"}, chart: null, enabled: true},
    throttleGap: 0,
    stopAnimationBeforeSync: false,
    constructor: function (a) {
        var b = this;
        b.mixins.observable.constructor.call(b, a);
        b.getId();
        Ext.ComponentManager.register(b)
    },
    initialize: Ext.emptyFn,
    updateChart: function (c, a) {
        var b = this;
        if (a === c) {
            return
        }
        if (a) {
            b.removeChartListener(a)
        }
        if (c) {
            b.addChartListener()
        }
    },
    updateEnabled: function (a) {
        var c = this, b = c.getChart();
        if (b) {
            if (a) {
                c.addChartListener()
            } else {
                c.removeChartListener(b)
            }
        }
    },
    onGesture: Ext.emptyFn,
    getItemForEvent: function (d) {
        var b = this, a = b.getChart(), c = a.getEventXY(d);
        return a.getItemForPoint(c[0], c[1])
    },
    getItemsForEvent: function (d) {
        var b = this, a = b.getChart(), c = a.getEventXY(d);
        return a.getItemsForPoint(c[0], c[1])
    },
    addChartListener: function () {
        var c = this, b = c.getChart(), e = c.getGestures(), a;
        if (!c.getEnabled()) {
            return
        }
        function d(f, g) {
            b.addElementListener(f, c.listeners[f] = function (j) {
                var i = c.getLocks(), h;
                if (c.getEnabled() && (!(f in i) || i[f] === c)) {
                    h = (Ext.isFunction(g) ? g : c[g]).apply(this, arguments);
                    if (h === false && j && j.stopPropagation) {
                        j.stopPropagation()
                    }
                    return h
                }
            }, c)
        }

        c.listeners = c.listeners || {};
        for (a in e) {
            d(a, e[a])
        }
    },
    removeChartListener: function (c) {
        var d = this, e = d.getGestures(), b;

        function a(f) {
            c.removeElementListener(f, d.listeners[f]);
            delete d.listeners[f]
        }

        if (d.listeners) {
            for (b in e) {
                a(b)
            }
        }
    },
    lockEvents: function () {
        var d = this, c = d.getLocks(), a = Array.prototype.slice.call(arguments), b = a.length;
        while (b--) {
            c[a[b]] = d
        }
    },
    unlockEvents: function () {
        var c = this.getLocks(), a = Array.prototype.slice.call(arguments), b = a.length;
        while (b--) {
            delete c[a[b]]
        }
    },
    getLocks: function () {
        var a = this.getChart();
        return a.lockedEvents || (a.lockedEvents = {})
    },
    isMultiTouch: function () {
        if (Ext.browser.is.IE10) {
            return true
        }
        return !(Ext.browser.is.AndroidStock2 || Ext.os.is.Desktop)
    },
    initializeDefaults: Ext.emptyFn,
    doSync: function () {
        var b = this, a = b.getChart();
        if (b.syncTimer) {
            clearTimeout(b.syncTimer);
            b.syncTimer = null
        }
        if (b.stopAnimationBeforeSync) {
            a.resizing = true
        }
        a.redraw();
        if (b.stopAnimationBeforeSync) {
            a.resizing = false
        }
        b.syncThrottle = Date.now() + b.throttleGap
    },
    sync: function () {
        var a = this;
        if (a.throttleGap && Ext.frameStartTime < a.syncThrottle) {
            if (a.syncTimer) {
                return
            }
            a.syncTimer = Ext.defer(function () {
                a.doSync()
            }, a.throttleGap)
        } else {
            a.doSync()
        }
    },
    getItemId: function () {
        return this.getId()
    },
    isXType: function (a) {
        return a === "interaction"
    },
    destroy: function () {
        var b = this, a = b.getChart();
        b.removeChartListener(a);
        Ext.ComponentManager.unregister(b);
        delete b.listeners;
        b.callParent()
    }
}, function () {
    if (Ext.browser.is.AndroidStock2) {
        this.prototype.throttleGap = 20
    } else {
        if (Ext.os.is.Android4) {
            this.prototype.throttleGap = 40
        }
    }
});
Ext.define("Ext.chart.MarkerHolder", {
    extend: "Ext.Mixin",
    mixinConfig: {id: "markerHolder", after: {constructor: "constructor", preRender: "preRender"}},
    isMarkerHolder: true,
    constructor: function () {
        this.boundMarkers = {};
        this.cleanRedraw = false
    },
    bindMarker: function (b, a) {
        if (a) {
            if (!this.boundMarkers[b]) {
                this.boundMarkers[b] = []
            }
            Ext.Array.include(this.boundMarkers[b], a)
        }
    },
    getBoundMarker: function (a) {
        return this.boundMarkers[a]
    },
    preRender: function () {
        var g = this, b = g.getId(), d = g.boundMarkers, j = g.getParent(), f, a, c, e, h;
        if (g.surfaceMatrix) {
            h = g.surfaceMatrix.set(1, 0, 0, 1, 0, 0)
        } else {
            h = g.surfaceMatrix = new Ext.draw.Matrix()
        }
        g.cleanRedraw = !this.attr.dirty;
        if (!g.cleanRedraw) {
            for (a in g.boundMarkers) {
                if (d[a]) {
                    for (f = d[a], c = 0, e = f.length; c < e; c++) {
                        f[c].clear(b)
                    }
                }
            }
        }
        while (j && j.attr && j.attr.matrix) {
            h.prependMatrix(j.attr.matrix);
            j = j.getParent()
        }
        h.prependMatrix(j.matrix);
        g.surfaceMatrix = h;
        g.inverseSurfaceMatrix = h.inverse(g.inverseSurfaceMatrix)
    },
    putMarker: function (b, f, e, a, j) {
        var h, d, g, c = this.getId();
        if (this.boundMarkers[b]) {
            for (h = this.boundMarkers[b], d = 0, g = h.length; d < g; d++) {
                h[d].putMarkerFor(c, f, e, a, j)
            }
        }
    },
    getMarkerBBox: function (b, a, c) {
        var d = this.boundMarkers[b], e = this.getId();
        if (d) {
            return d[0].getMarkerBBoxFor(e, a, c)
        }
    }
});
Ext.define("Ext.chart.axis.sprite.Axis", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "sprite.axis",
    type: "axis",
    mixins: {markerHolder: "Ext.chart.MarkerHolder"},
    requires: ["Ext.draw.sprite.Text"],
    inheritableStatics: {
        def: {
            processors: {
                grid: "bool",
                axisLine: "bool",
                minorTicks: "bool",
                minorTickSize: "number",
                majorTicks: "bool",
                majorTickSize: "number",
                length: "number",
                startGap: "number",
                endGap: "number",
                dataMin: "number",
                dataMax: "number",
                visibleMin: "number",
                visibleMax: "number",
                position: "enums(left,right,top,bottom,angular,radial,gauge)",
                minStepSize: "number",
                estStepSize: "number",
                titleOffset: "number",
                textPadding: "number",
                min: "number",
                max: "number",
                centerX: "number",
                centerY: "number",
                radius: "number",
                totalAngle: "number",
                baseRotation: "number",
                data: "default",
                enlargeEstStepSizeByText: "bool"
            },
            defaults: {
                grid: false,
                axisLine: true,
                minorTicks: false,
                minorTickSize: 3,
                majorTicks: true,
                majorTickSize: 5,
                length: 0,
                startGap: 0,
                endGap: 0,
                visibleMin: 0,
                visibleMax: 1,
                dataMin: 0,
                dataMax: 1,
                position: "",
                minStepSize: 0,
                estStepSize: 20,
                min: 0,
                max: 1,
                centerX: 0,
                centerY: 0,
                radius: 1,
                baseRotation: 0,
                data: null,
                titleOffset: 0,
                textPadding: 0,
                scalingCenterY: 0,
                scalingCenterX: 0,
                strokeStyle: "black",
                enlargeEstStepSizeByText: false
            },
            triggers: {
                minorTickSize: "bbox",
                majorTickSize: "bbox",
                position: "bbox,layout",
                axisLine: "bbox,layout",
                min: "layout",
                max: "layout",
                length: "layout",
                minStepSize: "layout",
                estStepSize: "layout",
                data: "layout",
                dataMin: "layout",
                dataMax: "layout",
                visibleMin: "layout",
                visibleMax: "layout",
                enlargeEstStepSizeByText: "layout"
            },
            updaters: {
                layout: function () {
                    this.doLayout()
                }
            }
        }
    },
    config: {label: null, layout: null, segmenter: null, renderer: null, layoutContext: null, axis: null},
    thickness: 0,
    stepSize: 0,
    getBBox: function () {
        return null
    },
    doDefaultRender: function (a) {
        return this.segmenter.renderer(a, this)
    },
    doLayout: function () {
        var h = this, f = h.getAxis().getChart();
        if (f.isInitializing) {
            return
        }
        var b = h.attr, g = h.getLayout(), c = f.getInherited().rtl, e = b.dataMin + (b.dataMax - b.dataMin) * b.visibleMin, a = b.dataMin + (b.dataMax - b.dataMin) * b.visibleMax, d = {
            attr: b,
            segmenter: h.getSegmenter(),
            renderer: h.doDefaultRender
        };
        if (b.position === "left" || b.position === "right") {
            b.translationX = 0;
            b.translationY = a * b.length / (a - e);
            b.scalingX = 1;
            b.scalingY = -b.length / (a - e);
            b.scalingCenterY = 0;
            b.scalingCenterX = 0;
            h.applyTransformations(true)
        } else {
            if (b.position === "top" || b.position === "bottom") {
                if (c) {
                    b.translationX = b.length + e * b.length / (a - e) + 1
                } else {
                    b.translationX = -e * b.length / (a - e)
                }
                b.translationY = 0;
                b.scalingX = (c ? -1 : 1) * b.length / (a - e);
                b.scalingY = 1;
                b.scalingCenterY = 0;
                b.scalingCenterX = 0;
                h.applyTransformations(true)
            }
        }
        if (g) {
            g.calculateLayout(d);
            h.setLayoutContext(d)
        }
    },
    iterate: function (e, j) {
        var c, g, a, b, h, d, k = Ext.Array.some, m = Math.abs, f;
        if (e.getLabel) {
            if (e.min < e.from) {
                j.call(this, e.min, e.getLabel(e.min), -1, e)
            }
            for (c = 0; c <= e.steps; c++) {
                j.call(this, e.get(c), e.getLabel(c), c, e)
            }
            if (e.max > e.to) {
                j.call(this, e.max, e.getLabel(e.max), e.steps + 1, e)
            }
        } else {
            b = this.getAxis();
            h = b.floatingAxes;
            d = [];
            f = (e.to - e.from) / (e.steps + 1);
            if (b.getFloating()) {
                for (a in h) {
                    d.push(h[a])
                }
            }
            function l(i) {
                return !d.length || k(d, function (n) {
                        return m(n - i) > f
                    })
            }

            if (e.min < e.from && l(e.min)) {
                j.call(this, e.min, e.min, -1, e)
            }
            for (c = 0; c <= e.steps; c++) {
                g = e.get(c);
                if (l(g)) {
                    j.call(this, g, g, c, e)
                }
            }
            if (e.max > e.to && l(e.max)) {
                j.call(this, e.max, e.max, e.steps + 1, e)
            }
        }
    },
    renderTicks: function (l, m, s, p) {
        var v = this, k = v.attr, u = k.position, n = k.matrix, e = 0.5 * k.lineWidth, f = n.getXX(), i = n.getDX(), j = n.getYY(), h = n.getDY(), o = s.majorTicks, d = k.majorTickSize, a = s.minorTicks, r = k.minorTickSize;
        if (o) {
            switch (u) {
                case"right":
                function q(w) {
                    return function (x, z, y) {
                        x = l.roundPixel(x * j + h) + e;
                        m.moveTo(0, x);
                        m.lineTo(w, x)
                    }
                }

                    v.iterate(o, q(d));
                    a && v.iterate(a, q(r));
                    break;
                case"left":
                function t(w) {
                    return function (x, z, y) {
                        x = l.roundPixel(x * j + h) + e;
                        m.moveTo(p[2] - w, x);
                        m.lineTo(p[2], x)
                    }
                }

                    v.iterate(o, t(d));
                    a && v.iterate(a, t(r));
                    break;
                case"bottom":
                function c(w) {
                    return function (x, z, y) {
                        x = l.roundPixel(x * f + i) - e;
                        m.moveTo(x, 0);
                        m.lineTo(x, w)
                    }
                }

                    v.iterate(o, c(d));
                    a && v.iterate(a, c(r));
                    break;
                case"top":
                function b(w) {
                    return function (x, z, y) {
                        x = l.roundPixel(x * f + i) - e;
                        m.moveTo(x, p[3]);
                        m.lineTo(x, p[3] - w)
                    }
                }

                    v.iterate(o, b(d));
                    a && v.iterate(a, b(r));
                    break;
                case"angular":
                    v.iterate(o, function (w, y, x) {
                        w = w / (k.max + 1) * Math.PI * 2 + k.baseRotation;
                        m.moveTo(k.centerX + (k.length) * Math.cos(w), k.centerY + (k.length) * Math.sin(w));
                        m.lineTo(k.centerX + (k.length + d) * Math.cos(w), k.centerY + (k.length + d) * Math.sin(w))
                    });
                    break;
                case"gauge":
                    var g = v.getGaugeAngles();
                    v.iterate(o, function (w, y, x) {
                        w = (w - k.min) / (k.max - k.min + 1) * k.totalAngle - k.totalAngle + g.start;
                        m.moveTo(k.centerX + (k.length) * Math.cos(w), k.centerY + (k.length) * Math.sin(w));
                        m.lineTo(k.centerX + (k.length + d) * Math.cos(w), k.centerY + (k.length + d) * Math.sin(w))
                    });
                    break
            }
        }
    },
    renderLabels: function (u, v, E, y) {
        var H = this, t = H.attr, d = 0.5 * t.lineWidth, F = t.position, w = t.matrix, A = t.textPadding, f = w.getXX(), m = w.getDX(), r = w.getYY(), l = w.getDY(), a = 0, x = E.majorTicks, D = Math.max(t.majorTickSize, t.minorTickSize) + t.lineWidth, j = H.getLabel(), p, z, B = null, o = 0, C = 0, e = E.segmenter, s = H.getRenderer(), I = H.getAxis().getTitle(), g = I && I.attr.text !== "" && I.getBBox(), k, G = null, c, q, n, b, i;
        if (x && j && !j.attr.hidden) {
            p = j.attr.font;
            if (v.font !== p) {
                v.font = p
            }
            j.setAttributes({translationX: 0, translationY: 0}, true, true);
            j.applyTransformations();
            k = j.attr.inverseMatrix.elements.slice(0);
            switch (F) {
                case"left":
                    b = g ? g.x + g.width : 0;
                    switch (j.attr.textAlign) {
                        case"start":
                            i = u.roundPixel(b + m) - d;
                            break;
                        case"end":
                            i = u.roundPixel(y[2] - D + m) - d;
                            break;
                        default:
                            i = u.roundPixel(b + (y[2] - b - D) / 2 + m) - d
                    }
                    j.setAttributes({translationX: i}, true, true);
                    break;
                case"right":
                    b = g ? y[2] - g.x : 0;
                    switch (j.attr.textAlign) {
                        case"start":
                            i = u.roundPixel(D + m) + d;
                            break;
                        case"end":
                            i = u.roundPixel(y[2] - b + m) + d;
                            break;
                        default:
                            i = u.roundPixel(D + (y[2] - D - b) / 2 + m) + d
                    }
                    j.setAttributes({translationX: i}, true, true);
                    break;
                case"top":
                    b = g ? g.y + g.height : 0;
                    j.setAttributes({translationY: u.roundPixel(b + (y[3] - b - D) / 2) - d}, true, true);
                    break;
                case"bottom":
                    b = g ? y[3] - g.y : 0;
                    j.setAttributes({translationY: u.roundPixel(D + (y[3] - D - b) / 2) + d}, true, true);
                    break;
                case"radial":
                    j.setAttributes({translationX: t.centerX}, true, true);
                    break;
                case"angular":
                    j.setAttributes({translationY: t.centerY}, true, true);
                    break;
                case"gauge":
                    j.setAttributes({translationY: t.centerY}, true, true);
                    break
            }
            if (F === "left" || F === "right") {
                H.iterate(x, function (J, L, K) {
                    if (L === undefined) {
                        return
                    }
                    n = s ? s.call(H, L, E, B) : e.renderer(L, E, B);
                    B = L;
                    j.setAttributes({text: String(n), translationY: u.roundPixel(J * r + l)}, true, true);
                    j.applyTransformations();
                    a = Math.max(a, j.getBBox().width + D);
                    if (a <= H.thickness) {
                        q = Ext.draw.Matrix.fly(j.attr.matrix.elements.slice(0));
                        c = q.prepend.apply(q, k).transformBBox(j.getBBox(true));
                        if (G && !Ext.draw.Draw.isBBoxIntersect(c, G, A)) {
                            return
                        }
                        u.renderSprite(j);
                        G = c;
                        o += c.height;
                        C++
                    }
                })
            } else {
                if (F === "top" || F === "bottom") {
                    H.iterate(x, function (J, L, K) {
                        if (L === undefined) {
                            return
                        }
                        n = s ? s.call(this, L, E, B) : e.renderer(L, E, B);
                        B = L;
                        j.setAttributes({text: String(n), translationX: u.roundPixel(J * f + m)}, true, true);
                        j.applyTransformations();
                        a = Math.max(a, j.getBBox().height + D);
                        if (a <= H.thickness) {
                            q = Ext.draw.Matrix.fly(j.attr.matrix.elements.slice(0));
                            c = q.prepend.apply(q, k).transformBBox(j.getBBox(true));
                            if (G && !Ext.draw.Draw.isBBoxIntersect(c, G, A)) {
                                return
                            }
                            u.renderSprite(j);
                            G = c;
                            o += c.width;
                            C++
                        }
                    })
                } else {
                    if (F === "radial") {
                        H.iterate(x, function (J, L, K) {
                            if (L === undefined) {
                                return
                            }
                            n = s ? s.call(H, L, E, B) : e.renderer(L, E, B);
                            B = L;
                            if (typeof n !== "undefined") {
                                j.setAttributes({
                                    text: String(n),
                                    translationX: t.centerX - u.roundPixel(J) / t.max * t.length * Math.cos(t.baseRotation + Math.PI / 2),
                                    translationY: t.centerY - u.roundPixel(J) / t.max * t.length * Math.sin(t.baseRotation + Math.PI / 2)
                                }, true, true);
                                j.applyTransformations();
                                c = j.attr.matrix.transformBBox(j.getBBox(true));
                                if (G && !Ext.draw.Draw.isBBoxIntersect(c, G)) {
                                    return
                                }
                                u.renderSprite(j);
                                G = c;
                                o += c.width;
                                C++
                            }
                        })
                    } else {
                        if (F === "angular") {
                            z = t.majorTickSize + t.lineWidth * 0.5 + (parseInt(j.attr.fontSize, 10) || 10) / 2;
                            H.iterate(x, function (J, L, K) {
                                if (L === undefined) {
                                    return
                                }
                                n = s ? s.call(H, L, E, B) : e.renderer(L, E, B);
                                B = L;
                                a = Math.max(a, Math.max(t.majorTickSize, t.minorTickSize) + (t.lineCap !== "butt" ? t.lineWidth * 0.5 : 0));
                                if (typeof n !== "undefined") {
                                    var M = J / (t.max + 1) * Math.PI * 2 + t.baseRotation;
                                    j.setAttributes({
                                        text: String(n),
                                        translationX: t.centerX + (t.length + z) * Math.cos(M),
                                        translationY: t.centerY + (t.length + z) * Math.sin(M)
                                    }, true, true);
                                    j.applyTransformations();
                                    c = j.attr.matrix.transformBBox(j.getBBox(true));
                                    if (G && !Ext.draw.Draw.isBBoxIntersect(c, G)) {
                                        return
                                    }
                                    u.renderSprite(j);
                                    G = c;
                                    o += c.width;
                                    C++
                                }
                            })
                        } else {
                            if (F === "gauge") {
                                var h = H.getGaugeAngles();
                                H.iterate(x, function (J, L, K) {
                                    if (L === undefined) {
                                        return
                                    }
                                    n = s ? s.call(H, L, E, B) : e.renderer(L, E, B);
                                    B = L;
                                    if (typeof n !== "undefined") {
                                        var M = (J - t.min) / (t.max - t.min + 1) * t.totalAngle - t.totalAngle + h.start;
                                        j.setAttributes({
                                            text: String(n),
                                            translationX: t.centerX + (t.length + 10) * Math.cos(M),
                                            translationY: t.centerY + (t.length + 10) * Math.sin(M)
                                        }, true, true);
                                        j.applyTransformations();
                                        c = j.attr.matrix.transformBBox(j.getBBox(true));
                                        if (G && !Ext.draw.Draw.isBBoxIntersect(c, G)) {
                                            return
                                        }
                                        u.renderSprite(j);
                                        G = c;
                                        o += c.width;
                                        C++
                                    }
                                })
                            }
                        }
                    }
                }
            }
            if (t.enlargeEstStepSizeByText && C) {
                o /= C;
                o += D;
                o *= 2;
                if (t.estStepSize < o) {
                    t.estStepSize = o
                }
            }
            if (Math.abs(H.thickness - (a)) > 1) {
                H.thickness = a;
                t.bbox.plain.dirty = true;
                t.bbox.transform.dirty = true;
                H.doThicknessChanged();
                return false
            }
        }
    },
    renderAxisLine: function (a, i, e, c) {
        var h = this, g = h.attr, b = g.lineWidth * 0.5, j = g.position, d, f;
        if (g.axisLine && g.length) {
            switch (j) {
                case"left":
                    d = a.roundPixel(c[2]) - b;
                    i.moveTo(d, -g.endGap);
                    i.lineTo(d, g.length + g.startGap);
                    break;
                case"right":
                    i.moveTo(b, -g.endGap);
                    i.lineTo(b, g.length + g.startGap);
                    break;
                case"bottom":
                    i.moveTo(-g.startGap, b);
                    i.lineTo(g.length + g.endGap, b);
                    break;
                case"top":
                    d = a.roundPixel(c[3]) - b;
                    i.moveTo(-g.startGap, d);
                    i.lineTo(g.length + g.endGap, d);
                    break;
                case"angular":
                    i.moveTo(g.centerX + g.length, g.centerY);
                    i.arc(g.centerX, g.centerY, g.length, 0, Math.PI * 2, true);
                    break;
                case"gauge":
                    f = h.getGaugeAngles();
                    i.moveTo(g.centerX + Math.cos(f.start) * g.length, g.centerY + Math.sin(f.start) * g.length);
                    i.arc(g.centerX, g.centerY, g.length, f.start, f.end, true);
                    break
            }
        }
    },
    getGaugeAngles: function () {
        var a = this, c = a.attr.totalAngle, b;
        if (c <= Math.PI) {
            b = (Math.PI - c) * 0.5
        } else {
            b = -(Math.PI * 2 - c) * 0.5
        }
        b = Math.PI * 2 - b;
        return {start: b, end: b - c}
    },
    renderGridLines: function (m, n, s, r) {
        var t = this, b = t.getAxis(), l = t.attr, p = l.matrix, d = l.startGap, a = l.endGap, c = p.getXX(), k = p.getYY(), h = p.getDX(), g = p.getDY(), u = l.position, f = b.getGridAlignment(), q = s.majorTicks, e, o, i;
        if (l.grid) {
            if (q) {
                if (u === "left" || u === "right") {
                    i = l.min * k + g + a + d;
                    t.iterate(q, function (j, w, v) {
                        e = j * k + g + a;
                        t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {y: e, height: i - e}, o = v, true);
                        i = e
                    });
                    o++;
                    e = 0;
                    t.putMarker(f + "-" + (o % 2 ? "odd" : "even"), {y: e, height: i - e}, o, true)
                } else {
                    if (u === "top" || u === "bottom") {
                        i = l.min * c + h + d;
                        if (d) {
                            t.putMarker(f + "-even", {x: 0, width: i}, -1, true)
                        }
                        t.iterate(q, function (j, w, v) {
                            e = j * c + h + d;
                            t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {x: e, width: i - e}, o = v, true);
                            i = e
                        });
                        o++;
                        e = l.length + l.startGap + l.endGap;
                        t.putMarker(f + "-" + (o % 2 ? "odd" : "even"), {x: e, width: i - e}, o, true)
                    } else {
                        if (u === "radial") {
                            t.iterate(q, function (j, w, v) {
                                if (!j) {
                                    return
                                }
                                e = j / l.max * l.length;
                                t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {scalingX: e, scalingY: e}, v, true);
                                i = e
                            })
                        } else {
                            if (u === "angular") {
                                t.iterate(q, function (j, w, v) {
                                    if (!l.length) {
                                        return
                                    }
                                    e = j / (l.max + 1) * Math.PI * 2 + l.baseRotation;
                                    t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {
                                        rotationRads: e,
                                        rotationCenterX: 0,
                                        rotationCenterY: 0,
                                        scalingX: l.length,
                                        scalingY: l.length
                                    }, v, true);
                                    i = e
                                })
                            }
                        }
                    }
                }
            }
        }
    },
    renderLimits: function () {
        var q = this, a = q.getAxis(), d = Ext.Array.from(a.getLimits());
        if (!d.length) {
            return
        }
        var o = a.limits.surface.getRect(), l = q.attr, m = l.matrix, r = l.position, j = Ext.Object.chain, s = a.limits.titles, c, h, b, p, k, n, f, g, e;
        s.instances = [];
        s.position = 0;
        if (r === "left" || r === "right") {
            for (n = 0, f = d.length; n < f; n++) {
                p = j(d[n]);
                !p.line && (p.line = {});
                k = Ext.isString(p.value) ? a.getCoordFor(p.value) : p.value;
                k = k * m.getYY() + m.getDY();
                p.line.y = k;
                p.line.strokeStyle = p.line.strokeStyle || l.strokeStyle;
                q.putMarker("horizontal-limit-lines", p.line, n, true);
                if (p.line.title) {
                    s.createInstance(p.line.title);
                    c = s.getBBoxFor(s.position - 1);
                    h = p.line.title.position || (r === "left" ? "start" : "end");
                    switch (h) {
                        case"start":
                            g = 10;
                            break;
                        case"end":
                            g = o[2] - 10;
                            break;
                        case"middle":
                            g = o[2] / 2;
                            break
                    }
                    s.setAttributesFor(s.position - 1, {
                        x: g,
                        y: k - c.height / 2,
                        textAlign: h,
                        fillStyle: p.line.title.fillStyle || p.line.strokeStyle
                    })
                }
            }
        } else {
            if (r === "top" || r === "bottom") {
                for (n = 0, f = d.length; n < f; n++) {
                    p = j(d[n]);
                    !p.line && (p.line = {});
                    k = Ext.isString(p.value) ? a.getCoordFor(p.value) : p.value;
                    k = k * m.getXX() + m.getDX();
                    p.line.x = k;
                    p.line.strokeStyle = p.line.strokeStyle || l.strokeStyle;
                    q.putMarker("vertical-limit-lines", p.line, n, true);
                    if (p.line.title) {
                        s.createInstance(p.line.title);
                        c = s.getBBoxFor(s.position - 1);
                        h = p.line.title.position || (r === "top" ? "end" : "start");
                        switch (h) {
                            case"start":
                                e = o[3] - c.width / 2 - 10;
                                break;
                            case"end":
                                e = c.width / 2 + 10;
                                break;
                            case"middle":
                                e = o[3] / 2;
                                break
                        }
                        s.setAttributesFor(s.position - 1, {
                            x: k + c.height / 2,
                            y: e,
                            fillStyle: p.line.title.fillStyle || p.line.strokeStyle,
                            rotationRads: Math.PI / 2
                        })
                    }
                }
            } else {
                if (r === "radial") {
                    for (n = 0, f = d.length; n < f; n++) {
                        p = j(d[n]);
                        !p.line && (p.line = {});
                        k = Ext.isString(p.value) ? a.getCoordFor(p.value) : p.value;
                        if (k > l.max) {
                            continue
                        }
                        k = k / l.max * l.length;
                        p.line.cx = l.centerX;
                        p.line.cy = l.centerY;
                        p.line.scalingX = k;
                        p.line.scalingY = k;
                        p.line.strokeStyle = p.line.strokeStyle || l.strokeStyle;
                        q.putMarker("circular-limit-lines", p.line, n, true);
                        if (p.line.title) {
                            s.createInstance(p.line.title);
                            c = s.getBBoxFor(s.position - 1);
                            s.setAttributesFor(s.position - 1, {
                                x: l.centerX,
                                y: l.centerY - k - c.height / 2,
                                fillStyle: p.line.title.fillStyle || p.line.strokeStyle
                            })
                        }
                    }
                } else {
                    if (r === "angular") {
                        for (n = 0, f = d.length; n < f; n++) {
                            p = j(d[n]);
                            !p.line && (p.line = {});
                            k = Ext.isString(p.value) ? a.getCoordFor(p.value) : p.value;
                            k = k / (l.max + 1) * Math.PI * 2 + l.baseRotation;
                            p.line.translationX = l.centerX;
                            p.line.translationY = l.centerY;
                            p.line.rotationRads = k;
                            p.line.rotationCenterX = 0;
                            p.line.rotationCenterY = 0;
                            p.line.scalingX = l.length;
                            p.line.scalingY = l.length;
                            p.line.strokeStyle = p.line.strokeStyle || l.strokeStyle;
                            q.putMarker("radial-limit-lines", p.line, n, true);
                            if (p.line.title) {
                                s.createInstance(p.line.title);
                                c = s.getBBoxFor(s.position - 1);
                                b = ((k > -0.5 * Math.PI && k < 0.5 * Math.PI) || (k > 1.5 * Math.PI && k < 2 * Math.PI)) ? 1 : -1;
                                s.setAttributesFor(s.position - 1, {
                                    x: l.centerX + 0.5 * l.length * Math.cos(k) + b * c.height / 2 * Math.sin(k),
                                    y: l.centerY + 0.5 * l.length * Math.sin(k) - b * c.height / 2 * Math.cos(k),
                                    rotationRads: b === 1 ? k : k - Math.PI,
                                    fillStyle: p.line.title.fillStyle || p.line.strokeStyle
                                })
                            }
                        }
                    } else {
                        if (r === "gauge") {
                        }
                    }
                }
            }
        }
    },
    doThicknessChanged: function () {
        var a = this.getAxis();
        if (a) {
            a.onThicknessChanged()
        }
    },
    render: function (a, b, c) {
        var e = this, d = e.getLayoutContext();
        if (d) {
            if (false === e.renderLabels(a, b, d, c)) {
                return false
            }
            b.beginPath();
            e.renderTicks(a, b, d, c);
            e.renderAxisLine(a, b, d, c);
            e.renderGridLines(a, b, d, c);
            e.renderLimits();
            b.stroke()
        }
    }
});
Ext.define("Ext.chart.axis.segmenter.Segmenter", {
    config: {axis: null}, constructor: function (a) {
        this.initConfig(a)
    }, renderer: function (b, a) {
        return String(b)
    }, from: function (a) {
        return a
    }, diff: Ext.emptyFn, align: Ext.emptyFn, add: Ext.emptyFn, preferredStep: Ext.emptyFn
});
Ext.define("Ext.chart.axis.segmenter.Names", {
    extend: "Ext.chart.axis.segmenter.Segmenter",
    alias: "segmenter.names",
    renderer: function (b, a) {
        return b
    },
    diff: function (b, a, c) {
        return Math.floor(a - b)
    },
    align: function (c, b, a) {
        return Math.floor(c)
    },
    add: function (c, b, a) {
        return c + b
    },
    preferredStep: function (c, a, b, d) {
        return {unit: 1, step: 1}
    }
});
Ext.define("Ext.chart.axis.segmenter.Numeric", {
    extend: "Ext.chart.axis.segmenter.Segmenter",
    alias: "segmenter.numeric",
    isNumeric: true,
    renderer: function (b, a) {
        return b.toFixed(Math.max(0, a.majorTicks.unit.fixes))
    },
    diff: function (b, a, c) {
        return Math.floor((a - b) / c.scale)
    },
    align: function (c, b, a) {
        return Math.floor(c / (a.scale * b)) * a.scale * b
    },
    add: function (c, b, a) {
        return c + b * a.scale
    },
    preferredStep: function (c, a) {
        var b = Math.floor(Math.log(a) * Math.LOG10E), d = Math.pow(10, b);
        a /= d;
        if (a < 2) {
            a = 2
        } else {
            if (a < 5) {
                a = 5
            } else {
                if (a < 10) {
                    a = 10;
                    b++
                }
            }
        }
        return {unit: {fixes: -b, scale: d}, step: a}
    },
    exactStep: function (c, a) {
        var b = Math.floor(Math.log(a) * Math.LOG10E), d = Math.pow(10, b);
        return {unit: {fixes: -b + (a % d === 0 ? 0 : 1), scale: 1}, step: a}
    },
    adjustByMajorUnit: function (e, g, c) {
        var d = c[0], b = c[1], a = e * g, f = d % a;
        if (f !== 0) {
            c[0] = d - f + (d < 0 ? -a : 0)
        }
        f = b % a;
        if (f !== 0) {
            c[1] = b - f + (b > 0 ? a : 0)
        }
    }
});
Ext.define("Ext.chart.axis.segmenter.Time", {
    extend: "Ext.chart.axis.segmenter.Segmenter",
    alias: "segmenter.time",
    config: {step: null},
    renderer: function (c, b) {
        var a = Ext.Date;
        switch (b.majorTicks.unit) {
            case"y":
                return a.format(c, "Y");
            case"mo":
                return a.format(c, "Y-m");
            case"d":
                return a.format(c, "Y-m-d")
        }
        return a.format(c, "Y-m-d\nH:i:s")
    },
    from: function (a) {
        return new Date(a)
    },
    diff: function (c, a, d) {
        var b = Ext.Date;
        if (isFinite(c)) {
            c = new Date(c)
        }
        if (isFinite(a)) {
            a = new Date(a)
        }
        return b.diff(c, a, d)
    },
    align: function (a, c, b) {
        if (b === "d" && c >= 7) {
            a = Ext.Date.align(a, "d", c);
            a.setDate(a.getDate() - a.getDay() + 1);
            return a
        } else {
            return Ext.Date.align(a, b, c)
        }
    },
    add: function (c, b, a) {
        return Ext.Date.add(new Date(c), a, b)
    },
    preferredStep: function (b, e) {
        if (this.getStep()) {
            return this.getStep()
        }
        var h = new Date(+b), k = new Date(+b + Math.ceil(e)), l = Ext.Date, d = [[l.YEAR, 1, 2, 5, 10, 20, 50, 100, 200, 500], [l.MONTH, 1, 3, 6], [l.DAY, 1, 7, 14], [l.HOUR, 1, 6, 12], [l.MINUTE, 1, 5, 15, 30], [l.SECOND, 1, 5, 15, 30], [l.MILLI, 1, 2, 5, 10, 20, 50, 100, 200, 500]], m;
        for (var c = 0; c < d.length; c++) {
            var g = d[c][0], f = this.diff(h, k, g);
            if (f > 0) {
                for (var a = 1; a < d[c].length; a++) {
                    if (f <= d[c][a]) {
                        m = {unit: g, step: d[c][a]};
                        break
                    }
                }
                if (!m) {
                    c--;
                    m = {unit: d[c][0], step: 1}
                }
                break
            }
        }
        if (!m) {
            m = {unit: l.DAY, step: 1}
        }
        return m
    }
});
Ext.define("Ext.chart.axis.layout.Layout", {
    mixins: {observable: "Ext.mixin.Observable"},
    config: {axis: null},
    constructor: function (a) {
        this.mixins.observable.constructor.call(this, a)
    },
    processData: function (b) {
        var e = this, c = e.getAxis(), f = c.getDirection(), g = c.boundSeries, a, d;
        if (b) {
            b["coordinate" + f]()
        } else {
            for (a = 0, d = g.length; a < d; a++) {
                g[a]["coordinate" + f]()
            }
        }
    },
    calculateMajorTicks: function (a) {
        var f = this, e = a.attr, d = e.max - e.min, i = d / Math.max(1, e.length) * (e.visibleMax - e.visibleMin), h = e.min + d * e.visibleMin, b = e.min + d * e.visibleMax, g = e.estStepSize * i, c = f.snapEnds(a, e.min, e.max, g);
        if (c) {
            f.trimByRange(a, c, h, b);
            a.majorTicks = c
        }
    },
    calculateMinorTicks: function (a) {
        if (this.snapMinorEnds) {
            a.minorTicks = this.snapMinorEnds(a)
        }
    },
    calculateLayout: function (b) {
        var c = this, a = b.attr;
        if (a.length === 0) {
            return null
        }
        if (a.majorTicks) {
            c.calculateMajorTicks(b);
            if (a.minorTicks) {
                c.calculateMinorTicks(b)
            }
        }
    },
    snapEnds: Ext.emptyFn,
    trimByRange: function (b, f, i, a) {
        var g = b.segmenter, j = f.unit, h = g.diff(f.from, i, j), d = g.diff(f.from, a, j), c = Math.max(0, Math.ceil(h / f.step)), e = Math.min(f.steps, Math.floor(d / f.step));
        if (e < f.steps) {
            f.to = g.add(f.from, e * f.step, j)
        }
        if (f.max > a) {
            f.max = f.to
        }
        if (f.from < i) {
            f.from = g.add(f.from, c * f.step, j);
            while (f.from < i) {
                c++;
                f.from = g.add(f.from, f.step, j)
            }
        }
        if (f.min < i) {
            f.min = f.from
        }
        f.steps = e - c
    }
});
Ext.define("Ext.chart.axis.layout.Discrete", {
    extend: "Ext.chart.axis.layout.Layout",
    alias: "axisLayout.discrete",
    isDiscrete: true,
    processData: function () {
        var f = this, d = f.getAxis(), c = d.boundSeries, g = d.getDirection(), b, e, a;
        this.labels = [];
        this.labelMap = {};
        for (b = 0, e = c.length; b < e; b++) {
            a = c[b];
            if (a["get" + g + "Axis"]() === d) {
                a["coordinate" + g]()
            }
        }
        d.getSprites()[0].setAttributes({data: this.labels});
        this.fireEvent("datachange", this.labels)
    },
    calculateLayout: function (a) {
        a.data = this.labels;
        this.callParent([a])
    },
    calculateMajorTicks: function (a) {
        var g = this, f = a.attr, d = a.data, e = f.max - f.min, j = e / Math.max(1, f.length) * (f.visibleMax - f.visibleMin), i = f.min + e * f.visibleMin, b = f.min + e * f.visibleMax, h = f.estStepSize * j;
        var c = g.snapEnds(a, Math.max(0, f.min), Math.min(f.max, d.length - 1), h);
        if (c) {
            g.trimByRange(a, c, i, b);
            a.majorTicks = c
        }
    },
    snapEnds: function (e, d, a, b) {
        b = Math.ceil(b);
        var c = Math.floor((a - d) / b), f = e.data;
        return {
            min: d, max: a, from: d, to: c * b + d, step: b, steps: c, unit: 1, getLabel: function (g) {
                return f[this.from + this.step * g]
            }, get: function (g) {
                return this.from + this.step * g
            }
        }
    },
    trimByRange: function (b, f, h, a) {
        var i = f.unit, g = Math.ceil((h - f.from) / i) * i, d = Math.floor((a - f.from) / i) * i, c = Math.max(0, Math.ceil(g / f.step)), e = Math.min(f.steps, Math.floor(d / f.step));
        if (e < f.steps) {
            f.to = e
        }
        if (f.max > a) {
            f.max = f.to
        }
        if (f.from < h && f.step > 0) {
            f.from = f.from + c * f.step * i;
            while (f.from < h) {
                c++;
                f.from += f.step * i
            }
        }
        if (f.min < h) {
            f.min = f.from
        }
        f.steps = e - c
    },
    getCoordFor: function (c, d, a, b) {
        this.labels.push(c);
        return this.labels.length - 1
    }
});
Ext.define("Ext.chart.axis.layout.CombineDuplicate", {
    extend: "Ext.chart.axis.layout.Discrete",
    alias: "axisLayout.combineDuplicate",
    getCoordFor: function (d, e, b, c) {
        if (!(d in this.labelMap)) {
            var a = this.labelMap[d] = this.labels.length;
            this.labels.push(d);
            return a
        }
        return this.labelMap[d]
    }
});
Ext.define("Ext.chart.axis.layout.Continuous", {
    extend: "Ext.chart.axis.layout.Layout",
    alias: "axisLayout.continuous",
    config: {adjustMinimumByMajorUnit: false, adjustMaximumByMajorUnit: false},
    getCoordFor: function (c, d, a, b) {
        return +c
    },
    snapEnds: function (a, d, i, h) {
        var f = a.segmenter, c = this.getAxis(), l = c.getMajorTickSteps(), e = l && f.exactStep ? f.exactStep(d, (i - d) / l) : f.preferredStep(d, h), k = e.unit, b = e.step, j = f.align(d, b, k), g = f.diff(d, i, k) + 1;
        return {
            min: f.from(d),
            max: f.from(i),
            from: j,
            to: f.add(j, g * b, k),
            step: b,
            steps: g,
            unit: k,
            get: function (m) {
                return f.add(this.from, this.step * m, k)
            }
        }
    },
    snapMinorEnds: function (a) {
        var e = a.majorTicks, m = this.getAxis().getMinorTickSteps(), f = a.segmenter, d = e.min, i = e.max, k = e.from, l = e.unit, b = e.step / m, n = b * l.scale, j = k - d, c = Math.floor(j / n), h = c + Math.floor((i - e.to) / n) + 1, g = e.steps * m + h;
        return {
            min: d, max: i, from: d + j % n, to: f.add(k, g * b, l), step: b, steps: g, unit: l, get: function (o) {
                return (o % m + c + 1 !== 0) ? f.add(this.from, this.step * o, l) : null
            }
        }
    }
});
Ext.define("Ext.chart.axis.Axis", {
    xtype: "axis",
    mixins: {observable: "Ext.mixin.Observable"},
    requires: ["Ext.chart.axis.sprite.Axis", "Ext.chart.axis.segmenter.*", "Ext.chart.axis.layout.*"],
    config: {
        position: "bottom",
        fields: [],
        label: undefined,
        grid: false,
        limits: null,
        renderer: null,
        chart: null,
        style: null,
        margin: 0,
        titleMargin: 4,
        background: null,
        minimum: NaN,
        maximum: NaN,
        reconcileRange: false,
        minZoom: 1,
        maxZoom: 10000,
        layout: "continuous",
        segmenter: "numeric",
        hidden: false,
        majorTickSteps: 0,
        minorTickSteps: 0,
        adjustByMajorUnit: true,
        title: null,
        increment: 0.5,
        length: 0,
        center: null,
        radius: null,
        totalAngle: Math.PI,
        rotation: null,
        labelInSpan: null,
        visibleRange: [0, 1],
        needHighPrecision: false,
        linkedTo: null,
        floating: null
    },
    titleOffset: 0,
    animating: 0,
    prevMin: 0,
    prevMax: 1,
    boundSeries: [],
    sprites: null,
    surface: null,
    range: null,
    xValues: [],
    yValues: [],
    masterAxis: null,
    applyRotation: function (b) {
        var a = Math.PI * 2;
        return (b % a + Math.PI) % a - Math.PI
    },
    updateRotation: function (b) {
        var c = this.getSprites(), a = this.getPosition();
        if (!this.getHidden() && a === "angular" && c[0]) {
            c[0].setAttributes({baseRotation: b})
        }
    },
    applyTitle: function (c, b) {
        var a;
        if (Ext.isString(c)) {
            c = {text: c}
        }
        if (!b) {
            b = Ext.create("sprite.text", c);
            if ((a = this.getSurface())) {
                a.add(b)
            }
        } else {
            b.setAttributes(c)
        }
        return b
    },
    applyFloating: function (b, a) {
        if (b === null) {
            b = {value: null, alongAxis: null}
        } else {
            if (Ext.isNumber(b)) {
                b = {value: b, alongAxis: null}
            }
        }
        if (Ext.isObject(b)) {
            if (a && a.alongAxis) {
                delete this.getChart().getAxis(a.alongAxis).floatingAxes[this.getId()]
            }
            return b
        }
        return a
    },
    constructor: function (a) {
        var b = this, c;
        b.sprites = [];
        b.labels = [];
        b.floatingAxes = {};
        if (a.position === "angular") {
            a.style = a.style || {};
            a.style.estStepSize = 1
        }
        if ("id" in a) {
            c = a.id
        } else {
            if ("id" in b.config) {
                c = b.config.id
            } else {
                c = b.getId()
            }
        }
        b.id = c;
        b.setId(c);
        b.mixins.observable.constructor.apply(b, arguments);
        Ext.ComponentManager.register(b)
    },
    getAlignment: function () {
        switch (this.getPosition()) {
            case"left":
            case"right":
                return "vertical";
            case"top":
            case"bottom":
                return "horizontal";
            case"radial":
                return "radial";
            case"angular":
                return "angular"
        }
    },
    getGridAlignment: function () {
        switch (this.getPosition()) {
            case"left":
            case"right":
                return "horizontal";
            case"top":
            case"bottom":
                return "vertical";
            case"radial":
                return "circular";
            case"angular":
                return "radial"
        }
    },
    getSurface: function () {
        var e = this, d = e.getChart();
        if (d && !e.surface) {
            var b = e.surface = d.getSurface(e.getId(), "axis"), c = e.gridSurface = d.getSurface("main"), a = e.getSprites()[0], f = e.getGridAlignment();
            c.waitFor(b);
            e.getGrid();
            if (e.getLimits() && f) {
                f = f.replace("3d", "");
                e.limits = {
                    surface: d.getSurface("overlay"),
                    lines: new Ext.chart.Markers(),
                    titles: new Ext.draw.sprite.Instancing()
                };
                e.limits.lines.setTemplate({xclass: "grid." + f});
                e.limits.lines.getTemplate().setAttributes({strokeStyle: "black"});
                e.limits.surface.add(e.limits.lines);
                a.bindMarker(f + "-limit-lines", e.limits.lines);
                e.limitTitleTpl = new Ext.draw.sprite.Text();
                e.limits.titles.setTemplate(e.limitTitleTpl);
                e.limits.surface.add(e.limits.titles);
                d.on("redraw", e.renderLimits, e)
            }
        }
        return e.surface
    },
    applyGrid: function (a) {
        if (a === true) {
            return {}
        }
        return a
    },
    updateGrid: function (b) {
        var e = this, d = e.getChart();
        if (!d) {
            e.on({chartattached: Ext.bind(e.updateGrid, e, [b]), single: true});
            return
        }
        var c = e.gridSurface, a = e.getSprites()[0], f = e.getGridAlignment(), g;
        if (b) {
            g = e.gridSpriteEven;
            if (!g) {
                g = e.gridSpriteEven = new Ext.chart.Markers();
                g.setTemplate({xclass: "grid." + f});
                c.add(g);
                a.bindMarker(f + "-even", g)
            }
            if (Ext.isObject(b)) {
                g.getTemplate().setAttributes(b);
                if (Ext.isObject(b.even)) {
                    g.getTemplate().setAttributes(b.even)
                }
            }
            g = e.gridSpriteOdd;
            if (!g) {
                g = e.gridSpriteOdd = new Ext.chart.Markers();
                g.setTemplate({xclass: "grid." + f});
                c.add(g);
                a.bindMarker(f + "-odd", g)
            }
            if (Ext.isObject(b)) {
                g.getTemplate().setAttributes(b);
                if (Ext.isObject(b.odd)) {
                    g.getTemplate().setAttributes(b.odd)
                }
            }
        }
    },
    renderLimits: function () {
        this.getSprites()[0].renderLimits()
    },
    getCoordFor: function (c, d, a, b) {
        return this.getLayout().getCoordFor(c, d, a, b)
    },
    applyPosition: function (a) {
        return a.toLowerCase()
    },
    applyLength: function (b, a) {
        return b > 0 ? b : a
    },
    applyLabel: function (b, a) {
        if (!a) {
            a = new Ext.draw.sprite.Text({})
        }
        if (this.limitTitleTpl) {
            this.limitTitleTpl.setAttributes(b)
        }
        a.setAttributes(b);
        return a
    },
    applyLayout: function (b, a) {
        b = Ext.factory(b, null, a, "axisLayout");
        b.setAxis(this);
        return b
    },
    applySegmenter: function (a, b) {
        a = Ext.factory(a, null, b, "segmenter");
        a.setAxis(this);
        return a
    },
    updateMinimum: function () {
        this.range = null
    },
    updateMaximum: function () {
        this.range = null
    },
    hideLabels: function () {
        this.getSprites()[0].setDirty(true);
        this.setLabel({hidden: true})
    },
    showLabels: function () {
        this.getSprites()[0].setDirty(true);
        this.setLabel({hidden: false})
    },
    renderFrame: function () {
        this.getSurface().renderFrame()
    },
    updateChart: function (d, b) {
        var c = this, a;
        if (b) {
            b.un("serieschange", c.onSeriesChange, c);
            c.linkAxis();
            c.fireEvent("chartdetached", b, c)
        }
        if (d) {
            d.on("serieschange", c.onSeriesChange, c);
            c.surface = null;
            a = c.getSurface();
            c.getLabel().setSurface(a);
            a.add(c.getSprites());
            a.add(c.getTitle());
            c.fireEvent("chartattached", d, c)
        }
    },
    applyBackground: function (a) {
        var b = Ext.ClassManager.getByAlias("sprite.rect");
        return b.def.normalize(a)
    },
    processData: function () {
        this.getLayout().processData();
        this.range = null
    },
    getDirection: function () {
        return this.getChart().getDirectionForAxis(this.getPosition())
    },
    isSide: function () {
        var a = this.getPosition();
        return a === "left" || a === "right"
    },
    applyFields: function (a) {
        return Ext.Array.from(a)
    },
    applyVisibleRange: function (a, c) {
        if (a[0] > a[1]) {
            var b = a[0];
            a[0] = a[1];
            a[0] = b
        }
        if (a[1] === a[0]) {
            a[1] += 1 / this.getMaxZoom()
        }
        if (a[1] > a[0] + 1) {
            a[0] = 0;
            a[1] = 1
        } else {
            if (a[0] < 0) {
                a[1] -= a[0];
                a[0] = 0
            } else {
                if (a[1] > 1) {
                    a[0] -= a[1] - 1;
                    a[1] = 1
                }
            }
        }
        if (c && a[0] === c[0] && a[1] === c[1]) {
            return undefined
        }
        return a
    },
    updateVisibleRange: function (a) {
        this.fireEvent("visiblerangechange", this, a)
    },
    onSeriesChange: function (e) {
        var f = this, b = e.getSeries(), j = "get" + f.getDirection() + "Axis", g = [], c, d = b.length, a, h;
        for (c = 0; c < d; c++) {
            if (this === b[c][j]()) {
                g.push(b[c])
            }
        }
        f.boundSeries = g;
        a = f.getLinkedTo();
        h = !Ext.isEmpty(a) && e.getAxis(a);
        if (h) {
            f.linkAxis(h)
        } else {
            f.getLayout().processData()
        }
    },
    linkAxis: function (a) {
        var c = this;

        function b(f, d, e) {
            e.getLayout()[f]("datachange", "onDataChange", d);
            e[f]("rangechange", "onRangeChange", d)
        }

        if (c.masterAxis) {
            b("un", c, c.masterAxis);
            c.masterAxis = null
        }
        if (a) {
            if (a.type !== this.type) {
                throw"Linked axes must be of the same type."
            }
            b("on", c, a);
            c.onDataChange(a.getLayout().labels);
            c.onRangeChange(a, a.range);
            c.setStyle(Ext.apply({}, c.config.style, a.config.style));
            c.setTitle(Ext.apply({}, c.config.title, a.config.title));
            c.setLabel(Ext.apply({}, c.config.label, a.config.label));
            c.masterAxis = a
        }
    },
    onDataChange: function (a) {
        this.getLayout().labels = a
    },
    onRangeChange: function (b, a) {
        this.range = a
    },
    applyRange: function (a) {
        if (!a) {
            return this.dataRange.slice(0)
        } else {
            return [a[0] === null ? this.dataRange[0] : a[0], a[1] === null ? this.dataRange[1] : a[1]]
        }
    },
    getRange: function () {
        var m = this, b = "get" + m.getDirection() + "Range";
        if (m.range) {
            return m.range
        }
        if (!isNaN(m.getMinimum()) && !isNaN(m.getMaximum())) {
            return m.range = [m.getMinimum(), m.getMaximum()]
        }
        var d = Infinity, n = -Infinity, o = m.boundSeries, h = m.getLayout(), l = m.getSegmenter(), p = m.getVisibleRange(), a, j, g, f, e, k;
        for (e = 0, k = o.length; e < k; e++) {
            f = o[e];
            var c = f[b]();
            if (c) {
                if (c[0] < d) {
                    d = c[0]
                }
                if (c[1] > n) {
                    n = c[1]
                }
            }
        }
        if (!isFinite(n)) {
            n = m.prevMax
        }
        if (!isFinite(d)) {
            d = m.prevMin
        }
        if (m.getLabelInSpan() || d === n) {
            n += m.getIncrement();
            d -= m.getIncrement()
        }
        if (!isNaN(m.getMinimum())) {
            d = m.getMinimum()
        } else {
            m.prevMin = d
        }
        if (!isNaN(m.getMaximum())) {
            n = m.getMaximum()
        } else {
            m.prevMax = n
        }
        m.range = [Ext.Number.correctFloat(d), Ext.Number.correctFloat(n)];
        if (m.getReconcileRange()) {
            m.reconcileRange()
        }
        if (m.getAdjustByMajorUnit() && l.adjustByMajorUnit && !m.getMajorTickSteps()) {
            j = Ext.Object.chain(m.getSprites()[0].attr);
            j.min = m.range[0];
            j.max = m.range[1];
            j.visibleMin = p[0];
            j.visibleMax = p[1];
            a = {attr: j, segmenter: l};
            h.calculateLayout(a);
            g = a.majorTicks;
            if (g) {
                l.adjustByMajorUnit(g.step, g.unit.scale, m.range);
                j.min = m.range[0];
                j.max = m.range[1];
                delete a.majorTicks;
                h.calculateLayout(a);
                g = a.majorTicks;
                l.adjustByMajorUnit(g.step, g.unit.scale, m.range)
            } else {
                if (!m.hasClearRangePending) {
                    m.hasClearRangePending = true;
                    m.getChart().on("layout", "clearRange", m)
                }
            }
        }
        m.fireEvent("rangechange", m, m.range);
        return m.range
    },
    clearRange: function () {
        delete this.hasClearRangePending;
        this.range = null
    },
    reconcileRange: function () {
        var e = this, g = e.getChart().getAxes(), f = e.getDirection(), b, d, c, a;
        if (!g) {
            return
        }
        for (b = 0, d = g.length; b < d; b++) {
            c = g[b];
            a = c.getRange();
            if (c === e || c.getDirection() !== f || !a || !c.getReconcileRange()) {
                continue
            }
            if (a[0] < e.range[0]) {
                e.range[0] = a[0]
            }
            if (a[1] > e.range[1]) {
                e.range[1] = a[1]
            }
        }
    },
    applyStyle: function (c, b) {
        var a = Ext.ClassManager.getByAlias("sprite." + this.seriesType);
        if (a && a.def) {
            c = a.def.normalize(c)
        }
        b = Ext.apply(b || {}, c);
        return b
    },
    themeOnlyIfConfigured: {grid: true},
    updateTheme: function (d) {
        var i = this, k = d.getAxis(), e = i.getPosition(), o = i.getInitialConfig(), c = i.defaultConfig, g = i.getConfigurator().configs, a = k.defaults, n = k[e], h = i.themeOnlyIfConfigured, l, j, p, b, m, f;
        k = Ext.merge({}, a, n);
        for (l in k) {
            j = k[l];
            f = g[l];
            if (j !== null && j !== undefined && f) {
                m = o[l];
                p = Ext.isObject(j);
                b = m === c[l];
                if (p) {
                    if (b && h[l]) {
                        continue
                    }
                    j = Ext.merge({}, j, m)
                }
                if (b || p) {
                    i[f.names.set](j)
                }
            }
        }
    },
    updateCenter: function (b) {
        var e = this.getSprites(), a = e[0], d = b[0], c = b[1];
        if (a) {
            a.setAttributes({centerX: d, centerY: c})
        }
        if (this.gridSpriteEven) {
            this.gridSpriteEven.getTemplate().setAttributes({
                translationX: d,
                translationY: c,
                rotationCenterX: d,
                rotationCenterY: c
            })
        }
        if (this.gridSpriteOdd) {
            this.gridSpriteOdd.getTemplate().setAttributes({
                translationX: d,
                translationY: c,
                rotationCenterX: d,
                rotationCenterY: c
            })
        }
    },
    getSprites: function () {
        if (!this.getChart()) {
            return
        }
        var i = this, e = i.masterAxis ? i.masterAxis.range : i.getRange(), f = i.getPosition(), g = i.getChart(), c = g.getAnimation(), d, a, b = i.getLength(), h = i.superclass;
        if (c === false) {
            c = {duration: 0}
        }
        if (e) {
            a = Ext.applyIf({
                position: f,
                axis: i,
                min: e[0],
                max: e[1],
                length: b,
                grid: i.getGrid(),
                hidden: i.getHidden(),
                titleOffset: i.titleOffset,
                layout: i.getLayout(),
                segmenter: i.getSegmenter(),
                totalAngle: i.getTotalAngle(),
                label: i.getLabel()
            }, i.getStyle());
            if (!i.sprites.length) {
                while (!h.xtype) {
                    h = h.superclass
                }
                d = Ext.create("sprite." + h.xtype, a);
                d.fx.setCustomDurations({baseRotation: 0});
                d.fx.on("animationstart", "onAnimationStart", i);
                d.fx.on("animationend", "onAnimationEnd", i);
                d.setLayout(i.getLayout());
                d.setSegmenter(i.getSegmenter());
                d.setLabel(i.getLabel());
                i.sprites.push(d);
                i.updateTitleSprite()
            } else {
                d = i.sprites[0];
                d.fx.setConfig(c);
                d.setAttributes(a)
            }
            if (i.getRenderer()) {
                d.setRenderer(i.getRenderer())
            }
        }
        return i.sprites
    },
    updateTitleSprite: function () {
        if (!this.sprites[0] || isNaN(this.getLength())) {
            return
        }
        var f = this, h = this.sprites[0].thickness, a = f.getSurface(), g = f.getTitle(), e = f.getPosition(), c = f.getMargin(), i = f.getTitleMargin(), b = f.getLength(), d = a.roundPixel(b / 2);
        if (g) {
            switch (e) {
                case"top":
                    g.setAttributes({x: d, y: c + i / 2, textBaseline: "top", textAlign: "center"}, true, true);
                    g.applyTransformations();
                    f.titleOffset = g.getBBox().height + i;
                    break;
                case"bottom":
                    g.setAttributes({x: d, y: h + i / 2, textBaseline: "top", textAlign: "center"}, true, true);
                    g.applyTransformations();
                    f.titleOffset = g.getBBox().height + i;
                    break;
                case"left":
                    g.setAttributes({
                        x: c + i / 2,
                        y: d,
                        textBaseline: "top",
                        textAlign: "center",
                        rotationCenterX: c + i / 2,
                        rotationCenterY: d,
                        rotationRads: -Math.PI / 2
                    }, true, true);
                    g.applyTransformations();
                    f.titleOffset = g.getBBox().width + i;
                    break;
                case"right":
                    g.setAttributes({
                        x: h - c + i / 2,
                        y: d,
                        textBaseline: "bottom",
                        textAlign: "center",
                        rotationCenterX: h + i / 2,
                        rotationCenterY: d,
                        rotationRads: Math.PI / 2
                    }, true, true);
                    g.applyTransformations();
                    f.titleOffset = g.getBBox().width + i;
                    break
            }
        }
    },
    onThicknessChanged: function () {
        this.getChart().onThicknessChanged()
    },
    getThickness: function () {
        if (this.getHidden()) {
            return 0
        }
        return (this.sprites[0] && this.sprites[0].thickness || 1) + this.titleOffset + this.getMargin()
    },
    onAnimationStart: function () {
        this.animating++;
        if (this.animating === 1) {
            this.fireEvent("animationstart", this)
        }
    },
    onAnimationEnd: function () {
        this.animating--;
        if (this.animating === 0) {
            this.fireEvent("animationend", this)
        }
    },
    getItemId: function () {
        return this.getId()
    },
    getAncestorIds: function () {
        return [this.getChart().getId()]
    },
    isXType: function (a) {
        return a === "axis"
    },
    destroy: function () {
        var a = this.getChart();
        if (a) {
            a.un("redraw", this.renderLimits, this)
        }
        this.linkAxis();
        Ext.ComponentManager.unregister(this);
        this.callParent()
    }
});
Ext.define("Ext.chart.LegendBase", {
    extend: "Ext.view.View",
    config: {
        tpl: ['<div class="', Ext.baseCSSPrefix, 'legend-container">', '<tpl for=".">', '<div class="', Ext.baseCSSPrefix, 'legend-item">', "<span ", 'class="', Ext.baseCSSPrefix, "legend-item-marker {[ values.disabled ? Ext.baseCSSPrefix + 'legend-inactive' : '' ]}\" ", 'style="background:{mark};">', "</span>{name}", "</div>", "</tpl>", "</div>"],
        nodeContainerSelector: "div." + Ext.baseCSSPrefix + "legend-container",
        itemSelector: "div." + Ext.baseCSSPrefix + "legend-item",
        docked: "bottom"
    },
    setDocked: function (c) {
        var a = this.ownerCt, b;
        this.docked = c;
        switch (c) {
            case"top":
            case"bottom":
                this.addCls("x-horizontal");
                b = "hbox";
                break;
            case"left":
            case"right":
                this.removeCls("x-horizontal");
                b = "vbox";
                break
        }
        if (a) {
            a.setDocked(c)
        }
    },
    setStore: function (a) {
        this.bindStore(a)
    },
    clearViewEl: function () {
        this.callParent(arguments);
        Ext.removeNode(this.getNodeContainer())
    },
    onItemClick: function (a, c, b, d) {
        this.callParent(arguments);
        this.toggleItem(b)
    }
});
Ext.define("Ext.chart.Legend", {
    xtype: "legend",
    extend: "Ext.chart.LegendBase",
    config: {baseCls: "x-legend", padding: 5, rect: null, disableSelection: true, toggleable: true},
    toggleItem: function (c) {
        if (!this.getToggleable()) {
            return
        }
        var b = this.getStore(), h = 0, e, g = true, d, f, a;
        if (b) {
            f = b.getCount();
            for (d = 0; d < f; d++) {
                a = b.getAt(d);
                if (a.get("disabled")) {
                    h++
                }
            }
            g = f - h > 1;
            a = b.getAt(c);
            if (a) {
                e = a.get("disabled");
                if (e || g) {
                    a.set("disabled", !e)
                }
            }
        }
    }
});
Ext.define("Ext.chart.AbstractChart", {
    extend: "Ext.draw.Container",
    requires: ["Ext.chart.theme.Default", "Ext.chart.series.Series", "Ext.chart.interactions.Abstract", "Ext.chart.axis.Axis", "Ext.data.StoreManager", "Ext.chart.Legend", "Ext.data.Store"],
    defaultBindProperty: "store",
    version: "2.5.0",
    config: {
        store: "ext-empty-store",
        theme: "default",
        style: null,
        shadow: false,
        animation: !Ext.isIE8,
        series: [],
        axes: [],
        legend: null,
        colors: null,
        insetPadding: {top: 10, left: 10, right: 10, bottom: 10},
        background: null,
        interactions: [],
        mainRect: null,
        resizeHandler: null,
        highlightItem: null
    },
    resizing: 0,
    animationSuspended: 0,
    surfaceZIndexes: {background: 0, main: 1, grid: 2, series: 3, axis: 4, chart: 5, overlay: 6, events: 7},
    animating: 0,
    layoutSuspended: 0,
    applyAnimation: function (a, b) {
        if (!a) {
            a = {duration: 0}
        } else {
            if (a === true) {
                a = {easing: "easeInOut", duration: 500}
            }
        }
        return b ? Ext.apply({}, a, b) : a
    },
    applyInsetPadding: function (b, a) {
        if (!Ext.isObject(b)) {
            return Ext.util.Format.parseBox(b)
        } else {
            if (!a) {
                return b
            } else {
                return Ext.apply(a, b)
            }
        }
    },
    suspendAnimation: function () {
        this.animationSuspended++;
        if (this.animationSuspended === 1) {
            var b = this.getSeries(), a = -1, c = b.length;
            while (++a < c) {
                b[a].setAnimation(this.getAnimation())
            }
        }
    },
    resumeAnimation: function () {
        this.animationSuspended--;
        if (this.animationSuspended === 0) {
            var b = this.getSeries(), a = -1, c = b.length;
            while (++a < c) {
                b[a].setAnimation(this.getAnimation())
            }
        }
    },
    suspendChartLayout: function () {
        this.layoutSuspended++;
        if (this.layoutSuspended === 1) {
            if (this.scheduledLayoutId) {
                this.layoutInSuspension = true;
                this.cancelLayout()
            } else {
                this.layoutInSuspension = false
            }
        }
    },
    resumeChartLayout: function () {
        this.layoutSuspended--;
        if (this.layoutSuspended === 0) {
            if (this.layoutInSuspension) {
                this.scheduleLayout()
            }
        }
    },
    cancelLayout: function () {
        if (this.scheduledLayoutId) {
            Ext.draw.Animator.cancel(this.scheduledLayoutId);
            this.scheduledLayoutId = null
        }
    },
    scheduleLayout: function () {
        var a = this;
        if (a.rendered && !a.scheduledLayoutId) {
            a.scheduledLayoutId = Ext.draw.Animator.schedule("doScheduleLayout", a)
        }
    },
    doScheduleLayout: function () {
        if (this.layoutSuspended) {
            this.layoutInSuspension = true
        } else {
            this.performLayout()
        }
    },
    getAnimation: function () {
        if (this.resizing || this.animationSuspended) {
            return {duration: 0}
        } else {
            return this.callParent()
        }
    },
    constructor: function (a) {
        var b = this;
        b.itemListeners = {};
        b.surfaceMap = {};
        b.isInitializing = true;
        b.suspendChartLayout();
        b.callParent(arguments);
        delete b.isInitializing;
        b.getSurface("main");
        b.getSurface("chart").setFlipRtlText(b.getInherited().rtl);
        b.getSurface("overlay").waitFor(b.getSurface("series"));
        b.resumeChartLayout()
    },
    applySprites: function (b) {
        var a = this.getSurface("chart");
        b = Ext.Array.from(b);
        a.removeAll(true);
        a.add(b)
    },
    initItems: function () {
        var a = this.items, b, d, c;
        if (a && !a.isMixedCollection) {
            this.items = [];
            a = Ext.Array.from(a);
            for (b = 0, d = a.length; b < d; b++) {
                c = a[b];
                if (c.type) {
                    Ext.Error.raise("To add custom sprites to the chart use the 'sprites' config.")
                } else {
                    this.items.push(c)
                }
            }
        }
        this.callParent()
    },
    applyBackground: function (c, e) {
        var b = this.getSurface("background"), d, a, f;
        if (c) {
            if (e) {
                d = e.attr.width;
                a = e.attr.height;
                f = e.type === (c.type || "rect")
            }
            if (c.isSprite) {
                e = c
            } else {
                if (c.type === "image" && Ext.isString(c.src)) {
                    if (f) {
                        e.setAttributes({src: c.src})
                    } else {
                        b.remove(e, true);
                        e = b.add(c)
                    }
                } else {
                    if (f) {
                        e.setAttributes({fillStyle: c})
                    } else {
                        b.remove(e, true);
                        e = b.add({
                            type: "rect",
                            fillStyle: c,
                            fx: {customDurations: {x: 0, y: 0, width: 0, height: 0}}
                        })
                    }
                }
            }
        }
        if (d && a) {
            e.setAttributes({width: d, height: a})
        }
        e.fx.setConfig(this.getAnimation());
        return e
    },
    getLegendStore: function () {
        return this.legendStore
    },
    refreshLegendStore: function () {
        if (this.getLegendStore()) {
            var d, e, c = this.getSeries(), b, a = [];
            if (c) {
                for (d = 0, e = c.length; d < e; d++) {
                    b = c[d];
                    if (b.getShowInLegend()) {
                        b.provideLegendInfo(a)
                    }
                }
            }
            this.getLegendStore().setData(a)
        }
    },
    resetLegendStore: function () {
        if (this.getLegendStore()) {
            var d = this.getLegendStore().getData().items, b, c = d.length, a;
            for (b = 0; b < c; b++) {
                a = d[b];
                a.beginEdit();
                a.set("disabled", false);
                a.commit()
            }
        }
    },
    onUpdateLegendStore: function (b, a) {
        var d = this.getSeries(), c;
        if (a && d) {
            c = d.map[a.get("series")];
            if (c) {
                c.setHiddenByIndex(a.get("index"), a.get("disabled"));
                this.redraw()
            }
        }
    },
    resizeHandler: function (a) {
        this.scheduleLayout();
        return false
    },
    applyMainRect: function (a, b) {
        if (!b) {
            return a
        }
        this.getSeries();
        this.getAxes();
        if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]) {
            return b
        } else {
            return a
        }
    },
    getAxis: function (a) {
        if (a instanceof Ext.chart.axis.Axis) {
            return a
        } else {
            if (Ext.isNumber(a)) {
                return this.getAxes()[a]
            } else {
                if (Ext.isString(a)) {
                    return Ext.ComponentMgr.get(a)
                } else {
                    return null
                }
            }
        }
    },
    getSurface: function (b, c) {
        b = b || "main";
        c = c || b;
        var d = this, a = this.callParent([b]), e = d.surfaceZIndexes;
        if (c in e) {
            a.element.setStyle("zIndex", e[c])
        }
        if (!d.surfaceMap[c]) {
            d.surfaceMap[c] = []
        }
        if (Ext.Array.indexOf(d.surfaceMap[c], (a)) < 0) {
            a.type = c;
            d.surfaceMap[c].push(a)
        }
        return a
    },
    applyAxes: function (b, k) {
        this.resizing++;
        this.getStore();
        if (!k) {
            k = [];
            k.map = {}
        }
        var l = [], g, h, c, d, e, a, f = {left: "right", right: "left"}, j = k.map;
        l.map = {};
        b = Ext.Array.from(b, true);
        for (g = 0, h = b.length; g < h; g++) {
            c = Ext.Object.chain(b[g]);
            if (!c) {
                continue
            }
            e = c.linkedTo;
            a = c.id;
            if (Ext.isNumber(e)) {
                c = Ext.merge({}, b[e], c)
            } else {
                if (Ext.isString(e)) {
                    Ext.Array.each(b, function (i) {
                        if (i.id === c.linkedTo) {
                            c = Ext.merge({}, i, c);
                            return false
                        }
                    })
                }
            }
            c.id = a;
            if (this.getInherited().rtl) {
                c.position = f[c.position] || c.position
            }
            a = c.getId && c.getId() || c.id;
            c = Ext.factory(c, null, d = j[a], "axis");
            if (c) {
                c.setChart(this);
                l.push(c);
                l.map[c.getId()] = c;
                if (!d) {
                    c.on("animationstart", "onAnimationStart", this);
                    c.on("animationend", "onAnimationEnd", this)
                }
            }
        }
        for (g in j) {
            if (!l.map[g]) {
                j[g].destroy()
            }
        }
        this.resizing--;
        return l
    },
    updateAxes: function (a) {
        this.scheduleLayout()
    },
    circularCopyArray: function (e, f, d) {
        var c = [], b, a = e && e.length;
        if (a) {
            for (b = 0; b < d; b++) {
                c.push(e[(f + b) % a])
            }
        }
        return c
    },
    circularCopyObject: function (f, g, d) {
        var c = this, b, e, a = {};
        if (d) {
            for (b in f) {
                if (f.hasOwnProperty(b)) {
                    e = f[b];
                    if (Ext.isArray(e)) {
                        a[b] = c.circularCopyArray(e, g, d)
                    } else {
                        a[b] = e
                    }
                }
            }
        }
        return a
    },
    getColors: function () {
        var b = this, a = b.config.colors, c = b.getTheme();
        if (Ext.isArray(a) && a.length > 0) {
            a = b.applyColors(a)
        }
        return a || (c && c.getColors())
    },
    applyColors: function (a) {
        a = Ext.Array.map(a, function (b) {
            if (Ext.isString(b)) {
                return b
            } else {
                return b.toString()
            }
        });
        return a
    },
    updateColors: function (c) {
        var k = this, f = k.getTheme(), a = c || (f && f.getColors()), m = a.length, l = 0, g = k.getSeries(), d = g && g.length, e, j, b, h;
        if (m) {
            for (e = 0; e < d; e++) {
                j = g[e];
                h = j.themeColorCount();
                b = k.circularCopyArray(a, l, h);
                l += h;
                j.updateChartColors(b)
            }
        }
        k.refreshLegendStore()
    },
    applyTheme: function (a) {
        if (a && a.isTheme) {
            return a
        }
        return Ext.Factory.chartTheme(a)
    },
    updateTheme: function (d) {
        var k = this, h = k.getAxes(), e = k.getSeries(), a = k.getColors(), j, b, m = 0, g = 0, f, l, c;
        k.updateChartTheme(d);
        for (c = 0; c < h.length; c++) {
            h[c].updateTheme(d)
        }
        for (c = 0; c < e.length; c++) {
            e[c].updateTheme(d);
            j = e[c];
            b = {};
            if (d.getSeriesThemes) {
                l = j.themeColorCount();
                b.subStyle = k.circularCopyObject(d.getSeriesThemes(), m, l);
                m += l
            } else {
                b.subStyle = {}
            }
            if (d.getMarkerThemes) {
                f = j.themeMarkerCount();
                b.markerSubStyle = k.circularCopyObject(d.getMarkerThemes(), g, f);
                g += f
            } else {
                b.markerSubStyle = {}
            }
        }
        k.updateSpriteTheme(d);
        k.updateColors(a)
    },
    themeOnlyIfConfigured: {},
    updateChartTheme: function (c) {
        var i = this, k = c.getChart(), n = i.getInitialConfig(), b = i.defaultConfig, e = i.getConfigurator().configs, f = k.defaults, g = k[i.xtype], h = i.themeOnlyIfConfigured, l, j, o, a, m, d;
        k = Ext.merge({}, f, g);
        for (l in k) {
            j = k[l];
            d = e[l];
            if (j !== null && j !== undefined && d) {
                m = n[l];
                o = Ext.isObject(j);
                a = m === b[l];
                if (o) {
                    if (a && h[l]) {
                        continue
                    }
                    j = Ext.merge({}, j, m)
                }
                if (a || o) {
                    i[d.names.set](j)
                }
            }
        }
    },
    updateSpriteTheme: function (c) {
        var j = this, e = j.getSurface("chart"), h = e.getItems(), m = c.getSprites(), k, a, l, f, d, b, g;
        for (b = 0, g = h.length; b < g; b++) {
            k = h[b];
            a = m[k.type];
            if (a) {
                f = {};
                d = k.type === "text";
                for (l in a) {
                    if (!(l in k.config)) {
                        if (!(d && l.indexOf("font") === 0 && k.config.font)) {
                            f[l] = a[l]
                        }
                    }
                }
                k.setAttributes(f)
            }
        }
    },
    applySeries: function (e, d) {
        var g = this, j = [], h, a, c, f, b;
        g.resizing++;
        g.getAxes();
        if (!d) {
            d = [];
            h = d.map = {}
        }
        j.map = {};
        e = Ext.Array.from(e, true);
        for (c = 0, f = e.length; c < f; c++) {
            b = e[c];
            if (!b) {
                continue
            }
            a = d.map[b.getId && b.getId() || b.id];
            if (b instanceof Ext.chart.series.Series) {
                if (a !== b) {
                    if (a) {
                        a.destroy()
                    }
                }
                b.setChart(g)
            } else {
                if (Ext.isObject(b)) {
                    if (a) {
                        a.setConfig(b);
                        b = a
                    } else {
                        if (Ext.isString(b)) {
                            b = Ext.create(b.xclass || ("series." + b), {chart: g})
                        } else {
                            b.chart = g;
                            b = Ext.create(b.xclass || ("series." + b.type), b)
                        }
                        b.on("animationstart", "onAnimationStart", g);
                        b.on("animationend", "onAnimationEnd", g)
                    }
                }
            }
            j.push(b);
            j.map[b.getId()] = b
        }
        for (c in h) {
            if (!j.map[h[c].getId()]) {
                h[c].destroy()
            }
        }
        g.resizing--;
        return j
    },
    applyLegend: function (b, a) {
        return Ext.factory(b, Ext.chart.Legend, a)
    },
    updateLegend: function (b, a) {
        if (a) {
            a.destroy()
        }
        if (b) {
            this.getItems();
            this.legendStore = new Ext.data.Store({
                autoDestroy: true,
                fields: ["id", "name", "mark", "disabled", "series", "index"]
            });
            b.setStore(this.legendStore);
            this.refreshLegendStore();
            this.legendStore.on("update", "onUpdateLegendStore", this)
        }
    },
    updateSeries: function (b, a) {
        this.resizing++;
        this.fireEvent("serieschange", this, b, a);
        this.refreshLegendStore();
        this.scheduleLayout();
        this.resizing--
    },
    applyInteractions: function (h, d) {
        if (!d) {
            d = [];
            d.map = {}
        }
        var g = this, a = [], c = d.map, e, f, b;
        a.map = {};
        h = Ext.Array.from(h, true);
        for (e = 0, f = h.length; e < f; e++) {
            b = h[e];
            if (!b) {
                continue
            }
            b = Ext.factory(b, null, c[b.getId && b.getId() || b.id], "interaction");
            if (b) {
                b.setChart(g);
                a.push(b);
                a.map[b.getId()] = b
            }
        }
        for (e in c) {
            if (!a.map[c[e]]) {
                c[e].destroy()
            }
        }
        return a
    },
    applyStore: function (a) {
        return a && Ext.StoreManager.lookup(a)
    },
    updateStore: function (a, c) {
        var b = this;
        if (c) {
            c.un({datachanged: "onDataChanged", update: "onDataChanged", scope: b, order: "after"});
            if (c.autoDestroy) {
                c.destroy()
            }
        }
        if (a) {
            a.on({datachanged: "onDataChanged", update: "onDataChanged", scope: b, order: "after"})
        }
        b.fireEvent("storechange", a, c);
        b.onDataChanged()
    },
    redraw: function () {
        this.fireEvent("redraw", this)
    },
    performLayout: function () {
        var d = this, b = d.innerElement.getSize(), c = [0, 0, b.width, b.height], a = d.getBackground();
        d.hasFirstLayout = true;
        d.fireEvent("layout");
        d.cancelLayout();
        d.getSurface("background").setRect(c);
        d.getSurface("chart").setRect(c);
        a.setAttributes({width: b.width, height: b.height})
    },
    getEventXY: function (a) {
        return this.getSurface().getEventXY(a)
    },
    getItemForPoint: function (h, g) {
        var f = this, a = f.getSeries(), e = f.getMainRect(), d = a.length, b = f.hasFirstLayout ? d - 1 : -1, c, j;
        if (!(e && h >= 0 && h <= e[2] && g >= 0 && g <= e[3])) {
            return null
        }
        for (; b >= 0; b--) {
            c = a[b];
            j = c.getItemForPoint(h, g);
            if (j) {
                return j
            }
        }
        return null
    },
    getItemsForPoint: function (h, g) {
        var f = this, a = f.getSeries(), d = a.length, b = f.hasFirstLayout ? d - 1 : -1, e = [], c, j;
        for (; b >= 0; b--) {
            c = a[b];
            j = c.getItemForPoint(h, g);
            if (j) {
                e.push(j)
            }
        }
        return e
    },
    delayThicknessChanged: 0,
    thicknessChanged: false,
    suspendThicknessChanged: function () {
        this.delayThicknessChanged++
    },
    resumeThicknessChanged: function () {
        if (this.delayThicknessChanged > 0) {
            this.delayThicknessChanged--;
            if (this.delayThicknessChanged === 0 && this.thicknessChanged) {
                this.onThicknessChanged()
            }
        }
    },
    onAnimationStart: function () {
        this.fireEvent("animationstart", this)
    },
    onAnimationEnd: function () {
        this.fireEvent("animationend", this)
    },
    onThicknessChanged: function () {
        if (this.delayThicknessChanged === 0) {
            this.thicknessChanged = false;
            this.performLayout()
        } else {
            this.thicknessChanged = true
        }
    },
    onDataChanged: function () {
        var g = this;
        if (g.isInitializing) {
            return
        }
        var f = g.getMainRect(), b = g.getStore(), d = g.getSeries(), h = g.getAxes(), a = g.getColors(), c, e;
        if (!b || !h || !d) {
            return
        }
        if (!f) {
            g.on({redraw: g.onDataChanged, scope: g, single: true});
            return
        }
        for (c = 0, e = d.length; c < e; c++) {
            d[c].processData()
        }
        g.updateColors(a);
        g.redraw()
    },
    bindStore: function (a) {
        this.setStore(a)
    },
    applyHighlightItem: function (b, a) {
        if (b === a) {
            return
        }
        if (Ext.isObject(b) && Ext.isObject(a)) {
            if (b.sprite === a.sprite && b.index === a.index) {
                return
            }
        }
        return b
    },
    updateHighlightItem: function (b, a) {
        if (a) {
            a.series.setAttributesForItem(a, {highlighted: false})
        }
        if (b) {
            b.series.setAttributesForItem(b, {highlighted: true});
            this.fireEvent("itemhighlight", b)
        }
    },
    destroy: function () {
        var c = this, a = [], b = c.getLegend();
        c.surfaceMap = null;
        c.setHighlightItem(null);
        c.setSeries(a);
        c.setAxes(a);
        c.setInteractions(a);
        if (b) {
            b.destroy();
            c.setLegend(null)
        }
        c.legendStore = null;
        c.setStore(null);
        c.cancelLayout();
        this.callParent(arguments)
    },
    getRefItems: function (b) {
        var g = this, e = g.getSeries(), h = g.getAxes(), a = g.getInteractions(), c = [], d, f;
        for (d = 0, f = e.length; d < f; d++) {
            c.push(e[d]);
            if (e[d].getRefItems) {
                c.push.apply(c, e[d].getRefItems(b))
            }
        }
        for (d = 0, f = h.length; d < f; d++) {
            c.push(h[d]);
            if (h[d].getRefItems) {
                c.push.apply(c, h[d].getRefItems(b))
            }
        }
        for (d = 0, f = a.length; d < f; d++) {
            c.push(a[d]);
            if (a[d].getRefItems) {
                c.push.apply(c, a[d].getRefItems(b))
            }
        }
        return c
    }
});
Ext.define("Ext.chart.overrides.AbstractChart", {
    override: "Ext.chart.AbstractChart", updateLegend: function (b, a) {
        var c;
        this.callParent(arguments);
        if (b) {
            c = b.docked;
            this.addDocked({
                dock: c,
                xtype: "panel",
                shrinkWrap: true,
                autoScroll: true,
                layout: {type: c === "top" || c === "bottom" ? "hbox" : "vbox", pack: "center"},
                items: b,
                cls: Ext.baseCSSPrefix + "legend-panel"
            })
        }
    }
});
Ext.define("Ext.chart.grid.HorizontalGrid", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "grid.horizontal",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", width: "number", height: "number"},
            defaults: {x: 0, y: 0, width: 1, height: 1, strokeStyle: "#DDD"}
        }
    },
    render: function (b, c, e) {
        var a = this.attr, f = b.roundPixel(a.y), d = c.lineWidth * 0.5;
        c.beginPath();
        c.rect(e[0] - b.matrix.getDX(), f + d, +e[2], a.height);
        c.fill();
        c.beginPath();
        c.moveTo(e[0] - b.matrix.getDX(), f + d);
        c.lineTo(e[0] + e[2] - b.matrix.getDX(), f + d);
        c.stroke()
    }
});
Ext.define("Ext.chart.grid.VerticalGrid", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "grid.vertical",
    inheritableStatics: {
        def: {
            processors: {x: "number", y: "number", width: "number", height: "number"},
            defaults: {x: 0, y: 0, width: 1, height: 1, strokeStyle: "#DDD"}
        }
    },
    render: function (c, d, f) {
        var b = this.attr, a = c.roundPixel(b.x), e = d.lineWidth * 0.5;
        d.beginPath();
        d.rect(a - e, f[1] - c.matrix.getDY(), b.width, f[3]);
        d.fill();
        d.beginPath();
        d.moveTo(a - e, f[1] - c.matrix.getDY());
        d.lineTo(a - e, f[1] + f[3] - c.matrix.getDY());
        d.stroke()
    }
});
Ext.define("Ext.chart.CartesianChart", {
    extend: "Ext.chart.AbstractChart",
    alternateClassName: "Ext.chart.Chart",
    requires: ["Ext.chart.grid.HorizontalGrid", "Ext.chart.grid.VerticalGrid"],
    config: {flipXY: false, innerRect: [0, 0, 1, 1], innerPadding: {top: 0, left: 0, right: 0, bottom: 0}},
    xtype: ["cartesian", "chart"],
    applyInnerPadding: function (b, a) {
        if (!Ext.isObject(b)) {
            return Ext.util.Format.parseBox(b)
        } else {
            if (!a) {
                return b
            } else {
                return Ext.apply(a, b)
            }
        }
    },
    getDirectionForAxis: function (a) {
        var b = this.getFlipXY();
        if (a === "left" || a === "right") {
            if (b) {
                return "X"
            } else {
                return "Y"
            }
        } else {
            if (b) {
                return "Y"
            } else {
                return "X"
            }
        }
    },
    performLayout: function () {
        this.resizing++;
        this.callParent();
        this.suspendThicknessChanged();
        var A = this, d = A.getSurface("chart").getRect(), o = d[2], n = d[3], z = A.getAxes(), b, q = A.getSeries(), h, l, a, f = A.getInsetPadding(), v = A.getInnerPadding(), r, c, e = Ext.apply({}, f), u, p, s, k, m, y, t, x, g, j = A.getInherited().rtl, w = A.getFlipXY();
        if (o <= 0 || n <= 0) {
            return
        }
        for (x = 0; x < z.length; x++) {
            b = z[x];
            l = b.getSurface();
            m = b.getFloating();
            y = m ? m.value : null;
            a = b.getThickness();
            switch (b.getPosition()) {
                case"top":
                    l.setRect([0, e.top + 1, o, a]);
                    break;
                case"bottom":
                    l.setRect([0, n - (e.bottom + a), o, a]);
                    break;
                case"left":
                    l.setRect([e.left, 0, a, n]);
                    break;
                case"right":
                    l.setRect([o - (e.right + a), 0, a, n]);
                    break
            }
            if (y === null) {
                e[b.getPosition()] += a
            }
        }
        o -= e.left + e.right;
        n -= e.top + e.bottom;
        u = [e.left, e.top, o, n];
        e.left += v.left;
        e.top += v.top;
        e.right += v.right;
        e.bottom += v.bottom;
        p = o - v.left - v.right;
        s = n - v.top - v.bottom;
        A.setInnerRect([e.left, e.top, p, s]);
        if (p <= 0 || s <= 0) {
            return
        }
        A.setMainRect(u);
        A.getSurface().setRect(u);
        for (x = 0, g = A.surfaceMap.grid && A.surfaceMap.grid.length; x < g; x++) {
            c = A.surfaceMap.grid[x];
            c.setRect(u);
            c.matrix.set(1, 0, 0, 1, v.left, v.top);
            c.matrix.inverse(c.inverseMatrix)
        }
        for (x = 0; x < z.length; x++) {
            b = z[x];
            l = b.getSurface();
            t = l.matrix;
            k = t.elements;
            switch (b.getPosition()) {
                case"top":
                case"bottom":
                    k[4] = e.left;
                    b.setLength(p);
                    break;
                case"left":
                case"right":
                    k[5] = e.top;
                    b.setLength(s);
                    break
            }
            b.updateTitleSprite();
            t.inverse(l.inverseMatrix)
        }
        for (x = 0, g = q.length; x < g; x++) {
            h = q[x];
            r = h.getSurface();
            r.setRect(u);
            if (w) {
                if (j) {
                    r.matrix.set(0, -1, -1, 0, v.left + p, v.top + s)
                } else {
                    r.matrix.set(0, -1, 1, 0, v.left, v.top + s)
                }
            } else {
                r.matrix.set(1, 0, 0, -1, v.left, v.top + s)
            }
            r.matrix.inverse(r.inverseMatrix);
            h.getOverlaySurface().setRect(u)
        }
        A.redraw();
        A.onPlaceWatermark(d[2], d[3]);
        this.resizing--;
        this.resumeThicknessChanged()
    },
    refloatAxes: function () {
        var h = this, g = h.getAxes(), c, d, n, f, l, b, k, q = h.innerElement.getSize(), p = h.getInsetPadding(), o = h.getInnerPadding(), a = q.width - p.left - p.right, m = q.height - p.top - p.bottom, j;
        for (var e = 0; e < g.length; e++) {
            c = g[e];
            f = c.getFloating();
            l = f ? f.value : null;
            if (l === null) {
                delete c.floatingAtCoord;
                continue
            }
            d = c.getSurface();
            n = d.getRect();
            if (!n) {
                continue
            }
            n = n.slice();
            b = h.getAxis(f.alongAxis);
            if (b) {
                j = b.getAlignment() === "horizontal";
                if (Ext.isString(l)) {
                    l = b.getCoordFor(l)
                }
                b.floatingAxes[c.getId()] = l;
                k = b.getSprites()[0].attr.matrix;
                if (j) {
                    l = l * k.getXX() + k.getDX();
                    c.floatingAtCoord = l + o.left + o.right
                } else {
                    l = l * k.getYY() + k.getDY();
                    c.floatingAtCoord = l + o.top + o.bottom
                }
            } else {
                j = c.getAlignment() === "horizontal";
                if (j) {
                    c.floatingAtCoord = l + o.top + o.bottom
                } else {
                    c.floatingAtCoord = l + o.left + o.right
                }
                l = d.roundPixel(0.01 * l * (j ? m : a))
            }
            switch (c.getPosition()) {
                case"top":
                    n[1] = p.top + o.top + l - n[3] + 1;
                    break;
                case"bottom":
                    n[1] = p.top + o.top + (b ? l : m - l);
                    break;
                case"left":
                    n[0] = p.left + o.left + l - n[2];
                    break;
                case"right":
                    n[0] = p.left + o.left + (b ? l : a - l) - 1;
                    break
            }
            d.setRect(n)
        }
    },
    redraw: function () {
        var D = this, m = D.getSeries(), A = D.getAxes(), b = D.getMainRect(), s, v, x = D.getInnerPadding(), h, o, u, f, t, B, w, e, c, a, n, q, z = D.getFlipXY(), r, p, y = 1000, C, l, k, g, d;
        if (!b) {
            return
        }
        s = b[2] - x.left - x.right;
        v = b[3] - x.top - x.bottom;
        for (B = 0; B < m.length; B++) {
            if ((c = m[B].getXAxis())) {
                q = c.getVisibleRange();
                o = c.getRange();
                o = [o[0] + (o[1] - o[0]) * q[0], o[0] + (o[1] - o[0]) * q[1]]
            } else {
                o = m[B].getXRange()
            }
            if ((a = m[B].getYAxis())) {
                q = a.getVisibleRange();
                u = a.getRange();
                u = [u[0] + (u[1] - u[0]) * q[0], u[0] + (u[1] - u[0]) * q[1]]
            } else {
                u = m[B].getYRange()
            }
            t = {
                visibleMinX: o[0],
                visibleMaxX: o[1],
                visibleMinY: u[0],
                visibleMaxY: u[1],
                innerWidth: s,
                innerHeight: v,
                flipXY: z
            };
            h = m[B].getSprites();
            for (w = 0; w < h.length; w++) {
                r = h[w];
                p = (r.attr.zIndex || 0);
                if (p < y) {
                    p += (B + 1) * 100 + y;
                    r.attr.zIndex = p;
                    C = r.boundMarkers;
                    l = (C && C.items ? C.items.length : 0);
                    for (k = 0; k < l; k++) {
                        g = C.items[k];
                        d = (g.attr.zIndex || 0);
                        if (d == Number.MAX_VALUE) {
                            g.attr.zIndex = p
                        } else {
                            if (d < y) {
                                g.attr.zIndex = p + d
                            }
                        }
                    }
                }
                r.setAttributes(t, true)
            }
        }
        for (B = 0; B < A.length; B++) {
            e = A[B];
            f = e.isSide();
            h = e.getSprites();
            n = e.getRange();
            q = e.getVisibleRange();
            t = {dataMin: n[0], dataMax: n[1], visibleMin: q[0], visibleMax: q[1]};
            if (f) {
                t.length = v;
                t.startGap = x.bottom;
                t.endGap = x.top
            } else {
                t.length = s;
                t.startGap = x.left;
                t.endGap = x.right
            }
            for (w = 0; w < h.length; w++) {
                h[w].setAttributes(t, true)
            }
        }
        D.renderFrame();
        D.callParent(arguments)
    },
    renderFrame: function () {
        this.refloatAxes();
        this.callParent(arguments)
    },
    onPlaceWatermark: function (c, a) {
        var e = this, b = e.watermarkElement, d = b && (e.getSurface ? e.getSurface("main").getRect() : e.getItems().get(0).getRect());
        if (d) {
            b.setStyle({right: Math.round(c - (d[2] + d[0])) + "px", bottom: Math.round(a - (d[3] + d[1])) + "px"})
        }
    }
});
Ext.define("Ext.chart.grid.CircularGrid", {
    extend: "Ext.draw.sprite.Circle",
    alias: "grid.circular",
    inheritableStatics: {def: {defaults: {r: 1, strokeStyle: "#DDD"}}}
});
Ext.define("Ext.chart.grid.RadialGrid", {
    extend: "Ext.draw.sprite.Path",
    alias: "grid.radial",
    inheritableStatics: {
        def: {
            processors: {startRadius: "number", endRadius: "number"},
            defaults: {startRadius: 0, endRadius: 1, scalingCenterX: 0, scalingCenterY: 0, strokeStyle: "#DDD"},
            triggers: {startRadius: "path,bbox", endRadius: "path,bbox"}
        }
    },
    render: function () {
        this.callParent(arguments)
    },
    updatePath: function (d, a) {
        var b = a.startRadius, c = a.endRadius;
        d.moveTo(b, 0);
        d.lineTo(c, 0)
    }
});
Ext.define("Ext.chart.PolarChart", {
    requires: ["Ext.chart.grid.CircularGrid", "Ext.chart.grid.RadialGrid"],
    extend: "Ext.chart.AbstractChart",
    xtype: "polar",
    config: {center: [0, 0], radius: 0, innerPadding: 0},
    getDirectionForAxis: function (a) {
        if (a === "radial") {
            return "Y"
        } else {
            return "X"
        }
    },
    applyCenter: function (a, b) {
        if (b && a[0] === b[0] && a[1] === b[1]) {
            return
        }
        return [+a[0], +a[1]]
    },
    updateCenter: function (a) {
        var g = this, h = g.getAxes(), e, d = g.getSeries(), b, c, f;
        for (c = 0, f = h.length; c < f; c++) {
            e = h[c];
            e.setCenter(a)
        }
        for (c = 0, f = d.length; c < f; c++) {
            b = d[c];
            b.setCenter(a)
        }
    },
    applyInnerPadding: function (b, a) {
        return Ext.isNumber(b) ? b : a
    },
    doSetSurfaceRect: function (b, c) {
        var a = this.getMainRect();
        b.setRect(c);
        b.matrix.set(1, 0, 0, 1, a[0] - c[0], a[1] - c[1]);
        b.inverseMatrix.set(1, 0, 0, 1, c[0] - a[0], c[1] - a[1])
    },
    applyAxes: function (f, h) {
        var e = this, g = Ext.Array.from(e.config.series)[0], b, d, c, a;
        if (g.type === "radar" && f && f.length) {
            for (b = 0, d = f.length; b < d; b++) {
                c = f[b];
                if (c.position === "angular") {
                    a = true;
                    break
                }
            }
            if (!a) {
                f.push({
                    type: "category",
                    position: "angular",
                    fields: g.xField || g.angleField,
                    style: {estStepSize: 1},
                    grid: true
                })
            }
        }
        return this.callParent(arguments)
    },
    performLayout: function () {
        try {
            this.resizing++;
            this.callParent();
            this.suspendThicknessChanged();
            var E = this, g = E.getSurface("chart").getRect(), u = E.getInsetPadding(), F = E.getInnerPadding(), k = Ext.apply({}, u), d, r = g[2] - u.left - u.right, q = g[3] - u.top - u.bottom, w = [u.left, u.top, r, q], t = E.getSeries(), o, s = r - F * 2, v = q - F * 2, C = [s * 0.5 + F, v * 0.5 + F], h = Math.min(s, v) * 0.5, z = E.getAxes(), f, a, j, l = [], n = [], D = h - F, y, m, b, p, x, c, B;
            E.setMainRect(w);
            E.doSetSurfaceRect(E.getSurface(), w);
            for (y = 0, m = E.surfaceMap.grid && E.surfaceMap.grid.length; y < m; y++) {
                E.doSetSurfaceRect(E.surfaceMap.grid[y], g)
            }
            for (y = 0, m = z.length; y < m; y++) {
                f = z[y];
                switch (f.getPosition()) {
                    case"angular":
                        l.push(f);
                        break;
                    case"radial":
                        n.push(f);
                        break
                }
            }
            for (y = 0, m = l.length; y < m; y++) {
                f = l[y];
                p = f.getFloating();
                x = p ? p.value : null;
                E.doSetSurfaceRect(f.getSurface(), g);
                a = f.getThickness();
                for (d in k) {
                    k[d] += a
                }
                r = g[2] - k.left - k.right;
                q = g[3] - k.top - k.bottom;
                b = Math.min(r, q) * 0.5;
                if (y === 0) {
                    D = b - F
                }
                f.setMinimum(0);
                f.setLength(b);
                f.getSprites();
                j = f.sprites[0].attr.lineWidth * 0.5;
                for (d in k) {
                    k[d] += j
                }
            }
            for (y = 0, m = n.length; y < m; y++) {
                f = n[y];
                E.doSetSurfaceRect(f.getSurface(), w);
                f.setMinimum(0);
                f.setLength(D);
                f.getSprites()
            }
            for (y = 0, m = t.length; y < m; y++) {
                o = t[y];
                if (o.type === "gauge" && !c) {
                    c = o
                } else {
                    o.setRadius(D)
                }
                E.doSetSurfaceRect(o.getSurface(), w)
            }
            E.doSetSurfaceRect(E.getSurface("overlay"), g);
            if (c) {
                c.setRect(w);
                B = c.getRadius() - F;
                E.setRadius(B);
                E.setCenter(c.getCenter());
                c.setRadius(B);
                if (z.length && z[0].getPosition() === "gauge") {
                    f = z[0];
                    E.doSetSurfaceRect(f.getSurface(), g);
                    f.setTotalAngle(c.getTotalAngle());
                    f.setLength(B)
                }
            } else {
                E.setRadius(h);
                E.setCenter(C)
            }
            E.redraw()
        } catch (A) {
            throw A
        } finally {
            this.resizing--;
            this.resumeThicknessChanged()
        }
    },
    refloatAxes: function () {
        var j = this, g = j.getAxes(), h = j.getMainRect(), f, k, b, d, a, c, e;
        if (!h) {
            return
        }
        e = 0.5 * Math.min(h[2], h[3]);
        for (d = 0, a = g.length; d < a; d++) {
            c = g[d];
            f = c.getFloating();
            k = f ? f.value : null;
            if (k !== null) {
                b = j.getAxis(f.alongAxis);
                if (c.getPosition() === "angular") {
                    if (b) {
                        k = b.getLength() * k / b.getRange()[1]
                    } else {
                        k = 0.01 * k * e
                    }
                    c.sprites[0].setAttributes({length: k}, true)
                } else {
                    if (b) {
                        if (Ext.isString(k)) {
                            k = b.getCoordFor(k)
                        }
                        k = k / (b.getRange()[1] + 1) * Math.PI * 2 - Math.PI * 1.5 + c.getRotation()
                    } else {
                        k = Ext.draw.Draw.rad(k)
                    }
                    c.sprites[0].setAttributes({baseRotation: k}, true)
                }
            }
        }
    },
    redraw: function () {
        var f = this, g = f.getAxes(), d, c = f.getSeries(), a, b, e;
        for (b = 0, e = g.length; b < e; b++) {
            d = g[b];
            d.getSprites()
        }
        for (b = 0, e = c.length; b < e; b++) {
            a = c[b];
            a.getSprites()
        }
        f.renderFrame();
        f.callParent(arguments)
    },
    renderFrame: function () {
        this.refloatAxes();
        this.callParent(arguments)
    }
});
Ext.define("Ext.chart.SpaceFillingChart", {
    extend: "Ext.chart.AbstractChart",
    xtype: "spacefilling",
    config: {},
    performLayout: function () {
        try {
            this.resizing++;
            this.callParent();
            var j = this, k = j.getSurface("chart").getRect(), l = j.getInsetPadding(), a = k[2] - l.left - l.right, m = k[3] - l.top - l.bottom, h = [l.left, l.top, a, m], b = j.getSeries(), d, c, g;
            j.getSurface().setRect(h);
            j.setMainRect(h);
            for (c = 0, g = b.length; c < g; c++) {
                d = b[c];
                d.getSurface().setRect(h);
                if (d.setRect) {
                    d.setRect(h)
                }
                d.getOverlaySurface().setRect(k)
            }
            j.redraw()
        } catch (f) {
            throw f
        } finally {
            this.resizing--
        }
    },
    redraw: function () {
        var e = this, c = e.getSeries(), b, a, d;
        for (a = 0, d = c.length; a < d; a++) {
            b = c[a];
            b.getSprites()
        }
        e.renderFrame();
        e.callParent(arguments)
    }
});
Ext.define("Ext.chart.axis.Axis3D", {
    extend: "Ext.chart.axis.Axis",
    xtype: "axis3d",
    config: {depth: 0},
    onSeriesChange: function (e) {
        var g = this, b = "depthchange", f = "onSeriesDepthChange", d, c;

        function a(h) {
            var i = g.boundSeries;
            for (d = 0; d < i.length; d++) {
                c = i[d];
                c[h](b, f, g)
            }
        }

        a("un");
        g.callParent(arguments);
        a("on")
    },
    onSeriesDepthChange: function (b, f) {
        var d = this, g = f, e = d.boundSeries, a, c;
        if (f > d.getDepth()) {
            g = f
        } else {
            for (a = 0; a < e.length; a++) {
                c = e[a];
                if (c !== b && c.getDepth) {
                    f = c.getDepth();
                    if (f > g) {
                        g = f
                    }
                }
            }
        }
        d.setDepth(g)
    },
    updateDepth: function (d) {
        var b = this, c = b.getSprites(), a = {depth: d};
        if (c && c.length) {
            c[0].setAttributes(a)
        }
        if (b.gridSpriteEven && b.gridSpriteOdd) {
            b.gridSpriteEven.getTemplate().setAttributes(a);
            b.gridSpriteOdd.getTemplate().setAttributes(a)
        }
    },
    getGridAlignment: function () {
        switch (this.getPosition()) {
            case"left":
            case"right":
                return "horizontal3d";
            case"top":
            case"bottom":
                return "vertical3d"
        }
    }
});
Ext.define("Ext.chart.axis.Category", {
    requires: ["Ext.chart.axis.layout.CombineDuplicate", "Ext.chart.axis.segmenter.Names"],
    extend: "Ext.chart.axis.Axis",
    alias: "axis.category",
    type: "category",
    config: {layout: "combineDuplicate", segmenter: "names"}
});
Ext.define("Ext.chart.axis.Category3D", {
    requires: ["Ext.chart.axis.layout.CombineDuplicate", "Ext.chart.axis.segmenter.Names"],
    extend: "Ext.chart.axis.Axis3D",
    alias: "axis.category3d",
    type: "category3d",
    config: {layout: "combineDuplicate", segmenter: "names"}
});
Ext.define("Ext.chart.axis.Numeric", {
    extend: "Ext.chart.axis.Axis",
    type: "numeric",
    alias: ["axis.numeric", "axis.radial"],
    requires: ["Ext.chart.axis.layout.Continuous", "Ext.chart.axis.segmenter.Numeric"],
    config: {layout: "continuous", segmenter: "numeric", aggregator: "double"}
});
Ext.define("Ext.chart.axis.Numeric3D", {
    extend: "Ext.chart.axis.Axis3D",
    alias: ["axis.numeric3d"],
    type: "numeric3d",
    requires: ["Ext.chart.axis.layout.Continuous", "Ext.chart.axis.segmenter.Numeric"],
    config: {layout: "continuous", segmenter: "numeric", aggregator: "double"}
});
Ext.define("Ext.chart.axis.Time", {
    extend: "Ext.chart.axis.Numeric",
    alias: "axis.time",
    type: "time",
    requires: ["Ext.chart.axis.layout.Continuous", "Ext.chart.axis.segmenter.Time"],
    config: {
        calculateByLabelSize: true,
        dateFormat: null,
        fromDate: null,
        toDate: null,
        step: [Ext.Date.DAY, 1],
        layout: "continuous",
        segmenter: "time",
        aggregator: "time"
    },
    updateDateFormat: function (a) {
        this.setRenderer(function (b) {
            return Ext.Date.format(new Date(b), a)
        })
    },
    updateFromDate: function (a) {
        this.setMinimum(+a)
    },
    updateToDate: function (a) {
        this.setMaximum(+a)
    },
    getCoordFor: function (a) {
        if (Ext.isString(a)) {
            a = new Date(a)
        }
        return +a
    }
});
Ext.define("Ext.chart.axis.Time3D", {
    extend: "Ext.chart.axis.Numeric3D",
    alias: "axis.time3d",
    type: "time3d",
    requires: ["Ext.chart.axis.layout.Continuous", "Ext.chart.axis.segmenter.Time"],
    config: {
        calculateByLabelSize: true,
        dateFormat: null,
        fromDate: null,
        toDate: null,
        step: [Ext.Date.DAY, 1],
        layout: "continuous",
        segmenter: "time",
        aggregator: "time"
    },
    updateDateFormat: function (a) {
        this.setRenderer(function (b) {
            return Ext.Date.format(new Date(b), a)
        })
    },
    updateFromDate: function (a) {
        this.setMinimum(+a)
    },
    updateToDate: function (a) {
        this.setMaximum(+a)
    },
    getCoordFor: function (a) {
        if (Ext.isString(a)) {
            a = new Date(a)
        }
        return +a
    }
});
Ext.define("Ext.chart.axis.sprite.Axis3D", {
    extend: "Ext.chart.axis.sprite.Axis",
    alias: "sprite.axis3d",
    type: "axis3d",
    inheritableStatics: {def: {processors: {depth: "number"}, defaults: {depth: 0}, triggers: {depth: "layout"}}},
    config: {fx: {customDurations: {depth: 0}}},
    doLayout: function () {
        var h = this, f = h.getAxis().getChart();
        if (f.isInitializing) {
            return
        }
        var e = h.attr, d = h.getLayout(), c = d.isDiscrete ? 0 : e.depth, g = f.getInherited().rtl, b = e.dataMin + (e.dataMax - e.dataMin) * e.visibleMin, i = e.dataMin + (e.dataMax - e.dataMin) * e.visibleMax, a = {
            attr: e,
            segmenter: h.getSegmenter(),
            renderer: h.doDefaultRender
        };
        if (e.position === "left" || e.position === "right") {
            e.translationX = 0;
            e.translationY = i * (e.length - c) / (i - b) + c;
            e.scalingX = 1;
            e.scalingY = (-e.length + c) / (i - b);
            e.scalingCenterY = 0;
            e.scalingCenterX = 0;
            h.applyTransformations(true)
        } else {
            if (e.position === "top" || e.position === "bottom") {
                if (g) {
                    e.translationX = e.length + b * e.length / (i - b) + 1
                } else {
                    e.translationX = -b * e.length / (i - b)
                }
                e.translationY = 0;
                e.scalingX = (g ? -1 : 1) * (e.length - c) / (i - b);
                e.scalingY = 1;
                e.scalingCenterY = 0;
                e.scalingCenterX = 0;
                h.applyTransformations(true)
            }
        }
        if (d) {
            d.calculateLayout(a);
            h.setLayoutContext(a)
        }
    },
    renderAxisLine: function (a, j, f, c) {
        var i = this, h = i.attr, b = h.lineWidth * 0.5, f = i.getLayout(), d = f.isDiscrete ? 0 : h.depth, k = h.position, e, g;
        if (h.axisLine && h.length) {
            switch (k) {
                case"left":
                    e = a.roundPixel(c[2]) - b;
                    j.moveTo(e, -h.endGap + d);
                    j.lineTo(e, h.length + h.startGap);
                    break;
                case"right":
                    j.moveTo(b, -h.endGap);
                    j.lineTo(b, h.length + h.startGap);
                    break;
                case"bottom":
                    j.moveTo(-h.startGap, b);
                    j.lineTo(h.length - d + h.endGap, b);
                    break;
                case"top":
                    e = a.roundPixel(c[3]) - b;
                    j.moveTo(-h.startGap, e);
                    j.lineTo(h.length + h.endGap, e);
                    break;
                case"angular":
                    j.moveTo(h.centerX + h.length, h.centerY);
                    j.arc(h.centerX, h.centerY, h.length, 0, Math.PI * 2, true);
                    break;
                case"gauge":
                    g = i.getGaugeAngles();
                    j.moveTo(h.centerX + Math.cos(g.start) * h.length, h.centerY + Math.sin(g.start) * h.length);
                    j.arc(h.centerX, h.centerY, h.length, g.start, g.end, true);
                    break
            }
        }
    }
});
Ext.define("Ext.chart.grid.HorizontalGrid3D", {
    extend: "Ext.chart.grid.HorizontalGrid",
    alias: "grid.horizontal3d",
    inheritableStatics: {def: {processors: {depth: "number"}, defaults: {depth: 0}}},
    render: function (a, k, d) {
        var f = this.attr, i = a.roundPixel(f.x), h = a.roundPixel(f.y), l = a.matrix.getDX(), c = k.lineWidth * 0.5, j = f.height, e = f.depth, b, g;
        if (h <= d[1]) {
            return
        }
        b = d[0] + e - l;
        g = h + c - e;
        k.beginPath();
        k.rect(b, g, d[2], j);
        k.fill();
        k.beginPath();
        k.moveTo(b, g);
        k.lineTo(b + d[2], g);
        k.stroke();
        b = d[0] + i - l;
        g = h + c;
        k.beginPath();
        k.moveTo(b, g);
        k.lineTo(b + e, g - e);
        k.lineTo(b + e, g - e + j);
        k.lineTo(b, g + j);
        k.closePath();
        k.fill();
        k.beginPath();
        k.moveTo(b, g);
        k.lineTo(b + e, g - e);
        k.stroke()
    }
});
Ext.define("Ext.chart.grid.VerticalGrid3D", {
    extend: "Ext.chart.grid.VerticalGrid",
    alias: "grid.vertical3d",
    inheritableStatics: {def: {processors: {depth: "number"}, defaults: {depth: 0}}},
    render_: function (c, d, f) {
        var b = this.attr, a = c.roundPixel(b.x), e = d.lineWidth * 0.5;
        d.beginPath();
        d.rect(a - e, f[1] - c.matrix.getDY(), b.width, f[3]);
        d.fill();
        d.beginPath();
        d.moveTo(a - e, f[1] - c.matrix.getDY());
        d.lineTo(a - e, f[1] + f[3] - c.matrix.getDY());
        d.stroke()
    },
    render: function (b, j, e) {
        var g = this.attr, i = b.roundPixel(g.x), k = b.matrix.getDY(), d = j.lineWidth * 0.5, a = g.width, f = g.depth, c, h;
        if (i >= e[2]) {
            return
        }
        c = i - d + f;
        h = e[1] - f - k;
        j.beginPath();
        j.rect(c, h, a, e[3]);
        j.fill();
        j.beginPath();
        j.moveTo(c, h);
        j.lineTo(c, h + e[3]);
        j.stroke();
        c = i - d;
        h = e[3];
        j.beginPath();
        j.moveTo(c, h);
        j.lineTo(c + f, h - f);
        j.lineTo(c + f + a, h - f);
        j.lineTo(c + a, h);
        j.closePath();
        j.fill();
        c = i - d;
        h = e[3];
        j.beginPath();
        j.moveTo(c, h);
        j.lineTo(c + f, h - f);
        j.stroke()
    }
});
Ext.define("Ext.chart.interactions.CrossZoom", {
    extend: "Ext.chart.interactions.Abstract",
    type: "crosszoom",
    alias: "interaction.crosszoom",
    config: {
        axes: true,
        gestures: {dragstart: "onGestureStart", drag: "onGesture", dragend: "onGestureEnd", dblclick: "onDoubleTap"},
        undoButton: {}
    },
    stopAnimationBeforeSync: false,
    zoomAnimationInProgress: false,
    constructor: function () {
        this.callParent(arguments);
        this.zoomHistory = []
    },
    applyAxes: function (b) {
        var a = {};
        if (b === true) {
            return {top: {}, right: {}, bottom: {}, left: {}}
        } else {
            if (Ext.isArray(b)) {
                a = {};
                Ext.each(b, function (c) {
                    a[c] = {}
                })
            } else {
                if (Ext.isObject(b)) {
                    Ext.iterate(b, function (c, d) {
                        if (d === true) {
                            a[c] = {}
                        } else {
                            if (d !== false) {
                                a[c] = d
                            }
                        }
                    })
                }
            }
        }
        return a
    },
    applyUndoButton: function (b, a) {
        var c = this;
        if (b) {
            if (a) {
                a.destroy()
            }
            return Ext.create("Ext.Button", Ext.apply({
                cls: [],
                text: "Undo Zoom",
                disabled: true,
                handler: function () {
                    c.undoZoom()
                }
            }, b))
        } else {
            if (a) {
                a.destroy()
            }
        }
    },
    getSurface: function () {
        return this.getChart() && this.getChart().getSurface("main")
    },
    setSeriesOpacity: function (b) {
        var a = this.getChart() && this.getChart().getSurface("series");
        if (a) {
            a.element.setStyle("opacity", b)
        }
    },
    onGestureStart: function (h) {
        var j = this, i = j.getChart(), d = j.getSurface(), l = i.getInnerRect(), c = i.getInnerPadding(), g = c.left, b = g + l[2], f = c.top, a = f + l[3], n = i.getEventXY(h), m = n[0], k = n[1];
        if (j.zoomAnimationInProgress) {
            return
        }
        if (m > g && m < b && k > f && k < a) {
            j.gestureEvent = "drag";
            j.lockEvents(j.gestureEvent);
            j.startX = m;
            j.startY = k;
            j.selectionRect = d.add({
                type: "rect",
                globalAlpha: 0.5,
                fillStyle: "rgba(80,80,140,0.5)",
                strokeStyle: "rgba(80,80,140,1)",
                lineWidth: 2,
                x: m,
                y: k,
                width: 0,
                height: 0,
                zIndex: 10000
            });
            j.setSeriesOpacity(0.8);
            return false
        }
    },
    onGesture: function (h) {
        var j = this;
        if (j.zoomAnimationInProgress) {
            return
        }
        if (j.getLocks()[j.gestureEvent] === j) {
            var i = j.getChart(), d = j.getSurface(), l = i.getInnerRect(), c = i.getInnerPadding(), g = c.left, b = g + l[2], f = c.top, a = f + l[3], n = i.getEventXY(h), m = n[0], k = n[1];
            if (m < g) {
                m = g
            } else {
                if (m > b) {
                    m = b
                }
            }
            if (k < f) {
                k = f
            } else {
                if (k > a) {
                    k = a
                }
            }
            j.selectionRect.setAttributes({width: m - j.startX, height: k - j.startY});
            if (Math.abs(j.startX - m) < 11 || Math.abs(j.startY - k) < 11) {
                j.selectionRect.setAttributes({globalAlpha: 0.5})
            } else {
                j.selectionRect.setAttributes({globalAlpha: 1})
            }
            d.renderFrame();
            return false
        }
    },
    onGestureEnd: function (i) {
        var l = this;
        if (l.zoomAnimationInProgress) {
            return
        }
        if (l.getLocks()[l.gestureEvent] === l) {
            var k = l.getChart(), d = l.getSurface(), n = k.getInnerRect(), c = k.getInnerPadding(), g = c.left, b = g + n[2], f = c.top, a = f + n[3], h = n[2], j = n[3], p = k.getEventXY(i), o = p[0], m = p[1];
            if (o < g) {
                o = g
            } else {
                if (o > b) {
                    o = b
                }
            }
            if (m < f) {
                m = f
            } else {
                if (m > a) {
                    m = a
                }
            }
            if (Math.abs(l.startX - o) < 11 || Math.abs(l.startY - m) < 11) {
                d.remove(l.selectionRect)
            } else {
                l.zoomBy([Math.min(l.startX, o) / h, 1 - Math.max(l.startY, m) / j, Math.max(l.startX, o) / h, 1 - Math.min(l.startY, m) / j]);
                l.selectionRect.setAttributes({
                    x: Math.min(l.startX, o),
                    y: Math.min(l.startY, m),
                    width: Math.abs(l.startX - o),
                    height: Math.abs(l.startY - m)
                });
                l.selectionRect.fx.setConfig(k.getAnimation() || {duration: 0});
                l.selectionRect.setAttributes({globalAlpha: 0, x: 0, y: 0, width: h, height: j});
                l.zoomAnimationInProgress = true;
                k.suspendThicknessChanged();
                l.selectionRect.fx.on("animationend", function () {
                    k.resumeThicknessChanged();
                    d.remove(l.selectionRect);
                    l.selectionRect = null;
                    l.zoomAnimationInProgress = false
                })
            }
            d.renderFrame();
            l.sync();
            l.unlockEvents(l.gestureEvent);
            l.setSeriesOpacity(1);
            if (!l.zoomAnimationInProgress) {
                d.remove(l.selectionRect);
                l.selectionRect = null
            }
        }
    },
    zoomBy: function (o) {
        var n = this, a = n.getAxes(), k = n.getChart(), j = k.getAxes(), l = k.getInherited().rtl, f, d = {}, c, b;
        if (l) {
            o = o.slice();
            c = 1 - o[0];
            b = 1 - o[2];
            o[0] = Math.min(c, b);
            o[2] = Math.max(c, b)
        }
        for (var h = 0; h < j.length; h++) {
            var g = j[h];
            f = a[g.getPosition()];
            if (f && f.allowZoom !== false) {
                var e = g.isSide(), m = g.getVisibleRange();
                d[g.getId()] = m.slice(0);
                if (!e) {
                    g.setVisibleRange([(m[1] - m[0]) * o[0] + m[0], (m[1] - m[0]) * o[2] + m[0]])
                } else {
                    g.setVisibleRange([(m[1] - m[0]) * o[1] + m[0], (m[1] - m[0]) * o[3] + m[0]])
                }
            }
        }
        n.zoomHistory.push(d);
        n.getUndoButton().setDisabled(false)
    },
    undoZoom: function () {
        var c = this.zoomHistory.pop(), d = this.getChart().getAxes();
        if (c) {
            for (var a = 0; a < d.length; a++) {
                var b = d[a];
                if (c[b.getId()]) {
                    b.setVisibleRange(c[b.getId()])
                }
            }
        }
        this.getUndoButton().setDisabled(this.zoomHistory.length === 0);
        this.sync()
    },
    onDoubleTap: function (a) {
        this.undoZoom()
    }
});
Ext.define("Ext.chart.interactions.Crosshair", {
    extend: "Ext.chart.interactions.Abstract",
    requires: ["Ext.chart.grid.HorizontalGrid", "Ext.chart.grid.VerticalGrid", "Ext.chart.CartesianChart", "Ext.chart.axis.layout.Discrete"],
    type: "crosshair",
    alias: "interaction.crosshair",
    config: {
        axes: {
            top: {label: {}, rect: {}},
            right: {label: {}, rect: {}},
            bottom: {label: {}, rect: {}},
            left: {label: {}, rect: {}}
        },
        lines: {
            horizontal: {strokeStyle: "black", lineDash: [5, 5]},
            vertical: {strokeStyle: "black", lineDash: [5, 5]}
        },
        gesture: "drag"
    },
    applyAxes: function (b, a) {
        return Ext.merge(a || {}, b)
    },
    applyLines: function (a, b) {
        return Ext.merge(b || {}, a)
    },
    updateChart: function (a) {
        if (!(a instanceof Ext.chart.CartesianChart)) {
            throw"Crosshair interaction can only be used on cartesian charts."
        }
        this.callParent(arguments)
    },
    getGestures: function () {
        var a = this, b = {};
        b[a.getGesture()] = "onGesture";
        b[a.getGesture() + "start"] = "onGestureStart";
        b[a.getGesture() + "end"] = "onGestureEnd";
        return b
    },
    onGestureStart: function (N) {
        var m = this, O = m.getChart(), B = O.getTheme().getAxis(), A, F = O.getSurface("overlay"), s = O.getInnerRect(), n = s[2], M = s[3], r = O.getEventXY(N), D = r[0], C = r[1], E = O.getAxes(), u = m.getAxes(), h = m.getLines(), q, v, b, d, k, z, G, L, J, o, I, w, l, f, p, j, t, a, g, H, c, K;
        if (D > 0 && D < n && C > 0 && C < M) {
            m.lockEvents(m.getGesture());
            H = Ext.apply({xclass: "Ext.chart.grid.HorizontalGrid", x: 0, y: C, width: n}, h.horizontal);
            c = Ext.apply({xclass: "Ext.chart.grid.VerticalGrid", x: D, y: 0, height: M}, h.vertical);
            m.axesLabels = m.axesLabels || {};
            for (K = 0; K < E.length; K++) {
                q = E[K];
                v = q.getSurface();
                b = v.getRect();
                w = q.getSprites()[0];
                d = b[2];
                k = b[3];
                z = q.getPosition();
                G = q.getAlignment();
                t = q.getTitle(), a = t && t.attr.text !== "" && t.getBBox(), l = w.attr;
                f = w.thickness;
                p = l.axisLine ? l.lineWidth : 0;
                j = p / 2;
                I = Math.max(l.majorTickSize, l.minorTickSize) + p;
                L = m.axesLabels[z] = v.add({type: "composite"});
                L.labelRect = L.add(Ext.apply({
                    type: "rect",
                    fillStyle: "white",
                    x: z === "right" ? p : 0,
                    y: z === "bottom" ? p : 0,
                    width: d - p - (G === "vertical" && a ? a.width : 0),
                    height: k - p - (G === "horizontal" && a ? a.height : 0),
                    translationX: z === "left" && a ? a.width : 0,
                    translationY: z === "top" && a ? a.height : 0
                }, u.rect || u[z].rect));
                if (G === "vertical" && !c.strokeStyle) {
                    c.strokeStyle = l.strokeStyle
                }
                if (G === "horizontal" && !H.strokeStyle) {
                    H.strokeStyle = l.strokeStyle
                }
                A = Ext.merge({}, B.defaults, B[z]);
                J = Ext.apply({}, q.config.label, A.label);
                o = u.label || u[z].label;
                L.labelText = L.add(Ext.apply(J, o, {
                    type: "text", x: (function () {
                        switch (z) {
                            case"left":
                                g = a ? a.x + a.width : 0;
                                return g + (d - g - I) / 2 - j;
                            case"right":
                                g = a ? d - a.x : 0;
                                return I + (d - I - g) / 2 + j;
                            default:
                                return 0
                        }
                    })(), y: (function () {
                        switch (z) {
                            case"top":
                                g = a ? a.y + a.height : 0;
                                return g + (k - g - I) / 2 - j;
                            case"bottom":
                                g = a ? k - a.y : 0;
                                return I + (k - I - g) / 2 + j;
                            default:
                                return 0
                        }
                    })()
                }))
            }
            m.horizontalLine = F.add(H);
            m.verticalLine = F.add(c);
            return false
        }
    },
    onGesture: function (G) {
        var K = this;
        if (K.getLocks()[K.getGesture()] !== K) {
            return
        }
        var u = K.getChart(), z = u.getSurface("overlay"), a = Ext.Array.slice(u.getInnerRect()), r = u.getInnerPadding(), t = r.left, q = r.top, E = a[2], f = a[3], d = u.getEventXY(G), k = d[0], j = d[1], D = u.getAxes(), c, h, m, p, J, w, I, H, s, b, C, g, v, n, l, A, F, o, B;
        if (k < 0) {
            k = 0
        } else {
            if (k > E) {
                k = E
            }
        }
        if (j < 0) {
            j = 0
        } else {
            if (j > f) {
                j = f
            }
        }
        k += t;
        j += q;
        for (B = 0; B < D.length; B++) {
            c = D[B];
            h = c.getPosition();
            m = c.getAlignment();
            p = c.getSurface();
            J = c.getSprites()[0];
            w = J.attr.matrix;
            C = J.attr.textPadding * 2;
            s = K.axesLabels[h];
            I = J.getLayoutContext();
            H = c.getSegmenter();
            if (s) {
                if (m === "vertical") {
                    v = w.getYY();
                    l = w.getDY();
                    F = (j - l - q) / v;
                    if (c.getLayout() instanceof Ext.chart.axis.layout.Discrete) {
                        j = Math.round(F) * v + l + q;
                        F = H.from(Math.round(F));
                        F = J.attr.data[F]
                    } else {
                        F = H.from(F)
                    }
                    o = H.renderer(F, I);
                    s.setAttributes({translationY: j - q});
                    s.labelText.setAttributes({text: o});
                    b = s.labelText.getBBox();
                    s.labelRect.setAttributes({height: b.height + C, y: -(b.height + C) / 2});
                    p.renderFrame()
                } else {
                    g = w.getXX();
                    n = w.getDX();
                    A = (k - n - t) / g;
                    if (c.getLayout() instanceof Ext.chart.axis.layout.Discrete) {
                        k = Math.round(A) * g + n + t;
                        A = H.from(Math.round(A));
                        A = J.attr.data[A]
                    } else {
                        A = H.from(A)
                    }
                    o = H.renderer(A, I);
                    s.setAttributes({translationX: k - t});
                    s.labelText.setAttributes({text: o});
                    b = s.labelText.getBBox();
                    s.labelRect.setAttributes({width: b.width + C, x: -(b.width + C) / 2});
                    p.renderFrame()
                }
            }
        }
        K.horizontalLine.setAttributes({y: j, strokeStyle: J.attr.strokeStyle});
        K.verticalLine.setAttributes({x: k, strokeStyle: J.attr.strokeStyle});
        z.renderFrame();
        return false
    },
    onGestureEnd: function (h) {
        var l = this, k = l.getChart(), a = k.getSurface("overlay"), j = k.getAxes(), c, g, d, b, f;
        a.remove(l.verticalLine);
        a.remove(l.horizontalLine);
        for (f = 0; f < j.length; f++) {
            c = j[f];
            g = c.getPosition();
            d = c.getSurface();
            b = l.axesLabels[g];
            if (b) {
                delete l.axesLabels[g];
                d.remove(b)
            }
            d.renderFrame()
        }
        a.renderFrame();
        l.unlockEvents(l.getGesture())
    }
});
Ext.define("Ext.chart.interactions.ItemHighlight", {
    extend: "Ext.chart.interactions.Abstract",
    type: "itemhighlight",
    alias: "interaction.itemhighlight",
    config: {
        gestures: {
            tap: "onHighlightGesture",
            mousemove: "onMouseMoveGesture",
            mouseenter: "onMouseEnterGesture",
            mouseleave: "onMouseLeaveGesture",
            mousedown: "onMouseDownGesture",
            mouseup: "onMouseUpGesture"
        }
    },
    highlightItem: null,
    onMouseMoveGesture: function (f) {
        var c = this, b, d, a;
        if (c.isDragging) {
            if (c.tipItem) {
                c.tipItem.series.hideTip(c.tipItem);
                c.tipItem = null
            }
        } else {
            if (!c.highlightItem) {
                b = c.getItemForEvent(f);
                a = c.getChart();
                if (b !== a.getHighlightItem()) {
                    a.setHighlightItem(b);
                    c.sync()
                }
                if (this.isMousePointer) {
                    if (c.tipItem && (!b || c.tipItem.field !== b.field || c.tipItem.record !== b.record)) {
                        c.tipItem.series.hideTip(c.tipItem);
                        c.tipItem = null
                    }
                    if (b && (d = b.series.getTooltip())) {
                        if (d.trackMouse || !c.tipItem) {
                            b.series.showTip(b, f.getXY())
                        }
                        c.tipItem = b
                    }
                }
                return false
            }
        }
    },
    showTip: function (b, a) {
        a.series.showTip(a, b.getXY());
        this.tipItem = a
    },
    onMouseEnterGesture: function () {
        this.isMousePointer = true
    },
    onMouseLeaveGesture: function () {
        this.isMousePointer = false
    },
    onMouseDownGesture: function () {
        this.isDragging = true
    },
    onMouseUpGesture: function () {
        this.isDragging = false
    },
    onHighlightGesture: function (c) {
        if (this.isMousePointer) {
            return
        }
        var b = this, a = b.getItemForEvent(c);
        if (b.highlightItem && a && (b.highlightItem.index === a.index)) {
            a = null
        }
        b.highlightItem = a;
        b.getChart().setHighlightItem(a)
    }
});
Ext.define("Ext.chart.interactions.PanZoom", {
    extend: "Ext.chart.interactions.Abstract",
    type: "panzoom",
    alias: "interaction.panzoom",
    requires: ["Ext.draw.Animator"],
    config: {
        axes: {top: {}, right: {}, bottom: {}, left: {}},
        minZoom: null,
        maxZoom: null,
        showOverflowArrows: true,
        panGesture: "drag",
        zoomGesture: "pinch",
        zoomOnPanGesture: false,
        modeToggleButton: {
            xtype: "segmentedbutton",
            width: 200,
            defaults: {ui: "default-toolbar"},
            items: [{text: "Pan"}, {text: "Zoom"}],
            cls: Ext.baseCSSPrefix + "panzoom-toggle"
        },
        hideLabelInGesture: false
    },
    stopAnimationBeforeSync: true,
    applyAxes: function (b, a) {
        return Ext.merge(a || {}, b)
    },
    applyZoomOnPanGesture: function (a) {
        this.getChart();
        if (this.isMultiTouch()) {
            return false
        }
        return a
    },
    updateZoomOnPanGesture: function (b) {
        var a = this.getModeToggleButton();
        if (!this.isMultiTouch()) {
            a.show();
            if (b) {
                a.setValue(1)
            } else {
                a.setValue(0)
            }
        } else {
            a.hide()
        }
    },
    toggleMode: function () {
        var a = this;
        if (!a.isMultiTouch()) {
            a.setZoomOnPanGesture(!a.getZoomOnPanGesture())
        }
    },
    applyModeToggleButton: function (c, b) {
        var d = this, a = Ext.factory(c, "Ext.button.Segmented", b);
        if (a && !b) {
            a.addListener("toggle", function (e) {
                d.setZoomOnPanGesture(e.getValue() === 1)
            })
        }
        return a
    },
    getGestures: function () {
        var c = this, e = {}, d = c.getPanGesture(), b = c.getZoomGesture(), a = Ext.supports.Touch;
        e[b] = "onZoomGestureMove";
        e[b + "start"] = "onZoomGestureStart";
        e[b + "end"] = "onZoomGestureEnd";
        e[d] = "onPanGestureMove";
        e[d + "start"] = "onPanGestureStart";
        e[d + "end"] = "onPanGestureEnd";
        e.doubletap = "onDoubleTap";
        return e
    },
    onDoubleTap: function (h) {
        var f = this, c = f.getChart(), g = c.getAxes(), b, a, d;
        for (a = 0, d = g.length; a < d; a++) {
            b = g[a];
            b.setVisibleRange([0, 1])
        }
        c.redraw()
    },
    onPanGestureStart: function (d) {
        if (!d || !d.touches || d.touches.length < 2) {
            var b = this, a = b.getChart().getInnerRect(), c = b.getChart().element.getXY();
            b.startX = d.getX() - c[0] - a[0];
            b.startY = d.getY() - c[1] - a[1];
            b.oldVisibleRanges = null;
            b.hideLabels();
            b.getChart().suspendThicknessChanged();
            b.lockEvents(b.getPanGesture());
            return false
        }
    },
    onPanGestureMove: function (d) {
        var b = this;
        if (b.getLocks()[b.getPanGesture()] === b) {
            var a = b.getChart().getInnerRect(), c = b.getChart().element.getXY();
            if (b.getZoomOnPanGesture()) {
                b.transformAxesBy(b.getZoomableAxes(d), 0, 0, (d.getX() - c[0] - a[0]) / b.startX, b.startY / (d.getY() - c[1] - a[1]))
            } else {
                b.transformAxesBy(b.getPannableAxes(d), d.getX() - c[0] - a[0] - b.startX, d.getY() - c[1] - a[1] - b.startY, 1, 1)
            }
            b.sync();
            return false
        }
    },
    onPanGestureEnd: function (b) {
        var a = this, c = a.getPanGesture();
        if (a.getLocks()[c] === a) {
            a.getChart().resumeThicknessChanged();
            a.showLabels();
            a.sync();
            a.unlockEvents(c);
            return false
        }
    },
    onZoomGestureStart: function (b) {
        if (b.touches && b.touches.length === 2) {
            var c = this, i = c.getChart().element.getXY(), f = c.getChart().getInnerRect(), h = i[0] + f[0], d = i[1] + f[1], j = [b.touches[0].point.x - h, b.touches[0].point.y - d, b.touches[1].point.x - h, b.touches[1].point.y - d], g = Math.max(44, Math.abs(j[2] - j[0])), a = Math.max(44, Math.abs(j[3] - j[1]));
            c.getChart().suspendThicknessChanged();
            c.lastZoomDistances = [g, a];
            c.lastPoints = j;
            c.oldVisibleRanges = null;
            c.hideLabels();
            c.lockEvents(c.getZoomGesture());
            return false
        }
    },
    onZoomGestureMove: function (d) {
        var f = this;
        if (f.getLocks()[f.getZoomGesture()] === f) {
            var i = f.getChart().getInnerRect(), n = f.getChart().element.getXY(), k = n[0] + i[0], h = n[1] + i[1], o = Math.abs, c = f.lastPoints, m = [d.touches[0].point.x - k, d.touches[0].point.y - h, d.touches[1].point.x - k, d.touches[1].point.y - h], g = Math.max(44, o(m[2] - m[0])), b = Math.max(44, o(m[3] - m[1])), a = this.lastZoomDistances || [g, b], l = g / a[0], j = b / a[1];
            f.transformAxesBy(f.getZoomableAxes(d), i[2] * (l - 1) / 2 + m[2] - c[2] * l, i[3] * (j - 1) / 2 + m[3] - c[3] * j, l, j);
            f.sync();
            return false
        }
    },
    onZoomGestureEnd: function (c) {
        var b = this, a = b.getZoomGesture();
        if (b.getLocks()[a] === b) {
            b.getChart().resumeThicknessChanged();
            b.showLabels();
            b.sync();
            b.unlockEvents(a);
            return false
        }
    },
    hideLabels: function () {
        if (this.getHideLabelInGesture()) {
            this.eachInteractiveAxes(function (a) {
                a.hideLabels()
            })
        }
    },
    showLabels: function () {
        if (this.getHideLabelInGesture()) {
            this.eachInteractiveAxes(function (a) {
                a.showLabels()
            })
        }
    },
    isEventOnAxis: function (c, a) {
        var b = a.getSurface().getRect();
        return b[0] <= c.getX() && c.getX() <= b[0] + b[2] && b[1] <= c.getY() && c.getY() <= b[1] + b[3]
    },
    getPannableAxes: function (d) {
        var h = this, a = h.getAxes(), f = h.getChart().getAxes(), c, g = f.length, k = [], j = false, b;
        if (d) {
            for (c = 0; c < g; c++) {
                if (this.isEventOnAxis(d, f[c])) {
                    j = true;
                    break
                }
            }
        }
        for (c = 0; c < g; c++) {
            b = a[f[c].getPosition()];
            if (b && b.allowPan !== false && (!j || this.isEventOnAxis(d, f[c]))) {
                k.push(f[c])
            }
        }
        return k
    },
    getZoomableAxes: function (f) {
        var j = this, a = j.getAxes(), g = j.getChart().getAxes(), l = [], d, h = g.length, c, k = false, b;
        if (f) {
            for (d = 0; d < h; d++) {
                if (this.isEventOnAxis(f, g[d])) {
                    k = true;
                    break
                }
            }
        }
        for (d = 0; d < h; d++) {
            c = g[d];
            b = a[c.getPosition()];
            if (b && b.allowZoom !== false && (!k || this.isEventOnAxis(f, c))) {
                l.push(c)
            }
        }
        return l
    },
    eachInteractiveAxes: function (c) {
        var d = this, b = d.getAxes(), e = d.getChart().getAxes();
        for (var a = 0; a < e.length; a++) {
            if (b[e[a].getPosition()]) {
                if (false === c.call(this, e[a])) {
                    return
                }
            }
        }
    },
    transformAxesBy: function (d, j, g, h, e) {
        var f = this.getChart().getInnerRect(), a = this.getAxes(), k, b = this.oldVisibleRanges, l = false;
        if (!b) {
            this.oldVisibleRanges = b = {};
            this.eachInteractiveAxes(function (i) {
                b[i.getId()] = i.getVisibleRange()
            })
        }
        if (!f) {
            return
        }
        for (var c = 0; c < d.length; c++) {
            k = a[d[c].getPosition()];
            l = this.transformAxisBy(d[c], b[d[c].getId()], j, g, h, e, this.minZoom || k.minZoom, this.maxZoom || k.maxZoom) || l
        }
        return l
    },
    transformAxisBy: function (c, o, r, q, k, i, h, m) {
        var s = this, b = o[1] - o[0], l = c.getVisibleRange(), g = h || s.getMinZoom() || c.config.minZoom, j = m || s.getMaxZoom() || c.config.maxZoom, a = s.getChart().getInnerRect(), f, p;
        if (!a) {
            return
        }
        var d = c.isSide(), e = d ? a[3] : a[2], n = d ? -q : r;
        b /= d ? i : k;
        if (b < 0) {
            b = -b
        }
        if (b * g > 1) {
            b = 1
        }
        if (b * j < 1) {
            b = 1 / j
        }
        f = o[0];
        p = o[1];
        l = l[1] - l[0];
        if (b === l && l === 1) {
            return
        }
        c.setVisibleRange([(o[0] + o[1] - b) * 0.5 - n / e * b, (o[0] + o[1] + b) * 0.5 - n / e * b]);
        return (Math.abs(f - c.getVisibleRange()[0]) > 1e-10 || Math.abs(p - c.getVisibleRange()[1]) > 1e-10)
    },
    destroy: function () {
        this.setModeToggleButton(null);
        this.callParent()
    }
});
Ext.define("Ext.chart.interactions.Rotate", {
    extend: "Ext.chart.interactions.Abstract",
    type: "rotate",
    alias: "interaction.rotate",
    config: {
        gesture: "rotate",
        gestures: {
            rotate: "onRotate",
            rotateend: "onRotate",
            dragstart: "onGestureStart",
            drag: "onGesture",
            dragend: "onGestureEnd"
        },
        rotation: 0
    },
    oldRotations: null,
    getAngle: function (f) {
        var c = this, b = c.getChart(), d = b.getEventXY(f), a = b.getCenter();
        return Math.atan2(d[1] - a[1], d[0] - a[0])
    },
    getEventRadius: function (h) {
        var f = this, d = f.getChart(), g = d.getEventXY(h), a = d.getCenter(), c = g[0] - a[0], b = g[1] - a[1];
        return Math.sqrt(c * c + b * b)
    },
    onGestureStart: function (f) {
        var d = this, c = d.getChart(), b = c.getRadius(), a = d.getEventRadius(f);
        if (b >= a) {
            d.lockEvents("drag");
            d.angle = d.getAngle(f);
            d.oldRotations = {};
            return false
        }
    },
    onGesture: function (b) {
        var a = this, c = a.getAngle(b) - a.angle;
        if (a.getLocks().drag === a) {
            a.doRotateTo(c, true);
            return false
        }
    },
    doRotateTo: function (d, a, b) {
        var n = this, l = n.getChart(), k = l.getAxes(), f = l.getSeries(), m = n.oldRotations, c, j, g, e, h;
        if (!b) {
            l.suspendAnimation()
        }
        for (e = 0, h = k.length; e < h; e++) {
            c = k[e];
            g = m[c.getId()] || (m[c.getId()] = c.getRotation());
            c.setRotation(d + (a ? g : 0))
        }
        for (e = 0, h = f.length; e < h; e++) {
            j = f[e];
            g = m[j.getId()] || (m[j.getId()] = j.getRotation());
            j.setRotation(d + (a ? g : 0))
        }
        n.setRotation(d + (a ? g : 0));
        n.fireEvent("rotate", n, n.getRotation());
        n.sync();
        if (!b) {
            l.resumeAnimation()
        }
    },
    rotateTo: function (c, b, a) {
        this.doRotateTo(c, b, a);
        this.oldRotations = {}
    },
    onGestureEnd: function (b) {
        var a = this;
        if (a.getLocks().drag === a) {
            a.onGesture(b);
            a.unlockEvents("drag");
            a.fireEvent("rotationEnd", a, a.getRotation());
            return false
        }
    },
    onRotate: function (a) {
    }
});
Ext.define("Ext.chart.interactions.RotatePie3D", {
    extend: "Ext.chart.interactions.Rotate",
    type: "rotatePie3d",
    alias: "interaction.rotatePie3d",
    getAngle: function (g) {
        var a = this.getChart(), f = a.getInherited().rtl, d = f ? -1 : 1, h = g.getXY(), c = a.element.getXY(), b = a.getMainRect();
        return d * Math.atan2(h[1] - c[1] - b[3] * 0.5, h[0] - c[0] - b[2] * 0.5)
    }
});
Ext.define("Ext.chart.plugin.ItemEvents", {
    extend: "Ext.plugin.Abstract",
    alias: "plugin.chartitemevents",
    moveEvents: false,
    mouseMoveEvents: {mousemove: true, mouseover: true, mouseout: true},
    itemMouseMoveEvents: {itemmousemove: true, itemmouseover: true, itemmouseout: true},
    init: function (b) {
        var a = "handleEvent";
        this.chart = b;
        b.addElementListener({
            click: a,
            dblclick: a,
            mousedown: a,
            mousemove: a,
            mouseup: a,
            mouseover: a,
            mouseout: a,
            priority: 1001,
            scope: this
        })
    },
    hasItemMouseMoveListeners: function () {
        var b = this.chart.hasListeners, a;
        for (a in this.itemMouseMoveEvents) {
            if (a in b) {
                return true
            }
        }
        return false
    },
    handleEvent: function (g) {
        var d = this, a = d.chart, h = g.type in d.mouseMoveEvents, c = d.lastItem, f, b;
        if (h && !d.hasItemMouseMoveListeners() && !d.moveEvents) {
            return
        }
        f = a.getEventXY(g);
        b = a.getItemForPoint(f[0], f[1]);
        if (h && !Ext.Object.equals(b, c)) {
            if (b) {
                a.fireEvent("itemmouseover", a, b, g);
                b.series.fireEvent("itemmouseover", b.series, b, g)
            }
            if (c) {
                a.fireEvent("itemmouseout", a, c, g);
                c.series.fireEvent("itemmouseout", c.series, c, g)
            }
        }
        if (b) {
            a.fireEvent("item" + g.type, a, b, g);
            b.series.fireEvent("item" + g.type, b.series, b, g)
        }
        d.lastItem = b
    }
});
Ext.define("Ext.chart.series.Cartesian", {
    extend: "Ext.chart.series.Series",
    config: {xField: null, yField: null, xAxis: null, yAxis: null},
    directions: ["X", "Y"],
    fieldCategoryX: ["X"],
    fieldCategoryY: ["Y"],
    applyXAxis: function (a, b) {
        return this.getChart().getAxis(a) || b
    },
    applyYAxis: function (a, b) {
        return this.getChart().getAxis(a) || b
    },
    updateXAxis: function (a) {
        a.processData(this)
    },
    updateYAxis: function (a) {
        a.processData(this)
    },
    coordinateX: function () {
        return this.coordinate("X", 0, 2)
    },
    coordinateY: function () {
        return this.coordinate("Y", 1, 2)
    },
    getItemForPoint: function (a, g) {
        if (this.getSprites()) {
            var f = this, d = f.getSprites()[0], b = f.getStore(), e, c;
            if (f.getHidden()) {
                return null
            }
            if (d) {
                c = d.getIndexNearPoint(a, g);
                if (c !== -1) {
                    e = {
                        series: f,
                        category: f.getItemInstancing() ? "items" : "markers",
                        index: c,
                        record: b.getData().items[c],
                        field: f.getYField(),
                        sprite: d
                    };
                    return e
                }
            }
        }
    },
    createSprite: function () {
        var c = this, a = c.callParent(), b = c.getChart(), d = c.getXAxis();
        a.setAttributes({flipXY: b.getFlipXY(), xAxis: d});
        if (a.setAggregator && d && d.getAggregator) {
            if (d.getAggregator) {
                a.setAggregator({strategy: d.getAggregator()})
            } else {
                a.setAggregator({})
            }
        }
        return a
    },
    getSprites: function () {
        var d = this, c = this.getChart(), e = d.getAnimation() || c && c.getAnimation(), b = d.getItemInstancing(), f = d.sprites, a;
        if (!c) {
            return []
        }
        if (!f.length) {
            a = d.createSprite()
        } else {
            a = f[0]
        }
        if (e) {
            d.getLabel().getTemplate().fx.setConfig(e);
            if (b) {
                a.itemsMarker.getTemplate().fx.setConfig(e)
            }
            a.fx.setConfig(e)
        }
        return f
    },
    provideLegendInfo: function (d) {
        var b = this, a = b.getSubStyleWithTheme(), c = a.fillStyle;
        if (Ext.isArray(c)) {
            c = c[0]
        }
        d.push({
            name: b.getTitle() || b.getYField() || b.getId(),
            mark: (Ext.isObject(c) ? c.stops && c.stops[0].color : c) || a.strokeStyle || "black",
            disabled: b.getHidden(),
            series: b.getId(),
            index: 0
        })
    },
    getXRange: function () {
        return [this.dataRange[0], this.dataRange[2]]
    },
    getYRange: function () {
        return [this.dataRange[1], this.dataRange[3]]
    }
});
Ext.define("Ext.chart.series.StackedCartesian", {
    extend: "Ext.chart.series.Cartesian",
    config: {stacked: true, splitStacks: true, fullStack: false, fullStackTotal: 100, hidden: []},
    animatingSprites: 0,
    themeColorCount: function () {
        var b = this, a = b.getYField();
        return Ext.isArray(a) ? a.length : 1
    },
    updateStacked: function () {
        this.processData()
    },
    updateSplitStacks: function () {
        this.processData()
    },
    coordinateY: function () {
        return this.coordinateStacked("Y", 1, 2)
    },
    coordinateStacked: function (D, e, m) {
        var F = this, f = F.getStore(), r = f.getData().items, B = r.length, c = F["get" + D + "Axis"](), x = F.getHidden(), a = F.getSplitStacks(), z = F.getFullStack(), l = F.getFullStackTotal(), p = {
            min: 0,
            max: 0
        }, n = F["fieldCategory" + D], C = [], o = [], E = [], h, A = F.getStacked(), g = F.getSprites(), q = [], w, v, u, s, H, y, b, d, G, t;
        if (!g.length) {
            return
        }
        for (w = 0; w < n.length; w++) {
            d = n[w];
            s = F.getFields([d]);
            H = s.length;
            for (v = 0; v < B; v++) {
                C[v] = 0;
                o[v] = 0;
                E[v] = 0
            }
            for (v = 0; v < H; v++) {
                if (!x[v]) {
                    q[v] = F.coordinateData(r, s[v], c)
                }
            }
            if (A && z) {
                y = [];
                if (a) {
                    b = []
                }
                for (v = 0; v < B; v++) {
                    y[v] = 0;
                    if (a) {
                        b[v] = 0
                    }
                    for (u = 0; u < H; u++) {
                        G = q[u];
                        if (!G) {
                            continue
                        }
                        G = G[v];
                        if (G >= 0 || !a) {
                            y[v] += G
                        } else {
                            if (G < 0) {
                                b[v] += G
                            }
                        }
                    }
                }
            }
            for (v = 0; v < H; v++) {
                t = {};
                if (x[v]) {
                    t["dataStart" + d] = C;
                    t["data" + d] = C;
                    g[v].setAttributes(t);
                    continue
                }
                G = q[v];
                if (A) {
                    h = [];
                    for (u = 0; u < B; u++) {
                        if (!G[u]) {
                            G[u] = 0
                        }
                        if (G[u] >= 0 || !a) {
                            if (z && y[u]) {
                                G[u] *= l / y[u]
                            }
                            C[u] = o[u];
                            o[u] += G[u];
                            h[u] = o[u]
                        } else {
                            if (z && b[u]) {
                                G[u] *= l / b[u]
                            }
                            C[u] = E[u];
                            E[u] += G[u];
                            h[u] = E[u]
                        }
                    }
                    t["dataStart" + d] = C;
                    t["data" + d] = h;
                    F.getRangeOfData(C, p);
                    F.getRangeOfData(h, p)
                } else {
                    t["dataStart" + d] = C;
                    t["data" + d] = G;
                    F.getRangeOfData(G, p)
                }
                g[v].setAttributes(t)
            }
        }
        F.dataRange[e] = p.min;
        F.dataRange[e + m] = p.max;
        t = {};
        t["dataMin" + D] = p.min;
        t["dataMax" + D] = p.max;
        for (w = 0; w < g.length; w++) {
            g[w].setAttributes(t)
        }
    },
    getFields: function (f) {
        var e = this, a = [], c, b, d;
        for (b = 0, d = f.length; b < d; b++) {
            c = e["get" + f[b] + "Field"]();
            if (Ext.isArray(c)) {
                a.push.apply(a, c)
            } else {
                a.push(c)
            }
        }
        return a
    },
    updateLabelOverflowPadding: function (a) {
        this.getLabel().setAttributes({labelOverflowPadding: a})
    },
    getSprites: function () {
        var k = this, j = k.getChart(), c = k.getAnimation() || j && j.getAnimation(), f = k.getFields(k.fieldCategoryY), b = k.getItemInstancing(), h = k.sprites, l, e = k.getHidden(), g = false, d, a = f.length;
        if (!j) {
            return []
        }
        for (d = 0; d < a; d++) {
            l = h[d];
            if (!l) {
                l = k.createSprite();
                l.setAttributes({zIndex: -d});
                l.setField(f[d]);
                g = true;
                e.push(false);
                if (b) {
                    l.itemsMarker.getTemplate().setAttributes(k.getStyleByIndex(d))
                } else {
                    l.setAttributes(k.getStyleByIndex(d))
                }
            }
            if (c) {
                if (b) {
                    l.itemsMarker.getTemplate().fx.setConfig(c)
                }
                l.fx.setConfig(c)
            }
        }
        if (g) {
            k.updateHidden(e)
        }
        return h
    },
    getItemForPoint: function (k, j) {
        if (this.getSprites()) {
            var h = this, b, g, m, a = h.getItemInstancing(), f = h.getSprites(), l = h.getStore(), c = h.getHidden(), n, d, e;
            for (b = 0, g = f.length; b < g; b++) {
                if (!c[b]) {
                    m = f[b];
                    d = m.getIndexNearPoint(k, j);
                    if (d !== -1) {
                        e = h.getYField();
                        n = {
                            series: h,
                            index: d,
                            category: a ? "items" : "markers",
                            record: l.getData().items[d],
                            field: typeof e === "string" ? e : e[b],
                            sprite: m
                        };
                        return n
                    }
                }
            }
            return null
        }
    },
    provideLegendInfo: function (e) {
        var g = this, f = g.getSprites(), h = g.getTitle(), j = g.getYField(), d = g.getHidden(), k = f.length === 1, b, l, c, a;
        for (c = 0; c < f.length; c++) {
            b = g.getStyleByIndex(c);
            l = b.fillStyle;
            if (Ext.isArray(h)) {
                a = h[c]
            } else {
                if (k) {
                    a = h
                } else {
                    if (Ext.isArray(j)) {
                        a = j[c]
                    } else {
                        a = g.getId()
                    }
                }
            }
            e.push({
                name: a,
                mark: (Ext.isObject(l) ? l.stops && l.stops[0].color : l) || b.strokeStyle || "black",
                disabled: d[c],
                series: g.getId(),
                index: c
            })
        }
    },
    onSpriteAnimationStart: function (a) {
        this.animatingSprites++;
        if (this.animatingSprites === 1) {
            this.fireEvent("animationstart")
        }
    },
    onSpriteAnimationEnd: function (a) {
        this.animatingSprites--;
        if (this.animatingSprites === 0) {
            this.fireEvent("animationend")
        }
    }
});
Ext.define("Ext.chart.series.sprite.Cartesian", {
    extend: "Ext.draw.sprite.Sprite",
    mixins: {markerHolder: "Ext.chart.MarkerHolder"},
    inheritableStatics: {
        def: {
            processors: {
                dataMinX: "number",
                dataMaxX: "number",
                dataMinY: "number",
                dataMaxY: "number",
                rangeX: "data",
                rangeY: "data",
                dataY: "data",
                dataX: "data",
                labels: "default",
                labelOverflowPadding: "number",
                selectionTolerance: "number",
                flipXY: "bool",
                renderer: "default",
                visibleMinX: "number",
                visibleMinY: "number",
                visibleMaxX: "number",
                visibleMaxY: "number",
                innerWidth: "number",
                innerHeight: "number"
            },
            defaults: {
                dataY: null,
                dataX: null,
                dataMinX: 0,
                dataMaxX: 1,
                dataMinY: 0,
                dataMaxY: 1,
                labels: null,
                labelOverflowPadding: 10,
                selectionTolerance: 20,
                flipXY: false,
                renderer: null,
                transformFillStroke: false,
                visibleMinX: 0,
                visibleMinY: 0,
                visibleMaxX: 1,
                visibleMaxY: 1,
                innerWidth: 1,
                innerHeight: 1
            },
            triggers: {
                dataX: "dataX,bbox",
                dataY: "dataY,bbox",
                dataMinX: "bbox",
                dataMaxX: "bbox",
                dataMinY: "bbox",
                dataMaxY: "bbox",
                visibleMinX: "panzoom",
                visibleMinY: "panzoom",
                visibleMaxX: "panzoom",
                visibleMaxY: "panzoom",
                innerWidth: "panzoom",
                innerHeight: "panzoom"
            },
            updaters: {
                dataX: function (a) {
                    this.processDataX();
                    this.scheduleUpdaters(a, {dataY: ["dataY"]})
                }, dataY: function () {
                    this.processDataY()
                }, panzoom: function (c) {
                    var e = c.visibleMaxX - c.visibleMinX, d = c.visibleMaxY - c.visibleMinY, b = c.flipXY ? c.innerHeight : c.innerWidth, g = !c.flipXY ? c.innerHeight : c.innerWidth, a = this.getSurface(), f = a ? a.getInherited().rtl : false;
                    if (f && !c.flipXY) {
                        c.translationX = b + c.visibleMinX * b / e
                    } else {
                        c.translationX = -c.visibleMinX * b / e
                    }
                    c.translationY = -c.visibleMinY * g / d;
                    c.scalingX = (f && !c.flipXY ? -1 : 1) * b / e;
                    c.scalingY = g / d;
                    c.scalingCenterX = 0;
                    c.scalingCenterY = 0;
                    this.applyTransformations(true)
                }
            }
        }
    },
    config: {store: null, field: null},
    processDataY: Ext.emptyFn,
    processDataX: Ext.emptyFn,
    updatePlainBBox: function (b) {
        var a = this.attr;
        b.x = a.dataMinX;
        b.y = a.dataMinY;
        b.width = a.dataMaxX - a.dataMinX;
        b.height = a.dataMaxY - a.dataMinY
    },
    binarySearch: function (d) {
        var b = this.attr.dataX, f = 0, a = b.length;
        if (d <= b[0]) {
            return f
        }
        if (d >= b[a - 1]) {
            return a - 1
        }
        while (f + 1 < a) {
            var c = (f + a) >> 1, e = b[c];
            if (e === d) {
                return c
            } else {
                if (e < d) {
                    f = c
                } else {
                    a = c
                }
            }
        }
        return f
    },
    render: function (b, c, g) {
        var f = this, a = f.attr, e = a.inverseMatrix.clone();
        e.appendMatrix(b.inverseMatrix);
        if (a.dataX === null || a.dataX === undefined) {
            return
        }
        if (a.dataY === null || a.dataY === undefined) {
            return
        }
        if (e.getXX() * e.getYX() || e.getXY() * e.getYY()) {
            console.log("Cartesian Series sprite does not support rotation/sheering");
            return
        }
        var d = e.transformList([[g[0] - 1, g[3] + 1], [g[0] + g[2] + 1, -1]]);
        d = d[0].concat(d[1]);
        f.renderClipped(b, c, d, g)
    },
    renderClipped: Ext.emptyFn,
    getIndexNearPoint: function (f, e) {
        var w = this, q = w.attr.matrix, h = w.attr.dataX, g = w.attr.dataY, k = w.attr.selectionTolerance, t, r, c = -1, j = q.clone().prependMatrix(w.surfaceMatrix).inverse(), u = j.transformPoint([f, e]), b = j.transformPoint([f - k, e - k]), n = j.transformPoint([f + k, e + k]), a = Math.min(b[0], n[0]), s = Math.max(b[0], n[0]), l = Math.min(b[1], n[1]), d = Math.max(b[1], n[1]), m, v, o, p;
        for (o = 0, p = h.length; o < p; o++) {
            m = h[o];
            v = g[o];
            if (m > a && m < s && v > l && v < d) {
                if (c === -1 || (Math.abs(m - u[0]) < t) && (Math.abs(v - u[1]) < r)) {
                    t = Math.abs(m - u[0]);
                    r = Math.abs(v - u[1]);
                    c = o
                }
            }
        }
        return c
    }
});
Ext.define("Ext.chart.series.sprite.StackedCartesian", {
    extend: "Ext.chart.series.sprite.Cartesian",
    inheritableStatics: {
        def: {
            processors: {groupCount: "number", groupOffset: "number", dataStartY: "data"},
            defaults: {selectionTolerance: 20, groupCount: 1, groupOffset: 0, dataStartY: null},
            triggers: {dataStartY: "dataY,bbox"}
        }
    },
    getIndexNearPoint: function (e, d) {
        var o = this, q = o.attr.matrix, h = o.attr.dataX, f = o.attr.dataY, u = o.attr.dataStartY, l = o.attr.selectionTolerance, s = 0.5, r = Infinity, b = -1, k = q.clone().prependMatrix(this.surfaceMatrix).inverse(), t = k.transformPoint([e, d]), a = k.transformPoint([e - l, d - l]), n = k.transformPoint([e + l, d + l]), m = Math.min(a[1], n[1]), c = Math.max(a[1], n[1]), j, g;
        for (var p = 0; p < h.length; p++) {
            if (Math.min(u[p], f[p]) <= c && m <= Math.max(u[p], f[p])) {
                j = Math.abs(h[p] - t[0]);
                g = Math.max(-Math.min(f[p] - t[1], t[1] - u[p]), 0);
                if (j < s && g <= r) {
                    s = j;
                    r = g;
                    b = p
                }
            }
        }
        return b
    }
});
Ext.define("Ext.chart.series.sprite.Area", {
    alias: "sprite.areaSeries",
    extend: "Ext.chart.series.sprite.StackedCartesian",
    inheritableStatics: {def: {processors: {step: "bool"}, defaults: {step: false}}},
    renderClipped: function (q, s, A) {
        var B = this, p = B.attr, l = p.dataX, j = p.dataY, C = p.dataStartY, t = p.matrix, h, g, v, f, d, z, w, e = t.elements[0], m = t.elements[4], o = t.elements[3], k = t.elements[5], c = B.surfaceMatrix, n = {}, r = Math.min(A[0], A[2]), u = Math.max(A[0], A[2]), b = Math.max(0, this.binarySearch(r)), a = Math.min(l.length - 1, this.binarySearch(u) + 1);
        s.beginPath();
        z = l[b] * e + m;
        w = j[b] * o + k;
        s.moveTo(z, w);
        if (p.step) {
            d = w;
            for (v = b; v <= a; v++) {
                h = l[v] * e + m;
                g = j[v] * o + k;
                s.lineTo(h, d);
                s.lineTo(h, d = g)
            }
        } else {
            for (v = b; v <= a; v++) {
                h = l[v] * e + m;
                g = j[v] * o + k;
                s.lineTo(h, g)
            }
        }
        if (C) {
            if (p.step) {
                f = l[a] * e + m;
                for (v = a; v >= b; v--) {
                    h = l[v] * e + m;
                    g = C[v] * o + k;
                    s.lineTo(f, g);
                    s.lineTo(f = h, g)
                }
            } else {
                for (v = a; v >= b; v--) {
                    h = l[v] * e + m;
                    g = C[v] * o + k;
                    s.lineTo(h, g)
                }
            }
        } else {
            s.lineTo(l[a] * e + m, g);
            s.lineTo(l[a] * e + m, k);
            s.lineTo(z, k);
            s.lineTo(z, j[v] * o + k)
        }
        if (p.transformFillStroke) {
            p.matrix.toContext(s)
        }
        s.fill();
        if (p.transformFillStroke) {
            p.inverseMatrix.toContext(s)
        }
        s.beginPath();
        s.moveTo(z, w);
        if (p.step) {
            for (v = b; v <= a; v++) {
                h = l[v] * e + m;
                g = j[v] * o + k;
                s.lineTo(h, d);
                s.lineTo(h, d = g);
                n.translationX = c.x(h, g);
                n.translationY = c.y(h, g);
                B.putMarker("markers", n, v, !p.renderer)
            }
        } else {
            for (v = b; v <= a; v++) {
                h = l[v] * e + m;
                g = j[v] * o + k;
                s.lineTo(h, g);
                n.translationX = c.x(h, g);
                n.translationY = c.y(h, g);
                B.putMarker("markers", n, v, !p.renderer)
            }
        }
        if (p.transformFillStroke) {
            p.matrix.toContext(s)
        }
        s.stroke()
    }
});
Ext.define("Ext.chart.series.Area", {
    extend: "Ext.chart.series.StackedCartesian",
    alias: "series.area",
    type: "area",
    seriesType: "areaSeries",
    requires: ["Ext.chart.series.sprite.Area"],
    config: {splitStacks: false}
});
Ext.define("Ext.chart.series.sprite.Bar", {
    alias: "sprite.barSeries",
    extend: "Ext.chart.series.sprite.StackedCartesian",
    inheritableStatics: {
        def: {
            processors: {
                minBarWidth: "number",
                maxBarWidth: "number",
                minGapWidth: "number",
                radius: "number",
                inGroupGapWidth: "number"
            }, defaults: {minBarWidth: 2, maxBarWidth: 100, minGapWidth: 5, inGroupGapWidth: 3, radius: 0}
        }
    },
    drawLabel: function (k, i, r, h, o) {
        var p = this, n = p.attr, f = p.getBoundMarker("labels")[0], d = f.getTemplate(), l = p.labelCfg || (p.labelCfg = {}), c = p.surfaceMatrix, j = n.labelOverflowPadding, b = d.attr.display, m = d.attr.orientation, g, e, a, q, s;
        l.x = c.x(i, h);
        l.y = c.y(i, h);
        if (!n.flipXY) {
            l.rotationRads = -Math.PI * 0.5
        } else {
            l.rotationRads = 0
        }
        l.calloutVertical = !n.flipXY;
        switch (m) {
            case"horizontal":
                l.rotationRads = 0;
                l.calloutVertical = false;
                break;
            case"vertical":
                l.rotationRads = -Math.PI * 0.5;
                l.calloutVertical = true;
                break
        }
        l.text = k;
        if (d.attr.renderer) {
            q = d.attr.renderer.call(this, k, f, l, {store: this.getStore()}, o);
            if (typeof q === "string") {
                l.text = q
            } else {
                if (typeof q === "object") {
                    if ("text" in q) {
                        l.text = q.text
                    }
                    s = true
                }
            }
        }
        a = p.getMarkerBBox("labels", o, true);
        if (!a) {
            p.putMarker("labels", l, o);
            a = p.getMarkerBBox("labels", o, true)
        }
        e = (a.width / 2 + j);
        if (r > h) {
            e = -e
        }
        if ((m === "horizontal" && n.flipXY) || (m === "vertical" && !n.flipXY) || !m) {
            g = (b === "insideStart") ? r + e : h - e
        } else {
            g = (b === "insideStart") ? r + j * 2 : h - j * 2
        }
        l.x = c.x(i, g);
        l.y = c.y(i, g);
        g = (b === "insideStart") ? r - e : h + e;
        l.calloutPlaceX = c.x(i, g);
        l.calloutPlaceY = c.y(i, g);
        g = (b === "insideStart") ? r : h;
        l.calloutStartX = c.x(i, g);
        l.calloutStartY = c.y(i, g);
        if (r > h) {
            e = -e
        }
        if (Math.abs(h - r) <= e * 2 || b === "outside") {
            l.callout = 1
        } else {
            l.callout = 0
        }
        if (s) {
            Ext.apply(l, q)
        }
        p.putMarker("labels", l, o)
    },
    drawBar: function (l, b, d, c, h, k, a, e) {
        var g = this, j = {}, f = g.attr.renderer, i;
        j.x = c;
        j.y = h;
        j.width = k - c;
        j.height = a - h;
        j.radius = g.attr.radius;
        if (f) {
            i = f.call(g, g, j, {store: g.getStore()}, e);
            Ext.apply(j, i)
        }
        g.putMarker("items", j, e, !f)
    },
    renderClipped: function (F, t, E, B) {
        if (this.cleanRedraw) {
            return
        }
        var p = this, n = p.attr, v = n.dataX, u = n.dataY, G = n.labels, m = n.dataStartY, l = n.groupCount, D = n.groupOffset - (l - 1) * 0.5, y = n.inGroupGapWidth, s = t.lineWidth, C = n.matrix, A = C.elements[0], h = C.elements[3], e = C.elements[4], d = F.roundPixel(C.elements[5]) - 1, J = (A < 0 ? -1 : 1) * A - n.minGapWidth, j = (Math.min(J, n.maxBarWidth) - y * (l - 1)) / l, z = F.roundPixel(Math.max(n.minBarWidth, j)), c = p.surfaceMatrix, f, H, b, g, K, a, k = 0.5 * n.lineWidth, L = Math.min(E[0], E[2]), w = Math.max(E[0], E[2]), x = Math.max(0, Math.floor(L)), o = Math.min(v.length - 1, Math.ceil(w)), I = G && p.getBoundMarker("labels"), r, q;
        for (K = x; K <= o; K++) {
            r = m ? m[K] : 0;
            q = u[K];
            a = v[K] * A + e + D * (z + y);
            f = F.roundPixel(a - z / 2) + k;
            g = F.roundPixel(q * h + d + s);
            H = F.roundPixel(a + z / 2) - k;
            b = F.roundPixel(r * h + d + s);
            p.drawBar(t, F, E, f, g - k, H, b - k, K);
            if (I && G[K]) {
                p.drawLabel(G[K], a, b, g, K)
            }
            p.putMarker("markers", {translationX: c.x(a, g), translationY: c.y(a, g)}, K, true)
        }
    },
    getIndexNearPoint: function (l, k) {
        var m = this, g = m.attr, h = g.dataX, a = m.getSurface(), b = a.getRect() || [0, 0, 0, 0], j = b[3], e, d, c, n, f = -1;
        if (g.flipXY) {
            e = j - k;
            if (a.getInherited().rtl) {
                d = b[2] - l
            } else {
                d = l
            }
        } else {
            e = l;
            d = j - k
        }
        for (c = 0; c < h.length; c++) {
            n = m.getMarkerBBox("items", c);
            if (Ext.draw.Draw.isPointInBBox(e, d, n)) {
                f = c;
                break
            }
        }
        return f
    }
});
Ext.define("Ext.chart.series.Bar", {
    extend: "Ext.chart.series.StackedCartesian",
    alias: "series.bar",
    type: "bar",
    seriesType: "barSeries",
    requires: ["Ext.chart.series.sprite.Bar", "Ext.draw.sprite.Rect"],
    config: {itemInstancing: {type: "rect", fx: {customDurations: {x: 0, y: 0, width: 0, height: 0, radius: 0}}}},
    getItemForPoint: function (a, f) {
        if (this.getSprites()) {
            var d = this, c = d.getChart(), e = c.getInnerPadding(), b = c.getInherited().rtl;
            arguments[0] = a + (b ? e.right : -e.left);
            arguments[1] = f + e.bottom;
            return d.callParent(arguments)
        }
    },
    updateXAxis: function (a) {
        a.setLabelInSpan(true);
        this.callParent(arguments)
    },
    updateHidden: function (a) {
        this.callParent(arguments);
        this.updateStacked()
    },
    updateStacked: function (c) {
        var f = this.getSprites(), d = f.length, e = [], a = {}, b;
        for (b = 0; b < d; b++) {
            if (!f[b].attr.hidden) {
                e.push(f[b])
            }
        }
        d = e.length;
        if (this.getStacked()) {
            a.groupCount = 1;
            a.groupOffset = 0;
            for (b = 0; b < d; b++) {
                e[b].setAttributes(a)
            }
        } else {
            a.groupCount = e.length;
            for (b = 0; b < d; b++) {
                a.groupOffset = b;
                e[b].setAttributes(a)
            }
        }
        this.callParent(arguments)
    }
});
Ext.define("Ext.chart.series.sprite.Bar3D", {
    extend: "Ext.chart.series.sprite.Bar",
    alias: "sprite.bar3dSeries",
    requires: ["Ext.draw.gradient.Linear"],
    inheritableStatics: {
        def: {
            processors: {depthWidthRatio: "number"},
            defaults: {depthWidthRatio: 1 / 3, transformFillStroke: true},
            triggers: {groupCount: "panzoom"},
            updaters: {
                panzoom: function (c) {
                    var g = this, e = c.visibleMaxX - c.visibleMinX, d = c.visibleMaxY - c.visibleMinY, b = c.flipXY ? c.innerHeight : c.innerWidth, h = !c.flipXY ? c.innerHeight : c.innerWidth, a = g.getSurface(), f = a ? a.getInherited().rtl : false;
                    if (f && !c.flipXY) {
                        c.translationX = b + c.visibleMinX * b / e
                    } else {
                        c.translationX = -c.visibleMinX * b / e
                    }
                    c.translationY = -c.visibleMinY * (h - g.depth) / d;
                    c.scalingX = (f && !c.flipXY ? -1 : 1) * b / e;
                    c.scalingY = (h - g.depth) / d;
                    c.scalingCenterX = 0;
                    c.scalingCenterY = 0;
                    g.applyTransformations(true)
                }
            }
        }
    },
    config: {showStroke: false, series: null},
    depth: 0,
    drawBar: function (o, b, d, c, k, n, a, g) {
        var j = this, h = j.attr, m = {}, i = h.renderer, l, f, e;
        m.x = (c + n) * 0.5;
        m.y = k;
        m.width = (n - c) * 0.75;
        m.height = a - k;
        m.depth = f = m.width * h.depthWidthRatio;
        m.orientation = h.flipXY ? "horizontal" : "vertical";
        if (f !== j.depth) {
            j.depth = f;
            e = j.getSeries();
            e.fireEvent("depthchange", e, f)
        }
        if (i) {
            l = i.call(j, j, m, {store: j.getStore()}, g);
            Ext.apply(m, l)
        }
        j.putMarker("items", m, g, !i)
    }
});
Ext.define("Ext.chart.series.sprite.Box", {
    extend: "Ext.draw.sprite.Sprite",
    alias: "sprite.box",
    type: "box",
    inheritableStatics: {
        def: {
            processors: {
                x: "number",
                y: "number",
                width: "number",
                height: "number",
                depth: "number",
                orientation: "enums(vertical,horizontal)",
                showStroke: "bool",
                saturationFactor: "number",
                brightnessFactor: "number"
            },
            triggers: {x: "bbox", y: "bbox", width: "bbox", height: "bbox", depth: "bbox", orientation: "bbox"},
            defaults: {
                x: 0,
                y: 0,
                width: 8,
                height: 8,
                depth: 8,
                orientation: "vertical",
                showStroke: false,
                saturationFactor: 1,
                brightnessFactor: 1,
                lineJoin: "bevel"
            }
        }
    },
    constructor: function (a) {
        this.callParent([a]);
        this.topGradient = new Ext.draw.gradient.Linear({});
        this.rightGradient = new Ext.draw.gradient.Linear({});
        this.frontGradient = new Ext.draw.gradient.Linear({})
    },
    updatePlainBBox: function (d) {
        var c = this.attr, b = c.x, g = c.y, e = c.width, a = c.height, f = c.depth;
        d.x = b - e * 0.5;
        d.width = e + f;
        if (a > 0) {
            d.y = g;
            d.height = a + f
        } else {
            d.y = g + f;
            d.height = a - f
        }
    },
    render: function (l, m) {
        var r = this, k = r.attr, q = k.x, j = k.y, f = j + k.height, i = j < f, e = k.width * 0.5, s = k.depth, d = k.orientation === "horizontal", g = k.globalAlpha < 1, c = k.fillStyle, n = Ext.draw.Color.create(c.isGradient ? c.getStops()[0].color : c), h = k.saturationFactor, o = k.brightnessFactor, b = n.getHSV(), a = {}, p;
        if (!k.showStroke) {
            m.strokeStyle = Ext.draw.Color.RGBA_NONE
        }
        if (i) {
            p = j;
            j = f;
            f = p
        }
        r.topGradient.setDegrees(d ? 0 : 80);
        r.topGradient.setStops([{
            offset: 0,
            color: Ext.draw.Color.fromHSV(b[0], Ext.Number.constrain(b[1] * h, 0, 1), Ext.Number.constrain(0.6 * o, 0, 1))
        }, {
            offset: 1,
            color: Ext.draw.Color.fromHSV(b[0], Ext.Number.constrain(b[1] * h, 0, 1), Ext.Number.constrain(0.39 * o, 0, 1))
        }]);
        r.rightGradient.setDegrees(d ? 45 : 90);
        r.rightGradient.setStops([{
            offset: 0,
            color: Ext.draw.Color.fromHSV(b[0], Ext.Number.constrain(b[1] * h, 0, 1), Ext.Number.constrain(0.36 * o, 0, 1))
        }, {
            offset: 1,
            color: Ext.draw.Color.fromHSV(b[0], Ext.Number.constrain(b[1] * 1.4 * h, 0, 1), Ext.Number.constrain(0.18 * o, 0, 1))
        }]);
        if (d) {
            r.frontGradient.setDegrees(0)
        } else {
            r.frontGradient.setRadians(Math.atan2(j - f, e * 2))
        }
        r.frontGradient.setStops([{
            offset: 0,
            color: Ext.draw.Color.fromHSV(b[0], Ext.Number.constrain(b[1] * 0.9 * h, 0, 1), Ext.Number.constrain(0.6 * o, 0, 1))
        }, {
            offset: 1,
            color: Ext.draw.Color.fromHSV(b[0], Ext.Number.constrain(b[1] * 1.1 * h, 0, 1), Ext.Number.constrain(0.27 * o, 0, 1))
        }]);
        if (g || i) {
            m.beginPath();
            m.moveTo(q - e, f);
            m.lineTo(q - e + s, f + s);
            m.lineTo(q + e + s, f + s);
            m.lineTo(q + e, f);
            m.lineTo(q - e, f);
            a.x = q - e;
            a.y = j;
            a.width = e + s;
            a.height = s;
            m.fillStyle = (d ? r.rightGradient : r.topGradient).generateGradient(m, a);
            m.fillStroke(k)
        }
        if (g) {
            m.beginPath();
            m.moveTo(q - e, j);
            m.lineTo(q - e + s, j + s);
            m.lineTo(q - e + s, f + s);
            m.lineTo(q - e, f);
            m.lineTo(q - e, j);
            a.x = q + e;
            a.y = f;
            a.width = s;
            a.height = j + s - f;
            m.fillStyle = (d ? r.topGradient : r.rightGradient).generateGradient(m, a);
            m.fillStroke(k)
        }
        m.beginPath();
        m.moveTo(q - e, j);
        m.lineTo(q - e + s, j + s);
        m.lineTo(q + e + s, j + s);
        m.lineTo(q + e, j);
        m.lineTo(q - e, j);
        a.x = q - e;
        a.y = j;
        a.width = e + s;
        a.height = s;
        m.fillStyle = (d ? r.rightGradient : r.topGradient).generateGradient(m, a);
        m.fillStroke(k);
        m.beginPath();
        m.moveTo(q + e, j);
        m.lineTo(q + e + s, j + s);
        m.lineTo(q + e + s, f + s);
        m.lineTo(q + e, f);
        m.lineTo(q + e, j);
        a.x = q + e;
        a.y = f;
        a.width = s;
        a.height = j + s - f;
        m.fillStyle = (d ? r.topGradient : r.rightGradient).generateGradient(m, a);
        m.fillStroke(k);
        m.beginPath();
        m.moveTo(q - e, f);
        m.lineTo(q - e, j);
        m.lineTo(q + e, j);
        m.lineTo(q + e, f);
        m.lineTo(q - e, f);
        a.x = q - e;
        a.y = f;
        a.width = e * 2;
        a.height = j - f;
        m.fillStyle = r.frontGradient.generateGradient(m, a);
        m.fillStroke(k)
    }
});
Ext.define("Ext.chart.series.Bar3D", {
    extend: "Ext.chart.series.Bar",
    requires: ["Ext.chart.series.sprite.Bar3D", "Ext.chart.series.sprite.Box"],
    alias: "series.bar3d",
    type: "bar3d",
    seriesType: "bar3dSeries",
    config: {
        itemInstancing: {type: "box", fx: {customDurations: {x: 0, y: 0, width: 0, height: 0, depth: 0}}},
        highlightCfg: {opacity: 0.8}
    },
    getSprites: function () {
        var c = this.callParent(arguments), b, d, a;
        for (a = 0; a < c.length; a++) {
            b = c[a];
            d = b.attr.zIndex;
            if (d < 0) {
                b.setAttributes({zIndex: -d})
            }
            if (b.setSeries) {
                b.setSeries(this)
            }
        }
        return c
    },
    getDepth: function () {
        var a = this.getSprites()[0];
        return a ? (a.depth || 0) : 0
    },
    getItemForPoint: function (m, k) {
        if (this.getSprites()) {
            var j = this, b, o, a = j.getItemInstancing(), h = j.getSprites(), n = j.getStore(), c = j.getHidden(), g = j.getChart(), l = g.getInnerPadding(), f = g.getInherited().rtl, p, d, e;
            m = m + (f ? l.right : -l.left);
            k = k + l.bottom;
            for (b = h.length - 1; b >= 0; b--) {
                if (!c[b]) {
                    o = h[b];
                    d = o.getIndexNearPoint(m, k);
                    if (d !== -1) {
                        e = j.getYField();
                        p = {
                            series: j,
                            index: d,
                            category: a ? "items" : "markers",
                            record: n.getData().items[d],
                            field: typeof e === "string" ? e : e[b],
                            sprite: o
                        };
                        return p
                    }
                }
            }
            return null
        }
    }
});
Ext.define("Ext.draw.LimitedCache", {
    config: {
        limit: 40, feeder: function () {
            return 0
        }, scope: null
    }, cache: null, constructor: function (a) {
        this.cache = {};
        this.cache.list = [];
        this.cache.tail = 0;
        this.initConfig(a)
    }, get: function (e) {
        var c = this.cache, b = this.getLimit(), a = this.getFeeder(), d = this.getScope() || this;
        if (c[e]) {
            return c[e].value
        }
        if (c.list[c.tail]) {
            delete c[c.list[c.tail].cacheId]
        }
        c[e] = c.list[c.tail] = {value: a.apply(d, Array.prototype.slice.call(arguments, 1)), cacheId: e};
        c.tail++;
        if (c.tail === b) {
            c.tail = 0
        }
        return c[e].value
    }, clear: function () {
        this.cache = {};
        this.cache.list = [];
        this.cache.tail = 0
    }
});
Ext.define("Ext.draw.SegmentTree", {
    config: {strategy: "double"}, time: function (m, l, n, c, E, d, e) {
        var f = 0, o, A, s = new Date(n[m.startIdx[0]]), x = new Date(n[m.endIdx[l - 1]]), D = Ext.Date, u = [[D.MILLI, 1, "ms1", null], [D.MILLI, 2, "ms2", "ms1"], [D.MILLI, 5, "ms5", "ms1"], [D.MILLI, 10, "ms10", "ms5"], [D.MILLI, 50, "ms50", "ms10"], [D.MILLI, 100, "ms100", "ms50"], [D.MILLI, 500, "ms500", "ms100"], [D.SECOND, 1, "s1", "ms500"], [D.SECOND, 10, "s10", "s1"], [D.SECOND, 30, "s30", "s10"], [D.MINUTE, 1, "mi1", "s10"], [D.MINUTE, 5, "mi5", "mi1"], [D.MINUTE, 10, "mi10", "mi5"], [D.MINUTE, 30, "mi30", "mi10"], [D.HOUR, 1, "h1", "mi30"], [D.HOUR, 6, "h6", "h1"], [D.HOUR, 12, "h12", "h6"], [D.DAY, 1, "d1", "h12"], [D.DAY, 7, "d7", "d1"], [D.MONTH, 1, "mo1", "d1"], [D.MONTH, 3, "mo3", "mo1"], [D.MONTH, 6, "mo6", "mo3"], [D.YEAR, 1, "y1", "mo3"], [D.YEAR, 5, "y5", "y1"], [D.YEAR, 10, "y10", "y5"], [D.YEAR, 100, "y100", "y10"]], z, b, k = f, F = l, j = false, r = m.startIdx, h = m.endIdx, w = m.minIdx, C = m.maxIdx, a = m.open, y = m.close, g = m.minX, q = m.minY, p = m.maxX, B = m.maxY, v, t;
        for (z = 0; l > f + 1 && z < u.length; z++) {
            s = new Date(n[r[0]]);
            b = u[z];
            s = D.align(s, b[0], b[1]);
            if (D.diff(s, x, b[0]) > n.length * 2 * b[1]) {
                continue
            }
            if (b[3] && m.map["time_" + b[3]]) {
                o = m.map["time_" + b[3]][0];
                A = m.map["time_" + b[3]][1]
            } else {
                o = k;
                A = F
            }
            f = l;
            t = s;
            j = true;
            r[l] = r[o];
            h[l] = h[o];
            w[l] = w[o];
            C[l] = C[o];
            a[l] = a[o];
            y[l] = y[o];
            g[l] = g[o];
            q[l] = q[o];
            p[l] = p[o];
            B[l] = B[o];
            t = Ext.Date.add(t, b[0], b[1]);
            for (v = o + 1; v < A; v++) {
                if (n[h[v]] < +t) {
                    h[l] = h[v];
                    y[l] = y[v];
                    if (B[v] > B[l]) {
                        B[l] = B[v];
                        p[l] = p[v];
                        C[l] = C[v]
                    }
                    if (q[v] < q[l]) {
                        q[l] = q[v];
                        g[l] = g[v];
                        w[l] = w[v]
                    }
                } else {
                    l++;
                    r[l] = r[v];
                    h[l] = h[v];
                    w[l] = w[v];
                    C[l] = C[v];
                    a[l] = a[v];
                    y[l] = y[v];
                    g[l] = g[v];
                    q[l] = q[v];
                    p[l] = p[v];
                    B[l] = B[v];
                    t = Ext.Date.add(t, b[0], b[1])
                }
            }
            if (l > f) {
                m.map["time_" + b[2]] = [f, l]
            }
        }
    }, "double": function (h, u, j, a, t, b, c) {
        var e = 0, k, f = 1, n, d, v, g, s, l, m, r, q, p, o;
        while (u > e + 1) {
            k = e;
            e = u;
            f += f;
            for (n = k; n < e; n += 2) {
                if (n === e - 1) {
                    d = h.startIdx[n];
                    v = h.endIdx[n];
                    g = h.minIdx[n];
                    s = h.maxIdx[n];
                    l = h.open[n];
                    m = h.close[n];
                    r = h.minX[n];
                    q = h.minY[n];
                    p = h.maxX[n];
                    o = h.maxY[n]
                } else {
                    d = h.startIdx[n];
                    v = h.endIdx[n + 1];
                    l = h.open[n];
                    m = h.close[n];
                    if (h.minY[n] <= h.minY[n + 1]) {
                        g = h.minIdx[n];
                        r = h.minX[n];
                        q = h.minY[n]
                    } else {
                        g = h.minIdx[n + 1];
                        r = h.minX[n + 1];
                        q = h.minY[n + 1]
                    }
                    if (h.maxY[n] >= h.maxY[n + 1]) {
                        s = h.maxIdx[n];
                        p = h.maxX[n];
                        o = h.maxY[n]
                    } else {
                        s = h.maxIdx[n + 1];
                        p = h.maxX[n + 1];
                        o = h.maxY[n + 1]
                    }
                }
                h.startIdx[u] = d;
                h.endIdx[u] = v;
                h.minIdx[u] = g;
                h.maxIdx[u] = s;
                h.open[u] = l;
                h.close[u] = m;
                h.minX[u] = r;
                h.minY[u] = q;
                h.maxX[u] = p;
                h.maxY[u] = o;
                u++
            }
            h.map["double_" + f] = [e, u]
        }
    }, none: Ext.emptyFn, aggregateData: function (h, a, r, c, d) {
        var b = h.length, e = [], s = [], f = [], q = [], j = [], p = [], n = [], o = [], m = [], k = [], g = {
            startIdx: e,
            endIdx: s,
            minIdx: f,
            maxIdx: q,
            open: j,
            minX: p,
            minY: n,
            maxX: o,
            maxY: m,
            close: k
        }, l;
        for (l = 0; l < b; l++) {
            e[l] = l;
            s[l] = l;
            f[l] = l;
            q[l] = l;
            j[l] = a[l];
            p[l] = h[l];
            n[l] = c[l];
            o[l] = h[l];
            m[l] = r[l];
            k[l] = d[l]
        }
        g.map = {original: [0, b]};
        if (b) {
            this[this.getStrategy()](g, b, h, a, r, c, d)
        }
        return g
    }, binarySearchMin: function (c, g, a, e) {
        var b = this.dataX;
        if (e <= b[c.startIdx[0]]) {
            return g
        }
        if (e >= b[c.startIdx[a - 1]]) {
            return a - 1
        }
        while (g + 1 < a) {
            var d = (g + a) >> 1, f = b[c.startIdx[d]];
            if (f === e) {
                return d
            } else {
                if (f < e) {
                    g = d
                } else {
                    a = d
                }
            }
        }
        return g
    }, binarySearchMax: function (c, g, a, e) {
        var b = this.dataX;
        if (e <= b[c.endIdx[0]]) {
            return g
        }
        if (e >= b[c.endIdx[a - 1]]) {
            return a - 1
        }
        while (g + 1 < a) {
            var d = (g + a) >> 1, f = b[c.endIdx[d]];
            if (f === e) {
                return d
            } else {
                if (f < e) {
                    g = d
                } else {
                    a = d
                }
            }
        }
        return a
    }, constructor: function (a) {
        this.initConfig(a)
    }, setData: function (d, a, b, c, e) {
        if (!b) {
            e = c = b = a
        }
        this.dataX = d;
        this.dataOpen = a;
        this.dataHigh = b;
        this.dataLow = c;
        this.dataClose = e;
        if (d.length === b.length && d.length === c.length) {
            this.cache = this.aggregateData(d, a, b, c, e)
        }
    }, getAggregation: function (d, k, i) {
        if (!this.cache) {
            return null
        }
        var c = Infinity, g = this.dataX[this.dataX.length - 1] - this.dataX[0], l = this.cache.map, m = l.original, a, e, j, b, f, h;
        for (a in l) {
            e = l[a];
            j = e[1] - e[0] - 1;
            b = g / j;
            if (i <= b && b < c) {
                m = e;
                c = b
            }
        }
        f = Math.max(this.binarySearchMin(this.cache, m[0], m[1], d), m[0]);
        h = Math.min(this.binarySearchMax(this.cache, m[0], m[1], k) + 1, m[1]);
        return {data: this.cache, start: f, end: h}
    }
});
Ext.define("Ext.chart.series.sprite.Aggregative", {
    extend: "Ext.chart.series.sprite.Cartesian",
    requires: ["Ext.draw.LimitedCache", "Ext.draw.SegmentTree"],
    inheritableStatics: {
        def: {
            processors: {dataHigh: "data", dataLow: "data", dataClose: "data"},
            aliases: {dataOpen: "dataY"},
            defaults: {dataHigh: null, dataLow: null, dataClose: null}
        }
    },
    config: {aggregator: {}},
    applyAggregator: function (b, a) {
        return Ext.factory(b, Ext.draw.SegmentTree, a)
    },
    constructor: function () {
        this.callParent(arguments)
    },
    processDataY: function () {
        var d = this, b = d.attr, e = b.dataHigh, a = b.dataLow, f = b.dataClose, c = b.dataY;
        d.callParent(arguments);
        if (b.dataX && c && c.length > 0) {
            if (e) {
                d.getAggregator().setData(b.dataX, b.dataY, e, a, f)
            } else {
                d.getAggregator().setData(b.dataX, b.dataY)
            }
        }
    },
    getGapWidth: function () {
        return 1
    },
    renderClipped: function (b, c, g, f) {
        var e = this, d = Math.min(g[0], g[2]), a = Math.max(g[0], g[2]), h = e.getAggregator() && e.getAggregator().getAggregation(d, a, (a - d) / f[2] * e.getGapWidth());
        if (h) {
            e.dataStart = h.data.startIdx[h.start];
            e.dataEnd = h.data.endIdx[h.end - 1];
            e.renderAggregates(h.data, h.start, h.end, b, c, g, f)
        }
    }
});
Ext.define("Ext.chart.series.sprite.CandleStick", {
    alias: "sprite.candlestickSeries",
    extend: "Ext.chart.series.sprite.Aggregative",
    inheritableStatics: {
        def: {
            processors: {
                raiseStyle: function (b, a) {
                    return Ext.merge({}, a || {}, b)
                }, dropStyle: function (b, a) {
                    return Ext.merge({}, a || {}, b)
                }, barWidth: "number", padding: "number", ohlcType: "enums(candlestick,ohlc)"
            },
            defaults: {
                raiseStyle: {strokeStyle: "green", fillStyle: "green"},
                dropStyle: {strokeStyle: "red", fillStyle: "red"},
                planar: false,
                barWidth: 15,
                padding: 3,
                lineJoin: "miter",
                miterLimit: 5,
                ohlcType: "candlestick"
            },
            triggers: {raiseStyle: "raiseStyle", dropStyle: "dropStyle"},
            updaters: {
                raiseStyle: function () {
                    this.raiseTemplate && this.raiseTemplate.setAttributes(this.attr.raiseStyle)
                }, dropStyle: function () {
                    this.dropTemplate && this.dropTemplate.setAttributes(this.attr.dropStyle)
                }
            }
        }
    },
    candlestick: function (i, c, a, e, h, f, b) {
        var d = Math.min(c, h), g = Math.max(c, h);
        i.moveTo(f, e);
        i.lineTo(f, g);
        i.moveTo(f + b, g);
        i.lineTo(f + b, d);
        i.lineTo(f - b, d);
        i.lineTo(f - b, g);
        i.closePath();
        i.moveTo(f, a);
        i.lineTo(f, d)
    },
    ohlc: function (b, d, e, a, f, c, g) {
        b.moveTo(c, e);
        b.lineTo(c, a);
        b.moveTo(c, d);
        b.lineTo(c - g, d);
        b.moveTo(c, f);
        b.lineTo(c + g, f)
    },
    constructor: function () {
        this.callParent(arguments);
        this.raiseTemplate = new Ext.draw.sprite.Rect({parent: this});
        this.dropTemplate = new Ext.draw.sprite.Rect({parent: this})
    },
    getGapWidth: function () {
        var a = this.attr, b = a.barWidth, c = a.padding;
        return b + c
    },
    renderAggregates: function (d, c, b, t, u, z) {
        var D = this, s = this.attr, j = s.dataX, v = s.matrix, e = v.getXX(), r = v.getYY(), l = v.getDX(), h = v.getDY(), o = s.barWidth / e, C, k = s.ohlcType, f = Math.round(o * 0.5 * e), a = d.open, y = d.close, B = d.maxY, p = d.minY, q = d.startIdx, m, g, E, n, A, x, w = s.lineWidth * t.devicePixelRatio / 2;
        w -= Math.floor(w);
        u.save();
        C = this.raiseTemplate;
        C.useAttributes(u, z);
        u.beginPath();
        for (x = c; x < b; x++) {
            if (a[x] <= y[x]) {
                m = Math.round(a[x] * r + h) + w;
                g = Math.round(B[x] * r + h) + w;
                E = Math.round(p[x] * r + h) + w;
                n = Math.round(y[x] * r + h) + w;
                A = Math.round(j[q[x]] * e + l) + w;
                D[k](u, m, g, E, n, A, f)
            }
        }
        u.fillStroke(C.attr);
        u.restore();
        u.save();
        C = this.dropTemplate;
        C.useAttributes(u, z);
        u.beginPath();
        for (x = c; x < b; x++) {
            if (a[x] > y[x]) {
                m = Math.round(a[x] * r + h) + w;
                g = Math.round(B[x] * r + h) + w;
                E = Math.round(p[x] * r + h) + w;
                n = Math.round(y[x] * r + h) + w;
                A = Math.round(j[q[x]] * e + l) + w;
                D[k](u, m, g, E, n, A, f)
            }
        }
        u.fillStroke(C.attr);
        u.restore()
    }
});
Ext.define("Ext.chart.series.CandleStick", {
    extend: "Ext.chart.series.Cartesian",
    requires: ["Ext.chart.series.sprite.CandleStick"],
    alias: "series.candlestick",
    type: "candlestick",
    seriesType: "candlestickSeries",
    config: {openField: null, highField: null, lowField: null, closeField: null},
    fieldCategoryY: ["Open", "High", "Low", "Close"],
    themeColorCount: function () {
        return 2
    }
});
Ext.define("Ext.chart.series.Polar", {
    extend: "Ext.chart.series.Series",
    config: {
        rotation: 0,
        radius: null,
        center: [0, 0],
        offsetX: 0,
        offsetY: 0,
        showInLegend: true,
        xField: null,
        angleField: null,
        yField: null,
        lengthField: null,
        xAxis: null,
        yAxis: null
    },
    directions: ["X", "Y"],
    fieldCategoryX: ["X"],
    fieldCategoryY: ["Y"],
    getAngleField: function () {
        return this.getXField()
    },
    setAngleField: function (a) {
        return this.setXField(a)
    },
    getLengthField: function () {
        return this.getYField()
    },
    setLengthField: function (a) {
        return this.setYField(a)
    },
    applyXAxis: function (a, b) {
        return this.getChart().getAxis(a) || b
    },
    applyYAxis: function (a, b) {
        return this.getChart().getAxis(a) || b
    },
    getXRange: function () {
        return [this.dataRange[0], this.dataRange[2]]
    },
    getYRange: function () {
        return [this.dataRange[1], this.dataRange[3]]
    },
    themeColorCount: function () {
        var c = this, a = c.getStore(), b = a && a.getCount() || 0;
        return b
    },
    getDefaultSpriteConfig: function () {
        return {
            type: this.seriesType,
            renderer: this.getRenderer(),
            centerX: 0,
            centerY: 0,
            rotationCenterX: 0,
            rotationCenterY: 0
        }
    },
    applyRotation: function (b) {
        var a = Math.PI * 2;
        return (b % a + Math.PI) % a - Math.PI
    },
    updateRotation: function (a) {
        var b = this.getSprites();
        if (b && b[0]) {
            b[0].setAttributes({baseRotation: a})
        }
    }
});
Ext.define("Ext.chart.series.Gauge", {
    alias: "series.gauge",
    extend: "Ext.chart.series.Polar",
    type: "gauge",
    seriesType: "pieslice",
    requires: ["Ext.draw.sprite.Sector"],
    config: {
        angleField: null,
        field: null,
        needle: false,
        needleLengthRatio: undefined,
        needleLength: 90,
        needleWidth: 4,
        donut: 30,
        showInLegend: false,
        value: null,
        colors: null,
        sectors: null,
        minimum: 0,
        maximum: 100,
        rotation: 0,
        totalAngle: Math.PI / 2,
        rect: [0, 0, 1, 1],
        center: [0.5, 0.75],
        radius: 0.5,
        wholeDisk: false
    },
    coordinateX: function () {
        return this.coordinate("X", 0, 2)
    },
    coordinateY: function () {
        return this.coordinate("Y", 1, 2)
    },
    updateNeedle: function (b) {
        var a = this, d = a.getSprites(), c = a.valueToAngle(a.getValue());
        if (d && d.length) {
            d[0].setAttributes({
                startAngle: (b ? c : 0),
                endAngle: c,
                strokeOpacity: (b ? 1 : 0),
                lineWidth: (b ? a.getNeedleWidth() : 0)
            });
            a.doUpdateStyles()
        }
    },
    themeColorCount: function () {
        var c = this, a = c.getStore(), b = a && a.getCount() || 0;
        return b + (c.getNeedle() ? 0 : 1)
    },
    updateColors: function (a, b) {
        var f = this, h = f.getSectors(), j = h && h.length, e = f.getSprites(), c = Ext.Array.clone(a), g = a && a.length, d;
        if (!g || !a[0]) {
            return
        }
        for (d = 0; d < j; d++) {
            c[d + 1] = h[d].color || c[d + 1] || a[d % g]
        }
        e[0].setAttributes({strokeStyle: c[0]});
        this.setSubStyle({fillStyle: c, strokeStyle: c});
        this.doUpdateStyles()
    },
    updateAngleField: function (a) {
        this.setField(a)
    },
    updateNeedleLengthRatio: function (a) {
        this.setNeedleLength(a * 100)
    },
    updateRect: function (f) {
        var d = this.getWholeDisk(), c = d ? Math.PI : this.getTotalAngle() / 2, g = this.getDonut() / 100, e, b, a;
        if (c <= Math.PI / 2) {
            e = 2 * Math.sin(c);
            b = 1 - g * Math.cos(c)
        } else {
            e = 2;
            b = 1 - Math.cos(c)
        }
        a = Math.min(f[2] / e, f[3] / b);
        this.setRadius(a);
        this.setCenter([f[2] / 2, a + (f[3] - b * a) / 2])
    },
    updateCenter: function (a) {
        this.setStyle({centerX: a[0], centerY: a[1], rotationCenterX: a[0], rotationCenterY: a[1]});
        this.doUpdateStyles()
    },
    updateRotation: function (a) {
        this.setStyle({rotationRads: a - (this.getTotalAngle() + Math.PI) / 2});
        this.doUpdateStyles()
    },
    doUpdateShape: function (b, f) {
        var a, d = this.getSectors(), c = (d && d.length) || 0, e = this.getNeedleLength() / 100;
        a = [b * e, b];
        while (c--) {
            a.push(b)
        }
        this.setSubStyle({endRho: a, startRho: b / 100 * f});
        this.doUpdateStyles()
    },
    updateRadius: function (a) {
        var b = this.getDonut();
        this.doUpdateShape(a, b)
    },
    updateDonut: function (b) {
        var a = this.getRadius();
        this.doUpdateShape(a, b)
    },
    valueToAngle: function (a) {
        a = this.applyValue(a);
        return this.getTotalAngle() * (a - this.getMinimum()) / (this.getMaximum() - this.getMinimum())
    },
    applyValue: function (a) {
        return Math.min(this.getMaximum(), Math.max(a, this.getMinimum()))
    },
    updateValue: function (b) {
        var a = this, c = a.getNeedle(), e = a.valueToAngle(b), d = a.getSprites();
        d[0].rendererData.value = b;
        d[0].setAttributes({startAngle: (c ? e : 0), endAngle: e});
        a.doUpdateStyles()
    },
    processData: function () {
        var e = this, j = e.getStore(), a, c, g, b, f, d = j && j.first(), h, i;
        if (d) {
            h = e.getField();
            if (h) {
                i = d.get(h)
            }
        }
        if (a = e.getXAxis()) {
            c = a.getMinimum();
            g = a.getMaximum();
            b = a.getSprites()[0].fx;
            f = b.getDuration();
            b.setDuration(0);
            if (Ext.isNumber(c)) {
                e.setMinimum(c)
            } else {
                a.setMinimum(e.getMinimum())
            }
            if (Ext.isNumber(g)) {
                e.setMaximum(g)
            } else {
                a.setMaximum(e.getMaximum())
            }
            b.setDuration(f)
        }
        if (!Ext.isNumber(i)) {
            i = e.getMinimum()
        }
        e.setValue(i)
    },
    getDefaultSpriteConfig: function () {
        return {
            type: this.seriesType,
            renderer: this.getRenderer(),
            fx: {
                customDurations: {
                    translationX: 0,
                    translationY: 0,
                    rotationCenterX: 0,
                    rotationCenterY: 0,
                    centerX: 0,
                    centerY: 0,
                    startRho: 0,
                    endRho: 0,
                    baseRotation: 0
                }
            }
        }
    },
    normalizeSectors: function (f) {
        var d = this, c = (f && f.length) || 0, b, e, g, a;
        if (c) {
            for (b = 0; b < c; b++) {
                e = f[b];
                if (typeof e === "number") {
                    f[b] = {start: (b > 0 ? f[b - 1].end : d.getMinimum()), end: Math.min(e, d.getMaximum())};
                    if (b == (c - 1) && f[b].end < d.getMaximum()) {
                        f[b + 1] = {start: f[b].end, end: d.getMaximum()}
                    }
                } else {
                    if (typeof e.start === "number") {
                        g = Math.max(e.start, d.getMinimum())
                    } else {
                        g = (b > 0 ? f[b - 1].end : d.getMinimum())
                    }
                    if (typeof e.end === "number") {
                        a = Math.min(e.end, d.getMaximum())
                    } else {
                        a = d.getMaximum()
                    }
                    f[b].start = g;
                    f[b].end = a
                }
            }
        } else {
            f = [{start: d.getMinimum(), end: d.getMaximum()}]
        }
        return f
    },
    getSprites: function () {
        var j = this, m = j.getStore(), l = j.getValue(), c, g;
        if (!m && !Ext.isNumber(l)) {
            return []
        }
        var h = j.getChart(), b = j.getAnimation() || h && h.getAnimation(), f = j.sprites, k = 0, o, n, e, d, a = [];
        if (f && f.length) {
            f[0].fx.setConfig(b);
            return f
        }
        d = {store: m, field: j.getField(), value: l, series: j};
        o = j.createSprite();
        o.setAttributes({zIndex: 10}, true);
        o.rendererData = d;
        o.rendererIndex = k++;
        a.push(j.getNeedleWidth());
        j.getLabel().getTemplate().setField(true);
        n = j.normalizeSectors(j.getSectors());
        for (c = 0, g = n.length; c < g; c++) {
            e = {
                startAngle: j.valueToAngle(n[c].start),
                endAngle: j.valueToAngle(n[c].end),
                label: n[c].label,
                fillStyle: n[c].color,
                strokeOpacity: 0,
                rotateLabels: false,
                doCallout: false,
                labelOverflowPadding: -1
            };
            Ext.apply(e, n[c].style);
            o = j.createSprite();
            o.rendererData = d;
            o.rendererIndex = k++;
            o.setAttributes(e, true);
            a.push(e.lineWidth)
        }
        j.setSubStyle({lineWidth: a});
        j.doUpdateStyles();
        return f
    }
});
Ext.define("Ext.chart.series.sprite.Line", {
    alias: "sprite.lineSeries",
    extend: "Ext.chart.series.sprite.Aggregative",
    inheritableStatics: {
        def: {
            processors: {
                smooth: "bool",
                fillArea: "bool",
                step: "bool",
                preciseStroke: "bool",
                xAxis: "default",
                yCap: "default"
            },
            defaults: {
                smooth: false,
                fillArea: false,
                step: false,
                preciseStroke: true,
                xAxis: null,
                yCap: Math.pow(2, 20),
                yJump: 50
            },
            triggers: {dataX: "dataX,bbox,smooth", dataY: "dataY,bbox,smooth", smooth: "smooth"},
            updaters: {
                smooth: function (a) {
                    var c = a.dataX, b = a.dataY;
                    if (a.smooth && c && b && c.length > 2 && b.length > 2) {
                        this.smoothX = Ext.draw.Draw.spline(c);
                        this.smoothY = Ext.draw.Draw.spline(b)
                    } else {
                        delete this.smoothX;
                        delete this.smoothY
                    }
                }
            }
        }
    },
    list: null,
    updatePlainBBox: function (d) {
        var b = this.attr, c = Math.min(0, b.dataMinY), a = Math.max(0, b.dataMaxY);
        d.x = b.dataMinX;
        d.y = c;
        d.width = b.dataMaxX - b.dataMinX;
        d.height = a - c
    },
    drawStrip: function (a, c) {
        a.moveTo(c[0], c[1]);
        for (var b = 2, d = c.length; b < d; b += 2) {
            a.lineTo(c[b], c[b + 1])
        }
    },
    drawStraightStroke: function (q, r, e, d, v, h) {
        var w = this, p = w.attr, o = p.renderer, g = p.step, a = true, m = Math.abs, l = {
            type: "line",
            smooth: false,
            step: g
        }, n = [], l, z, f, k, j, u, c, t, b, s;
        for (s = 3; s < v.length; s += 3) {
            u = v[s - 3];
            c = v[s - 2];
            k = v[s];
            j = v[s + 1];
            t = v[s + 3];
            b = v[s + 4];
            if (o) {
                l.x = k;
                l.y = j;
                l.x0 = u;
                l.y0 = c;
                z = o.call(w, w, l, w.rendererData, e + s / 3)
            }
            if (Ext.isNumber(k + j + u + c)) {
                if (a) {
                    r.beginPath();
                    r.moveTo(u, c);
                    n.push(u, c);
                    f = u;
                    a = false
                }
            } else {
                continue
            }
            if (g) {
                r.lineTo(k, c);
                n.push(k, c)
            }
            r.lineTo(k, j);
            n.push(k, j);
            if (z || !(Ext.isNumber(t + b))) {
                r.save();
                Ext.apply(r, z);
                if (p.fillArea) {
                    r.lineTo(k, h);
                    r.lineTo(f, h);
                    r.closePath();
                    r.fill()
                }
                r.beginPath();
                w.drawStrip(r, n);
                n = [];
                r.stroke();
                r.restore();
                r.beginPath();
                a = true
            }
        }
    },
    calculateScale: function (c, a) {
        var b = 0, d = c;
        while (d < a && c > 0) {
            b++;
            d += c >> b
        }
        return Math.pow(2, b > 0 ? b - 1 : b)
    },
    drawSmoothStroke: function (t, u, c, b, B, f) {
        var E = this, s = E.attr, d = s.step, w = s.matrix, e = w.getXX(), p = w.getYY(), m = w.getDX(), k = w.getDY(), r = E.smoothX, q = E.smoothY, G = E.calculateScale(s.dataX.length, b), o, D, n, C, h, g, A, a, z, v, F, l = {
            type: "line",
            smooth: true,
            step: d
        };
        u.beginPath();
        u.moveTo(r[c * 3] * e + m, q[c * 3] * p + k);
        for (z = 0, v = c * 3 + 1; z < B.length - 3; z += 3, v += 3 * G) {
            o = r[v] * e + m;
            D = q[v] * p + k;
            n = r[v + 1] * e + m;
            C = q[v + 1] * p + k;
            h = B[z + 3];
            g = B[z + 4];
            A = B[z];
            a = B[z + 1];
            if (s.renderer) {
                l.x0 = A;
                l.y0 = a;
                l.cx1 = o;
                l.cy1 = D;
                l.cx2 = n;
                l.cy2 = C;
                l.x = h;
                l.y = g;
                F = s.renderer.call(E, E, l, E.rendererData, c + z / 3 + 1);
                u.save();
                Ext.apply(u, F);
                if (s.fillArea) {
                    u.moveTo(A, a);
                    u.bezierCurveTo(o, D, n, C, h, g);
                    u.lineTo(h, f);
                    u.lineTo(A, f);
                    u.lineTo(A, a);
                    u.closePath();
                    u.fill();
                    u.beginPath()
                }
                u.moveTo(A, a);
                u.bezierCurveTo(o, D, n, C, h, g);
                u.stroke();
                u.moveTo(A, a);
                u.closePath();
                u.restore();
                u.beginPath();
                u.moveTo(h, g)
            } else {
                u.bezierCurveTo(o, D, n, C, h, g)
            }
        }
    },
    drawLabel: function (k, i, h, o, a) {
        var p = this, n = p.attr, e = p.getBoundMarker("labels")[0], d = e.getTemplate(), m = p.labelCfg || (p.labelCfg = {}), c = p.surfaceMatrix, g, f, j = n.labelOverflowPadding, l, b, q, r;
        m.x = c.x(i, h);
        m.y = c.y(i, h);
        if (n.flipXY) {
            m.rotationRads = Math.PI * 0.5
        } else {
            m.rotationRads = 0
        }
        m.text = k;
        if (d.attr.renderer) {
            q = d.attr.renderer.call(p, k, e, m, p.rendererData, o);
            if (typeof q === "string") {
                m.text = q
            } else {
                if (typeof q === "object") {
                    if ("text" in q) {
                        m.text = q.text
                    }
                    r = true
                }
            }
        }
        b = p.getMarkerBBox("labels", o, true);
        if (!b) {
            p.putMarker("labels", m, o);
            b = p.getMarkerBBox("labels", o, true)
        }
        l = b.height / 2;
        g = i;
        switch (d.attr.display) {
            case"under":
                f = h - l - j;
                break;
            case"rotate":
                g += j;
                f = h - j;
                m.rotationRads = -Math.PI / 4;
                break;
            default:
                f = h + l + j
        }
        m.x = c.x(g, f);
        m.y = c.y(g, f);
        if (r) {
            Ext.apply(m, q)
        }
        p.putMarker("labels", m, o)
    },
    drawMarker: function (b, h, c) {
        var e = this, a = e.attr, f = a.renderer, g = e.surfaceMatrix, d = {};
        if (f && e.boundMarkers.markers) {
            d.type = "marker";
            d.x = b;
            d.y = h;
            d = f.call(e, e, d, e.rendererData, c) || {}
        }
        d.translationX = g.x(b, h);
        d.translationY = g.y(b, h);
        e.putMarker("markers", d, c, !f)
    },
    drawStroke: function (a, c, h, b, f, e) {
        var d = this, g = d.attr.smooth && d.smoothX && d.smoothY;
        if (g) {
            d.drawSmoothStroke(a, c, h, b, f, e)
        } else {
            d.drawStraightStroke(a, c, h, b, f, e)
        }
    },
    renderAggregates: function (z, u, k, L, n, G, B) {
        var l = this, j = l.attr, r = j.dataX, q = j.dataY, g = j.labels, t = j.xAxis, a = j.yCap, f = j.smooth && l.smoothX && l.smoothY, U = g && l.getBoundMarker("labels"), O = l.getBoundMarker("markers"), C = j.matrix, s = L.devicePixelRatio, A = C.getXX(), e = C.getYY(), c = C.getDX(), b = C.getDY(), p = l.list || (l.list = []), D = z.minX, d = z.maxX, h = z.minY, N = z.maxY, T = z.startIdx, R = true, P, S, J, I, Q, E;
        l.rendererData = {store: l.getStore()};
        p.length = 0;
        for (Q = u; Q < k; Q++) {
            var M = D[Q], o = d[Q], K = h[Q], m = N[Q];
            if (M < o) {
                p.push(M * A + c, K * e + b, T[Q]);
                p.push(o * A + c, m * e + b, T[Q])
            } else {
                if (M > o) {
                    p.push(o * A + c, m * e + b, T[Q]);
                    p.push(M * A + c, K * e + b, T[Q])
                } else {
                    p.push(o * A + c, m * e + b, T[Q])
                }
            }
        }
        if (p.length) {
            for (Q = 0; Q < p.length; Q += 3) {
                J = p[Q];
                I = p[Q + 1];
                if (Ext.isNumber(J + I)) {
                    if (I > a) {
                        I = a
                    } else {
                        if (I < -a) {
                            I = -a
                        }
                    }
                    p[Q + 1] = I
                } else {
                    R = false;
                    continue
                }
                E = p[Q + 2];
                if (O) {
                    l.drawMarker(J, I, E)
                }
                if (U && g[E]) {
                    l.drawLabel(g[E], J, I, E, B)
                }
            }
            l.isContinuousLine = R;
            if (f && !R) {
                Ext.Error.raise("Line smoothing in only supported for gapless data, where all data points are finite numbers.")
            }
            if (t) {
                S = t.getAlignment() === "vertical";
                if (Ext.isNumber(t.floatingAtCoord)) {
                    P = (S ? B[2] : B[3]) - t.floatingAtCoord
                } else {
                    P = S ? B[0] : B[1]
                }
            } else {
                P = j.flipXY ? B[0] : B[1]
            }
            if (j.preciseStroke) {
                if (j.fillArea) {
                    n.fill()
                }
                if (j.transformFillStroke) {
                    j.inverseMatrix.toContext(n)
                }
                l.drawStroke(L, n, u, k, p, P);
                if (j.transformFillStroke) {
                    j.matrix.toContext(n)
                }
                n.stroke()
            } else {
                l.drawStroke(L, n, u, k, p, P);
                if (R && f && j.fillArea && !j.renderer) {
                    var w = r[r.length - 1] * A + c + s, v = q[q.length - 1] * e + b, H = r[0] * A + c - s, F = q[0] * e + b;
                    n.lineTo(w, v);
                    n.lineTo(w, P - j.lineWidth);
                    n.lineTo(H, P - j.lineWidth);
                    n.lineTo(H, F)
                }
                if (j.transformFillStroke) {
                    j.matrix.toContext(n)
                }
                if (j.fillArea) {
                    n.fillStroke(j, true)
                } else {
                    n.stroke(true)
                }
            }
        }
    }
});
Ext.define("Ext.chart.series.Line", {
    extend: "Ext.chart.series.Cartesian",
    alias: "series.line",
    type: "line",
    seriesType: "lineSeries",
    requires: ["Ext.chart.series.sprite.Line"],
    config: {selectionTolerance: 20, smooth: false, step: false, fill: undefined, aggregator: {strategy: "double"}},
    defaultSmoothness: 3,
    overflowBuffer: 1,
    themeMarkerCount: function () {
        return 1
    },
    getDefaultSpriteConfig: function () {
        var d = this, e = d.callParent(arguments), c = Ext.apply({}, d.getStyle()), b, a = false;
        if (typeof d.config.fill != "undefined") {
            if (d.config.fill) {
                a = true;
                if (typeof c.fillStyle == "undefined") {
                    if (typeof c.strokeStyle == "undefined") {
                        b = d.getStyleWithTheme();
                        c.fillStyle = b.fillStyle;
                        c.strokeStyle = b.strokeStyle
                    } else {
                        c.fillStyle = c.strokeStyle
                    }
                }
            }
        } else {
            if (c.fillStyle) {
                a = true
            }
        }
        if (!a) {
            delete c.fillStyle
        }
        c = Ext.apply(e || {}, c);
        return Ext.apply(c, {
            fillArea: a,
            step: d.config.step,
            smooth: d.config.smooth,
            selectionTolerance: d.config.selectionTolerance
        })
    },
    updateStep: function (b) {
        var a = this.getSprites()[0];
        if (a && a.attr.step !== b) {
            a.setAttributes({step: b})
        }
    },
    updateFill: function (b) {
        var a = this.getSprites()[0];
        if (a && a.attr.fillArea !== b) {
            a.setAttributes({fillArea: b})
        }
    },
    updateSmooth: function (a) {
        var b = this.getSprites()[0];
        if (b && b.attr.smooth !== a) {
            b.setAttributes({smooth: a})
        }
    }
});
Ext.define("Ext.chart.series.sprite.PieSlice", {
    alias: "sprite.pieslice",
    mixins: {markerHolder: "Ext.chart.MarkerHolder"},
    extend: "Ext.draw.sprite.Sector",
    inheritableStatics: {
        def: {
            processors: {
                doCallout: "bool",
                label: "string",
                rotateLabels: "bool",
                labelOverflowPadding: "number",
                renderer: "default"
            }, defaults: {doCallout: true, rotateLabels: true, label: "", labelOverflowPadding: 10, renderer: null}
        }
    },
    config: {rendererData: null, rendererIndex: 0},
    setGradientBBox: function (p, j) {
        var i = this, g = i.attr;
        if (g.fillStyle.isGradient || g.strokeStyle.isGradient) {
            if (g.constrainGradients) {
                p.setGradientBBox({x: j[0], y: j[1], width: j[2], height: j[3]})
            } else {
                var b = i.getMidAngle(), d = g.margin, e = g.centerX, c = g.centerY, a = g.endRho, k = g.matrix, n = k.getScaleX(), m = k.getScaleY(), l = n * a, f = m * a, o = {
                    width: l + l,
                    height: f + f
                };
                if (d) {
                    e += d * Math.cos(b);
                    c += d * Math.sin(b)
                }
                o.x = k.x(e, c) - l;
                o.y = k.y(e, c) - f;
                p.setGradientBBox(o)
            }
        }
    },
    render: function (b, c, g, f) {
        var e = this, a = e.attr, h = {}, d;
        if (a.renderer) {
            h = {
                type: "sector",
                text: a.text,
                centerX: a.centerX,
                centerY: a.centerY,
                margin: a.margin,
                startAngle: Math.min(a.startAngle, a.endAngle),
                endAngle: Math.max(a.startAngle, a.endAngle),
                startRho: Math.min(a.startRho, a.endRho),
                endRho: Math.max(a.startRho, a.endRho)
            };
            d = a.renderer.call(e, e, h, e.rendererData, e.rendererIndex);
            e.setAttributes(d);
            e.useAttributes(c, g)
        }
        e.callParent([b, c, g, f]);
        if (a.label && e.getBoundMarker("labels")) {
            e.placeLabel()
        }
    },
    placeLabel: function () {
        var w = this, s = w.attr, r = w.attr.attributeId, t = Math.min(s.startAngle, s.endAngle), p = Math.max(s.startAngle, s.endAngle), k = (t + p) * 0.5, n = s.margin, h = s.centerX, g = s.centerY, f = Math.sin(k), c = Math.cos(k), v = Math.min(s.startRho, s.endRho) + n, m = Math.max(s.startRho, s.endRho) + n, l = (v + m) * 0.5, b = w.surfaceMatrix, o = w.labelCfg || (w.labelCfg = {}), e = w.getBoundMarker("labels")[0], d = e.getTemplate(), a = d.getCalloutLine(), q = a && a.length || 40, u, j, i, z;
        b.appendMatrix(s.matrix);
        o.text = s.label;
        j = h + c * l;
        i = g + f * l;
        o.x = b.x(j, i);
        o.y = b.y(j, i);
        j = h + c * m;
        i = g + f * m;
        o.calloutStartX = b.x(j, i);
        o.calloutStartY = b.y(j, i);
        j = h + c * (m + q);
        i = g + f * (m + q);
        o.calloutPlaceX = b.x(j, i);
        o.calloutPlaceY = b.y(j, i);
        if (!s.rotateLabels) {
            o.rotationRads = 0
        } else {
            switch (d.attr.orientation) {
                case"horizontal":
                    o.rotationRads = k + Math.atan2(b.y(1, 0) - b.y(0, 0), b.x(1, 0) - b.x(0, 0)) + Math.PI / 2;
                    break;
                case"vertical":
                    o.rotationRads = k + Math.atan2(b.y(1, 0) - b.y(0, 0), b.x(1, 0) - b.x(0, 0));
                    break
            }
        }
        o.calloutColor = (a && a.color) || w.attr.fillStyle;
        if (a) {
            if (a.width) {
                o.calloutWidth = a.width
            }
        } else {
            o.calloutHasLine = false
        }
        o.globalAlpha = s.globalAlpha * s.fillOpacity;
        o.hidden = (s.startAngle == s.endAngle);
        if (d.attr.renderer) {
            z = d.attr.renderer.call(w, w.attr.label, e, o, w.rendererData, w.rendererIndex);
            if (typeof z === "string") {
                o.text = z
            } else {
                Ext.apply(o, z)
            }
        }
        w.putMarker("labels", o, r);
        u = w.getMarkerBBox("labels", r, true);
        if (u) {
            if (s.doCallout) {
                if (d.attr.display === "outside") {
                    w.putMarker("labels", {callout: 1}, r)
                } else {
                    if (d.attr.display === "inside") {
                        w.putMarker("labels", {callout: 0}, r)
                    } else {
                        w.putMarker("labels", {callout: 1 - w.sliceContainsLabel(s, u)}, r)
                    }
                }
            } else {
                w.putMarker("labels", {globalAlpha: w.sliceContainsLabel(s, u)}, r)
            }
        }
    },
    sliceContainsLabel: function (d, f) {
        var e = d.labelOverflowPadding, h = (d.endRho + d.startRho) / 2, g = h + (f.width + e) / 2, i = h - (f.width + e) / 2, j, c, b, a;
        if (e < 0) {
            return 1
        }
        if (f.width + e * 2 > (d.endRho - d.startRho)) {
            return 0
        }
        c = Math.sqrt(d.endRho * d.endRho - g * g);
        b = Math.sqrt(d.endRho * d.endRho - i * i);
        j = Math.abs(d.endAngle - d.startAngle);
        a = (j > Math.PI / 2 ? i : Math.abs(Math.tan(j / 2)) * i);
        if (f.height + e * 2 > Math.min(c, b, a) * 2) {
            return 0
        }
        return 1
    }
});
Ext.define("Ext.chart.series.Pie", {
    extend: "Ext.chart.series.Polar",
    requires: ["Ext.chart.series.sprite.PieSlice"],
    type: "pie",
    alias: "series.pie",
    seriesType: "pieslice",
    config: {
        labelField: false,
        lengthField: false,
        donut: 0,
        field: null,
        rotation: 0,
        clockwise: true,
        totalAngle: 2 * Math.PI,
        hidden: [],
        radiusFactor: 100,
        highlightCfg: {margin: 20},
        style: {}
    },
    directions: ["X"],
    setField: function (a) {
        return this.setXField(a)
    },
    getField: function () {
        return this.getXField()
    },
    applyLabel: function (a, b) {
        if (Ext.isObject(a) && !Ext.isString(a.orientation)) {
            Ext.apply(a = Ext.Object.chain(a), {orientation: "vertical"})
        }
        if (!b) {
            b = new Ext.chart.Markers({zIndex: 10});
            b.setTemplate(new Ext.chart.label.Label(a))
        } else {
            b.getTemplate().setAttributes(a)
        }
        return b
    },
    updateLabelData: function () {
        var h = this, j = h.getStore(), g = j.getData().items, e = h.getSprites(), a = h.getLabel().getTemplate().getField(), d = h.getHidden(), b, f, c, k;
        if (e.length > 0 && a) {
            c = [];
            for (b = 0, f = g.length; b < f; b++) {
                c.push(g[b].get(a))
            }
            for (b = 0, f = e.length; b < f; b++) {
                k = e[b];
                k.setAttributes({label: c[b]});
                k.putMarker("labels", {hidden: d[b]}, k.attr.attributeId)
            }
        }
    },
    coordinateX: function () {
        var n = this, q = n.getStore(), m = q.getData().items, a = m.length, o = n.getXField(), l = n.getLengthField(), p, h = 0, d, c = 0, g = n.getHidden(), r = [], f, e = 0, k = n.getTotalAngle(), b = n.getClockwise() ? 1 : -1, j = n.getSprites();
        if (!j) {
            return
        }
        for (f = 0; f < a; f++) {
            p = Math.abs(Number(m[f].get(o))) || 0;
            d = l && Math.abs(Number(m[f].get(l))) || 0;
            if (!g[f]) {
                h += p;
                if (d > c) {
                    c = d
                }
            }
            r[f] = h;
            if (f >= g.length) {
                g[f] = false
            }
        }
        n.maxLength = c;
        if (h !== 0) {
            h = k / h
        }
        for (f = 0; f < a; f++) {
            j[f].setAttributes({startAngle: e, endAngle: e = (h ? b * r[f] * h : 0), globalAlpha: 1})
        }
        for (; f < n.sprites.length; f++) {
            j[f].setAttributes({startAngle: k, endAngle: k, globalAlpha: 0})
        }
        n.getChart().refreshLegendStore()
    },
    updateCenter: function (a) {
        this.setStyle({translationX: a[0] + this.getOffsetX(), translationY: a[1] + this.getOffsetY()});
        this.doUpdateStyles()
    },
    updateRadius: function (a) {
        this.setStyle({startRho: a * this.getDonut() * 0.01, endRho: a * this.getRadiusFactor() * 0.01});
        this.doUpdateStyles()
    },
    getStyleByIndex: function (d) {
        var j = this, h = j.getStore().getData().items, g = j.getLengthField(), e = j.getRadius(), a, c, f, b;
        c = g && Math.abs(Number(h[d].get(g))) || 0;
        f = e * j.getDonut() * 0.01;
        b = e * j.getRadiusFactor() * 0.01;
        a = this.callParent([d]);
        a.startRho = f;
        a.endRho = j.maxLength ? (f + (b - f) * c / j.maxLength) : b;
        return a
    },
    updateDonut: function (b) {
        var a = this.getRadius();
        this.setStyle({startRho: a * b * 0.01, endRho: a * this.getRadiusFactor() * 0.01});
        this.doUpdateStyles()
    },
    rotationOffset: -0.5 * Math.PI,
    updateRotation: function (a) {
        this.setStyle({rotationRads: a + this.rotationOffset});
        this.doUpdateStyles()
    },
    updateTotalAngle: function (a) {
        this.processData()
    },
    getSprites: function () {
        var k = this, h = k.getChart(), n = k.getStore();
        if (!h || !n) {
            return []
        }
        k.getColors();
        k.getSubStyle();
        var j = n.getData().items, b = j.length, d = k.getAnimation() || h && h.getAnimation(), g = k.sprites, o, l = 0, f, e, c = false, m = k.getLabel(), a = m.getTemplate();
        f = {store: n, field: k.getField(), series: k};
        for (e = 0; e < b; e++) {
            o = g[e];
            if (!o) {
                o = k.createSprite();
                if (k.getHighlight()) {
                    o.config.highlight = k.getHighlight();
                    o.addModifier("highlight", true)
                }
                if (a.getField()) {
                    a.setAttributes({labelOverflowPadding: k.getLabelOverflowPadding()});
                    a.fx.setCustomDurations({callout: 200});
                    o.bindMarker("labels", m)
                }
                o.setAttributes(k.getStyleByIndex(e));
                o.rendererData = f;
                o.rendererIndex = l++;
                c = true
            }
            o.fx.setConfig(d)
        }
        if (c) {
            k.doUpdateStyles()
        }
        return k.sprites
    },
    betweenAngle: function (d, f, c) {
        var e = Math.PI * 2, g = this.rotationOffset;
        if (!this.getClockwise()) {
            d *= -1;
            f *= -1;
            c *= -1;
            f -= g;
            c -= g
        } else {
            f += g;
            c += g
        }
        c -= f;
        d -= f;
        d %= e;
        c %= e;
        d += e;
        c += e;
        d %= e;
        c %= e;
        return d < c
    },
    getItemForAngle: function (a) {
        var h = this, f = h.getSprites(), d;
        a %= Math.PI * 2;
        while (a < 0) {
            a += Math.PI * 2
        }
        if (f) {
            var j = h.getStore(), g = j.getData().items, c = h.getHidden(), b = 0, e = j.getCount();
            for (; b < e; b++) {
                if (!c[b]) {
                    d = f[b].attr;
                    if (d.startAngle <= a && d.endAngle >= a) {
                        return {series: h, sprite: f[b], index: b, record: g[b], field: h.getXField()}
                    }
                }
            }
        }
        return null
    },
    getItemForPoint: function (h, g) {
        var t = this, e = t.getSprites();
        if (e) {
            var s = t.getCenter(), q = t.getOffsetX(), p = t.getOffsetY(), d = h - s[0] + q, c = g - s[1] + p, b = t.getStore(), j = t.getDonut(), o = b.getData().items, r = Math.atan2(c, d) - t.getRotation(), a = Math.sqrt(d * d + c * c), l = t.getRadius() * j * 0.01, m = t.getHidden(), n, f, k;
            for (n = 0, f = o.length; n < f; n++) {
                if (!m[n]) {
                    k = e[n].attr;
                    if (a >= l + k.margin && a <= k.endRho + k.margin) {
                        if (t.betweenAngle(r, k.startAngle, k.endAngle)) {
                            return {series: t, sprite: e[n], index: n, record: o[n], field: t.getXField()}
                        }
                    }
                }
            }
            return null
        }
    },
    provideLegendInfo: function (e) {
        var g = this, j = g.getStore();
        if (j) {
            var f = j.getData().items, b = g.getLabel().getTemplate().getField(), h = g.getField(), d = g.getHidden(), c, a, k;
            for (c = 0; c < f.length; c++) {
                a = g.getStyleByIndex(c);
                k = a.fillStyle;
                if (Ext.isObject(k)) {
                    k = k.stops && k.stops[0].color
                }
                e.push({
                    name: b ? String(f[c].get(b)) : h + " " + c,
                    mark: k || a.strokeStyle || "black",
                    disabled: d[c],
                    series: g.getId(),
                    index: c
                })
            }
        }
    }
});
Ext.define("Ext.chart.series.sprite.Pie3DPart", {
    extend: "Ext.draw.sprite.Path",
    mixins: {markerHolder: "Ext.chart.MarkerHolder"},
    alias: "sprite.pie3dPart",
    type: "pie3dPart",
    inheritableStatics: {
        def: {
            processors: {
                centerX: "number",
                centerY: "number",
                startAngle: "number",
                endAngle: "number",
                startRho: "number",
                endRho: "number",
                margin: "number",
                thickness: "number",
                distortion: "number",
                baseColor: "color",
                baseRotation: "number",
                part: "enums(top,start,end,inner,outer)"
            },
            aliases: {rho: "endRho"},
            triggers: {
                centerX: "path,bbox",
                centerY: "path,bbox",
                startAngle: "path,partZIndex",
                endAngle: "path,partZIndex",
                startRho: "path",
                endRho: "path,bbox",
                margin: "path,bbox",
                thickness: "path",
                baseRotation: "path,partZIndex,partColor",
                baseColor: "partZIndex,partColor",
                part: "path,partZIndex"
            },
            defaults: {
                centerX: 0,
                centerY: 0,
                startAngle: 0,
                endAngle: 0,
                startRho: 0,
                endRho: 150,
                margin: 0,
                distortion: 1,
                baseRotation: 0,
                baseColor: "white",
                part: "top"
            },
            updaters: {
                partColor: function (a) {
                    var c = Ext.draw.Color.fly(a.baseColor), b;
                    switch (a.part) {
                        case"top":
                            b = c.toString();
                            break;
                        case"outer":
                            b = Ext.create("Ext.draw.gradient.Linear", {
                                type: "linear",
                                stops: [{offset: 0, color: c.createDarker(0.3).toString()}, {
                                    offset: 0.3,
                                    color: c.toString()
                                }, {offset: 0.8, color: c.createLighter(0.2).toString()}, {
                                    offset: 1,
                                    color: c.createDarker(0.4).toString()
                                }]
                            });
                            break;
                        case"start":
                            b = c.createDarker(0.3).toString();
                            break;
                        case"end":
                            b = c.createDarker(0.3).toString();
                            break;
                        case"inner":
                            b = Ext.create("Ext.draw.gradient.Linear", {
                                type: "linear",
                                stops: [{offset: 0, color: c.createDarker(0.4).toString()}, {
                                    offset: 0.2,
                                    color: c.createLighter(0.2).toString()
                                }, {offset: 0.7, color: c.toString()}, {
                                    offset: 1,
                                    color: c.createDarker(0.3).toString()
                                }]
                            });
                            break
                    }
                    a.fillStyle = b;
                    a.canvasAttributes.fillStyle = b
                }, partZIndex: function (a) {
                    var b = a.baseRotation;
                    switch (a.part) {
                        case"top":
                            a.zIndex = 5;
                            break;
                        case"outer":
                            a.zIndex = 4;
                            break;
                        case"start":
                            a.zIndex = 1 + Math.sin(a.startAngle + b);
                            break;
                        case"end":
                            a.zIndex = 1 + Math.sin(a.endAngle + b);
                            break;
                        case"inner":
                            a.zIndex = 1;
                            break
                    }
                    a.dirtyZIndex = true
                }
            }
        }
    },
    updatePlainBBox: function (c) {
        var a = this.attr, b = a.part === "inner" ? a.startRho : a.endRho;
        c.width = b * 2;
        c.height = b * a.distortion * 2 + a.thickness;
        c.x = a.centerX - b;
        c.y = a.centerY - b * a.distortion
    },
    updateTransformedBBox: function (a) {
        return this.updatePlainBBox(a)
    },
    updatePath: function (a) {
        if (this.attr.endAngle < this.attr.startAngle) {
            return
        }
        this[this.attr.part + "Renderer"](a)
    },
    topRenderer: function (n) {
        var k = this.attr, g = k.margin, c = k.distortion, i = k.centerX, h = k.centerY, f = k.baseRotation, j = k.startAngle + f, e = k.endAngle + f, d = (j + e) * 0.5, l = k.startRho, b = k.endRho, m = Math.sin(e), a = Math.cos(e);
        i += Math.cos(d) * g;
        h += Math.sin(d) * g * c;
        n.ellipse(i, h, l, l * c, 0, j, e, false);
        n.lineTo(i + a * b, h + m * b * c);
        n.ellipse(i, h, b, b * c, 0, e, j, true);
        n.closePath()
    },
    startRenderer: function (o) {
        var l = this.attr, g = l.margin, i = l.centerX, h = l.centerY, c = l.distortion, f = l.baseRotation, k = l.startAngle + f, e = l.endAngle + f, n = l.thickness, m = l.startRho, b = l.endRho, a = Math.sin(k), j = Math.cos(k), d;
        if (j < 0) {
            d = (k + e) * 0.5;
            i += Math.cos(d) * g;
            h += Math.sin(d) * g * c;
            o.moveTo(i + j * m, h + a * m * c);
            o.lineTo(i + j * b, h + a * b * c);
            o.lineTo(i + j * b, h + a * b * c + n);
            o.lineTo(i + j * m, h + a * m * c + n);
            o.closePath()
        }
    },
    endRenderer: function (o) {
        var j = this.attr, f = j.margin, h = j.centerX, g = j.centerY, b = j.distortion, e = j.baseRotation, i = j.startAngle + e, d = j.endAngle + e, m = j.thickness, k = j.startRho, a = j.endRho, l = Math.sin(d), n = Math.cos(d), c;
        if (n > 0) {
            c = (i + d) * 0.5;
            h += Math.cos(c) * f;
            g += Math.sin(c) * f * b;
            o.moveTo(h + n * k, g + l * k * b);
            o.lineTo(h + n * a, g + l * a * b);
            o.lineTo(h + n * a, g + l * a * b + m);
            o.lineTo(h + n * k, g + l * k * b + m);
            o.closePath()
        }
    },
    innerRenderer: function (q) {
        var l = this.attr, g = l.margin, i = l.centerX, h = l.centerY, b = l.distortion, e = l.baseRotation, k = l.startAngle + e, d = l.endAngle + e, c = (k + d) * 0.5, o = l.thickness, n = l.startRho, j = l.globalAlpha < 1, p, a, f, m;
        i += Math.cos(c) * g;
        h += Math.sin(c) * g * b;
        if (k >= Math.PI * 2 || j) {
            k -= Math.PI * 2;
            d -= Math.PI * 2
        }
        if (d > Math.PI && d < Math.PI * 3 || j) {
            f = k;
            m = Math.min(d, Math.PI * 2);
            p = Math.sin(m);
            a = Math.cos(m);
            q.ellipse(i, h, n, n * b, 0, f, m, false);
            q.lineTo(i + a * n, h + p * n * b + o);
            q.ellipse(i, h + o, n, n * b, 0, m, f, true);
            q.closePath()
        }
        if (d > Math.PI * 3) {
            f = Math.PI;
            m = d;
            p = Math.sin(m);
            a = Math.cos(m);
            q.ellipse(i, h, n, n * b, 0, f, m, false);
            q.lineTo(i + a * n, h + p * n * b + o);
            q.ellipse(i, h + o, n, n * b, 0, m, f, true);
            q.closePath()
        }
    },
    outerRenderer: function (q) {
        var m = this.attr, h = m.margin, j = m.centerX, i = m.centerY, c = m.distortion, f = m.baseRotation, l = m.startAngle + f, e = m.endAngle + f, d = (l + e) * 0.5, o = m.thickness, b = m.endRho, k = m.globalAlpha < 1, p, a, g, n;
        j += Math.cos(d) * h;
        i += Math.sin(d) * h * c;
        if (l >= Math.PI * 2 || k) {
            l -= Math.PI * 4;
            e -= Math.PI * 4
        }
        if (l < Math.PI || k) {
            g = l;
            n = Math.min(e, Math.PI);
            p = Math.sin(n);
            a = Math.cos(n);
            q.ellipse(j, i, b, b * c, 0, g, n, false);
            q.lineTo(j + a * b, i + p * b * c + o);
            q.ellipse(j, i + o, b, b * c, 0, n, g, true);
            q.closePath()
        }
        if (e > Math.PI * 2) {
            g = Math.max(l, Math.PI * 2);
            n = e;
            p = Math.sin(n);
            a = Math.cos(n);
            q.ellipse(j, i, b, b * c, 0, g, n, false);
            q.lineTo(j + a * b, i + p * b * c + o);
            q.ellipse(j, i + o, b, b * c, 0, n, g, true);
            q.closePath()
        }
    }
});
Ext.define("Ext.chart.series.Pie3D", {
    requires: ["Ext.chart.series.sprite.Pie3DPart"],
    extend: "Ext.chart.series.Polar",
    type: "pie3d",
    seriesType: "pie3d",
    alias: "series.pie3d",
    config: {
        rect: [0, 0, 0, 0],
        thickness: 35,
        distortion: 0.5,
        field: null,
        lengthField: false,
        donut: false,
        rotation: 0
    },
    itemOffset: 5,
    setField: function (a) {
        return this.setXField(a)
    },
    getField: function () {
        return this.getXField()
    },
    applyRotation: function (b) {
        var a = Math.PI * 2;
        return (b % a + a) % a
    },
    updateRotation: function (b) {
        var d = this.getSprites(), a, c;
        for (a = 0, c = d.length; a < c; a++) {
            d[a].setAttributes({baseRotation: b})
        }
    },
    updateColors: function (a) {
        this.setSubStyle({baseColor: a})
    },
    doUpdateStyles: function () {
        var e = this, g = e.getSprites(), f = e.itemOffset, d = g && g.length, b = 0, a = 0, c;
        for (; b < d; b += f, a++) {
            c = e.getStyleByIndex(a);
            g[b].setAttributes(c);
            g[b + 1].setAttributes(c);
            g[b + 2].setAttributes(c);
            g[b + 3].setAttributes(c);
            g[b + 4].setAttributes(c)
        }
    },
    processData: function () {
        var k = this, h = k.getChart(), c = h && h.getAnimation(), o = k.getStore(), j = o.getData().items, a = j.length, m = k.getField(), n, e = 0, g, q = [], f = k.getSprites(), l = k.itemOffset, p, b, d;
        for (d = 0; d < a; d++) {
            n = j[d].get(m);
            e += n;
            q[d] = e
        }
        if (e === 0) {
            return
        }
        g = 2 * Math.PI / e;
        for (d = 0; d < a; d++) {
            q[d] *= g
        }
        for (d = 0; d < f.length; d++) {
            f[d].fx.setConfig(c)
        }
        for (d = 0, b = 0; d < a; d++) {
            p = {opacity: 1, startAngle: b, endAngle: q[d]};
            f[d * l].setAttributes(p);
            f[d * l + 1].setAttributes(p);
            f[d * l + 2].setAttributes(p);
            f[d * l + 3].setAttributes(p);
            f[d * l + 4].setAttributes(p);
            b = q[d]
        }
    },
    getSprites: function () {
        var y = this, n = y.getChart(), q = y.getSurface(), j = y.getStore();
        if (!j) {
            return []
        }
        var o = j.getData().items, m = y.itemOffset, f = o.length, u = y.getAnimation() || n && n.getAnimation(), d = n.getMainRect() || [0, 0, 1, 1], r = y.getRotation(), w = y.getCenter(), v = y.getOffsetX(), t = y.getOffsetY(), g = Math.min((d[3] - y.getThickness() * 2) / y.getDistortion(), d[2]) / 2, h = {
            centerX: w[0] + v,
            centerY: w[1] + t - y.getThickness() / 2,
            endRho: g,
            startRho: g * y.getDonut() / 100,
            thickness: y.getThickness(),
            distortion: y.getDistortion()
        }, k, b = Math.PI * 2, l = y.sprites, c, e, p, a, x, s;
        for (s = 0; s < f; s++) {
            k = Ext.apply({}, this.getStyleByIndex(s), h);
            c = l[s * m];
            if (!c) {
                c = q.add({type: "pie3dPart", part: "top", startAngle: b, endAngle: b});
                e = q.add({type: "pie3dPart", part: "start", startAngle: b, endAngle: b});
                p = q.add({type: "pie3dPart", part: "end", startAngle: b, endAngle: b});
                a = q.add({type: "pie3dPart", part: "inner", startAngle: b, endAngle: b, thickness: 0});
                x = q.add({type: "pie3dPart", part: "outer", startAngle: b, endAngle: b, thickness: 0});
                c.fx.setDurationOn("baseRotation", 0);
                e.fx.setDurationOn("baseRotation", 0);
                p.fx.setDurationOn("baseRotation", 0);
                a.fx.setDurationOn("baseRotation", 0);
                x.fx.setDurationOn("baseRotation", 0);
                l.push(c, e, p, a, x)
            } else {
                e = l[s * m + 1];
                p = l[s * m + 2];
                a = l[s * m + 3];
                x = l[s * m + 4];
                if (u) {
                    c.fx.setConfig(u);
                    e.fx.setConfig(u);
                    p.fx.setConfig(u);
                    a.fx.setConfig(u);
                    x.fx.setConfig(u)
                }
            }
            c.setAttributes(k);
            e.setAttributes(k);
            p.setAttributes(k);
            a.setAttributes(k);
            x.setAttributes(k)
        }
        for (s *= m, ln = l.length; s < ln; s++) {
            l[s].fx.setConfig(u);
            l[s].setAttributes({opacity: 0, startAngle: b, endAngle: b, baseRotation: r})
        }
        return l
    }
});
Ext.define("Ext.chart.series.sprite.Polar", {
    mixins: {markerHolder: "Ext.chart.MarkerHolder"},
    extend: "Ext.draw.sprite.Sprite",
    inheritableStatics: {
        def: {
            processors: {
                dataMinX: "number",
                dataMaxX: "number",
                dataMinY: "number",
                dataMaxY: "number",
                rangeX: "data",
                rangeY: "data",
                dataY: "data",
                dataX: "data",
                centerX: "number",
                centerY: "number",
                startAngle: "number",
                endAngle: "number",
                startRho: "number",
                endRho: "number",
                baseRotation: "number",
                labels: "default",
                labelOverflowPadding: "number"
            },
            defaults: {
                dataY: null,
                dataX: null,
                dataMinX: 0,
                dataMaxX: 1,
                dataMinY: 0,
                dataMaxY: 1,
                centerX: 0,
                centerY: 0,
                startAngle: 0,
                endAngle: Math.PI,
                startRho: 0,
                endRho: 150,
                baseRotation: 0,
                labels: null,
                labelOverflowPadding: 10
            },
            triggers: {
                dataX: "bbox",
                dataY: "bbox",
                dataMinX: "bbox",
                dataMaxX: "bbox",
                dataMinY: "bbox",
                dataMaxY: "bbox",
                centerX: "bbox",
                centerY: "bbox",
                startAngle: "bbox",
                endAngle: "bbox",
                startRho: "bbox",
                endRho: "bbox",
                baseRotation: "bbox"
            }
        }
    },
    config: {store: null, field: null},
    updatePlainBBox: function (b) {
        var a = this.attr;
        b.x = a.centerX - a.endRho;
        b.y = a.centerY + a.endRho;
        b.width = a.endRho * 2;
        b.height = a.endRho * 2
    }
});
Ext.define("Ext.chart.series.sprite.Radar", {
    alias: "sprite.radar",
    extend: "Ext.chart.series.sprite.Polar",
    getDataPointXY: function (d) {
        var u = this, n = u.attr, f = n.centerX, e = n.centerY, o = n.matrix, t = n.dataMinX, s = n.dataMaxX, k = n.dataX, j = n.dataY, l = n.endRho, p = n.startRho, g = n.baseRotation, i, h, m, c, b, a, q;
        if (n.rangeY) {
            q = n.rangeY[1]
        } else {
            q = n.dataMaxY
        }
        c = (k[d] - t) / (s - t + 1) * 2 * Math.PI + g;
        m = j[d] / q * (l - p) + p;
        b = f + Math.cos(c) * m;
        a = e + Math.sin(c) * m;
        i = o.x(b, a);
        h = o.y(b, a);
        return [i, h]
    },
    render: function (a, l) {
        var h = this, f = h.attr, g = f.dataX, b = g.length, e = h.surfaceMatrix, d = {}, c, k, j, m;
        l.beginPath();
        for (c = 0; c < b; c++) {
            m = h.getDataPointXY(c);
            k = m[0];
            j = m[1];
            if (c === 0) {
                l.moveTo(k, j)
            }
            l.lineTo(k, j);
            d.translationX = e.x(k, j);
            d.translationY = e.y(k, j);
            h.putMarker("markers", d, c, true)
        }
        l.closePath();
        l.fillStroke(f)
    }
});
Ext.define("Ext.chart.series.Radar", {
    extend: "Ext.chart.series.Polar",
    type: "radar",
    seriesType: "radar",
    alias: "series.radar",
    requires: ["Ext.chart.series.sprite.Radar"],
    config: {},
    themeColorCount: function () {
        return 1
    },
    themeMarkerCount: function () {
        return 1
    },
    updateAngularAxis: function (a) {
        a.processData(this)
    },
    updateRadialAxis: function (a) {
        a.processData(this)
    },
    coordinateX: function () {
        return this.coordinate("X", 0, 2)
    },
    coordinateY: function () {
        return this.coordinate("Y", 1, 2)
    },
    updateCenter: function (a) {
        this.setStyle({translationX: a[0] + this.getOffsetX(), translationY: a[1] + this.getOffsetY()});
        this.doUpdateStyles()
    },
    updateRadius: function (a) {
        this.setStyle({endRho: a});
        this.doUpdateStyles()
    },
    updateRotation: function (a) {
        this.setStyle({rotationRads: a});
        this.doUpdateStyles()
    },
    updateTotalAngle: function (a) {
        this.processData()
    },
    getItemForPoint: function (k, j) {
        var h = this, m = h.sprites && h.sprites[0], f = m.attr, g = f.dataX, a = g.length, l = h.getStore(), e = h.getMarker(), b, o, p, d, n, c;
        if (h.getHidden()) {
            return null
        }
        if (m && e) {
            c = m.getBoundMarker("markers")[0];
            for (d = 0; d < a; d++) {
                n = c.getBBoxFor(d);
                b = (n.width + n.height) * 0.25;
                p = m.getDataPointXY(d);
                if (Math.abs(p[0] - k) < b && Math.abs(p[1] - j) < b) {
                    o = {
                        series: h,
                        sprite: m,
                        index: d,
                        category: "markers",
                        record: l.getData().items[d],
                        field: h.getYField()
                    };
                    return o
                }
            }
        }
        return h.callParent(arguments)
    },
    getDefaultSpriteConfig: function () {
        var a = this.callParent(), b = {
            customDurations: {
                translationX: 0,
                translationY: 0,
                rotationRads: 0,
                dataMinX: 0,
                dataMaxX: 0
            }
        };
        if (a.fx) {
            Ext.apply(a.fx, b)
        } else {
            a.fx = b
        }
        return a
    },
    getSprites: function () {
        var c = this, b = c.getChart(), d = c.getAnimation() || b && b.getAnimation(), a = c.sprites[0], e;
        if (!b) {
            return []
        }
        if (!a) {
            a = c.createSprite()
        }
        if (d) {
            e = a.getBoundMarker("markers");
            if (e) {
                e = e[0];
                e.getTemplate().fx.setConfig(d)
            }
            a.fx.setConfig(d)
        }
        return c.sprites
    },
    provideLegendInfo: function (d) {
        var b = this, a = b.getSubStyleWithTheme(), c = a.fillStyle;
        if (Ext.isArray(c)) {
            c = c[0]
        }
        d.push({
            name: b.getTitle() || b.getYField() || b.getId(),
            mark: (Ext.isObject(c) ? c.stops && c.stops[0].color : c) || a.strokeStyle || "black",
            disabled: b.getHidden(),
            series: b.getId(),
            index: 0
        })
    }
});
Ext.define("Ext.chart.series.sprite.Scatter", {
    alias: "sprite.scatterSeries",
    extend: "Ext.chart.series.sprite.Cartesian",
    renderClipped: function (o, p, u, r) {
        if (this.cleanRedraw) {
            return
        }
        var z = this, n = z.attr, h = n.dataX, f = n.dataY, v = n.labels, t = v && z.getBoundMarker("labels"), q = z.attr.matrix, b = q.getXX(), m = q.getYY(), j = q.getDX(), g = q.getDY(), k = {}, A, a = r[0] - b, w = r[0] + r[2] + b, l = r[1] - m, c = r[1] + r[3] + m, e, d;
        for (var s = 0; s < h.length; s++) {
            e = h[s];
            d = f[s];
            e = e * b + j;
            d = d * m + g;
            if (a <= e && e <= w && l <= d && d <= c) {
                if (n.renderer) {
                    k = {type: "items", translationX: e, translationY: d};
                    A = n.renderer.call(z, z, k, {store: z.getStore()}, s);
                    k = Ext.apply(k, A)
                } else {
                    k.translationX = e;
                    k.translationY = d
                }
                z.putMarker("items", k, s, !n.renderer);
                if (t && v[s]) {
                    z.drawLabel(v[s], e, d, s, r)
                }
            }
        }
    },
    drawLabel: function (j, h, g, p, a) {
        var q = this, m = q.attr, d = q.getBoundMarker("labels")[0], c = d.getTemplate(), l = q.labelCfg || (q.labelCfg = {}), b = q.surfaceMatrix, f, e, i = m.labelOverflowPadding, o = m.flipXY, k, n, r;
        l.text = j;
        n = q.getMarkerBBox("labels", p, true);
        if (!n) {
            q.putMarker("labels", l, p);
            n = q.getMarkerBBox("labels", p, true)
        }
        if (o) {
            l.rotationRads = Math.PI * 0.5
        } else {
            l.rotationRads = 0
        }
        k = n.height / 2;
        f = h;
        switch (c.attr.display) {
            case"under":
                e = g - k - i;
                break;
            case"rotate":
                f += i;
                e = g - i;
                l.rotationRads = -Math.PI / 4;
                break;
            default:
                e = g + k + i
        }
        l.x = b.x(f, e);
        l.y = b.y(f, e);
        if (c.attr.renderer) {
            r = c.attr.renderer.call(q, j, d, l, {store: q.getStore()}, p);
            if (typeof r === "string") {
                l.text = r
            } else {
                Ext.apply(l, r)
            }
        }
        q.putMarker("labels", l, p)
    }
});
Ext.define("Ext.chart.series.Scatter", {
    extend: "Ext.chart.series.Cartesian",
    alias: "series.scatter",
    type: "scatter",
    seriesType: "scatterSeries",
    requires: ["Ext.chart.series.sprite.Scatter"],
    config: {itemInstancing: {fx: {customDurations: {translationX: 0, translationY: 0}}}},
    themeMarkerCount: function () {
        return 1
    },
    applyMarker: function (b, a) {
        this.getItemInstancing();
        this.setItemInstancing(b);
        return this.callParent(arguments)
    },
    provideLegendInfo: function (d) {
        var b = this, a = b.getMarkerStyleByIndex(0), c = a.fillStyle;
        d.push({
            name: b.getTitle() || b.getYField() || b.getId(),
            mark: (Ext.isObject(c) ? c.stops && c.stops[0].color : c) || a.strokeStyle || "black",
            disabled: b.getHidden(),
            series: b.getId(),
            index: 0
        })
    }
});
Ext.define("Ext.chart.theme.Blue", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.blue", "chart.theme.Blue"],
    config: {baseColor: "#4d7fe6"}
});
Ext.define("Ext.chart.theme.BlueGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.blue-gradients", "chart.theme.Blue:gradients"],
    config: {baseColor: "#4d7fe6", gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Category1", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category1", "chart.theme.Category1"],
    config: {colors: ["#f0a50a", "#c20024", "#2044ba", "#810065", "#7eae29"]}
});
Ext.define("Ext.chart.theme.Category1Gradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category1-gradients", "chart.theme.Category1:gradients"],
    config: {colors: ["#f0a50a", "#c20024", "#2044ba", "#810065", "#7eae29"], gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Category2", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category2", "chart.theme.Category2"],
    config: {colors: ["#6d9824", "#87146e", "#2a9196", "#d39006", "#1e40ac"]}
});
Ext.define("Ext.chart.theme.Category2Gradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category2-gradients", "chart.theme.Category2:gradients"],
    config: {colors: ["#6d9824", "#87146e", "#2a9196", "#d39006", "#1e40ac"], gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Category3", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category3", "chart.theme.Category3"],
    config: {colors: ["#fbbc29", "#ce2e4e", "#7e0062", "#158b90", "#57880e"]}
});
Ext.define("Ext.chart.theme.Category3Gradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category3-gradients", "chart.theme.Category3:gradients"],
    config: {colors: ["#fbbc29", "#ce2e4e", "#7e0062", "#158b90", "#57880e"], gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Category4", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category4", "chart.theme.Category4"],
    config: {colors: ["#ef5773", "#fcbd2a", "#4f770d", "#1d3eaa", "#9b001f"]}
});
Ext.define("Ext.chart.theme.Category4Gradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category4-gradients", "chart.theme.Category4:gradients"],
    config: {colors: ["#ef5773", "#fcbd2a", "#4f770d", "#1d3eaa", "#9b001f"], gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Category5", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category5", "chart.theme.Category5"],
    config: {colors: ["#7eae29", "#fdbe2a", "#910019", "#27b4bc", "#d74dbc"]}
});
Ext.define("Ext.chart.theme.Category5Gradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category5-gradients", "chart.theme.Category5:gradients"],
    config: {colors: ["#7eae29", "#fdbe2a", "#910019", "#27b4bc", "#d74dbc"], gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Category6", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category6", "chart.theme.Category6"],
    config: {colors: ["#44dce1", "#0b2592", "#996e05", "#7fb325", "#b821a1"]}
});
Ext.define("Ext.chart.theme.Category6Gradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.category6-gradients", "chart.theme.Category6:gradients"],
    config: {colors: ["#44dce1", "#0b2592", "#996e05", "#7fb325", "#b821a1"], gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.DefaultGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.default-gradients", "chart.theme.Base:gradients"],
    config: {gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Green", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.green", "chart.theme.Green"],
    config: {baseColor: "#b1da5a"}
});
Ext.define("Ext.chart.theme.GreenGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.green-gradients", "chart.theme.Green:gradients"],
    config: {baseColor: "#b1da5a", gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Midnight", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.midnight", "chart.theme.Midnight"],
    config: {
        colors: ["#A837FF", "#4AC0F2", "#FF4D35", "#FF8809", "#61C102", "#FF37EA"],
        chart: {defaults: {background: "rgb(52, 52, 53)"}},
        axis: {
            defaults: {
                style: {strokeStyle: "rgb(224, 224, 227)"},
                label: {fillStyle: "rgb(224, 224, 227)"},
                title: {fillStyle: "rgb(224, 224, 227)"},
                grid: {strokeStyle: "rgb(112, 112, 115)"}
            }
        },
        series: {defaults: {label: {fillStyle: "rgb(224, 224, 227)"}}},
        sprites: {text: {fillStyle: "rgb(224, 224, 227)"}}
    }
});
Ext.define("Ext.chart.theme.Muted", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.muted", "chart.theme.Muted"],
    config: {colors: ["#8ca640", "#974144", "#4091ba", "#8e658e", "#3b8d8b", "#b86465", "#d2af69", "#6e8852", "#3dcc7e", "#a6bed1", "#cbaa4b", "#998baa"]}
});
Ext.define("Ext.chart.theme.Purple", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.purple", "chart.theme.Purple"],
    config: {baseColor: "#da5abd"}
});
Ext.define("Ext.chart.theme.PurpleGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.purple-gradients", "chart.theme.Purple:gradients"],
    config: {baseColor: "#da5abd", gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Red", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.red", "chart.theme.Red"],
    config: {baseColor: "#e84b67"}
});
Ext.define("Ext.chart.theme.RedGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.red-gradients", "chart.theme.Red:gradients"],
    config: {baseColor: "#e84b67", gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Sky", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.sky", "chart.theme.Sky"],
    config: {baseColor: "#4ce0e7"}
});
Ext.define("Ext.chart.theme.SkyGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.sky-gradients", "chart.theme.Sky:gradients"],
    config: {baseColor: "#4ce0e7", gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.chart.theme.Yellow", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.yellow", "chart.theme.Yellow"],
    config: {baseColor: "#fec935"}
});
Ext.define("Ext.chart.theme.YellowGradients", {
    extend: "Ext.chart.theme.Base",
    singleton: true,
    alias: ["chart.theme.yellow-gradients", "chart.theme.Yellow:gradients"],
    config: {baseColor: "#fec935", gradients: {type: "linear", degrees: 90}}
});
Ext.define("Ext.draw.PathUtil", function () {
    var a = Math.abs, c = Math.pow, e = Math.cos, b = Math.acos, d = Math.sqrt, f = Math.PI;
    return {
        singleton: true,
        requires: ["Ext.draw.overrides.Path", "Ext.draw.overrides.sprite.Path", "Ext.draw.overrides.Surface"],
        cubicRoots: function (m) {
            var z = m[0], x = m[1], w = m[2], v = m[3];
            if (z === 0) {
                return this.quadraticRoots(x, w, v)
            }
            var s = x / z, r = w / z, q = v / z, k = (3 * r - c(s, 2)) / 9, j = (9 * s * r - 27 * q - 2 * c(s, 3)) / 54, p = c(k, 3) + c(j, 2), n = [], h, g, o, l, u, y = Ext.Number.sign;
            if (p >= 0) {
                h = y(j + d(p)) * c(a(j + d(p)), 1 / 3);
                g = y(j - d(p)) * c(a(j - d(p)), 1 / 3);
                n[0] = -s / 3 + (h + g);
                n[1] = -s / 3 - (h + g) / 2;
                n[2] = n[1];
                o = a(d(3) * (h - g) / 2);
                if (o !== 0) {
                    n[1] = -1;
                    n[2] = -1
                }
            } else {
                l = b(j / d(-c(k, 3)));
                n[0] = 2 * d(-k) * e(l / 3) - s / 3;
                n[1] = 2 * d(-k) * e((l + 2 * f) / 3) - s / 3;
                n[2] = 2 * d(-k) * e((l + 4 * f) / 3) - s / 3
            }
            for (u = 0; u < 3; u++) {
                if (n[u] < 0 || n[u] > 1) {
                    n[u] = -1
                }
            }
            return n
        },
        quadraticRoots: function (h, g, n) {
            var m, l, k, j;
            if (h === 0) {
                return this.linearRoot(g, n)
            }
            m = g * g - 4 * h * n;
            if (m === 0) {
                k = [-g / (2 * h)]
            } else {
                if (m > 0) {
                    l = d(m);
                    k = [(-g - l) / (2 * h), (-g + l) / (2 * h)]
                } else {
                    return []
                }
            }
            for (j = 0; j < k.length; j++) {
                if (k[j] < 0 || k[j] > 1) {
                    k[j] = -1
                }
            }
            return k
        },
        linearRoot: function (h, g) {
            var i = -g / h;
            if (h === 0 || i < 0 || i > 1) {
                return []
            }
            return [i]
        },
        bezierCoeffs: function (h, g, k, j) {
            var i = [];
            i[0] = -h + 3 * g - 3 * k + j;
            i[1] = 3 * h - 6 * g + 3 * k;
            i[2] = -3 * h + 3 * g;
            i[3] = h;
            return i
        },
        cubicLineIntersections: function (I, G, F, E, l, k, j, h, M, p, K, n) {
            var u = [], N = [], D = p - n, z = K - M, y = M * (n - p) - p * (K - M), L = this.bezierCoeffs(I, G, F, E), J = this.bezierCoeffs(l, k, j, h), H, x, w, v, g, q, o, m;
            u[0] = D * L[0] + z * J[0];
            u[1] = D * L[1] + z * J[1];
            u[2] = D * L[2] + z * J[2];
            u[3] = D * L[3] + z * J[3] + y;
            x = this.cubicRoots(u);
            for (H = 0; H < x.length; H++) {
                v = x[H];
                if (v < 0 || v > 1) {
                    continue
                }
                g = v * v;
                q = g * v;
                o = L[0] * q + L[1] * g + L[2] * v + L[3];
                m = J[0] * q + J[1] * g + J[2] * v + J[3];
                if ((K - M) !== 0) {
                    w = (o - M) / (K - M)
                } else {
                    w = (m - p) / (n - p)
                }
                if (!(w < 0 || w > 1)) {
                    N.push([o, m])
                }
            }
            return N
        },
        splitCubic: function (g, q, p, o, m) {
            var j = m * m, n = m * j, i = m - 1, h = i * i, k = i * h, l = n * o - 3 * j * i * p + 3 * m * h * q - k * g;
            return [[g, m * q - i * g, j * p - 2 * m * i * q + h * g, l], [l, j * o - 2 * m * i * p + h * q, m * o - i * p, o]]
        },
        cubicDimension: function (p, o, l, k) {
            var j = 3 * (-p + 3 * (o - l) + k), i = 6 * (p - 2 * o + l), h = -3 * (p - o), q, n, g = Math.min(p, k), m = Math.max(p, k), r;
            if (j === 0) {
                if (i === 0) {
                    return [g, m]
                } else {
                    q = -h / i;
                    if (0 < q && q < 1) {
                        n = this.interpolateCubic(p, o, l, k, q);
                        g = Math.min(g, n);
                        m = Math.max(m, n)
                    }
                }
            } else {
                r = i * i - 4 * j * h;
                if (r >= 0) {
                    r = d(r);
                    q = (r - i) / 2 / j;
                    if (0 < q && q < 1) {
                        n = this.interpolateCubic(p, o, l, k, q);
                        g = Math.min(g, n);
                        m = Math.max(m, n)
                    }
                    if (r > 0) {
                        q -= r / j;
                        if (0 < q && q < 1) {
                            n = this.interpolateCubic(p, o, l, k, q);
                            g = Math.min(g, n);
                            m = Math.max(m, n)
                        }
                    }
                }
            }
            return [g, m]
        },
        interpolateCubic: function (h, g, l, k, i) {
            if (i === 0) {
                return h
            }
            if (i === 1) {
                return k
            }
            var j = (1 - i) / i;
            return i * i * i * (k + j * (3 * l + j * (3 * g + j * h)))
        },
        cubicsIntersections: function (r, q, p, o, A, z, y, v, g, F, E, D, m, l, k, i) {
            var C = this, x = C.cubicDimension(r, q, p, o), B = C.cubicDimension(A, z, y, v), n = C.cubicDimension(g, F, E, D), s = C.cubicDimension(m, l, k, i), j, h, u, t, w = [];
            if (x[0] > n[1] || x[1] < n[0] || B[0] > s[1] || B[1] < s[0]) {
                return []
            }
            if (a(A - z) < 1 && a(y - v) < 1 && a(r - o) < 1 && a(q - p) < 1 && a(m - l) < 1 && a(k - i) < 1 && a(g - D) < 1 && a(F - E) < 1) {
                return [[(r + o) * 0.5, (A + z) * 0.5]]
            }
            j = C.splitCubic(r, q, p, o, 0.5);
            h = C.splitCubic(A, z, y, v, 0.5);
            u = C.splitCubic(g, F, E, D, 0.5);
            t = C.splitCubic(m, l, k, i, 0.5);
            w.push.apply(w, C.cubicsIntersections.apply(C, j[0].concat(h[0], u[0], t[0])));
            w.push.apply(w, C.cubicsIntersections.apply(C, j[0].concat(h[0], u[1], t[1])));
            w.push.apply(w, C.cubicsIntersections.apply(C, j[1].concat(h[1], u[0], t[0])));
            w.push.apply(w, C.cubicsIntersections.apply(C, j[1].concat(h[1], u[1], t[1])));
            return w
        },
        linesIntersection: function (k, p, j, o, h, n, q, m) {
            var l = (j - k) * (m - n) - (o - p) * (q - h), i, g;
            if (l === 0) {
                return null
            }
            i = ((q - h) * (p - n) - (k - h) * (m - n)) / l;
            g = ((j - k) * (p - n) - (o - p) * (k - h)) / l;
            if (i >= 0 && i <= 1 && g >= 0 && g <= 1) {
                return [k + i * (j - k), p + i * (o - p)]
            }
            return null
        },
        pointOnLine: function (j, m, h, l, g, n) {
            var k, i;
            if (a(h - j) < a(l - m)) {
                i = j;
                j = m;
                m = i;
                i = h;
                h = l;
                l = i;
                i = g;
                g = n;
                n = i
            }
            k = (g - j) / (h - j);
            if (k < 0 || k > 1) {
                return false
            }
            return a(m + k * (l - m) - n) < 4
        },
        pointOnCubic: function (w, u, s, r, l, k, h, g, p, o) {
            var C = this, B = C.bezierCoeffs(w, u, s, r), A = C.bezierCoeffs(l, k, h, g), z, v, n, m, q;
            B[3] -= p;
            A[3] -= o;
            n = C.cubicRoots(B);
            m = C.cubicRoots(A);
            for (z = 0; z < n.length; z++) {
                q = n[z];
                for (v = 0; v < m.length; v++) {
                    if (q >= 0 && q <= 1 && a(q - m[v]) < 0.05) {
                        return true
                    }
                }
            }
            return false
        }
    }
});
Ext.define("Ext.draw.plugin.SpriteEvents", {
    extend: "Ext.plugin.Abstract",
    alias: "plugin.spriteevents",
    requires: ["Ext.draw.PathUtil"],
    mouseMoveEvents: {mousemove: true, mouseover: true, mouseout: true},
    spriteMouseMoveEvents: {spritemousemove: true, spritemouseover: true, spritemouseout: true},
    init: function (a) {
        var b = "handleEvent";
        this.drawContainer = a;
        a.addElementListener({
            click: b,
            dblclick: b,
            mousedown: b,
            mousemove: b,
            mouseup: b,
            mouseover: b,
            mouseout: b,
            priority: 1001,
            scope: this
        })
    },
    hasSpriteMouseMoveListeners: function () {
        var b = this.drawContainer.hasListeners, a;
        for (a in this.spriteMouseMoveEvents) {
            if (a in b) {
                return true
            }
        }
        return false
    },
    hitTestEvent: function (f) {
        var b = this.drawContainer.getItems(), a, d, c;
        for (c = b.length - 1; c >= 0; c--) {
            a = b.get(c);
            d = a.hitTestEvent(f);
            if (d) {
                return d
            }
        }
        return null
    },
    handleEvent: function (f) {
        var d = this, b = d.drawContainer, g = f.type in d.mouseMoveEvents, a = d.lastSprite, c;
        if (g && !d.hasSpriteMouseMoveListeners()) {
            return
        }
        c = d.hitTestEvent(f);
        if (g && !Ext.Object.equals(c, a)) {
            if (c) {
                b.fireEvent("spritemouseover", c, f)
            }
            if (a) {
                b.fireEvent("spritemouseout", a, f)
            }
        }
        if (c) {
            b.fireEvent("sprite" + f.type, c, f)
        }
        d.lastSprite = c
    }
});
Ext.define("Ext.chart.TipSurface", {
    extend: "Ext.draw.Container",
    spriteArray: false,
    renderFirst: true,
    constructor: function (a) {
        this.callParent([a]);
        if (a.sprites) {
            this.spriteArray = [].concat(a.sprites);
            delete a.sprites
        }
    },
    onRender: function () {
        var c = this, b = 0, a = 0, d, e;
        this.callParent(arguments);
        e = c.spriteArray;
        if (c.renderFirst && e) {
            c.renderFirst = false;
            for (a = e.length; b < a; b++) {
                d = c.surface.add(e[b]);
                d.setAttributes({hidden: false}, true)
            }
        }
    }
});
Ext.define("Ext.chart.interactions.ItemInfo", {
    extend: "Ext.chart.interactions.Abstract",
    type: "iteminfo",
    alias: "interaction.iteminfo",
    config: {
        extjsGestures: {
            start: {event: "click", handler: "onInfoGesture"},
            move: {event: "mousemove", handler: "onInfoGesture"},
            end: {event: "mouseleave", handler: "onInfoGesture"}
        }
    },
    item: null,
    onInfoGesture: function (f, a) {
        var c = this, b = c.getItemForEvent(f), d = b && b.series.tooltip;
        if (d) {
            d.onMouseMove.call(d, f)
        }
        if (b !== c.item) {
            if (b) {
                b.series.showTip(b)
            } else {
                c.item.series.hideTip(c.item)
            }
            c.item = b
        }
        return false
    }
});