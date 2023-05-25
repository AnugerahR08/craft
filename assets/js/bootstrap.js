/*!
 * Bootstrap v5.2.1 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory(require("@popperjs/core")))
    : typeof define === "function" && define.amd
    ? define(["@popperjs/core"], factory)
    : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.bootstrap = factory(global.Popper)));
})(this, function (Popper) {
  "use strict";

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: true,
                  get: () => e[k],
                }
          );
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/ _interopNamespace(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = "transitionend"; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

  const toType = (object) => {
    if (object === null || object === undefined) {
      return `${object}`;
    }

    return Object.prototype.toString
      .call(object)
      .match(/\s([a-z]+)/i)[1]
      .toLowerCase();
  };
  /**
   * Public Util API
   */

  const getUID = (prefix) => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");

    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href"); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttribute || (!hrefAttribute.includes("#") && !hrefAttribute.startsWith("."))) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended

      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }

      selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = (element) => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = (element) => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element

    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first

    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }

    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }

    return typeof object.nodeType !== "undefined";
  };

  const getElement = (object) => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }

    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(object);
    }

    return null;
  };

  const isVisible = (element) => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible"; // Handle `details` element as its content may falsie appear visible when it is closed

    const closedDetails = element.closest("details:not([open])");

    if (!closedDetails) {
      return elementIsVisible;
    }

    if (closedDetails !== element) {
      const summary = element.closest("summary");

      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }

      if (summary === null) {
        return false;
      }
    }

    return elementIsVisible;
  };

  const isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains("disabled")) {
      return true;
    }

    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }

    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };

  const findShadowRoot = (element) => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document

    if (typeof element.getRootNode === "function") {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root

    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */

  const reflow = (element) => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === "rtl";

  const defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = (callback) => {
    if (typeof callback === "function") {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({ target }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */

  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed

    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout",
  };
  const nativeEvents = new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll",
  ]);
  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return (uid && `${uid}::${uidEvent++}`) || element.uidEvent || uidEvent++;
  }

  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element,
      });

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }

          hydrateObj(event, {
            delegateTarget: target,
          });

          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    };
  }

  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }

  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string"; // todo: tooltip passes `false` instead of selector, so we need to check

    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);

    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }

    return [isDelegated, callable, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }

    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn) => {
        return function (event) {
          if (!event.relatedTarget || (event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget))) {
            return fn.call(this, event);
          }
        };
      };

      callable = wrapFunction(callable);
    }

    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }

    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    for (const handlerKey of Object.keys(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },

    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },

    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }

      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");

      if (typeof callable !== "undefined") {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }

        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }

      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }

      for (const keyHandlers of Object.keys(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },

    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      let evt = new Event(event, {
        bubbles,
        cancelable: true,
      });
      evt = hydrateObj(evt, args);

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }

      return evt;
    },
  };

  function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,

          get() {
            return value;
          },
        });
      }
    }

    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */
  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    },
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    if (value === Number(value).toString()) {
      return Number(value);
    }

    if (value === "" || value === "null") {
      return null;
    }

    if (typeof value !== "string") {
      return value;
    }

    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));

      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }

      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    },
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }

    static get DefaultType() {
      return {};
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      return config;
    }

    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, "config") : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === "object" ? jsonConfig : {}),
        ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === "object" ? config : {}),
      };
    }

    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const property of Object.keys(configTypes)) {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = isElement(value) ? "element" : toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const VERSION = "5.2.1";
  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    } // Public

    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);

      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    } // Static

    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = "hide") => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }

      if (isDisabled(this)) {
        return;
      }

      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$f = "alert";
  const DATA_KEY$a = "bs.alert";
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = "fade";
  const CLASS_NAME_SHOW$8 = "show";
  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    } // Public

    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

      if (closeEvent.defaultPrevented) {
        return;
      }

      this._element.classList.remove(CLASS_NAME_SHOW$8);

      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private

    _destroyElement() {
      this._element.remove();

      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);

        if (typeof config !== "string") {
          return;
        }

        if (data[config] === undefined || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }
  }
  /**
   * Data API implementation
   */

  enableDismissTrigger(Alert, "close");
  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$e = "button";
  const DATA_KEY$9 = "bs.button";
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = ".data-api";
  const CLASS_NAME_ACTIVE$3 = "active";
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    } // Public

    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);

        if (config === "toggle") {
          data[config]();
        }
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);

      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$d = "swipe";
  const EVENT_KEY$9 = ".bs.swipe";
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = "touch";
  const POINTER_TYPE_PEN = "pen";
  const CLASS_NAME_POINTER_EVENT = "pointer-event";
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null,
  };
  const DefaultType$c = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)",
  };
  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;

      if (!element || !Swipe.isSupported()) {
        return;
      }

      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);

      this._initEvents();
    } // Getters

    static get Default() {
      return Default$c;
    }

    static get DefaultType() {
      return DefaultType$c;
    }

    static get NAME() {
      return NAME$d;
    } // Public

    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    } // Private

    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }

      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }

    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }

      this._handleSwipe();

      execute(this._config.endCallback);
    }

    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }

    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);

      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }

      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;

      if (!direction) {
        return;
      }

      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }

    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
      }
    }

    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    } // Static

    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$c = "carousel";
  const DATA_KEY$8 = "bs.carousel";
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = ".data-api";
  const ARROW_LEFT_KEY$1 = "ArrowLeft";
  const ARROW_RIGHT_KEY$1 = "ArrowRight";
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = "next";
  const ORDER_PREV = "prev";
  const DIRECTION_LEFT = "left";
  const DIRECTION_RIGHT = "right";
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = "carousel";
  const CLASS_NAME_ACTIVE$2 = "active";
  const CLASS_NAME_SLIDE = "slide";
  const CLASS_NAME_END = "carousel-item-end";
  const CLASS_NAME_START = "carousel-item-start";
  const CLASS_NAME_NEXT = "carousel-item-next";
  const CLASS_NAME_PREV = "carousel-item-prev";
  const SELECTOR_ACTIVE = ".active";
  const SELECTOR_ITEM = ".carousel-item";
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = ".carousel-item img";
  const SELECTOR_INDICATORS = ".carousel-indicators";
  const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT,
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: "hover",
    ride: false,
    touch: true,
    wrap: true,
  };
  const DefaultType$b = {
    interval: "(number|boolean)",
    // TODO:v6 remove boolean support
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean",
  };
  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);

      this._addEventListeners();

      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    } // Getters

    static get Default() {
      return Default$b;
    }

    static get DefaultType() {
      return DefaultType$b;
    }

    static get NAME() {
      return NAME$c;
    } // Public

    next() {
      this._slide(ORDER_NEXT);
    }

    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }

    prev() {
      this._slide(ORDER_PREV);
    }

    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }

      this._clearInterval();
    }

    cycle() {
      this._clearInterval();

      this._updateInterval();

      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }

    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }

      this.cycle();
    }

    to(index) {
      const items = this._getItems();

      if (index > items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }

      const activeIndex = this._getItemIndex(this._getActive());

      if (activeIndex === index) {
        return;
      }

      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, items[index]);
    }

    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }

      super.dispose();
    } // Private

    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
      }

      if (this._config.pause === "hover") {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }

      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
      }

      const endCallBack = () => {
        if (this._config.pause !== "hover") {
          return;
        } // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause();

        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }

        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };

      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack,
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(this._directionToOrder(direction));
      }
    }

    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }

    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }

      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute("aria-current");
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);

      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute("aria-current", "true");
      }
    }

    _updateInterval() {
      const element = this._activeElement || this._getActive();

      if (!element) {
        return;
      }

      const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }

    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }

      const activeElement = this._getActive();

      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);

      if (nextElement === activeElement) {
        return;
      }

      const nextElementIndex = this._getItemIndex(nextElement);

      const triggerEvent = (eventName) => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex,
        });
      };

      const slideEvent = triggerEvent(EVENT_SLIDE);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // todo: change tests that use empty divs to avoid this check
        return;
      }

      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;

      this._setActiveIndicatorElement(nextElementIndex);

      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };

      this._queueCallback(completeCallBack, activeElement, this._isAnimated());

      if (isCycling) {
        this.cycle();
      }
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }

    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }

    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }

    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }

    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }

    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);

        if (typeof config === "number") {
          data.to(config);
          return;
        }

        if (typeof config === "string") {
          if (data[config] === undefined || config.startsWith("_") || config === "constructor") {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute("data-bs-slide-to");

    if (slideIndex) {
      carousel.to(slideIndex);

      carousel._maybeEnableCycle();

      return;
    }

    if (Manipulator.getDataAttribute(this, "slide") === "next") {
      carousel.next();

      carousel._maybeEnableCycle();

      return;
    }

    carousel.prev();

    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$b = "collapse";
  const DATA_KEY$7 = "bs.collapse";
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = ".data-api";
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = "show";
  const CLASS_NAME_COLLAPSE = "collapse";
  const CLASS_NAME_COLLAPSING = "collapsing";
  const CLASS_NAME_COLLAPSED = "collapsed";
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
  const WIDTH = "width";
  const HEIGHT = "height";
  const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true,
  };
  const DefaultType$a = {
    parent: "(null|element)",
    toggle: "boolean",
  };
  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (const elem of toggleList) {
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);

        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters

    static get Default() {
      return Default$a;
    }

    static get DefaultType() {
      return DefaultType$a;
    }

    static get NAME() {
      return NAME$b;
    } // Public

    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }

      let activeChildren = []; // find active children

      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES)
          .filter((element) => element !== this._element)
          .map((element) =>
            Collapse.getOrCreateInstance(element, {
              toggle: false,
            })
          );
      }

      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);

      if (startEvent.defaultPrevented) {
        return;
      }

      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

        this._element.style[dimension] = "";
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);

      if (startEvent.defaultPrevented) {
        return;
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      for (const trigger of this._triggerArray) {
        const element = getElementFromSelector(trigger);

        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };

      this._element.style[dimension] = "";

      this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    } // Private

    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values

      config.parent = getElement(config.parent);
      return config;
    }

    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }

    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }

      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);

      for (const element of children) {
        const selected = getElementFromSelector(element);

        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }

    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

      return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }

      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute("aria-expanded", isOpen);
      }
    } // Static

    static jQueryInterface(config) {
      const _config = {};

      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === "A" || (event.delegateTarget && event.delegateTarget.tagName === "A")) {
      event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    for (const element of selectorElements) {
      Collapse.getOrCreateInstance(element, {
        toggle: false,
      }).toggle();
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$a = "dropdown";
  const DATA_KEY$6 = "bs.dropdown";
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = ".data-api";
  const ESCAPE_KEY$2 = "Escape";
  const TAB_KEY$1 = "Tab";
  const ARROW_UP_KEY$1 = "ArrowUp";
  const ARROW_DOWN_KEY$1 = "ArrowDown";
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = "show";
  const CLASS_NAME_DROPUP = "dropup";
  const CLASS_NAME_DROPEND = "dropend";
  const CLASS_NAME_DROPSTART = "dropstart";
  const CLASS_NAME_DROPUP_CENTER = "dropup-center";
  const CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = ".dropdown-menu";
  const SELECTOR_NAVBAR = ".navbar";
  const SELECTOR_NAVBAR_NAV = ".navbar-nav";
  const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
  const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
  const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
  const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
  const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
  const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
  const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
  const PLACEMENT_TOPCENTER = "top";
  const PLACEMENT_BOTTOMCENTER = "bottom";
  const Default$9 = {
    autoClose: true,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle",
  };
  const DefaultType$9 = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)",
  };
  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0];
      this._inNavbar = this._detectNavbar();
    } // Getters

    static get Default() {
      return Default$9;
    }

    static get DefaultType() {
      return DefaultType$9;
    }

    static get NAME() {
      return NAME$a;
    } // Public

    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }

    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element,
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._createPopper(); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, "mouseover", noop);
        }
      }

      this._element.focus();

      this._element.setAttribute("aria-expanded", true);

      this._menu.classList.add(CLASS_NAME_SHOW$6);

      this._element.classList.add(CLASS_NAME_SHOW$6);

      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }

    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element,
      };

      this._completeHide(relatedTarget);
    }

    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      super.dispose();
    }

    update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private

    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, "mouseover", noop);
        }
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$6);

      this._element.classList.remove(CLASS_NAME_SHOW$6);

      this._element.setAttribute("aria-expanded", "false");

      Manipulator.removeDataAttribute(this._menu, "popper");
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }

    _getConfig(config) {
      config = super._getConfig(config);

      if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }

      return config;
    }

    _createPopper() {
      if (typeof Popper__namespace === "undefined") {
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      }

      let referenceElement = this._element;

      if (this._config.reference === "parent") {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === "object") {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
    }

    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }

    _getPlacement() {
      const parentDropdown = this._parent;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      } // We need to trim the value because custom properties can also include spaces

      const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }

    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }

    _getOffset() {
      const { offset } = this._config;

      if (typeof offset === "string") {
        return offset.split(",").map((value) => Number.parseInt(value, 10));
      }

      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }

      return offset;
    }

    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: this._config.boundary,
            },
          },
          {
            name: "offset",
            options: {
              offset: this._getOffset(),
            },
          },
        ],
      }; // Disable Popper if we have a static display or Dropdown is in Navbar

      if (this._inNavbar || this._config.display === "static") {
        Manipulator.setDataAttribute(this._menu, "popper", "static"); // todo:v6 remove

        defaultBsPopperConfig.modifiers = [
          {
            name: "applyStyles",
            enabled: false,
          },
        ];
      }

      return { ...defaultBsPopperConfig, ...(typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig) };
    }

    _selectMenuItem({ key, target }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY

      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);

        if (typeof config !== "string") {
          return;
        }

        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || (event.type === "keyup" && event.key !== TAB_KEY$1)) {
        return;
      }

      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);

      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || (context._config.autoClose === "inside" && !isMenuTarget) || (context._config.autoClose === "outside" && isMenuTarget)) {
          continue;
        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu

        if (context._menu.contains(event.target) && ((event.type === "keyup" && event.key === TAB_KEY$1) || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }

        const relatedTarget = {
          relatedTarget: context._element,
        };

        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }

        context._completeHide(relatedTarget);
      }
    }

    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);

      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }

      if (isInput && !isEscapeEvent) {
        return;
      }

      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0];
      const instance = Dropdown.getOrCreateInstance(getToggleButton);

      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();

        instance._selectMenuItem(event);

        return;
      }

      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  const SELECTOR_STICKY_CONTENT = ".sticky-top";
  const PROPERTY_PADDING = "padding-right";
  const PROPERTY_MARGIN = "margin-right";
  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    } // Public

    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width

      this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth

      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
    }

    reset() {
      this._resetElementAttributes(this._element, "overflow");

      this._resetElementAttributes(this._element, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }

    isOverflowing() {
      return this.getWidth() > 0;
    } // Private

    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow");

      this._element.style.overflow = "hidden";
    }

    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = (element) => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProperty);

        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = (element) => {
        const value = Manipulator.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }

        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }

      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$9 = "backdrop";
  const CLASS_NAME_FADE$4 = "fade";
  const CLASS_NAME_SHOW$5 = "show";
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: "body", // give the choice to place backdrop under different elements
  };
  const DefaultType$8 = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)",
  };
  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    } // Getters

    static get Default() {
      return Default$8;
    }

    static get DefaultType() {
      return DefaultType$8;
    }

    static get NAME() {
      return NAME$9;
    } // Public

    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      const element = this._getElement();

      if (this._config.isAnimated) {
        reflow(element);
      }

      element.classList.add(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    } // Private

    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement("div");
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      const element = this._getElement();

      this._config.rootElement.append(element);

      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$8 = "focustrap";
  const DATA_KEY$5 = "bs.focustrap";
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = "Tab";
  const TAB_NAV_FORWARD = "forward";
  const TAB_NAV_BACKWARD = "backward";
  const Default$7 = {
    autofocus: true,
    trapElement: null, // The element to trap focus inside of
  };
  const DefaultType$7 = {
    autofocus: "boolean",
    trapElement: "element",
  };
  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    } // Getters

    static get Default() {
      return Default$7;
    }

    static get DefaultType() {
      return DefaultType$7;
    }

    static get NAME() {
      return NAME$8;
    } // Public

    activate() {
      if (this._isActive) {
        return;
      }

      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }

      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    } // Private

    _handleFocusin(event) {
      const { trapElement } = this._config;

      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }

      const elements = SelectorEngine.focusableChildren(trapElement);

      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$7 = "modal";
  const DATA_KEY$4 = "bs.modal";
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = ".data-api";
  const ESCAPE_KEY$1 = "Escape";
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = "modal-open";
  const CLASS_NAME_FADE$3 = "fade";
  const CLASS_NAME_SHOW$4 = "show";
  const CLASS_NAME_STATIC = "modal-static";
  const OPEN_SELECTOR$1 = ".modal.show";
  const SELECTOR_DIALOG = ".modal-dialog";
  const SELECTOR_MODAL_BODY = ".modal-body";
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true,
  };
  const DefaultType$6 = {
    backdrop: "(boolean|string)",
    focus: "boolean",
    keyboard: "boolean",
  };
  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();

      this._addEventListeners();
    } // Getters

    static get Default() {
      return Default$6;
    }

    static get DefaultType() {
      return DefaultType$6;
    }

    static get NAME() {
      return NAME$7;
    } // Public

    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget,
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._isTransitioning = true;

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._backdrop.show(() => this._showElement(relatedTarget));
    }

    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;
      this._isTransitioning = true;

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }

    dispose() {
      for (const htmlElement of [window, this._dialog]) {
        EventHandler.off(htmlElement, EVENT_KEY$4);
      }

      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    }

    handleUpdate() {
      this._adjustDialog();
    } // Private

    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated(),
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element,
      });
    }

    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }

      this._element.style.display = "block";

      this._element.removeAttribute("aria-hidden");

      this._element.setAttribute("aria-modal", true);

      this._element.setAttribute("role", "dialog");

      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW$4);

      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }

        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget,
        });
      };

      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }

        if (this._config.keyboard) {
          event.preventDefault();
          this.hide();
          return;
        }

        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
          // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
          if (this._dialog.contains(event.target) || this._dialog.contains(event2.target)) {
            return;
          }

          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();

            return;
          }

          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }

    _hideModal() {
      this._element.style.display = "none";

      this._element.setAttribute("aria-hidden", true);

      this._element.removeAttribute("aria-modal");

      this._element.removeAttribute("role");

      this._isTransitioning = false;

      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }

    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

      if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        this._element.style.overflowY = "hidden";
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);

        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);

      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      const scrollbarWidth = this._scrollBar.getWidth();

      const isBodyOverflowing = scrollbarWidth > 0;

      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? "paddingLeft" : "paddingRight";
        this._element.style[property] = `${scrollbarWidth}px`;
      }

      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? "paddingRight" : "paddingLeft";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = "";
      this._element.style.paddingRight = "";
    } // Static

    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== "string") {
          return;
        }

        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](relatedTarget);
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this);

    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$4, (showEvent) => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    }); // avoid conflict when clicking modal toggler while another one is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$6 = "offcanvas";
  const DATA_KEY$3 = "bs.offcanvas";
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = ".data-api";
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = "Escape";
  const CLASS_NAME_SHOW$3 = "show";
  const CLASS_NAME_SHOWING$1 = "showing";
  const CLASS_NAME_HIDING = "hiding";
  const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
  const OPEN_SELECTOR = ".offcanvas.show";
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false,
  };
  const DefaultType$5 = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    scroll: "boolean",
  };
  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();

      this._addEventListeners();
    } // Getters

    static get Default() {
      return Default$5;
    }

    static get DefaultType() {
      return DefaultType$5;
    }

    static get NAME() {
      return NAME$6;
    } // Public

    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget,
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }

      this._element.setAttribute("aria-modal", true);

      this._element.setAttribute("role", "dialog");

      this._element.classList.add(CLASS_NAME_SHOWING$1);

      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }

        this._element.classList.add(CLASS_NAME_SHOW$3);

        this._element.classList.remove(CLASS_NAME_SHOWING$1);

        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget,
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
      if (!this._isShown) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._focustrap.deactivate();

      this._element.blur();

      this._isShown = false;

      this._element.classList.add(CLASS_NAME_HIDING);

      this._backdrop.hide();

      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);

        this._element.removeAttribute("aria-modal");

        this._element.removeAttribute("role");

        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };

      this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    } // Private

    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === "static") {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      }; // 'static' option will be translated to true, and booleans will keep their value

      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null,
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element,
      });
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }

        if (!this._config.keyboard) {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      });
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== "string") {
          return;
        }

        if (data[config] === undefined || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this);

    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) {
      if (getComputedStyle(element).position !== "fixed") {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttributes = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
      }

      return true;
    } // Check if a regular expression validates the attribute.

    return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
  };

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: [],
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFunction && typeof sanitizeFunction === "function") {
      return sanitizeFunction(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
    const elements = [].concat(...createdDocument.body.querySelectorAll("*"));

    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();

      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }

      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);

      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$5 = "TemplateFactory";
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: "",
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: "<div></div>",
  };
  const DefaultType$4 = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string",
  };
  const DefaultContentType = {
    entry: "(string|element|function|null)",
    selector: "(string|element)",
  };
  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    } // Getters

    static get Default() {
      return Default$4;
    }

    static get DefaultType() {
      return DefaultType$4;
    }

    static get NAME() {
      return NAME$5;
    } // Public

    getContent() {
      return Object.values(this._config.content)
        .map((config) => this._resolvePossibleFunction(config))
        .filter(Boolean);
    }

    hasContent() {
      return this.getContent().length > 0;
    }

    changeContent(content) {
      this._checkContent(content);

      this._config.content = { ...this._config.content, ...content };
      return this;
    }

    toHtml() {
      const templateWrapper = document.createElement("div");
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }

      const template = templateWrapper.children[0];

      const extraClass = this._resolvePossibleFunction(this._config.extraClass);

      if (extraClass) {
        template.classList.add(...extraClass.split(" "));
      }

      return template;
    } // Private

    _typeCheckConfig(config) {
      super._typeCheckConfig(config);

      this._checkContent(config.content);
    }

    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig(
          {
            selector,
            entry: content,
          },
          DefaultContentType
        );
      }
    }

    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);

      if (!templateElement) {
        return;
      }

      content = this._resolvePossibleFunction(content);

      if (!content) {
        templateElement.remove();
        return;
      }

      if (isElement(content)) {
        this._putElementInTemplate(getElement(content), templateElement);

        return;
      }

      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }

      templateElement.textContent = content;
    }

    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === "function" ? arg(this) : arg;
    }

    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = "";
        templateElement.append(element);
        return;
      }

      templateElement.textContent = element.textContent;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$4 = "tooltip";
  const DISALLOWED_ATTRIBUTES = new Set(["sanitize", "allowList", "sanitizeFn"]);
  const CLASS_NAME_FADE$2 = "fade";
  const CLASS_NAME_MODAL = "modal";
  const CLASS_NAME_SHOW$2 = "show";
  const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = "hide.bs.modal";
  const TRIGGER_HOVER = "hover";
  const TRIGGER_FOCUS = "focus";
  const TRIGGER_CLICK = "click";
  const TRIGGER_MANUAL = "manual";
  const EVENT_HIDE$2 = "hide";
  const EVENT_HIDDEN$2 = "hidden";
  const EVENT_SHOW$2 = "show";
  const EVENT_SHOWN$2 = "shown";
  const EVENT_INSERTED = "inserted";
  const EVENT_CLICK$1 = "click";
  const EVENT_FOCUSIN$1 = "focusin";
  const EVENT_FOCUSOUT$1 = "focusout";
  const EVENT_MOUSEENTER = "mouseenter";
  const EVENT_MOUSELEAVE = "mouseleave";
  const AttachmentMap = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: isRTL() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: isRTL() ? "right" : "left",
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: "clippingParents",
    container: false,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: false,
    offset: [0, 0],
    placement: "top",
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + "</div>",
    title: "",
    trigger: "hover focus",
  };
  const DefaultType$3 = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
  };
  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper__namespace === "undefined") {
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      }

      super(element, config); // Private

      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null; // Protected

      this.tip = null;

      this._setListeners();
    } // Getters

    static get Default() {
      return Default$3;
    }

    static get DefaultType() {
      return DefaultType$3;
    }

    static get NAME() {
      return NAME$4;
    } // Public

    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        const context = this._initializeOnDelegatedTarget(event);

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter();
        } else {
          context._leave();
        }

        return;
      }

      if (this._isShown()) {
        this._leave();

        return;
      }

      this._enter();
    }

    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      if (this._config.originalTitle) {
        this._element.setAttribute("title", this._config.originalTitle);
      }

      this._disposePopper();

      super.dispose();
    }

    show() {
      if (this._element.style.display === "none") {
        throw new Error("Please use show on visible elements");
      }

      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);

      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      } // todo v6 remove this OR make it optional

      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }

      const tip = this._getTipElement();

      this._element.setAttribute("aria-describedby", tip.getAttribute("id"));

      const { container } = this._config;

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = this._createPopper(tip);
      }

      tip.classList.add(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, "mouseover", noop);
        }
      }

      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));

        if (this._isHovered === false) {
          this._leave();
        }

        this._isHovered = false;
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    hide() {
      if (!this._isShown()) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));

      if (hideEvent.defaultPrevented) {
        return;
      }

      const tip = this._getTipElement();

      tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, "mouseover", noop);
        }
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }

        if (!this._isHovered) {
          tip.remove();
        }

        this._element.removeAttribute("aria-describedby");

        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));

        this._disposePopper();
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    update() {
      if (this._popper) {
        this._popper.update();
      }
    } // Protected

    _isWithContent() {
      return Boolean(this._getTitle());
    }

    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }

      return this.tip;
    }

    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6

      if (!tip) {
        return null;
      }

      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2); // todo: on v6 the following can be achieved with CSS only

      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute("id", tipId);

      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }

      return tip;
    }

    setContent(content) {
      this._newContent = content;

      if (this._isShown()) {
        this._disposePopper();

        this.show();
      }
    }

    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass),
        });
      }

      return this._templateFactory;
    }

    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle(),
      };
    }

    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._config.originalTitle;
    } // Private

    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }

    _isAnimated() {
      return this._config.animation || (this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2));
    }

    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }

    _createPopper(tip) {
      const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
      const attachment = AttachmentMap[placement.toUpperCase()];
      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }

    _getOffset() {
      const { offset } = this._config;

      if (typeof offset === "string") {
        return offset.split(",").map((value) => Number.parseInt(value, 10));
      }

      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }

      return offset;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === "function" ? arg.call(this._element) : arg;
    }

    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [
          {
            name: "flip",
            options: {
              fallbackPlacements: this._config.fallbackPlacements,
            },
          },
          {
            name: "offset",
            options: {
              offset: this._getOffset(),
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: this._config.boundary,
            },
          },
          {
            name: "arrow",
            options: {
              element: `.${this.constructor.NAME}-arrow`,
            },
          },
          {
            name: "preSetPlacement",
            enabled: true,
            phase: "beforeMain",
            fn: (data) => {
              // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
              // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
              this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
            },
          },
        ],
      };
      return { ...defaultBsPopperConfig, ...(typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig) };
    }

    _setListeners() {
      const triggers = this._config.trigger.split(" ");

      for (const trigger of triggers) {
        if (trigger === "click") {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event) => this.toggle(event));
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

            context._leave();
          });
        }
      }

      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };

      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this._config.selector) {
        this._config = { ...this._config, trigger: "manual", selector: "" };
      } else {
        this._fixTitle();
      }
    }

    _fixTitle() {
      const title = this._config.originalTitle;

      if (!title) {
        return;
      }

      if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
        this._element.setAttribute("aria-label", title);
      }

      this._element.removeAttribute("title");
    }

    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }

      this._isHovered = true;

      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }

    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }

      this._isHovered = false;

      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }

    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }

    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }

    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);

      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }

      config = { ...dataAttributes, ...(typeof config === "object" && config ? config : {}) };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === "number") {
        config.delay = {
          show: config.delay,
          hide: config.delay,
        };
      }

      config.originalTitle = this._element.getAttribute("title") || "";

      if (typeof config.title === "number") {
        config.title = config.title.toString();
      }

      if (typeof config.content === "number") {
        config.content = config.content.toString();
      }

      return config;
    }

    _getDelegateConfig() {
      const config = {};

      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      } // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`

      return config;
    }

    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config !== "string") {
          return;
        }

        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }
  }
  /**
   * jQuery
   */

  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$3 = "popover";
  const SELECTOR_TITLE = ".popover-header";
  const SELECTOR_CONTENT = ".popover-body";
  const Default$2 = {
    ...Tooltip.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + "</div>",
    trigger: "click",
  };
  const DefaultType$2 = { ...Tooltip.DefaultType, content: "(null|string|element|function)" };
  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }

    static get DefaultType() {
      return DefaultType$2;
    }

    static get NAME() {
      return NAME$3;
    } // Overrides

    _isWithContent() {
      return this._getTitle() || this._getContent();
    } // Private

    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent(),
      };
    }

    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);

        if (typeof config !== "string") {
          return;
        }

        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }
  }
  /**
   * jQuery
   */

  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$2 = "scrollspy";
  const DATA_KEY$2 = "bs.scrollspy";
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = ".data-api";
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
  const CLASS_NAME_ACTIVE$1 = "active";
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = "[href]";
  const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
  const SELECTOR_NAV_LINKS = ".nav-link";
  const SELECTOR_NAV_ITEMS = ".nav-item";
  const SELECTOR_LIST_ITEMS = ".list-group-item";
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = ".dropdown";
  const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "0px 0px -25%",
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1],
  };
  const DefaultType$1 = {
    offset: "(number|null)",
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array",
  };
  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0,
      };
      this.refresh(); // initialize
    } // Getters

    static get Default() {
      return Default$1;
    }

    static get DefaultType() {
      return DefaultType$1;
    }

    static get NAME() {
      return NAME$2;
    } // Public

    refresh() {
      this._initializeTargetsAndObservables();

      this._maybeEnableSmoothScroll();

      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }

      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }

    dispose() {
      this._observer.disconnect();

      super.dispose();
    } // Private

    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;

      if (typeof config.threshold === "string") {
        config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
      }

      return config;
    }

    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      } // unregister any previous listeners

      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
        const observableSection = this._observableSections.get(event.target.hash);

        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;

          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: "smooth",
            });
            return;
          } // Chrome 60 doesn't support `scrollTo`

          root.scrollTop = height;
        }
      });
    }

    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      };
      return new IntersectionObserver((entries) => this._observerCallback(entries), options);
    } // The logic of selection

    _observerCallback(entries) {
      const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);

      const activate = (entry) => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;

        this._process(targetElement(entry));
      };

      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;

      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;

          this._clearActiveClass(targetElement(entry));

          continue;
        }

        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

          if (!parentScrollTop) {
            return;
          }

          continue;
        } // if we are scrolling up, pick the smallest offsetTop

        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }

    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);

      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }

        const observableSection = SelectorEngine.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

        if (isVisible(observableSection)) {
          this._targetLinks.set(anchor.hash, anchor);

          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }

    _process(target) {
      if (this._activeTarget === target) {
        return;
      }

      this._clearActiveClass(this._config.target);

      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);

      this._activateParents(target);

      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target,
      });
    }

    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }

      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }

    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);

      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== "string") {
          return;
        }

        if (data[config] === undefined || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$1 = "tab";
  const DATA_KEY$1 = "bs.tab";
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = "ArrowLeft";
  const ARROW_RIGHT_KEY = "ArrowRight";
  const ARROW_UP_KEY = "ArrowUp";
  const ARROW_DOWN_KEY = "ArrowDown";
  const CLASS_NAME_ACTIVE = "active";
  const CLASS_NAME_FADE$1 = "fade";
  const CLASS_NAME_SHOW$1 = "show";
  const CLASS_DROPDOWN = "dropdown";
  const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
  const SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
  const SELECTOR_DROPDOWN_ITEM = ".dropdown-item";
  const NOT_SELECTOR_DROPDOWN_TOGGLE = ":not(.dropdown-toggle)";
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = ".nav-item, .list-group-item";
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);

      if (!this._parent) {
        return; // todo: should Throw exception on v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      } // Set up initial aria attributes

      this._setInitialAttributes(this._parent, this._getChildren());

      EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    } // Getters

    static get NAME() {
      return NAME$1;
    } // Public

    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;

      if (this._elemIsActive(innerElem)) {
        return;
      } // Search for active tab on same parent to deactivate it

      const active = this._getActiveElem();

      const hideEvent = active
        ? EventHandler.trigger(active, EVENT_HIDE$1, {
            relatedTarget: innerElem,
          })
        : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active,
      });

      if (showEvent.defaultPrevented || (hideEvent && hideEvent.defaultPrevented)) {
        return;
      }

      this._deactivate(active, innerElem);

      this._activate(innerElem, active);
    } // Private

    _activate(element, relatedElem) {
      if (!element) {
        return;
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      this._activate(getElementFromSelector(element)); // Search and activate/show the proper section

      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }

        element.focus();
        element.removeAttribute("tabindex");
        element.setAttribute("aria-selected", true);

        this._toggleDropDown(element, true);

        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem,
        });
      };

      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }

      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();

      this._deactivate(getElementFromSelector(element)); // Search and deactivate the shown section too

      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }

        element.setAttribute("aria-selected", false);
        element.setAttribute("tabindex", "-1");

        this._toggleDropDown(element, false);

        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem,
        });
      };

      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
        return;
      }

      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

      event.preventDefault();
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      const nextActiveElement = getNextActiveElement(
        this._getChildren().filter((element) => !isDisabled(element)),
        event.target,
        isNext,
        true
      );

      if (nextActiveElement) {
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }

    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }

    _getActiveElem() {
      return this._getChildren().find((child) => this._elemIsActive(child)) || null;
    }

    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, "role", "tablist");

      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }

    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);

      const isActive = this._elemIsActive(child);

      const outerElem = this._getOuterElement(child);

      child.setAttribute("aria-selected", isActive);

      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, "role", "presentation");
      }

      if (!isActive) {
        child.setAttribute("tabindex", "-1");
      }

      this._setAttributeIfNotExists(child, "role", "tab"); // set attributes to the related panel too

      this._setInitialAttributesOnTargetPanel(child);
    }

    _setInitialAttributesOnTargetPanel(child) {
      const target = getElementFromSelector(child);

      if (!target) {
        return;
      }

      this._setAttributeIfNotExists(target, "role", "tabpanel");

      if (child.id) {
        this._setAttributeIfNotExists(target, "aria-labelledby", `#${child.id}`);
      }
    }

    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);

      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }

      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);

        if (element) {
          element.classList.toggle(className, open);
        }
      };

      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      toggle(SELECTOR_DROPDOWN_ITEM, CLASS_NAME_ACTIVE);
      outerElem.setAttribute("aria-expanded", open);
    }

    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }

    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    } // Try to get the inner element (usually the .nav-link)

    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    } // Try to get the outer element (usually the .nav-item)

    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);

        if (typeof config !== "string") {
          return;
        }

        if (data[config] === undefined || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }
  }
  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    Tab.getOrCreateInstance(this).show();
  });
  /**
   * Initialize on focus
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = "toast";
  const DATA_KEY = "bs.toast";
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = "fade";
  const CLASS_NAME_HIDE = "hide"; // @deprecated - kept here only for backwards compatibility

  const CLASS_NAME_SHOW = "show";
  const CLASS_NAME_SHOWING = "showing";
  const DefaultType = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number",
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000,
  };
  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;

      this._setListeners();
    } // Getters

    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public

    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);

        EventHandler.trigger(this._element, EVENT_SHOWN);

        this._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    hide() {
      if (!this.isShown()) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated

        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);

        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    dispose() {
      this._clearTimeout();

      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      super.dispose();
    }

    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    } // Private

    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }

    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = isInteracting;
          break;

        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = isInteracting;
          break;
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      const nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }

    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
    }

    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);

        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config](this);
        }
      });
    }
  }
  /**
   * Data API implementation
   */

  enableDismissTrigger(Toast);
  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.1): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip,
  };

  return index_umd;
});
//# sourceMappingURL=bootstrap.js.map

