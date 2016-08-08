import '../../scss/user.scss';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import { getUserInfo } from '../components/base.js';

var userInfo = {};


var userSet = {
	getUserInfo: function () {
		var that = this;
		userInfo.userId = getUserInfo();

		$.get( ENV_OPT.baseApi + 'mantuoluo/getUserInfo', { userId: 1 }, function(r) {

			if( r.error ){
				that.error(r.error);
			} else {
				that.initInfo(r.data);
			}
		});
	},

	initInfo: function (info) {
		userInfo.info = info;


		$('.nick-name').text(info.infoNick).siblings('.input-info').val(info.infoNick)
		$('#username').text(info.userName).siblings('.input-info');
		$('#name').text(info.infoName).siblings('.input-info').val(info.infoName)
		$('#job').text(info.infoJob).siblings('.input-info').val(info.infoJob)
		$('#phone').text(info.infoPhone).siblings('.input-info').val(info.infoPhone)
		$('#city').text(info.infoCity).siblings('.input-info').val(info.infoCity)
	},

	editUserInfo: function () {
		var that = this;

		$('.btn-edit-info').unbind().click(function () {
			var _this = $(this);

			$('.info-list').addClass('editing');

			_this.unbind().click(function () {
				that.editInfo();
			}).text('提交更改')
		});

		$('.info-list').removeClass('editing');
	},

	editInfo: function () {
		var aInput = $('.input-info'),
				data = {
					userId: userInfo.userId
				},
				that = this;

		$.each(aInput, function(index, input) {
			var target = $(input),
					name = target.attr('name'),
					val = target.val();

			if( !!val ){
				data[name] = val;
			}
		});

		$.post( ENV_OPT.baseApi + 'mantuoluo/userInfo-edit' , data, function(r) {
			if( r.error ){
				that.error( r.error );
			}else {
				alert('修改成功！');
				that.getUserInfo();
				that.editUserInfo();
			}
		});
	},

	logout: function () {
		var that = this;

		$('.btn-exit').click(function() {
			$.get( ENV_OPT.baseApi + 'mantuoluo/logout', function(r) {
				if( r.error ){
					that.error( r.error );
				}else{
					if ( r.data.result ) {
						window.location.href = 'login.html';
					};
				}
			});
		});
	},

	error: function (r) {
		alert(r.message);
	},

	init: function () {
		this.getUserInfo();
		this.editUserInfo();
		this.logout();
	}
}

userSet.init();