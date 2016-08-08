import Dialog from '../detail-dialog/dialog.js';
import iconDefault from './img/line-default.png';
import icon1 from './img/line-1.png';
import icon2 from './img/line-2.png';
import icon3 from './img/line-3.png';
import icon4 from './img/line-4.png';
import icon5 from './img/line-5.png';

var aIcon = [icon1,icon2,icon3,icon4,icon5];
var dialog = new Dialog();


export default function ManTuoLuo (cfg) {
	this.cfg = $.extend({}, {
		curCircle: 0, //当前圈层
		curLength: 1, //当前全层数
		unitW: 50,
		startW: parseFloat( $('.c-0').width() )
	}, cfg);
}

ManTuoLuo.prototype = {

	bindUI: function () {
		var that = this,
				cfg = this.cfg;

		//按类型进行不同事件绑定  create,preview,list
		switch (cfg.type) {
			case 'create':
				bindCreate(that, cfg);
				break;
			default:
				// statements_def
				break;
		}
	},

	addCircle: function (layerCur, layerId) {
		var circle = $('<div class="each-c"></div>'),
				cfg = this.cfg,
				width = cfg.startW + cfg.unitW * 2 * cfg.curLength;

		circle.addClass('c-' + cfg.curLength)
			.css({
				width: width,
				height: width,
				borderRadius: width / 2,
				'z-index': 100 - cfg.curLength * 2
			})
			.data('num', cfg.curLength )
			.data('layerCur', layerCur )
			.data('layerId', layerId)
			.append('<div class="c-content"></div>')
			.appendTo('.p-content');

		this.cfg.curCircle = cfg.curLength;
		this.cfg.curLength += 1;

		this.initCircle();

		circle.find('.c-content').css({
			borderRadius: width / 2 - 2,
		});
	},

	onError: function (err) {
		alert(err.message);
	},

	ajaxGet: function (url, data, onSuccess, onError) {
		$.get( ENV_OPT.baseApi + url, data, function(r) {
			if(r.error){
				onError && onError(r.error);
			}else{
				onSuccess && onSuccess(r);
			}
		});
	},

	initCircle: function () {
		var target = $('.c-' + this.cfg.curCircle);

		$('.each-c,.c-content').removeClass('active');

		if(this.cfg.type == 'create'){
			target.addClass('active');
			$('.c-' + (this.cfg.curCircle - 1)).find('.c-content').addClass('active');
		}

		var color = target.data('color') || 0,
				num = target.data('childnum') || 1,
				iconColor = target.data('icon-color') || 100,
				icon = target.data('icon'),
				layerCur = target.data('layerCur'),
				layerId = target.data('layerId');

		$('#input-p-number').val(num);
		$('#input-p-color').val(color);
		$('#input-p-icon-color').val(iconColor);
		$('.p-icon-list li').removeClass('active');
		$('.p-icon-list li').eq(icon - 1).addClass('active');

		$('.circle-count .number').text(this.cfg.curCircle);
		this.cfg.layerId = layerId;
		this.cfg.layerCur = layerCur;
	},

	initText: function (num, aBlock) {
		var cfg = this.cfg,
				target = $('.c-' + cfg.curCircle).find('.c-content').eq(0),
				unitDeg = 360 / num;

		$('.c-' + cfg.curCircle).data('childnum', num);
		target.empty();

		for( var i = 0; i < num; i++ ){
			var nB = aBlock ? aBlock[i] : null;
			if ( !nB ) {
				var block = $('<div class="block"><span>点击编辑</span></div>');
			}else{
				var block = $('<div class="block"><span>' + nB.blockName + '</span></div>');
				block.data('blockId', nB.blockId );
			}
			
			var icon = $('<div class="block icon-block"><img src="'+ iconDefault +'"></div>');

			var deg = unitDeg * i,
					icon_deg = unitDeg * i + unitDeg / 2;

			block.css('transform', 'translate3d(-50%, 0 ,0) rotate(' + deg + 'deg)');
			icon.css('transform', 'translate3d(-50%, 0 ,0) rotate(' + icon_deg + 'deg)');

			//绑定点击事件
			if( cfg.type == 'create' ){
				block.find('span').click(function() {
					var parent = $(this).parents('.each-c'),
							_this = $(this),
							blockId = _this.data('blockId');

					var layerId = parent.data('layerId');

					dialog.show({
						layerId: layerId,
						type: cfg.type,
						blockId: blockId,
						callbackFn: function (r) {
							console.log(r);
							
							_this.data('blockId', r.blockId)
									.text(r.text);
						}
					})
				});
			}

			target.append(block,icon);
		}
	},

	initColor: function (color) {
		var cfg = this.cfg,
				target = $('.c-' + cfg.curCircle).find('.c-content').eq(0);

		target.css({
			'background-color': 'rgba(0,0,0,' + color / 100 + ')',
		});

		$('.c-' + cfg.curCircle).data('color', color);

		if( color > 60 ){
			target.css({
				color: '#fff'
			})
		}
	},

	initIcon: function (color, iconNum ) {
		var cfg = this.cfg,
				icon = $('<img src="'+ aIcon[iconNum - 1] +'">')

		$('.c-' + cfg.curCircle).find('.c-content .icon-block')
			.empty()
			.append(icon)
			.css('opacity', color / 100 );

		//记录信息
		$('.c-' + cfg.curCircle).data('icon', iconNum);
		$('.c-' + cfg.curCircle).data('icon-color', color);
	},


	initBaseInfo: function () {
		var cfg = this.cfg,
				data = cfg.data;

		$('.c-0,.intro-title .li-left').text(data.taskName);
		$('.intro-detail').text(data.taskInfo);
	},

	initManTuoLuo: function () {
		var layer = this.cfg.data.layer,
				that = this,
				cfg = this.cfg,
				data = cfg.data;

		$.each(layer, function(index, val) {

			that.addCircle(val.layerCur, val.layerId);
			that.initText(val.layerNum, val.block);
			that.initColor(val.layerColor);
			that.initIcon(val.layerTrans, val.layerShape)
		});
	},

	scale: function () {
		var H = parseFloat( $('.swiper-container').height() );
		var mH = parseFloat( $('.p-content').height() );
		var scale = H / mH;

		$('.p-content').css({
			transform: 'scale('+ scale +')',
		});
	},

	scaleAdd: function () {
		var mH = parseFloat( $('.c' + this.cfg.curLength ).height() );
		var H = parseFloat( $('.p-content').height() );
		
		if( mH > H ){
			var scale = H / mH;

			$('.p-content').css({
				transform: 'scale('+ scale +')',
			});
		}
	},

	init: function () {
		this.bindUI();

		dialog.init()
	},

	create: function () {
		$('.p-content').empty().append('<div class="each-c c-0">地域建筑</div>');
		this.initBaseInfo();
		this.initManTuoLuo();
		this.scale();

		if(this.cfg.type == 'preview'){
			this.initRotate();
		}
	},

	initRotate: function () {
		var targets = $('.each-c');

		$(document).mouseup( stopRotate );

		targets.each(function(index) {
			$(this).mousedown( startRotate );
		});
	}
};


