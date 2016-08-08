webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45);


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

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, ENV_OPT) {'use strict';

	var _base = __webpack_require__(5);

	__webpack_require__(14);

	__webpack_require__(20);

	var registerForm = new _base.FormPost({
		url: 'mantuoluo/register',
		form: '#register-form',
		subBtn: '#btn-register',
		onSuccess: function onSuccess(r) {
			var data = r.data;

			if (!data) {
				data = r.error;
				alert(data.message);

				return;
			}

			if (data.result) {
				alert('注册成功！');
				// var conf = window.confirm('注册成功！点击进行登陆跳转');
			}
		}
	});

	registerForm.init();

	var validate = {
		//验证是否存在
		hasUserRegisted: function hasUserRegisted() {
			var that = this;

			$('#email').blur(function () {
				var _this = $(this),
				    val = _this.val();

				if (!!val) {
					that.getRegistedState(val);
				}
			});
		},

		getRegistedState: function getRegistedState(val) {
			console.log(val);
			$.get(ENV_OPT.baseApi + 'mantuoluo/isNameOk', { 'userName': val }, function (r) {
				if (!r.data.result) {
					alert('此用户已经被注册！');
				}
			});
		},

		passwordOk: function passwordOk() {
			$('#password2').blur(function () {
				var _this = $(this),
				    val = _this.val(),
				    pass = $('#password').val();

				if (!!val && val != pass) {
					alert('两次密码输入需一致！');
					_this.val('');
				}
			});
		},

		init: function init() {
			this.hasUserRegisted();
			this.passwordOk();
		}
	};

	validate.init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ }

});