// js-2
//
// Global init of core components
//

// Init components
var KTComponents = (function () {
  // Public methods
  return {
    init: function () {
      KTApp.init();
      KTDrawer.init();
      KTMenu.init();
      KTScroll.init();
      KTSticky.init();
      KTSwapper.init();
      KTToggle.init();
      KTScrolltop.init();
      KTDialer.init();
      KTImageInput.init();
      KTPasswordMeter.init();
    },
  };
})();

// On document ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    KTComponents.init();
  });
} else {
  KTComponents.init();
}

// Init page loader
window.addEventListener("load", function () {
  KTApp.hidePageLoading();
});

// Declare KTApp for Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  window.KTComponents = module.exports = KTComponents;
}
("use strict");

// Class definition
var KTApp = (function () {
  var initialized = false;
  var select2FocusFixInitialized = false;
  var countUpInitialized = false;

  var createBootstrapTooltip = function (el, options) {
    if (el.getAttribute("data-kt-initialized") === "1") {
      return;
    }

    var delay = {};

    // Handle delay options
    if (el.hasAttribute("data-bs-delay-hide")) {
      delay["hide"] = el.getAttribute("data-bs-delay-hide");
    }

    if (el.hasAttribute("data-bs-delay-show")) {
      delay["show"] = el.getAttribute("data-bs-delay-show");
    }

    if (delay) {
      options["delay"] = delay;
    }

    // Check dismiss options
    if (el.hasAttribute("data-bs-dismiss") && el.getAttribute("data-bs-dismiss") == "click") {
      options["dismiss"] = "click";
    }

    // Initialize popover
    var tp = new bootstrap.Tooltip(el, options);

    // Handle dismiss
    if (options["dismiss"] && options["dismiss"] === "click") {
      // Hide popover on element click
      el.addEventListener("click", function (e) {
        tp.hide();
      });
    }

    el.setAttribute("data-kt-initialized", "1");

    return tp;
  };

  var createBootstrapTooltips = function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      createBootstrapTooltip(tooltipTriggerEl, {});
    });
  };

  var createBootstrapPopover = function (el, options) {
    if (el.getAttribute("data-kt-initialized") === "1") {
      return;
    }

    var delay = {};

    // Handle delay options
    if (el.hasAttribute("data-bs-delay-hide")) {
      delay["hide"] = el.getAttribute("data-bs-delay-hide");
    }

    if (el.hasAttribute("data-bs-delay-show")) {
      delay["show"] = el.getAttribute("data-bs-delay-show");
    }

    if (delay) {
      options["delay"] = delay;
    }

    // Handle dismiss option
    if (el.getAttribute("data-bs-dismiss") == "true") {
      options["dismiss"] = true;
    }

    if (options["dismiss"] === true) {
      options["template"] =
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><span class="popover-dismiss btn btn-icon"></span><h3 class="popover-header"></h3><div class="popover-body"></div></div>';
    }

    // Initialize popover
    var popover = new bootstrap.Popover(el, options);

    // Handle dismiss click
    if (options["dismiss"] === true) {
      var dismissHandler = function (e) {
        popover.hide();
      };

      el.addEventListener("shown.bs.popover", function () {
        var dismissEl = document.getElementById(el.getAttribute("aria-describedby"));
        dismissEl.addEventListener("click", dismissHandler);
      });

      el.addEventListener("hide.bs.popover", function () {
        var dismissEl = document.getElementById(el.getAttribute("aria-describedby"));
        dismissEl.removeEventListener("click", dismissHandler);
      });
    }

    el.setAttribute("data-kt-initialized", "1");

    return popover;
  };

  var createBootstrapPopovers = function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));

    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      createBootstrapPopover(popoverTriggerEl, {});
    });
  };

  var createBootstrapToasts = function () {
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      if (toastEl.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      toastEl.setAttribute("data-kt-initialized", "1");

      return new bootstrap.Toast(toastEl, {});
    });
  };

  var createButtons = function () {
    var buttonsGroup = [].slice.call(document.querySelectorAll('[data-kt-buttons="true"]'));

    buttonsGroup.map(function (group) {
      if (group.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      var selector = group.hasAttribute("data-kt-buttons-target") ? group.getAttribute("data-kt-buttons-target") : ".btn";
      var activeButtons = [].slice.call(group.querySelectorAll(selector));

      // Toggle Handler
      KTUtil.on(group, selector, "click", function (e) {
        activeButtons.map(function (button) {
          button.classList.remove("active");
        });

        this.classList.add("active");
      });

      group.setAttribute("data-kt-initialized", "1");
    });
  };

  var createDateRangePickers = function () {
    // Check if jQuery included
    if (typeof jQuery == "undefined") {
      return;
    }

    // Check if daterangepicker included
    if (typeof $.fn.daterangepicker === "undefined") {
      return;
    }

    var elements = [].slice.call(document.querySelectorAll('[data-kt-daterangepicker="true"]'));
    var start = moment().subtract(29, "days");
    var end = moment();

    elements.map(function (element) {
      if (element.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      var display = element.querySelector("div");
      var attrOpens = element.hasAttribute("data-kt-daterangepicker-opens") ? element.getAttribute("data-kt-daterangepicker-opens") : "left";
      var range = element.getAttribute("data-kt-daterangepicker-range");

      var cb = function (start, end) {
        var current = moment();

        if (display) {
          if (current.isSame(start, "day") && current.isSame(end, "day")) {
            display.innerHTML = start.format("D MMM YYYY");
          } else {
            display.innerHTML = start.format("D MMM YYYY") + " - " + end.format("D MMM YYYY");
          }
        }
      };

      if (range === "today") {
        start = moment();
        end = moment();
      }

      $(element).daterangepicker(
        {
          startDate: start,
          endDate: end,
          opens: attrOpens,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
          },
        },
        cb
      );

      cb(start, end);

      element.setAttribute("data-kt-initialized", "1");
    });
  };

  var createSelect2 = function () {
    // Check if jQuery included
    if (typeof jQuery == "undefined") {
      return;
    }

    // Check if select2 included
    if (typeof $.fn.select2 === "undefined") {
      return;
    }

    var elements = [].slice.call(document.querySelectorAll('[data-control="select2"], [data-kt-select2="true"]'));

    elements.map(function (element) {
      if (element.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      var options = {
        dir: document.body.getAttribute("direction"),
      };

      if (element.getAttribute("data-hide-search") == "true") {
        options.minimumResultsForSearch = Infinity;
      }

      $(element).select2(options);

      element.setAttribute("data-kt-initialized", "1");
    });

    /*
     * Hacky fix for a bug in select2 with jQuery 3.6.0's new nested-focus "protection"
     * see: https://github.com/select2/select2/issues/5993
     * see: https://github.com/jquery/jquery/issues/4382
     *
     * TODO: Recheck with the select2 GH issue and remove once this is fixed on their side
     */

    if (select2FocusFixInitialized === false) {
      select2FocusFixInitialized = true;

      $(document).on("select2:open", function (e) {
        var elements = document.querySelectorAll(".select2-container--open .select2-search__field");
        if (elements.length > 0) {
          elements[elements.length - 1].focus();
        }
      });
    }
  };

  var createAutosize = function () {
    if (typeof autosize === "undefined") {
      return;
    }

    var inputs = [].slice.call(document.querySelectorAll('[data-kt-autosize="true"]'));

    inputs.map(function (input) {
      if (input.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      autosize(input);

      input.setAttribute("data-kt-initialized", "1");
    });
  };

  var createCountUp = function () {
    if (typeof countUp === "undefined") {
      return;
    }

    var elements = [].slice.call(document.querySelectorAll('[data-kt-countup="true"]:not(.counted)'));

    elements.map(function (element) {
      if (KTUtil.isInViewport(element) && KTUtil.visible(element)) {
        if (element.getAttribute("data-kt-initialized") === "1") {
          return;
        }

        var options = {};

        var value = element.getAttribute("data-kt-countup-value");
        value = parseFloat(value.replace(/,/g, ""));

        if (element.hasAttribute("data-kt-countup-start-val")) {
          options.startVal = parseFloat(element.getAttribute("data-kt-countup-start-val"));
        }

        if (element.hasAttribute("data-kt-countup-duration")) {
          options.duration = parseInt(element.getAttribute("data-kt-countup-duration"));
        }

        if (element.hasAttribute("data-kt-countup-decimal-places")) {
          options.decimalPlaces = parseInt(element.getAttribute("data-kt-countup-decimal-places"));
        }

        if (element.hasAttribute("data-kt-countup-prefix")) {
          options.prefix = element.getAttribute("data-kt-countup-prefix");
        }

        if (element.hasAttribute("data-kt-countup-separator")) {
          options.separator = element.getAttribute("data-kt-countup-separator");
        }

        if (element.hasAttribute("data-kt-countup-suffix")) {
          options.suffix = element.getAttribute("data-kt-countup-suffix");
        }

        var count = new countUp.CountUp(element, value, options);

        count.start();

        element.classList.add("counted");

        element.setAttribute("data-kt-initialized", "1");
      }
    });
  };

  var createCountUpTabs = function () {
    if (typeof countUp === "undefined") {
      return;
    }

    if (countUpInitialized === false) {
      // Initial call
      createCountUp();

      // Window scroll event handler
      window.addEventListener("scroll", createCountUp);
    }

    // Tabs shown event handler
    var tabs = [].slice.call(document.querySelectorAll('[data-kt-countup-tabs="true"][data-bs-toggle="tab"]'));
    tabs.map(function (tab) {
      if (tab.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      tab.addEventListener("shown.bs.tab", createCountUp);

      tab.setAttribute("data-kt-initialized", "1");
    });

    countUpInitialized = true;
  };

  var createTinySliders = function () {
    if (typeof tns === "undefined") {
      return;
    }

    // Init Slider
    var initSlider = function (el) {
      if (!el) {
        return;
      }

      const tnsOptions = {};

      // Convert string boolean
      const checkBool = function (val) {
        if (val === "true") {
          return true;
        }
        if (val === "false") {
          return false;
        }
        return val;
      };

      // get extra options via data attributes
      el.getAttributeNames().forEach(function (attrName) {
        // more options; https://github.com/ganlanyuan/tiny-slider#options
        if (/^data-tns-.*/g.test(attrName)) {
          let optionName = attrName
            .replace("data-tns-", "")
            .toLowerCase()
            .replace(/(?:[\s-])\w/g, function (match) {
              return match.replace("-", "").toUpperCase();
            });

          if (attrName === "data-tns-responsive") {
            // fix string with a valid json
            const jsonStr = el.getAttribute(attrName).replace(/(\w+:)|(\w+ :)/g, function (matched) {
              return '"' + matched.substring(0, matched.length - 1) + '":';
            });
            try {
              // convert json string to object
              tnsOptions[optionName] = JSON.parse(jsonStr);
            } catch (e) {}
          } else {
            tnsOptions[optionName] = checkBool(el.getAttribute(attrName));
          }
        }
      });

      const opt = Object.assign(
        {},
        {
          container: el,
          slideBy: "page",
          autoplay: true,
          autoplayButtonOutput: false,
        },
        tnsOptions
      );

      if (el.closest(".tns")) {
        KTUtil.addClass(el.closest(".tns"), "tns-initiazlied");
      }

      return tns(opt);
    };

    // Sliders
    const elements = Array.prototype.slice.call(document.querySelectorAll('[data-tns="true"]'), 0);

    if (!elements && elements.length === 0) {
      return;
    }

    elements.forEach(function (el) {
      if (el.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      initSlider(el);

      el.setAttribute("data-kt-initialized", "1");
    });
  };

  var initSmoothScroll = function () {
    if (initialized === true) {
      return;
    }

    if (typeof SmoothScroll === "undefined") {
      return;
    }

    new SmoothScroll('a[data-kt-scroll-toggle][href*="#"]', {
      speed: 1000,
      speedAsDuration: true,
      offset: function (anchor, toggle) {
        // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
        // This example is a function, but you could do something as simple as `offset: 25`

        // An example returning different values based on whether the clicked link was in the header nav or not
        if (anchor.hasAttribute("data-kt-scroll-offset")) {
          var val = KTUtil.getResponsiveValue(anchor.getAttribute("data-kt-scroll-offset"));

          return val;
        } else {
          return 0;
        }
      },
    });
  };

  var initCard = function () {
    // Toggle Handler
    KTUtil.on(document.body, '[data-kt-card-action="remove"]', "click", function (e) {
      e.preventDefault();

      const card = this.closest(".card");

      if (!card) {
        return;
      }

      const confirmMessage = this.getAttribute("data-kt-card-confirm-message");
      const confirm = this.getAttribute("data-kt-card-confirm") === "true";

      if (confirm) {
        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
        Swal.fire({
          text: confirmMessage ? confirmMessage : "Are you sure to remove ?",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Confirm",
          denyButtonText: "Cancel",
          customClass: {
            confirmButton: "btn btn-primary",
            denyButton: "btn btn-danger",
          },
        }).then(function (result) {
          if (result.isConfirmed) {
            card.remove();
          }
        });
      } else {
        card.remove();
      }
    });
  };

  var initModal = function () {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-bs-stacked-modal]"));

    if (elements && elements.length > 0) {
      elements.forEach((element) => {
        if (element.getAttribute("data-kt-initialized") === "1") {
          return;
        }

        element.setAttribute("data-kt-initialized", "1");

        element.addEventListener("click", function (e) {
          e.preventDefault();

          const modalEl = document.querySelector(this.getAttribute("data-bs-stacked-modal"));

          if (modalEl) {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
          }
        });
      });
    }
  };

  var initCheck = function () {
    if (initialized === true) {
      return;
    }

    // Toggle Handler
    KTUtil.on(document.body, '[data-kt-check="true"]', "change", function (e) {
      var check = this;
      var targets = document.querySelectorAll(check.getAttribute("data-kt-check-target"));

      KTUtil.each(targets, function (target) {
        if (target.type == "checkbox") {
          target.checked = check.checked;
        } else {
          target.classList.toggle("active");
        }
      });
    });
  };

  var initBootstrapCollapse = function () {
    if (initialized === true) {
      return;
    }

    KTUtil.on(document.body, '.collapsible[data-bs-toggle="collapse"]', "click", function (e) {
      if (this.classList.contains("collapsed")) {
        this.classList.remove("active");
        this.blur();
      } else {
        this.classList.add("active");
      }

      if (this.hasAttribute("data-kt-toggle-text")) {
        var text = this.getAttribute("data-kt-toggle-text");
        var target = this.querySelector('[data-kt-toggle-text-target="true"]');
        var target = target ? target : this;

        this.setAttribute("data-kt-toggle-text", target.innerText);
        target.innerText = text;
      }
    });
  };

  var initBootstrapRotate = function () {
    if (initialized === true) {
      return;
    }

    KTUtil.on(document.body, '[data-kt-rotate="true"]', "click", function (e) {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.blur();
      } else {
        this.classList.add("active");
      }
    });
  };

  var initLozad = function () {
    // Check if lozad included
    if (typeof lozad === "undefined") {
      return;
    }

    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  };

  var showPageLoading = function () {
    document.body.classList.add("page-loading");
    document.body.setAttribute("data-kt-app-page-loading", "on");
  };

  var hidePageLoading = function () {
    // CSS3 Transitions only after page load(.page-loading or .app-page-loading class added to body tag and remove with JS on page load)
    document.body.classList.remove("page-loading");
    document.body.removeAttribute("data-kt-app-page-loading");
  };

  return {
    init: function () {
      initLozad();

      initSmoothScroll();

      initCard();

      initModal();

      initCheck();

      initBootstrapCollapse();

      initBootstrapRotate();

      createBootstrapTooltips();

      createBootstrapPopovers();

      createBootstrapToasts();

      createDateRangePickers();

      createButtons();

      createSelect2();

      createCountUp();

      createCountUpTabs();

      createAutosize();

      createTinySliders();

      initialized = true;
    },

    showPageLoading: function () {
      showPageLoading();
    },

    hidePageLoading: function () {
      hidePageLoading();
    },

    createBootstrapPopover: function (el, options) {
      return createBootstrapPopover(el, options);
    },

    createBootstrapTooltip: function (el, options) {
      return createBootstrapTooltip(el, options);
    },
  };
})();

// Declare KTApp for Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTApp;
}
("use strict");