function bindCreate (that, cfg) {
	//添加圈层按钮
	$('.btn-add-circle').unbind().click(function() {
		if( that.cfg.curLength >= 10 ){
			alert('圈层数量不能大于10！');
			return false;
		}

		that.ajaxGet('mantuoluo/layer/add',{
			taskId: cfg.taskId,
			layerCur: cfg.curCircle + 1,
			layerNum: 1
		},function (r) {
			that.cfg.layerId = r.data.layerId;
			that.addCircle(cfg.curCircle +1, r.data.layerId);
			that.scaleAdd();
		}, that.onError);
		
	});

	//添加数量按钮
	$('.btn-add-number').unbind().click(function() {
		var num = $('#input-p-number').val();

		//数量不能大于12
		if(num > 12){
			alert('数量不能大于12！');
			return false;
		}

		that.ajaxGet('mantuoluo/layer/num',{
			layerNum: num,
			layerId: cfg.layerId
		}, function () {
			that.initText(num);
		}, that.onError);

		$('.edit-list li').removeClass('active');

		return false;
	});

	//设置圈层颜色
	$('.btn-set-color').unbind().click(function() {
		var color = $('#input-p-color').val();

		that.ajaxGet('mantuoluo/layer/color',{
			layerColor: color,
			layerId: cfg.layerId
		}, function () {
			that.initColor(color);
		}, that.onError);

		//默认初始化图标为默认
		that.ajaxGet('mantuoluo/layer/shape-trans',{
			layerShape: 'default',
			layerTrans: 1,
			layerId: cfg.layerId
		});

		$('.edit-list li').removeClass('active');

		return false;
	});

	//设置图标样式
	$('.btn-set-icon').unbind().click(function(event) {
		var iconNum = $('.p-icon-list li.active img').data('icon') || 'default',
				color = $('#input-p-icon-color').val();

		that.ajaxGet('mantuoluo/layer/shape-trans',{
			layerShape: iconNum,
			layerTrans: color,
			layerId: cfg.layerId
		}, function () {
			that.initIcon(color, iconNum);
		}, that.onError);
		
		$('.edit-list li').removeClass('active');

		return false;
	});

	//圈层点击选中
	$('.p-content').on('click', '.each-c', function() {
		var target = $(this);

		//中心圈层不可选
		if( target.hasClass('c-0')){
			return false;
		}
		var num = target.data('num');

		that.cfg.curCircle = num;
		that.initCircle();
	});

	$('.btn-tab').unbind().click(function() {
		$('.edit-list li').removeClass('active');
		$(this).parent().addClass('active');
		that.initCircle();
	});

	$('.p-icon-list li').click(function(event) {
		$('.p-icon-list li').removeClass('active');
		$(this).addClass('active');
	});

	//删除层
	$('.delete').unbind().click(function() {
		that.ajaxGet('mantuoluo/layer/delete',{
			taskId: cfg.taskId,
			layerCur: cfg.curCircle + 1,
			layerId: cfg.layerId
		},function (r) {
			$.post(ENV_OPT.baseApi + 'mantuoluo/task/preview', {
				taskId: cfg.taskId,
			}, function(r) {
				var data = r.data;

				var editObj = new ManTuoLuo({
					taskId: data.taskId,
					data: data,
					type: 'create'
				});

				editObj.init();
				editObj.create();
			});
		}, that.onError);
	});
}

