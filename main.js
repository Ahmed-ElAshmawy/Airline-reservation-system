angular.module("Mymodel", ["ngRoute"]);
angular.module("Mymodel").config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/", {
        templateUrl: "home.html",
        controller: "homeCtrl"
    }).when("/tickets", {
        templateUrl: "tickets.html",
        controller: "ticketsCtrl"
    }).when("/complain", {
        templateUrl: "complain.html",
        controller: "complainCtrl"
    }).when("/modal/:n/:em/:p/:c", {
        templateUrl: "modal.html",
        controller: "modalCtrl"
    }).when("/complain/:n/:em/:p/:c", {
        templateUrl: "complain.html",
        controller: "complainCtrl"
    }).otherwise({
        redirectTo: "/"
    });
    $locationProvider.hashPrefix('');
});

angular.module("Mymodel").controller("homeCtrl", function ($scope, $location, $routeParams) {
    function CarouselDemoCtrl($scope) {
        $scope.myInterval = 3000;
        $scope.slides = [
            {
                image: 'http://lorempixel.com/400/200/'
            },
            {
                image: 'http://lorempixel.com/400/200/food'
            },
            {
                image: 'http://lorempixel.com/400/200/sports'
            },
            {
                image: 'http://lorempixel.com/400/200/people'
            }
        ];
    }
    $scope.prev = function () {
        $("#myCarousel").carousel("prev");
    }
    $scope.next1 = function () {
        $("#myCarousel").carousel("next");
    }
});

angular.module("Mymodel")
    .controller("ticketsCtrl", function ($scope, $http, $filter) {
        $scope.data = "";
        function getdata() {
            $http.get("http://localhost:3000/")
                .then(function (response) {
                    $scope.data = response.data;
                }, function (err) { console.log(err); });
        }
        getdata();
        $scope.flag = "+";
        $scope.sorttable = function (patrn) {
            if ($scope.flag == "+") {
                $scope.flag = "-"
            } else {
                $scope.flag = "+"
            }
            patrn = $scope.flag + patrn
            $scope.data = $filter("orderBy")($scope.data, patrn);
        }
        $scope.details = function (d) {
            $scope.info = d;
        }
        $scope.NO = $scope.n = $scope.f = $scope.t = $scope.ti = $scope.p = "";
        $scope.update = function (d) {
            $('#upform').trigger("reset");
            $scope.detials = d;
        }
        $scope.add = function () {
            $http.post("http://localhost:3000/add/", $("#addingform").serialize(), {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            });
            getdata();
        }
        $scope.delete = function (no) {
            $http.get("http://localhost:3000/deletdata/" + no);
            getdata();
        }
        $scope.changestate = function (d) {
            $http.get("http://localhost:3000/changestate/" + d.no + "/" + d.status[0]);
            location.reload();
        }
        $scope.updateticket = function () {
            $http.post("http://localhost:3000/updateticket/", $("#upform").serialize(), {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            });
            getdata();
        }
        $scope.reset = function () {
            $scope.NO = $scope.n = $scope.f = $scope.t = $scope.ti = $scope.p = "";
        }
    });

angular.module("Mymodel")
    .controller("complainCtrl", function ($scope, $location, $routeParams) {
        $scope.n = "";
        $scope.em = "";
        $scope.p = "";
        $scope.c = "";
        $scope.redirect = function () {
            $location.path("/modal/" + $scope.n + "/" + $scope.em + "/" + $scope.p + "/" + $scope.c)
        }
        $scope.n = $routeParams.n;
        $scope.em = $routeParams.em;
        $scope.p = $routeParams.p;
        $scope.c = $routeParams.c;
    });
angular.module("Mymodel")
    .controller("modalCtrl", function ($scope, $routeParams, $location) {
        $scope.n = $routeParams.n;
        $scope.em = $routeParams.em;
        $scope.p = $routeParams.p;
        $scope.c = $routeParams.c;

        $scope.close = function () {
            $("#myModalcom").hide();
            $location.path("/");
        }
        $scope.modify = function () {
            $location.path("/complain/" + $scope.n + "/" + $scope.em + "/" + $scope.p + "/" + $scope.c)
        }
    });