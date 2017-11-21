angular.module('app.main', [])
    .factory('dxData', ['Restangular', 'promiseTracker', function (Restangular, promiseTracker) {
        var dxData = function (config) {
            this.config = config;
            this.object = angular.copy(config.default);
            this.headers = {access_token: config.token};
            this.tracker = promiseTracker();
            this.useID = config.useID;

            var self = this;

            this.rest = Restangular
                .setRestangularFields({
                    id: 'id'
                }).setDefaultHeaders(
                    {'Authorization': 'Bearer ' + config.token,'Content-Type': 'application/json'}
                ).all(config.rest);

            var dxRest = Restangular
                .setRestangularFields({
                    id: 'id'
                }).setDefaultHeaders(
                    {'Authorization': 'Bearer ' + config.token}
                ).all(config.rest);

            this.dxDataProvider = new DevExpress.data.DataSource({
                load: function (loadOptions) {
                    var params = {limit: loadOptions.take, offset: loadOptions.skip}

                    if (loadOptions.filter) {
                        if (typeof loadOptions.filter[0] == 'string') {
                            var filterName = (self.useID.indexOf(loadOptions.filter[0]) > -1) ? ''+loadOptions.filter[0]+'__id' : ''+loadOptions.filter[0];
                            var filterValue = loadOptions.filter[2];

                            if (self.useID.indexOf(loadOptions.filter[0]) > -1) {
                                params['' + filterName] = filterValue
                            } else {
                                switch (loadOptions.filter[1]) {
                                    case 'contains' :
                                        params['' + filterName + '__contains'] = filterValue
                                        break;
                                    case 'notcontains' :
                                        params['' + filterName + '__icontains'] = filterValue
                                        break;
                                    case 'startswith' :
                                        params['' + filterName + '__startswith'] = filterValue
                                        break;
                                    case 'endswith' :
                                        params['' + filterName + '__endswith'] = filterValue
                                        break;
                                    case '=' :
                                        params['' + filterName + '__exact'] = filterValue
                                        break;
                                    case '<>' :
                                        params['' + filterName + '__iexact'] = filterValue
                                        break;
                                    case '>' :
                                        params['' + filterName + '__gt'] = filterValue
                                        break;
                                    case '<' :
                                        params['' + filterName + '__lt'] = filterValue
                                        break;
                                    case '>=' :
                                        params['' + filterName + '__gte'] = filterValue
                                        break;
                                    case '<=' :
                                        params['' + filterName + '__lte'] = filterValue
                                        break;
                                }
                            }

                        } else if (Array.isArray(loadOptions.filter[0])) {
                            angular.forEach(loadOptions.filter, function (value, key) {
                                if (Array.isArray(value)) {
                                    var filterName = (self.useID.indexOf(value[0]) > -1) ? ''+value[0]+'__id' : ''+value[0];
                                    var filterValue = value[2];

                                    if (self.useID.indexOf(value[0]) > -1) {
                                        params['' + filterName] = filterValue
                                    } else {
                                        switch (value[1]) {
                                            case 'contains' :
                                                params['' + filterName + '__contains'] = filterValue
                                                break;
                                            case 'notcontains' :
                                                params['' + filterName + '__icontains'] = filterValue
                                                break;
                                            case 'startswith' :
                                                params['' + filterName + '__startswith'] = filterValue
                                                break;
                                            case 'endswith' :
                                                params['' + filterName + '__endswith'] = filterValue
                                                break;
                                            case '=' :
                                                params['' + filterName + '__exact'] = filterValue
                                                break;
                                            case '<>' :
                                                params['' + filterName + '__iexact'] = filterValue
                                                break;
                                            case '>' :
                                                params['' + filterName + '__gt'] = filterValue
                                                break;
                                            case '<' :
                                                params['' + filterName + '__lt'] = filterValue
                                                break;
                                            case '>=' :
                                                params['' + filterName + '__gte'] = filterValue
                                                break;
                                            case '<=' :
                                                params['' + filterName + '__lte'] = filterValue
                                                break;
                                        }
                                    }

                                }
                            })
                        } else {

                        }

                    }

                    if (loadOptions.sort) {
                        angular.forEach(loadOptions.sort, function (value, key) {
                            params['ordering'] = '' + ((value.desc) ? '-' : '' ) + value.selector
                        })
                    }

                    var deferred = self.tracker.createPromise();
                    Restangular
                        .setRestangularFields({
                            id: 'id'
                        })
                        .setDefaultRequestParams(params)
                        .setDefaultHeaders(
                            {'Authorization': 'Bearer ' + config.token}
                        ).all(config.rest).customGET().then(
                        function (response) {
                            if (response.results) {
                                deferred.resolve(response.results, {totalCount: response.count});
                            } else {
                                deferred.resolve(response)
                            }

                        }
                    );
                    return deferred.promise;
                },
                byKey: function (key) {
                    var deferred = self.tracker.createPromise();
                    Restangular
                        .setRestangularFields({
                            id: 'id'
                        })
                        .setDefaultHeaders(
                            {'Authorization': 'Bearer ' + config.token}
                        ).all(config.rest).get(key+'/').then(function (response) {
                            deferred.resolve(response);
                        });
                    return deferred.promise;
                },

                insert: function (values) {
                    var deferred = self.tracker.createPromise();
                    self.rest.post(values).then(function (response) {
                        deferred.resolve(response);
                    });
                    return deferred.promise;
                },

                update: function (key, values) {
                    var objectPUT  = angular.copy(key);
                    angular.forEach(values, function (value, key) {
                        objectPUT[''+key] = value;
                    })

                    delete objectPUT['image'];

                    var deferred = self.tracker.createPromise();
                    Restangular.one(config.rest+ key.id + '/').customPUT(JSON.stringify(objectPUT)).then(function (response) {
                        deferred.resolve(response);
                    });
                    return deferred.promise;
                },

                remove: function (key) {
                    var deferred = self.tracker.createPromise();
                    Restangular.setDefaultHeaders(
                        {'Authorization': 'Bearer ' + config.token,'Content-Type': 'application/json'},
                        {'Content-Type': 'application/json'}
                    ).all(config.rest).customDELETE(key.id+'/').then(function (response) {
                        deferred.resolve(response);
                    });
                    return deferred.promise;
                },
                totalCount: function (loadOptions) { //Required if your data service does not allow return this value in a single request.
                    var d = new $.Deferred();
                    var params = {limit: loadOptions.take, offset: loadOptions.skip}

                    if (loadOptions.filter) {
                        if (typeof loadOptions.filter[0] == 'string') {
                            var filterName = (self.useID.indexOf(loadOptions.filter[0]) > -1) ? ''+loadOptions.filter[0]+'__id' : ''+loadOptions.filter[0];
                            var filterValue = loadOptions.filter[2];

                            if (self.useID.indexOf(loadOptions.filter[0]) > -1) {
                                params['' + filterName] = filterValue
                            } else {
                                switch (loadOptions.filter[1]) {
                                    case 'contains' :
                                        params['' + filterName + '__contains'] = filterValue
                                        break;
                                    case 'notcontains' :
                                        params['' + filterName + '__icontains'] = filterValue
                                        break;
                                    case 'startswith' :
                                        params['' + filterName + '__startswith'] = filterValue
                                        break;
                                    case 'endswith' :
                                        params['' + filterName + '__endswith'] = filterValue
                                        break;
                                    case '=' :
                                        params['' + filterName + '__exact'] = filterValue
                                        break;
                                    case '<>' :
                                        params['' + filterName + '__iexact'] = filterValue
                                        break;
                                    case '>' :
                                        params['' + filterName + '__gt'] = filterValue
                                        break;
                                    case '<' :
                                        params['' + filterName + '__lt'] = filterValue
                                        break;
                                    case '>=' :
                                        params['' + filterName + '__gte'] = filterValue
                                        break;
                                    case '<=' :
                                        params['' + filterName + '__lte'] = filterValue
                                        break;
                                }
                            }

                        } else if (Array.isArray(loadOptions.filter[0])) {
                            angular.forEach(loadOptions.filter, function (value, key) {
                                if (Array.isArray(value)) {
                                    var filterName = (self.useID.indexOf(value[0]) > -1) ? ''+value[0]+'__id' : ''+value[0];
                                    var filterValue = value[2];

                                    if (self.useID.indexOf(value[0]) > -1) {
                                        params['' + filterName] = filterValue
                                    } else {
                                        switch (value[1]) {
                                            case 'contains' :
                                                params['' + filterName + '__contains'] = filterValue
                                                break;
                                            case 'notcontains' :
                                                params['' + filterName + '__icontains'] = filterValue
                                                break;
                                            case 'startswith' :
                                                params['' + filterName + '__startswith'] = filterValue
                                                break;
                                            case 'endswith' :
                                                params['' + filterName + '__endswith'] = filterValue
                                                break;
                                            case '=' :
                                                params['' + filterName + '__exact'] = filterValue
                                                break;
                                            case '<>' :
                                                params['' + filterName + '__iexact'] = filterValue
                                                break;
                                            case '>' :
                                                params['' + filterName + '__gt'] = filterValue
                                                break;
                                            case '<' :
                                                params['' + filterName + '__lt'] = filterValue
                                                break;
                                            case '>=' :
                                                params['' + filterName + '__gte'] = filterValue
                                                break;
                                            case '<=' :
                                                params['' + filterName + '__lte'] = filterValue
                                                break;
                                        }
                                    }

                                }
                            })
                        } else {

                        }

                    }
                    params.needCount = true; //You can use this parameter on the server side to ensure that a number of records is required
                    var deferred = self.tracker.createPromise();
                    Restangular
                        .setRestangularFields({
                            id: 'id'
                        })
                        .setDefaultRequestParams(params)
                        .setDefaultHeaders(
                            {'Authorization': 'Bearer ' + config.token}
                        ).all(config.rest).customGET().then(
                        function (response) {
                            deferred.resolve(response.count);
                        }
                    );
                    return deferred.promise;
                }
            });


        }
        dxData.prototype = {}
        return dxData;
    }])
    .controller('CMain', ['$scope', function ($scope) {
        $scope.breadcrumbs = [
            {url : '#',icon : 'fa fa-home',name :' Home',},
            {route : 'main.catalog',icon : 'fa fa-list-ul',name :' Catalog',},
            {route : 'main.catalog.product',icon : 'fa fa-list-ul',name :' Product',},
        ]
    }])
    .controller('COverview', ['$scope', function ($scope) {
    }])
    .controller('CReference', ['$scope', function ($scope) {
        console.info('CReference');
    }])
    .controller('CReferenceTerritory', ['$scope', function ($scope) {
        console.info('CReferenceTerritory');
    }])
    .controller('CReferenceBranch', ['$scope', function ($scope) {
        console.info('CReferenceBranch');
    }])

