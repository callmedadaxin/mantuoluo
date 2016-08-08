webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43);


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	$('label.btn').click(function () {
		var _this = $(this);

		_this.parent().addClass('active');
		_this.siblings('input').focus();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 20:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _base = __webpack_require__(5);

	__webpack_require__(14);

	__webpack_require__(20);

	var loginForm = new _base.FormPost({
		url: 'mantuoluo/login',
		form: '#login-form',
		subBtn: '#btn-login',
		onSuccess: function onSuccess(r) {
			var data = r.data;

			if (!data) {
				data = r.error;
				alert(data.message);

				return;
			}

			if (data.result) {
				alert('登陆成功！');
				window.location.href = 'project-list.html';
			}
		}
	});

	loginForm.init();

/***/ }

});