// Class definition
var KTBlockUI = function (element, options) {
  //////////////////////////////
  // ** Private variables  ** //
  //////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default options
  var defaultOptions = {
    zIndex: false,
    overlayClass: "",
    overflow: "hidden",
    message: '<span class="spinner-border text-primary"></span>',
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("blockui")) {
      the = KTUtil.data(element).get("blockui");
    } else {
      _init();
    }
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.element = element;
    the.overlayElement = null;
    the.blocked = false;
    the.positionChanged = false;
    the.overflowChanged = false;

    // Bind Instance
    KTUtil.data(the.element).set("blockui", the);
  };

  var _block = function () {
    if (KTEventHandler.trigger(the.element, "kt.blockui.block", the) === false) {
      return;
    }

    var isPage = the.element.tagName === "BODY";

    var position = KTUtil.css(the.element, "position");
    var overflow = KTUtil.css(the.element, "overflow");
    var zIndex = isPage ? 10000 : 1;

    if (the.options.zIndex > 0) {
      zIndex = the.options.zIndex;
    } else {
      if (KTUtil.css(the.element, "z-index") != "auto") {
        zIndex = KTUtil.css(the.element, "z-index");
      }
    }

    the.element.classList.add("blockui");

    if (position === "absolute" || position === "relative" || position === "fixed") {
      KTUtil.css(the.element, "position", "relative");
      the.positionChanged = true;
    }

    if (the.options.overflow === "hidden" && overflow === "visible") {
      KTUtil.css(the.element, "overflow", "hidden");
      the.overflowChanged = true;
    }

    the.overlayElement = document.createElement("DIV");
    the.overlayElement.setAttribute("class", "blockui-overlay " + the.options.overlayClass);

    the.overlayElement.innerHTML = the.options.message;

    KTUtil.css(the.overlayElement, "z-index", zIndex);

    the.element.append(the.overlayElement);
    the.blocked = true;

    KTEventHandler.trigger(the.element, "kt.blockui.after.blocked", the);
  };

  var _release = function () {
    if (KTEventHandler.trigger(the.element, "kt.blockui.release", the) === false) {
      return;
    }

    the.element.classList.add("blockui");

    if (the.positionChanged) {
      KTUtil.css(the.element, "position", "");
    }

    if (the.overflowChanged) {
      KTUtil.css(the.element, "overflow", "");
    }

    if (the.overlayElement) {
      KTUtil.remove(the.overlayElement);
    }

    the.blocked = false;

    KTEventHandler.trigger(the.element, "kt.blockui.released", the);
  };

  var _isBlocked = function () {
    return the.blocked;
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("blockui");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.block = function () {
    _block();
  };

  the.release = function () {
    _release();
  };

  the.isBlocked = function () {
    return _isBlocked();
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTBlockUI.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("blockui")) {
    return KTUtil.data(element).get("blockui");
  } else {
    return null;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTBlockUI;
}
("use strict");
// DOCS: https://javascript.info/cookie

// Class definition
var KTCookie = (function () {
  return {
    // returns the cookie with the given name,
    // or undefined if not found
    get: function (name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));

      return matches ? decodeURIComponent(matches[1]) : null;
    },

    // Please note that a cookie value is encoded,
    // so getCookie uses a built-in decodeURIComponent function to decode it.
    set: function (name, value, options) {
      if (typeof options === "undefined" || options === null) {
        options = {};
      }

      options = Object.assign(
        {},
        {
          path: "/",
        },
        options
      );

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (var optionKey in options) {
        if (options.hasOwnProperty(optionKey) === false) {
          continue;
        }

        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];

        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    },

    // To remove a cookie, we can call it with a negative expiration date:
    remove: function (name) {
      this.set(name, "", {
        "max-age": -1,
      });
    },
  };
})();

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTCookie;
}

("use strict");

// Class definition
var KTDialer = function (element, options) {
  ////////////////////////////
  // ** Private variables  ** //
  ////////////////////////////
  var the = this;

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    min: null,
    max: null,
    step: 1,
    decimals: 0,
    prefix: "",
    suffix: "",
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  // Constructor
  var _construct = function () {
    if (KTUtil.data(element).has("dialer") === true) {
      the = KTUtil.data(element).get("dialer");
    } else {
      _init();
    }
  };

  // Initialize
  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);

    // Elements
    the.element = element;
    the.incElement = the.element.querySelector('[data-kt-dialer-control="increase"]');
    the.decElement = the.element.querySelector('[data-kt-dialer-control="decrease"]');
    the.inputElement = the.element.querySelector("input[type]");

    // Set Values
    if (_getOption("decimals")) {
      the.options.decimals = parseInt(_getOption("decimals"));
    }

    if (_getOption("prefix")) {
      the.options.prefix = _getOption("prefix");
    }

    if (_getOption("suffix")) {
      the.options.suffix = _getOption("suffix");
    }

    if (_getOption("step")) {
      the.options.step = parseFloat(_getOption("step"));
    }

    if (_getOption("min")) {
      the.options.min = parseFloat(_getOption("min"));
    }

    if (_getOption("max")) {
      the.options.max = parseFloat(_getOption("max"));
    }

    the.value = parseFloat(the.inputElement.value.replace(/[^\d.]/g, ""));

    _setValue();

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("dialer", the);
  };

  // Handlers
  var _handlers = function () {
    KTUtil.addEvent(the.incElement, "click", function (e) {
      e.preventDefault();

      _increase();
    });

    KTUtil.addEvent(the.decElement, "click", function (e) {
      e.preventDefault();

      _decrease();
    });

    KTUtil.addEvent(the.inputElement, "input", function (e) {
      e.preventDefault();

      _setValue();
    });
  };

  // Event handlers
  var _increase = function () {
    // Trigger "after.dialer" event
    KTEventHandler.trigger(the.element, "kt.dialer.increase", the);

    the.inputElement.value = the.value + the.options.step;
    _setValue();

    // Trigger "before.dialer" event
    KTEventHandler.trigger(the.element, "kt.dialer.increased", the);

    return the;
  };

  var _decrease = function () {
    // Trigger "after.dialer" event
    KTEventHandler.trigger(the.element, "kt.dialer.decrease", the);

    the.inputElement.value = the.value - the.options.step;

    _setValue();

    // Trigger "before.dialer" event
    KTEventHandler.trigger(the.element, "kt.dialer.decreased", the);

    return the;
  };

  // Set Input Value
  var _setValue = function (value) {
    // Trigger "after.dialer" event
    KTEventHandler.trigger(the.element, "kt.dialer.change", the);

    if (value !== undefined) {
      the.value = value;
    } else {
      the.value = _parse(the.inputElement.value);
    }

    if (the.options.min !== null && the.value < the.options.min) {
      the.value = the.options.min;
    }

    if (the.options.max !== null && the.value > the.options.max) {
      the.value = the.options.max;
    }

    the.inputElement.value = _format(the.value);

    // Trigger input change event
    the.inputElement.dispatchEvent(new Event("change"));

    // Trigger "after.dialer" event
    KTEventHandler.trigger(the.element, "kt.dialer.changed", the);
  };

  var _parse = function (val) {
    val = val
      .replace(/[^0-9.-]/g, "") // remove chars except number, hyphen, point.
      .replace(/(\..*)\./g, "$1") // remove multiple points.
      .replace(/(?!^)-/g, "") // remove middle hyphen.
      .replace(/^0+(\d)/gm, "$1"); // remove multiple leading zeros. <-- I added this.

    val = parseFloat(val);

    if (isNaN(val)) {
      val = 0;
    }

    return val;
  };

  // Format
  var _format = function (val) {
    return the.options.prefix + parseFloat(val).toFixed(the.options.decimals) + the.options.suffix;
  };

  // Get option
  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-dialer-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-dialer-" + name);
      var value = attr;

      return value;
    } else {
      return null;
    }
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("dialer");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.setMinValue = function (value) {
    the.options.min = value;
  };

  the.setMaxValue = function (value) {
    the.options.max = value;
  };

  the.setValue = function (value) {
    _setValue(value);
  };

  the.getValue = function () {
    return the.inputElement.value;
  };

  the.update = function () {
    _setValue();
  };

  the.increase = function () {
    return _increase();
  };

  the.decrease = function () {
    return _decrease();
  };

  the.getElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTDialer.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("dialer")) {
    return KTUtil.data(element).get("dialer");
  } else {
    return null;
  }
};

// Create instances
KTDialer.createInstances = function (selector = '[data-kt-dialer="true"]') {
  // Get instances
  var elements = document.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTDialer(elements[i]);
    }
  }
};

// Global initialization
KTDialer.init = function () {
  KTDialer.createInstances();
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTDialer;
}
("use strict");

var KTDrawerHandlersInitialized = false;

// Class definition
var KTDrawer = function (element, options) {
  //////////////////////////////
  // ** Private variables  ** //
  //////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default options
  var defaultOptions = {
    overlay: true,
    direction: "end",
    baseClass: "drawer",
    overlayClass: "drawer-overlay",
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("drawer")) {
      the = KTUtil.data(element).get("drawer");
    } else {
      _init();
    }
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("drawer");
    the.element = element;
    the.overlayElement = null;
    the.name = the.element.getAttribute("data-kt-drawer-name");
    the.shown = false;
    the.lastWidth;
    the.toggleElement = null;

    // Set initialized
    the.element.setAttribute("data-kt-drawer", "true");

    // Event Handlers
    _handlers();

    // Update Instance
    _update();

    // Bind Instance
    KTUtil.data(the.element).set("drawer", the);
  };

  var _handlers = function () {
    var togglers = _getOption("toggle");
    var closers = _getOption("close");

    if (togglers !== null && togglers.length > 0) {
      KTUtil.on(document.body, togglers, "click", function (e) {
        e.preventDefault();

        the.toggleElement = this;
        _toggle();
      });
    }

    if (closers !== null && closers.length > 0) {
      KTUtil.on(document.body, closers, "click", function (e) {
        e.preventDefault();

        the.closeElement = this;
        _hide();
      });
    }
  };

  var _toggle = function () {
    if (KTEventHandler.trigger(the.element, "kt.drawer.toggle", the) === false) {
      return;
    }

    if (the.shown === true) {
      _hide();
    } else {
      _show();
    }

    KTEventHandler.trigger(the.element, "kt.drawer.toggled", the);
  };

  var _hide = function () {
    if (KTEventHandler.trigger(the.element, "kt.drawer.hide", the) === false) {
      return;
    }

    the.shown = false;

    _deleteOverlay();

    document.body.removeAttribute("data-kt-drawer-" + the.name, "on");
    document.body.removeAttribute("data-kt-drawer");

    KTUtil.removeClass(the.element, the.options.baseClass + "-on");

    if (the.toggleElement !== null) {
      KTUtil.removeClass(the.toggleElement, "active");
    }

    KTEventHandler.trigger(the.element, "kt.drawer.after.hidden", the) === false;
  };

  var _show = function () {
    if (KTEventHandler.trigger(the.element, "kt.drawer.show", the) === false) {
      return;
    }

    the.shown = true;

    _createOverlay();
    document.body.setAttribute("data-kt-drawer-" + the.name, "on");
    document.body.setAttribute("data-kt-drawer", "on");

    KTUtil.addClass(the.element, the.options.baseClass + "-on");

    if (the.toggleElement !== null) {
      KTUtil.addClass(the.toggleElement, "active");
    }

    KTEventHandler.trigger(the.element, "kt.drawer.shown", the);
  };

  var _update = function () {
    var width = _getWidth();
    var direction = _getOption("direction");

    var top = _getOption("top");
    var bottom = _getOption("bottom");
    var start = _getOption("start");
    var end = _getOption("end");

    // Reset state
    if (KTUtil.hasClass(the.element, the.options.baseClass + "-on") === true && String(document.body.getAttribute("data-kt-drawer-" + the.name + "-")) === "on") {
      the.shown = true;
    } else {
      the.shown = false;
    }

    // Activate/deactivate
    if (_getOption("activate") === true) {
      KTUtil.addClass(the.element, the.options.baseClass);
      KTUtil.addClass(the.element, the.options.baseClass + "-" + direction);

      KTUtil.css(the.element, "width", width, true);
      the.lastWidth = width;

      if (top) {
        KTUtil.css(the.element, "top", top);
      }

      if (bottom) {
        KTUtil.css(the.element, "bottom", bottom);
      }

      if (start) {
        if (KTUtil.isRTL()) {
          KTUtil.css(the.element, "right", start);
        } else {
          KTUtil.css(the.element, "left", start);
        }
      }

      if (end) {
        if (KTUtil.isRTL()) {
          KTUtil.css(the.element, "left", end);
        } else {
          KTUtil.css(the.element, "right", end);
        }
      }
    } else {
      KTUtil.removeClass(the.element, the.options.baseClass);
      KTUtil.removeClass(the.element, the.options.baseClass + "-" + direction);

      KTUtil.css(the.element, "width", "");

      if (top) {
        KTUtil.css(the.element, "top", "");
      }

      if (bottom) {
        KTUtil.css(the.element, "bottom", "");
      }

      if (start) {
        if (KTUtil.isRTL()) {
          KTUtil.css(the.element, "right", "");
        } else {
          KTUtil.css(the.element, "left", "");
        }
      }

      if (end) {
        if (KTUtil.isRTL()) {
          KTUtil.css(the.element, "left", "");
        } else {
          KTUtil.css(the.element, "right", "");
        }
      }

      _hide();
    }
  };

  var _createOverlay = function () {
    if (_getOption("overlay") === true) {
      the.overlayElement = document.createElement("DIV");

      KTUtil.css(the.overlayElement, "z-index", KTUtil.css(the.element, "z-index") - 1); // update

      document.body.append(the.overlayElement);

      KTUtil.addClass(the.overlayElement, _getOption("overlay-class"));

      KTUtil.addEvent(the.overlayElement, "click", function (e) {
        e.preventDefault();

        if (_getOption("permanent") !== true) {
          _hide();
        }
      });
    }
  };

  var _deleteOverlay = function () {
    if (the.overlayElement !== null) {
      KTUtil.remove(the.overlayElement);
    }
  };

  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-drawer-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-drawer-" + name);
      var value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }

      return value;
    } else {
      var optionName = KTUtil.snakeToCamel(name);

      if (the.options[optionName]) {
        return KTUtil.getResponsiveValue(the.options[optionName]);
      } else {
        return null;
      }
    }
  };

  var _getWidth = function () {
    var width = _getOption("width");

    if (width === "auto") {
      width = KTUtil.css(the.element, "width");
    }

    return width;
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("drawer");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.toggle = function () {
    return _toggle();
  };

  the.show = function () {
    return _show();
  };

  the.hide = function () {
    return _hide();
  };

  the.isShown = function () {
    return the.shown;
  };

  the.update = function () {
    _update();
  };

  the.goElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTDrawer.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("drawer")) {
    return KTUtil.data(element).get("drawer");
  } else {
    return null;
  }
};

// Hide all drawers and skip one if provided
KTDrawer.hideAll = function (skip = null, selector = '[data-kt-drawer="true"]') {
  var items = document.querySelectorAll(selector);

  if (items && items.length > 0) {
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var drawer = KTDrawer.getInstance(item);

      if (!drawer) {
        continue;
      }

      if (skip) {
        if (item !== skip) {
          drawer.hide();
        }
      } else {
        drawer.hide();
      }
    }
  }
};

// Update all drawers
KTDrawer.updateAll = function (selector = '[data-kt-drawer="true"]') {
  var items = document.querySelectorAll(selector);

  if (items && items.length > 0) {
    for (var i = 0, len = items.length; i < len; i++) {
      var drawer = KTDrawer.getInstance(items[i]);

      if (drawer) {
        drawer.update();
      }
    }
  }
};

// Create instances
KTDrawer.createInstances = function (selector = '[data-kt-drawer="true"]') {
  // Initialize Menus
  var elements = document.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTDrawer(elements[i]);
    }
  }
};

// Toggle instances
KTDrawer.handleShow = function () {
  // External drawer toggle handler
  KTUtil.on(document.body, '[data-kt-drawer-show="true"][data-kt-drawer-target]', "click", function (e) {
    e.preventDefault();

    var element = document.querySelector(this.getAttribute("data-kt-drawer-target"));

    if (element) {
      KTDrawer.getInstance(element).show();
    }
  });
};

// Dismiss instances
KTDrawer.handleDismiss = function () {
  // External drawer toggle handler
  KTUtil.on(document.body, '[data-kt-drawer-dismiss="true"]', "click", function (e) {
    var element = this.closest('[data-kt-drawer="true"]');

    if (element) {
      var drawer = KTDrawer.getInstance(element);
      if (drawer.isShown()) {
        drawer.hide();
      }
    }
  });
};

// Handle resize
KTDrawer.handleResize = function () {
  // Window resize Handling
  window.addEventListener("resize", function () {
    var timer;

    KTUtil.throttle(
      timer,
      function () {
        // Locate and update drawer instances on window resize
        var elements = document.querySelectorAll('[data-kt-drawer="true"]');

        if (elements && elements.length > 0) {
          for (var i = 0, len = elements.length; i < len; i++) {
            var drawer = KTDrawer.getInstance(elements[i]);
            if (drawer) {
              drawer.update();
            }
          }
        }
      },
      200
    );
  });
};

// Global initialization
KTDrawer.init = function () {
  KTDrawer.createInstances();

  if (KTDrawerHandlersInitialized === false) {
    KTDrawer.handleResize();
    KTDrawer.handleShow();
    KTDrawer.handleDismiss();

    KTDrawerHandlersInitialized = true;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTDrawer;
}
("use strict");

// Class definition
var KTEventHandler = (function () {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var _handlers = {};

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////
  var _triggerEvent = function (element, name, target) {
    var returnValue = true;
    var eventValue;

    if (KTUtil.data(element).has(name) === true) {
      var handlerIds = KTUtil.data(element).get(name);
      var handlerId;

      for (var i = 0; i < handlerIds.length; i++) {
        handlerId = handlerIds[i];

        if (_handlers[name] && _handlers[name][handlerId]) {
          var handler = _handlers[name][handlerId];
          var value;

          if (handler.name === name) {
            if (handler.one == true) {
              if (handler.fired == false) {
                _handlers[name][handlerId].fired = true;

                eventValue = handler.callback.call(this, target);
              }
            } else {
              eventValue = handler.callback.call(this, target);
            }

            if (eventValue === false) {
              returnValue = false;
            }
          }
        }
      }
    }

    return returnValue;
  };

  var _addEvent = function (element, name, callback, one) {
    var handlerId = KTUtil.getUniqueId("event");
    var handlerIds = KTUtil.data(element).get(name);

    if (!handlerIds) {
      handlerIds = [];
    }

    handlerIds.push(handlerId);

    KTUtil.data(element).set(name, handlerIds);

    if (!_handlers[name]) {
      _handlers[name] = {};
    }

    _handlers[name][handlerId] = {
      name: name,
      callback: callback,
      one: one,
      fired: false,
    };

    return handlerId;
  };

  var _removeEvent = function (element, name, handlerId) {
    var handlerIds = KTUtil.data(element).get(name);
    var index = handlerIds && handlerIds.indexOf(handlerId);

    if (index !== -1) {
      handlerIds.splice(index, 1);
      KTUtil.data(element).set(name, handlerIds);
    }

    if (_handlers[name] && _handlers[name][handlerId]) {
      delete _handlers[name][handlerId];
    }
  };

  ////////////////////////////
  // ** Public Methods  ** //
  ////////////////////////////
  return {
    trigger: function (element, name, target) {
      return _triggerEvent(element, name, target);
    },

    on: function (element, name, handler) {
      return _addEvent(element, name, handler);
    },

    one: function (element, name, handler) {
      return _addEvent(element, name, handler, true);
    },

    off: function (element, name, handlerId) {
      return _removeEvent(element, name, handlerId);
    },

    debug: function () {
      for (var b in _handlers) {
        if (_handlers.hasOwnProperty(b)) console.log(b);
      }
    },
  };
})();

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTEventHandler;
}

("use strict");

// Class definition
var KTFeedback = function (options) {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var the = this;

  // Default options
  var defaultOptions = {
    width: 100,
    placement: "top-center",
    content: "",
    type: "popup",
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function () {
    _init();
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("feedback");
    the.element;
    the.shown = false;

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("feedback", the);
  };

  var _handlers = function () {
    KTUtil.addEvent(the.element, "click", function (e) {
      e.preventDefault();

      _go();
    });
  };

  var _show = function () {
    if (KTEventHandler.trigger(the.element, "kt.feedback.show", the) === false) {
      return;
    }

    if (the.options.type === "popup") {
      _showPopup();
    }

    KTEventHandler.trigger(the.element, "kt.feedback.shown", the);

    return the;
  };

  var _hide = function () {
    if (KTEventHandler.trigger(the.element, "kt.feedback.hide", the) === false) {
      return;
    }

    if (the.options.type === "popup") {
      _hidePopup();
    }

    the.shown = false;

    KTEventHandler.trigger(the.element, "kt.feedback.hidden", the);

    return the;
  };

  var _showPopup = function () {
    the.element = document.createElement("DIV");

    KTUtil.addClass(the.element, "feedback feedback-popup");
    KTUtil.setHTML(the.element, the.options.content);

    if (the.options.placement == "top-center") {
      _setPopupTopCenterPosition();
    }

    document.body.appendChild(the.element);

    KTUtil.addClass(the.element, "feedback-shown");

    the.shown = true;
  };

  var _setPopupTopCenterPosition = function () {
    var width = KTUtil.getResponsiveValue(the.options.width);
    var height = KTUtil.css(the.element, "height");

    KTUtil.addClass(the.element, "feedback-top-center");

    KTUtil.css(the.element, "width", width);
    KTUtil.css(the.element, "left", "50%");
    KTUtil.css(the.element, "top", "-" + height);
  };

  var _hidePopup = function () {
    the.element.remove();
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("feedback");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.show = function () {
    return _show();
  };

  the.hide = function () {
    return _hide();
  };

  the.isShown = function () {
    return the.shown;
  };

  the.getElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTFeedback;
}

("use strict");

// Class definition
var KTImageInput = function (element, options) {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default Options
  var defaultOptions = {};

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("image-input") === true) {
      the = KTUtil.data(element).get("image-input");
    } else {
      _init();
    }
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("image-input");

    // Elements
    the.element = element;
    the.inputElement = KTUtil.find(element, 'input[type="file"]');
    the.wrapperElement = KTUtil.find(element, ".image-input-wrapper");
    the.cancelElement = KTUtil.find(element, '[data-kt-image-input-action="cancel"]');
    the.removeElement = KTUtil.find(element, '[data-kt-image-input-action="remove"]');
    the.hiddenElement = KTUtil.find(element, 'input[type="hidden"]');
    the.src = KTUtil.css(the.wrapperElement, "backgroundImage");

    // Set initialized
    the.element.setAttribute("data-kt-image-input", "true");

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("image-input", the);
  };

  // Init Event Handlers
  var _handlers = function () {
    KTUtil.addEvent(the.inputElement, "change", _change);
    KTUtil.addEvent(the.cancelElement, "click", _cancel);
    KTUtil.addEvent(the.removeElement, "click", _remove);
  };

  // Event Handlers
  var _change = function (e) {
    e.preventDefault();

    if (the.inputElement !== null && the.inputElement.files && the.inputElement.files[0]) {
      // Fire change event
      if (KTEventHandler.trigger(the.element, "kt.imageinput.change", the) === false) {
        return;
      }

      var reader = new FileReader();

      reader.onload = function (e) {
        KTUtil.css(the.wrapperElement, "background-image", "url(" + e.target.result + ")");
      };

      reader.readAsDataURL(the.inputElement.files[0]);

      the.element.classList.add("image-input-changed");
      the.element.classList.remove("image-input-empty");

      // Fire removed event
      KTEventHandler.trigger(the.element, "kt.imageinput.changed", the);
    }
  };

  var _cancel = function (e) {
    e.preventDefault();

    // Fire cancel event
    if (KTEventHandler.trigger(the.element, "kt.imageinput.cancel", the) === false) {
      return;
    }

    the.element.classList.remove("image-input-changed");
    the.element.classList.remove("image-input-empty");

    if (the.src === "none") {
      KTUtil.css(the.wrapperElement, "background-image", "");
      the.element.classList.add("image-input-empty");
    } else {
      KTUtil.css(the.wrapperElement, "background-image", the.src);
    }

    the.inputElement.value = "";

    if (the.hiddenElement !== null) {
      the.hiddenElement.value = "0";
    }

    // Fire canceled event
    KTEventHandler.trigger(the.element, "kt.imageinput.canceled", the);
  };

  var _remove = function (e) {
    e.preventDefault();

    // Fire remove event
    if (KTEventHandler.trigger(the.element, "kt.imageinput.remove", the) === false) {
      return;
    }

    the.element.classList.remove("image-input-changed");
    the.element.classList.add("image-input-empty");

    KTUtil.css(the.wrapperElement, "background-image", "none");
    the.inputElement.value = "";

    if (the.hiddenElement !== null) {
      the.hiddenElement.value = "1";
    }

    // Fire removed event
    KTEventHandler.trigger(the.element, "kt.imageinput.removed", the);
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("image-input");
  };

  // Construct Class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.getInputElement = function () {
    return the.inputElement;
  };

  the.getElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTImageInput.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("image-input")) {
    return KTUtil.data(element).get("image-input");
  } else {
    return null;
  }
};

