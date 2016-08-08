import Dialog from './dialog.html';
import './dialog.scss';

export default class {
	constructor() {
    this.cfg = {
    	type: 'create', //create 创建, edit 编辑, show 展示
    };
  }

	initInfo () {
		var cfg = this.cfg,
				that = this;

		//如果有blockId，则为编辑
		if( cfg.blockId ){
			$.post( ENV_OPT.baseApi + 'mantuoluo/block/getBlock', {blockId: cfg.blockId}, function(r) {
				if( r.error ){
					that.error( r.error );
				}else {
					that.initInfoDom(r.data);
				}
			});
		}else{
			that.initInfoDom({});
		}
	}

	initInfoDom (data) {
		var cfg = this.cfg;

		if( cfg.type == 'create'){
			$('#project-name').val(data.blockName || '');
			$('#project-desc').val(data.blockInfo || '');
		} else {
			$('.modal-content .preview').show();
			$('.project-name-p').text(data.blockName);
			$('.project-desc-p').text(data.blockInfo);

			var imgList = data.imgList;

			$('.project-imgs').empty();

			if( imgList && imgList.length != 0 ){
				$.each(imgList, function(index, val) {
					var img = $('<img src="' + val + '"/>'),
							li = $('<li></li>');

					li.append(img).appendTo('.project-imgs');
				});
			}
		}
	}

	initClose () {
		var that = this;

		$('.modal-content .close').click(function() {
			that.dialog.hide();
		});
	}

	addPic () {
		$('.add-img').click(function() {
			var _this = $(this);

			$('#add-img').trigger('click');
		});
	}

	addVideo () {
		$('.add-video').click(function() {
			var _this = $(this);

			$('#add-video').trigger('click');
		});
	}

	submitData () {
		var cfg = this.cfg,
				that = this;

		var data = new FormData($('#form')[0]);  

		data.append('layerId', cfg.layerId)

		if( cfg.blockId ){
			data.append('blockId', cfg.blockId)
		}

		var xhr = new XMLHttpRequest();  

		xhr.open( "POST", ENV_OPT.baseApi + 'mantuoluo/block/edit' , true ); 
		
		xhr.send(data);

		xhr.onload = function(oEvent) {  
      if (xhr.status == 200) {  
        try {
        	var json = $.parseJSON(xhr.responseText);
        } catch(e) {
        	// statements
        	console.log(e);
        }

        if( json.error ){
        	that.error(json.error);
        }else{
        	cfg.callbackFn && cfg.callbackFn({
        		blockId: json.data.blockId,
        		text: $('#project-name').val()
        	});
        	that.dialog.hide();
        }
     	} else {  
     		console.log('error')
     	}
		};  
	} 

	show (cfg) {
		this.dialog.show();
		this.cfg = cfg;
		this.initInfo();
	}

	bindUI () {
		var that = this;

		this.initClose();
		this.addPic();
		this.addVideo();

		$('#sub').click(function() {
			that.submitData();
		});
	}

	error (r) {
		alert( r.message );
	}

	init () {
		this.dialog = $(Dialog).clone();

		$('body').append(this.dialog);
		
		this.bindUI();

		return this;
	}
}