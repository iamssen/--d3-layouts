/* */ 
"format cjs";
(function(Buffer, process) {
  "format register";
  System.register("rxjs/util/root", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var objectTypes = {
      'boolean': false,
      'function': true,
      'object': true,
      'number': false,
      'string': false,
      'undefined': false
    };
    exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    var freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
      exports.root = freeGlobal;
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/SymbolShim", ["rxjs/util/root"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var root_1 = require('../util/root');
    function polyfillSymbol(root) {
      var Symbol = ensureSymbol(root);
      ensureIterator(Symbol, root);
      ensureObservable(Symbol);
      ensureFor(Symbol);
      return Symbol;
    }
    exports.polyfillSymbol = polyfillSymbol;
    function ensureFor(Symbol) {
      if (!Symbol.for) {
        Symbol.for = symbolForPolyfill;
      }
    }
    exports.ensureFor = ensureFor;
    var id = 0;
    function ensureSymbol(root) {
      if (!root.Symbol) {
        root.Symbol = function symbolFuncPolyfill(description) {
          return "@@Symbol(" + description + "):" + id++;
        };
      }
      return root.Symbol;
    }
    exports.ensureSymbol = ensureSymbol;
    function symbolForPolyfill(key) {
      return '@@' + key;
    }
    exports.symbolForPolyfill = symbolForPolyfill;
    function ensureIterator(Symbol, root) {
      if (!Symbol.iterator) {
        if (typeof Symbol.for === 'function') {
          Symbol.iterator = Symbol.for('iterator');
        } else if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
          Symbol.iterator = '@@iterator';
        } else if (root.Map) {
          var keys = Object.getOwnPropertyNames(root.Map.prototype);
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && root.Map.prototype[key] === root.Map.prototype['entries']) {
              Symbol.iterator = key;
              break;
            }
          }
        } else {
          Symbol.iterator = '@@iterator';
        }
      }
    }
    exports.ensureIterator = ensureIterator;
    function ensureObservable(Symbol) {
      if (!Symbol.observable) {
        if (typeof Symbol.for === 'function') {
          Symbol.observable = Symbol.for('observable');
        } else {
          Symbol.observable = '@@observable';
        }
      }
    }
    exports.ensureObservable = ensureObservable;
    exports.SymbolShim = polyfillSymbol(root_1.root);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/noop", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function noop() {}
    exports.noop = noop;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/throwError", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function throwError(e) {
      throw e;
    }
    exports.throwError = throwError;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/tryOrThrowError", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function tryOrThrowError(target) {
      function tryCatcher() {
        try {
          tryCatcher.target.apply(this, arguments);
        } catch (e) {
          throw e;
        }
      }
      tryCatcher.target = target;
      return tryCatcher;
    }
    exports.tryOrThrowError = tryOrThrowError;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isArray", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    exports.isArray = Array.isArray || (function(x) {
      return x && typeof x.length === 'number';
    });
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isObject", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function isObject(x) {
      return x != null && typeof x === 'object';
    }
    exports.isObject = isObject;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isFunction", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function isFunction(x) {
      return typeof x === 'function';
    }
    exports.isFunction = isFunction;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/symbol/rxSubscriber", ["rxjs/util/SymbolShim"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var SymbolShim_1 = require('../util/SymbolShim');
    exports.rxSubscriber = SymbolShim_1.SymbolShim.for('rxSubscriber');
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Observer", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    exports.empty = {
      isUnsubscribed: true,
      next: function(value) {},
      error: function(err) {
        throw err;
      },
      complete: function() {}
    };
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/subject/SubjectSubscription", ["rxjs/Subscription"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscription_1 = require('../Subscription');
    var SubjectSubscription = (function(_super) {
      __extends(SubjectSubscription, _super);
      function SubjectSubscription(subject, observer) {
        _super.call(this);
        this.subject = subject;
        this.observer = observer;
        this.isUnsubscribed = false;
      }
      SubjectSubscription.prototype.unsubscribe = function() {
        if (this.isUnsubscribed) {
          return;
        }
        this.isUnsubscribed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
          return;
        }
        var subscriberIndex = observers.indexOf(this.observer);
        if (subscriberIndex !== -1) {
          observers.splice(subscriberIndex, 1);
        }
      };
      return SubjectSubscription;
    })(Subscription_1.Subscription);
    exports.SubjectSubscription = SubjectSubscription;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/ScalarObservable", ["rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var ScalarObservable = (function(_super) {
      __extends(ScalarObservable, _super);
      function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
      }
      ScalarObservable.create = function(value, scheduler) {
        return new ScalarObservable(value, scheduler);
      };
      ScalarObservable.dispatch = function(state) {
        var done = state.done,
            value = state.value,
            subscriber = state.subscriber;
        if (done) {
          subscriber.complete();
          return;
        }
        subscriber.next(value);
        if (subscriber.isUnsubscribed) {
          return;
        }
        state.done = true;
        this.schedule(state);
      };
      ScalarObservable.prototype._subscribe = function(subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(ScalarObservable.dispatch, 0, {
            done: false,
            value: value,
            subscriber: subscriber
          });
        } else {
          subscriber.next(value);
          if (!subscriber.isUnsubscribed) {
            subscriber.complete();
          }
        }
      };
      return ScalarObservable;
    })(Observable_1.Observable);
    exports.ScalarObservable = ScalarObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/empty", ["rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var EmptyObservable = (function(_super) {
      __extends(EmptyObservable, _super);
      function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
      }
      EmptyObservable.create = function(scheduler) {
        return new EmptyObservable(scheduler);
      };
      EmptyObservable.dispatch = function(_a) {
        var subscriber = _a.subscriber;
        subscriber.complete();
      };
      EmptyObservable.prototype._subscribe = function(subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(EmptyObservable.dispatch, 0, {subscriber: subscriber});
        } else {
          subscriber.complete();
        }
      };
      return EmptyObservable;
    })(Observable_1.Observable);
    exports.EmptyObservable = EmptyObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isScheduler", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function isScheduler(value) {
      return value && typeof value.schedule === 'function';
    }
    exports.isScheduler = isScheduler;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/errorObject", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    exports.errorObject = {e: {}};
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/OuterSubscriber", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var OuterSubscriber = (function(_super) {
      __extends(OuterSubscriber, _super);
      function OuterSubscriber() {
        _super.apply(this, arguments);
      }
      OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.destination.next(innerValue);
      };
      OuterSubscriber.prototype.notifyError = function(error, innerSub) {
        this.destination.error(error);
      };
      OuterSubscriber.prototype.notifyComplete = function(innerSub) {
        this.destination.complete();
      };
      return OuterSubscriber;
    })(Subscriber_1.Subscriber);
    exports.OuterSubscriber = OuterSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isPromise", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function isPromise(value) {
      return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }
    exports.isPromise = isPromise;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/InnerSubscriber", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var InnerSubscriber = (function(_super) {
      __extends(InnerSubscriber, _super);
      function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
      }
      InnerSubscriber.prototype._next = function(value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++);
      };
      InnerSubscriber.prototype._error = function(error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
      };
      InnerSubscriber.prototype._complete = function() {
        this.parent.notifyComplete(this);
        this.unsubscribe();
      };
      return InnerSubscriber;
    })(Subscriber_1.Subscriber);
    exports.InnerSubscriber = InnerSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mergeAll-support", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var MergeAllOperator = (function() {
      function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
      }
      MergeAllOperator.prototype.call = function(observer) {
        return new MergeAllSubscriber(observer, this.concurrent);
      };
      return MergeAllOperator;
    })();
    exports.MergeAllOperator = MergeAllOperator;
    var MergeAllSubscriber = (function(_super) {
      __extends(MergeAllSubscriber, _super);
      function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
      }
      MergeAllSubscriber.prototype._next = function(observable) {
        if (this.active < this.concurrent) {
          if (observable._isScalar) {
            this.destination.next(observable.value);
          } else {
            this.active++;
            this.add(subscribeToResult_1.subscribeToResult(this, observable));
          }
        } else {
          this.buffer.push(observable);
        }
      };
      MergeAllSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
      };
      MergeAllSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeAllSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    exports.MergeAllSubscriber = MergeAllSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/merge-static", ["rxjs/observable/fromArray", "rxjs/operator/mergeAll-support", "rxjs/util/isScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var fromArray_1 = require('../observable/fromArray');
    var mergeAll_support_1 = require('../operator/mergeAll-support');
    var isScheduler_1 = require('../util/isScheduler');
    function merge() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var concurrent = Number.POSITIVE_INFINITY;
      var scheduler = null;
      var last = observables[observables.length - 1];
      if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
          concurrent = observables.pop();
        }
      } else if (typeof last === 'number') {
        concurrent = observables.pop();
      }
      if (observables.length === 1) {
        return observables[0];
      }
      return new fromArray_1.ArrayObservable(observables, scheduler).lift(new mergeAll_support_1.MergeAllOperator(concurrent));
    }
    exports.merge = merge;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/race-support", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var RaceOperator = (function() {
      function RaceOperator() {}
      RaceOperator.prototype.call = function(subscriber) {
        return new RaceSubscriber(subscriber);
      };
      return RaceOperator;
    })();
    exports.RaceOperator = RaceOperator;
    var RaceSubscriber = (function(_super) {
      __extends(RaceSubscriber, _super);
      function RaceSubscriber(destination) {
        _super.call(this, destination);
        this.hasFirst = false;
        this.observables = [];
        this.subscriptions = [];
      }
      RaceSubscriber.prototype._next = function(observable) {
        this.observables.push(observable);
      };
      RaceSubscriber.prototype._complete = function() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
          this.destination.complete();
        } else {
          for (var i = 0; i < len; i++) {
            var observable = observables[i];
            var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
            this.subscriptions.push(subscription);
            this.add(subscription);
          }
          this.observables = null;
        }
      };
      RaceSubscriber.prototype.notifyNext = function(observable, value, outerIndex) {
        if (!this.hasFirst) {
          this.hasFirst = true;
          for (var i = 0; i < this.subscriptions.length; i++) {
            if (i !== outerIndex) {
              var subscription = this.subscriptions[i];
              subscription.unsubscribe();
              this.remove(subscription);
            }
          }
          this.subscriptions = null;
        }
        this.destination.next(value);
      };
      return RaceSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    exports.RaceSubscriber = RaceSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/subject/AsyncSubject", ["rxjs/Subject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1 = require('../Subject');
    var AsyncSubject = (function(_super) {
      __extends(AsyncSubject, _super);
      function AsyncSubject() {
        _super.apply(this, arguments);
        this.value = null;
        this.hasNext = false;
      }
      AsyncSubject.prototype._subscribe = function(subscriber) {
        if (this.hasCompleted && this.hasNext) {
          subscriber.next(this.value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
      };
      AsyncSubject.prototype._next = function(value) {
        this.value = value;
        this.hasNext = true;
      };
      AsyncSubject.prototype._complete = function() {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        this.isUnsubscribed = true;
        if (this.hasNext) {
          while (++index < len) {
            var o = observers[index];
            o.next(this.value);
            o.complete();
          }
        } else {
          while (++index < len) {
            observers[index].complete();
          }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
      };
      return AsyncSubject;
    })(Subject_1.Subject);
    exports.AsyncSubject = AsyncSubject;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/bindNodeCallback", ["rxjs/Observable", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/subject/AsyncSubject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var AsyncSubject_1 = require('../subject/AsyncSubject');
    var BoundNodeCallbackObservable = (function(_super) {
      __extends(BoundNodeCallbackObservable, _super);
      function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
      }
      BoundNodeCallbackObservable.create = function(callbackFunc, selector, scheduler) {
        if (selector === void 0) {
          selector = undefined;
        }
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          return new BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler);
        };
      };
      BoundNodeCallbackObservable.prototype._subscribe = function(subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
          if (!subject) {
            subject = this.subject = new AsyncSubject_1.AsyncSubject();
            var handler = function handlerFn() {
              var innerArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
              }
              var source = handlerFn.source;
              var selector = source.selector,
                  subject = source.subject;
              var err = innerArgs.shift();
              if (err) {
                subject.error(err);
              } else if (selector) {
                var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result_1 === errorObject_1.errorObject) {
                  subject.error(errorObject_1.errorObject.e);
                } else {
                  subject.next(result_1);
                  subject.complete();
                }
              } else {
                subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              }
            };
            handler.source = this;
            var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
            if (result === errorObject_1.errorObject) {
              subject.error(errorObject_1.errorObject.e);
            }
          }
          return subject.subscribe(subscriber);
        } else {
          return scheduler.schedule(dispatch, 0, {
            source: this,
            subscriber: subscriber
          });
        }
      };
      return BoundNodeCallbackObservable;
    })(Observable_1.Observable);
    exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
    function dispatch(state) {
      var self = this;
      var source = state.source,
          subscriber = state.subscriber;
      var callbackFunc = source.callbackFunc,
          args = source.args,
          scheduler = source.scheduler;
      var subject = source.subject;
      if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i - 0] = arguments[_i];
          }
          var source = handlerFn.source;
          var selector = source.selector,
              subject = source.subject;
          var err = innerArgs.shift();
          if (err) {
            subject.error(err);
          } else if (selector) {
            var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
            if (result_2 === errorObject_1.errorObject) {
              self.add(scheduler.schedule(dispatchError, 0, {
                err: errorObject_1.errorObject.e,
                subject: subject
              }));
            } else {
              self.add(scheduler.schedule(dispatchNext, 0, {
                value: result_2,
                subject: subject
              }));
            }
          } else {
            var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
            self.add(scheduler.schedule(dispatchNext, 0, {
              value: value,
              subject: subject
            }));
          }
        };
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
          subject.error(errorObject_1.errorObject.e);
        }
      }
      self.add(subject.subscribe(subscriber));
    }
    function dispatchNext(_a) {
      var value = _a.value,
          subject = _a.subject;
      subject.next(value);
      subject.complete();
    }
    function dispatchError(_a) {
      var err = _a.err,
          subject = _a.subject;
      subject.error(err);
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/defer", ["rxjs/Observable", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var DeferObservable = (function(_super) {
      __extends(DeferObservable, _super);
      function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
      }
      DeferObservable.create = function(observableFactory) {
        return new DeferObservable(observableFactory);
      };
      DeferObservable.prototype._subscribe = function(subscriber) {
        var result = tryCatch_1.tryCatch(this.observableFactory)();
        if (result === errorObject_1.errorObject) {
          subscriber.error(errorObject_1.errorObject.e);
        } else {
          result.subscribe(subscriber);
        }
      };
      return DeferObservable;
    })(Observable_1.Observable);
    exports.DeferObservable = DeferObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/empty", ["rxjs/Observable", "rxjs/observable/empty"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var empty_1 = require('../observable/empty');
    Observable_1.Observable.empty = empty_1.EmptyObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/fromPromise", ["rxjs/util/root", "rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var root_1 = require('../util/root');
    var Observable_1 = require('../Observable');
    var PromiseObservable = (function(_super) {
      __extends(PromiseObservable, _super);
      function PromiseObservable(promise, scheduler) {
        if (scheduler === void 0) {
          scheduler = null;
        }
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
      }
      PromiseObservable.create = function(promise, scheduler) {
        if (scheduler === void 0) {
          scheduler = null;
        }
        return new PromiseObservable(promise, scheduler);
      };
      PromiseObservable.prototype._subscribe = function(subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
          if (this._isScalar) {
            if (!subscriber.isUnsubscribed) {
              subscriber.next(this.value);
              subscriber.complete();
            }
          } else {
            promise.then(function(value) {
              _this.value = value;
              _this._isScalar = true;
              if (!subscriber.isUnsubscribed) {
                subscriber.next(value);
                subscriber.complete();
              }
            }, function(err) {
              if (!subscriber.isUnsubscribed) {
                subscriber.error(err);
              }
            }).then(null, function(err) {
              root_1.root.setTimeout(function() {
                throw err;
              });
            });
          }
        } else {
          if (this._isScalar) {
            if (!subscriber.isUnsubscribed) {
              return scheduler.schedule(dispatchNext, 0, {
                value: this.value,
                subscriber: subscriber
              });
            }
          } else {
            promise.then(function(value) {
              _this.value = value;
              _this._isScalar = true;
              if (!subscriber.isUnsubscribed) {
                subscriber.add(scheduler.schedule(dispatchNext, 0, {
                  value: value,
                  subscriber: subscriber
                }));
              }
            }, function(err) {
              if (!subscriber.isUnsubscribed) {
                subscriber.add(scheduler.schedule(dispatchError, 0, {
                  err: err,
                  subscriber: subscriber
                }));
              }
            }).then(null, function(err) {
              root_1.root.setTimeout(function() {
                throw err;
              });
            });
          }
        }
      };
      return PromiseObservable;
    })(Observable_1.Observable);
    exports.PromiseObservable = PromiseObservable;
    function dispatchNext(_a) {
      var value = _a.value,
          subscriber = _a.subscriber;
      if (!subscriber.isUnsubscribed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }
    function dispatchError(_a) {
      var err = _a.err,
          subscriber = _a.subscriber;
      if (!subscriber.isUnsubscribed) {
        subscriber.error(err);
      }
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/IteratorObservable", ["rxjs/util/root", "rxjs/util/isObject", "rxjs/util/tryCatch", "rxjs/Observable", "rxjs/util/isFunction", "rxjs/util/SymbolShim", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var root_1 = require('../util/root');
    var isObject_1 = require('../util/isObject');
    var tryCatch_1 = require('../util/tryCatch');
    var Observable_1 = require('../Observable');
    var isFunction_1 = require('../util/isFunction');
    var SymbolShim_1 = require('../util/SymbolShim');
    var errorObject_1 = require('../util/errorObject');
    var IteratorObservable = (function(_super) {
      __extends(IteratorObservable, _super);
      function IteratorObservable(iterator, project, thisArg, scheduler) {
        _super.call(this);
        if (iterator == null) {
          throw new Error('iterator cannot be null.');
        }
        if (isObject_1.isObject(project)) {
          this.thisArg = project;
          this.scheduler = thisArg;
        } else if (isFunction_1.isFunction(project)) {
          this.project = project;
          this.thisArg = thisArg;
          this.scheduler = scheduler;
        } else if (project != null) {
          throw new Error('When provided, `project` must be a function.');
        }
        this.iterator = getIterator(iterator);
      }
      IteratorObservable.create = function(iterator, project, thisArg, scheduler) {
        return new IteratorObservable(iterator, project, thisArg, scheduler);
      };
      IteratorObservable.dispatch = function(state) {
        var index = state.index,
            hasError = state.hasError,
            thisArg = state.thisArg,
            project = state.project,
            iterator = state.iterator,
            subscriber = state.subscriber;
        if (hasError) {
          subscriber.error(state.error);
          return;
        }
        var result = iterator.next();
        if (result.done) {
          subscriber.complete();
          return;
        }
        if (project) {
          result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
          if (result === errorObject_1.errorObject) {
            state.error = errorObject_1.errorObject.e;
            state.hasError = true;
          } else {
            subscriber.next(result);
            state.index = index + 1;
          }
        } else {
          subscriber.next(result.value);
          state.index = index + 1;
        }
        if (subscriber.isUnsubscribed) {
          return;
        }
        this.schedule(state);
      };
      IteratorObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var _a = this,
            iterator = _a.iterator,
            project = _a.project,
            thisArg = _a.thisArg,
            scheduler = _a.scheduler;
        if (scheduler) {
          return scheduler.schedule(IteratorObservable.dispatch, 0, {
            index: index,
            thisArg: thisArg,
            project: project,
            iterator: iterator,
            subscriber: subscriber
          });
        } else {
          do {
            var result = iterator.next();
            if (result.done) {
              subscriber.complete();
              break;
            } else if (project) {
              result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
              if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
                break;
              }
              subscriber.next(result);
            } else {
              subscriber.next(result.value);
            }
            if (subscriber.isUnsubscribed) {
              break;
            }
          } while (true);
        }
      };
      return IteratorObservable;
    })(Observable_1.Observable);
    exports.IteratorObservable = IteratorObservable;
    var StringIterator = (function() {
      function StringIterator(str, idx, len) {
        if (idx === void 0) {
          idx = 0;
        }
        if (len === void 0) {
          len = str.length;
        }
        this.str = str;
        this.idx = idx;
        this.len = len;
      }
      StringIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function() {
        return (this);
      };
      StringIterator.prototype.next = function() {
        return this.idx < this.len ? {
          done: false,
          value: this.str.charAt(this.idx++)
        } : {
          done: true,
          value: undefined
        };
      };
      return StringIterator;
    })();
    var ArrayIterator = (function() {
      function ArrayIterator(arr, idx, len) {
        if (idx === void 0) {
          idx = 0;
        }
        if (len === void 0) {
          len = toLength(arr);
        }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
      }
      ArrayIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function() {
        return this;
      };
      ArrayIterator.prototype.next = function() {
        return this.idx < this.len ? {
          done: false,
          value: this.arr[this.idx++]
        } : {
          done: true,
          value: undefined
        };
      };
      return ArrayIterator;
    })();
    function getIterator(obj) {
      var i = obj[SymbolShim_1.SymbolShim.iterator];
      if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
      }
      if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
      }
      if (!i) {
        throw new TypeError('Object is not iterable');
      }
      return obj[SymbolShim_1.SymbolShim.iterator]();
    }
    var maxSafeInteger = Math.pow(2, 53) - 1;
    function toLength(o) {
      var len = +o.length;
      if (isNaN(len)) {
        return 0;
      }
      if (len === 0 || !numberIsFinite(len)) {
        return len;
      }
      len = sign(len) * Math.floor(Math.abs(len));
      if (len <= 0) {
        return 0;
      }
      if (len > maxSafeInteger) {
        return maxSafeInteger;
      }
      return len;
    }
    function numberIsFinite(value) {
      return typeof value === 'number' && root_1.root.isFinite(value);
    }
    function sign(value) {
      var valueAsNumber = +value;
      if (valueAsNumber === 0) {
        return valueAsNumber;
      }
      if (isNaN(valueAsNumber)) {
        return valueAsNumber;
      }
      return valueAsNumber < 0 ? -1 : 1;
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Notification", ["rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var Notification = (function() {
      function Notification(kind, value, exception) {
        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this.hasValue = kind === 'N';
      }
      Notification.prototype.observe = function(observer) {
        switch (this.kind) {
          case 'N':
            return observer.next(this.value);
          case 'E':
            return observer.error(this.exception);
          case 'C':
            return observer.complete();
        }
      };
      Notification.prototype.do = function(next, error, complete) {
        var kind = this.kind;
        switch (kind) {
          case 'N':
            return next(this.value);
          case 'E':
            return error(this.exception);
          case 'C':
            return complete();
        }
      };
      Notification.prototype.accept = function(nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
          return this.observe(nextOrObserver);
        } else {
          return this.do(nextOrObserver, error, complete);
        }
      };
      Notification.prototype.toObservable = function() {
        var kind = this.kind;
        switch (kind) {
          case 'N':
            return Observable_1.Observable.of(this.value);
          case 'E':
            return Observable_1.Observable.throw(this.exception);
          case 'C':
            return Observable_1.Observable.empty();
        }
      };
      Notification.createNext = function(value) {
        if (typeof value !== 'undefined') {
          return new Notification('N', value);
        }
        return this.undefinedValueNotification;
      };
      Notification.createError = function(err) {
        return new Notification('E', undefined, err);
      };
      Notification.createComplete = function() {
        return this.completeNotification;
      };
      Notification.completeNotification = new Notification('C');
      Notification.undefinedValueNotification = new Notification('N', undefined);
      return Notification;
    })();
    exports.Notification = Notification;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/fromArray", ["rxjs/Observable", "rxjs/observable/fromArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var fromArray_1 = require('../observable/fromArray');
    Observable_1.Observable.fromArray = fromArray_1.ArrayObservable.create;
    Observable_1.Observable.of = fromArray_1.ArrayObservable.of;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/fromEvent", ["rxjs/Observable", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/Subscription"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var Subscription_1 = require('../Subscription');
    var FromEventObservable = (function(_super) {
      __extends(FromEventObservable, _super);
      function FromEventObservable(sourceObj, eventName, selector) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
      }
      FromEventObservable.create = function(sourceObj, eventName, selector) {
        return new FromEventObservable(sourceObj, eventName, selector);
      };
      FromEventObservable.setupSubscription = function(sourceObj, eventName, handler, subscriber) {
        var unsubscribe;
        var tag = sourceObj.toString();
        if (tag === '[object NodeList]' || tag === '[object HTMLCollection]') {
          for (var i = 0,
              len = sourceObj.length; i < len; i++) {
            FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
          }
        } else if (typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function') {
          sourceObj.addEventListener(eventName, handler);
          unsubscribe = function() {
            return sourceObj.removeEventListener(eventName, handler);
          };
        } else if (typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function') {
          sourceObj.on(eventName, handler);
          unsubscribe = function() {
            return sourceObj.off(eventName, handler);
          };
        } else if (typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function') {
          sourceObj.addListener(eventName, handler);
          unsubscribe = function() {
            return sourceObj.removeListener(eventName, handler);
          };
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
      };
      FromEventObservable.prototype._subscribe = function(subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var selector = this.selector;
        var handler = selector ? function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
          if (result === errorObject_1.errorObject) {
            subscriber.error(errorObject_1.errorObject.e);
          } else {
            subscriber.next(result);
          }
        } : function(e) {
          return subscriber.next(e);
        };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
      };
      return FromEventObservable;
    })(Observable_1.Observable);
    exports.FromEventObservable = FromEventObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/fromEventPattern", ["rxjs/Observable", "rxjs/Subscription", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var Subscription_1 = require('../Subscription');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var FromEventPatternObservable = (function(_super) {
      __extends(FromEventPatternObservable, _super);
      function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _super.call(this);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
      }
      FromEventPatternObservable.create = function(addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
      };
      FromEventPatternObservable.prototype._subscribe = function(subscriber) {
        var addHandler = this.addHandler;
        var removeHandler = this.removeHandler;
        var selector = this.selector;
        var handler = selector ? function(e) {
          var result = tryCatch_1.tryCatch(selector).apply(null, arguments);
          if (result === errorObject_1.errorObject) {
            subscriber.error(result.e);
          } else {
            subscriber.next(result);
          }
        } : function(e) {
          subscriber.next(e);
        };
        var result = tryCatch_1.tryCatch(addHandler)(handler);
        if (result === errorObject_1.errorObject) {
          subscriber.error(result.e);
        }
        subscriber.add(new Subscription_1.Subscription(function() {
          removeHandler(handler);
        }));
      };
      return FromEventPatternObservable;
    })(Observable_1.Observable);
    exports.FromEventPatternObservable = FromEventPatternObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/fromPromise", ["rxjs/Observable", "rxjs/observable/fromPromise"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var fromPromise_1 = require('../observable/fromPromise');
    Observable_1.Observable.fromPromise = fromPromise_1.PromiseObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isNumeric", ["rxjs/util/isArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var isArray_1 = require('../util/isArray');
    function isNumeric(val) {
      return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
    }
    exports.isNumeric = isNumeric;
    ;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/Immediate", ["rxjs/util/root"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var root_1 = require('../util/root');
    var ImmediateDefinition = (function() {
      function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
          this.setImmediate = root.setImmediate.bind(root);
          this.clearImmediate = root.clearImmediate.bind(root);
        } else {
          this.nextHandle = 1;
          this.tasksByHandle = {};
          this.currentlyRunningATask = false;
          if (this.canUseProcessNextTick()) {
            this.setImmediate = this.createProcessNextTickSetImmediate();
          } else if (this.canUsePostMessage()) {
            this.setImmediate = this.createPostMessageSetImmediate();
          } else if (this.canUseMessageChannel()) {
            this.setImmediate = this.createMessageChannelSetImmediate();
          } else if (this.canUseReadyStateChange()) {
            this.setImmediate = this.createReadyStateChangeSetImmediate();
          } else {
            this.setImmediate = this.createSetTimeoutSetImmediate();
          }
          var ci = function clearImmediate(handle) {
            delete clearImmediate.instance.tasksByHandle[handle];
          };
          ci.instance = this;
          this.clearImmediate = ci;
        }
      }
      ImmediateDefinition.prototype.identify = function(o) {
        return this.root.Object.prototype.toString.call(o);
      };
      ImmediateDefinition.prototype.canUseProcessNextTick = function() {
        return this.identify(this.root.process) === '[object process]';
      };
      ImmediateDefinition.prototype.canUseMessageChannel = function() {
        return Boolean(this.root.MessageChannel);
      };
      ImmediateDefinition.prototype.canUseReadyStateChange = function() {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
      };
      ImmediateDefinition.prototype.canUsePostMessage = function() {
        var root = this.root;
        if (root.postMessage && !root.importScripts) {
          var postMessageIsAsynchronous = true;
          var oldOnMessage = root.onmessage;
          root.onmessage = function() {
            postMessageIsAsynchronous = false;
          };
          root.postMessage('', '*');
          root.onmessage = oldOnMessage;
          return postMessageIsAsynchronous;
        }
        return false;
      };
      ImmediateDefinition.prototype.partiallyApplied = function(handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
          var _a = result,
              handler = _a.handler,
              args = _a.args;
          if (typeof handler === 'function') {
            handler.apply(undefined, args);
          } else {
            (new Function('' + handler))();
          }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
      };
      ImmediateDefinition.prototype.addFromSetImmediateArguments = function(args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
      };
      ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function() {
        var fn = function setImmediate() {
          var instance = setImmediate.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
          return handle;
        };
        fn.instance = this;
        return fn;
      };
      ImmediateDefinition.prototype.createPostMessageSetImmediate = function() {
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
          var instance = globalMessageHandler.instance;
          if (event.source === root && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
            instance.runIfPresent(+event.data.slice(messagePrefix.length));
          }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
          var _a = setImmediate,
              messagePrefix = _a.messagePrefix,
              instance = _a.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          instance.root.postMessage(messagePrefix + handle, '*');
          return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
      };
      ImmediateDefinition.prototype.runIfPresent = function(handle) {
        if (this.currentlyRunningATask) {
          this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        } else {
          var task = this.tasksByHandle[handle];
          if (task) {
            this.currentlyRunningATask = true;
            try {
              task();
            } finally {
              this.clearImmediate(handle);
              this.currentlyRunningATask = false;
            }
          }
        }
      };
      ImmediateDefinition.prototype.createMessageChannelSetImmediate = function() {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function(event) {
          var handle = event.data;
          _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
          var _a = setImmediate,
              channel = _a.channel,
              instance = _a.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          channel.port2.postMessage(handle);
          return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
      };
      ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function() {
        var fn = function setImmediate() {
          var instance = setImmediate.instance;
          var root = instance.root;
          var doc = root.document;
          var html = doc.documentElement;
          var handle = instance.addFromSetImmediateArguments(arguments);
          var script = doc.createElement('script');
          script.onreadystatechange = function() {
            instance.runIfPresent(handle);
            script.onreadystatechange = null;
            html.removeChild(script);
            script = null;
          };
          html.appendChild(script);
          return handle;
        };
        fn.instance = this;
        return fn;
      };
      ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function() {
        var fn = function setImmediate() {
          var instance = setImmediate.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
          return handle;
        };
        fn.instance = this;
        return fn;
      };
      return ImmediateDefinition;
    })();
    exports.ImmediateDefinition = ImmediateDefinition;
    exports.Immediate = new ImmediateDefinition(root_1.root);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/FutureAction", ["rxjs/util/root", "rxjs/Subscription"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var root_1 = require('../util/root');
    var Subscription_1 = require('../Subscription');
    var FutureAction = (function(_super) {
      __extends(FutureAction, _super);
      function FutureAction(scheduler, work) {
        _super.call(this);
        this.scheduler = scheduler;
        this.work = work;
      }
      FutureAction.prototype.execute = function() {
        if (this.isUnsubscribed) {
          throw new Error('How did did we execute a canceled Action?');
        }
        this.work(this.state);
      };
      FutureAction.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (this.isUnsubscribed) {
          return this;
        }
        return this._schedule(state, delay);
      };
      FutureAction.prototype._schedule = function(state, delay) {
        var _this = this;
        if (delay === void 0) {
          delay = 0;
        }
        this.delay = delay;
        this.state = state;
        var id = this.id;
        if (id != null) {
          this.id = undefined;
          root_1.root.clearTimeout(id);
        }
        this.id = root_1.root.setTimeout(function() {
          _this.id = null;
          var scheduler = _this.scheduler;
          scheduler.actions.push(_this);
          scheduler.flush();
        }, delay);
        return this;
      };
      FutureAction.prototype._unsubscribe = function() {
        var _a = this,
            id = _a.id,
            scheduler = _a.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        if (id != null) {
          this.id = null;
          root_1.root.clearTimeout(id);
        }
        if (index !== -1) {
          actions.splice(index, 1);
        }
        this.work = null;
        this.state = null;
        this.scheduler = null;
      };
      return FutureAction;
    })(Subscription_1.Subscription);
    exports.FutureAction = FutureAction;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/QueueAction", ["rxjs/scheduler/FutureAction"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var FutureAction_1 = require('../scheduler/FutureAction');
    var QueueAction = (function(_super) {
      __extends(QueueAction, _super);
      function QueueAction() {
        _super.apply(this, arguments);
      }
      QueueAction.prototype._schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay > 0) {
          return _super.prototype._schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        scheduler.flush();
        return this;
      };
      return QueueAction;
    })(FutureAction_1.FutureAction);
    exports.QueueAction = QueueAction;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/never", ["rxjs/Observable", "rxjs/util/noop"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var noop_1 = require('../util/noop');
    var InfiniteObservable = (function(_super) {
      __extends(InfiniteObservable, _super);
      function InfiniteObservable() {
        _super.call(this);
      }
      InfiniteObservable.create = function() {
        return new InfiniteObservable();
      };
      InfiniteObservable.prototype._subscribe = function(subscriber) {
        noop_1.noop();
      };
      return InfiniteObservable;
    })(Observable_1.Observable);
    exports.InfiniteObservable = InfiniteObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/range", ["rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var RangeObservable = (function(_super) {
      __extends(RangeObservable, _super);
      function RangeObservable(start, end, scheduler) {
        _super.call(this);
        this.start = start;
        this.end = end;
        this.scheduler = scheduler;
      }
      RangeObservable.create = function(start, end, scheduler) {
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = 0;
        }
        return new RangeObservable(start, end, scheduler);
      };
      RangeObservable.dispatch = function(state) {
        var start = state.start,
            index = state.index,
            end = state.end,
            subscriber = state.subscriber;
        if (index >= end) {
          subscriber.complete();
          return;
        }
        subscriber.next(start);
        if (subscriber.isUnsubscribed) {
          return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
      };
      RangeObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var start = this.start;
        var end = this.end;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(RangeObservable.dispatch, 0, {
            index: index,
            end: end,
            start: start,
            subscriber: subscriber
          });
        } else {
          do {
            if (index++ >= end) {
              subscriber.complete();
              break;
            }
            subscriber.next(start++);
            if (subscriber.isUnsubscribed) {
              break;
            }
          } while (true);
        }
      };
      return RangeObservable;
    })(Observable_1.Observable);
    exports.RangeObservable = RangeObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/throw", ["rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var ErrorObservable = (function(_super) {
      __extends(ErrorObservable, _super);
      function ErrorObservable(error, scheduler) {
        _super.call(this);
        this.error = error;
        this.scheduler = scheduler;
      }
      ErrorObservable.create = function(error, scheduler) {
        return new ErrorObservable(error, scheduler);
      };
      ErrorObservable.dispatch = function(_a) {
        var error = _a.error,
            subscriber = _a.subscriber;
        subscriber.error(error);
      };
      ErrorObservable.prototype._subscribe = function(subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(ErrorObservable.dispatch, 0, {
            error: error,
            subscriber: subscriber
          });
        } else {
          subscriber.error(error);
        }
      };
      return ErrorObservable;
    })(Observable_1.Observable);
    exports.ErrorObservable = ErrorObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/isDate", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function isDate(value) {
      return value instanceof Date && !isNaN(+value);
    }
    exports.isDate = isDate;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/zip-support", ["rxjs/util/isArray", "rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult", "rxjs/util/SymbolShim"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isArray_1 = require('../util/isArray');
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var SymbolShim_1 = require('../util/SymbolShim');
    var ZipOperator = (function() {
      function ZipOperator(project) {
        this.project = project;
      }
      ZipOperator.prototype.call = function(subscriber) {
        return new ZipSubscriber(subscriber, this.project);
      };
      return ZipOperator;
    })();
    exports.ZipOperator = ZipOperator;
    var ZipSubscriber = (function(_super) {
      __extends(ZipSubscriber, _super);
      function ZipSubscriber(destination, project, values) {
        if (values === void 0) {
          values = Object.create(null);
        }
        _super.call(this, destination);
        this.index = 0;
        this.iterators = [];
        this.active = 0;
        this.project = (typeof project === 'function') ? project : null;
        this.values = values;
      }
      ZipSubscriber.prototype._next = function(value) {
        var iterators = this.iterators;
        var index = this.index++;
        if (isArray_1.isArray(value)) {
          iterators.push(new StaticArrayIterator(value));
        } else if (typeof value[SymbolShim_1.SymbolShim.iterator] === 'function') {
          iterators.push(new StaticIterator(value[SymbolShim_1.SymbolShim.iterator]()));
        } else {
          iterators.push(new ZipBufferIterator(this.destination, this, value, index));
        }
      };
      ZipSubscriber.prototype._complete = function() {
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          if (iterator.stillUnsubscribed) {
            this.add(iterator.subscribe(iterator, i));
          } else {
            this.active--;
          }
        }
      };
      ZipSubscriber.prototype.notifyInactive = function() {
        this.active--;
        if (this.active === 0) {
          this.destination.complete();
        }
      };
      ZipSubscriber.prototype.checkIterators = function() {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
            return;
          }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          var result = iterator.next();
          if (iterator.hasCompleted()) {
            shouldComplete = true;
          }
          if (result.done) {
            destination.complete();
            return;
          }
          args.push(result.value);
        }
        var project = this.project;
        if (project) {
          var result = tryCatch_1.tryCatch(project).apply(this, args);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            destination.next(result);
          }
        } else {
          destination.next(args);
        }
        if (shouldComplete) {
          destination.complete();
        }
      };
      return ZipSubscriber;
    })(Subscriber_1.Subscriber);
    exports.ZipSubscriber = ZipSubscriber;
    var StaticIterator = (function() {
      function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
      }
      StaticIterator.prototype.hasValue = function() {
        return true;
      };
      StaticIterator.prototype.next = function() {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
      };
      StaticIterator.prototype.hasCompleted = function() {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
      };
      return StaticIterator;
    })();
    var StaticArrayIterator = (function() {
      function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
      }
      StaticArrayIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function() {
        return this;
      };
      StaticArrayIterator.prototype.next = function(value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? {
          value: array[i],
          done: false
        } : {done: true};
      };
      StaticArrayIterator.prototype.hasValue = function() {
        return this.array.length > this.index;
      };
      StaticArrayIterator.prototype.hasCompleted = function() {
        return this.array.length === this.index;
      };
      return StaticArrayIterator;
    })();
    var ZipBufferIterator = (function(_super) {
      __extends(ZipBufferIterator, _super);
      function ZipBufferIterator(destination, parent, observable, index) {
        _super.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.index = index;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
      }
      ZipBufferIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function() {
        return this;
      };
      ZipBufferIterator.prototype.next = function() {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
          return {done: true};
        } else {
          return {
            value: buffer.shift(),
            done: false
          };
        }
      };
      ZipBufferIterator.prototype.hasValue = function() {
        return this.buffer.length > 0;
      };
      ZipBufferIterator.prototype.hasCompleted = function() {
        return this.buffer.length === 0 && this.isComplete;
      };
      ZipBufferIterator.prototype.notifyComplete = function() {
        if (this.buffer.length > 0) {
          this.isComplete = true;
          this.parent.notifyInactive();
        } else {
          this.destination.complete();
        }
      };
      ZipBufferIterator.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
      };
      ZipBufferIterator.prototype.subscribe = function(value, index) {
        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
      };
      return ZipBufferIterator;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/buffer", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function buffer(closingNotifier) {
      return this.lift(new BufferOperator(closingNotifier));
    }
    exports.buffer = buffer;
    var BufferOperator = (function() {
      function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
      }
      BufferOperator.prototype.call = function(subscriber) {
        return new BufferSubscriber(subscriber, this.closingNotifier);
      };
      return BufferOperator;
    })();
    var BufferSubscriber = (function(_super) {
      __extends(BufferSubscriber, _super);
      function BufferSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.buffer = [];
        this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
      }
      BufferSubscriber.prototype._next = function(value) {
        this.buffer.push(value);
      };
      BufferSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
      };
      return BufferSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/bufferCount", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) {
        startBufferEvery = null;
      }
      return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    }
    exports.bufferCount = bufferCount;
    var BufferCountOperator = (function() {
      function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
      }
      BufferCountOperator.prototype.call = function(subscriber) {
        return new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery);
      };
      return BufferCountOperator;
    })();
    var BufferCountSubscriber = (function(_super) {
      __extends(BufferCountSubscriber, _super);
      function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _super.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [[]];
        this.count = 0;
      }
      BufferCountSubscriber.prototype._next = function(value) {
        var count = (this.count += 1);
        var destination = this.destination;
        var bufferSize = this.bufferSize;
        var startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
        var buffers = this.buffers;
        var len = buffers.length;
        var remove = -1;
        if (count % startBufferEvery === 0) {
          buffers.push([]);
        }
        for (var i = 0; i < len; i++) {
          var buffer = buffers[i];
          buffer.push(value);
          if (buffer.length === bufferSize) {
            remove = i;
            destination.next(buffer);
          }
        }
        if (remove !== -1) {
          buffers.splice(remove, 1);
        }
      };
      BufferCountSubscriber.prototype._complete = function() {
        var destination = this.destination;
        var buffers = this.buffers;
        while (buffers.length > 0) {
          var buffer = buffers.shift();
          if (buffer.length > 0) {
            destination.next(buffer);
          }
        }
        _super.prototype._complete.call(this);
      };
      return BufferCountSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/bufferTime", ["rxjs/Subscriber", "rxjs/scheduler/asap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var asap_1 = require('../scheduler/asap');
    function bufferTime(bufferTimeSpan, bufferCreationInterval, scheduler) {
      if (bufferCreationInterval === void 0) {
        bufferCreationInterval = null;
      }
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
    }
    exports.bufferTime = bufferTime;
    var BufferTimeOperator = (function() {
      function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
      }
      BufferTimeOperator.prototype.call = function(subscriber) {
        return new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler);
      };
      return BufferTimeOperator;
    })();
    var BufferTimeSubscriber = (function(_super) {
      __extends(BufferTimeSubscriber, _super);
      function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
        _super.call(this, destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
        this.buffers = [];
        var buffer = this.openBuffer();
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
          var closeState = {
            subscriber: this,
            buffer: buffer
          };
          var creationState = {
            bufferTimeSpan: bufferTimeSpan,
            bufferCreationInterval: bufferCreationInterval,
            subscriber: this,
            scheduler: scheduler
          };
          this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
          this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        } else {
          var timeSpanOnlyState = {
            subscriber: this,
            buffer: buffer,
            bufferTimeSpan: bufferTimeSpan
          };
          this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
      }
      BufferTimeSubscriber.prototype._next = function(value) {
        var buffers = this.buffers;
        var len = buffers.length;
        for (var i = 0; i < len; i++) {
          buffers[i].push(value);
        }
      };
      BufferTimeSubscriber.prototype._error = function(err) {
        this.buffers.length = 0;
        _super.prototype._error.call(this, err);
      };
      BufferTimeSubscriber.prototype._complete = function() {
        var _a = this,
            buffers = _a.buffers,
            destination = _a.destination;
        while (buffers.length > 0) {
          destination.next(buffers.shift());
        }
        _super.prototype._complete.call(this);
      };
      BufferTimeSubscriber.prototype._unsubscribe = function() {
        this.buffers = null;
      };
      BufferTimeSubscriber.prototype.openBuffer = function() {
        var buffer = [];
        this.buffers.push(buffer);
        return buffer;
      };
      BufferTimeSubscriber.prototype.closeBuffer = function(buffer) {
        this.destination.next(buffer);
        var buffers = this.buffers;
        buffers.splice(buffers.indexOf(buffer), 1);
      };
      return BufferTimeSubscriber;
    })(Subscriber_1.Subscriber);
    function dispatchBufferTimeSpanOnly(state) {
      var subscriber = state.subscriber;
      var prevBuffer = state.buffer;
      if (prevBuffer) {
        subscriber.closeBuffer(prevBuffer);
      }
      state.buffer = subscriber.openBuffer();
      if (!subscriber.isUnsubscribed) {
        this.schedule(state, state.bufferTimeSpan);
      }
    }
    function dispatchBufferCreation(state) {
      var bufferCreationInterval = state.bufferCreationInterval,
          bufferTimeSpan = state.bufferTimeSpan,
          subscriber = state.subscriber,
          scheduler = state.scheduler;
      var buffer = subscriber.openBuffer();
      var action = this;
      if (!subscriber.isUnsubscribed) {
        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
          subscriber: subscriber,
          buffer: buffer
        }));
        action.schedule(state, bufferCreationInterval);
      }
    }
    function dispatchBufferClose(_a) {
      var subscriber = _a.subscriber,
          buffer = _a.buffer;
      subscriber.closeBuffer(buffer);
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/bufferToggle", ["rxjs/Subscriber", "rxjs/Subscription", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Subscription_1 = require('../Subscription');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function bufferToggle(openings, closingSelector) {
      return this.lift(new BufferToggleOperator(openings, closingSelector));
    }
    exports.bufferToggle = bufferToggle;
    var BufferToggleOperator = (function() {
      function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
      }
      BufferToggleOperator.prototype.call = function(subscriber) {
        return new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector);
      };
      return BufferToggleOperator;
    })();
    var BufferToggleSubscriber = (function(_super) {
      __extends(BufferToggleSubscriber, _super);
      function BufferToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openings.subscribe(new BufferToggleOpeningsSubscriber(this)));
      }
      BufferToggleSubscriber.prototype._next = function(value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
          contexts[i].buffer.push(value);
        }
      };
      BufferToggleSubscriber.prototype._error = function(err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
          var context = contexts.shift();
          context.subscription.unsubscribe();
          context.buffer = null;
          context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
      };
      BufferToggleSubscriber.prototype._complete = function() {
        var contexts = this.contexts;
        while (contexts.length > 0) {
          var context = contexts.shift();
          this.destination.next(context.buffer);
          context.subscription.unsubscribe();
          context.buffer = null;
          context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
      };
      BufferToggleSubscriber.prototype.openBuffer = function(value) {
        var closingSelector = this.closingSelector;
        var contexts = this.contexts;
        var closingNotifier = tryCatch_1.tryCatch(closingSelector)(value);
        if (closingNotifier === errorObject_1.errorObject) {
          this._error(errorObject_1.errorObject.e);
        } else {
          var context = {
            buffer: [],
            subscription: new Subscription_1.Subscription()
          };
          contexts.push(context);
          var subscriber = new BufferToggleClosingsSubscriber(this, context);
          var subscription = closingNotifier.subscribe(subscriber);
          context.subscription.add(subscription);
          this.add(subscription);
        }
      };
      BufferToggleSubscriber.prototype.closeBuffer = function(context) {
        var contexts = this.contexts;
        if (contexts === null) {
          return;
        }
        var buffer = context.buffer,
            subscription = context.subscription;
        this.destination.next(buffer);
        contexts.splice(contexts.indexOf(context), 1);
        this.remove(subscription);
        subscription.unsubscribe();
      };
      return BufferToggleSubscriber;
    })(Subscriber_1.Subscriber);
    var BufferToggleOpeningsSubscriber = (function(_super) {
      __extends(BufferToggleOpeningsSubscriber, _super);
      function BufferToggleOpeningsSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
      }
      BufferToggleOpeningsSubscriber.prototype._next = function(value) {
        this.parent.openBuffer(value);
      };
      BufferToggleOpeningsSubscriber.prototype._error = function(err) {
        this.parent.error(err);
      };
      BufferToggleOpeningsSubscriber.prototype._complete = function() {};
      return BufferToggleOpeningsSubscriber;
    })(Subscriber_1.Subscriber);
    var BufferToggleClosingsSubscriber = (function(_super) {
      __extends(BufferToggleClosingsSubscriber, _super);
      function BufferToggleClosingsSubscriber(parent, context) {
        _super.call(this, null);
        this.parent = parent;
        this.context = context;
      }
      BufferToggleClosingsSubscriber.prototype._next = function() {
        this.parent.closeBuffer(this.context);
      };
      BufferToggleClosingsSubscriber.prototype._error = function(err) {
        this.parent.error(err);
      };
      BufferToggleClosingsSubscriber.prototype._complete = function() {
        this.parent.closeBuffer(this.context);
      };
      return BufferToggleClosingsSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/bufferWhen", ["rxjs/Subscription", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscription_1 = require('../Subscription');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function bufferWhen(closingSelector) {
      return this.lift(new BufferWhenOperator(closingSelector));
    }
    exports.bufferWhen = bufferWhen;
    var BufferWhenOperator = (function() {
      function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
      }
      BufferWhenOperator.prototype.call = function(subscriber) {
        return new BufferWhenSubscriber(subscriber, this.closingSelector);
      };
      return BufferWhenOperator;
    })();
    var BufferWhenSubscriber = (function(_super) {
      __extends(BufferWhenSubscriber, _super);
      function BufferWhenSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.subscribing = false;
        this.openBuffer();
      }
      BufferWhenSubscriber.prototype._next = function(value) {
        this.buffer.push(value);
      };
      BufferWhenSubscriber.prototype._complete = function() {
        var buffer = this.buffer;
        if (buffer) {
          this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
      };
      BufferWhenSubscriber.prototype._unsubscribe = function() {
        this.buffer = null;
        this.subscribing = false;
      };
      BufferWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.openBuffer();
      };
      BufferWhenSubscriber.prototype.notifyComplete = function() {
        if (this.subscribing) {
          this.complete();
        } else {
          this.openBuffer();
        }
      };
      BufferWhenSubscriber.prototype.openBuffer = function() {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
          this.remove(closingSubscription);
          closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
          this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
          this.error(errorObject_1.errorObject.e);
        } else {
          closingSubscription = new Subscription_1.Subscription();
          this.closingSubscription = closingSubscription;
          this.add(closingSubscription);
          this.subscribing = true;
          closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
          this.subscribing = false;
        }
      };
      return BufferWhenSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/catch", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function _catch(selector) {
      var operator = new CatchOperator(selector);
      var caught = this.lift(operator);
      return (operator.caught = caught);
    }
    exports._catch = _catch;
    var CatchOperator = (function() {
      function CatchOperator(selector) {
        this.selector = selector;
      }
      CatchOperator.prototype.call = function(subscriber) {
        return new CatchSubscriber(subscriber, this.selector, this.caught);
      };
      return CatchOperator;
    })();
    var CatchSubscriber = (function(_super) {
      __extends(CatchSubscriber, _super);
      function CatchSubscriber(destination, selector, caught) {
        _super.call(this, destination);
        this.selector = selector;
        this.caught = caught;
      }
      CatchSubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var result = tryCatch_1.tryCatch(this.selector)(err, this.caught);
          if (result === errorObject_1.errorObject) {
            _super.prototype.error.call(this, errorObject_1.errorObject.e);
          } else {
            var destination = this.destination;
            this.unsubscribe();
            destination.remove(this);
            result.subscribe(this.destination);
          }
        }
      };
      return CatchSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/combineAll", ["rxjs/operator/combineLatest-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var combineLatest_support_1 = require('../operator/combineLatest-support');
    function combineAll(project) {
      return this.lift(new combineLatest_support_1.CombineLatestOperator(project));
    }
    exports.combineAll = combineAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/combineLatest", ["rxjs/observable/fromArray", "rxjs/operator/combineLatest-support", "rxjs/util/isArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var fromArray_1 = require('../observable/fromArray');
    var combineLatest_support_1 = require('../operator/combineLatest-support');
    var isArray_1 = require('../util/isArray');
    function combineLatest() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var project = null;
      if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
      }
      if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
      }
      observables.unshift(this);
      return new fromArray_1.ArrayObservable(observables).lift(new combineLatest_support_1.CombineLatestOperator(project));
    }
    exports.combineLatest = combineLatest;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/concat", ["rxjs/util/isScheduler", "rxjs/observable/fromArray", "rxjs/operator/mergeAll-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var isScheduler_1 = require('../util/isScheduler');
    var fromArray_1 = require('../observable/fromArray');
    var mergeAll_support_1 = require('../operator/mergeAll-support');
    function concat() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var args = observables;
      args.unshift(this);
      var scheduler = null;
      if (isScheduler_1.isScheduler(args[args.length - 1])) {
        scheduler = args.pop();
      }
      return new fromArray_1.ArrayObservable(args, scheduler).lift(new mergeAll_support_1.MergeAllOperator(1));
    }
    exports.concat = concat;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/concatAll", ["rxjs/operator/mergeAll-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeAll_support_1 = require('../operator/mergeAll-support');
    function concatAll() {
      return this.lift(new mergeAll_support_1.MergeAllOperator(1));
    }
    exports.concatAll = concatAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mergeMap-support", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/util/subscribeToResult", "rxjs/OuterSubscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var MergeMapOperator = (function() {
      function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
      }
      MergeMapOperator.prototype.call = function(observer) {
        return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
      };
      return MergeMapOperator;
    })();
    exports.MergeMapOperator = MergeMapOperator;
    var MergeMapSubscriber = (function(_super) {
      __extends(MergeMapSubscriber, _super);
      function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
      }
      MergeMapSubscriber.prototype._next = function(value) {
        if (this.active < this.concurrent) {
          var index = this.index++;
          var ish = tryCatch_1.tryCatch(this.project)(value, index);
          var destination = this.destination;
          if (ish === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            this.active++;
            this._innerSub(ish, value, index);
          }
        } else {
          this.buffer.push(value);
        }
      };
      MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
      };
      MergeMapSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
      };
      MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            destination = _a.destination,
            resultSelector = _a.resultSelector;
        if (resultSelector) {
          var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            destination.next(result);
          }
        } else {
          destination.next(innerValue);
        }
      };
      MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeMapSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    exports.MergeMapSubscriber = MergeMapSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mergeMapTo-support", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var MergeMapToOperator = (function() {
      function MergeMapToOperator(ish, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
      }
      MergeMapToOperator.prototype.call = function(observer) {
        return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
      };
      return MergeMapToOperator;
    })();
    exports.MergeMapToOperator = MergeMapToOperator;
    var MergeMapToSubscriber = (function(_super) {
      __extends(MergeMapToSubscriber, _super);
      function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
      }
      MergeMapToSubscriber.prototype._next = function(value) {
        if (this.active < this.concurrent) {
          var resultSelector = this.resultSelector;
          var index = this.index++;
          var ish = this.ish;
          var destination = this.destination;
          this.active++;
          this._innerSub(ish, destination, resultSelector, value, index);
        } else {
          this.buffer.push(value);
        }
      };
      MergeMapToSubscriber.prototype._innerSub = function(ish, destination, resultSelector, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
      };
      MergeMapToSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
      };
      MergeMapToSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        if (resultSelector) {
          var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            destination.next(result);
          }
        } else {
          destination.next(innerValue);
        }
      };
      MergeMapToSubscriber.prototype.notifyError = function(err) {
        this.destination.error(err);
      };
      MergeMapToSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeMapToSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    exports.MergeMapToSubscriber = MergeMapToSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/count", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function count(predicate) {
      return this.lift(new CountOperator(predicate, this));
    }
    exports.count = count;
    var CountOperator = (function() {
      function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
      }
      CountOperator.prototype.call = function(subscriber) {
        return new CountSubscriber(subscriber, this.predicate, this.source);
      };
      return CountOperator;
    })();
    var CountSubscriber = (function(_super) {
      __extends(CountSubscriber, _super);
      function CountSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.count = 0;
        this.index = 0;
      }
      CountSubscriber.prototype._next = function(value) {
        var predicate = this.predicate;
        var passed = true;
        if (predicate) {
          passed = tryCatch_1.tryCatch(predicate)(value, this.index++, this.source);
          if (passed === errorObject_1.errorObject) {
            this.destination.error(passed.e);
            return;
          }
        }
        if (passed) {
          this.count += 1;
        }
      };
      CountSubscriber.prototype._complete = function() {
        this.destination.next(this.count);
        this.destination.complete();
      };
      return CountSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/dematerialize", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function dematerialize() {
      return this.lift(new DeMaterializeOperator());
    }
    exports.dematerialize = dematerialize;
    var DeMaterializeOperator = (function() {
      function DeMaterializeOperator() {}
      DeMaterializeOperator.prototype.call = function(subscriber) {
        return new DeMaterializeSubscriber(subscriber);
      };
      return DeMaterializeOperator;
    })();
    var DeMaterializeSubscriber = (function(_super) {
      __extends(DeMaterializeSubscriber, _super);
      function DeMaterializeSubscriber(destination) {
        _super.call(this, destination);
      }
      DeMaterializeSubscriber.prototype._next = function(value) {
        value.observe(this.destination);
      };
      return DeMaterializeSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/debounce", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function debounce(durationSelector) {
      return this.lift(new DebounceOperator(durationSelector));
    }
    exports.debounce = debounce;
    var DebounceOperator = (function() {
      function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
      }
      DebounceOperator.prototype.call = function(subscriber) {
        return new DebounceSubscriber(subscriber, this.durationSelector);
      };
      return DebounceOperator;
    })();
    var DebounceSubscriber = (function(_super) {
      __extends(DebounceSubscriber, _super);
      function DebounceSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
        this.durationSubscription = null;
      }
      DebounceSubscriber.prototype._next = function(value) {
        var subscription = this.durationSubscription;
        var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
        if (duration === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else {
          this.value = value;
          this.hasValue = true;
          if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
          }
          subscription = subscribeToResult_1.subscribeToResult(this, duration);
          if (!subscription.isUnsubscribed) {
            this.add(this.durationSubscription = subscription);
          }
        }
      };
      DebounceSubscriber.prototype._complete = function() {
        this.emitValue();
        this.destination.complete();
      };
      DebounceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.emitValue();
      };
      DebounceSubscriber.prototype.notifyComplete = function() {
        this.emitValue();
      };
      DebounceSubscriber.prototype.emitValue = function() {
        if (this.hasValue) {
          var value = this.value;
          var subscription = this.durationSubscription;
          if (subscription) {
            this.durationSubscription = null;
            subscription.unsubscribe();
            this.remove(subscription);
          }
          this.value = null;
          this.hasValue = false;
          _super.prototype._next.call(this, value);
        }
      };
      return DebounceSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/debounceTime", ["rxjs/Subscriber", "rxjs/scheduler/asap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var asap_1 = require('../scheduler/asap');
    function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      return this.lift(new DebounceTimeOperator(dueTime, scheduler));
    }
    exports.debounceTime = debounceTime;
    var DebounceTimeOperator = (function() {
      function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
      }
      DebounceTimeOperator.prototype.call = function(subscriber) {
        return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
      };
      return DebounceTimeOperator;
    })();
    var DebounceTimeSubscriber = (function(_super) {
      __extends(DebounceTimeSubscriber, _super);
      function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
      }
      DebounceTimeSubscriber.prototype._next = function(value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
      };
      DebounceTimeSubscriber.prototype._complete = function() {
        this.debouncedNext();
        this.destination.complete();
      };
      DebounceTimeSubscriber.prototype.debouncedNext = function() {
        this.clearDebounce();
        if (this.hasValue) {
          this.destination.next(this.lastValue);
          this.lastValue = null;
          this.hasValue = false;
        }
      };
      DebounceTimeSubscriber.prototype.clearDebounce = function() {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
          this.remove(debouncedSubscription);
          debouncedSubscription.unsubscribe();
          this.debouncedSubscription = null;
        }
      };
      return DebounceTimeSubscriber;
    })(Subscriber_1.Subscriber);
    function dispatchNext(subscriber) {
      subscriber.debouncedNext();
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/defaultIfEmpty", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function defaultIfEmpty(defaultValue) {
      if (defaultValue === void 0) {
        defaultValue = null;
      }
      return this.lift(new DefaultIfEmptyOperator(defaultValue));
    }
    exports.defaultIfEmpty = defaultIfEmpty;
    var DefaultIfEmptyOperator = (function() {
      function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
      }
      DefaultIfEmptyOperator.prototype.call = function(subscriber) {
        return new DefaultIfEmptySubscriber(subscriber, this.defaultValue);
      };
      return DefaultIfEmptyOperator;
    })();
    var DefaultIfEmptySubscriber = (function(_super) {
      __extends(DefaultIfEmptySubscriber, _super);
      function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
      }
      DefaultIfEmptySubscriber.prototype._next = function(value) {
        this.isEmpty = false;
        this.destination.next(value);
      };
      DefaultIfEmptySubscriber.prototype._complete = function() {
        if (this.isEmpty) {
          this.destination.next(this.defaultValue);
        }
        this.destination.complete();
      };
      return DefaultIfEmptySubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/delay", ["rxjs/scheduler/asap", "rxjs/util/isDate", "rxjs/Subscriber", "rxjs/Notification"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var asap_1 = require('../scheduler/asap');
    var isDate_1 = require('../util/isDate');
    var Subscriber_1 = require('../Subscriber');
    var Notification_1 = require('../Notification');
    function delay(delay, scheduler) {
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      var absoluteDelay = isDate_1.isDate(delay);
      var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
      return this.lift(new DelayOperator(delayFor, scheduler));
    }
    exports.delay = delay;
    var DelayOperator = (function() {
      function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
      }
      DelayOperator.prototype.call = function(subscriber) {
        return new DelaySubscriber(subscriber, this.delay, this.scheduler);
      };
      return DelayOperator;
    })();
    var DelaySubscriber = (function(_super) {
      __extends(DelaySubscriber, _super);
      function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
      }
      DelaySubscriber.dispatch = function(state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
          queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
          var delay_1 = Math.max(0, queue[0].time - scheduler.now());
          this.schedule(state, delay_1);
        } else {
          source.active = false;
        }
      };
      DelaySubscriber.prototype._schedule = function(scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
          source: this,
          destination: this.destination,
          scheduler: scheduler
        }));
      };
      DelaySubscriber.prototype.scheduleNotification = function(notification) {
        if (this.errored === true) {
          return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
          this._schedule(scheduler);
        }
      };
      DelaySubscriber.prototype._next = function(value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
      };
      DelaySubscriber.prototype._error = function(err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
      };
      DelaySubscriber.prototype._complete = function() {
        this.scheduleNotification(Notification_1.Notification.createComplete());
      };
      return DelaySubscriber;
    })(Subscriber_1.Subscriber);
    var DelayMessage = (function() {
      function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
      }
      return DelayMessage;
    })();
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/distinctUntilChanged", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function distinctUntilChanged(compare, keySelector) {
      return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
    }
    exports.distinctUntilChanged = distinctUntilChanged;
    var DistinctUntilChangedOperator = (function() {
      function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
      }
      DistinctUntilChangedOperator.prototype.call = function(subscriber) {
        return new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector);
      };
      return DistinctUntilChangedOperator;
    })();
    var DistinctUntilChangedSubscriber = (function(_super) {
      __extends(DistinctUntilChangedSubscriber, _super);
      function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
          this.compare = compare;
        }
      }
      DistinctUntilChangedSubscriber.prototype.compare = function(x, y) {
        return x === y;
      };
      DistinctUntilChangedSubscriber.prototype._next = function(value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
          key = tryCatch_1.tryCatch(this.keySelector)(value);
          if (key === errorObject_1.errorObject) {
            return this.destination.error(errorObject_1.errorObject.e);
          }
        }
        var result = false;
        if (this.hasKey) {
          result = tryCatch_1.tryCatch(this.compare)(this.key, key);
          if (result === errorObject_1.errorObject) {
            return this.destination.error(errorObject_1.errorObject.e);
          }
        } else {
          this.hasKey = true;
        }
        if (Boolean(result) === false) {
          this.key = key;
          this.destination.next(value);
        }
      };
      return DistinctUntilChangedSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/do", ["rxjs/Subscriber", "rxjs/util/noop", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var noop_1 = require('../util/noop');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function _do(nextOrObserver, error, complete) {
      var next;
      if (nextOrObserver && typeof nextOrObserver === 'object') {
        next = nextOrObserver.next;
        error = nextOrObserver.error;
        complete = nextOrObserver.complete;
      } else {
        next = nextOrObserver;
      }
      return this.lift(new DoOperator(next || noop_1.noop, error || noop_1.noop, complete || noop_1.noop));
    }
    exports._do = _do;
    var DoOperator = (function() {
      function DoOperator(next, error, complete) {
        this.next = next;
        this.error = error;
        this.complete = complete;
      }
      DoOperator.prototype.call = function(subscriber) {
        return new DoSubscriber(subscriber, this.next, this.error, this.complete);
      };
      return DoOperator;
    })();
    var DoSubscriber = (function(_super) {
      __extends(DoSubscriber, _super);
      function DoSubscriber(destination, next, error, complete) {
        _super.call(this, destination);
        this.__next = next;
        this.__error = error;
        this.__complete = complete;
      }
      DoSubscriber.prototype._next = function(x) {
        var result = tryCatch_1.tryCatch(this.__next)(x);
        if (result === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else {
          this.destination.next(x);
        }
      };
      DoSubscriber.prototype._error = function(e) {
        var result = tryCatch_1.tryCatch(this.__error)(e);
        if (result === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else {
          this.destination.error(e);
        }
      };
      DoSubscriber.prototype._complete = function() {
        var result = tryCatch_1.tryCatch(this.__complete)();
        if (result === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else {
          this.destination.complete();
        }
      };
      return DoSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/expand-support", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var ExpandOperator = (function() {
      function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
      }
      ExpandOperator.prototype.call = function(subscriber) {
        return new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler);
      };
      return ExpandOperator;
    })();
    exports.ExpandOperator = ExpandOperator;
    var ExpandSubscriber = (function(_super) {
      __extends(ExpandSubscriber, _super);
      function ExpandSubscriber(destination, project, concurrent, scheduler) {
        _super.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
          this.buffer = [];
        }
      }
      ExpandSubscriber.dispatch = function(_a) {
        var subscriber = _a.subscriber,
            result = _a.result,
            value = _a.value,
            index = _a.index;
        subscriber.subscribeToProjection(result, value, index);
      };
      ExpandSubscriber.prototype._next = function(value) {
        var destination = this.destination;
        if (destination.isUnsubscribed) {
          this._complete();
          return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
          destination.next(value);
          var result = tryCatch_1.tryCatch(this.project)(value, index);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else if (!this.scheduler) {
            this.subscribeToProjection(result, value, index);
          } else {
            var state = {
              subscriber: this,
              result: result,
              value: value,
              index: index
            };
            this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
          }
        } else {
          this.buffer.push(value);
        }
      };
      ExpandSubscriber.prototype.subscribeToProjection = function(result, value, index) {
        if (result._isScalar) {
          this._next(result.value);
        } else {
          this.active++;
          this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
        }
      };
      ExpandSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };
      ExpandSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this._next(innerValue);
      };
      ExpandSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
          this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };
      return ExpandSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    exports.ExpandSubscriber = ExpandSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/filter", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function filter(select, thisArg) {
      return this.lift(new FilterOperator(select, thisArg));
    }
    exports.filter = filter;
    var FilterOperator = (function() {
      function FilterOperator(select, thisArg) {
        this.select = select;
        this.thisArg = thisArg;
      }
      FilterOperator.prototype.call = function(subscriber) {
        return new FilterSubscriber(subscriber, this.select, this.thisArg);
      };
      return FilterOperator;
    })();
    var FilterSubscriber = (function(_super) {
      __extends(FilterSubscriber, _super);
      function FilterSubscriber(destination, select, thisArg) {
        _super.call(this, destination);
        this.select = select;
        this.thisArg = thisArg;
        this.count = 0;
        this.select = select;
      }
      FilterSubscriber.prototype._next = function(x) {
        var result = tryCatch_1.tryCatch(this.select).call(this.thisArg || this, x, this.count++);
        if (result === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else if (Boolean(result)) {
          this.destination.next(x);
        }
      };
      return FilterSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/finally", ["rxjs/Subscriber", "rxjs/Subscription"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Subscription_1 = require('../Subscription');
    function _finally(finallySelector) {
      return this.lift(new FinallyOperator(finallySelector));
    }
    exports._finally = _finally;
    var FinallyOperator = (function() {
      function FinallyOperator(finallySelector) {
        this.finallySelector = finallySelector;
      }
      FinallyOperator.prototype.call = function(subscriber) {
        return new FinallySubscriber(subscriber, this.finallySelector);
      };
      return FinallyOperator;
    })();
    var FinallySubscriber = (function(_super) {
      __extends(FinallySubscriber, _super);
      function FinallySubscriber(destination, finallySelector) {
        _super.call(this, destination);
        this.add(new Subscription_1.Subscription(finallySelector));
      }
      return FinallySubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/EmptyError", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var EmptyError = (function() {
      function EmptyError() {
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
      }
      return EmptyError;
    })();
    exports.EmptyError = EmptyError;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/MapPolyfill", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var MapPolyfill = (function() {
      function MapPolyfill() {
        this.size = 0;
        this._values = [];
        this._keys = [];
      }
      MapPolyfill.prototype.get = function(key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
      };
      MapPolyfill.prototype.set = function(key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          this._keys.push(key);
          this._values.push(value);
          this.size++;
        } else {
          this._values[i] = value;
        }
        return this;
      };
      MapPolyfill.prototype.delete = function(key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
      };
      MapPolyfill.prototype.forEach = function(cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
          cb.call(thisArg, this._values[i], this._keys[i]);
        }
      };
      return MapPolyfill;
    })();
    exports.MapPolyfill = MapPolyfill;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/FastMap", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var FastMap = (function() {
      function FastMap() {
        this.values = {};
      }
      FastMap.prototype.delete = function(key) {
        this.values[key] = null;
        return true;
      };
      FastMap.prototype.set = function(key, value) {
        this.values[key] = value;
        return this;
      };
      FastMap.prototype.get = function(key) {
        return this.values[key];
      };
      FastMap.prototype.forEach = function(cb, thisArg) {
        var values = this.values;
        for (var key in values) {
          if (values.hasOwnProperty(key) && values[key] !== null) {
            cb.call(thisArg, values[key], key);
          }
        }
      };
      FastMap.prototype.clear = function() {
        this.values = {};
      };
      return FastMap;
    })();
    exports.FastMap = FastMap;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/groupBy-support", ["rxjs/Subscription", "rxjs/Observable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscription_1 = require('../Subscription');
    var Observable_1 = require('../Observable');
    var RefCountSubscription = (function(_super) {
      __extends(RefCountSubscription, _super);
      function RefCountSubscription() {
        _super.call(this);
        this.attemptedToUnsubscribePrimary = false;
        this.count = 0;
      }
      RefCountSubscription.prototype.setPrimary = function(subscription) {
        this.primary = subscription;
      };
      RefCountSubscription.prototype.unsubscribe = function() {
        if (!this.isUnsubscribed && !this.attemptedToUnsubscribePrimary) {
          this.attemptedToUnsubscribePrimary = true;
          if (this.count === 0) {
            _super.prototype.unsubscribe.call(this);
            this.primary.unsubscribe();
          }
        }
      };
      return RefCountSubscription;
    })(Subscription_1.Subscription);
    exports.RefCountSubscription = RefCountSubscription;
    var GroupedObservable = (function(_super) {
      __extends(GroupedObservable, _super);
      function GroupedObservable(key, groupSubject, refCountSubscription) {
        _super.call(this);
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
      }
      GroupedObservable.prototype._subscribe = function(subscriber) {
        var subscription = new Subscription_1.Subscription();
        if (this.refCountSubscription && !this.refCountSubscription.isUnsubscribed) {
          subscription.add(new InnerRefCountSubscription(this.refCountSubscription));
        }
        subscription.add(this.groupSubject.subscribe(subscriber));
        return subscription;
      };
      return GroupedObservable;
    })(Observable_1.Observable);
    exports.GroupedObservable = GroupedObservable;
    var InnerRefCountSubscription = (function(_super) {
      __extends(InnerRefCountSubscription, _super);
      function InnerRefCountSubscription(parent) {
        _super.call(this);
        this.parent = parent;
        parent.count++;
      }
      InnerRefCountSubscription.prototype.unsubscribe = function() {
        if (!this.parent.isUnsubscribed && !this.isUnsubscribed) {
          _super.prototype.unsubscribe.call(this);
          this.parent.count--;
          if (this.parent.count === 0 && this.parent.attemptedToUnsubscribePrimary) {
            this.parent.unsubscribe();
            this.parent.primary.unsubscribe();
          }
        }
      };
      return InnerRefCountSubscription;
    })(Subscription_1.Subscription);
    exports.InnerRefCountSubscription = InnerRefCountSubscription;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/ignoreElements", ["rxjs/Subscriber", "rxjs/util/noop"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var noop_1 = require('../util/noop');
    function ignoreElements() {
      return this.lift(new IgnoreElementsOperator());
    }
    exports.ignoreElements = ignoreElements;
    ;
    var IgnoreElementsOperator = (function() {
      function IgnoreElementsOperator() {}
      IgnoreElementsOperator.prototype.call = function(subscriber) {
        return new IgnoreElementsSubscriber(subscriber);
      };
      return IgnoreElementsOperator;
    })();
    var IgnoreElementsSubscriber = (function(_super) {
      __extends(IgnoreElementsSubscriber, _super);
      function IgnoreElementsSubscriber() {
        _super.apply(this, arguments);
      }
      IgnoreElementsSubscriber.prototype._next = function(unused) {
        noop_1.noop();
      };
      return IgnoreElementsSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/every", ["rxjs/observable/ScalarObservable", "rxjs/observable/fromArray", "rxjs/observable/throw", "rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ScalarObservable_1 = require('../observable/ScalarObservable');
    var fromArray_1 = require('../observable/fromArray');
    var throw_1 = require('../observable/throw');
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function every(predicate, thisArg) {
      var source = this;
      if (source._isScalar) {
        var result = tryCatch_1.tryCatch(predicate).call(thisArg || this, source.value, 0, source);
        if (result === errorObject_1.errorObject) {
          return new throw_1.ErrorObservable(errorObject_1.errorObject.e, source.scheduler);
        } else {
          return new ScalarObservable_1.ScalarObservable(result, source.scheduler);
        }
      }
      if (source instanceof fromArray_1.ArrayObservable) {
        var array = source.array;
        var result = tryCatch_1.tryCatch(function(array, predicate, thisArg) {
          return array.every(predicate, thisArg);
        })(array, predicate, thisArg);
        if (result === errorObject_1.errorObject) {
          return new throw_1.ErrorObservable(errorObject_1.errorObject.e, source.scheduler);
        } else {
          return new ScalarObservable_1.ScalarObservable(result, source.scheduler);
        }
      }
      return source.lift(new EveryOperator(predicate, thisArg, source));
    }
    exports.every = every;
    var EveryOperator = (function() {
      function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
      }
      EveryOperator.prototype.call = function(observer) {
        return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
      };
      return EveryOperator;
    })();
    var EverySubscriber = (function(_super) {
      __extends(EverySubscriber, _super);
      function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
      }
      EverySubscriber.prototype.notifyComplete = function(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
      };
      EverySubscriber.prototype._next = function(value) {
        var result = tryCatch_1.tryCatch(this.predicate).call(this.thisArg || this, value, this.index++, this.source);
        if (result === errorObject_1.errorObject) {
          this.destination.error(result.e);
        } else if (!result) {
          this.notifyComplete(false);
        }
      };
      EverySubscriber.prototype._complete = function() {
        this.notifyComplete(true);
      };
      return EverySubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/last", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/util/EmptyError"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var EmptyError_1 = require('../util/EmptyError');
    function last(predicate, resultSelector, defaultValue) {
      return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
    }
    exports.last = last;
    var LastOperator = (function() {
      function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
      }
      LastOperator.prototype.call = function(observer) {
        return new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
      };
      return LastOperator;
    })();
    var LastSubscriber = (function(_super) {
      __extends(LastSubscriber, _super);
      function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
          this.lastValue = defaultValue;
          this.hasValue = true;
        }
      }
      LastSubscriber.prototype._next = function(value) {
        var _a = this,
            predicate = _a.predicate,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        var index = this.index++;
        if (predicate) {
          var found = tryCatch_1.tryCatch(predicate)(value, index, this.source);
          if (found === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
            return;
          }
          if (found) {
            if (resultSelector) {
              var result = tryCatch_1.tryCatch(resultSelector)(value, index);
              if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
                return;
              }
              this.lastValue = result;
            } else {
              this.lastValue = value;
            }
            this.hasValue = true;
          }
        } else {
          this.lastValue = value;
          this.hasValue = true;
        }
      };
      LastSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (this.hasValue) {
          destination.next(this.lastValue);
          destination.complete();
        } else {
          destination.error(new EmptyError_1.EmptyError);
        }
      };
      return LastSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/let", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function letProto(func) {
      return func(this);
    }
    exports.letProto = letProto;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/map", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function map(project, thisArg) {
      if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
      }
      return this.lift(new MapOperator(project, thisArg));
    }
    exports.map = map;
    var MapOperator = (function() {
      function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
      }
      MapOperator.prototype.call = function(subscriber) {
        return new MapSubscriber(subscriber, this.project, this.thisArg);
      };
      return MapOperator;
    })();
    var MapSubscriber = (function(_super) {
      __extends(MapSubscriber, _super);
      function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.thisArg = thisArg;
        this.count = 0;
      }
      MapSubscriber.prototype._next = function(x) {
        var result = tryCatch_1.tryCatch(this.project).call(this.thisArg || this, x, this.count++);
        if (result === errorObject_1.errorObject) {
          this.error(errorObject_1.errorObject.e);
        } else {
          this.destination.next(result);
        }
      };
      return MapSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mapTo", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function mapTo(value) {
      return this.lift(new MapToOperator(value));
    }
    exports.mapTo = mapTo;
    var MapToOperator = (function() {
      function MapToOperator(value) {
        this.value = value;
      }
      MapToOperator.prototype.call = function(subscriber) {
        return new MapToSubscriber(subscriber, this.value);
      };
      return MapToOperator;
    })();
    var MapToSubscriber = (function(_super) {
      __extends(MapToSubscriber, _super);
      function MapToSubscriber(destination, value) {
        _super.call(this, destination);
        this.value = value;
      }
      MapToSubscriber.prototype._next = function(x) {
        this.destination.next(this.value);
      };
      return MapToSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/materialize", ["rxjs/Subscriber", "rxjs/Notification"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Notification_1 = require('../Notification');
    function materialize() {
      return this.lift(new MaterializeOperator());
    }
    exports.materialize = materialize;
    var MaterializeOperator = (function() {
      function MaterializeOperator() {}
      MaterializeOperator.prototype.call = function(subscriber) {
        return new MaterializeSubscriber(subscriber);
      };
      return MaterializeOperator;
    })();
    var MaterializeSubscriber = (function(_super) {
      __extends(MaterializeSubscriber, _super);
      function MaterializeSubscriber(destination) {
        _super.call(this, destination);
      }
      MaterializeSubscriber.prototype._next = function(value) {
        this.destination.next(Notification_1.Notification.createNext(value));
      };
      MaterializeSubscriber.prototype._error = function(err) {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
      };
      MaterializeSubscriber.prototype._complete = function() {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
      };
      return MaterializeSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/merge", ["rxjs/operator/merge-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var merge_static_1 = require('../operator/merge-static');
    function merge() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      observables.unshift(this);
      return merge_static_1.merge.apply(this, observables);
    }
    exports.merge = merge;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mergeAll", ["rxjs/operator/mergeAll-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeAll_support_1 = require('../operator/mergeAll-support');
    function mergeAll(concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      return this.lift(new mergeAll_support_1.MergeAllOperator(concurrent));
    }
    exports.mergeAll = mergeAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mergeMap", ["rxjs/operator/mergeMap-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeMap_support_1 = require('../operator/mergeMap-support');
    function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      return this.lift(new mergeMap_support_1.MergeMapOperator(project, resultSelector, concurrent));
    }
    exports.mergeMap = mergeMap;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/mergeMapTo", ["rxjs/operator/mergeMapTo-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeMapTo_support_1 = require('../operator/mergeMapTo-support');
    function mergeMapTo(observable, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, concurrent));
    }
    exports.mergeMapTo = mergeMapTo;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/ConnectableObservable", ["rxjs/Observable", "rxjs/Subscriber", "rxjs/Subscription"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var Subscriber_1 = require('../Subscriber');
    var Subscription_1 = require('../Subscription');
    var ConnectableObservable = (function(_super) {
      __extends(ConnectableObservable, _super);
      function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
      }
      ConnectableObservable.prototype._subscribe = function(subscriber) {
        return this._getSubject().subscribe(subscriber);
      };
      ConnectableObservable.prototype._getSubject = function() {
        var subject = this.subject;
        if (subject && !subject.isUnsubscribed) {
          return subject;
        }
        return (this.subject = this.subjectFactory());
      };
      ConnectableObservable.prototype.connect = function() {
        var source = this.source;
        var subscription = this.subscription;
        if (subscription && !subscription.isUnsubscribed) {
          return subscription;
        }
        subscription = source.subscribe(this._getSubject());
        subscription.add(new ConnectableSubscription(this));
        return (this.subscription = subscription);
      };
      ConnectableObservable.prototype.refCount = function() {
        return new RefCountObservable(this);
      };
      return ConnectableObservable;
    })(Observable_1.Observable);
    exports.ConnectableObservable = ConnectableObservable;
    var ConnectableSubscription = (function(_super) {
      __extends(ConnectableSubscription, _super);
      function ConnectableSubscription(connectable) {
        _super.call(this);
        this.connectable = connectable;
      }
      ConnectableSubscription.prototype._unsubscribe = function() {
        var connectable = this.connectable;
        connectable.subject = null;
        connectable.subscription = null;
        this.connectable = null;
      };
      return ConnectableSubscription;
    })(Subscription_1.Subscription);
    var RefCountObservable = (function(_super) {
      __extends(RefCountObservable, _super);
      function RefCountObservable(connectable, refCount) {
        if (refCount === void 0) {
          refCount = 0;
        }
        _super.call(this);
        this.connectable = connectable;
        this.refCount = refCount;
      }
      RefCountObservable.prototype._subscribe = function(subscriber) {
        var connectable = this.connectable;
        var refCountSubscriber = new RefCountSubscriber(subscriber, this);
        var subscription = connectable.subscribe(refCountSubscriber);
        if (!subscription.isUnsubscribed && ++this.refCount === 1) {
          refCountSubscriber.connection = this.connection = connectable.connect();
        }
        return subscription;
      };
      return RefCountObservable;
    })(Observable_1.Observable);
    var RefCountSubscriber = (function(_super) {
      __extends(RefCountSubscriber, _super);
      function RefCountSubscriber(destination, refCountObservable) {
        _super.call(this, null);
        this.destination = destination;
        this.refCountObservable = refCountObservable;
        this.connection = refCountObservable.connection;
        destination.add(this);
      }
      RefCountSubscriber.prototype._next = function(value) {
        this.destination.next(value);
      };
      RefCountSubscriber.prototype._error = function(err) {
        this._resetConnectable();
        this.destination.error(err);
      };
      RefCountSubscriber.prototype._complete = function() {
        this._resetConnectable();
        this.destination.complete();
      };
      RefCountSubscriber.prototype._resetConnectable = function() {
        var observable = this.refCountObservable;
        var obsConnection = observable.connection;
        var subConnection = this.connection;
        if (subConnection && subConnection === obsConnection) {
          observable.refCount = 0;
          obsConnection.unsubscribe();
          observable.connection = null;
          this.unsubscribe();
        }
      };
      RefCountSubscriber.prototype._unsubscribe = function() {
        var observable = this.refCountObservable;
        if (observable.refCount === 0) {
          return;
        }
        if (--observable.refCount === 0) {
          var obsConnection = observable.connection;
          var subConnection = this.connection;
          if (subConnection && subConnection === obsConnection) {
            obsConnection.unsubscribe();
            observable.connection = null;
          }
        }
      };
      return RefCountSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/observeOn", ["rxjs/operator/observeOn-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var observeOn_support_1 = require('../operator/observeOn-support');
    function observeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this.lift(new observeOn_support_1.ObserveOnOperator(scheduler, delay));
    }
    exports.observeOn = observeOn;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/not", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    function not(pred, thisArg) {
      function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
      }
      notPred.pred = pred;
      notPred.thisArg = thisArg;
      return notPred;
    }
    exports.not = not;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/pluck", ["rxjs/operator/map"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var map_1 = require('../operator/map');
    function pluck() {
      var properties = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
      }
      var length = properties.length;
      if (length === 0) {
        throw new Error('List of properties cannot be empty.');
      }
      return map_1.map.call(this, plucker(properties, length));
    }
    exports.pluck = pluck;
    function plucker(props, length) {
      var mapper = function(x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
          var p = currentProp[props[i]];
          if (typeof p !== 'undefined') {
            currentProp = p;
          } else {
            return undefined;
          }
        }
        return currentProp;
      };
      return mapper;
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/publish", ["rxjs/Subject", "rxjs/operator/multicast"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Subject_1 = require('../Subject');
    var multicast_1 = require('../operator/multicast');
    function publish() {
      return multicast_1.multicast.call(this, new Subject_1.Subject());
    }
    exports.publish = publish;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/ObjectUnsubscribedError", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ObjectUnsubscribedError = (function(_super) {
      __extends(ObjectUnsubscribedError, _super);
      function ObjectUnsubscribedError() {
        _super.call(this, 'object unsubscribed');
        this.name = 'ObjectUnsubscribedError';
      }
      return ObjectUnsubscribedError;
    })(Error);
    exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/queue", ["rxjs/scheduler/QueueScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var QueueScheduler_1 = require('../scheduler/QueueScheduler');
    exports.queue = new QueueScheduler_1.QueueScheduler();
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/publishLast", ["rxjs/subject/AsyncSubject", "rxjs/operator/multicast"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var AsyncSubject_1 = require('../subject/AsyncSubject');
    var multicast_1 = require('../operator/multicast');
    function publishLast() {
      return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
    }
    exports.publishLast = publishLast;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/race", ["rxjs/operator/race-static", "rxjs/util/isArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var race_static_1 = require('../operator/race-static');
    var isArray_1 = require('../util/isArray');
    function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
      }
      observables.unshift(this);
      return race_static_1.race.apply(this, observables);
    }
    exports.race = race;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/reduce-support", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var ReduceOperator = (function() {
      function ReduceOperator(project, seed) {
        this.project = project;
        this.seed = seed;
      }
      ReduceOperator.prototype.call = function(subscriber) {
        return new ReduceSubscriber(subscriber, this.project, this.seed);
      };
      return ReduceOperator;
    })();
    exports.ReduceOperator = ReduceOperator;
    var ReduceSubscriber = (function(_super) {
      __extends(ReduceSubscriber, _super);
      function ReduceSubscriber(destination, project, seed) {
        _super.call(this, destination);
        this.hasValue = false;
        this.acc = seed;
        this.project = project;
        this.hasSeed = typeof seed !== 'undefined';
      }
      ReduceSubscriber.prototype._next = function(x) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
          var result = tryCatch_1.tryCatch(this.project).call(this, this.acc, x);
          if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
          } else {
            this.acc = result;
          }
        } else {
          this.acc = x;
          this.hasValue = true;
        }
      };
      ReduceSubscriber.prototype._complete = function() {
        if (this.hasValue || this.hasSeed) {
          this.destination.next(this.acc);
        }
        this.destination.complete();
      };
      return ReduceSubscriber;
    })(Subscriber_1.Subscriber);
    exports.ReduceSubscriber = ReduceSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/repeat", ["rxjs/Subscriber", "rxjs/observable/empty"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var empty_1 = require('../observable/empty');
    function repeat(count) {
      if (count === void 0) {
        count = -1;
      }
      if (count === 0) {
        return new empty_1.EmptyObservable();
      } else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
      } else {
        return this.lift(new RepeatOperator(count - 1, this));
      }
    }
    exports.repeat = repeat;
    var RepeatOperator = (function() {
      function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
      }
      RepeatOperator.prototype.call = function(subscriber) {
        return new RepeatSubscriber(subscriber, this.count, this.source);
      };
      return RepeatOperator;
    })();
    var RepeatSubscriber = (function(_super) {
      __extends(RepeatSubscriber, _super);
      function RepeatSubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
      }
      RepeatSubscriber.prototype.complete = function() {
        if (!this.isStopped) {
          var _a = this,
              source = _a.source,
              count = _a.count;
          if (count === 0) {
            return _super.prototype.complete.call(this);
          } else if (count > -1) {
            this.count = count - 1;
          }
          this.unsubscribe();
          this.isStopped = false;
          this.isUnsubscribed = false;
          source.subscribe(this);
        }
      };
      return RepeatSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/retry", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function retry(count) {
      if (count === void 0) {
        count = -1;
      }
      return this.lift(new RetryOperator(count, this));
    }
    exports.retry = retry;
    var RetryOperator = (function() {
      function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
      }
      RetryOperator.prototype.call = function(subscriber) {
        return new RetrySubscriber(subscriber, this.count, this.source);
      };
      return RetryOperator;
    })();
    var RetrySubscriber = (function(_super) {
      __extends(RetrySubscriber, _super);
      function RetrySubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
      }
      RetrySubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var _a = this,
              source = _a.source,
              count = _a.count;
          if (count === 0) {
            return _super.prototype.error.call(this, err);
          } else if (count > -1) {
            this.count = count - 1;
          }
          this.unsubscribe();
          this.isStopped = false;
          this.isUnsubscribed = false;
          source.subscribe(this);
        }
      };
      return RetrySubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/retryWhen", ["rxjs/Subject", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1 = require('../Subject');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function retryWhen(notifier) {
      return this.lift(new RetryWhenOperator(notifier, this));
    }
    exports.retryWhen = retryWhen;
    var RetryWhenOperator = (function() {
      function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
      }
      RetryWhenOperator.prototype.call = function(subscriber) {
        return new RetryWhenSubscriber(subscriber, this.notifier, this.source);
      };
      return RetryWhenOperator;
    })();
    var RetryWhenSubscriber = (function(_super) {
      __extends(RetryWhenSubscriber, _super);
      function RetryWhenSubscriber(destination, notifier, source) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.source = source;
      }
      RetryWhenSubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var errors = this.errors;
          var retries = this.retries;
          var retriesSubscription = this.retriesSubscription;
          if (!retries) {
            errors = new Subject_1.Subject();
            retries = tryCatch_1.tryCatch(this.notifier)(errors);
            if (retries === errorObject_1.errorObject) {
              return _super.prototype.error.call(this, errorObject_1.errorObject.e);
            }
            retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
          } else {
            this.errors = null;
            this.retriesSubscription = null;
          }
          this.unsubscribe();
          this.isUnsubscribed = false;
          this.errors = errors;
          this.retries = retries;
          this.retriesSubscription = retriesSubscription;
          errors.next(err);
        }
      };
      RetryWhenSubscriber.prototype._unsubscribe = function() {
        var _a = this,
            errors = _a.errors,
            retriesSubscription = _a.retriesSubscription;
        if (errors) {
          errors.unsubscribe();
          this.errors = null;
        }
        if (retriesSubscription) {
          retriesSubscription.unsubscribe();
          this.retriesSubscription = null;
        }
        this.retries = null;
      };
      RetryWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            errors = _a.errors,
            retries = _a.retries,
            retriesSubscription = _a.retriesSubscription;
        this.errors = null;
        this.retries = null;
        this.retriesSubscription = null;
        this.unsubscribe();
        this.isStopped = false;
        this.isUnsubscribed = false;
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
      };
      return RetryWhenSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/sample", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function sample(notifier) {
      return this.lift(new SampleOperator(notifier));
    }
    exports.sample = sample;
    var SampleOperator = (function() {
      function SampleOperator(notifier) {
        this.notifier = notifier;
      }
      SampleOperator.prototype.call = function(subscriber) {
        return new SampleSubscriber(subscriber, this.notifier);
      };
      return SampleOperator;
    })();
    var SampleSubscriber = (function(_super) {
      __extends(SampleSubscriber, _super);
      function SampleSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.hasValue = false;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
      }
      SampleSubscriber.prototype._next = function(value) {
        this.value = value;
        this.hasValue = true;
      };
      SampleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.emitValue();
      };
      SampleSubscriber.prototype.notifyComplete = function() {
        this.emitValue();
      };
      SampleSubscriber.prototype.emitValue = function() {
        if (this.hasValue) {
          this.hasValue = false;
          this.destination.next(this.value);
        }
      };
      return SampleSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/sampleTime", ["rxjs/Subscriber", "rxjs/scheduler/asap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var asap_1 = require('../scheduler/asap');
    function sampleTime(delay, scheduler) {
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      return this.lift(new SampleTimeOperator(delay, scheduler));
    }
    exports.sampleTime = sampleTime;
    var SampleTimeOperator = (function() {
      function SampleTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
      }
      SampleTimeOperator.prototype.call = function(subscriber) {
        return new SampleTimeSubscriber(subscriber, this.delay, this.scheduler);
      };
      return SampleTimeOperator;
    })();
    var SampleTimeSubscriber = (function(_super) {
      __extends(SampleTimeSubscriber, _super);
      function SampleTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, delay, {
          subscriber: this,
          delay: delay
        }));
      }
      SampleTimeSubscriber.prototype._next = function(value) {
        this.lastValue = value;
        this.hasValue = true;
      };
      SampleTimeSubscriber.prototype.notifyNext = function() {
        if (this.hasValue) {
          this.hasValue = false;
          this.destination.next(this.lastValue);
        }
      };
      return SampleTimeSubscriber;
    })(Subscriber_1.Subscriber);
    function dispatchNotification(state) {
      var subscriber = state.subscriber,
          delay = state.delay;
      subscriber.notifyNext();
      this.schedule(state, delay);
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/scan", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function scan(accumulator, seed) {
      return this.lift(new ScanOperator(accumulator, seed));
    }
    exports.scan = scan;
    var ScanOperator = (function() {
      function ScanOperator(accumulator, seed) {
        this.accumulator = accumulator;
        this.seed = seed;
      }
      ScanOperator.prototype.call = function(subscriber) {
        return new ScanSubscriber(subscriber, this.accumulator, this.seed);
      };
      return ScanOperator;
    })();
    var ScanSubscriber = (function(_super) {
      __extends(ScanSubscriber, _super);
      function ScanSubscriber(destination, accumulator, seed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.accumulatorSet = false;
        this.seed = seed;
        this.accumulator = accumulator;
        this.accumulatorSet = typeof seed !== 'undefined';
      }
      Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function() {
          return this._seed;
        },
        set: function(value) {
          this.accumulatorSet = true;
          this._seed = value;
        },
        enumerable: true,
        configurable: true
      });
      ScanSubscriber.prototype._next = function(value) {
        if (!this.accumulatorSet) {
          this.seed = value;
          this.destination.next(value);
        } else {
          var result = tryCatch_1.tryCatch(this.accumulator).call(this, this.seed, value);
          if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
          } else {
            this.seed = result;
            this.destination.next(this.seed);
          }
        }
      };
      return ScanSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/share", ["rxjs/operator/multicast", "rxjs/Subject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var multicast_1 = require('../operator/multicast');
    var Subject_1 = require('../Subject');
    function shareSubjectFactory() {
      return new Subject_1.Subject();
    }
    function share() {
      return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
    }
    exports.share = share;
    ;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/single", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/util/EmptyError"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var EmptyError_1 = require('../util/EmptyError');
    function single(predicate) {
      return this.lift(new SingleOperator(predicate, this));
    }
    exports.single = single;
    var SingleOperator = (function() {
      function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
      }
      SingleOperator.prototype.call = function(subscriber) {
        return new SingleSubscriber(subscriber, this.predicate, this.source);
      };
      return SingleOperator;
    })();
    var SingleSubscriber = (function(_super) {
      __extends(SingleSubscriber, _super);
      function SingleSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
      }
      SingleSubscriber.prototype.applySingleValue = function(value) {
        if (this.seenValue) {
          this.destination.error('Sequence contains more than one element');
        } else {
          this.seenValue = true;
          this.singleValue = value;
        }
      };
      SingleSubscriber.prototype._next = function(value) {
        var predicate = this.predicate;
        var currentIndex = this.index++;
        if (predicate) {
          var result = tryCatch_1.tryCatch(predicate)(value, currentIndex, this.source);
          if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
          } else if (result) {
            this.applySingleValue(value);
          }
        } else {
          this.applySingleValue(value);
        }
      };
      SingleSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (this.index > 0) {
          destination.next(this.seenValue ? this.singleValue : undefined);
          destination.complete();
        } else {
          destination.error(new EmptyError_1.EmptyError);
        }
      };
      return SingleSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/skip", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function skip(total) {
      return this.lift(new SkipOperator(total));
    }
    exports.skip = skip;
    var SkipOperator = (function() {
      function SkipOperator(total) {
        this.total = total;
      }
      SkipOperator.prototype.call = function(subscriber) {
        return new SkipSubscriber(subscriber, this.total);
      };
      return SkipOperator;
    })();
    var SkipSubscriber = (function(_super) {
      __extends(SkipSubscriber, _super);
      function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
      }
      SkipSubscriber.prototype._next = function(x) {
        if (++this.count > this.total) {
          this.destination.next(x);
        }
      };
      return SkipSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/skipUntil", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function skipUntil(notifier) {
      return this.lift(new SkipUntilOperator(notifier));
    }
    exports.skipUntil = skipUntil;
    var SkipUntilOperator = (function() {
      function SkipUntilOperator(notifier) {
        this.notifier = notifier;
      }
      SkipUntilOperator.prototype.call = function(subscriber) {
        return new SkipUntilSubscriber(subscriber, this.notifier);
      };
      return SkipUntilOperator;
    })();
    var SkipUntilSubscriber = (function(_super) {
      __extends(SkipUntilSubscriber, _super);
      function SkipUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.hasValue = false;
        this.isInnerStopped = false;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
      }
      SkipUntilSubscriber.prototype._next = function(value) {
        if (this.hasValue) {
          _super.prototype._next.call(this, value);
        }
      };
      SkipUntilSubscriber.prototype._complete = function() {
        if (this.isInnerStopped) {
          _super.prototype._complete.call(this);
        } else {
          this.unsubscribe();
        }
      };
      SkipUntilSubscriber.prototype.notifyNext = function() {
        this.hasValue = true;
      };
      SkipUntilSubscriber.prototype.notifyComplete = function() {
        this.isInnerStopped = true;
        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };
      return SkipUntilSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/skipWhile", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function skipWhile(predicate) {
      return this.lift(new SkipWhileOperator(predicate));
    }
    exports.skipWhile = skipWhile;
    var SkipWhileOperator = (function() {
      function SkipWhileOperator(predicate) {
        this.predicate = predicate;
      }
      SkipWhileOperator.prototype.call = function(subscriber) {
        return new SkipWhileSubscriber(subscriber, this.predicate);
      };
      return SkipWhileOperator;
    })();
    var SkipWhileSubscriber = (function(_super) {
      __extends(SkipWhileSubscriber, _super);
      function SkipWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
      }
      SkipWhileSubscriber.prototype._next = function(value) {
        var destination = this.destination;
        if (this.skipping === true) {
          var index = this.index++;
          var result = tryCatch_1.tryCatch(this.predicate)(value, index);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            this.skipping = Boolean(result);
          }
        }
        if (this.skipping === false) {
          destination.next(value);
        }
      };
      return SkipWhileSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/startWith", ["rxjs/observable/fromArray", "rxjs/observable/ScalarObservable", "rxjs/observable/empty", "rxjs/operator/concat-static", "rxjs/util/isScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var fromArray_1 = require('../observable/fromArray');
    var ScalarObservable_1 = require('../observable/ScalarObservable');
    var empty_1 = require('../observable/empty');
    var concat_static_1 = require('../operator/concat-static');
    var isScheduler_1 = require('../util/isScheduler');
    function startWith() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
      }
      var scheduler = array[array.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
      } else {
        scheduler = null;
      }
      var len = array.length;
      if (len === 1) {
        return concat_static_1.concat(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
      } else if (len > 1) {
        return concat_static_1.concat(new fromArray_1.ArrayObservable(array, scheduler), this);
      } else {
        return concat_static_1.concat(new empty_1.EmptyObservable(scheduler), this);
      }
    }
    exports.startWith = startWith;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/SubscribeOnObservable", ["rxjs/Observable", "rxjs/scheduler/asap", "rxjs/util/isNumeric"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var asap_1 = require('../scheduler/asap');
    var isNumeric_1 = require('../util/isNumeric');
    var SubscribeOnObservable = (function(_super) {
      __extends(SubscribeOnObservable, _super);
      function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
          delayTime = 0;
        }
        if (scheduler === void 0) {
          scheduler = asap_1.asap;
        }
        _super.call(this);
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
          this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
          this.scheduler = asap_1.asap;
        }
      }
      SubscribeOnObservable.create = function(source, delay, scheduler) {
        if (delay === void 0) {
          delay = 0;
        }
        if (scheduler === void 0) {
          scheduler = asap_1.asap;
        }
        return new SubscribeOnObservable(source, delay, scheduler);
      };
      SubscribeOnObservable.dispatch = function(_a) {
        var source = _a.source,
            subscriber = _a.subscriber;
        return source.subscribe(subscriber);
      };
      SubscribeOnObservable.prototype._subscribe = function(subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
          source: source,
          subscriber: subscriber
        });
      };
      return SubscribeOnObservable;
    })(Observable_1.Observable);
    exports.SubscribeOnObservable = SubscribeOnObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/switch", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function _switch() {
      return this.lift(new SwitchOperator());
    }
    exports._switch = _switch;
    var SwitchOperator = (function() {
      function SwitchOperator() {}
      SwitchOperator.prototype.call = function(subscriber) {
        return new SwitchSubscriber(subscriber);
      };
      return SwitchOperator;
    })();
    var SwitchSubscriber = (function(_super) {
      __extends(SwitchSubscriber, _super);
      function SwitchSubscriber(destination) {
        _super.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
      }
      SwitchSubscriber.prototype._next = function(value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
      };
      SwitchSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0) {
          this.destination.complete();
        }
      };
      SwitchSubscriber.prototype.unsubscribeInner = function() {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
          innerSubscription.unsubscribe();
          this.remove(innerSubscription);
        }
      };
      SwitchSubscriber.prototype.notifyNext = function(outerValue, innerValue) {
        this.destination.next(innerValue);
      };
      SwitchSubscriber.prototype.notifyError = function(err) {
        this.destination.error(err);
      };
      SwitchSubscriber.prototype.notifyComplete = function() {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };
      return SwitchSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/switchMap", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function switchMap(project, resultSelector) {
      return this.lift(new SwitchMapOperator(project, resultSelector));
    }
    exports.switchMap = switchMap;
    var SwitchMapOperator = (function() {
      function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
      }
      SwitchMapOperator.prototype.call = function(subscriber) {
        return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
      };
      return SwitchMapOperator;
    })();
    var SwitchMapSubscriber = (function(_super) {
      __extends(SwitchMapSubscriber, _super);
      function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
      }
      SwitchMapSubscriber.prototype._next = function(value) {
        var index = this.index++;
        var destination = this.destination;
        var result = tryCatch_1.tryCatch(this.project)(value, index);
        if (result === errorObject_1.errorObject) {
          destination.error(errorObject_1.errorObject.e);
        } else {
          var innerSubscription = this.innerSubscription;
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }
          this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
        }
      };
      SwitchMapSubscriber.prototype._complete = function() {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapSubscriber.prototype._unsubscribe = function() {
        this.innerSubscription = null;
      };
      SwitchMapSubscriber.prototype.notifyComplete = function(innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        if (resultSelector) {
          var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            destination.next(result);
          }
        } else {
          destination.next(innerValue);
        }
      };
      return SwitchMapSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/switchMapTo", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function switchMapTo(observable, resultSelector) {
      return this.lift(new SwitchMapToOperator(observable, resultSelector));
    }
    exports.switchMapTo = switchMapTo;
    var SwitchMapToOperator = (function() {
      function SwitchMapToOperator(observable, resultSelector) {
        this.observable = observable;
        this.resultSelector = resultSelector;
      }
      SwitchMapToOperator.prototype.call = function(subscriber) {
        return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
      };
      return SwitchMapToOperator;
    })();
    var SwitchMapToSubscriber = (function(_super) {
      __extends(SwitchMapToSubscriber, _super);
      function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _super.call(this, destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.index = 0;
      }
      SwitchMapToSubscriber.prototype._next = function(value) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
          innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
      };
      SwitchMapToSubscriber.prototype._complete = function() {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapToSubscriber.prototype._unsubscribe = function() {
        this.innerSubscription = null;
      };
      SwitchMapToSubscriber.prototype.notifyComplete = function(innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapToSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        if (resultSelector) {
          var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
          if (result === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
          } else {
            destination.next(result);
          }
        } else {
          destination.next(innerValue);
        }
      };
      return SwitchMapToSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/ArgumentOutOfRangeError", [], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var ArgumentOutOfRangeError = (function() {
      function ArgumentOutOfRangeError() {
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
      }
      return ArgumentOutOfRangeError;
    })();
    exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/takeUntil", ["rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function takeUntil(notifier) {
      return this.lift(new TakeUntilOperator(notifier));
    }
    exports.takeUntil = takeUntil;
    var TakeUntilOperator = (function() {
      function TakeUntilOperator(notifier) {
        this.notifier = notifier;
      }
      TakeUntilOperator.prototype.call = function(subscriber) {
        return new TakeUntilSubscriber(subscriber, this.notifier);
      };
      return TakeUntilOperator;
    })();
    var TakeUntilSubscriber = (function(_super) {
      __extends(TakeUntilSubscriber, _super);
      function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
      }
      TakeUntilSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.complete();
      };
      TakeUntilSubscriber.prototype.notifyComplete = function() {};
      return TakeUntilSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/takeWhile", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function takeWhile(predicate) {
      return this.lift(new TakeWhileOperator(predicate));
    }
    exports.takeWhile = takeWhile;
    var TakeWhileOperator = (function() {
      function TakeWhileOperator(predicate) {
        this.predicate = predicate;
      }
      TakeWhileOperator.prototype.call = function(subscriber) {
        return new TakeWhileSubscriber(subscriber, this.predicate);
      };
      return TakeWhileOperator;
    })();
    var TakeWhileSubscriber = (function(_super) {
      __extends(TakeWhileSubscriber, _super);
      function TakeWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.index = 0;
      }
      TakeWhileSubscriber.prototype._next = function(value) {
        var destination = this.destination;
        var result = tryCatch_1.tryCatch(this.predicate)(value, this.index++);
        if (result == errorObject_1.errorObject) {
          destination.error(errorObject_1.errorObject.e);
        } else if (Boolean(result)) {
          destination.next(value);
        } else {
          destination.complete();
        }
      };
      return TakeWhileSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/throttle", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function throttle(durationSelector) {
      return this.lift(new ThrottleOperator(durationSelector));
    }
    exports.throttle = throttle;
    var ThrottleOperator = (function() {
      function ThrottleOperator(durationSelector) {
        this.durationSelector = durationSelector;
      }
      ThrottleOperator.prototype.call = function(subscriber) {
        return new ThrottleSubscriber(subscriber, this.durationSelector);
      };
      return ThrottleOperator;
    })();
    var ThrottleSubscriber = (function(_super) {
      __extends(ThrottleSubscriber, _super);
      function ThrottleSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
      }
      ThrottleSubscriber.prototype._next = function(value) {
        if (!this.throttled) {
          var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
          if (duration === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
          } else {
            this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
            this.destination.next(value);
          }
        }
      };
      ThrottleSubscriber.prototype._unsubscribe = function() {
        var throttled = this.throttled;
        if (throttled) {
          this.remove(throttled);
          this.throttled = null;
          throttled.unsubscribe();
        }
      };
      ThrottleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this._unsubscribe();
      };
      ThrottleSubscriber.prototype.notifyComplete = function() {
        this._unsubscribe();
      };
      return ThrottleSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/throttleTime", ["rxjs/Subscriber", "rxjs/scheduler/asap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var asap_1 = require('../scheduler/asap');
    function throttleTime(delay, scheduler) {
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      return this.lift(new ThrottleTimeOperator(delay, scheduler));
    }
    exports.throttleTime = throttleTime;
    var ThrottleTimeOperator = (function() {
      function ThrottleTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
      }
      ThrottleTimeOperator.prototype.call = function(subscriber) {
        return new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler);
      };
      return ThrottleTimeOperator;
    })();
    var ThrottleTimeSubscriber = (function(_super) {
      __extends(ThrottleTimeSubscriber, _super);
      function ThrottleTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
      }
      ThrottleTimeSubscriber.prototype._next = function(value) {
        if (!this.throttled) {
          this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, {subscriber: this}));
          this.destination.next(value);
        }
      };
      ThrottleTimeSubscriber.prototype.clearThrottle = function() {
        var throttled = this.throttled;
        if (throttled) {
          throttled.unsubscribe();
          this.remove(throttled);
          this.throttled = null;
        }
      };
      return ThrottleTimeSubscriber;
    })(Subscriber_1.Subscriber);
    function dispatchNext(_a) {
      var subscriber = _a.subscriber;
      subscriber.clearThrottle();
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/timeout", ["rxjs/scheduler/asap", "rxjs/util/isDate", "rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var asap_1 = require('../scheduler/asap');
    var isDate_1 = require('../util/isDate');
    var Subscriber_1 = require('../Subscriber');
    function timeout(due, errorToSend, scheduler) {
      if (errorToSend === void 0) {
        errorToSend = null;
      }
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      var absoluteTimeout = isDate_1.isDate(due);
      var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
      return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
    }
    exports.timeout = timeout;
    var TimeoutOperator = (function() {
      function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
      }
      TimeoutOperator.prototype.call = function(subscriber) {
        return new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler);
      };
      return TimeoutOperator;
    })();
    var TimeoutSubscriber = (function(_super) {
      __extends(TimeoutSubscriber, _super);
      function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
      }
      Object.defineProperty(TimeoutSubscriber.prototype, "previousIndex", {
        get: function() {
          return this._previousIndex;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
        get: function() {
          return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
      });
      TimeoutSubscriber.dispatchTimeout = function(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
          source.notifyTimeout();
        }
      };
      TimeoutSubscriber.prototype.scheduleTimeout = function() {
        var currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, {
          subscriber: this,
          index: currentIndex
        });
        this.index++;
        this._previousIndex = currentIndex;
      };
      TimeoutSubscriber.prototype._next = function(value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
          this.scheduleTimeout();
        }
      };
      TimeoutSubscriber.prototype._error = function(err) {
        this.destination.error(err);
        this._hasCompleted = true;
      };
      TimeoutSubscriber.prototype._complete = function() {
        this.destination.complete();
        this._hasCompleted = true;
      };
      TimeoutSubscriber.prototype.notifyTimeout = function() {
        this.error(this.errorToSend || new Error('timeout'));
      };
      return TimeoutSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/timeoutWith", ["rxjs/scheduler/asap", "rxjs/util/isDate", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var asap_1 = require('../scheduler/asap');
    var isDate_1 = require('../util/isDate');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function timeoutWith(due, withObservable, scheduler) {
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      var absoluteTimeout = isDate_1.isDate(due);
      var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
      return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    }
    exports.timeoutWith = timeoutWith;
    var TimeoutWithOperator = (function() {
      function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
      }
      TimeoutWithOperator.prototype.call = function(subscriber) {
        return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
      };
      return TimeoutWithOperator;
    })();
    var TimeoutWithSubscriber = (function(_super) {
      __extends(TimeoutWithSubscriber, _super);
      function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _super.call(this);
        this.destination = destination;
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        destination.add(this);
        this.scheduleTimeout();
      }
      Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
        get: function() {
          return this._previousIndex;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
        get: function() {
          return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
      });
      TimeoutWithSubscriber.dispatchTimeout = function(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
          source.handleTimeout();
        }
      };
      TimeoutWithSubscriber.prototype.scheduleTimeout = function() {
        var currentIndex = this.index;
        var timeoutState = {
          subscriber: this,
          index: currentIndex
        };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
      };
      TimeoutWithSubscriber.prototype._next = function(value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
          this.scheduleTimeout();
        }
      };
      TimeoutWithSubscriber.prototype._error = function(err) {
        this.destination.error(err);
        this._hasCompleted = true;
      };
      TimeoutWithSubscriber.prototype._complete = function() {
        this.destination.complete();
        this._hasCompleted = true;
      };
      TimeoutWithSubscriber.prototype.handleTimeout = function() {
        if (!this.isUnsubscribed) {
          var withObservable = this.withObservable;
          this.unsubscribe();
          this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
        }
      };
      return TimeoutWithSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/toArray", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    function toArray() {
      return this.lift(new ToArrayOperator());
    }
    exports.toArray = toArray;
    var ToArrayOperator = (function() {
      function ToArrayOperator() {}
      ToArrayOperator.prototype.call = function(subscriber) {
        return new ToArraySubscriber(subscriber);
      };
      return ToArrayOperator;
    })();
    var ToArraySubscriber = (function(_super) {
      __extends(ToArraySubscriber, _super);
      function ToArraySubscriber(destination) {
        _super.call(this, destination);
        this.array = [];
      }
      ToArraySubscriber.prototype._next = function(x) {
        this.array.push(x);
      };
      ToArraySubscriber.prototype._complete = function() {
        this.destination.next(this.array);
        this.destination.complete();
      };
      return ToArraySubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/toPromise", ["rxjs/util/root"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var root_1 = require('../util/root');
    function toPromise(PromiseCtor) {
      var _this = this;
      if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
          PromiseCtor = root_1.root.Rx.config.Promise;
        } else if (root_1.root.Promise) {
          PromiseCtor = root_1.root.Promise;
        }
      }
      if (!PromiseCtor) {
        throw new Error('no Promise impl found');
      }
      return new PromiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    }
    exports.toPromise = toPromise;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/window", ["rxjs/Subscriber", "rxjs/Subject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Subject_1 = require('../Subject');
    function window(closingNotifier) {
      return this.lift(new WindowOperator(closingNotifier));
    }
    exports.window = window;
    var WindowOperator = (function() {
      function WindowOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
      }
      WindowOperator.prototype.call = function(subscriber) {
        return new WindowSubscriber(subscriber, this.closingNotifier);
      };
      return WindowOperator;
    })();
    var WindowSubscriber = (function(_super) {
      __extends(WindowSubscriber, _super);
      function WindowSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.destination = destination;
        this.closingNotifier = closingNotifier;
        this.add(closingNotifier.subscribe(new WindowClosingNotifierSubscriber(this)));
        this.openWindow();
      }
      WindowSubscriber.prototype._next = function(value) {
        this.window.next(value);
      };
      WindowSubscriber.prototype._error = function(err) {
        this.window.error(err);
        this.destination.error(err);
      };
      WindowSubscriber.prototype._complete = function() {
        this.window.complete();
        this.destination.complete();
      };
      WindowSubscriber.prototype.openWindow = function() {
        var prevWindow = this.window;
        if (prevWindow) {
          prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new Subject_1.Subject();
        destination.add(newWindow);
        destination.next(newWindow);
      };
      WindowSubscriber.prototype.errorWindow = function(err) {
        this._error(err);
      };
      WindowSubscriber.prototype.completeWindow = function() {
        this._complete();
      };
      return WindowSubscriber;
    })(Subscriber_1.Subscriber);
    var WindowClosingNotifierSubscriber = (function(_super) {
      __extends(WindowClosingNotifierSubscriber, _super);
      function WindowClosingNotifierSubscriber(parent) {
        _super.call(this);
        this.parent = parent;
      }
      WindowClosingNotifierSubscriber.prototype._next = function() {
        this.parent.openWindow();
      };
      WindowClosingNotifierSubscriber.prototype._error = function(err) {
        this.parent.errorWindow(err);
      };
      WindowClosingNotifierSubscriber.prototype._complete = function() {
        this.parent.completeWindow();
      };
      return WindowClosingNotifierSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/windowCount", ["rxjs/Subscriber", "rxjs/Subject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Subject_1 = require('../Subject');
    function windowCount(windowSize, startWindowEvery) {
      if (startWindowEvery === void 0) {
        startWindowEvery = 0;
      }
      return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
    }
    exports.windowCount = windowCount;
    var WindowCountOperator = (function() {
      function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
      }
      WindowCountOperator.prototype.call = function(subscriber) {
        return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
      };
      return WindowCountOperator;
    })();
    var WindowCountSubscriber = (function(_super) {
      __extends(WindowCountSubscriber, _super);
      function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject_1.Subject()];
        this.count = 0;
        var firstWindow = this.windows[0];
        destination.add(firstWindow);
        destination.next(firstWindow);
      }
      WindowCountSubscriber.prototype._next = function(value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
          windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0) {
          windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0) {
          var window_1 = new Subject_1.Subject();
          windows.push(window_1);
          destination.add(window_1);
          destination.next(window_1);
        }
      };
      WindowCountSubscriber.prototype._error = function(err) {
        var windows = this.windows;
        while (windows.length > 0) {
          windows.shift().error(err);
        }
        this.destination.error(err);
      };
      WindowCountSubscriber.prototype._complete = function() {
        var windows = this.windows;
        while (windows.length > 0) {
          windows.shift().complete();
        }
        this.destination.complete();
      };
      return WindowCountSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/windowTime", ["rxjs/Subscriber", "rxjs/Subject", "rxjs/scheduler/asap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Subject_1 = require('../Subject');
    var asap_1 = require('../scheduler/asap');
    function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
      if (windowCreationInterval === void 0) {
        windowCreationInterval = null;
      }
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
    }
    exports.windowTime = windowTime;
    var WindowTimeOperator = (function() {
      function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
      }
      WindowTimeOperator.prototype.call = function(subscriber) {
        return new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler);
      };
      return WindowTimeOperator;
    })();
    var WindowTimeSubscriber = (function(_super) {
      __extends(WindowTimeSubscriber, _super);
      function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
          var window_1 = this.openWindow();
          var closeState = {
            subscriber: this,
            window: window_1,
            context: null
          };
          var creationState = {
            windowTimeSpan: windowTimeSpan,
            windowCreationInterval: windowCreationInterval,
            subscriber: this,
            scheduler: scheduler
          };
          this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
          this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
          var window_2 = this.openWindow();
          var timeSpanOnlyState = {
            subscriber: this,
            window: window_2,
            windowTimeSpan: windowTimeSpan
          };
          this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
      }
      WindowTimeSubscriber.prototype._next = function(value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
          windows[i].next(value);
        }
      };
      WindowTimeSubscriber.prototype._error = function(err) {
        var windows = this.windows;
        while (windows.length > 0) {
          windows.shift().error(err);
        }
        this.destination.error(err);
      };
      WindowTimeSubscriber.prototype._complete = function() {
        var windows = this.windows;
        while (windows.length > 0) {
          windows.shift().complete();
        }
        this.destination.complete();
      };
      WindowTimeSubscriber.prototype.openWindow = function() {
        var window = new Subject_1.Subject();
        this.windows.push(window);
        var destination = this.destination;
        destination.add(window);
        destination.next(window);
        return window;
      };
      WindowTimeSubscriber.prototype.closeWindow = function(window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
      };
      return WindowTimeSubscriber;
    })(Subscriber_1.Subscriber);
    function dispatchWindowTimeSpanOnly(state) {
      var subscriber = state.subscriber,
          windowTimeSpan = state.windowTimeSpan,
          window = state.window;
      if (window) {
        window.complete();
      }
      state.window = subscriber.openWindow();
      this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
      var windowTimeSpan = state.windowTimeSpan,
          subscriber = state.subscriber,
          scheduler = state.scheduler,
          windowCreationInterval = state.windowCreationInterval;
      var window = subscriber.openWindow();
      var action = this;
      var context = {
        action: action,
        subscription: null
      };
      var timeSpanState = {
        subscriber: subscriber,
        window: window,
        context: context
      };
      context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
      action.add(context.subscription);
      action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose(_a) {
      var subscriber = _a.subscriber,
          window = _a.window,
          context = _a.context;
      if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
      }
      subscriber.closeWindow(window);
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/windowToggle", ["rxjs/Subject", "rxjs/Subscription", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1 = require('../Subject');
    var Subscription_1 = require('../Subscription');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function windowToggle(openings, closingSelector) {
      return this.lift(new WindowToggleOperator(openings, closingSelector));
    }
    exports.windowToggle = windowToggle;
    var WindowToggleOperator = (function() {
      function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
      }
      WindowToggleOperator.prototype.call = function(subscriber) {
        return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
      };
      return WindowToggleOperator;
    })();
    var WindowToggleSubscriber = (function(_super) {
      __extends(WindowToggleSubscriber, _super);
      function WindowToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
      }
      WindowToggleSubscriber.prototype._next = function(value) {
        var contexts = this.contexts;
        if (contexts) {
          var len = contexts.length;
          for (var i = 0; i < len; i++) {
            contexts[i].window.next(value);
          }
        }
      };
      WindowToggleSubscriber.prototype._error = function(err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
          var len = contexts.length;
          var index = -1;
          while (++index < len) {
            var context = contexts[index];
            context.window.error(err);
            context.subscription.unsubscribe();
          }
        }
        _super.prototype._error.call(this, err);
      };
      WindowToggleSubscriber.prototype._complete = function() {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
          var len = contexts.length;
          var index = -1;
          while (++index < len) {
            var context = contexts[index];
            context.window.complete();
            context.subscription.unsubscribe();
          }
        }
        _super.prototype._complete.call(this);
      };
      WindowToggleSubscriber.prototype._unsubscribe = function() {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
          var len = contexts.length;
          var index = -1;
          while (++index < len) {
            var context = contexts[index];
            context.window.unsubscribe();
            context.subscription.unsubscribe();
          }
        }
      };
      WindowToggleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        if (outerValue === this.openings) {
          var closingSelector = this.closingSelector;
          var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
          if (closingNotifier === errorObject_1.errorObject) {
            return this.error(errorObject_1.errorObject.e);
          } else {
            var window_1 = new Subject_1.Subject();
            var subscription = new Subscription_1.Subscription();
            var context = {
              window: window_1,
              subscription: subscription
            };
            this.contexts.push(context);
            var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
            innerSubscription.context = context;
            subscription.add(innerSubscription);
            this.destination.next(window_1);
          }
        } else {
          this.closeWindow(this.contexts.indexOf(outerValue));
        }
      };
      WindowToggleSubscriber.prototype.notifyError = function(err) {
        this.error(err);
      };
      WindowToggleSubscriber.prototype.notifyComplete = function(inner) {
        if (inner !== this.openSubscription) {
          this.closeWindow(this.contexts.indexOf(inner.context));
        }
      };
      WindowToggleSubscriber.prototype.closeWindow = function(index) {
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window,
            subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
      };
      return WindowToggleSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/windowWhen", ["rxjs/Subscriber", "rxjs/Subject", "rxjs/Subscription", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Subject_1 = require('../Subject');
    var Subscription_1 = require('../Subscription');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function windowWhen(closingSelector) {
      return this.lift(new WindowOperator(closingSelector));
    }
    exports.windowWhen = windowWhen;
    var WindowOperator = (function() {
      function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
      }
      WindowOperator.prototype.call = function(subscriber) {
        return new WindowSubscriber(subscriber, this.closingSelector);
      };
      return WindowOperator;
    })();
    var WindowSubscriber = (function(_super) {
      __extends(WindowSubscriber, _super);
      function WindowSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.closingSelector = closingSelector;
        this.openWindow();
      }
      WindowSubscriber.prototype._next = function(value) {
        this.window.next(value);
      };
      WindowSubscriber.prototype._error = function(err) {
        this.window.error(err);
        this.destination.error(err);
        this._unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype._complete = function() {
        this.window.complete();
        this.destination.complete();
        this._unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype.unsubscribe = function() {
        _super.prototype.unsubscribe.call(this);
        this._unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype._unsubscribeClosingNotification = function() {
        var closingNotification = this.closingNotification;
        if (closingNotification) {
          closingNotification.unsubscribe();
        }
      };
      WindowSubscriber.prototype.openWindow = function() {
        var prevClosingNotification = this.closingNotification;
        if (prevClosingNotification) {
          this.remove(prevClosingNotification);
          prevClosingNotification.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
          prevWindow.complete();
        }
        var window = this.window = new Subject_1.Subject();
        this.destination.next(window);
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
          var err = errorObject_1.errorObject.e;
          this.destination.error(err);
          this.window.error(err);
        } else {
          var closingNotification = this.closingNotification = new Subscription_1.Subscription();
          closingNotification.add(closingNotifier.subscribe(new WindowClosingNotifierSubscriber(this)));
          this.add(closingNotification);
          this.add(window);
        }
      };
      return WindowSubscriber;
    })(Subscriber_1.Subscriber);
    var WindowClosingNotifierSubscriber = (function(_super) {
      __extends(WindowClosingNotifierSubscriber, _super);
      function WindowClosingNotifierSubscriber(parent) {
        _super.call(this);
        this.parent = parent;
      }
      WindowClosingNotifierSubscriber.prototype._next = function() {
        this.parent.openWindow();
      };
      WindowClosingNotifierSubscriber.prototype._error = function(err) {
        this.parent.error(err);
      };
      WindowClosingNotifierSubscriber.prototype._complete = function() {
        this.parent.openWindow();
      };
      return WindowClosingNotifierSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/withLatestFrom", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    function withLatestFrom() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var project;
      if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
      }
      var observables = args;
      return this.lift(new WithLatestFromOperator(observables, project));
    }
    exports.withLatestFrom = withLatestFrom;
    var WithLatestFromOperator = (function() {
      function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
      }
      WithLatestFromOperator.prototype.call = function(subscriber) {
        return new WithLatestFromSubscriber(subscriber, this.observables, this.project);
      };
      return WithLatestFromOperator;
    })();
    var WithLatestFromSubscriber = (function(_super) {
      __extends(WithLatestFromSubscriber, _super);
      function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
          this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
      }
      WithLatestFromSubscriber.prototype.notifyNext = function(observable, value, observableIndex, index) {
        this.values[observableIndex] = value;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
          var found = toRespond.indexOf(observableIndex);
          if (found !== -1) {
            toRespond.splice(found, 1);
          }
        }
      };
      WithLatestFromSubscriber.prototype.notifyComplete = function() {};
      WithLatestFromSubscriber.prototype._next = function(value) {
        if (this.toRespond.length === 0) {
          var values = this.values;
          var destination = this.destination;
          var project = this.project;
          var args = [value].concat(values);
          if (project) {
            var result = tryCatch_1.tryCatch(this.project).apply(this, args);
            if (result === errorObject_1.errorObject) {
              destination.error(result.e);
            } else {
              destination.next(result);
            }
          } else {
            destination.next(args);
          }
        }
      };
      return WithLatestFromSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/zip", ["rxjs/operator/zip-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var zip_static_1 = require('../operator/zip-static');
    function zipProto() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      observables.unshift(this);
      return zip_static_1.zip.apply(this, observables);
    }
    exports.zipProto = zipProto;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/zipAll", ["rxjs/operator/zip-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var zip_support_1 = require('../operator/zip-support');
    function zipAll(project) {
      return this.lift(new zip_support_1.ZipOperator(project));
    }
    exports.zipAll = zipAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Operator", ["rxjs/Subscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Subscriber_1 = require('../Subscriber');
    var Operator = (function() {
      function Operator() {}
      Operator.prototype.call = function(subscriber) {
        return new Subscriber_1.Subscriber(subscriber);
      };
      return Operator;
    })();
    exports.Operator = Operator;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Subscription", ["rxjs/util/isArray", "rxjs/util/isObject", "rxjs/util/isFunction"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var isArray_1 = require('../util/isArray');
    var isObject_1 = require('../util/isObject');
    var isFunction_1 = require('../util/isFunction');
    var Subscription = (function() {
      function Subscription(_unsubscribe) {
        this.isUnsubscribed = false;
        if (_unsubscribe) {
          this._unsubscribe = _unsubscribe;
        }
      }
      Subscription.prototype.unsubscribe = function() {
        if (this.isUnsubscribed) {
          return;
        }
        this.isUnsubscribed = true;
        var _a = this,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
          _unsubscribe.call(this);
        }
        if (isArray_1.isArray(_subscriptions)) {
          var index = -1;
          var len = _subscriptions.length;
          while (++index < len) {
            var subscription = _subscriptions[index];
            if (isObject_1.isObject(subscription)) {
              subscription.unsubscribe();
            }
          }
        }
      };
      Subscription.prototype.add = function(subscription) {
        if (!subscription || (subscription === this) || (subscription === Subscription.EMPTY)) {
          return;
        }
        var sub = subscription;
        switch (typeof subscription) {
          case 'function':
            sub = new Subscription(subscription);
          case 'object':
            if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
              break;
            } else if (this.isUnsubscribed) {
              sub.unsubscribe();
            } else {
              (this._subscriptions || (this._subscriptions = [])).push(sub);
            }
            break;
          default:
            throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
        }
      };
      Subscription.prototype.remove = function(subscription) {
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
          return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);
          if (subscriptionIndex !== -1) {
            subscriptions.splice(subscriptionIndex, 1);
          }
        }
      };
      Subscription.EMPTY = (function(empty) {
        empty.isUnsubscribed = true;
        return empty;
      }(new Subscription()));
      return Subscription;
    })();
    exports.Subscription = Subscription;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/fromArray", ["rxjs/Observable", "rxjs/observable/ScalarObservable", "rxjs/observable/empty", "rxjs/util/isScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var ScalarObservable_1 = require('../observable/ScalarObservable');
    var empty_1 = require('../observable/empty');
    var isScheduler_1 = require('../util/isScheduler');
    var ArrayObservable = (function(_super) {
      __extends(ArrayObservable, _super);
      function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
          this._isScalar = true;
          this.value = array[0];
        }
      }
      ArrayObservable.create = function(array, scheduler) {
        return new ArrayObservable(array, scheduler);
      };
      ArrayObservable.of = function() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
          array.pop();
        } else {
          scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
          return new ArrayObservable(array, scheduler);
        } else if (len === 1) {
          return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        } else {
          return new empty_1.EmptyObservable(scheduler);
        }
      };
      ArrayObservable.dispatch = function(state) {
        var array = state.array,
            index = state.index,
            count = state.count,
            subscriber = state.subscriber;
        if (index >= count) {
          subscriber.complete();
          return;
        }
        subscriber.next(array[index]);
        if (subscriber.isUnsubscribed) {
          return;
        }
        state.index = index + 1;
        this.schedule(state);
      };
      ArrayObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(ArrayObservable.dispatch, 0, {
            array: array,
            index: index,
            count: count,
            subscriber: subscriber
          });
        } else {
          for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
            subscriber.next(array[i]);
          }
          subscriber.complete();
        }
      };
      return ArrayObservable;
    })(Observable_1.Observable);
    exports.ArrayObservable = ArrayObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/tryCatch", ["rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var errorObject_1 = require('../util/errorObject');
    var tryCatchTarget;
    function tryCatcher() {
      try {
        return tryCatchTarget.apply(this, arguments);
      } catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
      }
    }
    function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
    }
    exports.tryCatch = tryCatch;
    ;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/subscribeToResult", ["rxjs/util/root", "rxjs/util/isArray", "rxjs/util/isPromise", "rxjs/Observable", "rxjs/util/SymbolShim", "rxjs/InnerSubscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var root_1 = require('../util/root');
    var isArray_1 = require('../util/isArray');
    var isPromise_1 = require('../util/isPromise');
    var Observable_1 = require('../Observable');
    var SymbolShim_1 = require('../util/SymbolShim');
    var InnerSubscriber_1 = require('../InnerSubscriber');
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
      var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
      if (destination.isUnsubscribed) {
        return;
      }
      if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
          destination.next(result.value);
          destination.complete();
          return;
        } else {
          return result.subscribe(destination);
        }
      }
      if (isArray_1.isArray(result)) {
        for (var i = 0,
            len = result.length; i < len && !destination.isUnsubscribed; i++) {
          destination.next(result[i]);
        }
        if (!destination.isUnsubscribed) {
          destination.complete();
        }
      } else if (isPromise_1.isPromise(result)) {
        result.then(function(value) {
          if (!destination.isUnsubscribed) {
            destination.next(value);
            destination.complete();
          }
        }, function(err) {
          return destination.error(err);
        }).then(null, function(err) {
          root_1.root.setTimeout(function() {
            throw err;
          });
        });
        return destination;
      } else if (typeof result[SymbolShim_1.SymbolShim.iterator] === 'function') {
        for (var _i = 0,
            result_1 = result; _i < result_1.length; _i++) {
          var item = result_1[_i];
          destination.next(item);
          if (destination.isUnsubscribed) {
            break;
          }
        }
        if (!destination.isUnsubscribed) {
          destination.complete();
        }
      } else if (typeof result[SymbolShim_1.SymbolShim.observable] === 'function') {
        var obs = result[SymbolShim_1.SymbolShim.observable]();
        if (typeof obs.subscribe !== 'function') {
          destination.error('invalid observable');
        } else {
          return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
      } else {
        destination.error(new TypeError('unknown type returned'));
      }
    }
    exports.subscribeToResult = subscribeToResult;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/concat-static", ["rxjs/operator/mergeAll-support", "rxjs/observable/fromArray", "rxjs/util/isScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeAll_support_1 = require('../operator/mergeAll-support');
    var fromArray_1 = require('../observable/fromArray');
    var isScheduler_1 = require('../util/isScheduler');
    function concat() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var scheduler = null;
      var args = observables;
      if (isScheduler_1.isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
      }
      return new fromArray_1.ArrayObservable(observables, scheduler).lift(new mergeAll_support_1.MergeAllOperator(1));
    }
    exports.concat = concat;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/merge-static", ["rxjs/Observable", "rxjs/operator/merge-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var merge_static_1 = require('../operator/merge-static');
    Observable_1.Observable.merge = merge_static_1.merge;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/race-static", ["rxjs/observable/fromArray", "rxjs/operator/race-support", "rxjs/util/isArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var fromArray_1 = require('../observable/fromArray');
    var race_support_1 = require('../operator/race-support');
    var isArray_1 = require('../util/isArray');
    function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
          observables = observables[0];
        } else {
          return observables[0];
        }
      }
      return new fromArray_1.ArrayObservable(observables).lift(new race_support_1.RaceOperator());
    }
    exports.race = race;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/bindCallback", ["rxjs/Observable", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/subject/AsyncSubject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var AsyncSubject_1 = require('../subject/AsyncSubject');
    var BoundCallbackObservable = (function(_super) {
      __extends(BoundCallbackObservable, _super);
      function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
      }
      BoundCallbackObservable.create = function(callbackFunc, selector, scheduler) {
        if (selector === void 0) {
          selector = undefined;
        }
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          return new BoundCallbackObservable(callbackFunc, selector, args, scheduler);
        };
      };
      BoundCallbackObservable.prototype._subscribe = function(subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
          if (!subject) {
            subject = this.subject = new AsyncSubject_1.AsyncSubject();
            var handler = function handlerFn() {
              var innerArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
              }
              var source = handlerFn.source;
              var selector = source.selector,
                  subject = source.subject;
              if (selector) {
                var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result_1 === errorObject_1.errorObject) {
                  subject.error(errorObject_1.errorObject.e);
                } else {
                  subject.next(result_1);
                  subject.complete();
                }
              } else {
                subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              }
            };
            handler.source = this;
            var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
            if (result === errorObject_1.errorObject) {
              subject.error(errorObject_1.errorObject.e);
            }
          }
          return subject.subscribe(subscriber);
        } else {
          return scheduler.schedule(dispatch, 0, {
            source: this,
            subscriber: subscriber
          });
        }
      };
      return BoundCallbackObservable;
    })(Observable_1.Observable);
    exports.BoundCallbackObservable = BoundCallbackObservable;
    function dispatch(state) {
      var self = this;
      var source = state.source,
          subscriber = state.subscriber;
      var callbackFunc = source.callbackFunc,
          args = source.args,
          scheduler = source.scheduler;
      var subject = source.subject;
      if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i - 0] = arguments[_i];
          }
          var source = handlerFn.source;
          var selector = source.selector,
              subject = source.subject;
          if (selector) {
            var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
            if (result_2 === errorObject_1.errorObject) {
              self.add(scheduler.schedule(dispatchError, 0, {
                err: errorObject_1.errorObject.e,
                subject: subject
              }));
            } else {
              self.add(scheduler.schedule(dispatchNext, 0, {
                value: result_2,
                subject: subject
              }));
            }
          } else {
            var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
            self.add(scheduler.schedule(dispatchNext, 0, {
              value: value,
              subject: subject
            }));
          }
        };
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
          subject.error(errorObject_1.errorObject.e);
        }
      }
      self.add(subject.subscribe(subscriber));
    }
    function dispatchNext(_a) {
      var value = _a.value,
          subject = _a.subject;
      subject.next(value);
      subject.complete();
    }
    function dispatchError(_a) {
      var err = _a.err,
          subject = _a.subject;
      subject.error(err);
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/bindNodeCallback", ["rxjs/Observable", "rxjs/observable/bindNodeCallback"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var bindNodeCallback_1 = require('../observable/bindNodeCallback');
    Observable_1.Observable.bindNodeCallback = bindNodeCallback_1.BoundNodeCallbackObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/defer", ["rxjs/Observable", "rxjs/observable/defer"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var defer_1 = require('../observable/defer');
    Observable_1.Observable.defer = defer_1.DeferObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/forkJoin", ["rxjs/Observable", "rxjs/Subscriber", "rxjs/observable/fromPromise", "rxjs/observable/empty", "rxjs/util/isPromise", "rxjs/util/isArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var Subscriber_1 = require('../Subscriber');
    var fromPromise_1 = require('../observable/fromPromise');
    var empty_1 = require('../observable/empty');
    var isPromise_1 = require('../util/isPromise');
    var isArray_1 = require('../util/isArray');
    var ForkJoinObservable = (function(_super) {
      __extends(ForkJoinObservable, _super);
      function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
      }
      ForkJoinObservable.create = function() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
          return new empty_1.EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
          resultSelector = sources.pop();
        }
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
          sources = sources[0];
        }
        return new ForkJoinObservable(sources, resultSelector);
      };
      ForkJoinObservable.prototype._subscribe = function(subscriber) {
        var sources = this.sources;
        var len = sources.length;
        var context = {
          completed: 0,
          total: len,
          values: emptyArray(len),
          selector: this.resultSelector
        };
        for (var i = 0; i < len; i++) {
          var source = sources[i];
          if (isPromise_1.isPromise(source)) {
            source = new fromPromise_1.PromiseObservable(source);
          }
          source.subscribe(new AllSubscriber(subscriber, i, context));
        }
      };
      return ForkJoinObservable;
    })(Observable_1.Observable);
    exports.ForkJoinObservable = ForkJoinObservable;
    var AllSubscriber = (function(_super) {
      __extends(AllSubscriber, _super);
      function AllSubscriber(destination, index, context) {
        _super.call(this, destination);
        this.index = index;
        this.context = context;
        this._value = null;
      }
      AllSubscriber.prototype._next = function(value) {
        this._value = value;
      };
      AllSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (this._value == null) {
          destination.complete();
        }
        var context = this.context;
        context.completed++;
        context.values[this.index] = this._value;
        var values = context.values;
        if (context.completed !== values.length) {
          return;
        }
        if (values.every(hasValue)) {
          var value = context.selector ? context.selector.apply(this, values) : values;
          destination.next(value);
        }
        destination.complete();
      };
      return AllSubscriber;
    })(Subscriber_1.Subscriber);
    function hasValue(x) {
      return x !== null;
    }
    function emptyArray(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(null);
      }
      return arr;
    }
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/observeOn-support", ["rxjs/Subscriber", "rxjs/Notification"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Notification_1 = require('../Notification');
    var ObserveOnOperator = (function() {
      function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
      }
      ObserveOnOperator.prototype.call = function(subscriber) {
        return new ObserveOnSubscriber(subscriber, this.scheduler, this.delay);
      };
      return ObserveOnOperator;
    })();
    exports.ObserveOnOperator = ObserveOnOperator;
    var ObserveOnSubscriber = (function(_super) {
      __extends(ObserveOnSubscriber, _super);
      function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
      }
      ObserveOnSubscriber.dispatch = function(_a) {
        var notification = _a.notification,
            destination = _a.destination;
        notification.observe(destination);
      };
      ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
      };
      ObserveOnSubscriber.prototype._next = function(value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
      };
      ObserveOnSubscriber.prototype._error = function(err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
      };
      ObserveOnSubscriber.prototype._complete = function() {
        this.scheduleMessage(Notification_1.Notification.createComplete());
      };
      return ObserveOnSubscriber;
    })(Subscriber_1.Subscriber);
    exports.ObserveOnSubscriber = ObserveOnSubscriber;
    var ObserveOnMessage = (function() {
      function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
      }
      return ObserveOnMessage;
    })();
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/fromEvent", ["rxjs/Observable", "rxjs/observable/fromEvent"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var fromEvent_1 = require('../observable/fromEvent');
    Observable_1.Observable.fromEvent = fromEvent_1.FromEventObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/fromEventPattern", ["rxjs/Observable", "rxjs/observable/fromEventPattern"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var fromEventPattern_1 = require('../observable/fromEventPattern');
    Observable_1.Observable.fromEventPattern = fromEventPattern_1.FromEventPatternObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/AsapAction", ["rxjs/util/Immediate", "rxjs/scheduler/FutureAction"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Immediate_1 = require('../util/Immediate');
    var FutureAction_1 = require('../scheduler/FutureAction');
    var AsapAction = (function(_super) {
      __extends(AsapAction, _super);
      function AsapAction() {
        _super.apply(this, arguments);
      }
      AsapAction.prototype._schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay > 0) {
          return _super.prototype._schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        if (!scheduler.scheduledId) {
          scheduler.scheduledId = Immediate_1.Immediate.setImmediate(function() {
            scheduler.scheduledId = null;
            scheduler.flush();
          });
        }
        return this;
      };
      AsapAction.prototype._unsubscribe = function() {
        var scheduler = this.scheduler;
        var scheduledId = scheduler.scheduledId,
            actions = scheduler.actions;
        _super.prototype._unsubscribe.call(this);
        if (actions.length === 0) {
          scheduler.active = false;
          if (scheduledId != null) {
            scheduler.scheduledId = null;
            Immediate_1.Immediate.clearImmediate(scheduledId);
          }
        }
      };
      return AsapAction;
    })(FutureAction_1.FutureAction);
    exports.AsapAction = AsapAction;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/QueueScheduler", ["rxjs/scheduler/QueueAction", "rxjs/scheduler/FutureAction"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var QueueAction_1 = require('../scheduler/QueueAction');
    var FutureAction_1 = require('../scheduler/FutureAction');
    var QueueScheduler = (function() {
      function QueueScheduler() {
        this.active = false;
        this.actions = [];
        this.scheduledId = null;
      }
      QueueScheduler.prototype.now = function() {
        return Date.now();
      };
      QueueScheduler.prototype.flush = function() {
        if (this.active || this.scheduledId) {
          return;
        }
        this.active = true;
        var actions = this.actions;
        for (var action = void 0; action = actions.shift(); ) {
          action.execute();
        }
        this.active = false;
      };
      QueueScheduler.prototype.schedule = function(work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        return (delay <= 0) ? this.scheduleNow(work, state) : this.scheduleLater(work, delay, state);
      };
      QueueScheduler.prototype.scheduleNow = function(work, state) {
        return new QueueAction_1.QueueAction(this, work).schedule(state);
      };
      QueueScheduler.prototype.scheduleLater = function(work, delay, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
      };
      return QueueScheduler;
    })();
    exports.QueueScheduler = QueueScheduler;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/never", ["rxjs/Observable", "rxjs/observable/never"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var never_1 = require('../observable/never');
    Observable_1.Observable.never = never_1.InfiniteObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/range", ["rxjs/Observable", "rxjs/observable/range"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var range_1 = require('../observable/range');
    Observable_1.Observable.range = range_1.RangeObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/throw", ["rxjs/Observable", "rxjs/observable/throw"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var throw_1 = require('../observable/throw');
    Observable_1.Observable.throw = throw_1.ErrorObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/timer", ["rxjs/util/isNumeric", "rxjs/Observable", "rxjs/scheduler/asap", "rxjs/util/isScheduler", "rxjs/util/isDate"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isNumeric_1 = require('../util/isNumeric');
    var Observable_1 = require('../Observable');
    var asap_1 = require('../scheduler/asap');
    var isScheduler_1 = require('../util/isScheduler');
    var isDate_1 = require('../util/isDate');
    var TimerObservable = (function(_super) {
      __extends(TimerObservable, _super);
      function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) {
          dueTime = 0;
        }
        _super.call(this);
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
          this.period = Number(period) < 1 && 1 || Number(period);
        } else if (isScheduler_1.isScheduler(period)) {
          scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
          scheduler = asap_1.asap;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate_1.isDate(dueTime) ? (+dueTime - this.scheduler.now()) : dueTime;
      }
      TimerObservable.create = function(dueTime, period, scheduler) {
        if (dueTime === void 0) {
          dueTime = 0;
        }
        return new TimerObservable(dueTime, period, scheduler);
      };
      TimerObservable.dispatch = function(state) {
        var index = state.index,
            period = state.period,
            subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
          return;
        } else if (period === -1) {
          return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
      };
      TimerObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var _a = this,
            period = _a.period,
            dueTime = _a.dueTime,
            scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
          index: index,
          period: period,
          subscriber: subscriber
        });
      };
      return TimerObservable;
    })(Observable_1.Observable);
    exports.TimerObservable = TimerObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/zip-static", ["rxjs/observable/fromArray", "rxjs/operator/zip-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var fromArray_1 = require('../observable/fromArray');
    var zip_support_1 = require('../operator/zip-support');
    function zip() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var project = observables[observables.length - 1];
      if (typeof project === 'function') {
        observables.pop();
      }
      return new fromArray_1.ArrayObservable(observables).lift(new zip_support_1.ZipOperator(project));
    }
    exports.zip = zip;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/buffer", ["rxjs/Observable", "rxjs/operator/buffer"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var buffer_1 = require('../operator/buffer');
    Observable_1.Observable.prototype.buffer = buffer_1.buffer;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/bufferCount", ["rxjs/Observable", "rxjs/operator/bufferCount"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var bufferCount_1 = require('../operator/bufferCount');
    Observable_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/bufferTime", ["rxjs/Observable", "rxjs/operator/bufferTime"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var bufferTime_1 = require('../operator/bufferTime');
    Observable_1.Observable.prototype.bufferTime = bufferTime_1.bufferTime;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/bufferToggle", ["rxjs/Observable", "rxjs/operator/bufferToggle"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var bufferToggle_1 = require('../operator/bufferToggle');
    Observable_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/bufferWhen", ["rxjs/Observable", "rxjs/operator/bufferWhen"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var bufferWhen_1 = require('../operator/bufferWhen');
    Observable_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/catch", ["rxjs/Observable", "rxjs/operator/catch"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var catch_1 = require('../operator/catch');
    Observable_1.Observable.prototype.catch = catch_1._catch;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/combineAll", ["rxjs/Observable", "rxjs/operator/combineAll"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var combineAll_1 = require('../operator/combineAll');
    Observable_1.Observable.prototype.combineAll = combineAll_1.combineAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/combineLatest", ["rxjs/Observable", "rxjs/operator/combineLatest"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var combineLatest_1 = require('../operator/combineLatest');
    Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/concat", ["rxjs/Observable", "rxjs/operator/concat"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var concat_1 = require('../operator/concat');
    Observable_1.Observable.prototype.concat = concat_1.concat;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/concatAll", ["rxjs/Observable", "rxjs/operator/concatAll"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var concatAll_1 = require('../operator/concatAll');
    Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/concatMap", ["rxjs/operator/mergeMap-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeMap_support_1 = require('../operator/mergeMap-support');
    function concatMap(project, resultSelector) {
      return this.lift(new mergeMap_support_1.MergeMapOperator(project, resultSelector, 1));
    }
    exports.concatMap = concatMap;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/concatMapTo", ["rxjs/operator/mergeMapTo-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var mergeMapTo_support_1 = require('../operator/mergeMapTo-support');
    function concatMapTo(observable, resultSelector) {
      return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, 1));
    }
    exports.concatMapTo = concatMapTo;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/count", ["rxjs/Observable", "rxjs/operator/count"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var count_1 = require('../operator/count');
    Observable_1.Observable.prototype.count = count_1.count;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/dematerialize", ["rxjs/Observable", "rxjs/operator/dematerialize"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var dematerialize_1 = require('../operator/dematerialize');
    Observable_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/debounce", ["rxjs/Observable", "rxjs/operator/debounce"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var debounce_1 = require('../operator/debounce');
    Observable_1.Observable.prototype.debounce = debounce_1.debounce;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/debounceTime", ["rxjs/Observable", "rxjs/operator/debounceTime"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var debounceTime_1 = require('../operator/debounceTime');
    Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/defaultIfEmpty", ["rxjs/Observable", "rxjs/operator/defaultIfEmpty"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var defaultIfEmpty_1 = require('../operator/defaultIfEmpty');
    Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/delay", ["rxjs/Observable", "rxjs/operator/delay"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var delay_1 = require('../operator/delay');
    Observable_1.Observable.prototype.delay = delay_1.delay;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/distinctUntilChanged", ["rxjs/Observable", "rxjs/operator/distinctUntilChanged"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var distinctUntilChanged_1 = require('../operator/distinctUntilChanged');
    Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/do", ["rxjs/Observable", "rxjs/operator/do"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var do_1 = require('../operator/do');
    Observable_1.Observable.prototype.do = do_1._do;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/expand", ["rxjs/operator/expand-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var expand_support_1 = require('../operator/expand-support');
    function expand(project, concurrent, scheduler) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      if (scheduler === void 0) {
        scheduler = undefined;
      }
      concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
      return this.lift(new expand_support_1.ExpandOperator(project, concurrent, scheduler));
    }
    exports.expand = expand;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/filter", ["rxjs/Observable", "rxjs/operator/filter"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var filter_1 = require('../operator/filter');
    Observable_1.Observable.prototype.filter = filter_1.filter;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/finally", ["rxjs/Observable", "rxjs/operator/finally"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var finally_1 = require('../operator/finally');
    Observable_1.Observable.prototype.finally = finally_1._finally;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/first", ["rxjs/Subscriber", "rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/util/EmptyError"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var EmptyError_1 = require('../util/EmptyError');
    function first(predicate, resultSelector, defaultValue) {
      return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
    }
    exports.first = first;
    var FirstOperator = (function() {
      function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
      }
      FirstOperator.prototype.call = function(observer) {
        return new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
      };
      return FirstOperator;
    })();
    var FirstSubscriber = (function(_super) {
      __extends(FirstSubscriber, _super);
      function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
      }
      FirstSubscriber.prototype._next = function(value) {
        var _a = this,
            destination = _a.destination,
            predicate = _a.predicate,
            resultSelector = _a.resultSelector;
        var index = this.index++;
        var passed = true;
        if (predicate) {
          passed = tryCatch_1.tryCatch(predicate)(value, index, this.source);
          if (passed === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
            return;
          }
        }
        if (passed) {
          if (resultSelector) {
            var result = tryCatch_1.tryCatch(resultSelector)(value, index);
            if (result === errorObject_1.errorObject) {
              destination.error(errorObject_1.errorObject.e);
              return;
            }
            destination.next(result);
          } else {
            destination.next(value);
          }
          destination.complete();
          this.hasCompleted = true;
        }
      };
      FirstSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
          destination.next(this.defaultValue);
          destination.complete();
        } else if (!this.hasCompleted) {
          destination.error(new EmptyError_1.EmptyError);
        }
      };
      return FirstSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/Map", ["rxjs/util/root", "rxjs/util/MapPolyfill"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var root_1 = require('../util/root');
    var MapPolyfill_1 = require('../util/MapPolyfill');
    exports.Map = root_1.root.Map || (function() {
      return MapPolyfill_1.MapPolyfill;
    })();
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/ignoreElements", ["rxjs/Observable", "rxjs/operator/ignoreElements"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var ignoreElements_1 = require('../operator/ignoreElements');
    Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/every", ["rxjs/Observable", "rxjs/operator/every"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var every_1 = require('../operator/every');
    Observable_1.Observable.prototype.every = every_1.every;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/last", ["rxjs/Observable", "rxjs/operator/last"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var last_1 = require('../operator/last');
    Observable_1.Observable.prototype.last = last_1.last;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/let", ["rxjs/Observable", "rxjs/operator/let"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var let_1 = require('../operator/let');
    Observable_1.Observable.prototype.let = let_1.letProto;
    Observable_1.Observable.prototype.letBind = let_1.letProto;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/map", ["rxjs/Observable", "rxjs/operator/map"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var map_1 = require('../operator/map');
    Observable_1.Observable.prototype.map = map_1.map;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/mapTo", ["rxjs/Observable", "rxjs/operator/mapTo"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var mapTo_1 = require('../operator/mapTo');
    Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/materialize", ["rxjs/Observable", "rxjs/operator/materialize"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var materialize_1 = require('../operator/materialize');
    Observable_1.Observable.prototype.materialize = materialize_1.materialize;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/merge", ["rxjs/Observable", "rxjs/operator/merge"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var merge_1 = require('../operator/merge');
    Observable_1.Observable.prototype.merge = merge_1.merge;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/mergeAll", ["rxjs/Observable", "rxjs/operator/mergeAll"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var mergeAll_1 = require('../operator/mergeAll');
    Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/mergeMap", ["rxjs/Observable", "rxjs/operator/mergeMap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var mergeMap_1 = require('../operator/mergeMap');
    Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
    Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/mergeMapTo", ["rxjs/Observable", "rxjs/operator/mergeMapTo"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var mergeMapTo_1 = require('../operator/mergeMapTo');
    Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/multicast", ["rxjs/observable/ConnectableObservable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var ConnectableObservable_1 = require('../observable/ConnectableObservable');
    function multicast(subjectOrSubjectFactory) {
      var subjectFactory;
      if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
      } else {
        subjectFactory = function subjectFactory() {
          return subjectOrSubjectFactory;
        };
      }
      return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
    }
    exports.multicast = multicast;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/observeOn", ["rxjs/Observable", "rxjs/operator/observeOn"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var observeOn_1 = require('../operator/observeOn');
    Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/partition", ["rxjs/util/not", "rxjs/operator/filter"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var not_1 = require('../util/not');
    var filter_1 = require('../operator/filter');
    function partition(predicate, thisArg) {
      return [filter_1.filter.call(this, predicate), filter_1.filter.call(this, not_1.not(predicate, thisArg))];
    }
    exports.partition = partition;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/pluck", ["rxjs/Observable", "rxjs/operator/pluck"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var pluck_1 = require('../operator/pluck');
    Observable_1.Observable.prototype.pluck = pluck_1.pluck;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/publish", ["rxjs/Observable", "rxjs/operator/publish"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var publish_1 = require('../operator/publish');
    Observable_1.Observable.prototype.publish = publish_1.publish;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/subject/BehaviorSubject", ["rxjs/Subject", "rxjs/util/throwError", "rxjs/util/ObjectUnsubscribedError"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1 = require('../Subject');
    var throwError_1 = require('../util/throwError');
    var ObjectUnsubscribedError_1 = require('../util/ObjectUnsubscribedError');
    var BehaviorSubject = (function(_super) {
      __extends(BehaviorSubject, _super);
      function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
      }
      BehaviorSubject.prototype.getValue = function() {
        if (this.hasErrored) {
          throwError_1.throwError(this.errorValue);
        } else if (this.isUnsubscribed) {
          throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
        } else {
          return this._value;
        }
      };
      Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function() {
          return this.getValue();
        },
        enumerable: true,
        configurable: true
      });
      BehaviorSubject.prototype._subscribe = function(subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.isUnsubscribed) {
          subscriber.next(this._value);
        }
        return subscription;
      };
      BehaviorSubject.prototype._next = function(value) {
        _super.prototype._next.call(this, this._value = value);
      };
      BehaviorSubject.prototype._error = function(err) {
        this.hasErrored = true;
        _super.prototype._error.call(this, this.errorValue = err);
      };
      return BehaviorSubject;
    })(Subject_1.Subject);
    exports.BehaviorSubject = BehaviorSubject;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/subject/ReplaySubject", ["rxjs/Subject", "rxjs/scheduler/queue", "rxjs/operator/observeOn-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1 = require('../Subject');
    var queue_1 = require('../scheduler/queue');
    var observeOn_support_1 = require('../operator/observeOn-support');
    var ReplaySubject = (function(_super) {
      __extends(ReplaySubject, _super);
      function ReplaySubject(bufferSize, windowSize, scheduler) {
        if (bufferSize === void 0) {
          bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowSize === void 0) {
          windowSize = Number.POSITIVE_INFINITY;
        }
        _super.call(this);
        this.events = [];
        this.scheduler = scheduler;
        this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this.windowSize = windowSize < 1 ? 1 : windowSize;
      }
      ReplaySubject.prototype._next = function(value) {
        var now = this._getNow();
        this.events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents(now);
        _super.prototype._next.call(this, value);
      };
      ReplaySubject.prototype._subscribe = function(subscriber) {
        var events = this._trimBufferThenGetEvents(this._getNow());
        var scheduler = this.scheduler;
        if (scheduler) {
          subscriber.add(subscriber = new observeOn_support_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var index = -1;
        var len = events.length;
        while (++index < len && !subscriber.isUnsubscribed) {
          subscriber.next(events[index].value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
      };
      ReplaySubject.prototype._getNow = function() {
        return (this.scheduler || queue_1.queue).now();
      };
      ReplaySubject.prototype._trimBufferThenGetEvents = function(now) {
        var bufferSize = this.bufferSize;
        var windowSize = this.windowSize;
        var events = this.events;
        var eventsCount = events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
          if ((now - events[spliceCount].time) < windowSize) {
            break;
          }
          spliceCount += 1;
        }
        if (eventsCount > bufferSize) {
          spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
        }
        if (spliceCount > 0) {
          events.splice(0, spliceCount);
        }
        return events;
      };
      return ReplaySubject;
    })(Subject_1.Subject);
    exports.ReplaySubject = ReplaySubject;
    var ReplayEvent = (function() {
      function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
      }
      return ReplayEvent;
    })();
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/publishLast", ["rxjs/Observable", "rxjs/operator/publishLast"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var publishLast_1 = require('../operator/publishLast');
    Observable_1.Observable.prototype.publishLast = publishLast_1.publishLast;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/race", ["rxjs/Observable", "rxjs/operator/race"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var race_1 = require('../operator/race');
    Observable_1.Observable.prototype.race = race_1.race;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/reduce", ["rxjs/operator/reduce-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var reduce_support_1 = require('../operator/reduce-support');
    function reduce(project, seed) {
      return this.lift(new reduce_support_1.ReduceOperator(project, seed));
    }
    exports.reduce = reduce;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/repeat", ["rxjs/Observable", "rxjs/operator/repeat"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var repeat_1 = require('../operator/repeat');
    Observable_1.Observable.prototype.repeat = repeat_1.repeat;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/retry", ["rxjs/Observable", "rxjs/operator/retry"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var retry_1 = require('../operator/retry');
    Observable_1.Observable.prototype.retry = retry_1.retry;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/retryWhen", ["rxjs/Observable", "rxjs/operator/retryWhen"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var retryWhen_1 = require('../operator/retryWhen');
    Observable_1.Observable.prototype.retryWhen = retryWhen_1.retryWhen;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/sample", ["rxjs/Observable", "rxjs/operator/sample"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var sample_1 = require('../operator/sample');
    Observable_1.Observable.prototype.sample = sample_1.sample;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/sampleTime", ["rxjs/Observable", "rxjs/operator/sampleTime"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var sampleTime_1 = require('../operator/sampleTime');
    Observable_1.Observable.prototype.sampleTime = sampleTime_1.sampleTime;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/scan", ["rxjs/Observable", "rxjs/operator/scan"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var scan_1 = require('../operator/scan');
    Observable_1.Observable.prototype.scan = scan_1.scan;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/share", ["rxjs/Observable", "rxjs/operator/share"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var share_1 = require('../operator/share');
    Observable_1.Observable.prototype.share = share_1.share;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/single", ["rxjs/Observable", "rxjs/operator/single"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var single_1 = require('../operator/single');
    Observable_1.Observable.prototype.single = single_1.single;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/skip", ["rxjs/Observable", "rxjs/operator/skip"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var skip_1 = require('../operator/skip');
    Observable_1.Observable.prototype.skip = skip_1.skip;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/skipUntil", ["rxjs/Observable", "rxjs/operator/skipUntil"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var skipUntil_1 = require('../operator/skipUntil');
    Observable_1.Observable.prototype.skipUntil = skipUntil_1.skipUntil;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/skipWhile", ["rxjs/Observable", "rxjs/operator/skipWhile"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var skipWhile_1 = require('../operator/skipWhile');
    Observable_1.Observable.prototype.skipWhile = skipWhile_1.skipWhile;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/startWith", ["rxjs/Observable", "rxjs/operator/startWith"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var startWith_1 = require('../operator/startWith');
    Observable_1.Observable.prototype.startWith = startWith_1.startWith;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/subscribeOn", ["rxjs/observable/SubscribeOnObservable"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var SubscribeOnObservable_1 = require('../observable/SubscribeOnObservable');
    function subscribeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
    }
    exports.subscribeOn = subscribeOn;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/switch", ["rxjs/Observable", "rxjs/operator/switch"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var switch_1 = require('../operator/switch');
    Observable_1.Observable.prototype.switch = switch_1._switch;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/switchMap", ["rxjs/Observable", "rxjs/operator/switchMap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var switchMap_1 = require('../operator/switchMap');
    Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/switchMapTo", ["rxjs/Observable", "rxjs/operator/switchMapTo"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var switchMapTo_1 = require('../operator/switchMapTo');
    Observable_1.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/take", ["rxjs/Subscriber", "rxjs/util/ArgumentOutOfRangeError", "rxjs/observable/empty"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var ArgumentOutOfRangeError_1 = require('../util/ArgumentOutOfRangeError');
    var empty_1 = require('../observable/empty');
    function take(total) {
      if (total === 0) {
        return new empty_1.EmptyObservable();
      } else {
        return this.lift(new TakeOperator(total));
      }
    }
    exports.take = take;
    var TakeOperator = (function() {
      function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
          throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
      }
      TakeOperator.prototype.call = function(subscriber) {
        return new TakeSubscriber(subscriber, this.total);
      };
      return TakeOperator;
    })();
    var TakeSubscriber = (function(_super) {
      __extends(TakeSubscriber, _super);
      function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
      }
      TakeSubscriber.prototype._next = function(value) {
        var total = this.total;
        if (++this.count <= total) {
          this.destination.next(value);
          if (this.count === total) {
            this.destination.complete();
          }
        }
      };
      return TakeSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/takeUntil", ["rxjs/Observable", "rxjs/operator/takeUntil"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var takeUntil_1 = require('../operator/takeUntil');
    Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/takeWhile", ["rxjs/Observable", "rxjs/operator/takeWhile"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var takeWhile_1 = require('../operator/takeWhile');
    Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/throttle", ["rxjs/Observable", "rxjs/operator/throttle"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var throttle_1 = require('../operator/throttle');
    Observable_1.Observable.prototype.throttle = throttle_1.throttle;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/throttleTime", ["rxjs/Observable", "rxjs/operator/throttleTime"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var throttleTime_1 = require('../operator/throttleTime');
    Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/timeout", ["rxjs/Observable", "rxjs/operator/timeout"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var timeout_1 = require('../operator/timeout');
    Observable_1.Observable.prototype.timeout = timeout_1.timeout;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/timeoutWith", ["rxjs/Observable", "rxjs/operator/timeoutWith"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var timeoutWith_1 = require('../operator/timeoutWith');
    Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/toArray", ["rxjs/Observable", "rxjs/operator/toArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var toArray_1 = require('../operator/toArray');
    Observable_1.Observable.prototype.toArray = toArray_1.toArray;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/toPromise", ["rxjs/Observable", "rxjs/operator/toPromise"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var toPromise_1 = require('../operator/toPromise');
    Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/window", ["rxjs/Observable", "rxjs/operator/window"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var window_1 = require('../operator/window');
    Observable_1.Observable.prototype.window = window_1.window;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/windowCount", ["rxjs/Observable", "rxjs/operator/windowCount"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var windowCount_1 = require('../operator/windowCount');
    Observable_1.Observable.prototype.windowCount = windowCount_1.windowCount;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/windowTime", ["rxjs/Observable", "rxjs/operator/windowTime"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var windowTime_1 = require('../operator/windowTime');
    Observable_1.Observable.prototype.windowTime = windowTime_1.windowTime;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/windowToggle", ["rxjs/Observable", "rxjs/operator/windowToggle"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var windowToggle_1 = require('../operator/windowToggle');
    Observable_1.Observable.prototype.windowToggle = windowToggle_1.windowToggle;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/windowWhen", ["rxjs/Observable", "rxjs/operator/windowWhen"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var windowWhen_1 = require('../operator/windowWhen');
    Observable_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/withLatestFrom", ["rxjs/Observable", "rxjs/operator/withLatestFrom"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var withLatestFrom_1 = require('../operator/withLatestFrom');
    Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/zip", ["rxjs/Observable", "rxjs/operator/zip"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var zip_1 = require('../operator/zip');
    Observable_1.Observable.prototype.zip = zip_1.zipProto;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/zipAll", ["rxjs/Observable", "rxjs/operator/zipAll"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var zipAll_1 = require('../operator/zipAll');
    Observable_1.Observable.prototype.zipAll = zipAll_1.zipAll;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Subscriber", ["rxjs/util/noop", "rxjs/util/throwError", "rxjs/util/tryOrThrowError", "rxjs/Subscription", "rxjs/symbol/rxSubscriber", "rxjs/Observer"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var noop_1 = require('../util/noop');
    var throwError_1 = require('../util/throwError');
    var tryOrThrowError_1 = require('../util/tryOrThrowError');
    var Subscription_1 = require('../Subscription');
    var rxSubscriber_1 = require('../symbol/rxSubscriber');
    var Observer_1 = require('../Observer');
    var Subscriber = (function(_super) {
      __extends(Subscriber, _super);
      function Subscriber(destination) {
        if (destination === void 0) {
          destination = Observer_1.empty;
        }
        _super.call(this);
        this.isStopped = false;
        this.destination = destination;
        if (!destination || (destination instanceof Subscriber) || (destination === Observer_1.empty)) {
          return;
        }
        if (typeof destination.next !== 'function') {
          destination.next = noop_1.noop;
        }
        if (typeof destination.error !== 'function') {
          destination.error = throwError_1.throwError;
        }
        if (typeof destination.complete !== 'function') {
          destination.complete = noop_1.noop;
        }
      }
      Subscriber.create = function(next, error, complete) {
        return new SafeSubscriber(next, error, complete);
      };
      Subscriber.prototype.next = function(value) {
        if (!this.isStopped) {
          this._next(value);
        }
      };
      Subscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber.prototype.complete = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber.prototype.unsubscribe = function() {
        if (this.isUnsubscribed) {
          return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
      };
      Subscriber.prototype._next = function(value) {
        this.destination.next(value);
      };
      Subscriber.prototype._error = function(err) {
        this.destination.error(err);
        this.unsubscribe();
      };
      Subscriber.prototype._complete = function() {
        this.destination.complete();
        this.unsubscribe();
      };
      Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function() {
        return this;
      };
      return Subscriber;
    })(Subscription_1.Subscription);
    exports.Subscriber = Subscriber;
    var SafeSubscriber = (function(_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(next, error, complete) {
        _super.call(this);
        this._next = (typeof next === 'function') && tryOrThrowError_1.tryOrThrowError(next) || null;
        this._error = (typeof error === 'function') && tryOrThrowError_1.tryOrThrowError(error) || throwError_1.throwError;
        this._complete = (typeof complete === 'function') && tryOrThrowError_1.tryOrThrowError(complete) || null;
      }
      SafeSubscriber.prototype.next = function(value) {
        if (!this.isStopped && this._next) {
          this._next(value);
        }
      };
      SafeSubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          if (this._error) {
            this._error(err);
          }
          this.unsubscribe();
        }
      };
      SafeSubscriber.prototype.complete = function() {
        if (!this.isStopped) {
          if (this._complete) {
            this._complete();
          }
          this.unsubscribe();
        }
      };
      return SafeSubscriber;
    })(Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/combineLatest-support", ["rxjs/util/tryCatch", "rxjs/util/errorObject", "rxjs/OuterSubscriber", "rxjs/util/subscribeToResult"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    var OuterSubscriber_1 = require('../OuterSubscriber');
    var subscribeToResult_1 = require('../util/subscribeToResult');
    var CombineLatestOperator = (function() {
      function CombineLatestOperator(project) {
        this.project = project;
      }
      CombineLatestOperator.prototype.call = function(subscriber) {
        return new CombineLatestSubscriber(subscriber, this.project);
      };
      return CombineLatestOperator;
    })();
    exports.CombineLatestOperator = CombineLatestOperator;
    var CombineLatestSubscriber = (function(_super) {
      __extends(CombineLatestSubscriber, _super);
      function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
        this.toRespond = [];
      }
      CombineLatestSubscriber.prototype._next = function(observable) {
        var toRespond = this.toRespond;
        toRespond.push(toRespond.length);
        this.observables.push(observable);
      };
      CombineLatestSubscriber.prototype._complete = function() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
          this.destination.complete();
        } else {
          this.active = len;
          for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
          }
        }
      };
      CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
        if ((this.active -= 1) === 0) {
          this.destination.complete();
        }
      };
      CombineLatestSubscriber.prototype.notifyNext = function(observable, value, outerIndex, innerIndex) {
        var values = this.values;
        values[outerIndex] = value;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
          var found = toRespond.indexOf(outerIndex);
          if (found !== -1) {
            toRespond.splice(found, 1);
          }
        }
        if (toRespond.length === 0) {
          var project = this.project;
          var destination = this.destination;
          if (project) {
            var result = tryCatch_1.tryCatch(project).apply(this, values);
            if (result === errorObject_1.errorObject) {
              destination.error(errorObject_1.errorObject.e);
            } else {
              destination.next(result);
            }
          } else {
            destination.next(values);
          }
        }
      };
      return CombineLatestSubscriber;
    })(OuterSubscriber_1.OuterSubscriber);
    exports.CombineLatestSubscriber = CombineLatestSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/concat-static", ["rxjs/Observable", "rxjs/operator/concat-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var concat_static_1 = require('../operator/concat-static');
    Observable_1.Observable.concat = concat_static_1.concat;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/race-static", ["rxjs/Observable", "rxjs/operator/race-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var race_static_1 = require('../operator/race-static');
    Observable_1.Observable.race = race_static_1.race;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/bindCallback", ["rxjs/Observable", "rxjs/observable/bindCallback"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var bindCallback_1 = require('../observable/bindCallback');
    Observable_1.Observable.bindCallback = bindCallback_1.BoundCallbackObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/forkJoin", ["rxjs/Observable", "rxjs/observable/forkJoin"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var forkJoin_1 = require('../observable/forkJoin');
    Observable_1.Observable.forkJoin = forkJoin_1.ForkJoinObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/from", ["rxjs/util/isArray", "rxjs/util/isPromise", "rxjs/observable/fromPromise", "rxjs/observable/IteratorObservable", "rxjs/observable/fromArray", "rxjs/util/SymbolShim", "rxjs/Observable", "rxjs/operator/observeOn-support"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isArray_1 = require('../util/isArray');
    var isPromise_1 = require('../util/isPromise');
    var fromPromise_1 = require('../observable/fromPromise');
    var IteratorObservable_1 = require('../observable/IteratorObservable');
    var fromArray_1 = require('../observable/fromArray');
    var SymbolShim_1 = require('../util/SymbolShim');
    var Observable_1 = require('../Observable');
    var observeOn_support_1 = require('../operator/observeOn-support');
    var FromObservable = (function(_super) {
      __extends(FromObservable, _super);
      function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
      }
      FromObservable.create = function(ish, scheduler) {
        if (scheduler === void 0) {
          scheduler = null;
        }
        if (ish != null) {
          if (typeof ish[SymbolShim_1.SymbolShim.observable] === 'function') {
            if (ish instanceof Observable_1.Observable && !scheduler) {
              return ish;
            }
            return new FromObservable(ish, scheduler);
          }
          if (isArray_1.isArray(ish)) {
            return new fromArray_1.ArrayObservable(ish, scheduler);
          } else if (isPromise_1.isPromise(ish)) {
            return new fromPromise_1.PromiseObservable(ish, scheduler);
          } else if (typeof ish[SymbolShim_1.SymbolShim.iterator] === 'function' || typeof ish === 'string') {
            return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
          }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
      };
      FromObservable.prototype._subscribe = function(subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
          return ish[SymbolShim_1.SymbolShim.observable]().subscribe(subscriber);
        } else {
          return ish[SymbolShim_1.SymbolShim.observable]().subscribe(new observeOn_support_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
      };
      return FromObservable;
    })(Observable_1.Observable);
    exports.FromObservable = FromObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/AsapScheduler", ["rxjs/scheduler/AsapAction", "rxjs/scheduler/QueueScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AsapAction_1 = require('../scheduler/AsapAction');
    var QueueScheduler_1 = require('../scheduler/QueueScheduler');
    var AsapScheduler = (function(_super) {
      __extends(AsapScheduler, _super);
      function AsapScheduler() {
        _super.apply(this, arguments);
      }
      AsapScheduler.prototype.scheduleNow = function(work, state) {
        return new AsapAction_1.AsapAction(this, work).schedule(state);
      };
      return AsapScheduler;
    })(QueueScheduler_1.QueueScheduler);
    exports.AsapScheduler = AsapScheduler;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/timer", ["rxjs/Observable", "rxjs/observable/timer"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var timer_1 = require('../observable/timer');
    Observable_1.Observable.timer = timer_1.TimerObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/zip-static", ["rxjs/Observable", "rxjs/operator/zip-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var zip_static_1 = require('../operator/zip-static');
    Observable_1.Observable.zip = zip_static_1.zip;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/concatMap", ["rxjs/Observable", "rxjs/operator/concatMap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var concatMap_1 = require('../operator/concatMap');
    Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/concatMapTo", ["rxjs/Observable", "rxjs/operator/concatMapTo"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var concatMapTo_1 = require('../operator/concatMapTo');
    Observable_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/expand", ["rxjs/Observable", "rxjs/operator/expand"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var expand_1 = require('../operator/expand');
    Observable_1.Observable.prototype.expand = expand_1.expand;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/first", ["rxjs/Observable", "rxjs/operator/first"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var first_1 = require('../operator/first');
    Observable_1.Observable.prototype.first = first_1.first;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/groupBy", ["rxjs/Subscriber", "rxjs/Observable", "rxjs/Subject", "rxjs/util/Map", "rxjs/util/FastMap", "rxjs/operator/groupBy-support", "rxjs/util/tryCatch", "rxjs/util/errorObject"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = require('../Subscriber');
    var Observable_1 = require('../Observable');
    var Subject_1 = require('../Subject');
    var Map_1 = require('../util/Map');
    var FastMap_1 = require('../util/FastMap');
    var groupBy_support_1 = require('../operator/groupBy-support');
    var tryCatch_1 = require('../util/tryCatch');
    var errorObject_1 = require('../util/errorObject');
    function groupBy(keySelector, elementSelector, durationSelector) {
      return new GroupByObservable(this, keySelector, elementSelector, durationSelector);
    }
    exports.groupBy = groupBy;
    var GroupByObservable = (function(_super) {
      __extends(GroupByObservable, _super);
      function GroupByObservable(source, keySelector, elementSelector, durationSelector) {
        _super.call(this);
        this.source = source;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
      }
      GroupByObservable.prototype._subscribe = function(subscriber) {
        var refCountSubscription = new groupBy_support_1.RefCountSubscription();
        var groupBySubscriber = new GroupBySubscriber(subscriber, refCountSubscription, this.keySelector, this.elementSelector, this.durationSelector);
        refCountSubscription.setPrimary(this.source.subscribe(groupBySubscriber));
        return refCountSubscription;
      };
      return GroupByObservable;
    })(Observable_1.Observable);
    exports.GroupByObservable = GroupByObservable;
    var GroupBySubscriber = (function(_super) {
      __extends(GroupBySubscriber, _super);
      function GroupBySubscriber(destination, refCountSubscription, keySelector, elementSelector, durationSelector) {
        _super.call(this);
        this.refCountSubscription = refCountSubscription;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.groups = null;
        this.destination = destination;
        this.add(destination);
      }
      GroupBySubscriber.prototype._next = function(x) {
        var key = tryCatch_1.tryCatch(this.keySelector)(x);
        if (key === errorObject_1.errorObject) {
          this.error(errorObject_1.errorObject.e);
        } else {
          var groups = this.groups;
          var elementSelector = this.elementSelector;
          var durationSelector = this.durationSelector;
          if (!groups) {
            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
          }
          var group = groups.get(key);
          if (!group) {
            groups.set(key, group = new Subject_1.Subject());
            var groupedObservable = new groupBy_support_1.GroupedObservable(key, group, this.refCountSubscription);
            if (durationSelector) {
              var duration = tryCatch_1.tryCatch(durationSelector)(new groupBy_support_1.GroupedObservable(key, group));
              if (duration === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
              } else {
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
              }
            }
            this.destination.next(groupedObservable);
          }
          if (elementSelector) {
            var value = tryCatch_1.tryCatch(elementSelector)(x);
            if (value === errorObject_1.errorObject) {
              this.error(errorObject_1.errorObject.e);
            } else {
              group.next(value);
            }
          } else {
            group.next(x);
          }
        }
      };
      GroupBySubscriber.prototype._error = function(err) {
        var _this = this;
        var groups = this.groups;
        if (groups) {
          groups.forEach(function(group, key) {
            group.error(err);
            _this.removeGroup(key);
          });
        }
        this.destination.error(err);
      };
      GroupBySubscriber.prototype._complete = function() {
        var _this = this;
        var groups = this.groups;
        if (groups) {
          groups.forEach(function(group, key) {
            group.complete();
            _this.removeGroup(key);
          });
        }
        this.destination.complete();
      };
      GroupBySubscriber.prototype.removeGroup = function(key) {
        this.groups.delete(key);
      };
      return GroupBySubscriber;
    })(Subscriber_1.Subscriber);
    var GroupDurationSubscriber = (function(_super) {
      __extends(GroupDurationSubscriber, _super);
      function GroupDurationSubscriber(key, group, parent) {
        _super.call(this);
        this.key = key;
        this.group = group;
        this.parent = parent;
      }
      GroupDurationSubscriber.prototype._next = function(value) {
        this.group.complete();
        this.parent.removeGroup(this.key);
      };
      GroupDurationSubscriber.prototype._error = function(err) {
        this.group.error(err);
        this.parent.removeGroup(this.key);
      };
      GroupDurationSubscriber.prototype._complete = function() {
        this.group.complete();
        this.parent.removeGroup(this.key);
      };
      return GroupDurationSubscriber;
    })(Subscriber_1.Subscriber);
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/multicast", ["rxjs/Observable", "rxjs/operator/multicast"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var multicast_1 = require('../operator/multicast');
    Observable_1.Observable.prototype.multicast = multicast_1.multicast;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/partition", ["rxjs/Observable", "rxjs/operator/partition"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var partition_1 = require('../operator/partition');
    Observable_1.Observable.prototype.partition = partition_1.partition;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/publishBehavior", ["rxjs/subject/BehaviorSubject", "rxjs/operator/multicast"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var BehaviorSubject_1 = require('../subject/BehaviorSubject');
    var multicast_1 = require('../operator/multicast');
    function publishBehavior(value) {
      return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
    }
    exports.publishBehavior = publishBehavior;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/publishReplay", ["rxjs/subject/ReplaySubject", "rxjs/operator/multicast"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var ReplaySubject_1 = require('../subject/ReplaySubject');
    var multicast_1 = require('../operator/multicast');
    function publishReplay(bufferSize, windowTime, scheduler) {
      if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
      }
      if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
      }
      return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
    }
    exports.publishReplay = publishReplay;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/reduce", ["rxjs/Observable", "rxjs/operator/reduce"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var reduce_1 = require('../operator/reduce');
    Observable_1.Observable.prototype.reduce = reduce_1.reduce;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/subscribeOn", ["rxjs/Observable", "rxjs/operator/subscribeOn"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var subscribeOn_1 = require('../operator/subscribeOn');
    Observable_1.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/take", ["rxjs/Observable", "rxjs/operator/take"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var take_1 = require('../operator/take');
    Observable_1.Observable.prototype.take = take_1.take;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/util/toSubscriber", ["rxjs/Subscriber", "rxjs/symbol/rxSubscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Subscriber_1 = require('../Subscriber');
    var rxSubscriber_1 = require('../symbol/rxSubscriber');
    function toSubscriber(next, error, complete) {
      if (next && typeof next === 'object') {
        if (next instanceof Subscriber_1.Subscriber) {
          return next;
        } else if (typeof next[rxSubscriber_1.rxSubscriber] === 'function') {
          return next[rxSubscriber_1.rxSubscriber]();
        } else {
          return new Subscriber_1.Subscriber(next);
        }
      }
      return Subscriber_1.Subscriber.create(next, error, complete);
    }
    exports.toSubscriber = toSubscriber;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/operator/combineLatest-static", ["rxjs/observable/fromArray", "rxjs/operator/combineLatest-support", "rxjs/util/isScheduler", "rxjs/util/isArray"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var fromArray_1 = require('../observable/fromArray');
    var combineLatest_support_1 = require('../operator/combineLatest-support');
    var isScheduler_1 = require('../util/isScheduler');
    var isArray_1 = require('../util/isArray');
    function combineLatest() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var project = null;
      var scheduler = null;
      if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
      }
      if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
      }
      if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
      }
      return new fromArray_1.ArrayObservable(observables, scheduler).lift(new combineLatest_support_1.CombineLatestOperator(project));
    }
    exports.combineLatest = combineLatest;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/from", ["rxjs/Observable", "rxjs/observable/from"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var from_1 = require('../observable/from');
    Observable_1.Observable.from = from_1.FromObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/scheduler/asap", ["rxjs/scheduler/AsapScheduler"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var AsapScheduler_1 = require('../scheduler/AsapScheduler');
    exports.asap = new AsapScheduler_1.AsapScheduler();
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/groupBy", ["rxjs/Observable", "rxjs/operator/groupBy"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var groupBy_1 = require('../operator/groupBy');
    Observable_1.Observable.prototype.groupBy = groupBy_1.groupBy;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/publishBehavior", ["rxjs/Observable", "rxjs/operator/publishBehavior"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var publishBehavior_1 = require('../operator/publishBehavior');
    Observable_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/publishReplay", ["rxjs/Observable", "rxjs/operator/publishReplay"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var publishReplay_1 = require('../operator/publishReplay');
    Observable_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Observable", ["rxjs/util/root", "rxjs/util/SymbolShim", "rxjs/util/toSubscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var root_1 = require('../util/root');
    var SymbolShim_1 = require('../util/SymbolShim');
    var toSubscriber_1 = require('../util/toSubscriber');
    var Observable = (function() {
      function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
          this._subscribe = subscribe;
        }
      }
      Observable.prototype.lift = function(operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      Observable.prototype.subscribe = function(observerOrNext, error, complete) {
        var operator = this.operator;
        var subscriber = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
          subscriber.add(this._subscribe(this.operator.call(subscriber)));
        } else {
          subscriber.add(this._subscribe(subscriber));
        }
        return subscriber;
      };
      Observable.prototype.forEach = function(next, thisArg, PromiseCtor) {
        if (!PromiseCtor) {
          if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
          } else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
          }
        }
        if (!PromiseCtor) {
          throw new Error('no Promise impl found');
        }
        var nextHandler;
        if (thisArg) {
          nextHandler = function nextHandlerFn(value) {
            var _a = nextHandlerFn,
                thisArg = _a.thisArg,
                next = _a.next;
            return next.call(thisArg, value);
          };
          nextHandler.thisArg = thisArg;
          nextHandler.next = next;
        } else {
          nextHandler = next;
        }
        var promiseCallback = function promiseCallbackFn(resolve, reject) {
          var _a = promiseCallbackFn,
              source = _a.source,
              nextHandler = _a.nextHandler;
          source.subscribe(nextHandler, reject, resolve);
        };
        promiseCallback.source = this;
        promiseCallback.nextHandler = nextHandler;
        return new PromiseCtor(promiseCallback);
      };
      Observable.prototype._subscribe = function(subscriber) {
        return this.source.subscribe(subscriber);
      };
      Observable.prototype[SymbolShim_1.SymbolShim.observable] = function() {
        return this;
      };
      Observable.create = function(subscribe) {
        return new Observable(subscribe);
      };
      return Observable;
    })();
    exports.Observable = Observable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/operator/combineLatest-static", ["rxjs/Observable", "rxjs/operator/combineLatest-static"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var combineLatest_static_1 = require('../operator/combineLatest-static');
    Observable_1.Observable.combineLatest = combineLatest_static_1.combineLatest;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/observable/interval", ["rxjs/util/isNumeric", "rxjs/Observable", "rxjs/scheduler/asap"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isNumeric_1 = require('../util/isNumeric');
    var Observable_1 = require('../Observable');
    var asap_1 = require('../scheduler/asap');
    var IntervalObservable = (function(_super) {
      __extends(IntervalObservable, _super);
      function IntervalObservable(period, scheduler) {
        if (period === void 0) {
          period = 0;
        }
        if (scheduler === void 0) {
          scheduler = asap_1.asap;
        }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
          this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
          this.scheduler = asap_1.asap;
        }
      }
      IntervalObservable.create = function(period, scheduler) {
        if (period === void 0) {
          period = 0;
        }
        if (scheduler === void 0) {
          scheduler = asap_1.asap;
        }
        return new IntervalObservable(period, scheduler);
      };
      IntervalObservable.dispatch = function(state) {
        var index = state.index,
            subscriber = state.subscriber,
            period = state.period;
        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
          return;
        }
        state.index += 1;
        this.schedule(state, period);
      };
      IntervalObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
          index: index,
          subscriber: subscriber,
          period: period
        }));
      };
      return IntervalObservable;
    })(Observable_1.Observable);
    exports.IntervalObservable = IntervalObservable;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Subject", ["rxjs/Observable", "rxjs/Subscriber", "rxjs/Subscription", "rxjs/subject/SubjectSubscription", "rxjs/symbol/rxSubscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = require('../Observable');
    var Subscriber_1 = require('../Subscriber');
    var Subscription_1 = require('../Subscription');
    var SubjectSubscription_1 = require('../subject/SubjectSubscription');
    var rxSubscriber_1 = require('../symbol/rxSubscriber');
    var Subject = (function(_super) {
      __extends(Subject, _super);
      function Subject(source, destination) {
        _super.call(this);
        this.observers = [];
        this.isUnsubscribed = false;
        this.isStopped = false;
        this.hasErrored = false;
        this.dispatching = false;
        this.hasCompleted = false;
        this.source = source;
        this.destination = destination;
      }
      Subject.prototype.lift = function(operator) {
        var subject = new Subject(this, this.destination || this);
        subject.operator = operator;
        return subject;
      };
      Subject.prototype.add = function(subscription) {
        Subscription_1.Subscription.prototype.add.call(this, subscription);
      };
      Subject.prototype.remove = function(subscription) {
        Subscription_1.Subscription.prototype.remove.call(this, subscription);
      };
      Subject.prototype.unsubscribe = function() {
        Subscription_1.Subscription.prototype.unsubscribe.call(this);
      };
      Subject.prototype._subscribe = function(subscriber) {
        if (this.source) {
          return this.source.subscribe(subscriber);
        } else {
          if (subscriber.isUnsubscribed) {
            return;
          } else if (this.hasErrored) {
            return subscriber.error(this.errorValue);
          } else if (this.hasCompleted) {
            return subscriber.complete();
          } else if (this.isUnsubscribed) {
            throw new Error('Cannot subscribe to a disposed Subject.');
          }
          var subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
          this.observers.push(subscriber);
          return subscription;
        }
      };
      Subject.prototype._unsubscribe = function() {
        this.source = null;
        this.isStopped = true;
        this.observers = null;
        this.destination = null;
      };
      Subject.prototype.next = function(value) {
        if (this.isStopped) {
          return;
        }
        this.dispatching = true;
        this._next(value);
        this.dispatching = false;
        if (this.hasErrored) {
          this._error(this.errorValue);
        } else if (this.hasCompleted) {
          this._complete();
        }
      };
      Subject.prototype.error = function(err) {
        if (this.isStopped) {
          return;
        }
        this.isStopped = true;
        this.hasErrored = true;
        this.errorValue = err;
        if (this.dispatching) {
          return;
        }
        this._error(err);
      };
      Subject.prototype.complete = function() {
        if (this.isStopped) {
          return;
        }
        this.isStopped = true;
        this.hasCompleted = true;
        if (this.dispatching) {
          return;
        }
        this._complete();
      };
      Subject.prototype._next = function(value) {
        if (this.destination) {
          this.destination.next(value);
        } else {
          this._finalNext(value);
        }
      };
      Subject.prototype._finalNext = function(value) {
        var index = -1;
        var observers = this.observers.slice(0);
        var len = observers.length;
        while (++index < len) {
          observers[index].next(value);
        }
      };
      Subject.prototype._error = function(err) {
        if (this.destination) {
          this.destination.error(err);
        } else {
          this._finalError(err);
        }
      };
      Subject.prototype._finalError = function(err) {
        var index = -1;
        var observers = this.observers;
        this.observers = null;
        this.isUnsubscribed = true;
        if (observers) {
          var len = observers.length;
          while (++index < len) {
            observers[index].error(err);
          }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
      };
      Subject.prototype._complete = function() {
        if (this.destination) {
          this.destination.complete();
        } else {
          this._finalComplete();
        }
      };
      Subject.prototype._finalComplete = function() {
        var index = -1;
        var observers = this.observers;
        this.observers = null;
        this.isUnsubscribed = true;
        if (observers) {
          var len = observers.length;
          while (++index < len) {
            observers[index].complete();
          }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
      };
      Subject.prototype[rxSubscriber_1.rxSubscriber] = function() {
        return new Subscriber_1.Subscriber(this);
      };
      Subject.create = function(source, destination) {
        return new Subject(source, destination);
      };
      return Subject;
    })(Observable_1.Observable);
    exports.Subject = Subject;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/add/observable/interval", ["rxjs/Observable", "rxjs/observable/interval"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Observable_1 = require('../Observable');
    var interval_1 = require('../observable/interval');
    Observable_1.Observable.interval = interval_1.IntervalObservable.create;
    global.define = __define;
    return module.exports;
  });
  System.register("rxjs/Rx", ["rxjs/Subject", "rxjs/Observable", "rxjs/add/operator/combineLatest-static", "rxjs/add/operator/concat-static", "rxjs/add/operator/merge-static", "rxjs/add/operator/race-static", "rxjs/add/observable/bindCallback", "rxjs/add/observable/bindNodeCallback", "rxjs/add/observable/defer", "rxjs/add/observable/empty", "rxjs/add/observable/forkJoin", "rxjs/add/observable/from", "rxjs/add/observable/fromArray", "rxjs/add/observable/fromEvent", "rxjs/add/observable/fromEventPattern", "rxjs/add/observable/fromPromise", "rxjs/add/observable/interval", "rxjs/add/observable/never", "rxjs/add/observable/range", "rxjs/add/observable/throw", "rxjs/add/observable/timer", "rxjs/add/operator/zip-static", "rxjs/add/operator/buffer", "rxjs/add/operator/bufferCount", "rxjs/add/operator/bufferTime", "rxjs/add/operator/bufferToggle", "rxjs/add/operator/bufferWhen", "rxjs/add/operator/catch", "rxjs/add/operator/combineAll", "rxjs/add/operator/combineLatest", "rxjs/add/operator/concat", "rxjs/add/operator/concatAll", "rxjs/add/operator/concatMap", "rxjs/add/operator/concatMapTo", "rxjs/add/operator/count", "rxjs/add/operator/dematerialize", "rxjs/add/operator/debounce", "rxjs/add/operator/debounceTime", "rxjs/add/operator/defaultIfEmpty", "rxjs/add/operator/delay", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/operator/do", "rxjs/add/operator/expand", "rxjs/add/operator/filter", "rxjs/add/operator/finally", "rxjs/add/operator/first", "rxjs/add/operator/groupBy", "rxjs/add/operator/ignoreElements", "rxjs/add/operator/every", "rxjs/add/operator/last", "rxjs/add/operator/let", "rxjs/add/operator/map", "rxjs/add/operator/mapTo", "rxjs/add/operator/materialize", "rxjs/add/operator/merge", "rxjs/add/operator/mergeAll", "rxjs/add/operator/mergeMap", "rxjs/add/operator/mergeMapTo", "rxjs/add/operator/multicast", "rxjs/add/operator/observeOn", "rxjs/add/operator/partition", "rxjs/add/operator/pluck", "rxjs/add/operator/publish", "rxjs/add/operator/publishBehavior", "rxjs/add/operator/publishReplay", "rxjs/add/operator/publishLast", "rxjs/add/operator/race", "rxjs/add/operator/reduce", "rxjs/add/operator/repeat", "rxjs/add/operator/retry", "rxjs/add/operator/retryWhen", "rxjs/add/operator/sample", "rxjs/add/operator/sampleTime", "rxjs/add/operator/scan", "rxjs/add/operator/share", "rxjs/add/operator/single", "rxjs/add/operator/skip", "rxjs/add/operator/skipUntil", "rxjs/add/operator/skipWhile", "rxjs/add/operator/startWith", "rxjs/add/operator/subscribeOn", "rxjs/add/operator/switch", "rxjs/add/operator/switchMap", "rxjs/add/operator/switchMapTo", "rxjs/add/operator/take", "rxjs/add/operator/takeUntil", "rxjs/add/operator/takeWhile", "rxjs/add/operator/throttle", "rxjs/add/operator/throttleTime", "rxjs/add/operator/timeout", "rxjs/add/operator/timeoutWith", "rxjs/add/operator/toArray", "rxjs/add/operator/toPromise", "rxjs/add/operator/window", "rxjs/add/operator/windowCount", "rxjs/add/operator/windowTime", "rxjs/add/operator/windowToggle", "rxjs/add/operator/windowWhen", "rxjs/add/operator/withLatestFrom", "rxjs/add/operator/zip", "rxjs/add/operator/zipAll", "rxjs/Operator", "rxjs/Subscription", "rxjs/Subscriber", "rxjs/subject/AsyncSubject", "rxjs/subject/ReplaySubject", "rxjs/subject/BehaviorSubject", "rxjs/observable/ConnectableObservable", "rxjs/Notification", "rxjs/util/EmptyError", "rxjs/util/ArgumentOutOfRangeError", "rxjs/util/ObjectUnsubscribedError", "rxjs/scheduler/asap", "rxjs/scheduler/queue", "rxjs/symbol/rxSubscriber"], true, function(require, exports, module) {
    var global = System.global,
        __define = global.define;
    global.define = undefined;
    var Subject_1 = require('../Subject');
    exports.Subject = Subject_1.Subject;
    var Observable_1 = require('../Observable');
    exports.Observable = Observable_1.Observable;
    require('../add/operator/combineLatest-static');
    require('../add/operator/concat-static');
    require('../add/operator/merge-static');
    require('../add/operator/race-static');
    require('../add/observable/bindCallback');
    require('../add/observable/bindNodeCallback');
    require('../add/observable/defer');
    require('../add/observable/empty');
    require('../add/observable/forkJoin');
    require('../add/observable/from');
    require('../add/observable/fromArray');
    require('../add/observable/fromEvent');
    require('../add/observable/fromEventPattern');
    require('../add/observable/fromPromise');
    require('../add/observable/interval');
    require('../add/observable/never');
    require('../add/observable/range');
    require('../add/observable/throw');
    require('../add/observable/timer');
    require('../add/operator/zip-static');
    require('../add/operator/buffer');
    require('../add/operator/bufferCount');
    require('../add/operator/bufferTime');
    require('../add/operator/bufferToggle');
    require('../add/operator/bufferWhen');
    require('../add/operator/catch');
    require('../add/operator/combineAll');
    require('../add/operator/combineLatest');
    require('../add/operator/concat');
    require('../add/operator/concatAll');
    require('../add/operator/concatMap');
    require('../add/operator/concatMapTo');
    require('../add/operator/count');
    require('../add/operator/dematerialize');
    require('../add/operator/debounce');
    require('../add/operator/debounceTime');
    require('../add/operator/defaultIfEmpty');
    require('../add/operator/delay');
    require('../add/operator/distinctUntilChanged');
    require('../add/operator/do');
    require('../add/operator/expand');
    require('../add/operator/filter');
    require('../add/operator/finally');
    require('../add/operator/first');
    require('../add/operator/groupBy');
    require('../add/operator/ignoreElements');
    require('../add/operator/every');
    require('../add/operator/last');
    require('../add/operator/let');
    require('../add/operator/map');
    require('../add/operator/mapTo');
    require('../add/operator/materialize');
    require('../add/operator/merge');
    require('../add/operator/mergeAll');
    require('../add/operator/mergeMap');
    require('../add/operator/mergeMapTo');
    require('../add/operator/multicast');
    require('../add/operator/observeOn');
    require('../add/operator/partition');
    require('../add/operator/pluck');
    require('../add/operator/publish');
    require('../add/operator/publishBehavior');
    require('../add/operator/publishReplay');
    require('../add/operator/publishLast');
    require('../add/operator/race');
    require('../add/operator/reduce');
    require('../add/operator/repeat');
    require('../add/operator/retry');
    require('../add/operator/retryWhen');
    require('../add/operator/sample');
    require('../add/operator/sampleTime');
    require('../add/operator/scan');
    require('../add/operator/share');
    require('../add/operator/single');
    require('../add/operator/skip');
    require('../add/operator/skipUntil');
    require('../add/operator/skipWhile');
    require('../add/operator/startWith');
    require('../add/operator/subscribeOn');
    require('../add/operator/switch');
    require('../add/operator/switchMap');
    require('../add/operator/switchMapTo');
    require('../add/operator/take');
    require('../add/operator/takeUntil');
    require('../add/operator/takeWhile');
    require('../add/operator/throttle');
    require('../add/operator/throttleTime');
    require('../add/operator/timeout');
    require('../add/operator/timeoutWith');
    require('../add/operator/toArray');
    require('../add/operator/toPromise');
    require('../add/operator/window');
    require('../add/operator/windowCount');
    require('../add/operator/windowTime');
    require('../add/operator/windowToggle');
    require('../add/operator/windowWhen');
    require('../add/operator/withLatestFrom');
    require('../add/operator/zip');
    require('../add/operator/zipAll');
    var Operator_1 = require('../Operator');
    exports.Operator = Operator_1.Operator;
    var Subscription_1 = require('../Subscription');
    exports.Subscription = Subscription_1.Subscription;
    var Subscriber_1 = require('../Subscriber');
    exports.Subscriber = Subscriber_1.Subscriber;
    var AsyncSubject_1 = require('../subject/AsyncSubject');
    exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
    var ReplaySubject_1 = require('../subject/ReplaySubject');
    exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
    var BehaviorSubject_1 = require('../subject/BehaviorSubject');
    exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
    var ConnectableObservable_1 = require('../observable/ConnectableObservable');
    exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
    var Notification_1 = require('../Notification');
    exports.Notification = Notification_1.Notification;
    var EmptyError_1 = require('../util/EmptyError');
    exports.EmptyError = EmptyError_1.EmptyError;
    var ArgumentOutOfRangeError_1 = require('../util/ArgumentOutOfRangeError');
    exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    var ObjectUnsubscribedError_1 = require('../util/ObjectUnsubscribedError');
    exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
    var asap_1 = require('../scheduler/asap');
    var queue_1 = require('../scheduler/queue');
    var rxSubscriber_1 = require('../symbol/rxSubscriber');
    var Scheduler = {
      asap: asap_1.asap,
      queue: queue_1.queue
    };
    exports.Scheduler = Scheduler;
    var Symbol = {rxSubscriber: rxSubscriber_1.rxSubscriber};
    exports.Symbol = Symbol;
    global.define = __define;
    return module.exports;
  });
})(require('buffer').Buffer, require('process'));