// Create instances
KTImageInput.createInstances = function (selector = "[data-kt-image-input]") {
  // Initialize Menus
  var elements = document.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTImageInput(elements[i]);
    }
  }
};

// Global initialization
KTImageInput.init = function () {
  KTImageInput.createInstances();
};

// Webpack Support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTImageInput;
}

("use strict");

var KTMenuHandlersInitialized = false;

// Class definition
var KTMenu = function (element, options) {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default Options
  var defaultOptions = {
    dropdown: {
      hoverTimeout: 200,
      zindex: 107,
    },

    accordion: {
      slideSpeed: 250,
      expand: false,
    },
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("menu") === true) {
      the = KTUtil.data(element).get("menu");
    } else {
      _init();
    }
  };

  var _init = function () {
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("menu");
    the.element = element;
    the.triggerElement;
    the.disabled = false;

    // Set initialized
    the.element.setAttribute("data-kt-menu", "true");

    _setTriggerElement();
    _update();

    KTUtil.data(the.element).set("menu", the);
  };

  var _destroy = function () {
    // todo
  };

  // Event Handlers
  // Toggle handler
  var _click = function (element, e) {
    e.preventDefault();

    if (the.disabled === true) {
      return;
    }

    var item = _getItemElement(element);

    if (_getOptionFromElementAttribute(item, "trigger") !== "click") {
      return;
    }

    if (_getOptionFromElementAttribute(item, "toggle") === false) {
      _show(item);
    } else {
      _toggle(item);
    }
  };

  // Link handler
  var _link = function (element, e) {
    if (the.disabled === true) {
      return;
    }

    if (KTEventHandler.trigger(the.element, "kt.menu.link.click", element) === false) {
      return;
    }

    // Dismiss all shown dropdowns
    KTMenu.hideDropdowns();

    KTEventHandler.trigger(the.element, "kt.menu.link.clicked", element);
  };

  // Dismiss handler
  var _dismiss = function (element, e) {
    var item = _getItemElement(element);
    var items = _getItemChildElements(item);

    if (item !== null && _getItemSubType(item) === "dropdown") {
      _hide(item); // hide items dropdown
      // Hide all child elements as well

      if (items.length > 0) {
        for (var i = 0, len = items.length; i < len; i++) {
          if (items[i] !== null && _getItemSubType(items[i]) === "dropdown") {
            _hide(tems[i]);
          }
        }
      }
    }
  };

  // Mouseover handle
  var _mouseover = function (element, e) {
    var item = _getItemElement(element);

    if (the.disabled === true) {
      return;
    }

    if (item === null) {
      return;
    }

    if (_getOptionFromElementAttribute(item, "trigger") !== "hover") {
      return;
    }

    if (KTUtil.data(item).get("hover") === "1") {
      clearTimeout(KTUtil.data(item).get("timeout"));
      KTUtil.data(item).remove("hover");
      KTUtil.data(item).remove("timeout");
    }

    _show(item);
  };

  // Mouseout handle
  var _mouseout = function (element, e) {
    var item = _getItemElement(element);

    if (the.disabled === true) {
      return;
    }

    if (item === null) {
      return;
    }

    if (_getOptionFromElementAttribute(item, "trigger") !== "hover") {
      return;
    }

    var timeout = setTimeout(function () {
      if (KTUtil.data(item).get("hover") === "1") {
        _hide(item);
      }
    }, the.options.dropdown.hoverTimeout);

    KTUtil.data(item).set("hover", "1");
    KTUtil.data(item).set("timeout", timeout);
  };

  // Toggle item sub
  var _toggle = function (item) {
    if (!item) {
      item = the.triggerElement;
    }

    if (_isItemSubShown(item) === true) {
      _hide(item);
    } else {
      _show(item);
    }
  };

  // Show item sub
  var _show = function (item) {
    if (!item) {
      item = the.triggerElement;
    }

    if (_isItemSubShown(item) === true) {
      return;
    }

    if (_getItemSubType(item) === "dropdown") {
      _showDropdown(item); // // show current dropdown
    } else if (_getItemSubType(item) === "accordion") {
      _showAccordion(item);
    }

    // Remember last submenu type
    KTUtil.data(item).set("type", _getItemSubType(item)); // updated
  };

  // Hide item sub
  var _hide = function (item) {
    if (!item) {
      item = the.triggerElement;
    }

    if (_isItemSubShown(item) === false) {
      return;
    }

    if (_getItemSubType(item) === "dropdown") {
      _hideDropdown(item);
    } else if (_getItemSubType(item) === "accordion") {
      _hideAccordion(item);
    }
  };

  // Reset item state classes if item sub type changed
  var _reset = function (item) {
    if (_hasItemSub(item) === false) {
      return;
    }

    var sub = _getItemSubElement(item);

    // Reset sub state if sub type is changed during the window resize
    if (KTUtil.data(item).has("type") && KTUtil.data(item).get("type") !== _getItemSubType(item)) {
      // updated
      KTUtil.removeClass(item, "hover");
      KTUtil.removeClass(item, "show");
      KTUtil.removeClass(sub, "show");
    } // updated
  };

  // Update all item state classes if item sub type changed
  var _update = function () {
    var items = the.element.querySelectorAll(".menu-item[data-kt-menu-trigger]");

    if (items && items.length > 0) {
      for (var i = 0, len = items.length; i < len; i++) {
        _reset(items[i]);
      }
    }
  };

  // Set external trigger element
  var _setTriggerElement = function () {
    var target = document.querySelector('[data-kt-menu-target="# ' + the.element.getAttribute("id") + '"]');

    if (target !== null) {
      the.triggerElement = target;
    } else if (the.element.closest("[data-kt-menu-trigger]")) {
      the.triggerElement = the.element.closest("[data-kt-menu-trigger]");
    } else if (the.element.parentNode && KTUtil.child(the.element.parentNode, "[data-kt-menu-trigger]")) {
      the.triggerElement = KTUtil.child(the.element.parentNode, "[data-kt-menu-trigger]");
    }

    if (the.triggerElement) {
      KTUtil.data(the.triggerElement).set("menu", the);
    }
  };

  // Test if menu has external trigger element
  var _isTriggerElement = function (item) {
    return the.triggerElement === item ? true : false;
  };

  // Test if item's sub is shown
  var _isItemSubShown = function (item) {
    var sub = _getItemSubElement(item);

    if (sub !== null) {
      if (_getItemSubType(item) === "dropdown") {
        if (KTUtil.hasClass(sub, "show") === true && sub.hasAttribute("data-popper-placement") === true) {
          return true;
        } else {
          return false;
        }
      } else {
        return KTUtil.hasClass(item, "show");
      }
    } else {
      return false;
    }
  };

  // Test if item dropdown is permanent
  var _isItemDropdownPermanent = function (item) {
    return _getOptionFromElementAttribute(item, "permanent") === true ? true : false;
  };

  // Test if item's parent is shown
  var _isItemParentShown = function (item) {
    return KTUtil.parents(item, ".menu-item.show").length > 0;
  };

  // Test of it is item sub element
  var _isItemSubElement = function (item) {
    return KTUtil.hasClass(item, "menu-sub");
  };

  // Test if item has sub
  var _hasItemSub = function (item) {
    return KTUtil.hasClass(item, "menu-item") && item.hasAttribute("data-kt-menu-trigger");
  };

  // Get link element
  var _getItemLinkElement = function (item) {
    return KTUtil.child(item, ".menu-link");
  };

  // Get toggle element
  var _getItemToggleElement = function (item) {
    if (the.triggerElement) {
      return the.triggerElement;
    } else {
      return _getItemLinkElement(item);
    }
  };

  // Get item sub element
  var _getItemSubElement = function (item) {
    if (_isTriggerElement(item) === true) {
      return the.element;
    }
    if (item.classList.contains("menu-sub") === true) {
      return item;
    } else if (KTUtil.data(item).has("sub")) {
      return KTUtil.data(item).get("sub");
    } else {
      return KTUtil.child(item, ".menu-sub");
    }
  };

  // Get item sub type
  var _getItemSubType = function (element) {
    var sub = _getItemSubElement(element);

    if (sub && parseInt(KTUtil.css(sub, "z-index")) > 0) {
      return "dropdown";
    } else {
      return "accordion";
    }
  };

  // Get item element
  var _getItemElement = function (element) {
    var item, sub;

    // Element is the external trigger element
    if (_isTriggerElement(element)) {
      return element;
    }

    // Element has item toggler attribute
    if (element.hasAttribute("data-kt-menu-trigger")) {
      return element;
    }

    // Element has item DOM reference in it's data storage
    if (KTUtil.data(element).has("item")) {
      return KTUtil.data(element).get("item");
    }

    // Item is parent of element
    if ((item = element.closest(".menu-item[data-kt-menu-trigger]"))) {
      return item;
    }

    // Element's parent has item DOM reference in it's data storage
    if ((sub = element.closest(".menu-sub"))) {
      if (KTUtil.data(sub).has("item") === true) {
        return KTUtil.data(sub).get("item");
      }
    }
  };

  // Get item parent element
  var _getItemParentElement = function (item) {
    var sub = item.closest(".menu-sub");
    var parentItem;

    if (KTUtil.data(sub).has("item")) {
      return KTUtil.data(sub).get("item");
    }

    if (sub && (parentItem = sub.closest(".menu-item[data-kt-menu-trigger]"))) {
      return parentItem;
    }

    return null;
  };

  // Get item parent elements
  var _getItemParentElements = function (item) {
    var parents = [];
    var parent;
    var i = 0;

    do {
      parent = _getItemParentElement(item);

      if (parent) {
        parents.push(parent);
        item = parent;
      }

      i++;
    } while (parent !== null && i < 20);

    if (the.triggerElement) {
      parents.unshift(the.triggerElement);
    }

    return parents;
  };

  // Get item child element
  var _getItemChildElement = function (item) {
    var selector = item;
    var element;

    if (KTUtil.data(item).get("sub")) {
      selector = KTUtil.data(item).get("sub");
    }

    if (selector !== null) {
      //element = selector.querySelector('.show.menu-item[data-kt-menu-trigger]');
      element = selector.querySelector(".menu-item[data-kt-menu-trigger]");

      if (element) {
        return element;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  // Get item child elements
  var _getItemChildElements = function (item) {
    var children = [];
    var child;
    var i = 0;

    do {
      child = _getItemChildElement(item);

      if (child) {
        children.push(child);
        item = child;
      }

      i++;
    } while (child !== null && i < 20);

    return children;
  };

  // Show item dropdown
  var _showDropdown = function (item) {
    // Handle dropdown show event
    if (KTEventHandler.trigger(the.element, "kt.menu.dropdown.show", item) === false) {
      return;
    }

    // Hide all currently shown dropdowns except current one
    KTMenu.hideDropdowns(item);

    var toggle = _isTriggerElement(item) ? item : _getItemLinkElement(item);
    var sub = _getItemSubElement(item);

    var width = _getOptionFromElementAttribute(item, "width");
    var height = _getOptionFromElementAttribute(item, "height");

    var zindex = the.options.dropdown.zindex; // update
    var parentZindex = KTUtil.getHighestZindex(item); // update

    // Apply a new z-index if dropdown's toggle element or it's parent has greater z-index // update
    if (parentZindex !== null && parentZindex >= zindex) {
      zindex = parentZindex + 1;
    }

    if (zindex > 0) {
      KTUtil.css(sub, "z-index", zindex);
    }

    if (width !== null) {
      KTUtil.css(sub, "width", width);
    }

    if (height !== null) {
      KTUtil.css(sub, "height", height);
    }

    KTUtil.css(sub, "display", "");
    KTUtil.css(sub, "overflow", "");

    // Init popper(new)
    _initDropdownPopper(item, sub);

    KTUtil.addClass(item, "show");
    KTUtil.addClass(item, "menu-dropdown");
    KTUtil.addClass(sub, "show");

    // Append the sub the the root of the menu
    if (_getOptionFromElementAttribute(item, "overflow") === true) {
      document.body.appendChild(sub);
      KTUtil.data(item).set("sub", sub);
      KTUtil.data(sub).set("item", item);
      KTUtil.data(sub).set("menu", the);
    } else {
      KTUtil.data(sub).set("item", item);
    }

    // Handle dropdown shown event
    KTEventHandler.trigger(the.element, "kt.menu.dropdown.shown", item);
  };

  // Hide item dropdown
  var _hideDropdown = function (item) {
    // Handle dropdown hide event
    if (KTEventHandler.trigger(the.element, "kt.menu.dropdown.hide", item) === false) {
      return;
    }

    var sub = _getItemSubElement(item);

    KTUtil.css(sub, "z-index", "");
    KTUtil.css(sub, "width", "");
    KTUtil.css(sub, "height", "");

    KTUtil.removeClass(item, "show");
    KTUtil.removeClass(item, "menu-dropdown");
    KTUtil.removeClass(sub, "show");

    // Append the sub back to it's parent
    if (_getOptionFromElementAttribute(item, "overflow") === true) {
      if (item.classList.contains("menu-item")) {
        item.appendChild(sub);
      } else {
        KTUtil.insertAfter(the.element, item);
      }

      KTUtil.data(item).remove("sub");
      KTUtil.data(sub).remove("item");
      KTUtil.data(sub).remove("menu");
    }

    // Destroy popper(new)
    _destroyDropdownPopper(item);

    // Handle dropdown hidden event
    KTEventHandler.trigger(the.element, "kt.menu.dropdown.hidden", item);
  };

  // Init dropdown popper(new)
  var _initDropdownPopper = function (item, sub) {
    // Setup popper instance
    var reference;
    var attach = _getOptionFromElementAttribute(item, "attach");

    if (attach) {
      if (attach === "parent") {
        reference = item.parentNode;
      } else {
        reference = document.querySelector(attach);
      }
    } else {
      reference = item;
    }

    var popper = Popper.createPopper(reference, sub, _getDropdownPopperConfig(item));
    KTUtil.data(item).set("popper", popper);
  };

  // Destroy dropdown popper(new)
  var _destroyDropdownPopper = function (item) {
    if (KTUtil.data(item).has("popper") === true) {
      KTUtil.data(item).get("popper").destroy();
      KTUtil.data(item).remove("popper");
    }
  };

  // Prepare popper config for dropdown(see: https://popper.js.org/docs/v2/)
  var _getDropdownPopperConfig = function (item) {
    // Placement
    var placement = _getOptionFromElementAttribute(item, "placement");
    if (!placement) {
      placement = "right";
    }

    // Offset
    var offsetValue = _getOptionFromElementAttribute(item, "offset");
    var offset = offsetValue ? offsetValue.split(",") : [];

    if (offset.length === 2) {
      offset[0] = parseInt(offset[0]);
      offset[1] = parseInt(offset[1]);
    }

    // Strategy
    var strategy = _getOptionFromElementAttribute(item, "overflow") === true ? "absolute" : "fixed";

    var altAxis = _getOptionFromElementAttribute(item, "flip") !== false ? true : false;

    var popperConfig = {
      placement: placement,
      strategy: strategy,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset,
          },
        },
        {
          name: "preventOverflow",
          options: {
            altAxis: altAxis,
          },
        },
        {
          name: "flip",
          options: {
            flipVariations: false,
          },
        },
      ],
    };

    return popperConfig;
  };

  // Show item accordion
  var _showAccordion = function (item) {
    if (KTEventHandler.trigger(the.element, "kt.menu.accordion.show", item) === false) {
      return;
    }

    var sub = _getItemSubElement(item);
    var expand = the.options.accordion.expand;

    if (_getOptionFromElementAttribute(item, "expand") === true) {
      expand = true;
    } else if (_getOptionFromElementAttribute(item, "expand") === false) {
      expand = false;
    } else if (_getOptionFromElementAttribute(the.element, "expand") === true) {
      expand = true;
    }

    if (expand === false) {
      _hideAccordions(item);
    }

    if (KTUtil.data(item).has("popper") === true) {
      _hideDropdown(item);
    }

    KTUtil.addClass(item, "hover");

    KTUtil.addClass(item, "showing");

    KTUtil.slideDown(sub, the.options.accordion.slideSpeed, function () {
      KTUtil.removeClass(item, "showing");
      KTUtil.addClass(item, "show");
      KTUtil.addClass(sub, "show");

      KTEventHandler.trigger(the.element, "kt.menu.accordion.shown", item);
    });
  };

  // Hide item accordion
  var _hideAccordion = function (item) {
    if (KTEventHandler.trigger(the.element, "kt.menu.accordion.hide", item) === false) {
      return;
    }

    var sub = _getItemSubElement(item);

    KTUtil.addClass(item, "hiding");

    KTUtil.slideUp(sub, the.options.accordion.slideSpeed, function () {
      KTUtil.removeClass(item, "hiding");
      KTUtil.removeClass(item, "show");
      KTUtil.removeClass(sub, "show");

      KTUtil.removeClass(item, "hover"); // update

      KTEventHandler.trigger(the.element, "kt.menu.accordion.hidden", item);
    });
  };

  var _setActiveLink = function (link) {
    var item = _getItemElement(link);
    var parentItems = _getItemParentElements(item);
    var parentTabPane = link.closest(".tab-pane");

    var activeLinks = [].slice.call(the.element.querySelectorAll(".menu-link.active"));
    var activeParentItems = [].slice.call(the.element.querySelectorAll(".menu-item.here, .menu-item.show"));

    if (_getItemSubType(item) === "accordion") {
      _showAccordion(item);
    } else {
      item.classList.add("here");
    }

    if (parentItems && parentItems.length > 0) {
      for (var i = 0, len = parentItems.length; i < len; i++) {
        var parentItem = parentItems[i];

        if (_getItemSubType(parentItem) === "accordion") {
          _showAccordion(parentItem);
        } else {
          parentItem.classList.add("here");
        }
      }
    }

    activeLinks.map(function (activeLink) {
      activeLink.classList.remove("active");
    });

    activeParentItems.map(function (activeParentItem) {
      if (activeParentItem.contains(item) === false) {
        activeParentItem.classList.remove("here");
        activeParentItem.classList.remove("show");
      }
    });

    // Handle tab
    if (parentTabPane && bootstrap.Tab) {
      var tabEl = the.element.querySelector('[data-bs-target="#' + parentTabPane.getAttribute("id") + '"]');
      var tab = new bootstrap.Tab(tabEl);

      if (tab) {
        tab.show();
      }
    }

    link.classList.add("active");
  };

  var _getLinkByAttribute = function (value, name = "href") {
    var link = the.element.querySelector("a[" + name + '="' + value + '"]');

    if (link) {
      return link;
    } else {
      null;
    }
  };

  // Hide all shown accordions of item
  var _hideAccordions = function (item) {
    var itemsToHide = KTUtil.findAll(the.element, ".show[data-kt-menu-trigger]");
    var itemToHide;

    if (itemsToHide && itemsToHide.length > 0) {
      for (var i = 0, len = itemsToHide.length; i < len; i++) {
        itemToHide = itemsToHide[i];

        if (_getItemSubType(itemToHide) === "accordion" && itemToHide !== item && item.contains(itemToHide) === false && itemToHide.contains(item) === false) {
          _hideAccordion(itemToHide);
        }
      }
    }
  };

  // Get item option(through html attributes)
  var _getOptionFromElementAttribute = function (item, name) {
    var attr;
    var value = null;

    if (item && item.hasAttribute("data-kt-menu-" + name)) {
      attr = item.getAttribute("data-kt-menu-" + name);
      value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }
    }

    return value;
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("menu");
  };

  // Construct Class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Event Handlers
  the.click = function (element, e) {
    return _click(element, e);
  };

  the.link = function (element, e) {
    return _link(element, e);
  };

  the.dismiss = function (element, e) {
    return _dismiss(element, e);
  };

  the.mouseover = function (element, e) {
    return _mouseover(element, e);
  };

  the.mouseout = function (element, e) {
    return _mouseout(element, e);
  };

  // General Methods
  the.getItemTriggerType = function (item) {
    return _getOptionFromElementAttribute(item, "trigger");
  };

  the.getItemSubType = function (element) {
    return _getItemSubType(element);
  };

  the.show = function (item) {
    return _show(item);
  };

  the.hide = function (item) {
    return _hide(item);
  };

  the.toggle = function (item) {
    return _toggle(item);
  };

  the.reset = function (item) {
    return _reset(item);
  };

  the.update = function () {
    return _update();
  };

  the.getElement = function () {
    return the.element;
  };

  the.setActiveLink = function (link) {
    return _setActiveLink(link);
  };

  the.getLinkByAttribute = function (value, name = "href") {
    return _getLinkByAttribute(value, name);
  };

  the.getItemLinkElement = function (item) {
    return _getItemLinkElement(item);
  };

  the.getItemToggleElement = function (item) {
    return _getItemToggleElement(item);
  };

  the.getItemSubElement = function (item) {
    return _getItemSubElement(item);
  };

  the.getItemParentElements = function (item) {
    return _getItemParentElements(item);
  };

  the.isItemSubShown = function (item) {
    return _isItemSubShown(item);
  };

  the.isItemParentShown = function (item) {
    return _isItemParentShown(item);
  };

  the.getTriggerElement = function () {
    return the.triggerElement;
  };

  the.isItemDropdownPermanent = function (item) {
    return _isItemDropdownPermanent(item);
  };

  the.destroy = function () {
    return _destroy();
  };

  the.disable = function () {
    the.disabled = true;
  };

  the.enable = function () {
    the.disabled = false;
  };

  // Accordion Mode Methods
  the.hideAccordions = function (item) {
    return _hideAccordions(item);
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };
};

// Get KTMenu instance by element
KTMenu.getInstance = function (element) {
  var menu;
  var item;

  if (!element) {
    return null;
  }

  // Element has menu DOM reference in it's DATA storage
  if (KTUtil.data(element).has("menu")) {
    return KTUtil.data(element).get("menu");
  }

  // Element has .menu parent
  if ((menu = element.closest(".menu"))) {
    if (KTUtil.data(menu).has("menu")) {
      return KTUtil.data(menu).get("menu");
    }
  }

  // Element has a parent with DOM reference to .menu in it's DATA storage
  if (KTUtil.hasClass(element, "menu-link")) {
    var sub = element.closest(".menu-sub");

    if (KTUtil.data(sub).has("menu")) {
      return KTUtil.data(sub).get("menu");
    }
  }

  return null;
};

