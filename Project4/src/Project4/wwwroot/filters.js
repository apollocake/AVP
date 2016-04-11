//myapp.filter('nameFilter', function () {
//    return function (todos, criteria) {
//        var filterResult = new Array();
//        if (!criteria)
//            return todos;

//        for (index in todos) {
//            if (todos[index].boy.name.indexOf(criteria) != -1)
//                filterResult.push(todos[index]);
//        }
//        console.log(filterResult);
//        return filterResult;
//    }
//});
//myapp.filter('nameFilter', function () {
//    return function (todos, criteria) {
//        var filterResult = new Array();
//        if (!criteria)
//            return todos;

//        for (index in todos) {
//            for()
//            if (todos[index].boy.name.indexOf(criteria) != -1)
//                filterResult.push(todos[index]);
//        }
//        console.log(filterResult);
//        return filterResult;
//    }
//});
(function () {
angular
    .module('app')
    .filter('switch', function () { 
        return function (input, map) {
            return map[input] || '';
        };

    });
})();
