angular.module('meme', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.memes = [];
    $scope.addMeme = function() {
      var newmeme = {title:$scope.memeTitle,url:$scope.memeUrl,upvotes:0};
      $scope.memeTitle='';
      $scope.memeUrl='';
      $http.post('/memes', newmeme).success(function(data){
        $scope.memes.push(data);
      });
    };
    $scope.upvote = function(meme) {
      return $http.put('/memes/' + meme._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          meme.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(meme) {
	  $scope.upvote(meme);
    };
    $scope.getAll = function() {
      return $http.get('/memes').success(function(data){
        angular.copy(data, $scope.memes);
      });
    };
    $scope.getAll();
    $scope.delete = function(meme) {
      $http.delete('/memes/' + meme._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
  }
]);
