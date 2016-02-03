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
		'$http', '$scope', 'GifphyService',
		function($http, $scope, gifphy) {
			$scope.greeting = 'Hiiiii';


			$http.get(
				'https://api.giphy.com/v1/gifs/search',
				{
					params: {
						q: 'cat',
						api_key: 'dc6zaTOxFJmzC',
						limit: '10',
						offset: '0'
					}
				}
			)
			.then(function(response) {
				$scope.data = response.data;
			});

			gifphy.search();
		}
	];

	//SERVICE
	var GifphyService = [
		'GIFPHY_API',
		function(API) {
			function search() {
				console.log(API.host);
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