var app = angular.module("app", []);

app.controller("MyController", function ($scope) {
 	
  $scope.items = [];
  $scope.comments = [];
  $scope.name = "";
  $scope.index = "";
  $scope.showIndex="";

//=========== check  local storage and add  items to array ===============

(function () { 	
  if (localStorage.length != 0) {
    for (var i = 0; i < localStorage.length; i++) {
 	  $scope.items.push( JSON.parse(localStorage.getItem(localStorage.key(i))));
 	}
  }
}());

//====================== item constructor ================================

function Item(name) {
  this.name = name;
  this.comments = [];
  this.show = false; // value for show/hide red left border of active item 
}

Item.prototype.addComment = function(text) {
  this.comments.push(text);
};

//========================methods=========================================

$scope.addItem = function(name) {
  if (!name){
    return;
  }

  var item = new Item(name);//create new item object
 
  $scope.items.push({
  	show     : item.show,
  	name     : item.name,
  	comments : item.comments
  });

  localStorage.setItem(name,JSON.stringify(item));//write to local storage
  $scope.name = "";// clear input
};


$scope.deleteItem = function() {	
  $scope.items.splice(this.$index,1);
 
  // check if this item was showed on display
  if (this.item.comments === $scope.comments) {
    $scope.comments="";//clear comments from display
 	$scope.showIndex = false;// hide index value from display
  }

  // find and remove object from local storage
  localStorage.removeItem(this.item.name);
};


$scope.showComments = function() {
  //==reset previously checked item================
  for (var i=0; i <$scope.items.length; i++) {
    $scope.items[i].show = false;
  }

  $scope.comments=this.item.comments;
  $scope.index=this.$index;
  this.item.show = true;//== show red left border of active item 
  $scope.showIndex=true;//== show index at comments panel 
};


$scope.addComment = function(text) {
  if (event.keyCode === 13) {
    if (!text) {
 	  return;
 	}
 					 	
    $scope.comments.push(text);
    $scope.text = "";

    // prepare object to local storage
    var obj = { 
      name : $scope.items[this.index].name,
      comments: $scope.items[this.index].comments
    }; 
    // convert to JSON
    var serialObj=JSON.stringify(obj);
    //write to local storage
	localStorage.setItem($scope.items[this.index].name, serialObj);
  }
};
	

});