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

	var TabController = [
		'$scope', 'StatesManager',
		function($scope, stateManager) {
			$scope.sm = stateManager;
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

	var TabsManager = [
		function() {


			return {

			};
		}
	]

	var StatesManager = [

		function() {
			var currentState = null;
			var states = {
				search: {
					active: false,
					text: 'Tìm kiếm',
					faIconName: 'search'
				},
				favo: {
					active: false,
					text: 'Ưa thích',
					faIconName: 'heart'
				},
				hot: {
					active: false,
					text: 'Hot',
					faIconName: 'fire'
				},
				collection: {
					active: false,
					text: 'Bộ sưu tập',
					faIconName: 'suitcase'
				},
				setting: {
					active: false,
					text: 'Cài đặt',
					faIconName: 'cogs'
				}
			};

			var orderedStates = [
				states.search,
				states.favo,
				states.hot,
				states.collection,
				states.setting
			];

			function active(state) {
				if(currentState) {
					currentState.active = false;
				}
				state.active = true;
				currentState = state;
			}

			function getCurrentState() {
				return currentState;
			}

			function getAllStates() {
				return states;
			}

			function getOrderedState() {
				return orderedStates;
			}

			active(states.search);

			return {
				active: active,
				getCurrentState: getCurrentState,
				getAllStates: getAllStates,
				getOrderedState: getOrderedState
			};
		}
	]

	var Run = [
		'$rootScope',
		function($rootScope) {
			$rootScope.getUrl = function(url) {
				return chrome.extension.getURL(url);
			};
		}
	];

	//DEFINE COMPONENT:
	var app = angular.module('demo', [])
		.controller('MainController', MainController)
		.controller('TabController', TabController)

		.factory('GifphyService', GifphyService)
		.factory('TabsManager', TabsManager)
		.factory('StatesManager', StatesManager)

		.constant('GIFPHY_API', GIFPHY_API)

		.run(Run)

		.filter('trusted', ['$sce', function ($sce) {
		    return function(url) {
		        return $sce.trustAsResourceUrl(url);
		    };
		}]);

		;

	angular.bootstrap(element, ['demo']);
}