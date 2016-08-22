var app = angular.module('MagicButton', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.meal ={
    name: "",
    tags: [],
    instructions: "",
    ingredients: []
  };
  $scope.allMeals = [];
  $scope.quantDefault = 5;
  $scope.myMeals = [];

  $scope.planMeals = function(allMeals, quant) {
    // checking to see if they passed in a quantity of meals
    if (!quant) {
      // if there are fewer than 5 meals total in their meals array...
      if (allMeals.length < 5) {
        // ... then set their quant to how many meals they have available
        var quant = allMeals.length;
        // else...
      } else {
        // ... set quant to our default of 5
        var quant = $scope.quantDefault;
      }
    }
    // looping over our meals while quant is greater than 0
    while (quant > 0) {
      // ran randomly selects an index from our meals array
      var ran = Math.floor(Math.random() * allMeals.length);
      // pushing the selected meal to our myMeals array
      $scope.myMeals.push(allMeals[ran]);
      // removing the selected meal from our allMeals array, to avoid duplicates
      allMeals.splice(ran, 1);
      // decrementing quant, so our while loop won't crash the browser
      quant -= 1;
    }
  };
}]);