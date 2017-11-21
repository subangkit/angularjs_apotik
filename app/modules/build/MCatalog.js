angular
    .module('app.catalog', ['app.main', 'restangular'])
    .controller('CCatalog', ['$scope', 'dxData', function ($scope, dxData) {
    }])
    .controller('CCatalogProduct', ['$scope', 'dxData', function ($scope, dxData) {
        $scope.dxDataCatalog = new dxData({
            rest: 'products/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
            useID: ['category', 'creator',],
        })
        $scope.dxDataProductImage = new dxData({
            rest: 'productimages/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataProductCategory = new dxData({
            rest: 'productcategories/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataUser = new dxData({
            rest: 'users/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataCombinationImage = new dxData({
            rest: 'combinationimages/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })

        $scope.dxGridOptions = {
            dataSource: $scope.dxDataCatalog.dxDataProvider,
            allowColumnReordering: true,
            allowColumnResizing : true,
            columnChooser : {
                enabled : true,
            },

            export: {
                enabled: true,
                fileName: "Data Attribute Product"
            },
            columnFixing: {
                enabled: true
            },
            editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                mode: 'form'
            },
            paging: {
                pageSize: 20,
            },
            searchPanel: {
                visible: true
            },
            selection: {
                mode: 'single'
            },
            masterDetail: {
                enabled: true,
                template: function (container, info) {
                    var DSItem = new dxData({
                        rest: 'products/' + info.key.id + '/combinations/',
                        token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
                        useID: ['product'],
                    })
                    $('<div>Product : ' + info.key.name + '</div>').appendTo(container);
                    $('<div>').addClass("internal-grid").dxDataGrid({
                        dataSource: DSItem.dxDataProvider,
                        editing: {
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: true,
                            mode: 'row'
                        },
                        allowColumnReordering: true,
                        allowColumnResizing : true,
                        columnChooser : {
                            enabled : true,
                        },
                        columnFixing: {
                            enabled: true
                        },
                        columns: [
                            {
                                dataField: 'id',
                                caption: 'ID',
                                width: '50',
                                allowEditing: false,
                            },
                            {
                                dataField: 'name',
                                caption: 'Combination Name'
                            },
                            {
                                dataField: 'product',
                                caption: 'Product',
                                lookup: {
                                    dataSource: $scope.dxDataCatalog.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'name',
                                    allowClearing: true
                                },
                                visible : false,
                            },
                            {
                                dataField: 'ean13',
                                caption: 'EAN'
                            },
                            {
                                dataField: 'upc',
                                caption: 'UPC'
                            },
                            {
                                dataField: 'reference',
                                caption: 'Reference',
                                visible : false,
                            },
                            {
                                dataField: 'price',
                                caption: 'Price',
                                dataType: 'number'
                            },
                            {
                                dataField: 'wholesale',
                                caption: 'Whole Sale',
                                dataType: 'number'
                            },
                            {
                                dataField: 'impact_price',
                                caption: 'Impact Price',
                                dataType: 'number'
                            },
                            {
                                dataField: 'weight',
                                caption: 'Weight',
                                dataType: 'number'
                            },
                            {
                                dataField: 'impact_weight',
                                caption: 'Impact Weight',
                                dataType: 'number'
                            },
                            {
                                dataField: 'image',
                                editCellTemplate: function (container, options) {
                                    var div = document.createElement('div');
                                    container.get(0).appendChild(div);
                                    $(div).dxFileUploader({
                                        selectButtonText: "Select photo",
                                        labelText: "",
                                        accept: "image/*",
                                        uploadMode: "useButtons",
                                        name: 'upload',
                                        multiple: false,
                                        uploadUrl: $scope.dxDataCombinationImage.rest.one(options.row.key.id + '/').getRequestedUrl(),
                                    }).appendTo(container);
                                },
                                visible: false
                            },
                            {
                                dataField: 'created',
                                dataType: 'date',
                                format: 'dd/MM/yyyy',
                                allowFiltering: false,
                                editCellTemplate: function (container, options) {
                                    var div = document.createElement('div');
                                    container.get(0).appendChild(div);
                                    $(div).appendTo(container);
                                }
                            }
                        ]
                    }).appendTo(container);
                }
            },
            columns: [
                {
                    dataField: 'id',
                    caption: 'ID',
                    width: '50',
                    allowEditing: false,
                },
                {
                    dataField: 'name',
                    caption: 'Product Name'
                },
                {
                    dataField: 'category',
                    caption: 'Category',
                    lookup: {
                        dataSource: $scope.dxDataProductCategory.dxDataProvider.store(),
                        valueExpr: 'id',
                        displayExpr: 'name',
                        allowClearing: true
                    }
                },
                {
                    dataField: 'ean13',
                    caption: 'EAN'
                },
                {
                    dataField: 'upc',
                    caption: 'UPC'
                },
                {
                    dataField: 'reference',
                    caption: 'Reference'
                },
                {
                    dataField: 'image',
                    editCellTemplate: function (container, options) {
                        var div = document.createElement('div');
                        container.get(0).appendChild(div);
                        $(div).dxFileUploader({
                            selectButtonText: "Select photo",
                            labelText: "",
                            accept: "image/*",
                            uploadMode: "useButtons",
                            name: 'upload',
                            multiple: false,
                            uploadUrl: $scope.dxDataProductImage.rest.one(options.row.key.id + '/').getRequestedUrl(),
                            onValueChanged: function (value) {
                                options.value = value
                            }
                        }).appendTo(container);
                    },
                    visible: false
                },
                {
                    dataField: 'created',
                    dataType: 'date',
                    format: 'dd/MM/yyyy',
                    allowFiltering: false,
                    editCellTemplate: function (container, options) {
                        var div = document.createElement('div');
                        container.get(0).appendChild(div);
                        $(div).appendTo(container);
                    }
                }
            ],
            filterRow: {visible: true},
        };
    }])
    .controller('CCatalogCombination', ['$scope', 'dxData', function ($scope, dxData) {
        $scope.dxDataCatalog = new dxData({
            rest: 'combinations/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
            useID: ['product', 'creator',],
        })
        $scope.dxDataCombinationImage = new dxData({
            rest: 'combinationimages/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataProduct = new dxData({
            rest: 'products/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataUser = new dxData({
            rest: 'users/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataAttribute = new dxData({
            rest: 'productattributes/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataAttributeItem = new dxData({
            rest: 'productattributeitems/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })
        $scope.dxDataProduct = new dxData({
            rest: 'products/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })

        $scope.dxGridOptions = {
            dataSource: $scope.dxDataCatalog.dxDataProvider,
            allowColumnReordering: true,
            allowColumnResizing : true,
            columnChooser : {
                enabled : true,
            },

            export: {
                enabled: true,
                fileName: "Data Combination Product"
            },
            columnFixing: {
                enabled: true
            },
            editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                mode: 'form'
            },
            paging: {
                pageSize: 20,
            },
            searchPanel: {
                visible: true
            },
            selection: {
                mode: 'single'
            },
            masterDetail: {
                enabled: true,
                template: function (container, info) {
                    var DSItem = new dxData({
                        rest: 'combinations/' + info.key.id + '/attributes/',
                        token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
                        useID: ['attribute'],
                    })
                    $('<div>Combination : ' + info.key.name + '</div>').appendTo(container);
                    $('<div>').addClass("internal-grid").dxDataGrid({
                        dataSource: DSItem.dxDataProvider,
                        editing: {
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: true,
                            mode: 'row'
                        },
                        allowColumnReordering: true,
                        allowColumnResizing : true,
                        columnChooser : {
                            enabled : true,
                        },
                        columnFixing: {
                            enabled: true
                        },
                        columns: [
                            {
                                dataField: 'id',
                                caption: 'ID',
                                width: '50',
                                allowEditing: false,
                            },
                            {
                                dataField: 'combination',
                                caption: 'Combination',
                                lookup: {
                                    dataSource: $scope.dxDataCatalog.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'name',
                                    allowClearing: true
                                },
                                visible : false,
                            },
                            {
                                dataField: 'attribute',
                                caption: 'Attirbute',
                                lookup: {
                                    dataSource: $scope.dxDataAttribute.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'publicName',
                                    allowClearing: true
                                },
                            },
                            {
                                dataField: 'attributeItem',
                                caption: 'Item',
                                lookup: {
                                    dataSource: $scope.dxDataAttributeItem.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'name',
                                    allowClearing: true
                                },
                            },
                        ]
                    }).appendTo(container);
                }
            },
            columns: [
                {
                    dataField: 'id',
                    caption: 'ID',
                    width: '50',
                    allowEditing: false,
                },
                {
                    dataField: 'name',
                    caption: 'Combination Name'
                },
                {
                    dataField: 'product',
                    caption: 'Product',
                    lookup: {
                        dataSource: $scope.dxDataProduct.dxDataProvider.store(),
                        valueExpr: 'id',
                        displayExpr: 'name',
                        allowClearing: true
                    }
                },
                {
                    dataField: 'ean13',
                    caption: 'EAN'
                },
                {
                    dataField: 'upc',
                    caption: 'UPC'
                },
                {
                    dataField: 'reference',
                    caption: 'Reference'
                },
                {
                    dataField: 'price',
                    caption: 'Price',
                    dataType: 'number'
                },
                {
                    dataField: 'wholesale',
                    caption: 'Whole Sale',
                    dataType: 'number'
                },
                {
                    dataField: 'impact_price',
                    caption: 'Impact Price',
                    dataType: 'number'
                },
                {
                    dataField: 'weight',
                    caption: 'Weight',
                    dataType: 'number'
                },
                {
                    dataField: 'impact_weight',
                    caption: 'Impact Weight',
                    dataType: 'number'
                },
                {
                    dataField: 'image',
                    editCellTemplate: function (container, options) {
                        var div = document.createElement('div');
                        container.get(0).appendChild(div);
                        $(div).dxFileUploader({
                            selectButtonText: "Select photo",
                            labelText: "",
                            accept: "image/*",
                            uploadMode: "useButtons",
                            name: 'upload',
                            multiple: false,
                            uploadUrl: $scope.dxDataCombinationImage.rest.one(options.row.key.id + '/').getRequestedUrl(),
                        }).appendTo(container);
                    },
                    visible: false
                },
                {
                    dataField: 'created',
                    dataType: 'date',
                    format: 'dd/MM/yyyy',
                    allowFiltering: false,
                    editCellTemplate: function (container, options) {
                        var div = document.createElement('div');
                        container.get(0).appendChild(div);
                        $(div).appendTo(container);
                    }
                }
            ],
            filterRow: {visible: true},
        };

    }])
    .controller('CCatalogPromotion', ['$scope', function ($scope) {
        console.info('CCatalogPromotion');
    }])
    .controller('CCatalogAttribute', ['$scope', 'dxData', function ($scope, dxData) {
        $scope.dxDataAttribute = new dxData({
            rest: 'productattributes/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
            useID: ['product', 'creator',],
        })

        $scope.dxGridOptions = {
            dataSource: $scope.dxDataAttribute.dxDataProvider,
            allowColumnReordering: true,
            allowColumnResizing : true,
            columnChooser : {
                enabled : true,
            },

            export: {
                enabled: true,
                fileName: "Data Attribute Product"
            },
            columnFixing: {
                enabled: true
            },
            editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                mode: 'form'
            },
            paging: {
                pageSize: 20,
            },
            searchPanel: {
                visible: true
            },
            selection: {
                mode: 'single'
            },
            masterDetail: {
                enabled: true,
                template: function (container, info) {
                    var DSItem = new dxData({
                        rest: 'productattributes/' + info.key.id + '/items/',
                        token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
                        useID: ['attribute'],
                    })
                    $('<div>Attribute : ' + info.key.publicName + '</div>').appendTo(container);
                    $('<div>').addClass("internal-grid").dxDataGrid({
                        dataSource: DSItem.dxDataProvider,
                        editing: {
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: true,
                            mode: 'row'
                        },
                        allowColumnReordering: true,
                        allowColumnResizing : true,
                        columnChooser : {
                            enabled : true,
                        },
                        columnFixing: {
                            enabled: true
                        },
                        columns: [
                            {
                                dataField: 'id',
                                caption: 'ID',
                                width: '50',
                                allowEditing: false,
                            },
                            {
                                dataField: 'attribute',
                                caption: 'Attribute',
                                lookup: {
                                    dataSource: $scope.dxDataAttribute.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'publicName',
                                    allowClearing: true
                                }
                            },
                            {
                                dataField: 'name',
                                caption: 'Name',
                            },
                            {
                                dataField: 'position',
                                caption: 'Position',
                            },
                        ]
                    }).appendTo(container);
                }
            },
            columns: [
                {
                    dataField: 'id',
                    caption: 'ID',
                    width: '50',
                    allowEditing: false,
                },
                {
                    dataField: 'name',
                    caption: 'Attribute Name'
                },
                {
                    dataField: 'publicName',
                    caption: 'Public Name',
                },
                {
                    dataField: 'type',
                    caption: 'Type'
                },
            ],
            filterRow: {visible: true},
        };
    }])
    .controller('CCatalogCategory', ['$scope', 'dxData', function ($scope, dxData) {
        $scope.dxDataProductCategory = new dxData({
            rest: 'productcategories/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
        })

        $scope.dxGridOptions = {
            dataSource: $scope.dxDataProductCategory.dxDataProvider,
            editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                mode: 'form'
            },
            paging: {
                pageSize: 20,
            },
            searchPanel: {
                visible: true
            },
            selection: {
                mode: 'single'
            },
            columns: [
                {
                    dataField: 'id',
                    caption: 'ID',
                    width: '50'
                },
                {
                    dataField: 'name',
                    caption: 'Category Name'
                },
            ],
            filterRow: {visible: true},
        };
    }])
    .controller('CCatalogPrice', ['$scope', function ($scope) {
        console.info('CCatalogPrice');
    }])