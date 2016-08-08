import { FormPost } from '../components/base.js';
import '../components/label-btn.js';
import '../../scss/login.scss';

var registerForm = new FormPost({
	url: 'mantuoluo/register',
	form: '#register-form',
	subBtn: '#btn-register',
	onSuccess: function (r) {
		var data = r.data;

		if(!data){
			data = r.error;
			alert(data.message);

			return;
		}

		if(data.result){
			alert('注册成功！');
			// var conf = window.confirm('注册成功！点击进行登陆跳转');
		}
	}
});

registerForm.init();

var validate = {
	//验证是否存在
	hasUserRegisted: function () {
		var that = this;

		$('#email').blur(function() {
			var _this = $(this),
					val = _this.val();

			if(!!val) {
				that.getRegistedState(val);
			}
		});
	},

	getRegistedState: function (val) {
		console.log(val);
		$.get( ENV_OPT.baseApi + 'mantuoluo/isNameOk', { 'userName' : val}, function(r) {
			if( !r.data.result ) {
				alert('此用户已经被注册！');
			}
		});
	},

	passwordOk: function () {
		$('#password2').blur(function() {
			var _this = $(this),
					val = _this.val(),
					pass = $('#password').val();

			if( !!val && val != pass) {
				alert('两次密码输入需一致！');
				_this.val('');
			}
		});
	},

	init: function () {
		this.hasUserRegisted();
		this.passwordOk();
	}
}

validate.init();