// Hide all dropdowns and skip one if provided
KTMenu.hideDropdowns = function (skip) {
  var items = document.querySelectorAll(".show.menu-dropdown[data-kt-menu-trigger]");

  if (items && items.length > 0) {
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var menu = KTMenu.getInstance(item);

      if (menu && menu.getItemSubType(item) === "dropdown") {
        if (skip) {
          if (menu.getItemSubElement(item).contains(skip) === false && item.contains(skip) === false && item !== skip) {
            menu.hide(item);
          }
        } else {
          menu.hide(item);
        }
      }
    }
  }
};

// Update all dropdowns popover instances
KTMenu.updateDropdowns = function () {
  var items = document.querySelectorAll(".show.menu-dropdown[data-kt-menu-trigger]");

  if (items && items.length > 0) {
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];

      if (KTUtil.data(item).has("popper")) {
        KTUtil.data(item).get("popper").forceUpdate();
      }
    }
  }
};

// Global handlers
KTMenu.initHandlers = function () {
  // Dropdown handler
  document.addEventListener("click", function (e) {
    var items = document.querySelectorAll('.show.menu-dropdown[data-kt-menu-trigger]:not([data-kt-menu-static="true"])');
    var menu;
    var item;
    var sub;
    var menuObj;

    if (items && items.length > 0) {
      for (var i = 0, len = items.length; i < len; i++) {
        item = items[i];
        menuObj = KTMenu.getInstance(item);

        if (menuObj && menuObj.getItemSubType(item) === "dropdown") {
          menu = menuObj.getElement();
          sub = menuObj.getItemSubElement(item);

          if (item === e.target || item.contains(e.target)) {
            continue;
          }

          if (sub === e.target || sub.contains(e.target)) {
            continue;
          }

          menuObj.hide(item);
        }
      }
    }
  });

  // Sub toggle handler(updated)
  KTUtil.on(document.body, '.menu-item[data-kt-menu-trigger] > .menu-link, [data-kt-menu-trigger]:not(.menu-item):not([data-kt-menu-trigger="auto"])', "click", function (e) {
    var menu = KTMenu.getInstance(this);

    if (menu !== null) {
      return menu.click(this, e);
    }
  });

  // Link handler
  KTUtil.on(document.body, ".menu-item:not([data-kt-menu-trigger]) > .menu-link", "click", function (e) {
    var menu = KTMenu.getInstance(this);

    if (menu !== null) {
      return menu.link(this, e);
    }
  });

  // Dismiss handler
  KTUtil.on(document.body, '[data-kt-menu-dismiss="true"]', "click", function (e) {
    var menu = KTMenu.getInstance(this);

    if (menu !== null) {
      return menu.dismiss(this, e);
    }
  });

  // Mouseover handler
  KTUtil.on(document.body, "[data-kt-menu-trigger], .menu-sub", "mouseover", function (e) {
    var menu = KTMenu.getInstance(this);

    if (menu !== null && menu.getItemSubType(this) === "dropdown") {
      return menu.mouseover(this, e);
    }
  });

  // Mouseout handler
  KTUtil.on(document.body, "[data-kt-menu-trigger], .menu-sub", "mouseout", function (e) {
    var menu = KTMenu.getInstance(this);

    if (menu !== null && menu.getItemSubType(this) === "dropdown") {
      return menu.mouseout(this, e);
    }
  });

  // Resize handler
  window.addEventListener("resize", function () {
    var menu;
    var timer;

    KTUtil.throttle(
      timer,
      function () {
        // Locate and update Offcanvas instances on window resize
        var elements = document.querySelectorAll('[data-kt-menu="true"]');

        if (elements && elements.length > 0) {
          for (var i = 0, len = elements.length; i < len; i++) {
            menu = KTMenu.getInstance(elements[i]);
            if (menu) {
              menu.update();
            }
          }
        }
      },
      200
    );
  });
};

// Render menus by url
KTMenu.updateByLinkAttribute = function (value, name = "href") {
  // Locate and update Offcanvas instances on window resize
  var elements = document.querySelectorAll('[data-kt-menu="true"]');

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      var menu = KTMenu.getInstance(elements[i]);

      if (menu) {
        var link = menu.getLinkByAttribute(value, name);
        if (link) {
          menu.setActiveLink(link);
        }
      }
    }
  }
};

// Global instances
KTMenu.createInstances = function (selector = '[data-kt-menu="true"]') {
  // Initialize menus
  var elements = document.querySelectorAll(selector);
  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTMenu(elements[i]);
    }
  }
};

// Global initialization
KTMenu.init = function () {
  KTMenu.createInstances();

  if (KTMenuHandlersInitialized === false) {
    KTMenu.initHandlers();

    KTMenuHandlersInitialized = true;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTMenu;
}

("use strict");

// Class definition
var KTPasswordMeter = function (element, options) {
  ////////////////////////////
  // ** Private variables  ** //
  ////////////////////////////
  var the = this;

  if (!element) {
    return;
  }

  // Default Options
  var defaultOptions = {
    minLength: 8,
    checkUppercase: true,
    checkLowercase: true,
    checkDigit: true,
    checkChar: true,
    scoreHighlightClass: "active",
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  // Constructor
  var _construct = function () {
    if (KTUtil.data(element).has("password-meter") === true) {
      the = KTUtil.data(element).get("password-meter");
    } else {
      _init();
    }
  };

  // Initialize
  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.score = 0;
    the.checkSteps = 5;

    // Elements
    the.element = element;
    the.inputElement = the.element.querySelector("input[type]");
    the.visibilityElement = the.element.querySelector('[data-kt-password-meter-control="visibility"]');
    the.highlightElement = the.element.querySelector('[data-kt-password-meter-control="highlight"]');

    // Set initialized
    the.element.setAttribute("data-kt-password-meter", "true");

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("password-meter", the);
  };

  // Handlers
  var _handlers = function () {
    if (the.highlightElement) {
      the.inputElement.addEventListener("input", function () {
        _check();
      });
    }

    if (the.visibilityElement) {
      the.visibilityElement.addEventListener("click", function () {
        _visibility();
      });
    }
  };

  // Event handlers
  var _check = function () {
    var score = 0;
    var checkScore = _getCheckScore();

    if (_checkLength() === true) {
      score = score + checkScore;
    }

    if (the.options.checkUppercase === true && _checkLowercase() === true) {
      score = score + checkScore;
    }

    if (the.options.checkLowercase === true && _checkUppercase() === true) {
      score = score + checkScore;
    }

    if (the.options.checkDigit === true && _checkDigit() === true) {
      score = score + checkScore;
    }

    if (the.options.checkChar === true && _checkChar() === true) {
      score = score + checkScore;
    }

    the.score = score;

    _highlight();
  };

  var _checkLength = function () {
    return the.inputElement.value.length >= the.options.minLength; // 20 score
  };

  var _checkLowercase = function () {
    return /[a-z]/.test(the.inputElement.value); // 20 score
  };

  var _checkUppercase = function () {
    return /[A-Z]/.test(the.inputElement.value); // 20 score
  };

  var _checkDigit = function () {
    return /[0-9]/.test(the.inputElement.value); // 20 score
  };

  var _checkChar = function () {
    return /[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(the.inputElement.value); // 20 score
  };

  var _getCheckScore = function () {
    var count = 1;

    if (the.options.checkUppercase === true) {
      count++;
    }

    if (the.options.checkLowercase === true) {
      count++;
    }

    if (the.options.checkDigit === true) {
      count++;
    }

    if (the.options.checkChar === true) {
      count++;
    }

    the.checkSteps = count;

    return 100 / the.checkSteps;
  };

  var _highlight = function () {
    var items = [].slice.call(the.highlightElement.querySelectorAll("div"));
    var total = items.length;
    var index = 0;
    var checkScore = _getCheckScore();
    var score = _getScore();

    items.map(function (item) {
      index++;

      if (checkScore * index * (the.checkSteps / total) <= score) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  var _visibility = function () {
    var visibleIcon = the.visibilityElement.querySelector("i:not(.d-none), .svg-icon:not(.d-none)");
    var hiddenIcon = the.visibilityElement.querySelector("i.d-none, .svg-icon.d-none");

    if (the.inputElement.getAttribute("type").toLowerCase() === "password") {
      the.inputElement.setAttribute("type", "text");
    } else {
      the.inputElement.setAttribute("type", "password");
    }

    visibleIcon.classList.add("d-none");
    hiddenIcon.classList.remove("d-none");

    the.inputElement.focus();
  };

  var _reset = function () {
    the.score = 0;

    _highlight();
  };

  // Gets current password score
  var _getScore = function () {
    return the.score;
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("password-meter");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.check = function () {
    return _check();
  };

  the.getScore = function () {
    return _getScore();
  };

  the.reset = function () {
    return _reset();
  };

  the.destroy = function () {
    return _destroy();
  };
};

// Static methods
KTPasswordMeter.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("password-meter")) {
    return KTUtil.data(element).get("password-meter");
  } else {
    return null;
  }
};

// Create instances
KTPasswordMeter.createInstances = function (selector = "[data-kt-password-meter]") {
  // Get instances
  var elements = document.body.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      // Initialize instances
      new KTPasswordMeter(elements[i]);
    }
  }
};

// Global initialization
KTPasswordMeter.init = function () {
  KTPasswordMeter.createInstances();
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTPasswordMeter;
}
("use strict");

var KTScrollHandlersInitialized = false;

// Class definition
var KTScroll = function (element, options) {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var the = this;

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    saveState: true,
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("scroll")) {
      the = KTUtil.data(element).get("scroll");
    } else {
      _init();
    }
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);

    // Elements
    the.element = element;
    the.id = the.element.getAttribute("id");

    // Set initialized
    the.element.setAttribute("data-kt-scroll", "true");

    // Update
    _update();

    // Bind Instance
    KTUtil.data(the.element).set("scroll", the);
  };

  var _setupHeight = function () {
    var heightType = _getHeightType();
    var height = _getHeight();

    // Set height
    if (height !== null && height.length > 0) {
      KTUtil.css(the.element, heightType, height);
    } else {
      KTUtil.css(the.element, heightType, "");
    }
  };

  var _setupState = function () {
    var namespace = _getStorageNamespace();

    if (_getOption("save-state") === true && the.id) {
      if (localStorage.getItem(namespace + the.id + "st")) {
        var pos = parseInt(localStorage.getItem(namespace + the.id + "st"));

        if (pos > 0) {
          the.element.scroll({
            top: pos,
            behavior: "instant",
          });
        }
      }
    }
  };

  var _getStorageNamespace = function (postfix) {
    return document.body.hasAttribute("data-kt-name") ? document.body.getAttribute("data-kt-name") + "_" : "";
  };

  var _setupScrollHandler = function () {
    if (_getOption("save-state") === true && the.id) {
      the.element.addEventListener("scroll", _scrollHandler);
    } else {
      the.element.removeEventListener("scroll", _scrollHandler);
    }
  };

  var _destroyScrollHandler = function () {
    the.element.removeEventListener("scroll", _scrollHandler);
  };

  var _resetHeight = function () {
    KTUtil.css(the.element, _getHeightType(), "");
  };

  var _scrollHandler = function () {
    var namespace = _getStorageNamespace();
    localStorage.setItem(namespace + the.id + "st", the.element.scrollTop);
  };

  var _update = function () {
    // Activate/deactivate
    if (_getOption("activate") === true || the.element.hasAttribute("data-kt-scroll-activate") === false) {
      _setupHeight();
      _setupStretchHeight();
      _setupScrollHandler();
      _setupState();
    } else {
      _resetHeight();
      _destroyScrollHandler();
    }
  };

  var _setupStretchHeight = function () {
    var stretch = _getOption("stretch");

    // Stretch
    if (stretch !== null) {
      var elements = document.querySelectorAll(stretch);

      if (elements && elements.length == 2) {
        var element1 = elements[0];
        var element2 = elements[1];
        var diff = _getElementHeight(element2) - _getElementHeight(element1);

        if (diff > 0) {
          var height = parseInt(KTUtil.css(the.element, _getHeightType())) + diff;

          KTUtil.css(the.element, _getHeightType(), String(height) + "px");
        }
      }
    }
  };

  var _getHeight = function () {
    var height = _getOption(_getHeightType());

    if (height instanceof Function) {
      return height.call();
    } else if (height !== null && typeof height === "string" && height.toLowerCase() === "auto") {
      return _getAutoHeight();
    } else {
      return height;
    }
  };

  var _getAutoHeight = function () {
    var height = KTUtil.getViewPort().height;
    var dependencies = _getOption("dependencies");
    var wrappers = _getOption("wrappers");
    var offset = _getOption("offset");

    // Spacings
    height = height - _getElementSpacing(the.element);

    // Height dependencies
    //console.log('Q:' + JSON.stringify(dependencies));

    if (dependencies !== null) {
      var elements = document.querySelectorAll(dependencies);

      if (elements && elements.length > 0) {
        for (var i = 0, len = elements.length; i < len; i++) {
          if (KTUtil.visible(elements[i]) === false) {
            continue;
          }

          height = height - _getElementHeight(elements[i]);
        }
      }
    }

    // Wrappers
    if (wrappers !== null) {
      var elements = document.querySelectorAll(wrappers);
      if (elements && elements.length > 0) {
        for (var i = 0, len = elements.length; i < len; i++) {
          if (KTUtil.visible(elements[i]) === false) {
            continue;
          }

          height = height - _getElementSpacing(elements[i]);
        }
      }
    }

    // Custom offset
    if (offset !== null && typeof offset !== "object") {
      height = height - parseInt(offset);
    }

    return String(height) + "px";
  };

  var _getElementHeight = function (element) {
    var height = 0;

    if (element !== null) {
      height = height + parseInt(KTUtil.css(element, "height"));
      height = height + parseInt(KTUtil.css(element, "margin-top"));
      height = height + parseInt(KTUtil.css(element, "margin-bottom"));

      if (KTUtil.css(element, "border-top")) {
        height = height + parseInt(KTUtil.css(element, "border-top"));
      }

      if (KTUtil.css(element, "border-bottom")) {
        height = height + parseInt(KTUtil.css(element, "border-bottom"));
      }
    }

    return height;
  };

  var _getElementSpacing = function (element) {
    var spacing = 0;

    if (element !== null) {
      spacing = spacing + parseInt(KTUtil.css(element, "margin-top"));
      spacing = spacing + parseInt(KTUtil.css(element, "margin-bottom"));
      spacing = spacing + parseInt(KTUtil.css(element, "padding-top"));
      spacing = spacing + parseInt(KTUtil.css(element, "padding-bottom"));

      if (KTUtil.css(element, "border-top")) {
        spacing = spacing + parseInt(KTUtil.css(element, "border-top"));
      }

      if (KTUtil.css(element, "border-bottom")) {
        spacing = spacing + parseInt(KTUtil.css(element, "border-bottom"));
      }
    }

    return spacing;
  };

  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-scroll-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-scroll-" + name);

      var value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }

      return value;
    } else {
      var optionName = KTUtil.snakeToCamel(name);

      if (the.options[optionName]) {
        return KTUtil.getResponsiveValue(the.options[optionName]);
      } else {
        return null;
      }
    }
  };

  var _getHeightType = function () {
    if (_getOption("height")) {
      return "height";
    }
    if (_getOption("min-height")) {
      return "min-height";
    }
    if (_getOption("max-height")) {
      return "max-height";
    }
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("scroll");
  };

  // Construct Class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  the.update = function () {
    return _update();
  };

  the.getHeight = function () {
    return _getHeight();
  };

  the.getElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };
};

// Static methods
KTScroll.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("scroll")) {
    return KTUtil.data(element).get("scroll");
  } else {
    return null;
  }
};

// Create instances
KTScroll.createInstances = function (selector = '[data-kt-scroll="true"]') {
  // Initialize Menus
  var elements = document.body.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTScroll(elements[i]);
    }
  }
};

// Window resize handling
KTScroll.handleResize = function () {
  window.addEventListener("resize", function () {
    var timer;

    KTUtil.throttle(
      timer,
      function () {
        // Locate and update Offcanvas instances on window resize
        var elements = document.body.querySelectorAll('[data-kt-scroll="true"]');

        if (elements && elements.length > 0) {
          for (var i = 0, len = elements.length; i < len; i++) {
            var scroll = KTScroll.getInstance(elements[i]);
            if (scroll) {
              scroll.update();
            }
          }
        }
      },
      200
    );
  });
};

// Global initialization
KTScroll.init = function () {
  KTScroll.createInstances();

  if (KTScrollHandlersInitialized === false) {
    KTScroll.handleResize();

    KTScrollHandlersInitialized = true;
  }
};

// Webpack Support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTScroll;
}

("use strict");

// Class definition
var KTScrolltop = function (element, options) {
  ////////////////////////////
  // ** Private variables  ** //
  ////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default options
  var defaultOptions = {
    offset: 300,
    speed: 600,
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("scrolltop")) {
      the = KTUtil.data(element).get("scrolltop");
    } else {
      _init();
    }
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("scrolltop");
    the.element = element;

    // Set initialized
    the.element.setAttribute("data-kt-scrolltop", "true");

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("scrolltop", the);
  };

  var _handlers = function () {
    var timer;

    window.addEventListener("scroll", function () {
      KTUtil.throttle(
        timer,
        function () {
          _scroll();
        },
        200
      );
    });

    KTUtil.addEvent(the.element, "click", function (e) {
      e.preventDefault();

      _go();
    });
  };

  var _scroll = function () {
    var offset = parseInt(_getOption("offset"));

    var pos = KTUtil.getScrollTop(); // current vertical position

    if (pos > offset) {
      if (document.body.hasAttribute("data-kt-scrolltop") === false) {
        document.body.setAttribute("data-kt-scrolltop", "on");
      }
    } else {
      if (document.body.hasAttribute("data-kt-scrolltop") === true) {
        document.body.removeAttribute("data-kt-scrolltop");
      }
    }
  };

  var _go = function () {
    var speed = parseInt(_getOption("speed"));

    window.scrollTo({ top: 0, behavior: "smooth" });
    //KTUtil.scrollTop(0, speed);
  };

  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-scrolltop-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-scrolltop-" + name);
      var value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }

      return value;
    } else {
      var optionName = KTUtil.snakeToCamel(name);

      if (the.options[optionName]) {
        return KTUtil.getResponsiveValue(the.options[optionName]);
      } else {
        return null;
      }
    }
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("scrolltop");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.go = function () {
    return _go();
  };

  the.getElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };
};

// Static methods
KTScrolltop.getInstance = function (element) {
  if (element && KTUtil.data(element).has("scrolltop")) {
    return KTUtil.data(element).get("scrolltop");
  } else {
    return null;
  }
};

// Create instances
KTScrolltop.createInstances = function (selector = '[data-kt-scrolltop="true"]') {
  // Initialize Menus
  var elements = document.body.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTScrolltop(elements[i]);
    }
  }
};

// Global initialization
KTScrolltop.init = function () {
  KTScrolltop.createInstances();
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTScrolltop;
}

("use strict");

// Class definition
var KTSearch = function (element, options) {
  ////////////////////////////
  // ** Private variables  ** //
  ////////////////////////////
  var the = this;

  if (!element) {
    return;
  }

  // Default Options
  var defaultOptions = {
    minLength: 2, // Miniam text lenght to query search
    keypress: true, // Enable search on keypress
    enter: true, // Enable search on enter key press
    layout: "menu", // Use 'menu' or 'inline' layout options to display search results
    responsive: null, // Pass integer value or bootstrap compatible breakpoint key(sm,md,lg,xl,xxl) to enable reponsive form mode for device width below the breakpoint value
    showOnFocus: true, // Always show menu on input focus
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  // Construct
  var _construct = function () {
    if (KTUtil.data(element).has("search") === true) {
      the = KTUtil.data(element).get("search");
    } else {
      _init();
    }
  };

  // Init
  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.processing = false;

    // Elements
    the.element = element;
    the.contentElement = _getElement("content");
    the.formElement = _getElement("form");
    the.inputElement = _getElement("input");
    the.spinnerElement = _getElement("spinner");
    the.clearElement = _getElement("clear");
    the.toggleElement = _getElement("toggle");
    the.submitElement = _getElement("submit");
    the.toolbarElement = _getElement("toolbar");

    the.resultsElement = _getElement("results");
    the.suggestionElement = _getElement("suggestion");
    the.emptyElement = _getElement("empty");

    // Set initialized
    the.element.setAttribute("data-kt-search", "true");

    // Layout
    the.layout = _getOption("layout");

    // Menu
    if (the.layout === "menu") {
      the.menuObject = new KTMenu(the.contentElement);
    } else {
      the.menuObject = null;
    }

    // Update
    _update();

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("search", the);
  };

  // Handlera
  var _handlers = function () {
    // Focus
    the.inputElement.addEventListener("focus", _focus);

    // Blur
    the.inputElement.addEventListener("blur", _blur);

    // Keypress
    if (_getOption("keypress") === true) {
      the.inputElement.addEventListener("input", _input);
    }

    // Submit
    if (the.submitElement) {
      the.submitElement.addEventListener("click", _search);
    }

    // Enter
    if (_getOption("enter") === true) {
      the.inputElement.addEventListener("keypress", _enter);
    }

    // Clear
    if (the.clearElement) {
      the.clearElement.addEventListener("click", _clear);
    }

    // Menu
    if (the.menuObject) {
      // Toggle menu
      if (the.toggleElement) {
        the.toggleElement.addEventListener("click", _show);

        the.menuObject.on("kt.menu.dropdown.show", function (item) {
          if (KTUtil.visible(the.toggleElement)) {
            the.toggleElement.classList.add("active");
            the.toggleElement.classList.add("show");
          }
        });

        the.menuObject.on("kt.menu.dropdown.hide", function (item) {
          if (KTUtil.visible(the.toggleElement)) {
            the.toggleElement.classList.remove("active");
            the.toggleElement.classList.remove("show");
          }
        });
      }

      the.menuObject.on("kt.menu.dropdown.shown", function () {
        the.inputElement.focus();
      });
    }

    // Window resize handling
    window.addEventListener("resize", function () {
      var timer;

      KTUtil.throttle(
        timer,
        function () {
          _update();
        },
        200
      );
    });
  };

  // Focus
  var _focus = function () {
    the.element.classList.add("focus");

    if (_getOption("show-on-focus") === true || the.inputElement.value.length >= minLength) {
      _show();
    }
  };

  // Blur
  var _blur = function () {
    the.element.classList.remove("focus");
  };

  // Enter
  var _enter = function (e) {
    var key = e.charCode || e.keyCode || 0;

    if (key == 13) {
      e.preventDefault();

      _search();
    }
  };

  // Input
  var _input = function () {
    if (_getOption("min-length")) {
      var minLength = parseInt(_getOption("min-length"));

      if (the.inputElement.value.length >= minLength) {
        _search();
      } else if (the.inputElement.value.length === 0) {
        _clear();
      }
    }
  };

  // Search
  var _search = function () {
    if (the.processing === false) {
      // Show search spinner
      if (the.spinnerElement) {
        the.spinnerElement.classList.remove("d-none");
      }

      // Hide search clear button
      if (the.clearElement) {
        the.clearElement.classList.add("d-none");
      }

      // Hide search toolbar
      if (the.toolbarElement && the.formElement.contains(the.toolbarElement)) {
        the.toolbarElement.classList.add("d-none");
      }

      // Focus input
      the.inputElement.focus();

      the.processing = true;
      KTEventHandler.trigger(the.element, "kt.search.process", the);
    }
  };

  // Complete
  var _complete = function () {
    if (the.spinnerElement) {
      the.spinnerElement.classList.add("d-none");
    }

    // Show search toolbar
    if (the.clearElement) {
      the.clearElement.classList.remove("d-none");
    }

    if (the.inputElement.value.length === 0) {
      _clear();
    }

    // Focus input
    the.inputElement.focus();

    _show();

    the.processing = false;
  };

  // Clear
  var _clear = function () {
    if (KTEventHandler.trigger(the.element, "kt.search.clear", the) === false) {
      return;
    }

    // Clear and focus input
    the.inputElement.value = "";
    the.inputElement.focus();

    // Hide clear icon
    if (the.clearElement) {
      the.clearElement.classList.add("d-none");
    }

    // Show search toolbar
    if (the.toolbarElement && the.formElement.contains(the.toolbarElement)) {
      the.toolbarElement.classList.remove("d-none");
    }

    // Hide menu
    if (_getOption("show-on-focus") === false) {
      _hide();
    }

    KTEventHandler.trigger(the.element, "kt.search.cleared", the);
  };

  // Update
  var _update = function () {
    // Handle responsive form
    if (the.layout === "menu") {
      var responsiveFormMode = _getResponsiveFormMode();

      if (responsiveFormMode === "on" && the.contentElement.contains(the.formElement) === false) {
        the.contentElement.prepend(the.formElement);
        the.formElement.classList.remove("d-none");
      } else if (responsiveFormMode === "off" && the.contentElement.contains(the.formElement) === true) {
        the.element.prepend(the.formElement);
        the.formElement.classList.add("d-none");
      }
    }
  };

  // Show menu
  var _show = function () {
    if (the.menuObject) {
      _update();

      the.menuObject.show(the.element);
    }
  };

  // Hide menu
  var _hide = function () {
    if (the.menuObject) {
      _update();

      the.menuObject.hide(the.element);
    }
  };

  // Get option
  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-search-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-search-" + name);
      var value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }

      return value;
    } else {
      var optionName = KTUtil.snakeToCamel(name);

      if (the.options[optionName]) {
        return KTUtil.getResponsiveValue(the.options[optionName]);
      } else {
        return null;
      }
    }
  };

  // Get element
  var _getElement = function (name) {
    return the.element.querySelector('[data-kt-search-element="' + name + '"]');
  };

  // Check if responsive form mode is enabled
  var _getResponsiveFormMode = function () {
    var responsive = _getOption("responsive");
    var width = KTUtil.getViewPort().width;

    if (!responsive) {
      return null;
    }

    var breakpoint = KTUtil.getBreakpoint(responsive);

    if (!breakpoint) {
      breakpoint = parseInt(responsive);
    }

    if (width < breakpoint) {
      return "on";
    } else {
      return "off";
    }
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("search");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.show = function () {
    return _show();
  };

  the.hide = function () {
    return _hide();
  };

  the.update = function () {
    return _update();
  };

  the.search = function () {
    return _search();
  };

  the.complete = function () {
    return _complete();
  };

  the.clear = function () {
    return _clear();
  };

  the.isProcessing = function () {
    return the.processing;
  };

  the.getQuery = function () {
    return the.inputElement.value;
  };

  the.getMenu = function () {
    return the.menuObject;
  };

  the.getFormElement = function () {
    return the.formElement;
  };

  the.getInputElement = function () {
    return the.inputElement;
  };

  the.getContentElement = function () {
    return the.contentElement;
  };

  the.getElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };
};

