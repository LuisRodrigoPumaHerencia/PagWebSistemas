google.maps.__gjsload__('stats', function(_) {
    var JEa = function(a) {
            _.H(this, a, 2)
        },
        KEa = function(a) {
            _.H(this, a, 6)
        },
        GH = function(a, b, c, d) {
            var e = {};
            e.host = document.location && document.location.host || window.location.host;
            e.v = a;
            e.r = Math.round(1 / b);
            c && (e.client = c);
            d && (e.key = d);
            return e
        },
        MEa = function(a) {
            var b = document;
            this.j = LEa;
            this.i = a + "/maps/gen_204";
            this.g = b
        },
        HH = function(a, b, c) {
            var d = [];
            _.mb(a, function(e, f) {
                d.push(f + b + e)
            });
            return d.join(c)
        },
        NEa = function(a) {
            var b = {};
            _.mb(a, function(c, d) {
                b[encodeURIComponent(d)] = encodeURIComponent(c).replace(/%7C/g, "|")
            });
            return HH(b, ":", ",")
        },
        OEa = function(a, b, c, d) {
            var e = _.Qd(_.de, 0, 1);
            this.N = a;
            this.T = b;
            this.H = e;
            this.j = c;
            this.o = d;
            this.g = new _.xA;
            this.O = Date.now()
        },
        IH = function(a, b, c, d, e) {
            this.T = a;
            this.W = b;
            this.O = c;
            this.H = d;
            this.N = e;
            this.i = {};
            this.g = []
        },
        PEa = function(a, b, c) {
            var d = _.gea;
            this.j = a;
            _.M.bind(this.j, "set_at", this, this.o);
            _.M.bind(this.j, "insert_at", this, this.o);
            this.H = b;
            this.O = d;
            this.N = c;
            this.i = 0;
            this.g = {};
            this.o()
        },
        REa = function(a, b, c, d, e) {
            var f = _.Qd(_.de, 23, 500);
            var g = _.Qd(_.de, 22, 2);
            this.N = a;
            this.O = b;
            this.$ =
                f;
            this.W = g;
            this.H = c;
            this.j = d;
            this.o = e;
            this.i = new _.xA;
            this.g = 0;
            this.T = Date.now();
            QEa(this)
        },
        QEa = function(a) {
            window.setTimeout(function() {
                SEa(a);
                QEa(a)
            }, Math.min(a.$ * Math.pow(a.W, a.g), 2147483647))
        },
        SEa = function(a) {
            var b = GH(a.O, a.H, a.j, a.o);
            b.t = a.g + "-" + (Date.now() - a.T);
            a.i.forEach(function(c, d) {
                c = c();
                0 < c && (b[d] = Number(c.toFixed(2)) + (_.Lga() ? "-if" : ""))
            });
            a.N.Wk({
                ev: "api_snap"
            }, b);
            ++a.g
        },
        JH = function() {
            this.i = _.I(_.de, 6);
            this.j = _.I(_.de, 16);
            if (_.mh[35]) {
                var a = _.ce(_.de);
                a = _.I(a, 11)
            } else a = _.Jq;
            this.g =
                new MEa(a);
            (a = _.Ni) && new PEa(a, (0, _.C)(this.g.Wk, this.g), !!this.i);
            a = _.I(_.me(_.de), 1);
            this.W = a.split(".")[1] || a;
            this.$ = {};
            this.T = {};
            this.O = {};
            this.N = _.Qd(_.de, 0, 1);
            _.mg && (this.ka = new REa(this.g, this.W, this.N, this.i, this.j));
            a = this.H = new KEa;
            var b = _.I(_.me(_.de), 1);
            a.ha[1] = b;
            this.i && (this.H.ha[2] = this.i);
            this.j && (this.H.ha[3] = this.j)
        };
    _.E(JEa, _.F);
    var KH;
    _.E(KEa, _.F);
    var LEa = Math.round(1E15 * Math.random()).toString(36);
    MEa.prototype.Wk = function(a, b) {
        b = b || {};
        var c = _.Nk().toString(36);
        b.src = "apiv3";
        b.token = this.j;
        b.ts = c.substr(c.length - 6);
        a.cad = NEa(b);
        a = HH(a, "=", "&");
        a = this.i + "?target=api&" + a;
        _.Wc(new _.Vc(this.g), "IMG").src = a;
        (b = _.D.__gm_captureCSI) && b(a)
    };
    OEa.prototype.i = function(a, b) {
        b = void 0 !== b ? b : 1;
        0 === this.g.size && window.setTimeout((0, _.C)(function() {
            var c = GH(this.T, this.H, this.j, this.o);
            c.t = Date.now() - this.O;
            for (var d = this.g, e = {}, f = _.A(_.u(d, "keys").call(d)), g = f.next(); !g.done; g = f.next()) g = g.value, e[g] = d.get(g);
            _.ob(c, e);
            this.g.clear();
            this.N.Wk({
                ev: "api_maprft"
            }, c)
        }, this), 500);
        b = this.g.get(a, 0) + b;
        this.g.set(a, b)
    };
    IH.prototype.j = function(a) {
        this.i[a] || (this.i[a] = !0, this.g.push(a), 2 > this.g.length && _.Qs(this, this.o, 500))
    };
    IH.prototype.o = function() {
        for (var a = GH(this.W, this.O, this.H, this.N), b = 0, c; c = this.g[b]; ++b) a[c] = "1";
        a.hybrid = +_.tq();
        this.g.length = 0;
        this.T.Wk({
            ev: "api_mapft"
        }, a)
    };
    PEa.prototype.o = function() {
        for (var a; a = this.j.removeAt(0);) {
            var b = a.Jy;
            a = a.timestamp - this.O;
            ++this.i;
            this.g[b] || (this.g[b] = 0);
            ++this.g[b];
            if (20 <= this.i && !(this.i % 5)) {
                var c = {
                    s: b
                };
                c.sr = this.g[b];
                c.tr = this.i;
                c.te = a;
                c.hc = this.N ? "1" : "0";
                this.H({
                    ev: "api_services"
                }, c)
            }
        }
    };
    REa.prototype.register = function(a, b) {
        this.i.set(a, b)
    };
    JH.prototype.oa = function(a) {
        a = _.uf(a);
        var b = this.$[a];
        b || (b = new IH(this.g, this.W, this.N, this.i, this.j), this.$[a] = b);
        return b
    };
    JH.prototype.na = function(a) {
        a = _.uf(a);
        this.T[a] || (this.T[a] = new OEa(this.g, this.W, this.i, this.j));
        return this.T[a]
    };
    JH.prototype.o = function(a) {
        if (this.ka) {
            this.O[a] || (this.O[a] = new _.AA, this.ka.register(a, function() {
                return b.Kc()
            }));
            var b = this.O[a];
            return b
        }
    };
    JH.prototype.ta = function(a) {
        if (_.mg) {
            var b = _.Sfa(this.H),
                c = Math.floor(Date.now() / 1E3);
            b.ha[0] = c;
            c = new JEa(_.L(b, 5));
            c.ha[0] = Math.round(1 / this.N);
            c.ha[1] = a;
            a = this.g;
            c = {
                ev: "api_map_style"
            };
            var d = new _.ch;
            KH || (KH = {
                va: "issssm",
                Fa: ["is"]
            });
            var e = KH;
            b = d.g(b.kc(), e);
            c.pb = encodeURIComponent(b).replace(/%20/g, "+");
            b = HH(c, "=", "&");
            _.Wc(new _.Vc(a.g), "IMG").src = a.i + "?target=api&" + b
        }
    };
    _.jf("stats", new JH);
});