function initBox(angular, element) {
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
				search: ''
			};

			$scope.onSearch = function() {
				gifphy.search(ip.search, 2, function(response) {
					$scope.data = response.data;
				});
			}

		}
	];

	//SERVICE
	var GifphyService = [
		'GIFPHY_API',
		'$http',
		function(API, $http) {
			function search(q, page, success, fail) {
				$http.get(
					'https://api.giphy.com/v1/gifs/search',
					{
						params: {
							q: q,
							api_key: 'dc6zaTOxFJmzC',
							limit: '10',
							offset: '0'
						}
					}
				)
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