// Static methods
KTSearch.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("search")) {
    return KTUtil.data(element).get("search");
  } else {
    return null;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTSearch;
}

("use strict");

// Class definition
var KTStepper = function (element, options) {
  //////////////////////////////
  // ** Private variables  ** //
  //////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default Options
  var defaultOptions = {
    startIndex: 1,
    animation: false,
    animationSpeed: "0.3s",
    animationNextClass: "animate__animated animate__slideInRight animate__fast",
    animationPreviousClass: "animate__animated animate__slideInLeft animate__fast",
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("stepper") === true) {
      the = KTUtil.data(element).get("stepper");
    } else {
      _init();
    }
  };

  var _init = function () {
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("stepper");

    the.element = element;

    // Set initialized
    the.element.setAttribute("data-kt-stepper", "true");

    // Elements
    the.steps = KTUtil.findAll(the.element, '[data-kt-stepper-element="nav"]');
    the.btnNext = KTUtil.find(the.element, '[data-kt-stepper-action="next"]');
    the.btnPrevious = KTUtil.find(the.element, '[data-kt-stepper-action="previous"]');
    the.btnSubmit = KTUtil.find(the.element, '[data-kt-stepper-action="submit"]');

    // Variables
    the.totalStepsNumber = the.steps.length;
    the.passedStepIndex = 0;
    the.currentStepIndex = 1;
    the.clickedStepIndex = 0;

    // Set Current Step
    if (the.options.startIndex > 1) {
      _goTo(the.options.startIndex);
    }

    // Event listeners
    the.nextListener = function (e) {
      e.preventDefault();

      KTEventHandler.trigger(the.element, "kt.stepper.next", the);
    };

    the.previousListener = function (e) {
      e.preventDefault();

      KTEventHandler.trigger(the.element, "kt.stepper.previous", the);
    };

    the.stepListener = function (e) {
      e.preventDefault();

      if (the.steps && the.steps.length > 0) {
        for (var i = 0, len = the.steps.length; i < len; i++) {
          if (the.steps[i] === this) {
            the.clickedStepIndex = i + 1;

            KTEventHandler.trigger(the.element, "kt.stepper.click", the);

            return;
          }
        }
      }
    };

    // Event Handlers
    KTUtil.addEvent(the.btnNext, "click", the.nextListener);

    KTUtil.addEvent(the.btnPrevious, "click", the.previousListener);

    the.stepListenerId = KTUtil.on(the.element, '[data-kt-stepper-action="step"]', "click", the.stepListener);

    // Bind Instance
    KTUtil.data(the.element).set("stepper", the);
  };

  var _goTo = function (index) {
    // Trigger "change" event
    KTEventHandler.trigger(the.element, "kt.stepper.change", the);

    // Skip if this step is already shown
    if (index === the.currentStepIndex || index > the.totalStepsNumber || index < 0) {
      return;
    }

    // Validate step number
    index = parseInt(index);

    // Set current step
    the.passedStepIndex = the.currentStepIndex;
    the.currentStepIndex = index;

    // Refresh elements
    _refreshUI();

    // Trigger "changed" event
    KTEventHandler.trigger(the.element, "kt.stepper.changed", the);

    return the;
  };

  var _goNext = function () {
    return _goTo(_getNextStepIndex());
  };

  var _goPrevious = function () {
    return _goTo(_getPreviousStepIndex());
  };

  var _goLast = function () {
    return _goTo(_getLastStepIndex());
  };

  var _goFirst = function () {
    return _goTo(_getFirstStepIndex());
  };

  var _refreshUI = function () {
    var state = "";

    if (_isLastStep()) {
      state = "last";
    } else if (_isFirstStep()) {
      state = "first";
    } else {
      state = "between";
    }

    // Set state class
    KTUtil.removeClass(the.element, "last");
    KTUtil.removeClass(the.element, "first");
    KTUtil.removeClass(the.element, "between");

    KTUtil.addClass(the.element, state);

    // Step Items
    var elements = KTUtil.findAll(the.element, '[data-kt-stepper-element="nav"], [data-kt-stepper-element="content"], [data-kt-stepper-element="info"]');

    if (elements && elements.length > 0) {
      for (var i = 0, len = elements.length; i < len; i++) {
        var element = elements[i];
        var index = KTUtil.index(element) + 1;

        KTUtil.removeClass(element, "current");
        KTUtil.removeClass(element, "completed");
        KTUtil.removeClass(element, "pending");

        if (index == the.currentStepIndex) {
          KTUtil.addClass(element, "current");

          if (the.options.animation !== false && element.getAttribute("data-kt-stepper-element") == "content") {
            KTUtil.css(element, "animationDuration", the.options.animationSpeed);

            var animation = _getStepDirection(the.passedStepIndex) === "previous" ? the.options.animationPreviousClass : the.options.animationNextClass;
            KTUtil.animateClass(element, animation);
          }
        } else {
          if (index < the.currentStepIndex) {
            KTUtil.addClass(element, "completed");
          } else {
            KTUtil.addClass(element, "pending");
          }
        }
      }
    }
  };

  var _isLastStep = function () {
    return the.currentStepIndex === the.totalStepsNumber;
  };

  var _isFirstStep = function () {
    return the.currentStepIndex === 1;
  };

  var _isBetweenStep = function () {
    return _isLastStep() === false && _isFirstStep() === false;
  };

  var _getNextStepIndex = function () {
    if (the.totalStepsNumber >= the.currentStepIndex + 1) {
      return the.currentStepIndex + 1;
    } else {
      return the.totalStepsNumber;
    }
  };

  var _getPreviousStepIndex = function () {
    if (the.currentStepIndex - 1 > 1) {
      return the.currentStepIndex - 1;
    } else {
      return 1;
    }
  };

  var _getFirstStepIndex = function () {
    return 1;
  };

  var _getLastStepIndex = function () {
    return the.totalStepsNumber;
  };

  var _getTotalStepsNumber = function () {
    return the.totalStepsNumber;
  };

  var _getStepDirection = function (index) {
    if (index > the.currentStepIndex) {
      return "next";
    } else {
      return "previous";
    }
  };

  var _getStepContent = function (index) {
    var content = KTUtil.findAll(the.element, '[data-kt-stepper-element="content"]');

    if (content[index - 1]) {
      return content[index - 1];
    } else {
      return false;
    }
  };

  var _destroy = function () {
    // Event Handlers
    KTUtil.removeEvent(the.btnNext, "click", the.nextListener);

    KTUtil.removeEvent(the.btnPrevious, "click", the.previousListener);

    KTUtil.off(the.element, "click", the.stepListenerId);

    KTUtil.data(the.element).remove("stepper");
  };

  // Construct Class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.getElement = function (index) {
    return the.element;
  };

  the.goTo = function (index) {
    return _goTo(index);
  };

  the.goPrevious = function () {
    return _goPrevious();
  };

  the.goNext = function () {
    return _goNext();
  };

  the.goFirst = function () {
    return _goFirst();
  };

  the.goLast = function () {
    return _goLast();
  };

  the.getCurrentStepIndex = function () {
    return the.currentStepIndex;
  };

  the.getNextStepIndex = function () {
    return _getNextStepIndex();
  };

  the.getPassedStepIndex = function () {
    return the.passedStepIndex;
  };

  the.getClickedStepIndex = function () {
    return the.clickedStepIndex;
  };

  the.getPreviousStepIndex = function () {
    return _getPreviousStepIndex();
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTStepper.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("stepper")) {
    return KTUtil.data(element).get("stepper");
  } else {
    return null;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTStepper;
}

("use strict");

var KTStickyHandlersInitialized = false;

// Class definition
var KTSticky = function (element, options) {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default Options
  var defaultOptions = {
    offset: 200,
    reverse: false,
    release: null,
    animation: true,
    animationSpeed: "0.3s",
    animationClass: "animation-slide-in-down",
  };
  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("sticky") === true) {
      the = KTUtil.data(element).get("sticky");
    } else {
      _init();
    }
  };

  var _init = function () {
    the.element = element;
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("sticky");
    the.name = the.element.getAttribute("data-kt-sticky-name");
    the.attributeName = "data-kt-sticky-" + the.name;
    the.attributeName2 = "data-kt-" + the.name;
    the.eventTriggerState = true;
    the.lastScrollTop = 0;
    the.scrollHandler;

    // Set initialized
    the.element.setAttribute("data-kt-sticky", "true");

    // Event Handlers
    window.addEventListener("scroll", _scroll);

    // Initial Launch
    _scroll();

    // Bind Instance
    KTUtil.data(the.element).set("sticky", the);
  };

  var _scroll = function (e) {
    var offset = _getOption("offset");
    var release = _getOption("release");
    var reverse = _getOption("reverse");
    var st;
    var attrName;
    var diff;

    // Exit if false
    if (offset === false) {
      return;
    }

    offset = parseInt(offset);
    release = release ? document.querySelector(release) : null;

    st = KTUtil.getScrollTop();
    diff = document.documentElement.scrollHeight - window.innerHeight - KTUtil.getScrollTop();

    var proceed = !release || release.offsetTop - release.clientHeight > st;

    if (reverse === true) {
      // Release on reverse scroll mode
      if (st > offset && proceed) {
        if (document.body.hasAttribute(the.attributeName) === false) {
          if (_enable() === false) {
            return;
          }

          document.body.setAttribute(the.attributeName, "on");
          document.body.setAttribute(the.attributeName2, "on");
          the.element.setAttribute("data-kt-sticky-enabled", "true");
        }

        if (the.eventTriggerState === true) {
          KTEventHandler.trigger(the.element, "kt.sticky.on", the);
          KTEventHandler.trigger(the.element, "kt.sticky.change", the);

          the.eventTriggerState = false;
        }
      } else {
        // Back scroll mode
        if (document.body.hasAttribute(the.attributeName) === true) {
          _disable();
          document.body.removeAttribute(the.attributeName);
          document.body.removeAttribute(the.attributeName2);
          the.element.removeAttribute("data-kt-sticky-enabled");
        }

        if (the.eventTriggerState === false) {
          KTEventHandler.trigger(the.element, "kt.sticky.off", the);
          KTEventHandler.trigger(the.element, "kt.sticky.change", the);
          the.eventTriggerState = true;
        }
      }

      the.lastScrollTop = st;
    } else {
      // Classic scroll mode
      if (st > offset && proceed) {
        if (document.body.hasAttribute(the.attributeName) === false) {
          if (_enable() === false) {
            return;
          }

          document.body.setAttribute(the.attributeName, "on");
          document.body.setAttribute(the.attributeName2, "on");
          the.element.setAttribute("data-kt-sticky-enabled", "true");
        }

        if (the.eventTriggerState === true) {
          KTEventHandler.trigger(the.element, "kt.sticky.on", the);
          KTEventHandler.trigger(the.element, "kt.sticky.change", the);
          the.eventTriggerState = false;
        }
      } else {
        // back scroll mode
        if (document.body.hasAttribute(the.attributeName) === true) {
          _disable();
          document.body.removeAttribute(the.attributeName);
          document.body.removeAttribute(the.attributeName2);
          the.element.removeAttribute("data-kt-sticky-enabled");
        }

        if (the.eventTriggerState === false) {
          KTEventHandler.trigger(the.element, "kt.sticky.off", the);
          KTEventHandler.trigger(the.element, "kt.sticky.change", the);
          the.eventTriggerState = true;
        }
      }
    }

    if (release) {
      if (release.offsetTop - release.clientHeight > st) {
        the.element.setAttribute("data-kt-sticky-released", "true");
      } else {
        the.element.removeAttribute("data-kt-sticky-released");
      }
    }
  };

  var _enable = function (update) {
    var top = _getOption("top");
    top = top ? parseInt(top) : 0;

    var left = _getOption("left");
    var right = _getOption("right");
    var width = _getOption("width");
    var zindex = _getOption("zindex");
    var dependencies = _getOption("dependencies");
    var classes = _getOption("class");

    var height = _calculateHeight();
    var heightOffset = _getOption("height-offset");
    heightOffset = heightOffset ? parseInt(heightOffset) : 0;

    if (height + heightOffset + top > KTUtil.getViewPort().height) {
      return false;
    }

    if (update !== true && _getOption("animation") === true) {
      KTUtil.css(the.element, "animationDuration", _getOption("animationSpeed"));
      KTUtil.animateClass(the.element, "animation " + _getOption("animationClass"));
    }

    if (classes !== null) {
      KTUtil.addClass(the.element, classes);
    }

    if (zindex !== null) {
      KTUtil.css(the.element, "z-index", zindex);
      KTUtil.css(the.element, "position", "fixed");
    }

    if (top >= 0) {
      KTUtil.css(the.element, "top", String(top) + "px");
    }

    if (width !== null) {
      if (width["target"]) {
        var targetElement = document.querySelector(width["target"]);
        if (targetElement) {
          width = KTUtil.css(targetElement, "width");
        }
      }

      KTUtil.css(the.element, "width", width);
    }

    if (left !== null) {
      if (String(left).toLowerCase() === "auto") {
        var offsetLeft = KTUtil.offset(the.element).left;

        if (offsetLeft >= 0) {
          KTUtil.css(the.element, "left", String(offsetLeft) + "px");
        }
      } else {
        KTUtil.css(the.element, "left", left);
      }
    }

    if (right !== null) {
      KTUtil.css(the.element, "right", right);
    }

    // Height dependencies
    if (dependencies !== null) {
      var dependencyElements = document.querySelectorAll(dependencies);

      if (dependencyElements && dependencyElements.length > 0) {
        for (var i = 0, len = dependencyElements.length; i < len; i++) {
          KTUtil.css(dependencyElements[i], "padding-top", String(height) + "px");
        }
      }
    }
  };

  var _disable = function () {
    KTUtil.css(the.element, "top", "");
    KTUtil.css(the.element, "width", "");
    KTUtil.css(the.element, "left", "");
    KTUtil.css(the.element, "right", "");
    KTUtil.css(the.element, "z-index", "");
    KTUtil.css(the.element, "position", "");

    var dependencies = _getOption("dependencies");
    var classes = _getOption("class");

    if (classes !== null) {
      KTUtil.removeClass(the.element, classes);
    }

    // Height dependencies
    if (dependencies !== null) {
      var dependencyElements = document.querySelectorAll(dependencies);

      if (dependencyElements && dependencyElements.length > 0) {
        for (var i = 0, len = dependencyElements.length; i < len; i++) {
          KTUtil.css(dependencyElements[i], "padding-top", "");
        }
      }
    }
  };

  var _check = function () {};

  var _calculateHeight = function () {
    var height = parseFloat(KTUtil.css(the.element, "height"));

    height = height + parseFloat(KTUtil.css(the.element, "margin-top"));
    height = height + parseFloat(KTUtil.css(the.element, "margin-bottom"));

    if (KTUtil.css(element, "border-top")) {
      height = height + parseFloat(KTUtil.css(the.element, "border-top"));
    }

    if (KTUtil.css(element, "border-bottom")) {
      height = height + parseFloat(KTUtil.css(the.element, "border-bottom"));
    }

    return height;
  };

  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-sticky-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-sticky-" + name);
      var value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }

      return value;
    } else {
      var optionName = KTUtil.snakeToCamel(name);

      if (the.options[optionName]) {
        return KTUtil.getResponsiveValue(the.options[optionName]);
      } else {
        return null;
      }
    }
  };

  var _destroy = function () {
    window.removeEventListener("scroll", _scroll);
    KTUtil.data(the.element).remove("sticky");
  };

  // Construct Class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Methods
  the.update = function () {
    if (document.body.hasAttribute(the.attributeName) === true) {
      _disable();
      document.body.removeAttribute(the.attributeName);
      document.body.removeAttribute(the.attributeName2);
      _enable(true);
      document.body.setAttribute(the.attributeName, "on");
      document.body.setAttribute(the.attributeName2, "on");
    }
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTSticky.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("sticky")) {
    return KTUtil.data(element).get("sticky");
  } else {
    return null;
  }
};

// Create instances
KTSticky.createInstances = function (selector = '[data-kt-sticky="true"]') {
  // Initialize Menus
  var elements = document.body.querySelectorAll(selector);
  var sticky;

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      sticky = new KTSticky(elements[i]);
    }
  }
};

// Window resize handler
KTSticky.handleResize = function () {
  window.addEventListener("resize", function () {
    var timer;

    KTUtil.throttle(
      timer,
      function () {
        // Locate and update Offcanvas instances on window resize
        var elements = document.body.querySelectorAll('[data-kt-sticky="true"]');

        if (elements && elements.length > 0) {
          for (var i = 0, len = elements.length; i < len; i++) {
            var sticky = KTSticky.getInstance(elements[i]);
            if (sticky) {
              sticky.update();
            }
          }
        }
      },
      200
    );
  });
};

// Global initialization
KTSticky.init = function () {
  KTSticky.createInstances();

  if (KTStickyHandlersInitialized === false) {
    KTSticky.handleResize();
    KTStickyHandlersInitialized = true;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTSticky;
}

("use strict");

var KTSwapperHandlersInitialized = false;

// Class definition
var KTSwapper = function (element, options) {
  ////////////////////////////
  // ** Private Variables  ** //
  ////////////////////////////
  var the = this;

  if (typeof element === "undefined" || element === null) {
    return;
  }

  // Default Options
  var defaultOptions = {
    mode: "append",
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("swapper") === true) {
      the = KTUtil.data(element).get("swapper");
    } else {
      _init();
    }
  };

  var _init = function () {
    the.element = element;
    the.options = KTUtil.deepExtend({}, defaultOptions, options);

    // Set initialized
    the.element.setAttribute("data-kt-swapper", "true");

    // Initial update
    _update();

    // Bind Instance
    KTUtil.data(the.element).set("swapper", the);
  };

  var _update = function (e) {
    var parentSelector = _getOption("parent");

    var mode = _getOption("mode");
    var parentElement = parentSelector ? document.querySelector(parentSelector) : null;

    if (parentElement && element.parentNode !== parentElement) {
      if (mode === "prepend") {
        parentElement.prepend(element);
      } else if (mode === "append") {
        parentElement.append(element);
      }
    }
  };

  var _getOption = function (name) {
    if (the.element.hasAttribute("data-kt-swapper-" + name) === true) {
      var attr = the.element.getAttribute("data-kt-swapper-" + name);
      var value = KTUtil.getResponsiveValue(attr);

      if (value !== null && String(value) === "true") {
        value = true;
      } else if (value !== null && String(value) === "false") {
        value = false;
      }

      return value;
    } else {
      var optionName = KTUtil.snakeToCamel(name);

      if (the.options[optionName]) {
        return KTUtil.getResponsiveValue(the.options[optionName]);
      } else {
        return null;
      }
    }
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("swapper");
  };

  // Construct Class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Methods
  the.update = function () {
    _update();
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTSwapper.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("swapper")) {
    return KTUtil.data(element).get("swapper");
  } else {
    return null;
  }
};

// Create instances
KTSwapper.createInstances = function (selector = '[data-kt-swapper="true"]') {
  // Initialize Menus
  var elements = document.querySelectorAll(selector);
  var swapper;

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      swapper = new KTSwapper(elements[i]);
    }
  }
};

// Window resize handler
KTSwapper.handleResize = function () {
  window.addEventListener("resize", function () {
    var timer;

    KTUtil.throttle(
      timer,
      function () {
        // Locate and update Offcanvas instances on window resize
        var elements = document.querySelectorAll('[data-kt-swapper="true"]');

        if (elements && elements.length > 0) {
          for (var i = 0, len = elements.length; i < len; i++) {
            var swapper = KTSwapper.getInstance(elements[i]);
            if (swapper) {
              swapper.update();
            }
          }
        }
      },
      200
    );
  });
};

// Global initialization
KTSwapper.init = function () {
  KTSwapper.createInstances();

  if (KTSwapperHandlersInitialized === false) {
    KTSwapper.handleResize();
    KTSwapperHandlersInitialized = true;
  }
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTSwapper;
}

("use strict");

// Class definition
var KTToggle = function (element, options) {
  ////////////////////////////
  // ** Private variables  ** //
  ////////////////////////////
  var the = this;

  if (!element) {
    return;
  }

  // Default Options
  var defaultOptions = {
    saveState: true,
  };

  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function () {
    if (KTUtil.data(element).has("toggle") === true) {
      the = KTUtil.data(element).get("toggle");
    } else {
      _init();
    }
  };

  var _init = function () {
    // Variables
    the.options = KTUtil.deepExtend({}, defaultOptions, options);
    the.uid = KTUtil.getUniqueId("toggle");

    // Elements
    the.element = element;

    the.target = document.querySelector(the.element.getAttribute("data-kt-toggle-target")) ? document.querySelector(the.element.getAttribute("data-kt-toggle-target")) : the.element;
    the.state = the.element.hasAttribute("data-kt-toggle-state") ? the.element.getAttribute("data-kt-toggle-state") : "";
    the.mode = the.element.hasAttribute("data-kt-toggle-mode") ? the.element.getAttribute("data-kt-toggle-mode") : "";
    the.attribute = "data-kt-" + the.element.getAttribute("data-kt-toggle-name");

    // Event Handlers
    _handlers();

    // Bind Instance
    KTUtil.data(the.element).set("toggle", the);
  };

  var _handlers = function () {
    KTUtil.addEvent(the.element, "click", function (e) {
      e.preventDefault();

      if (the.mode !== "") {
        if (the.mode === "off" && _isEnabled() === false) {
          _toggle();
        } else if (the.mode === "on" && _isEnabled() === true) {
          _toggle();
        }
      } else {
        _toggle();
      }
    });
  };

  // Event handlers
  var _toggle = function () {
    // Trigger "after.toggle" event
    KTEventHandler.trigger(the.element, "kt.toggle.change", the);

    if (_isEnabled()) {
      _disable();
    } else {
      _enable();
    }

    // Trigger "before.toggle" event
    KTEventHandler.trigger(the.element, "kt.toggle.changed", the);

    return the;
  };

  var _enable = function () {
    if (_isEnabled() === true) {
      return;
    }

    KTEventHandler.trigger(the.element, "kt.toggle.enable", the);

    the.target.setAttribute(the.attribute, "on");

    if (the.state.length > 0) {
      the.element.classList.add(the.state);
    }

    if (typeof KTCookie !== "undefined" && the.options.saveState === true) {
      KTCookie.set(the.attribute, "on");
    }

    KTEventHandler.trigger(the.element, "kt.toggle.enabled", the);

    return the;
  };

  var _disable = function () {
    if (_isEnabled() === false) {
      return;
    }

    KTEventHandler.trigger(the.element, "kt.toggle.disable", the);

    the.target.removeAttribute(the.attribute);

    if (the.state.length > 0) {
      the.element.classList.remove(the.state);
    }

    if (typeof KTCookie !== "undefined" && the.options.saveState === true) {
      KTCookie.remove(the.attribute);
    }

    KTEventHandler.trigger(the.element, "kt.toggle.disabled", the);

    return the;
  };

  var _isEnabled = function () {
    return String(the.target.getAttribute(the.attribute)).toLowerCase() === "on";
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove("toggle");
  };

  // Construct class
  _construct();

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  // Plugin API
  the.toggle = function () {
    return _toggle();
  };

  the.enable = function () {
    return _enable();
  };

  the.disable = function () {
    return _disable();
  };

  the.isEnabled = function () {
    return _isEnabled();
  };

  the.goElement = function () {
    return the.element;
  };

  the.destroy = function () {
    return _destroy();
  };

  // Event API
  the.on = function (name, handler) {
    return KTEventHandler.on(the.element, name, handler);
  };

  the.one = function (name, handler) {
    return KTEventHandler.one(the.element, name, handler);
  };

  the.off = function (name, handlerId) {
    return KTEventHandler.off(the.element, name, handlerId);
  };

  the.trigger = function (name, event) {
    return KTEventHandler.trigger(the.element, name, event, the, event);
  };
};

