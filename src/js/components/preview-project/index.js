import newProject from './preview-project.html';
import { createProject } from '../create-project/create-project.js';
import ManTuoLuo from '../mantuoluo/mantuoluo.js';
import html2canvas from 'html2canvas';
import './preview-project.scss'


export const previewProject = function(cfg){
	this.cfg = cfg;
}

previewProject.prototype = {
	initValues: function () {
		var cfg = this.cfg;

		$('.c-0').text(cfg.taskName);
	},
	bindUI: function () {
		$('.btn-back').click(function(event) {
			window.location.reload();
		});

		this.startEdit();
		this.downLoad();
		this.bindDelete();
	},

	startEdit: function () {
		var cfg = this.cfg;

		$('.preview-btn.start-edit').click(function() {

			var newP = new createProject(cfg);

			newP.edit(cfg);
		});
	},

	downLoad: function () {
		$('.download').click(function() {
			html2canvas($(".p-content"), {
	     	onrendered: function (canvas) {
	       	var url = canvas.toDataURL();
	        //以下代码为下载此图片功能
	       	var triggerDownload = $("<a>").attr("href", url).attr("download", "test.png").appendTo("body");
			       triggerDownload[0].click();
			       triggerDownload.remove();
	     	},
	     	// allowTaint: true,
	   	});
		});
	},

	bindDelete: function () {
		var cfg = this.cfg;

		$('.preview-btn-delete').click(function() {
			$.get( ENV_OPT.baseApi + 'mantuoluo/task/delete', {taskId: cfg.taskId}, function(r) {
				if( r.error){
					alert( r.error.message);
				}else{
					alert( '删除成功！ ');
					window.location.reload();
				}
			});
		});
		
	},

	init: function (data) {

		var newP = $(newProject).clone();
		$('body').empty().append(newP);
		$('.content').removeClass('content-add').addClass('content-preview')

		var editObj = new ManTuoLuo({
			taskId: data.taskId,
			data: data,
			type: 'preview'
		});

		editObj.init();
		editObj.create();

		this.bindUI();
	},
}

