'use strict';

var appModule = angular.module('searchApp').controller('searchController', ["$scope", "$rootScope", "$http", "$location",

    function($scope, $rootScope, $http, $location) {
        // $("a[href='http://chemwriter.com/plans/']").remove();

        $scope.docData = [];
        $scope.gridOptions = {
            data: 'docData',
            selectedItems: $scope.selections,
            enableRowSelection: true,
            multiSelect: true,
            enableRowReordering: false,
            enableColumnResize: true,
            enableColumnReordering: true,
            enableSorting: true,
            virtualizationThreshold: 20,
            showColumnMenu: true,
            enableCellSelection: false,
            enableCellEdit: false,
            showGroupPanel: true,
            pageSizes: [30, 60, 120, 240],
            enablePaging: true,
            enablePinning: true,
            showFooter: true,
            footerRowHeight: 100,
            //page Sizes
            pageSize: 250,
            //Size of Paging data
            currentPage: 1,
            //what page they are currently on
            columnDefs: [{
                field: "no",
                displayName: '序号'
            }, {
                field: "cn_name",
                displayName: '商品中文名称',
            }, {

                field: "en_name",
                displayName: 'English Name'
            }, {
                field: "CAS",
                displayName: 'CAS'
            }, {
                field: "standard",
                displayName: '规格',
            }, {
                field: "box",
                displayName: '包装',
            }, {
                field: "brand",
                displayName: '品牌',
            }, {
                field: "price",
                displayName: '价格',
            }, {
                field: "reserve",
                displayName: '库存',
                visible: false

            }, {
                field: "reserve_place",
                displayName: '库存地',
                visible: false

            }, {
                field: "buy_category",
                displayName: '采购类别',
                visible: false

            }, {
                field: "arrival_time",
                displayName: '预计到货时间',
                visible: false

            }, {
                field: "MDL",
                displayName: 'MDL',
                visible: false

            }, {
                field: "buy_record",
                displayName: '购买记录',
                visible: false

            }, {
                field: "oprator",
                displayName: '操作',
                visible: false

            }, {
                field: "encode",
                displayName: '商品编码',
                visible: false

            }, {
                field: "isReserve",
                displayName: '是否备库',
                visible: false

            }, {
                field: "item_list",
                displayName: '商品目录',
                visible: false

            }, {
                field: "org_code",
                displayName: '原厂商品编码',
                visible: false

            }, {
                field: "proxy_code",
                displayName: '代理商商品编码',
                visible: false

            }, {
                field: "character",
                displayName: '化合物性质',
                visible: false
            }]
        };
        var that = this;

        $scope.doSearch = function() {
            var mol = getMolfile();

            $http({
                url: "/search",
                method: "POST",
                data: {
                    CAS: $scope.queryString,
                    name: $scope.queryString,
                    mol: mol
                }
            }).success(function(data, status, headers, config) {
                $scope.docData = data;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                window.open('search/result.html',"1231");
            }).error(function(data, status, headers, config) {
                $scope.status = status;
                    window.open('search/result.html',status);
            });
        };
    }
]);



function getKetcher() {
    var frame = null;

    if ('frames' in window && 'ketcherFrame' in window.frames)
        frame = window.frames['ketcherFrame'];
    else
        return null;

    if ('window' in frame)
        return frame.window.ketcher;
}

function getSmiles() {
    var ketcher = getKetcher();

    if (ketcher)
        return ketcher.getSmiles();
    else
        return null;
}

function getMolfile() {
    var ketcher = getKetcher();

    if (ketcher)
        if(ketcher.getSmiles() === ""){
            return null;
        }
        else{
            return ketcher.getMolfile();
        }
    else
        return null;
}