// Static methods
KTToggle.getInstance = function (element) {
  if (element !== null && KTUtil.data(element).has("toggle")) {
    return KTUtil.data(element).get("toggle");
  } else {
    return null;
  }
};

// Create instances
KTToggle.createInstances = function (selector = "[data-kt-toggle]") {
  // Get instances
  var elements = document.body.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      // Initialize instances
      new KTToggle(elements[i]);
    }
  }
};

// Global initialization
KTToggle.init = function () {
  KTToggle.createInstances();
};

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTToggle;
}
("use strict");

/**
 * @class KTUtil  base utilize class that privides helper functions
 */

// Polyfills

// Element.matches() polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i = matches.length;
    while (--i >= 0 && matches.item(i) !== this) {}
    return i > -1;
  };
}

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}

/**
 * ChildNode.remove() polyfill
 * https://gomakethings.com/removing-an-element-from-the-dom-the-es6-way/
 * @author Chris Ferdinandi
 * @license MIT
 */
(function (elem) {
  for (var i = 0; i < elem.length; i++) {
    if (!window[elem[i]] || "remove" in window[elem[i]].prototype) continue;
    window[elem[i]].prototype.remove = function () {
      this.parentNode.removeChild(this);
    };
  }
})(["Element", "CharacterData", "DocumentType"]);

//
// requestAnimationFrame polyfill by Erik Möller.
//  With fixes from Paul Irish and Tino Zijdel
//
//  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//
//  MIT license
//
(function () {
  var lastTime = 0;
  var vendors = ["webkit", "moz"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("prepend")) {
      return;
    }
    Object.defineProperty(item, "prepend", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// getAttributeNames
if (Element.prototype.getAttributeNames == undefined) {
  Element.prototype.getAttributeNames = function () {
    var attributes = this.attributes;
    var length = attributes.length;
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
      result[i] = attributes[i].name;
    }
    return result;
  };
}

// Global variables
window.KTUtilElementDataStore = {};
window.KTUtilElementDataStoreID = 0;
window.KTUtilDelegatedEventHandlers = {};

var KTUtil = (function () {
  var resizeHandlers = [];

  /**
   * Handle window resize event with some
   * delay to attach event handlers upon resize complete
   */
  var _windowResizeHandler = function () {
    var _runResizeHandlers = function () {
      // reinitialize other subscribed elements
      for (var i = 0; i < resizeHandlers.length; i++) {
        var each = resizeHandlers[i];
        each.call();
      }
    };

    var timer;

    window.addEventListener("resize", function () {
      KTUtil.throttle(
        timer,
        function () {
          _runResizeHandlers();
        },
        200
      );
    });
  };

  return {
    /**
     * Class main initializer.
     * @param {object} settings.
     * @returns null
     */
    //main function to initiate the theme
    init: function (settings) {
      _windowResizeHandler();
    },

    /**
     * Adds window resize event handler.
     * @param {function} callback function.
     */
    addResizeHandler: function (callback) {
      resizeHandlers.push(callback);
    },

    /**
     * Removes window resize event handler.
     * @param {function} callback function.
     */
    removeResizeHandler: function (callback) {
      for (var i = 0; i < resizeHandlers.length; i++) {
        if (callback === resizeHandlers[i]) {
          delete resizeHandlers[i];
        }
      }
    },

    /**
     * Trigger window resize handlers.
     */
    runResizeHandlers: function () {
      _runResizeHandlers();
    },

    resize: function () {
      if (typeof Event === "function") {
        // modern browsers
        window.dispatchEvent(new Event("resize"));
      } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent("UIEvents");
        evt.initUIEvent("resize", true, false, window, 0);
        window.dispatchEvent(evt);
      }
    },

    /**
     * Get GET parameter value from URL.
     * @param {string} paramName Parameter name.
     * @returns {string}
     */
    getURLParam: function (paramName) {
      var searchString = window.location.search.substring(1),
        i,
        val,
        params = searchString.split("&");

      for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
          return unescape(val[1]);
        }
      }

      return null;
    },

    /**
     * Checks whether current device is mobile touch.
     * @returns {boolean}
     */
    isMobileDevice: function () {
      var test = this.getViewPort().width < this.getBreakpoint("lg") ? true : false;

      if (test === false) {
        // For use within normal web clients
        test = navigator.userAgent.match(/iPad/i) != null;
      }

      return test;
    },

    /**
     * Checks whether current device is desktop.
     * @returns {boolean}
     */
    isDesktopDevice: function () {
      return KTUtil.isMobileDevice() ? false : true;
    },

    /**
     * Gets browser window viewport size. Ref:
     * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
     * @returns {object}
     */
    getViewPort: function () {
      var e = window,
        a = "inner";
      if (!("innerWidth" in window)) {
        a = "client";
        e = document.documentElement || document.body;
      }

      return {
        width: e[a + "Width"],
        height: e[a + "Height"],
      };
    },

    /**
     * Checks whether given device mode is currently activated.
     * @param {string} mode Responsive mode name(e.g: desktop,
     *     desktop-and-tablet, tablet, tablet-and-mobile, mobile)
     * @returns {boolean}
     */
    isBreakpointUp: function (mode) {
      var width = this.getViewPort().width;
      var breakpoint = this.getBreakpoint(mode);

      return width >= breakpoint;
    },

    isBreakpointDown: function (mode) {
      var width = this.getViewPort().width;
      var breakpoint = this.getBreakpoint(mode);

      return width < breakpoint;
    },

    getViewportWidth: function () {
      return this.getViewPort().width;
    },

    /**
     * Generates unique ID for give prefix.
     * @param {string} prefix Prefix for generated ID
     * @returns {boolean}
     */
    getUniqueId: function (prefix) {
      return prefix + Math.floor(Math.random() * new Date().getTime());
    },

    /**
     * Gets window width for give breakpoint mode.
     * @param {string} mode Responsive mode name(e.g: xl, lg, md, sm)
     * @returns {number}
     */
    getBreakpoint: function (breakpoint) {
      var value = this.getCssVariableValue("--bs-" + breakpoint);

      if (value) {
        value = parseInt(value.trim());
      }

      return value;
    },

    /**
     * Checks whether object has property matchs given key path.
     * @param {object} obj Object contains values paired with given key path
     * @param {string} keys Keys path seperated with dots
     * @returns {object}
     */
    isset: function (obj, keys) {
      var stone;

      keys = keys || "";

      if (keys.indexOf("[") !== -1) {
        throw new Error("Unsupported object path notation.");
      }

      keys = keys.split(".");

      do {
        if (obj === undefined) {
          return false;
        }

        stone = keys.shift();

        if (!obj.hasOwnProperty(stone)) {
          return false;
        }

        obj = obj[stone];
      } while (keys.length);

      return true;
    },

    /**
     * Gets highest z-index of the given element parents
     * @param {object} el jQuery element object
     * @returns {number}
     */
    getHighestZindex: function (el) {
      var position, value;

      while (el && el !== document) {
        // Ignore z-index if position is set to a value where z-index is ignored by the browser
        // This makes behavior of this function consistent across browsers
        // WebKit always returns auto if the element is positioned
        position = KTUtil.css(el, "position");

        if (position === "absolute" || position === "relative" || position === "fixed") {
          // IE returns 0 when zIndex is not specified
          // other browsers return a string
          // we ignore the case of nested elements with an explicit value of 0
          // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt(KTUtil.css(el, "z-index"));

          if (!isNaN(value) && value !== 0) {
            return value;
          }
        }

        el = el.parentNode;
      }

      return 1;
    },

    /**
     * Checks whether the element has any parent with fixed positionfreg
     * @param {object} el jQuery element object
     * @returns {boolean}
     */
    hasFixedPositionedParent: function (el) {
      var position;

      while (el && el !== document) {
        position = KTUtil.css(el, "position");

        if (position === "fixed") {
          return true;
        }

        el = el.parentNode;
      }

      return false;
    },

    /**
     * Simulates delay
     */
    sleep: function (milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
          break;
        }
      }
    },

    /**
     * Gets randomly generated integer value within given min and max range
     * @param {number} min Range start value
     * @param {number} max Range end value
     * @returns {number}
     */
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Checks whether Angular library is included
     * @returns {boolean}
     */
    isAngularVersion: function () {
      return window.Zone !== undefined ? true : false;
    },

    // Deep extend:  $.extend(true, {}, objA, objB);
    deepExtend: function (out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;

        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue;
          }

          // based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
          if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
            out[key] = KTUtil.deepExtend(out[key], obj[key]);
            continue;
          }

          out[key] = obj[key];
        }
      }

      return out;
    },

    // extend:  $.extend({}, objA, objB);
    extend: function (out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) continue;

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
        }
      }

      return out;
    },

    getBody: function () {
      return document.getElementsByTagName("body")[0];
    },

    /**
     * Checks whether the element has given classes
     * @param {object} el jQuery element object
     * @param {string} Classes string
     * @returns {boolean}
     */
    hasClasses: function (el, classes) {
      if (!el) {
        return;
      }

      var classesArr = classes.split(" ");

      for (var i = 0; i < classesArr.length; i++) {
        if (KTUtil.hasClass(el, KTUtil.trim(classesArr[i])) == false) {
          return false;
        }
      }

      return true;
    },

    hasClass: function (el, className) {
      if (!el) {
        return;
      }

      return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    },

    addClass: function (el, className) {
      if (!el || typeof className === "undefined") {
        return;
      }

      var classNames = className.split(" ");

      if (el.classList) {
        for (var i = 0; i < classNames.length; i++) {
          if (classNames[i] && classNames[i].length > 0) {
            el.classList.add(KTUtil.trim(classNames[i]));
          }
        }
      } else if (!KTUtil.hasClass(el, className)) {
        for (var x = 0; x < classNames.length; x++) {
          el.className += " " + KTUtil.trim(classNames[x]);
        }
      }
    },

    removeClass: function (el, className) {
      if (!el || typeof className === "undefined") {
        return;
      }

      var classNames = className.split(" ");

      if (el.classList) {
        for (var i = 0; i < classNames.length; i++) {
          el.classList.remove(KTUtil.trim(classNames[i]));
        }
      } else if (KTUtil.hasClass(el, className)) {
        for (var x = 0; x < classNames.length; x++) {
          el.className = el.className.replace(new RegExp("\\b" + KTUtil.trim(classNames[x]) + "\\b", "g"), "");
        }
      }
    },

    triggerCustomEvent: function (el, eventName, data) {
      var event;
      if (window.CustomEvent) {
        event = new CustomEvent(eventName, {
          detail: data,
        });
      } else {
        event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, data);
      }

      el.dispatchEvent(event);
    },

    triggerEvent: function (node, eventName) {
      // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
      var doc;

      if (node.ownerDocument) {
        doc = node.ownerDocument;
      } else if (node.nodeType == 9) {
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
      } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
      }

      if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.
        switch (eventName) {
          case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
          case "mouseenter":
          case "mouseleave":
          case "mousedown":
          case "mouseup":
            eventClass = "MouseEvents";
            break;

          case "focus":
          case "change":
          case "blur":
          case "select":
            eventClass = "HTMLEvents";
            break;

          default:
            throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
            break;
        }
        var event = doc.createEvent(eventClass);

        var bubbles = eventName == "change" ? false : true;
        event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(event, true);
      } else if (node.fireEvent) {
        // IE-old school style
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, event);
      }
    },

    index: function (el) {
      var c = el.parentNode.children,
        i = 0;
      for (; i < c.length; i++) if (c[i] == el) return i;
    },

    trim: function (string) {
      return string.trim();
    },

    eventTriggered: function (e) {
      if (e.currentTarget.dataset.triggered) {
        return true;
      } else {
        e.currentTarget.dataset.triggered = true;

        return false;
      }
    },

    remove: function (el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    },

    find: function (parent, query) {
      if (parent !== null) {
        return parent.querySelector(query);
      } else {
        return null;
      }
    },

    findAll: function (parent, query) {
      if (parent !== null) {
        return parent.querySelectorAll(query);
      } else {
        return null;
      }
    },

    insertAfter: function (el, referenceNode) {
      return referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    },

    parents: function (elem, selector) {
      // Set up a parent array
      var parents = [];

      // Push each parent element to the array
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (selector) {
          if (elem.matches(selector)) {
            parents.push(elem);
          }
          continue;
        }
        parents.push(elem);
      }

      // Return our parent array
      return parents;
    },

    children: function (el, selector, log) {
      if (!el || !el.childNodes) {
        return null;
      }

      var result = [],
        i = 0,
        l = el.childNodes.length;

      for (var i; i < l; ++i) {
        if (el.childNodes[i].nodeType == 1 && KTUtil.matches(el.childNodes[i], selector, log)) {
          result.push(el.childNodes[i]);
        }
      }

      return result;
    },

    child: function (el, selector, log) {
      var children = KTUtil.children(el, selector, log);

      return children ? children[0] : null;
    },

    matches: function (el, selector, log) {
      var p = Element.prototype;
      var f =
        p.matches ||
        p.webkitMatchesSelector ||
        p.mozMatchesSelector ||
        p.msMatchesSelector ||
        function (s) {
          return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };

      if (el && el.tagName) {
        return f.call(el, selector);
      } else {
        return false;
      }
    },

    data: function (el) {
      return {
        set: function (name, data) {
          if (!el) {
            return;
          }

          if (el.customDataTag === undefined) {
            window.KTUtilElementDataStoreID++;
            el.customDataTag = window.KTUtilElementDataStoreID;
          }

          if (window.KTUtilElementDataStore[el.customDataTag] === undefined) {
            window.KTUtilElementDataStore[el.customDataTag] = {};
          }

          window.KTUtilElementDataStore[el.customDataTag][name] = data;
        },

        get: function (name) {
          if (!el) {
            return;
          }

          if (el.customDataTag === undefined) {
            return null;
          }

          return this.has(name) ? window.KTUtilElementDataStore[el.customDataTag][name] : null;
        },

        has: function (name) {
          if (!el) {
            return false;
          }

          if (el.customDataTag === undefined) {
            return false;
          }

          return window.KTUtilElementDataStore[el.customDataTag] && window.KTUtilElementDataStore[el.customDataTag][name] ? true : false;
        },

        remove: function (name) {
          if (el && this.has(name)) {
            delete window.KTUtilElementDataStore[el.customDataTag][name];
          }
        },
      };
    },

    outerWidth: function (el, margin) {
      var width;

      if (margin === true) {
        width = parseFloat(el.offsetWidth);
        width += parseFloat(KTUtil.css(el, "margin-left")) + parseFloat(KTUtil.css(el, "margin-right"));

        return parseFloat(width);
      } else {
        width = parseFloat(el.offsetWidth);

        return width;
      }
    },

    offset: function (el) {
      var rect, win;

      if (!el) {
        return;
      }

      // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error

      if (!el.getClientRects().length) {
        return { top: 0, left: 0 };
      }

      // Get document-relative position by adding viewport scroll to viewport-relative gBCR
      rect = el.getBoundingClientRect();
      win = el.ownerDocument.defaultView;

      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset,
        right: window.innerWidth - (el.offsetLeft + el.offsetWidth),
      };
    },

    height: function (el) {
      return KTUtil.css(el, "height");
    },

    outerHeight: function (el, withMargin) {
      var height = el.offsetHeight;
      var style;

      if (typeof withMargin !== "undefined" && withMargin === true) {
        style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);

        return height;
      } else {
        return height;
      }
    },

    visible: function (el) {
      return !(el.offsetWidth === 0 && el.offsetHeight === 0);
    },

    isVisibleInContainer: function (el, container, offset = 0) {
      const eleTop = el.offsetTop;
      const eleBottom = eleTop + el.clientHeight + offset;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      // The element is fully visible in the container
      return eleTop >= containerTop && eleBottom <= containerBottom;
    },

    getRelativeTopPosition: function (el, container) {
      return el.offsetTop - container.offsetTop;
    },

    attr: function (el, name, value) {
      if (el == undefined) {
        return;
      }

      if (value !== undefined) {
        el.setAttribute(name, value);
      } else {
        return el.getAttribute(name);
      }
    },

    hasAttr: function (el, name) {
      if (el == undefined) {
        return;
      }

      return el.getAttribute(name) ? true : false;
    },

    removeAttr: function (el, name) {
      if (el == undefined) {
        return;
      }

      el.removeAttribute(name);
    },

    animate: function (from, to, duration, update, easing, done) {
      /**
       * TinyAnimate.easings
       *  Adapted from jQuery Easing
       */
      var easings = {};
      var easing;

      easings.linear = function (t, b, c, d) {
        return (c * t) / d + b;
      };

      easing = easings.linear;

      // Early bail out if called incorrectly
      if (typeof from !== "number" || typeof to !== "number" || typeof duration !== "number" || typeof update !== "function") {
        return;
      }

      // Create mock done() function if necessary
      if (typeof done !== "function") {
        done = function () {};
      }

      // Pick implementation (requestAnimationFrame | setTimeout)
      var rAF =
        window.requestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 50);
        };

      // Animation loop
      var canceled = false;
      var change = to - from;

      function loop(timestamp) {
        var time = (timestamp || +new Date()) - start;

        if (time >= 0) {
          update(easing(time, from, change, duration));
        }
        if (time >= 0 && time >= duration) {
          update(to);
          done();
        } else {
          rAF(loop);
        }
      }

      update(from);

      // Start animation loop
      var start = window.performance && window.performance.now ? window.performance.now() : +new Date();

      rAF(loop);
    },

    actualCss: function (el, prop, cache) {
      var css = "";

      if (el instanceof HTMLElement === false) {
        return;
      }

      if (!el.getAttribute("kt-hidden-" + prop) || cache === false) {
        var value;

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        css = el.style.cssText;
        el.style.cssText = "position: absolute; visibility: hidden; display: block;";

        if (prop == "width") {
          value = el.offsetWidth;
        } else if (prop == "height") {
          value = el.offsetHeight;
        }

        el.style.cssText = css;

        // store it in cache
        el.setAttribute("kt-hidden-" + prop, value);

        return parseFloat(value);
      } else {
        // store it in cache
        return parseFloat(el.getAttribute("kt-hidden-" + prop));
      }
    },

    actualHeight: function (el, cache) {
      return KTUtil.actualCss(el, "height", cache);
    },

    actualWidth: function (el, cache) {
      return KTUtil.actualCss(el, "width", cache);
    },

    getScroll: function (element, method) {
      // The passed in `method` value should be 'Top' or 'Left'
      method = "scroll" + method;
      return element == window || element == document
        ? self[method == "scrollTop" ? "pageYOffset" : "pageXOffset"] || (browserSupportsBoxModel && document.documentElement[method]) || document.body[method]
        : element[method];
    },

    css: function (el, styleProp, value, important) {
      if (!el) {
        return;
      }

      if (value !== undefined) {
        if (important === true) {
          el.style.setProperty(styleProp, value, "important");
        } else {
          el.style[styleProp] = value;
        }
      } else {
        var defaultView = (el.ownerDocument || document).defaultView;

        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
          // sanitize property name to css notation
          // (hyphen separated words eg. font-Size)
          styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();

          return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) {
          // IE
          // sanitize property name to camelCase
          styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
          });

          value = el.currentStyle[styleProp];

          // convert other units to pixels on IE
          if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function (value) {
              var oldLeft = el.style.left,
                oldRsLeft = el.runtimeStyle.left;

              el.runtimeStyle.left = el.currentStyle.left;
              el.style.left = value || 0;
              value = el.style.pixelLeft + "px";
              el.style.left = oldLeft;
              el.runtimeStyle.left = oldRsLeft;

              return value;
            })(value);
          }

          return value;
        }
      }
    },

    slide: function (el, dir, speed, callback, recalcMaxHeight) {
      if (!el || (dir == "up" && KTUtil.visible(el) === false) || (dir == "down" && KTUtil.visible(el) === true)) {
        return;
      }

      speed = speed ? speed : 600;
      var calcHeight = KTUtil.actualHeight(el);
      var calcPaddingTop = false;
      var calcPaddingBottom = false;

      if (KTUtil.css(el, "padding-top") && KTUtil.data(el).has("slide-padding-top") !== true) {
        KTUtil.data(el).set("slide-padding-top", KTUtil.css(el, "padding-top"));
      }

      if (KTUtil.css(el, "padding-bottom") && KTUtil.data(el).has("slide-padding-bottom") !== true) {
        KTUtil.data(el).set("slide-padding-bottom", KTUtil.css(el, "padding-bottom"));
      }

      if (KTUtil.data(el).has("slide-padding-top")) {
        calcPaddingTop = parseInt(KTUtil.data(el).get("slide-padding-top"));
      }

      if (KTUtil.data(el).has("slide-padding-bottom")) {
        calcPaddingBottom = parseInt(KTUtil.data(el).get("slide-padding-bottom"));
      }

      if (dir == "up") {
        // up
        el.style.cssText = "display: block; overflow: hidden;";

        if (calcPaddingTop) {
          KTUtil.animate(
            0,
            calcPaddingTop,
            speed,
            function (value) {
              el.style.paddingTop = calcPaddingTop - value + "px";
            },
            "linear"
          );
        }

        if (calcPaddingBottom) {
          KTUtil.animate(
            0,
            calcPaddingBottom,
            speed,
            function (value) {
              el.style.paddingBottom = calcPaddingBottom - value + "px";
            },
            "linear"
          );
        }

        KTUtil.animate(
          0,
          calcHeight,
          speed,
          function (value) {
            el.style.height = calcHeight - value + "px";
          },
          "linear",
          function () {
            el.style.height = "";
            el.style.display = "none";

            if (typeof callback === "function") {
              callback();
            }
          }
        );
      } else if (dir == "down") {
        // down
        el.style.cssText = "display: block; overflow: hidden;";

        if (calcPaddingTop) {
          KTUtil.animate(
            0,
            calcPaddingTop,
            speed,
            function (value) {
              //
              el.style.paddingTop = value + "px";
            },
            "linear",
            function () {
              el.style.paddingTop = "";
            }
          );
        }

        if (calcPaddingBottom) {
          KTUtil.animate(
            0,
            calcPaddingBottom,
            speed,
            function (value) {
              el.style.paddingBottom = value + "px";
            },
            "linear",
            function () {
              el.style.paddingBottom = "";
            }
          );
        }

        KTUtil.animate(
          0,
          calcHeight,
          speed,
          function (value) {
            el.style.height = value + "px";
          },
          "linear",
          function () {
            el.style.height = "";
            el.style.display = "";
            el.style.overflow = "";

            if (typeof callback === "function") {
              callback();
            }
          }
        );
      }
    },

    slideUp: function (el, speed, callback) {
      KTUtil.slide(el, "up", speed, callback);
    },

    slideDown: function (el, speed, callback) {
      KTUtil.slide(el, "down", speed, callback);
    },

    show: function (el, display) {
      if (typeof el !== "undefined") {
        el.style.display = display ? display : "block";
      }
    },

    hide: function (el) {
      if (typeof el !== "undefined") {
        el.style.display = "none";
      }
    },

    addEvent: function (el, type, handler, one) {
      if (typeof el !== "undefined" && el !== null) {
        el.addEventListener(type, handler);
      }
    },

    removeEvent: function (el, type, handler) {
      if (el !== null) {
        el.removeEventListener(type, handler);
      }
    },

    on: function (element, selector, event, handler) {
      if (element === null) {
        return;
      }

      var eventId = KTUtil.getUniqueId("event");

      window.KTUtilDelegatedEventHandlers[eventId] = function (e) {
        var targets = element.querySelectorAll(selector);
        var target = e.target;

        while (target && target !== element) {
          for (var i = 0, j = targets.length; i < j; i++) {
            if (target === targets[i]) {
              handler.call(target, e);
            }
          }

          target = target.parentNode;
        }
      };

      KTUtil.addEvent(element, event, window.KTUtilDelegatedEventHandlers[eventId]);

      return eventId;
    },

    off: function (element, event, eventId) {
      if (!element || !window.KTUtilDelegatedEventHandlers[eventId]) {
        return;
      }

      KTUtil.removeEvent(element, event, window.KTUtilDelegatedEventHandlers[eventId]);

      delete window.KTUtilDelegatedEventHandlers[eventId];
    },

    one: function onetime(el, type, callback) {
      el.addEventListener(type, function callee(e) {
        // remove event
        if (e.target && e.target.removeEventListener) {
          e.target.removeEventListener(e.type, callee);
        }

        // need to verify from https://themeforest.net/author_dashboard#comment_23615588
        if (el && el.removeEventListener) {
          e.currentTarget.removeEventListener(e.type, callee);
        }

        // call handler
        return callback(e);
      });
    },

    hash: function (str) {
      var hash = 0,
        i,
        chr;

      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }

      return hash;
    },

    animateClass: function (el, animationName, callback) {
      var animation;
      var animations = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        WebkitAnimation: "webkitAnimationEnd",
        msAnimation: "msAnimationEnd",
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          animation = animations[t];
        }
      }

      KTUtil.addClass(el, animationName);

      KTUtil.one(el, animation, function () {
        KTUtil.removeClass(el, animationName);
      });

      if (callback) {
        KTUtil.one(el, animation, callback);
      }
    },

    transitionEnd: function (el, callback) {
      var transition;
      var transitions = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "mozTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "msTransitionEnd",
      };

      for (var t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
        }
      }

      KTUtil.one(el, transition, callback);
    },

    animationEnd: function (el, callback) {
      var animation;
      var animations = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        WebkitAnimation: "webkitAnimationEnd",
        msAnimation: "msAnimationEnd",
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          animation = animations[t];
        }
      }

      KTUtil.one(el, animation, callback);
    },

    animateDelay: function (el, value) {
      var vendors = ["webkit-", "moz-", "ms-", "o-", ""];
      for (var i = 0; i < vendors.length; i++) {
        KTUtil.css(el, vendors[i] + "animation-delay", value);
      }
    },

    animateDuration: function (el, value) {
      var vendors = ["webkit-", "moz-", "ms-", "o-", ""];
      for (var i = 0; i < vendors.length; i++) {
        KTUtil.css(el, vendors[i] + "animation-duration", value);
      }
    },

    scrollTo: function (target, offset, duration) {
      var duration = duration ? duration : 500;
      var targetPos = target ? KTUtil.offset(target).top : 0;
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var from, to;

      if (offset) {
        targetPos = targetPos - offset;
      }

      from = scrollPos;
      to = targetPos;

      KTUtil.animate(from, to, duration, function (value) {
        document.documentElement.scrollTop = value;
        document.body.parentNode.scrollTop = value;
        document.body.scrollTop = value;
      }); //, easing, done
    },

    scrollTop: function (offset, duration) {
      KTUtil.scrollTo(null, offset, duration);
    },

    isArray: function (obj) {
      return obj && Array.isArray(obj);
    },

    isEmpty: function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }

      return true;
    },

    numberString: function (nStr) {
      nStr += "";
      var x = nStr.split(".");
      var x1 = x[0];
      var x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    },

    isRTL: function () {
      return document.querySelector("html").getAttribute("direction") === "rtl";
    },

    snakeToCamel: function (s) {
      return s.replace(/(\-\w)/g, function (m) {
        return m[1].toUpperCase();
      });
    },

    filterBoolean: function (val) {
      // Convert string boolean
      if (val === true || val === "true") {
        return true;
      }

      if (val === false || val === "false") {
        return false;
      }

      return val;
    },

    setHTML: function (el, html) {
      el.innerHTML = html;
    },

    getHTML: function (el) {
      if (el) {
        return el.innerHTML;
      }
    },

    getDocumentHeight: function () {
      var body = document.body;
      var html = document.documentElement;

      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    },

    getScrollTop: function () {
      return (document.scrollingElement || document.documentElement).scrollTop;
    },

    colorLighten: function (color, amount) {
      const addLight = function (color, amount) {
        let cc = parseInt(color, 16) + amount;
        let c = cc > 255 ? 255 : cc;
        c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
        return c;
      };

      color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
      amount = parseInt((255 * amount) / 100);

      return (color = `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`);
    },

    colorDarken: function (color, amount) {
      const subtractLight = function (color, amount) {
        let cc = parseInt(color, 16) - amount;
        let c = cc < 0 ? 0 : cc;
        c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;

        return c;
      };

      color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
      amount = parseInt((255 * amount) / 100);

      return (color = `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(color.substring(2, 4), amount)}${subtractLight(color.substring(4, 6), amount)}`);
    },

    // Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
    throttle: function (timer, func, delay) {
      // If setTimeout is already scheduled, no need to do anything
      if (timer) {
        return;
      }

      // Schedule a setTimeout after delay seconds
      timer = setTimeout(function () {
        func();

        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        timer = undefined;
      }, delay);
    },

    // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
    debounce: function (timer, func, delay) {
      // Cancels the setTimeout method execution
      clearTimeout(timer);

      // Executes the func after delay time.
      timer = setTimeout(func, delay);
    },

    parseJson: function (value) {
      if (typeof value === "string") {
        value = value.replace(/'/g, '"');

        var jsonStr = value.replace(/(\w+:)|(\w+ :)/g, function (matched) {
          return '"' + matched.substring(0, matched.length - 1) + '":';
        });

        try {
          value = JSON.parse(jsonStr);
        } catch (e) {}
      }

      return value;
    },

    getResponsiveValue: function (value, defaultValue) {
      var width = this.getViewPort().width;
      var result = null;

      value = KTUtil.parseJson(value);

      if (typeof value === "object") {
        var resultKey;
        var resultBreakpoint = -1;
        var breakpoint;

        for (var key in value) {
          if (key === "default") {
            breakpoint = 0;
          } else {
            breakpoint = this.getBreakpoint(key) ? this.getBreakpoint(key) : parseInt(key);
          }

          if (breakpoint <= width && breakpoint > resultBreakpoint) {
            resultKey = key;
            resultBreakpoint = breakpoint;
          }
        }

        if (resultKey) {
          result = value[resultKey];
        } else {
          result = value;
        }
      } else {
        result = value;
      }

      return result;
    },

    each: function (array, callback) {
      return [].slice.call(array).map(callback);
    },

    getSelectorMatchValue: function (value) {
      var result = null;
      value = KTUtil.parseJson(value);

      if (typeof value === "object") {
        // Match condition
        if (value["match"] !== undefined) {
          var selector = Object.keys(value["match"])[0];
          value = Object.values(value["match"])[0];

          if (document.querySelector(selector) !== null) {
            result = value;
          }
        }
      } else {
        result = value;
      }

      return result;
    },

    getConditionalValue: function (value) {
      var value = KTUtil.parseJson(value);
      var result = KTUtil.getResponsiveValue(value);

      if (result !== null && result["match"] !== undefined) {
        result = KTUtil.getSelectorMatchValue(result);
      }

      if (result === null && value !== null && value["default"] !== undefined) {
        result = value["default"];
      }

      return result;
    },

    getCssVariableValue: function (variableName) {
      var hex = getComputedStyle(document.documentElement).getPropertyValue(variableName);
      if (hex && hex.length > 0) {
        hex = hex.trim();
      }

      return hex;
    },

    isInViewport: function (element) {
      var rect = element.getBoundingClientRect();

      return (
        rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    isPartiallyInViewport: function (element) {
      let x = element.getBoundingClientRect().left;
      let y = element.getBoundingClientRect().top;
      let ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      let hw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      let w = element.clientWidth;
      let h = element.clientHeight;

      return y < hw && y + h > 0 && x < ww && x + w > 0;
    },

    onDOMContentLoaded: function (callback) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback);
      } else {
        callback();
      }
    },

    inIframe: function () {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    },

    isHexColor(code) {
      return /^#[0-9A-F]{6}$/i.test(code);
    },
  };
})();

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTUtil;
}
("use strict");

