/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BehaviorSubject: () => (/* binding */ BehaviorSubject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subject */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");


var BehaviorSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__.Subject));

//# sourceMappingURL=BehaviorSubject.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPLETE_NOTIFICATION: () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   createNotification: () => (/* binding */ createNotification),
/* harmony export */   errorNotification: () => (/* binding */ errorNotification),
/* harmony export */   nextNotification: () => (/* binding */ nextNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Scheduler.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Scheduler.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scheduler: () => (/* binding */ Scheduler)
/* harmony export */ });
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js");

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__.dateTimestampProvider.now;
    return Scheduler;
}());

//# sourceMappingURL=Scheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subject.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subject.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnonymousSubject: () => (/* binding */ AnonymousSubject),
/* harmony export */   Subject: () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");






var Subject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(function () {
            _this.currentObservers = null;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new _Observable__WEBPACK_IMPORTED_MODULE_5__.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_5__.Observable));

var AnonymousSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_OBSERVER: () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   SafeSubscriber: () => (/* binding */ SafeSubscriber),
/* harmony export */   Subscriber: () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function handleUnhandledError(error) {
    if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
    }
    else {
        (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_SUBSCRIPTION: () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   Subscription: () => (/* binding */ Subscription),
/* harmony export */   isSubscription: () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/config.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/config.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   combineLatest: () => (/* binding */ combineLatest),
/* harmony export */   combineLatestInit: () => (/* binding */ combineLatestInit)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_argsArgArrayOrObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/argsArgArrayOrObject */ "./node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./from */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "./node_modules/rxjs/dist/esm5/internal/util/args.js");
/* harmony import */ var _util_createObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/createObject */ "./node_modules/rxjs/dist/esm5/internal/util/createObject.js");
/* harmony import */ var _operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../operators/OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");









function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
    var resultSelector = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popResultSelector)(args);
    var _a = (0,_util_argsArgArrayOrObject__WEBPACK_IMPORTED_MODULE_1__.argsArgArrayOrObject)(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
        return (0,_from__WEBPACK_IMPORTED_MODULE_2__.from)([], scheduler);
    }
    var result = new _Observable__WEBPACK_IMPORTED_MODULE_3__.Observable(combineLatestInit(observables, scheduler, keys
        ?
            function (values) { return (0,_util_createObject__WEBPACK_IMPORTED_MODULE_4__.createObject)(keys, values); }
        :
            _util_identity__WEBPACK_IMPORTED_MODULE_5__.identity));
    return resultSelector ? result.pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_6__.mapOneOrManyArgs)(resultSelector)) : result;
}
function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = _util_identity__WEBPACK_IMPORTED_MODULE_5__.identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = (0,_from__WEBPACK_IMPORTED_MODULE_2__.from)(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe((0,_operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_7__.createOperatorSubscriber)(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_8__.executeSchedule)(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}
//# sourceMappingURL=combineLatest.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/empty.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/empty.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY: () => (/* binding */ EMPTY),
/* harmony export */   empty: () => (/* binding */ empty)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");

var EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/from.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/from.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   from: () => (/* binding */ from)
/* harmony export */ });
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduled/scheduled */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js");
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");


function from(input, scheduler) {
    return scheduler ? (0,_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__.scheduled)(input, scheduler) : (0,_innerFrom__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(input);
}
//# sourceMappingURL=from.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromEvent: () => (/* binding */ fromEvent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/mergeMap */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js");







var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(resultSelector));
    }
    var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(target)) {
            return (0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(function (subTarget) { return fromEvent(subTarget, eventName, options); })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.innerFrom)(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.on) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.off);
}
function isEventTarget(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addEventListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeEventListener);
}
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromArrayLike: () => (/* binding */ fromArrayLike),
/* harmony export */   fromAsyncIterable: () => (/* binding */ fromAsyncIterable),
/* harmony export */   fromInteropObservable: () => (/* binding */ fromInteropObservable),
/* harmony export */   fromIterable: () => (/* binding */ fromIterable),
/* harmony export */   fromPromise: () => (/* binding */ fromPromise),
/* harmony export */   fromReadableStreamLike: () => (/* binding */ fromReadableStreamLike),
/* harmony export */   innerFrom: () => (/* binding */ innerFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");












function innerFrom(input) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return input;
    }
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable]();
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function () {
        var value, e_2_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/merge.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/merge.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../operators/mergeAll */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js");
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty */ "./node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "./node_modules/rxjs/dist/esm5/internal/util/args.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./from */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");





function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
    var concurrent = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popNumber)(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            _empty__WEBPACK_IMPORTED_MODULE_1__.EMPTY
        : sources.length === 1
            ?
                (0,_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(sources[0])
            :
                (0,_operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__.mergeAll)(concurrent)((0,_from__WEBPACK_IMPORTED_MODULE_4__.from)(sources, scheduler));
}
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/zip.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/zip.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   zip: () => (/* binding */ zip)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_argsOrArgArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/argsOrArgArray */ "./node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./empty */ "./node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var _operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "./node_modules/rxjs/dist/esm5/internal/util/args.js");







function zip() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popResultSelector)(args);
    var sources = (0,_util_argsOrArgArray__WEBPACK_IMPORTED_MODULE_1__.argsOrArgArray)(args);
    return sources.length
        ? new _Observable__WEBPACK_IMPORTED_MODULE_2__.Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                (0,_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(sources[sourceIndex]).subscribe((0,_operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_4__.createOperatorSubscriber)(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__read)(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : _empty__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
}
//# sourceMappingURL=zip.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OperatorSubscriber: () => (/* binding */ OperatorSubscriber),
/* harmony export */   createOperatorSubscriber: () => (/* binding */ createOperatorSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");


function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/catchError.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/catchError.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   catchError: () => (/* binding */ catchError)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");



function catchError(selector) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, undefined, undefined, function (err) {
            handledResult = (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
//# sourceMappingURL=catchError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js":
/*!************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceTime: () => (/* binding */ debounceTime)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/dist/esm5/internal/scheduler/async.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function () {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = activeTask = null;
        }));
    });
}
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/distinct.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/distinct.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   distinct: () => (/* binding */ distinct)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");




function distinct(keySelector, flushes) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var distinctKeys = new Set();
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes && (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(flushes).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function () { return distinctKeys.clear(); }, _util_noop__WEBPACK_IMPORTED_MODULE_3__.noop));
    });
}
//# sourceMappingURL=distinct.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function filter(predicate, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/map.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   map: () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function map(project, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeAll: () => (/* binding */ mergeAll)
/* harmony export */ });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeMap */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");


function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return (0,_mergeMap__WEBPACK_IMPORTED_MODULE_0__.mergeMap)(_util_identity__WEBPACK_IMPORTED_MODULE_1__.identity, concurrent);
}
//# sourceMappingURL=mergeAll.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeInternals: () => (/* binding */ mergeInternals)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(project(value, index++)).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
}
//# sourceMappingURL=mergeInternals.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeMap: () => (/* binding */ mergeMap)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeInternals */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(resultSelector)) {
        return mergeMap(function (a, i) { return (0,_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (b, ii) { return resultSelector(a, b, i, ii); })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (source, subscriber) { return (0,_mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(source, subscriber, project, concurrent); });
}
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeOn: () => (/* binding */ observeOn)
/* harmony export */ });
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   subscribeOn: () => (/* binding */ subscribeOn)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   switchMap: () => (/* binding */ switchMap)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function switchMap(project, resultSelector) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(value, outerIndex)).subscribe((innerSubscriber = (0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   takeUntil: () => (/* binding */ takeUntil)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");




function takeUntil(notifier) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(notifier).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function () { return subscriber.complete(); }, _util_noop__WEBPACK_IMPORTED_MODULE_3__.noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/tap.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/tap.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tap: () => (/* binding */ tap)
/* harmony export */ });
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");




function tap(observerOrNext, error, complete) {
    var tapObserver = (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            _util_identity__WEBPACK_IMPORTED_MODULE_3__.identity;
}
//# sourceMappingURL=tap.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withLatestFrom: () => (/* binding */ withLatestFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "./node_modules/rxjs/dist/esm5/internal/util/args.js");







function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popResultSelector)(inputs);
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(inputs[i]).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__.createOperatorSubscriber)(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(_util_identity__WEBPACK_IMPORTED_MODULE_4__.identity)) && (hasValue = null);
                }
            }, _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__.createOperatorSubscriber)(subscriber, function (value) {
            if (ready) {
                var values = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArray)([value], (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__read)(otherValues));
                subscriber.next(project ? project.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__read)(values))) : values);
            }
        }));
    });
}
//# sourceMappingURL=withLatestFrom.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js":
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleArray: () => (/* binding */ scheduleArray)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");

function scheduleArray(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
//# sourceMappingURL=scheduleArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleAsyncIterable: () => (/* binding */ scheduleAsyncIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
//# sourceMappingURL=scheduleAsyncIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleIterable: () => (/* binding */ scheduleIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");




function scheduleIterable(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var iterator;
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            iterator = input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__.iterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
//# sourceMappingURL=scheduleIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleObservable: () => (/* binding */ scheduleObservable)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function scheduleObservable(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   schedulePromise: () => (/* binding */ schedulePromise)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function schedulePromise(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=schedulePromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleReadableStreamLike: () => (/* binding */ scheduleReadableStreamLike)
/* harmony export */ });
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");


function scheduleReadableStreamLike(input, scheduler) {
    return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__.scheduleAsyncIterable)((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__.readableStreamLikeToAsyncGenerator)(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduled: () => (/* binding */ scheduled)
/* harmony export */ });
/* harmony import */ var _scheduleObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduleObservable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js");
/* harmony import */ var _schedulePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedulePromise */ "./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js");
/* harmony import */ var _scheduleArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduleArray */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _scheduleIterable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scheduleIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js");
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scheduleReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js");













function scheduled(input, scheduler) {
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__.isInteropObservable)(input)) {
            return (0,_scheduleObservable__WEBPACK_IMPORTED_MODULE_1__.scheduleObservable)(input, scheduler);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return (0,_scheduleArray__WEBPACK_IMPORTED_MODULE_3__.scheduleArray)(input, scheduler);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_4__.isPromise)(input)) {
            return (0,_schedulePromise__WEBPACK_IMPORTED_MODULE_5__.schedulePromise)(input, scheduler);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__.isAsyncIterable)(input)) {
            return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__.scheduleAsyncIterable)(input, scheduler);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_8__.isIterable)(input)) {
            return (0,_scheduleIterable__WEBPACK_IMPORTED_MODULE_9__.scheduleIterable)(input, scheduler);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__.isReadableStreamLike)(input)) {
            return (0,_scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__.scheduleReadableStreamLike)(input, scheduler);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__.createInvalidObservableTypeError)(input);
}
//# sourceMappingURL=scheduled.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");


var Action = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

//# sourceMappingURL=Action.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncAction: () => (/* binding */ AsyncAction)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Action */ "./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js");
/* harmony import */ var _intervalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intervalProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var AsyncAction = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        if (id != null) {
            _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.clearInterval(id);
        }
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(_Action__WEBPACK_IMPORTED_MODULE_3__.Action));

//# sourceMappingURL=AsyncAction.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncScheduler: () => (/* binding */ AsyncScheduler)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scheduler */ "./node_modules/rxjs/dist/esm5/internal/Scheduler.js");


var AsyncScheduler = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = _Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(_Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler));

//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/async.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/async.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async: () => (/* binding */ async),
/* harmony export */   asyncScheduler: () => (/* binding */ asyncScheduler)
/* harmony export */ });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js");


var asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__.AsyncScheduler(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.AsyncAction);
var async = asyncScheduler;
//# sourceMappingURL=async.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dateTimestampProvider: () => (/* binding */ dateTimestampProvider)
/* harmony export */ });
var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=dateTimestampProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intervalProvider: () => (/* binding */ intervalProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

var intervalProvider = {
    setInterval: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
            return delegate.setInterval.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setInterval.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=intervalProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timeoutProvider: () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSymbolIterator: () => (/* binding */ getSymbolIterator),
/* harmony export */   iterator: () => (/* binding */ iterator)
/* harmony export */ });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observable: () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ObjectUnsubscribedError: () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnsubscriptionError: () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/args.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/args.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   popNumber: () => (/* binding */ popNumber),
/* harmony export */   popResultSelector: () => (/* binding */ popResultSelector),
/* harmony export */   popScheduler: () => (/* binding */ popScheduler)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isScheduler */ "./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js");


function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(last(args)) ? args.pop() : undefined;
}
function popScheduler(args) {
    return (0,_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(last(args)) ? args.pop() : undefined;
}
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}
//# sourceMappingURL=args.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argsArgArrayOrObject: () => (/* binding */ argsArgArrayOrObject)
/* harmony export */ });
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        var first_1 = args[0];
        if (isArray(first_1)) {
            return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
                args: keys.map(function (key) { return first_1[key]; }),
                keys: keys,
            };
        }
    }
    return { args: args, keys: null };
}
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}
//# sourceMappingURL=argsArgArrayOrObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argsOrArgArray: () => (/* binding */ argsOrArgArray)
/* harmony export */ });
var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
//# sourceMappingURL=argsOrArgArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrRemove: () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createErrorClass: () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/createObject.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/createObject.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createObject: () => (/* binding */ createObject)
/* harmony export */ });
function createObject(keys, values) {
    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
}
//# sourceMappingURL=createObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureError: () => (/* binding */ captureError),
/* harmony export */   errorContext: () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeSchedule: () => (/* binding */ executeSchedule)
/* harmony export */ });
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   identity: () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArrayLike: () => (/* binding */ isArrayLike)
/* harmony export */ });
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAsyncIterable: () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInteropObservable: () => (/* binding */ isInteropObservable)
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIterable: () => (/* binding */ isIterable)
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}
//# sourceMappingURL=isIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPromise: () => (/* binding */ isPromise)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isReadableStreamLike: () => (/* binding */ isReadableStreamLike),
/* harmony export */   readableStreamLikeToAsyncGenerator: () => (/* binding */ readableStreamLikeToAsyncGenerator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isScheduler: () => (/* binding */ isScheduler)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isScheduler(value) {
    return value && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value.schedule);
}
//# sourceMappingURL=isScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasLift: () => (/* binding */ hasLift),
/* harmony export */   operate: () => (/* binding */ operate)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapOneOrManyArgs: () => (/* binding */ mapOneOrManyArgs)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");


var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return (0,_operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (args) { return callOrApply(fn, args); });
}
//# sourceMappingURL=mapOneOrManyArgs.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: () => (/* binding */ noop)
/* harmony export */ });
function noop() { }
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   pipeFromArray: () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reportUnhandledError: () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInvalidObservableTypeError: () => (/* binding */ createInvalidObservableTypeError)
/* harmony export */ });
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map

/***/ }),

/***/ "./src/components/clanak/articleLogic.ts":
/*!***********************************************!*\
  !*** ./src/components/clanak/articleLogic.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClanakLogic: () => (/* binding */ ClanakLogic)
/* harmony export */ });
/* harmony import */ var _insertArticleLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./insertArticleLogic */ "./src/components/clanak/insertArticleLogic.ts");
/* harmony import */ var _displayArticleLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayArticleLogic */ "./src/components/clanak/displayArticleLogic.ts");
/* harmony import */ var _editArticleLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editArticleLogic */ "./src/components/clanak/editArticleLogic.ts");
/* harmony import */ var _observables_eventhandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../observables/eventhandlers */ "./src/observables/eventhandlers.ts");




var ClanakLogic = /** @class */ (function () {
    function ClanakLogic(clankoviDiv, addArticleBtn, searchInput, autorInput, typeSelect, btnResetuj) {
        //inicijalizujemo ove logike
        this.displayArticleLogic = new _displayArticleLogic__WEBPACK_IMPORTED_MODULE_1__.DisplayArticleLogic();
        this.insertArticleLogic = new _insertArticleLogic__WEBPACK_IMPORTED_MODULE_0__.InsertArticleLogic();
        this.editArticleLogic = new _editArticleLogic__WEBPACK_IMPORTED_MODULE_2__.EditArticleLogic();
        this.displayArticleLogic.displayArticles(clankoviDiv);
        this.$addArticleButton = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_3__.handleButton)(addArticleBtn);
        this.handleDodavanjeClanka();
        this.displayArticleLogic.filterArticles(searchInput, autorInput, typeSelect, btnResetuj);
    }
    ClanakLogic.prototype.handleDodavanjeClanka = function () {
        var _this = this;
        var addArticleContainer = document.querySelector(".add-article-container");
        this.$addArticleButton.subscribe(function () {
            addArticleContainer.hidden = false;
            _this.insertArticleLogic.displayPreview();
        });
    };
    return ClanakLogic;
}());



/***/ }),

/***/ "./src/components/clanak/clanakView.ts":
/*!*********************************************!*\
  !*** ./src/components/clanak/clanakView.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClanakView: () => (/* binding */ ClanakView)
/* harmony export */ });
/* harmony import */ var _view_viewLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../view/viewLogic */ "./src/view/viewLogic.ts");
/* harmony import */ var _displayArticleLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayArticleLogic */ "./src/components/clanak/displayArticleLogic.ts");


var ClanakView = /** @class */ (function () {
    function ClanakView() {
        ClanakView.dispLog = new _displayArticleLogic__WEBPACK_IMPORTED_MODULE_1__.DisplayArticleLogic();
        this.viewLogic = new _view_viewLogic__WEBPACK_IMPORTED_MODULE_0__.ViewLogic();
    }
    ClanakView.drawArticle = function (container, clanak) {
        var _this = this;
        var articleDiv = document.createElement("div");
        articleDiv.classList.add("article-div");
        articleDiv.setAttribute("data-id", clanak.id.toString());
        articleDiv.onclick = function () {
            return _this.dispLog.articleClick(articleDiv);
        };
        var titleDiv = document.createElement("div");
        titleDiv.classList.add("title-article-div");
        titleDiv.textContent = clanak.title;
        var autorDiv = document.createElement("div");
        autorDiv.classList.add("autor-div");
        autorDiv.textContent = clanak.autor.ime + " " + clanak.autor.prezime;
        var tipDiv = document.createElement("div");
        tipDiv.classList.add("tip-div");
        tipDiv.textContent = clanak.tip;
        articleDiv.appendChild(titleDiv);
        articleDiv.appendChild(autorDiv);
        articleDiv.appendChild(tipDiv);
        container.appendChild(articleDiv);
    };
    ClanakView.prototype.drawClanak = function (container) {
        var clanakInfoContainer = document.createElement("div");
        clanakInfoContainer.classList.add("clanak-info-container");
        var clanakKomentariContainer = document.createElement("div"); //kontejner sa desne strane sa svim komentarima i formom za dodavanje komentara
        clanakKomentariContainer.classList.add("clanak-komentari-container");
        var clanakInfoDiv = document.createElement("div");
        clanakInfoDiv.classList.add("clanak-info-div");
        var clanakKomentariDiv = document.createElement("div");
        clanakKomentariDiv.classList.add("clanak-komentari-div");
        var titleDiv = document.createElement("div");
        titleDiv.classList.add("title-clanak");
        var autorDiv = document.createElement("div");
        autorDiv.classList.add("autor-clanak");
        var tipDiv = document.createElement("div");
        tipDiv.classList.add("tip-clanak");
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content-clanak");
        var dugmiciDiv = document.createElement("div");
        dugmiciDiv.classList.add("dugmici-clanak");
        dugmiciDiv.hidden = true;
        var btnIzmeni = document.createElement("button");
        btnIzmeni.classList.add("button-izmeni");
        btnIzmeni.textContent = "Izmeni";
        var btnIzbrisi = document.createElement("button");
        btnIzbrisi.classList.add("button-izbrisi");
        btnIzbrisi.textContent = "Izbrisi";
        dugmiciDiv.appendChild(btnIzmeni);
        dugmiciDiv.appendChild(btnIzbrisi);
        clanakInfoDiv.appendChild(titleDiv);
        clanakInfoDiv.appendChild(autorDiv);
        clanakInfoDiv.appendChild(tipDiv);
        clanakInfoDiv.appendChild(contentDiv);
        clanakInfoDiv.appendChild(dugmiciDiv);
        var komentarInputDiv = document.createElement("div");
        komentarInputDiv.classList.add("konobar-input-div");
        var tekstInput = document.createElement("textarea");
        tekstInput.classList.add("komentar-input");
        tekstInput.placeholder = "Dodaj komentar";
        var btnObjavi = document.createElement("button");
        btnObjavi.classList.add("komentar-button");
        btnObjavi.textContent = "Objavi";
        var btnOIzadji = document.createElement("button");
        btnOIzadji.classList.add("izadji-button");
        btnOIzadji.textContent = "Izadji";
        clanakKomentariContainer.appendChild(clanakKomentariDiv);
        komentarInputDiv.appendChild(tekstInput);
        komentarInputDiv.appendChild(btnObjavi);
        komentarInputDiv.appendChild(btnOIzadji);
        clanakKomentariContainer.appendChild(komentarInputDiv);
        clanakInfoContainer.appendChild(clanakInfoDiv);
        container.appendChild(clanakInfoContainer);
        container.appendChild(clanakKomentariContainer);
    };
    ClanakView.drawKomentar = function (container, komentari) {
        container.innerHTML = "";
        var duzina = 0;
        var korisnikDiv;
        var komentarTekst;
        if (komentari.length > 0) {
            duzina = komentari.length;
            komentari.forEach(function (komentar) {
                var clanakKomentar = document.createElement("div");
                clanakKomentar.classList.add("komentar");
                korisnikDiv = document.createElement("div");
                korisnikDiv.classList.add("komentar-user");
                komentarTekst = document.createElement("div");
                komentarTekst.classList.add("komentar-tekst");
                korisnikDiv.textContent = komentar.user.ime + " " + komentar.user.prezime;
                var storedUserJSON = localStorage.getItem('user');
                if (storedUserJSON) {
                    var storedUser = JSON.parse(storedUserJSON);
                    if (storedUser.id == komentar.user.id)
                        korisnikDiv.style.color = "yellow";
                }
                komentarTekst.textContent = komentar.tekst;
                clanakKomentar.appendChild(korisnikDiv);
                clanakKomentar.appendChild(komentarTekst);
                container.appendChild(clanakKomentar);
            });
        }
    };
    ClanakView.prototype.drawAddArticleForm = function (container) {
        var formaDiv = document.createElement("div");
        formaDiv.classList.add("add-form");
        var forma = document.createElement("div");
        forma.classList.add("add-dialog-form");
        var titleDiv = document.createElement("div");
        titleDiv.classList.add("title-form-div");
        var titleLabel = document.createElement("label");
        titleLabel.classList.add("title-label");
        titleLabel.textContent = "Title: ";
        var titleAdd = document.createElement("input");
        titleAdd.classList.add("inputTitle");
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content-form-div");
        var contentLabel = document.createElement("label");
        contentLabel.classList.add("content-label");
        contentLabel.textContent = "Content: ";
        var contentAdd = document.createElement("textarea");
        contentAdd.classList.add("inputContent");
        var typeDiv = document.createElement("div");
        typeDiv.classList.add("type-form-div");
        var typeLabel = document.createElement("label");
        typeLabel.classList.add("type-label");
        typeLabel.textContent = "Type: ";
        var typeSelect = document.createElement("select");
        typeSelect.classList.add("type-select");
        //za taj select ja treba da dodam opcije na osnovu tipova koji se nalaze u db.json, znaci mogu da mu prenesem ceo niz stringova i posle da zatvorim tok
        this.viewLogic.popuniSelect(typeSelect);
        var dugmiciDiv = document.createElement("div");
        dugmiciDiv.classList.add("dugmici-form-div");
        var btnDodaj = document.createElement("button");
        btnDodaj.classList.add("button-add");
        btnDodaj.textContent = "Dodaj novi clanak";
        var btnIzmeni = document.createElement("button");
        btnIzmeni.classList.add("button-edit");
        btnIzmeni.textContent = "Izmeni clanak";
        btnIzmeni.hidden = true;
        var btnOtkazi = document.createElement("button");
        btnOtkazi.classList.add("button-cancel");
        btnOtkazi.textContent = "Otkazi";
        var btnOpenForm = document.querySelector(".btnOpenForm");
        /*btnOtkazi.onclick = () => {
            cancelPreview()
            const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
            addArticleContainer.hidden = true
        }*/
        //btnDodaj.onclick = () => dodajClanak(titleAdd, contentAdd, typeSelect)
        var articleInnputDiv = document.createElement("div");
        articleInnputDiv.classList.add("article-input-div");
        this.drawPreviewDiv(articleInnputDiv);
        dugmiciDiv.appendChild(btnDodaj);
        dugmiciDiv.appendChild(btnIzmeni);
        dugmiciDiv.appendChild(btnOtkazi);
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleAdd);
        contentDiv.appendChild(contentLabel);
        contentDiv.appendChild(contentAdd);
        typeDiv.appendChild(typeLabel);
        typeDiv.appendChild(typeSelect);
        forma.appendChild(titleDiv);
        forma.appendChild(contentDiv);
        forma.appendChild(typeDiv);
        forma.appendChild(dugmiciDiv);
        formaDiv.appendChild(forma);
        container.appendChild(formaDiv);
        container.appendChild(articleInnputDiv);
    };
    ClanakView.prototype.drawPreviewDiv = function (container) {
        var titleDiv = document.createElement("div");
        titleDiv.classList.add("title-input-div"); //osluskujem promene na inputu za title i tako menjam njegov textContent
        var autorDiv = document.createElement("div");
        autorDiv.classList.add("autor-input-div"); //uzimam autora iz localstorage i stavljam ime i prezime u textcontent
        var tipDiv = document.createElement("div");
        tipDiv.classList.add("tip-div"); //osluskujem promene na selektu za tip i tako menjam njegov textContent"
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content-input-div"); //osluskujem promene na inputu za content i tako menjam njegov textContent
        container.appendChild(titleDiv);
        container.appendChild(autorDiv);
        container.appendChild(tipDiv);
        container.appendChild(contentDiv);
    };
    return ClanakView;
}());



/***/ }),

/***/ "./src/components/clanak/displayArticleLogic.ts":
/*!******************************************************!*\
  !*** ./src/components/clanak/displayArticleLogic.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisplayArticleLogic: () => (/* binding */ DisplayArticleLogic)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/zip.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/merge.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/distinct.js");
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../observables/apiservice */ "./src/observables/apiservice.ts");
/* harmony import */ var _observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../observables/eventhandlers */ "./src/observables/eventhandlers.ts");
/* harmony import */ var _editArticleLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editArticleLogic */ "./src/components/clanak/editArticleLogic.ts");
/* harmony import */ var _komentarLogic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./komentarLogic */ "./src/components/clanak/komentarLogic.ts");
/* harmony import */ var _clanakView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clanakView */ "./src/components/clanak/clanakView.ts");
/* harmony import */ var _view_viewLogic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../view/viewLogic */ "./src/view/viewLogic.ts");







var DisplayArticleLogic = /** @class */ (function () {
    function DisplayArticleLogic() {
        this.exitSubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        this.$articleClickTrigger = this.exitSubject.asObservable();
        this.filterSubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        this.komentariLogic = new _komentarLogic__WEBPACK_IMPORTED_MODULE_3__.KomentarLogic();
    }
    DisplayArticleLogic.prototype.displayArticles = function (container) {
        container.innerHTML = '';
        (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.getArticles)().subscribe(function (artikli) {
            artikli.forEach(function (clanak) {
                _clanakView__WEBPACK_IMPORTED_MODULE_4__.ClanakView.drawArticle(container, clanak);
            });
        });
    };
    DisplayArticleLogic.prototype.setClanak = function (clanak) {
        var clanakDiv = document.querySelector(".clanak-container");
        clanakDiv.hidden = false;
        var titleDiv = document.querySelector(".title-clanak");
        var autorDiv = document.querySelector(".autor-clanak");
        var tipDiv = document.querySelector(".tip-clanak");
        var contentDiv = document.querySelector(".content-clanak");
        var dugmiciDiv = document.querySelector(".dugmici-clanak");
        titleDiv.textContent = clanak.title;
        autorDiv.textContent = clanak.autor.ime + " " + clanak.autor.prezime;
        tipDiv.textContent = clanak.tip;
        contentDiv.textContent = clanak.content;
        //prebaci u funkciju i dobij prihavljenog korisnika
        var user = _view_viewLogic__WEBPACK_IMPORTED_MODULE_5__.ViewLogic.getCurrentUser();
        if (user) {
            if (clanak.autor.id == user.id) {
                dugmiciDiv.hidden = false;
            }
        }
    };
    DisplayArticleLogic.prototype.articleClick = function (articleDiv) {
        var _this = this;
        this.exitSubject.next(true);
        var dugmiciDiv = document.querySelector(".dugmici-clanak");
        dugmiciDiv.hidden = true;
        var id = articleDiv.getAttribute("data-id");
        var $article = (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.getArticleById)(id);
        this.komentariLogic.$comments = (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.getArticlesComments)(id);
        (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.zip)($article, this.komentariLogic.$comments)
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.$articleClickTrigger.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.filter)(function (isClicked) { return !isClicked; }))) // Zatvaranje tokova nakon klika
        )
            .subscribe(function (_a) {
            var article = _a[0], comments = _a[1];
            _this.setClanak(article);
            var headerDiv = document.querySelector(".headerDiv");
            _this.scrollToElement(headerDiv);
            _this.komentariLogic.setCommentsSubject(comments);
        });
        var btnObjaviKomentar = document.querySelector(".komentar-button");
        var tekstInput = document.querySelector(".komentar-input");
        btnObjaviKomentar.onclick = function () {
            _this.komentariLogic.dodajKomentar(tekstInput, parseInt(id));
        };
        var btnIzbrisi = document.querySelector(".button-izbrisi");
        btnIzbrisi.onclick = function () {
            (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.deleteArticlebyId)(id)
                .then(function (message) {
                console.log(message);
            })
                .catch(function (error) {
                console.error(error);
            });
        };
        var btnIzmeni = document.querySelector(".button-izmeni");
        var izmeniLogic = new _editArticleLogic__WEBPACK_IMPORTED_MODULE_2__.EditArticleLogic();
        btnIzmeni.onclick = function () {
            //iz edit ja mora zovem ovo kao neku funkciju
            var addArticleContainer = document.querySelector(".add-article-container");
            addArticleContainer.hidden = false;
            $article.subscribe(function (clanak) {
                izmeniLogic.displayEditPreview(clanak);
            });
        };
        var btnIzadji = document.querySelector(".izadji-button");
        btnIzadji.onclick = function () {
            var clanakDiv = document.querySelector(".clanak-container");
            tekstInput.value = "";
            clanakDiv.hidden = true;
            tekstInput.classList.remove('invalid-input');
            _this.exitSubject.next(false);
        };
    };
    DisplayArticleLogic.prototype.scrollToElement = function (element) {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    DisplayArticleLogic.prototype.filterArticles = function (searchInput, authorInput, typeInput, btnResetuj) {
        var _this = this;
        var leviDiv = document.querySelector(".levi-div");
        var isLeviDivAktivan = leviDiv.classList.contains("active");
        if (!isLeviDivAktivan)
            this.filterSubject.next(false);
        var $searchResults = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleSearchInput)(searchInput);
        var $authorResults = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleAuthorInput)(authorInput);
        var $typeResults = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleTypeInput)(typeInput);
        var $btnReset = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleButton)(btnResetuj);
        $btnReset
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.filterSubject.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.filter)(function (isActive) { return !isActive; }))))
            .subscribe(function () {
            var clanakContainer = document.querySelector(".clanak-container");
            var addArticleContainer = document.querySelector(".add-article-container");
            addArticleContainer.hidden = true;
            clanakContainer.hidden = true;
            searchInput.value = "";
            authorInput.value = "";
            typeInput.selectedIndex = 0;
            _this.displayArticles(_this.clankoviDiv);
        });
        (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.merge)($searchResults, $authorResults, $typeResults).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.filterSubject.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.filter)(function (isActive) { return !isActive; }))), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.distinct)()).subscribe(function (clankovi) {
            _this.clankoviDiv = document.querySelector(".clankovi-div");
            var clanakContainer = document.querySelector(".clanak-container");
            var addArticleContainer = document.querySelector(".add-article-container");
            _this.clankoviDiv.innerHTML = "";
            clanakContainer.hidden = true;
            addArticleContainer.hidden = true;
            _this.displayFilteredArticles(clankovi);
        });
        if (isLeviDivAktivan) {
            this.filterSubject.next(true);
        }
    };
    DisplayArticleLogic.prototype.displayFilteredArticles = function (clankovi) {
        var _this = this;
        clankovi.forEach(function (clanak) {
            _clanakView__WEBPACK_IMPORTED_MODULE_4__.ClanakView.drawArticle(_this.clankoviDiv, clanak);
        });
    };
    return DisplayArticleLogic;
}());



