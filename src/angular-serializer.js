/*
 * angular-serializer v0.1.0
 * (c) 2014 Lin Clark http://lin-clark.com
 * License: MIT
 */
(function () {
    'use strict';

    angular.module('linclark.serializer', [])
        // Concrete serializer for x-www-form-urlencoded.
        .provider('lcFormUrlencodedSerializer', function () {
            return {
                $get: function () {
                    return {
                        // Serialize the data. Adapted from jQuery's param(). Currently
                        // supports a limited number of data structures, as tested in the
                        // unit tests.
                        'serialize': function (data) {
                            var r20 = /%20/g,
                                prefix,
                                s = [],
                                add = function (key, value) {
                                    // If value is a function, invoke it and return its value
                                    value = angular.isFunction(value) ? value() : (value === null ? '' : value);
                                    s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
                                },
                                buildParams = function (prefix, obj, add) {
                                    // Recursively encode nested structures.
                                    if (angular.isObject(obj)) {
                                        for (var name in obj) {
                                            if (obj.hasOwnProperty(name)) {
                                                buildParams(prefix + '[' + name + ']', obj[name], add);
                                            }
                                        }
                                    }
                                    else {
                                        add(prefix, obj);
                                    }
                                };

                            for (prefix in data) {
                                if (data.hasOwnProperty(prefix)) {
                                    buildParams(prefix, data[prefix], add);
                                }
                            }
                            return s.join('&').replace(r20, '+');
                        }
                    };
                }
            };
        }
    )
    .provider('lcSerializer', function(lcFormUrlencodedSerializerProvider) {
        return {
            $get: function ($q) {
                // @todo Break this out into a mediatype negotiator service.
                var getMediatype = function (headers) {
                    var mediatype = 'json';

                    // If Content-Type is set, use that.
                    if (angular.isDefined(headers['Content-Type']) && headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                        mediatype = 'form-urlencoded';
                    }
                    return mediatype;
                };

                return {
                    // Serialize the data.
                    'request': function(config) {
                        if (angular.isDefined(config.headers) && getMediatype(config.headers) == 'form-urlencoded') {
                            var serializer = lcFormUrlencodedSerializerProvider.$get();
                            config.data = serializer.serialize(config.data);
                        }
                        return config || $q.when(config);
                    },
                    // Deserialize the data.
                    'response': function(response) {
                        // @todo Add deserilization support.
                        return response;
                    }
                };
            }
        };
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('lcSerializer');
    }]);
})();