// Class definition
var KTAppLayoutBuilder = (function () {
  var form;
  var actionInput;
  var url;
  var previewButton;
  var exportButton;
  var resetButton;

  var engage;
  var engageToggleOff;
  var engageToggleOn;
  var engagePrebuiltsModal;

  var handleEngagePrebuilts = function () {
    if (engagePrebuiltsModal === null) {
      return;
    }

    if (KTCookie.get("app_engage_prebuilts_modal_displayed") !== "1") {
      setTimeout(function () {
        const modal = new bootstrap.Modal(engagePrebuiltsModal);
        modal.show();

        const date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        KTCookie.set("app_engage_prebuilts_modal_displayed", "1", { expires: date });
      }, 3000);
    }
  };

  var handleEngagePrebuiltsViewMenu = function () {
    const selected = engagePrebuiltsModal.querySelector('[data-kt-element="selected"]');
    const selectedTitle = engagePrebuiltsModal.querySelector('[data-kt-element="title"]');
    const menu = engagePrebuiltsModal.querySelector('[data-kt-menu="true"]');

    // Toggle Handler
    KTUtil.on(engagePrebuiltsModal, "[data-kt-mode]", "click", function (e) {
      const title = this.innerText;
      const mode = this.getAttribute("data-kt-mode");
      const selectedLink = menu.querySelector(".menu-link.active");
      const viewImage = document.querySelector("#kt_app_engage_prebuilts_view_image");
      const viewText = document.querySelector("#kt_app_engage_prebuilts_view_text");
      selectedTitle.innerText = title;

      if (selectedLink) {
        selectedLink.classList.remove("active");
      }

      this.classList.add("active");

      if (mode === "image") {
        viewImage.classList.remove("d-none");
        viewImage.classList.add("d-block");
        viewText.classList.remove("d-block");
        viewText.classList.add("d-none");
      } else {
        viewText.classList.remove("d-none");
        viewText.classList.add("d-block");
        viewImage.classList.remove("d-block");
        viewImage.classList.add("d-none");
      }
    });
  };

  var handleEngageToggle = function () {
    engageToggleOff.addEventListener("click", function (e) {
      e.preventDefault();

      const date = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 days from now
      KTCookie.set("app_engage_hide", "1", { expires: date });
      engage.classList.add("app-engage-hide");
    });

    engageToggleOn.addEventListener("click", function (e) {
      e.preventDefault();

      KTCookie.remove("app_engage_hide");
      engage.classList.remove("app-engage-hide");
    });
  };

  var handlePreview = function () {
    previewButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Set form action value
      actionInput.value = "preview";

      // Show progress
      previewButton.setAttribute("data-kt-indicator", "on");

      // Prepare form data
      var data = $(form).serialize();

      // Submit
      $.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        data: data,
        success: function (response, status, xhr) {
          if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
          }
          location.reload();
          return;

          toastr.success("Preview has been updated with current configured layout.", "Preview updated!", { timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0 });

          setTimeout(function () {
            location.reload(); // reload page
          }, 1500);
        },
        error: function (response) {
          toastr.error("Please try it again later.", "Something went wrong!", { timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0 });
        },
        complete: function () {
          previewButton.removeAttribute("data-kt-indicator");
        },
      });
    });
  };

  var handleExport = function () {
    exportButton.addEventListener("click", function (e) {
      e.preventDefault();

      toastr.success("Process has been started and it may take a while.", "Generating HTML!", { timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0 });

      // Show progress
      exportButton.setAttribute("data-kt-indicator", "on");

      // Set form action value
      actionInput.value = "export";

      // Prepare form data
      var data = $(form).serialize();

      $.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        data: data,
        success: function (response, status, xhr) {
          var timer = setInterval(function () {
            $("<iframe/>")
              .attr({
                src: url + "?layout-builder[action]=export&download=1&output=" + response,
                style: "visibility:hidden;display:none",
              })
              .ready(function () {
                // Stop the timer
                clearInterval(timer);

                exportButton.removeAttribute("data-kt-indicator");
              })
              .appendTo("body");
          }, 3000);
        },
        error: function (response) {
          toastr.error("Please try it again later.", "Something went wrong!", { timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0 });

          exportButton.removeAttribute("data-kt-indicator");
        },
      });
    });
  };

  var handleReset = function () {
    resetButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Show progress
      resetButton.setAttribute("data-kt-indicator", "on");

      // Set form action value
      actionInput.value = "reset";

      // Prepare form data
      var data = $(form).serialize();

      $.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        data: data,
        success: function (response, status, xhr) {
          if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
          }

          location.reload();
          return;

          toastr.success("Preview has been successfully reset and the page will be reloaded.", "Reset Preview!", { timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0 });

          setTimeout(function () {
            location.reload(); // reload page
          }, 1500);
        },
        error: function (response) {
          toastr.error("Please try it again later.", "Something went wrong!", { timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0 });
        },
        complete: function () {
          resetButton.removeAttribute("data-kt-indicator");
        },
      });
    });
  };

  var handleThemeMode = function () {
    var checkLight = document.querySelector("#kt_layout_builder_theme_mode_light");
    var checkDark = document.querySelector("#kt_layout_builder_theme_mode_dark");
    var check = document.querySelector("#kt_layout_builder_theme_mode_" + KTThemeMode.getMode());

    if (checkLight) {
      checkLight.addEventListener("click", function () {
        this.checked = true;
        this.closest('[data-kt-buttons="true"]').querySelector(".form-check-image.active").classList.remove("active");
        this.closest(".form-check-image").classList.add("active");
        KTThemeMode.setMode("light");
      });
    }

    if (checkDark) {
      checkDark.addEventListener("click", function () {
        this.checked = true;
        this.closest('[data-kt-buttons="true"]').querySelector(".form-check-image.active").classList.remove("active");
        this.closest(".form-check-image").classList.add("active");
        KTThemeMode.setMode("dark");
      });
    }

    if (check) {
      check.closest(".form-check-image").classList.add("active");
      check.checked = true;
    }
  };

  return {
    // Public functions
    init: function () {
      engage = document.querySelector("#kt_app_engage");
      engageToggleOn = document.querySelector("#kt_app_engage_toggle_on");
      engageToggleOff = document.querySelector("#kt_app_engage_toggle_off");
      engagePrebuiltsModal = document.querySelector("#kt_app_engage_prebuilts_modal");

      if (engage && engagePrebuiltsModal) {
        handleEngagePrebuilts();
        handleEngagePrebuiltsViewMenu();
      }

      if (engage && engageToggleOn && engageToggleOff) {
        handleEngageToggle();
      }

      form = document.querySelector("#kt_app_layout_builder_form");

      if (!form) {
        return;
      }

      url = form.getAttribute("action");
      actionInput = document.querySelector("#kt_app_layout_builder_action");
      previewButton = document.querySelector("#kt_app_layout_builder_preview");
      exportButton = document.querySelector("#kt_app_layout_builder_export");
      resetButton = document.querySelector("#kt_app_layout_builder_reset");

      if (previewButton) {
        handlePreview();
      }

      if (exportButton) {
        handleExport();
      }

      if (resetButton) {
        handleReset();
      }

      handleThemeMode();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTAppLayoutBuilder.init();
});
("use strict");

// Class definition
var KTLayoutSearch = (function () {
  // Private variables
  var element;
  var formElement;
  var mainElement;
  var resultsElement;
  var wrapperElement;
  var emptyElement;

  var preferencesElement;
  var preferencesShowElement;
  var preferencesDismissElement;

  var advancedOptionsFormElement;
  var advancedOptionsFormShowElement;
  var advancedOptionsFormCancelElement;
  var advancedOptionsFormSearchElement;

  var searchObject;

  // Private functions
  var processs = function (search) {
    var timeout = setTimeout(function () {
      var number = KTUtil.getRandomInt(1, 3);

      // Hide recently viewed
      mainElement.classList.add("d-none");

      if (number === 3) {
        // Hide results
        resultsElement.classList.add("d-none");
        // Show empty message
        emptyElement.classList.remove("d-none");
      } else {
        // Show results
        resultsElement.classList.remove("d-none");
        // Hide empty message
        emptyElement.classList.add("d-none");
      }

      // Complete search
      search.complete();
    }, 1500);
  };

  var processsAjax = function (search) {
    // Hide recently viewed
    mainElement.classList.add("d-none");

    // Learn more: https://axios-http.com/docs/intro
    axios
      .post("/search.php", {
        query: searchObject.getQuery(),
      })
      .then(function (response) {
        // Populate results
        resultsElement.innerHTML = response;
        // Show results
        resultsElement.classList.remove("d-none");
        // Hide empty message
        emptyElement.classList.add("d-none");

        // Complete search
        search.complete();
      })
      .catch(function (error) {
        // Hide results
        resultsElement.classList.add("d-none");
        // Show empty message
        emptyElement.classList.remove("d-none");

        // Complete search
        search.complete();
      });
  };

  var clear = function (search) {
    // Show recently viewed
    mainElement.classList.remove("d-none");
    // Hide results
    resultsElement.classList.add("d-none");
    // Hide empty message
    emptyElement.classList.add("d-none");
  };

  var handlePreferences = function () {
    // Preference show handler
    preferencesShowElement.addEventListener("click", function () {
      wrapperElement.classList.add("d-none");
      preferencesElement.classList.remove("d-none");
    });

    // Preference dismiss handler
    preferencesDismissElement.addEventListener("click", function () {
      wrapperElement.classList.remove("d-none");
      preferencesElement.classList.add("d-none");
    });
  };

  var handleAdvancedOptionsForm = function () {
    // Show
    advancedOptionsFormShowElement.addEventListener("click", function () {
      wrapperElement.classList.add("d-none");
      advancedOptionsFormElement.classList.remove("d-none");
    });

    // Cancel
    advancedOptionsFormCancelElement.addEventListener("click", function () {
      wrapperElement.classList.remove("d-none");
      advancedOptionsFormElement.classList.add("d-none");
    });

    // Search
    advancedOptionsFormSearchElement.addEventListener("click", function () {});
  };

  // Public methods
  return {
    init: function () {
      // Elements
      element = document.querySelector("#kt_header_search");

      if (!element) {
        return;
      }

      wrapperElement = element.querySelector('[data-kt-search-element="wrapper"]');
      formElement = element.querySelector('[data-kt-search-element="form"]');
      mainElement = element.querySelector('[data-kt-search-element="main"]');
      resultsElement = element.querySelector('[data-kt-search-element="results"]');
      emptyElement = element.querySelector('[data-kt-search-element="empty"]');

      preferencesElement = element.querySelector('[data-kt-search-element="preferences"]');
      preferencesShowElement = element.querySelector('[data-kt-search-element="preferences-show"]');
      preferencesDismissElement = element.querySelector('[data-kt-search-element="preferences-dismiss"]');

      advancedOptionsFormElement = element.querySelector('[data-kt-search-element="advanced-options-form"]');
      advancedOptionsFormShowElement = element.querySelector('[data-kt-search-element="advanced-options-form-show"]');
      advancedOptionsFormCancelElement = element.querySelector('[data-kt-search-element="advanced-options-form-cancel"]');
      advancedOptionsFormSearchElement = element.querySelector('[data-kt-search-element="advanced-options-form-search"]');

      // Initialize search handler
      searchObject = new KTSearch(element);

      // Demo search handler
      searchObject.on("kt.search.process", processs);

      // Ajax search handler
      //searchObject.on('kt.search.process', processsAjax);

      // Clear handler
      searchObject.on("kt.search.clear", clear);

      // Custom handlers
      handlePreferences();
      handleAdvancedOptionsForm();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTLayoutSearch.init();
});
("use strict");

// Class definition
var KTThemeModeUser = (function () {
  var handleSubmit = function () {
    // Update chart on theme mode change
    KTThemeMode.on("kt.thememode.change", function () {
      var menuMode = KTThemeMode.getMenuMode();
      var mode = KTThemeMode.getMode();
      console.log("user selected theme mode:" + menuMode);
      console.log("theme mode:" + mode);

      // Submit selected theme mode menu option via ajax and
      // store it in user profile and set the user opted theme mode via HTML attribute
      // <html data-theme-mode="light"> .... </html>
    });
  };

  return {
    init: function () {
      handleSubmit();
    },
  };
})();

// Initialize app on document ready
KTUtil.onDOMContentLoaded(function () {
  KTThemeModeUser.init();
});

// Declare KTThemeModeUser for Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTThemeModeUser;
}
("use strict");

// Class definition
var KTThemeMode = (function () {
  var menu;
  var callbacks = [];
  var the = this;

  var getMode = function () {
    var mode;

    if (document.documentElement.hasAttribute("data-bs-theme")) {
      return document.documentElement.getAttribute("data-bs-theme");
    } else if (localStorage.getItem("data-bs-theme") !== null) {
      return localStorage.getItem("data-bs-theme");
    } else if (getMenuMode() === "system") {
      return getSystemMode();
    }

    return "light";
  };

  var setMode = function (mode, menuMode) {
    var currentMode = getMode();

    // Reset mode if system mode was changed
    if (menuMode === "system") {
      if (getSystemMode() !== mode) {
        mode = getSystemMode();
      }
    } else if (mode !== menuMode) {
      menuMode = mode;
    }

    // Read active menu mode value
    var activeMenuItem = menu ? menu.querySelector('[data-kt-element="mode"][data-kt-value="' + menuMode + '"]') : null;

    // Enable switching state
    document.documentElement.setAttribute("data-kt-theme-mode-switching", "true");

    // Set mode to the target document.documentElement
    document.documentElement.setAttribute("data-bs-theme", mode);

    // Disable switching state
    setTimeout(function () {
      document.documentElement.removeAttribute("data-kt-theme-mode-switching");
    }, 300);

    // Store mode value in storage
    localStorage.setItem("data-bs-theme", mode);

    // Set active menu item
    if (activeMenuItem) {
      localStorage.setItem("data-bs-theme-mode", menuMode);
      setActiveMenuItem(activeMenuItem);
    }

    if (mode !== currentMode) {
      KTEventHandler.trigger(document.documentElement, "kt.thememode.change", the);
    }
  };

  var getMenuMode = function () {
    if (!menu) {
      return null;
    }

    var menuItem = menu ? menu.querySelector('.active[data-kt-element="mode"]') : null;

    if (menuItem && menuItem.getAttribute("data-kt-value")) {
      return menuItem.getAttribute("data-kt-value");
    } else if (document.documentElement.hasAttribute("data-bs-theme-mode")) {
      return document.documentElement.getAttribute("data-bs-theme-mode");
    } else if (localStorage.getItem("data-bs-theme-mode") !== null) {
      return localStorage.getItem("data-bs-theme-mode");
    } else {
      return typeof defaultThemeMode !== "undefined" ? defaultThemeMode : "light";
    }
  };

  var getSystemMode = function () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  var initMode = function () {
    setMode(getMode(), getMenuMode());
    KTEventHandler.trigger(document.documentElement, "kt.thememode.init", the);
  };

  var getActiveMenuItem = function () {
    return menu.querySelector('[data-kt-element="mode"][data-kt-value="' + getMenuMode() + '"]');
  };

  var setActiveMenuItem = function (item) {
    var menuMode = item.getAttribute("data-kt-value");

    var activeItem = menu.querySelector('.active[data-kt-element="mode"]');

    if (activeItem) {
      activeItem.classList.remove("active");
    }

    item.classList.add("active");
    localStorage.setItem("data-bs-theme-mode", menuMode);
  };

  var handleMenu = function () {
    var items = [].slice.call(menu.querySelectorAll('[data-kt-element="mode"]'));

    items.map(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        var menuMode = item.getAttribute("data-kt-value");
        var mode = menuMode;

        if (menuMode === "system") {
          mode = getSystemMode();
        }

        setMode(mode, menuMode);
      });
    });
  };

  return {
    init: function () {
      menu = document.querySelector('[data-kt-element="theme-mode-menu"]');

      initMode();

      if (menu) {
        handleMenu();
      }
    },

    getMode: function () {
      return getMode();
    },

    getMenuMode: function () {
      return getMenuMode();
    },

    getSystemMode: function () {
      return getSystemMode();
    },

    setMode: function (mode) {
      return setMode(mode);
    },

    on: function (name, handler) {
      return KTEventHandler.on(document.documentElement, name, handler);
    },

    off: function (name, handlerId) {
      return KTEventHandler.off(document.documentElement, name, handlerId);
    },
  };
})();

// Initialize app on document ready
KTUtil.onDOMContentLoaded(function () {
  KTThemeMode.init();
});

// Declare KTThemeMode for Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTThemeMode;
}
("use strict");

// Class definition
var KTAppAside = (function () {
  // Private variables
  var aside;
  var menuWrapper;

  var handleMenuScroll = function () {
    var menuActiveItem = menuWrapper.querySelector(".menu-link.active");

    if (!menuActiveItem) {
      return;
    }

    if (KTUtil.isVisibleInContainer(menuActiveItem, menuWrapper) === true) {
      return;
    }

    menuWrapper.scroll({
      top: KTUtil.getRelativeTopPosition(menuActiveItem, menuWrapper),
      behavior: "smooth",
    });
  };

  // Public methods
  return {
    init: function () {
      // Elements
      aside = document.querySelector("#kt_aside");
      menuWrapper = document.querySelector("#kt_aside_menu_wrapper");

      if (aside === null) {
        return;
      }

      if (menuWrapper) {
        handleMenuScroll();
      }
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTAppAside.init();
});
("use strict");

// Class definition
var KTLayoutHeader = (function () {
  // Private variables
  var header;

  // Private functions
  var handleSticky = function () {
    if (!header) {
      return;
    }

    var sticky = KTSticky.getInstance(header);
    var timer;

    if (!sticky) {
      return;
    }

    sticky.on("kt.sticky.change", function () {
      timer = setTimeout(function () {
        KTMenu.updateDropdowns();
      }, 300);
    });
  };

  // Public methods
  return {
    init: function () {
      // Elements
      header = document.querySelector("#kt_header");

      // Handle sticky mode
      handleSticky();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTLayoutHeader.init();
});

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTLayoutHeader;
}