/***/ }),

/***/ "./src/components/clanak/editArticleLogic.ts":
/*!***************************************************!*\
  !*** ./src/components/clanak/editArticleLogic.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditArticleLogic: () => (/* binding */ EditArticleLogic)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../observables/apiservice */ "./src/observables/apiservice.ts");
/* harmony import */ var _observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../observables/eventhandlers */ "./src/observables/eventhandlers.ts");



var EditArticleLogic = /** @class */ (function () {
    function EditArticleLogic() {
        this.titleInputSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('');
        this.contentInputSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('');
        this.typeSelectSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('');
        this.$cancelPreview = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    }
    EditArticleLogic.prototype.displayEditPreview = function (clanak) {
        var _this = this;
        var titleDiv = document.querySelector(".title-input-div");
        var autorDiv = document.querySelector(".autor-input-div");
        var tipDiv = document.querySelector(".tip-div");
        var contentDiv = document.querySelector(".content-input-div");
        var titleAdd = document.querySelector(".inputTitle");
        var contentAdd = document.querySelector(".inputContent");
        var typeSelect = document.querySelector(".type-select");
        var btnIzmeni = document.querySelector(".button-edit");
        var btnAdd = document.querySelector(".button-add");
        btnIzmeni.style.display = "inline-block";
        btnAdd.style.display = "none";
        titleAdd.value = clanak.title;
        contentAdd.value = clanak.content;
        typeSelect.selectedIndex = 0;
        this.titleInputSubject.next(clanak.title);
        this.contentInputSubject.next(clanak.content);
        this.typeSelectSubject.next(clanak.tip);
        // Pratite promene u input poljima i select polju
        (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleArticleInput)(titleAdd).subscribe(function (value) {
            _this.titleInputSubject.next(value);
        });
        (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleArticleInput)(contentAdd).subscribe(function (value) {
            _this.contentInputSubject.next(value);
        });
        (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleTypeSelect)(typeSelect).subscribe(function (value) {
            _this.typeSelectSubject.next(value);
        });
        var storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            var user_1 = JSON.parse(storedUserJSON);
            (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.combineLatest)([this.titleInputSubject, this.contentInputSubject, this.typeSelectSubject]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this.$cancelPreview)).subscribe({
                next: function (_a) {
                    var title = _a[0], content = _a[1], type = _a[2];
                    titleDiv.textContent = title;
                    tipDiv.textContent = type;
                    autorDiv.textContent = user_1.ime + " " + user_1.prezime;
                    contentDiv.textContent = content;
                }
            });
            if (btnIzmeni) {
                btnIzmeni.addEventListener('click', function () {
                    _this.izmeniClanak(clanak, titleAdd, contentAdd, typeSelect);
                });
            }
            var btnCancel = document.querySelector(".button-cancel");
            if (btnCancel) {
                btnCancel.addEventListener('click', function () {
                    _this.$cancelPreview.next();
                    _this.cancelPreview();
                    var addArticleContainer = document.querySelector(".add-article-container");
                    addArticleContainer.hidden = true;
                });
            }
        }
    };
    EditArticleLogic.prototype.izmeniClanak = function (clanak, titleAdd, contentAdd, typeSelect) {
        var title;
        var content;
        var type;
        title = titleAdd.value;
        content = contentAdd.value;
        type = typeSelect.value;
        if (title.trim() === '' || content.trim() === '' || type.trim() === '') {
            if (title.trim() === '') {
                titleAdd.classList.add('invalid-input');
            }
            if (content.trim() === '') {
                contentAdd.classList.add('invalid-input');
            }
            if (type.trim() === '') {
                typeSelect.classList.add('invalid-input');
            }
            return;
        }
        titleAdd.classList.remove('invalid-input');
        contentAdd.classList.remove('invalid-input');
        typeSelect.classList.remove('invalid-input');
        var artikal = {
            id: clanak.id,
            title: title,
            content: content,
            autor: clanak.autor,
            tip: type
        };
        //insertArticle(artikal)
        //console.log(artikal)
        (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.updateArticle)(artikal);
    };
    EditArticleLogic.prototype.cancelPreview = function () {
        var titleDiv = document.querySelector(".title-input-div");
        var autorDiv = document.querySelector(".autor-input-div");
        var tipDiv = document.querySelector(".tip-div");
        var contentDiv = document.querySelector(".content-input-div");
        var titleAdd = document.querySelector(".inputTitle");
        var contentAdd = document.querySelector(".inputContent");
        var typeSelect = document.querySelector(".type-select");
        titleAdd.value = "";
        contentAdd.value = "";
        typeSelect.selectedIndex = 0;
        this.titleInputSubject.next("");
        this.contentInputSubject.next("");
        this.typeSelectSubject.next("");
        titleDiv.textContent = "";
        tipDiv.textContent = "";
        contentDiv.textContent = "";
        titleAdd.classList.remove('invalid-input');
        contentAdd.classList.remove('invalid-input');
        typeSelect.classList.remove('invalid-input');
    };
    return EditArticleLogic;
}());



/***/ }),

/***/ "./src/components/clanak/insertArticleLogic.ts":
/*!*****************************************************!*\
  !*** ./src/components/clanak/insertArticleLogic.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InsertArticleLogic: () => (/* binding */ InsertArticleLogic)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../observables/apiservice */ "./src/observables/apiservice.ts");
/* harmony import */ var _observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../observables/eventhandlers */ "./src/observables/eventhandlers.ts");



var InsertArticleLogic = /** @class */ (function () {
    function InsertArticleLogic() {
        this.titleInputSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('');
        this.contentInputSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('');
        this.typeSelectSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('');
        this.$cancelPreview = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    }
    InsertArticleLogic.prototype.dodajClanak = function (titleAdd, contentAdd, typeSelect) {
        var storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            var user = JSON.parse(storedUserJSON);
            var title = void 0;
            var content = void 0;
            var type = void 0;
            title = titleAdd.value;
            content = contentAdd.value;
            type = typeSelect.value;
            if (title.trim() === '' || content.trim() === '' || type.trim() === '') {
                if (title.trim() === '') {
                    titleAdd.classList.add('invalid-input');
                }
                if (content.trim() === '') {
                    contentAdd.classList.add('invalid-input');
                }
                if (type.trim() === '') {
                    typeSelect.classList.add('invalid-input');
                }
                return;
            }
            /*titleAdd.classList.remove('invalid-input');
            contentAdd.classList.remove('invalid-input');
            typeSelect.classList.remove('invalid-input');*/
            var artikal = {
                id: null,
                title: title,
                content: content,
                autor: user,
                tip: type
            };
            (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.insertArticle)(artikal);
        }
        else {
            titleAdd.classList.add('invalid-input');
            contentAdd.classList.add('invalid-input');
            typeSelect.classList.add('invalid-input');
            return;
        }
    };
    InsertArticleLogic.prototype.displayPreview = function () {
        var _this = this;
        var titleDiv = document.querySelector(".title-input-div");
        var autorDiv = document.querySelector(".autor-input-div");
        var tipDiv = document.querySelector(".tip-div");
        var contentDiv = document.querySelector(".content-input-div");
        var titleAdd = document.querySelector(".inputTitle");
        var contentAdd = document.querySelector(".inputContent");
        var typeSelect = document.querySelector(".type-select");
        var btnIzmeni = document.querySelector(".button-edit");
        var btnAdd = document.querySelector(".button-add");
        btnAdd.style.display = "inline-block";
        btnIzmeni.style.display = "none";
        // Pratim promene u input poljima i select polju
        (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleArticleInput)(titleAdd).subscribe(function (value) {
            _this.titleInputSubject.next(value);
        });
        (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleArticleInput)(contentAdd).subscribe(function (value) {
            _this.contentInputSubject.next(value);
        });
        (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleTypeSelect)(typeSelect).subscribe(function (value) {
            _this.typeSelectSubject.next(value);
        });
        var storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            var user_1 = JSON.parse(storedUserJSON);
            (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.combineLatest)([this.titleInputSubject, this.contentInputSubject, this.typeSelectSubject]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this.$cancelPreview)).subscribe({
                next: function (_a) {
                    var title = _a[0], content = _a[1], type = _a[2];
                    titleDiv.textContent = title;
                    tipDiv.textContent = type;
                    autorDiv.textContent = user_1.ime + " " + user_1.prezime;
                    contentDiv.textContent = content;
                }
            });
            if (btnAdd) {
                btnAdd.onclick = function () {
                    console.log("Kliknuo sam dodavanje clanka");
                    _this.dodajClanak(titleAdd, contentAdd, typeSelect);
                };
            }
            var btnCancel = document.querySelector(".button-cancel");
            if (btnCancel) {
                btnCancel.onclick = function () {
                    console.log("Kliknuo sam cancel");
                    _this.$cancelPreview.next();
                    _this.cancelPreview();
                    var addArticleContainer = document.querySelector(".add-article-container");
                    addArticleContainer.hidden = true;
                };
            }
        }
    };
    InsertArticleLogic.prototype.cancelPreview = function () {
        var titleDiv = document.querySelector(".title-input-div");
        var autorDiv = document.querySelector(".autor-input-div");
        var tipDiv = document.querySelector(".tip-div");
        var contentDiv = document.querySelector(".content-input-div");
        var titleAdd = document.querySelector(".inputTitle");
        var contentAdd = document.querySelector(".inputContent");
        var typeSelect = document.querySelector(".type-select");
        titleAdd.value = "";
        contentAdd.value = "";
        typeSelect.selectedIndex = 0;
        this.titleInputSubject.next("");
        this.contentInputSubject.next("");
        this.typeSelectSubject.next("");
        titleDiv.textContent = "";
        tipDiv.textContent = "";
        contentDiv.textContent = "";
        titleAdd.classList.remove('invalid-input');
        contentAdd.classList.remove('invalid-input');
        typeSelect.classList.remove('invalid-input');
    };
    return InsertArticleLogic;
}());



/***/ }),

/***/ "./src/components/clanak/komentarLogic.ts":
/*!************************************************!*\
  !*** ./src/components/clanak/komentarLogic.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KomentarLogic: () => (/* binding */ KomentarLogic)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../observables/apiservice */ "./src/observables/apiservice.ts");
/* harmony import */ var _clanakView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clanakView */ "./src/components/clanak/clanakView.ts");
/* harmony import */ var _view_viewLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../view/viewLogic */ "./src/view/viewLogic.ts");




var KomentarLogic = /** @class */ (function () {
    function KomentarLogic() {
        this.commentSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
    }
    KomentarLogic.prototype.setCommentsSubject = function (comments) {
        this.commentSubject.next(comments);
        var komentariDiv = document.querySelector(".clanak-komentari-div"); //ovde ubacujemo sve komentare clanka
        this.commentSubject.subscribe(function (komentari) {
            _clanakView__WEBPACK_IMPORTED_MODULE_1__.ClanakView.drawKomentar(komentariDiv, komentari);
        });
    };
    KomentarLogic.prototype.dodajKomentar = function (tekstInput, clanakId) {
        var user = _view_viewLogic__WEBPACK_IMPORTED_MODULE_2__.ViewLogic.getCurrentUser();
        if (user != null) {
            var tekst = tekstInput.value;
            if (tekst.trim() === '') {
                tekstInput.classList.add('invalid-input');
                return;
            }
            tekstInput.classList.remove('invalid-input');
            var k = {
                id: null,
                user: user,
                tekst: tekst,
                clanakID: clanakId
            };
            (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.insertKomentar)(k);
        }
        else {
            tekstInput.classList.add('invalid-input');
            return;
        }
    };
    return KomentarLogic;
}());



/***/ }),

/***/ "./src/components/login/loginLogic.ts":
/*!********************************************!*\
  !*** ./src/components/login/loginLogic.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserLogic: () => (/* binding */ UserLogic)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../observables/apiservice */ "./src/observables/apiservice.ts");
/* harmony import */ var _observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../observables/eventhandlers */ "./src/observables/eventhandlers.ts");



var UserLogic = /** @class */ (function () {
    function UserLogic(emailInput, passInput, loginBtn) {
        var _this = this;
        this.$users = (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.getUsers)();
        //za otvaranje i zatvaranje toka nakon logovanja
        this.userLoggedInSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this.$userLoggedIn = this.userLoggedInSubject.asObservable();
        this.$emailInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleEmailInput)(emailInput);
        this.$passwordInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handlePasswordInput)(passInput);
        this.$users.subscribe(function (korisnici) { return _this.listaKorisnika = korisnici; });
        this.$btnLogIn = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_1__.handleLoginClick)(loginBtn);
        this.emailInput = emailInput;
        this.passInput = passInput;
        this.handleUserLogin(this.emailInput, this.passInput);
        var btnLogout = document.querySelector(".btnLogout");
        btnLogout.onclick = function () {
            _this.logoutUser();
        };
    }
    UserLogic.prototype.loginUser = function (email, password) {
        var k = this.listaKorisnika.find(function (k) { return k.email == email && k.password == password; });
        if (k !== undefined) {
            console.log(k);
            this.currentKorisnik = k;
            var userJSON = JSON.stringify(this.currentKorisnik);
            // Čuvanje korisničkih podataka u localStorage
            localStorage.setItem('user', userJSON);
            this.displayAfterLogin();
            this.userLoggedInSubject.next(true);
        }
        else
            console.log("Neuspesna prijava");
    };
    UserLogic.prototype.handleUserLogin = function (emailInput, passInput) {
        var _this = this;
        this.$btnLogIn.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.$emailInput, this.$passwordInput), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(function (_a) {
            var email = _a[1], password = _a[2];
            return ({ email: email, password: password });
        }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this.$userLoggedIn.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(function (isLoggedIn) { return isLoggedIn; })))).subscribe(function (user) {
            _this.loginUser(user.email, user.password);
            emailInput.value = "";
            passInput.value = "";
        });
    };
    UserLogic.prototype.logoutUser = function () {
        localStorage.removeItem("user");
        var headerProfileDiv = document.querySelector(".header-profile-div");
        var inputDiv = document.querySelector(".input-article-div");
        var prijavaDiv = document.querySelector(".prijava-button");
        var clanakDiv = document.querySelector(".clanak-container");
        prijavaDiv.hidden = false;
        inputDiv.hidden = true;
        headerProfileDiv.hidden = true;
        if (clanakDiv.hidden == false) {
            clanakDiv.hidden = true;
        }
        this.userLoggedInSubject.next(false);
        this.handleUserLogin(this.emailInput, this.passInput);
    };
    UserLogic.prototype.displayAfterLogin = function () {
        var storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            var storedUser = JSON.parse(storedUserJSON);
            var headerProfileDiv = document.querySelector(".header-profile-div");
            var inputDiv = document.querySelector(".input-article-div");
            var prijavaDiv = document.querySelector(".prijava-button");
            var loginDiv = document.querySelector(".login-div");
            loginDiv.hidden = true;
            prijavaDiv.hidden = true;
            inputDiv.hidden = false;
            headerProfileDiv.hidden = false;
            var ime = document.querySelector(".ime-label");
            var prezime = document.querySelector(".prezime-label");
            ime.textContent = storedUser.ime;
            prezime.textContent = storedUser.prezime;
        }
    };
    return UserLogic;
}());



/***/ }),

/***/ "./src/components/login/loginView.ts":
/*!*******************************************!*\
  !*** ./src/components/login/loginView.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginView: () => (/* binding */ LoginView)
/* harmony export */ });
var LoginView = /** @class */ (function () {
    function LoginView() {
    }
    LoginView.prototype.drawLogin = function (container) {
        var formaDiv = document.createElement("div");
        formaDiv.classList.add("forma-div");
        var emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.placeholder = "Email";
        emailInput.classList.add("email-input");
        var passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.placeholder = "Password";
        passwordInput.classList.add("password-input");
        var btnPrijava = document.createElement("button");
        btnPrijava.classList.add("btnPrijava");
        btnPrijava.textContent = "Prijavi se";
        formaDiv.appendChild(emailInput);
        formaDiv.appendChild(passwordInput);
        formaDiv.appendChild(btnPrijava);
        var noRegisterDiv = document.createElement("div");
        noRegisterDiv.classList.add("tekst-no-register");
        var tekstic = document.createElement("div");
        tekstic.classList.add("tekstic");
        tekstic.textContent = "Ukoliko nemate nalog: ";
        var btnGotoRegister = document.createElement("button");
        btnGotoRegister.classList.add("btn-go-to-register");
        btnGotoRegister.textContent = "Registruj se";
        noRegisterDiv.appendChild(tekstic);
        noRegisterDiv.appendChild(btnGotoRegister);
        container.appendChild(formaDiv);
        container.appendChild(noRegisterDiv);
    };
    return LoginView;
}());



/***/ }),

/***/ "./src/components/register/registerLogic.ts":
/*!**************************************************!*\
  !*** ./src/components/register/registerLogic.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterLogic: () => (/* binding */ RegisterLogic)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js");
/* harmony import */ var _observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../observables/eventhandlers */ "./src/observables/eventhandlers.ts");
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../observables/apiservice */ "./src/observables/apiservice.ts");



var RegisterLogic = /** @class */ (function () {
    function RegisterLogic(imeInput, prezimeINput, emailInput, passInput, conpassInput, registerBtn) {
        var _this = this;
        this.registrationSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this.$isRegistered = this.registrationSubject.asObservable();
        this.$emailInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__.handleEmailRegisterInput)(emailInput);
        this.$passwordInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__.handlePasswordRegisterInput)(passInput);
        this.$imeInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__.handleTekstInput)(imeInput);
        this.$prezimeInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__.handleTekstInput)(prezimeINput);
        this.$conPassInput = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__.handleConPasswordRegisterInput)(conpassInput);
        this.$btnRegister = (0,_observables_eventhandlers__WEBPACK_IMPORTED_MODULE_0__.handleRegisterClick)(registerBtn);
        this.handleUserRegister(imeInput, prezimeINput, emailInput, passInput, conpassInput);
        this.handleUnosLozinki(conpassInput);
        var btnGotoRegister = document.querySelector(".btn-go-to-register");
        btnGotoRegister.onclick = function () {
            _this.openRegisterForm();
        };
    }
    RegisterLogic.prototype.handleUserRegister = function (imeInput, prezimeINput, emailInput, passInput, conpassInput) {
        var _this = this;
        this.$btnRegister.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.$imeInput, this.$prezimeInput, this.$emailInput, this.$passwordInput, this.$conPassInput), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(function (_a) {
            var ime = _a[1], prezime = _a[2], email = _a[3], password = _a[4], conPassword = _a[5];
            return ({ ime: ime, prezime: prezime, email: email, password: password, conPassword: conPassword });
        })).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this.$isRegistered.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(function (isRegistered) { return isRegistered; })))).subscribe(function (user) {
            if (user.password !== user.conPassword)
                return;
            _this.registerUser(user.ime, user.prezime, user.email, user.password);
            console.log(user);
            _this.registrationSubject.next(true);
        });
    };
    RegisterLogic.prototype.registerUser = function (ime, prezime, email, password) {
        var k = {
            id: null,
            ime: ime,
            prezime: prezime,
            email: email,
            password: password
        };
        (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_1__.insertUser)(k);
    };
    RegisterLogic.prototype.handleUnosLozinki = function (conpassInput) {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this.$passwordInput, this.$conPassInput]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(function (_a) {
            var password = _a[0], confirmPassword = _a[1];
            return ({ password: password, confirmPassword: confirmPassword });
        })).subscribe(function (_a) {
            var password = _a.password, confirmPassword = _a.confirmPassword;
            if (password === confirmPassword) {
                conpassInput.style.border = "2px solid #ccc";
            }
            else {
                conpassInput.style.border = "2px solid red";
            }
        });
    };
    RegisterLogic.prototype.openRegisterForm = function () {
        var registerDiv = document.querySelector(".register-div");
        registerDiv.hidden = false;
        var loginDiv = document.querySelector(".login-div");
        loginDiv.hidden = true;
        this.registrationSubject.next(false);
    };
    return RegisterLogic;
}());



/***/ }),

/***/ "./src/components/register/registerView.ts":
/*!*************************************************!*\
  !*** ./src/components/register/registerView.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterView: () => (/* binding */ RegisterView)
/* harmony export */ });
var RegisterView = /** @class */ (function () {
    function RegisterView() {
    }
    RegisterView.prototype.drawRegister = function (container) {
        var formaDiv = document.createElement("div");
        formaDiv.classList.add("register-forma-div");
        var imeInput = document.createElement("input");
        imeInput.type = "text";
        imeInput.placeholder = "Ime";
        imeInput.classList.add("ime-input");
        var prezimeInput = document.createElement("input");
        prezimeInput.type = "text";
        prezimeInput.placeholder = "Prezime";
        prezimeInput.classList.add("prezime-input");
        var emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.placeholder = "Email";
        emailInput.classList.add("email-register-input");
        var passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.placeholder = "Password";
        passwordInput.classList.add("password-register-input");
        var conpasswordInput = document.createElement("input");
        conpasswordInput.type = "password";
        conpasswordInput.placeholder = "Potvrdi password";
        conpasswordInput.classList.add("confirm-password-input");
        var btnRegister = document.createElement("button");
        btnRegister.classList.add("btnRegister");
        btnRegister.textContent = "Registruj se";
        formaDiv.appendChild(imeInput);
        formaDiv.appendChild(prezimeInput);
        formaDiv.appendChild(emailInput);
        formaDiv.appendChild(passwordInput);
        formaDiv.appendChild(conpasswordInput);
        formaDiv.appendChild(btnRegister);
        var imasLOginDiv = document.createElement("div");
        imasLOginDiv.classList.add("tekst-login");
        var tekstic = document.createElement("div");
        tekstic.classList.add("tekstic2");
        tekstic.textContent = "Ukoliko imate nalog: ";
        var btnGotoLogin = document.createElement("button");
        btnGotoLogin.classList.add("btn-go-to-login");
        btnGotoLogin.textContent = "Prijavi se";
        btnGotoLogin.onclick = function () {
            var registerDiv = document.querySelector(".register-div");
            registerDiv.hidden = true;
            var loginDiv = document.querySelector(".login-div");
            loginDiv.hidden = false;
        };
        imasLOginDiv.appendChild(tekstic);
        imasLOginDiv.appendChild(btnGotoLogin);
        container.appendChild(formaDiv);
        container.appendChild(imasLOginDiv);
    };
    return RegisterView;
}());



/***/ }),

/***/ "./src/observables/apiservice.ts":
/*!***************************************!*\
  !*** ./src/observables/apiservice.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteArticlebyId: () => (/* binding */ deleteArticlebyId),
/* harmony export */   getArticleByAutor: () => (/* binding */ getArticleByAutor),
/* harmony export */   getArticleById: () => (/* binding */ getArticleById),
/* harmony export */   getArticleByName: () => (/* binding */ getArticleByName),
/* harmony export */   getArticleByType: () => (/* binding */ getArticleByType),
/* harmony export */   getArticles: () => (/* binding */ getArticles),
/* harmony export */   getArticlesComments: () => (/* binding */ getArticlesComments),
/* harmony export */   getTypes: () => (/* binding */ getTypes),
/* harmony export */   getUsers: () => (/* binding */ getUsers),
/* harmony export */   insertArticle: () => (/* binding */ insertArticle),
/* harmony export */   insertKomentar: () => (/* binding */ insertKomentar),
/* harmony export */   insertUser: () => (/* binding */ insertUser),
/* harmony export */   updateArticle: () => (/* binding */ updateArticle)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _components_clanak_clanakView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/clanak/clanakView */ "./src/components/clanak/clanakView.ts");


var BASE_URL = "http://localhost:3000";
function getTypes() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/types"))
        .then(function (response) {
        if (response.ok)
            return response.json();
        else
            console.log("Types not ok");
    })
        .catch(function (err) { return console.log(err); }));
}
function getArticles() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/articles"))
        .then(function (response) {
        if (response.ok)
            return response.json();
        else
            console.log("Articles not ok");
    })
        .catch(function (err) { return console.log(err); }));
}
function getUsers() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/korisnici"))
        .then(function (response) {
        if (response.ok)
            return response.json();
        else
            console.log("Articles not ok");
    })
        .catch(function (err) { return console.log(err); }));
}
function insertArticle(clanak) {
    fetch("".concat(BASE_URL, "/articles"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clanak)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Dodat je novi članak:', data);
        updateArticleList(data);
    })
        .catch(function (error) { return console.error('Greška:', error); });
}
function insertUser(korisnik) {
    fetch("".concat(BASE_URL, "/korisnici"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(korisnik)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) { return console.log('Dodat je novi korisnik:', data); })
        .catch(function (error) { return console.error('Greška:', error); });
}
function updateArticleList(clanak) {
    var clankoviDiv = document.querySelector(".clankovi-div");
    if (clankoviDiv) {
        _components_clanak_clanakView__WEBPACK_IMPORTED_MODULE_0__.ClanakView.drawArticle(clankoviDiv, clanak);
    }
}
function getArticleById(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/articles/").concat(id))
        .then(function (response) {
        if (response.ok)
            return response.json();
        else
            console.log("Article not ok");
    })
        .catch(function (err) { return console.log(err); }));
}
function getArticlesComments(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/komentari?clanakID=").concat(id))
        .then(function (response) {
        if (response.ok)
            return response.json();
        else
            console.log("Komentari not ok");
    })
        .catch(function (err) { return console.log(err); }));
}
function insertKomentar(komentar) {
    fetch("".concat(BASE_URL, "/komentari"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(komentar)
    })
        .then(function (response) { return response.json(); })
        .catch(function (error) { return console.error('Greška:', error); });
}
function getArticleByName(name) {
    console.log(name);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/articles/?title_like=").concat(name))
        .then(function (res) {
        if (res.ok) {
            console.log(res);
            return res.json(); //samo prosledjuje dalje ove podatke negde a mi cemo ih uzeti sa ovog toka i raditi nesto sa njima
        }
        else
            console.log("Error msg");
    })
        .catch(function (err) { return console.log(err); }));
}
function getArticleByType(type) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/articles/?tip=").concat(type))
        .then(function (res) {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Request failed");
        }
    })
        .catch(function (err) {
        console.error(err);
    }));
}
function getArticleByAutor(autor) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/articles/?autor.ime_like=").concat(autor))
        .then(function (res) {
        if (res.ok) {
            console.log(res);
            return res.json();
        }
        else
            console.log("Error msg");
    })
        .catch(function (err) { return console.log(err); }));
}
function deleteArticlebyId(id) {
    return new Promise(function (resolve, reject) {
        fetch("".concat(BASE_URL, "/articles/").concat(id), {
            method: 'DELETE',
        })
            .then(function (response) {
            return response.json();
        })
            .then(function () {
            resolve("Clanak je obrisasn");
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
function updateArticle(clanak) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(fetch("".concat(BASE_URL, "/articles/").concat(clanak.id.toString()), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clanak)
    })
        .then(function (response) {
        if (response.ok)
            return response.json();
        else
            console.log("Article not ok");
    })
        .catch(function (err) { return console.log(err); }));
}


/***/ }),

/***/ "./src/observables/eventhandlers.ts":
/*!******************************************!*\
  !*** ./src/observables/eventhandlers.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleAddArticleClick: () => (/* binding */ handleAddArticleClick),
/* harmony export */   handleArticleInput: () => (/* binding */ handleArticleInput),
/* harmony export */   handleAuthorInput: () => (/* binding */ handleAuthorInput),
/* harmony export */   handleButton: () => (/* binding */ handleButton),
/* harmony export */   handleConPasswordRegisterInput: () => (/* binding */ handleConPasswordRegisterInput),
/* harmony export */   handleEmailInput: () => (/* binding */ handleEmailInput),
/* harmony export */   handleEmailRegisterInput: () => (/* binding */ handleEmailRegisterInput),
/* harmony export */   handleEnterCommentButton: () => (/* binding */ handleEnterCommentButton),
/* harmony export */   handleLoginClick: () => (/* binding */ handleLoginClick),
/* harmony export */   handlePasswordInput: () => (/* binding */ handlePasswordInput),
/* harmony export */   handlePasswordRegisterInput: () => (/* binding */ handlePasswordRegisterInput),
/* harmony export */   handleRegisterClick: () => (/* binding */ handleRegisterClick),
/* harmony export */   handleSearchInput: () => (/* binding */ handleSearchInput),
/* harmony export */   handleTekstInput: () => (/* binding */ handleTekstInput),
/* harmony export */   handleTypeInput: () => (/* binding */ handleTypeInput),
/* harmony export */   handleTypeSelect: () => (/* binding */ handleTypeSelect)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/catchError.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/tap.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js");
/* harmony import */ var _apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiservice */ "./src/observables/apiservice.ts");


function handleEmailInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format maila");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (email) {
        if (email.includes('@') && email.trim() !== '') {
            inputField.style.border = '2px solid #ccc';
        }
        else {
            inputField.style.border = '2px solid red';
        }
    }));
}
function handlePasswordInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), 
    //filter((password) => password.length >= 5 && /^[A-Z]/.test(password)), 
    (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format passworda");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (password) {
        console.log(password);
        if (password.length >= 5 && /^[A-Z]/.test(password)) {
            inputField.style.border = '2px solid #ccc';
        }
        else {
            inputField.style.border = '2px solid red';
        }
    }));
}
function handleTekstInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(function (tekst) { return tekst.trim() !== ''; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format");
        throw err;
    }));
}
function handleLoginClick(btn) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(btn, "click").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function () { return "Login clicked"; }));
}
function handleRegisterClick(btn) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(btn, "click").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function () { return "Register clicked"; }));
}
function handleAddArticleClick(btn) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(btn, "click").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function () { return "Add article clicked"; }));
}
function handleArticleInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(function (tekst) { return tekst.trim() !== ''; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (value) {
        if (value.trim() === '')
            inputField.classList.add('invalid-input');
        else
            inputField.classList.remove('invalid-input');
    }));
}
function handleTypeSelect(typeSelect) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(typeSelect, "change").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (value) {
        if (value.trim() === '')
            typeSelect.classList.add('invalid-input');
        else
            typeSelect.classList.remove('invalid-input');
    }));
}
function handleEmailRegisterInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format maila");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (email) {
        console.log(email);
        if (email.includes('@') && email.trim() !== '') {
            inputField.style.border = '2px solid #ccc';
        }
        else {
            inputField.style.border = '2px solid red';
        }
    }));
}
function handlePasswordRegisterInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format passworda");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (password) {
        console.log(password);
        if (password.length >= 5 && /^[A-Z]/.test(password)) {
            inputField.classList.remove('invalid-input');
        }
        else {
            inputField.classList.add('invalid-input');
        }
    }));
}
function handleConPasswordRegisterInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "blur").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), 
    //filter((password) => password.length >= 5 && /^[A-Z]/.test(password)), 
    (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format passworda");
        throw err;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (password) {
        console.log(password);
        if (password.length >= 5 && /^[A-Z]/.test(password)) {
            inputField.classList.remove('invalid-input');
        }
        else {
            inputField.classList.add('invalid-input');
        }
    }));
}
function handleEnterCommentButton(btn) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(btn, "click").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function () { return "Add article clicked"; }));
}
function handleButton(btn) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(btn, "click").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function () { return "clicked"; }));
}
function handleSearchInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "input").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(function (value) { return console.log(value); }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(function (title) { return title.length >= 3; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(function (title) { return (0,_apiservice__WEBPACK_IMPORTED_MODULE_0__.getArticleByName)(title); }));
}
function handleAuthorInput(inputField) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(inputField, "input").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(function (author) { return author.length >= 3; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(function (author) { return (0,_apiservice__WEBPACK_IMPORTED_MODULE_0__.getArticleByAutor)(author); }));
}
function handleTypeInput(typeSelect) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(typeSelect, "change").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(function (ev) { return ev.target.value; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(function (type) { return (0,_apiservice__WEBPACK_IMPORTED_MODULE_0__.getArticleByType)(type); }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (err) {
        console.log("Los format");
        throw err;
    }));
}


/***/ }),

/***/ "./src/view/view.ts":
/*!**************************!*\
  !*** ./src/view/view.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _components_clanak_clanakView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/clanak/clanakView */ "./src/components/clanak/clanakView.ts");
/* harmony import */ var _components_login_loginView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/login/loginView */ "./src/components/login/loginView.ts");
/* harmony import */ var _components_register_registerView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/register/registerView */ "./src/components/register/registerView.ts");
/* harmony import */ var _viewLogic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewLogic */ "./src/view/viewLogic.ts");




var View = /** @class */ (function () {
    function View() {
        this.viewLogic = new _viewLogic__WEBPACK_IMPORTED_MODULE_3__.ViewLogic();
        this.registerView = new _components_register_registerView__WEBPACK_IMPORTED_MODULE_2__.RegisterView();
        this.loginView = new _components_login_loginView__WEBPACK_IMPORTED_MODULE_1__.LoginView();
        this.clanakView = new _components_clanak_clanakView__WEBPACK_IMPORTED_MODULE_0__.ClanakView();
    }
    View.prototype.drawSite = function (host) {
        var container = document.createElement("div");
        container.classList.add("main-container");
        var headerDiv = document.createElement("div");
        headerDiv.classList.add("headerDiv");
        this.drawHeader(headerDiv);
        container.appendChild(headerDiv);
        var divIzmedjuDivova = document.createElement("div");
        divIzmedjuDivova.classList.add("div-login-register");
        container.appendChild(divIzmedjuDivova);
        var mainDiv = document.createElement("div");
        mainDiv.classList.add("main-div");
        container.appendChild(mainDiv);
        var leviDiv = document.createElement("div");
        leviDiv.classList.add("levi-div");
        this.drawFilter(leviDiv);
        mainDiv.appendChild(leviDiv);
        var desniDiv = document.createElement("div");
        desniDiv.classList.add("desni-div");
        mainDiv.appendChild(desniDiv);
        var loginDiv = document.createElement("div");
        loginDiv.classList.add("login-div");
        this.loginView.drawLogin(loginDiv);
        loginDiv.hidden = true;
        divIzmedjuDivova.appendChild(loginDiv);
        //isto ovako i za registraciju
        var registerDiv = document.createElement("div");
        registerDiv.classList.add("register-div");
        this.registerView.drawRegister(registerDiv);
        registerDiv.hidden = true;
        divIzmedjuDivova.appendChild(registerDiv);
        var inputDiv = document.createElement("div");
        inputDiv.classList.add("input-article-div");
        //inputDiv.style.display = "none"
        inputDiv.hidden = true;
        //dugme za otvaranje forme za dodavanje clanka
        var btnOpenDiv = document.createElement("div");
        btnOpenDiv.classList.add("btnOpenDiv");
        var btnOpenForm = document.createElement("button");
        btnOpenForm.classList.add("btnOpenForm"); ///////////////////////////// mora to u viewLogic da odradim
        btnOpenForm.textContent = "Dodaj novi clanak";
        btnOpenDiv.appendChild(btnOpenForm);
        inputDiv.appendChild(btnOpenDiv);
        //div za dodavanje novog clanka sa sve preview
        var addArticleContainer = document.createElement("div");
        addArticleContainer.classList.add("add-article-container");
        var addArticleDiv = document.createElement("div");
        addArticleDiv.classList.add("add-article-div");
        this.clanakView.drawAddArticleForm(addArticleDiv);
        addArticleContainer.appendChild(addArticleDiv);
        addArticleContainer.hidden = true;
        inputDiv.appendChild(addArticleContainer);
        desniDiv.appendChild(inputDiv);
        //ovde treba da dodam div za prikazivanje vise informacije o clankovima 
        var clanakContainer = document.createElement("div");
        clanakContainer.classList.add("clanak-container");
        clanakContainer.hidden = true;
        var clanakDiv = document.createElement("div");
        clanakDiv.classList.add("clanak-div");
        this.clanakView.drawClanak(clanakDiv);
        clanakContainer.appendChild(clanakDiv);
        desniDiv.appendChild(clanakContainer);
        //ovo su svi clankovi
        var clankoviDiv = document.createElement("div");
        clankoviDiv.classList.add("clankovi-div");
        desniDiv.appendChild(clankoviDiv);
        host.appendChild(container);
        //prikaz ukoliko imamo ulogovanog korisnika
        if (_viewLogic__WEBPACK_IMPORTED_MODULE_3__.ViewLogic.getCurrentUser() != null) {
            inputDiv.hidden = false;
        }
        else {
            inputDiv.hidden = true;
        }
    };
    View.prototype.drawHeader = function (header) {
        var _this = this;
        var meniButtonDiv = document.createElement("div");
        meniButtonDiv.classList.add("meni-btn-div");
        var btnOpenMeni = document.createElement("button");
        btnOpenMeni.classList.add("btnOpenMeni");
        btnOpenMeni.textContent = "Meni";
        btnOpenMeni.onclick = function () {
            //otvara div sa leve strane sa filterima
            _this.prikaziSidebar();
        };
        meniButtonDiv.appendChild(btnOpenMeni);
        var prijavaDiv = document.createElement("div");
        prijavaDiv.classList.add("prijava-button");
        prijavaDiv.hidden = true;
        var btnPrijava = document.createElement("button");
        btnPrijava.classList.add("btnLogIn");
        btnPrijava.textContent = "Prijavi se";
        var isLoginDivVisible = false;
        btnPrijava.onclick = function () {
            var loginDiv = document.querySelector(".login-div");
            isLoginDivVisible = !isLoginDivVisible; // Invertujemo stanje
            loginDiv.hidden = !isLoginDivVisible;
            var registerDiv = document.querySelector(".register-div");
            if (loginDiv.hidden && registerDiv.hidden == false)
                registerDiv.hidden = true;
            else
                loginDiv.hidden = !isLoginDivVisible;
        };
        prijavaDiv.appendChild(btnPrijava);
        var headerProfileDiv = document.createElement("div");
        headerProfileDiv.classList.add("header-profile-div");
        headerProfileDiv.hidden = true;
        var profileDiv = document.createElement("div");
        profileDiv.classList.add("profile-div");
        var podaciDiv = document.createElement("div");
        podaciDiv.classList.add("podaci-div");
        var ime = document.createElement("label");
        ime.classList.add("ime-label");
        var prezime = document.createElement("label");
        prezime.classList.add("prezime-label");
        podaciDiv.appendChild(ime);
        podaciDiv.appendChild(prezime);
        var logoutDiv = document.createElement("div");
        logoutDiv.classList.add("logout-div");
        var btnLogout = document.createElement("button");
        btnLogout.classList.add("btnLogout");
        btnLogout.textContent = "Odjavi se";
        logoutDiv.appendChild(btnLogout);
        profileDiv.appendChild(podaciDiv);
        profileDiv.appendChild(logoutDiv);
        headerProfileDiv.appendChild(profileDiv);
        header.appendChild(meniButtonDiv);
        header.appendChild(prijavaDiv);
        header.appendChild(headerProfileDiv);
        if (_viewLogic__WEBPACK_IMPORTED_MODULE_3__.ViewLogic.getCurrentUser() != null) {
            headerProfileDiv.hidden = false;
            ime.textContent = _viewLogic__WEBPACK_IMPORTED_MODULE_3__.ViewLogic.getCurrentUser().ime;
            prezime.textContent = _viewLogic__WEBPACK_IMPORTED_MODULE_3__.ViewLogic.getCurrentUser().prezime;
        }
        else {
            prijavaDiv.hidden = false;
        }
    };
    View.prototype.prikaziSidebar = function () {
        var sidebar = document.querySelector(".levi-div");
        sidebar.classList.toggle("active");
    };
    View.prototype.drawFilter = function (leviDiv) {
        var filterDiv = document.createElement("div");
        filterDiv.classList.add("filter-div");
        var searchDiv = document.createElement("div");
        searchDiv.classList.add("search-div");
        var searchInput = document.createElement("input");
        searchInput.classList.add("search-input");
        searchInput.placeholder = "Pretrazi clankove:";
        searchDiv.appendChild(searchInput);
        var filtrirajDiv = document.createElement("div");
        filtrirajDiv.classList.add("filtriraj-div");
        var autorInput = document.createElement("input");
        autorInput.classList.add("autor-input");
        autorInput.placeholder = "Pretrazi autora:";
        var typeLabel = document.createElement("label");
        typeLabel.classList.add("type-label-filter");
        typeLabel.textContent = "Type: ";
        var typeSelect = document.createElement("select");
        typeSelect.classList.add("type-filter");
        this.viewLogic.popuniSelect(typeSelect);
        var btnResetuj = document.createElement("button");
        btnResetuj.classList.add("button-resetuj-filter");
        btnResetuj.textContent = "Resetuj parametre";
        filtrirajDiv.appendChild(autorInput);
        filtrirajDiv.appendChild(typeLabel);
        filtrirajDiv.appendChild(typeSelect);
        filtrirajDiv.appendChild(btnResetuj);
        filterDiv.appendChild(searchDiv);
        filterDiv.appendChild(filtrirajDiv);
        leviDiv.appendChild(filterDiv);
    };
    return View;
}());



/***/ }),

/***/ "./src/view/viewLogic.ts":
/*!*******************************!*\
  !*** ./src/view/viewLogic.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewLogic: () => (/* binding */ ViewLogic)
/* harmony export */ });
/* harmony import */ var _observables_apiservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observables/apiservice */ "./src/observables/apiservice.ts");

var ViewLogic = /** @class */ (function () {
    function ViewLogic() {
    }
    ViewLogic.prototype.popuniSelect = function (typeSelect) {
        var subscription = (0,_observables_apiservice__WEBPACK_IMPORTED_MODULE_0__.getTypes)()
            .subscribe(function (tipovi) {
            tipovi.forEach(function (tip) {
                var option = document.createElement("option");
                option.value = tip;
                option.textContent = tip;
                typeSelect.appendChild(option);
            });
        });
        setTimeout(function () {
            subscription.unsubscribe();
        }, 3000); //zatvaram tok podataka nakon sto prodje neko vreme 
    };
    ViewLogic.getCurrentUser = function () {
        var storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            var storedUser = JSON.parse(storedUserJSON);
            return storedUser;
        }
        return null;
    };
    return ViewLogic;
}());



/***/ }),

/***/ "./node_modules/tslib/tslib.es6.mjs":
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_clanak_articleLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/clanak/articleLogic */ "./src/components/clanak/articleLogic.ts");
/* harmony import */ var _components_login_loginLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/login/loginLogic */ "./src/components/login/loginLogic.ts");
/* harmony import */ var _components_register_registerLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/register/registerLogic */ "./src/components/register/registerLogic.ts");
/* harmony import */ var _view_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/view */ "./src/view/view.ts");




