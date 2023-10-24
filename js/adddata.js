
var app = angular.module('myApp', []);

app.controller('ProductController', function ($scope, $http) {
    $scope.products = [];
    $scope.objNewUser = {};

    function getUsers() {
        $http
            .get('http://149.28.139.16/api/product?search&page=' + $scope.currentPage + '&size=' + $scope.pageSize)
            .then(function (response) {
                $scope.products = response.data.data;
            })
            .catch(function (error) {
                console.log("Error fetching users:", error);
            });
    }
    getUsers();

    // Create a new user
    $scope.createUser = function () {
        var confirmAdd = window.confirm("Are you sure you want to add this product?");
    
        if (confirmAdd) {
            $http
                .post("http://149.28.139.16/api/product/", $scope.objNewUser)
                .then(function (response) {
                    getUsers(); // Refresh the product list
    
                    $scope.objNewUser = {};
    
                    // Add SweetAlert for success notification
                    Swal.fire({
                        title: 'Success',
                        text: 'Product added successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                })
                .catch(function (error) {
                    console.log("Error creating product:", error);
    
                    // Add SweetAlert for error notification
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to add the product.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                });
        }
    };
    // 

});
// var app = angular.module('myApp', []);
//         app.controller('ProductController', function($scope, $http) {
//             $scope.products = [];
//             $scope.objNewUser = {};

//             function getUsers() {
//             $http
//                 .get('http://149.28.139.16/api/product?search&page=' + $scope.currentPage + '&size=' + $scope.pageSize)
//                 .then(function (response) {
//                 $scope.products = response.data.data;
//                 })
//                 .catch(function (error) {
//                 console.log("Error fetching users:", error);
//                 });
//             }
//             getUsers();
//             //create a new user
//             $scope.createUser = function () {
//             $http
//                 .post("http://149.28.139.16/api/product/", $scope.objNewUser)
//                 .then(function (response) {
//                 getUsers(); // Refresh the user list
//                 $scope.objNewUser = {};
//                 })
//                 .catch(function (error) {
//                 console.log("Error creating user:", error);
//                 });
//             };
            
//         });