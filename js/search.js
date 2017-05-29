app.filter('orderBySum', function() {
    return function (arr1, sortBool) {

        var resaltArr1 = [];

        function compareAge(itemA, itemB) {
            if (sortBool) {
                return itemA.sum - itemB.sum;
            } else {
                return itemB.sum - itemA.sum;
            }
        }

        arr1.sort(compareAge);

        for(var i = 0; i < arr1.length; i++) {
            resaltArr1.push(arr1[i]);
        }

        return resaltArr1;
    }
});

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }

        var result = [];

        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.name.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
        });

        return result;
    };
});

app.filter('searchForSum', function(){
    return function(arr, searchString){
        var sumAllItem = 0;

        if(!searchString){
            angular.forEach(arr, function(item){
                sumAllItem += item.sum * 1;
            });
            return sumAllItem;
        }

        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.name.toLowerCase().indexOf(searchString) !== -1){
                sumAllItem += item.sum * 1;
            }
        });

        return sumAllItem;
    };
});