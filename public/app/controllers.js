angular.module('MagicCtrls', ['MagicServices'])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      alert('An error occurred');
      console.log(data);
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $location.path('/users/home');
    }, function error(res) {
      alert('An error occurred. Please make sure email and password are correct and try again.');
      $location.path('/login');
    });
  };
}])
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;

  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  };
}])
.controller('NewMealCtrl', ['$scope', '$location', 'Meal', function($scope, $location, Meal) {
  $scope.meal = {
    name: '',
    tags: [],
    published: '',
    ingredients: []
  };

  $scope.createMeal = function() {
    Meal.save($scope.meal, function success(data) {
      $location.path('/users/:id');
    }, function error(data) {
      alert('An error occurred');
      $location.path('/users/:id');
    });
  };
}])
.controller('ShowMealCtrl', ['$scope', '$stateParams', 'Meal', function($scope, $stateParams, Meal) {
  $scope.meal = {};

  Meal.get({ id: $stateParams.id }, function success(data) {
    $scope.meal = data;
  }, function error(data) {
    alert('An error occurred');
    console.log(data);
  });
}])
.controller('MealPlanCtrl', ['$scope', function($scope) {
  $scope.allMeals = [];
  $scope.myMeals = [];
  var quantDefault = 5;

  $scope.planMeals = function(allMeals, quant) {
    if (!quant) {
      if (allMeals.length < 5) {
        var quant = allMeals.length;
      } else {
        var quant = quantDefault;
      }
    }
    while (quant > 0) {
      // ran randomly selects an index from our meals array
      var ran = Math.floor(Math.random() * allMeals.length);
      // pushing the selected meal to our myMeals array
      $scope.myMeals.push(allMeals[ran]);
      // removing the selected meal from our allMeals array, to avoid duplicates
      allMeals.splice(ran, 1);
      quant -= 1;
    }
  };
}]);