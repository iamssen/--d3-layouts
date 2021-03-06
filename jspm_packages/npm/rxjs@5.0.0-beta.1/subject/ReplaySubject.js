/* */ 
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
