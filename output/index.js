'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ObjectHelper = /** @class */ (function () {
    function ObjectHelper(dataSource) {
        this.dataSource = dataSource;
    }
    ObjectHelper.setDataSource = function (dataSource) {
        return new ObjectHelper(dataSource);
    };
    ObjectHelper.deepCopy = function (target) {
        if (target === null) {
            return target;
        }
        if (target instanceof Date) {
            return new Date(target.getTime());
        }
        // First part is for array and second part is for Realm.Collection
        // if (target instanceof Array || typeof (target as any).type === 'string') {
        if (typeof target === 'object') {
            if (typeof target[Symbol.iterator] === 'function') {
                var cp = [];
                if (target.length > 0) {
                    for (var _i = 0, _a = target; _i < _a.length; _i++) {
                        var arrayMember = _a[_i];
                        cp.push(ObjectHelper.deepCopy(arrayMember));
                    }
                }
                return cp;
            }
            else {
                var targetKeys = Object.keys(target);
                var cp = {};
                if (targetKeys.length > 0) {
                    for (var _b = 0, targetKeys_1 = targetKeys; _b < targetKeys_1.length; _b++) {
                        var key = targetKeys_1[_b];
                        cp[key] = ObjectHelper.deepCopy(target[key]);
                    }
                }
                return cp;
            }
        }
        // Means that object is atomic
        return target;
    };
    ObjectHelper.prototype.setData = function (dataSource, key, value) {
        var _a;
        var typeDataKey = typeof dataSource[key];
        var typeParam = typeof value;
        if (!dataSource.hasOwnProperty(key) || typeDataKey !== typeParam) {
            console.error("key " + key + "[" + typeDataKey + "] of dataSource is not same type with param Value[" + typeParam + "] OR not found in dataSource");
            return;
        }
        if (typeof value === "object") {
            for (var valueKey in value) {
                dataSource[key] = __assign(__assign({}, dataSource[key]), (_a = {}, _a[valueKey] = value[valueKey], _a));
            }
        }
        else {
            dataSource[key] = (value !== null && value !== void 0 ? value : __assign({}, dataSource[key]));
        }
        return dataSource;
    };
    ObjectHelper.prototype.copyWithParam = function (param, value) {
        if (typeof this.dataSource !== "object") {
            return this.dataSource;
        }
        var params = param.split(".");
        var firstKey = params[0];
        this.dataSource = __assign({}, this.dataSource);
        var dataChild = __assign({}, this.dataSource[firstKey]);
        switch (params.length) {
            case 1: {
                this.setData(this.dataSource, firstKey, value);
                return this;
            }
            default: {
                this.dataSource[firstKey] = dataChild;
                for (var i = 1; i < params.length; i++) {
                    var key = params[i];
                    var isLastItem = i === params.length - 1;
                    if (isLastItem) {
                        this.setData(dataChild, key, value);
                    }
                    else {
                        dataChild[key] = __assign({}, dataChild[key]);
                        dataChild = dataChild[key];
                    }
                }
                return this;
            }
        }
    };
    ObjectHelper.prototype.getResult = function () {
        return this.dataSource;
    };
    return ObjectHelper;
}());

module.exports = ObjectHelper;