var view = new _view_view__WEBPACK_IMPORTED_MODULE_3__.View();
view.drawSite(document.body);
var emailInput = document.querySelector(".email-input");
var passwordInput = document.querySelector(".password-input");
var buttonLogin = document.querySelector(".btnPrijava");
var imeInput = document.querySelector(".ime-input");
var prezimeINput = document.querySelector(".prezime-input");
var emailRegisterInput = document.querySelector(".email-register-input");
var passwordRegisterInput = document.querySelector(".password-register-input");
var confirmPassInput = document.querySelector(".confirm-password-input");
var buttonRegister = document.querySelector(".btnRegister");
var loginLogic = new _components_login_loginLogic__WEBPACK_IMPORTED_MODULE_1__.UserLogic(emailInput, passwordInput, buttonLogin);
var registerLogic = new _components_register_registerLogic__WEBPACK_IMPORTED_MODULE_2__.RegisterLogic(imeInput, prezimeINput, emailRegisterInput, passwordRegisterInput, confirmPassInput, buttonRegister);
var clankoviDiv = document.querySelector(".clankovi-div");
var btnOpenDodajClanak = document.querySelector(".btnOpenForm");
var searchInput = document.querySelector(".search-input");
var autorInput = document.querySelector(".autor-input");
var tipSelect = document.querySelector(".type-filter");
var btnResetuj = document.querySelector(".button-resetuj-filter");
var clanakLog = new _components_clanak_articleLogic__WEBPACK_IMPORTED_MODULE_0__.ClanakLogic(clankoviDiv, btnOpenDodajClanak, searchInput, autorInput, tipSelect, btnResetuj);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpREFBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpREFBUztBQUNyQjtBQUNBLDhCQUE4QixpREFBUztBQUN2QyxrQ0FBa0MsaURBQVM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDZTs7Ozs7Ozs7Ozs7Ozs7OztBQzNMcUM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUVBQVE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUyxTQUFTO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7VUNqWEY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ04rRDtBQUNMO0FBQ1U7QUFDakM7QUFDbkMsZUFBZSw0Q0FBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtRUFBUztBQUM5Qix3QkFBd0IsNkVBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdFQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL0JlaGF2aW9yU3ViamVjdC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9PYnNlcnZhYmxlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YmplY3QuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmlwdGlvbi5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvY29uZmlnLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvZW1wdHkuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvaW5uZXJGcm9tLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL21lcmdlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3ppcC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL2NhdGNoRXJyb3IuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZVRpbWUuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9kaXN0aW5jdC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21hcC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlQWxsLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VJbnRlcm5hbHMuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL29ic2VydmVPbi5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3N1YnNjcmliZU9uLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoTWFwLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZVVudGlsLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvdGFwLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvd2l0aExhdGVzdEZyb20uanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFycmF5LmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVBc3luY0l0ZXJhYmxlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVJdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVkLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQWN0aW9uLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlci9Bc3luY1NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvaW50ZXJ2YWxQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2FyZ3MuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvYXJnc0FyZ0FycmF5T3JPYmplY3QuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvYXJnc09yQXJnQXJyYXkuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvYXJyUmVtb3ZlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2NyZWF0ZUVycm9yQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvY3JlYXRlT2JqZWN0LmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2Vycm9yQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9leGVjdXRlU2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNBc3luY0l0ZXJhYmxlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0l0ZXJhYmxlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZS5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc1NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9saWZ0LmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL21hcE9uZU9yTWFueUFyZ3MuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvbm9vcC5qcyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9waXBlLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yLmpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vc3JjL2NvbXBvbmVudHMvY2xhbmFrL2FydGljbGVMb2dpYy50cyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9zcmMvY29tcG9uZW50cy9jbGFuYWsvY2xhbmFrVmlldy50cyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9zcmMvY29tcG9uZW50cy9jbGFuYWsvZGlzcGxheUFydGljbGVMb2dpYy50cyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9zcmMvY29tcG9uZW50cy9jbGFuYWsvZWRpdEFydGljbGVMb2dpYy50cyIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvLi9zcmMvY29tcG9uZW50cy9jbGFuYWsvaW5zZXJ0QXJ0aWNsZUxvZ2ljLnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy9jb21wb25lbnRzL2NsYW5hay9rb21lbnRhckxvZ2ljLnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy9jb21wb25lbnRzL2xvZ2luL2xvZ2luTG9naWMudHMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vc3JjL2NvbXBvbmVudHMvbG9naW4vbG9naW5WaWV3LnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyTG9naWMudHMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vc3JjL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXJWaWV3LnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy9vYnNlcnZhYmxlcy9hcGlzZXJ2aWNlLnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy9vYnNlcnZhYmxlcy9ldmVudGhhbmRsZXJzLnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy92aWV3L3ZpZXcudHMiLCJ3ZWJwYWNrOi8vcnhqc3Byb2pla2F0Ly4vc3JjL3ZpZXcvdmlld0xvZ2ljLnRzIiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL3J4anNwcm9qZWthdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yeGpzcHJvamVrYXQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J4anNwcm9qZWthdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J4anNwcm9qZWthdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J4anNwcm9qZWthdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL1N1YmplY3QnO1xudmFyIEJlaGF2aW9yU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJlaGF2aW9yU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCZWhhdmlvclN1YmplY3QoX3ZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBfc3VwZXIucHJvdG90eXBlLl9zdWJzY3JpYmUuY2FsbCh0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgIXN1YnNjcmlwdGlvbi5jbG9zZWQgJiYgc3Vic2NyaWJlci5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuICAgIEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIHRocm93bkVycm9yID0gX2EudGhyb3duRXJyb3IsIF92YWx1ZSA9IF9hLl92YWx1ZTtcbiAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyB0aHJvd25FcnJvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgfTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcywgKHRoaXMuX3ZhbHVlID0gdmFsdWUpKTtcbiAgICB9O1xuICAgIHJldHVybiBCZWhhdmlvclN1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QmVoYXZpb3JTdWJqZWN0LmpzLm1hcCIsImV4cG9ydCB2YXIgQ09NUExFVEVfTk9USUZJQ0FUSU9OID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignQycsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTsgfSkoKTtcbmV4cG9ydCBmdW5jdGlvbiBlcnJvck5vdGlmaWNhdGlvbihlcnJvcikge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0UnLCB1bmRlZmluZWQsIGVycm9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignTicsIHZhbHVlLCB1bmRlZmluZWQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzLm1hcCIsImltcG9ydCB7IFNhZmVTdWJzY3JpYmVyLCBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgcGlwZUZyb21BcnJheSB9IGZyb20gJy4vdXRpbC9waXBlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBlcnJvckNvbnRleHQgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gaXNTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0KSA/IG9ic2VydmVyT3JOZXh0IDogbmV3IFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMsIG9wZXJhdG9yID0gX2Eub3BlcmF0b3IsIHNvdXJjZSA9IF9hLnNvdXJjZTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvci5jYWxsKHN1YnNjcmliZXIsIHNvdXJjZSlcbiAgICAgICAgICAgICAgICA6IHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cnlTdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFNhZmVTdWJzY3JpYmVyKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiByZXNvbHZlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbU3ltYm9sX29ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcGVyYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBvcGVyYXRpb25zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiAodmFsdWUgPSB4KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVqZWN0KGVycik7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnQgeyBPYnNlcnZhYmxlIH07XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKF9hID0gcHJvbWlzZUN0b3IgIT09IG51bGwgJiYgcHJvbWlzZUN0b3IgIT09IHZvaWQgMCA/IHByb21pc2VDdG9yIDogY29uZmlnLlByb21pc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2U7XG59XG5mdW5jdGlvbiBpc09ic2VydmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUubmV4dCkgJiYgaXNGdW5jdGlvbih2YWx1ZS5lcnJvcikgJiYgaXNGdW5jdGlvbih2YWx1ZS5jb21wbGV0ZSk7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmliZXIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaWJlcikgfHwgKGlzT2JzZXJ2ZXIodmFsdWUpICYmIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGRhdGVUaW1lc3RhbXBQcm92aWRlciB9IGZyb20gJy4vc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlcic7XG52YXIgU2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoc2NoZWR1bGVyQWN0aW9uQ3Rvciwgbm93KSB7XG4gICAgICAgIGlmIChub3cgPT09IHZvaWQgMCkgeyBub3cgPSBTY2hlZHVsZXIubm93OyB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyQWN0aW9uQ3RvciA9IHNjaGVkdWxlckFjdGlvbkN0b3I7XG4gICAgICAgIHRoaXMubm93ID0gbm93O1xuICAgIH1cbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHdvcmssIGRlbGF5LCBzdGF0ZSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLnNjaGVkdWxlckFjdGlvbkN0b3IodGhpcywgd29yaykuc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5ub3cgPSBkYXRlVGltZXN0YW1wUHJvdmlkZXIubm93O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KCkpO1xuZXhwb3J0IHsgU2NoZWR1bGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TY2hlZHVsZXIuanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzLCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEVNUFRZX1NVQlNDUklQVElPTiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIH0gZnJvbSAnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbmltcG9ydCB7IGFyclJlbW92ZSB9IGZyb20gJy4vdXRpbC9hcnJSZW1vdmUnO1xuaW1wb3J0IHsgZXJyb3JDb250ZXh0IH0gZnJvbSAnLi91dGlsL2Vycm9yQ29udGV4dCc7XG52YXIgU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnRocm93bkVycm9yID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJqZWN0LnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFub255bW91c1N1YmplY3QodGhpcywgdGhpcyk7XG4gICAgICAgIHN1YmplY3Qub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdGhyb3dJZkNsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmN1cnJlbnRPYnNlcnZlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmVycyA9IEFycmF5LmZyb20oX3RoaXMub2JzZXJ2ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oYXNFcnJvciA9IF90aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMudGhyb3duRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IF90aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IF90aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdWJqZWN0LnByb3RvdHlwZSwgXCJvYnNlcnZlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLm9ic2VydmVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyhzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2lubmVyU3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBvYnNlcnZlcnMgPSBfYS5vYnNlcnZlcnM7XG4gICAgICAgIGlmIChoYXNFcnJvciB8fCBpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWV9TVUJTQ1JJUFRJT047XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgb2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICAgICAgYXJyUmVtb3ZlKG9ic2VydmVycywgc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQ7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aHJvd25FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgU3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdDtcbn0oT2JzZXJ2YWJsZSkpO1xuZXhwb3J0IHsgU3ViamVjdCB9O1xudmFyIEFub255bW91c1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbm9ueW1vdXNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICBfdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV4dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHZhbHVlKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXJyb3IpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBlcnIpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb21wbGV0ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1YnNjcmliZShzdWJzY3JpYmVyKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogRU1QVFlfU1VCU0NSSVBUSU9OO1xuICAgIH07XG4gICAgcmV0dXJuIEFub255bW91c1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IEFub255bW91c1N1YmplY3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgaXNTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IHJlcG9ydFVuaGFuZGxlZEVycm9yIH0gZnJvbSAnLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuL3V0aWwvbm9vcCc7XG5pbXBvcnQgeyBuZXh0Tm90aWZpY2F0aW9uLCBlcnJvck5vdGlmaWNhdGlvbiwgQ09NUExFVEVfTk9USUZJQ0FUSU9OIH0gZnJvbSAnLi9Ob3RpZmljYXRpb25GYWN0b3JpZXMnO1xuaW1wb3J0IHsgdGltZW91dFByb3ZpZGVyIH0gZnJvbSAnLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmltcG9ydCB7IGNhcHR1cmVFcnJvciB9IGZyb20gJy4vdXRpbC9lcnJvckNvbnRleHQnO1xudmFyIFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGlmIChpc1N1YnNjcmlwdGlvbihkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBFTVBUWV9PQlNFUlZFUjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YnNjcmliZXIuY3JlYXRlID0gZnVuY3Rpb24gKG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFNhZmVTdWJzY3JpYmVyKG5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihlcnJvck5vdGlmaWNhdGlvbihlcnIpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oQ09NUExFVEVfTk9USUZJQ0FUSU9OLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU3Vic2NyaWJlcjtcbn0oU3Vic2NyaXB0aW9uKSk7XG5leHBvcnQgeyBTdWJzY3JpYmVyIH07XG52YXIgX2JpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gX2JpbmQuY2FsbChmbiwgdGhpc0FyZyk7XG59XG52YXIgQ29uc3VtZXJPYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5wYXJ0aWFsT2JzZXJ2ZXIgPSBwYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgfVxuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnN1bWVyT2JzZXJ2ZXI7XG59KCkpO1xudmFyIFNhZmVTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkgfHwgIW9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgbmV4dDogKG9ic2VydmVyT3JOZXh0ICE9PSBudWxsICYmIG9ic2VydmVyT3JOZXh0ICE9PSB2b2lkIDAgPyBvYnNlcnZlck9yTmV4dCA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yICE9PSBudWxsICYmIGVycm9yICE9PSB2b2lkIDAgPyBlcnJvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGUgIT09IG51bGwgJiYgY29tcGxldGUgIT09IHZvaWQgMCA/IGNvbXBsZXRlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0XzE7XG4gICAgICAgICAgICBpZiAoX3RoaXMgJiYgY29uZmlnLnVzZURlcHJlY2F0ZWROZXh0Q29udGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMSA9IE9iamVjdC5jcmVhdGUob2JzZXJ2ZXJPck5leHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnVuc3Vic2NyaWJlKCk7IH07XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0OiBvYnNlcnZlck9yTmV4dC5uZXh0ICYmIGJpbmQob2JzZXJ2ZXJPck5leHQubmV4dCwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG9ic2VydmVyT3JOZXh0LmVycm9yICYmIGJpbmQob2JzZXJ2ZXJPck5leHQuZXJyb3IsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBDb25zdW1lck9ic2VydmVyKHBhcnRpYWxPYnNlcnZlcik7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNhZmVTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBTYWZlU3Vic2NyaWJlciB9O1xuZnVuY3Rpb24gaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcG9ydFVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZWZhdWx0RXJyb3JIYW5kbGVyKGVycikge1xuICAgIHRocm93IGVycjtcbn1cbmZ1bmN0aW9uIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKSB7XG4gICAgdmFyIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiA9IGNvbmZpZy5vblN0b3BwZWROb3RpZmljYXRpb247XG4gICAgb25TdG9wcGVkTm90aWZpY2F0aW9uICYmIHRpbWVvdXRQcm92aWRlci5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9uU3RvcHBlZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIHN1YnNjcmliZXIpOyB9KTtcbn1cbmV4cG9ydCB2YXIgRU1QVFlfT0JTRVJWRVIgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQ6IG5vb3AsXG4gICAgZXJyb3I6IGRlZmF1bHRFcnJvckhhbmRsZXIsXG4gICAgY29tcGxldGU6IG5vb3AsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXksIF9fdmFsdWVzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgVW5zdWJzY3JpcHRpb25FcnJvciB9IGZyb20gJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJztcbmltcG9ydCB7IGFyclJlbW92ZSB9IGZyb20gJy4vdXRpbC9hcnJSZW1vdmUnO1xudmFyIFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKGluaXRpYWxUZWFyZG93bikge1xuICAgICAgICB0aGlzLmluaXRpYWxUZWFyZG93biA9IGluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZmluYWxpemVycyA9IG51bGw7XG4gICAgfVxuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgICAgICB2YXIgZXJyb3JzO1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgICAgIGlmIChfcGFyZW50YWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX3BhcmVudGFnZV8xID0gX192YWx1ZXMoX3BhcmVudGFnZSksIF9wYXJlbnRhZ2VfMV8xID0gX3BhcmVudGFnZV8xLm5leHQoKTsgIV9wYXJlbnRhZ2VfMV8xLmRvbmU7IF9wYXJlbnRhZ2VfMV8xID0gX3BhcmVudGFnZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IF9wYXJlbnRhZ2VfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudF8xLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9wYXJlbnRhZ2VfMV8xICYmICFfcGFyZW50YWdlXzFfMS5kb25lICYmIChfYSA9IF9wYXJlbnRhZ2VfMS5yZXR1cm4pKSBfYS5jYWxsKF9wYXJlbnRhZ2VfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXJlbnRhZ2UucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbml0aWFsRmluYWxpemVyID0gdGhpcy5pbml0aWFsVGVhcmRvd247XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihpbml0aWFsRmluYWxpemVyKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxGaW5hbGl6ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IgPyBlLmVycm9ycyA6IFtlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2ZpbmFsaXplcnMgPSB0aGlzLl9maW5hbGl6ZXJzO1xuICAgICAgICAgICAgaWYgKF9maW5hbGl6ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluYWxpemVycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2ZpbmFsaXplcnNfMSA9IF9fdmFsdWVzKF9maW5hbGl6ZXJzKSwgX2ZpbmFsaXplcnNfMV8xID0gX2ZpbmFsaXplcnNfMS5uZXh0KCk7ICFfZmluYWxpemVyc18xXzEuZG9uZTsgX2ZpbmFsaXplcnNfMV8xID0gX2ZpbmFsaXplcnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbGl6ZXIgPSBfZmluYWxpemVyc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWNGaW5hbGl6ZXIoZmluYWxpemVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgIT09IG51bGwgJiYgZXJyb3JzICE9PSB2b2lkIDAgPyBlcnJvcnMgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChlcnJvcnMpKSwgX19yZWFkKGVyci5lcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2ZpbmFsaXplcnNfMV8xICYmICFfZmluYWxpemVyc18xXzEuZG9uZSAmJiAoX2IgPSBfZmluYWxpemVyc18xLnJldHVybikpIF9iLmNhbGwoX2ZpbmFsaXplcnNfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0ZWFyZG93biAmJiB0ZWFyZG93biAhPT0gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZXhlY0ZpbmFsaXplcih0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duLmNsb3NlZCB8fCB0ZWFyZG93bi5faGFzUGFyZW50KHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGVhcmRvd24uX2FkZFBhcmVudCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKHRoaXMuX2ZpbmFsaXplcnMgPSAoX2EgPSB0aGlzLl9maW5hbGl6ZXJzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkucHVzaCh0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2hhc1BhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHJldHVybiBfcGFyZW50YWdlID09PSBwYXJlbnQgfHwgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgJiYgX3BhcmVudGFnZS5pbmNsdWRlcyhwYXJlbnQpKTtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2FkZFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgPyAoX3BhcmVudGFnZS5wdXNoKHBhcmVudCksIF9wYXJlbnRhZ2UpIDogX3BhcmVudGFnZSA/IFtfcGFyZW50YWdlLCBwYXJlbnRdIDogcGFyZW50O1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fcmVtb3ZlUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgaWYgKF9wYXJlbnRhZ2UgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICBhcnJSZW1vdmUoX3BhcmVudGFnZSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgX2ZpbmFsaXplcnMgJiYgYXJyUmVtb3ZlKF9maW5hbGl6ZXJzLCB0ZWFyZG93bik7XG4gICAgICAgIGlmICh0ZWFyZG93biBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGVhcmRvd24uX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydCB7IFN1YnNjcmlwdGlvbiB9O1xuZXhwb3J0IHZhciBFTVBUWV9TVUJTQ1JJUFRJT04gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5leHBvcnQgZnVuY3Rpb24gaXNTdWJzY3JpcHRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uIHx8XG4gICAgICAgICh2YWx1ZSAmJiAnY2xvc2VkJyBpbiB2YWx1ZSAmJiBpc0Z1bmN0aW9uKHZhbHVlLnJlbW92ZSkgJiYgaXNGdW5jdGlvbih2YWx1ZS5hZGQpICYmIGlzRnVuY3Rpb24odmFsdWUudW5zdWJzY3JpYmUpKSk7XG59XG5mdW5jdGlvbiBleGVjRmluYWxpemVyKGZpbmFsaXplcikge1xuICAgIGlmIChpc0Z1bmN0aW9uKGZpbmFsaXplcikpIHtcbiAgICAgICAgZmluYWxpemVyKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaW5hbGl6ZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwIiwiZXhwb3J0IHZhciBjb25maWcgPSB7XG4gICAgb25VbmhhbmRsZWRFcnJvcjogbnVsbCxcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb246IG51bGwsXG4gICAgUHJvbWlzZTogdW5kZWZpbmVkLFxuICAgIHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmc6IGZhbHNlLFxuICAgIHVzZURlcHJlY2F0ZWROZXh0Q29udGV4dDogZmFsc2UsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGFyZ3NBcmdBcnJheU9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9hcmdzQXJnQXJyYXlPck9iamVjdCc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9mcm9tJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5pbXBvcnQgeyBtYXBPbmVPck1hbnlBcmdzIH0gZnJvbSAnLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzJztcbmltcG9ydCB7IHBvcFJlc3VsdFNlbGVjdG9yLCBwb3BTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2FyZ3MnO1xuaW1wb3J0IHsgY3JlYXRlT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9jcmVhdGVPYmplY3QnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBleGVjdXRlU2NoZWR1bGUgfSBmcm9tICcuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZSc7XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IHBvcFNjaGVkdWxlcihhcmdzKTtcbiAgICB2YXIgcmVzdWx0U2VsZWN0b3IgPSBwb3BSZXN1bHRTZWxlY3RvcihhcmdzKTtcbiAgICB2YXIgX2EgPSBhcmdzQXJnQXJyYXlPck9iamVjdChhcmdzKSwgb2JzZXJ2YWJsZXMgPSBfYS5hcmdzLCBrZXlzID0gX2Eua2V5cztcbiAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmcm9tKFtdLCBzY2hlZHVsZXIpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9ic2VydmFibGUoY29tYmluZUxhdGVzdEluaXQob2JzZXJ2YWJsZXMsIHNjaGVkdWxlciwga2V5c1xuICAgICAgICA/XG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWVzKSB7IHJldHVybiBjcmVhdGVPYmplY3Qoa2V5cywgdmFsdWVzKTsgfVxuICAgICAgICA6XG4gICAgICAgICAgICBpZGVudGl0eSkpO1xuICAgIHJldHVybiByZXN1bHRTZWxlY3RvciA/IHJlc3VsdC5waXBlKG1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKSA6IHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0SW5pdChvYnNlcnZhYmxlcywgc2NoZWR1bGVyLCB2YWx1ZVRyYW5zZm9ybSkge1xuICAgIGlmICh2YWx1ZVRyYW5zZm9ybSA9PT0gdm9pZCAwKSB7IHZhbHVlVHJhbnNmb3JtID0gaWRlbnRpdHk7IH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgbWF5YmVTY2hlZHVsZShzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvYnNlcnZhYmxlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbWFpbmluZ0ZpcnN0VmFsdWVzID0gbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIG1heWJlU2NoZWR1bGUoc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBmcm9tKG9ic2VydmFibGVzW2ldLCBzY2hlZHVsZXIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzRmlyc3RWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNGaXJzdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRmlyc3RWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nRmlyc3RWYWx1ZXMtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVtYWluaW5nRmlyc3RWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWVUcmFuc2Zvcm0odmFsdWVzLnNsaWNlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0sIHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzdWJzY3JpYmVyKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbWF5YmVTY2hlZHVsZShzY2hlZHVsZXIsIGV4ZWN1dGUsIHN1YnNjcmlwdGlvbikge1xuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmlwdGlvbiwgc2NoZWR1bGVyLCBleGVjdXRlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV4ZWN1dGUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lTGF0ZXN0LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgRU1QVFkgPSBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTtcbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSA6IEVNUFRZO1xufVxuZnVuY3Rpb24gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJpbXBvcnQgeyBzY2hlZHVsZWQgfSBmcm9tICcuLi9zY2hlZHVsZWQvc2NoZWR1bGVkJztcbmltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4vaW5uZXJGcm9tJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIDogaW5uZXJGcm9tKGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwIiwiaW1wb3J0IHsgX19yZWFkIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJy4uL29wZXJhdG9ycy9tZXJnZU1hcCc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheUxpa2UnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBtYXBPbmVPck1hbnlBcmdzIH0gZnJvbSAnLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzJztcbnZhciBub2RlRXZlbnRFbWl0dGVyTWV0aG9kcyA9IFsnYWRkTGlzdGVuZXInLCAncmVtb3ZlTGlzdGVuZXInXTtcbnZhciBldmVudFRhcmdldE1ldGhvZHMgPSBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lciddO1xudmFyIGpxdWVyeU1ldGhvZHMgPSBbJ29uJywgJ29mZiddO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucywgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zKS5waXBlKG1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9XG4gICAgdmFyIF9hID0gX19yZWFkKGlzRXZlbnRUYXJnZXQodGFyZ2V0KVxuICAgICAgICA/IGV2ZW50VGFyZ2V0TWV0aG9kcy5tYXAoZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKTsgfTsgfSlcbiAgICAgICAgOlxuICAgICAgICAgICAgaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgID8gbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICA6IGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICA/IGpxdWVyeU1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgOiBbXSwgMiksIGFkZCA9IF9hWzBdLCByZW1vdmUgPSBfYVsxXTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBpZiAoaXNBcnJheUxpa2UodGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlTWFwKGZ1bmN0aW9uIChzdWJUYXJnZXQpIHsgcmV0dXJuIGZyb21FdmVudChzdWJUYXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucyk7IH0pKGlubmVyRnJvbSh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWFkZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5uZXh0KDEgPCBhcmdzLmxlbmd0aCA/IGFyZ3MgOiBhcmdzWzBdKTtcbiAgICAgICAgfTtcbiAgICAgICAgYWRkKGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlKGhhbmRsZXIpOyB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyKTsgfTsgfTtcbn1cbmZ1bmN0aW9uIGlzTm9kZVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHRhcmdldC5hZGRMaXN0ZW5lcikgJiYgaXNGdW5jdGlvbih0YXJnZXQucmVtb3ZlTGlzdGVuZXIpO1xufVxuZnVuY3Rpb24gaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih0YXJnZXQub24pICYmIGlzRnVuY3Rpb24odGFyZ2V0Lm9mZik7XG59XG5mdW5jdGlvbiBpc0V2ZW50VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHRhcmdldC5hZGRFdmVudExpc3RlbmVyKSAmJiBpc0Z1bmN0aW9uKHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21FdmVudC5qcy5tYXAiLCJpbXBvcnQgeyBfX2FzeW5jVmFsdWVzLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yLCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvaXNQcm9taXNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0FzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgfSBmcm9tICcuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3InO1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJdGVyYWJsZSc7XG5pbXBvcnQgeyBpc1JlYWRhYmxlU3RyZWFtTGlrZSwgcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciB9IGZyb20gJy4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyByZXBvcnRVbmhhbmRsZWRFcnJvciB9IGZyb20gJy4uL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3InO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBpbm5lckZyb20oaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUludGVyb3BPYnNlcnZhYmxlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFycmF5TGlrZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tUHJvbWlzZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQXN5bmNJdGVyYWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUl0ZXJhYmxlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShvYmopIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIG9icyA9IG9ialtTeW1ib2xfb2JzZXJ2YWJsZV0oKTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JzLnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIG9iamVjdCBkb2VzIG5vdCBjb3JyZWN0bHkgaW1wbGVtZW50IFN5bWJvbC5vYnNlcnZhYmxlJyk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUFycmF5TGlrZShhcnJheSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgcmVwb3J0VW5oYW5kbGVkRXJyb3IpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JdGVyYWJsZShpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZXJhYmxlXzEgPSBfX3ZhbHVlcyhpdGVyYWJsZSksIGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpOyAhaXRlcmFibGVfMV8xLmRvbmU7IGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaXRlcmFibGVfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUFzeW5jSXRlcmFibGUoYXN5bmNJdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZShyZWFkYWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBmcm9tQXN5bmNJdGVyYWJsZShyZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgYXN5bmNJdGVyYWJsZV8xLCBhc3luY0l0ZXJhYmxlXzFfMTtcbiAgICB2YXIgZV8yLCBfYTtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSwgZV8yXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMCwgNSwgNiwgMTFdKTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmNJdGVyYWJsZV8xID0gX19hc3luY1ZhbHVlcyhhc3luY0l0ZXJhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0LCBhc3luY0l0ZXJhYmxlXzEubmV4dCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xID0gX2Iuc2VudCgpLCAhYXN5bmNJdGVyYWJsZV8xXzEuZG9uZSkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYXN5bmNJdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZV8yID0geyBlcnJvcjogZV8yXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzYsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXN5bmNJdGVyYWJsZV8xXzEgJiYgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gYXN5bmNJdGVyYWJsZV8xLnJldHVybikpKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9hLmNhbGwoYXN5bmNJdGVyYWJsZV8xKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlubmVyRnJvbS5qcy5tYXAiLCJpbXBvcnQgeyBtZXJnZUFsbCB9IGZyb20gJy4uL29wZXJhdG9ycy9tZXJnZUFsbCc7XG5pbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBFTVBUWSB9IGZyb20gJy4vZW1wdHknO1xuaW1wb3J0IHsgcG9wTnVtYmVyLCBwb3BTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2FyZ3MnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJy4vZnJvbSc7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBwb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgdmFyIGNvbmN1cnJlbnQgPSBwb3BOdW1iZXIoYXJncywgSW5maW5pdHkpO1xuICAgIHZhciBzb3VyY2VzID0gYXJncztcbiAgICByZXR1cm4gIXNvdXJjZXMubGVuZ3RoXG4gICAgICAgID9cbiAgICAgICAgICAgIEVNUFRZXG4gICAgICAgIDogc291cmNlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICBpbm5lckZyb20oc291cmNlc1swXSlcbiAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICBtZXJnZUFsbChjb25jdXJyZW50KShmcm9tKHNvdXJjZXMsIHNjaGVkdWxlcikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2UuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBhcmdzT3JBcmdBcnJheSB9IGZyb20gJy4uL3V0aWwvYXJnc09yQXJnQXJyYXknO1xuaW1wb3J0IHsgRU1QVFkgfSBmcm9tICcuL2VtcHR5JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4uL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXInO1xuaW1wb3J0IHsgcG9wUmVzdWx0U2VsZWN0b3IgfSBmcm9tICcuLi91dGlsL2FyZ3MnO1xuZXhwb3J0IGZ1bmN0aW9uIHppcCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gcG9wUmVzdWx0U2VsZWN0b3IoYXJncyk7XG4gICAgdmFyIHNvdXJjZXMgPSBhcmdzT3JBcmdBcnJheShhcmdzKTtcbiAgICByZXR1cm4gc291cmNlcy5sZW5ndGhcbiAgICAgICAgPyBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcnMgPSBzb3VyY2VzLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfSk7XG4gICAgICAgICAgICB2YXIgY29tcGxldGVkID0gc291cmNlcy5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlcnMgPSBjb21wbGV0ZWQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChzb3VyY2VJbmRleCkge1xuICAgICAgICAgICAgICAgIGlubmVyRnJvbShzb3VyY2VzW3NvdXJjZUluZGV4XSkuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyc1tzb3VyY2VJbmRleF0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJzLmV2ZXJ5KGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5sZW5ndGg7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYnVmZmVycy5tYXAoZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLnNoaWZ0KCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdFNlbGVjdG9yID8gcmVzdWx0U2VsZWN0b3IuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQocmVzdWx0KSkpIDogcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJzLnNvbWUoZnVuY3Rpb24gKGJ1ZmZlciwgaSkgeyByZXR1cm4gIWJ1ZmZlci5sZW5ndGggJiYgY29tcGxldGVkW2ldOyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkW3NvdXJjZUluZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICFidWZmZXJzW3NvdXJjZUluZGV4XS5sZW5ndGggJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBzb3VyY2VJbmRleCA9IDA7ICFzdWJzY3JpYmVyLmNsb3NlZCAmJiBzb3VyY2VJbmRleCA8IHNvdXJjZXMubGVuZ3RoOyBzb3VyY2VJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgX2xvb3BfMShzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlcnMgPSBjb21wbGV0ZWQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgOiBFTVBUWTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXppcC5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSkge1xuICAgIHJldHVybiBuZXcgT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUpO1xufVxudmFyIE9wZXJhdG9yU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9wZXJhdG9yU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSwgc2hvdWxkVW5zdWJzY3JpYmUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9uRmluYWxpemUgPSBvbkZpbmFsaXplO1xuICAgICAgICBfdGhpcy5zaG91bGRVbnN1YnNjcmliZSA9IHNob3VsZFVuc3Vic2NyaWJlO1xuICAgICAgICBfdGhpcy5fbmV4dCA9IG9uTmV4dFxuICAgICAgICAgICAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvbk5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9uZXh0O1xuICAgICAgICBfdGhpcy5fZXJyb3IgPSBvbkVycm9yXG4gICAgICAgICAgICA/IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX2Vycm9yO1xuICAgICAgICBfdGhpcy5fY29tcGxldGUgPSBvbkNvbXBsZXRlXG4gICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX2NvbXBsZXRlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9wZXJhdG9yU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZFVuc3Vic2NyaWJlIHx8IHRoaXMuc2hvdWxkVW5zdWJzY3JpYmUoKSkge1xuICAgICAgICAgICAgdmFyIGNsb3NlZF8xID0gdGhpcy5jbG9zZWQ7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAhY2xvc2VkXzEgJiYgKChfYSA9IHRoaXMub25GaW5hbGl6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGhpcykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3BlcmF0b3JTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBPcGVyYXRvclN1YnNjcmliZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9wZXJhdG9yU3Vic2NyaWJlci5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEVycm9yKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICB2YXIgc3luY1Vuc3ViID0gZmFsc2U7XG4gICAgICAgIHZhciBoYW5kbGVkUmVzdWx0O1xuICAgICAgICBpbm5lclN1YiA9IHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBoYW5kbGVkUmVzdWx0ID0gaW5uZXJGcm9tKHNlbGVjdG9yKGVyciwgY2F0Y2hFcnJvcihzZWxlY3Rvcikoc291cmNlKSkpO1xuICAgICAgICAgICAgaWYgKGlubmVyU3ViKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgaGFuZGxlZFJlc3VsdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzeW5jVW5zdWIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChzeW5jVW5zdWIpIHtcbiAgICAgICAgICAgIGlubmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgICAgICBoYW5kbGVkUmVzdWx0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2F0Y2hFcnJvci5qcy5tYXAiLCJpbXBvcnQgeyBhc3luY1NjaGVkdWxlciB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZVRpbWUoZHVlVGltZSwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jU2NoZWR1bGVyOyB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgYWN0aXZlVGFzayA9IG51bGw7XG4gICAgICAgIHZhciBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSBudWxsO1xuICAgICAgICB2YXIgZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFzay51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxhc3RWYWx1ZTtcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGVtaXRXaGVuSWRsZSgpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRUaW1lID0gbGFzdFRpbWUgKyBkdWVUaW1lO1xuICAgICAgICAgICAgdmFyIG5vdyA9IHNjaGVkdWxlci5ub3coKTtcbiAgICAgICAgICAgIGlmIChub3cgPCB0YXJnZXRUaW1lKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFzayA9IHRoaXMuc2NoZWR1bGUodW5kZWZpbmVkLCB0YXJnZXRUaW1lIC0gbm93KTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChhY3RpdmVUYXNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWl0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gc2NoZWR1bGVyLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFzayA9IHNjaGVkdWxlci5zY2hlZHVsZShlbWl0V2hlbklkbGUsIGR1ZVRpbWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKGFjdGl2ZVRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbWl0KCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gYWN0aXZlVGFzayA9IG51bGw7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYm91bmNlVGltZS5qcy5tYXAiLCJpbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlsL25vb3AnO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3RpbmN0KGtleVNlbGVjdG9yLCBmbHVzaGVzKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZGlzdGluY3RLZXlzID0gbmV3IFNldCgpO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlTZWxlY3RvciA/IGtleVNlbGVjdG9yKHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICAgICAgaWYgKCFkaXN0aW5jdEtleXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBkaXN0aW5jdEtleXMuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBmbHVzaGVzICYmIGlubmVyRnJvbShmbHVzaGVzKS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3RpbmN0S2V5cy5jbGVhcigpOyB9LCBub29wKSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXN0aW5jdC5qcy5tYXAiLCJpbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCsrKSAmJiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gbWFwKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHByb2plY3QuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKykpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwIiwiaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICcuL21lcmdlTWFwJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbGwoY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IEluZmluaXR5OyB9XG4gICAgcmV0dXJuIG1lcmdlTWFwKGlkZW50aXR5LCBjb25jdXJyZW50KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlQWxsLmpzLm1hcCIsImltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQsIG9uQmVmb3JlTmV4dCwgZXhwYW5kLCBpbm5lclN1YlNjaGVkdWxlciwgYWRkaXRpb25hbEZpbmFsaXplcikge1xuICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICB2YXIgYWN0aXZlID0gMDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgdmFyIGNoZWNrQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc0NvbXBsZXRlICYmICFidWZmZXIubGVuZ3RoICYmICFhY3RpdmUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIG91dGVyTmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKGFjdGl2ZSA8IGNvbmN1cnJlbnQgPyBkb0lubmVyU3ViKHZhbHVlKSA6IGJ1ZmZlci5wdXNoKHZhbHVlKSk7IH07XG4gICAgdmFyIGRvSW5uZXJTdWIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgZXhwYW5kICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIGFjdGl2ZSsrO1xuICAgICAgICB2YXIgaW5uZXJDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICBpbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgaW5kZXgrKykpLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKGlubmVyVmFsdWUpIHtcbiAgICAgICAgICAgIG9uQmVmb3JlTmV4dCA9PT0gbnVsbCB8fCBvbkJlZm9yZU5leHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uQmVmb3JlTmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIGlmIChleHBhbmQpIHtcbiAgICAgICAgICAgICAgICBvdXRlck5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlubmVyQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLS07XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlcmVkVmFsdWUgPSBidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lclN1YlNjaGVkdWxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBpbm5lclN1YlNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9Jbm5lclN1YihidWZmZXJlZFZhbHVlKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCAmJiBhY3RpdmUgPCBjb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG91dGVyTmV4dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRpdGlvbmFsRmluYWxpemVyID09PSBudWxsIHx8IGFkZGl0aW9uYWxGaW5hbGl6ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZGl0aW9uYWxGaW5hbGl6ZXIoKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VJbnRlcm5hbHMuanMubWFwIiwiaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi9tYXAnO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBtZXJnZUludGVybmFscyB9IGZyb20gJy4vbWVyZ2VJbnRlcm5hbHMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIGlmIChpc0Z1bmN0aW9uKHJlc3VsdFNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VNYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIG1hcChmdW5jdGlvbiAoYiwgaWkpIHsgcmV0dXJuIHJlc3VsdFNlbGVjdG9yKGEsIGIsIGksIGlpKTsgfSkoaW5uZXJGcm9tKHByb2plY3QoYSwgaSkpKTsgfSwgY29uY3VycmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7IHJldHVybiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQpOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcCIsImltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0sIGRlbGF5KTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9LCBkZWxheSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSwgZGVsYXkpOyB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlT24uanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7IH0sIGRlbGF5KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVPbi5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzQ29tcGxldGUgJiYgIWlubmVyU3Vic2NyaWJlciAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID09PSBudWxsIHx8IGlubmVyU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5uZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB2YXIgaW5uZXJJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgb3V0ZXJJbmRleCA9IGluZGV4Kys7XG4gICAgICAgICAgICBpbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgb3V0ZXJJbmRleCkpLnN1YnNjcmliZSgoaW5uZXJTdWJzY3JpYmVyID0gY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQocmVzdWx0U2VsZWN0b3IgPyByZXN1bHRTZWxlY3Rvcih2YWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCsrKSA6IGlubmVyVmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwLmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWwvbm9vcCc7XG5leHBvcnQgZnVuY3Rpb24gdGFrZVVudGlsKG5vdGlmaWVyKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBpbm5lckZyb20obm90aWZpZXIpLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9LCBub29wKSk7XG4gICAgICAgICFzdWJzY3JpYmVyLmNsb3NlZCAmJiBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZVVudGlsLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4uL3V0aWwvaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHRhcChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgdmFyIHRhcE9ic2VydmVyID0gaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkgfHwgZXJyb3IgfHwgY29tcGxldGVcbiAgICAgICAgP1xuICAgICAgICAgICAgeyBuZXh0OiBvYnNlcnZlck9yTmV4dCwgZXJyb3I6IGVycm9yLCBjb21wbGV0ZTogY29tcGxldGUgfVxuICAgICAgICA6IG9ic2VydmVyT3JOZXh0O1xuICAgIHJldHVybiB0YXBPYnNlcnZlclxuICAgICAgICA/IG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIuc3Vic2NyaWJlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICB2YXIgaXNVbnN1YiA9IHRydWU7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIubmV4dCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpc1Vuc3ViID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIuY29tcGxldGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlzVW5zdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAoX2EgPSB0YXBPYnNlcnZlci5lcnJvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIsIGVycik7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgaWYgKGlzVW5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIudW5zdWJzY3JpYmUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKF9iID0gdGFwT2JzZXJ2ZXIuZmluYWxpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICAgICAgOlxuICAgICAgICAgICAgaWRlbnRpdHk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YXAuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbC9ub29wJztcbmltcG9ydCB7IHBvcFJlc3VsdFNlbGVjdG9yIH0gZnJvbSAnLi4vdXRpbC9hcmdzJztcbmV4cG9ydCBmdW5jdGlvbiB3aXRoTGF0ZXN0RnJvbSgpIHtcbiAgICB2YXIgaW5wdXRzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgaW5wdXRzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBwcm9qZWN0ID0gcG9wUmVzdWx0U2VsZWN0b3IoaW5wdXRzKTtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBsZW4gPSBpbnB1dHMubGVuZ3RoO1xuICAgICAgICB2YXIgb3RoZXJWYWx1ZXMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gaW5wdXRzLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSk7XG4gICAgICAgIHZhciByZWFkeSA9IGZhbHNlO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICBpbm5lckZyb20oaW5wdXRzW2ldKS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG90aGVyVmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWFkeSAmJiAhaGFzVmFsdWVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzVmFsdWVbaV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAocmVhZHkgPSBoYXNWYWx1ZS5ldmVyeShpZGVudGl0eSkpICYmIChoYXNWYWx1ZSA9IG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG5vb3ApKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChyZWFkeSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBfX3NwcmVhZEFycmF5KFt2YWx1ZV0sIF9fcmVhZChvdGhlclZhbHVlcykpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChwcm9qZWN0ID8gcHJvamVjdC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZCh2YWx1ZXMpKSkgOiB2YWx1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aXRoTGF0ZXN0RnJvbS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlucHV0W2krK10pO1xuICAgICAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFycmF5LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYWJsZSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaW5wdXRbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFzeW5jSXRlcmFibGUuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgZXhlY3V0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vdXRpbC9leGVjdXRlU2NoZWR1bGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3I7XG4gICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yID0gaW5wdXRbU3ltYm9sX2l0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGRvbmU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gaXRlcmF0b3IubmV4dCgpLCB2YWx1ZSA9IF9hLnZhbHVlLCBkb25lID0gX2EuZG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNGdW5jdGlvbihpdGVyYXRvciA9PT0gbnVsbCB8fCBpdGVyYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaXRlcmF0b3IucmV0dXJuKSAmJiBpdGVyYXRvci5yZXR1cm4oKTsgfTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlSXRlcmFibGUuanMubWFwIiwiaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL29ic2VydmVPbic7XG5pbXBvcnQgeyBzdWJzY3JpYmVPbiB9IGZyb20gJy4uL29wZXJhdG9ycy9zdWJzY3JpYmVPbic7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVPYnNlcnZhYmxlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gaW5uZXJGcm9tKGlucHV0KS5waXBlKHN1YnNjcmliZU9uKHNjaGVkdWxlciksIG9ic2VydmVPbihzY2hlZHVsZXIpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlT2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvYnNlcnZlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uJztcbmltcG9ydCB7IHN1YnNjcmliZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBpbm5lckZyb20oaW5wdXQpLnBpcGUoc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVQcm9taXNlLmpzLm1hcCIsImltcG9ydCB7IHNjaGVkdWxlQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShyZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKGlucHV0KSwgc2NoZWR1bGVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlLmpzLm1hcCIsImltcG9ydCB7IHNjaGVkdWxlT2JzZXJ2YWJsZSB9IGZyb20gJy4vc2NoZWR1bGVPYnNlcnZhYmxlJztcbmltcG9ydCB7IHNjaGVkdWxlUHJvbWlzZSB9IGZyb20gJy4vc2NoZWR1bGVQcm9taXNlJztcbmltcG9ydCB7IHNjaGVkdWxlQXJyYXkgfSBmcm9tICcuL3NjaGVkdWxlQXJyYXknO1xuaW1wb3J0IHsgc2NoZWR1bGVJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVJdGVyYWJsZSc7XG5pbXBvcnQgeyBzY2hlZHVsZUFzeW5jSXRlcmFibGUgfSBmcm9tICcuL3NjaGVkdWxlQXN5bmNJdGVyYWJsZSc7XG5pbXBvcnQgeyBpc0ludGVyb3BPYnNlcnZhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvaXNQcm9taXNlJztcbmltcG9ydCB7IGlzQXJyYXlMaWtlIH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5TGlrZSc7XG5pbXBvcnQgeyBpc0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0l0ZXJhYmxlJztcbmltcG9ydCB7IGlzQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yIH0gZnJvbSAnLi4vdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yJztcbmltcG9ydCB7IGlzUmVhZGFibGVTdHJlYW1MaWtlIH0gZnJvbSAnLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZSc7XG5pbXBvcnQgeyBzY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSB9IGZyb20gJy4vc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlZChpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVPYnNlcnZhYmxlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVQcm9taXNlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FzeW5jSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yKGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlZC5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG52YXIgQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEFjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBBY3Rpb247XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgQWN0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb24uanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL0FjdGlvbic7XG5pbXBvcnQgeyBpbnRlcnZhbFByb3ZpZGVyIH0gZnJvbSAnLi9pbnRlcnZhbFByb3ZpZGVyJztcbmltcG9ydCB7IGFyclJlbW92ZSB9IGZyb20gJy4uL3V0aWwvYXJyUmVtb3ZlJztcbnZhciBBc3luY0FjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMud29yayA9IHdvcms7XG4gICAgICAgIF90aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICB0aGlzLmlkID0gKF9hID0gdGhpcy5pZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5yZXF1ZXN0QXN5bmNJZChzY2hlZHVsZXIsIHRoaXMuaWQsIGRlbGF5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBfaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gaW50ZXJ2YWxQcm92aWRlci5zZXRJbnRlcnZhbChzY2hlZHVsZXIuZmx1c2guYmluZChzY2hlZHVsZXIsIHRoaXMpLCBkZWxheSk7XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUucmVjeWNsZUFzeW5jSWQgPSBmdW5jdGlvbiAoX3NjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgIT0gbnVsbCAmJiB0aGlzLmRlbGF5ID09PSBkZWxheSAmJiB0aGlzLnBlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGludGVydmFsUHJvdmlkZXIuY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2V4ZWN1dGluZyBhIGNhbmNlbGxlZCBhY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBlbmRpbmcgPT09IGZhbHNlICYmIHRoaXMuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQodGhpcy5zY2hlZHVsZXIsIHRoaXMuaWQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIF9kZWxheSkge1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JWYWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud29yayhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JWYWx1ZSA9IGUgPyBlIDogbmV3IEVycm9yKCdTY2hlZHVsZWQgYWN0aW9uIHRocmV3IGZhbHN5IGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvclZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMsIGlkID0gX2EuaWQsIHNjaGVkdWxlciA9IF9hLnNjaGVkdWxlcjtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgICAgICB0aGlzLndvcmsgPSB0aGlzLnN0YXRlID0gdGhpcy5zY2hlZHVsZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBhcnJSZW1vdmUoYWN0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHNjaGVkdWxlciwgaWQsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxheSA9IG51bGw7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc3luY0FjdGlvbjtcbn0oQWN0aW9uKSk7XG5leHBvcnQgeyBBc3luY0FjdGlvbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNBY3Rpb24uanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xudmFyIEFzeW5jU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNTY2hlZHVsZXIoU2NoZWR1bGVyQWN0aW9uLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU2NoZWR1bGVyQWN0aW9uLCBub3cpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgX3RoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzeW5jU2NoZWR1bGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNTY2hlZHVsZXI7XG59KFNjaGVkdWxlcikpO1xuZXhwb3J0IHsgQXN5bmNTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU2NoZWR1bGVyLmpzLm1hcCIsImltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4vQXN5bmNTY2hlZHVsZXInO1xuZXhwb3J0IHZhciBhc3luY1NjaGVkdWxlciA9IG5ldyBBc3luY1NjaGVkdWxlcihBc3luY0FjdGlvbik7XG5leHBvcnQgdmFyIGFzeW5jID0gYXN5bmNTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luYy5qcy5tYXAiLCJleHBvcnQgdmFyIGRhdGVUaW1lc3RhbXBQcm92aWRlciA9IHtcbiAgICBub3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlVGltZXN0YW1wUHJvdmlkZXIuZGVsZWdhdGUgfHwgRGF0ZSkubm93KCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGVUaW1lc3RhbXBQcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmV4cG9ydCB2YXIgaW50ZXJ2YWxQcm92aWRlciA9IHtcbiAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gaW50ZXJ2YWxQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRJbnRlcnZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLnNldEludGVydmFsLmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBpbnRlcnZhbFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJJbnRlcnZhbCkgfHwgY2xlYXJJbnRlcnZhbCkoaGFuZGxlKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJ2YWxQcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmV4cG9ydCB2YXIgdGltZW91dFByb3ZpZGVyID0ge1xuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRUaW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuc2V0VGltZW91dC5hcHBseShkZWxlZ2F0ZSwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0LmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLmNsZWFyVGltZW91dCkgfHwgY2xlYXJUaW1lb3V0KShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lb3V0UHJvdmlkZXIuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCkge1xuICAgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8ICFTeW1ib2wuaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuICdAQGl0ZXJhdG9yJztcbiAgICB9XG4gICAgcmV0dXJuIFN5bWJvbC5pdGVyYXRvcjtcbn1cbmV4cG9ydCB2YXIgaXRlcmF0b3IgPSBnZXRTeW1ib2xJdGVyYXRvcigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmF0b3IuanMubWFwIiwiZXhwb3J0IHZhciBvYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5vYnNlcnZhYmxlKSB8fCAnQEBvYnNlcnZhYmxlJzsgfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRXJyb3JDbGFzcyB9IGZyb20gJy4vY3JlYXRlRXJyb3JDbGFzcyc7XG5leHBvcnQgdmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gY3JlYXRlRXJyb3JDbGFzcyhmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIE9iamVjdFVuc3Vic2NyaWJlZEVycm9ySW1wbCgpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnb2JqZWN0IHVuc3Vic2NyaWJlZCc7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRXJyb3JDbGFzcyB9IGZyb20gJy4vY3JlYXRlRXJyb3JDbGFzcyc7XG5leHBvcnQgdmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvckltcGwoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3JzXG4gICAgICAgICAgICA/IGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcblwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiBpICsgMSArIFwiKSBcIiArIGVyci50b1N0cmluZygpOyB9KS5qb2luKCdcXG4gICcpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBpc1NjaGVkdWxlciB9IGZyb20gJy4vaXNTY2hlZHVsZXInO1xuZnVuY3Rpb24gbGFzdChhcnIpIHtcbiAgICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwb3BSZXN1bHRTZWxlY3RvcihhcmdzKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24obGFzdChhcmdzKSkgPyBhcmdzLnBvcCgpIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBvcFNjaGVkdWxlcihhcmdzKSB7XG4gICAgcmV0dXJuIGlzU2NoZWR1bGVyKGxhc3QoYXJncykpID8gYXJncy5wb3AoKSA6IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwb3BOdW1iZXIoYXJncywgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBsYXN0KGFyZ3MpID09PSAnbnVtYmVyJyA/IGFyZ3MucG9wKCkgOiBkZWZhdWx0VmFsdWU7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcmdzLmpzLm1hcCIsInZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiwgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlLCBnZXRLZXlzID0gT2JqZWN0LmtleXM7XG5leHBvcnQgZnVuY3Rpb24gYXJnc0FyZ0FycmF5T3JPYmplY3QoYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgZmlyc3RfMSA9IGFyZ3NbMF07XG4gICAgICAgIGlmIChpc0FycmF5KGZpcnN0XzEpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBhcmdzOiBmaXJzdF8xLCBrZXlzOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUE9KTyhmaXJzdF8xKSkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBnZXRLZXlzKGZpcnN0XzEpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhcmdzOiBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmaXJzdF8xW2tleV07IH0pLFxuICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGFyZ3M6IGFyZ3MsIGtleXM6IG51bGwgfTtcbn1cbmZ1bmN0aW9uIGlzUE9KTyhvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGdldFByb3RvdHlwZU9mKG9iaikgPT09IG9iamVjdFByb3RvO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJnc0FyZ0FycmF5T3JPYmplY3QuanMubWFwIiwidmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZXhwb3J0IGZ1bmN0aW9uIGFyZ3NPckFyZ0FycmF5KGFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShhcmdzWzBdKSA/IGFyZ3NbMF0gOiBhcmdzO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJnc09yQXJnQXJyYXkuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGFyclJlbW92ZShhcnIsIGl0ZW0pIHtcbiAgICBpZiAoYXJyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAwIDw9IGluZGV4ICYmIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyclJlbW92ZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRXJyb3JDbGFzcyhjcmVhdGVJbXBsKSB7XG4gICAgdmFyIF9zdXBlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBFcnJvci5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2Uuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9O1xuICAgIHZhciBjdG9yRnVuYyA9IGNyZWF0ZUltcGwoX3N1cGVyKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgY3RvckZ1bmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvckZ1bmM7XG4gICAgcmV0dXJuIGN0b3JGdW5jO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlT2JqZWN0KGtleXMsIHZhbHVlcykge1xuICAgIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBrZXksIGkpIHsgcmV0dXJuICgocmVzdWx0W2tleV0gPSB2YWx1ZXNbaV0pLCByZXN1bHQpOyB9LCB7fSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGVPYmplY3QuanMubWFwIiwiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbnZhciBjb250ZXh0ID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBlcnJvckNvbnRleHQoY2IpIHtcbiAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgdmFyIGlzUm9vdCA9ICFjb250ZXh0O1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICBjb250ZXh0ID0geyBlcnJvclRocm93bjogZmFsc2UsIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2IoKTtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgdmFyIF9hID0gY29udGV4dCwgZXJyb3JUaHJvd24gPSBfYS5lcnJvclRocm93biwgZXJyb3IgPSBfYS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNiKCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVFcnJvcihlcnIpIHtcbiAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcgJiYgY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmVycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgY29udGV4dC5lcnJvciA9IGVycjtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvckNvbnRleHQuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVTY2hlZHVsZShwYXJlbnRTdWJzY3JpcHRpb24sIHNjaGVkdWxlciwgd29yaywgZGVsYXksIHJlcGVhdCkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIGlmIChyZXBlYXQgPT09IHZvaWQgMCkgeyByZXBlYXQgPSBmYWxzZTsgfVxuICAgIHZhciBzY2hlZHVsZVN1YnNjcmlwdGlvbiA9IHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdvcmsoKTtcbiAgICAgICAgaWYgKHJlcGVhdCkge1xuICAgICAgICAgICAgcGFyZW50U3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNjaGVkdWxlKG51bGwsIGRlbGF5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9LCBkZWxheSk7XG4gICAgcGFyZW50U3Vic2NyaXB0aW9uLmFkZChzY2hlZHVsZVN1YnNjcmlwdGlvbik7XG4gICAgaWYgKCFyZXBlYXQpIHtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3Vic2NyaXB0aW9uO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4ZWN1dGVTY2hlZHVsZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICAgIHJldHVybiB4O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWRlbnRpdHkuanMubWFwIiwiZXhwb3J0IHZhciBpc0FycmF5TGlrZSA9IChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAmJiB0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInICYmIHR5cGVvZiB4ICE9PSAnZnVuY3Rpb24nOyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXJyYXlMaWtlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXN5bmNJdGVyYWJsZShvYmopIHtcbiAgICByZXR1cm4gU3ltYm9sLmFzeW5jSXRlcmF0b3IgJiYgaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmpbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcCIsImltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oaW5wdXRbU3ltYm9sX29ic2VydmFibGVdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzSW50ZXJvcE9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihpbnB1dCA9PT0gbnVsbCB8fCBpbnB1dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRbU3ltYm9sX2l0ZXJhdG9yXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0l0ZXJhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tIFwiLi9pc0Z1bmN0aW9uXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRoZW4pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNQcm9taXNlLmpzLm1hcCIsImltcG9ydCB7IF9fYXN5bmNHZW5lcmF0b3IsIF9fYXdhaXQsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yXzEoKSB7XG4gICAgICAgIHZhciByZWFkZXIsIF9hLCB2YWx1ZSwgZG9uZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGFibGVTdHJlYW0uZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdChyZWFkZXIucmVhZCgpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdmFsdWUgPSBfYS52YWx1ZSwgZG9uZSA9IF9hLmRvbmU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfX2F3YWl0KHZvaWQgMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0LCBfX2F3YWl0KHZhbHVlKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQsIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhZGFibGVTdHJlYW1MaWtlKG9iaikge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9iai5nZXRSZWFkZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNSZWFkYWJsZVN0cmVhbUxpa2UuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaXNTY2hlZHVsZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5zY2hlZHVsZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1NjaGVkdWxlci5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBoYXNMaWZ0KHNvdXJjZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5saWZ0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvcGVyYXRlKGluaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAoaGFzTGlmdChzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmxpZnQoZnVuY3Rpb24gKGxpZnRlZFNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0KGxpZnRlZFNvdXJjZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuYWJsZSB0byBsaWZ0IHVua25vd24gT2JzZXJ2YWJsZSB0eXBlJyk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpZnQuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBtYXAgfSBmcm9tIFwiLi4vb3BlcmF0b3JzL21hcFwiO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpIHtcbiAgICByZXR1cm4gaXNBcnJheShhcmdzKSA/IGZuLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSkgOiBmbihhcmdzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBPbmVPck1hbnlBcmdzKGZuKSB7XG4gICAgcmV0dXJuIG1hcChmdW5jdGlvbiAoYXJncykgeyByZXR1cm4gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcE9uZU9yTWFueUFyZ3MuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vb3AuanMubWFwIiwiaW1wb3J0IHsgaWRlbnRpdHkgfSBmcm9tICcuL2lkZW50aXR5JztcbmV4cG9ydCBmdW5jdGlvbiBwaXBlKCkge1xuICAgIHZhciBmbnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmbnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkoZm5zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwaXBlRnJvbUFycmF5KGZucykge1xuICAgIGlmIChmbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBpZGVudGl0eTtcbiAgICB9XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBpcGVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBmbikgeyByZXR1cm4gZm4ocHJldik7IH0sIGlucHV0KTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwZS5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHsgdGltZW91dFByb3ZpZGVyIH0gZnJvbSAnLi4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyKSB7XG4gICAgdGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb25VbmhhbmRsZWRFcnJvciA9IGNvbmZpZy5vblVuaGFuZGxlZEVycm9yO1xuICAgICAgICBpZiAob25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgb25VbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBvcnRVbmhhbmRsZWRFcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBwcm92aWRlZCBcIiArIChpbnB1dCAhPT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IFwiJ1wiICsgaW5wdXQgKyBcIidcIikgKyBcIiB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBSZWFkYWJsZVN0cmVhbSwgQXJyYXksIEFzeW5jSXRlcmFibGUsIG9yIEl0ZXJhYmxlLlwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93VW5vYnNlcnZhYmxlRXJyb3IuanMubWFwIiwiaW1wb3J0IHsgSW5zZXJ0QXJ0aWNsZUxvZ2ljIH0gZnJvbSBcIi4vaW5zZXJ0QXJ0aWNsZUxvZ2ljXCI7XG5pbXBvcnQgeyBEaXNwbGF5QXJ0aWNsZUxvZ2ljIH0gZnJvbSBcIi4vZGlzcGxheUFydGljbGVMb2dpY1wiO1xuaW1wb3J0IHsgRWRpdEFydGljbGVMb2dpYyB9IGZyb20gXCIuL2VkaXRBcnRpY2xlTG9naWNcIjtcbmltcG9ydCB7IGhhbmRsZUJ1dHRvbiB9IGZyb20gXCIuLi8uLi9vYnNlcnZhYmxlcy9ldmVudGhhbmRsZXJzXCI7XG52YXIgQ2xhbmFrTG9naWMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2xhbmFrTG9naWMoY2xhbmtvdmlEaXYsIGFkZEFydGljbGVCdG4sIHNlYXJjaElucHV0LCBhdXRvcklucHV0LCB0eXBlU2VsZWN0LCBidG5SZXNldHVqKSB7XG4gICAgICAgIC8vaW5pY2lqYWxpenVqZW1vIG92ZSBsb2dpa2VcbiAgICAgICAgdGhpcy5kaXNwbGF5QXJ0aWNsZUxvZ2ljID0gbmV3IERpc3BsYXlBcnRpY2xlTG9naWMoKTtcbiAgICAgICAgdGhpcy5pbnNlcnRBcnRpY2xlTG9naWMgPSBuZXcgSW5zZXJ0QXJ0aWNsZUxvZ2ljKCk7XG4gICAgICAgIHRoaXMuZWRpdEFydGljbGVMb2dpYyA9IG5ldyBFZGl0QXJ0aWNsZUxvZ2ljKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheUFydGljbGVMb2dpYy5kaXNwbGF5QXJ0aWNsZXMoY2xhbmtvdmlEaXYpO1xuICAgICAgICB0aGlzLiRhZGRBcnRpY2xlQnV0dG9uID0gaGFuZGxlQnV0dG9uKGFkZEFydGljbGVCdG4pO1xuICAgICAgICB0aGlzLmhhbmRsZURvZGF2YW5qZUNsYW5rYSgpO1xuICAgICAgICB0aGlzLmRpc3BsYXlBcnRpY2xlTG9naWMuZmlsdGVyQXJ0aWNsZXMoc2VhcmNoSW5wdXQsIGF1dG9ySW5wdXQsIHR5cGVTZWxlY3QsIGJ0blJlc2V0dWopO1xuICAgIH1cbiAgICBDbGFuYWtMb2dpYy5wcm90b3R5cGUuaGFuZGxlRG9kYXZhbmplQ2xhbmthID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYWRkQXJ0aWNsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWFydGljbGUtY29udGFpbmVyXCIpO1xuICAgICAgICB0aGlzLiRhZGRBcnRpY2xlQnV0dG9uLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhZGRBcnRpY2xlQ29udGFpbmVyLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0QXJ0aWNsZUxvZ2ljLmRpc3BsYXlQcmV2aWV3KCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENsYW5ha0xvZ2ljO1xufSgpKTtcbmV4cG9ydCB7IENsYW5ha0xvZ2ljIH07XG4iLCJpbXBvcnQgeyBWaWV3TG9naWMgfSBmcm9tIFwiLi4vLi4vdmlldy92aWV3TG9naWNcIjtcbmltcG9ydCB7IERpc3BsYXlBcnRpY2xlTG9naWMgfSBmcm9tIFwiLi9kaXNwbGF5QXJ0aWNsZUxvZ2ljXCI7XG52YXIgQ2xhbmFrVmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDbGFuYWtWaWV3KCkge1xuICAgICAgICBDbGFuYWtWaWV3LmRpc3BMb2cgPSBuZXcgRGlzcGxheUFydGljbGVMb2dpYygpO1xuICAgICAgICB0aGlzLnZpZXdMb2dpYyA9IG5ldyBWaWV3TG9naWMoKTtcbiAgICB9XG4gICAgQ2xhbmFrVmlldy5kcmF3QXJ0aWNsZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIGNsYW5haykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYXJ0aWNsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGFydGljbGVEaXYuY2xhc3NMaXN0LmFkZChcImFydGljbGUtZGl2XCIpO1xuICAgICAgICBhcnRpY2xlRGl2LnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgY2xhbmFrLmlkLnRvU3RyaW5nKCkpO1xuICAgICAgICBhcnRpY2xlRGl2Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuZGlzcExvZy5hcnRpY2xlQ2xpY2soYXJ0aWNsZURpdik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1hcnRpY2xlLWRpdlwiKTtcbiAgICAgICAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSBjbGFuYWsudGl0bGU7XG4gICAgICAgIHZhciBhdXRvckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGF1dG9yRGl2LmNsYXNzTGlzdC5hZGQoXCJhdXRvci1kaXZcIik7XG4gICAgICAgIGF1dG9yRGl2LnRleHRDb250ZW50ID0gY2xhbmFrLmF1dG9yLmltZSArIFwiIFwiICsgY2xhbmFrLmF1dG9yLnByZXppbWU7XG4gICAgICAgIHZhciB0aXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aXBEaXYuY2xhc3NMaXN0LmFkZChcInRpcC1kaXZcIik7XG4gICAgICAgIHRpcERpdi50ZXh0Q29udGVudCA9IGNsYW5hay50aXA7XG4gICAgICAgIGFydGljbGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuICAgICAgICBhcnRpY2xlRGl2LmFwcGVuZENoaWxkKGF1dG9yRGl2KTtcbiAgICAgICAgYXJ0aWNsZURpdi5hcHBlbmRDaGlsZCh0aXBEaXYpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXJ0aWNsZURpdik7XG4gICAgfTtcbiAgICBDbGFuYWtWaWV3LnByb3RvdHlwZS5kcmF3Q2xhbmFrID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgY2xhbmFrSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNsYW5ha0luZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNsYW5hay1pbmZvLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdmFyIGNsYW5ha0tvbWVudGFyaUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8va29udGVqbmVyIHNhIGRlc25lIHN0cmFuZSBzYSBzdmltIGtvbWVudGFyaW1hIGkgZm9ybW9tIHphIGRvZGF2YW5qZSBrb21lbnRhcmFcbiAgICAgICAgY2xhbmFrS29tZW50YXJpQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjbGFuYWsta29tZW50YXJpLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdmFyIGNsYW5ha0luZm9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjbGFuYWtJbmZvRGl2LmNsYXNzTGlzdC5hZGQoXCJjbGFuYWstaW5mby1kaXZcIik7XG4gICAgICAgIHZhciBjbGFuYWtLb21lbnRhcmlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjbGFuYWtLb21lbnRhcmlEaXYuY2xhc3NMaXN0LmFkZChcImNsYW5hay1rb21lbnRhcmktZGl2XCIpO1xuICAgICAgICB2YXIgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGl0bGUtY2xhbmFrXCIpO1xuICAgICAgICB2YXIgYXV0b3JEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhdXRvckRpdi5jbGFzc0xpc3QuYWRkKFwiYXV0b3ItY2xhbmFrXCIpO1xuICAgICAgICB2YXIgdGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aXAtY2xhbmFrXCIpO1xuICAgICAgICB2YXIgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRlbnREaXYuY2xhc3NMaXN0LmFkZChcImNvbnRlbnQtY2xhbmFrXCIpO1xuICAgICAgICB2YXIgZHVnbWljaURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGR1Z21pY2lEaXYuY2xhc3NMaXN0LmFkZChcImR1Z21pY2ktY2xhbmFrXCIpO1xuICAgICAgICBkdWdtaWNpRGl2LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHZhciBidG5Jem1lbmkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5Jem1lbmkuY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1pem1lbmlcIik7XG4gICAgICAgIGJ0bkl6bWVuaS50ZXh0Q29udGVudCA9IFwiSXptZW5pXCI7XG4gICAgICAgIHZhciBidG5JemJyaXNpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuSXpicmlzaS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWl6YnJpc2lcIik7XG4gICAgICAgIGJ0bkl6YnJpc2kudGV4dENvbnRlbnQgPSBcIkl6YnJpc2lcIjtcbiAgICAgICAgZHVnbWljaURpdi5hcHBlbmRDaGlsZChidG5Jem1lbmkpO1xuICAgICAgICBkdWdtaWNpRGl2LmFwcGVuZENoaWxkKGJ0bkl6YnJpc2kpO1xuICAgICAgICBjbGFuYWtJbmZvRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgY2xhbmFrSW5mb0Rpdi5hcHBlbmRDaGlsZChhdXRvckRpdik7XG4gICAgICAgIGNsYW5ha0luZm9EaXYuYXBwZW5kQ2hpbGQodGlwRGl2KTtcbiAgICAgICAgY2xhbmFrSW5mb0Rpdi5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgICAgICAgY2xhbmFrSW5mb0Rpdi5hcHBlbmRDaGlsZChkdWdtaWNpRGl2KTtcbiAgICAgICAgdmFyIGtvbWVudGFySW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBrb21lbnRhcklucHV0RGl2LmNsYXNzTGlzdC5hZGQoXCJrb25vYmFyLWlucHV0LWRpdlwiKTtcbiAgICAgICAgdmFyIHRla3N0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgIHRla3N0SW5wdXQuY2xhc3NMaXN0LmFkZChcImtvbWVudGFyLWlucHV0XCIpO1xuICAgICAgICB0ZWtzdElucHV0LnBsYWNlaG9sZGVyID0gXCJEb2RhaiBrb21lbnRhclwiO1xuICAgICAgICB2YXIgYnRuT2JqYXZpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuT2JqYXZpLmNsYXNzTGlzdC5hZGQoXCJrb21lbnRhci1idXR0b25cIik7XG4gICAgICAgIGJ0bk9iamF2aS50ZXh0Q29udGVudCA9IFwiT2JqYXZpXCI7XG4gICAgICAgIHZhciBidG5PSXphZGppID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuT0l6YWRqaS5jbGFzc0xpc3QuYWRkKFwiaXphZGppLWJ1dHRvblwiKTtcbiAgICAgICAgYnRuT0l6YWRqaS50ZXh0Q29udGVudCA9IFwiSXphZGppXCI7XG4gICAgICAgIGNsYW5ha0tvbWVudGFyaUNvbnRhaW5lci5hcHBlbmRDaGlsZChjbGFuYWtLb21lbnRhcmlEaXYpO1xuICAgICAgICBrb21lbnRhcklucHV0RGl2LmFwcGVuZENoaWxkKHRla3N0SW5wdXQpO1xuICAgICAgICBrb21lbnRhcklucHV0RGl2LmFwcGVuZENoaWxkKGJ0bk9iamF2aSk7XG4gICAgICAgIGtvbWVudGFySW5wdXREaXYuYXBwZW5kQ2hpbGQoYnRuT0l6YWRqaSk7XG4gICAgICAgIGNsYW5ha0tvbWVudGFyaUNvbnRhaW5lci5hcHBlbmRDaGlsZChrb21lbnRhcklucHV0RGl2KTtcbiAgICAgICAgY2xhbmFrSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbGFuYWtJbmZvRGl2KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNsYW5ha0luZm9Db250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2xhbmFrS29tZW50YXJpQ29udGFpbmVyKTtcbiAgICB9O1xuICAgIENsYW5ha1ZpZXcuZHJhd0tvbWVudGFyID0gZnVuY3Rpb24gKGNvbnRhaW5lciwga29tZW50YXJpKSB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB2YXIgZHV6aW5hID0gMDtcbiAgICAgICAgdmFyIGtvcmlzbmlrRGl2O1xuICAgICAgICB2YXIga29tZW50YXJUZWtzdDtcbiAgICAgICAgaWYgKGtvbWVudGFyaS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkdXppbmEgPSBrb21lbnRhcmkubGVuZ3RoO1xuICAgICAgICAgICAga29tZW50YXJpLmZvckVhY2goZnVuY3Rpb24gKGtvbWVudGFyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYW5ha0tvbWVudGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjbGFuYWtLb21lbnRhci5jbGFzc0xpc3QuYWRkKFwia29tZW50YXJcIik7XG4gICAgICAgICAgICAgICAga29yaXNuaWtEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGtvcmlzbmlrRGl2LmNsYXNzTGlzdC5hZGQoXCJrb21lbnRhci11c2VyXCIpO1xuICAgICAgICAgICAgICAgIGtvbWVudGFyVGVrc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGtvbWVudGFyVGVrc3QuY2xhc3NMaXN0LmFkZChcImtvbWVudGFyLXRla3N0XCIpO1xuICAgICAgICAgICAgICAgIGtvcmlzbmlrRGl2LnRleHRDb250ZW50ID0ga29tZW50YXIudXNlci5pbWUgKyBcIiBcIiArIGtvbWVudGFyLnVzZXIucHJlemltZTtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmVkVXNlckpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xuICAgICAgICAgICAgICAgIGlmIChzdG9yZWRVc2VySlNPTikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmVkVXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlckpTT04pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmVkVXNlci5pZCA9PSBrb21lbnRhci51c2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAga29yaXNuaWtEaXYuc3R5bGUuY29sb3IgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrb21lbnRhclRla3N0LnRleHRDb250ZW50ID0ga29tZW50YXIudGVrc3Q7XG4gICAgICAgICAgICAgICAgY2xhbmFrS29tZW50YXIuYXBwZW5kQ2hpbGQoa29yaXNuaWtEaXYpO1xuICAgICAgICAgICAgICAgIGNsYW5ha0tvbWVudGFyLmFwcGVuZENoaWxkKGtvbWVudGFyVGVrc3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjbGFuYWtLb21lbnRhcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2xhbmFrVmlldy5wcm90b3R5cGUuZHJhd0FkZEFydGljbGVGb3JtID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgZm9ybWFEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JtYURpdi5jbGFzc0xpc3QuYWRkKFwiYWRkLWZvcm1cIik7XG4gICAgICAgIHZhciBmb3JtYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcm1hLmNsYXNzTGlzdC5hZGQoXCJhZGQtZGlhbG9nLWZvcm1cIik7XG4gICAgICAgIHZhciB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1mb3JtLWRpdlwiKTtcbiAgICAgICAgdmFyIHRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIHRpdGxlTGFiZWwuY2xhc3NMaXN0LmFkZChcInRpdGxlLWxhYmVsXCIpO1xuICAgICAgICB0aXRsZUxhYmVsLnRleHRDb250ZW50ID0gXCJUaXRsZTogXCI7XG4gICAgICAgIHZhciB0aXRsZUFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgdGl0bGVBZGQuY2xhc3NMaXN0LmFkZChcImlucHV0VGl0bGVcIik7XG4gICAgICAgIHZhciBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udGVudERpdi5jbGFzc0xpc3QuYWRkKFwiY29udGVudC1mb3JtLWRpdlwiKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgY29udGVudExhYmVsLmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LWxhYmVsXCIpO1xuICAgICAgICBjb250ZW50TGFiZWwudGV4dENvbnRlbnQgPSBcIkNvbnRlbnQ6IFwiO1xuICAgICAgICB2YXIgY29udGVudEFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgY29udGVudEFkZC5jbGFzc0xpc3QuYWRkKFwiaW5wdXRDb250ZW50XCIpO1xuICAgICAgICB2YXIgdHlwZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHR5cGVEaXYuY2xhc3NMaXN0LmFkZChcInR5cGUtZm9ybS1kaXZcIik7XG4gICAgICAgIHZhciB0eXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIHR5cGVMYWJlbC5jbGFzc0xpc3QuYWRkKFwidHlwZS1sYWJlbFwiKTtcbiAgICAgICAgdHlwZUxhYmVsLnRleHRDb250ZW50ID0gXCJUeXBlOiBcIjtcbiAgICAgICAgdmFyIHR5cGVTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgICAgICB0eXBlU2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJ0eXBlLXNlbGVjdFwiKTtcbiAgICAgICAgLy96YSB0YWogc2VsZWN0IGphIHRyZWJhIGRhIGRvZGFtIG9wY2lqZSBuYSBvc25vdnUgdGlwb3ZhIGtvamkgc2UgbmFsYXplIHUgZGIuanNvbiwgem5hY2kgbW9ndSBkYSBtdSBwcmVuZXNlbSBjZW8gbml6IHN0cmluZ292YSBpIHBvc2xlIGRhIHphdHZvcmltIHRva1xuICAgICAgICB0aGlzLnZpZXdMb2dpYy5wb3B1bmlTZWxlY3QodHlwZVNlbGVjdCk7XG4gICAgICAgIHZhciBkdWdtaWNpRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZHVnbWljaURpdi5jbGFzc0xpc3QuYWRkKFwiZHVnbWljaS1mb3JtLWRpdlwiKTtcbiAgICAgICAgdmFyIGJ0bkRvZGFqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuRG9kYWouY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1hZGRcIik7XG4gICAgICAgIGJ0bkRvZGFqLnRleHRDb250ZW50ID0gXCJEb2RhaiBub3ZpIGNsYW5ha1wiO1xuICAgICAgICB2YXIgYnRuSXptZW5pID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuSXptZW5pLmNsYXNzTGlzdC5hZGQoXCJidXR0b24tZWRpdFwiKTtcbiAgICAgICAgYnRuSXptZW5pLnRleHRDb250ZW50ID0gXCJJem1lbmkgY2xhbmFrXCI7XG4gICAgICAgIGJ0bkl6bWVuaS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB2YXIgYnRuT3RrYXppID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuT3RrYXppLmNsYXNzTGlzdC5hZGQoXCJidXR0b24tY2FuY2VsXCIpO1xuICAgICAgICBidG5PdGthemkudGV4dENvbnRlbnQgPSBcIk90a2F6aVwiO1xuICAgICAgICB2YXIgYnRuT3BlbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bk9wZW5Gb3JtXCIpO1xuICAgICAgICAvKmJ0bk90a2F6aS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgY2FuY2VsUHJldmlldygpXG4gICAgICAgICAgICBjb25zdCBhZGRBcnRpY2xlQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWFydGljbGUtY29udGFpbmVyXCIpXG4gICAgICAgICAgICBhZGRBcnRpY2xlQ29udGFpbmVyLmhpZGRlbiA9IHRydWVcbiAgICAgICAgfSovXG4gICAgICAgIC8vYnRuRG9kYWoub25jbGljayA9ICgpID0+IGRvZGFqQ2xhbmFrKHRpdGxlQWRkLCBjb250ZW50QWRkLCB0eXBlU2VsZWN0KVxuICAgICAgICB2YXIgYXJ0aWNsZUlubnB1dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGFydGljbGVJbm5wdXREaXYuY2xhc3NMaXN0LmFkZChcImFydGljbGUtaW5wdXQtZGl2XCIpO1xuICAgICAgICB0aGlzLmRyYXdQcmV2aWV3RGl2KGFydGljbGVJbm5wdXREaXYpO1xuICAgICAgICBkdWdtaWNpRGl2LmFwcGVuZENoaWxkKGJ0bkRvZGFqKTtcbiAgICAgICAgZHVnbWljaURpdi5hcHBlbmRDaGlsZChidG5Jem1lbmkpO1xuICAgICAgICBkdWdtaWNpRGl2LmFwcGVuZENoaWxkKGJ0bk90a2F6aSk7XG4gICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlTGFiZWwpO1xuICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0aXRsZUFkZCk7XG4gICAgICAgIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQoY29udGVudExhYmVsKTtcbiAgICAgICAgY29udGVudERpdi5hcHBlbmRDaGlsZChjb250ZW50QWRkKTtcbiAgICAgICAgdHlwZURpdi5hcHBlbmRDaGlsZCh0eXBlTGFiZWwpO1xuICAgICAgICB0eXBlRGl2LmFwcGVuZENoaWxkKHR5cGVTZWxlY3QpO1xuICAgICAgICBmb3JtYS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG4gICAgICAgIGZvcm1hLmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuICAgICAgICBmb3JtYS5hcHBlbmRDaGlsZCh0eXBlRGl2KTtcbiAgICAgICAgZm9ybWEuYXBwZW5kQ2hpbGQoZHVnbWljaURpdik7XG4gICAgICAgIGZvcm1hRGl2LmFwcGVuZENoaWxkKGZvcm1hKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1hRGl2KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFydGljbGVJbm5wdXREaXYpO1xuICAgIH07XG4gICAgQ2xhbmFrVmlldy5wcm90b3R5cGUuZHJhd1ByZXZpZXdEaXYgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1pbnB1dC1kaXZcIik7IC8vb3NsdXNrdWplbSBwcm9tZW5lIG5hIGlucHV0dSB6YSB0aXRsZSBpIHRha28gbWVuamFtIG5qZWdvdiB0ZXh0Q29udGVudFxuICAgICAgICB2YXIgYXV0b3JEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhdXRvckRpdi5jbGFzc0xpc3QuYWRkKFwiYXV0b3ItaW5wdXQtZGl2XCIpOyAvL3V6aW1hbSBhdXRvcmEgaXogbG9jYWxzdG9yYWdlIGkgc3RhdmxqYW0gaW1lIGkgcHJlemltZSB1IHRleHRjb250ZW50XG4gICAgICAgIHZhciB0aXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aXBEaXYuY2xhc3NMaXN0LmFkZChcInRpcC1kaXZcIik7IC8vb3NsdXNrdWplbSBwcm9tZW5lIG5hIHNlbGVrdHUgemEgdGlwIGkgdGFrbyBtZW5qYW0gbmplZ292IHRleHRDb250ZW50XCJcbiAgICAgICAgdmFyIGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250ZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LWlucHV0LWRpdlwiKTsgLy9vc2x1c2t1amVtIHByb21lbmUgbmEgaW5wdXR1IHphIGNvbnRlbnQgaSB0YWtvIG1lbmphbSBuamVnb3YgdGV4dENvbnRlbnRcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGF1dG9yRGl2KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpcERpdik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgICB9O1xuICAgIHJldHVybiBDbGFuYWtWaWV3O1xufSgpKTtcbmV4cG9ydCB7IENsYW5ha1ZpZXcgfTtcbiIsImltcG9ydCB7IFN1YmplY3QsIGRpc3RpbmN0LCBmaWx0ZXIsIG1lcmdlLCB0YWtlVW50aWwsIHppcCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBkZWxldGVBcnRpY2xlYnlJZCwgZ2V0QXJ0aWNsZUJ5SWQsIGdldEFydGljbGVzLCBnZXRBcnRpY2xlc0NvbW1lbnRzIH0gZnJvbSBcIi4uLy4uL29ic2VydmFibGVzL2FwaXNlcnZpY2VcIjtcbmltcG9ydCB7IGhhbmRsZUF1dGhvcklucHV0LCBoYW5kbGVCdXR0b24sIGhhbmRsZVNlYXJjaElucHV0LCBoYW5kbGVUeXBlSW5wdXQgfSBmcm9tIFwiLi4vLi4vb2JzZXJ2YWJsZXMvZXZlbnRoYW5kbGVyc1wiO1xuaW1wb3J0IHsgRWRpdEFydGljbGVMb2dpYyB9IGZyb20gXCIuL2VkaXRBcnRpY2xlTG9naWNcIjtcbmltcG9ydCB7IEtvbWVudGFyTG9naWMgfSBmcm9tIFwiLi9rb21lbnRhckxvZ2ljXCI7XG5pbXBvcnQgeyBDbGFuYWtWaWV3IH0gZnJvbSBcIi4vY2xhbmFrVmlld1wiO1xuaW1wb3J0IHsgVmlld0xvZ2ljIH0gZnJvbSBcIi4uLy4uL3ZpZXcvdmlld0xvZ2ljXCI7XG52YXIgRGlzcGxheUFydGljbGVMb2dpYyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNwbGF5QXJ0aWNsZUxvZ2ljKCkge1xuICAgICAgICB0aGlzLmV4aXRTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgdGhpcy4kYXJ0aWNsZUNsaWNrVHJpZ2dlciA9IHRoaXMuZXhpdFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgIHRoaXMua29tZW50YXJpTG9naWMgPSBuZXcgS29tZW50YXJMb2dpYygpO1xuICAgIH1cbiAgICBEaXNwbGF5QXJ0aWNsZUxvZ2ljLnByb3RvdHlwZS5kaXNwbGF5QXJ0aWNsZXMgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZ2V0QXJ0aWNsZXMoKS5zdWJzY3JpYmUoZnVuY3Rpb24gKGFydGlrbGkpIHtcbiAgICAgICAgICAgIGFydGlrbGkuZm9yRWFjaChmdW5jdGlvbiAoY2xhbmFrKSB7XG4gICAgICAgICAgICAgICAgQ2xhbmFrVmlldy5kcmF3QXJ0aWNsZShjb250YWluZXIsIGNsYW5hayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEaXNwbGF5QXJ0aWNsZUxvZ2ljLnByb3RvdHlwZS5zZXRDbGFuYWsgPSBmdW5jdGlvbiAoY2xhbmFrKSB7XG4gICAgICAgIHZhciBjbGFuYWtEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsYW5hay1jb250YWluZXJcIik7XG4gICAgICAgIGNsYW5ha0Rpdi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdmFyIHRpdGxlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1jbGFuYWtcIik7XG4gICAgICAgIHZhciBhdXRvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b3ItY2xhbmFrXCIpO1xuICAgICAgICB2YXIgdGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXAtY2xhbmFrXCIpO1xuICAgICAgICB2YXIgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudC1jbGFuYWtcIik7XG4gICAgICAgIHZhciBkdWdtaWNpRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kdWdtaWNpLWNsYW5ha1wiKTtcbiAgICAgICAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSBjbGFuYWsudGl0bGU7XG4gICAgICAgIGF1dG9yRGl2LnRleHRDb250ZW50ID0gY2xhbmFrLmF1dG9yLmltZSArIFwiIFwiICsgY2xhbmFrLmF1dG9yLnByZXppbWU7XG4gICAgICAgIHRpcERpdi50ZXh0Q29udGVudCA9IGNsYW5hay50aXA7XG4gICAgICAgIGNvbnRlbnREaXYudGV4dENvbnRlbnQgPSBjbGFuYWsuY29udGVudDtcbiAgICAgICAgLy9wcmViYWNpIHUgZnVua2NpanUgaSBkb2JpaiBwcmloYXZsamVub2cga29yaXNuaWthXG4gICAgICAgIHZhciB1c2VyID0gVmlld0xvZ2ljLmdldEN1cnJlbnRVc2VyKCk7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICBpZiAoY2xhbmFrLmF1dG9yLmlkID09IHVzZXIuaWQpIHtcbiAgICAgICAgICAgICAgICBkdWdtaWNpRGl2LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBEaXNwbGF5QXJ0aWNsZUxvZ2ljLnByb3RvdHlwZS5hcnRpY2xlQ2xpY2sgPSBmdW5jdGlvbiAoYXJ0aWNsZURpdikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmV4aXRTdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgICAgIHZhciBkdWdtaWNpRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kdWdtaWNpLWNsYW5ha1wiKTtcbiAgICAgICAgZHVnbWljaURpdi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB2YXIgaWQgPSBhcnRpY2xlRGl2LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgICAgIHZhciAkYXJ0aWNsZSA9IGdldEFydGljbGVCeUlkKGlkKTtcbiAgICAgICAgdGhpcy5rb21lbnRhcmlMb2dpYy4kY29tbWVudHMgPSBnZXRBcnRpY2xlc0NvbW1lbnRzKGlkKTtcbiAgICAgICAgemlwKCRhcnRpY2xlLCB0aGlzLmtvbWVudGFyaUxvZ2ljLiRjb21tZW50cylcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiRhcnRpY2xlQ2xpY2tUcmlnZ2VyLnBpcGUoZmlsdGVyKGZ1bmN0aW9uIChpc0NsaWNrZWQpIHsgcmV0dXJuICFpc0NsaWNrZWQ7IH0pKSkgLy8gWmF0dmFyYW5qZSB0b2tvdmEgbmFrb24ga2xpa2FcbiAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlID0gX2FbMF0sIGNvbW1lbnRzID0gX2FbMV07XG4gICAgICAgICAgICBfdGhpcy5zZXRDbGFuYWsoYXJ0aWNsZSk7XG4gICAgICAgICAgICB2YXIgaGVhZGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJEaXZcIik7XG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxUb0VsZW1lbnQoaGVhZGVyRGl2KTtcbiAgICAgICAgICAgIF90aGlzLmtvbWVudGFyaUxvZ2ljLnNldENvbW1lbnRzU3ViamVjdChjb21tZW50cyk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgYnRuT2JqYXZpS29tZW50YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmtvbWVudGFyLWJ1dHRvblwiKTtcbiAgICAgICAgdmFyIHRla3N0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmtvbWVudGFyLWlucHV0XCIpO1xuICAgICAgICBidG5PYmphdmlLb21lbnRhci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMua29tZW50YXJpTG9naWMuZG9kYWpLb21lbnRhcih0ZWtzdElucHV0LCBwYXJzZUludChpZCkpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgYnRuSXpicmlzaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLWl6YnJpc2lcIik7XG4gICAgICAgIGJ0bkl6YnJpc2kub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlbGV0ZUFydGljbGVieUlkKGlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgYnRuSXptZW5pID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24taXptZW5pXCIpO1xuICAgICAgICB2YXIgaXptZW5pTG9naWMgPSBuZXcgRWRpdEFydGljbGVMb2dpYygpO1xuICAgICAgICBidG5Jem1lbmkub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vaXogZWRpdCBqYSBtb3JhIHpvdmVtIG92byBrYW8gbmVrdSBmdW5rY2lqdVxuICAgICAgICAgICAgdmFyIGFkZEFydGljbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1hcnRpY2xlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGFkZEFydGljbGVDb250YWluZXIuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAkYXJ0aWNsZS5zdWJzY3JpYmUoZnVuY3Rpb24gKGNsYW5haykge1xuICAgICAgICAgICAgICAgIGl6bWVuaUxvZ2ljLmRpc3BsYXlFZGl0UHJldmlldyhjbGFuYWspO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBidG5JemFkamkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml6YWRqaS1idXR0b25cIik7XG4gICAgICAgIGJ0bkl6YWRqaS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsYW5ha0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xhbmFrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIHRla3N0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgY2xhbmFrRGl2LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB0ZWtzdElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgICAgIF90aGlzLmV4aXRTdWJqZWN0Lm5leHQoZmFsc2UpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRGlzcGxheUFydGljbGVMb2dpYy5wcm90b3R5cGUuc2Nyb2xsVG9FbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnc3RhcnQnIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEaXNwbGF5QXJ0aWNsZUxvZ2ljLnByb3RvdHlwZS5maWx0ZXJBcnRpY2xlcyA9IGZ1bmN0aW9uIChzZWFyY2hJbnB1dCwgYXV0aG9ySW5wdXQsIHR5cGVJbnB1dCwgYnRuUmVzZXR1aikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGV2aURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGV2aS1kaXZcIik7XG4gICAgICAgIHZhciBpc0xldmlEaXZBa3RpdmFuID0gbGV2aURpdi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XG4gICAgICAgIGlmICghaXNMZXZpRGl2QWt0aXZhbilcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyU3ViamVjdC5uZXh0KGZhbHNlKTtcbiAgICAgICAgdmFyICRzZWFyY2hSZXN1bHRzID0gaGFuZGxlU2VhcmNoSW5wdXQoc2VhcmNoSW5wdXQpO1xuICAgICAgICB2YXIgJGF1dGhvclJlc3VsdHMgPSBoYW5kbGVBdXRob3JJbnB1dChhdXRob3JJbnB1dCk7XG4gICAgICAgIHZhciAkdHlwZVJlc3VsdHMgPSBoYW5kbGVUeXBlSW5wdXQodHlwZUlucHV0KTtcbiAgICAgICAgdmFyICRidG5SZXNldCA9IGhhbmRsZUJ1dHRvbihidG5SZXNldHVqKTtcbiAgICAgICAgJGJ0blJlc2V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5maWx0ZXJTdWJqZWN0LnBpcGUoZmlsdGVyKGZ1bmN0aW9uIChpc0FjdGl2ZSkgeyByZXR1cm4gIWlzQWN0aXZlOyB9KSkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xhbmFrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFuYWstY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgdmFyIGFkZEFydGljbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1hcnRpY2xlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGFkZEFydGljbGVDb250YWluZXIuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsYW5ha0NvbnRhaW5lci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgYXV0aG9ySW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgdHlwZUlucHV0LnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgX3RoaXMuZGlzcGxheUFydGljbGVzKF90aGlzLmNsYW5rb3ZpRGl2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lcmdlKCRzZWFyY2hSZXN1bHRzLCAkYXV0aG9yUmVzdWx0cywgJHR5cGVSZXN1bHRzKS5waXBlKHRha2VVbnRpbCh0aGlzLmZpbHRlclN1YmplY3QucGlwZShmaWx0ZXIoZnVuY3Rpb24gKGlzQWN0aXZlKSB7IHJldHVybiAhaXNBY3RpdmU7IH0pKSksIGRpc3RpbmN0KCkpLnN1YnNjcmliZShmdW5jdGlvbiAoY2xhbmtvdmkpIHtcbiAgICAgICAgICAgIF90aGlzLmNsYW5rb3ZpRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFua292aS1kaXZcIik7XG4gICAgICAgICAgICB2YXIgY2xhbmFrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFuYWstY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgdmFyIGFkZEFydGljbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1hcnRpY2xlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIF90aGlzLmNsYW5rb3ZpRGl2LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBjbGFuYWtDb250YWluZXIuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkZEFydGljbGVDb250YWluZXIuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIF90aGlzLmRpc3BsYXlGaWx0ZXJlZEFydGljbGVzKGNsYW5rb3ZpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0xldmlEaXZBa3RpdmFuKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclN1YmplY3QubmV4dCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlzcGxheUFydGljbGVMb2dpYy5wcm90b3R5cGUuZGlzcGxheUZpbHRlcmVkQXJ0aWNsZXMgPSBmdW5jdGlvbiAoY2xhbmtvdmkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY2xhbmtvdmkuZm9yRWFjaChmdW5jdGlvbiAoY2xhbmFrKSB7XG4gICAgICAgICAgICBDbGFuYWtWaWV3LmRyYXdBcnRpY2xlKF90aGlzLmNsYW5rb3ZpRGl2LCBjbGFuYWspO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaXNwbGF5QXJ0aWNsZUxvZ2ljO1xufSgpKTtcbmV4cG9ydCB7IERpc3BsYXlBcnRpY2xlTG9naWMgfTtcbiIsImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgY29tYmluZUxhdGVzdCwgdGFrZVVudGlsIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IHVwZGF0ZUFydGljbGUgfSBmcm9tIFwiLi4vLi4vb2JzZXJ2YWJsZXMvYXBpc2VydmljZVwiO1xuaW1wb3J0IHsgaGFuZGxlQXJ0aWNsZUlucHV0LCBoYW5kbGVUeXBlU2VsZWN0IH0gZnJvbSBcIi4uLy4uL29ic2VydmFibGVzL2V2ZW50aGFuZGxlcnNcIjtcbnZhciBFZGl0QXJ0aWNsZUxvZ2ljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVkaXRBcnRpY2xlTG9naWMoKSB7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dFN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcbiAgICAgICAgdGhpcy5jb250ZW50SW5wdXRTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnJyk7XG4gICAgICAgIHRoaXMudHlwZVNlbGVjdFN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcbiAgICAgICAgdGhpcy4kY2FuY2VsUHJldmlldyA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuICAgIEVkaXRBcnRpY2xlTG9naWMucHJvdG90eXBlLmRpc3BsYXlFZGl0UHJldmlldyA9IGZ1bmN0aW9uIChjbGFuYWspIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRpdGxlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1pbnB1dC1kaXZcIik7XG4gICAgICAgIHZhciBhdXRvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b3ItaW5wdXQtZGl2XCIpO1xuICAgICAgICB2YXIgdGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXAtZGl2XCIpO1xuICAgICAgICB2YXIgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudC1pbnB1dC1kaXZcIik7XG4gICAgICAgIHZhciB0aXRsZUFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRUaXRsZVwiKTtcbiAgICAgICAgdmFyIGNvbnRlbnRBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0Q29udGVudFwiKTtcbiAgICAgICAgdmFyIHR5cGVTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnR5cGUtc2VsZWN0XCIpO1xuICAgICAgICB2YXIgYnRuSXptZW5pID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tZWRpdFwiKTtcbiAgICAgICAgdmFyIGJ0bkFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLWFkZFwiKTtcbiAgICAgICAgYnRuSXptZW5pLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICBidG5BZGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aXRsZUFkZC52YWx1ZSA9IGNsYW5hay50aXRsZTtcbiAgICAgICAgY29udGVudEFkZC52YWx1ZSA9IGNsYW5hay5jb250ZW50O1xuICAgICAgICB0eXBlU2VsZWN0LnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXRTdWJqZWN0Lm5leHQoY2xhbmFrLnRpdGxlKTtcbiAgICAgICAgdGhpcy5jb250ZW50SW5wdXRTdWJqZWN0Lm5leHQoY2xhbmFrLmNvbnRlbnQpO1xuICAgICAgICB0aGlzLnR5cGVTZWxlY3RTdWJqZWN0Lm5leHQoY2xhbmFrLnRpcCk7XG4gICAgICAgIC8vIFByYXRpdGUgcHJvbWVuZSB1IGlucHV0IHBvbGppbWEgaSBzZWxlY3QgcG9sanVcbiAgICAgICAgaGFuZGxlQXJ0aWNsZUlucHV0KHRpdGxlQWRkKS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBfdGhpcy50aXRsZUlucHV0U3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmRsZUFydGljbGVJbnB1dChjb250ZW50QWRkKS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBfdGhpcy5jb250ZW50SW5wdXRTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaGFuZGxlVHlwZVNlbGVjdCh0eXBlU2VsZWN0KS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBfdGhpcy50eXBlU2VsZWN0U3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzdG9yZWRVc2VySlNPTiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gICAgICAgIGlmIChzdG9yZWRVc2VySlNPTikge1xuICAgICAgICAgICAgdmFyIHVzZXJfMSA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlckpTT04pO1xuICAgICAgICAgICAgY29tYmluZUxhdGVzdChbdGhpcy50aXRsZUlucHV0U3ViamVjdCwgdGhpcy5jb250ZW50SW5wdXRTdWJqZWN0LCB0aGlzLnR5cGVTZWxlY3RTdWJqZWN0XSkucGlwZSh0YWtlVW50aWwodGhpcy4kY2FuY2VsUHJldmlldykpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IF9hWzBdLCBjb250ZW50ID0gX2FbMV0sIHR5cGUgPSBfYVsyXTtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgdGlwRGl2LnRleHRDb250ZW50ID0gdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3JEaXYudGV4dENvbnRlbnQgPSB1c2VyXzEuaW1lICsgXCIgXCIgKyB1c2VyXzEucHJlemltZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudERpdi50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYnRuSXptZW5pKSB7XG4gICAgICAgICAgICAgICAgYnRuSXptZW5pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pem1lbmlDbGFuYWsoY2xhbmFrLCB0aXRsZUFkZCwgY29udGVudEFkZCwgdHlwZVNlbGVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tY2FuY2VsXCIpO1xuICAgICAgICAgICAgaWYgKGJ0bkNhbmNlbCkge1xuICAgICAgICAgICAgICAgIGJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGNhbmNlbFByZXZpZXcubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jYW5jZWxQcmV2aWV3KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRBcnRpY2xlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtYXJ0aWNsZS1jb250YWluZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGFkZEFydGljbGVDb250YWluZXIuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgRWRpdEFydGljbGVMb2dpYy5wcm90b3R5cGUuaXptZW5pQ2xhbmFrID0gZnVuY3Rpb24gKGNsYW5haywgdGl0bGVBZGQsIGNvbnRlbnRBZGQsIHR5cGVTZWxlY3QpIHtcbiAgICAgICAgdmFyIHRpdGxlO1xuICAgICAgICB2YXIgY29udGVudDtcbiAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgIHRpdGxlID0gdGl0bGVBZGQudmFsdWU7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50QWRkLnZhbHVlO1xuICAgICAgICB0eXBlID0gdHlwZVNlbGVjdC52YWx1ZTtcbiAgICAgICAgaWYgKHRpdGxlLnRyaW0oKSA9PT0gJycgfHwgY29udGVudC50cmltKCkgPT09ICcnIHx8IHR5cGUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgaWYgKHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aXRsZUFkZC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29udGVudC50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29udGVudEFkZC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdHlwZVNlbGVjdC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGl0bGVBZGQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICBjb250ZW50QWRkLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgdHlwZVNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgIHZhciBhcnRpa2FsID0ge1xuICAgICAgICAgICAgaWQ6IGNsYW5hay5pZCxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBhdXRvcjogY2xhbmFrLmF1dG9yLFxuICAgICAgICAgICAgdGlwOiB0eXBlXG4gICAgICAgIH07XG4gICAgICAgIC8vaW5zZXJ0QXJ0aWNsZShhcnRpa2FsKVxuICAgICAgICAvL2NvbnNvbGUubG9nKGFydGlrYWwpXG4gICAgICAgIHVwZGF0ZUFydGljbGUoYXJ0aWthbCk7XG4gICAgfTtcbiAgICBFZGl0QXJ0aWNsZUxvZ2ljLnByb3RvdHlwZS5jYW5jZWxQcmV2aWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGl0bGVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWlucHV0LWRpdlwiKTtcbiAgICAgICAgdmFyIGF1dG9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRvci1pbnB1dC1kaXZcIik7XG4gICAgICAgIHZhciB0aXBEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpcC1kaXZcIik7XG4gICAgICAgIHZhciBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LWlucHV0LWRpdlwiKTtcbiAgICAgICAgdmFyIHRpdGxlQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dFRpdGxlXCIpO1xuICAgICAgICB2YXIgY29udGVudEFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRDb250ZW50XCIpO1xuICAgICAgICB2YXIgdHlwZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHlwZS1zZWxlY3RcIik7XG4gICAgICAgIHRpdGxlQWRkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgY29udGVudEFkZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHR5cGVTZWxlY3Quc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dFN1YmplY3QubmV4dChcIlwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50SW5wdXRTdWJqZWN0Lm5leHQoXCJcIik7XG4gICAgICAgIHRoaXMudHlwZVNlbGVjdFN1YmplY3QubmV4dChcIlwiKTtcbiAgICAgICAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICB0aXBEaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICBjb250ZW50RGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgdGl0bGVBZGQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICBjb250ZW50QWRkLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgdHlwZVNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgfTtcbiAgICByZXR1cm4gRWRpdEFydGljbGVMb2dpYztcbn0oKSk7XG5leHBvcnQgeyBFZGl0QXJ0aWNsZUxvZ2ljIH07XG4iLCJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIHRha2VVbnRpbCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBpbnNlcnRBcnRpY2xlIH0gZnJvbSBcIi4uLy4uL29ic2VydmFibGVzL2FwaXNlcnZpY2VcIjtcbmltcG9ydCB7IGhhbmRsZUFydGljbGVJbnB1dCwgaGFuZGxlVHlwZVNlbGVjdCB9IGZyb20gXCIuLi8uLi9vYnNlcnZhYmxlcy9ldmVudGhhbmRsZXJzXCI7XG52YXIgSW5zZXJ0QXJ0aWNsZUxvZ2ljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluc2VydEFydGljbGVMb2dpYygpIHtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0U3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoJycpO1xuICAgICAgICB0aGlzLmNvbnRlbnRJbnB1dFN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcbiAgICAgICAgdGhpcy50eXBlU2VsZWN0U3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoJycpO1xuICAgICAgICB0aGlzLiRjYW5jZWxQcmV2aWV3ID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG4gICAgSW5zZXJ0QXJ0aWNsZUxvZ2ljLnByb3RvdHlwZS5kb2RhakNsYW5hayA9IGZ1bmN0aW9uICh0aXRsZUFkZCwgY29udGVudEFkZCwgdHlwZVNlbGVjdCkge1xuICAgICAgICB2YXIgc3RvcmVkVXNlckpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xuICAgICAgICBpZiAoc3RvcmVkVXNlckpTT04pIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VySlNPTik7XG4gICAgICAgICAgICB2YXIgdGl0bGUgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdm9pZCAwO1xuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZUFkZC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50QWRkLnZhbHVlO1xuICAgICAgICAgICAgdHlwZSA9IHR5cGVTZWxlY3QudmFsdWU7XG4gICAgICAgICAgICBpZiAodGl0bGUudHJpbSgpID09PSAnJyB8fCBjb250ZW50LnRyaW0oKSA9PT0gJycgfHwgdHlwZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVBZGQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBZGQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVTZWxlY3QuY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKnRpdGxlQWRkLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnRlbnRBZGQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICAgICAgdHlwZVNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkLWlucHV0Jyk7Ki9cbiAgICAgICAgICAgIHZhciBhcnRpa2FsID0ge1xuICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgICAgIGF1dG9yOiB1c2VyLFxuICAgICAgICAgICAgICAgIHRpcDogdHlwZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGluc2VydEFydGljbGUoYXJ0aWthbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aXRsZUFkZC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgICAgICBjb250ZW50QWRkLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgICAgIHR5cGVTZWxlY3QuY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbnNlcnRBcnRpY2xlTG9naWMucHJvdG90eXBlLmRpc3BsYXlQcmV2aWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdGl0bGVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWlucHV0LWRpdlwiKTtcbiAgICAgICAgdmFyIGF1dG9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRvci1pbnB1dC1kaXZcIik7XG4gICAgICAgIHZhciB0aXBEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpcC1kaXZcIik7XG4gICAgICAgIHZhciBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LWlucHV0LWRpdlwiKTtcbiAgICAgICAgdmFyIHRpdGxlQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dFRpdGxlXCIpO1xuICAgICAgICB2YXIgY29udGVudEFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRDb250ZW50XCIpO1xuICAgICAgICB2YXIgdHlwZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHlwZS1zZWxlY3RcIik7XG4gICAgICAgIHZhciBidG5Jem1lbmkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1lZGl0XCIpO1xuICAgICAgICB2YXIgYnRuQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tYWRkXCIpO1xuICAgICAgICBidG5BZGQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgIGJ0bkl6bWVuaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIC8vIFByYXRpbSBwcm9tZW5lIHUgaW5wdXQgcG9samltYSBpIHNlbGVjdCBwb2xqdVxuICAgICAgICBoYW5kbGVBcnRpY2xlSW5wdXQodGl0bGVBZGQpLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIF90aGlzLnRpdGxlSW5wdXRTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaGFuZGxlQXJ0aWNsZUlucHV0KGNvbnRlbnRBZGQpLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbnRlbnRJbnB1dFN1YmplY3QubmV4dCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVUeXBlU2VsZWN0KHR5cGVTZWxlY3QpLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIF90aGlzLnR5cGVTZWxlY3RTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHN0b3JlZFVzZXJKU09OID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKTtcbiAgICAgICAgaWYgKHN0b3JlZFVzZXJKU09OKSB7XG4gICAgICAgICAgICB2YXIgdXNlcl8xID0gSlNPTi5wYXJzZShzdG9yZWRVc2VySlNPTik7XG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLnRpdGxlSW5wdXRTdWJqZWN0LCB0aGlzLmNvbnRlbnRJbnB1dFN1YmplY3QsIHRoaXMudHlwZVNlbGVjdFN1YmplY3RdKS5waXBlKHRha2VVbnRpbCh0aGlzLiRjYW5jZWxQcmV2aWV3KSkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gX2FbMF0sIGNvbnRlbnQgPSBfYVsxXSwgdHlwZSA9IF9hWzJdO1xuICAgICAgICAgICAgICAgICAgICB0aXRsZURpdi50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICAgICAgICAgICAgICB0aXBEaXYudGV4dENvbnRlbnQgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICBhdXRvckRpdi50ZXh0Q29udGVudCA9IHVzZXJfMS5pbWUgKyBcIiBcIiArIHVzZXJfMS5wcmV6aW1lO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RGl2LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChidG5BZGQpIHtcbiAgICAgICAgICAgICAgICBidG5BZGQub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJLbGlrbnVvIHNhbSBkb2RhdmFuamUgY2xhbmthXCIpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb2RhakNsYW5hayh0aXRsZUFkZCwgY29udGVudEFkZCwgdHlwZVNlbGVjdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBidG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1jYW5jZWxcIik7XG4gICAgICAgICAgICBpZiAoYnRuQ2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgYnRuQ2FuY2VsLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2xpa251byBzYW0gY2FuY2VsXCIpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kY2FuY2VsUHJldmlldy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNhbmNlbFByZXZpZXcoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFkZEFydGljbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1hcnRpY2xlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQXJ0aWNsZUNvbnRhaW5lci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEluc2VydEFydGljbGVMb2dpYy5wcm90b3R5cGUuY2FuY2VsUHJldmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRpdGxlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1pbnB1dC1kaXZcIik7XG4gICAgICAgIHZhciBhdXRvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b3ItaW5wdXQtZGl2XCIpO1xuICAgICAgICB2YXIgdGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXAtZGl2XCIpO1xuICAgICAgICB2YXIgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudC1pbnB1dC1kaXZcIik7XG4gICAgICAgIHZhciB0aXRsZUFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRUaXRsZVwiKTtcbiAgICAgICAgdmFyIGNvbnRlbnRBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0Q29udGVudFwiKTtcbiAgICAgICAgdmFyIHR5cGVTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnR5cGUtc2VsZWN0XCIpO1xuICAgICAgICB0aXRsZUFkZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGNvbnRlbnRBZGQudmFsdWUgPSBcIlwiO1xuICAgICAgICB0eXBlU2VsZWN0LnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXRTdWJqZWN0Lm5leHQoXCJcIik7XG4gICAgICAgIHRoaXMuY29udGVudElucHV0U3ViamVjdC5uZXh0KFwiXCIpO1xuICAgICAgICB0aGlzLnR5cGVTZWxlY3RTdWJqZWN0Lm5leHQoXCJcIik7XG4gICAgICAgIHRpdGxlRGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgdGlwRGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgY29udGVudERpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgIHRpdGxlQWRkLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgY29udGVudEFkZC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgIHR5cGVTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgIH07XG4gICAgcmV0dXJuIEluc2VydEFydGljbGVMb2dpYztcbn0oKSk7XG5leHBvcnQgeyBJbnNlcnRBcnRpY2xlTG9naWMgfTtcbiIsImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBpbnNlcnRLb21lbnRhciB9IGZyb20gXCIuLi8uLi9vYnNlcnZhYmxlcy9hcGlzZXJ2aWNlXCI7XG5pbXBvcnQgeyBDbGFuYWtWaWV3IH0gZnJvbSBcIi4vY2xhbmFrVmlld1wiO1xuaW1wb3J0IHsgVmlld0xvZ2ljIH0gZnJvbSBcIi4uLy4uL3ZpZXcvdmlld0xvZ2ljXCI7XG52YXIgS29tZW50YXJMb2dpYyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBLb21lbnRhckxvZ2ljKCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgfVxuICAgIEtvbWVudGFyTG9naWMucHJvdG90eXBlLnNldENvbW1lbnRzU3ViamVjdCA9IGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICB0aGlzLmNvbW1lbnRTdWJqZWN0Lm5leHQoY29tbWVudHMpO1xuICAgICAgICB2YXIga29tZW50YXJpRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFuYWsta29tZW50YXJpLWRpdlwiKTsgLy9vdmRlIHViYWN1amVtbyBzdmUga29tZW50YXJlIGNsYW5rYVxuICAgICAgICB0aGlzLmNvbW1lbnRTdWJqZWN0LnN1YnNjcmliZShmdW5jdGlvbiAoa29tZW50YXJpKSB7XG4gICAgICAgICAgICBDbGFuYWtWaWV3LmRyYXdLb21lbnRhcihrb21lbnRhcmlEaXYsIGtvbWVudGFyaSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgS29tZW50YXJMb2dpYy5wcm90b3R5cGUuZG9kYWpLb21lbnRhciA9IGZ1bmN0aW9uICh0ZWtzdElucHV0LCBjbGFuYWtJZCkge1xuICAgICAgICB2YXIgdXNlciA9IFZpZXdMb2dpYy5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgICBpZiAodXNlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdGVrc3QgPSB0ZWtzdElucHV0LnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRla3N0LnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0ZWtzdElucHV0LmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZWtzdElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgICAgIHZhciBrID0ge1xuICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgIHVzZXI6IHVzZXIsXG4gICAgICAgICAgICAgICAgdGVrc3Q6IHRla3N0LFxuICAgICAgICAgICAgICAgIGNsYW5ha0lEOiBjbGFuYWtJZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGluc2VydEtvbWVudGFyKGspO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGVrc3RJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBLb21lbnRhckxvZ2ljO1xufSgpKTtcbmV4cG9ydCB7IEtvbWVudGFyTG9naWMgfTtcbiIsImltcG9ydCB7IHdpdGhMYXRlc3RGcm9tLCBtYXAsIFN1YmplY3QsIGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGdldFVzZXJzIH0gZnJvbSBcIi4uLy4uL29ic2VydmFibGVzL2FwaXNlcnZpY2VcIjtcbmltcG9ydCB7IGhhbmRsZUVtYWlsSW5wdXQsIGhhbmRsZVBhc3N3b3JkSW5wdXQsIGhhbmRsZUxvZ2luQ2xpY2sgfSBmcm9tIFwiLi4vLi4vb2JzZXJ2YWJsZXMvZXZlbnRoYW5kbGVyc1wiO1xudmFyIFVzZXJMb2dpYyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVc2VyTG9naWMoZW1haWxJbnB1dCwgcGFzc0lucHV0LCBsb2dpbkJ0bikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiR1c2VycyA9IGdldFVzZXJzKCk7XG4gICAgICAgIC8vemEgb3R2YXJhbmplIGkgemF0dmFyYW5qZSB0b2thIG5ha29uIGxvZ292YW5qYVxuICAgICAgICB0aGlzLnVzZXJMb2dnZWRJblN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICB0aGlzLiR1c2VyTG9nZ2VkSW4gPSB0aGlzLnVzZXJMb2dnZWRJblN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIHRoaXMuJGVtYWlsSW5wdXQgPSBoYW5kbGVFbWFpbElucHV0KGVtYWlsSW5wdXQpO1xuICAgICAgICB0aGlzLiRwYXNzd29yZElucHV0ID0gaGFuZGxlUGFzc3dvcmRJbnB1dChwYXNzSW5wdXQpO1xuICAgICAgICB0aGlzLiR1c2Vycy5zdWJzY3JpYmUoZnVuY3Rpb24gKGtvcmlzbmljaSkgeyByZXR1cm4gX3RoaXMubGlzdGFLb3Jpc25pa2EgPSBrb3Jpc25pY2k7IH0pO1xuICAgICAgICB0aGlzLiRidG5Mb2dJbiA9IGhhbmRsZUxvZ2luQ2xpY2sobG9naW5CdG4pO1xuICAgICAgICB0aGlzLmVtYWlsSW5wdXQgPSBlbWFpbElucHV0O1xuICAgICAgICB0aGlzLnBhc3NJbnB1dCA9IHBhc3NJbnB1dDtcbiAgICAgICAgdGhpcy5oYW5kbGVVc2VyTG9naW4odGhpcy5lbWFpbElucHV0LCB0aGlzLnBhc3NJbnB1dCk7XG4gICAgICAgIHZhciBidG5Mb2dvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bkxvZ291dFwiKTtcbiAgICAgICAgYnRuTG9nb3V0Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFVzZXJMb2dpYy5wcm90b3R5cGUubG9naW5Vc2VyID0gZnVuY3Rpb24gKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICB2YXIgayA9IHRoaXMubGlzdGFLb3Jpc25pa2EuZmluZChmdW5jdGlvbiAoaykgeyByZXR1cm4gay5lbWFpbCA9PSBlbWFpbCAmJiBrLnBhc3N3b3JkID09IHBhc3N3b3JkOyB9KTtcbiAgICAgICAgaWYgKGsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coayk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRLb3Jpc25payA9IGs7XG4gICAgICAgICAgICB2YXIgdXNlckpTT04gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmN1cnJlbnRLb3Jpc25payk7XG4gICAgICAgICAgICAvLyDEjHV2YW5qZSBrb3Jpc25pxI1raWggcG9kYXRha2EgdSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgdXNlckpTT04pO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5QWZ0ZXJMb2dpbigpO1xuICAgICAgICAgICAgdGhpcy51c2VyTG9nZ2VkSW5TdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOZXVzcGVzbmEgcHJpamF2YVwiKTtcbiAgICB9O1xuICAgIFVzZXJMb2dpYy5wcm90b3R5cGUuaGFuZGxlVXNlckxvZ2luID0gZnVuY3Rpb24gKGVtYWlsSW5wdXQsIHBhc3NJbnB1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRidG5Mb2dJbi5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuJGVtYWlsSW5wdXQsIHRoaXMuJHBhc3N3b3JkSW5wdXQpLCBtYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZW1haWwgPSBfYVsxXSwgcGFzc3dvcmQgPSBfYVsyXTtcbiAgICAgICAgICAgIHJldHVybiAoeyBlbWFpbDogZW1haWwsIHBhc3N3b3JkOiBwYXNzd29yZCB9KTtcbiAgICAgICAgfSksIHRha2VVbnRpbCh0aGlzLiR1c2VyTG9nZ2VkSW4ucGlwZShmaWx0ZXIoZnVuY3Rpb24gKGlzTG9nZ2VkSW4pIHsgcmV0dXJuIGlzTG9nZ2VkSW47IH0pKSkpLnN1YnNjcmliZShmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgX3RoaXMubG9naW5Vc2VyKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBwYXNzSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVzZXJMb2dpYy5wcm90b3R5cGUubG9nb3V0VXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VyXCIpO1xuICAgICAgICB2YXIgaGVhZGVyUHJvZmlsZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLXByb2ZpbGUtZGl2XCIpO1xuICAgICAgICB2YXIgaW5wdXREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LWFydGljbGUtZGl2XCIpO1xuICAgICAgICB2YXIgcHJpamF2YURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpamF2YS1idXR0b25cIik7XG4gICAgICAgIHZhciBjbGFuYWtEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsYW5hay1jb250YWluZXJcIik7XG4gICAgICAgIHByaWphdmFEaXYuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGlucHV0RGl2LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIGhlYWRlclByb2ZpbGVEaXYuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNsYW5ha0Rpdi5oaWRkZW4gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNsYW5ha0Rpdi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlckxvZ2dlZEluU3ViamVjdC5uZXh0KGZhbHNlKTtcbiAgICAgICAgdGhpcy5oYW5kbGVVc2VyTG9naW4odGhpcy5lbWFpbElucHV0LCB0aGlzLnBhc3NJbnB1dCk7XG4gICAgfTtcbiAgICBVc2VyTG9naWMucHJvdG90eXBlLmRpc3BsYXlBZnRlckxvZ2luID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmVkVXNlckpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xuICAgICAgICBpZiAoc3RvcmVkVXNlckpTT04pIHtcbiAgICAgICAgICAgIHZhciBzdG9yZWRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VySlNPTik7XG4gICAgICAgICAgICB2YXIgaGVhZGVyUHJvZmlsZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLXByb2ZpbGUtZGl2XCIpO1xuICAgICAgICAgICAgdmFyIGlucHV0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1hcnRpY2xlLWRpdlwiKTtcbiAgICAgICAgICAgIHZhciBwcmlqYXZhRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlqYXZhLWJ1dHRvblwiKTtcbiAgICAgICAgICAgIHZhciBsb2dpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9naW4tZGl2XCIpO1xuICAgICAgICAgICAgbG9naW5EaXYuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHByaWphdmFEaXYuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGlucHV0RGl2LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgaGVhZGVyUHJvZmlsZURpdi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZS1sYWJlbFwiKTtcbiAgICAgICAgICAgIHZhciBwcmV6aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV6aW1lLWxhYmVsXCIpO1xuICAgICAgICAgICAgaW1lLnRleHRDb250ZW50ID0gc3RvcmVkVXNlci5pbWU7XG4gICAgICAgICAgICBwcmV6aW1lLnRleHRDb250ZW50ID0gc3RvcmVkVXNlci5wcmV6aW1lO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVXNlckxvZ2ljO1xufSgpKTtcbmV4cG9ydCB7IFVzZXJMb2dpYyB9O1xuIiwidmFyIExvZ2luVmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2dpblZpZXcoKSB7XG4gICAgfVxuICAgIExvZ2luVmlldy5wcm90b3R5cGUuZHJhd0xvZ2luID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgZm9ybWFEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JtYURpdi5jbGFzc0xpc3QuYWRkKFwiZm9ybWEtZGl2XCIpO1xuICAgICAgICB2YXIgZW1haWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZW1haWxJbnB1dC50eXBlID0gXCJlbWFpbFwiO1xuICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gXCJFbWFpbFwiO1xuICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoXCJlbWFpbC1pbnB1dFwiKTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHBhc3N3b3JkSW5wdXQudHlwZSA9IFwicGFzc3dvcmRcIjtcbiAgICAgICAgcGFzc3dvcmRJbnB1dC5wbGFjZWhvbGRlciA9IFwiUGFzc3dvcmRcIjtcbiAgICAgICAgcGFzc3dvcmRJbnB1dC5jbGFzc0xpc3QuYWRkKFwicGFzc3dvcmQtaW5wdXRcIik7XG4gICAgICAgIHZhciBidG5QcmlqYXZhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuUHJpamF2YS5jbGFzc0xpc3QuYWRkKFwiYnRuUHJpamF2YVwiKTtcbiAgICAgICAgYnRuUHJpamF2YS50ZXh0Q29udGVudCA9IFwiUHJpamF2aSBzZVwiO1xuICAgICAgICBmb3JtYURpdi5hcHBlbmRDaGlsZChlbWFpbElucHV0KTtcbiAgICAgICAgZm9ybWFEaXYuYXBwZW5kQ2hpbGQocGFzc3dvcmRJbnB1dCk7XG4gICAgICAgIGZvcm1hRGl2LmFwcGVuZENoaWxkKGJ0blByaWphdmEpO1xuICAgICAgICB2YXIgbm9SZWdpc3RlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5vUmVnaXN0ZXJEaXYuY2xhc3NMaXN0LmFkZChcInRla3N0LW5vLXJlZ2lzdGVyXCIpO1xuICAgICAgICB2YXIgdGVrc3RpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRla3N0aWMuY2xhc3NMaXN0LmFkZChcInRla3N0aWNcIik7XG4gICAgICAgIHRla3N0aWMudGV4dENvbnRlbnQgPSBcIlVrb2xpa28gbmVtYXRlIG5hbG9nOiBcIjtcbiAgICAgICAgdmFyIGJ0bkdvdG9SZWdpc3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGJ0bkdvdG9SZWdpc3Rlci5jbGFzc0xpc3QuYWRkKFwiYnRuLWdvLXRvLXJlZ2lzdGVyXCIpO1xuICAgICAgICBidG5Hb3RvUmVnaXN0ZXIudGV4dENvbnRlbnQgPSBcIlJlZ2lzdHJ1aiBzZVwiO1xuICAgICAgICBub1JlZ2lzdGVyRGl2LmFwcGVuZENoaWxkKHRla3N0aWMpO1xuICAgICAgICBub1JlZ2lzdGVyRGl2LmFwcGVuZENoaWxkKGJ0bkdvdG9SZWdpc3Rlcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtYURpdik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub1JlZ2lzdGVyRGl2KTtcbiAgICB9O1xuICAgIHJldHVybiBMb2dpblZpZXc7XG59KCkpO1xuZXhwb3J0IHsgTG9naW5WaWV3IH07XG4iLCJpbXBvcnQgeyBTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBoYW5kbGVUZWtzdElucHV0LCBoYW5kbGVFbWFpbFJlZ2lzdGVySW5wdXQsIGhhbmRsZVBhc3N3b3JkUmVnaXN0ZXJJbnB1dCwgaGFuZGxlUmVnaXN0ZXJDbGljaywgaGFuZGxlQ29uUGFzc3dvcmRSZWdpc3RlcklucHV0IH0gZnJvbSBcIi4uLy4uL29ic2VydmFibGVzL2V2ZW50aGFuZGxlcnNcIjtcbmltcG9ydCB7IGluc2VydFVzZXIgfSBmcm9tIFwiLi4vLi4vb2JzZXJ2YWJsZXMvYXBpc2VydmljZVwiO1xudmFyIFJlZ2lzdGVyTG9naWMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVnaXN0ZXJMb2dpYyhpbWVJbnB1dCwgcHJlemltZUlOcHV0LCBlbWFpbElucHV0LCBwYXNzSW5wdXQsIGNvbnBhc3NJbnB1dCwgcmVnaXN0ZXJCdG4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25TdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgdGhpcy4kaXNSZWdpc3RlcmVkID0gdGhpcy5yZWdpc3RyYXRpb25TdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLiRlbWFpbElucHV0ID0gaGFuZGxlRW1haWxSZWdpc3RlcklucHV0KGVtYWlsSW5wdXQpO1xuICAgICAgICB0aGlzLiRwYXNzd29yZElucHV0ID0gaGFuZGxlUGFzc3dvcmRSZWdpc3RlcklucHV0KHBhc3NJbnB1dCk7XG4gICAgICAgIHRoaXMuJGltZUlucHV0ID0gaGFuZGxlVGVrc3RJbnB1dChpbWVJbnB1dCk7XG4gICAgICAgIHRoaXMuJHByZXppbWVJbnB1dCA9IGhhbmRsZVRla3N0SW5wdXQocHJlemltZUlOcHV0KTtcbiAgICAgICAgdGhpcy4kY29uUGFzc0lucHV0ID0gaGFuZGxlQ29uUGFzc3dvcmRSZWdpc3RlcklucHV0KGNvbnBhc3NJbnB1dCk7XG4gICAgICAgIHRoaXMuJGJ0blJlZ2lzdGVyID0gaGFuZGxlUmVnaXN0ZXJDbGljayhyZWdpc3RlckJ0bik7XG4gICAgICAgIHRoaXMuaGFuZGxlVXNlclJlZ2lzdGVyKGltZUlucHV0LCBwcmV6aW1lSU5wdXQsIGVtYWlsSW5wdXQsIHBhc3NJbnB1dCwgY29ucGFzc0lucHV0KTtcbiAgICAgICAgdGhpcy5oYW5kbGVVbm9zTG96aW5raShjb25wYXNzSW5wdXQpO1xuICAgICAgICB2YXIgYnRuR290b1JlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tZ28tdG8tcmVnaXN0ZXJcIik7XG4gICAgICAgIGJ0bkdvdG9SZWdpc3Rlci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMub3BlblJlZ2lzdGVyRm9ybSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBSZWdpc3RlckxvZ2ljLnByb3RvdHlwZS5oYW5kbGVVc2VyUmVnaXN0ZXIgPSBmdW5jdGlvbiAoaW1lSW5wdXQsIHByZXppbWVJTnB1dCwgZW1haWxJbnB1dCwgcGFzc0lucHV0LCBjb25wYXNzSW5wdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kYnRuUmVnaXN0ZXIucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLiRpbWVJbnB1dCwgdGhpcy4kcHJlemltZUlucHV0LCB0aGlzLiRlbWFpbElucHV0LCB0aGlzLiRwYXNzd29yZElucHV0LCB0aGlzLiRjb25QYXNzSW5wdXQpLCBtYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgaW1lID0gX2FbMV0sIHByZXppbWUgPSBfYVsyXSwgZW1haWwgPSBfYVszXSwgcGFzc3dvcmQgPSBfYVs0XSwgY29uUGFzc3dvcmQgPSBfYVs1XTtcbiAgICAgICAgICAgIHJldHVybiAoeyBpbWU6IGltZSwgcHJlemltZTogcHJlemltZSwgZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQsIGNvblBhc3N3b3JkOiBjb25QYXNzd29yZCB9KTtcbiAgICAgICAgfSkpLnBpcGUodGFrZVVudGlsKHRoaXMuJGlzUmVnaXN0ZXJlZC5waXBlKGZpbHRlcihmdW5jdGlvbiAoaXNSZWdpc3RlcmVkKSB7IHJldHVybiBpc1JlZ2lzdGVyZWQ7IH0pKSkpLnN1YnNjcmliZShmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgaWYgKHVzZXIucGFzc3dvcmQgIT09IHVzZXIuY29uUGFzc3dvcmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgX3RoaXMucmVnaXN0ZXJVc2VyKHVzZXIuaW1lLCB1c2VyLnByZXppbWUsIHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codXNlcik7XG4gICAgICAgICAgICBfdGhpcy5yZWdpc3RyYXRpb25TdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVnaXN0ZXJMb2dpYy5wcm90b3R5cGUucmVnaXN0ZXJVc2VyID0gZnVuY3Rpb24gKGltZSwgcHJlemltZSwgZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHZhciBrID0ge1xuICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICBpbWU6IGltZSxcbiAgICAgICAgICAgIHByZXppbWU6IHByZXppbWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfTtcbiAgICAgICAgaW5zZXJ0VXNlcihrKTtcbiAgICB9O1xuICAgIFJlZ2lzdGVyTG9naWMucHJvdG90eXBlLmhhbmRsZVVub3NMb3ppbmtpID0gZnVuY3Rpb24gKGNvbnBhc3NJbnB1dCkge1xuICAgICAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLiRwYXNzd29yZElucHV0LCB0aGlzLiRjb25QYXNzSW5wdXRdKS5waXBlKG1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBwYXNzd29yZCA9IF9hWzBdLCBjb25maXJtUGFzc3dvcmQgPSBfYVsxXTtcbiAgICAgICAgICAgIHJldHVybiAoeyBwYXNzd29yZDogcGFzc3dvcmQsIGNvbmZpcm1QYXNzd29yZDogY29uZmlybVBhc3N3b3JkIH0pO1xuICAgICAgICB9KSkuc3Vic2NyaWJlKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHBhc3N3b3JkID0gX2EucGFzc3dvcmQsIGNvbmZpcm1QYXNzd29yZCA9IF9hLmNvbmZpcm1QYXNzd29yZDtcbiAgICAgICAgICAgIGlmIChwYXNzd29yZCA9PT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgY29ucGFzc0lucHV0LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkICNjY2NcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnBhc3NJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCByZWRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWdpc3RlckxvZ2ljLnByb3RvdHlwZS5vcGVuUmVnaXN0ZXJGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZ2lzdGVyLWRpdlwiKTtcbiAgICAgICAgcmVnaXN0ZXJEaXYuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHZhciBsb2dpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9naW4tZGl2XCIpO1xuICAgICAgICBsb2dpbkRpdi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvblN1YmplY3QubmV4dChmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVnaXN0ZXJMb2dpYztcbn0oKSk7XG5leHBvcnQgeyBSZWdpc3RlckxvZ2ljIH07XG4iLCJ2YXIgUmVnaXN0ZXJWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyVmlldygpIHtcbiAgICB9XG4gICAgUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5kcmF3UmVnaXN0ZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBmb3JtYURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcm1hRGl2LmNsYXNzTGlzdC5hZGQoXCJyZWdpc3Rlci1mb3JtYS1kaXZcIik7XG4gICAgICAgIHZhciBpbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgaW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBpbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW1lXCI7XG4gICAgICAgIGltZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbWUtaW5wdXRcIik7XG4gICAgICAgIHZhciBwcmV6aW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHByZXppbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIHByZXppbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwiUHJlemltZVwiO1xuICAgICAgICBwcmV6aW1lSW5wdXQuY2xhc3NMaXN0LmFkZChcInByZXppbWUtaW5wdXRcIik7XG4gICAgICAgIHZhciBlbWFpbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBlbWFpbElucHV0LnR5cGUgPSBcImVtYWlsXCI7XG4gICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVtYWlsXCI7XG4gICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZChcImVtYWlsLXJlZ2lzdGVyLWlucHV0XCIpO1xuICAgICAgICB2YXIgcGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgcGFzc3dvcmRJbnB1dC50eXBlID0gXCJwYXNzd29yZFwiO1xuICAgICAgICBwYXNzd29yZElucHV0LnBsYWNlaG9sZGVyID0gXCJQYXNzd29yZFwiO1xuICAgICAgICBwYXNzd29yZElucHV0LmNsYXNzTGlzdC5hZGQoXCJwYXNzd29yZC1yZWdpc3Rlci1pbnB1dFwiKTtcbiAgICAgICAgdmFyIGNvbnBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNvbnBhc3N3b3JkSW5wdXQudHlwZSA9IFwicGFzc3dvcmRcIjtcbiAgICAgICAgY29ucGFzc3dvcmRJbnB1dC5wbGFjZWhvbGRlciA9IFwiUG90dnJkaSBwYXNzd29yZFwiO1xuICAgICAgICBjb25wYXNzd29yZElucHV0LmNsYXNzTGlzdC5hZGQoXCJjb25maXJtLXBhc3N3b3JkLWlucHV0XCIpO1xuICAgICAgICB2YXIgYnRuUmVnaXN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5SZWdpc3Rlci5jbGFzc0xpc3QuYWRkKFwiYnRuUmVnaXN0ZXJcIik7XG4gICAgICAgIGJ0blJlZ2lzdGVyLnRleHRDb250ZW50ID0gXCJSZWdpc3RydWogc2VcIjtcbiAgICAgICAgZm9ybWFEaXYuYXBwZW5kQ2hpbGQoaW1lSW5wdXQpO1xuICAgICAgICBmb3JtYURpdi5hcHBlbmRDaGlsZChwcmV6aW1lSW5wdXQpO1xuICAgICAgICBmb3JtYURpdi5hcHBlbmRDaGlsZChlbWFpbElucHV0KTtcbiAgICAgICAgZm9ybWFEaXYuYXBwZW5kQ2hpbGQocGFzc3dvcmRJbnB1dCk7XG4gICAgICAgIGZvcm1hRGl2LmFwcGVuZENoaWxkKGNvbnBhc3N3b3JkSW5wdXQpO1xuICAgICAgICBmb3JtYURpdi5hcHBlbmRDaGlsZChidG5SZWdpc3Rlcik7XG4gICAgICAgIHZhciBpbWFzTE9naW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFzTE9naW5EaXYuY2xhc3NMaXN0LmFkZChcInRla3N0LWxvZ2luXCIpO1xuICAgICAgICB2YXIgdGVrc3RpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRla3N0aWMuY2xhc3NMaXN0LmFkZChcInRla3N0aWMyXCIpO1xuICAgICAgICB0ZWtzdGljLnRleHRDb250ZW50ID0gXCJVa29saWtvIGltYXRlIG5hbG9nOiBcIjtcbiAgICAgICAgdmFyIGJ0bkdvdG9Mb2dpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGJ0bkdvdG9Mb2dpbi5jbGFzc0xpc3QuYWRkKFwiYnRuLWdvLXRvLWxvZ2luXCIpO1xuICAgICAgICBidG5Hb3RvTG9naW4udGV4dENvbnRlbnQgPSBcIlByaWphdmkgc2VcIjtcbiAgICAgICAgYnRuR290b0xvZ2luLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVnaXN0ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZ2lzdGVyLWRpdlwiKTtcbiAgICAgICAgICAgIHJlZ2lzdGVyRGl2LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbG9naW5EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ2luLWRpdlwiKTtcbiAgICAgICAgICAgIGxvZ2luRGl2LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBpbWFzTE9naW5EaXYuYXBwZW5kQ2hpbGQodGVrc3RpYyk7XG4gICAgICAgIGltYXNMT2dpbkRpdi5hcHBlbmRDaGlsZChidG5Hb3RvTG9naW4pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybWFEaXYpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW1hc0xPZ2luRGl2KTtcbiAgICB9O1xuICAgIHJldHVybiBSZWdpc3RlclZpZXc7XG59KCkpO1xuZXhwb3J0IHsgUmVnaXN0ZXJWaWV3IH07XG4iLCJpbXBvcnQgeyBmcm9tIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IENsYW5ha1ZpZXcgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jbGFuYWsvY2xhbmFrVmlld1wiO1xudmFyIEJBU0VfVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gZnJvbShmZXRjaChcIlwiLmNvbmNhdChCQVNFX1VSTCwgXCIvdHlwZXNcIikpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2Uub2spXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlR5cGVzIG5vdCBva1wiKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gY29uc29sZS5sb2coZXJyKTsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEFydGljbGVzKCkge1xuICAgIHJldHVybiBmcm9tKGZldGNoKFwiXCIuY29uY2F0KEJBU0VfVVJMLCBcIi9hcnRpY2xlc1wiKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaylcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJ0aWNsZXMgbm90IG9rXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlcnMoKSB7XG4gICAgcmV0dXJuIGZyb20oZmV0Y2goXCJcIi5jb25jYXQoQkFTRV9VUkwsIFwiL2tvcmlzbmljaVwiKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaylcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJ0aWNsZXMgbm90IG9rXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QXJ0aWNsZShjbGFuYWspIHtcbiAgICBmZXRjaChcIlwiLmNvbmNhdChCQVNFX1VSTCwgXCIvYXJ0aWNsZXNcIiksIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2xhbmFrKVxuICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuanNvbigpOyB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRG9kYXQgamUgbm92aSDEjWxhbmFrOicsIGRhdGEpO1xuICAgICAgICB1cGRhdGVBcnRpY2xlTGlzdChkYXRhKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiBjb25zb2xlLmVycm9yKCdHcmXFoWthOicsIGVycm9yKTsgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VXNlcihrb3Jpc25paykge1xuICAgIGZldGNoKFwiXCIuY29uY2F0KEJBU0VfVVJMLCBcIi9rb3Jpc25pY2lcIiksIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoa29yaXNuaWspXG4gICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5qc29uKCk7IH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBjb25zb2xlLmxvZygnRG9kYXQgamUgbm92aSBrb3Jpc25pazonLCBkYXRhKTsgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gY29uc29sZS5lcnJvcignR3JlxaFrYTonLCBlcnJvcik7IH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZUxpc3QoY2xhbmFrKSB7XG4gICAgdmFyIGNsYW5rb3ZpRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFua292aS1kaXZcIik7XG4gICAgaWYgKGNsYW5rb3ZpRGl2KSB7XG4gICAgICAgIENsYW5ha1ZpZXcuZHJhd0FydGljbGUoY2xhbmtvdmlEaXYsIGNsYW5hayk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEFydGljbGVCeUlkKGlkKSB7XG4gICAgcmV0dXJuIGZyb20oZmV0Y2goXCJcIi5jb25jYXQoQkFTRV9VUkwsIFwiL2FydGljbGVzL1wiKS5jb25jYXQoaWQpKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcnRpY2xlIG5vdCBva1wiKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gY29uc29sZS5sb2coZXJyKTsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEFydGljbGVzQ29tbWVudHMoaWQpIHtcbiAgICByZXR1cm4gZnJvbShmZXRjaChcIlwiLmNvbmNhdChCQVNFX1VSTCwgXCIva29tZW50YXJpP2NsYW5ha0lEPVwiKS5jb25jYXQoaWQpKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLb21lbnRhcmkgbm90IG9rXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0S29tZW50YXIoa29tZW50YXIpIHtcbiAgICBmZXRjaChcIlwiLmNvbmNhdChCQVNFX1VSTCwgXCIva29tZW50YXJpXCIpLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGtvbWVudGFyKVxuICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuanNvbigpOyB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiBjb25zb2xlLmVycm9yKCdHcmXFoWthOicsIGVycm9yKTsgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJ0aWNsZUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgcmV0dXJuIGZyb20oZmV0Y2goXCJcIi5jb25jYXQoQkFTRV9VUkwsIFwiL2FydGljbGVzLz90aXRsZV9saWtlPVwiKS5jb25jYXQobmFtZSkpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpOyAvL3NhbW8gcHJvc2xlZGp1amUgZGFsamUgb3ZlIHBvZGF0a2UgbmVnZGUgYSBtaSBjZW1vIGloIHV6ZXRpIHNhIG92b2cgdG9rYSBpIHJhZGl0aSBuZXN0byBzYSBuamltYVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbXNnXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJ0aWNsZUJ5VHlwZSh0eXBlKSB7XG4gICAgcmV0dXJuIGZyb20oZmV0Y2goXCJcIi5jb25jYXQoQkFTRV9VUkwsIFwiL2FydGljbGVzLz90aXA9XCIpLmNvbmNhdCh0eXBlKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVlc3QgZmFpbGVkXCIpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnRpY2xlQnlBdXRvcihhdXRvcikge1xuICAgIHJldHVybiBmcm9tKGZldGNoKFwiXCIuY29uY2F0KEJBU0VfVVJMLCBcIi9hcnRpY2xlcy8/YXV0b3IuaW1lX2xpa2U9XCIpLmNvbmNhdChhdXRvcikpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbXNnXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQXJ0aWNsZWJ5SWQoaWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmZXRjaChcIlwiLmNvbmNhdChCQVNFX1VSTCwgXCIvYXJ0aWNsZXMvXCIpLmNvbmNhdChpZCksIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKFwiQ2xhbmFrIGplIG9icmlzYXNuXCIpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShjbGFuYWspIHtcbiAgICByZXR1cm4gZnJvbShmZXRjaChcIlwiLmNvbmNhdChCQVNFX1VSTCwgXCIvYXJ0aWNsZXMvXCIpLmNvbmNhdChjbGFuYWsuaWQudG9TdHJpbmcoKSksIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjbGFuYWspXG4gICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaylcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJ0aWNsZSBub3Qgb2tcIik7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGNvbnNvbGUubG9nKGVycik7IH0pKTtcbn1cbiIsImltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgZmlsdGVyLCBmcm9tRXZlbnQsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgZ2V0QXJ0aWNsZUJ5QXV0b3IsIGdldEFydGljbGVCeU5hbWUsIGdldEFydGljbGVCeVR5cGUgfSBmcm9tIFwiLi9hcGlzZXJ2aWNlXCI7XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRW1haWxJbnB1dChpbnB1dEZpZWxkKSB7XG4gICAgcmV0dXJuIGZyb21FdmVudChpbnB1dEZpZWxkLCBcImJsdXJcIikucGlwZShtYXAoZnVuY3Rpb24gKGV2KSB7IHJldHVybiBldi50YXJnZXQudmFsdWU7IH0pLCBjYXRjaEVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb3MgZm9ybWF0IG1haWxhXCIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfSksIHRhcChmdW5jdGlvbiAoZW1haWwpIHtcbiAgICAgICAgaWYgKGVtYWlsLmluY2x1ZGVzKCdAJykgJiYgZW1haWwudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNjY2MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJlZCc7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlUGFzc3dvcmRJbnB1dChpbnB1dEZpZWxkKSB7XG4gICAgcmV0dXJuIGZyb21FdmVudChpbnB1dEZpZWxkLCBcImJsdXJcIikucGlwZShtYXAoZnVuY3Rpb24gKGV2KSB7IHJldHVybiBldi50YXJnZXQudmFsdWU7IH0pLCBcbiAgICAvL2ZpbHRlcigocGFzc3dvcmQpID0+IHBhc3N3b3JkLmxlbmd0aCA+PSA1ICYmIC9eW0EtWl0vLnRlc3QocGFzc3dvcmQpKSwgXG4gICAgY2F0Y2hFcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9zIGZvcm1hdCBwYXNzd29yZGFcIik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9KSwgdGFwKGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhwYXNzd29yZCk7XG4gICAgICAgIGlmIChwYXNzd29yZC5sZW5ndGggPj0gNSAmJiAvXltBLVpdLy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNjY2MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJlZCc7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlVGVrc3RJbnB1dChpbnB1dEZpZWxkKSB7XG4gICAgcmV0dXJuIGZyb21FdmVudChpbnB1dEZpZWxkLCBcImJsdXJcIikucGlwZShtYXAoZnVuY3Rpb24gKGV2KSB7IHJldHVybiBldi50YXJnZXQudmFsdWU7IH0pLCBmaWx0ZXIoZnVuY3Rpb24gKHRla3N0KSB7IHJldHVybiB0ZWtzdC50cmltKCkgIT09ICcnOyB9KSwgY2F0Y2hFcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9zIGZvcm1hdFwiKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVMb2dpbkNsaWNrKGJ0bikge1xuICAgIHJldHVybiBmcm9tRXZlbnQoYnRuLCBcImNsaWNrXCIpLnBpcGUobWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiTG9naW4gY2xpY2tlZFwiOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlUmVnaXN0ZXJDbGljayhidG4pIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGJ0biwgXCJjbGlja1wiKS5waXBlKG1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBcIlJlZ2lzdGVyIGNsaWNrZWRcIjsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFkZEFydGljbGVDbGljayhidG4pIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGJ0biwgXCJjbGlja1wiKS5waXBlKG1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBcIkFkZCBhcnRpY2xlIGNsaWNrZWRcIjsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFydGljbGVJbnB1dChpbnB1dEZpZWxkKSB7XG4gICAgcmV0dXJuIGZyb21FdmVudChpbnB1dEZpZWxkLCBcImJsdXJcIikucGlwZShtYXAoZnVuY3Rpb24gKGV2KSB7IHJldHVybiBldi50YXJnZXQudmFsdWU7IH0pLCBmaWx0ZXIoZnVuY3Rpb24gKHRla3N0KSB7IHJldHVybiB0ZWtzdC50cmltKCkgIT09ICcnOyB9KSwgY2F0Y2hFcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9zIGZvcm1hdFwiKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pLCB0YXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS50cmltKCkgPT09ICcnKVxuICAgICAgICAgICAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgIH0pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVUeXBlU2VsZWN0KHR5cGVTZWxlY3QpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KHR5cGVTZWxlY3QsIFwiY2hhbmdlXCIpLnBpcGUobWFwKGZ1bmN0aW9uIChldikgeyByZXR1cm4gZXYudGFyZ2V0LnZhbHVlOyB9KSwgY2F0Y2hFcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9zIGZvcm1hdFwiKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pLCB0YXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS50cmltKCkgPT09ICcnKVxuICAgICAgICAgICAgdHlwZVNlbGVjdC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHR5cGVTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgIH0pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVFbWFpbFJlZ2lzdGVySW5wdXQoaW5wdXRGaWVsZCkge1xuICAgIHJldHVybiBmcm9tRXZlbnQoaW5wdXRGaWVsZCwgXCJibHVyXCIpLnBpcGUobWFwKGZ1bmN0aW9uIChldikgeyByZXR1cm4gZXYudGFyZ2V0LnZhbHVlOyB9KSwgY2F0Y2hFcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9zIGZvcm1hdCBtYWlsYVwiKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pLCB0YXAoZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVtYWlsKTtcbiAgICAgICAgaWYgKGVtYWlsLmluY2x1ZGVzKCdAJykgJiYgZW1haWwudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNjY2MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJlZCc7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlUGFzc3dvcmRSZWdpc3RlcklucHV0KGlucHV0RmllbGQpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGlucHV0RmllbGQsIFwiYmx1clwiKS5waXBlKG1hcChmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIGV2LnRhcmdldC52YWx1ZTsgfSksIGNhdGNoRXJyb3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvcyBmb3JtYXQgcGFzc3dvcmRhXCIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfSksIHRhcChmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGFzc3dvcmQpO1xuICAgICAgICBpZiAocGFzc3dvcmQubGVuZ3RoID49IDUgJiYgL15bQS1aXS8udGVzdChwYXNzd29yZCkpIHtcbiAgICAgICAgICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWlucHV0Jyk7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ29uUGFzc3dvcmRSZWdpc3RlcklucHV0KGlucHV0RmllbGQpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGlucHV0RmllbGQsIFwiYmx1clwiKS5waXBlKG1hcChmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIGV2LnRhcmdldC52YWx1ZTsgfSksIFxuICAgIC8vZmlsdGVyKChwYXNzd29yZCkgPT4gcGFzc3dvcmQubGVuZ3RoID49IDUgJiYgL15bQS1aXS8udGVzdChwYXNzd29yZCkpLCBcbiAgICBjYXRjaEVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb3MgZm9ybWF0IHBhc3N3b3JkYVwiKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pLCB0YXAoZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkKTtcbiAgICAgICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA+PSA1ICYmIC9eW0EtWl0vLnRlc3QocGFzc3dvcmQpKSB7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtaW5wdXQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1pbnB1dCcpO1xuICAgICAgICB9XG4gICAgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVudGVyQ29tbWVudEJ1dHRvbihidG4pIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGJ0biwgXCJjbGlja1wiKS5waXBlKG1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBcIkFkZCBhcnRpY2xlIGNsaWNrZWRcIjsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbihidG4pIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGJ0biwgXCJjbGlja1wiKS5waXBlKG1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBcImNsaWNrZWRcIjsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNlYXJjaElucHV0KGlucHV0RmllbGQpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGlucHV0RmllbGQsIFwiaW5wdXRcIikucGlwZShkZWJvdW5jZVRpbWUoNTAwKSwgbWFwKGZ1bmN0aW9uIChldikgeyByZXR1cm4gZXYudGFyZ2V0LnZhbHVlOyB9KSwgdGFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gY29uc29sZS5sb2codmFsdWUpOyB9KSwgZmlsdGVyKGZ1bmN0aW9uICh0aXRsZSkgeyByZXR1cm4gdGl0bGUubGVuZ3RoID49IDM7IH0pLCBzd2l0Y2hNYXAoZnVuY3Rpb24gKHRpdGxlKSB7IHJldHVybiBnZXRBcnRpY2xlQnlOYW1lKHRpdGxlKTsgfSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUF1dGhvcklucHV0KGlucHV0RmllbGQpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KGlucHV0RmllbGQsIFwiaW5wdXRcIikucGlwZShkZWJvdW5jZVRpbWUoNTAwKSwgbWFwKGZ1bmN0aW9uIChldikgeyByZXR1cm4gZXYudGFyZ2V0LnZhbHVlOyB9KSwgZmlsdGVyKGZ1bmN0aW9uIChhdXRob3IpIHsgcmV0dXJuIGF1dGhvci5sZW5ndGggPj0gMzsgfSksIHN3aXRjaE1hcChmdW5jdGlvbiAoYXV0aG9yKSB7IHJldHVybiBnZXRBcnRpY2xlQnlBdXRvcihhdXRob3IpOyB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlVHlwZUlucHV0KHR5cGVTZWxlY3QpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KHR5cGVTZWxlY3QsIFwiY2hhbmdlXCIpLnBpcGUobWFwKGZ1bmN0aW9uIChldikgeyByZXR1cm4gZXYudGFyZ2V0LnZhbHVlOyB9KSwgc3dpdGNoTWFwKGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiBnZXRBcnRpY2xlQnlUeXBlKHR5cGUpOyB9KSwgY2F0Y2hFcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9zIGZvcm1hdFwiKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pKTtcbn1cbiIsImltcG9ydCB7IENsYW5ha1ZpZXcgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jbGFuYWsvY2xhbmFrVmlld1wiO1xuaW1wb3J0IHsgTG9naW5WaWV3IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbG9naW4vbG9naW5WaWV3XCI7XG5pbXBvcnQgeyBSZWdpc3RlclZpZXcgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yZWdpc3Rlci9yZWdpc3RlclZpZXdcIjtcbmltcG9ydCB7IFZpZXdMb2dpYyB9IGZyb20gXCIuL3ZpZXdMb2dpY1wiO1xudmFyIFZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmlldygpIHtcbiAgICAgICAgdGhpcy52aWV3TG9naWMgPSBuZXcgVmlld0xvZ2ljKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJWaWV3ID0gbmV3IFJlZ2lzdGVyVmlldygpO1xuICAgICAgICB0aGlzLmxvZ2luVmlldyA9IG5ldyBMb2dpblZpZXcoKTtcbiAgICAgICAgdGhpcy5jbGFuYWtWaWV3ID0gbmV3IENsYW5ha1ZpZXcoKTtcbiAgICB9XG4gICAgVmlldy5wcm90b3R5cGUuZHJhd1NpdGUgPSBmdW5jdGlvbiAoaG9zdCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtYWluLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdmFyIGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyRGl2XCIpO1xuICAgICAgICB0aGlzLmRyYXdIZWFkZXIoaGVhZGVyRGl2KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG4gICAgICAgIHZhciBkaXZJem1lZGp1RGl2b3ZhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2SXptZWRqdURpdm92YS5jbGFzc0xpc3QuYWRkKFwiZGl2LWxvZ2luLXJlZ2lzdGVyXCIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2SXptZWRqdURpdm92YSk7XG4gICAgICAgIHZhciBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWFpbkRpdi5jbGFzc0xpc3QuYWRkKFwibWFpbi1kaXZcIik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluRGl2KTtcbiAgICAgICAgdmFyIGxldmlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBsZXZpRGl2LmNsYXNzTGlzdC5hZGQoXCJsZXZpLWRpdlwiKTtcbiAgICAgICAgdGhpcy5kcmF3RmlsdGVyKGxldmlEaXYpO1xuICAgICAgICBtYWluRGl2LmFwcGVuZENoaWxkKGxldmlEaXYpO1xuICAgICAgICB2YXIgZGVzbmlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkZXNuaURpdi5jbGFzc0xpc3QuYWRkKFwiZGVzbmktZGl2XCIpO1xuICAgICAgICBtYWluRGl2LmFwcGVuZENoaWxkKGRlc25pRGl2KTtcbiAgICAgICAgdmFyIGxvZ2luRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbG9naW5EaXYuY2xhc3NMaXN0LmFkZChcImxvZ2luLWRpdlwiKTtcbiAgICAgICAgdGhpcy5sb2dpblZpZXcuZHJhd0xvZ2luKGxvZ2luRGl2KTtcbiAgICAgICAgbG9naW5EaXYuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgZGl2SXptZWRqdURpdm92YS5hcHBlbmRDaGlsZChsb2dpbkRpdik7XG4gICAgICAgIC8vaXN0byBvdmFrbyBpIHphIHJlZ2lzdHJhY2lqdVxuICAgICAgICB2YXIgcmVnaXN0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZWdpc3RlckRpdi5jbGFzc0xpc3QuYWRkKFwicmVnaXN0ZXItZGl2XCIpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlldy5kcmF3UmVnaXN0ZXIocmVnaXN0ZXJEaXYpO1xuICAgICAgICByZWdpc3RlckRpdi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBkaXZJem1lZGp1RGl2b3ZhLmFwcGVuZENoaWxkKHJlZ2lzdGVyRGl2KTtcbiAgICAgICAgdmFyIGlucHV0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW5wdXREaXYuY2xhc3NMaXN0LmFkZChcImlucHV0LWFydGljbGUtZGl2XCIpO1xuICAgICAgICAvL2lucHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICBpbnB1dERpdi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAvL2R1Z21lIHphIG90dmFyYW5qZSBmb3JtZSB6YSBkb2RhdmFuamUgY2xhbmthXG4gICAgICAgIHZhciBidG5PcGVuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgYnRuT3BlbkRpdi5jbGFzc0xpc3QuYWRkKFwiYnRuT3BlbkRpdlwiKTtcbiAgICAgICAgdmFyIGJ0bk9wZW5Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuT3BlbkZvcm0uY2xhc3NMaXN0LmFkZChcImJ0bk9wZW5Gb3JtXCIpOyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBtb3JhIHRvIHUgdmlld0xvZ2ljIGRhIG9kcmFkaW1cbiAgICAgICAgYnRuT3BlbkZvcm0udGV4dENvbnRlbnQgPSBcIkRvZGFqIG5vdmkgY2xhbmFrXCI7XG4gICAgICAgIGJ0bk9wZW5EaXYuYXBwZW5kQ2hpbGQoYnRuT3BlbkZvcm0pO1xuICAgICAgICBpbnB1dERpdi5hcHBlbmRDaGlsZChidG5PcGVuRGl2KTtcbiAgICAgICAgLy9kaXYgemEgZG9kYXZhbmplIG5vdm9nIGNsYW5rYSBzYSBzdmUgcHJldmlld1xuICAgICAgICB2YXIgYWRkQXJ0aWNsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGFkZEFydGljbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFkZC1hcnRpY2xlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdmFyIGFkZEFydGljbGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhZGRBcnRpY2xlRGl2LmNsYXNzTGlzdC5hZGQoXCJhZGQtYXJ0aWNsZS1kaXZcIik7XG4gICAgICAgIHRoaXMuY2xhbmFrVmlldy5kcmF3QWRkQXJ0aWNsZUZvcm0oYWRkQXJ0aWNsZURpdik7XG4gICAgICAgIGFkZEFydGljbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQXJ0aWNsZURpdik7XG4gICAgICAgIGFkZEFydGljbGVDb250YWluZXIuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaW5wdXREaXYuYXBwZW5kQ2hpbGQoYWRkQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgICAgIGRlc25pRGl2LmFwcGVuZENoaWxkKGlucHV0RGl2KTtcbiAgICAgICAgLy9vdmRlIHRyZWJhIGRhIGRvZGFtIGRpdiB6YSBwcmlrYXppdmFuamUgdmlzZSBpbmZvcm1hY2lqZSBvIGNsYW5rb3ZpbWEgXG4gICAgICAgIHZhciBjbGFuYWtDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjbGFuYWtDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNsYW5hay1jb250YWluZXJcIik7XG4gICAgICAgIGNsYW5ha0NvbnRhaW5lci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB2YXIgY2xhbmFrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY2xhbmFrRGl2LmNsYXNzTGlzdC5hZGQoXCJjbGFuYWstZGl2XCIpO1xuICAgICAgICB0aGlzLmNsYW5ha1ZpZXcuZHJhd0NsYW5hayhjbGFuYWtEaXYpO1xuICAgICAgICBjbGFuYWtDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xhbmFrRGl2KTtcbiAgICAgICAgZGVzbmlEaXYuYXBwZW5kQ2hpbGQoY2xhbmFrQ29udGFpbmVyKTtcbiAgICAgICAgLy9vdm8gc3Ugc3ZpIGNsYW5rb3ZpXG4gICAgICAgIHZhciBjbGFua292aURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNsYW5rb3ZpRGl2LmNsYXNzTGlzdC5hZGQoXCJjbGFua292aS1kaXZcIik7XG4gICAgICAgIGRlc25pRGl2LmFwcGVuZENoaWxkKGNsYW5rb3ZpRGl2KTtcbiAgICAgICAgaG9zdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICAvL3ByaWtheiB1a29saWtvIGltYW1vIHVsb2dvdmFub2cga29yaXNuaWthXG4gICAgICAgIGlmIChWaWV3TG9naWMuZ2V0Q3VycmVudFVzZXIoKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbnB1dERpdi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0RGl2LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpZXcucHJvdG90eXBlLmRyYXdIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtZW5pQnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVuaUJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKFwibWVuaS1idG4tZGl2XCIpO1xuICAgICAgICB2YXIgYnRuT3Blbk1lbmkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5PcGVuTWVuaS5jbGFzc0xpc3QuYWRkKFwiYnRuT3Blbk1lbmlcIik7XG4gICAgICAgIGJ0bk9wZW5NZW5pLnRleHRDb250ZW50ID0gXCJNZW5pXCI7XG4gICAgICAgIGJ0bk9wZW5NZW5pLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL290dmFyYSBkaXYgc2EgbGV2ZSBzdHJhbmUgc2EgZmlsdGVyaW1hXG4gICAgICAgICAgICBfdGhpcy5wcmlrYXppU2lkZWJhcigpO1xuICAgICAgICB9O1xuICAgICAgICBtZW5pQnV0dG9uRGl2LmFwcGVuZENoaWxkKGJ0bk9wZW5NZW5pKTtcbiAgICAgICAgdmFyIHByaWphdmFEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlqYXZhRGl2LmNsYXNzTGlzdC5hZGQoXCJwcmlqYXZhLWJ1dHRvblwiKTtcbiAgICAgICAgcHJpamF2YURpdi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB2YXIgYnRuUHJpamF2YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGJ0blByaWphdmEuY2xhc3NMaXN0LmFkZChcImJ0bkxvZ0luXCIpO1xuICAgICAgICBidG5QcmlqYXZhLnRleHRDb250ZW50ID0gXCJQcmlqYXZpIHNlXCI7XG4gICAgICAgIHZhciBpc0xvZ2luRGl2VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBidG5QcmlqYXZhLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbG9naW5EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ2luLWRpdlwiKTtcbiAgICAgICAgICAgIGlzTG9naW5EaXZWaXNpYmxlID0gIWlzTG9naW5EaXZWaXNpYmxlOyAvLyBJbnZlcnR1amVtbyBzdGFuamVcbiAgICAgICAgICAgIGxvZ2luRGl2LmhpZGRlbiA9ICFpc0xvZ2luRGl2VmlzaWJsZTtcbiAgICAgICAgICAgIHZhciByZWdpc3RlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVnaXN0ZXItZGl2XCIpO1xuICAgICAgICAgICAgaWYgKGxvZ2luRGl2LmhpZGRlbiAmJiByZWdpc3RlckRpdi5oaWRkZW4gPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJEaXYuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBsb2dpbkRpdi5oaWRkZW4gPSAhaXNMb2dpbkRpdlZpc2libGU7XG4gICAgICAgIH07XG4gICAgICAgIHByaWphdmFEaXYuYXBwZW5kQ2hpbGQoYnRuUHJpamF2YSk7XG4gICAgICAgIHZhciBoZWFkZXJQcm9maWxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaGVhZGVyUHJvZmlsZURpdi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLXByb2ZpbGUtZGl2XCIpO1xuICAgICAgICBoZWFkZXJQcm9maWxlRGl2LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHZhciBwcm9maWxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvZmlsZURpdi5jbGFzc0xpc3QuYWRkKFwicHJvZmlsZS1kaXZcIik7XG4gICAgICAgIHZhciBwb2RhY2lEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwb2RhY2lEaXYuY2xhc3NMaXN0LmFkZChcInBvZGFjaS1kaXZcIik7XG4gICAgICAgIHZhciBpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGltZS5jbGFzc0xpc3QuYWRkKFwiaW1lLWxhYmVsXCIpO1xuICAgICAgICB2YXIgcHJlemltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgcHJlemltZS5jbGFzc0xpc3QuYWRkKFwicHJlemltZS1sYWJlbFwiKTtcbiAgICAgICAgcG9kYWNpRGl2LmFwcGVuZENoaWxkKGltZSk7XG4gICAgICAgIHBvZGFjaURpdi5hcHBlbmRDaGlsZChwcmV6aW1lKTtcbiAgICAgICAgdmFyIGxvZ291dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGxvZ291dERpdi5jbGFzc0xpc3QuYWRkKFwibG9nb3V0LWRpdlwiKTtcbiAgICAgICAgdmFyIGJ0bkxvZ291dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGJ0bkxvZ291dC5jbGFzc0xpc3QuYWRkKFwiYnRuTG9nb3V0XCIpO1xuICAgICAgICBidG5Mb2dvdXQudGV4dENvbnRlbnQgPSBcIk9kamF2aSBzZVwiO1xuICAgICAgICBsb2dvdXREaXYuYXBwZW5kQ2hpbGQoYnRuTG9nb3V0KTtcbiAgICAgICAgcHJvZmlsZURpdi5hcHBlbmRDaGlsZChwb2RhY2lEaXYpO1xuICAgICAgICBwcm9maWxlRGl2LmFwcGVuZENoaWxkKGxvZ291dERpdik7XG4gICAgICAgIGhlYWRlclByb2ZpbGVEaXYuYXBwZW5kQ2hpbGQocHJvZmlsZURpdik7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChtZW5pQnV0dG9uRGl2KTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHByaWphdmFEaXYpO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyUHJvZmlsZURpdik7XG4gICAgICAgIGlmIChWaWV3TG9naWMuZ2V0Q3VycmVudFVzZXIoKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBoZWFkZXJQcm9maWxlRGl2LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgaW1lLnRleHRDb250ZW50ID0gVmlld0xvZ2ljLmdldEN1cnJlbnRVc2VyKCkuaW1lO1xuICAgICAgICAgICAgcHJlemltZS50ZXh0Q29udGVudCA9IFZpZXdMb2dpYy5nZXRDdXJyZW50VXNlcigpLnByZXppbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmlqYXZhRGl2LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBWaWV3LnByb3RvdHlwZS5wcmlrYXppU2lkZWJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxldmktZGl2XCIpO1xuICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG4gICAgfTtcbiAgICBWaWV3LnByb3RvdHlwZS5kcmF3RmlsdGVyID0gZnVuY3Rpb24gKGxldmlEaXYpIHtcbiAgICAgICAgdmFyIGZpbHRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZpbHRlckRpdi5jbGFzc0xpc3QuYWRkKFwiZmlsdGVyLWRpdlwiKTtcbiAgICAgICAgdmFyIHNlYXJjaERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNlYXJjaERpdi5jbGFzc0xpc3QuYWRkKFwic2VhcmNoLWRpdlwiKTtcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBzZWFyY2hJbnB1dC5jbGFzc0xpc3QuYWRkKFwic2VhcmNoLWlucHV0XCIpO1xuICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IFwiUHJldHJhemkgY2xhbmtvdmU6XCI7XG4gICAgICAgIHNlYXJjaERpdi5hcHBlbmRDaGlsZChzZWFyY2hJbnB1dCk7XG4gICAgICAgIHZhciBmaWx0cmlyYWpEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmaWx0cmlyYWpEaXYuY2xhc3NMaXN0LmFkZChcImZpbHRyaXJhai1kaXZcIik7XG4gICAgICAgIHZhciBhdXRvcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBhdXRvcklucHV0LmNsYXNzTGlzdC5hZGQoXCJhdXRvci1pbnB1dFwiKTtcbiAgICAgICAgYXV0b3JJbnB1dC5wbGFjZWhvbGRlciA9IFwiUHJldHJhemkgYXV0b3JhOlwiO1xuICAgICAgICB2YXIgdHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICB0eXBlTGFiZWwuY2xhc3NMaXN0LmFkZChcInR5cGUtbGFiZWwtZmlsdGVyXCIpO1xuICAgICAgICB0eXBlTGFiZWwudGV4dENvbnRlbnQgPSBcIlR5cGU6IFwiO1xuICAgICAgICB2YXIgdHlwZVNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgICAgIHR5cGVTZWxlY3QuY2xhc3NMaXN0LmFkZChcInR5cGUtZmlsdGVyXCIpO1xuICAgICAgICB0aGlzLnZpZXdMb2dpYy5wb3B1bmlTZWxlY3QodHlwZVNlbGVjdCk7XG4gICAgICAgIHZhciBidG5SZXNldHVqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuUmVzZXR1ai5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLXJlc2V0dWotZmlsdGVyXCIpO1xuICAgICAgICBidG5SZXNldHVqLnRleHRDb250ZW50ID0gXCJSZXNldHVqIHBhcmFtZXRyZVwiO1xuICAgICAgICBmaWx0cmlyYWpEaXYuYXBwZW5kQ2hpbGQoYXV0b3JJbnB1dCk7XG4gICAgICAgIGZpbHRyaXJhakRpdi5hcHBlbmRDaGlsZCh0eXBlTGFiZWwpO1xuICAgICAgICBmaWx0cmlyYWpEaXYuYXBwZW5kQ2hpbGQodHlwZVNlbGVjdCk7XG4gICAgICAgIGZpbHRyaXJhakRpdi5hcHBlbmRDaGlsZChidG5SZXNldHVqKTtcbiAgICAgICAgZmlsdGVyRGl2LmFwcGVuZENoaWxkKHNlYXJjaERpdik7XG4gICAgICAgIGZpbHRlckRpdi5hcHBlbmRDaGlsZChmaWx0cmlyYWpEaXYpO1xuICAgICAgICBsZXZpRGl2LmFwcGVuZENoaWxkKGZpbHRlckRpdik7XG4gICAgfTtcbiAgICByZXR1cm4gVmlldztcbn0oKSk7XG5leHBvcnQgeyBWaWV3IH07XG4iLCJpbXBvcnQgeyBnZXRUeXBlcyB9IGZyb20gXCIuLi9vYnNlcnZhYmxlcy9hcGlzZXJ2aWNlXCI7XG52YXIgVmlld0xvZ2ljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFZpZXdMb2dpYygpIHtcbiAgICB9XG4gICAgVmlld0xvZ2ljLnByb3RvdHlwZS5wb3B1bmlTZWxlY3QgPSBmdW5jdGlvbiAodHlwZVNlbGVjdCkge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gZ2V0VHlwZXMoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAodGlwb3ZpKSB7XG4gICAgICAgICAgICB0aXBvdmkuZm9yRWFjaChmdW5jdGlvbiAodGlwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gdGlwO1xuICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHRpcDtcbiAgICAgICAgICAgICAgICB0eXBlU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sIDMwMDApOyAvL3phdHZhcmFtIHRvayBwb2RhdGFrYSBuYWtvbiBzdG8gcHJvZGplIG5la28gdnJlbWUgXG4gICAgfTtcbiAgICBWaWV3TG9naWMuZ2V0Q3VycmVudFVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZWRVc2VySlNPTiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gICAgICAgIGlmIChzdG9yZWRVc2VySlNPTikge1xuICAgICAgICAgICAgdmFyIHN0b3JlZFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXJKU09OKTtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZWRVc2VyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIFZpZXdMb2dpYztcbn0oKSk7XG5leHBvcnQgeyBWaWV3TG9naWMgfTtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2U7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XG4gICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcbiAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENsYW5ha0xvZ2ljIH0gZnJvbSBcIi4vY29tcG9uZW50cy9jbGFuYWsvYXJ0aWNsZUxvZ2ljXCI7XG5pbXBvcnQgeyBVc2VyTG9naWMgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luTG9naWNcIjtcbmltcG9ydCB7IFJlZ2lzdGVyTG9naWMgfSBmcm9tIFwiLi9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyTG9naWNcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3L3ZpZXdcIjtcbnZhciB2aWV3ID0gbmV3IFZpZXcoKTtcbnZpZXcuZHJhd1NpdGUoZG9jdW1lbnQuYm9keSk7XG52YXIgZW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW1haWwtaW5wdXRcIik7XG52YXIgcGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXRcIik7XG52YXIgYnV0dG9uTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0blByaWphdmFcIik7XG52YXIgaW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZS1pbnB1dFwiKTtcbnZhciBwcmV6aW1lSU5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXppbWUtaW5wdXRcIik7XG52YXIgZW1haWxSZWdpc3RlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbWFpbC1yZWdpc3Rlci1pbnB1dFwiKTtcbnZhciBwYXNzd29yZFJlZ2lzdGVySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3N3b3JkLXJlZ2lzdGVyLWlucHV0XCIpO1xudmFyIGNvbmZpcm1QYXNzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tcGFzc3dvcmQtaW5wdXRcIik7XG52YXIgYnV0dG9uUmVnaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0blJlZ2lzdGVyXCIpO1xudmFyIGxvZ2luTG9naWMgPSBuZXcgVXNlckxvZ2ljKGVtYWlsSW5wdXQsIHBhc3N3b3JkSW5wdXQsIGJ1dHRvbkxvZ2luKTtcbnZhciByZWdpc3RlckxvZ2ljID0gbmV3IFJlZ2lzdGVyTG9naWMoaW1lSW5wdXQsIHByZXppbWVJTnB1dCwgZW1haWxSZWdpc3RlcklucHV0LCBwYXNzd29yZFJlZ2lzdGVySW5wdXQsIGNvbmZpcm1QYXNzSW5wdXQsIGJ1dHRvblJlZ2lzdGVyKTtcbnZhciBjbGFua292aURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xhbmtvdmktZGl2XCIpO1xudmFyIGJ0bk9wZW5Eb2RhakNsYW5hayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuT3BlbkZvcm1cIik7XG52YXIgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1pbnB1dFwiKTtcbnZhciBhdXRvcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRvci1pbnB1dFwiKTtcbnZhciB0aXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnR5cGUtZmlsdGVyXCIpO1xudmFyIGJ0blJlc2V0dWogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1yZXNldHVqLWZpbHRlclwiKTtcbnZhciBjbGFuYWtMb2cgPSBuZXcgQ2xhbmFrTG9naWMoY2xhbmtvdmlEaXYsIGJ0bk9wZW5Eb2RhakNsYW5haywgc2VhcmNoSW5wdXQsIGF1dG9ySW5wdXQsIHRpcFNlbGVjdCwgYnRuUmVzZXR1aik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=