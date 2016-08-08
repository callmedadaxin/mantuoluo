import { FormPost } from '../components/base.js';
import '../components/label-btn.js';
import '../../scss/login.scss';

var loginForm = new FormPost({
	url:  'mantuoluo/login',
	form: '#login-form',
	subBtn: '#btn-login',
	onSuccess: function (r) {
		var data = r.data;

		if(!data){
			data = r.error;
			alert(data.message);

			return;
		}

		if(data.result){
			alert('登陆成功！');
			window.location.href = 'project-list.html';
		}
	}
});

loginForm.init();
