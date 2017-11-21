angular.module('app.inventory',['app.main'])
    .controller('CInventory', function ($scope) {
        console.info('CInventory');
    })
    .controller('CInventorySummary', function ($scope) {
        console.info('CInventorySummary');
    })
    .controller('CInventoryProcurement', function ($scope) {
        console.info('CInventoryProcurement');
    })
    .controller('CInventoryInventory', function ($scope) {
        console.info('CInventoryInventory');
    })
    .controller('CInventoryGroup', function ($scope, dxData) {
        $scope.dxDataCategory = new dxData({
            rest: 'vendor/categories/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
            useID: [],
        })

        $scope.dxGridOptions = {
            dataSource: $scope.dxDataCategory.dxDataProvider,
            allowColumnReordering: true,
            allowColumnResizing : true,
            columnChooser : {
                enabled : true,
            },

            export: {
                enabled: true,
                fileName: "Data Vendor Group"
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
            columns: [
                {
                    dataField: 'id',
                    caption: 'ID',
                    width: '50',
                    allowEditing: false,
                },
                {
                    dataField: 'name',
                    caption: 'Group'
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
    })
    .controller('CInventoryVendor', function ($scope, dxData) {
        $scope.dxDataHeader = new dxData({
            rest: 'vendor/headers/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
            useID: [],
        })
        $scope.dxDataCategory = new dxData({
            rest: 'vendor/categories/',
            token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
            useID: [],
        })

        $scope.dxGridOptions = {
            dataSource: $scope.dxDataHeader.dxDataProvider,
            allowColumnReordering: true,
            allowColumnResizing : true,
            columnChooser : {
                enabled : true,
            },
            scrolling: {
                preloadEnabled : true,
            },
            onRowExpanding : function (instance) {
                instance.component.repaint();
            },
            export: {
                enabled: true,
                fileName: "Data Vendor"
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
                        rest: 'vendor/headers/' + info.key.id + '/addresses/',
                        token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
                        useID: [],
                    })
                    $('<div>Header : ' + info.key.name + '</div>').appendTo(container);
                    $('<div>').addClass("internal-grid-container").dxDataGrid({
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
                                dataField: 'header',
                                caption: 'Vendor Header',
                                lookup: {
                                    dataSource: $scope.dxDataHeader.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'name',
                                    allowClearing: true
                                },
                            },
                            {
                                dataField: 'telephone',
                                caption: 'Telephone',
                                editCellTemplate: function (container, options) {
                                    var div = document.createElement('div');
                                    container.get(0).appendChild(div);
                                    $(div).dxTextBox({
                                        mask: "(000) 000 0000",
                                        onValueChanged: function(e) { options.setValue(e.value); },
                                        value: options.value,
                                        valueChangeEvent: 'keyup'
                                    }).appendTo(container);
                                },
                            },
                            {
                                dataField: 'fax',
                                caption: 'Fax',
                                editCellTemplate: function (container, options) {
                                    var div = document.createElement('div');
                                    container.get(0).appendChild(div);
                                    $(div).dxTextBox({
                                        mask: "(000) 000 0000",
                                        onValueChanged: function(e) { options.setValue(e.value); },
                                        value: options.value,
                                        valueChangeEvent: 'keyup'
                                    }).appendTo(container);
                                },
                            },
                            {
                                dataField: 'email',
                                caption: 'Email',
                            },
                            {
                                dataField: 'cpName',
                                caption: 'Contact Person',
                            },
                            {
                                dataField: 'cpTelephone',
                                caption: 'CP Telp.',
                            },
                            {
                                dataField: 'cpEmail',
                                caption: 'CP Email',
                            },
                            {
                                dataField: 'address',
                                caption: 'Address',
                            },
                            {
                                dataField: 'cityName',
                                caption: 'City',
                            },
                        ]
                    }).appendTo(container);

                    var DSItem2 = new dxData({
                        rest: 'vendor/headers/' + info.key.id + '/vendors/',
                        token: '4OrAp2dhkJWI0QqEclugsSs5utlRTj',
                        useID: [],
                    })
                    $('<div>').addClass("internal-grid-container").dxDataGrid({
                        dataSource: DSItem2.dxDataProvider,
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
                                dataField: 'header',
                                caption: 'Vendor Header',
                                lookup: {
                                    dataSource: $scope.dxDataHeader.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'name',
                                    allowClearing: true
                                },
                            },
                            {
                                dataField: 'group',
                                caption: 'Group',
                                lookup: {
                                    dataSource: $scope.dxDataCategory.dxDataProvider.store(),
                                    valueExpr: 'id',
                                    displayExpr: 'name',
                                    allowClearing: true
                                },
                            },
                            {
                                dataField: 'name',
                                caption: 'Vendor',
                            },
                            {
                                dataField: 'freezFlag',
                                caption: 'Freez',
                                dataType : 'boolean',
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
                    caption: 'Header Name'
                },
                {
                    dataField: 'npwp',
                    caption: 'NPWP',
                    editCellTemplate: function (container, options) {
                        var div = document.createElement('div');
                        container.get(0).appendChild(div);
                        $(div).dxTextBox({
                            mask: "00.000.000.0-000.000",
                            onValueChanged: function(e) { options.setValue(e.value); },
                            value: options.value,
                            valueChangeEvent: 'keyup'
                        }).appendTo(container);
                    },
                },
                {
                    dataField: 'validFlag',
                    caption: 'Valid',
                    dataType : 'boolean',
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
    })