var imageBeingRotated,
		mouseStartAngle,
		imageStartAngle;

function startRotate( e ) {

  imageBeingRotated = this;

  var imageCentre = getImageCentre( imageBeingRotated );
  var mouseStartXFromCentre = e.pageX - imageCentre[0];
  var mouseStartYFromCentre = e.pageY - imageCentre[1];
  mouseStartAngle = Math.atan2( mouseStartYFromCentre, mouseStartXFromCentre );

  imageStartAngle = $(imageBeingRotated).data('currentRotation') || 0;

  $(document).mousemove( rotateImage );

  return false;
}


function stopRotate( e ) {

  if ( !imageBeingRotated ) return;

  $(document).unbind( 'mousemove' );

  setTimeout( function() { imageBeingRotated = false; }, 10 );
  return false;
}

function rotateImage( e ) {

  if ( !imageBeingRotated ) return;

  var imageCentre = getImageCentre( imageBeingRotated );

  var mouseXFromCentre = e.pageX - imageCentre[0];
  var mouseYFromCentre = e.pageY - imageCentre[1];
  var mouseAngle = Math.atan2( mouseYFromCentre, mouseXFromCentre );

  var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;

  $(imageBeingRotated).css('transform','translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
  $(imageBeingRotated).css('-moz-transform','translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
  $(imageBeingRotated).css('-webkit-transform','translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
  $(imageBeingRotated).css('-o-transform','translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
  $(imageBeingRotated).data('currentRotation', rotateAngle );
  return false;
}

function getImageCentre( image ) {

  $(image).css('transform','translate3d(-50%,-50%,0) rotate(0rad)');
  $(image).css('-moz-transform','translate3d(-50%,-50%,0) rotate(0rad)');
  $(image).css('-webkit-transform','translate3d(-50%,-50%,0) rotate(0rad)');
  $(image).css('-o-transform','translate3d(-50%,-50%,0) rotate(0rad)');

  var imageOffset = $(image).offset();
  var imageCentreX = imageOffset.left + $(image).width() / 2;
  var imageCentreY = imageOffset.top + $(image).height() / 2;


  var currentRotation = $(image).data('currentRotation');
  $(imageBeingRotated).css('transform','translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');
  $(imageBeingRotated).css('-moz-transform','translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');
  $(imageBeingRotated).css('-webkit-transform','translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');
  $(imageBeingRotated).css('-o-transform','translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');

  return Array( imageCentreX, imageCentreY );
}
