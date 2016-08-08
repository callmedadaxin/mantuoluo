import Swiper from 'swiper';
import { getUserInfo } from '../base.js';
import { createProject } from '../create-project/create-project.js';
import { previewProject } from '../preview-project/index.js';
import ManTuoLuo from '../mantuoluo/mantuoluo.js';
import '../../../scss/home.scss';
import 'swiper/dist/css/swiper.css';

//用户信息
var userInfo = {
	userId: 1
};

var curManTuo = {};

//列表部分
export const List = {
	cfg: {
		curPage: 1,
	},

	getUserInfo: function () {
		userInfo.userId = getUserInfo();
	},

	initSwiper: function () {
		var that = this;

		this.swiper = new Swiper('.swiper-container', {
	    onInit: function () {
	    	that.getManTuoLuo(that.cfg.curPage);
	    	$('.swiper-button-disabled').removeClass('swiper-button-disabled');
	    },
	    onSlideNextStart: function(swiper){
	      alert('事件触发了;');
	    }
		});

		$('.swiper-button-next').click(function() {
			that.cfg.curPage += 1;
			that.getManTuoLuo(that.cfg.curPage);
		});

		$('.swiper-button-prev').click(function() {
			if( that.cfg.curPage < 1){
				alert('已经到第一个！');
				return false;
			}
			that.cfg.curPage -= 1;
			that.getManTuoLuo(that.cfg.curPage);
		});
	},

	init: function (isShare) {
		this.getUserInfo();
		this.initSwiper();
		this.isShare = isShare;
	},

	getManTuoLuo: function (page) {
		var that = this;
		
		$.post(ENV_OPT.baseApi + 'mantuoluo/task/preview', {
			userId: userInfo.userId,
			isShare: that.isShare,
			curPage: page,
		}, function(r) {

			if(r.data.length < 1) {
				$('.p-content').html('您还没有项目哦！点击创建一个吧！');
				$('.swiper-button-next,.swiper-button-prev').hide();
			}

			var man = new ManTuoLuo({
				data: r.data[0],
				type: 'list',
			})

			curManTuo = r.data[0];

			man.create();
		});
	}
}


var newProject = {
	bindUI: function () {
		var that = this;

		//新建按钮弹框
		$('.btn-new').click(function(event) {
			$('.modal').fadeIn();
		});

		//提交按钮
		$('.cancel,.sub').click(function(event) {
			$('.modal').fadeOut();
			var data = that.getData();

			if(!data){
				return false;
			}else{
				that.startCommit(data);
			}
		});
	},

	getData: function () {
		var name = $('#project-name').val(),
				desc = $('#project-desc').val() || '';

		if(!name){
			alert('项目名称不能为空！');
			return false;
		}

		return {
			taskName: name,
			taskInfo: desc,
			userId: userInfo.userId,
			taskSize: 1,
		}
	},

	startCommit: function (data) {
		$.post( ENV_OPT.baseApi + 'mantuoluo/task/add', data, function(r) {
			var data = r.data;

			if(!data.result){
				alert('创建失败！请重试');
			}else{
				var newP = new createProject(data);

				newP.init();
			}
		});
	},

	init: function () {
		this.bindUI();
	}
}

newProject.init();

var Set = {
	bindUI: function () {
		var that = this;

		$('.btn-set').click(function() {
			$('.setting-list').slideToggle();
			return false;
		});

		$(document).click(function(event) {
			$('.setting-list').slideUp();
		});

		this.startEdit();

		$('.li-right').click(function() {
			that.startPreview();
		});
	},

	startEdit: function () {
		$('.start-edit').click(function() {

			var newP = new createProject(curManTuo);

			newP.edit(curManTuo);
		});
	},

	startPreview: function () {

		$.post( ENV_OPT.baseApi + 'mantuoluo/task/preview', { taskId: curManTuo.taskId}
			, function(r) {
			var data = r.data;

			var newP = new previewProject(data);

			newP.init(data);
		});
		
	},

	init: function () {
		this.bindUI()
	}
}

Set.init();


	
