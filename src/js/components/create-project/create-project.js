import newProject from './create-project.html';
import ManTuoLuo from '../mantuoluo/mantuoluo.js';
import { previewProject } from '../preview-project/index.js';

import './edit.scss';

export const createProject = function(cfg){
	this.cfg = cfg;
}

createProject.prototype = {
	initValues: function () {
		var cfg = this.cfg;

		$('.p-title,.c-0').text(cfg.taskName);
		$('#desc').text(cfg.taskInfo);
		$('.circle-count .number').text('0')
	},
	bindUI: function () {
		var _this = this;

		//点击编辑 节点操作
		$('.btn-edit-desc').click(function() {
			var input = $('#p-desc-input'),
					desc = $('.p-desc .detail'),
					btn = $(this);

			if( !input.hasClass('active') ){
				input.show().addClass('active');
				desc.hide();
				btn.hide();
			}else{
				input.hide().removeClass('active');
				desc.show();
			}

			return false;
		});

		//失焦后发送请求
		$('#p-desc-input').blur(function() {
			var val = $(this).val() || '',
					that = this,
					desc = $('.p-desc .detail');

			$.post( ENV_OPT.baseApi + 'mantuoluo/task/eidtInfo' , {
				taskId: _this.cfg.taskId,
				taskInfo: val
			}, function(r) {
				if(r.error){
					alert(r.error.message);
				}else{
					$('#desc').text(val);
					desc.show();
					that.hide();
					$('.btn-edit-desc').show();
				}
			});
		});

		$('.btn-back').click(function(event) {
			window.location.reload();
		});

		//保存
		$('.ok').click(function() {
			_this.preview();
		});
	},
	preview: function () {
		$.post( ENV_OPT.baseApi + 'mantuoluo/task/preview', { taskId: this.cfg.taskId}
			, function(r) {
			var data = r.data;

			var newP = new previewProject(data);

			newP.init(data);
		});
	},
	init: function () {
		var newP = $(newProject).clone();
		$('body').empty().append(newP);
		$('.content').addClass('content-add')

		this.editObj = new ManTuoLuo({
			taskId: this.cfg.taskId,
			type: 'create'
		});
		this.editObj.init();

		this.initValues();

		this.bindUI();
	},
	edit: function (data) {
		var newP = $(newProject).clone();
		$('body').empty().append(newP);
		$('.content').addClass('content-add')

		var editObj = new ManTuoLuo({
			taskId: data.taskId,
			data: data,
			type: 'create'
		});

		editObj.init();
		editObj.create();

		console.log('aaa')

		this.initValues();

		this.bindUI();
	},
}

