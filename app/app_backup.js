'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('apotekApp', [
    'dx',
    'ngRoute',
    'route-segment',
    'view-segment',
    'app.main',
    'app.catalog',
    'app.inventory',
]).config(function ($routeSegmentProvider, $routeProvider) {

        // Configuring provider options
        $routeSegmentProvider.options.autoLoadTemplates = true;

        $routeSegmentProvider
            .when('/login', 'login')
            .when('/logout', 'logout')
            .when('/overview', 'main.overview')

            .when('/inventory', 'main.inventory')
            .when('/inventory/summary', 'main.inventory.summary')
            .when('/inventory/procurement', 'main.inventory.procurement')
            .when('/inventory/inventory', 'main.inventory.inventory')

            .when('/catalog', 'main.catalog')
            .when('/catalog/product', 'main.catalog.product')
            .when('/catalog/combination', 'main.catalog.combination')
            .when('/catalog/promotion', 'main.catalog.promotion')
            .when('/catalog/attribute', 'main.catalog.attribute')
            .when('/catalog/category', 'main.catalog.category')
            .when('/catalog/price', 'main.catalog.price')

            .when('/reference', 'main.reference')
            .when('/reference/territory', 'main.reference.territory')
            .when('/reference/branch', 'main.reference.branch')

            .when('/catalog', 'main.catalog')
            .when('/catalog/add', 'main.catalogAdd')
            .when('/catalog/detail', 'main.catalogDetail')
            .when('/register', 'main.register')
            .when('/admin', 'main.admin')
            .when('/admin/ticket-category', 'main.admin.ticket_category')
            .when('/admin/user-management', 'main.admin.user_management')
            .when('/admin/role', 'main.admin.role')
            .segment('main', {
                templateUrl: 'partial/main.html',
                controller: 'CMain'
            })
            .within()
            .segment('overview', {
                templateUrl: 'partial/overview.html',
                controller: 'COverview'
            })
            /** INVENTORY */
            .segment('inventory', {
                templateUrl: 'partial/VInventory.html',
                controller: 'CInventory'
            })
            .within()
            .segment('summary', {
                default: true,
                templateUrl: 'partial/VInventorySummary.html',
                controller: 'CInventorySummary',
            }).segment('procurement', {
                templateUrl: 'partial/VInventoryProcurement.html',
                controller: 'CInventoryProcurement',
            }).segment('inventory', {
                templateUrl: 'partial/VInventoryInventory.html',
                controller: 'CInventoryInventory',
            })
            .up()
            /** CATALOG */
            .segment('catalog', {
                templateUrl: 'partial/VCatalog.html',
                controller: 'CCatalog'
            })
            .within()
            .segment('product', {
                default: true,
                templateUrl: 'partial/VCatalogProduct.html',
                controller: 'CCatalogProduct',
            }).segment('combination', {
                templateUrl: 'partial/VCatalogCombination.html',
                controller: 'CCatalogCombination',
            }).segment('promotion', {
                templateUrl: 'partial/VCatalogPromotion.html',
                controller: 'CCatalogPromotion',
            }).segment('attribute', {
                templateUrl: 'partial/VCatalogAttribute.html',
                controller: 'CCatalogAttribute',
            }).segment('category', {
                templateUrl: 'partial/VCatalogCategory.html',
                controller: 'CCatalogCategory',
            }).segment('price', {
                templateUrl: 'partial/VCatalogPrice.html',
                controller: 'CCatalogPrice',
            })
            .up()
            /** REFERENCE */
            .segment('reference', {
                templateUrl: 'partial/VReference.html',
                controller: 'CReference'
            })
            .within()
            .segment('territory', {
                default: true,
                templateUrl: 'partial/VReferenceTerritory.html',
                controller: 'CReferenceTerritory',
            }).segment('branch', {
                templateUrl: 'partial/VReferenceBranch.html',
                controller: 'CReferenceBranch',
            })
            .up()
            .segment('admin', {
                templateUrl: 'partial/admin.html',
                controller: 'AdminController'
            })
            .within()
                .segment('ticket_category', {
                    default: true,
                    templateUrl: 'pages/admin/ticket_category/page.html',
                    controller: 'TicketCategoryController',
                }).segment('user_management', {
                    default: true,
                    templateUrl: 'pages/admin/user_management/page.html',
                    controller: 'UserManagementController',
                }).segment('role', {
                        default: true,
                        templateUrl: 'pages/admin/role/page.html',
                        controller: 'RoleController',
                })
                .up().up()
                .segment('login', {
                    templateUrl: 'partial/login.html',
                    controller: 'LoginController'
                })
                .segment('logout', {
                    templateUrl: 'partial/logout.html',
                    controller: 'LogoutController'
                })
            ;

        $routeProvider.otherwise({redirectTo: '/overview'});
    });

