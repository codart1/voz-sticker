function initBox(angular, element, other) {


	var GIFPHY_API = {
		host: 'https://api.giphy.com/',
		apiKey: 'dc6zaTOxFJmzC',

		path: {
			search: 'v1/gifs/search'
		}
	};

	//CONTROLLERS
	var MainController = [
		'$scope', 'GifphyService',
		function($scope, gifphy) {
			var ip = $scope.inputs = {
				search: 'asd'
			};

			$scope.onSearch = function() {
				gifphy.search(ip.search, 2, function(response) {
					$scope.data = response.data;
				});
			}

			$scope.addToEditor = function(item) {
				other.addImgTag(item.images.original.url);
			}

		}
	];

	//SERVICE
	var GifphyService = [
		'GIFPHY_API',
		'$http',
		function(API, $http) {
			function search(q, page, success, fail) {
				var config = {
					params: {
						q: q,
						api_key: API.apiKey,
						limit: '12',
						offset: '0'
					}
				};

				$http.get( API.host + API.path.search, config )
				.then(function(response) {
					success(response);
				});
			}

			return {
				search: search
			};
		}
	];

	//DEFINE COMPONENT:
	var app = angular.module('demo', [])
		.controller('MainController', MainController)

		.factory('GifphyService', GifphyService)

		.constant('GIFPHY_API', GIFPHY_API);

	angular.bootstrap(element, ['demo']);
}