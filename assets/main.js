/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), +function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {end: b[c]};
        return !1
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }

    var c = '[data-dismiss="alert"]', d = function (b) {
        a(b).on("click", c, this.close)
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }

        var e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }

    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.7", c.DEFAULTS = {loadingText: "loading..."}, c.prototype.setState = function (b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
        }, this), 0)
    }, c.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }

    var c = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b), d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1, f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function (a) {
        var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval,
            h = "next" == b ? "left" : "right", i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0], k = a.Event("slide.bs.carousel", {relatedTarget: j, direction: h});
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {relatedTarget: j, direction: h});
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this
    };
    var e = function (c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }

    var d = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {toggle: !0}, d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function () {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function () {
            var d = a(this), e = b(d), f = {relatedTarget: this};
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function () {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }

    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e), g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {relatedTarget: this};
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function (c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d), g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a", i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), +function (a) {
    "use strict";

    function b(b, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }

    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var d = this, e = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {relatedTarget: b});
            e ? d.$dialog.one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function () {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function () {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function () {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(e) && e}, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, c.prototype.init = function (b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function () {
        for (var a in this.inState) if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this, f = this.tip(), g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i, j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
            if (j) {
                var n = h, o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function () {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function (a) {
                d.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function (b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }

        var e = this, f = a(this.$tip), g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function () {
        return this.getTitle()
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {width: e.right - e.left, height: e.bottom - e.top}));
        var f = window.SVGElement && c instanceof window.SVGElement, g = d ? {top: 0, left: 0} : f ? null : b.offset(),
            h = {scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()},
            i = d ? {width: a(window).width(), height: a(window).height()} : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {top: 0, left: 0};
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function () {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function () {
        this.enabled = !0
    }, c.prototype.disable = function () {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function () {
        var a = this;
        clearTimeout(this.timeout), this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this
    }
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this
    }
}(jQuery), +function (a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }

    b.VERSION = "3.3.7", b.DEFAULTS = {offset: 10}, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function () {
        var b = this, c = "offset", d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var b = a(this), e = b.data("target") || b.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function () {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {relatedTarget: b[0]}),
                g = a.Event("show.bs.tab", {relatedTarget: e[0]});
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
                    e.trigger({type: "hidden.bs.tab", relatedTarget: b[0]}), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function (b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }

        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    };
    var e = function (c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({top: g - b - f})
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
(function (e, t, n) {
    "use strict";

    function $(n) {
        u = t.documentElement;
        a = t.body;
        z();
        yt = this;
        n = n || {};
        Nt = n.constants || {};
        if (n.easing) {
            for (var r in n.easing) {
                V[r] = n.easing[r]
            }
        }
        It = n.edgeStrategy || "set";
        Et = {beforerender: n.beforerender, render: n.render};
        St = n.forceHeight !== false;
        if (St) {
            Tt = n.scale || 1
        }
        Ct = n.mobileDeceleration || x;
        Pt = n.smoothScrolling !== false;
        Ht = n.smoothScrollingDuration || T;
        Bt = {targetTop: yt.getScrollTop()};
        qt = (n.mobileCheck || function () {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
        })();
        if (qt) {
            wt = t.getElementById("skrollr-body");
            if (wt) {
                st()
            }
            J();
            pt(u, [g, w], [y])
        } else {
            pt(u, [g, b], [y])
        }
        yt.refresh();
        ot(e, "resize orientationchange", function () {
            var e = u.clientWidth;
            var t = u.clientHeight;
            if (t !== Mt || e !== Ot) {
                Mt = t;
                Ot = e;
                _t = true
            }
        });
        var i = W();
        (function s() {
            G();
            Wt = i(s)
        })();
        return yt
    }

    var r = {
        get: function () {
            return yt
        }, init: function (e) {
            return yt || new $(e)
        }, VERSION: "0.6.22"
    };
    var i = Object.prototype.hasOwnProperty;
    var s = e.Math;
    var o = e.getComputedStyle;
    var u;
    var a;
    var f = "touchstart";
    var l = "touchmove";
    var c = "touchcancel";
    var h = "touchend";
    var p = "skrollable";
    var d = p + "-before";
    var v = p + "-between";
    var m = p + "-after";
    var g = "skrollr";
    var y = "no-" + g;
    var b = g + "-desktop";
    var w = g + "-mobile";
    var E = "linear";
    var S = 1e3;
    var x = .004;
    var T = 200;
    var N = "start";
    var C = "end";
    var k = "center";
    var L = "bottom";
    var A = "___skrollable_id";
    var O = /^(?:input|textarea|button|select)$/i;
    var M = /^\s+|\s+$/g;
    var _ = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;
    var D = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;
    var P = /^([a-z\-]+)\[(\w+)\]$/;
    var H = /-([a-z])/g;
    var B = function (e, t) {
        return t.toUpperCase()
    };
    var j = /[\-+]?[\d]*\.?[\d]+/g;
    var F = /\{\?\}/g;
    var I = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;
    var q = /[a-z\-]+-gradient/g;
    var R = "";
    var U = "";
    var z = function () {
        var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (!o) {
            return
        }
        var t = o(a, null);
        for (var n in t) {
            R = n.match(e) || +n == n && t[n].match(e);
            if (R) {
                break
            }
        }
        if (!R) {
            R = U = "";
            return
        }
        R = R[0];
        if (R.slice(0, 1) === "-") {
            U = R;
            R = {"-webkit-": "webkit", "-moz-": "Moz", "-ms-": "ms", "-o-": "O"}[R]
        } else {
            U = "-" + R.toLowerCase() + "-"
        }
    };
    var W = function () {
        var t = e.requestAnimationFrame || e[R.toLowerCase() + "RequestAnimationFrame"];
        var n = mt();
        if (qt || !t) {
            t = function (t) {
                var r = mt() - n;
                var i = s.max(0, 1e3 / 60 - r);
                return e.setTimeout(function () {
                    n = mt();
                    t()
                }, i)
            }
        }
        return t
    };
    var X = function () {
        var t = e.cancelAnimationFrame || e[R.toLowerCase() + "CancelAnimationFrame"];
        if (qt || !t) {
            t = function (t) {
                return e.clearTimeout(t)
            }
        }
        return t
    };
    var V = {
        begin: function () {
            return 0
        }, end: function () {
            return 1
        }, linear: function (e) {
            return e
        }, quadratic: function (e) {
            return e * e
        }, cubic: function (e) {
            return e * e * e
        }, swing: function (e) {
            return -s.cos(e * s.PI) / 2 + .5
        }, sqrt: function (e) {
            return s.sqrt(e)
        }, outCubic: function (e) {
            return s.pow(e - 1, 3) + 1
        }, bounce: function (e) {
            var t;
            if (e <= .5083) {
                t = 3
            } else if (e <= .8489) {
                t = 9
            } else if (e <= .96208) {
                t = 27
            } else if (e <= .99981) {
                t = 91
            } else {
                return 1
            }
            return 1 - s.abs(3 * s.cos(e * t * 1.028) / t)
        }
    };
    $.prototype.refresh = function (e) {
        var r;
        var i;
        var s = false;
        if (e === n) {
            s = true;
            bt = [];
            Ft = 0;
            e = t.getElementsByTagName("*")
        } else if (e.length === n) {
            e = [e]
        }
        r = 0;
        i = e.length;
        for (; r < i; r++) {
            var o = e[r];
            var u = o;
            var a = [];
            var f = Pt;
            var l = It;
            if (!o.attributes) {
                continue
            }
            var c = 0;
            var h = o.attributes.length;
            for (; c < h; c++) {
                var d = o.attributes[c];
                if (d.name === "data-anchor-target") {
                    u = t.querySelector(d.value);
                    if (u === null) {
                        throw'Unable to find anchor target "' + d.value + '"'
                    }
                    continue
                }
                if (d.name === "data-smooth-scrolling") {
                    f = d.value !== "off";
                    continue
                }
                if (d.name === "data-edge-strategy") {
                    l = d.value;
                    continue
                }
                var v = d.name.match(_);
                if (v === null) {
                    continue
                }
                var m = {props: d.value, element: o};
                a.push(m);
                var g = v[1];
                if (g) {
                    m.constant = g.substr(1)
                }
                var y = v[2];
                if (/p$/.test(y)) {
                    m.isPercentage = true;
                    m.offset = (y.slice(0, -1) | 0) / 100
                } else {
                    m.offset = y | 0
                }
                var b = v[3];
                var w = v[4] || b;
                if (!b || b === N || b === C) {
                    m.mode = "absolute";
                    if (b === C) {
                        m.isEnd = true
                    } else if (!m.isPercentage) {
                        m.offset = m.offset * Tt
                    }
                } else {
                    m.mode = "relative";
                    m.anchors = [b, w]
                }
            }
            if (!a.length) {
                continue
            }
            var E, S;
            var x;
            if (!s && A in o) {
                x = o[A];
                E = bt[x].styleAttr;
                S = bt[x].classAttr
            } else {
                x = o[A] = Ft++;
                E = o.style.cssText;
                S = ht(o)
            }
            bt[x] = {
                element: o,
                styleAttr: E,
                classAttr: S,
                anchorTarget: u,
                keyFrames: a,
                smoothScrolling: f,
                edgeStrategy: l
            };
            pt(o, [p], [])
        }
        ft();
        r = 0;
        i = e.length;
        for (; r < i; r++) {
            var T = bt[e[r][A]];
            if (T === n) {
                continue
            }
            Y(T);
            et(T)
        }
        return yt
    };
    $.prototype.relativeToAbsolute = function (e, t, n) {
        var r = u.clientHeight;
        var i = e.getBoundingClientRect();
        var s = i.top;
        var o = i.bottom - i.top;
        if (t === L) {
            s -= r
        } else if (t === k) {
            s -= r / 2
        }
        if (n === L) {
            s += o
        } else if (n === k) {
            s += o / 2
        }
        s += yt.getScrollTop();
        return s + .5 | 0
    };
    $.prototype.animateTo = function (e, t) {
        t = t || {};
        var r = mt();
        var i = yt.getScrollTop();
        Dt = {
            startTop: i,
            topDiff: e - i,
            targetTop: e,
            duration: t.duration || S,
            startTime: r,
            endTime: r + (t.duration || S),
            easing: V[t.easing || E],
            done: t.done
        };
        if (!Dt.topDiff) {
            if (Dt.done) {
                Dt.done.call(yt, false)
            }
            Dt = n
        }
        return yt
    };
    $.prototype.stopAnimateTo = function () {
        if (Dt && Dt.done) {
            Dt.done.call(yt, true)
        }
        Dt = n
    };
    $.prototype.isAnimatingTo = function () {
        return !!Dt
    };
    $.prototype.setScrollTop = function (t, n) {
        jt = n === true;
        if (qt) {
            Rt = s.min(s.max(t, 0), xt)
        } else {
            e.scrollTo(0, t)
        }
        return yt
    };
    $.prototype.getScrollTop = function () {
        if (qt) {
            return Rt
        } else {
            return e.pageYOffset || u.scrollTop || a.scrollTop || 0
        }
    };
    $.prototype.getMaxScrollTop = function () {
        return xt
    };
    $.prototype.on = function (e, t) {
        Et[e] = t;
        return yt
    };
    $.prototype.off = function (e) {
        delete Et[e];
        return yt
    };
    $.prototype.destroy = function () {
        var e = X();
        e(Wt);
        at();
        pt(u, [y], [g, b, w]);
        var t = 0;
        var i = bt.length;
        for (; t < i; t++) {
            it(bt[t].element)
        }
        u.style.overflow = a.style.overflow = "auto";
        u.style.height = a.style.height = "auto";
        if (wt) {
            r.setStyle(wt, "transform", "none")
        }
        yt = n;
        wt = n;
        Et = n;
        St = n;
        xt = 0;
        Tt = 1;
        Nt = n;
        Ct = n;
        kt = "down";
        Lt = -1;
        Ot = 0;
        Mt = 0;
        _t = false;
        Dt = n;
        Pt = n;
        Ht = n;
        Bt = n;
        jt = n;
        Ft = 0;
        It = n;
        qt = false;
        Rt = 0;
        Ut = n
    };
    var J = function () {
        var r;
        var i;
        var o;
        var p;
        var d;
        var v;
        var m;
        var g;
        var y;
        var b;
        var w;
        var E;
        ot(u, [f, l, c, h].join(" "), function (e) {
            var u = e.changedTouches[0];
            p = e.target;
            while (p.nodeType === 3) {
                p = p.parentNode
            }
            d = u.clientY;
            v = u.clientX;
            b = e.timeStamp;
            if (!O.test(p.tagName)) {
                e.preventDefault()
            }
            switch (e.type) {
                case f:
                    if (r) {
                        r.blur()
                    }
                    yt.stopAnimateTo();
                    r = p;
                    i = m = d;
                    o = v;
                    y = b;
                    break;
                case l:
                    if (O.test(p.tagName) && t.activeElement !== p) {
                        e.preventDefault()
                    }
                    g = d - m;
                    E = b - w;
                    yt.setScrollTop(Rt - g, true);
                    m = d;
                    w = b;
                    break;
                default:
                case c:
                case h:
                    var a = i - d;
                    var S = o - v;
                    var x = S * S + a * a;
                    if (x < 49) {
                        if (!O.test(r.tagName)) {
                            r.focus();
                            var T = t.createEvent("MouseEvents");
                            T.initMouseEvent("click", true, true, e.view, 1, u.screenX, u.screenY, u.clientX, u.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                            r.dispatchEvent(T)
                        }
                        return
                    }
                    r = n;
                    var N = g / E;
                    N = s.max(s.min(N, 3), -3);
                    var C = s.abs(N / Ct);
                    var k = N * C + .5 * Ct * C * C;
                    var L = yt.getScrollTop() - k;
                    var A = 0;
                    if (L > xt) {
                        A = (xt - L) / k;
                        L = xt
                    } else if (L < 0) {
                        A = -L / k;
                        L = 0
                    }
                    C = C * (1 - A);
                    yt.animateTo(L + .5 | 0, {easing: "outCubic", duration: C});
                    break
            }
        });
        e.scrollTo(0, 0);
        u.style.overflow = a.style.overflow = "hidden"
    };
    var K = function () {
        var e = u.clientHeight;
        var t = lt();
        var n;
        var r;
        var i;
        var o;
        var a;
        var f;
        var l;
        var c;
        var h;
        var p;
        var d;
        c = 0;
        h = bt.length;
        for (; c < h; c++) {
            n = bt[c];
            r = n.element;
            i = n.anchorTarget;
            o = n.keyFrames;
            a = 0;
            f = o.length;
            for (; a < f; a++) {
                l = o[a];
                p = l.offset;
                d = t[l.constant] || 0;
                l.frame = p;
                if (l.isPercentage) {
                    p = p * e;
                    l.frame = p
                }
                if (l.mode === "relative") {
                    it(r);
                    l.frame = yt.relativeToAbsolute(i, l.anchors[0], l.anchors[1]) - p;
                    it(r, true)
                }
                l.frame += d;
                if (St) {
                    if (!l.isEnd && l.frame > xt) {
                        xt = l.frame
                    }
                }
            }
        }
        xt = s.max(xt, ct());
        c = 0;
        h = bt.length;
        for (; c < h; c++) {
            n = bt[c];
            o = n.keyFrames;
            a = 0;
            f = o.length;
            for (; a < f; a++) {
                l = o[a];
                d = t[l.constant] || 0;
                if (l.isEnd) {
                    l.frame = xt - l.offset + d
                }
            }
            n.keyFrames.sort(gt)
        }
    };
    var Q = function (e, t) {
        var n = 0;
        var s = bt.length;
        for (; n < s; n++) {
            var o = bt[n];
            var u = o.element;
            var a = o.smoothScrolling ? e : t;
            var f = o.keyFrames;
            var l = f[0].frame;
            var c = f[f.length - 1].frame;
            var h = a < l;
            var g = a > c;
            var y = f[h ? 0 : f.length - 1];
            var b;
            var w;
            if (h || g) {
                if (h && o.edge === -1 || g && o.edge === 1) {
                    continue
                }
                pt(u, [h ? d : m], [d, v, m]);
                o.edge = h ? -1 : 1;
                switch (o.edgeStrategy) {
                    case"reset":
                        it(u);
                        continue;
                    case"ease":
                        a = y.frame;
                        break;
                    default:
                    case"set":
                        var E = y.props;
                        for (b in E) {
                            if (i.call(E, b)) {
                                w = rt(E[b].value);
                                r.setStyle(u, b, w)
                            }
                        }
                        continue
                }
            } else {
                if (o.edge !== 0) {
                    pt(u, [p, v], [d, m]);
                    o.edge = 0
                }
            }
            var S = 0;
            var x = f.length - 1;
            for (; S < x; S++) {
                if (a >= f[S].frame && a <= f[S + 1].frame) {
                    var T = f[S];
                    var N = f[S + 1];
                    for (b in T.props) {
                        if (i.call(T.props, b)) {
                            var C = (a - T.frame) / (N.frame - T.frame);
                            C = T.props[b].easing(C);
                            w = nt(T.props[b].value, N.props[b].value, C);
                            w = rt(w);
                            r.setStyle(u, b, w)
                        }
                    }
                    break
                }
            }
        }
    };
    var G = function () {
        if (_t) {
            _t = false;
            ft()
        }
        var e = yt.getScrollTop();
        var t;
        var i = mt();
        var s;
        if (Dt) {
            if (i >= Dt.endTime) {
                e = Dt.targetTop;
                t = Dt.done;
                Dt = n
            } else {
                s = Dt.easing((i - Dt.startTime) / Dt.duration);
                e = Dt.startTop + s * Dt.topDiff | 0
            }
            yt.setScrollTop(e, true)
        } else if (!jt) {
            var o = Bt.targetTop - e;
            if (o) {
                Bt = {startTop: Lt, topDiff: e - Lt, targetTop: e, startTime: At, endTime: At + Ht}
            }
            if (i <= Bt.endTime) {
                s = V.sqrt((i - Bt.startTime) / Ht);
                e = Bt.startTop + s * Bt.topDiff | 0
            }
        }
        if (qt && wt) {
            r.setStyle(wt, "transform", "translate(0, " + -Rt + "px) " + Ut)
        }
        if (jt || Lt !== e) {
            kt = e > Lt ? "down" : e < Lt ? "up" : kt;
            jt = false;
            var u = {curTop: e, lastTop: Lt, maxTop: xt, direction: kt};
            var a = Et.beforerender && Et.beforerender.call(yt, u);
            if (a !== false) {
                Q(e, yt.getScrollTop());
                Lt = e;
                if (Et.render) {
                    Et.render.call(yt, u)
                }
            }
            if (t) {
                t.call(yt, false)
            }
        }
        At = i
    };
    var Y = function (e) {
        var t = 0;
        var n = e.keyFrames.length;
        for (; t < n; t++) {
            var r = e.keyFrames[t];
            var i;
            var s;
            var o;
            var u = {};
            var a;
            while ((a = D.exec(r.props)) !== null) {
                o = a[1];
                s = a[2];
                i = o.match(P);
                if (i !== null) {
                    o = i[1];
                    i = i[2]
                } else {
                    i = E
                }
                s = s.indexOf("!") ? Z(s) : [s.slice(1)];
                u[o] = {value: s, easing: V[i]}
            }
            r.props = u
        }
    };
    var Z = function (e) {
        var t = [];
        I.lastIndex = 0;
        e = e.replace(I, function (e) {
            return e.replace(j, function (e) {
                return e / 255 * 100 + "%"
            })
        });
        if (U) {
            q.lastIndex = 0;
            e = e.replace(q, function (e) {
                return U + e
            })
        }
        e = e.replace(j, function (e) {
            t.push(+e);
            return "{?}"
        });
        t.unshift(e);
        return t
    };
    var et = function (e) {
        var t = {};
        var n;
        var r;
        n = 0;
        r = e.keyFrames.length;
        for (; n < r; n++) {
            tt(e.keyFrames[n], t)
        }
        t = {};
        n = e.keyFrames.length - 1;
        for (; n >= 0; n--) {
            tt(e.keyFrames[n], t)
        }
    };
    var tt = function (e, t) {
        var n;
        for (n in t) {
            if (!i.call(e.props, n)) {
                e.props[n] = t[n]
            }
        }
        for (n in e.props) {
            t[n] = e.props[n]
        }
    };
    var nt = function (e, t, n) {
        var r;
        var i = e.length;
        if (i !== t.length) {
            throw"Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"'
        }
        var s = [e[0]];
        r = 1;
        for (; r < i; r++) {
            s[r] = e[r] + (t[r] - e[r]) * n
        }
        return s
    };
    var rt = function (e) {
        var t = 1;
        F.lastIndex = 0;
        return e[0].replace(F, function () {
            return e[t++]
        })
    };
    var it = function (e, t) {
        e = [].concat(e);
        var n;
        var r;
        var i = 0;
        var s = e.length;
        for (; i < s; i++) {
            r = e[i];
            n = bt[r[A]];
            if (!n) {
                continue
            }
            if (t) {
                r.style.cssText = n.dirtyStyleAttr;
                pt(r, n.dirtyClassAttr)
            } else {
                n.dirtyStyleAttr = r.style.cssText;
                n.dirtyClassAttr = ht(r);
                r.style.cssText = n.styleAttr;
                pt(r, n.classAttr)
            }
        }
    };
    var st = function () {
        Ut = "translateZ(0)";
        r.setStyle(wt, "transform", Ut);
        var e = o(wt);
        var t = e.getPropertyValue("transform");
        var n = e.getPropertyValue(U + "transform");
        var i = t && t !== "none" || n && n !== "none";
        if (!i) {
            Ut = ""
        }
    };
    r.setStyle = function (e, t, n) {
        var r = e.style;
        t = t.replace(H, B).replace("-", "");
        if (t === "zIndex") {
            if (isNaN(n)) {
                r[t] = n
            } else {
                r[t] = "" + (n | 0)
            }
        } else if (t === "float") {
            r.styleFloat = r.cssFloat = n
        } else {
            try {
                if (R) {
                    r[R + t.slice(0, 1).toUpperCase() + t.slice(1)] = n
                }
                r[t] = n
            } catch (i) {
            }
        }
    };
    var ot = r.addEvent = function (t, n, r) {
        var i = function (t) {
            t = t || e.event;
            if (!t.target) {
                t.target = t.srcElement
            }
            if (!t.preventDefault) {
                t.preventDefault = function () {
                    t.returnValue = false;
                    t.defaultPrevented = true
                }
            }
            return r.call(this, t)
        };
        n = n.split(" ");
        var s;
        var o = 0;
        var u = n.length;
        for (; o < u; o++) {
            s = n[o];
            if (t.addEventListener) {
                t.addEventListener(s, r, false)
            } else {
                t.attachEvent("on" + s, i)
            }
            zt.push({element: t, name: s, listener: r})
        }
    };
    var ut = r.removeEvent = function (e, t, n) {
        t = t.split(" ");
        var r = 0;
        var i = t.length;
        for (; r < i; r++) {
            if (e.removeEventListener) {
                e.removeEventListener(t[r], n, false)
            } else {
                e.detachEvent("on" + t[r], n)
            }
        }
    };
    var at = function () {
        var e;
        var t = 0;
        var n = zt.length;
        for (; t < n; t++) {
            e = zt[t];
            ut(e.element, e.name, e.listener)
        }
        zt = []
    };
    var ft = function () {
        var e = yt.getScrollTop();
        xt = 0;
        if (St && !qt) {
            a.style.height = "auto"
        }
        K();
        if (St && !qt) {
            a.style.height = xt + u.clientHeight + "px"
        }
        if (qt) {
            yt.setScrollTop(s.min(yt.getScrollTop(), xt))
        } else {
            yt.setScrollTop(e, true)
        }
        jt = true
    };
    var lt = function () {
        var e = u.clientHeight;
        var t = {};
        var n;
        var r;
        for (n in Nt) {
            r = Nt[n];
            if (typeof r === "function") {
                r = r.call(yt)
            } else if (/p$/.test(r)) {
                r = r.slice(0, -1) / 100 * e
            }
            t[n] = r
        }
        return t
    };
    var ct = function () {
        var e = wt && wt.offsetHeight || 0;
        var t = s.max(e, a.scrollHeight, a.offsetHeight, u.scrollHeight, u.offsetHeight, u.clientHeight);
        return t - u.clientHeight
    };
    var ht = function (t) {
        var n = "className";
        if (e.SVGElement && t instanceof e.SVGElement) {
            t = t[n];
            n = "baseVal"
        }
        return t[n]
    };
    var pt = function (t, r, i) {
        var s = "className";
        if (e.SVGElement && t instanceof e.SVGElement) {
            t = t[s];
            s = "baseVal"
        }
        if (i === n) {
            t[s] = r;
            return
        }
        var o = t[s];
        var u = 0;
        var a = i.length;
        for (; u < a; u++) {
            o = vt(o).replace(vt(i[u]), " ")
        }
        o = dt(o);
        var f = 0;
        var l = r.length;
        for (; f < l; f++) {
            if (vt(o).indexOf(vt(r[f])) === -1) {
                o += " " + r[f]
            }
        }
        t[s] = dt(o)
    };
    var dt = function (e) {
        return e.replace(M, "")
    };
    var vt = function (e) {
        return " " + e + " "
    };
    var mt = Date.now || function () {
        return +(new Date)
    };
    var gt = function (e, t) {
        return e.frame - t.frame
    };
    var yt;
    var bt;
    var wt;
    var Et;
    var St;
    var xt = 0;
    var Tt = 1;
    var Nt;
    var Ct;
    var kt = "down";
    var Lt = -1;
    var At = mt();
    var Ot = 0;
    var Mt = 0;
    var _t = false;
    var Dt;
    var Pt;
    var Ht;
    var Bt;
    var jt;
    var Ft = 0;
    var It;
    var qt = false;
    var Rt = 0;
    var Ut;
    var zt = [];
    var Wt;
    if (typeof define === "function" && define.amd) {
        define("skrollr", function () {
            return r
        })
    } else {
        e.skrollr = r
    }
})(window, document);
/*!
 * Smooth Scroll - v1.4.10 - 2013-03-02
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
(function (l) {
    function t(l) {
        return l.replace(/(:|\.)/g, "\\$1")
    }

    var e = "1.4.10", o = {
        exclude: [],
        excludeWithin: [],
        offset: 0,
        direction: "top",
        scrollElement: null,
        scrollTarget: null,
        beforeScroll: function () {
        },
        afterScroll: function () {
        },
        easing: "swing",
        speed: 400,
        autoCoefficent: 2
    }, r = function (t) {
        var e = [], o = !1, r = t.dir && "left" == t.dir ? "scrollLeft" : "scrollTop";
        return this.each(function () {
            if (this != document && this != window) {
                var t = l(this);
                t[r]() > 0 ? e.push(this) : (t[r](1), o = t[r]() > 0, o && e.push(this), t[r](0))
            }
        }), e.length || this.each(function () {
            "BODY" === this.nodeName && (e = [this])
        }), "first" === t.el && e.length > 1 && (e = [e[0]]), e
    };
    l.fn.extend({
        scrollable: function (l) {
            var t = r.call(this, {dir: l});
            return this.pushStack(t)
        }, firstScrollable: function (l) {
            var t = r.call(this, {el: "first", dir: l});
            return this.pushStack(t)
        }, smoothScroll: function (e) {
            e = e || {};
            var o = l.extend({}, l.fn.smoothScroll.defaults, e), r = l.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll", function (e) {
                var n = this, s = l(this), c = o.exclude, i = o.excludeWithin, a = 0, f = 0, h = !0, u = {},
                    d = location.hostname === n.hostname || !n.hostname,
                    m = o.scrollTarget || (l.smoothScroll.filterPath(n.pathname) || r) === r, p = t(n.hash);
                if (o.scrollTarget || d && m && p) {
                    for (; h && c.length > a;) s.is(t(c[a++])) && (h = !1);
                    for (; h && i.length > f;) s.closest(i[f++]).length && (h = !1)
                } else h = !1;
                h && (e.preventDefault(), l.extend(u, o, {
                    scrollTarget: o.scrollTarget || p,
                    link: n
                }), l.smoothScroll(u))
            }), this
        }
    }), l.smoothScroll = function (t, e) {
        var o, r, n, s, c = 0, i = "offset", a = "scrollTop", f = {}, h = {};
        "number" == typeof t ? (o = l.fn.smoothScroll.defaults, n = t) : (o = l.extend({}, l.fn.smoothScroll.defaults, t || {}), o.scrollElement && (i = "position", "static" == o.scrollElement.css("position") && o.scrollElement.css("position", "relative"))), o = l.extend({link: null}, o), a = "left" == o.direction ? "scrollLeft" : a, o.scrollElement ? (r = o.scrollElement, c = r[a]()) : r = l("html, body").firstScrollable(), o.beforeScroll.call(r, o), n = "number" == typeof t ? t : e || l(o.scrollTarget)[i]() && l(o.scrollTarget)[i]()[o.direction] || 0, f[a] = n + c + o.offset, s = o.speed, "auto" === s && (s = f[a] || r.scrollTop(), s /= o.autoCoefficent), h = {
            duration: s,
            easing: o.easing,
            complete: function () {
                o.afterScroll.call(o.link, o)
            }
        }, o.step && (h.step = o.step), r.length ? r.stop().animate(f, h) : o.afterScroll.call(o.link, o)
    }, l.smoothScroll.version = e, l.smoothScroll.filterPath = function (l) {
        return l.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }, l.fn.smoothScroll.defaults = o
})(jQuery);
/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
(function ($) {
    var selectors = [];

    var check_binded = false;
    var check_lock = false;
    var defaults = {
        interval: 250,
        force_process: false
    };
    var $window = $(window);

    var $prior_appeared = [];

    function process() {
        check_lock = false;
        for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
            var $appeared = $(selectors[index]).filter(function () {
                return $(this).is(':appeared');
            });

            $appeared.trigger('appear', [$appeared]);

            if ($prior_appeared[index]) {
                var $disappeared = $prior_appeared[index].not($appeared);
                $disappeared.trigger('disappear', [$disappeared]);
            }
            $prior_appeared[index] = $appeared;
        }
    };

    function add_selector(selector) {
        selectors.push(selector);
        $prior_appeared.push();
    }

    // "appeared" custom filter
    $.expr[':']['appeared'] = function (element) {
        var $element = $(element);
        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop();
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + $element.height() >= window_top &&
            top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
            left + $element.width() >= window_left &&
            left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
            return true;
        } else {
            return false;
        }
    };

    $.fn.extend({
        // watching for element's appearance in browser viewport
        appear: function (options) {
            var opts = $.extend({}, defaults, options || {});
            var selector = this.selector || this;
            if (!check_binded) {
                var on_check = function () {
                    if (check_lock) {
                        return;
                    }
                    check_lock = true;

                    setTimeout(process, opts.interval);
                };

                $(window).scroll(on_check).resize(on_check);
                check_binded = true;
            }

            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            add_selector(selector);
            return $(selector);
        }
    });

    $.extend({
        // force elements's appearance check
        force_appear: function () {
            if (check_binded) {
                process();
                return true;
            }
            return false;
        }
    });
})(function () {
    if (typeof module !== 'undefined') {
        // Node
        return require('jquery');
    } else {
        return jQuery;
    }
}());

// ------------------------------------------------------------------------------ //
//
// Template name : Bootsnav - Multi Purpose Header
// Categorie : Bootstrap Menu in CSS
// Author : adamnurdin01
// Version : v.1.2
// Created : 2016-06-02
// Last update : 2016-10-19
//
// ------------------------------------------------------------------------------ //

(function ($) {
    "use strict";

    var bootsnav = {
        initialize: function () {
            this.event();
            this.hoverDropdown();
            this.navbarSticky();
            this.navbarScrollspy();
        },
        event: function () {

            // ------------------------------------------------------------------------------ //
            // Variable
            // ------------------------------------------------------------------------------ //
            var getNav = $("nav.navbar.bootsnav");

            // ------------------------------------------------------------------------------ //
            // Navbar Sticky
            // ------------------------------------------------------------------------------ //
            var navSticky = getNav.hasClass("navbar-sticky");
            if (navSticky) {
                // Wraped navigation
                getNav.wrap("<div class='wrap-sticky'></div>");
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Center
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("brand-center")) {
                var postsArr = new Array(),
                    index = $("nav.brand-center"),
                    $postsList = index.find('ul.navbar-nav');

                index.prepend("<span class='storage-name' style='display:none;'></span>");

                //Create array of all posts in lists
                index.find('ul.navbar-nav > li').each(function () {
                    if ($(this).hasClass("active")) {
                        var getElement = $("a", this).eq(0).text();
                        $(".storage-name").html(getElement);
                    }
                    postsArr.push($(this).html());
                });

                //Split the array at this point. The original array is altered.
                var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
                    secondList = postsArr,
                    ListHTML = '';

                var createHTML = function (list) {
                    ListHTML = '';
                    for (var i = 0; i < list.length; i++) {
                        ListHTML += '<li>' + list[i] + '</li>'
                    }
                }

                //Generate HTML for first list
                createHTML(firstList);
                $postsList.html(ListHTML);
                index.find("ul.nav").first().addClass("navbar-left");

                //Generate HTML for second list
                createHTML(secondList);
                //Create new list after original one
                $postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
                index.find("ul.nav").last().addClass("navbar-right");

                //Wrap navigation menu
                index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
                index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");

                //Selection Class
                index.find('ul.navbar-nav > li').each(function () {
                    var dropDown = $("ul.dropdown-menu", this),
                        //added for center logo header
                        simpleMenu = $("ul.simple-dropdown", this),
                        megaMenu = $("ul.megamenu-content", this);
                    dropDown.closest("li").addClass("dropdown");
                    simpleMenu.closest("li").addClass("simple-dropdown");
                    megaMenu.closest("li").addClass("megamenu-fw");
                });

                var getName = $(".storage-name").html();
                if (!getName == "") {
                    $("ul.navbar-nav > li:contains('" + getName + "')").addClass("active");
                }
            }


            // ------------------------------------------------------------------------------ //
            // Navbar Sidebar
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-sidebar")) {
                // Add Class to body
                $("body").addClass("wrap-nav-sidebar");
                getNav.wrapInner("<div class='scroller'></div>");
            } else {
                $(".bootsnav").addClass("on");
            }

            // ------------------------------------------------------------------------------ //
            // Menu Center
            // ------------------------------------------------------------------------------ //
            if (getNav.find("ul.nav").hasClass("navbar-center")) {
                getNav.addClass("menu-center");
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Full
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-full")) {
                // Add Class to body
                $("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
                $(".wrap-full-menu").wrap("<div class='nav-full'></div>");
                $("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>");
            } else if (getNav.hasClass("navbar-mobile")) {
                getNav.removeClass("no-full");
            } else {
                getNav.addClass("no-full");
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Mobile
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-mobile")) {
                // Add Class to body
                $('.navbar-collapse').on('shown.bs.collapse', function () {
                    $("body").addClass("side-right");
                });
                $('.navbar-collapse').on('hide.bs.collapse', function () {
                    $("body").removeClass("side-right");
                });

                $(window).on("resize", function () {
                    $("body").removeClass("side-right");
                });
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Fixed
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("no-background")) {
                $(window).on("scroll", function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > 34) {
                        $(".navbar-fixed").removeClass("no-background");
                    } else {
                        $(".navbar-fixed").addClass("no-background");
                    }
                });
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Fixed
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-transparent")) {
                $(window).on("scroll", function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > 34) {
                        $(".navbar-fixed").removeClass("navbar-transparent");
                    } else {
                        $(".navbar-fixed").addClass("navbar-transparent");
                    }
                });
            }

            // ------------------------------------------------------------------------------ //
            // Button Cart
            // ------------------------------------------------------------------------------ //
            $(".btn-cart").on("click", function (e) {
                e.stopPropagation();
            });

            // ------------------------------------------------------------------------------ //
            // Toggle Search
            // ------------------------------------------------------------------------------ //
            $("nav.navbar.bootsnav .attr-nav").each(function () {
                $("li.search > a", this).on("click", function (e) {
                    e.preventDefault();
                    $(".top-search").slideToggle();
                });
            });
            $(".input-group-addon.close-search").on("click", function () {
                $(".top-search").slideUp();
            });

            // ------------------------------------------------------------------------------ //
            // Toggle Side Menu
            // ------------------------------------------------------------------------------ //
            $("nav.navbar.bootsnav .attr-nav").each(function () {
                $("li.side-menu > a", this).on("click", function (e) {
                    e.preventDefault();
                    $("nav.navbar.bootsnav > .side").toggleClass("on");
                    $("body").toggleClass("on-side");
                });
            });
            $(".side .close-side").on("click", function (e) {
                e.preventDefault();
                $("nav.navbar.bootsnav > .side").removeClass("on");
                $("body").removeClass("on-side");
            });


            // ------------------------------------------------------------------------------ //
            // Wrapper
            // ------------------------------------------------------------------------------ //
            //$("body").wrapInner("<div class='wrapper'></div>");
        },
        // ------------------------------------------------------------------------------ //
        // Change dropdown to hover on dekstop
        // ------------------------------------------------------------------------------ //
        hoverDropdown: function () {
            var getNav = $("nav.navbar.bootsnav"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.nav").data("in"),
                getOut = getNav.find("ul.nav").data("out");

            if (getWindow < 991) {

                // Height of scroll navigation sidebar
                $(".scroller").css("height", "auto");

                // Disable mouseenter event
                $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter");
                $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave");
                $("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter");
                $("nav.navbar.bootsnav ul.nav").off("mouseleave");
                $(".navbar-collapse").removeClass("animated");

                // Enable click event
                $("nav.navbar.bootsnav ul.nav").each(function () {
                    $(".dropdown-menu", this).addClass("animated");
                    $(".dropdown-menu", this).removeClass(getOut);

                    // Dropdown Fade Toggle
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function (e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(getIn);
                        $(this).closest("li.dropdown").first().toggleClass("on");
                        return false;
                    });

                    // Hidden dropdown action
                    $('li.dropdown', this).each(function () {
                        $(this).find(".dropdown-menu").stop().fadeOut('fast');
                        $(this).on('hidden.bs.dropdown', function () {
                            $(this).find(".dropdown-menu").stop().fadeOut('fast');
                        });
                        return false;
                    });

                    // Megamenu style
                    $(".megamenu-fw", this).each(function () {
                        $(".col-menu", this).each(function () {
                            $(".content", this).addClass("animated");
                            $(".content", this).stop().fadeOut();
                            $(".title", this).off("click");
                            $(".title", this).on("click", function () {
                                $(this).closest(".col-menu").find(".content").stop().fadeToggle('fast').addClass(getIn);
                                $(this).closest(".col-menu").toggleClass("on");
                                return false;
                            });

                            $(".content", this).on("click", function (e) {
                                e.stopPropagation();
                            });
                        });
                    });
                });

                // Hidden dropdown
                var cleanOpen = function () {
                    $('li.dropdown', this).removeClass("on");
                    $(".dropdown-menu", this).stop().fadeOut('fast');
                    $(".dropdown-menu", this).removeClass(getIn);
                    $(".col-menu", this).removeClass("on");
                    $(".col-menu .content", this).stop().fadeOut('fast');
                    $(".col-menu .content", this).removeClass(getIn);
                }

                // Hidden om mouse leave
                $("nav.navbar.bootsnav").on("mouseleave", function () {
                    cleanOpen();
                });


                // Enable click atribute navigation
                $("nav.navbar.bootsnav .attr-nav").each(function () {
                    $(".dropdown-menu", this).removeClass("animated");
                    $("li.dropdown", this).off("mouseenter");
                    $("li.dropdown", this).off("mouseleave");
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function (e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle();
                        $(".navbar-toggle").each(function () {
                            $(".fa", this).removeClass("fa-times");
                            $(".fa", this).addClass("fa-bars");
                            $(".navbar-collapse").removeClass("in");
                            $(".navbar-collapse").removeClass("on");
                        });
                    });

                    $(this).on("mouseleave", function () {
                        $(".dropdown-menu", this).stop().fadeOut();
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                });

                // Toggle Bars
                $(".navbar-toggle").each(function () {
                    $(this).off("click");
                    $(this).on("click", function () {
                        $(".fa", this).toggleClass("fa-bars");
                        $(".fa", this).toggleClass("fa-times");
                        cleanOpen();
                    });
                });

            } else if (getWindow > 991) {
                // Height of scroll navigation sidebar
                $(".scroller").css("height", getHeight + "px");

                // Navbar Sidebar
                if (getNav.hasClass("navbar-sidebar")) {
                    // Hover effect Sidebar Menu
                    $("nav.navbar.bootsnav ul.nav").each(function () {
                        $("a.dropdown-toggle", this).off('click');
                        $("a.dropdown-toggle", this).on('click', function (e) {
                            e.stopPropagation();
                        });

                        $(".dropdown-menu", this).addClass("animated");
                        $("li.dropdown", this).on("mouseenter", function () {
                            $(".dropdown-menu", this).eq(0).removeClass(getOut);
                            $(".dropdown-menu", this).eq(0).stop().fadeIn('fast').addClass(getIn);
                            $(this).addClass("on");
                            return false;
                        });

                        $(".col-menu").each(function () {
                            $(".content", this).addClass("animated");
                            $(".title", this).on("mouseenter", function () {
                                $(this).closest(".col-menu").find(".content").stop().fadeIn('fast').addClass(getIn);
                                $(this).closest(".col-menu").addClass("on");
                                return false;
                            });
                        });

                        $(this).on("mouseleave", function () {
                            $(".dropdown-menu", this).stop().removeClass(getIn);
                            $(".dropdown-menu", this).stop().addClass(getOut).fadeOut('fast');
                            $(".col-menu", this).find(".content").stop().fadeOut('fast').removeClass(getIn);
                            $(".col-menu", this).removeClass("on");
                            $("li.dropdown", this).removeClass("on");
                            return false;
                        });
                    });
                } else {
                    var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

                    // Hover effect Default Menu
                    $("nav.navbar.bootsnav ul.nav").each(function () {
                        $("a.dropdown-toggle", this).off('click');
                        $("a.dropdown-toggle", this).on('click', function (e) {
                            e.stopPropagation();
                        });

                        $(".megamenu-fw", this).each(function () {
                            $(".title", this).off("click");
                            $("a.dropdown-toggle", this).off("click");
                            $(".content").removeClass("animated");
                        });

                        $(".dropdown-menu", this).addClass("animated");

                        // user hover on single menu then hide its sibling children menu
                        if ($('.navbar-left-sidebar').length > 0 || $('.left-nav-sidebar').length > 0) {

                            $("li:not(.dropdown)", this).on("mouseenter", function () {
                                $(this).parent().find('.dropdown-menu').stop().fadeOut('fast');
                            });

                            $(document).on('click', '.side-left-menu-close.active', function (e) {
                                $(this).removeClass('active');
                            });
                        }

                        $("li.dropdown", this).on("mouseenter", function () {
                            var _this = this;

                            $('.side-left-menu-close').addClass('active');

                            if ($('.navbar-left-sidebar').length > 0 || $('.left-nav-sidebar').length > 0) {

                                $(this).parent().find('.dropdown').removeClass("on");
                                if ($(this).parents('.dropdown-menu').length > 0) { // child
                                    $(this).parents('.dropdown-menu').find('.dropdown-menu').not($('.dropdown-menu', this)).stop().fadeOut('fast');
                                } else { // main
                                    $(this).parents('.bootsnav .nav').find('.dropdown-menu').not($('.dropdown-menu', this)).stop().fadeOut('fast');
                                    $(":not(.second-level)", this).find('.third-level').stop().fadeOut('fast');
                                }

                                if ($(this).parent().hasClass("second-level")) {
                                    $(this).parents('.navbar-nav').addClass("enter");
                                } else if ($(this).parent().hasClass("enter")) {
                                    $('.navbar-nav').removeClass("enter");
                                }
                            }

                            $(".dropdown-menu", this).eq(0).removeClass(getOut);
                            if (isSafari)
                                $(".dropdown-menu", _this).eq(0).stop().fadeIn('fast').addClass(getIn);
                            else
                                $(".dropdown-menu", _this).eq(0).stop().fadeIn('fast').addClass(getIn);
                            $(this).addClass("on");

                            if ($('.navbar-left-sidebar').length > 0 || $('.left-nav-sidebar').length > 0) {

                                if ($('.left-nav-sidebar').length > 0) {
                                    var menu_width = $('.sidebar-part1').outerWidth();
                                    menu_width = menu_width + 20;
                                    menu_width = menu_width + $('.left-nav-on .navbar-nav').outerWidth();
                                } else {
                                    var menu_width = $('.navbar-nav').outerWidth();
                                }

                                var mainWidth = $(window).width();
                                setTimeout(function () {

                                    $('.dropdown').each(function () {
                                        if ($(this).hasClass('on')) {
                                            menu_width = menu_width + $('.dropdown-menu li', this).outerWidth();
                                        }
                                    });
                                    $('.side-left-menu-close').width(mainWidth - menu_width);
                                }, 300);
                            }
                            return false;
                        });

                        $("li.dropdown", this).on("mouseleave", function () {
                            $(".dropdown-menu", this).eq(0).removeClass(getIn);

                            if ($(".dropdown-menu", this).css("display") == "none" || !($('.navbar-left-sidebar').length > 0 || $('.left-nav-sidebar').length > 0) || $(this).parents('.bootsnav .nav').hasClass("enter")) {

                                if (isSafari)
                                    $(".dropdown-menu", this).eq(0).stop().fadeOut('fast').addClass(getOut);
                                else
                                    $(".dropdown-menu", this).eq(0).stop().fadeOut('fast').addClass(getOut);

                                $(this).removeClass("on");
                            }


                            if ($('.navbar-left-sidebar').length > 0 || $('.left-nav-sidebar').length > 0) {

                                $('.side-left-menu-close').addClass('active');

                                if ($('.left-nav-sidebar').length > 0) {
                                    var menu_width = $('.sidebar-part1').outerWidth();
                                    menu_width = menu_width + 20;
                                    menu_width = menu_width + $('.left-nav-on .navbar-nav').outerWidth();
                                } else {
                                    var menu_width = $('.navbar-nav').outerWidth();
                                }

                                var mainWidth = $(window).width();
                                setTimeout(function () {

                                    $('.dropdown').each(function () {
                                        if ($(this).hasClass('on')) {
                                            menu_width = menu_width + $('.dropdown-menu li', this).outerWidth();
                                        }
                                    });
                                    $('.side-left-menu-close').width(mainWidth - menu_width);
                                }, 300);
                            }
                        });

                        $(this).on("mouseleave", function () {
                            $(".dropdown-menu", this).removeClass(getIn);
                            $('.side-left-menu-close').removeClass('active');

                            if (isSafari)
                                $(".dropdown-menu", this).eq(0).stop().fadeOut('fast').addClass(getOut);
                            else
                                $(".dropdown-menu", this).eq(0).stop().fadeOut('fast').addClass(getOut);
                            $("li.dropdown", this).removeClass("on");

                            if ($('.navbar-left-sidebar').length > 0 || $('.left-nav-sidebar').length > 0) {
                                if ($('.bootsnav .nav').hasClass("enter")) {
                                    $('.bootsnav .nav').removeClass("enter");
                                } else {
                                    $('.bootsnav .nav').find('.dropdown-menu').fadeOut('fast');
                                }
                            }

                            return false;
                        });
                    });
                }

                // ------------------------------------------------------------------------------ //
                // Hover effect Atribute Navigation
                // ------------------------------------------------------------------------------ //
                $("nav.navbar.bootsnav .attr-nav").each(function () {
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function (e) {
                        e.stopPropagation();
                    });

                    $(".dropdown-menu", this).addClass("animated");
                    $("li.dropdown", this).on("mouseenter", function () {
                        $(".dropdown-menu", this).eq(0).removeClass(getOut);
                        $(".dropdown-menu", this).eq(0).stop().fadeIn('fast').addClass(getIn);
                        $(this).addClass("on");
                        return false;
                    });

                    $("li.dropdown", this).on("mouseleave", function () {
                        $(".dropdown-menu", this).eq(0).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut('fast').addClass(getOut);
                        $(this).removeClass("on");
                    });

                    $(this).on("mouseleave", function () {
                        $(".dropdown-menu", this).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut('fast').addClass(getOut);
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                });
            }

            // ------------------------------------------------------------------------------ //
            // Menu Fullscreen
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-full")) {
                var windowHeight = $(window).height(),
                    windowWidth = $(window).width();

                $(".nav-full").css("height", windowHeight + "px");
                $(".wrap-full-menu").css("height", windowHeight + "px");
                $(".wrap-full-menu").css("width", windowWidth + "px");

                $(".navbar-collapse").addClass("animated");
                $(".navbar-toggle").each(function () {
                    var getId = $(this).data("target");
                    $(this).off("click");
                    $(this).on("click", function (e) {
                        e.preventDefault();
                        $(getId).removeClass(getOut);
                        $(getId).addClass("in");
                        $(getId).addClass(getIn);
                        return false;
                    });

                    $("li.close-full-menu").on("click", function (e) {
                        e.preventDefault();
                        $(getId).addClass(getOut);
                        setTimeout(function () {
                            $(getId).removeClass("in");
                            $(getId).removeClass(getIn);
                        }, 500);
                        return false;
                    });
                });
            }
        },
        // ------------------------------------------------------------------------------ //
        // Navbar Sticky
        // ------------------------------------------------------------------------------ //
        navbarSticky: function () {
            var getNav = $("nav.navbar.bootsnav"),
                navSticky = getNav.hasClass("navbar-sticky");

            if (navSticky) {

                // Set Height Navigation
                var getHeight = getNav.height();
                $(".wrap-sticky").height(getHeight);

                // Windown on scroll
                var getOffset = $(".wrap-sticky").offset().top;
                $(window).on("scroll", function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > getOffset) {
                        getNav.addClass("sticked");
                    } else {
                        getNav.removeClass("sticked");
                    }
                });
            }
        },
        // ------------------------------------------------------------------------------ //
        // Navbar Scrollspy
        // ------------------------------------------------------------------------------ //
        navbarScrollspy: function () {
            var navScrollSpy = $(".navbar-scrollspy"),
                $body = $('body'),
                getNav = $('nav.navbar.bootsnav'),
                offset = getNav.outerHeight();

            if (navScrollSpy.length) {
                $body.scrollspy({target: '.navbar', offset: offset});

                // Animation Scrollspy
                $('.scroll').on('click', function (event) {
                    event.preventDefault();

                    // Active link
                    $('.scroll').removeClass("active");
                    $(this).addClass("active");

                    // Remove navbar collapse
                    $(".navbar-collapse").removeClass("in");

                    // Toggle Bars
                    $(".navbar-toggle").each(function () {
                        $(".fa", this).removeClass("fa-times");
                        $(".fa", this).addClass("fa-bars");
                    });

                    // Scroll
                    var scrollTop = $(window).scrollTop(),
                        $anchor = $(this).find('a'),
                        $section = $($anchor.attr('href')).offset().top,
                        $window = $(window).width(),
                        $minusDesktop = getNav.data("minus-value-desktop"),
                        $minusMobile = getNav.data("minus-value-mobile"),
                        $speed = getNav.data("speed");

                    if ($window > 992) {
                        var $position = $section - $minusDesktop;
                    } else {
                        var $position = $section - $minusMobile;
                    }

                    $('html, body').stop().animate({
                        scrollTop: $position
                    }, $speed);
                });

                // Activate Navigation
                var fixSpy = function () {
                    var data = $body.data('bs.scrollspy');
                    if (data) {
                        offset = getNav.outerHeight();
                        data.options.offset = offset;
                        $body.data('bs.scrollspy', data);
                        $body.scrollspy('refresh');
                    }
                }

                // Activate Navigation on resize
                var resizeTimer;
                $(window).on('resize', function () {
                    clearTimeout(resizeTimer);
                    var resizeTimer = setTimeout(fixSpy, 200);
                });
            }
        }
    };

    // Initialize
    $(document).ready(function () {
        bootsnav.initialize();
    });

    // Reset on resize
    $(window).on("resize", function () {
        bootsnav.hoverDropdown();
        setTimeout(function () {
            bootsnav.navbarSticky();
        }, 500);

        // Toggle Bars
        $(".navbar-toggle").each(function () {
            $(".fa", this).removeClass("fa-times");
            $(".fa", this).addClass("fa-bars");
            $(this).removeClass("fixed");
        });
        $(".navbar-collapse").removeClass("in");
        $(".navbar-collapse").removeClass("on");
        $(".navbar-collapse").removeClass("bounceIn");
    });

}(jQuery));
/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function ($, window, document, undefined) {

    // our plugin constructor
    var OnePageNav = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('plugin-options');
        this.$win = $(window);
        this.sections = {};
        this.didScroll = false;
        this.$doc = $(document);
        this.docHeight = this.$doc.height();
    };

    // the plugin prototype
    OnePageNav.prototype = {
        defaults: {
            navItems: 'a',
            currentClass: 'current',
            changeHash: false,
            easing: 'swing',
            filter: '',
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            begin: false,
            end: false,
            scrollChange: false
        },

        init: function () {
            // Introduce defaults that can be extended either
            // globally or using an object literal.
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

            //this.$nav = this.$elem.find(this.config.navItems)
            this.$nav = this.$elem.find(this.config.navItems).not(".directpage");

            //Filter any links out of the nav
            if (this.config.filter !== '') {
                this.$nav = this.$nav.filter(this.config.filter);
            }

            //Handle clicks on the nav
            this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

            //Get the section positions
            this.getPositions();

            //Handle scroll changes
            this.bindInterval();

            //Update the positions on resize too
            this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

            return this;
        },

        adjustNav: function (self, $parent) {
            self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
            $parent.addClass(self.config.currentClass);
        },

        bindInterval: function () {
            var self = this;
            var docHeight;

            self.$win.on('scroll.onePageNav', function () {
                self.didScroll = true;
            });

            self.t = setInterval(function () {
                docHeight = self.$doc.height();

                //If it was scrolled
                if (self.didScroll) {
                    self.didScroll = false;
                    self.scrollChange();
                }

                //If the document height changes
                if (docHeight !== self.docHeight) {
                    self.docHeight = docHeight;
                    self.getPositions();
                }
            }, 250);
        },

        getHash: function ($link) {
            return $link.attr('href').split('#')[1];
        },

        getPositions: function () {
            var self = this;
            var linkHref;
            var topPos;
            var $target;

            self.$nav.each(function () {
                linkHref = self.getHash($(this));
                $target = $('#' + linkHref);

                if ($target.length) {
                    topPos = $target.offset().top;
                    self.sections[linkHref] = Math.round(topPos);
                }
            });
        },

        getSection: function (windowPos) {
            var returnValue = null;
            var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

            for (var section in this.sections) {
                if ((this.sections[section] - windowHeight) < windowPos) {
                    returnValue = section;
                }
            }

            return returnValue;
        },

        handleClick: function (e) {
            var self = this;
            var $link = $(e.currentTarget);
            var $parent = $link.parent();
            var newLoc = '#' + self.getHash($link);

            if (!$parent.hasClass(self.config.currentClass)) {
                //Start callback
                if (self.config.begin) {
                    self.config.begin();
                }

                //Change the highlighted nav item
                self.adjustNav(self, $parent);

                //Removing the auto-adjust on scroll
                self.unbindInterval();

                //Scroll to the correct position
                self.scrollTo(newLoc, function () {
                    //Do we need to change the hash?
                    if (self.config.changeHash) {
                        window.location.hash = newLoc;
                    }

                    //Add the auto-adjust on scroll back in
                    self.bindInterval();

                    //End callback
                    if (self.config.end) {
                        self.config.end();
                    }
                });
            }

            e.preventDefault();
        },

        scrollChange: function () {
            var windowTop = this.$win.scrollTop();
            var position = this.getSection(windowTop);
            var $parent;

            //If the position is set
            if (position !== null) {
                $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

                //If it's not already the current section
                if (!$parent.hasClass(this.config.currentClass)) {
                    //Change the highlighted nav item
                    this.adjustNav(this, $parent);

                    //If there is a scrollChange callback
                    if (this.config.scrollChange) {
                        this.config.scrollChange($parent);
                    }
                }
            }
        },

        scrollTo: function (target, callback) {
            var offset = $(target).offset().top;

            $('html, body').animate({
                scrollTop: offset
            }, this.config.scrollSpeed, this.config.easing, callback);
        },

        unbindInterval: function () {
            clearInterval(this.t);
            this.$win.unbind('scroll.onePageNav');
        }
    };

    OnePageNav.defaults = OnePageNav.prototype.defaults;

    $.fn.onePageNav = function (options) {
        return this.each(function () {
            new OnePageNav(this, options).init();
        });
    };

})(jQuery, window, document);
/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
    var t, e, n, i, o, r = function (t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }, s = [].indexOf || function (t) {
        for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
        return -1
    };
    e = function () {
        function t() {
        }

        return t.prototype.extend = function (t, e) {
            var n, i;
            for (n in e) i = e[n], null == t[n] && (t[n] = i);
            return t
        }, t.prototype.isMobile = function (t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function (t, e, n, i) {
            var o;
            return null == e && (e = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, n, i) : null != document.createEventObject ? (o = document.createEventObject(), o.eventType = t) : o.eventName = t, o
        }, t.prototype.emitEvent = function (t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function (t, e, n) {
            return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
        }, t.prototype.removeEvent = function (t, e, n) {
            return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e]
        }, t.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), n = this.WeakMap || this.MozWeakMap || (n = function () {
        function t() {
            this.keys = [], this.values = []
        }

        return t.prototype.get = function (t) {
            var e, n, i, o;
            for (e = n = 0, i = (o = this.keys).length; i > n; e = ++n) if (o[e] === t) return this.values[e]
        }, t.prototype.set = function (t, e) {
            var n, i, o, r;
            for (n = i = 0, o = (r = this.keys).length; o > i; n = ++i) if (r[n] === t) return void (this.values[n] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }

        return t.notSupported = !0, t.prototype.observe = function () {
        }, t
    }()), i = this.getComputedStyle || function (t, e) {
        return this.getPropertyValue = function (e) {
            var n;
            return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function (t, e) {
                return e.toUpperCase()
            }), (null != (n = t.currentStyle) ? n[e] : void 0) || null
        }, this
    }, o = /(\-([a-z]){1})/g, this.WOW = function () {
        function o(t) {
            null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }

        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, o.prototype.init = function () {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function () {
            var e, n, i, o;
            if (this.stopped = !1, this.boxes = function () {
                var t, n, i, o;
                for (o = [], t = 0, n = (i = this.element.querySelectorAll("." + this.config.boxClass)).length; n > t; t++) e = i[t], o.push(e);
                return o
            }.call(this), this.all = function () {
                var t, n, i, o;
                for (o = [], t = 0, n = (i = this.boxes).length; n > t; t++) e = i[t], o.push(e);
                return o
            }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle(); else for (o = this.boxes, n = 0, i = o.length; i > n; n++) e = o[n], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
                return function (e) {
                    var n, i, o, r, s;
                    for (s = [], n = 0, i = e.length; i > n; n++) r = e[n], s.push(function () {
                        var t, e, n, i;
                        for (i = [], t = 0, e = (n = r.addedNodes || []).length; e > t; t++) o = n[t], i.push(this.doSync(o));
                        return i
                    }.call(t));
                    return s
                }
            }(this)).observe(document.body, {childList: !0, subtree: !0}) : void 0
        }, o.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function (e) {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function (t) {
            var e, n, i, o, r;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (r = [], n = 0, i = (o = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; i > n; n++) e = o[n], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }, o.prototype.show = function (t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, o.prototype.applyStyle = function (t, e) {
            var n, i, o;
            return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function (r) {
                return function () {
                    return r.customStyle(t, e, i, n, o)
                }
            }(this))
        }, o.prototype.animate = "requestAnimationFrame" in window ? function (t) {
            return window.requestAnimationFrame(t)
        } : function (t) {
            return t()
        }, o.prototype.resetStyle = function () {
            var t, e, n, i, o;
            for (o = [], e = 0, n = (i = this.boxes).length; n > e; e++) t = i[e], o.push(t.style.visibility = "visible");
            return o
        }, o.prototype.resetAnimation = function (t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, o.prototype.customStyle = function (t, e, n, i, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, {animationDuration: n}), i && this.vendorSet(t.style, {animationDelay: i}), o && this.vendorSet(t.style, {animationIterationCount: o}), this.vendorSet(t.style, {animationName: e ? "none" : this.cachedAnimationName(t)}), t
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function (t, e) {
            var n, i, o, r;
            i = [];
            for (n in e) o = e[n], t["" + n] = o, i.push(function () {
                var e, i, s, l;
                for (l = [], e = 0, i = (s = this.vendors).length; i > e; e++) r = s[e], l.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
                return l
            }.call(this));
            return i
        }, o.prototype.vendorCSS = function (t, e) {
            var n, o, r, s, l, a;
            for (s = (l = i(t)).getPropertyCSSValue(e), n = 0, o = (r = this.vendors).length; o > n; n++) a = r[n], s = s || l.getPropertyCSSValue("-" + a + "-" + e);
            return s
        }, o.prototype.animationName = function (t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (n) {
                e = i(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, o.prototype.cacheAnimationName = function (t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, o.prototype.cachedAnimationName = function (t) {
            return this.animationNameCache.get(t)
        }, o.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function () {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var e, n, i, o;
                for (o = [], e = 0, n = (i = this.boxes).length; n > e; e++) (t = i[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function (t) {
            for (var e; void 0 === t.offsetTop;) t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function (t) {
            var e, n, i, o, r;
            return n = t.getAttribute("data-wow-offset") || this.config.offset, r = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, o = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, i = this.offsetTop(t), e = i + t.clientHeight, o >= i && e >= r
        }, o.prototype.util = function () {
            return null != this._util ? this._util : this._util = new e
        }, o.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o.prototype.removeBox = function (t) {
            var e = this.boxes.indexOf(t);
            e > -1 && this.boxes.splice(e, 1)
        }, o
    }()
}).call(this);
//
// SmoothScroll for websites v1.4.6 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me.
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any
// extension for browsers or native application
// without getting a written permission first.
//

(function () {

// Scroll Variables (tweakable)
    var defaultOptions = {

        // Scrolling Core
        frameRate: 150, // [Hz]
        animationTime: 400, // [ms]
        stepSize: 100, // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,

        // Acceleration
        accelerationDelta: 50,  // 50
        accelerationMax: 3,   // 3

        // Keyboard Settings
        keyboardSupport: true,  // option
        arrowScroll: 50,    // [px]

        // Other
        fixedBackground: true,
        excluded: ''
    };

    var options = defaultOptions;


// Other Variables
    var isExcluded = false;
    var isFrame = false;
    var direction = {x: 0, y: 0};
    var initDone = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var refreshSize;
    var deltaBuffer = [];
    var isMac = /^Mac/.test(navigator.platform);

    var key = {
        left: 37, up: 38, right: 39, down: 40, spacebar: 32,
        pageup: 33, pagedown: 34, end: 35, home: 36
    };
    var arrowKeys = {37: 1, 38: 1, 39: 1, 40: 1};

    /***********************************************
     * INITIALIZE
     ***********************************************/

    /**
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */
    function initTest() {
        if (options.keyboardSupport) {
            addEvent('keydown', keydown);
        }
    }

    /**
     * Sets up scrolls array, determines if frames are involved.
     */
    function init() {

        if (initDone || !document.body) return;

        initDone = true;

        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;

        // check compat mode for root element
        root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
        activeElement = body;

        initTest();

        // Checks if this script is running in a frame
        if (top != self) {
            isFrame = true;
        }

        /**
         * Safari 10 fixed it, Chrome fixed it in v45:
         * This fixes a bug where the areas left and right to
         * the content does not trigger the onmousewheel event
         * on some pages. e.g.: html, body { height: 100% }
         */
        else if (isOldSafari &&
            scrollHeight > windowHeight &&
            (body.offsetHeight <= windowHeight ||
                html.offsetHeight <= windowHeight)) {

            var fullPageElem = document.createElement('div');
            fullPageElem.style.cssText = 'position:absolute; z-index:-10000; ' +
                'top:0; left:0; right:0; height:' +
                root.scrollHeight + 'px';
            document.body.appendChild(fullPageElem);

            // DOM changed (throttled) to fix height
            var pendingRefresh;
            refreshSize = function () {
                if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
                pendingRefresh = setTimeout(function () {
                    if (isExcluded) return; // could be running after cleanup
                    fullPageElem.style.height = '0';
                    fullPageElem.style.height = root.scrollHeight + 'px';
                    pendingRefresh = null;
                }, 500); // act rarely to stay fast
            };

            setTimeout(refreshSize, 10);

            addEvent('resize', refreshSize);

            // TODO: attributeFilter?
            var config = {
                attributes: true,
                childList: true,
                characterData: false
                // subtree: true
            };

            observer = new MutationObserver(refreshSize);
            observer.observe(body, config);

            if (root.offsetHeight <= windowHeight) {
                var clearfix = document.createElement('div');
                clearfix.style.clear = 'both';
                body.appendChild(clearfix);
            }
        }

        // disable fixed background
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = 'scroll';
            html.style.backgroundAttachment = 'scroll';
        }
    }

    /**
     * Removes event listeners and other traces left on the page.
     */
    function cleanup() {
        observer && observer.disconnect();
        removeEvent(wheelEvent, wheel);
        removeEvent('mousedown', mousedown);
        removeEvent('keydown', keydown);
        removeEvent('resize', refreshSize);
        removeEvent('load', init);
    }


    /************************************************
     * SCROLLING
     ************************************************/

    var que = [];
    var pending = false;
    var lastScroll = Date.now();

    /**
     * Pushes scroll actions to the scrolling queue.
     */
    function scrollArray(elem, left, top) {

        directionCheck(left, top);

        if (options.accelerationMax != 1) {
            var now = Date.now();
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + (50 / elapsed)) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top *= factor;
                }
            }
            lastScroll = Date.now();
        }

        // push a scroll command
        que.push({
            x: left,
            y: top,
            lastX: (left < 0) ? 0.99 : -0.99,
            lastY: (top < 0) ? 0.99 : -0.99,
            start: Date.now()
        });

        // don't act if there's a pending queue
        if (pending) {
            return;
        }

        var scrollWindow = (elem === document.body);

        var step = function (time) {

            var now = Date.now();
            var scrollX = 0;
            var scrollY = 0;

            for (var i = 0; i < que.length; i++) {

                var item = que[i];
                var elapsed = now - item.start;
                var finished = (elapsed >= options.animationTime);

                // scroll position: [0, 1]
                var position = (finished) ? 1 : elapsed / options.animationTime;

                // easing [optional]
                if (options.pulseAlgorithm) {
                    position = pulse(position);
                }

                // only need the difference
                var x = (item.x * position - item.lastX) >> 0;
                var y = (item.y * position - item.lastY) >> 0;

                // add this to the total scrolling
                scrollX += x;
                scrollY += y;

                // update last values
                item.lastX += x;
                item.lastY += y;

                // delete and step back if it's over
                if (finished) {
                    que.splice(i, 1);
                    i--;
                }
            }

            // scroll left and top
            if (scrollWindow) {
                window.scrollBy(scrollX, scrollY);
            } else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop += scrollY;
            }

            // clean up if there's nothing left to do
            if (!left && !top) {
                que = [];
            }

            if (que.length) {
                requestFrame(step, elem, (1000 / options.frameRate + 1));
            } else {
                pending = false;
            }
        };

        // start a new queue of actions
        requestFrame(step, elem, 0);
        pending = true;
    }


    /***********************************************
     * EVENTS
     ***********************************************/

    /**
     * Mouse wheel handler.
     * @param {Object} event
     */
    function wheel(event) {

        if (!initDone) {
            init();
        }

        var target = event.target;

        // leave early if default action is prevented
        // or it's a zooming event with CTRL
        if (event.defaultPrevented || event.ctrlKey) {
            return true;
        }

        // leave embedded content alone (flash & pdf)
        if (isNodeName(activeElement, 'embed') ||
            (isNodeName(target, 'embed') && /\.pdf/i.test(target.src)) ||
            isNodeName(activeElement, 'object') ||
            target.shadowRoot) {
            return true;
        }

        var deltaX = -event.wheelDeltaX || event.deltaX || 0;
        var deltaY = -event.wheelDeltaY || event.deltaY || 0;

        if (isMac) {
            if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
                deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
            }
            if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
                deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
            }
        }

        // use wheelDelta if deltaX/Y is not available
        if (!deltaX && !deltaY) {
            deltaY = -event.wheelDelta || 0;
        }

        // line based scrolling (Firefox mostly)
        if (event.deltaMode === 1) {
            deltaX *= 40;
            deltaY *= 40;
        }

        var overflowing = overflowingAncestor(target);

        // nothing to do if there's no element that's scrollable
        if (!overflowing) {
            // except Chrome iframes seem to eat wheel events, which we need to
            // propagate up, if the iframe has nothing overflowing to scroll
            if (isFrame && isChrome) {
                // change target to iframe element itself for the parent frame
                Object.defineProperty(event, "target", {value: window.frameElement});
                return parent.wheel(event);
            }
            return true;
        }

        // check if it's a touchpad scroll that should be ignored
        if (isTouchpad(deltaY)) {
            return true;
        }

        // scale by step size
        // delta is 120 most of the time
        // synaptics seems to send 1 sometimes
        if (Math.abs(deltaX) > 1.2) {
            deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
            deltaY *= options.stepSize / 120;
        }

        scrollArray(overflowing, deltaX, deltaY);
        event.preventDefault();
        scheduleClearCache();
    }

    /**
     * Keydown event handler.
     * @param {Object} event
     */
    function keydown(event) {

        var target = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey ||
            (event.shiftKey && event.keyCode !== key.spacebar);

        // our own tracked active element could've been removed from the DOM
        if (!document.body.contains(activeElement)) {
            activeElement = document.activeElement;
        }

        // do nothing if user is editing text
        // or using a modifier key (except shift)
        // or in a dropdown
        // or inside interactive elements
        var inputNodeNames = /^(textarea|select|embed|object)$/i;
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (event.defaultPrevented ||
            inputNodeNames.test(target.nodeName) ||
            isNodeName(target, 'input') && !buttonTypes.test(target.type) ||
            isNodeName(activeElement, 'video') ||
            isInsideYoutubeVideo(event) ||
            target.isContentEditable ||
            modifier) {
            return true;
        }

        // [spacebar] should trigger button press, leave it alone
        if ((isNodeName(target, 'button') ||
            isNodeName(target, 'input') && buttonTypes.test(target.type)) &&
            event.keyCode === key.spacebar) {
            return true;
        }

        // [arrwow keys] on radio buttons should be left alone
        if (isNodeName(target, 'input') && target.type == 'radio' &&
            arrowKeys[event.keyCode]) {
            return true;
        }

        var shift, x = 0, y = 0;
        var overflowing = overflowingAncestor(activeElement);

        if (!overflowing) {
            // Chrome iframes seem to eat key events, which we need to
            // propagate up, if the iframe has nothing overflowing to scroll
            return (isFrame && isChrome) ? parent.keydown(event) : true;
        }

        var clientHeight = overflowing.clientHeight;

        if (overflowing == document.body) {
            clientHeight = window.innerHeight;
        }

        switch (event.keyCode) {
            case key.up:
                y = -options.arrowScroll;
                break;
            case key.down:
                y = options.arrowScroll;
                break;
            case key.spacebar: // (+ shift)
                shift = event.shiftKey ? 1 : -1;
                y = -shift * clientHeight * 0.9;
                break;
            case key.pageup:
                y = -clientHeight * 0.9;
                break;
            case key.pagedown:
                y = clientHeight * 0.9;
                break;
            case key.home:
                y = -overflowing.scrollTop;
                break;
            case key.end:
                var scroll = overflowing.scrollHeight - overflowing.scrollTop;
                var scrollRemaining = scroll - clientHeight;
                y = (scrollRemaining > 0) ? scrollRemaining + 10 : 0;
                break;
            case key.left:
                x = -options.arrowScroll;
                break;
            case key.right:
                x = options.arrowScroll;
                break;
            default:
                return true; // a key we don't care about
        }

        scrollArray(overflowing, x, y);
        event.preventDefault();
        scheduleClearCache();
    }

    /**
     * Mousedown event only for updating activeElement
     */
    function mousedown(event) {
        activeElement = event.target;
    }


    /***********************************************
     * OVERFLOW
     ***********************************************/

    var uniqueID = (function () {
        var i = 0;
        return function (el) {
            return el.uniqueID || (el.uniqueID = i++);
        };
    })();

    var cache = {}; // cleared out after a scrolling session
    var clearCacheTimer;

//setInterval(function () { cache = {}; }, 10 * 1000);

    function scheduleClearCache() {
        clearTimeout(clearCacheTimer);
        clearCacheTimer = setInterval(function () {
            cache = {};
        }, 1 * 1000);
    }

    function setCache(elems, overflowing) {
        for (var i = elems.length; i--;)
            cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
    }

//  (body)                (root)
//         | hidden | visible | scroll |  auto  |
// hidden  |   no   |    no   |   YES  |   YES  |
// visible |   no   |   YES   |   YES  |   YES  |
// scroll  |   no   |   YES   |   YES  |   YES  |
// auto    |   no   |   YES   |   YES  |   YES  |

    function overflowingAncestor(el) {
        var elems = [];
        var body = document.body;
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) {
                return setCache(elems, cached);
            }
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
                var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                if (isFrame && isContentOverflowing(root) ||
                    !isFrame && isOverflowCSS) {
                    return setCache(elems, getScrollRoot());
                }
            } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
                return setCache(elems, el);
            }
        } while (el = el.parentElement);
    }

    function isContentOverflowing(el) {
        return (el.clientHeight + 10 < el.scrollHeight);
    }

// typically for <body> and <html>
    function overflowNotHidden(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return (overflow !== 'hidden');
    }

// for all other elements
    function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return (overflow === 'scroll' || overflow === 'auto');
    }


    /***********************************************
     * HELPERS
     ***********************************************/

    function addEvent(type, fn) {
        window.addEventListener(type, fn, false);
    }

    function removeEvent(type, fn) {
        window.removeEventListener(type, fn, false);
    }

    function isNodeName(el, tag) {
        return (el.nodeName || '').toLowerCase() === tag.toLowerCase();
    }

    function directionCheck(x, y) {
        x = (x > 0) ? 1 : -1;
        y = (y > 0) ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0;
        }
    }

    var deltaBufferTimer;

    if (window.localStorage && localStorage.SS_deltaBuffer) {
        try { // #46 Safari throws in private browsing for localStorage
            deltaBuffer = localStorage.SS_deltaBuffer.split(',');
        } catch (e) {
        }
    }

    function isTouchpad(deltaY) {
        if (!deltaY) return;
        if (!deltaBuffer.length) {
            deltaBuffer = [deltaY, deltaY, deltaY];
        }
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function () {
            try { // #46 Safari throws in private browsing for localStorage
                localStorage.SS_deltaBuffer = deltaBuffer.join(',');
            } catch (e) {
            }
        }, 1000);
        return !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
    }

    function isDivisible(n, divisor) {
        return (Math.floor(n / divisor) == n / divisor);
    }

    function allDeltasDivisableBy(divisor) {
        return (isDivisible(deltaBuffer[0], divisor) &&
            isDivisible(deltaBuffer[1], divisor) &&
            isDivisible(deltaBuffer[2], divisor));
    }

    function isInsideYoutubeVideo(event) {
        var elem = event.target;
        var isControl = false;
        if (document.URL.indexOf('www.youtube.com/watch') != -1) {
            do {
                isControl = (elem.classList &&
                    elem.classList.contains('html5-video-controls'));
                if (isControl) break;
            } while (elem = elem.parentNode);
        }
        return isControl;
    }

    var requestFrame = (function () {
        return (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback, element, delay) {
                window.setTimeout(callback, delay || (1000 / 60));
            });
    })();

    var MutationObserver = (window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver);

    var getScrollRoot = (function () {
        var SCROLL_ROOT;
        return function () {
            if (!SCROLL_ROOT) {
                var dummy = document.createElement('div');
                dummy.style.cssText = 'height:10000px;width:1px;';
                document.body.appendChild(dummy);
                var bodyScrollTop = document.body.scrollTop;
                var docElScrollTop = document.documentElement.scrollTop;
                window.scrollBy(0, 3);
                if (document.body.scrollTop != bodyScrollTop)
                    (SCROLL_ROOT = document.body);
                else
                    (SCROLL_ROOT = document.documentElement);
                window.scrollBy(0, -3);
                document.body.removeChild(dummy);
            }
            return SCROLL_ROOT;
        };
    })();


    /***********************************************
     * PULSE (by Michael Herf)
     ***********************************************/

    /**
     * Viscous fluid with a pulse for part and decay for the rest.
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/
     */
    function pulse_(x) {
        var val, start, expx;
        // test
        x = x * options.pulseScale;
        if (x < 1) { // acceleartion
            val = x - (1 - Math.exp(-x));
        } else {     // tail
            // the previous animation ended here:
            start = Math.exp(-1);
            // simple viscous drag
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + (expx * (1 - start));
        }
        return val * options.pulseNormalize;
    }

    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;

        if (options.pulseNormalize == 1) {
            options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
    }


    /***********************************************
     * FIRST RUN
     ***********************************************/

    var userAgent = window.navigator.userAgent;
    var isEdge = /Edge/.test(userAgent); // thank you MS
    var isChrome = /chrome/i.test(userAgent) && !isEdge;
    var isSafari = /safari/i.test(userAgent) && !isEdge;
    var isMobile = /mobile/i.test(userAgent);
    var isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
    var isOldSafari = isSafari && (/Version\/8/i.test(userAgent) || /Version\/9/i.test(userAgent));
    var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;

    var wheelEvent;
    if ('onwheel' in document.createElement('div'))
        wheelEvent = 'wheel';
    else if ('onmousewheel' in document.createElement('div'))
        wheelEvent = 'mousewheel';

    if (wheelEvent && isEnabledForBrowser) {
        addEvent(wheelEvent, wheel);
        addEvent('mousedown', mousedown);
        addEvent('load', init);
    }


    /***********************************************
     * PUBLIC INTERFACE
     ***********************************************/

    function SmoothScroll(optionsToSet) {
        for (var key in optionsToSet)
            if (defaultOptions.hasOwnProperty(key))
                options[key] = optionsToSet[key];
    }

    SmoothScroll.destroy = cleanup;

    if (window.SmoothScrollOptions) // async API
        SmoothScroll(window.SmoothScrollOptions);

    if (typeof define === 'function' && define.amd)
        define(function () {
            return SmoothScroll;
        });
    else if ('object' == typeof exports)
        module.exports = SmoothScroll;
    else
        window.SmoothScroll = SmoothScroll;

})();
/**
 * Swiper 4.1.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 11, 2018
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, function () {
    "use strict";
    var e = "undefined" == typeof document ? {
        body: {}, addEventListener: function () {
        }, removeEventListener: function () {
        }, activeElement: {
            blur: function () {
            }, nodeName: ""
        }, querySelector: function () {
            return null
        }, querySelectorAll: function () {
            return []
        }, getElementById: function () {
            return null
        }, createEvent: function () {
            return {
                initEvent: function () {
                }
            }
        }, createElement: function () {
            return {
                children: [], childNodes: [], style: {}, setAttribute: function () {
                }, getElementsByTagName: function () {
                    return []
                }
            }
        }, location: {hash: ""}
    } : document, t = "undefined" == typeof window ? {
        document: e,
        navigator: {userAgent: ""},
        location: {},
        history: {},
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {
        },
        removeEventListener: function () {
        },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                }
            }
        },
        Image: function () {
        },
        Date: function () {
        },
        screen: {},
        setTimeout: function () {
        },
        clearTimeout: function () {
        }
    } : window, i = function (e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length, this
    };

    function s(s, a) {
        var r = [], n = 0;
        if (s && !a && s instanceof i) return s;
        if (s) if ("string" == typeof s) {
            var o, l, d = s.trim();
            if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                var h = "div";
                for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) r.push(l.childNodes[n])
            } else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n])
        } else if (s.nodeType || s === t || s === e) r.push(s); else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1) r.push(s[n]);
        return new i(r)
    }

    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }

    s.fn = i.prototype, s.Class = i, s.Dom7 = i;
    "resize scroll".split(" ");
    var r = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        }, removeClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        }, hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e)
        }, toggleClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        }, attr: function (e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1) if (2 === i.length) this[s].setAttribute(e, t); else for (var a in e) this[s][a] = e[a], this[s].setAttribute(a, e[a]);
            return this
        }, removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        }, data: function (e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1) (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0
            }
        }, transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        }, transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        }, on: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, a = e[0], r = e[1], n = e[2], o = e[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.unshift(e), s(t).is(r)) n.apply(t, i); else for (var a = s(t).parents(), o = 0; o < a.length; o += 1) s(a[o]).is(r) && n.apply(a[o], i)
                }
            }

            function d(e) {
                var t = e && e.target ? e.target.dom7EventData || [] : [];
                t.unshift(e), n.apply(this, t)
            }

            "function" == typeof e[1] && (a = (i = e)[0], n = i[1], o = i[2], r = void 0), o || (o = !1);
            for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r) for (h = 0; h < p.length; h += 1) u.dom7LiveListeners || (u.dom7LiveListeners = []), u.dom7LiveListeners.push({
                    type: a,
                    listener: n,
                    proxyListener: l
                }), u.addEventListener(p[h], l, o); else for (h = 0; h < p.length; h += 1) u.dom7Listeners || (u.dom7Listeners = []), u.dom7Listeners.push({
                    type: a,
                    listener: n,
                    proxyListener: d
                }), u.addEventListener(p[h], d, o)
            }
            return this
        }, off: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, s = e[0], a = e[1], r = e[2], n = e[3];
            "function" == typeof e[1] && (s = (i = e)[0], r = i[1], n = i[2], a = void 0), n || (n = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1) for (var d = 0; d < this.length; d += 1) {
                var h = this[d];
                if (a) {
                    if (h.dom7LiveListeners) for (var p = 0; p < h.dom7LiveListeners.length; p += 1) r ? h.dom7LiveListeners[p].listener === r && h.removeEventListener(o[l], h.dom7LiveListeners[p].proxyListener, n) : h.dom7LiveListeners[p].type === o[l] && h.removeEventListener(o[l], h.dom7LiveListeners[p].proxyListener, n)
                } else if (h.dom7Listeners) for (var c = 0; c < h.dom7Listeners.length; c += 1) r ? h.dom7Listeners[c].listener === r && h.removeEventListener(o[l], h.dom7Listeners[c].proxyListener, n) : h.dom7Listeners[c].type === o[l] && h.removeEventListener(o[l], h.dom7Listeners[c].proxyListener, n)
            }
            return this
        }, trigger: function () {
            for (var i = [], s = arguments.length; s--;) i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1) for (var o = 0; o < this.length; o += 1) {
                var l = void 0;
                try {
                    l = new t.CustomEvent(a[n], {detail: r, bubbles: !0, cancelable: !0})
                } catch (t) {
                    (l = e.createEvent("Event")).initEvent(a[n], !0, !0), l.detail = r
                }
                this[o].dom7EventData = i.filter(function (e, t) {
                    return t > 0
                }), this[o].dispatchEvent(l), this[o].dom7EventData = [], delete this[o].dom7EventData
            }
            return this
        }, transitionEnd: function (e) {
            var t, i = ["webkitTransitionEnd", "transitionend"], s = this;

            function a(r) {
                if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a)
            }

            if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
            return this
        }, outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        }, outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        }, offset: function () {
            if (this.length > 0) {
                var i = this[0], s = i.getBoundingClientRect(), a = e.body, r = i.clientTop || a.clientTop || 0,
                    n = i.clientLeft || a.clientLeft || 0, o = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return {top: s.top + o - r, left: s.left + l - n}
            }
            return null
        }, css: function (e, i) {
            var s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1) for (var a in e) this[s].style[a] = e[a];
                    return this
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
                return this
            }
            return this
        }, each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        }, html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        }, text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        }, is: function (a) {
            var r, n, o = this[0];
            if (!o || void 0 === a) return !1;
            if ("string" == typeof a) {
                if (o.matches) return o.matches(a);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector) return o.msMatchesSelector(a);
                for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
                return !1
            }
            if (a === e) return o === e;
            if (a === t) return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
                return !1
            }
            return !1
        }, index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        }, eq: function (e) {
            if (void 0 === e) return this;
            var t, s = this.length;
            return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]])
        }, append: function () {
            for (var t, s = [], a = arguments.length; a--;) s[a] = arguments[a];
            for (var r = 0; r < s.length; r += 1) {
                t = s[r];
                for (var n = 0; n < this.length; n += 1) if ("string" == typeof t) {
                    var o = e.createElement("div");
                    for (o.innerHTML = t; o.firstChild;) this[n].appendChild(o.firstChild)
                } else if (t instanceof i) for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]); else this[n].appendChild(t)
            }
            return this
        }, prepend: function (t) {
            var s, a;
            for (s = 0; s < this.length; s += 1) if ("string" == typeof t) {
                var r = e.createElement("div");
                for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0])
            } else if (t instanceof i) for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]); else this[s].insertBefore(t, this[s].childNodes[0]);
            return this
        }, next: function (e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
        }, nextAll: function (e) {
            var t = [], a = this[0];
            if (!a) return new i([]);
            for (; a.nextElementSibling;) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), a = r
            }
            return new i(t)
        }, prev: function (e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
            }
            return new i([])
        }, prevAll: function (e) {
            var t = [], a = this[0];
            if (!a) return new i([]);
            for (; a.previousElementSibling;) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), a = r
            }
            return new i(t)
        }, parent: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return s(a(t))
        }, parents: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var r = this[i].parentNode; r;) e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
            return s(a(t))
        }, closest: function (e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        }, find: function (e) {
            for (var t = [], s = 0; s < this.length; s += 1) for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
            return new i(t)
        }, children: function (e) {
            for (var t = [], r = 0; r < this.length; r += 1) for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t))
        }, remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }, add: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var r = s(e[i]);
                for (a = 0; a < r.length; a += 1) this[this.length] = r[a], this.length += 1
            }
            return this
        }, styles: function () {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(r).forEach(function (e) {
        s.fn[e] = r[e]
    });
    var n, o, l, d = {
        deleteProps: function (e) {
            var t = e;
            Object.keys(t).forEach(function (e) {
                try {
                    t[e] = null
                } catch (e) {
                }
                try {
                    delete t[e]
                } catch (e) {
                }
            })
        }, nextTick: function (e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t)
        }, now: function () {
            return Date.now()
        }, getTranslate: function (e, i) {
            var s, a, r;
            void 0 === i && (i = "x");
            var n = t.getComputedStyle(e, null);
            return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map(function (e) {
                return e.replace(",", ".")
            }).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0
        }, parseUrlQuery: function (e) {
            var i, s, a, r, n = {}, o = e || t.location.href;
            if ("string" == typeof o && o.length) for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                return "" !== e
            })).length, i = 0; i < r; i += 1) a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
            return n
        }, isObject: function (e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        }, extend: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                var a = e[s];
                if (void 0 !== a && null !== a) for (var r = Object.keys(Object(a)), n = 0, o = r.length; n < o; n += 1) {
                    var l = r[n], h = Object.getOwnPropertyDescriptor(a, l);
                    void 0 !== h && h.enumerable && (d.isObject(i[l]) && d.isObject(a[l]) ? d.extend(i[l], a[l]) : !d.isObject(i[l]) && d.isObject(a[l]) ? (i[l] = {}, d.extend(i[l], a[l])) : i[l] = a[l])
                }
            }
            return i
        }
    }, h = (l = e.createElement("div"), {
        touch: t.Modernizr && !0 === t.Modernizr.touch || !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
        pointerEvents: !(!t.navigator.pointerEnabled && !t.PointerEvent),
        prefixedPointerEvents: !!t.navigator.msPointerEnabled,
        transition: (o = l.style, "transition" in o || "webkitTransition" in o || "MozTransition" in o),
        transforms3d: t.Modernizr && !0 === t.Modernizr.csstransforms3d || (n = l.style, "webkitPerspective" in n || "MozPerspective" in n || "OPerspective" in n || "MsPerspective" in n || "perspective" in n),
        flexbox: function () {
            for (var e = l.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) if (t[i] in e) return !0;
            return !1
        }(),
        observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
        passiveListener: function () {
            var e = !1;
            try {
                var i = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
                t.addEventListener("testPassiveListener", null, i)
            } catch (e) {
            }
            return e
        }(),
        gestures: "ongesturestart" in t
    }), p = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
            t.on(e, t.params.on[e])
        })
    }, c = {components: {configurable: !0}};
    p.prototype.on = function (e, t) {
        var i = this;
        return "function" != typeof t ? i : (e.split(" ").forEach(function (e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e].push(t)
        }), i)
    }, p.prototype.once = function (e, t) {
        var i = this;
        if ("function" != typeof t) return i;
        return i.on(e, function s() {
            for (var a = [], r = arguments.length; r--;) a[r] = arguments[r];
            t.apply(i, a), i.off(e, s)
        })
    }, p.prototype.off = function (e, t) {
        var i = this;
        return e.split(" ").forEach(function (e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e].forEach(function (s, a) {
                s === t && i.eventsListeners[e].splice(a, 1)
            })
        }), i
    }, p.prototype.emit = function () {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, s, a, r = this;
        return r.eventsListeners ? ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r), (Array.isArray(i) ? i : i.split(" ")).forEach(function (e) {
            if (r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function (e) {
                    t.push(e)
                }), t.forEach(function (e) {
                    e.apply(a, s)
                })
            }
        }), r) : r
    }, p.prototype.useModulesParams = function (e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function (i) {
            var s = t.modules[i];
            s.params && d.extend(e, s.params)
        })
    }, p.prototype.useModules = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function (i) {
            var s = t.modules[i], a = e[i] || {};
            s.instance && Object.keys(s.instance).forEach(function (e) {
                var i = s.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }), s.on && t.on && Object.keys(s.on).forEach(function (e) {
                t.on(e, s.on[e])
            }), s.create && s.create.bind(t)(a)
        })
    }, c.components.set = function (e) {
        this.use && this.use(e)
    }, p.installModule = function (e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var a = e.name || Object.keys(s.prototype.modules).length + "_" + d.now();
        return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach(function (t) {
            s.prototype[t] = e.proto[t]
        }), e.static && Object.keys(e.static).forEach(function (t) {
            s[t] = e.static[t]
        }), e.install && e.install.apply(s, t), s
    }, p.use = function (e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(e) ? (e.forEach(function (e) {
            return s.installModule(e)
        }), s) : s.installModule.apply(s, [e].concat(t))
    }, Object.defineProperties(p, c);
    var u = {
        updateSize: function () {
            var e, t, i = this.$el;
            e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), d.extend(this, {
                width: e,
                height: t,
                size: this.isHorizontal() ? e : t
            }))
        }, updateSlides: function () {
            var e = this.params, t = this.$wrapperEl, i = this.size, s = this.rtl, a = this.wrongRTL,
                r = t.children("." + this.params.slideClass),
                n = this.virtual && e.virtual.enabled ? this.virtual.slides.length : r.length, o = [], l = [], p = [],
                c = e.slidesOffsetBefore;
            "function" == typeof c && (c = e.slidesOffsetBefore.call(this));
            var u = e.slidesOffsetAfter;
            "function" == typeof u && (u = e.slidesOffsetAfter.call(this));
            var v = n, f = this.snapGrid.length, m = this.snapGrid.length, g = e.spaceBetween, b = -c, w = 0, y = 0;
            if (void 0 !== i) {
                var x, E;
                "string" == typeof g && g.indexOf("%") >= 0 && (g = parseFloat(g.replace("%", "")) / 100 * i), this.virtualSize = -g, s ? r.css({
                    marginLeft: "",
                    marginTop: ""
                }) : r.css({
                    marginRight: "",
                    marginBottom: ""
                }), e.slidesPerColumn > 1 && (x = Math.floor(n / e.slidesPerColumn) === n / this.params.slidesPerColumn ? n : Math.ceil(n / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (x = Math.max(x, e.slidesPerView * e.slidesPerColumn)));
                for (var T, S = e.slidesPerColumn, C = x / S, M = C - (e.slidesPerColumn * C - n), z = 0; z < n; z += 1) {
                    E = 0;
                    var P = r.eq(z);
                    if (e.slidesPerColumn > 1) {
                        var k = void 0, $ = void 0, L = void 0;
                        "column" === e.slidesPerColumnFill ? (L = z - ($ = Math.floor(z / S)) * S, ($ > M || $ === M && L === S - 1) && (L += 1) >= S && (L = 0, $ += 1), k = $ + L * x / S, P.css({
                            "-webkit-box-ordinal-group": k,
                            "-moz-box-ordinal-group": k,
                            "-ms-flex-order": k,
                            "-webkit-order": k,
                            order: k
                        })) : $ = z - (L = Math.floor(z / C)) * C, P.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== L && e.spaceBetween && e.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L)
                    }
                    "none" !== P.css("display") && ("auto" === e.slidesPerView ? (E = this.isHorizontal() ? P.outerWidth(!0) : P.outerHeight(!0), e.roundLengths && (E = Math.floor(E))) : (E = (i - (e.slidesPerView - 1) * g) / e.slidesPerView, e.roundLengths && (E = Math.floor(E)), r[z] && (this.isHorizontal() ? r[z].style.width = E + "px" : r[z].style.height = E + "px")), r[z] && (r[z].swiperSlideSize = E), p.push(E), e.centeredSlides ? (b = b + E / 2 + w / 2 + g, 0 === w && 0 !== z && (b = b - i / 2 - g), 0 === z && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), y % e.slidesPerGroup == 0 && o.push(b), l.push(b)) : (y % e.slidesPerGroup == 0 && o.push(b), l.push(b), b = b + E + g), this.virtualSize += E + g, w = E, y += 1)
                }
                if (this.virtualSize = Math.max(this.virtualSize, i) + u, s && a && ("slide" === e.effect || "coverflow" === e.effect) && t.css({width: this.virtualSize + e.spaceBetween + "px"}), h.flexbox && !e.setWrapperSize || (this.isHorizontal() ? t.css({width: this.virtualSize + e.spaceBetween + "px"}) : t.css({height: this.virtualSize + e.spaceBetween + "px"})), e.slidesPerColumn > 1 && (this.virtualSize = (E + e.spaceBetween) * x, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? t.css({width: this.virtualSize + e.spaceBetween + "px"}) : t.css({height: this.virtualSize + e.spaceBetween + "px"}), e.centeredSlides)) {
                    T = [];
                    for (var I = 0; I < o.length; I += 1) o[I] < this.virtualSize + o[0] && T.push(o[I]);
                    o = T
                }
                if (!e.centeredSlides) {
                    T = [];
                    for (var D = 0; D < o.length; D += 1) o[D] <= this.virtualSize - i && T.push(o[D]);
                    o = T, Math.floor(this.virtualSize - i) - Math.floor(o[o.length - 1]) > 1 && o.push(this.virtualSize - i)
                }
                0 === o.length && (o = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? s ? r.css({marginLeft: g + "px"}) : r.css({marginRight: g + "px"}) : r.css({marginBottom: g + "px"})), d.extend(this, {
                    slides: r,
                    snapGrid: o,
                    slidesGrid: l,
                    slidesSizesGrid: p
                }), n !== v && this.emit("slidesLengthChange"), o.length !== f && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), l.length !== m && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
            }
        }, updateAutoHeight: function () {
            var e, t = [], i = 0;
            if ("auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) for (e = 0; e < Math.ceil(this.params.slidesPerView); e += 1) {
                var s = this.activeIndex + e;
                if (s > this.slides.length) break;
                t.push(this.slides.eq(s)[0])
            } else t.push(this.slides.eq(this.activeIndex)[0]);
            for (e = 0; e < t.length; e += 1) if (void 0 !== t[e]) {
                var a = t[e].offsetHeight;
                i = a > i ? a : i
            }
            i && this.$wrapperEl.css("height", i + "px")
        }, updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        }, updateSlidesProgress: function (e) {
            void 0 === e && (e = this.translate || 0);
            var t = this.params, i = this.slides, s = this.rtl;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var a = -e;
                s && (a = e), i.removeClass(t.slideVisibleClass);
                for (var r = 0; r < i.length; r += 1) {
                    var n = i[r],
                        o = (a + (t.centeredSlides ? this.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility) {
                        var l = -(a - n.swiperSlideOffset), d = l + this.slidesSizesGrid[r];
                        (l >= 0 && l < this.size || d > 0 && d <= this.size || l <= 0 && d >= this.size) && i.eq(r).addClass(t.slideVisibleClass)
                    }
                    n.progress = s ? -o : o
                }
            }
        }, updateProgress: function (e) {
            void 0 === e && (e = this.translate || 0);
            var t = this.params, i = this.maxTranslate() - this.minTranslate(), s = this.progress, a = this.isBeginning,
                r = this.isEnd, n = a, o = r;
            0 === i ? (s = 0, a = !0, r = !0) : (a = (s = (e - this.minTranslate()) / i) <= 0, r = s >= 1), d.extend(this, {
                progress: s,
                isBeginning: a,
                isEnd: r
            }), (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e), a && !n && this.emit("reachBeginning toEdge"), r && !o && this.emit("reachEnd toEdge"), (n && !a || o && !r) && this.emit("fromEdge"), this.emit("progress", s)
        }, updateSlidesClasses: function () {
            var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex,
                n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        }, updateActiveIndex: function (e) {
            var t, i = this.rtl ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid,
                r = this.params, n = this.activeIndex, o = this.realIndex, l = this.snapIndex, h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
            }
            if ((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== n) {
                var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                d.extend(this, {
                    snapIndex: t,
                    realIndex: c,
                    previousIndex: n,
                    activeIndex: h
                }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== c && this.emit("realIndexChange"), this.emit("slideChange")
            } else t !== l && (this.snapIndex = t, this.emit("snapIndexChange"))
        }, updateClickedSlide: function (e) {
            var t = this.params, i = s(e.target).closest("." + t.slideClass)[0], a = !1;
            if (i) for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
            if (!i || !a) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
            this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
        }
    }, v = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params, i = this.rtl, s = this.translate, a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -s : s;
            var r = d.getTranslate(a[0], e);
            return i && (r = -r), r || 0
        }, setTranslate: function (e, t) {
            var i = this.rtl, s = this.params, a = this.$wrapperEl, r = this.progress, n = 0, o = 0;
            this.isHorizontal() ? n = i ? -e : e : o = e, s.roundLengths && (n = Math.floor(n), o = Math.floor(o)), s.virtualTranslate || (h.transforms3d ? a.transform("translate3d(" + n + "px, " + o + "px, 0px)") : a.transform("translate(" + n + "px, " + o + "px)")), this.translate = this.isHorizontal() ? n : o;
            var l = this.maxTranslate() - this.minTranslate();
            (0 === l ? 0 : (e - this.minTranslate()) / l) !== r && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
        }, minTranslate: function () {
            return -this.snapGrid[0]
        }, maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    }, f = {
        setTransition: function (e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        }, transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex, s = this.params, a = this.previousIndex;
            s.autoHeight && this.updateAutoHeight();
            var r = t;
            if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
                if ("reset" === r) return void this.emit("slideResetTransitionStart");
                this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
            }
        }, transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex, s = this.previousIndex;
            this.animating = !1, this.setTransition(0);
            var a = t;
            if (a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
                if ("reset" === a) return void this.emit("slideResetTransitionEnd");
                this.emit("slideChangeTransitionEnd"), "next" === a ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
            }
        }
    }, m = {
        slideTo: function (e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = this, r = e;
            r < 0 && (r = 0);
            var n = a.params, o = a.snapGrid, l = a.slidesGrid, d = a.previousIndex, p = a.activeIndex, c = a.rtl,
                u = a.$wrapperEl;
            if (a.animating && n.preventIntercationOnTransition) return !1;
            var v = Math.floor(r / n.slidesPerGroup);
            v >= o.length && (v = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && i && a.emit("beforeSlideChangeStart");
            var f, m = -o[v];
            if (a.updateProgress(m), n.normalizeSlideIndex) for (var g = 0; g < l.length; g += 1) -Math.floor(100 * m) >= Math.floor(100 * l[g]) && (r = g);
            if (a.initialized && r !== p) {
                if (!a.allowSlideNext && m < a.translate && m < a.minTranslate()) return !1;
                if (!a.allowSlidePrev && m > a.translate && m > a.maxTranslate() && (p || 0) !== r) return !1
            }
            return f = r > p ? "next" : r < p ? "prev" : "reset", c && -m === a.translate || !c && m === a.translate ? (a.updateActiveIndex(r), n.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== n.effect && a.setTranslate(m), "reset" !== f && (a.transitionStart(i, f), a.transitionEnd(i, f)), !1) : (0 !== t && h.transition ? (a.setTransition(t), a.setTranslate(m), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, f), a.animating || (a.animating = !0, u.transitionEnd(function () {
                a && !a.destroyed && a.transitionEnd(i, f)
            }))) : (a.setTransition(0), a.setTranslate(m), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, f), a.transitionEnd(i, f)), !0)
        }, slideToLoop: function (e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s)
        }, slideNext: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params, a = this.animating;
            return s.loop ? !a && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)
        }, slidePrev: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params, a = this.animating;
            return s.loop ? !a && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex - 1, e, t, i)) : this.slideTo(this.activeIndex - 1, e, t, i)
        }, slideReset: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            return this.slideTo(this.activeIndex, e, t, i)
        }, slideToClickedSlide: function () {
            var e, t = this, i = t.params, a = t.$wrapperEl,
                r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, n = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? n < t.loopedSlides - r / 2 || n > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), n = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
                    t.slideTo(n)
                })) : t.slideTo(n) : n > t.slides.length - r ? (t.loopFix(), n = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
                    t.slideTo(n)
                })) : t.slideTo(n)
            } else t.slideTo(n)
        }
    }, g = {
        loopCreate: function () {
            var t = this, i = t.params, a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l)
                    }
                    r = a.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = [], h = [];
            r.each(function (e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e)
            });
            for (var p = 0; p < h.length; p += 1) a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1) a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))
        }, loopFix: function () {
            var e, t = this.params, i = this.activeIndex, s = this.slides, a = this.loopedSlides,
                r = this.allowSlidePrev, n = this.allowSlideNext, o = this.snapGrid, l = this.rtl;
            this.allowSlidePrev = !0, this.allowSlideNext = !0;
            var d = -o[i] - this.getTranslate();
            i < a ? (e = s.length - 3 * a + i, e += a, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d)) : ("auto" === t.slidesPerView && i >= 2 * a || i > s.length - 2 * t.slidesPerView) && (e = -s.length + i + a, e += a, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d));
            this.allowSlidePrev = r, this.allowSlideNext = n
        }, loopDestroy: function () {
            var e = this.$wrapperEl, t = this.params, i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
    }, b = {
        setGrabCursor: function (e) {
            if (!h.touch && this.params.simulateTouch) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        }, unsetGrabCursor: function () {
            h.touch || (this.el.style.cursor = "")
        }
    }, w = {
        appendSlide: function (e) {
            var t = this.$wrapperEl, i = this.params;
            if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e) for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]); else t.append(e);
            i.loop && this.loopCreate(), i.observer && h.observer || this.update()
        }, prependSlide: function (e) {
            var t = this.params, i = this.$wrapperEl, s = this.activeIndex;
            t.loop && this.loopDestroy();
            var a = s + 1;
            if ("object" == typeof e && "length" in e) {
                for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
                a = s + e.length
            } else i.prepend(e);
            t.loop && this.loopCreate(), t.observer && h.observer || this.update(), this.slideTo(a, 0, !1)
        }, removeSlide: function (e) {
            var t = this.params, i = this.$wrapperEl, s = this.activeIndex;
            t.loop && (this.loopDestroy(), this.slides = i.children("." + t.slideClass));
            var a, r = s;
            if ("object" == typeof e && "length" in e) {
                for (var n = 0; n < e.length; n += 1) a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
                r = Math.max(r, 0)
            } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);
            t.loop && this.loopCreate(), t.observer && h.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
        }, removeAllSlides: function () {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e)
        }
    }, y = function () {
        var i = t.navigator.userAgent, s = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                windows: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                cordova: t.cordova || t.phonegap,
                phonegap: t.cordova || t.phonegap
            }, a = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
            n = i.match(/(iPad).*OS\s([\d_]+)/), o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            l = !n && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (a && (s.os = "windows", s.osVersion = a[2], s.windows = !0), r && !a && (s.os = "android", s.osVersion = r[2], s.android = !0, s.androidChrome = i.toLowerCase().indexOf("chrome") >= 0), (n || l || o) && (s.os = "ios", s.ios = !0), l && !o && (s.osVersion = l[2].replace(/_/g, "."), s.iphone = !0), n && (s.osVersion = n[2].replace(/_/g, "."), s.ipad = !0), o && (s.osVersion = o[3] ? o[3].replace(/_/g, ".") : null, s.iphone = !0), s.ios && s.osVersion && i.indexOf("Version/") >= 0 && "10" === s.osVersion.split(".")[0] && (s.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]), s.desktop = !(s.os || s.android || s.webView), s.webView = (l || n || o) && i.match(/.*AppleWebKit(?!.*Safari)/i), s.os && "ios" === s.os) {
            var d = s.osVersion.split("."), h = e.querySelector('meta[name="viewport"]');
            s.minimalUi = !s.webView && (o || l) && (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) && h && h.getAttribute("content").indexOf("minimal-ui") >= 0
        }
        return s.pixelRatio = t.devicePixelRatio || 1, s
    }(), x = function (i) {
        var a = this.touchEventsData, r = this.params, n = this.touches;
        if (!this.animating || !r.preventIntercationOnTransition) {
            var o = i;
            if (o.originalEvent && (o = o.originalEvent), a.isTouchEvent = "touchstart" === o.type, (a.isTouchEvent || !("which" in o) || 3 !== o.which) && (!a.isTouched || !a.isMoved)) if (r.noSwiping && s(o.target).closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0; else if (!r.swipeHandler || s(o).closest(r.swipeHandler)[0]) {
                n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX, n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
                var l = n.currentX, h = n.currentY;
                if (!(y.ios && !y.cordova && r.iOSEdgeSwipeDetection && l <= r.iOSEdgeSwipeThreshold && l >= t.screen.width - r.iOSEdgeSwipeThreshold)) {
                    if (d.extend(a, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0
                    }), n.startX = l, n.startY = h, a.touchStartTime = d.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== o.type) {
                        var p = !0;
                        s(o.target).is(a.formElements) && (p = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== o.target && e.activeElement.blur(), p && this.allowTouchMove && o.preventDefault()
                    }
                    this.emit("touchStart", o)
                }
            }
        }
    }, E = function (t) {
        var i = this.touchEventsData, a = this.params, r = this.touches, n = this.rtl, o = t;
        if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
            if (!i.isTouchEvent || "mousemove" !== o.type) {
                var l = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
                    h = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
                if (o.preventedByNestedSwiper) return r.startX = l, void (r.startY = h);
                if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (d.extend(r, {
                    startX: l,
                    startY: h,
                    currentX: l,
                    currentY: h
                }), i.touchStartTime = d.now()));
                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop) if (this.isVertical()) {
                    if (h < r.startY && this.translate <= this.maxTranslate() || h > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1)
                } else if (l < r.startX && this.translate <= this.maxTranslate() || l > r.startX && this.translate >= this.minTranslate()) return;
                if (i.isTouchEvent && e.activeElement && o.target === e.activeElement && s(o.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1);
                if (i.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                    r.currentX = l, r.currentY = h;
                    var p, c = r.currentX - r.startX, u = r.currentY - r.startY;
                    if (void 0 === i.isScrolling) this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (p = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, i.isScrolling = this.isHorizontal() ? p > a.touchAngle : 90 - p > a.touchAngle);
                    if (i.isScrolling && this.emit("touchMoveOpposite", o), "undefined" == typeof startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
                        this.allowClick = !1, o.preventDefault(), a.touchMoveStopPropagation && !a.nested && o.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), i.isMoved = !0;
                        var v = this.isHorizontal() ? c : u;
                        r.diff = v, v *= a.touchRatio, n && (v = -v), this.swipeDirection = v > 0 ? "prev" : "next", i.currentTranslate = v + i.startTranslate;
                        var f = !0, m = a.resistanceRatio;
                        if (a.touchReleaseOnEdges && (m = 0), v > 0 && i.currentTranslate > this.minTranslate() ? (f = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + v, m))) : v < 0 && i.currentTranslate < this.maxTranslate() && (f = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - v, m))), f && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) {
                            if (!(Math.abs(v) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                            if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                        }
                        a.followFinger && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({
                            position: r[this.isHorizontal() ? "startX" : "startY"],
                            time: i.touchStartTime
                        }), i.velocities.push({
                            position: r[this.isHorizontal() ? "currentX" : "currentY"],
                            time: d.now()
                        })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
                    }
                }
            }
        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o)
    }, T = function (e) {
        var t = this, i = t.touchEventsData, s = t.params, a = t.touches, r = t.rtl, n = t.$wrapperEl, o = t.slidesGrid,
            l = t.snapGrid, h = e;
        if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, c = d.now(), u = c - i.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap", h), u < 300 && c - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = d.nextTick(function () {
            t && !t.destroyed && t.emit("click", h)
        }, 300)), u < 300 && c - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", h))), i.lastClickTime = d.now(), d.nextTick(function () {
            t.destroyed || (t.allowClick = !0)
        }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, s.freeMode) {
            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (p > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
            if (s.freeModeMomentum) {
                if (i.velocities.length > 1) {
                    var v = i.velocities.pop(), f = i.velocities.pop(), m = v.position - f.position,
                        g = v.time - f.time;
                    t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || d.now() - v.time > 300) && (t.velocity = 0)
                } else t.velocity = 0;
                t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                var b = 1e3 * s.freeModeMomentumRatio, w = t.velocity * b, y = t.translate + w;
                r && (y = -y);
                var x, E = !1, T = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -T && (y = t.maxTranslate() - T), x = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(); else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > T && (y = t.minTranslate() + T), x = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(); else if (s.freeModeSticky) {
                    for (var S, C = 0; C < l.length; C += 1) if (l[C] > -y) {
                        S = C;
                        break
                    }
                    y = -(y = Math.abs(l[S] - y) < Math.abs(l[S - 1] - y) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                }
                if (0 !== t.velocity) b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity); else if (s.freeModeSticky) return void t.slideReset();
                s.freeModeMomentumBounce && E ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function () {
                    t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), n.transitionEnd(function () {
                        t && !t.destroyed && t.transitionEnd()
                    }))
                })) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function () {
                    t && !t.destroyed && t.transitionEnd()
                }))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses()
            }
            (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
        } else {
            for (var M = 0, z = t.slidesSizesGrid[0], P = 0; P < o.length; P += s.slidesPerGroup) void 0 !== o[P + s.slidesPerGroup] ? p >= o[P] && p < o[P + s.slidesPerGroup] && (M = P, z = o[P + s.slidesPerGroup] - o[P]) : p >= o[P] && (M = P, z = o[o.length - 1] - o[o.length - 2]);
            var k = (p - o[M]) / z;
            if (u > s.longSwipesMs) {
                if (!s.longSwipes) return void t.slideTo(t.activeIndex);
                "next" === t.swipeDirection && (k >= s.longSwipesRatio ? t.slideTo(M + s.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (k > 1 - s.longSwipesRatio ? t.slideTo(M + s.slidesPerGroup) : t.slideTo(M))
            } else {
                if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
                "next" === t.swipeDirection && t.slideTo(M + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
            }
        }
    }, S = function () {
        var e = this.params, t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext, s = this.allowSlidePrev;
            if (this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), e.freeMode) {
                var a = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
                this.setTranslate(a), this.updateActiveIndex(), this.updateSlidesClasses(), e.autoHeight && this.updateAutoHeight()
            } else this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);
            this.allowSlidePrev = s, this.allowSlideNext = i
        }
    }, C = function (e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
    };
    var M = {
        attachEvents: function () {
            var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl;
            this.onTouchStart = x.bind(this), this.onTouchMove = E.bind(this), this.onTouchEnd = T.bind(this), this.onClick = C.bind(this);
            var r = "container" === t.touchEventsTarget ? s : a, n = !!t.nested;
            if (h.touch || !h.pointerEvents && !h.prefixedPointerEvents) {
                if (h.touch) {
                    var o = !("touchstart" !== i.start || !h.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r.addEventListener(i.start, this.onTouchStart, o), r.addEventListener(i.move, this.onTouchMove, h.passiveListener ? {
                        passive: !1,
                        capture: n
                    } : n), r.addEventListener(i.end, this.onTouchEnd, o)
                }
                (t.simulateTouch && !y.ios && !y.android || t.simulateTouch && !h.touch && y.ios) && (r.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, n), e.addEventListener("mouseup", this.onTouchEnd, !1))
            } else r.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, n), e.addEventListener(i.end, this.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", this.onClick, !0), this.on("resize observerUpdate", S)
        }, detachEvents: function () {
            var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl,
                r = "container" === t.touchEventsTarget ? s : a, n = !!t.nested;
            if (h.touch || !h.pointerEvents && !h.prefixedPointerEvents) {
                if (h.touch) {
                    var o = !("onTouchStart" !== i.start || !h.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r.removeEventListener(i.start, this.onTouchStart, o), r.removeEventListener(i.move, this.onTouchMove, n), r.removeEventListener(i.end, this.onTouchEnd, o)
                }
                (t.simulateTouch && !y.ios && !y.android || t.simulateTouch && !h.touch && y.ios) && (r.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, n), e.removeEventListener("mouseup", this.onTouchEnd, !1))
            } else r.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, n), e.removeEventListener(i.end, this.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", this.onClick, !0), this.off("resize observerUpdate", S)
        }
    }, z = {
        setBreakpoint: function () {
            var e = this.activeIndex, t = this.loopedSlides;
            void 0 === t && (t = 0);
            var i = this.params, s = i.breakpoints;
            if (s && (!s || 0 !== Object.keys(s).length)) {
                var a = this.getBreakpoint(s);
                if (a && this.currentBreakpoint !== a) {
                    var r = a in s ? s[a] : this.originalParams, n = i.loop && r.slidesPerView !== i.slidesPerView;
                    d.extend(this.params, r), d.extend(this, {
                        allowTouchMove: this.params.allowTouchMove,
                        allowSlideNext: this.params.allowSlideNext,
                        allowSlidePrev: this.params.allowSlidePrev
                    }), this.currentBreakpoint = a, n && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - t + this.loopedSlides, 0, !1)), this.emit("breakpoint", r)
                }
            }
        }, getBreakpoint: function (e) {
            if (e) {
                var i = !1, s = [];
                Object.keys(e).forEach(function (e) {
                    s.push(e)
                }), s.sort(function (e, t) {
                    return parseInt(e, 10) - parseInt(t, 10)
                });
                for (var a = 0; a < s.length; a += 1) {
                    var r = s[a];
                    r >= t.innerWidth && !i && (i = r)
                }
                return i || "max"
            }
        }
    }, P = function () {
        return {
            isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g),
            isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        };
        var e
    }();
    var k = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventIntercationOnTransition: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        }, $ = {
            update: u,
            translate: v,
            transition: f,
            slide: m,
            loop: g,
            grabCursor: b,
            manipulation: w,
            events: M,
            breakpoints: z,
            checkOverflow: {
                checkOverflow: function () {
                    var e = this.isLocked;
                    this.isLocked = 1 === this.snapGrid.length, this.allowTouchMove = !this.isLocked, e && e !== this.isLocked && (this.isEnd = !1, this.navigation.update())
                }
            },
            classes: {
                addClasses: function () {
                    var e = this.classNames, t = this.params, i = this.rtl, s = this.$el, a = [];
                    a.push(t.direction), t.freeMode && a.push("free-mode"), h.flexbox || a.push("no-flexbox"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && a.push("multirow"), y.android && a.push("android"), y.ios && a.push("ios"), P.isIE && (h.pointerEvents || h.prefixedPointerEvents) && a.push("wp8-" + t.direction), a.forEach(function (i) {
                        e.push(t.containerModifierClass + i)
                    }), s.addClass(e.join(" "))
                }, removeClasses: function () {
                    var e = this.$el, t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function (e, i, s, a, r, n) {
                    var o;

                    function l() {
                        n && n()
                    }

                    e.complete && r ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l()
                }, preloadImages: function () {
                    var e = this;

                    function t() {
                        void 0 !== e && null !== e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }

                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                    }
                }
            }
        }, L = {}, I = function (e) {
            function t() {
                for (var i, a, r, n = [], o = arguments.length; o--;) n[o] = arguments[o];
                1 === n.length && n[0].constructor && n[0].constructor === Object ? a = n[0] : (i = (r = n)[0], a = r[1]);
                a || (a = {}), a = d.extend({}, a), i && !a.el && (a.el = i), e.call(this, a), Object.keys($).forEach(function (e) {
                    Object.keys($[e]).forEach(function (i) {
                        t.prototype[i] || (t.prototype[i] = $[e][i])
                    })
                });
                var l = this;
                void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach(function (e) {
                    var t = l.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0], s = t.params[i];
                        if ("object" != typeof s) return;
                        if (!(i in a && "enabled" in s)) return;
                        !0 === a[i] && (a[i] = {enabled: !0}), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {enabled: !1})
                    }
                });
                var p = d.extend({}, k);
                l.useModulesParams(p), l.params = d.extend({}, p, L, a), l.originalParams = d.extend({}, l.params), l.passedParams = d.extend({}, a), l.$ = s;
                var c = s(l.params.el);
                if (i = c[0]) {
                    if (c.length > 1) {
                        var u = [];
                        return c.each(function (e, i) {
                            var s = d.extend({}, a, {el: i});
                            u.push(new t(s))
                        }), u
                    }
                    i.swiper = l, c.data("swiper", l);
                    var v, f, m = c.children("." + l.params.wrapperClass);
                    return d.extend(l, {
                        $el: c,
                        el: i,
                        $wrapperEl: m,
                        wrapperEl: m[0],
                        classNames: [],
                        slides: s(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === l.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === l.params.direction
                        },
                        rtl: "horizontal" === l.params.direction && ("rtl" === i.dir.toLowerCase() || "rtl" === c.css("direction")),
                        wrongRTL: "-webkit-box" === m.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: l.params.allowSlideNext,
                        allowSlidePrev: l.params.allowSlidePrev,
                        touchEvents: (v = ["touchstart", "touchmove", "touchend"], f = ["mousedown", "mousemove", "mouseup"], h.pointerEvents ? f = ["pointerdown", "pointermove", "pointerup"] : h.prefixedPointerEvents && (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), l.touchEventsTouch = {
                            start: v[0],
                            move: v[1],
                            end: v[2]
                        }, l.touchEventsDesktop = {
                            start: f[0],
                            move: f[1],
                            end: f[2]
                        }, h.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: d.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: l.params.allowTouchMove,
                        touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), l.useModules(), l.params.init && l.init(), l
                }
            }

            e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
            var i = {
                extendedDefaults: {configurable: !0},
                defaults: {configurable: !0},
                Class: {configurable: !0},
                $: {configurable: !0}
            };
            return t.prototype.slidesPerViewDynamic = function () {
                var e = this.params, t = this.slides, i = this.slidesGrid, s = this.size, a = this.activeIndex, r = 1;
                if (e.centeredSlides) {
                    for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0));
                    for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0))
                } else for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
                return r
            }, t.prototype.update = function () {
                var e = this;
                e && !e.destroyed && (e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (t(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || t(), e.emit("update"));

                function t() {
                    var t = e.rtl ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, t.prototype.init = function () {
                this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
            }, t.prototype.destroy = function (e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this, s = i.params, a = i.$el, r = i.$wrapperEl, n = i.slides;
                i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function (e) {
                    i.off(e)
                }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), d.deleteProps(i)), i.destroyed = !0
            }, t.extendDefaults = function (e) {
                d.extend(L, e)
            }, i.extendedDefaults.get = function () {
                return L
            }, i.defaults.get = function () {
                return k
            }, i.Class.get = function () {
                return e
            }, i.$.get = function () {
                return s
            }, Object.defineProperties(t, i), t
        }(p), D = {name: "device", proto: {device: y}, static: {device: y}},
        O = {name: "support", proto: {support: h}, static: {support: h}},
        A = {name: "browser", proto: {browser: P}, static: {browser: P}}, H = {
            name: "resize", create: function () {
                var e = this;
                d.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        }, orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            }, on: {
                init: function () {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                }, destroy: function () {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }, N = {
            func: t.MutationObserver || t.WebkitMutationObserver, attach: function (e, t) {
                void 0 === t && (t = {});
                var i = this, s = new (0, N.func)(function (e) {
                    e.forEach(function (e) {
                        i.emit("observerUpdate", e)
                    })
                });
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), i.observer.observers.push(s)
            }, init: function () {
                if (h.observer && this.params.observer) {
                    if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], {childList: !1}), this.observer.attach(this.$wrapperEl[0], {attributes: !1})
                }
            }, destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        }, X = {
            name: "observer", params: {observer: !1, observeParents: !1}, create: function () {
                d.extend(this, {
                    observer: {
                        init: N.init.bind(this),
                        attach: N.attach.bind(this),
                        destroy: N.destroy.bind(this),
                        observers: []
                    }
                })
            }, on: {
                init: function () {
                    this.observer.init()
                }, destroy: function () {
                    this.observer.destroy()
                }
            }
        }, Y = {
            update: function (e) {
                var t = this, i = t.params, s = i.slidesPerView, a = i.slidesPerGroup, r = i.centeredSlides, n = t.virtual,
                    o = n.from, l = n.to, h = n.slides, p = n.slidesGrid, c = n.renderSlide, u = n.offset;
                t.updateActiveIndex();
                var v, f, m, g = t.activeIndex || 0;
                v = t.rtl && t.isHorizontal() ? "right" : t.isHorizontal() ? "left" : "top", r ? (f = Math.floor(s / 2) + a, m = Math.floor(s / 2) + a) : (f = s + (a - 1), m = a);
                var b = Math.max((g || 0) - m, 0), w = Math.min((g || 0) + f, h.length - 1),
                    y = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);

                function x() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }

                if (d.extend(t.virtual, {
                    from: b,
                    to: w,
                    offset: y,
                    slidesGrid: t.slidesGrid
                }), o === b && l === w && !e) return t.slidesGrid !== p && y !== u && t.slides.css(v, y + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: y,
                    from: b,
                    to: w,
                    slides: function () {
                        for (var e = [], t = b; t <= w; t += 1) e.push(h[t]);
                        return e
                    }()
                }), void x();
                var E = [], T = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var S = o; S <= l; S += 1) (S < b || S > w) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + S + '"]').remove();
                for (var C = 0; C < h.length; C += 1) C >= b && C <= w && (void 0 === l || e ? T.push(C) : (C > l && T.push(C), C < o && E.push(C)));
                T.forEach(function (e) {
                    t.$wrapperEl.append(c(h[e], e))
                }), E.sort(function (e, t) {
                    return e < t
                }).forEach(function (e) {
                    t.$wrapperEl.prepend(c(h[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(v, y + "px"), x()
            }, renderSlide: function (e, t) {
                var i = this.params.virtual;
                if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a
            }, appendSlide: function (e) {
                this.virtual.slides.push(e), this.virtual.update(!0)
            }, prependSlide: function (e) {
                if (this.virtual.slides.unshift(e), this.params.virtual.cache) {
                    var t = this.virtual.cache, i = {};
                    Object.keys(t).forEach(function (e) {
                        i[e + 1] = t[e]
                    }), this.virtual.cache = i
                }
                this.virtual.update(!0), this.slideNext(0)
            }
        }, B = {
            name: "virtual",
            params: {virtual: {enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null}},
            create: function () {
                d.extend(this, {
                    virtual: {
                        update: Y.update.bind(this),
                        appendSlide: Y.appendSlide.bind(this),
                        prependSlide: Y.prependSlide.bind(this),
                        renderSlide: Y.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = {watchSlidesProgress: !0};
                        d.extend(this.params, e), d.extend(this.originalParams, e), this.virtual.update()
                    }
                }, setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }, G = {
            handle: function (i) {
                var s = i;
                s.originalEvent && (s = s.originalEvent);
                var a = s.keyCode || s.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === a || this.isVertical() && 40 === a)) return !1;
                if (!this.allowSlidePrev && (this.isHorizontal() && 37 === a || this.isVertical() && 38 === a)) return !1;
                if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (37 === a || 39 === a || 38 === a || 40 === a)) {
                        var r = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var n = t.innerWidth, o = t.innerHeight, l = this.$el.offset();
                        this.rtl && (l.left -= this.$el[0].scrollLeft);
                        for (var d = [[l.left, l.top], [l.left + this.width, l.top], [l.left, l.top + this.height], [l.left + this.width, l.top + this.height]], h = 0; h < d.length; h += 1) {
                            var p = d[h];
                            p[0] >= 0 && p[0] <= n && p[1] >= 0 && p[1] <= o && (r = !0)
                        }
                        if (!r) return
                    }
                    this.isHorizontal() ? (37 !== a && 39 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (39 === a && !this.rtl || 37 === a && this.rtl) && this.slideNext(), (37 === a && !this.rtl || 39 === a && this.rtl) && this.slidePrev()) : (38 !== a && 40 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), 40 === a && this.slideNext(), 38 === a && this.slidePrev()), this.emit("keyPress", a)
                }
            }, enable: function () {
                this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            }, disable: function () {
                this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        }, V = {
            name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
                d.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: G.enable.bind(this),
                        disable: G.disable.bind(this),
                        handle: G.handle.bind(this)
                    }
                })
            }, on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                }, destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var R = {
        lastScrollTime: d.now(), event: t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
            var t = "onwheel" in e;
            if (!t) {
                var i = e.createElement("div");
                i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel
            }
            return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t
        }() ? "wheel" : "mousewheel", normalize: function (e) {
            var t = 0, i = 0, s = 0, a = 0;
            return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
                spinX: t,
                spinY: i,
                pixelX: s,
                pixelY: a
            }
        }, handle: function (e) {
            var i = e, s = this, a = s.params.mousewheel;
            i.originalEvent && (i = i.originalEvent);
            var r = 0, n = s.rtl ? -1 : 1, o = R.normalize(i);
            if (a.forceToAxis) if (s.isHorizontal()) {
                if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                r = o.pixelX * n
            } else {
                if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                r = o.pixelY
            } else r = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
            if (0 === r) return !0;
            if (a.invert && (r = -r), s.params.freeMode) {
                var l = s.getTranslate() + r * a.sensitivity, h = s.isBeginning, p = s.isEnd;
                if (l >= s.minTranslate() && (l = s.minTranslate()), l <= s.maxTranslate() && (l = s.maxTranslate()), s.setTransition(0), s.setTranslate(l), s.updateProgress(), s.updateActiveIndex(), s.updateSlidesClasses(), (!h && s.isBeginning || !p && s.isEnd) && s.updateSlidesClasses(), s.params.freeModeSticky && (clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = d.nextTick(function () {
                    s.slideReset()
                }, 300)), s.emit("scroll", i), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.stopAutoplay(), l === s.minTranslate() || l === s.maxTranslate()) return !0
            } else {
                if (d.now() - s.mousewheel.lastScrollTime > 60) if (r < 0) if (s.isEnd && !s.params.loop || s.animating) {
                    if (a.releaseOnEdges) return !0
                } else s.slideNext(), s.emit("scroll", i); else if (s.isBeginning && !s.params.loop || s.animating) {
                    if (a.releaseOnEdges) return !0
                } else s.slidePrev(), s.emit("scroll", i);
                s.mousewheel.lastScrollTime = (new t.Date).getTime()
            }
            return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
        }, enable: function () {
            if (!R.event) return !1;
            if (this.mousewheel.enabled) return !1;
            var e = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.on(R.event, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
        }, disable: function () {
            if (!R.event) return !1;
            if (!this.mousewheel.enabled) return !1;
            var e = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.off(R.event, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
        }
    }, F = {
        update: function () {
            var e = this.params.navigation;
            if (!this.params.loop) {
                var t = this.navigation, i = t.$nextEl, s = t.$prevEl;
                s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
            }
        }, init: function () {
            var e, t, i = this, a = i.params.navigation;
            (a.nextEl || a.prevEl) && (a.nextEl && (e = s(a.nextEl), i.params.uniqueNavElements && "string" == typeof a.nextEl && e.length > 1 && 1 === i.$el.find(a.nextEl).length && (e = i.$el.find(a.nextEl))), a.prevEl && (t = s(a.prevEl), i.params.uniqueNavElements && "string" == typeof a.prevEl && t.length > 1 && 1 === i.$el.find(a.prevEl).length && (t = i.$el.find(a.prevEl))), e && e.length > 0 && e.on("click", function (e) {
                e.preventDefault(), i.isEnd && !i.params.loop || i.slideNext()
            }), t && t.length > 0 && t.on("click", function (e) {
                e.preventDefault(), i.isBeginning && !i.params.loop || i.slidePrev()
            }), d.extend(i.navigation, {$nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0]}))
        }, destroy: function () {
            var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
            t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click"), i.removeClass(this.params.navigation.disabledClass))
        }
    }, W = {
        update: function () {
            var e = this.rtl, t = this.params.pagination;
            if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var i,
                    a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                    r = this.pagination.$el,
                    n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                    var o, l, d, h = this.pagination.bullets;
                    if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (i > this.previousIndex && this.pagination.dynamicBulletIndex < t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex += 1 : i < this.previousIndex && this.pagination.dynamicBulletIndex > 0 && (this.pagination.dynamicBulletIndex -= 1)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (t.dynamicMainBullets - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each(function (e, a) {
                        var r = s(a), n = r.index();
                        n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                    }); else if (h.eq(i).addClass(t.bulletActiveClass), t.dynamicBullets) {
                        for (var p = h.eq(o), c = h.eq(l), u = o; u <= l; u += 1) h.eq(u).addClass(t.bulletActiveClass + "-main");
                        p.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), c.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                    }
                    if (t.dynamicBullets) {
                        var v = Math.min(h.length, t.dynamicMainBullets + 4),
                            f = (this.pagination.bulletSize * v - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                            m = e ? "right" : "left";
                        h.css(this.isHorizontal() ? m : "top", f + "px")
                    }
                }
                if ("fraction" === t.type && (r.find("." + t.currentClass).text(i + 1), r.find("." + t.totalClass).text(n)), "progressbar" === t.type) {
                    var g = (i + 1) / n, b = g, w = 1;
                    this.isHorizontal() || (w = g, b = 1), r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + b + ") scaleY(" + w + ")").transition(this.params.speed)
                }
                "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
            }
        }, render: function () {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                    i = this.pagination.$el, s = "";
                if ("bullets" === e.type) {
                    for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                    i.html(s), this.pagination.bullets = i.find("." + e.bulletClass)
                }
                "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
            }
        }, init: function () {
            var e = this, t = e.params.pagination;
            if (t.el) {
                var i = s(t.el);
                0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), t.clickable && i.on("click", "." + t.bulletClass, function (t) {
                    t.preventDefault();
                    var i = s(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                }), d.extend(e.pagination, {$el: i, el: i[0]}))
            }
        }, destroy: function () {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.pagination.$el;
                t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
            }
        }
    }, q = {
        setTranslate: function () {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar, t = this.rtl, i = this.progress, s = e.dragSize, a = e.trackSize, r = e.$dragEl,
                    n = e.$el, o = this.params.scrollbar, l = s, d = (a - s) * i;
                t && this.isHorizontal() ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (h.transforms3d ? r.transform("translate3d(" + d + "px, 0, 0)") : r.transform("translateX(" + d + "px)"), r[0].style.width = l + "px") : (h.transforms3d ? r.transform("translate3d(0px, " + d + "px, 0)") : r.transform("translateY(" + d + "px)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function () {
                    n[0].style.opacity = 0, n.transition(400)
                }, 1e3))
            }
        }, setTransition: function (e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        }, updateSize: function () {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar, t = e.$dragEl, i = e.$el;
                t[0].style.width = "", t[0].style.height = "";
                var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize,
                    n = r * (a / this.size);
                s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbarHide && (i[0].style.opacity = 0), d.extend(e, {
                    trackSize: a,
                    divider: r,
                    moveDivider: n,
                    dragSize: s
                }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
            }
        }, setDragPosition: function (e) {
            var t, i = this.scrollbar, s = i.$el, a = i.dragSize, r = i.trackSize;
            t = ((this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - s.offset()[this.isHorizontal() ? "left" : "top"] - a / 2) / (r - a), t = Math.max(Math.min(t, 1), 0), this.rtl && (t = 1 - t);
            var n = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
            this.updateProgress(n), this.setTranslate(n), this.updateActiveIndex(), this.updateSlidesClasses()
        }, onDragStart: function (e) {
            var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el, r = i.$dragEl;
            this.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.emit("scrollbarDragStart", e)
        }, onDragMove: function (e) {
            var t = this.scrollbar, i = this.$wrapperEl, s = t.$el, a = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e))
        }, onDragEnd: function (e) {
            var t = this.params.scrollbar, i = this.scrollbar.$el;
            this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = d.nextTick(function () {
                i.css("opacity", 0), i.transition(400)
            }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideReset())
        }, enableDraggable: function () {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar, i = this.touchEvents, s = this.touchEventsDesktop, a = this.params,
                    r = t.$el[0], n = !(!h.passiveListener || !a.passiveListener) && {passive: !1, capture: !1},
                    o = !(!h.passiveListener || !a.passiveListener) && {passive: !0, capture: !1};
                h.touch || !h.pointerEvents && !h.prefixedPointerEvents ? (h.touch && (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, o)), (a.simulateTouch && !y.ios && !y.android || a.simulateTouch && !h.touch && y.ios) && (r.addEventListener("mousedown", this.scrollbar.onDragStart, n), e.addEventListener("mousemove", this.scrollbar.onDragMove, n), e.addEventListener("mouseup", this.scrollbar.onDragEnd, o))) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, o))
            }
        }, disableDraggable: function () {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar, i = this.touchEvents, s = this.touchEventsDesktop, a = this.params,
                    r = t.$el[0], n = !(!h.passiveListener || !a.passiveListener) && {passive: !1, capture: !1},
                    o = !(!h.passiveListener || !a.passiveListener) && {passive: !0, capture: !1};
                h.touch || !h.pointerEvents && !h.prefixedPointerEvents ? (h.touch && (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, o)), (a.simulateTouch && !y.ios && !y.android || a.simulateTouch && !h.touch && y.ios) && (r.removeEventListener("mousedown", this.scrollbar.onDragStart, n), e.removeEventListener("mousemove", this.scrollbar.onDragMove, n), e.removeEventListener("mouseup", this.scrollbar.onDragEnd, o))) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, o))
            }
        }, init: function () {
            if (this.params.scrollbar.el) {
                var e = this.scrollbar, t = this.$el, i = this.params.scrollbar, a = s(i.el);
                this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                var r = a.find("." + this.params.scrollbar.dragClass);
                0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), d.extend(e, {
                    $el: a,
                    el: a[0],
                    $dragEl: r,
                    dragEl: r[0]
                }), i.draggable && e.enableDraggable()
            }
        }, destroy: function () {
            this.scrollbar.disableDraggable()
        }
    }, j = {
        setTransform: function (e, t) {
            var i = this.rtl, a = s(e), r = i ? -1 : 1, n = a.attr("data-swiper-parallax") || "0",
                o = a.attr("data-swiper-parallax-x"), l = a.attr("data-swiper-parallax-y"),
                d = a.attr("data-swiper-parallax-scale"), h = a.attr("data-swiper-parallax-opacity");
            if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", void 0 !== h && null !== h) {
                var p = h - (h - 1) * (1 - Math.abs(t));
                a[0].style.opacity = p
            }
            if (void 0 === d || null === d) a.transform("translate3d(" + o + ", " + l + ", 0px)"); else {
                var c = d - (d - 1) * (1 - Math.abs(t));
                a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")")
            }
        }, setTranslate: function () {
            var e = this, t = e.$el, i = e.slides, a = e.progress, r = e.snapGrid;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                e.parallax.setTransform(i, a)
            }), i.each(function (t, i) {
                var n = i.progress;
                e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                    e.parallax.setTransform(i, n)
                })
            })
        }, setTransition: function (e) {
            void 0 === e && (e = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                var a = s(i), r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (r = 0), a.transition(r)
            })
        }
    }, K = {
        getDistanceBetweenTouches: function (e) {
            if (e.targetTouches.length < 2) return 1;
            var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX,
                a = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
        }, onGestureStart: function (e) {
            var t = this.params.zoom, i = this.zoom, a = i.gesture;
            if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !h.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                i.fakeGestureTouched = !0, a.scaleStart = K.getDistanceBetweenTouches(e)
            }
            a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest(".swiper-slide"), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0
        }, onGestureChange: function (e) {
            var t = this.params.zoom, i = this.zoom, s = i.gesture;
            if (!h.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                i.fakeGestureMoved = !0, s.scaleMove = K.getDistanceBetweenTouches(e)
            }
            s.$imageEl && 0 !== s.$imageEl.length && (h.gestures ? this.zoom.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
        }, onGestureEnd: function (e) {
            var t = this.params.zoom, i = this.zoom, s = i.gesture;
            if (!h.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !y.android) return;
                i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
            }
            s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
        }, onTouchStart: function (e) {
            var t = this.zoom, i = t.gesture, s = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (y.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        }, onTouchMove: function (e) {
            var t = this.zoom, i = t.gesture, s = t.image, a = t.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = d.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = d.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX), this.rtl && (s.startY = -s.startY));
                var r = s.width * t.scale, n = s.height * t.scale;
                if (!(r < i.slideWidth && n < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - n / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
                        if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
                        if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1)
                    }
                    e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        }, onTouchEnd: function () {
            var e = this.zoom, t = e.gesture, i = e.image, s = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
                i.isTouched = !1, i.isMoved = !1;
                var a = 300, r = 300, n = s.x * a, o = i.currentX + n, l = s.y * r, d = i.currentY + l;
                0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                var h = Math.max(a, r);
                i.currentX = o, i.currentY = d;
                var p = i.width * e.scale, c = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        }, onTransitionEnd: function () {
            var e = this.zoom, t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1)
        }, toggle: function (e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        }, in: function (e) {
            var t, i, a, r, n, o, l, d, h, p, c, u, v, f, m, g, b = this.zoom, w = this.params.zoom, y = b.gesture,
                x = b.image;
            (y.$slideEl || (y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, i = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (m = y.$slideEl[0].offsetWidth, g = y.$slideEl[0].offsetHeight, a = y.$slideEl.offset().left + m / 2 - t, r = y.$slideEl.offset().top + g / 2 - i, l = y.$imageEl[0].offsetWidth, d = y.$imageEl[0].offsetHeight, h = l * b.scale, p = d * b.scale, v = -(c = Math.min(m / 2 - h / 2, 0)), f = -(u = Math.min(g / 2 - p / 2, 0)), n = a * b.scale, o = r * b.scale, n < c && (n = c), n > v && (n = v), o < u && (o = u), o > f && (o = f)) : (n = 0, o = 0), y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
        }, out: function () {
            var e = this.zoom, t = this.params.zoom, i = e.gesture;
            i.$slideEl || (i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
        }, enable: function () {
            var e = this.zoom;
            if (!e.enabled) {
                e.enabled = !0;
                var t = !("touchstart" !== this.touchEvents.start || !h.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                h.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove)
            }
        }, disable: function () {
            var e = this.zoom;
            if (e.enabled) {
                this.zoom.enabled = !1;
                var t = !("touchstart" !== this.touchEvents.start || !h.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                h.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove)
            }
        }
    }, U = {
        loadInSlide: function (e, t) {
            void 0 === t && (t = !0);
            var i = this, a = i.params.lazy;
            if (void 0 !== e && 0 !== i.slides.length) {
                var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                    n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each(function (e, n) {
                    var o = s(n);
                    o.addClass(a.loadingClass);
                    var l = o.attr("data-background"), d = o.attr("data-src"), h = o.attr("data-srcset"),
                        p = o.attr("data-sizes");
                    i.loadImage(o[0], d || l, h, p, !1, function () {
                        if (void 0 !== i && null !== i && i && (!i || i.params) && !i.destroyed) {
                            if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                                var e = r.attr("data-swiper-slide-index");
                                if (r.hasClass(i.params.slideDuplicateClass)) {
                                    var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                    i.lazy.loadInSlide(s.index(), !1)
                                } else {
                                    var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    i.lazy.loadInSlide(n.index(), !1)
                                }
                            }
                            i.emit("lazyImageReady", r[0], o[0])
                        }
                    }), i.emit("lazyImageLoad", r[0], o[0])
                })
            }
        }, load: function () {
            var e = this, t = e.$wrapperEl, i = e.params, a = e.slides, r = e.activeIndex,
                n = e.virtual && i.virtual.enabled, o = i.lazy, l = i.slidesPerView;

            function d(e) {
                if (n) {
                    if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                } else if (a[e]) return !0;
                return !1
            }

            function h(e) {
                return n ? s(e).attr("data-swiper-slide-index") : s(e).index()
            }

            if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function (t, i) {
                var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                e.lazy.loadInSlide(a)
            }); else if (l > 1) for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p); else e.lazy.loadInSlide(r);
            if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) d(m) && e.lazy.loadInSlide(m);
                for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g)
            } else {
                var b = t.children("." + i.slideNextClass);
                b.length > 0 && e.lazy.loadInSlide(h(b));
                var w = t.children("." + i.slidePrevClass);
                w.length > 0 && e.lazy.loadInSlide(h(w))
            }
        }
    }, _ = {
        LinearSpline: function (e, t) {
            var i, s, a, r, n, o = function (e, t) {
                for (s = -1, i = e.length; i - s > 1;) e[a = i + s >> 1] <= t ? s = a : i = a;
                return i
            };
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            }, this
        }, getInterpolateFunction: function (e) {
            this.controller.spline || (this.controller.spline = this.params.loop ? new _.LinearSpline(this.slidesGrid, e.slidesGrid) : new _.LinearSpline(this.snapGrid, e.snapGrid))
        }, setTranslate: function (e, t) {
            var i, s, a = this, r = a.controller.control;

            function n(e) {
                var t = e.rtl && "horizontal" === e.params.direction ? -a.translate : a.translate;
                "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses()
            }

            if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof I && n(r[o]); else r instanceof I && t !== r && n(r)
        }, setTransition: function (e, t) {
            var i, s = this, a = s.controller.control;

            function r(t) {
                t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.$wrapperEl.transitionEnd(function () {
                    a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd())
                }))
            }

            if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof I && r(a[i]); else a instanceof I && t !== a && r(a)
        }
    }, Z = {
        makeElFocusable: function (e) {
            return e.attr("tabIndex", "0"), e
        }, addElRole: function (e, t) {
            return e.attr("role", t), e
        }, addElLabel: function (e, t) {
            return e.attr("aria-label", t), e
        }, disableEl: function (e) {
            return e.attr("aria-disabled", !0), e
        }, enableEl: function (e) {
            return e.attr("aria-disabled", !1), e
        }, onEnterKey: function (e) {
            var t = this.params.a11y;
            if (13 === e.keyCode) {
                var i = s(e.target);
                this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
            }
        }, notify: function (e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e))
        }, updateNavigation: function () {
            if (!this.params.loop) {
                var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
                i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
            }
        }, updatePagination: function () {
            var e = this, t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function (i, a) {
                var r = s(a);
                e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
            })
        }, init: function () {
            this.$el.append(this.a11y.liveRegion);
            var e, t, i = this.params.a11y;
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }, destroy: function () {
            var e, t;
            this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }
    }, Q = {
        init: function () {
            if (this.params.history) {
                if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
                var e = this.history;
                e.initialized = !0, e.paths = Q.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
            }
        }, destroy: function () {
            this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
        }, setHistoryPopState: function () {
            this.history.paths = Q.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        }, getPathValues: function () {
            var e = t.location.pathname.slice(1).split("/").filter(function (e) {
                return "" !== e
            }), i = e.length;
            return {key: e[i - 2], value: e[i - 1]}
        }, setHistory: function (e, i) {
            if (this.history.initialized && this.params.history.enabled) {
                var s = this.slides.eq(i), a = Q.slugify(s.attr("data-history"));
                t.location.pathname.includes(e) || (a = e + "/" + a);
                var r = t.history.state;
                r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({value: a}, null, a) : t.history.pushState({value: a}, null, a))
            }
        }, slugify: function (e) {
            return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        }, scrollToSlide: function (e, t, i) {
            if (t) for (var s = 0, a = this.slides.length; s < a; s += 1) {
                var r = this.slides.eq(s);
                if (Q.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                    var n = r.index();
                    this.slideTo(n, e, i)
                }
            } else this.slideTo(0, e, i)
        }
    }, J = {
        onHashCange: function () {
            var t = e.location.hash.replace("#", "");
            t !== this.slides.eq(this.activeIndex).attr("data-hash") && this.slideTo(this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index())
        }, setHash: function () {
            if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else {
                var i = this.slides.eq(this.activeIndex), s = i.attr("data-hash") || i.attr("data-history");
                e.location.hash = s || ""
            }
        }, init: function () {
            if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                this.hashNavigation.initialized = !0;
                var i = e.location.hash.replace("#", "");
                if (i) for (var a = 0, r = this.slides.length; a < r; a += 1) {
                    var n = this.slides.eq(a);
                    if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                        var o = n.index();
                        this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                    }
                }
                this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
            }
        }, destroy: function () {
            this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange)
        }
    }, ee = {
        run: function () {
            var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = d.nextTick(function () {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
            }, i)
        }, start: function () {
            return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0))
        }, stop: function () {
            return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0))
        }, pause: function (e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? t.$wrapperEl.transitionEnd(function () {
                t && !t.destroyed && (t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            }) : (t.autoplay.paused = !1, t.autoplay.run())))
        }
    }, te = {
        setTranslate: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) {
                var i = this.slides.eq(t), s = -i[0].swiperSlideOffset;
                this.params.virtualTranslate || (s -= this.translate);
                var a = 0;
                this.isHorizontal() || (a = s, s = 0);
                var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({opacity: r}).transform("translate3d(" + s + "px, " + a + "px, 0px)")
            }
        }, setTransition: function (e) {
            var t = this, i = t.slides, s = t.$wrapperEl;
            if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                var a = !1;
                i.transitionEnd(function () {
                    if (!a && t && !t.destroyed) {
                        a = !0, t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
                    }
                })
            }
        }
    }, ie = {
        setTranslate: function () {
            var e, t = this.$el, i = this.$wrapperEl, a = this.slides, r = this.width, n = this.height, o = this.rtl,
                l = this.size, d = this.params.cubeEffect, h = this.isHorizontal(),
                p = this.virtual && this.params.virtual.enabled, c = 0;
            d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({height: r + "px"})) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e)));
            for (var u = 0; u < a.length; u += 1) {
                var v = a.eq(u), f = u;
                p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                var m = 90 * f, g = Math.floor(m / 360);
                o && (m = -m, g = Math.floor(-m / 360));
                var b = Math.max(Math.min(v[0].progress, 1), -1), w = 0, y = 0, x = 0;
                f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), h || (y = w, w = 0);
                var E = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                if (b <= 1 && b > -1 && (c = 90 * f + 90 * b, o && (c = 90 * -f - 90 * b)), v.transform(E), d.slideShadows) {
                    var T = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                        S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === T.length && (T = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), v.append(T)), 0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), v.append(S)), T.length && (T[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }), d.shadow) if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else {
                var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                    M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                    z = d.shadowScale, k = d.shadowScale / M, $ = d.shadowOffset;
                e.transform("scale3d(" + z + ", 1, " + k + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / k + "px) rotateX(-90deg)")
            }
            var L = P.isSafari || P.isUiWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)")
        }, setTransition: function (e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }, se = {
        setTranslate: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) {
                var i = e.eq(t), a = i[0].progress;
                this.params.flipEffect.limitRotation && (a = Math.max(Math.min(i[0].progress, 1), -1));
                var r = -180 * a, n = 0, o = -i[0].swiperSlideOffset, l = 0;
                if (this.isHorizontal() ? this.rtl && (r = -r) : (l = o, o = 0, n = -r, r = 0), i[0].style.zIndex = -Math.abs(Math.round(a)) + e.length, this.params.flipEffect.slideShadows) {
                    var d = this.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                        h = this.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                    0 === d.length && (d = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), i.append(d)), 0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(h)), d.length && (d[0].style.opacity = Math.max(-a, 0)), h.length && (h[0].style.opacity = Math.max(a, 0))
                }
                i.transform("translate3d(" + o + "px, " + l + "px, 0px) rotateX(" + n + "deg) rotateY(" + r + "deg)")
            }
        }, setTransition: function (e) {
            var t = this, i = t.slides, s = t.activeIndex, a = t.$wrapperEl;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                var r = !1;
                i.eq(s).transitionEnd(function () {
                    if (!r && t && !t.destroyed) {
                        r = !0, t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i])
                    }
                })
            }
        }
    }, ae = {
        setTranslate: function () {
            for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, o = this.isHorizontal(), l = this.translate, d = o ? e / 2 - l : t / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
                var f = i.eq(u), m = r[u], g = (d - f[0].swiperSlideOffset - m / 2) / m * n.modifier, b = o ? p * g : 0,
                    w = o ? 0 : p * g, y = -c * Math.abs(g), x = o ? 0 : n.stretch * g, E = o ? n.stretch * g : 0;
                Math.abs(E) < .001 && (E = 0), Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0);
                var T = "translate3d(" + E + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                if (f.transform(T), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) {
                    var S = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                        C = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), f.append(S)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), f.append(C)), S.length && (S[0].style.opacity = g > 0 ? g : 0), C.length && (C[0].style.opacity = -g > 0 ? -g : 0)
                }
            }
            (h.pointerEvents || h.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = d + "px 50%")
        }, setTransition: function (e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }, re = [D, O, A, H, X, B, V, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function () {
            d.extend(this, {
                mousewheel: {
                    enabled: !1,
                    enable: R.enable.bind(this),
                    disable: R.disable.bind(this),
                    handle: R.handle.bind(this),
                    lastScrollTime: d.now()
                }
            })
        },
        on: {
            init: function () {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            }, destroy: function () {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function () {
            d.extend(this, {
                navigation: {
                    init: F.init.bind(this),
                    update: F.update.bind(this),
                    destroy: F.destroy.bind(this)
                }
            })
        },
        on: {
            init: function () {
                this.navigation.init(), this.navigation.update()
            }, toEdge: function () {
                this.navigation.update()
            }, fromEdge: function () {
                this.navigation.update()
            }, destroy: function () {
                this.navigation.destroy()
            }, click: function (e) {
                var t = this.navigation, i = t.$nextEl, a = t.$prevEl;
                !this.params.navigation.hideOnClick || s(e.target).is(a) || s(e.target).is(i) || (i && i.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function () {
            d.extend(this, {
                pagination: {
                    init: W.init.bind(this),
                    render: W.render.bind(this),
                    update: W.update.bind(this),
                    destroy: W.destroy.bind(this),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function () {
                this.pagination.init(), this.pagination.render(), this.pagination.update()
            }, activeIndexChange: function () {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            }, snapIndexChange: function () {
                this.params.loop || this.pagination.update()
            }, slidesLengthChange: function () {
                this.params.loop && (this.pagination.render(), this.pagination.update())
            }, snapGridLengthChange: function () {
                this.params.loop || (this.pagination.render(), this.pagination.update())
            }, destroy: function () {
                this.pagination.destroy()
            }, click: function (e) {
                this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && this.pagination.$el.toggleClass(this.params.pagination.hiddenClass)
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function () {
            d.extend(this, {
                scrollbar: {
                    init: q.init.bind(this),
                    destroy: q.destroy.bind(this),
                    updateSize: q.updateSize.bind(this),
                    setTranslate: q.setTranslate.bind(this),
                    setTransition: q.setTransition.bind(this),
                    enableDraggable: q.enableDraggable.bind(this),
                    disableDraggable: q.disableDraggable.bind(this),
                    setDragPosition: q.setDragPosition.bind(this),
                    onDragStart: q.onDragStart.bind(this),
                    onDragMove: q.onDragMove.bind(this),
                    onDragEnd: q.onDragEnd.bind(this),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function () {
                this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
            }, update: function () {
                this.scrollbar.updateSize()
            }, resize: function () {
                this.scrollbar.updateSize()
            }, observerUpdate: function () {
                this.scrollbar.updateSize()
            }, setTranslate: function () {
                this.scrollbar.setTranslate()
            }, setTransition: function (e) {
                this.scrollbar.setTransition(e)
            }, destroy: function () {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
            d.extend(this, {
                parallax: {
                    setTransform: j.setTransform.bind(this),
                    setTranslate: j.setTranslate.bind(this),
                    setTransition: j.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0)
            }, init: function () {
                this.params.parallax && this.parallax.setTranslate()
            }, setTranslate: function () {
                this.params.parallax && this.parallax.setTranslate()
            }, setTransition: function (e) {
                this.params.parallax && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function () {
            var e = this, t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
                t[i] = K[i].bind(e)
            }), d.extend(e, {zoom: t})
        },
        on: {
            init: function () {
                this.params.zoom.enabled && this.zoom.enable()
            }, destroy: function () {
                this.zoom.disable()
            }, touchStart: function (e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            }, touchEnd: function (e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            }, doubleTap: function (e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            }, transitionEnd: function () {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function () {
            d.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: U.load.bind(this),
                    loadInSlide: U.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            }, init: function () {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            }, scroll: function () {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            }, resize: function () {
                this.params.lazy.enabled && this.lazy.load()
            }, scrollbarDragMove: function () {
                this.params.lazy.enabled && this.lazy.load()
            }, transitionStart: function () {
                this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
            }, transitionEnd: function () {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            }
        }
    }, {
        name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
            d.extend(this, {
                controller: {
                    control: this.params.controller.control,
                    getInterpolateFunction: _.getInterpolateFunction.bind(this),
                    setTranslate: _.setTranslate.bind(this),
                    setTransition: _.setTransition.bind(this)
                }
            })
        }, on: {
            update: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, resize: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, observerUpdate: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, setTranslate: function (e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            }, setTransition: function (e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !1,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function () {
            var e = this;
            d.extend(e, {a11y: {liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(Z).forEach(function (t) {
                e.a11y[t] = Z[t].bind(e)
            })
        },
        on: {
            init: function () {
                this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
            }, toEdge: function () {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            }, fromEdge: function () {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            }, paginationUpdate: function () {
                this.params.a11y.enabled && this.a11y.updatePagination()
            }, destroy: function () {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
            d.extend(this, {
                history: {
                    init: Q.init.bind(this),
                    setHistory: Q.setHistory.bind(this),
                    setHistoryPopState: Q.setHistoryPopState.bind(this),
                    scrollToSlide: Q.scrollToSlide.bind(this),
                    destroy: Q.destroy.bind(this)
                }
            })
        }, on: {
            init: function () {
                this.params.history.enabled && this.history.init()
            }, destroy: function () {
                this.params.history.enabled && this.history.destroy()
            }, transitionEnd: function () {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
        create: function () {
            d.extend(this, {
                hashNavigation: {
                    initialized: !1,
                    init: J.init.bind(this),
                    destroy: J.destroy.bind(this),
                    setHash: J.setHash.bind(this),
                    onHashCange: J.onHashCange.bind(this)
                }
            })
        },
        on: {
            init: function () {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            }, destroy: function () {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            }, transitionEnd: function () {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function () {
            d.extend(this, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: ee.run.bind(this),
                    start: ee.start.bind(this),
                    stop: ee.stop.bind(this),
                    pause: ee.pause.bind(this)
                }
            })
        },
        on: {
            init: function () {
                this.params.autoplay.enabled && this.autoplay.start()
            }, beforeTransitionStart: function (e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            }, sliderFirstMove: function () {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            }, destroy: function () {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
            d.extend(this, {
                fadeEffect: {
                    setTranslate: te.setTranslate.bind(this),
                    setTransition: te.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                if ("fade" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "fade");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    d.extend(this.params, e), d.extend(this.originalParams, e)
                }
            }, setTranslate: function () {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            }, setTransition: function (e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
        create: function () {
            d.extend(this, {
                cubeEffect: {
                    setTranslate: ie.setTranslate.bind(this),
                    setTransition: ie.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                if ("cube" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    d.extend(this.params, e), d.extend(this.originalParams, e)
                }
            }, setTranslate: function () {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            }, setTransition: function (e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
            d.extend(this, {
                flipEffect: {
                    setTranslate: se.setTranslate.bind(this),
                    setTransition: se.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                if ("flip" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    d.extend(this.params, e), d.extend(this.originalParams, e)
                }
            }, setTranslate: function () {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            }, setTransition: function (e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
        create: function () {
            d.extend(this, {
                coverflowEffect: {
                    setTranslate: ae.setTranslate.bind(this),
                    setTransition: ae.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            }, setTranslate: function () {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            }, setTransition: function (e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }];
    return void 0 === I.use && (I.use = I.Class.use, I.installModule = I.Class.installModule), I.use(re), I
});
//# sourceMappingURL=swiper.min.js.map

(function ($) {
    var CountTo = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
        this.init();
    };

    CountTo.DEFAULTS = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    CountTo.prototype.init = function () {
        this.value = this.options.from;
        this.loops = Math.ceil(this.options.speed / this.options.refreshInterval);
        this.loopCount = 0;
        this.increment = (this.options.to - this.options.from) / this.loops;
    };

    CountTo.prototype.dataOptions = function () {
        var options = {
            from: this.$element.data('from'),
            to: this.$element.data('to'),
            speed: this.$element.data('speed'),
            refreshInterval: this.$element.data('refresh-interval'),
            decimals: this.$element.data('decimals')
        };

        var keys = Object.keys(options);

        for (var i in keys) {
            var key = keys[i];

            if (typeof (options[key]) === 'undefined') {
                delete options[key];
            }
        }

        return options;
    };

    CountTo.prototype.update = function () {
        this.value += this.increment;
        this.loopCount++;

        this.render();

        if (typeof (this.options.onUpdate) == 'function') {
            this.options.onUpdate.call(this.$element, this.value);
        }

        if (this.loopCount >= this.loops) {
            clearInterval(this.interval);
            this.value = this.options.to;

            if (typeof (this.options.onComplete) == 'function') {
                this.options.onComplete.call(this.$element, this.value);
            }
        }
    };

    CountTo.prototype.render = function () {
        var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(formattedValue);
    };

    CountTo.prototype.restart = function () {
        this.stop();
        this.init();
        this.start();
    };

    CountTo.prototype.start = function () {
        this.stop();
        this.render();
        this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
    };

    CountTo.prototype.stop = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };

    CountTo.prototype.toggle = function () {
        if (this.interval) {
            this.stop();
        } else {
            this.start();
        }
    };

    function formatter(value, options) {
        return value.toFixed(options.decimals);
    }

    $.fn.countTo = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('countTo');
            var init = !data || typeof (option) === 'object';
            var options = typeof (option) === 'object' ? option : {};
            var method = typeof (option) === 'string' ? option : 'start';

            if (init) {
                if (data) data.stop();
                $this.data('countTo', data = new CountTo(this, options));
            }

            data[method].call(data);
        });
    };
}(jQuery));

/*!
 * Stellar.js v0.6.2
 * http://markdalgleish.com/projects/stellar.js
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://markdalgleish.mit-license.org
 */

;(function ($, window, document, undefined) {

    var pluginName = 'stellar',
        defaults = {
            scrollProperty: 'scroll',
            positionProperty: 'position',
            horizontalScrolling: true,
            verticalScrolling: true,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: false,
            parallaxBackgrounds: true,
            parallaxElements: true,
            hideDistantElements: true,
            hideElement: function ($elem) {
                $elem.hide();
            },
            showElement: function ($elem) {
                $elem.show();
            }
        },

        scrollProperty = {
            scroll: {
                getLeft: function ($elem) {
                    return $elem.scrollLeft();
                },
                setLeft: function ($elem, val) {
                    $elem.scrollLeft(val);
                },

                getTop: function ($elem) {
                    return $elem.scrollTop();
                },
                setTop: function ($elem, val) {
                    $elem.scrollTop(val);
                }
            },
            position: {
                getLeft: function ($elem) {
                    return parseInt($elem.css('left'), 10) * -1;
                },
                getTop: function ($elem) {
                    return parseInt($elem.css('top'), 10) * -1;
                }
            },
            margin: {
                getLeft: function ($elem) {
                    return parseInt($elem.css('margin-left'), 10) * -1;
                },
                getTop: function ($elem) {
                    return parseInt($elem.css('margin-top'), 10) * -1;
                }
            },
            transform: {
                getLeft: function ($elem) {
                    var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
                    return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0);
                },
                getTop: function ($elem) {
                    var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
                    return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0);
                }
            }
        },

        positionProperty = {
            position: {
                setLeft: function ($elem, left) {
                    $elem.css('left', left);
                },
                setTop: function ($elem, top) {
                    $elem.css('top', top);
                }
            },
            transform: {
                setPosition: function ($elem, left, startingLeft, top, startingTop) {
                    $elem[0].style[prefixedTransform] = 'translate3d(' + (left - startingLeft) + 'px, ' + (top - startingTop) + 'px, 0)';
                }
            }
        },

        // Returns a function which adds a vendor prefix to any CSS property name
        vendorPrefix = (function () {
            var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                style = $('script')[0].style,
                prefix = '',
                prop;

            for (prop in style) {
                if (prefixes.test(prop)) {
                    prefix = prop.match(prefixes)[0];
                    break;
                }
            }

            if ('WebkitOpacity' in style) {
                prefix = 'Webkit';
            }
            if ('KhtmlOpacity' in style) {
                prefix = 'Khtml';
            }

            return function (property) {
                return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
            };
        }()),

        prefixedTransform = vendorPrefix('transform'),

        supportsBackgroundPositionXY = $('<div />', {style: 'background:#fff'}).css('background-position-x') !== undefined,

        setBackgroundPosition = (supportsBackgroundPositionXY ?
                function ($elem, x, y) {
                    $elem.css({
                        'background-position-x': x,
                        'background-position-y': y
                    });
                } :
                function ($elem, x, y) {
                    $elem.css('background-position', x + ' ' + y);
                }
        ),

        getBackgroundPosition = (supportsBackgroundPositionXY ?
                function ($elem) {
                    return [
                        $elem.css('background-position-x'),
                        $elem.css('background-position-y')
                    ];
                } :
                function ($elem) {
                    return $elem.css('background-position').split(' ');
                }
        ),

        requestAnimFrame = (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 1000 / 60);
            }
        );

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);

            this._defineElements();
            this._defineGetters();
            this._defineSetters();
            this._handleWindowLoadAndResize();
            this._detectViewport();

            this.refresh({firstLoad: true});

            if (this.options.scrollProperty === 'scroll') {
                this._handleScrollEvent();
            } else {
                this._startAnimationLoop();
            }
        },
        _defineElements: function () {
            if (this.element === document.body) this.element = window;
            this.$scrollElement = $(this.element);
            this.$element = (this.element === window ? $('body') : this.$scrollElement);
            this.$viewportElement = (this.options.viewportElement !== undefined ? $(this.options.viewportElement) : (this.$scrollElement[0] === window || this.options.scrollProperty === 'scroll' ? this.$scrollElement : this.$scrollElement.parent()));
        },
        _defineGetters: function () {
            var self = this,
                scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];

            this._getScrollLeft = function () {
                return scrollPropertyAdapter.getLeft(self.$scrollElement);
            };

            this._getScrollTop = function () {
                return scrollPropertyAdapter.getTop(self.$scrollElement);
            };
        },
        _defineSetters: function () {
            var self = this,
                scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
                positionPropertyAdapter = positionProperty[self.options.positionProperty],
                setScrollLeft = scrollPropertyAdapter.setLeft,
                setScrollTop = scrollPropertyAdapter.setTop;

            this._setScrollLeft = (typeof setScrollLeft === 'function' ? function (val) {
                setScrollLeft(self.$scrollElement, val);
            } : $.noop);

            this._setScrollTop = (typeof setScrollTop === 'function' ? function (val) {
                setScrollTop(self.$scrollElement, val);
            } : $.noop);

            this._setPosition = positionPropertyAdapter.setPosition ||
                function ($elem, left, startingLeft, top, startingTop) {
                    if (self.options.horizontalScrolling) {
                        positionPropertyAdapter.setLeft($elem, left, startingLeft);
                    }

                    if (self.options.verticalScrolling) {
                        positionPropertyAdapter.setTop($elem, top, startingTop);
                    }
                };
        },
        _handleWindowLoadAndResize: function () {
            var self = this,
                $window = $(window);

            if (self.options.responsive) {
                $window.bind('load.' + this.name, function () {
                    self.refresh();
                });
            }

            $window.bind('resize.' + this.name, function () {
                self._detectViewport();

                if (self.options.responsive) {
                    self.refresh();
                }
            });
        },
        refresh: function (options) {
            var self = this,
                oldLeft = self._getScrollLeft(),
                oldTop = self._getScrollTop();

            if (!options || !options.firstLoad) {
                this._reset();
            }

            this._setScrollLeft(0);
            this._setScrollTop(0);

            this._setOffsets();
            this._findParticles();
            this._findBackgrounds();

            // Fix for WebKit background rendering bug
            if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
                $(window).load(function () {
                    var oldLeft = self._getScrollLeft(),
                        oldTop = self._getScrollTop();

                    self._setScrollLeft(oldLeft + 1);
                    self._setScrollTop(oldTop + 1);

                    self._setScrollLeft(oldLeft);
                    self._setScrollTop(oldTop);
                });
            }

            this._setScrollLeft(oldLeft);
            this._setScrollTop(oldTop);
        },
        _detectViewport: function () {
            var viewportOffsets = this.$viewportElement.offset(),
                hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

            this.viewportWidth = this.$viewportElement.width();
            this.viewportHeight = this.$viewportElement.height();

            this.viewportOffsetTop = (hasOffsets ? viewportOffsets.top : 0);
            this.viewportOffsetLeft = (hasOffsets ? viewportOffsets.left : 0);
        },
        _findParticles: function () {
            var self = this,
                scrollLeft = this._getScrollLeft(),
                scrollTop = this._getScrollTop();

            if (this.particles !== undefined) {
                for (var i = this.particles.length - 1; i >= 0; i--) {
                    this.particles[i].$element.data('stellar-elementIsActive', undefined);
                }
            }

            this.particles = [];

            if (!this.options.parallaxElements) return;

            this.$element.find('[data-stellar-ratio]').each(function (i) {
                var $this = $(this),
                    horizontalOffset,
                    verticalOffset,
                    positionLeft,
                    positionTop,
                    marginLeft,
                    marginTop,
                    $offsetParent,
                    offsetLeft,
                    offsetTop,
                    parentOffsetLeft = 0,
                    parentOffsetTop = 0,
                    tempParentOffsetLeft = 0,
                    tempParentOffsetTop = 0;

                // Ensure this element isn't already part of another scrolling element
                if (!$this.data('stellar-elementIsActive')) {
                    $this.data('stellar-elementIsActive', this);
                } else if ($this.data('stellar-elementIsActive') !== this) {
                    return;
                }

                self.options.showElement($this);

                // Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance
                if (!$this.data('stellar-startingLeft')) {
                    $this.data('stellar-startingLeft', $this.css('left'));
                    $this.data('stellar-startingTop', $this.css('top'));
                } else {
                    $this.css('left', $this.data('stellar-startingLeft'));
                    $this.css('top', $this.data('stellar-startingTop'));
                }

                positionLeft = $this.position().left;
                positionTop = $this.position().top;

                // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
                marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
                marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

                offsetLeft = $this.offset().left - marginLeft;
                offsetTop = $this.offset().top - marginTop;

                // Calculate the offset parent
                $this.parents().each(function () {
                    var $this = $(this);

                    if ($this.data('stellar-offset-parent') === true) {
                        parentOffsetLeft = tempParentOffsetLeft;
                        parentOffsetTop = tempParentOffsetTop;
                        $offsetParent = $this;

                        return false;
                    } else {
                        tempParentOffsetLeft += $this.position().left;
                        tempParentOffsetTop += $this.position().top;
                    }
                });

                // Detect the offsets
                horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
                verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

                // Add our object to the particles collection
                self.particles.push({
                    $element: $this,
                    $offsetParent: $offsetParent,
                    isFixed: $this.css('position') === 'fixed',
                    horizontalOffset: horizontalOffset,
                    verticalOffset: verticalOffset,
                    startingPositionLeft: positionLeft,
                    startingPositionTop: positionTop,
                    startingOffsetLeft: offsetLeft,
                    startingOffsetTop: offsetTop,
                    parentOffsetLeft: parentOffsetLeft,
                    parentOffsetTop: parentOffsetTop,
                    stellarRatio: ($this.data('stellar-ratio') !== undefined ? $this.data('stellar-ratio') : 1),
                    width: $this.outerWidth(true),
                    height: $this.outerHeight(true),
                    isHidden: false
                });
            });
        },
        _findBackgrounds: function () {
            var self = this,
                scrollLeft = this._getScrollLeft(),
                scrollTop = this._getScrollTop(),
                $backgroundElements;

            this.backgrounds = [];

            if (!this.options.parallaxBackgrounds) return;

            $backgroundElements = this.$element.find('[data-stellar-background-ratio]');

            if (this.$element.data('stellar-background-ratio')) {
                $backgroundElements = $backgroundElements.add(this.$element);
            }

            $backgroundElements.each(function () {
                var $this = $(this),
                    backgroundPosition = getBackgroundPosition($this),
                    horizontalOffset,
                    verticalOffset,
                    positionLeft,
                    positionTop,
                    marginLeft,
                    marginTop,
                    offsetLeft,
                    offsetTop,
                    $offsetParent,
                    parentOffsetLeft = 0,
                    parentOffsetTop = 0,
                    tempParentOffsetLeft = 0,
                    tempParentOffsetTop = 0;

                // Ensure this element isn't already part of another scrolling element
                if (!$this.data('stellar-backgroundIsActive')) {
                    $this.data('stellar-backgroundIsActive', this);
                } else if ($this.data('stellar-backgroundIsActive') !== this) {
                    return;
                }

                // Save/restore the original top and left CSS values in case we destroy the instance
                if (!$this.data('stellar-backgroundStartingLeft')) {
                    $this.data('stellar-backgroundStartingLeft', backgroundPosition[0]);
                    $this.data('stellar-backgroundStartingTop', backgroundPosition[1]);
                } else {
                    setBackgroundPosition($this, $this.data('stellar-backgroundStartingLeft'), $this.data('stellar-backgroundStartingTop'));
                }

                // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
                marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
                marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

                offsetLeft = $this.offset().left - marginLeft - scrollLeft;
                offsetTop = $this.offset().top - marginTop - scrollTop;

                // Calculate the offset parent
                $this.parents().each(function () {
                    var $this = $(this);

                    if ($this.data('stellar-offset-parent') === true) {
                        parentOffsetLeft = tempParentOffsetLeft;
                        parentOffsetTop = tempParentOffsetTop;
                        $offsetParent = $this;

                        return false;
                    } else {
                        tempParentOffsetLeft += $this.position().left;
                        tempParentOffsetTop += $this.position().top;
                    }
                });

                // Detect the offsets
                horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
                verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

                self.backgrounds.push({
                    $element: $this,
                    $offsetParent: $offsetParent,
                    isFixed: $this.css('background-attachment') === 'fixed',
                    horizontalOffset: horizontalOffset,
                    verticalOffset: verticalOffset,
                    startingValueLeft: backgroundPosition[0],
                    startingValueTop: backgroundPosition[1],
                    startingBackgroundPositionLeft: (isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10)),
                    startingBackgroundPositionTop: (isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10)),
                    startingPositionLeft: $this.position().left,
                    startingPositionTop: $this.position().top,
                    startingOffsetLeft: offsetLeft,
                    startingOffsetTop: offsetTop,
                    parentOffsetLeft: parentOffsetLeft,
                    parentOffsetTop: parentOffsetTop,
                    stellarRatio: ($this.data('stellar-background-ratio') === undefined ? 1 : $this.data('stellar-background-ratio'))
                });
            });
        },
        _reset: function () {
            var particle,
                startingPositionLeft,
                startingPositionTop,
                background,
                i;

            for (i = this.particles.length - 1; i >= 0; i--) {
                particle = this.particles[i];
                startingPositionLeft = particle.$element.data('stellar-startingLeft');
                startingPositionTop = particle.$element.data('stellar-startingTop');

                this._setPosition(particle.$element, startingPositionLeft, startingPositionLeft, startingPositionTop, startingPositionTop);

                this.options.showElement(particle.$element);

                particle.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null);
            }

            for (i = this.backgrounds.length - 1; i >= 0; i--) {
                background = this.backgrounds[i];

                background.$element.data('stellar-backgroundStartingLeft', null).data('stellar-backgroundStartingTop', null);

                setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop);
            }
        },
        destroy: function () {
            this._reset();

            this.$scrollElement.unbind('resize.' + this.name).unbind('scroll.' + this.name);
            this._animationLoop = $.noop;

            $(window).unbind('load.' + this.name).unbind('resize.' + this.name);
        },
        _setOffsets: function () {
            var self = this,
                $window = $(window);

            $window.unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name);

            if (typeof this.options.horizontalOffset === 'function') {
                this.horizontalOffset = this.options.horizontalOffset();
                $window.bind('resize.horizontal-' + this.name, function () {
                    self.horizontalOffset = self.options.horizontalOffset();
                });
            } else {
                this.horizontalOffset = this.options.horizontalOffset;
            }

            if (typeof this.options.verticalOffset === 'function') {
                this.verticalOffset = this.options.verticalOffset();
                $window.bind('resize.vertical-' + this.name, function () {
                    self.verticalOffset = self.options.verticalOffset();
                });
            } else {
                this.verticalOffset = this.options.verticalOffset;
            }
        },
        _repositionElements: function () {
            var scrollLeft = this._getScrollLeft(),
                scrollTop = this._getScrollTop(),
                horizontalOffset,
                verticalOffset,
                particle,
                fixedRatioOffset,
                background,
                bgLeft,
                bgTop,
                isVisibleVertical = true,
                isVisibleHorizontal = true,
                newPositionLeft,
                newPositionTop,
                newOffsetLeft,
                newOffsetTop,
                i;

            // First check that the scroll position or container size has changed
            if (this.currentScrollLeft === scrollLeft && this.currentScrollTop === scrollTop && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
                return;
            } else {
                this.currentScrollLeft = scrollLeft;
                this.currentScrollTop = scrollTop;
                this.currentWidth = this.viewportWidth;
                this.currentHeight = this.viewportHeight;
            }

            // Reposition elements
            for (i = this.particles.length - 1; i >= 0; i--) {
                particle = this.particles[i];

                fixedRatioOffset = (particle.isFixed ? 1 : 0);

                // Calculate position, then calculate what the particle's new offset will be (for visibility check)
                if (this.options.horizontalScrolling) {
                    newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft;
                    newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft;
                } else {
                    newPositionLeft = particle.startingPositionLeft;
                    newOffsetLeft = particle.startingOffsetLeft;
                }

                if (this.options.verticalScrolling) {
                    newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop;
                    newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop;
                } else {
                    newPositionTop = particle.startingPositionTop;
                    newOffsetTop = particle.startingOffsetTop;
                }

                // Check visibility
                if (this.options.hideDistantElements) {
                    isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft;
                    isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop;
                }

                if (isVisibleHorizontal && isVisibleVertical) {
                    if (particle.isHidden) {
                        this.options.showElement(particle.$element);
                        particle.isHidden = false;
                    }

                    this._setPosition(particle.$element, newPositionLeft, particle.startingPositionLeft, newPositionTop, particle.startingPositionTop);
                } else {
                    if (!particle.isHidden) {
                        this.options.hideElement(particle.$element);
                        particle.isHidden = true;
                    }
                }
            }

            // Reposition backgrounds
            for (i = this.backgrounds.length - 1; i >= 0; i--) {
                background = this.backgrounds[i];

                fixedRatioOffset = (background.isFixed ? 0 : 1);
                bgLeft = (this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueLeft);
                bgTop = (this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueTop);

                setBackgroundPosition(background.$element, bgLeft, bgTop);
            }
        },
        _handleScrollEvent: function () {
            var self = this,
                ticking = false;

            var update = function () {
                self._repositionElements();
                ticking = false;
            };

            var requestTick = function () {
                if (!ticking) {
                    requestAnimFrame(update);
                    ticking = true;
                }
            };

            this.$scrollElement.bind('scroll.' + this.name, requestTick);
            requestTick();
        },
        _startAnimationLoop: function () {
            var self = this;

            this._animationLoop = function () {
                requestAnimFrame(self._animationLoop);
                self._repositionElements();
            };
            this._animationLoop();
        }
    };

    $.fn[pluginName] = function (options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }
            });
        }
    };

    $[pluginName] = function (options) {
        var $window = $(window);
        return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0));
    };

    // Expose the scroll and position property function hashes so they can be extended
    $[pluginName].scrollProperty = scrollProperty;
    $[pluginName].positionProperty = positionProperty;

    // Expose the plugin class so it can be modified
    window.Stellar = Plugin;
}(jQuery, this, document));
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (a) {
    var b, c, d, e, f, g, h = "Close", i = "BeforeClose", j = "AfterClose", k = "BeforeAppend", l = "MarkupParse",
        m = "Open", n = "Change", o = "mfp", p = "." + o, q = "mfp-ready", r = "mfp-removing", s = "mfp-prevent-close",
        t = function () {
        }, u = !!window.jQuery, v = a(window), w = function (a, c) {
            b.ev.on(o + a + p, c)
        }, x = function (b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        }, y = function (c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        }, z = function (c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        }, A = function () {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        }, B = function () {
            var a = document.createElement("p").style, b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;) if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t, init: function () {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        }, open: function (c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++) if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                    b.index = e;
                    break
                }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function () {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(), n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        }, close: function () {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
                b._close()
            }, b.st.removalDelay)) : b._close())
        }, _close: function () {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {marginRight: ""};
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        }, updateSize: function (a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth, d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        }, updateItemHTML: function () {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        }, appendContent: function (a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        }, parseEl: function (c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {el: a(e)} : (d = e.type, e = {data: e, src: e.src}), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++) if (e.el.hasClass("mfp-" + f[g])) {
                    d = f[g];
                    break
                }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        }, addGroup: function (a, c) {
            var d = function (d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        }, _openClick: function (c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g) if (a.isFunction(g)) {
                    if (!g.call(b)) return !0
                } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        }, updateStatus: function (a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {status: a, text: d};
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        }, _checkIfClose: function (c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick, e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        }, _addClassToMFP: function (a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        }, _removeClassFromMFP: function (a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        }, _hasScrollBar: function (a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        }, _setFocus: function () {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        }, _onFocusIn: function (c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        }, _parseMarkup: function (b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function (b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function () {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function (b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function (c) {
        A();
        var d = a(this);
        if ("string" == typeof c) if ("open" === c) {
            var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup, g = parseInt(arguments[1], 10) || 0;
            f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({mfpEl: e}, d, f)
        } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1)); else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline", G = function () {
        E && (D.after(E.addClass(C)).detach(), E = null)
    };
    a.magnificPopup.registerModule(F, {
        options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
        proto: {
            initInline: function () {
                b.types.push(F), w(h + "." + F, function () {
                    G()
                })
            }, getInline: function (c, d) {
                if (G(), c.src) {
                    var e = b.st.inline, f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax", J = function () {
        H && a(document.body).removeClass(H)
    }, K = function () {
        J(), b.req && b.req.abort()
    };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            }, getAjax: function (c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src, success: function (d, e, f) {
                        var g = {data: d, xhr: f};
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    }, error: function () {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function (c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var c = b.st.image, d = ".image";
                b.types.push("image"), w(m + d, function () {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function () {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            }, resizeImage: function () {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            }, _onImageHasSize: function (a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            }, findImageSize: function (a) {
                var c = 0, d = a.img[0], e = function (f) {
                    L && clearInterval(L), L = setInterval(function () {
                        return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                    }, f)
                };
                e(1)
            }, getImage: function (c, d) {
                var e = 0, f = function () {
                    c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                }, g = function () {
                    c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                }, h = b.st.image, i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function () {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1, easing: "ease-in-out", duration: 300, opener: function (a) {
                return a.is("img") ? a : a.find("img")
            }
        }, proto: {
            initZoom: function () {
                var a, c = b.st.zoom, d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration, j = function (a) {
                        var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            d = "all " + c.duration / 1e3 + "s " + c.easing, e = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                    }, k = function () {
                        b.content.css("visibility", "visible")
                    };
                    w("BuildControls" + d, function () {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                                f.css(b._getOffset(!0)), e = setTimeout(function () {
                                    k(), setTimeout(function () {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function () {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function () {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === b.currItem.type
            }, _getItemToZoom: function () {
                return b.currItem.hasSize ? b.currItem.img : !1
            }, _getOffset: function (c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(), f = parseInt(d.css("padding-top"), 10), g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {width: d.width(), height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f};
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe", Q = "//about:blank", R = function (a) {
        if (b.currTemplate[P]) {
            var c = b.currTemplate[P].find("iframe");
            c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
        }
    };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                b.types.push(P), w("BeforeChange", function (a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function () {
                    R()
                })
            }, getIframe: function (c, d) {
                var e = c.src, f = b.st.iframe;
                a.each(f.patterns, function () {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function (a) {
        var c = b.items.length;
        return a > c - 1 ? a - c : 0 > a ? c + a : a
    }, T = function (a, b, c) {
        return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
    };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var c = b.st.gallery, e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function (a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function (a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function (a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function () {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function () {
                            b.prev()
                        }), f.click(function () {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function () {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function () {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            }, next: function () {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            }, prev: function () {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            }, goTo: function (a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            }, preloadNearbyImages: function () {
                var a, c = b.st.gallery.preload, d = Math.min(c[0], b.items.length), e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            }, _preloadItem: function (c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
                        d.hasSize = !0
                    }).on("error.mfploader", function () {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function (a) {
                return a.src.replace(/\.\w+$/, function (a) {
                    return "@2x" + a
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina, c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
                        b.img.css({"max-width": b.img[0].naturalWidth / c, width: "100%"})
                    }), w("ElementParse." + U, function (b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
    // universal module definition
    /*jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
            return factory(window, jQuery);
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('jquery')
        );
    } else {
        // browser global
        window.jQueryBridget = factory(
            window,
            window.jQuery
        );
    }

}(window, function factory(window, jQuery) {
    'use strict';

// ----- utils ----- //

    var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
    var console = window.console;
    var logError = typeof console == 'undefined' ? function () {
        } :
        function (message) {
            console.error(message);
        };

// ----- jQueryBridget ----- //

    function jQueryBridget(namespace, PluginClass, $) {
        $ = $ || jQuery || window.jQuery;
        if (!$) {
            return;
        }

        // add option method -> $().plugin('option', {...})
        if (!PluginClass.prototype.option) {
            // option setter
            PluginClass.prototype.option = function (opts) {
                // bail out if not an object
                if (!$.isPlainObject(opts)) {
                    return;
                }
                this.options = $.extend(true, this.options, opts);
            };
        }

        // make jQuery plugin
        $.fn[namespace] = function (arg0 /*, arg1 */) {
            if (typeof arg0 == 'string') {
                // method call $().plugin( 'methodName', { options } )
                // shift arguments by 1
                var args = arraySlice.call(arguments, 1);
                return methodCall(this, arg0, args);
            }
            // just $().plugin({ options })
            plainCall(this, arg0);
            return this;
        };

        // $().plugin('methodName')
        function methodCall($elems, methodName, args) {
            var returnValue;
            var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

            $elems.each(function (i, elem) {
                // get instance
                var instance = $.data(elem, namespace);
                if (!instance) {
                    logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
                        pluginMethodStr);
                    return;
                }

                var method = instance[methodName];
                if (!method || methodName.charAt(0) == '_') {
                    logError(pluginMethodStr + ' is not a valid method');
                    return;
                }

                // apply method, get return value
                var value = method.apply(instance, args);
                // set return value if value is returned, use only first value
                returnValue = returnValue === undefined ? value : returnValue;
            });

            return returnValue !== undefined ? returnValue : $elems;
        }

        function plainCall($elems, options) {
            $elems.each(function (i, elem) {
                var instance = $.data(elem, namespace);
                if (instance) {
                    // set options & init
                    instance.option(options);
                    instance._init();
                } else {
                    // initialize new instance
                    instance = new PluginClass(elem, options);
                    $.data(elem, namespace, instance);
                }
            });
        }

        updateJQuery($);

    }

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
    function updateJQuery($) {
        if (!$ || ($ && $.bridget)) {
            return;
        }
        $.bridget = jQueryBridget;
    }

    updateJQuery(jQuery || window.jQuery);

// -----  ----- //

    return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('ev-emitter/ev-emitter', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory();
    } else {
        // Browser globals
        global.EvEmitter = factory();
    }

}(typeof window != 'undefined' ? window : this, function () {


    function EvEmitter() {
    }

    var proto = EvEmitter.prototype;

    proto.on = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // set events hash
        var events = this._events = this._events || {};
        // set listeners array
        var listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }

        return this;
    };

    proto.once = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners object
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        // set flag
        onceListeners[listener] = true;

        return this;
    };

    proto.off = function (eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }

        return this;
    };

    proto.emitEvent = function (eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];

        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i]
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }

        return this;
    };

    proto.allOff = function () {
        delete this._events;
        delete this._onceEvents;
    };

    return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

(function (window, factory) {
    /* jshint strict: false */ /* globals define, module */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('get-size/get-size', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // browser global
        window.getSize = factory();
    }

})(window, function factory() {
    'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
    function getStyleSize(value) {
        var num = parseFloat(value);
        // not a percent like '100%', and a number
        var isValid = value.indexOf('%') == -1 && !isNaN(num);
        return isValid && num;
    }

    function noop() {
    }

    var logError = typeof console == 'undefined' ? noop :
        function (message) {
            console.error(message);
        };

// -------------------------- measurements -------------------------- //

    var measurements = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth'
    ];

    var measurementsLength = measurements.length;

    function getZeroSize() {
        var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
        }
        return size;
    }

// -------------------------- getStyle -------------------------- //

    /**
     * getStyle, get style of element, check for Firefox bug
     * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
     */
    function getStyle(elem) {
        var style = getComputedStyle(elem);
        if (!style) {
            logError('Style returned ' + style +
                '. Are you running this code in a hidden iframe on Firefox? ' +
                'See https://bit.ly/getsizebug1');
        }
        return style;
    }

// -------------------------- setup -------------------------- //

    var isSetup = false;

    var isBoxSizeOuter;

    /**
     * setup
     * check isBoxSizerOuter
     * do on first getSize() rather than on page load for Firefox bug
     */
    function setup() {
        // setup once
        if (isSetup) {
            return;
        }
        isSetup = true;

        // -------------------------- box sizing -------------------------- //

        /**
         * Chrome & Safari measure the outer-width on style.width on border-box elems
         * IE11 & Firefox<29 measures the inner-width
         */
        var div = document.createElement('div');
        div.style.width = '200px';
        div.style.padding = '1px 2px 3px 4px';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px 2px 3px 4px';
        div.style.boxSizing = 'border-box';

        var body = document.body || document.documentElement;
        body.appendChild(div);
        var style = getStyle(div);
        // round value for browser zoom. desandro/masonry#928
        isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
        getSize.isBoxSizeOuter = isBoxSizeOuter;

        body.removeChild(div);
    }

// -------------------------- getSize -------------------------- //

    function getSize(elem) {
        setup();

        // use querySeletor if elem is string
        if (typeof elem == 'string') {
            elem = document.querySelector(elem);
        }

        // do not proceed on non-objects
        if (!elem || typeof elem != 'object' || !elem.nodeType) {
            return;
        }

        var style = getStyle(elem);

        // if hidden, everything is 0
        if (style.display == 'none') {
            return getZeroSize();
        }

        var size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;

        var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

        // get all measurements
        for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            var value = style[measurement];
            var num = parseFloat(value);
            // any 'auto', 'medium' value will be 0
            size[measurement] = !isNaN(num) ? num : 0;
        }

        var paddingWidth = size.paddingLeft + size.paddingRight;
        var paddingHeight = size.paddingTop + size.paddingBottom;
        var marginWidth = size.marginLeft + size.marginRight;
        var marginHeight = size.marginTop + size.marginBottom;
        var borderWidth = size.borderLeftWidth + size.borderRightWidth;
        var borderHeight = size.borderTopWidth + size.borderBottomWidth;

        var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

        // overwrite width and height if we can get it from style
        var styleWidth = getStyleSize(style.width);
        if (styleWidth !== false) {
            size.width = styleWidth +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
        }

        var styleHeight = getStyleSize(style.height);
        if (styleHeight !== false) {
            size.height = styleHeight +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
        }

        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);

        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;

        return size;
    }

    return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
    /*global define: false, module: false */
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('desandro-matches-selector/matches-selector', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // browser global
        window.matchesSelector = factory();
    }

}(window, function factory() {
    'use strict';

    var matchesMethod = (function () {
        var ElemProto = window.Element.prototype;
        // check for the standard method name first
        if (ElemProto.matches) {
            return 'matches';
        }
        // check un-prefixed
        if (ElemProto.matchesSelector) {
            return 'matchesSelector';
        }
        // check vendor prefixes
        var prefixes = ['webkit', 'moz', 'ms', 'o'];

        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var method = prefix + 'MatchesSelector';
            if (ElemProto[method]) {
                return method;
            }
        }
    })();

    return function matchesSelector(elem, selector) {
        return elem[matchesMethod](selector);
    };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
    // universal module definition
    /*jshint strict: false */ /*globals define, module, require */

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('fizzy-ui-utils/utils', [
            'desandro-matches-selector/matches-selector'
        ], function (matchesSelector) {
            return factory(window, matchesSelector);
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('desandro-matches-selector')
        );
    } else {
        // browser global
        window.fizzyUIUtils = factory(
            window,
            window.matchesSelector
        );
    }

}(window, function factory(window, matchesSelector) {


    var utils = {};

// ----- extend ----- //

// extends objects
    utils.extend = function (a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };

// ----- modulo ----- //

    utils.modulo = function (num, div) {
        return ((num % div) + div) % div;
    };

// ----- makeArray ----- //

    var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
    utils.makeArray = function (obj) {
        if (Array.isArray(obj)) {
            // use object if already an array
            return obj;
        }
        // return empty array if undefined or null. #6
        if (obj === null || obj === undefined) {
            return [];
        }

        var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
        if (isArrayLike) {
            // convert nodeList to array
            return arraySlice.call(obj);
        }

        // array of single index
        return [obj];
    };

// ----- removeFrom ----- //

    utils.removeFrom = function (ary, obj) {
        var index = ary.indexOf(obj);
        if (index != -1) {
            ary.splice(index, 1);
        }
    };

// ----- getParent ----- //

    utils.getParent = function (elem, selector) {
        while (elem.parentNode && elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
                return elem;
            }
        }
    };

// ----- getQueryElement ----- //

// use element as selector string
    utils.getQueryElement = function (elem) {
        if (typeof elem == 'string') {
            return document.querySelector(elem);
        }
        return elem;
    };

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
    utils.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

// ----- filterFindElements ----- //

    utils.filterFindElements = function (elems, selector) {
        // make array of elems
        elems = utils.makeArray(elems);
        var ffElems = [];

        elems.forEach(function (elem) {
            // check that elem is an actual element
            if (!(elem instanceof HTMLElement)) {
                return;
            }
            // add elem if no selector
            if (!selector) {
                ffElems.push(elem);
                return;
            }
            // filter & find items if we have a selector
            // filter
            if (matchesSelector(elem, selector)) {
                ffElems.push(elem);
            }
            // find children
            var childElems = elem.querySelectorAll(selector);
            // concat childElems to filterFound array
            for (var i = 0; i < childElems.length; i++) {
                ffElems.push(childElems[i]);
            }
        });

        return ffElems;
    };

// ----- debounceMethod ----- //

    utils.debounceMethod = function (_class, methodName, threshold) {
        threshold = threshold || 100;
        // original method
        var method = _class.prototype[methodName];
        var timeoutName = methodName + 'Timeout';

        _class.prototype[methodName] = function () {
            var timeout = this[timeoutName];
            clearTimeout(timeout);

            var args = arguments;
            var _this = this;
            this[timeoutName] = setTimeout(function () {
                method.apply(_this, args);
                delete _this[timeoutName];
            }, threshold);
        };
    };

// ----- docReady ----- //

    utils.docReady = function (callback) {
        var readyState = document.readyState;
        if (readyState == 'complete' || readyState == 'interactive') {
            // do async to allow for other scripts to run. metafizzy/flickity#441
            setTimeout(callback);
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
    utils.toDashed = function (str) {
        return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
            return $1 + '-' + $2;
        }).toLowerCase();
    };

    var console = window.console;
    /**
     * allow user to initialize classes via [data-namespace] or .js-namespace class
     * htmlInit( Widget, 'widgetName' )
     * options are parsed from data-namespace-options
     */
    utils.htmlInit = function (WidgetClass, namespace) {
        utils.docReady(function () {
            var dashedNamespace = utils.toDashed(namespace);
            var dataAttr = 'data-' + dashedNamespace;
            var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
            var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
            var elems = utils.makeArray(dataAttrElems)
                .concat(utils.makeArray(jsDashElems));
            var dataOptionsAttr = dataAttr + '-options';
            var jQuery = window.jQuery;

            elems.forEach(function (elem) {
                var attr = elem.getAttribute(dataAttr) ||
                    elem.getAttribute(dataOptionsAttr);
                var options;
                try {
                    options = attr && JSON.parse(attr);
                } catch (error) {
                    // log error, do not initialize
                    if (console) {
                        console.error('Error parsing ' + dataAttr + ' on ' + elem.className +
                            ': ' + error);
                    }
                    return;
                }
                // initialize
                var instance = new WidgetClass(elem, options);
                // make available via $().data('namespace')
                if (jQuery) {
                    jQuery.data(elem, namespace, instance);
                }
            });

        });
    };

// -----  ----- //

    return utils;

}));

/**
 * Outlayer Item
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('outlayer/item', [
                'ev-emitter/ev-emitter',
                'get-size/get-size'
            ],
            factory
        );
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory(
            require('ev-emitter'),
            require('get-size')
        );
    } else {
        // browser global
        window.Outlayer = {};
        window.Outlayer.Item = factory(
            window.EvEmitter,
            window.getSize
        );
    }

}(window, function factory(EvEmitter, getSize) {
    'use strict';

// ----- helpers ----- //

    function isEmptyObj(obj) {
        for (var prop in obj) {
            return false;
        }
        prop = null;
        return true;
    }

// -------------------------- CSS3 support -------------------------- //


    var docElemStyle = document.documentElement.style;

    var transitionProperty = typeof docElemStyle.transition == 'string' ?
        'transition' : 'WebkitTransition';
    var transformProperty = typeof docElemStyle.transform == 'string' ?
        'transform' : 'WebkitTransform';

    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend'
    }[transitionProperty];

// cache all vendor properties that could have vendor prefix
    var vendorProperties = {
        transform: transformProperty,
        transition: transitionProperty,
        transitionDuration: transitionProperty + 'Duration',
        transitionProperty: transitionProperty + 'Property',
        transitionDelay: transitionProperty + 'Delay'
    };

// -------------------------- Item -------------------------- //

    function Item(element, layout) {
        if (!element) {
            return;
        }

        this.element = element;
        // parent layout class, i.e. Masonry, Isotope, or Packery
        this.layout = layout;
        this.position = {
            x: 0,
            y: 0
        };

        this._create();
    }

// inherit EvEmitter
    var proto = Item.prototype = Object.create(EvEmitter.prototype);
    proto.constructor = Item;

    proto._create = function () {
        // transition objects
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };

        this.css({
            position: 'absolute'
        });
    };

// trigger specified handler for event type
    proto.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    proto.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * apply CSS styles to element
     * @param {Object} style
     */
    proto.css = function (style) {
        var elemStyle = this.element.style;

        for (var prop in style) {
            // use vendor property if available
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop];
        }
    };

    // measure position, and sets it
    proto.getPosition = function () {
        var style = getComputedStyle(this.element);
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');
        var xValue = style[isOriginLeft ? 'left' : 'right'];
        var yValue = style[isOriginTop ? 'top' : 'bottom'];
        var x = parseFloat(xValue);
        var y = parseFloat(yValue);
        // convert percent to pixels
        var layoutSize = this.layout.size;
        if (xValue.indexOf('%') != -1) {
            x = (x / 100) * layoutSize.width;
        }
        if (yValue.indexOf('%') != -1) {
            y = (y / 100) * layoutSize.height;
        }
        // clean up 'auto' or other non-integer values
        x = isNaN(x) ? 0 : x;
        y = isNaN(y) ? 0 : y;
        // remove padding from measurement
        x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
        y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

        this.position.x = x;
        this.position.y = y;
    };

// set settled position, apply padding
    proto.layoutPosition = function () {
        var layoutSize = this.layout.size;
        var style = {};
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');

        // x
        var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
        var xProperty = isOriginLeft ? 'left' : 'right';
        var xResetProperty = isOriginLeft ? 'right' : 'left';

        var x = this.position.x + layoutSize[xPadding];
        // set in percentage or pixels
        style[xProperty] = this.getXValue(x);
        // reset other property
        style[xResetProperty] = '';

        // y
        var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
        var yProperty = isOriginTop ? 'top' : 'bottom';
        var yResetProperty = isOriginTop ? 'bottom' : 'top';

        var y = this.position.y + layoutSize[yPadding];
        // set in percentage or pixels
        style[yProperty] = this.getYValue(y);
        // reset other property
        style[yResetProperty] = '';

        this.css(style);
        this.emitEvent('layout', [this]);
    };

    proto.getXValue = function (x) {
        var isHorizontal = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && !isHorizontal ?
            ((x / this.layout.size.width) * 100) + '%' : x + 'px';
    };

    proto.getYValue = function (y) {
        var isHorizontal = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && isHorizontal ?
            ((y / this.layout.size.height) * 100) + '%' : y + 'px';
    };

    proto._transitionTo = function (x, y) {
        this.getPosition();
        // get current x & y from top/left
        var curX = this.position.x;
        var curY = this.position.y;

        var didNotMove = x == this.position.x && y == this.position.y;

        // save end position
        this.setPosition(x, y);

        // if did not move and not transitioning, just go to layout
        if (didNotMove && !this.isTransitioning) {
            this.layoutPosition();
            return;
        }

        var transX = x - curX;
        var transY = y - curY;
        var transitionStyle = {};
        transitionStyle.transform = this.getTranslate(transX, transY);

        this.transition({
            to: transitionStyle,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: true
        });
    };

    proto.getTranslate = function (x, y) {
        // flip cooridinates if origin on right or bottom
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');
        x = isOriginLeft ? x : -x;
        y = isOriginTop ? y : -y;
        return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    };

// non transition + transform support
    proto.goTo = function (x, y) {
        this.setPosition(x, y);
        this.layoutPosition();
    };

    proto.moveTo = proto._transitionTo;

    proto.setPosition = function (x, y) {
        this.position.x = parseFloat(x);
        this.position.y = parseFloat(y);
    };

// ----- transition ----- //

    /**
     * @param {Object} style - CSS
     * @param {Function} onTransitionEnd
     */

// non transition, just trigger callback
    proto._nonTransition = function (args) {
        this.css(args.to);
        if (args.isCleaning) {
            this._removeStyles(args.to);
        }
        for (var prop in args.onTransitionEnd) {
            args.onTransitionEnd[prop].call(this);
        }
    };

    /**
     * proper transition
     * @param {Object} args - arguments
     *   @param {Object} to - style to transition to
     *   @param {Object} from - style to start transition from
     *   @param {Boolean} isCleaning - removes transition styles after transition
     *   @param {Function} onTransitionEnd - callback
     */
    proto.transition = function (args) {
        // redirect to nonTransition if no transition duration
        if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(args);
            return;
        }

        var _transition = this._transn;
        // keep track of onTransitionEnd callback by css property
        for (var prop in args.onTransitionEnd) {
            _transition.onEnd[prop] = args.onTransitionEnd[prop];
        }
        // keep track of properties that are transitioning
        for (prop in args.to) {
            _transition.ingProperties[prop] = true;
            // keep track of properties to clean up when transition is done
            if (args.isCleaning) {
                _transition.clean[prop] = true;
            }
        }

        // set from styles
        if (args.from) {
            this.css(args.from);
            // force redraw. http://blog.alexmaccaw.com/css-transitions
            var h = this.element.offsetHeight;
            // hack for JSHint to hush about unused var
            h = null;
        }
        // enable transition
        this.enableTransition(args.to);
        // set styles that are transitioning
        this.css(args.to);

        this.isTransitioning = true;

    };

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
    function toDashedAll(str) {
        return str.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    var transitionProps = 'opacity,' + toDashedAll(transformProperty);

    proto.enableTransition = function (/* style */) {
        // HACK changing transitionProperty during a transition
        // will cause transition to jump
        if (this.isTransitioning) {
            return;
        }

        // make `transition: foo, bar, baz` from style object
        // HACK un-comment this when enableTransition can work
        // while a transition is happening
        // var transitionValues = [];
        // for ( var prop in style ) {
        //   // dash-ify camelCased properties like WebkitTransition
        //   prop = vendorProperties[ prop ] || prop;
        //   transitionValues.push( toDashedAll( prop ) );
        // }
        // munge number to millisecond, to match stagger
        var duration = this.layout.options.transitionDuration;
        duration = typeof duration == 'number' ? duration + 'ms' : duration;
        // enable transition styles
        this.css({
            transitionProperty: transitionProps,
            transitionDuration: duration,
            transitionDelay: this.staggerDelay || 0
        });
        // listen for transition end event
        this.element.addEventListener(transitionEndEvent, this, false);
    };

// ----- events ----- //

    proto.onwebkitTransitionEnd = function (event) {
        this.ontransitionend(event);
    };

    proto.onotransitionend = function (event) {
        this.ontransitionend(event);
    };

// properties that I munge to make my life easier
    var dashedVendorProperties = {
        '-webkit-transform': 'transform'
    };

    proto.ontransitionend = function (event) {
        // disregard bubbled events from children
        if (event.target !== this.element) {
            return;
        }
        var _transition = this._transn;
        // get property name of transitioned property, convert to prefix-free
        var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

        // remove property that has completed transitioning
        delete _transition.ingProperties[propertyName];
        // check if any properties are still transitioning
        if (isEmptyObj(_transition.ingProperties)) {
            // all properties have completed transitioning
            this.disableTransition();
        }
        // clean style
        if (propertyName in _transition.clean) {
            // clean up style
            this.element.style[event.propertyName] = '';
            delete _transition.clean[propertyName];
        }
        // trigger onTransitionEnd callback
        if (propertyName in _transition.onEnd) {
            var onTransitionEnd = _transition.onEnd[propertyName];
            onTransitionEnd.call(this);
            delete _transition.onEnd[propertyName];
        }

        this.emitEvent('transitionEnd', [this]);
    };

    proto.disableTransition = function () {
        this.removeTransitionStyles();
        this.element.removeEventListener(transitionEndEvent, this, false);
        this.isTransitioning = false;
    };

    /**
     * removes style property from element
     * @param {Object} style
     **/
    proto._removeStyles = function (style) {
        // clean up transition styles
        var cleanStyle = {};
        for (var prop in style) {
            cleanStyle[prop] = '';
        }
        this.css(cleanStyle);
    };

    var cleanTransitionStyle = {
        transitionProperty: '',
        transitionDuration: '',
        transitionDelay: ''
    };

    proto.removeTransitionStyles = function () {
        // remove transition
        this.css(cleanTransitionStyle);
    };

// ----- stagger ----- //

    proto.stagger = function (delay) {
        delay = isNaN(delay) ? 0 : delay;
        this.staggerDelay = delay + 'ms';
    };

// ----- show/hide/remove ----- //

// remove element from DOM
    proto.removeElem = function () {
        this.element.parentNode.removeChild(this.element);
        // remove display: none
        this.css({display: ''});
        this.emitEvent('remove', [this]);
    };

    proto.remove = function () {
        // just remove element if no transition support or no transition
        if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return;
        }

        // start transition
        this.once('transitionEnd', function () {
            this.removeElem();
        });
        this.hide();
    };

    proto.reveal = function () {
        delete this.isHidden;
        // remove display: none
        this.css({display: ''});

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
        onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

        this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    proto.onRevealTransitionEnd = function () {
        // check if still visible
        // during transition, item may have been hidden
        if (!this.isHidden) {
            this.emitEvent('reveal');
        }
    };

    /**
     * get style property use for hide/reveal transition end
     * @param {String} styleProperty - hiddenStyle/visibleStyle
     * @returns {String}
     */
    proto.getHideRevealTransitionEndProperty = function (styleProperty) {
        var optionStyle = this.layout.options[styleProperty];
        // use opacity
        if (optionStyle.opacity) {
            return 'opacity';
        }
        // get first property
        for (var prop in optionStyle) {
            return prop;
        }
    };

    proto.hide = function () {
        // set flag
        this.isHidden = true;
        // remove display: none
        this.css({display: ''});

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
        onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

        this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            // keep hidden stuff hidden
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    proto.onHideTransitionEnd = function () {
        // check if still hidden
        // during transition, item may have been un-hidden
        if (this.isHidden) {
            this.css({display: 'none'});
            this.emitEvent('hide');
        }
    };

    proto.destroy = function () {
        this.css({
            position: '',
            left: '',
            right: '',
            top: '',
            bottom: '',
            transition: '',
            transform: ''
        });
    };

    return Item;

}));

/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

(function (window, factory) {
    'use strict';
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('outlayer/outlayer', [
                'ev-emitter/ev-emitter',
                'get-size/get-size',
                'fizzy-ui-utils/utils',
                './item'
            ],
            function (EvEmitter, getSize, utils, Item) {
                return factory(window, EvEmitter, getSize, utils, Item);
            }
        );
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory(
            window,
            require('ev-emitter'),
            require('get-size'),
            require('fizzy-ui-utils'),
            require('./item')
        );
    } else {
        // browser global
        window.Outlayer = factory(
            window,
            window.EvEmitter,
            window.getSize,
            window.fizzyUIUtils,
            window.Outlayer.Item
        );
    }

}(window, function factory(window, EvEmitter, getSize, utils, Item) {
    'use strict';

// ----- vars ----- //

    var console = window.console;
    var jQuery = window.jQuery;
    var noop = function () {
    };

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
    var GUID = 0;
// internal store of all Outlayer intances
    var instances = {};


    /**
     * @param {Element, String} element
     * @param {Object} options
     * @constructor
     */
    function Outlayer(element, options) {
        var queryElement = utils.getQueryElement(element);
        if (!queryElement) {
            if (console) {
                console.error('Bad element for ' + this.constructor.namespace +
                    ': ' + (queryElement || element));
            }
            return;
        }
        this.element = queryElement;
        // add jQuery
        if (jQuery) {
            this.$element = jQuery(this.element);
        }

        // options
        this.options = utils.extend({}, this.constructor.defaults);
        this.option(options);

        // add id for Outlayer.getFromElement
        var id = ++GUID;
        this.element.outlayerGUID = id; // expando
        instances[id] = this; // associate via id

        // kick it off
        this._create();

        var isInitLayout = this._getOption('initLayout');
        if (isInitLayout) {
            this.layout();
        }
    }

// settings are for internal use only
    Outlayer.namespace = 'outlayer';
    Outlayer.Item = Item;

// default options
    Outlayer.defaults = {
        containerStyle: {
            position: 'relative'
        },
        initLayout: true,
        originLeft: true,
        originTop: true,
        resize: true,
        resizeContainer: true,
        // item options
        transitionDuration: '0.4s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        }
    };

    var proto = Outlayer.prototype;
// inherit EvEmitter
    utils.extend(proto, EvEmitter.prototype);

    /**
     * set options
     * @param {Object} opts
     */
    proto.option = function (opts) {
        utils.extend(this.options, opts);
    };

    /**
     * get backwards compatible option value, check old name
     */
    proto._getOption = function (option) {
        var oldOption = this.constructor.compatOptions[option];
        return oldOption && this.options[oldOption] !== undefined ?
            this.options[oldOption] : this.options[option];
    };

    Outlayer.compatOptions = {
        // currentName: oldName
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer'
    };

    proto._create = function () {
        // get items from children
        this.reloadItems();
        // elements that affect layout, but are not laid out
        this.stamps = [];
        this.stamp(this.options.stamp);
        // set container style
        utils.extend(this.element.style, this.options.containerStyle);

        // bind resize method
        var canBindResize = this._getOption('resize');
        if (canBindResize) {
            this.bindResize();
        }
    };

// goes through all children again and gets bricks in proper order
    proto.reloadItems = function () {
        // collection of item elements
        this.items = this._itemize(this.element.children);
    };


    /**
     * turn elements into Outlayer.Items to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - collection of new Outlayer Items
     */
    proto._itemize = function (elems) {

        var itemElems = this._filterFindItemElements(elems);
        var Item = this.constructor.Item;

        // create new Outlayer Items for collection
        var items = [];
        for (var i = 0; i < itemElems.length; i++) {
            var elem = itemElems[i];
            var item = new Item(elem, this);
            items.push(item);
        }

        return items;
    };

    /**
     * get item elements to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - item elements
     */
    proto._filterFindItemElements = function (elems) {
        return utils.filterFindElements(elems, this.options.itemSelector);
    };

    /**
     * getter method for getting item elements
     * @returns {Array} elems - collection of item elements
     */
    proto.getItemElements = function () {
        return this.items.map(function (item) {
            return item.element;
        });
    };

// ----- init & layout ----- //

    /**
     * lays out all items
     */
    proto.layout = function () {
        this._resetLayout();
        this._manageStamps();

        // don't animate first layout
        var layoutInstant = this._getOption('layoutInstant');
        var isInstant = layoutInstant !== undefined ?
            layoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant);

        // flag for initalized
        this._isLayoutInited = true;
    };

// _init is alias for layout
    proto._init = proto.layout;

    /**
     * logic before any new layout
     */
    proto._resetLayout = function () {
        this.getSize();
    };


    proto.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * get measurement from option, for columnWidth, rowHeight, gutter
     * if option is String -> get element from selector string, & get size of element
     * if option is Element -> get size of element
     * else use option as a number
     *
     * @param {String} measurement
     * @param {String} size - width or height
     * @private
     */
    proto._getMeasurement = function (measurement, size) {
        var option = this.options[measurement];
        var elem;
        if (!option) {
            // default to 0
            this[measurement] = 0;
        } else {
            // use option as an element
            if (typeof option == 'string') {
                elem = this.element.querySelector(option);
            } else if (option instanceof HTMLElement) {
                elem = option;
            }
            // use size of element, if element
            this[measurement] = elem ? getSize(elem)[size] : option;
        }
    };

    /**
     * layout a collection of item elements
     * @api public
     */
    proto.layoutItems = function (items, isInstant) {
        items = this._getItemsForLayout(items);

        this._layoutItems(items, isInstant);

        this._postLayout();
    };

    /**
     * get the items to be laid out
     * you may want to skip over some items
     * @param {Array} items
     * @returns {Array} items
     */
    proto._getItemsForLayout = function (items) {
        return items.filter(function (item) {
            return !item.isIgnored;
        });
    };

    /**
     * layout items
     * @param {Array} items
     * @param {Boolean} isInstant
     */
    proto._layoutItems = function (items, isInstant) {
        this._emitCompleteOnItems('layout', items);

        if (!items || !items.length) {
            // no items, emit event with empty array
            return;
        }

        var queue = [];

        items.forEach(function (item) {
            // get x/y object from method
            var position = this._getItemLayoutPosition(item);
            // enqueue
            position.item = item;
            position.isInstant = isInstant || item.isLayoutInstant;
            queue.push(position);
        }, this);

        this._processLayoutQueue(queue);
    };

    /**
     * get item layout position
     * @param {Outlayer.Item} item
     * @returns {Object} x and y position
     */
    proto._getItemLayoutPosition = function ( /* item */) {
        return {
            x: 0,
            y: 0
        };
    };

    /**
     * iterate over array and position each item
     * Reason being - separating this logic prevents 'layout invalidation'
     * thx @paul_irish
     * @param {Array} queue
     */
    proto._processLayoutQueue = function (queue) {
        this.updateStagger();
        queue.forEach(function (obj, i) {
            this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
        }, this);
    };

// set stagger from option in milliseconds number
    proto.updateStagger = function () {
        var stagger = this.options.stagger;
        if (stagger === null || stagger === undefined) {
            this.stagger = 0;
            return;
        }
        this.stagger = getMilliseconds(stagger);
        return this.stagger;
    };

    /**
     * Sets position of item in DOM
     * @param {Outlayer.Item} item
     * @param {Number} x - horizontal position
     * @param {Number} y - vertical position
     * @param {Boolean} isInstant - disables transitions
     */
    proto._positionItem = function (item, x, y, isInstant, i) {
        if (isInstant) {
            // if not transition, just set CSS
            item.goTo(x, y);
        } else {
            item.stagger(i * this.stagger);
            item.moveTo(x, y);
        }
    };

    /**
     * Any logic you want to do after each layout,
     * i.e. size the container
     */
    proto._postLayout = function () {
        this.resizeContainer();
    };

    proto.resizeContainer = function () {
        var isResizingContainer = this._getOption('resizeContainer');
        if (!isResizingContainer) {
            return;
        }
        var size = this._getContainerSize();
        if (size) {
            this._setContainerMeasure(size.width, true);
            this._setContainerMeasure(size.height, false);
        }
    };

    /**
     * Sets width or height of container if returned
     * @returns {Object} size
     *   @param {Number} width
     *   @param {Number} height
     */
    proto._getContainerSize = noop;

    /**
     * @param {Number} measure - size of width or height
     * @param {Boolean} isWidth
     */
    proto._setContainerMeasure = function (measure, isWidth) {
        if (measure === undefined) {
            return;
        }

        var elemSize = this.size;
        // add padding and border width if border box
        if (elemSize.isBorderBox) {
            measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
                elemSize.borderLeftWidth + elemSize.borderRightWidth :
                elemSize.paddingBottom + elemSize.paddingTop +
                elemSize.borderTopWidth + elemSize.borderBottomWidth;
        }

        measure = Math.max(measure, 0);
        this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
    };

    /**
     * emit eventComplete on a collection of items events
     * @param {String} eventName
     * @param {Array} items - Outlayer.Items
     */
    proto._emitCompleteOnItems = function (eventName, items) {
        var _this = this;

        function onComplete() {
            _this.dispatchEvent(eventName + 'Complete', null, [items]);
        }

        var count = items.length;
        if (!items || !count) {
            onComplete();
            return;
        }

        var doneCount = 0;

        function tick() {
            doneCount++;
            if (doneCount == count) {
                onComplete();
            }
        }

        // bind callback
        items.forEach(function (item) {
            item.once(eventName, tick);
        });
    };

    /**
     * emits events via EvEmitter and jQuery events
     * @param {String} type - name of event
     * @param {Event} event - original event
     * @param {Array} args - extra arguments
     */
    proto.dispatchEvent = function (type, event, args) {
        // add original event to arguments
        var emitArgs = event ? [event].concat(args) : args;
        this.emitEvent(type, emitArgs);

        if (jQuery) {
            // set this.$element
            this.$element = this.$element || jQuery(this.element);
            if (event) {
                // create jQuery event
                var $event = jQuery.Event(event);
                $event.type = type;
                this.$element.trigger($event, args);
            } else {
                // just trigger with type if no event available
                this.$element.trigger(type, args);
            }
        }
    };

// -------------------------- ignore & stamps -------------------------- //


    /**
     * keep item in collection, but do not lay it out
     * ignored items do not get skipped in layout
     * @param {Element} elem
     */
    proto.ignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            item.isIgnored = true;
        }
    };

    /**
     * return item to layout collection
     * @param {Element} elem
     */
    proto.unignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            delete item.isIgnored;
        }
    };

    /**
     * adds elements to stamps
     * @param {NodeList, Array, Element, or String} elems
     */
    proto.stamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        this.stamps = this.stamps.concat(elems);
        // ignore
        elems.forEach(this.ignore, this);
    };

    /**
     * removes elements to stamps
     * @param {NodeList, Array, or Element} elems
     */
    proto.unstamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        elems.forEach(function (elem) {
            // filter out removed stamp elements
            utils.removeFrom(this.stamps, elem);
            this.unignore(elem);
        }, this);
    };

    /**
     * finds child elements
     * @param {NodeList, Array, Element, or String} elems
     * @returns {Array} elems
     */
    proto._find = function (elems) {
        if (!elems) {
            return;
        }
        // if string, use argument as selector string
        if (typeof elems == 'string') {
            elems = this.element.querySelectorAll(elems);
        }
        elems = utils.makeArray(elems);
        return elems;
    };

    proto._manageStamps = function () {
        if (!this.stamps || !this.stamps.length) {
            return;
        }

        this._getBoundingRect();

        this.stamps.forEach(this._manageStamp, this);
    };

// update boundingLeft / Top
    proto._getBoundingRect = function () {
        // get bounding rect for container element
        var boundingRect = this.element.getBoundingClientRect();
        var size = this.size;
        this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        };
    };

    /**
     * @param {Element} stamp
     **/
    proto._manageStamp = noop;

    /**
     * get x/y position of element relative to container element
     * @param {Element} elem
     * @returns {Object} offset - has left, top, right, bottom
     */
    proto._getElementOffset = function (elem) {
        var boundingRect = elem.getBoundingClientRect();
        var thisRect = this._boundingRect;
        var size = getSize(elem);
        var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
        };
        return offset;
    };

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
    proto.handleEvent = utils.handleEvent;

    /**
     * Bind layout to window resizing
     */
    proto.bindResize = function () {
        window.addEventListener('resize', this);
        this.isResizeBound = true;
    };

    /**
     * Unbind layout to window resizing
     */
    proto.unbindResize = function () {
        window.removeEventListener('resize', this);
        this.isResizeBound = false;
    };

    proto.onresize = function () {
        this.resize();
    };

    utils.debounceMethod(Outlayer, 'onresize', 100);

    proto.resize = function () {
        // don't trigger if size did not change
        // or if resize was unbound. See #9
        if (!this.isResizeBound || !this.needsResizeLayout()) {
            return;
        }

        this.layout();
    };

    /**
     * check if layout is needed post layout
     * @returns Boolean
     */
    proto.needsResizeLayout = function () {
        var size = getSize(this.element);
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var hasSizes = this.size && size;
        return hasSizes && size.innerWidth !== this.size.innerWidth;
    };

// -------------------------- methods -------------------------- //

    /**
     * add items to Outlayer instance
     * @param {Array or NodeList or Element} elems
     * @returns {Array} items - Outlayer.Items
     **/
    proto.addItems = function (elems) {
        var items = this._itemize(elems);
        // add items to collection
        if (items.length) {
            this.items = this.items.concat(items);
        }
        return items;
    };

    /**
     * Layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    proto.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // layout and reveal just the new items
        this.layoutItems(items, true);
        this.reveal(items);
    };

    /**
     * Layout prepended elements
     * @param {Array or NodeList or Element} elems
     */
    proto.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
            return;
        }
        // add items to beginning of collection
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems);
        // start new layout
        this._resetLayout();
        this._manageStamps();
        // layout new stuff without transition
        this.layoutItems(items, true);
        this.reveal(items);
        // layout previous items
        this.layoutItems(previousItems);
    };

    /**
     * reveal a collection of items
     * @param {Array of Outlayer.Items} items
     */
    proto.reveal = function (items) {
        this._emitCompleteOnItems('reveal', items);
        if (!items || !items.length) {
            return;
        }
        var stagger = this.updateStagger();
        items.forEach(function (item, i) {
            item.stagger(i * stagger);
            item.reveal();
        });
    };

    /**
     * hide a collection of items
     * @param {Array of Outlayer.Items} items
     */
    proto.hide = function (items) {
        this._emitCompleteOnItems('hide', items);
        if (!items || !items.length) {
            return;
        }
        var stagger = this.updateStagger();
        items.forEach(function (item, i) {
            item.stagger(i * stagger);
            item.hide();
        });
    };

    /**
     * reveal item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    proto.revealItemElements = function (elems) {
        var items = this.getItems(elems);
        this.reveal(items);
    };

    /**
     * hide item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    proto.hideItemElements = function (elems) {
        var items = this.getItems(elems);
        this.hide(items);
    };

    /**
     * get Outlayer.Item, given an Element
     * @param {Element} elem
     * @param {Function} callback
     * @returns {Outlayer.Item} item
     */
    proto.getItem = function (elem) {
        // loop through items to get the one that matches
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.element == elem) {
                // return item
                return item;
            }
        }
    };

    /**
     * get collection of Outlayer.Items, given Elements
     * @param {Array} elems
     * @returns {Array} items - Outlayer.Items
     */
    proto.getItems = function (elems) {
        elems = utils.makeArray(elems);
        var items = [];
        elems.forEach(function (elem) {
            var item = this.getItem(elem);
            if (item) {
                items.push(item);
            }
        }, this);

        return items;
    };

    /**
     * remove element(s) from instance and DOM
     * @param {Array or NodeList or Element} elems
     */
    proto.remove = function (elems) {
        var removeItems = this.getItems(elems);

        this._emitCompleteOnItems('remove', removeItems);

        // bail if no items to remove
        if (!removeItems || !removeItems.length) {
            return;
        }

        removeItems.forEach(function (item) {
            item.remove();
            // remove item from collection
            utils.removeFrom(this.items, item);
        }, this);
    };

// ----- destroy ----- //

// remove and disable Outlayer instance
    proto.destroy = function () {
        // clean up dynamic styles
        var style = this.element.style;
        style.height = '';
        style.position = '';
        style.width = '';
        // destroy items
        this.items.forEach(function (item) {
            item.destroy();
        });

        this.unbindResize();

        var id = this.element.outlayerGUID;
        delete instances[id]; // remove reference to instance by id
        delete this.element.outlayerGUID;
        // remove data for jQuery
        if (jQuery) {
            jQuery.removeData(this.element, this.constructor.namespace);
        }

    };

// -------------------------- data -------------------------- //

    /**
     * get Outlayer instance from element
     * @param {Element} elem
     * @returns {Outlayer}
     */
    Outlayer.data = function (elem) {
        elem = utils.getQueryElement(elem);
        var id = elem && elem.outlayerGUID;
        return id && instances[id];
    };


// -------------------------- create Outlayer class -------------------------- //

    /**
     * create a layout class
     * @param {String} namespace
     */
    Outlayer.create = function (namespace, options) {
        // sub-class Outlayer
        var Layout = subclass(Outlayer);
        // apply new options and compatOptions
        Layout.defaults = utils.extend({}, Outlayer.defaults);
        utils.extend(Layout.defaults, options);
        Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);

        Layout.namespace = namespace;

        Layout.data = Outlayer.data;

        // sub-class Item
        Layout.Item = subclass(Item);

        // -------------------------- declarative -------------------------- //

        utils.htmlInit(Layout, namespace);

        // -------------------------- jQuery bridge -------------------------- //

        // make into jQuery plugin
        if (jQuery && jQuery.bridget) {
            jQuery.bridget(namespace, Layout);
        }

        return Layout;
    };

    function subclass(Parent) {
        function SubClass() {
            Parent.apply(this, arguments);
        }

        SubClass.prototype = Object.create(Parent.prototype);
        SubClass.prototype.constructor = SubClass;

        return SubClass;
    }

// ----- helpers ----- //

// how many milliseconds are in each unit
    var msUnits = {
        ms: 1,
        s: 1000
    };

// munge time-like parameter into millisecond number
// '0.4s' -> 40
    function getMilliseconds(time) {
        if (typeof time == 'number') {
            return time;
        }
        var matches = time.match(/(^\d*\.?\d*)(\w*)/);
        var num = matches && matches[1];
        var unit = matches && matches[2];
        if (!num.length) {
            return 0;
        }
        num = parseFloat(num);
        var mult = msUnits[unit] || 1;
        return num * mult;
    }

// ----- fin ----- //

// back in global
    Outlayer.Item = Item;

    return Outlayer;

}));

/**
 * Isotope Item
 **/

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope-layout/js/item', [
                'outlayer/outlayer'
            ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('outlayer')
        );
    } else {
        // browser global
        window.Isotope = window.Isotope || {};
        window.Isotope.Item = factory(
            window.Outlayer
        );
    }

}(window, function factory(Outlayer) {
    'use strict';

// -------------------------- Item -------------------------- //

// sub-class Outlayer Item
    function Item() {
        Outlayer.Item.apply(this, arguments);
    }

    var proto = Item.prototype = Object.create(Outlayer.Item.prototype);

    var _create = proto._create;
    proto._create = function () {
        // assign id, used for original-order sorting
        this.id = this.layout.itemGUID++;
        _create.call(this);
        this.sortData = {};
    };

    proto.updateSortData = function () {
        if (this.isIgnored) {
            return;
        }
        // default sorters
        this.sortData.id = this.id;
        // for backward compatibility
        this.sortData['original-order'] = this.id;
        this.sortData.random = Math.random();
        // go thru getSortData obj and apply the sorters
        var getSortData = this.layout.options.getSortData;
        var sorters = this.layout._sorters;
        for (var key in getSortData) {
            var sorter = sorters[key];
            this.sortData[key] = sorter(this.element, this);
        }
    };

    var _destroy = proto.destroy;
    proto.destroy = function () {
        // call super
        _destroy.apply(this, arguments);
        // reset display, #741
        this.css({
            display: ''
        });
    };

    return Item;

}));

/**
 * Isotope LayoutMode
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope-layout/js/layout-mode', [
                'get-size/get-size',
                'outlayer/outlayer'
            ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('get-size'),
            require('outlayer')
        );
    } else {
        // browser global
        window.Isotope = window.Isotope || {};
        window.Isotope.LayoutMode = factory(
            window.getSize,
            window.Outlayer
        );
    }

}(window, function factory(getSize, Outlayer) {
    'use strict';

    // layout mode class
    function LayoutMode(isotope) {
        this.isotope = isotope;
        // link properties
        if (isotope) {
            this.options = isotope.options[this.namespace];
            this.element = isotope.element;
            this.items = isotope.filteredItems;
            this.size = isotope.size;
        }
    }

    var proto = LayoutMode.prototype;

    /**
     * some methods should just defer to default Outlayer method
     * and reference the Isotope instance as `this`
     **/
    var facadeMethods = [
        '_resetLayout',
        '_getItemLayoutPosition',
        '_manageStamp',
        '_getContainerSize',
        '_getElementOffset',
        'needsResizeLayout',
        '_getOption'
    ];

    facadeMethods.forEach(function (methodName) {
        proto[methodName] = function () {
            return Outlayer.prototype[methodName].apply(this.isotope, arguments);
        };
    });

    // -----  ----- //

    // for horizontal layout modes, check vertical size
    proto.needsVerticalResizeLayout = function () {
        // don't trigger if size did not change
        var size = getSize(this.isotope.element);
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var hasSizes = this.isotope.size && size;
        return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
    };

    // ----- measurements ----- //

    proto._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
    };

    proto.getColumnWidth = function () {
        this.getSegmentSize('column', 'Width');
    };

    proto.getRowHeight = function () {
        this.getSegmentSize('row', 'Height');
    };

    /**
     * get columnWidth or rowHeight
     * segment: 'column' or 'row'
     * size 'Width' or 'Height'
     **/
    proto.getSegmentSize = function (segment, size) {
        var segmentName = segment + size;
        var outerSize = 'outer' + size;
        // columnWidth / outerWidth // rowHeight / outerHeight
        this._getMeasurement(segmentName, outerSize);
        // got rowHeight or columnWidth, we can chill
        if (this[segmentName]) {
            return;
        }
        // fall back to item of first element
        var firstItemSize = this.getFirstItemSize();
        this[segmentName] = firstItemSize && firstItemSize[outerSize] ||
            // or size of container
            this.isotope.size['inner' + size];
    };

    proto.getFirstItemSize = function () {
        var firstItem = this.isotope.filteredItems[0];
        return firstItem && firstItem.element && getSize(firstItem.element);
    };

    // ----- methods that should reference isotope ----- //

    proto.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
    };

    proto.getSize = function () {
        this.isotope.getSize();
        this.size = this.isotope.size;
    };

    // -------------------------- create -------------------------- //

    LayoutMode.modes = {};

    LayoutMode.create = function (namespace, options) {

        function Mode() {
            LayoutMode.apply(this, arguments);
        }

        Mode.prototype = Object.create(proto);
        Mode.prototype.constructor = Mode;

        // default options
        if (options) {
            Mode.options = options;
        }

        Mode.prototype.namespace = namespace;
        // register in Isotope
        LayoutMode.modes[namespace] = Mode;

        return Mode;
    };

    return LayoutMode;

}));

/*!
 * Masonry v4.2.1
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('masonry-layout/masonry', [
                'outlayer/outlayer',
                'get-size/get-size'
            ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('outlayer'),
            require('get-size')
        );
    } else {
        // browser global
        window.Masonry = factory(
            window.Outlayer,
            window.getSize
        );
    }

}(window, function factory(Outlayer, getSize) {


// -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var Masonry = Outlayer.create('masonry');
    // isFitWidth -> fitWidth
    Masonry.compatOptions.fitWidth = 'isFitWidth';

    var proto = Masonry.prototype;

    proto._resetLayout = function () {
        this.getSize();
        this._getMeasurement('columnWidth', 'outerWidth');
        this._getMeasurement('gutter', 'outerWidth');
        this.measureColumns();

        // reset column Y
        this.colYs = [];
        for (var i = 0; i < this.cols; i++) {
            this.colYs.push(0);
        }

        this.maxY = 0;
        this.horizontalColIndex = 0;
    };

    proto.measureColumns = function () {
        this.getContainerWidth();
        // if columnWidth is 0, default to outerWidth of first item
        if (!this.columnWidth) {
            var firstItem = this.items[0];
            var firstItemElem = firstItem && firstItem.element;
            // columnWidth fall back to item of first element
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
                // if first elem has no width, default to size of container
                this.containerWidth;
        }

        var columnWidth = this.columnWidth += this.gutter;

        // calculate columns
        var containerWidth = this.containerWidth + this.gutter;
        var cols = containerWidth / columnWidth;
        // fix rounding errors, typically with gutters
        var excess = columnWidth - containerWidth % columnWidth;
        // if overshoot is less than a pixel, round up, otherwise floor it
        var mathMethod = excess && excess < 1 ? 'round' : 'floor';
        cols = Math[mathMethod](cols);
        this.cols = Math.max(cols, 1);
    };

    proto.getContainerWidth = function () {
        // container is parent if fit width
        var isFitWidth = this._getOption('fitWidth');
        var container = isFitWidth ? this.element.parentNode : this.element;
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var size = getSize(container);
        this.containerWidth = size && size.innerWidth;
    };

    proto._getItemLayoutPosition = function (item) {
        item.getSize();
        // how many columns does this brick span
        var remainder = item.size.outerWidth % this.columnWidth;
        var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
        // round if off by 1 pixel, otherwise use ceil
        var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);
        // use horizontal or top column position
        var colPosMethod = this.options.horizontalOrder ?
            '_getHorizontalColPosition' : '_getTopColPosition';
        var colPosition = this[colPosMethod](colSpan, item);
        // position the brick
        var position = {
            x: this.columnWidth * colPosition.col,
            y: colPosition.y
        };
        // apply setHeight to necessary columns
        var setHeight = colPosition.y + item.size.outerHeight;
        var setMax = colSpan + colPosition.col;
        for (var i = colPosition.col; i < setMax; i++) {
            this.colYs[i] = setHeight;
        }

        return position;
    };

    proto._getTopColPosition = function (colSpan) {
        var colGroup = this._getTopColGroup(colSpan);
        // get the minimum Y value from the columns
        var minimumY = Math.min.apply(Math, colGroup);

        return {
            col: colGroup.indexOf(minimumY),
            y: minimumY,
        };
    };

    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    proto._getTopColGroup = function (colSpan) {
        if (colSpan < 2) {
            // if brick spans only one column, use all the column Ys
            return this.colYs;
        }

        var colGroup = [];
        // how many different places could this brick fit horizontally
        var groupCount = this.cols + 1 - colSpan;
        // for each group potential horizontal position
        for (var i = 0; i < groupCount; i++) {
            colGroup[i] = this._getColGroupY(i, colSpan);
        }
        return colGroup;
    };

    proto._getColGroupY = function (col, colSpan) {
        if (colSpan < 2) {
            return this.colYs[col];
        }
        // make an array of colY values for that one group
        var groupColYs = this.colYs.slice(col, col + colSpan);
        // and get the max value of the array
        return Math.max.apply(Math, groupColYs);
    };

    // get column position based on horizontal index. #873
    proto._getHorizontalColPosition = function (colSpan, item) {
        var col = this.horizontalColIndex % this.cols;
        var isOver = colSpan > 1 && col + colSpan > this.cols;
        // shift to next row if item can't fit on current row
        col = isOver ? 0 : col;
        // don't let zero-size items take up space
        var hasSize = item.size.outerWidth && item.size.outerHeight;
        this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

        return {
            col: col,
            y: this._getColGroupY(col, colSpan),
        };
    };

    proto._manageStamp = function (stamp) {
        var stampSize = getSize(stamp);
        var offset = this._getElementOffset(stamp);
        // get the columns that this stamp affects
        var isOriginLeft = this._getOption('originLeft');
        var firstX = isOriginLeft ? offset.left : offset.right;
        var lastX = firstX + stampSize.outerWidth;
        var firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        // lastCol should not go over if multiple of columnWidth #425
        lastCol -= lastX % this.columnWidth ? 0 : 1;
        lastCol = Math.min(this.cols - 1, lastCol);
        // set colYs to bottom of the stamp

        var isOriginTop = this._getOption('originTop');
        var stampMaxY = (isOriginTop ? offset.top : offset.bottom) +
            stampSize.outerHeight;
        for (var i = firstCol; i <= lastCol; i++) {
            this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }
    };

    proto._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = {
            height: this.maxY
        };

        if (this._getOption('fitWidth')) {
            size.width = this._getContainerFitWidth();
        }

        return size;
    };

    proto._getContainerFitWidth = function () {
        var unusedCols = 0;
        // count unused columns
        var i = this.cols;
        while (--i) {
            if (this.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        // fit container to columns that have been used
        return (this.cols - unusedCols) * this.columnWidth - this.gutter;
    };

    proto.needsResizeLayout = function () {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        return previousWidth != this.containerWidth;
    };

    return Masonry;

}));

/*!
 * Masonry layout mode
 * sub-classes Masonry
 * https://masonry.desandro.com
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope-layout/js/layout-modes/masonry', [
                '../layout-mode',
                'masonry-layout/masonry'
            ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('../layout-mode'),
            require('masonry-layout')
        );
    } else {
        // browser global
        factory(
            window.Isotope.LayoutMode,
            window.Masonry
        );
    }

}(window, function factory(LayoutMode, Masonry) {
    'use strict';

// -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var MasonryMode = LayoutMode.create('masonry');

    var proto = MasonryMode.prototype;

    var keepModeMethods = {
        _getElementOffset: true,
        layout: true,
        _getMeasurement: true
    };

    // inherit Masonry prototype
    for (var method in Masonry.prototype) {
        // do not inherit mode methods
        if (!keepModeMethods[method]) {
            proto[method] = Masonry.prototype[method];
        }
    }

    var measureColumns = proto.measureColumns;
    proto.measureColumns = function () {
        // set items, used if measuring first item
        this.items = this.isotope.filteredItems;
        measureColumns.call(this);
    };

    // point to mode options for fitWidth
    var _getOption = proto._getOption;
    proto._getOption = function (option) {
        if (option == 'fitWidth') {
            return this.options.isFitWidth !== undefined ?
                this.options.isFitWidth : this.options.fitWidth;
        }
        return _getOption.apply(this.isotope, arguments);
    };

    return MasonryMode;

}));

/**
 * fitRows layout mode
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope-layout/js/layout-modes/fit-rows', [
                '../layout-mode'
            ],
            factory);
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
            require('../layout-mode')
        );
    } else {
        // browser global
        factory(
            window.Isotope.LayoutMode
        );
    }

}(window, function factory(LayoutMode) {
    'use strict';

    var FitRows = LayoutMode.create('fitRows');

    var proto = FitRows.prototype;

    proto._resetLayout = function () {
        this.x = 0;
        this.y = 0;
        this.maxY = 0;
        this._getMeasurement('gutter', 'outerWidth');
    };

    proto._getItemLayoutPosition = function (item) {
        item.getSize();

        var itemWidth = item.size.outerWidth + this.gutter;
        // if this element cannot fit in the current row
        var containerWidth = this.isotope.size.innerWidth + this.gutter;
        if (this.x !== 0 && itemWidth + this.x > containerWidth) {
            this.x = 0;
            this.y = this.maxY;
        }

        var position = {
            x: this.x,
            y: this.y
        };

        this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
        this.x += itemWidth;

        return position;
    };

    proto._getContainerSize = function () {
        return {height: this.maxY};
    };

    return FitRows;

}));

/**
 * vertical layout mode
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope-layout/js/layout-modes/vertical', [
                '../layout-mode'
            ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('../layout-mode')
        );
    } else {
        // browser global
        factory(
            window.Isotope.LayoutMode
        );
    }

}(window, function factory(LayoutMode) {
    'use strict';

    var Vertical = LayoutMode.create('vertical', {
        horizontalAlignment: 0
    });

    var proto = Vertical.prototype;

    proto._resetLayout = function () {
        this.y = 0;
    };

    proto._getItemLayoutPosition = function (item) {
        item.getSize();
        var x = (this.isotope.size.innerWidth - item.size.outerWidth) *
            this.options.horizontalAlignment;
        var y = this.y;
        this.y += item.size.outerHeight;
        return {x: x, y: y};
    };

    proto._getContainerSize = function () {
        return {height: this.y};
    };

    return Vertical;

}));

/*!
 * Isotope v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define([
                'outlayer/outlayer',
                'get-size/get-size',
                'desandro-matches-selector/matches-selector',
                'fizzy-ui-utils/utils',
                'isotope-layout/js/item',
                'isotope-layout/js/layout-mode',
                // include default layout modes
                'isotope-layout/js/layout-modes/masonry',
                'isotope-layout/js/layout-modes/fit-rows',
                'isotope-layout/js/layout-modes/vertical'
            ],
            function (Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
                return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode);
            });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('outlayer'),
            require('get-size'),
            require('desandro-matches-selector'),
            require('fizzy-ui-utils'),
            require('isotope-layout/js/item'),
            require('isotope-layout/js/layout-mode'),
            // include default layout modes
            require('isotope-layout/js/layout-modes/masonry'),
            require('isotope-layout/js/layout-modes/fit-rows'),
            require('isotope-layout/js/layout-modes/vertical')
        );
    } else {
        // browser global
        window.Isotope = factory(
            window,
            window.Outlayer,
            window.getSize,
            window.matchesSelector,
            window.fizzyUIUtils,
            window.Isotope.Item,
            window.Isotope.LayoutMode
        );
    }

}(window, function factory(window, Outlayer, getSize, matchesSelector, utils,
                           Item, LayoutMode) {


// -------------------------- vars -------------------------- //

    var jQuery = window.jQuery;

// -------------------------- helpers -------------------------- //

    var trim = String.prototype.trim ?
        function (str) {
            return str.trim();
        } :
        function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };

// -------------------------- isotopeDefinition -------------------------- //

    // create an Outlayer layout class
    var Isotope = Outlayer.create('isotope', {
        layoutMode: 'masonry',
        isJQueryFiltering: true,
        sortAscending: true
    });

    Isotope.Item = Item;
    Isotope.LayoutMode = LayoutMode;

    var proto = Isotope.prototype;

    proto._create = function () {
        this.itemGUID = 0;
        // functions that sort items
        this._sorters = {};
        this._getSorters();
        // call super
        Outlayer.prototype._create.call(this);

        // create layout modes
        this.modes = {};
        // start filteredItems with all items
        this.filteredItems = this.items;
        // keep of track of sortBys
        this.sortHistory = ['original-order'];
        // create from registered layout modes
        for (var name in LayoutMode.modes) {
            this._initLayoutMode(name);
        }
    };

    proto.reloadItems = function () {
        // reset item ID counter
        this.itemGUID = 0;
        // call super
        Outlayer.prototype.reloadItems.call(this);
    };

    proto._itemize = function () {
        var items = Outlayer.prototype._itemize.apply(this, arguments);
        // assign ID for original-order
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.id = this.itemGUID++;
        }
        this._updateItemsSortData(items);
        return items;
    };


    // -------------------------- layout -------------------------- //

    proto._initLayoutMode = function (name) {
        var Mode = LayoutMode.modes[name];
        // set mode options
        // HACK extend initial options, back-fill in default options
        var initialOpts = this.options[name] || {};
        this.options[name] = Mode.options ?
            utils.extend(Mode.options, initialOpts) : initialOpts;
        // init layout mode instance
        this.modes[name] = new Mode(this);
    };


    proto.layout = function () {
        // if first time doing layout, do all magic
        if (!this._isLayoutInited && this._getOption('initLayout')) {
            this.arrange();
            return;
        }
        this._layout();
    };

    // private method to be used in layout() & magic()
    proto._layout = function () {
        // don't animate first layout
        var isInstant = this._getIsInstant();
        // layout flow
        this._resetLayout();
        this._manageStamps();
        this.layoutItems(this.filteredItems, isInstant);

        // flag for initalized
        this._isLayoutInited = true;
    };

    // filter + sort + layout
    proto.arrange = function (opts) {
        // set any options pass
        this.option(opts);
        this._getIsInstant();
        // filter, sort, and layout

        // filter
        var filtered = this._filter(this.items);
        this.filteredItems = filtered.matches;

        this._bindArrangeComplete();

        if (this._isInstant) {
            this._noTransition(this._hideReveal, [filtered]);
        } else {
            this._hideReveal(filtered);
        }

        this._sort();
        this._layout();
    };
    // alias to _init for main plugin method
    proto._init = proto.arrange;

    proto._hideReveal = function (filtered) {
        this.reveal(filtered.needReveal);
        this.hide(filtered.needHide);
    };

    // HACK
    // Don't animate/transition first layout
    // Or don't animate/transition other layouts
    proto._getIsInstant = function () {
        var isLayoutInstant = this._getOption('layoutInstant');
        var isInstant = isLayoutInstant !== undefined ? isLayoutInstant :
            !this._isLayoutInited;
        this._isInstant = isInstant;
        return isInstant;
    };

    // listen for layoutComplete, hideComplete and revealComplete
    // to trigger arrangeComplete
    proto._bindArrangeComplete = function () {
        // listen for 3 events to trigger arrangeComplete
        var isLayoutComplete, isHideComplete, isRevealComplete;
        var _this = this;

        function arrangeParallelCallback() {
            if (isLayoutComplete && isHideComplete && isRevealComplete) {
                _this.dispatchEvent('arrangeComplete', null, [_this.filteredItems]);
            }
        }

        this.once('layoutComplete', function () {
            isLayoutComplete = true;
            arrangeParallelCallback();
        });
        this.once('hideComplete', function () {
            isHideComplete = true;
            arrangeParallelCallback();
        });
        this.once('revealComplete', function () {
            isRevealComplete = true;
            arrangeParallelCallback();
        });
    };

    // -------------------------- filter -------------------------- //

    proto._filter = function (items) {
        var filter = this.options.filter;
        filter = filter || '*';
        var matches = [];
        var hiddenMatched = [];
        var visibleUnmatched = [];

        var test = this._getFilterTest(filter);

        // test each item
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.isIgnored) {
                continue;
            }
            // add item to either matched or unmatched group
            var isMatched = test(item);
            // item.isFilterMatched = isMatched;
            // add to matches if its a match
            if (isMatched) {
                matches.push(item);
            }
            // add to additional group if item needs to be hidden or revealed
            if (isMatched && item.isHidden) {
                hiddenMatched.push(item);
            } else if (!isMatched && !item.isHidden) {
                visibleUnmatched.push(item);
            }
        }

        // return collections of items to be manipulated
        return {
            matches: matches,
            needReveal: hiddenMatched,
            needHide: visibleUnmatched
        };
    };

    // get a jQuery, function, or a matchesSelector test given the filter
    proto._getFilterTest = function (filter) {
        if (jQuery && this.options.isJQueryFiltering) {
            // use jQuery
            return function (item) {
                return jQuery(item.element).is(filter);
            };
        }
        if (typeof filter == 'function') {
            // use filter as function
            return function (item) {
                return filter(item.element);
            };
        }
        // default, use filter as selector string
        return function (item) {
            return matchesSelector(item.element, filter);
        };
    };

    // -------------------------- sorting -------------------------- //

    /**
     * @params {Array} elems
     * @public
     */
    proto.updateSortData = function (elems) {
        // get items
        var items;
        if (elems) {
            elems = utils.makeArray(elems);
            items = this.getItems(elems);
        } else {
            // update all items if no elems provided
            items = this.items;
        }

        this._getSorters();
        this._updateItemsSortData(items);
    };

    proto._getSorters = function () {
        var getSortData = this.options.getSortData;
        for (var key in getSortData) {
            var sorter = getSortData[key];
            this._sorters[key] = mungeSorter(sorter);
        }
    };

    /**
     * @params {Array} items - of Isotope.Items
     * @private
     */
    proto._updateItemsSortData = function (items) {
        // do not update if no items
        var len = items && items.length;

        for (var i = 0; len && i < len; i++) {
            var item = items[i];
            item.updateSortData();
        }
    };

    // ----- munge sorter ----- //

    // encapsulate this, as we just need mungeSorter
    // other functions in here are just for munging
    var mungeSorter = (function () {
        // add a magic layer to sorters for convienent shorthands
        // `.foo-bar` will use the text of .foo-bar querySelector
        // `[foo-bar]` will use attribute
        // you can also add parser
        // `.foo-bar parseInt` will parse that as a number
        function mungeSorter(sorter) {
            // if not a string, return function or whatever it is
            if (typeof sorter != 'string') {
                return sorter;
            }
            // parse the sorter string
            var args = trim(sorter).split(' ');
            var query = args[0];
            // check if query looks like [an-attribute]
            var attrMatch = query.match(/^\[(.+)\]$/);
            var attr = attrMatch && attrMatch[1];
            var getValue = getValueGetter(attr, query);
            // use second argument as a parser
            var parser = Isotope.sortDataParsers[args[1]];
            // parse the value, if there was a parser
            sorter = parser ? function (elem) {
                    return elem && parser(getValue(elem));
                } :
                // otherwise just return value
                function (elem) {
                    return elem && getValue(elem);
                };

            return sorter;
        }

        // get an attribute getter, or get text of the querySelector
        function getValueGetter(attr, query) {
            // if query looks like [foo-bar], get attribute
            if (attr) {
                return function getAttribute(elem) {
                    return elem.getAttribute(attr);
                };
            }

            // otherwise, assume its a querySelector, and get its text
            return function getChildText(elem) {
                var child = elem.querySelector(query);
                return child && child.textContent;
            };
        }

        return mungeSorter;
    })();

    // parsers used in getSortData shortcut strings
    Isotope.sortDataParsers = {
        'parseInt': function (val) {
            return parseInt(val, 10);
        },
        'parseFloat': function (val) {
            return parseFloat(val);
        }
    };

    // ----- sort method ----- //

    // sort filteredItem order
    proto._sort = function () {
        if (!this.options.sortBy) {
            return;
        }
        // keep track of sortBy History
        var sortBys = utils.makeArray(this.options.sortBy);
        if (!this._getIsSameSortBy(sortBys)) {
            // concat all sortBy and sortHistory, add to front, oldest goes in last
            this.sortHistory = sortBys.concat(this.sortHistory);
        }
        // sort magic
        var itemSorter = getItemSorter(this.sortHistory, this.options.sortAscending);
        this.filteredItems.sort(itemSorter);
    };

    // check if sortBys is same as start of sortHistory
    proto._getIsSameSortBy = function (sortBys) {
        for (var i = 0; i < sortBys.length; i++) {
            if (sortBys[i] != this.sortHistory[i]) {
                return false;
            }
        }
        return true;
    };

    // returns a function used for sorting
    function getItemSorter(sortBys, sortAsc) {
        return function sorter(itemA, itemB) {
            // cycle through all sortKeys
            for (var i = 0; i < sortBys.length; i++) {
                var sortBy = sortBys[i];
                var a = itemA.sortData[sortBy];
                var b = itemB.sortData[sortBy];
                if (a > b || a < b) {
                    // if sortAsc is an object, use the value given the sortBy key
                    var isAscending = sortAsc[sortBy] !== undefined ? sortAsc[sortBy] : sortAsc;
                    var direction = isAscending ? 1 : -1;
                    return (a > b ? 1 : -1) * direction;
                }
            }
            return 0;
        };
    }

    // -------------------------- methods -------------------------- //

    // get layout mode
    proto._mode = function () {
        var layoutMode = this.options.layoutMode;
        var mode = this.modes[layoutMode];
        if (!mode) {
            // TODO console.error
            throw new Error('No layout mode: ' + layoutMode);
        }
        // HACK sync mode's options
        // any options set after init for layout mode need to be synced
        mode.options = this.options[layoutMode];
        return mode;
    };

    proto._resetLayout = function () {
        // trigger original reset layout
        Outlayer.prototype._resetLayout.call(this);
        this._mode()._resetLayout();
    };

    proto._getItemLayoutPosition = function (item) {
        return this._mode()._getItemLayoutPosition(item);
    };

    proto._manageStamp = function (stamp) {
        this._mode()._manageStamp(stamp);
    };

    proto._getContainerSize = function () {
        return this._mode()._getContainerSize();
    };

    proto.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
    };

    // -------------------------- adding & removing -------------------------- //

    // HEADS UP overwrites default Outlayer appended
    proto.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // filter, layout, reveal new items
        var filteredItems = this._filterRevealAdded(items);
        // add to filteredItems
        this.filteredItems = this.filteredItems.concat(filteredItems);
    };

    // HEADS UP overwrites default Outlayer prepended
    proto.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
            return;
        }
        // start new layout
        this._resetLayout();
        this._manageStamps();
        // filter, layout, reveal new items
        var filteredItems = this._filterRevealAdded(items);
        // layout previous items
        this.layoutItems(this.filteredItems);
        // add to items and filteredItems
        this.filteredItems = filteredItems.concat(this.filteredItems);
        this.items = items.concat(this.items);
    };

    proto._filterRevealAdded = function (items) {
        var filtered = this._filter(items);
        this.hide(filtered.needHide);
        // reveal all new items
        this.reveal(filtered.matches);
        // layout new items, no transition
        this.layoutItems(filtered.matches, true);
        return filtered.matches;
    };

    /**
     * Filter, sort, and layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    proto.insert = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // append item elements
        var i, item;
        var len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i];
            this.element.appendChild(item.element);
        }
        // filter new stuff
        var filteredInsertItems = this._filter(items).matches;
        // set flag
        for (i = 0; i < len; i++) {
            items[i].isLayoutInstant = true;
        }
        this.arrange();
        // reset flag
        for (i = 0; i < len; i++) {
            delete items[i].isLayoutInstant;
        }
        this.reveal(filteredInsertItems);
    };

    var _remove = proto.remove;
    proto.remove = function (elems) {
        elems = utils.makeArray(elems);
        var removeItems = this.getItems(elems);
        // do regular thing
        _remove.call(this, elems);
        // bail if no items to remove
        var len = removeItems && removeItems.length;
        // remove elems from filteredItems
        for (var i = 0; len && i < len; i++) {
            var item = removeItems[i];
            // remove item from collection
            utils.removeFrom(this.filteredItems, item);
        }
    };

    proto.shuffle = function () {
        // update random sortData
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item.sortData.random = Math.random();
        }
        this.options.sortBy = 'random';
        this._sort();
        this._layout();
    };

    /**
     * trigger fn without transition
     * kind of hacky to have this in the first place
     * @param {Function} fn
     * @param {Array} args
     * @returns ret
     * @private
     */
    proto._noTransition = function (fn, args) {
        // save transitionDuration before disabling
        var transitionDuration = this.options.transitionDuration;
        // disable transition
        this.options.transitionDuration = 0;
        // do it
        var returnValue = fn.apply(this, args);
        // re-enable transition for reveal
        this.options.transitionDuration = transitionDuration;
        return returnValue;
    };

    // ----- helper methods ----- //

    /**
     * getter method for getting filtered item elements
     * @returns {Array} elems - collection of item elements
     */
    proto.getFilteredItemElements = function () {
        return this.filteredItems.map(function (item) {
            return item.element;
        });
    };

    // -----  ----- //

    return Isotope;

}));

/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = 0, o = i[n];
            t = t || [];
            for (var r = this._onceEvents && this._onceEvents[e]; o;) {
                var s = r && r[o];
                s && (this.off(e, o), delete r[o]), o.apply(this, t), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t.allOff = t.removeAllListeners = function () {
        delete this._events, delete this._onceEvents
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if ("number" == typeof e.length) for (var i = 0; i < e.length; i++) t.push(e[i]); else t.push(e);
        return t
    }

    function o(e, t, r) {
        return this instanceof o ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = n(e), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
            this.check()
        }.bind(this))) : new o(e, t, r)
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var h = e.jQuery, a = e.console;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {1: !0, 9: !0, 11: !0};
    return o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
            var o = n && n[2];
            o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
        }
    }, o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function () {
        function e(e, i, n) {
            setTimeout(function () {
                t.progress(e, i, n)
            })
        }

        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function (t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

/*==============================================================
    pull menu
 ==============================================================*/

function bindEvent(el, eventName, eventHandler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + eventName, eventHandler);
    }
}

(function () {

    var bodyEl = document.body,
        //content = document.querySelector( '.content-wrap' ),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        if (openbtn) {
            bindEvent(openbtn, 'click', toggleMenu);

        }
        //openbtn.addEventListener( 'click', toggleMenu );
        if (closebtn) {

            bindEvent(closebtn, 'click', toggleMenu);
            //closebtn.addEventListener( 'click', toggleMenu );
        }

        // close the menu element if the target itÂ´s not the menu element or one of its descendants..

    }

    function toggleMenu() {

        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
            if ($(".full-width-pull-menu").length) {
                classie.remove(bodyEl, 'overflow-hidden');
                classie.remove(bodyEl, 'position-fixed');
            }
        } else {
            classie.add(bodyEl, 'show-menu');

            if ($(".full-width-pull-menu").length) {
                classie.add(bodyEl, 'overflow-hidden');
                classie.add(bodyEl, 'position-fixed');
            }

        }
        isOpen = !isOpen;
    }

    init();

})();
/*!
 * The Final Countdown for jQuery v2.0.4
 */
(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    "use strict";
    var PRECISION = 100;
    var instances = [], matchers = [];
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));

    function parseDateString(dateString) {
        if (dateString instanceof Date) {
            return dateString;
        }
        if (String(dateString).match(matchers)) {
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }

    var DIRECTIVE_KEY_MAP = {
        Y: "years",
        m: "months",
        w: "weeks",
        d: "days",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    };

    function strftime(offsetObject) {
        return function (format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) {
                for (var i = 0, len = directives.length; i < len; ++i) {
                    var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        regexp = new RegExp(directive[0]), modifier = directive[1] || "", plural = directive[3] || "",
                        value = null;
                    directive = directive[2];
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        if (modifier === "!") {
                            value = pluralize(plural, value);
                        }
                        if (modifier === "") {
                            if (value < 10) {
                                value = "0" + value.toString();
                            }
                        }
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, "%");
            return format;
        };
    }

    function pluralize(format, count) {
        var plural = "s", singular = "";
        if (format) {
            format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if (Math.abs(count) === 1) {
            return singular;
        } else {
            return plural;
        }
    }

    var Countdown = function (el, finalDate, callback) {
        this.el = el;
        this.$el = $(el);
        this.interval = null;
        this.offset = {};
        this.instanceNumber = instances.length;
        instances.push(this);
        this.$el.data("countdown-instance", this.instanceNumber);
        if (callback) {
            this.$el.on("update.countdown", callback);
            this.$el.on("stoped.countdown", callback);
            this.$el.on("finish.countdown", callback);
        }
        this.setFinalDate(finalDate);
        this.start();
    };
    $.extend(Countdown.prototype, {
        start: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            var self = this;
            this.update();
            this.interval = setInterval(function () {
                self.update.call(self);
            }, PRECISION);
        },
        stop: function () {
            clearInterval(this.interval);
            this.interval = null;
            this.dispatchEvent("stoped");
        },
        pause: function () {
            this.stop.call(this);
        },
        resume: function () {
            this.start.call(this);
        },
        remove: function () {
            this.stop();
            instances[this.instanceNumber] = null;
            delete this.$el.data().countdownInstance;
        },
        setFinalDate: function (value) {
            this.finalDate = parseDateString(value);
        },
        update: function () {
            if (this.$el.closest("html").length === 0) {
                this.remove();
                return;
            }
            this.totalSecsLeft = this.finalDate.getTime() - new Date().getTime();
            this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3);
            this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft;
            this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
            };
            if (this.totalSecsLeft === 0) {
                this.stop();
                this.dispatchEvent("finish");
            } else {
                this.dispatchEvent("update");
            }
        },
        dispatchEvent: function (eventName) {
            var event = $.Event(eventName + ".countdown");
            event.finalDate = this.finalDate;
            event.offset = $.extend({}, this.offset);
            event.strftime = strftime(this.offset);
            this.$el.trigger(event);
        }
    });
    $.fn.countdown = function () {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var instanceNumber = $(this).data("countdown-instance");
            if (instanceNumber !== undefined) {
                var instance = instances[instanceNumber], method = argumentsArray[0];
                if (Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                } else if (String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                    instance.setFinalDate.call(instance, method);
                    instance.start();
                } else {
                    $.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, method));
                }
            } else {
                new Countdown(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };
});

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function ($) {

    'use strict';

    $.fn.fitVids = function (options) {
        var settings = {
            customSelector: null,
            ignore: null
        };

        if (!document.getElementById('fit-vids-style')) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function () {
            var selectors = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                'object',
                'embed'
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var ignoreList = '.fitvidsignore';

            if (settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

            $allVideos.each(function (count) {
                var $this = $(this);
                if ($this.parents(ignoreList).length > 0) {
                    return; // Disable FitVids on this video.
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + count;
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + '%');
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
// Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);

/*!
 * equalize.js
 * Author & copyright (c) 2012: Tim Svensen
 * Dual MIT & GPL license
 *
 * Page: http://tsvensen.github.com/equalize.js
 * Repo: https://github.com/tsvensen/equalize.js/
 */
!function (i) {
    i.fn.equalize = function (e) {
        var n, t, h = !1, c = !1;
        return i.isPlainObject(e) ? (n = e.equalize || "height", h = e.children || !1, c = e.reset || !1) : n = e || "height", i.isFunction(i.fn[n]) ? (t = 0 < n.indexOf("eight") ? "height" : "width", this.each(function () {
            var e = h ? i(this).find(h) : i(this).children(), s = 0;
            e.each(function () {
                var e = i(this);
                c && e.css(t, ""), e = e[n](), e > s && (s = e)
            }), e.css(t, s + "px")
        })) : !1
    }
}(jQuery);
/*!
 * https://github.com/umarwebdeveloper/jquery-css-skills-bar
 * Author: @umarwebdeveloper
 * Licensed under the MIT license
 */

(function ($) {

    $.fn.skillBars = function (options) {

        var settings = $.extend({
            from: 0,  			// number start
            to: false,			// number end
            speed: 1000,  		// how long it should take to count between the target numbers
            interval: 100,	  // how often the element should be updated
            decimals: 0,		  // the number of decimal places to show
            onUpdate: null,	  // callback method for every time the element is updated,
            onComplete: null,	  // callback method for when the element finishes updating
            /*onComplete: function(from) {
                console.debug(this);
            }*/
            classes: {
                skillBarBar: '.skillbar-bar',
                skillBarPercent: '.skill-bar-percent',
            }
        }, options);

        return this.each(function () {

            var obj = $(this),
                to = (settings.to != false) ? settings.to : parseInt(obj.attr('data-percent'));
            if (to > 100) {
                to = 100;
            }
            ;
            var from = settings.from,
                loops = Math.ceil(settings.speed / settings.interval),
                increment = (to - from) / loops,
                loopCount = 0,
                interval = setInterval(updateValue, settings.interval);

            obj.find(settings.classes.skillBarBar).animate({
                width: parseInt(obj.attr('data-percent')) + '%'
            }, settings.speed);

            function updateValue() {
                from += increment;
                loopCount++;
                $(obj).find(settings.classes.skillBarPercent).text(from.toFixed(settings.decimals) + '%');

                if (typeof (settings.onUpdate) == 'function') {
                    settings.onUpdate.call(obj, from);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    from = to;

                    if (typeof (settings.onComplete) == 'function') {
                        settings.onComplete.call(obj, from);
                    }
                }
            }

        });

    };

}(jQuery));

/*!
 * Justified Gallery - v3.6.3
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2016 Miro Mannino
 * Licensed under the MIT license.
 */
!function (a) {
    function b() {
        return a("body").height() > a(window).height()
    }

    var c = function (b, c) {
        this.settings = c, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
            entriesBuff: [],
            width: 0,
            height: 0,
            aspectRatio: 0
        }, this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.yield = {
            every: 2,
            flushed: 0
        }, this.border = c.border >= 0 ? c.border : c.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.rows = 0, this.spinner = {
            phase: 0,
            timeSlot: 150,
            $el: a('<div class="spinner"><span></span><span></span><span></span></div>'),
            intervalId: null
        }, this.checkWidthIntervalId = null, this.galleryWidth = b.width(), this.$gallery = b
    };
    c.prototype.getSuffix = function (a, b) {
        var c, d;
        for (c = a > b ? a : b, d = 0; d < this.suffixRanges.length; d++) if (c <= this.suffixRanges[d]) return this.settings.sizeRangeSuffixes[this.suffixRanges[d]];
        return this.settings.sizeRangeSuffixes[this.suffixRanges[d - 1]]
    }, c.prototype.removeSuffix = function (a, b) {
        return a.substring(0, a.length - b.length)
    }, c.prototype.endsWith = function (a, b) {
        return -1 !== a.indexOf(b, a.length - b.length)
    }, c.prototype.getUsedSuffix = function (a) {
        for (var b in this.settings.sizeRangeSuffixes) if (this.settings.sizeRangeSuffixes.hasOwnProperty(b)) {
            if (0 === this.settings.sizeRangeSuffixes[b].length) continue;
            if (this.endsWith(a, this.settings.sizeRangeSuffixes[b])) return this.settings.sizeRangeSuffixes[b]
        }
        return ""
    }, c.prototype.newSrc = function (a, b, c, d) {
        var e;
        if (this.settings.thumbnailPath) e = this.settings.thumbnailPath(a, b, c, d); else {
            var f = a.match(this.settings.extension), g = null !== f ? f[0] : "";
            e = a.replace(this.settings.extension, ""), e = this.removeSuffix(e, this.getUsedSuffix(e)), e += this.getSuffix(b, c) + g
        }
        return e
    }, c.prototype.showImg = function (a, b) {
        this.settings.cssAnimation ? (a.addClass("entry-visible"), b && b()) : (a.stop().fadeTo(this.settings.imagesAnimationDuration, 1, b), a.find("> img, > a > img").stop().fadeTo(this.settings.imagesAnimationDuration, 1, b))
    }, c.prototype.extractImgSrcFromImage = function (a) {
        var b = "undefined" != typeof a.data("safe-src") ? a.data("safe-src") : a.attr("src");
        return a.data("jg.originalSrc", b), b
    }, c.prototype.imgFromEntry = function (a) {
        var b = a.find("> img");
        return 0 === b.length && (b = a.find("> a > img")), 0 === b.length ? null : b
    }, c.prototype.captionFromEntry = function (a) {
        var b = a.find("> .caption");
        return 0 === b.length ? null : b
    }, c.prototype.displayEntry = function (b, c, d, e, f, g) {
        b.width(e), b.height(g), b.css("top", d), b.css("left", c);
        var h = this.imgFromEntry(b);
        if (null !== h) {
            h.css("width", e), h.css("height", f), h.css("margin-left", -e / 2), h.css("margin-top", -f / 2);
            var i = h.attr("src"), j = this.newSrc(i, e, f, h[0]);
            h.one("error", function () {
                h.attr("src", h.data("jg.originalSrc"))
            });
            var k = function () {
                i !== j && h.attr("src", j)
            };
            "skipped" === b.data("jg.loaded") ? this.onImageEvent(i, a.proxy(function () {
                this.showImg(b, k), b.data("jg.loaded", !0)
            }, this)) : this.showImg(b, k)
        } else this.showImg(b);
        this.displayEntryCaption(b)
    }, c.prototype.displayEntryCaption = function (b) {
        var c = this.imgFromEntry(b);
        if (null !== c && this.settings.captions) {
            var d = this.captionFromEntry(b);
            if (null === d) {
                var e = c.attr("alt");
                this.isValidCaption(e) || (e = b.attr("title")), this.isValidCaption(e) && (d = a('<div class="caption">' + e + "</div>"), b.append(d), b.data("jg.createdCaption", !0))
            }
            null !== d && (this.settings.cssAnimation || d.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(b))
        } else this.removeCaptionEventsHandlers(b)
    }, c.prototype.isValidCaption = function (a) {
        return "undefined" != typeof a && a.length > 0
    }, c.prototype.onEntryMouseEnterForCaption = function (b) {
        var c = this.captionFromEntry(a(b.currentTarget));
        this.settings.cssAnimation ? c.addClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
    }, c.prototype.onEntryMouseLeaveForCaption = function (b) {
        var c = this.captionFromEntry(a(b.currentTarget));
        this.settings.cssAnimation ? c.removeClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
    }, c.prototype.addCaptionEventsHandlers = function (b) {
        var c = b.data("jg.captionMouseEvents");
        "undefined" == typeof c && (c = {
            mouseenter: a.proxy(this.onEntryMouseEnterForCaption, this),
            mouseleave: a.proxy(this.onEntryMouseLeaveForCaption, this)
        }, b.on("mouseenter", void 0, void 0, c.mouseenter), b.on("mouseleave", void 0, void 0, c.mouseleave), b.data("jg.captionMouseEvents", c))
    }, c.prototype.removeCaptionEventsHandlers = function (a) {
        var b = a.data("jg.captionMouseEvents");
        "undefined" != typeof b && (a.off("mouseenter", void 0, b.mouseenter), a.off("mouseleave", void 0, b.mouseleave), a.removeData("jg.captionMouseEvents"))
    }, c.prototype.prepareBuildingRow = function (a) {
        var b, c, d, e, f, g = !0, h = 0,
            i = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
            j = i / this.buildingRow.aspectRatio, k = this.settings.rowHeight,
            l = this.buildingRow.width / i > this.settings.justifyThreshold;
        if (a && "hide" === this.settings.lastRow && !l) {
            for (b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], this.settings.cssAnimation ? c.removeClass("entry-visible") : (c.stop().fadeTo(0, .1), c.find("> img, > a > img").fadeTo(0, 0));
            return -1
        }
        for (a && !l && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (g = !1, this.rows > 0 && (k = (this.offY - this.border - this.settings.margins * this.rows) / this.rows, g = k * this.buildingRow.aspectRatio / i > this.settings.justifyThreshold)), b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], d = c.data("jg.width") / c.data("jg.height"), g ? (e = b === this.buildingRow.entriesBuff.length - 1 ? i : j * d, f = j) : (e = k * d, f = k), i -= Math.round(e), c.data("jg.jwidth", Math.round(e)), c.data("jg.jheight", Math.ceil(f)), (0 === b || h > f) && (h = f);
        return this.buildingRow.height = h, g
    }, c.prototype.clearBuildingRow = function () {
        this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
    }, c.prototype.flushRow = function (a) {
        var b, c, d, e = this.settings, f = this.border;
        if (c = this.prepareBuildingRow(a), a && "hide" === e.lastRow && -1 === c) return void this.clearBuildingRow();
        if (this.maxRowHeight && (this.maxRowHeight.isPercentage && this.maxRowHeight.value * e.rowHeight < this.buildingRow.height ? this.buildingRow.height = this.maxRowHeight.value * e.rowHeight : this.maxRowHeight.value >= e.rowHeight && this.maxRowHeight.value < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value)), "center" === e.lastRow || "right" === e.lastRow) {
            var g = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * e.margins;
            for (d = 0; d < this.buildingRow.entriesBuff.length; d++) b = this.buildingRow.entriesBuff[d], g -= b.data("jg.jwidth");
            "center" === e.lastRow ? f += g / 2 : "right" === e.lastRow && (f += g)
        }
        for (d = 0; d < this.buildingRow.entriesBuff.length; d++) b = this.buildingRow.entriesBuff[d], this.displayEntry(b, f, this.offY, b.data("jg.jwidth"), b.data("jg.jheight"), this.buildingRow.height), f += b.data("jg.jwidth") + e.margins;
        this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border, this.$gallery.height(this.galleryHeightToSet + this.getSpinnerHeight()), (!a || this.buildingRow.height <= e.rowHeight && c) && (this.offY += this.buildingRow.height + e.margins, this.rows += 1, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
    };
    var d = !1;
    c.prototype.checkWidth = function () {
        this.checkWidthIntervalId = setInterval(a.proxy(function () {
            var a = parseFloat(this.$gallery.width());
            b() === d ? Math.abs(a - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = a, this.rewind(), this.startImgAnalyzer(!0)) : (d = b(), this.galleryWidth = a)
        }, this), this.settings.refreshTime)
    }, c.prototype.isSpinnerActive = function () {
        return null !== this.spinner.intervalId
    }, c.prototype.getSpinnerHeight = function () {
        return this.spinner.$el.innerHeight()
    }, c.prototype.stopLoadingSpinnerAnimation = function () {
        clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
    }, c.prototype.startLoadingSpinnerAnimation = function () {
        var a = this.spinner, b = a.$el.find("span");
        clearInterval(a.intervalId), this.$gallery.append(a.$el), this.$gallery.height(this.offY + this.buildingRow.height + this.getSpinnerHeight()), a.intervalId = setInterval(function () {
            a.phase < b.length ? b.eq(a.phase).fadeTo(a.timeSlot, 1) : b.eq(a.phase - b.length).fadeTo(a.timeSlot, 0), a.phase = (a.phase + 1) % (2 * b.length)
        }, a.timeSlot)
    }, c.prototype.rewind = function () {
        this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.offY = this.border, this.rows = 0, this.clearBuildingRow()
    }, c.prototype.updateEntries = function (b) {
        var c;
        return b && null != this.lastFetchedEntry ? c = a(this.lastFetchedEntry).nextAll(this.settings.selector).toArray() : (this.entries = [], c = this.$gallery.children(this.settings.selector).toArray()), c.length > 0 && (a.isFunction(this.settings.sort) ? c = this.sortArray(c) : this.settings.randomize && (c = this.shuffleArray(c)), this.lastFetchedEntry = c[c.length - 1], this.settings.filter ? c = this.filterArray(c) : this.resetFilters(c)), this.entries = this.entries.concat(c), !0
    }, c.prototype.insertToGallery = function (b) {
        var c = this;
        a.each(b, function () {
            a(this).appendTo(c.$gallery)
        })
    }, c.prototype.shuffleArray = function (a) {
        var b, c, d;
        for (b = a.length - 1; b > 0; b--) c = Math.floor(Math.random() * (b + 1)), d = a[b], a[b] = a[c], a[c] = d;
        return this.insertToGallery(a), a
    }, c.prototype.sortArray = function (a) {
        return a.sort(this.settings.sort), this.insertToGallery(a), a
    }, c.prototype.resetFilters = function (b) {
        for (var c = 0; c < b.length; c++) a(b[c]).removeClass("jg-filtered")
    }, c.prototype.filterArray = function (b) {
        var c = this.settings;
        if ("string" === a.type(c.filter)) return b.filter(function (b) {
            var d = a(b);
            return d.is(c.filter) ? (d.removeClass("jg-filtered"), !0) : (d.addClass("jg-filtered").removeClass("jg-visible"), !1)
        });
        if (a.isFunction(c.filter)) {
            for (var d = b.filter(c.filter), e = 0; e < b.length; e++) -1 == d.indexOf(b[e]) ? a(b[e]).addClass("jg-filtered").removeClass("jg-visible") : a(b[e]).removeClass("jg-filtered");
            return d
        }
    }, c.prototype.destroy = function () {
        clearInterval(this.checkWidthIntervalId), a.each(this.entries, a.proxy(function (b, c) {
            var d = a(c);
            d.css("width", ""), d.css("height", ""), d.css("top", ""), d.css("left", ""), d.data("jg.loaded", void 0), d.removeClass("jg-entry");
            var e = this.imgFromEntry(d);
            e.css("width", ""), e.css("height", ""), e.css("margin-left", ""), e.css("margin-top", ""), e.attr("src", e.data("jg.originalSrc")), e.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(d);
            var f = this.captionFromEntry(d);
            d.data("jg.createdCaption") ? (d.data("jg.createdCaption", void 0), null !== f && f.remove()) : null !== f && f.fadeTo(0, 1)
        }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
    }, c.prototype.analyzeImages = function (b) {
        for (var c = this.lastAnalyzedIndex + 1; c < this.entries.length; c++) {
            var d = a(this.entries[c]);
            if (d.data("jg.loaded") === !0 || "skipped" === d.data("jg.loaded")) {
                var e = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                    f = d.data("jg.width") / d.data("jg.height");
                if (e / (this.buildingRow.aspectRatio + f) < this.settings.rowHeight && (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)) return void this.startImgAnalyzer(b);
                this.buildingRow.entriesBuff.push(d), this.buildingRow.aspectRatio += f, this.buildingRow.width += f * this.settings.rowHeight, this.lastAnalyzedIndex = c
            } else if ("error" !== d.data("jg.loaded")) return
        }
        this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(b ? "jg.resize" : "jg.complete"), this.$gallery.height(this.galleryHeightToSet)
    }, c.prototype.stopImgAnalyzerStarter = function () {
        this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
    }, c.prototype.startImgAnalyzer = function (a) {
        var b = this;
        this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function () {
            b.analyzeImages(a)
        }, .001)
    }, c.prototype.onImageEvent = function (b, c, d) {
        if (c || d) {
            var e = new Image, f = a(e);
            c && f.one("load", function () {
                f.off("load error"), c(e)
            }), d && f.one("error", function () {
                f.off("load error"), d(e)
            }), e.src = b
        }
    }, c.prototype.init = function () {
        var b = !1, c = !1, d = this;
        a.each(this.entries, function (e, f) {
            var g = a(f), h = d.imgFromEntry(g);
            if (g.addClass("jg-entry"), g.data("jg.loaded") !== !0 && "skipped" !== g.data("jg.loaded")) if (null !== d.settings.rel && g.attr("rel", d.settings.rel), null !== d.settings.target && g.attr("target", d.settings.target), null !== h) {
                var i = d.extractImgSrcFromImage(h);
                if (h.attr("src", i), d.settings.waitThumbnailsLoad === !1) {
                    var j = parseFloat(h.attr("width")), k = parseFloat(h.attr("height"));
                    if (!isNaN(j) && !isNaN(k)) return g.data("jg.width", j), g.data("jg.height", k), g.data("jg.loaded", "skipped"), c = !0, d.startImgAnalyzer(!1), !0
                }
                g.data("jg.loaded", !1), b = !0, d.isSpinnerActive() || d.startLoadingSpinnerAnimation(), d.onImageEvent(i, function (a) {
                    g.data("jg.width", a.width), g.data("jg.height", a.height), g.data("jg.loaded", !0), d.startImgAnalyzer(!1)
                }, function () {
                    g.data("jg.loaded", "error"), d.startImgAnalyzer(!1)
                })
            } else g.data("jg.loaded", !0), g.data("jg.width", g.width() | parseFloat(g.css("width")) | 1), g.data("jg.height", g.height() | parseFloat(g.css("height")) | 1)
        }), b || c || this.startImgAnalyzer(!1), this.checkWidth()
    }, c.prototype.checkOrConvertNumber = function (b, c) {
        if ("string" === a.type(b[c]) && (b[c] = parseFloat(b[c])), "number" !== a.type(b[c])) throw c + " must be a number";
        if (isNaN(b[c])) throw"invalid number for " + c
    }, c.prototype.checkSizeRangesSuffixes = function () {
        if ("object" !== a.type(this.settings.sizeRangeSuffixes)) throw"sizeRangeSuffixes must be defined and must be an object";
        var b = [];
        for (var c in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(c) && b.push(c);
        for (var d = {0: ""}, e = 0; e < b.length; e++) if ("string" === a.type(b[e])) try {
            var f = parseInt(b[e].replace(/^[a-z]+/, ""), 10);
            d[f] = this.settings.sizeRangeSuffixes[b[e]]
        } catch (g) {
            throw"sizeRangeSuffixes keys must contains correct numbers (" + g + ")"
        } else d[b[e]] = this.settings.sizeRangeSuffixes[b[e]];
        this.settings.sizeRangeSuffixes = d
    }, c.prototype.retrieveMaxRowHeight = function () {
        var b = {};
        if ("string" === a.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (b.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100, b.isPercentage = !1) : (b.value = parseFloat(this.settings.maxRowHeight), b.isPercentage = !0); else {
            if ("number" !== a.type(this.settings.maxRowHeight)) {
                if (this.settings.maxRowHeight === !1 || null === this.settings.maxRowHeight || "undefined" == typeof this.settings.maxRowHeight) return null;
                throw"maxRowHeight must be a number or a percentage"
            }
            b.value = this.settings.maxRowHeight, b.isPercentage = !1
        }
        if (isNaN(b.value)) throw"invalid number for maxRowHeight";
        return b.isPercentage && b.value < 100 && (b.value = 100), b
    }, c.prototype.checkSettings = function () {
        this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border");
        var b = ["justify", "nojustify", "left", "center", "right", "hide"];
        if (-1 === b.indexOf(this.settings.lastRow)) throw"lastRow must be one of: " + b.join(", ");
        if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw"justifyThreshold must be in the interval [0,1]";
        if ("boolean" !== a.type(this.settings.cssAnimation)) throw"cssAnimation must be a boolean";
        if ("boolean" !== a.type(this.settings.captions)) throw"captions must be a boolean";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || this.settings.captionSettings.visibleOpacity > 1) throw"captionSettings.visibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw"captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== a.type(this.settings.randomize)) throw"randomize must be a boolean";
        if ("string" !== a.type(this.settings.selector)) throw"selector must be a string";
        if (this.settings.sort !== !1 && !a.isFunction(this.settings.sort)) throw"sort must be false or a comparison function";
        if (this.settings.filter !== !1 && !a.isFunction(this.settings.filter) && "string" !== a.type(this.settings.filter)) throw"filter must be false, a string or a filter function"
    }, c.prototype.retrieveSuffixRanges = function () {
        var a = [];
        for (var b in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(b) && a.push(parseInt(b, 10));
        return a.sort(function (a, b) {
            return a > b ? 1 : b > a ? -1 : 0
        }), a
    }, c.prototype.updateSettings = function (b) {
        this.settings = a.extend({}, this.settings, b), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
    }, a.fn.justifiedGallery = function (b) {
        return this.each(function (d, e) {
            var f = a(e);
            f.addClass("justified-gallery");
            var g = f.data("jg.controller");
            if ("undefined" == typeof g) {
                if ("undefined" != typeof b && null !== b && "object" !== a.type(b)) {
                    if ("destroy" === b) return;
                    throw"The argument must be an object"
                }
                g = new c(f, a.extend({}, a.fn.justifiedGallery.defaults, b)), f.data("jg.controller", g)
            } else if ("norewind" === b) ; else {
                if ("destroy" === b) return void g.destroy();
                g.updateSettings(b), g.rewind()
            }
            g.updateEntries("norewind" === b) && g.init()
        })
    }, a.fn.justifiedGallery.defaults = {
        sizeRangeSuffixes: {},
        thumbnailPath: void 0,
        rowHeight: 120,
        maxRowHeight: !1,
        margins: 1,
        border: -1,
        lastRow: "nojustify",
        justifyThreshold: .9,
        waitThumbnailsLoad: !0,
        captions: !0,
        cssAnimation: !0,
        imagesAnimationDuration: 500,
        captionSettings: {animationDuration: 500, visibleOpacity: .7, nonVisibleOpacity: 0},
        rel: null,
        target: null,
        extension: /\.[^.\\/]+$/,
        refreshTime: 200,
        refreshSensitivity: 0,
        randomize: !1,
        sort: !1,
        filter: !1,
        selector: "a, div:not(.spinner)"
    }
}(jQuery);
/**!
 * easy-pie-chart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.7
 **/
!function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function (a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function (a) {
    var b = function (a, b) {
        var c, d = document.createElement("canvas");
        a.appendChild(d), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
        var e = d.getContext("2d");
        d.width = d.height = b.size;
        var f = 1;
        window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
        var g = (b.size - b.lineWidth) / 2;
        b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function () {
            return +new Date
        };
        var h = function (a, b, c) {
            c = Math.min(Math.max(-1, c || 0), 1);
            var d = 0 >= c ? !0 : !1;
            e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
        }, i = function () {
            var a, c;
            e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
            for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
            e.restore()
        }, j = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {
                window.setTimeout(a, 1e3 / 60)
            }
        }(), k = function () {
            b.scaleColor && i(), b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1)
        };
        this.getCanvas = function () {
            return d
        }, this.getCtx = function () {
            return e
        }, this.clear = function () {
            e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
        }, this.draw = function (a) {
            b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
            var d;
            d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
        }.bind(this), this.animate = function (a, c) {
            var d = Date.now();
            b.onStart(a, c);
            var e = function () {
                var f = Math.min(Date.now() - d, b.animate.duration),
                    g = b.easing(this, f, a, c - a, b.animate.duration);
                this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
            }.bind(this);
            j(e)
        }.bind(this)
    }, c = function (a, c) {
        var d = {
            barColor: "#ef1e25",
            trackColor: "#f9f9f9",
            scaleColor: "#dfe0e0",
            scaleLength: 5,
            lineCap: "round",
            lineWidth: 3,
            trackWidth: void 0,
            size: 110,
            rotate: 0,
            animate: {duration: 1e3, enabled: !0},
            easing: function (a, b, c, d, e) {
                return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
            },
            onStart: function (a, b) {
            },
            onStep: function (a, b, c) {
            },
            onStop: function (a, b) {
            }
        };
        if ("undefined" != typeof b) d.renderer = b; else {
            if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
            d.renderer = SVGRenderer
        }
        var e = {}, f = 0, g = function () {
            this.el = a, this.options = e;
            for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
            "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, "number" == typeof e.animate && (e.animate = {
                duration: e.animate,
                enabled: !0
            }), "boolean" != typeof e.animate || e.animate || (e.animate = {
                duration: 1e3,
                enabled: e.animate
            }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
        }.bind(this);
        this.update = function (a) {
            return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
        }.bind(this), this.disableAnimation = function () {
            return e.animate.enabled = !1, this
        }, this.enableAnimation = function () {
            return e.animate.enabled = !0, this
        }, g()
    };
    a.fn.easyPieChart = function (b) {
        return this.each(function () {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});
// Generated by CoffeeScript 1.9.3
(function () {
    var e;
    e = function () {
        function e(e, t) {
            var n, r;
            this.options = {
                target: "instafeed",
                get: "popular",
                resolution: "thumbnail",
                sortBy: "none",
                links: !0,
                mock: !1,
                useHttp: !1
            };
            if (typeof e == "object") for (n in e) r = e[n], this.options[n] = r;
            this.context = t != null ? t : this, this.unique = this._genKey()
        }

        return e.prototype.hasNext = function () {
            return typeof this.context.nextUrl == "string" && this.context.nextUrl.length > 0
        }, e.prototype.next = function () {
            return this.hasNext() ? this.run(this.context.nextUrl) : !1
        }, e.prototype.run = function (t) {
            var n, r, i;
            if (typeof this.options.clientId != "string" && typeof this.options.accessToken != "string") throw new Error("Missing clientId or accessToken.");
            if (typeof this.options.accessToken != "string" && typeof this.options.clientId != "string") throw new Error("Missing clientId or accessToken.");
            return this.options.before != null && typeof this.options.before == "function" && this.options.before.call(this), typeof document != "undefined" && document !== null && (i = document.createElement("script"), i.id = "instafeed-fetcher", i.src = t || this._buildUrl(), n = document.getElementsByTagName("head"), n[0].appendChild(i), r = "instafeedCache" + this.unique, window[r] = new e(this.options, this), window[r].unique = this.unique), !0
        }, e.prototype.parse = function (e) {
            var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D;
            if (typeof e != "object") {
                if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "Invalid JSON data"), !1;
                throw new Error("Invalid JSON response")
            }
            if (e.meta.code !== 200) {
                if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, e.meta.error_message), !1;
                throw new Error("Error from Instagram: " + e.meta.error_message)
            }
            if (e.data.length === 0) {
                if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "No images were returned from Instagram"), !1;
                throw new Error("No images were returned from Instagram")
            }
            this.options.success != null && typeof this.options.success == "function" && this.options.success.call(this, e), this.context.nextUrl = "", e.pagination != null && (this.context.nextUrl = e.pagination.next_url);
            if (this.options.sortBy !== "none") {
                this.options.sortBy === "random" ? M = ["", "random"] : M = this.options.sortBy.split("-"), O = M[0] === "least" ? !0 : !1;
                switch (M[1]) {
                    case"random":
                        e.data.sort(function () {
                            return .5 - Math.random()
                        });
                        break;
                    case"recent":
                        e.data = this._sortBy(e.data, "created_time", O);
                        break;
                    case"liked":
                        e.data = this._sortBy(e.data, "likes.count", O);
                        break;
                    case"commented":
                        e.data = this._sortBy(e.data, "comments.count", O);
                        break;
                    default:
                        throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
                }
            }
            if (typeof document != "undefined" && document !== null && this.options.mock === !1) {
                m = e.data, A = parseInt(this.options.limit, 10), this.options.limit != null && m.length > A && (m = m.slice(0, A)), u = document.createDocumentFragment(), this.options.filter != null && typeof this.options.filter == "function" && (m = this._filter(m, this.options.filter));
                if (this.options.template != null && typeof this.options.template == "string") {
                    f = "", d = "", w = "", D = document.createElement("div");
                    for (c = 0, N = m.length; c < N; c++) {
                        h = m[c], p = h.images[this.options.resolution];
                        if (typeof p != "object") throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
                        E = p.width, y = p.height, b = "square", E > y && (b = "landscape"), E < y && (b = "portrait"), v = p.url, l = window.location.protocol.indexOf("http") >= 0, l && !this.options.useHttp && (v = v.replace(/https?:\/\//, "//")), d = this._makeTemplate(this.options.template, {
                            model: h,
                            id: h.id,
                            link: h.link,
                            type: h.type,
                            image: v,
                            width: E,
                            height: y,
                            orientation: b,
                            caption: this._getObjectProperty(h, "caption.text"),
                            likes: h.likes.count,
                            comments: h.comments.count,
                            location: this._getObjectProperty(h, "location.name")
                        }), f += d
                    }
                    D.innerHTML = f, i = [], r = 0, n = D.childNodes.length;
                    while (r < n) i.push(D.childNodes[r]), r += 1;
                    for (x = 0, C = i.length; x < C; x++) L = i[x], u.appendChild(L)
                } else for (T = 0, k = m.length; T < k; T++) {
                    h = m[T], g = document.createElement("img"), p = h.images[this.options.resolution];
                    if (typeof p != "object") throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
                    v = p.url, l = window.location.protocol.indexOf("http") >= 0, l && !this.options.useHttp && (v = v.replace(/https?:\/\//, "//")), g.src = v, this.options.links === !0 ? (t = document.createElement("a"), t.href = h.link, t.appendChild(g), u.appendChild(t)) : u.appendChild(g)
                }
                _ = this.options.target, typeof _ == "string" && (_ = document.getElementById(_));
                if (_ == null) throw o = 'No element with id="' + this.options.target + '" on page.', new Error(o);
                _.appendChild(u), a = document.getElementsByTagName("head")[0], a.removeChild(document.getElementById("instafeed-fetcher")), S = "instafeedCache" + this.unique, window[S] = void 0;
                try {
                    delete window[S]
                } catch (P) {
                    s = P
                }
            }
            return this.options.after != null && typeof this.options.after == "function" && this.options.after.call(this), !0
        }, e.prototype._buildUrl = function () {
            var e, t, n;
            e = "https://api.instagram.com/v1";
            switch (this.options.get) {
                case"popular":
                    t = "media/popular";
                    break;
                case"tagged":
                    if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                    t = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case"location":
                    if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                    t = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case"user":
                    if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                    t = "users/" + this.options.userId + "/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return n = e + "/" + t, this.options.accessToken != null ? n += "?access_token=" + this.options.accessToken : n += "?client_id=" + this.options.clientId, this.options.limit != null && (n += "&count=" + this.options.limit), n += "&callback=instafeedCache" + this.unique + ".parse", n
        }, e.prototype._genKey = function () {
            var e;
            return e = function () {
                return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
            }, "" + e() + e() + e() + e()
        }, e.prototype._makeTemplate = function (e, t) {
            var n, r, i, s, o;
            r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, n = e;
            while (r.test(n)) s = n.match(r)[1], o = (i = this._getObjectProperty(t, s)) != null ? i : "", n = n.replace(r, function () {
                return "" + o
            });
            return n
        }, e.prototype._getObjectProperty = function (e, t) {
            var n, r;
            t = t.replace(/\[(\w+)\]/g, ".$1"), r = t.split(".");
            while (r.length) {
                n = r.shift();
                if (!(e != null && n in e)) return null;
                e = e[n]
            }
            return e
        }, e.prototype._sortBy = function (e, t, n) {
            var r;
            return r = function (e, r) {
                var i, s;
                return i = this._getObjectProperty(e, t), s = this._getObjectProperty(r, t), n ? i > s ? 1 : -1 : i < s ? 1 : -1
            }, e.sort(r.bind(this)), e
        }, e.prototype._filter = function (e, t) {
            var n, r, i, s, o;
            n = [], r = function (e) {
                if (t(e)) return n.push(e)
            };
            for (i = 0, o = e.length; i < o; i++) s = e[i], r(s);
            return n
        }, e
    }(), function (e, t) {
        return typeof define == "function" && define.amd ? define([], t) : typeof module == "object" && module.exports ? module.exports = t() : e.Instafeed = t()
    }(this, function () {
        return e
    })
}).call(this);
(function (a, b) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = b() : 'function' == typeof define && define.amd ? define(b) : a.retinajs = b()
})(this, function () {
    'use strict';

    function a(a) {
        return Array.prototype.slice.call(a)
    }

    function b(a) {
        var b = parseInt(a, 10);
        return k < b ? k : b
    }

    function c(a) {
        return a.hasAttribute('data-no-resize') || (0 === a.offsetWidth && 0 === a.offsetHeight ? (a.setAttribute('width', a.naturalWidth), a.setAttribute('height', a.naturalHeight)) : (a.setAttribute('width', a.offsetWidth), a.setAttribute('height', a.offsetHeight))), a
    }

    function d(a, b) {
        var d = a.nodeName.toLowerCase(), e = document.createElement('img');
        e.addEventListener('load', function () {
            'img' === d ? c(a).setAttribute('src', b) : a.style.backgroundImage = 'url(' + b + ')'
        }), e.setAttribute('src', b), a.setAttribute(o, !0)
    }

    function e(a, c) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1, f = b(e);
        if (c && 1 < f) {
            var g = c.replace(l, '@' + f + 'x$1');
            d(a, g)
        }
    }

    function f(a, b, c) {
        1 < k && d(a, c)
    }

    function g(b) {
        return b ? 'function' == typeof b.forEach ? b : a(b) : 'undefined' == typeof document ? [] : a(document.querySelectorAll(n))
    }

    function h(a) {
        return a.style.backgroundImage.replace(m, '$2')
    }

    function i(a) {
        g(a).forEach(function (a) {
            if (!a.getAttribute(o)) {
                var b = 'img' === a.nodeName.toLowerCase(), c = b ? a.getAttribute('src') : h(a),
                    d = a.getAttribute('data-rjs'), g = !isNaN(parseInt(d, 10));
                if (null === d) return;
                g ? e(a, c, d) : f(a, c, d)
            }
        })
    }

    var j = 'undefined' != typeof window, k = Math.round(j ? window.devicePixelRatio || 1 : 1),
        l = /(\.[A-z]{3,4}\/?(\?.*)?)$/, m = /url\(('|")?([^)'"]+)('|")?\)/i, n = '[data-rjs]',
        o = 'data-rjs-processed';
    return j && (window.addEventListener('load', function () {
        i()
    }), window.retinajs = i), i
});
//# sourceMappingURL=retina.min.js.map

"use strict";
var lastScroll = 0;

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
}

function SetMegamenuPosition() {
    if ($(window).width() > 991) {
        setTimeout(function () {
            var totalHeight = $('nav.navbar').outerHeight();
            $('.mega-menu').css({top: totalHeight});
            if ($('.navbar-brand-top').length === 0)
                $('.dropdown.simple-dropdown > .dropdown-menu').css({top: totalHeight});
        }, 200);
    } else {
        $('.mega-menu').css('top', '');
        $('.dropdown.simple-dropdown > .dropdown-menu').css('top', '');
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return true;
    } else  // If another browser, return 0
    {
        return false;
    }
}

//page title space
function setPageTitleSpace() {
    if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {
        if ($('.top-space').length > 0) {
            var top_space_height = $('.navbar').outerHeight();
            if ($('.top-header-area').length > 0) {
                top_space_height = top_space_height + $('.top-header-area').outerHeight();
            }
            $('.top-space').css('margin-top', top_space_height + "px");
        }
    }
}

//swiper button position in auto height slider
function setButtonPosition() {
    if ($(window).width() > 767 && $(".swiper-auto-height-container").length > 0) {
        var leftPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-left'));
        var bottomPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-bottom'));
        var bannerWidth = parseInt($('.swiper-auto-height-container .slide-banner').outerWidth());
        $('.navigation-area').css({'left': bannerWidth + leftPosition + 'px', 'bottom': bottomPosition + 'px'});
    } else if ($(".swiper-auto-height-container").length > 0) {
        $('.navigation-area').css({'left': '', 'bottom': ''});
    }
}

$(window).on("scroll", init_scroll_navigate);

function init_scroll_navigate() {
    /*==============================================================
     One Page Main JS - START CODE
     =============================================================*/
    var menu_links = $(".navbar-nav li a");
    var scrollPos = $(document).scrollTop();
    scrollPos = scrollPos + 60;
    menu_links.each(function () {
        var currLink = $(this);
        var hasPos = currLink.attr("href").indexOf("#");
        if (hasPos > -1) {
            var res = currLink.attr("href").substring(hasPos);
            if ($(res).length > 0) {
                var refElement = $(res);
                if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                    menu_links.not(currLink).removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            }
        }
    });
    /*==============================================================
     One Page Main JS - END CODE
     =============================================================*/

    /*==============================================================*/
    //background color slider Start
    /*==============================================================*/
    var $window = $(window),
        $body = $('.bg-background-fade'),
        $panel = $('.color-code');
    var scroll = $window.scrollTop() + ($window.height() / 2);
    $panel.each(function () {
        var $this = $(this);
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });
            $body.addClass('color-' + $(this).data('color'));
        }
    });
    /*==============================================================*/
    //background color slider End
    /*==============================================================*/

    /* ===================================
     sticky nav Start
     ====================================== */
    var headerHeight = $('nav').outerHeight();
    if (!$('header').hasClass('no-sticky')) {
        if ($(document).scrollTop() >= headerHeight) {
            $('header').addClass('sticky');

        } else if ($(document).scrollTop() <= headerHeight) {
            $('header').removeClass('sticky');
            setTimeout(function () {
                setPageTitleSpace();
            }, 500);
        }
        SetMegamenuPosition();
    }

    /* ===================================
     header appear on scroll up
     ====================================== */
    var st = $(this).scrollTop();
    if (st > lastScroll) {
        $('.sticky').removeClass('header-appear');
//        $('.dropdown.on').removeClass('on').removeClass('open').find('.dropdown-menu').fadeOut(100);
    } else
        $('.sticky').addClass('header-appear');
    lastScroll = st;
    if (lastScroll <= headerHeight)
        $('header').removeClass('header-appear');
    /* ===================================
     sticky nav End
     ====================================== */
}

/*==============================================================
 parallax text - START CODE
 ==============================================================*/
function parallax_text() {
    var window_width = $(window).width();
    if (window_width > 1024) {
        if ($('.swiper-auto-slide .swiper-slide').length !== 0) {
            $(document).on("mousemove", ".swiper-auto-slide .swiper-slide", function (e) {
                var positionX = e.clientX;
                var positionY = e.clientY;
                positionX = Math.round(positionX / 10) - 80;
                positionY = Math.round(positionY / 10) - 40;
                $(this).find('.parallax-text').css({
                    'transform': 'translate(' + positionX + 'px,' + positionY + 'px)',
                    'transition-duration': '0s'
                });
            });

            $(document).on("mouseout", ".swiper-auto-slide .swiper-slide", function (e) {
                $('.parallax-text').css({'transform': 'translate(0,0)', 'transition-duration': '0.5s'});
            });
        }
    }
}

/*==============================================================*/
//parallax text - END CODE
/*==============================================================*/

/*==============================================================*/
//Search - START CODE
/*==============================================================*/
function ScrollStop() {
    return false;
}

function ScrollStart() {
    return true;
}

function validationSearchForm() {
    var error = true;
    $('#search-header input[type=text]').each(function (index) {
        if (index === 0) {
            if ($(this).val() === null || $(this).val() === "") {
                $("#search-header").find("input:eq(" + index + ")").css({
                    "border": "none",
                    "border-bottom": "2px solid red"
                });
                error = false;
            } else {
                $("#search-header").find("input:eq(" + index + ")").css({
                    "border": "none",
                    "border-bottom": "2px solid #000"
                });
            }
        }
    });
    return error;
}

/*==============================================================
 Search - END CODE
 ==============================================================*/

/*==============================================================
 equalize - START CODE
 ==============================================================*/
function equalizeHeight() {
    $(document).imagesLoaded(function () {
        if ($(window).width() < 768) {
            $('.equalize').equalize({equalize: 'outerHeight', reset: true});
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            $('.equalize.xs-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 992) {
            $('.equalize').equalize({equalize: 'outerHeight', reset: true});
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 1199) {
            $('.equalize').equalize({equalize: 'outerHeight', reset: true});
            $('.equalize.md-equalize-auto').children().css("height", "");
            return false;
        } else {
            $('.equalize').equalize({equalize: 'outerHeight', reset: true});
        }
    });
}

/*==============================================================
 equalize - END CODE
 ==============================================================*/

/*==============================================================
 dynamic font size START CODE
 ==============================================================*/
function feature_dynamic_font_line_height() {
    if ($('.dynamic-font-size').length > 0) {
        var site_width = 1100;
        var window_width = $(window).width();
        if (window_width < site_width) {
            var window_site_width_ratio = window_width / site_width;
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size != '' && font_size != undefined) {
                    var new_font_size = Math.round(font_size * window_site_width_ratio * 1000) / 1000;
                    $(this).css('font-size', new_font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    var new_line_height = Math.round(line_height * window_site_width_ratio * 1000) / 1000;
                    $(this).css('line-height', new_line_height + 'px');
                }
            });
        } else {
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size !== '' && font_size !== undefined) {
                    $(this).css('font-size', font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    $(this).css('line-height', line_height + 'px');
                }
            });
        }
    }
}

/*==============================================================
 dynamic font size END CODE
 ==============================================================*/

/*==============================================================
 set parallax
 ==============================================================*/
function stellarParallax() {
    if ($(window).width() > 1024) {
        $.stellar();
    } else {
        $.stellar('destroy');
        $('.parallax').css('background-position', '');
    }
}

/*==============================================================
 full screen START CODE
 ==============================================================*/
function fullScreenHeight() {
    var element = $(".full-screen");
    var $minheight = $(window).height();
    element.parents('section').imagesLoaded(function () {
        if ($(".top-space .full-screen").length > 0) {
            var $headerheight = $("header nav.navbar").outerHeight();
            $(".top-space .full-screen").css('min-height', $minheight - $headerheight);
        } else {
            element.css('min-height', $minheight);
        }
    });

    var minwidth = $(window).width();
    $(".full-screen-width").css('min-width', minwidth);

    var sidebarNavHeight = $('.sidebar-nav-style-1').height() - $('.logo-holder').parent().height() - $('.footer-holder').parent().height() - 10;
    $(".sidebar-nav-style-1 .nav").css('height', (sidebarNavHeight));
    var style2NavHeight = parseInt($('.sidebar-part2').height() - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-top')) - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-bottom')) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('margin-bottom')));
    $(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('height', (style2NavHeight));


}

/*==============================================================
 full screen END CODE
 ==============================================================*/
function SetResizeContent() {
    //    all function call
    feature_dynamic_font_line_height();
    SetMegamenuPosition();
    setPageTitleSpace();
    setButtonPosition();
    parallax_text();
    stellarParallax();
    fullScreenHeight();
    equalizeHeight();
}

/* ===================================
 START RESIZE
 ====================================== */
$(window).resize(function (event) {
    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function (e) {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({equalize: 'outerHeight', reset: true});
                return false;
            }
        });
    });

    setTimeout(function () {
        SetResizeContent();
    }, 500);

    event.preventDefault();
});
/* ===================================
 END RESIZE
 ====================================== */

/* ===================================
 START READY
 ====================================== */
$(document).ready(function () {
    "use strict";

    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function () {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({equalize: 'outerHeight', reset: true});
                return false;
            }
        });
    });
    // Bootsnav tab work with eualize height
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if ($(window).width() > 991) {
            $(target).find('.equalize').equalize({equalize: 'outerHeight', reset: true});
            return false;
        }
    });

    // Active class to current menu for only html
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    var $hash = window.location.hash.substring(1);

    if ($hash) {
        $hash = "#" + $hash;
        pgurl = pgurl.replace($hash, "");
    } else {
        pgurl = pgurl.replace("#", "");
    }

    $(".nav li a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
            $(this).parent().addClass("active");
            $(this).parents('li.dropdown').addClass("active");
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150)
            $('.scroll-top-arrow').fadeIn('slow');
        else
            $('.scroll-top-arrow').fadeOut('slow');
    });
    //Click event to scroll to top
    $(document).on('click', '.scroll-top-arrow', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    /* ===================================
     swiper slider
     ====================================== */
    var swiperFull = new Swiper('.swiper-full-screen', {
        loop: true,
        slidesPerView: 1,
        effect: 'fade',
        preventClicks: false,
        allowTouchMove: true,
        pagination: {
            el: '.swiper-full-screen-pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            resize: function () {
                swiperFull.update();
            }
        }
    });

    var swiperAutoFade = new Swiper('.swiper-auto-fade', {
        allowTouchMove: true,
        loop: true,
        slidesPerView: 1,
        preventClicks: false,
        effect: 'fade',
        autoplay: {
            delay: 5000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-auto-pagination',
            clickable: true
        },
        on: {
            resize: function () {
                swiperAutoFade.update();
            }
        }
    });

    var swiperSecond = new Swiper('.swiper-slider-second', {
        allowTouchMove: true,
        slidesPerView: 1,
        preventClicks: false,
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination-second',
            clickable: true
        },
        on: {
            resize: function () {
                swiperSecond.update();
            }
        }
    });

    var swiperThird = new Swiper('.swiper-slider-third', {
        allowTouchMove: true,
        slidesPerView: 1,
        preventClicks: false,
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination-third',
            clickable: true
        },
        on: {
            resize: function () {
                swiperThird.update();
            }
        }
    });

    var swiperNumber = new Swiper('.swiper-number-pagination', {
        allowTouchMove: true,
        preventClicks: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        pagination: {
            el: '.swiper-number',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + pad((index + 1)) + '</span>';
            }
        },
        on: {
            resize: function () {
                swiperNumber.update();
            }
        }
    });

    var swiperVerticalPagination = new Swiper('.swiper-vertical-pagination', {
        allowTouchMove: true,
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        preventClicks: false,
        mousewheel: {
            mousewheel: true,
            sensitivity: 1,
            releaseOnEdges: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination-vertical',
            clickable: true
        },
        on: {
            resize: function () {
                swiperVerticalPagination.update();
            }
        }
    });

    var swiperClients = new Swiper('.swiper-slider-clients', {
        allowTouchMove: true,
        slidesPerView: 4,
        paginationClickable: true,
        preventClicks: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        pagination: {
            el: null
        },
        breakpoints: {
            1199: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperClients.update();
            }
        }
    });

    var swiperClients2 = new Swiper('.swiper-slider-clients-second', {
        allowTouchMove: true,
        slidesPerView: 4,
        paginationClickable: true,
        preventClicks: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        pagination: {
            el: null
        },
        breakpoints: {
            1199: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperClients2.update();
            }
        }
    });

    var swiperThreeSlides = new Swiper('.swiper-three-slides', {
        allowTouchMove: true,
        slidesPerView: 3,
        preventClicks: false,
        pagination: {
            el: '.swiper-pagination-three-slides',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-three-slide-next',
            prevEl: '.swiper-three-slide-prev'
        },
        breakpoints: {
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperThreeSlides.update();
            }
        }
    });

    var swiperFourSlides = new Swiper('.swiper-four-slides', {
        allowTouchMove: true,
        slidesPerView: 4,
        preventClicks: false,
        pagination: {
            el: '.swiper-pagination-four-slides',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1199: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperFourSlides.update();
            }
        }
    });

    var swiperDemoHeaderStyle = new Swiper('.swiper-demo-header-style', {
        allowTouchMove: true,
        loop: true,
        slidesPerView: 4,
        preventClicks: true,
        slidesPerGroup: 4,
        pagination: {
            el: '.swiper-pagination-demo-header-style',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1199: {
                slidesPerGroup: 2,
                slidesPerView: 2
            },
            767: {
                slidesPerGroup: 1,
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperDemoHeaderStyle.update();
            }
        }
    });

    var $swiperAutoSlideIndex = 0;
    var swiperAutoSlide = new Swiper('.swiper-auto-slide', {
        allowTouchMove: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 80,
        preventClicks: false,
        observer: true,
        speed: 1000,
        pagination: {
            el: null
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: false,
            snapOnRelease: true
        },
        autoplay: {
            delay: 3000
        },
        mousewheel: {
            invert: false
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-next-style2',
            prevEl: '.swiper-prev-style2'
        },
        breakpoints: {
            1199: {
                spaceBetween: 60
            },
            960: {
                spaceBetween: 30
            },
            767: {
                spaceBetween: 15
            }
        },
        on: {
            resize: function () {
                swiperAutoSlide.update();
            }
        }
    });

    if ($(window).width() > 767) {
        var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
            allowTouchMove: true,
            slidesPerView: 'auto',
            grabCursor: true,
            preventClicks: false,
            spaceBetween: 30,
            keyboardControl: true,
            speed: 1000,
            pagination: {
                el: null
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: false,
                snapOnRelease: true
            },
            mousewheel: {
                enable: true
            },
            keyboard: {
                enabled: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    }

    var swiperAutoHieght = new Swiper('.swiper-auto-height-container', {
        allowTouchMove: true,
        effect: 'fade',
        loop: true,
        autoHeight: true,
        pagination: {
            el: '.swiper-auto-height-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            resize: function () {
                swiperAutoHieght.update();
            }
        }
    });

    var swiperMultyRow = new Swiper('.swiper-multy-row-container', {
        allowTouchMove: true,
        slidesPerView: 4,
        spaceBetween: 15,
        pagination: {
            el: '.swiper-multy-row-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-portfolio-next',
            prevEl: '.swiper-portfolio-prev'
        },
        breakpoints: {
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperMultyRow.update();
            }
        }
    });

    var swiperBlog = new Swiper('.swiper-blog', {
        allowTouchMove: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 15,
        preventClicks: false,
        loop: true,
        loopedSlides: 3,
        pagination: {
            el: '.swiper-blog-pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            resize: function () {
                swiperBlog.update();
            }
        }
    });

    var swiperPresentation = new Swiper('.swiper-presentation', {
        allowTouchMove: true,
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        preventClicks: true,
        loop: true,
        loopedSlides: 6,
        pagination: {
            el: '.swiper-presentation-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            991: {
                spaceBetween: 15,
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperPresentation.update();
            }
        }
    });

    var resizeId;

    $(window).resize(function () {
        if ($(".swiper-auto-slide").length > 0 && swiperAutoSlide) {
            $swiperAutoSlideIndex = swiperAutoSlide.activeIndex;
            swiperAutoSlide.detachEvents();
            swiperAutoSlide.destroy(true, false);
            swiperAutoSlide = undefined;
            $(".swiper-auto-slide .swiper-wrapper").css("transform", "").css("transition-duration", "");
            $(".swiper-auto-slide .swiper-slide").css("margin-right", "");

            setTimeout(function () {
                swiperAutoSlide = new Swiper('.swiper-auto-slide', {
                    allowTouchMove: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 80,
                    preventClicks: false,
                    mousewheelControl: true,
                    observer: true,
                    speed: 1000,
                    pagination: {
                        el: null
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        hide: false,
                        snapOnRelease: true
                    },
                    autoplay: {
                        delay: 3000
                    },
                    keyboard: {
                        enabled: true
                    },
                    navigation: {
                        nextEl: '.swiper-next-style2',
                        prevEl: '.swiper-prev-style2'
                    },
                    breakpoints: {
                        1199: {
                            spaceBetween: 60
                        },
                        960: {
                            spaceBetween: 30
                        },
                        767: {
                            spaceBetween: 15
                        }
                    },
                    on: {
                        resize: function () {
                            swiperAutoSlide.update();
                        }
                    }
                });

                swiperAutoSlide.slideTo($swiperAutoSlideIndex, 1000, false);
            }, 1000);
        }

        if ($(".swiper-bottom-scrollbar-full").length > 0) {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 1000);
        }

        /* update all swiper on window resize */

        setTimeout(function () {
            if ($('.swiper-full-screen').length > 0 && swiperFull) {
                swiperFull.update();
            }

            if ($('.swiper-auto-fade').length > 0 && swiperAutoFade) {
                swiperAutoFade.update();
            }

            if ($('.swiper-slider-second').length > 0 && swiperSecond) {
                swiperSecond.update();
            }

            if ($('.swiper-slider-third').length > 0 && swiperThird) {
                swiperThird.update();
            }

            if ($('.swiper-number-pagination').length > 0 && swiperNumber) {
                swiperNumber.update();
            }

            if ($('.swiper-vertical-pagination').length > 0 && swiperVerticalPagination) {
                swiperVerticalPagination.update();
            }

            if ($('.swiper-slider-clients').length > 0 && swiperClients) {
                swiperClients.update();
            }

            if ($('.swiper-slider-clients-second').length > 0 && swiperClients2) {
                swiperClients2.update();
            }

            if ($('.swiper-three-slides').length > 0 && swiperThreeSlides) {
                swiperThreeSlides.update();
            }

            if ($('.swiper-four-slides').length > 0 && swiperFourSlides) {
                swiperFourSlides.update();
            }

            if ($('.swiper-demo-header-style').length > 0 && swiperDemoHeaderStyle) {
                swiperDemoHeaderStyle.update();
            }

            if ($('.swiper-auto-slide').length > 0 && swiperAutoSlide) {
                swiperAutoSlide.update();
            }

            if ($('.swiper-auto-height-container').length > 0 && swiperAutoHieght) {
                swiperAutoHieght.update();
            }

            if ($('.swiper-multy-row-container').length > 0 && swiperMultyRow) {
                swiperMultyRow.update();
            }

            if ($('.swiper-blog').length > 0 && swiperBlog) {
                swiperBlog.update();
            }

            if ($('.swiper-presentation').length > 0 && swiperPresentation) {
                swiperPresentation.update();
            }

        }, 500);
        if (isIE()) {
            setTimeout(function () {
                if ($('.swiper-full-screen').length > 0 && swiperFull) {
                    swiperFull.update();
                }

                if ($('.swiper-auto-fade').length > 0 && swiperAutoFade) {
                    swiperAutoFade.update();
                }

                if ($('.swiper-slider-second').length > 0 && swiperSecond) {
                    swiperSecond.update();
                }

                if ($('.swiper-slider-third').length > 0 && swiperThird) {
                    swiperThird.update();
                }

                if ($('.swiper-number-pagination').length > 0 && swiperNumber) {
                    swiperNumber.update();
                }

                if ($('.swiper-vertical-pagination').length > 0 && swiperVerticalPagination) {
                    swiperVerticalPagination.update();
                }

                if ($('.swiper-slider-clients').length > 0 && swiperClients) {
                    swiperClients.update();
                }

                if ($('.swiper-slider-clients-second').length > 0 && swiperClients2) {
                    swiperClients2.update();
                }

                if ($('.swiper-three-slides').length > 0 && swiperThreeSlides) {
                    swiperThreeSlides.update();
                }

                if ($('.swiper-four-slides').length > 0 && swiperFourSlides) {
                    swiperFourSlides.update();
                }

                if ($('.swiper-demo-header-style').length > 0 && swiperDemoHeaderStyle) {
                    swiperDemoHeaderStyle.update();
                }

                if ($('.swiper-auto-slide').length > 0 && swiperAutoSlide) {
                    swiperAutoSlide.update();
                }

                if ($('.swiper-auto-height-container').length > 0 && swiperAutoHieght) {
                    swiperAutoHieght.update();
                }

                if ($('.swiper-multy-row-container').length > 0 && swiperMultyRow) {
                    swiperMultyRow.update();
                }

                if ($('.swiper-blog').length > 0 && swiperBlog) {
                    swiperBlog.update();
                }

                if ($('.swiper-presentation').length > 0 && swiperPresentation) {
                    swiperPresentation.update();
                }

            }, 500);
        }

    });

    function doneResizing() {
        if (swiperBottomScrollbarFull) {
            swiperBottomScrollbarFull.detachEvents();
            swiperBottomScrollbarFull.destroy(true, true);
            swiperBottomScrollbarFull = undefined;
        }

        $(".swiper-bottom-scrollbar-full .swiper-wrapper").css("transform", "").css("transition-duration", "");
        $(".swiper-bottom-scrollbar-full .swiper-slide").css("margin-right", "");
        $('.swiper-bottom-scrollbar-full .swiper-wrapper').removeAttr('style');
        $('.swiper-bottom-scrollbar-full .swiper-slide').removeAttr('style');

        if ($(window).width() > 767) {
            setTimeout(function () {
                swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
                    allowTouchMove: true,
                    slidesPerView: 'auto',
                    grabCursor: true,
                    preventClicks: false,
                    spaceBetween: 30,
                    keyboardControl: true,
                    speed: 1000,
                    pagination: {
                        el: null
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        hide: false,
                        snapOnRelease: true
                    },
                    mousewheel: {
                        enable: true
                    },
                    keyboard: {
                        enabled: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            }, 500);
        }
    }

    /*==============================================================
     smooth scroll
     ==============================================================*/

    var scrollAnimationTime = 1200, scrollAnimation = 'easeInOutExpo';
    $(document).on('click.smoothscroll', 'a.scrollto', function (event) {
        event.preventDefault();
        var target = this.hash;
        if ($(target).length != 0) {
            $('html, body').stop()
                .animate({
                    'scrollTop': $(target)
                        .offset()
                        .top
                }, scrollAnimationTime, scrollAnimation, function () {
                    window.location.hash = target;
                });
        }
    });

    /*==============================================================
     humburger menu one page navigation
     ==============================================================*/

    if ($('.full-width-pull-menu').length > 0) {
        $(document).on('click', '.full-width-pull-menu .inner-link', function (e) {
            //$('body').removeClass('overflow-hidden position-fixed');
            $(".full-width-pull-menu .close-button-menu").trigger("click");
            var _this = $(this);
            setTimeout(function () {
                var target = _this.attr("href");
                if ($(target).length > 0) {
                    $('html, body').stop()
                        .animate({
                            'scrollTop': $(target).offset().top
                        });
                }
            }, 500);
        });
    }

    // Inner links
    if ($('.navbar-top').length > 0 || $('.navbar-scroll-top').length > 0 || $('.nav-top-scroll').length > 0) {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: 0
        });
    } else {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: -59
        });
    }

    $('.section-link').smoothScroll({
        speed: 900,
        offset: 1
    });

    /*==============================================================*/
    //PieChart For Onepage - START CODE
    /*==============================================================*/
    if ($('.chart1').length > 0) {
        $('.chart1').appear();
        $('.chart1').easyPieChart({
            barColor: '#929292',
            trackColor: '#d9d9d9',
            scaleColor: false,
            easing: 'easeOutBounce',
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 3, //12
            size: 150, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart1', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }

    if ($('.chart2').length > 0) {
        $('.chart2').appear();
        $('.chart2').easyPieChart({
            easing: 'easeOutCirc',
            barColor: '#ff214f',
            trackColor: '#c7c7c7',
            scaleColor: false,
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 2, //12
            size: 120, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart2', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }

    if ($('.chart3').length > 0) {
        $('.chart3').appear();
        $('.chart3').easyPieChart({
            easing: 'easeOutCirc',
            barColor: '#ff214f',
            trackColor: '',
            scaleColor: false,
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 3, //12
            size: 140, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart3', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }
    /*==============================================================*/
    //PieChart For Onepage - END CODE
    /*==============================================================*/

    /*==============================================================
     portfolio filter
     ==============================================================*/
    var $portfolio_filter = $('.portfolio-grid');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        $portfolio_filter.isotope();
    });
    var $grid_selectors = $('.portfolio-filter > li > a');
    $grid_selectors.on('click', function () {
        $grid_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio_filter.find('.grid-item').removeClass('animated').css("visibility", ""); // avoid problem to filter after sorting
        $portfolio_filter.find('.grid-item').each(function () {
            /* remove perticular element from WOW array when you don't want animation on element after DOM lead */
            wow.removeBox(this);
            $(this).css("-webkit-animation", "none");
            $(this).css("-moz-animation", "none");
            $(this).css("-ms-animation", "none");
            $(this).css("animation", "none");
        });
        $portfolio_filter.isotope({filter: selector});
        return false;
    });
    $(window).resize(function () {
        if (!isMobile && !isiPhoneiPad) {
            $portfolio_filter.imagesLoaded(function () {
                setTimeout(function () {
                    $portfolio_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
                    $portfolio_filter.isotope('layout');
                }, 300);
            });
        }
    });
    var $blog_filter = $('.blog-grid');
    $blog_filter.imagesLoaded(function () {
        $blog_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });
    $(window).resize(function () {
        setTimeout(function () {
            $blog_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
            $blog_filter.isotope('layout');
        }, 300);
    });

    /*==============================================================
     lightbox gallery
     ==============================================================*/
    $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        fixedContentPos: true,
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });
    /* for group gallery */
    var lightboxgallerygroups = {};
    $('.lightbox-group-gallery-item').each(function () {
        var id = $(this).attr('data-group');
        if (!lightboxgallerygroups[id]) {
            lightboxgallerygroups[id] = [];
        }
        lightboxgallerygroups[id].push(this);
    });
    $.each(lightboxgallerygroups, function () {
        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            gallery: {enabled: true}
        });
    });

    $('.lightbox-portfolio').magnificPopup({
        delegate: '.gallery-link',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        fixedContentPos: true,
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: false,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });
    /*==============================================================
     single image lightbox - zoom animation
     ==============================================================*/
    $('.single-image-lightbox').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        fixedContentPos: true,
        closeBtnInside: false,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });
    /*==============================================================
     zoom gallery
     ==============================================================*/
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        fixedContentPos: true,
        closeBtnInside: false,
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });
    /*==============================================================*/
    //Modal popup - START CODE
    /*==============================================================*/
    $('.modal-popup').magnificPopup({
        type: 'inline',
        preloader: false,
        // modal: true,
        blackbg: true,
        callbacks: {
            open: function () {
                $('html').css('margin-right', 0);
            }
        }
    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    /*==============================================================*/
    //Modal popup - END CODE
    /*==============================================================*/

    /*==============================================================*/
    //Modal popup - zoom animation - START CODE
    /*==============================================================*/
    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        blackbg: true,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        blackbg: true,
        mainClass: 'my-mfp-slide-bottom'
    });
    /*==============================================================*/
    //Modal popup - zoom animation - END CODE
    /*==============================================================*/

    /*==============================================================
     popup with form
     ==============================================================*/
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        closeBtnInside: false,
        fixedContentPos: true,
        focus: '#name',
        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });
    /*==============================================================
     video magnific popup
     ==============================================================*/

    $('.popup-youtube, .popup-vimeo, .popup-googlemap').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: "auto",
        closeBtnInside: false
    });
    /*==============================================================
     ajax magnific popup for onepage portfolio
     ==============================================================*/
    $('.ajax-popup').magnificPopup({
        type: 'ajax',
        alignTop: true,
        fixedContentPos: true,
        overflowY: 'scroll', // as we know that popup content is tall we set scroll overflow by default to avoid jump
        callbacks: {
            open: function () {
                $('.navbar .collapse').removeClass('in');
                $('.navbar a.dropdown-toggle').addClass('collapsed');
            }
        }
    });

    /*==============================================================
     mega menu width
     ===============================================================*/
    $("ul.mega-menu-full").each(function (idx, elm) {
        var megaMenuWidth = 0;
        $(this).children('li').each(function (idx, elm) {
            var LIheight = 0;
            megaMenuWidth += $(this).outerWidth();
        });
        $(this).width(megaMenuWidth + 95);
        megaMenuWidth = 0;
    });
    /*==============================================================
     fit videos
     ==============================================================*/
    $(".fit-videos").fitVids();

    /*==============================================================
     form to email
     ==============================================================*/
    $("#success-subscribe-newsletter").hide();
    $("#success-subscribe-newsletter2").hide();
    $("#success-contact-form").hide();
    $("#success-project-contact-form").hide();
    $("#success-contact-form-2").hide();
    $("#success-contact-form-3").hide();
    $("#success-project-contact-form-4").hide();

    //Subscribe newsletter form
    $(document).on("click", '#button-subscribe-newsletter', function () {
        var error = ValidationsubscribenewsletterForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/subscribe-newsletter.php",
                data: $("#subscribenewsletterform").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-subscribe-newsletter").html(result);
                    $("#success-subscribe-newsletter").fadeIn("slow");
                    $('#success-subscribe-newsletter').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationsubscribenewsletterForm() {
        var error = true;
        $('#subscribenewsletterform input[type=text]').each(function (index) {
            if (index == 0) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#subscribenewsletterform").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#subscribenewsletterform").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    $(document).on("click", '#button-subscribe-newsletter2', function () {
        var error = ValidationsubscribenewsletterForm2();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/subscribe-newsletter.php",
                data: $("#subscribenewsletterform2").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-subscribe-newsletter2").html(result);
                    $("#success-subscribe-newsletter2").fadeIn("slow");
                    $('#success-subscribe-newsletter2').delay(4000).fadeOut("slow");


                }
            });
        }
    });

    function ValidationsubscribenewsletterForm2() {
        var error = true;
        $('#subscribenewsletterform2 input[type=text]').each(function (index) {
            if (index == 0) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#subscribenewsletterform2").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#subscribenewsletterform2").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
        });
        return error;
    }

    //Contact us form
    $(document).on("click", '#contact-us-button', function () {
        var error = ValidationContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/contact.php",
                data: $("#contact-form").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form").html(result);
                    $("#success-contact-form").fadeIn("slow");
                    $('#success-contact-form').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationContactForm() {
        var error = true;
        $('#contact-form input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    //Contact us form 2
    $('#contact-us-button-2').on("click", function () {
        var error = ValidationContactForm2();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/contact.php",
                data: $("#contact-form-2").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form-2").html(result);
                    $("#success-contact-form-2").fadeIn("slow");
                    $('#success-contact-form-2').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationContactForm2() {
        var error = true;
        $('#contact-form-2 input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#contact-form-2").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-2").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#contact-form-2").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-2").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
        });
        return error;
    }

    //Contact us form 3

    $(document).on("click", '#contact-us-button-3', function () {
        var error = ValidationContactForm3();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/contact.php",
                data: $("#contact-form-3").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";
                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form-3").html(result);
                    $("#success-contact-form-3").fadeIn("slow");
                    $('#success-contact-form-3').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationContactForm3() {
        var error = true;
        $('#contact-form-3 input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#contact-form-3").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-3").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#contact-form-3").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-3").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    //Project Contact us form
    $(document).on("click", '#project-contact-us-button', function () {
        var error = ValidationProjectContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/project-contact.php",
                data: $("#project-contact-form").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-project-contact-form").html(result);
                    $("#success-project-contact-form").fadeIn("slow");
                    $('#success-project-contact-form').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationProjectContactForm() {
        var error = true;
        $('#project-contact-form input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#project-contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 2) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#project-contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    //Project Contact us form 2
    $(document).on("click", '#project-contact-us-4-button', function () {
        var error = ValidationProjectContactForm4();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/project-contact.php",
                data: $("#project-contact-form-4").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-project-contact-form-4").html(result);
                    $("#success-project-contact-form-4").fadeIn("slow");
                    $('#success-project-contact-form-4').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationProjectContactForm4() {
        var error = true;
        $('#project-contact-form-4 input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 2) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
        });
        return error;
    }

    /*==============================================================
     End form to email
     ==============================================================*/

    /*==============================================================
     wow animation - on scroll
     ==============================================================*/
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    $(window).imagesLoaded(function () {
        wow.init();
    });
    /*==============================================================
     counter
     ==============================================================*/
    $(function ($) {
        animatecounters();
    });

    function animatecounters() {
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    }

    /* ===================================
     counter number reset while scrolling
     ====================================== */
    $('.timer').appear();
    $(document.body).on('appear', '.timer', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            animatecounters();
            $(this).addClass('appear');
        }
    });
    $('.countdown').countdown($('.countdown').attr("data-enddate")).on('update.countdown', function (event) {
        $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'));
    });

    /* ===================================
     left nav
     ====================================== */
    $(document).on('click', '.right-menu-button', function (e) {
        $('body').toggleClass('left-nav-on');
    });

    /*==============================================================*/
    //    hamburger menu
    /*==============================================================*/
    $(document).on('click', '.btn-hamburger', function () {
        $('.hamburger-menu').toggleClass('show-menu');
        $('body').removeClass('show-menu');
    });

    /*==============================================================*/
    //sidebar nav open
    /*==============================================================*/
    $(document).on('click', '#mobileToggleSidenav', function () {
        $(this).closest('nav').toggleClass('sidemenu-open');
    });

    /*=================================
     //justified Gallery
     =================================*/
    $(document).imagesLoaded(function () {
        if ($(".justified-gallery").length > 0) {
            $(".justified-gallery").justifiedGallery({
                rowHeight: 400,
                maxRowHeight: false,
                captions: true,
                margins: 10,
                waitThumbnailsLoad: true
            });
        }
    });

    $('.atr-nav').on("click", function () {
        $(".atr-div").append("<a class='close-cross' href='#'>X</a>");
        $(".atr-div").animate({
            width: "toggle"
        });
    });

    $('.close-cross').on("click", function () {
        $(".atr-div").hide();
    });

    var menuRight = document.getElementById('cbp-spmenu-s2'),
        showRightPush = document.getElementById('showRightPush'),
        body = document.body;
    if (showRightPush) {
        showRightPush.onclick = function () {
            classie.toggle(this, 'active');
            if (menuRight)
                classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    var test = document.getElementById('close-pushmenu');
    if (test) {
        test.onclick = function () {
            classie.toggle(this, 'active');
            if (menuRight)
                classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    //blog page header animation
    $(".blog-header-style1 li").hover(function () {
        $('.blog-header-style1 li.blog-column-active').removeClass('blog-column-active');
        $(this).addClass('blog-column-active');
    }, function () {
        $(this).removeClass('blog-column-active');
        $('.blog-header-style1 li:first-child').addClass('blog-column-active');
    });

    /*==============================================================*/
    //big menu open close start
    /*==============================================================*/
    $('.big-menu-open').on("click", function () {
        $('.big-menu-right').addClass("open");
    });

    $('.big-menu-close').on("click", function () {
        $('.big-menu-right').removeClass("open");
    });
    /*==============================================================*/
    //big menu open close end
    /*==============================================================*/

    /*==============================================================
     instagramfeed
     ==============================================================*/
    if ($('#instaFeed-style1').length != 0) {
        var instaFeedStyle1 = new Instafeed({
            target: 'instaFeed-style1',
            get: 'user',
            userId: 5640046896,
            limit: '8',
            accessToken: '5640046896.1677ed0.f7cd85767e124a9f9f8d698cb33252a0',
            resolution: "low_resolution",
            error: {
                template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
            },
            template: '<div class="col-md-3 col-sm-6 col-xs-12 instafeed-style1"><a class="insta-link" href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /><div class="insta-counts"><span><i class="ti-heart"></i> <span class="count-number">{{likes}}</span></span><span><i class="ti-comment"></i> <span class="count-number">{{comments}}</span></span></div></a></div>'
        });
        instaFeedStyle1.run();
    }

    if ($('#instaFeed-aside').length != 0) {
        var instaFeedAside = new Instafeed({
            target: 'instaFeed-aside',
            get: 'user',
            userId: 5640046896,
            limit: '6',
            accessToken: '5640046896.1677ed0.f7cd85767e124a9f9f8d698cb33252a0',
            resolution: "low_resolution",
            after: function () {
                equalizeHeight();
            },
            error: {
                template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
            },
            template: '<li><figure><a href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /><span class="insta-counts"><i class="ti-heart"></i>{{likes}}</span></a></figure></li>'
        });
        instaFeedAside.run();
    }

    if ($('#instaFeed-footer').length != 0) {
        var instaFeedFooter = new Instafeed({
            target: 'instaFeed-footer',
            get: 'user',
            userId: 5640046896,
            limit: '6',
            accessToken: '5640046896.1677ed0.f7cd85767e124a9f9f8d698cb33252a0',
            resolution: "low_resolution",
            after: function () {
                equalizeHeight();
            },
            error: {
                template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
            },
            template: '<li><figure><a href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /><span class="insta-counts"><i class="ti-heart"></i><span>{{likes}}</span></span></a></figure></li>'
        });
        instaFeedFooter.run();
    }
    /*==============================================================
     instagramfeed end
     ==============================================================*/

    /*==============================================================*/
    //magnificPopup Start
    /*==============================================================*/
    $('.header-search-form').magnificPopup({
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        preloader: false,
        // for white backgriund
        fixedContentPos: false,
        closeBtnInside: false,
        callbacks: {
            open: function () {
                setTimeout(function () {
                    $('.search-input').focus();
                }, 500);
                $('#search-header').parent().addClass('search-popup');
                if (!isMobile) {
                    $('body').addClass('overflow-hidden');
                    //$('body').addClass('position-fixed');
                    $('body').addClass('width-100');
                    document.onmousewheel = ScrollStop;
                } else {
                    $('body, html').on('touchmove', function (e) {
                        e.preventDefault();
                    });
                }
            },
            close: function () {
                if (!isMobile) {
                    $('body').removeClass('overflow-hidden');
                    //$('body').removeClass('position-fixed');
                    $('body').removeClass('width-100');
                    $('#search-header input[type=text]').each(function (index) {
                        if (index == 0) {
                            $(this).val('');
                            $("#search-header").find("input:eq(" + index + ")").css({
                                "border": "none",
                                "border-bottom": "2px solid rgba(255,255,255,0.5)"
                            });
                        }
                    });
                    document.onmousewheel = ScrollStart;
                } else {
                    $('body, html').unbind('touchmove');
                }
            }
        }
    });

    /*==============================================================*/
    //magnificPopup End
    /*==============================================================*/
    $("input.search-input").on("keypress", function (event) {
        if (event.which == 13 && !isMobile) {
            $("button.search-button").trigger("click");
            event.preventDefault();
        }
    });

    $("input.search-input").on("keyup", function (event) {
        if ($(this).val() == null || $(this).val() == "") {
            $(this).css({"border": "none", "border-bottom": "2px solid red"});
        } else {
            $(this).css({"border": "none", "border-bottom": "2px solid rgba(255,255,255,0.5)"});
        }
    });

    $("form.search-form, form.search-form-result").submit(function (event) {
        var error = validationSearchForm();
        if (error) {
            var action = $(this).attr('action');
            action = action == '#' || action == '' ? 'blog-grid-3columns.html' : action;
            action = action + '?' + $(this).serialize();
            window.location = action;
        }

        event.preventDefault();
    });

    $(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-toggle="tab"], a.shopping-cart', function (e) {
        e.preventDefault();
    });

    $(document).on('touchstart click', 'body', function (e) {
        if ($(window).width() < 992) {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('in') && !$(e.target).hasClass('navbar-toggle')) {
                $('.navbar-collapse').collapse('hide');
            }
        } else {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse ul').hasClass('in')) {
                $('.navbar-collapse').find('a.dropdown-toggle').addClass('collapsed');
                $('.navbar-collapse').find('ul.dropdown-menu').removeClass('in');
                $('.navbar-collapse a.dropdown-toggle').removeClass('active');
            }
        }
    });

    $('.navbar-collapse a.dropdown-toggle').on('touchstart', function (e) {
        $('.navbar-collapse a.dropdown-toggle').not(this).removeClass('active');
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');
    });

    $('button.navbar-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $('a.dropdown-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $(document).on('touchstart click', '.navbar-collapse [data-toggle="dropdown"]', function (event) {

        var $innerLinkLI = $(this).parents('ul.navbar-nav').find('li.dropdown a.inner-link').parent('li.dropdown');
        if (!$(this).hasClass('inner-link') && !$(this).hasClass('dropdown-toggle') && $innerLinkLI.hasClass('open')) {
            $innerLinkLI.removeClass('open');
        }
        var target = $(this).attr('target');
        if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').indexOf("#") <= -1 && !$(event.target).is('i')) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() > 991 && $(this).attr('href').indexOf("#") <= -1) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').length > 1 && $(this).attr('href').indexOf("#") >= 0 && $(this).hasClass('inner-link')) {
            $(this).parents('ul.navbar-nav').find('li.dropdown').not($(this).parent('.dropdown')).removeClass('open');
            if ($(this).parent('.dropdown').hasClass('open')) {
                $(this).parent('.dropdown').removeClass('open');
            } else {
                $(this).parent('.dropdown').addClass('open');
            }
            $(this).toggleClass('active');
        }
    });

    /* ===================================
     skillbar
     ====================================== */
    $('.skillbar').appear();
    $('.skillbar').skillBars({
        from: 0,
        speed: 4000,
        interval: 100,
        decimals: 0
    });

    $(document.body).on('appear', '.skillbar', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            $(this).addClass('appear');
            $(this).find('.skillbar-bar').css("width", "0%");
            $(this).skillBars({
                from: 0,
                speed: 4000,
                interval: 100,
                decimals: 0
            });
        }
    });

    /* ===================================
     touchstart click
     ====================================== */
    $('body').on('touchstart click', function (e) {
        if ($(window).width() < 992) {
        }
    });

    /*==============================================================*/
    //Set Resize Header Menu - START CODE
    /*==============================================================*/
    $('nav.full-width-pull-menu ul.panel-group li.dropdown a.dropdown-toggle').on("click", function (e) {
        if ($(this).parent('li').find('ul.dropdown-menu').length > 0) {
            if ($(this).parent('li').hasClass('open')) {
                $(this).parent('li').removeClass('open');
            } else {
                $(this).parent('li').addClass('open');
            }
        }
    });

    /*==============================================================*/
    //accordion  - START CODE
    /*==============================================================*/
    $('.accordion-style1 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-minus"></i>');
    });

    $('.accordion-style1 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-plus"></i>');
    });

    $('.nav.navbar-nav a.inner-link').on("click", function (e) {
        $(this).parents('ul.navbar-nav').find('a.inner-link').removeClass('active');
        var $this = $(this);
        if ($('.nav-header-container .navbar-toggle').is(':visible'))
            $(this).parents('.navbar-collapse').collapse('hide');
        setTimeout(function () {
            $this.addClass('active');
        }, 1000);

    });

    $('.accordion-style2 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    });

    $('.accordion-style2 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    });

    $('.accordion-style3 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    });

    $('.accordion-style3 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    });
    /*==============================================================*/
    //accordion - END CODE
    /*==============================================================*/

    /*==============================================================*/
    //toggles  - START CODE
    /*==============================================================*/
    $('.toggles .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-minus"></i>');
    });

    $('.toggles .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-plus"></i>');
    });

    $('.toggles-style2 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-angle-up"></i>');
    });

    $('.toggles-style2 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fas fa-angle-down"></i>');
    });
    /*==============================================================*/
    //toggles  - END CODE
    /*==============================================================*/

    /* ===================================
     blog hover box
     ====================================== */
    $(document).on("mouseenter", ".blog-post-style4 .grid-item", function (e) {
        $(this).find("figcaption .blog-hover-text").slideDown(300);
    });
    $(document).on("mouseleave", ".blog-post-style4 .grid-item", function (e) {
        $(this).find("figcaption .blog-hover-text").slideUp(300);
    });
    /* ===================================
     End blog hover box
     ====================================== */
    SetResizeContent();

    var $allNonRatinaImages = $("img:not([data-rjs])");
    $allNonRatinaImages.attr('data-no-retina', '');

    /*==============================================================*/
    //demo button  - START CODE
    /*==============================================================*/

    /* var $buythemediv = '<div class="buy-theme alt-font sm-display-none"><a href="https://themeforest.net/item/pofo-creative-agency-corporate-and-portfolio-multipurpose-template/20645944?ref=themezaa" target="_blank"><i class="ti-shopping-cart"></i><span>Buy Theme</span></a></div><div class="all-demo alt-font sm-display-none"><a href="mailto:info@themezaa.com?subject=POFO - Creative Agency, Corporate and Portfolio Multi-purpose Template - Quick Question"><i class="ti-email"></i><span>Quick Question?</span></a></div>';
     $('body').append($buythemediv); */

    /*==============================================================*/
    //demo button  - END CODE
    /*==============================================================*/

    $(document).on("touchstart", ".sidebar-wrapper", function () {
        clearOpen();
    });

    var getNav = $("nav.navbar.bootsnav"), getIn = getNav.find("ul.nav").data("in"),
        getOut = getNav.find("ul.nav").data("out");

    // Hidden dropdown
    function clearOpen() {
        $('li.dropdown').removeClass("on").removeClass("open");
        $(".dropdown-menu").stop().fadeOut('fast');
        $(".dropdown-menu").removeClass(getIn);
        $(".dropdown-menu").addClass(getOut);
    }

});
/* ===================================
 END READY
 ====================================== */


/* ===================================
 START Page Load
 ====================================== */
$(window).load(function () {
    var hash = window.location.hash.substr(1);
    if (hash != "") {
        setTimeout(function () {
            $(window).imagesLoaded(function () {
                var scrollAnimationTime = 1200,
                    scrollAnimation = 'easeInOutExpo';
                var target = '#' + hash;
                if ($(target).length > 0) {

                    $('html, body').stop()
                        .animate({
                            'scrollTop': $(target).offset().top
                        }, scrollAnimationTime, scrollAnimation, function () {
                            window.location.hash = target;
                        });
                }
            });
        }, 500);
    }

    fullScreenHeight();
});
/* ===================================
 END Page Load
 ====================================== */
