var app = angular.module("myApp", []);
app.controller("ProductController", function ($scope, $http) {
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.totalPage = 0;
  $scope.products = [];
  $scope.objNewUser = {};
  $scope.objEditedUser = {};

  $scope.getProducts = function () {
    var apiUrl =
      "http://149.28.139.16/api/product?search&page=" +
      $scope.currentPage +
      "&size=" +
      $scope.pageSize;

    $http
      .get(apiUrl)
      .then(function (response) {
        $scope.products = response.data.data;
        $scope.totalPage = response.data.totalPages;
      })
      .catch(function (error) {
        console.error("Error fetching data: ", error);
      });
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPage - 1) {
      $scope.currentPage++;
      $scope.getProducts();
    }
  };

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getProducts();
    }
  };

  $scope.getProducts();

  function getUsers() {
    $http
      .get(
        "http://149.28.139.16/api/product?search&page=" +
          $scope.currentPage +
          "&size=" +
          $scope.pageSize
      )
      .then(function (response) {
        $scope.products = response.data.data;
      })
      .catch(function (error) {
        console.log("Error fetching users:", error);
      });
  }
  getUsers();

  //create a new user
  $scope.createUser = function () {
    $http
      .post("http://149.28.139.16/api/product/", $scope.objNewUser)
      .then(function (response) {
        getUsers(); // Refresh the user list
        $scope.objNewUser = {};
      })
      .catch(function (error) {
        console.log("Error creating user:", error);
      });
  };

  // Update User
  $scope.onClickeditUser = function (user) {
    $scope.objEditedUser = angular.copy(user);
    return $scope.objEditedUser;
  };
  //Edit the user
  $scope.updateUser = function () {
    $http.put("http://149.28.139.16/api/product", $scope.objEditedUser).then(
      function (response) {
        var index = $scope.listUsers.findIndex(function (user) {
          return user.id === $scope.objEditedUser.id;
        });
        if (index !== -1) {
          $scope.listUsers[index] = angular.copy($scope.objEditedUser);
        }
        // Reset the current user and edit mode
        $scope.objEditedUser = {};
      },
      function (error) {
        console.log("Error updating user:", error);
      }
    );
  };
  // Function to cancel the edit operation
  $scope.onClickCancelEdit = function () {
    $scope.objEditedUser = {};
  };

  // delete a user
  $scope.onClickDeleteUser = function (user) {
    var confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      $http
        .delete("http://149.28.139.16/api/product/" + user.id)
        .then(function (response) {
          getUsers();
        })
        .catch(function (error) {
          console.log("Error deleting user:", error);
        });
    }
  };
  // 
  $scope.viewProduct = function (productId) {
    $http.get('http://149.28.139.16/api/product/' + productId)
        .then(function (response) {
            $scope.selectedProduct = response.data.data;
            $('#productModal').modal('show');
        })
        .catch(function (error) {
            console.log("Error fetching product by ID:", error);
        });
};
});
