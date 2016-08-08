webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(46);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, ENV_OPT) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ManTuoLuo;

	var _dialog = __webpack_require__(13);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _lineDefault = __webpack_require__(36);

	var _lineDefault2 = _interopRequireDefault(_lineDefault);

	var _line = __webpack_require__(31);

	var _line2 = _interopRequireDefault(_line);

	var _line3 = __webpack_require__(32);

	var _line4 = _interopRequireDefault(_line3);

	var _line5 = __webpack_require__(33);

	var _line6 = _interopRequireDefault(_line5);

	var _line7 = __webpack_require__(34);

	var _line8 = _interopRequireDefault(_line7);

	var _line9 = __webpack_require__(35);

	var _line10 = _interopRequireDefault(_line9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var aIcon = [_line2.default, _line4.default, _line6.default, _line8.default, _line10.default];
	var dialog = new _dialog2.default();

	function ManTuoLuo(cfg) {
		this.cfg = $.extend({}, {
			curCircle: 0, //当前圈层
			curLength: 1, //当前全层数
			unitW: 50,
			startW: parseFloat($('.c-0').width())
		}, cfg);
	}

	ManTuoLuo.prototype = {

		bindUI: function bindUI() {
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

		addCircle: function addCircle(layerCur, layerId) {
			var circle = $('<div class="each-c"></div>'),
			    cfg = this.cfg,
			    width = cfg.startW + cfg.unitW * 2 * cfg.curLength;

			circle.addClass('c-' + cfg.curLength).css({
				width: width,
				height: width,
				borderRadius: width / 2,
				'z-index': 100 - cfg.curLength * 2
			}).data('num', cfg.curLength).data('layerCur', layerCur).data('layerId', layerId).append('<div class="c-content"></div>').appendTo('.p-content');

			this.cfg.curCircle = cfg.curLength;
			this.cfg.curLength += 1;

			this.initCircle();

			circle.find('.c-content').css({
				borderRadius: width / 2 - 2
			});
		},

		onError: function onError(err) {
			alert(err.message);
		},

		ajaxGet: function ajaxGet(url, data, onSuccess, onError) {
			$.get(ENV_OPT.baseApi + url, data, function (r) {
				if (r.error) {
					onError && onError(r.error);
				} else {
					onSuccess && onSuccess(r);
				}
			});
		},

		initCircle: function initCircle() {
			var target = $('.c-' + this.cfg.curCircle);

			$('.each-c,.c-content').removeClass('active');

			if (this.cfg.type == 'create') {
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

		initText: function initText(num, aBlock) {
			var cfg = this.cfg,
			    target = $('.c-' + cfg.curCircle).find('.c-content').eq(0),
			    unitDeg = 360 / num;

			$('.c-' + cfg.curCircle).data('childnum', num);
			target.empty();

			for (var i = 0; i < num; i++) {
				var nB = aBlock ? aBlock[i] : null;
				if (!nB) {
					var block = $('<div class="block"><span>点击编辑</span></div>');
				} else {
					var block = $('<div class="block"><span>' + nB.blockName + '</span></div>');
					block.data('blockId', nB.blockId);
				}

				var icon = $('<div class="block icon-block"><img src="' + _lineDefault2.default + '"></div>');

				var deg = unitDeg * i,
				    icon_deg = unitDeg * i + unitDeg / 2;

				block.css('transform', 'translate3d(-50%, 0 ,0) rotate(' + deg + 'deg)');
				icon.css('transform', 'translate3d(-50%, 0 ,0) rotate(' + icon_deg + 'deg)');

				//绑定点击事件
				if (cfg.type == 'create') {
					block.find('span').click(function () {
						var parent = $(this).parents('.each-c'),
						    _this = $(this),
						    blockId = _this.data('blockId');

						var layerId = parent.data('layerId');

						dialog.show({
							layerId: layerId,
							type: cfg.type,
							blockId: blockId,
							callbackFn: function callbackFn(r) {
								console.log(r);

								_this.data('blockId', r.blockId).text(r.text);
							}
						});
					});
				}

				target.append(block, icon);
			}
		},

		initColor: function initColor(color) {
			var cfg = this.cfg,
			    target = $('.c-' + cfg.curCircle).find('.c-content').eq(0);

			target.css({
				'background-color': 'rgba(0,0,0,' + color / 100 + ')'
			});

			$('.c-' + cfg.curCircle).data('color', color);

			if (color > 60) {
				target.css({
					color: '#fff'
				});
			}
		},

		initIcon: function initIcon(color, iconNum) {
			var cfg = this.cfg,
			    icon = $('<img src="' + aIcon[iconNum - 1] + '">');

			$('.c-' + cfg.curCircle).find('.c-content .icon-block').empty().append(icon).css('opacity', color / 100);

			//记录信息
			$('.c-' + cfg.curCircle).data('icon', iconNum);
			$('.c-' + cfg.curCircle).data('icon-color', color);
		},

		initBaseInfo: function initBaseInfo() {
			var cfg = this.cfg,
			    data = cfg.data;

			$('.c-0,.intro-title .li-left').text(data.taskName);
			$('.intro-detail').text(data.taskInfo);
		},

		initManTuoLuo: function initManTuoLuo() {
			var layer = this.cfg.data.layer,
			    that = this,
			    cfg = this.cfg,
			    data = cfg.data;

			$.each(layer, function (index, val) {

				that.addCircle(val.layerCur, val.layerId);
				that.initText(val.layerNum, val.block);
				that.initColor(val.layerColor);
				that.initIcon(val.layerTrans, val.layerShape);
			});
		},

		scale: function scale() {
			var H = parseFloat($('.swiper-container').height());
			var mH = parseFloat($('.p-content').height());
			var scale = H / mH;

			$('.p-content').css({
				transform: 'scale(' + scale + ')'
			});
		},

		scaleAdd: function scaleAdd() {
			var mH = parseFloat($('.c' + this.cfg.curLength).height());
			var H = parseFloat($('.p-content').height());

			if (mH > H) {
				var scale = H / mH;

				$('.p-content').css({
					transform: 'scale(' + scale + ')'
				});
			}
		},

		init: function init() {
			this.bindUI();

			dialog.init();
		},

		create: function create() {
			$('.p-content').empty().append('<div class="each-c c-0">地域建筑</div>');
			this.initBaseInfo();
			this.initManTuoLuo();
			this.scale();

			if (this.cfg.type == 'preview') {
				this.initRotate();
			}
		},

		initRotate: function initRotate() {
			var targets = $('.each-c');

			$(document).mouseup(stopRotate);

			targets.each(function (index) {
				$(this).mousedown(startRotate);
			});
		}
	};

	function bindCreate(that, cfg) {
		//添加圈层按钮
		$('.btn-add-circle').unbind().click(function () {
			if (that.cfg.curLength >= 10) {
				alert('圈层数量不能大于10！');
				return false;
			}

			that.ajaxGet('mantuoluo/layer/add', {
				taskId: cfg.taskId,
				layerCur: cfg.curCircle + 1,
				layerNum: 1
			}, function (r) {
				that.cfg.layerId = r.data.layerId;
				that.addCircle(cfg.curCircle + 1, r.data.layerId);
				that.scaleAdd();
			}, that.onError);
		});

		//添加数量按钮
		$('.btn-add-number').unbind().click(function () {
			var num = $('#input-p-number').val();

			//数量不能大于12
			if (num > 12) {
				alert('数量不能大于12！');
				return false;
			}

			that.ajaxGet('mantuoluo/layer/num', {
				layerNum: num,
				layerId: cfg.layerId
			}, function () {
				that.initText(num);
			}, that.onError);

			$('.edit-list li').removeClass('active');

			return false;
		});

		//设置圈层颜色
		$('.btn-set-color').unbind().click(function () {
			var color = $('#input-p-color').val();

			that.ajaxGet('mantuoluo/layer/color', {
				layerColor: color,
				layerId: cfg.layerId
			}, function () {
				that.initColor(color);
			}, that.onError);

			//默认初始化图标为默认
			that.ajaxGet('mantuoluo/layer/shape-trans', {
				layerShape: 'default',
				layerTrans: 1,
				layerId: cfg.layerId
			});

			$('.edit-list li').removeClass('active');

			return false;
		});

		//设置图标样式
		$('.btn-set-icon').unbind().click(function (event) {
			var iconNum = $('.p-icon-list li.active img').data('icon') || 'default',
			    color = $('#input-p-icon-color').val();

			that.ajaxGet('mantuoluo/layer/shape-trans', {
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
		$('.p-content').on('click', '.each-c', function () {
			var target = $(this);

			//中心圈层不可选
			if (target.hasClass('c-0')) {
				return false;
			}
			var num = target.data('num');

			that.cfg.curCircle = num;
			that.initCircle();
		});

		$('.btn-tab').unbind().click(function () {
			$('.edit-list li').removeClass('active');
			$(this).parent().addClass('active');
			that.initCircle();
		});

		$('.p-icon-list li').click(function (event) {
			$('.p-icon-list li').removeClass('active');
			$(this).addClass('active');
		});

		//删除层
		$('.delete').unbind().click(function () {
			that.ajaxGet('mantuoluo/layer/delete', {
				taskId: cfg.taskId,
				layerCur: cfg.curCircle + 1,
				layerId: cfg.layerId
			}, function (r) {
				$.post(ENV_OPT.baseApi + 'mantuoluo/task/preview', {
					taskId: cfg.taskId
				}, function (r) {
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

	var imageBeingRotated, mouseStartAngle, imageStartAngle;

	function startRotate(e) {

		imageBeingRotated = this;

		var imageCentre = getImageCentre(imageBeingRotated);
		var mouseStartXFromCentre = e.pageX - imageCentre[0];
		var mouseStartYFromCentre = e.pageY - imageCentre[1];
		mouseStartAngle = Math.atan2(mouseStartYFromCentre, mouseStartXFromCentre);

		imageStartAngle = $(imageBeingRotated).data('currentRotation') || 0;

		$(document).mousemove(rotateImage);

		return false;
	}

	function stopRotate(e) {

		if (!imageBeingRotated) return;

		$(document).unbind('mousemove');

		setTimeout(function () {
			imageBeingRotated = false;
		}, 10);
		return false;
	}

	function rotateImage(e) {

		if (!imageBeingRotated) return;

		var imageCentre = getImageCentre(imageBeingRotated);

		var mouseXFromCentre = e.pageX - imageCentre[0];
		var mouseYFromCentre = e.pageY - imageCentre[1];
		var mouseAngle = Math.atan2(mouseYFromCentre, mouseXFromCentre);

		var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;

		$(imageBeingRotated).css('transform', 'translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
		$(imageBeingRotated).css('-moz-transform', 'translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
		$(imageBeingRotated).css('-webkit-transform', 'translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
		$(imageBeingRotated).css('-o-transform', 'translate3d(-50%,-50%,0) rotate(' + rotateAngle * 90 + 'deg)');
		$(imageBeingRotated).data('currentRotation', rotateAngle);
		return false;
	}

	function getImageCentre(image) {

		$(image).css('transform', 'translate3d(-50%,-50%,0) rotate(0rad)');
		$(image).css('-moz-transform', 'translate3d(-50%,-50%,0) rotate(0rad)');
		$(image).css('-webkit-transform', 'translate3d(-50%,-50%,0) rotate(0rad)');
		$(image).css('-o-transform', 'translate3d(-50%,-50%,0) rotate(0rad)');

		var imageOffset = $(image).offset();
		var imageCentreX = imageOffset.left + $(image).width() / 2;
		var imageCentreY = imageOffset.top + $(image).height() / 2;

		var currentRotation = $(image).data('currentRotation');
		$(imageBeingRotated).css('transform', 'translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');
		$(imageBeingRotated).css('-moz-transform', 'translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');
		$(imageBeingRotated).css('-webkit-transform', 'translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');
		$(imageBeingRotated).css('-o-transform', 'translate3d(-50%,-50%,0) rotate(' + currentRotation * 90 + 'deg)');

		return Array(imageCentreX, imageCentreY);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, ENV_OPT) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createProject = undefined;

	var _createProject = __webpack_require__(21);

	var _createProject2 = _interopRequireDefault(_createProject);

	var _mantuoluo = __webpack_require__(3);

	var _mantuoluo2 = _interopRequireDefault(_mantuoluo);

	var _index = __webpack_require__(7);

	__webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createProject = exports.createProject = function createProject(cfg) {
		this.cfg = cfg;
	};

	createProject.prototype = {
		initValues: function initValues() {
			var cfg = this.cfg;

			$('.p-title,.c-0').text(cfg.taskName);
			$('#desc').text(cfg.taskInfo);
			$('.circle-count .number').text('0');
		},
		bindUI: function bindUI() {
			var _this = this;

			//点击编辑 节点操作
			$('.btn-edit-desc').click(function () {
				var input = $('#p-desc-input'),
				    desc = $('.p-desc .detail'),
				    btn = $(this);

				if (!input.hasClass('active')) {
					input.show().addClass('active');
					desc.hide();
					btn.hide();
				} else {
					input.hide().removeClass('active');
					desc.show();
				}

				return false;
			});

			//失焦后发送请求
			$('#p-desc-input').blur(function () {
				var val = $(this).val() || '',
				    that = this,
				    desc = $('.p-desc .detail');

				$.post(ENV_OPT.baseApi + 'mantuoluo/task/eidtInfo', {
					taskId: _this.cfg.taskId,
					taskInfo: val
				}, function (r) {
					if (r.error) {
						alert(r.error.message);
					} else {
						$('#desc').text(val);
						desc.show();
						that.hide();
						$('.btn-edit-desc').show();
					}
				});
			});

			//保存
			$('.ok').click(function () {
				_this.preview();
			});
		},
		preview: function preview() {
			$.post(ENV_OPT.baseApi + 'mantuoluo/task/preview', { taskId: this.cfg.taskId }, function (r) {
				var data = r.data;

				var newP = new _index.previewProject(data);

				newP.init(data);
			});
		},
		init: function init() {
			var newP = $(_createProject2.default).clone();
			$('body').empty().append(newP);
			$('.content').addClass('content-add');

			this.editObj = new _mantuoluo2.default({
				taskId: this.cfg.taskId,
				type: 'create'
			});
			this.editObj.init();

			this.initValues();

			this.bindUI();
		},
		edit: function edit(data) {
			var newP = $(_createProject2.default).clone();
			$('body').empty().append(newP);
			$('.content').addClass('content-add');

			var editObj = new _mantuoluo2.default({
				taskId: data.taskId,
				data: data,
				type: 'create'
			});

			editObj.init();
			editObj.create();

			console.log('aaa');

			this.initValues();

			this.bindUI();
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, ENV_OPT) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.previewProject = undefined;

	var _previewProject = __webpack_require__(23);

	var _previewProject2 = _interopRequireDefault(_previewProject);

	var _createProject = __webpack_require__(6);

	var _mantuoluo = __webpack_require__(3);

	var _mantuoluo2 = _interopRequireDefault(_mantuoluo);

	var _html2canvas = __webpack_require__(37);

	var _html2canvas2 = _interopRequireDefault(_html2canvas);

	__webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var previewProject = exports.previewProject = function previewProject(cfg) {
		this.cfg = cfg;
	};

	previewProject.prototype = {
		initValues: function initValues() {
			var cfg = this.cfg;

			$('.c-0').text(cfg.taskName);
		},
		bindUI: function bindUI() {
			$('.btn-back').click(function (event) {
				window.location.reload();
			});

			this.startEdit();
			this.downLoad();
			this.bindDelete();
		},

		startEdit: function startEdit() {
			var cfg = this.cfg;

			$('.preview-btn.start-edit').click(function () {

				var newP = new _createProject.createProject(cfg);

				newP.edit(cfg);
			});
		},

		downLoad: function downLoad() {
			$('.download').click(function () {
				(0, _html2canvas2.default)($(".p-content"), {
					onrendered: function onrendered(canvas) {
						var url = canvas.toDataURL();
						//以下代码为下载此图片功能
						var triggerDownload = $("<a>").attr("href", url).attr("download", "test.png").appendTo("body");
						triggerDownload[0].click();
						triggerDownload.remove();
					}
				});
			});
		},

		bindDelete: function bindDelete() {
			var cfg = this.cfg;

			$('.preview-btn-delete').click(function () {
				$.get(ENV_OPT.baseApi + 'mantuoluo/task/delete', { taskId: cfg.taskId }, function (r) {
					if (r.error) {
						alert(r.error.message);
					} else {
						alert('删除成功！ ');
						window.location.reload();
					}
				});
			});
		},

		init: function init(data) {

			var newP = $(_previewProject2.default).clone();
			$('body').empty().append(newP);
			$('.content').removeClass('content-add').addClass('content-preview');

			var editObj = new _mantuoluo2.default({
				taskId: data.taskId,
				data: data,
				type: 'preview'
			});

			editObj.init();
			editObj.create();

			this.bindUI();
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Swiper 3.3.1
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2016, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: February 7, 2016
	 */
	(function () {
	    'use strict';
	    var $;
	    /*===========================
	    Swiper
	    ===========================*/
	    var Swiper = function (container, params) {
	        if (!(this instanceof Swiper)) return new Swiper(container, params);

	        var defaults = {
	            direction: 'horizontal',
	            touchEventsTarget: 'container',
	            initialSlide: 0,
	            speed: 300,
	            // autoplay
	            autoplay: false,
	            autoplayDisableOnInteraction: true,
	            autoplayStopOnLast: false,
	            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
	            iOSEdgeSwipeDetection: false,
	            iOSEdgeSwipeThreshold: 20,
	            // Free mode
	            freeMode: false,
	            freeModeMomentum: true,
	            freeModeMomentumRatio: 1,
	            freeModeMomentumBounce: true,
	            freeModeMomentumBounceRatio: 1,
	            freeModeSticky: false,
	            freeModeMinimumVelocity: 0.02,
	            // Autoheight
	            autoHeight: false,
	            // Set wrapper width
	            setWrapperSize: false,
	            // Virtual Translate
	            virtualTranslate: false,
	            // Effects
	            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
	            coverflow: {
	                rotate: 50,
	                stretch: 0,
	                depth: 100,
	                modifier: 1,
	                slideShadows : true
	            },
	            flip: {
	                slideShadows : true,
	                limitRotation: true
	            },
	            cube: {
	                slideShadows: true,
	                shadow: true,
	                shadowOffset: 20,
	                shadowScale: 0.94
	            },
	            fade: {
	                crossFade: false
	            },
	            // Parallax
	            parallax: false,
	            // Scrollbar
	            scrollbar: null,
	            scrollbarHide: true,
	            scrollbarDraggable: false,
	            scrollbarSnapOnRelease: false,
	            // Keyboard Mousewheel
	            keyboardControl: false,
	            mousewheelControl: false,
	            mousewheelReleaseOnEdges: false,
	            mousewheelInvert: false,
	            mousewheelForceToAxis: false,
	            mousewheelSensitivity: 1,
	            // Hash Navigation
	            hashnav: false,
	            // Breakpoints
	            breakpoints: undefined,
	            // Slides grid
	            spaceBetween: 0,
	            slidesPerView: 1,
	            slidesPerColumn: 1,
	            slidesPerColumnFill: 'column',
	            slidesPerGroup: 1,
	            centeredSlides: false,
	            slidesOffsetBefore: 0, // in px
	            slidesOffsetAfter: 0, // in px
	            // Round length
	            roundLengths: false,
	            // Touches
	            touchRatio: 1,
	            touchAngle: 45,
	            simulateTouch: true,
	            shortSwipes: true,
	            longSwipes: true,
	            longSwipesRatio: 0.5,
	            longSwipesMs: 300,
	            followFinger: true,
	            onlyExternal: false,
	            threshold: 0,
	            touchMoveStopPropagation: true,
	            // Unique Navigation Elements
	            uniqueNavElements: true,
	            // Pagination
	            pagination: null,
	            paginationElement: 'span',
	            paginationClickable: false,
	            paginationHide: false,
	            paginationBulletRender: null,
	            paginationProgressRender: null,
	            paginationFractionRender: null,
	            paginationCustomRender: null,
	            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
	            // Resistance
	            resistance: true,
	            resistanceRatio: 0.85,
	            // Next/prev buttons
	            nextButton: null,
	            prevButton: null,
	            // Progress
	            watchSlidesProgress: false,
	            watchSlidesVisibility: false,
	            // Cursor
	            grabCursor: false,
	            // Clicks
	            preventClicks: true,
	            preventClicksPropagation: true,
	            slideToClickedSlide: false,
	            // Lazy Loading
	            lazyLoading: false,
	            lazyLoadingInPrevNext: false,
	            lazyLoadingInPrevNextAmount: 1,
	            lazyLoadingOnTransitionStart: false,
	            // Images
	            preloadImages: true,
	            updateOnImagesReady: true,
	            // loop
	            loop: false,
	            loopAdditionalSlides: 0,
	            loopedSlides: null,
	            // Control
	            control: undefined,
	            controlInverse: false,
	            controlBy: 'slide', //or 'container'
	            // Swiping/no swiping
	            allowSwipeToPrev: true,
	            allowSwipeToNext: true,
	            swipeHandler: null, //'.swipe-handler',
	            noSwiping: true,
	            noSwipingClass: 'swiper-no-swiping',
	            // NS
	            slideClass: 'swiper-slide',
	            slideActiveClass: 'swiper-slide-active',
	            slideVisibleClass: 'swiper-slide-visible',
	            slideDuplicateClass: 'swiper-slide-duplicate',
	            slideNextClass: 'swiper-slide-next',
	            slidePrevClass: 'swiper-slide-prev',
	            wrapperClass: 'swiper-wrapper',
	            bulletClass: 'swiper-pagination-bullet',
	            bulletActiveClass: 'swiper-pagination-bullet-active',
	            buttonDisabledClass: 'swiper-button-disabled',
	            paginationCurrentClass: 'swiper-pagination-current',
	            paginationTotalClass: 'swiper-pagination-total',
	            paginationHiddenClass: 'swiper-pagination-hidden',
	            paginationProgressbarClass: 'swiper-pagination-progressbar',
	            // Observer
	            observer: false,
	            observeParents: false,
	            // Accessibility
	            a11y: false,
	            prevSlideMessage: 'Previous slide',
	            nextSlideMessage: 'Next slide',
	            firstSlideMessage: 'This is the first slide',
	            lastSlideMessage: 'This is the last slide',
	            paginationBulletMessage: 'Go to slide {{index}}',
	            // Callbacks
	            runCallbacksOnInit: true
	            /*
	            Callbacks:
	            onInit: function (swiper)
	            onDestroy: function (swiper)
	            onClick: function (swiper, e)
	            onTap: function (swiper, e)
	            onDoubleTap: function (swiper, e)
	            onSliderMove: function (swiper, e)
	            onSlideChangeStart: function (swiper)
	            onSlideChangeEnd: function (swiper)
	            onTransitionStart: function (swiper)
	            onTransitionEnd: function (swiper)
	            onImagesReady: function (swiper)
	            onProgress: function (swiper, progress)
	            onTouchStart: function (swiper, e)
	            onTouchMove: function (swiper, e)
	            onTouchMoveOpposite: function (swiper, e)
	            onTouchEnd: function (swiper, e)
	            onReachBeginning: function (swiper)
	            onReachEnd: function (swiper)
	            onSetTransition: function (swiper, duration)
	            onSetTranslate: function (swiper, translate)
	            onAutoplayStart: function (swiper)
	            onAutoplayStop: function (swiper),
	            onLazyImageLoad: function (swiper, slide, image)
	            onLazyImageReady: function (swiper, slide, image)
	            */
	        
	        };
	        var initialVirtualTranslate = params && params.virtualTranslate;
	        
	        params = params || {};
	        var originalParams = {};
	        for (var param in params) {
	            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
	                originalParams[param] = {};
	                for (var deepParam in params[param]) {
	                    originalParams[param][deepParam] = params[param][deepParam];
	                }
	            }
	            else {
	                originalParams[param] = params[param];
	            }
	        }
	        for (var def in defaults) {
	            if (typeof params[def] === 'undefined') {
	                params[def] = defaults[def];
	            }
	            else if (typeof params[def] === 'object') {
	                for (var deepDef in defaults[def]) {
	                    if (typeof params[def][deepDef] === 'undefined') {
	                        params[def][deepDef] = defaults[def][deepDef];
	                    }
	                }
	            }
	        }
	        
	        // Swiper
	        var s = this;
	        
	        // Params
	        s.params = params;
	        s.originalParams = originalParams;
	        
	        // Classname
	        s.classNames = [];
	        /*=========================
	          Dom Library and plugins
	          ===========================*/
	        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
	            $ = Dom7;
	        }
	        if (typeof $ === 'undefined') {
	            if (typeof Dom7 === 'undefined') {
	                $ = window.Dom7 || window.Zepto || window.jQuery;
	            }
	            else {
	                $ = Dom7;
	            }
	            if (!$) return;
	        }
	        // Export it to Swiper instance
	        s.$ = $;
	        
	        /*=========================
	          Breakpoints
	          ===========================*/
	        s.currentBreakpoint = undefined;
	        s.getActiveBreakpoint = function () {
	            //Get breakpoint for window width
	            if (!s.params.breakpoints) return false;
	            var breakpoint = false;
	            var points = [], point;
	            for ( point in s.params.breakpoints ) {
	                if (s.params.breakpoints.hasOwnProperty(point)) {
	                    points.push(point);
	                }
	            }
	            points.sort(function (a, b) {
	                return parseInt(a, 10) > parseInt(b, 10);
	            });
	            for (var i = 0; i < points.length; i++) {
	                point = points[i];
	                if (point >= window.innerWidth && !breakpoint) {
	                    breakpoint = point;
	                }
	            }
	            return breakpoint || 'max';
	        };
	        s.setBreakpoint = function () {
	            //Set breakpoint for window width and update parameters
	            var breakpoint = s.getActiveBreakpoint();
	            if (breakpoint && s.currentBreakpoint !== breakpoint) {
	                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
	                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
	                for ( var param in breakPointsParams ) {
	                    s.params[param] = breakPointsParams[param];
	                }
	                s.currentBreakpoint = breakpoint;
	                if(needsReLoop && s.destroyLoop) {
	                    s.reLoop(true);
	                }
	            }
	        };
	        // Set breakpoint on load
	        if (s.params.breakpoints) {
	            s.setBreakpoint();
	        }
	        
	        /*=========================
	          Preparation - Define Container, Wrapper and Pagination
	          ===========================*/
	        s.container = $(container);
	        if (s.container.length === 0) return;
	        if (s.container.length > 1) {
	            var swipers = [];
	            s.container.each(function () {
	                var container = this;
	                swipers.push(new Swiper(this, params));
	            });
	            return swipers;
	        }
	        
	        // Save instance in container HTML Element and in data
	        s.container[0].swiper = s;
	        s.container.data('swiper', s);
	        
	        s.classNames.push('swiper-container-' + s.params.direction);
	        
	        if (s.params.freeMode) {
	            s.classNames.push('swiper-container-free-mode');
	        }
	        if (!s.support.flexbox) {
	            s.classNames.push('swiper-container-no-flexbox');
	            s.params.slidesPerColumn = 1;
	        }
	        if (s.params.autoHeight) {
	            s.classNames.push('swiper-container-autoheight');
	        }
	        // Enable slides progress when required
	        if (s.params.parallax || s.params.watchSlidesVisibility) {
	            s.params.watchSlidesProgress = true;
	        }
	        // Coverflow / 3D
	        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
	            if (s.support.transforms3d) {
	                s.params.watchSlidesProgress = true;
	                s.classNames.push('swiper-container-3d');
	            }
	            else {
	                s.params.effect = 'slide';
	            }
	        }
	        if (s.params.effect !== 'slide') {
	            s.classNames.push('swiper-container-' + s.params.effect);
	        }
	        if (s.params.effect === 'cube') {
	            s.params.resistanceRatio = 0;
	            s.params.slidesPerView = 1;
	            s.params.slidesPerColumn = 1;
	            s.params.slidesPerGroup = 1;
	            s.params.centeredSlides = false;
	            s.params.spaceBetween = 0;
	            s.params.virtualTranslate = true;
	            s.params.setWrapperSize = false;
	        }
	        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
	            s.params.slidesPerView = 1;
	            s.params.slidesPerColumn = 1;
	            s.params.slidesPerGroup = 1;
	            s.params.watchSlidesProgress = true;
	            s.params.spaceBetween = 0;
	            s.params.setWrapperSize = false;
	            if (typeof initialVirtualTranslate === 'undefined') {
	                s.params.virtualTranslate = true;
	            }
	        }
	        
	        // Grab Cursor
	        if (s.params.grabCursor && s.support.touch) {
	            s.params.grabCursor = false;
	        }
	        
	        // Wrapper
	        s.wrapper = s.container.children('.' + s.params.wrapperClass);
	        
	        // Pagination
	        if (s.params.pagination) {
	            s.paginationContainer = $(s.params.pagination);
	            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
	                s.paginationContainer = s.container.find(s.params.pagination);
	            }
	        
	            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
	                s.paginationContainer.addClass('swiper-pagination-clickable');
	            }
	            else {
	                s.params.paginationClickable = false;
	            }
	            s.paginationContainer.addClass('swiper-pagination-' + s.params.paginationType);
	        }
	        // Next/Prev Buttons
	        if (s.params.nextButton || s.params.prevButton) {
	            if (s.params.nextButton) {
	                s.nextButton = $(s.params.nextButton);
	                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
	                    s.nextButton = s.container.find(s.params.nextButton);
	                }
	            }
	            if (s.params.prevButton) {
	                s.prevButton = $(s.params.prevButton);
	                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
	                    s.prevButton = s.container.find(s.params.prevButton);
	                }
	            }
	        }
	        
	        // Is Horizontal
	        s.isHorizontal = function () {
	            return s.params.direction === 'horizontal';
	        };
	        // s.isH = isH;
	        
	        // RTL
	        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
	        if (s.rtl) {
	            s.classNames.push('swiper-container-rtl');
	        }
	        
	        // Wrong RTL support
	        if (s.rtl) {
	            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
	        }
	        
	        // Columns
	        if (s.params.slidesPerColumn > 1) {
	            s.classNames.push('swiper-container-multirow');
	        }
	        
	        // Check for Android
	        if (s.device.android) {
	            s.classNames.push('swiper-container-android');
	        }
	        
	        // Add classes
	        s.container.addClass(s.classNames.join(' '));
	        
	        // Translate
	        s.translate = 0;
	        
	        // Progress
	        s.progress = 0;
	        
	        // Velocity
	        s.velocity = 0;
	        
	        /*=========================
	          Locks, unlocks
	          ===========================*/
	        s.lockSwipeToNext = function () {
	            s.params.allowSwipeToNext = false;
	        };
	        s.lockSwipeToPrev = function () {
	            s.params.allowSwipeToPrev = false;
	        };
	        s.lockSwipes = function () {
	            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
	        };
	        s.unlockSwipeToNext = function () {
	            s.params.allowSwipeToNext = true;
	        };
	        s.unlockSwipeToPrev = function () {
	            s.params.allowSwipeToPrev = true;
	        };
	        s.unlockSwipes = function () {
	            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
	        };
	        
	        /*=========================
	          Round helper
	          ===========================*/
	        function round(a) {
	            return Math.floor(a);
	        }
	        /*=========================
	          Set grab cursor
	          ===========================*/
	        if (s.params.grabCursor) {
	            s.container[0].style.cursor = 'move';
	            s.container[0].style.cursor = '-webkit-grab';
	            s.container[0].style.cursor = '-moz-grab';
	            s.container[0].style.cursor = 'grab';
	        }
	        /*=========================
	          Update on Images Ready
	          ===========================*/
	        s.imagesToLoad = [];
	        s.imagesLoaded = 0;
	        
	        s.loadImage = function (imgElement, src, srcset, checkForComplete, callback) {
	            var image;
	            function onReady () {
	                if (callback) callback();
	            }
	            if (!imgElement.complete || !checkForComplete) {
	                if (src) {
	                    image = new window.Image();
	                    image.onload = onReady;
	                    image.onerror = onReady;
	                    if (srcset) {
	                        image.srcset = srcset;
	                    }
	                    if (src) {
	                        image.src = src;
	                    }
	                } else {
	                    onReady();
	                }
	        
	            } else {//image already loaded...
	                onReady();
	            }
	        };
	        s.preloadImages = function () {
	            s.imagesToLoad = s.container.find('img');
	            function _onReady() {
	                if (typeof s === 'undefined' || s === null) return;
	                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
	                if (s.imagesLoaded === s.imagesToLoad.length) {
	                    if (s.params.updateOnImagesReady) s.update();
	                    s.emit('onImagesReady', s);
	                }
	            }
	            for (var i = 0; i < s.imagesToLoad.length; i++) {
	                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady);
	            }
	        };
	        
	        /*=========================
	          Autoplay
	          ===========================*/
	        s.autoplayTimeoutId = undefined;
	        s.autoplaying = false;
	        s.autoplayPaused = false;
	        function autoplay() {
	            s.autoplayTimeoutId = setTimeout(function () {
	                if (s.params.loop) {
	                    s.fixLoop();
	                    s._slideNext();
	                    s.emit('onAutoplay', s);
	                }
	                else {
	                    if (!s.isEnd) {
	                        s._slideNext();
	                        s.emit('onAutoplay', s);
	                    }
	                    else {
	                        if (!params.autoplayStopOnLast) {
	                            s._slideTo(0);
	                            s.emit('onAutoplay', s);
	                        }
	                        else {
	                            s.stopAutoplay();
	                        }
	                    }
	                }
	            }, s.params.autoplay);
	        }
	        s.startAutoplay = function () {
	            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
	            if (!s.params.autoplay) return false;
	            if (s.autoplaying) return false;
	            s.autoplaying = true;
	            s.emit('onAutoplayStart', s);
	            autoplay();
	        };
	        s.stopAutoplay = function (internal) {
	            if (!s.autoplayTimeoutId) return;
	            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	            s.autoplaying = false;
	            s.autoplayTimeoutId = undefined;
	            s.emit('onAutoplayStop', s);
	        };
	        s.pauseAutoplay = function (speed) {
	            if (s.autoplayPaused) return;
	            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	            s.autoplayPaused = true;
	            if (speed === 0) {
	                s.autoplayPaused = false;
	                autoplay();
	            }
	            else {
	                s.wrapper.transitionEnd(function () {
	                    if (!s) return;
	                    s.autoplayPaused = false;
	                    if (!s.autoplaying) {
	                        s.stopAutoplay();
	                    }
	                    else {
	                        autoplay();
	                    }
	                });
	            }
	        };
	        /*=========================
	          Min/Max Translate
	          ===========================*/
	        s.minTranslate = function () {
	            return (-s.snapGrid[0]);
	        };
	        s.maxTranslate = function () {
	            return (-s.snapGrid[s.snapGrid.length - 1]);
	        };
	        /*=========================
	          Slider/slides sizes
	          ===========================*/
	        s.updateAutoHeight = function () {
	            // Update Height
	            var slide = s.slides.eq(s.activeIndex)[0];
	            if (typeof slide !== 'undefined') {
	                var newHeight = slide.offsetHeight;
	                if (newHeight) s.wrapper.css('height', newHeight + 'px');
	            }
	        };
	        s.updateContainerSize = function () {
	            var width, height;
	            if (typeof s.params.width !== 'undefined') {
	                width = s.params.width;
	            }
	            else {
	                width = s.container[0].clientWidth;
	            }
	            if (typeof s.params.height !== 'undefined') {
	                height = s.params.height;
	            }
	            else {
	                height = s.container[0].clientHeight;
	            }
	            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
	                return;
	            }
	        
	            //Subtract paddings
	            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
	            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
	        
	            // Store values
	            s.width = width;
	            s.height = height;
	            s.size = s.isHorizontal() ? s.width : s.height;
	        };
	        
	        s.updateSlidesSize = function () {
	            s.slides = s.wrapper.children('.' + s.params.slideClass);
	            s.snapGrid = [];
	            s.slidesGrid = [];
	            s.slidesSizesGrid = [];
	        
	            var spaceBetween = s.params.spaceBetween,
	                slidePosition = -s.params.slidesOffsetBefore,
	                i,
	                prevSlideSize = 0,
	                index = 0;
	            if (typeof s.size === 'undefined') return;
	            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
	                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
	            }
	        
	            s.virtualSize = -spaceBetween;
	            // reset margins
	            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
	            else s.slides.css({marginRight: '', marginBottom: ''});
	        
	            var slidesNumberEvenToRows;
	            if (s.params.slidesPerColumn > 1) {
	                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
	                    slidesNumberEvenToRows = s.slides.length;
	                }
	                else {
	                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
	                }
	                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
	                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
	                }
	            }
	        
	            // Calc slides
	            var slideSize;
	            var slidesPerColumn = s.params.slidesPerColumn;
	            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
	            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
	            for (i = 0; i < s.slides.length; i++) {
	                slideSize = 0;
	                var slide = s.slides.eq(i);
	                if (s.params.slidesPerColumn > 1) {
	                    // Set slides order
	                    var newSlideOrderIndex;
	                    var column, row;
	                    if (s.params.slidesPerColumnFill === 'column') {
	                        column = Math.floor(i / slidesPerColumn);
	                        row = i - column * slidesPerColumn;
	                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
	                            if (++row >= slidesPerColumn) {
	                                row = 0;
	                                column++;
	                            }
	                        }
	                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
	                        slide
	                            .css({
	                                '-webkit-box-ordinal-group': newSlideOrderIndex,
	                                '-moz-box-ordinal-group': newSlideOrderIndex,
	                                '-ms-flex-order': newSlideOrderIndex,
	                                '-webkit-order': newSlideOrderIndex,
	                                'order': newSlideOrderIndex
	                            });
	                    }
	                    else {
	                        row = Math.floor(i / slidesPerRow);
	                        column = i - row * slidesPerRow;
	                    }
	                    slide
	                        .css({
	                            'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
	                        })
	                        .attr('data-swiper-column', column)
	                        .attr('data-swiper-row', row);
	        
	                }
	                if (slide.css('display') === 'none') continue;
	                if (s.params.slidesPerView === 'auto') {
	                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
	                    if (s.params.roundLengths) slideSize = round(slideSize);
	                }
	                else {
	                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
	                    if (s.params.roundLengths) slideSize = round(slideSize);
	        
	                    if (s.isHorizontal()) {
	                        s.slides[i].style.width = slideSize + 'px';
	                    }
	                    else {
	                        s.slides[i].style.height = slideSize + 'px';
	                    }
	                }
	                s.slides[i].swiperSlideSize = slideSize;
	                s.slidesSizesGrid.push(slideSize);
	        
	        
	                if (s.params.centeredSlides) {
	                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
	                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
	                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
	                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                    s.slidesGrid.push(slidePosition);
	                }
	                else {
	                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                    s.slidesGrid.push(slidePosition);
	                    slidePosition = slidePosition + slideSize + spaceBetween;
	                }
	        
	                s.virtualSize += slideSize + spaceBetween;
	        
	                prevSlideSize = slideSize;
	        
	                index ++;
	            }
	            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
	            var newSlidesGrid;
	        
	            if (
	                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
	                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	            }
	            if (!s.support.flexbox || s.params.setWrapperSize) {
	                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
	            }
	        
	            if (s.params.slidesPerColumn > 1) {
	                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
	                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
	                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	                if (s.params.centeredSlides) {
	                    newSlidesGrid = [];
	                    for (i = 0; i < s.snapGrid.length; i++) {
	                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
	                    }
	                    s.snapGrid = newSlidesGrid;
	                }
	            }
	        
	            // Remove last grid elements depending on width
	            if (!s.params.centeredSlides) {
	                newSlidesGrid = [];
	                for (i = 0; i < s.snapGrid.length; i++) {
	                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
	                        newSlidesGrid.push(s.snapGrid[i]);
	                    }
	                }
	                s.snapGrid = newSlidesGrid;
	                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
	                    s.snapGrid.push(s.virtualSize - s.size);
	                }
	            }
	            if (s.snapGrid.length === 0) s.snapGrid = [0];
	        
	            if (s.params.spaceBetween !== 0) {
	                if (s.isHorizontal()) {
	                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
	                    else s.slides.css({marginRight: spaceBetween + 'px'});
	                }
	                else s.slides.css({marginBottom: spaceBetween + 'px'});
	            }
	            if (s.params.watchSlidesProgress) {
	                s.updateSlidesOffset();
	            }
	        };
	        s.updateSlidesOffset = function () {
	            for (var i = 0; i < s.slides.length; i++) {
	                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
	            }
	        };
	        
	        /*=========================
	          Slider/slides progress
	          ===========================*/
	        s.updateSlidesProgress = function (translate) {
	            if (typeof translate === 'undefined') {
	                translate = s.translate || 0;
	            }
	            if (s.slides.length === 0) return;
	            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
	        
	            var offsetCenter = -translate;
	            if (s.rtl) offsetCenter = translate;
	        
	            // Visible Slides
	            s.slides.removeClass(s.params.slideVisibleClass);
	            for (var i = 0; i < s.slides.length; i++) {
	                var slide = s.slides[i];
	                var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
	                if (s.params.watchSlidesVisibility) {
	                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
	                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
	                    var isVisible =
	                        (slideBefore >= 0 && slideBefore < s.size) ||
	                        (slideAfter > 0 && slideAfter <= s.size) ||
	                        (slideBefore <= 0 && slideAfter >= s.size);
	                    if (isVisible) {
	                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
	                    }
	                }
	                slide.progress = s.rtl ? -slideProgress : slideProgress;
	            }
	        };
	        s.updateProgress = function (translate) {
	            if (typeof translate === 'undefined') {
	                translate = s.translate || 0;
	            }
	            var translatesDiff = s.maxTranslate() - s.minTranslate();
	            var wasBeginning = s.isBeginning;
	            var wasEnd = s.isEnd;
	            if (translatesDiff === 0) {
	                s.progress = 0;
	                s.isBeginning = s.isEnd = true;
	            }
	            else {
	                s.progress = (translate - s.minTranslate()) / (translatesDiff);
	                s.isBeginning = s.progress <= 0;
	                s.isEnd = s.progress >= 1;
	            }
	            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
	            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
	        
	            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
	            s.emit('onProgress', s, s.progress);
	        };
	        s.updateActiveIndex = function () {
	            var translate = s.rtl ? s.translate : -s.translate;
	            var newActiveIndex, i, snapIndex;
	            for (i = 0; i < s.slidesGrid.length; i ++) {
	                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
	                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
	                        newActiveIndex = i;
	                    }
	                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
	                        newActiveIndex = i + 1;
	                    }
	                }
	                else {
	                    if (translate >= s.slidesGrid[i]) {
	                        newActiveIndex = i;
	                    }
	                }
	            }
	            // Normalize slideIndex
	            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
	            // for (i = 0; i < s.slidesGrid.length; i++) {
	                // if (- translate >= s.slidesGrid[i]) {
	                    // newActiveIndex = i;
	                // }
	            // }
	            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
	            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
	        
	            if (newActiveIndex === s.activeIndex) {
	                return;
	            }
	            s.snapIndex = snapIndex;
	            s.previousIndex = s.activeIndex;
	            s.activeIndex = newActiveIndex;
	            s.updateClasses();
	        };
	        
	        /*=========================
	          Classes
	          ===========================*/
	        s.updateClasses = function () {
	            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
	            var activeSlide = s.slides.eq(s.activeIndex);
	            // Active classes
	            activeSlide.addClass(s.params.slideActiveClass);
	            // Next Slide
	            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
	            if (s.params.loop && nextSlide.length === 0) {
	                s.slides.eq(0).addClass(s.params.slideNextClass);
	            }
	            // Prev Slide
	            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
	            if (s.params.loop && prevSlide.length === 0) {
	                s.slides.eq(-1).addClass(s.params.slidePrevClass);
	            }
	        
	            // Pagination
	            if (s.paginationContainer && s.paginationContainer.length > 0) {
	                // Current/Total
	                var current,
	                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	                if (s.params.loop) {
	                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
	                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
	                        current = current - (s.slides.length - s.loopedSlides * 2);
	                    }
	                    if (current > total - 1) current = current - total;
	                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
	                }
	                else {
	                    if (typeof s.snapIndex !== 'undefined') {
	                        current = s.snapIndex;
	                    }
	                    else {
	                        current = s.activeIndex || 0;
	                    }
	                }
	                // Types
	                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
	                    s.bullets.removeClass(s.params.bulletActiveClass);
	                    if (s.paginationContainer.length > 1) {
	                        s.bullets.each(function () {
	                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
	                        });
	                    }
	                    else {
	                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
	                    }
	                }
	                if (s.params.paginationType === 'fraction') {
	                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
	                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
	                }
	                if (s.params.paginationType === 'progress') {
	                    var scale = (current + 1) / total,
	                        scaleX = scale,
	                        scaleY = 1;
	                    if (!s.isHorizontal()) {
	                        scaleY = scale;
	                        scaleX = 1;
	                    }
	                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
	                }
	                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
	                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
	                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
	                }
	            }
	        
	            // Next/active buttons
	            if (!s.params.loop) {
	                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
	                    if (s.isBeginning) {
	                        s.prevButton.addClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
	                    }
	                    else {
	                        s.prevButton.removeClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
	                    }
	                }
	                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
	                    if (s.isEnd) {
	                        s.nextButton.addClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
	                    }
	                    else {
	                        s.nextButton.removeClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
	                    }
	                }
	            }
	        };
	        
	        /*=========================
	          Pagination
	          ===========================*/
	        s.updatePagination = function () {
	            if (!s.params.pagination) return;
	            if (s.paginationContainer && s.paginationContainer.length > 0) {
	                var paginationHTML = '';
	                if (s.params.paginationType === 'bullets') {
	                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	                    for (var i = 0; i < numberOfBullets; i++) {
	                        if (s.params.paginationBulletRender) {
	                            paginationHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
	                        }
	                        else {
	                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
	                        }
	                    }
	                    s.paginationContainer.html(paginationHTML);
	                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
	                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
	                        s.a11y.initPagination();
	                    }
	                }
	                if (s.params.paginationType === 'fraction') {
	                    if (s.params.paginationFractionRender) {
	                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
	                    }
	                    else {
	                        paginationHTML =
	                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
	                            ' / ' +
	                            '<span class="' + s.params.paginationTotalClass+'"></span>';
	                    }
	                    s.paginationContainer.html(paginationHTML);
	                }
	                if (s.params.paginationType === 'progress') {
	                    if (s.params.paginationProgressRender) {
	                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
	                    }
	                    else {
	                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
	                    }
	                    s.paginationContainer.html(paginationHTML);
	                }
	                if (s.params.paginationType !== 'custom') {
	                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
	                }
	            }
	        };
	        /*=========================
	          Common update method
	          ===========================*/
	        s.update = function (updateTranslate) {
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            s.updateProgress();
	            s.updatePagination();
	            s.updateClasses();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	            }
	            function forceSetTranslate() {
	                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	                s.setWrapperTranslate(newTranslate);
	                s.updateActiveIndex();
	                s.updateClasses();
	            }
	            if (updateTranslate) {
	                var translated, newTranslate;
	                if (s.controller && s.controller.spline) {
	                    s.controller.spline = undefined;
	                }
	                if (s.params.freeMode) {
	                    forceSetTranslate();
	                    if (s.params.autoHeight) {
	                        s.updateAutoHeight();
	                    }
	                }
	                else {
	                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
	                    }
	                    else {
	                        translated = s.slideTo(s.activeIndex, 0, false, true);
	                    }
	                    if (!translated) {
	                        forceSetTranslate();
	                    }
	                }
	            }
	            else if (s.params.autoHeight) {
	                s.updateAutoHeight();
	            }
	        };
	        
	        /*=========================
	          Resize Handler
	          ===========================*/
	        s.onResize = function (forceUpdatePagination) {
	            //Breakpoints
	            if (s.params.breakpoints) {
	                s.setBreakpoint();
	            }
	        
	            // Disable locks on resize
	            var allowSwipeToPrev = s.params.allowSwipeToPrev;
	            var allowSwipeToNext = s.params.allowSwipeToNext;
	            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
	        
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	            }
	            if (s.controller && s.controller.spline) {
	                s.controller.spline = undefined;
	            }
	            var slideChangedBySlideTo = false;
	            if (s.params.freeMode) {
	                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	                s.setWrapperTranslate(newTranslate);
	                s.updateActiveIndex();
	                s.updateClasses();
	        
	                if (s.params.autoHeight) {
	                    s.updateAutoHeight();
	                }
	            }
	            else {
	                s.updateClasses();
	                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
	                }
	                else {
	                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
	                }
	            }
	            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
	                s.lazy.load();
	            }
	            // Return locks after resize
	            s.params.allowSwipeToPrev = allowSwipeToPrev;
	            s.params.allowSwipeToNext = allowSwipeToNext;
	        };
	        
	        /*=========================
	          Events
	          ===========================*/
	        
	        //Define Touch Events
	        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
	        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
	        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	        s.touchEvents = {
	            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
	            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
	            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
	        };
	        
	        
	        // WP8 Touch Events Fix
	        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
	            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
	        }
	        
	        // Attach/detach events
	        s.initEvents = function (detach) {
	            var actionDom = detach ? 'off' : 'on';
	            var action = detach ? 'removeEventListener' : 'addEventListener';
	            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
	            var target = s.support.touch ? touchEventsTarget : document;
	        
	            var moveCapture = s.params.nested ? true : false;
	        
	            //Touch Events
	            if (s.browser.ie) {
	                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                target[action](s.touchEvents.end, s.onTouchEnd, false);
	            }
	            else {
	                if (s.support.touch) {
	                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
	                }
	                if (params.simulateTouch && !s.device.ios && !s.device.android) {
	                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
	                    document[action]('mousemove', s.onTouchMove, moveCapture);
	                    document[action]('mouseup', s.onTouchEnd, false);
	                }
	            }
	            window[action]('resize', s.onResize);
	        
	            // Next, Prev, Index
	            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
	                s.nextButton[actionDom]('click', s.onClickNext);
	                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
	            }
	            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
	                s.prevButton[actionDom]('click', s.onClickPrev);
	                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
	            }
	            if (s.params.pagination && s.params.paginationClickable) {
	                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
	                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
	            }
	        
	            // Prevent Links Clicks
	            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
	        };
	        s.attachEvents = function () {
	            s.initEvents();
	        };
	        s.detachEvents = function () {
	            s.initEvents(true);
	        };
	        
	        /*=========================
	          Handle Clicks
	          ===========================*/
	        // Prevent Clicks
	        s.allowClick = true;
	        s.preventClicks = function (e) {
	            if (!s.allowClick) {
	                if (s.params.preventClicks) e.preventDefault();
	                if (s.params.preventClicksPropagation && s.animating) {
	                    e.stopPropagation();
	                    e.stopImmediatePropagation();
	                }
	            }
	        };
	        // Clicks
	        s.onClickNext = function (e) {
	            e.preventDefault();
	            if (s.isEnd && !s.params.loop) return;
	            s.slideNext();
	        };
	        s.onClickPrev = function (e) {
	            e.preventDefault();
	            if (s.isBeginning && !s.params.loop) return;
	            s.slidePrev();
	        };
	        s.onClickIndex = function (e) {
	            e.preventDefault();
	            var index = $(this).index() * s.params.slidesPerGroup;
	            if (s.params.loop) index = index + s.loopedSlides;
	            s.slideTo(index);
	        };
	        
	        /*=========================
	          Handle Touches
	          ===========================*/
	        function findElementInEvent(e, selector) {
	            var el = $(e.target);
	            if (!el.is(selector)) {
	                if (typeof selector === 'string') {
	                    el = el.parents(selector);
	                }
	                else if (selector.nodeType) {
	                    var found;
	                    el.parents().each(function (index, _el) {
	                        if (_el === selector) found = selector;
	                    });
	                    if (!found) return undefined;
	                    else return selector;
	                }
	            }
	            if (el.length === 0) {
	                return undefined;
	            }
	            return el[0];
	        }
	        s.updateClickedSlide = function (e) {
	            var slide = findElementInEvent(e, '.' + s.params.slideClass);
	            var slideFound = false;
	            if (slide) {
	                for (var i = 0; i < s.slides.length; i++) {
	                    if (s.slides[i] === slide) slideFound = true;
	                }
	            }
	        
	            if (slide && slideFound) {
	                s.clickedSlide = slide;
	                s.clickedIndex = $(slide).index();
	            }
	            else {
	                s.clickedSlide = undefined;
	                s.clickedIndex = undefined;
	                return;
	            }
	            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
	                var slideToIndex = s.clickedIndex,
	                    realIndex,
	                    duplicatedSlides;
	                if (s.params.loop) {
	                    if (s.animating) return;
	                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
	                    if (s.params.centeredSlides) {
	                        if ((slideToIndex < s.loopedSlides - s.params.slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView/2)) {
	                            s.fixLoop();
	                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
	                            setTimeout(function () {
	                                s.slideTo(slideToIndex);
	                            }, 0);
	                        }
	                        else {
	                            s.slideTo(slideToIndex);
	                        }
	                    }
	                    else {
	                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
	                            s.fixLoop();
	                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
	                            setTimeout(function () {
	                                s.slideTo(slideToIndex);
	                            }, 0);
	                        }
	                        else {
	                            s.slideTo(slideToIndex);
	                        }
	                    }
	                }
	                else {
	                    s.slideTo(slideToIndex);
	                }
	            }
	        };
	        
	        var isTouched,
	            isMoved,
	            allowTouchCallbacks,
	            touchStartTime,
	            isScrolling,
	            currentTranslate,
	            startTranslate,
	            allowThresholdMove,
	            // Form elements to match
	            formElements = 'input, select, textarea, button',
	            // Last click time
	            lastClickTime = Date.now(), clickTimeout,
	            //Velocities
	            velocities = [],
	            allowMomentumBounce;
	        
	        // Animating Flag
	        s.animating = false;
	        
	        // Touches information
	        s.touches = {
	            startX: 0,
	            startY: 0,
	            currentX: 0,
	            currentY: 0,
	            diff: 0
	        };
	        
	        // Touch handlers
	        var isTouchEvent, startMoving;
	        s.onTouchStart = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            isTouchEvent = e.type === 'touchstart';
	            if (!isTouchEvent && 'which' in e && e.which === 3) return;
	            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
	                s.allowClick = true;
	                return;
	            }
	            if (s.params.swipeHandler) {
	                if (!findElementInEvent(e, s.params.swipeHandler)) return;
	            }
	        
	            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	        
	            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
	            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
	                return;
	            }
	        
	            isTouched = true;
	            isMoved = false;
	            allowTouchCallbacks = true;
	            isScrolling = undefined;
	            startMoving = undefined;
	            s.touches.startX = startX;
	            s.touches.startY = startY;
	            touchStartTime = Date.now();
	            s.allowClick = true;
	            s.updateContainerSize();
	            s.swipeDirection = undefined;
	            if (s.params.threshold > 0) allowThresholdMove = false;
	            if (e.type !== 'touchstart') {
	                var preventDefault = true;
	                if ($(e.target).is(formElements)) preventDefault = false;
	                if (document.activeElement && $(document.activeElement).is(formElements)) {
	                    document.activeElement.blur();
	                }
	                if (preventDefault) {
	                    e.preventDefault();
	                }
	            }
	            s.emit('onTouchStart', s, e);
	        };
	        
	        s.onTouchMove = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            if (isTouchEvent && e.type === 'mousemove') return;
	            if (e.preventedByNestedSwiper) {
	                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                return;
	            }
	            if (s.params.onlyExternal) {
	                // isMoved = true;
	                s.allowClick = false;
	                if (isTouched) {
	                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                    touchStartTime = Date.now();
	                }
	                return;
	            }
	            if (isTouchEvent && document.activeElement) {
	                if (e.target === document.activeElement && $(e.target).is(formElements)) {
	                    isMoved = true;
	                    s.allowClick = false;
	                    return;
	                }
	            }
	            if (allowTouchCallbacks) {
	                s.emit('onTouchMove', s, e);
	            }
	            if (e.targetTouches && e.targetTouches.length > 1) return;
	        
	            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	        
	            if (typeof isScrolling === 'undefined') {
	                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
	                isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
	            }
	            if (isScrolling) {
	                s.emit('onTouchMoveOpposite', s, e);
	            }
	            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
	                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
	                    startMoving = true;
	                }
	            }
	            if (!isTouched) return;
	            if (isScrolling)  {
	                isTouched = false;
	                return;
	            }
	            if (!startMoving && s.browser.ieTouch) {
	                return;
	            }
	            s.allowClick = false;
	            s.emit('onSliderMove', s, e);
	            e.preventDefault();
	            if (s.params.touchMoveStopPropagation && !s.params.nested) {
	                e.stopPropagation();
	            }
	        
	            if (!isMoved) {
	                if (params.loop) {
	                    s.fixLoop();
	                }
	                startTranslate = s.getWrapperTranslate();
	                s.setWrapperTransition(0);
	                if (s.animating) {
	                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
	                }
	                if (s.params.autoplay && s.autoplaying) {
	                    if (s.params.autoplayDisableOnInteraction) {
	                        s.stopAutoplay();
	                    }
	                    else {
	                        s.pauseAutoplay();
	                    }
	                }
	                allowMomentumBounce = false;
	                //Grab Cursor
	                if (s.params.grabCursor) {
	                    s.container[0].style.cursor = 'move';
	                    s.container[0].style.cursor = '-webkit-grabbing';
	                    s.container[0].style.cursor = '-moz-grabbin';
	                    s.container[0].style.cursor = 'grabbing';
	                }
	            }
	            isMoved = true;
	        
	            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	        
	            diff = diff * s.params.touchRatio;
	            if (s.rtl) diff = -diff;
	        
	            s.swipeDirection = diff > 0 ? 'prev' : 'next';
	            currentTranslate = diff + startTranslate;
	        
	            var disableParentSwiper = true;
	            if ((diff > 0 && currentTranslate > s.minTranslate())) {
	                disableParentSwiper = false;
	                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
	            }
	            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
	                disableParentSwiper = false;
	                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
	            }
	        
	            if (disableParentSwiper) {
	                e.preventedByNestedSwiper = true;
	            }
	        
	            // Directions locks
	            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
	                currentTranslate = startTranslate;
	            }
	            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
	                currentTranslate = startTranslate;
	            }
	        
	            if (!s.params.followFinger) return;
	        
	            // Threshold
	            if (s.params.threshold > 0) {
	                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
	                    if (!allowThresholdMove) {
	                        allowThresholdMove = true;
	                        s.touches.startX = s.touches.currentX;
	                        s.touches.startY = s.touches.currentY;
	                        currentTranslate = startTranslate;
	                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	                        return;
	                    }
	                }
	                else {
	                    currentTranslate = startTranslate;
	                    return;
	                }
	            }
	            // Update active index in free mode
	            if (s.params.freeMode || s.params.watchSlidesProgress) {
	                s.updateActiveIndex();
	            }
	            if (s.params.freeMode) {
	                //Velocity
	                if (velocities.length === 0) {
	                    velocities.push({
	                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
	                        time: touchStartTime
	                    });
	                }
	                velocities.push({
	                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
	                    time: (new window.Date()).getTime()
	                });
	            }
	            // Update progress
	            s.updateProgress(currentTranslate);
	            // Update translate
	            s.setWrapperTranslate(currentTranslate);
	        };
	        s.onTouchEnd = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            if (allowTouchCallbacks) {
	                s.emit('onTouchEnd', s, e);
	            }
	            allowTouchCallbacks = false;
	            if (!isTouched) return;
	            //Return Grab Cursor
	            if (s.params.grabCursor && isMoved && isTouched) {
	                s.container[0].style.cursor = 'move';
	                s.container[0].style.cursor = '-webkit-grab';
	                s.container[0].style.cursor = '-moz-grab';
	                s.container[0].style.cursor = 'grab';
	            }
	        
	            // Time diff
	            var touchEndTime = Date.now();
	            var timeDiff = touchEndTime - touchStartTime;
	        
	            // Tap, doubleTap, Click
	            if (s.allowClick) {
	                s.updateClickedSlide(e);
	                s.emit('onTap', s, e);
	                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
	                    if (clickTimeout) clearTimeout(clickTimeout);
	                    clickTimeout = setTimeout(function () {
	                        if (!s) return;
	                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
	                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
	                        }
	                        s.emit('onClick', s, e);
	                    }, 300);
	        
	                }
	                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
	                    if (clickTimeout) clearTimeout(clickTimeout);
	                    s.emit('onDoubleTap', s, e);
	                }
	            }
	        
	            lastClickTime = Date.now();
	            setTimeout(function () {
	                if (s) s.allowClick = true;
	            }, 0);
	        
	            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
	                isTouched = isMoved = false;
	                return;
	            }
	            isTouched = isMoved = false;
	        
	            var currentPos;
	            if (s.params.followFinger) {
	                currentPos = s.rtl ? s.translate : -s.translate;
	            }
	            else {
	                currentPos = -currentTranslate;
	            }
	            if (s.params.freeMode) {
	                if (currentPos < -s.minTranslate()) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                else if (currentPos > -s.maxTranslate()) {
	                    if (s.slides.length < s.snapGrid.length) {
	                        s.slideTo(s.snapGrid.length - 1);
	                    }
	                    else {
	                        s.slideTo(s.slides.length - 1);
	                    }
	                    return;
	                }
	        
	                if (s.params.freeModeMomentum) {
	                    if (velocities.length > 1) {
	                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
	        
	                        var distance = lastMoveEvent.position - velocityEvent.position;
	                        var time = lastMoveEvent.time - velocityEvent.time;
	                        s.velocity = distance / time;
	                        s.velocity = s.velocity / 2;
	                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
	                            s.velocity = 0;
	                        }
	                        // this implies that the user stopped moving a finger then released.
	                        // There would be no events with distance zero, so the last event is stale.
	                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
	                            s.velocity = 0;
	                        }
	                    } else {
	                        s.velocity = 0;
	                    }
	        
	                    velocities.length = 0;
	                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
	                    var momentumDistance = s.velocity * momentumDuration;
	        
	                    var newPosition = s.translate + momentumDistance;
	                    if (s.rtl) newPosition = - newPosition;
	                    var doBounce = false;
	                    var afterBouncePosition;
	                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
	                    if (newPosition < s.maxTranslate()) {
	                        if (s.params.freeModeMomentumBounce) {
	                            if (newPosition + s.maxTranslate() < -bounceAmount) {
	                                newPosition = s.maxTranslate() - bounceAmount;
	                            }
	                            afterBouncePosition = s.maxTranslate();
	                            doBounce = true;
	                            allowMomentumBounce = true;
	                        }
	                        else {
	                            newPosition = s.maxTranslate();
	                        }
	                    }
	                    else if (newPosition > s.minTranslate()) {
	                        if (s.params.freeModeMomentumBounce) {
	                            if (newPosition - s.minTranslate() > bounceAmount) {
	                                newPosition = s.minTranslate() + bounceAmount;
	                            }
	                            afterBouncePosition = s.minTranslate();
	                            doBounce = true;
	                            allowMomentumBounce = true;
	                        }
	                        else {
	                            newPosition = s.minTranslate();
	                        }
	                    }
	                    else if (s.params.freeModeSticky) {
	                        var j = 0,
	                            nextSlide;
	                        for (j = 0; j < s.snapGrid.length; j += 1) {
	                            if (s.snapGrid[j] > -newPosition) {
	                                nextSlide = j;
	                                break;
	                            }
	        
	                        }
	                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
	                            newPosition = s.snapGrid[nextSlide];
	                        } else {
	                            newPosition = s.snapGrid[nextSlide - 1];
	                        }
	                        if (!s.rtl) newPosition = - newPosition;
	                    }
	                    //Fix duration
	                    if (s.velocity !== 0) {
	                        if (s.rtl) {
	                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
	                        }
	                        else {
	                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
	                        }
	                    }
	                    else if (s.params.freeModeSticky) {
	                        s.slideReset();
	                        return;
	                    }
	        
	                    if (s.params.freeModeMomentumBounce && doBounce) {
	                        s.updateProgress(afterBouncePosition);
	                        s.setWrapperTransition(momentumDuration);
	                        s.setWrapperTranslate(newPosition);
	                        s.onTransitionStart();
	                        s.animating = true;
	                        s.wrapper.transitionEnd(function () {
	                            if (!s || !allowMomentumBounce) return;
	                            s.emit('onMomentumBounce', s);
	        
	                            s.setWrapperTransition(s.params.speed);
	                            s.setWrapperTranslate(afterBouncePosition);
	                            s.wrapper.transitionEnd(function () {
	                                if (!s) return;
	                                s.onTransitionEnd();
	                            });
	                        });
	                    } else if (s.velocity) {
	                        s.updateProgress(newPosition);
	                        s.setWrapperTransition(momentumDuration);
	                        s.setWrapperTranslate(newPosition);
	                        s.onTransitionStart();
	                        if (!s.animating) {
	                            s.animating = true;
	                            s.wrapper.transitionEnd(function () {
	                                if (!s) return;
	                                s.onTransitionEnd();
	                            });
	                        }
	        
	                    } else {
	                        s.updateProgress(newPosition);
	                    }
	        
	                    s.updateActiveIndex();
	                }
	                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
	                    s.updateProgress();
	                    s.updateActiveIndex();
	                }
	                return;
	            }
	        
	            // Find current slide
	            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
	            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
	                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
	                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
	                        stopIndex = i;
	                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
	                    }
	                }
	                else {
	                    if (currentPos >= s.slidesGrid[i]) {
	                        stopIndex = i;
	                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
	                    }
	                }
	            }
	        
	            // Find current slide size
	            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
	        
	            if (timeDiff > s.params.longSwipesMs) {
	                // Long touches
	                if (!s.params.longSwipes) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                if (s.swipeDirection === 'next') {
	                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                    else s.slideTo(stopIndex);
	        
	                }
	                if (s.swipeDirection === 'prev') {
	                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                    else s.slideTo(stopIndex);
	                }
	            }
	            else {
	                // Short swipes
	                if (!s.params.shortSwipes) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                if (s.swipeDirection === 'next') {
	                    s.slideTo(stopIndex + s.params.slidesPerGroup);
	        
	                }
	                if (s.swipeDirection === 'prev') {
	                    s.slideTo(stopIndex);
	                }
	            }
	        };
	        /*=========================
	          Transitions
	          ===========================*/
	        s._slideTo = function (slideIndex, speed) {
	            return s.slideTo(slideIndex, speed, true, true);
	        };
	        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (typeof slideIndex === 'undefined') slideIndex = 0;
	            if (slideIndex < 0) slideIndex = 0;
	            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
	            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
	        
	            var translate = - s.snapGrid[s.snapIndex];
	            // Stop autoplay
	            if (s.params.autoplay && s.autoplaying) {
	                if (internal || !s.params.autoplayDisableOnInteraction) {
	                    s.pauseAutoplay(speed);
	                }
	                else {
	                    s.stopAutoplay();
	                }
	            }
	            // Update progress
	            s.updateProgress(translate);
	        
	            // Normalize slideIndex
	            for (var i = 0; i < s.slidesGrid.length; i++) {
	                if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
	                    slideIndex = i;
	                }
	            }
	        
	            // Directions locks
	            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
	                return false;
	            }
	            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
	                if ((s.activeIndex || 0) !== slideIndex ) return false;
	            }
	        
	            // Update Index
	            if (typeof speed === 'undefined') speed = s.params.speed;
	            s.previousIndex = s.activeIndex || 0;
	            s.activeIndex = slideIndex;
	        
	            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
	                // Update Height
	                if (s.params.autoHeight) {
	                    s.updateAutoHeight();
	                }
	                s.updateClasses();
	                if (s.params.effect !== 'slide') {
	                    s.setWrapperTranslate(translate);
	                }
	                return false;
	            }
	            s.updateClasses();
	            s.onTransitionStart(runCallbacks);
	        
	            if (speed === 0) {
	                s.setWrapperTranslate(translate);
	                s.setWrapperTransition(0);
	                s.onTransitionEnd(runCallbacks);
	            }
	            else {
	                s.setWrapperTranslate(translate);
	                s.setWrapperTransition(speed);
	                if (!s.animating) {
	                    s.animating = true;
	                    s.wrapper.transitionEnd(function () {
	                        if (!s) return;
	                        s.onTransitionEnd(runCallbacks);
	                    });
	                }
	        
	            }
	        
	            return true;
	        };
	        
	        s.onTransitionStart = function (runCallbacks) {
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (s.params.autoHeight) {
	                s.updateAutoHeight();
	            }
	            if (s.lazy) s.lazy.onTransitionStart();
	            if (runCallbacks) {
	                s.emit('onTransitionStart', s);
	                if (s.activeIndex !== s.previousIndex) {
	                    s.emit('onSlideChangeStart', s);
	                    if (s.activeIndex > s.previousIndex) {
	                        s.emit('onSlideNextStart', s);
	                    }
	                    else {
	                        s.emit('onSlidePrevStart', s);
	                    }
	                }
	        
	            }
	        };
	        s.onTransitionEnd = function (runCallbacks) {
	            s.animating = false;
	            s.setWrapperTransition(0);
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (s.lazy) s.lazy.onTransitionEnd();
	            if (runCallbacks) {
	                s.emit('onTransitionEnd', s);
	                if (s.activeIndex !== s.previousIndex) {
	                    s.emit('onSlideChangeEnd', s);
	                    if (s.activeIndex > s.previousIndex) {
	                        s.emit('onSlideNextEnd', s);
	                    }
	                    else {
	                        s.emit('onSlidePrevEnd', s);
	                    }
	                }
	            }
	            if (s.params.hashnav && s.hashnav) {
	                s.hashnav.setHash();
	            }
	        
	        };
	        s.slideNext = function (runCallbacks, speed, internal) {
	            if (s.params.loop) {
	                if (s.animating) return false;
	                s.fixLoop();
	                var clientLeft = s.container[0].clientLeft;
	                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	            }
	            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	        };
	        s._slideNext = function (speed) {
	            return s.slideNext(true, speed, true);
	        };
	        s.slidePrev = function (runCallbacks, speed, internal) {
	            if (s.params.loop) {
	                if (s.animating) return false;
	                s.fixLoop();
	                var clientLeft = s.container[0].clientLeft;
	                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	            }
	            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	        };
	        s._slidePrev = function (speed) {
	            return s.slidePrev(true, speed, true);
	        };
	        s.slideReset = function (runCallbacks, speed, internal) {
	            return s.slideTo(s.activeIndex, speed, runCallbacks);
	        };
	        
	        /*=========================
	          Translate/transition helpers
	          ===========================*/
	        s.setWrapperTransition = function (duration, byController) {
	            s.wrapper.transition(duration);
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                s.effects[s.params.effect].setTransition(duration);
	            }
	            if (s.params.parallax && s.parallax) {
	                s.parallax.setTransition(duration);
	            }
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.setTransition(duration);
	            }
	            if (s.params.control && s.controller) {
	                s.controller.setTransition(duration, byController);
	            }
	            s.emit('onSetTransition', s, duration);
	        };
	        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
	            var x = 0, y = 0, z = 0;
	            if (s.isHorizontal()) {
	                x = s.rtl ? -translate : translate;
	            }
	            else {
	                y = translate;
	            }
	        
	            if (s.params.roundLengths) {
	                x = round(x);
	                y = round(y);
	            }
	        
	            if (!s.params.virtualTranslate) {
	                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
	                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
	            }
	        
	            s.translate = s.isHorizontal() ? x : y;
	        
	            // Check if we need to update progress
	            var progress;
	            var translatesDiff = s.maxTranslate() - s.minTranslate();
	            if (translatesDiff === 0) {
	                progress = 0;
	            }
	            else {
	                progress = (translate - s.minTranslate()) / (translatesDiff);
	            }
	            if (progress !== s.progress) {
	                s.updateProgress(translate);
	            }
	        
	            if (updateActiveIndex) s.updateActiveIndex();
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                s.effects[s.params.effect].setTranslate(s.translate);
	            }
	            if (s.params.parallax && s.parallax) {
	                s.parallax.setTranslate(s.translate);
	            }
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.setTranslate(s.translate);
	            }
	            if (s.params.control && s.controller) {
	                s.controller.setTranslate(s.translate, byController);
	            }
	            s.emit('onSetTranslate', s, s.translate);
	        };
	        
	        s.getTranslate = function (el, axis) {
	            var matrix, curTransform, curStyle, transformMatrix;
	        
	            // automatic axis detection
	            if (typeof axis === 'undefined') {
	                axis = 'x';
	            }
	        
	            if (s.params.virtualTranslate) {
	                return s.rtl ? -s.translate : s.translate;
	            }
	        
	            curStyle = window.getComputedStyle(el, null);
	            if (window.WebKitCSSMatrix) {
	                curTransform = curStyle.transform || curStyle.webkitTransform;
	                if (curTransform.split(',').length > 6) {
	                    curTransform = curTransform.split(', ').map(function(a){
	                        return a.replace(',','.');
	                    }).join(', ');
	                }
	                // Some old versions of Webkit choke when 'none' is passed; pass
	                // empty string instead in this case
	                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	            }
	            else {
	                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	                matrix = transformMatrix.toString().split(',');
	            }
	        
	            if (axis === 'x') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m41;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[12]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[4]);
	            }
	            if (axis === 'y') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m42;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[13]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[5]);
	            }
	            if (s.rtl && curTransform) curTransform = -curTransform;
	            return curTransform || 0;
	        };
	        s.getWrapperTranslate = function (axis) {
	            if (typeof axis === 'undefined') {
	                axis = s.isHorizontal() ? 'x' : 'y';
	            }
	            return s.getTranslate(s.wrapper[0], axis);
	        };
	        
	        /*=========================
	          Observer
	          ===========================*/
	        s.observers = [];
	        function initObserver(target, options) {
	            options = options || {};
	            // create an observer instance
	            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
	            var observer = new ObserverFunc(function (mutations) {
	                mutations.forEach(function (mutation) {
	                    s.onResize(true);
	                    s.emit('onObserverUpdate', s, mutation);
	                });
	            });
	        
	            observer.observe(target, {
	                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
	                childList: typeof options.childList === 'undefined' ? true : options.childList,
	                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
	            });
	        
	            s.observers.push(observer);
	        }
	        s.initObservers = function () {
	            if (s.params.observeParents) {
	                var containerParents = s.container.parents();
	                for (var i = 0; i < containerParents.length; i++) {
	                    initObserver(containerParents[i]);
	                }
	            }
	        
	            // Observe container
	            initObserver(s.container[0], {childList: false});
	        
	            // Observe wrapper
	            initObserver(s.wrapper[0], {attributes: false});
	        };
	        s.disconnectObservers = function () {
	            for (var i = 0; i < s.observers.length; i++) {
	                s.observers[i].disconnect();
	            }
	            s.observers = [];
	        };
	        /*=========================
	          Loop
	          ===========================*/
	        // Create looped slides
	        s.createLoop = function () {
	            // Remove duplicated slides
	            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	        
	            var slides = s.wrapper.children('.' + s.params.slideClass);
	        
	            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
	        
	            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
	            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
	            if (s.loopedSlides > slides.length) {
	                s.loopedSlides = slides.length;
	            }
	        
	            var prependSlides = [], appendSlides = [], i;
	            slides.each(function (index, el) {
	                var slide = $(this);
	                if (index < s.loopedSlides) appendSlides.push(el);
	                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
	                slide.attr('data-swiper-slide-index', index);
	            });
	            for (i = 0; i < appendSlides.length; i++) {
	                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	            }
	            for (i = prependSlides.length - 1; i >= 0; i--) {
	                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	            }
	        };
	        s.destroyLoop = function () {
	            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	            s.slides.removeAttr('data-swiper-slide-index');
	        };
	        s.reLoop = function (updatePosition) {
	            var oldIndex = s.activeIndex - s.loopedSlides;
	            s.destroyLoop();
	            s.createLoop();
	            s.updateSlidesSize();
	            if (updatePosition) {
	                s.slideTo(oldIndex + s.loopedSlides, 0, false);
	            }
	        
	        };
	        s.fixLoop = function () {
	            var newIndex;
	            //Fix For Negative Oversliding
	            if (s.activeIndex < s.loopedSlides) {
	                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
	                newIndex = newIndex + s.loopedSlides;
	                s.slideTo(newIndex, 0, false, true);
	            }
	            //Fix For Positive Oversliding
	            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
	                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
	                newIndex = newIndex + s.loopedSlides;
	                s.slideTo(newIndex, 0, false, true);
	            }
	        };
	        /*=========================
	          Append/Prepend/Remove Slides
	          ===========================*/
	        s.appendSlide = function (slides) {
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            if (typeof slides === 'object' && slides.length) {
	                for (var i = 0; i < slides.length; i++) {
	                    if (slides[i]) s.wrapper.append(slides[i]);
	                }
	            }
	            else {
	                s.wrapper.append(slides);
	            }
	            if (s.params.loop) {
	                s.createLoop();
	            }
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	        };
	        s.prependSlide = function (slides) {
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            var newActiveIndex = s.activeIndex + 1;
	            if (typeof slides === 'object' && slides.length) {
	                for (var i = 0; i < slides.length; i++) {
	                    if (slides[i]) s.wrapper.prepend(slides[i]);
	                }
	                newActiveIndex = s.activeIndex + slides.length;
	            }
	            else {
	                s.wrapper.prepend(slides);
	            }
	            if (s.params.loop) {
	                s.createLoop();
	            }
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	            s.slideTo(newActiveIndex, 0, false);
	        };
	        s.removeSlide = function (slidesIndexes) {
	            if (s.params.loop) {
	                s.destroyLoop();
	                s.slides = s.wrapper.children('.' + s.params.slideClass);
	            }
	            var newActiveIndex = s.activeIndex,
	                indexToRemove;
	            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
	                for (var i = 0; i < slidesIndexes.length; i++) {
	                    indexToRemove = slidesIndexes[i];
	                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                    if (indexToRemove < newActiveIndex) newActiveIndex--;
	                }
	                newActiveIndex = Math.max(newActiveIndex, 0);
	            }
	            else {
	                indexToRemove = slidesIndexes;
	                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                if (indexToRemove < newActiveIndex) newActiveIndex--;
	                newActiveIndex = Math.max(newActiveIndex, 0);
	            }
	        
	            if (s.params.loop) {
	                s.createLoop();
	            }
	        
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	            if (s.params.loop) {
	                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
	            }
	            else {
	                s.slideTo(newActiveIndex, 0, false);
	            }
	        
	        };
	        s.removeAllSlides = function () {
	            var slidesIndexes = [];
	            for (var i = 0; i < s.slides.length; i++) {
	                slidesIndexes.push(i);
	            }
	            s.removeSlide(slidesIndexes);
	        };
	        

	        /*=========================
	          Effects
	          ===========================*/
	        s.effects = {
	            fade: {
	                setTranslate: function () {
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var offset = slide[0].swiperSlideOffset;
	                        var tx = -offset;
	                        if (!s.params.virtualTranslate) tx = tx - s.translate;
	                        var ty = 0;
	                        if (!s.isHorizontal()) {
	                            ty = tx;
	                            tx = 0;
	                        }
	                        var slideOpacity = s.params.fade.crossFade ?
	                                Math.max(1 - Math.abs(slide[0].progress), 0) :
	                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
	                        slide
	                            .css({
	                                opacity: slideOpacity
	                            })
	                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
	        
	                    }
	        
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration);
	                    if (s.params.virtualTranslate && duration !== 0) {
	                        var eventTriggered = false;
	                        s.slides.transitionEnd(function () {
	                            if (eventTriggered) return;
	                            if (!s) return;
	                            eventTriggered = true;
	                            s.animating = false;
	                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
	                            for (var i = 0; i < triggerEvents.length; i++) {
	                                s.wrapper.trigger(triggerEvents[i]);
	                            }
	                        });
	                    }
	                }
	            },
	            flip: {
	                setTranslate: function () {
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var progress = slide[0].progress;
	                        if (s.params.flip.limitRotation) {
	                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
	                        }
	                        var offset = slide[0].swiperSlideOffset;
	                        var rotate = -180 * progress,
	                            rotateY = rotate,
	                            rotateX = 0,
	                            tx = -offset,
	                            ty = 0;
	                        if (!s.isHorizontal()) {
	                            ty = tx;
	                            tx = 0;
	                            rotateX = -rotateY;
	                            rotateY = 0;
	                        }
	                        else if (s.rtl) {
	                            rotateY = -rotateY;
	                        }
	        
	                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
	        
	                        if (s.params.flip.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
	                        }
	        
	                        slide
	                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
	                    }
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                    if (s.params.virtualTranslate && duration !== 0) {
	                        var eventTriggered = false;
	                        s.slides.eq(s.activeIndex).transitionEnd(function () {
	                            if (eventTriggered) return;
	                            if (!s) return;
	                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
	                            eventTriggered = true;
	                            s.animating = false;
	                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
	                            for (var i = 0; i < triggerEvents.length; i++) {
	                                s.wrapper.trigger(triggerEvents[i]);
	                            }
	                        });
	                    }
	                }
	            },
	            cube: {
	                setTranslate: function () {
	                    var wrapperRotate = 0, cubeShadow;
	                    if (s.params.cube.shadow) {
	                        if (s.isHorizontal()) {
	                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
	                            if (cubeShadow.length === 0) {
	                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                                s.wrapper.append(cubeShadow);
	                            }
	                            cubeShadow.css({height: s.width + 'px'});
	                        }
	                        else {
	                            cubeShadow = s.container.find('.swiper-cube-shadow');
	                            if (cubeShadow.length === 0) {
	                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                                s.container.append(cubeShadow);
	                            }
	                        }
	                    }
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var slideAngle = i * 90;
	                        var round = Math.floor(slideAngle / 360);
	                        if (s.rtl) {
	                            slideAngle = -slideAngle;
	                            round = Math.floor(-slideAngle / 360);
	                        }
	                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
	                        var tx = 0, ty = 0, tz = 0;
	                        if (i % 4 === 0) {
	                            tx = - round * 4 * s.size;
	                            tz = 0;
	                        }
	                        else if ((i - 1) % 4 === 0) {
	                            tx = 0;
	                            tz = - round * 4 * s.size;
	                        }
	                        else if ((i - 2) % 4 === 0) {
	                            tx = s.size + round * 4 * s.size;
	                            tz = s.size;
	                        }
	                        else if ((i - 3) % 4 === 0) {
	                            tx = - s.size;
	                            tz = 3 * s.size + s.size * 4 * round;
	                        }
	                        if (s.rtl) {
	                            tx = -tx;
	                        }
	        
	                        if (!s.isHorizontal()) {
	                            ty = tx;
	                            tx = 0;
	                        }
	        
	                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
	                        if (progress <= 1 && progress > -1) {
	                            wrapperRotate = i * 90 + progress * 90;
	                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
	                        }
	                        slide.transform(transform);
	                        if (s.params.cube.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
	                        }
	                    }
	                    s.wrapper.css({
	                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
	                    });
	        
	                    if (s.params.cube.shadow) {
	                        if (s.isHorizontal()) {
	                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
	                        }
	                        else {
	                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
	                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
	                            var scale1 = s.params.cube.shadowScale,
	                                scale2 = s.params.cube.shadowScale / multiplier,
	                                offset = s.params.cube.shadowOffset;
	                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
	                        }
	                    }
	                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
	                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                    if (s.params.cube.shadow && !s.isHorizontal()) {
	                        s.container.find('.swiper-cube-shadow').transition(duration);
	                    }
	                }
	            },
	            coverflow: {
	                setTranslate: function () {
	                    var transform = s.translate;
	                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
	                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
	                    var translate = s.params.coverflow.depth;
	                    //Each slide offset from center
	                    for (var i = 0, length = s.slides.length; i < length; i++) {
	                        var slide = s.slides.eq(i);
	                        var slideSize = s.slidesSizesGrid[i];
	                        var slideOffset = slide[0].swiperSlideOffset;
	                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
	        
	                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
	                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
	                        // var rotateZ = 0
	                        var translateZ = -translate * Math.abs(offsetMultiplier);
	        
	                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
	                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
	        
	                        //Fix for ultra small values
	                        if (Math.abs(translateX) < 0.001) translateX = 0;
	                        if (Math.abs(translateY) < 0.001) translateY = 0;
	                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
	                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
	                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
	        
	                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
	        
	                        slide.transform(slideTransform);
	                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
	                        if (s.params.coverflow.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
	                        }
	                    }
	        
	                    //Set correct perspective for IE10
	                    if (s.browser.ie) {
	                        var ws = s.wrapper[0].style;
	                        ws.perspectiveOrigin = center + 'px 50%';
	                    }
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                }
	            }
	        };

	        /*=========================
	          Images Lazy Loading
	          ===========================*/
	        s.lazy = {
	            initialImageLoaded: false,
	            loadImageInSlide: function (index, loadInDuplicate) {
	                if (typeof index === 'undefined') return;
	                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
	                if (s.slides.length === 0) return;
	        
	                var slide = s.slides.eq(index);
	                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
	                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
	                    img = img.add(slide[0]);
	                }
	                if (img.length === 0) return;
	        
	                img.each(function () {
	                    var _img = $(this);
	                    _img.addClass('swiper-lazy-loading');
	                    var background = _img.attr('data-background');
	                    var src = _img.attr('data-src'),
	                        srcset = _img.attr('data-srcset');
	                    s.loadImage(_img[0], (src || background), srcset, false, function () {
	                        if (background) {
	                            _img.css('background-image', 'url("' + background + '")');
	                            _img.removeAttr('data-background');
	                        }
	                        else {
	                            if (srcset) {
	                                _img.attr('srcset', srcset);
	                                _img.removeAttr('data-srcset');
	                            }
	                            if (src) {
	                                _img.attr('src', src);
	                                _img.removeAttr('data-src');
	                            }
	        
	                        }
	        
	                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
	                        slide.find('.swiper-lazy-preloader, .preloader').remove();
	                        if (s.params.loop && loadInDuplicate) {
	                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
	                            if (slide.hasClass(s.params.slideDuplicateClass)) {
	                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
	                                s.lazy.loadImageInSlide(originalSlide.index(), false);
	                            }
	                            else {
	                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
	                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
	                            }
	                        }
	                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
	                    });
	        
	                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
	                });
	        
	            },
	            load: function () {
	                var i;
	                if (s.params.watchSlidesVisibility) {
	                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
	                        s.lazy.loadImageInSlide($(this).index());
	                    });
	                }
	                else {
	                    if (s.params.slidesPerView > 1) {
	                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                    }
	                    else {
	                        s.lazy.loadImageInSlide(s.activeIndex);
	                    }
	                }
	                if (s.params.lazyLoadingInPrevNext) {
	                    if (s.params.slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
	                        var amount = s.params.lazyLoadingInPrevNextAmount;
	                        var spv = s.params.slidesPerView;
	                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
	                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
	                        // Next Slides
	                        for (i = s.activeIndex + s.params.slidesPerView; i < maxIndex; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                        // Prev Slides
	                        for (i = minIndex; i < s.activeIndex ; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                    }
	                    else {
	                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
	                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
	        
	                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
	                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
	                    }
	                }
	            },
	            onTransitionStart: function () {
	                if (s.params.lazyLoading) {
	                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
	                        s.lazy.load();
	                    }
	                }
	            },
	            onTransitionEnd: function () {
	                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
	                    s.lazy.load();
	                }
	            }
	        };
	        

	        /*=========================
	          Scrollbar
	          ===========================*/
	        s.scrollbar = {
	            isTouched: false,
	            setDragPosition: function (e) {
	                var sb = s.scrollbar;
	                var x = 0, y = 0;
	                var translate;
	                var pointerPosition = s.isHorizontal() ?
	                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
	                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
	                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
	                var positionMin = -s.minTranslate() * sb.moveDivider;
	                var positionMax = -s.maxTranslate() * sb.moveDivider;
	                if (position < positionMin) {
	                    position = positionMin;
	                }
	                else if (position > positionMax) {
	                    position = positionMax;
	                }
	                position = -position / sb.moveDivider;
	                s.updateProgress(position);
	                s.setWrapperTranslate(position, true);
	            },
	            dragStart: function (e) {
	                var sb = s.scrollbar;
	                sb.isTouched = true;
	                e.preventDefault();
	                e.stopPropagation();
	        
	                sb.setDragPosition(e);
	                clearTimeout(sb.dragTimeout);
	        
	                sb.track.transition(0);
	                if (s.params.scrollbarHide) {
	                    sb.track.css('opacity', 1);
	                }
	                s.wrapper.transition(100);
	                sb.drag.transition(100);
	                s.emit('onScrollbarDragStart', s);
	            },
	            dragMove: function (e) {
	                var sb = s.scrollbar;
	                if (!sb.isTouched) return;
	                if (e.preventDefault) e.preventDefault();
	                else e.returnValue = false;
	                sb.setDragPosition(e);
	                s.wrapper.transition(0);
	                sb.track.transition(0);
	                sb.drag.transition(0);
	                s.emit('onScrollbarDragMove', s);
	            },
	            dragEnd: function (e) {
	                var sb = s.scrollbar;
	                if (!sb.isTouched) return;
	                sb.isTouched = false;
	                if (s.params.scrollbarHide) {
	                    clearTimeout(sb.dragTimeout);
	                    sb.dragTimeout = setTimeout(function () {
	                        sb.track.css('opacity', 0);
	                        sb.track.transition(400);
	                    }, 1000);
	        
	                }
	                s.emit('onScrollbarDragEnd', s);
	                if (s.params.scrollbarSnapOnRelease) {
	                    s.slideReset();
	                }
	            },
	            enableDraggable: function () {
	                var sb = s.scrollbar;
	                var target = s.support.touch ? sb.track : document;
	                $(sb.track).on(s.touchEvents.start, sb.dragStart);
	                $(target).on(s.touchEvents.move, sb.dragMove);
	                $(target).on(s.touchEvents.end, sb.dragEnd);
	            },
	            disableDraggable: function () {
	                var sb = s.scrollbar;
	                var target = s.support.touch ? sb.track : document;
	                $(sb.track).off(s.touchEvents.start, sb.dragStart);
	                $(target).off(s.touchEvents.move, sb.dragMove);
	                $(target).off(s.touchEvents.end, sb.dragEnd);
	            },
	            set: function () {
	                if (!s.params.scrollbar) return;
	                var sb = s.scrollbar;
	                sb.track = $(s.params.scrollbar);
	                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
	                    sb.track = s.container.find(s.params.scrollbar);
	                }
	                sb.drag = sb.track.find('.swiper-scrollbar-drag');
	                if (sb.drag.length === 0) {
	                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
	                    sb.track.append(sb.drag);
	                }
	                sb.drag[0].style.width = '';
	                sb.drag[0].style.height = '';
	                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
	        
	                sb.divider = s.size / s.virtualSize;
	                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
	                sb.dragSize = sb.trackSize * sb.divider;
	        
	                if (s.isHorizontal()) {
	                    sb.drag[0].style.width = sb.dragSize + 'px';
	                }
	                else {
	                    sb.drag[0].style.height = sb.dragSize + 'px';
	                }
	        
	                if (sb.divider >= 1) {
	                    sb.track[0].style.display = 'none';
	                }
	                else {
	                    sb.track[0].style.display = '';
	                }
	                if (s.params.scrollbarHide) {
	                    sb.track[0].style.opacity = 0;
	                }
	            },
	            setTranslate: function () {
	                if (!s.params.scrollbar) return;
	                var diff;
	                var sb = s.scrollbar;
	                var translate = s.translate || 0;
	                var newPos;
	        
	                var newSize = sb.dragSize;
	                newPos = (sb.trackSize - sb.dragSize) * s.progress;
	                if (s.rtl && s.isHorizontal()) {
	                    newPos = -newPos;
	                    if (newPos > 0) {
	                        newSize = sb.dragSize - newPos;
	                        newPos = 0;
	                    }
	                    else if (-newPos + sb.dragSize > sb.trackSize) {
	                        newSize = sb.trackSize + newPos;
	                    }
	                }
	                else {
	                    if (newPos < 0) {
	                        newSize = sb.dragSize + newPos;
	                        newPos = 0;
	                    }
	                    else if (newPos + sb.dragSize > sb.trackSize) {
	                        newSize = sb.trackSize - newPos;
	                    }
	                }
	                if (s.isHorizontal()) {
	                    if (s.support.transforms3d) {
	                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
	                    }
	                    else {
	                        sb.drag.transform('translateX(' + (newPos) + 'px)');
	                    }
	                    sb.drag[0].style.width = newSize + 'px';
	                }
	                else {
	                    if (s.support.transforms3d) {
	                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
	                    }
	                    else {
	                        sb.drag.transform('translateY(' + (newPos) + 'px)');
	                    }
	                    sb.drag[0].style.height = newSize + 'px';
	                }
	                if (s.params.scrollbarHide) {
	                    clearTimeout(sb.timeout);
	                    sb.track[0].style.opacity = 1;
	                    sb.timeout = setTimeout(function () {
	                        sb.track[0].style.opacity = 0;
	                        sb.track.transition(400);
	                    }, 1000);
	                }
	            },
	            setTransition: function (duration) {
	                if (!s.params.scrollbar) return;
	                s.scrollbar.drag.transition(duration);
	            }
	        };

	        /*=========================
	          Controller
	          ===========================*/
	        s.controller = {
	            LinearSpline: function (x, y) {
	                this.x = x;
	                this.y = y;
	                this.lastIndex = x.length - 1;
	                // Given an x value (x2), return the expected y2 value:
	                // (x1,y1) is the known point before given value,
	                // (x3,y3) is the known point after given value.
	                var i1, i3;
	                var l = this.x.length;
	        
	                this.interpolate = function (x2) {
	                    if (!x2) return 0;
	        
	                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
	                    i3 = binarySearch(this.x, x2);
	                    i1 = i3 - 1;
	        
	                    // We have our indexes i1 & i3, so we can calculate already:
	                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
	                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
	                };
	        
	                var binarySearch = (function() {
	                    var maxIndex, minIndex, guess;
	                    return function(array, val) {
	                        minIndex = -1;
	                        maxIndex = array.length;
	                        while (maxIndex - minIndex > 1)
	                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
	                                minIndex = guess;
	                            } else {
	                                maxIndex = guess;
	                            }
	                        return maxIndex;
	                    };
	                })();
	            },
	            //xxx: for now i will just save one spline function to to
	            getInterpolateFunction: function(c){
	                if(!s.controller.spline) s.controller.spline = s.params.loop ?
	                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
	                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
	            },
	            setTranslate: function (translate, byController) {
	               var controlled = s.params.control;
	               var multiplier, controlledTranslate;
	               function setControlledTranslate(c) {
	                    // this will create an Interpolate function based on the snapGrids
	                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
	                    // it makes sense to create this only once and recall it for the interpolation
	                    // the function does a lot of value caching for performance
	                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
	                    if (s.params.controlBy === 'slide') {
	                        s.controller.getInterpolateFunction(c);
	                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
	                        // but it did not work out
	                        controlledTranslate = -s.controller.spline.interpolate(-translate);
	                    }
	        
	                    if(!controlledTranslate || s.params.controlBy === 'container'){
	                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
	                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
	                    }
	        
	                    if (s.params.controlInverse) {
	                        controlledTranslate = c.maxTranslate() - controlledTranslate;
	                    }
	                    c.updateProgress(controlledTranslate);
	                    c.setWrapperTranslate(controlledTranslate, false, s);
	                    c.updateActiveIndex();
	               }
	               if (s.isArray(controlled)) {
	                   for (var i = 0; i < controlled.length; i++) {
	                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                           setControlledTranslate(controlled[i]);
	                       }
	                   }
	               }
	               else if (controlled instanceof Swiper && byController !== controlled) {
	        
	                   setControlledTranslate(controlled);
	               }
	            },
	            setTransition: function (duration, byController) {
	                var controlled = s.params.control;
	                var i;
	                function setControlledTransition(c) {
	                    c.setWrapperTransition(duration, s);
	                    if (duration !== 0) {
	                        c.onTransitionStart();
	                        c.wrapper.transitionEnd(function(){
	                            if (!controlled) return;
	                            if (c.params.loop && s.params.controlBy === 'slide') {
	                                c.fixLoop();
	                            }
	                            c.onTransitionEnd();
	        
	                        });
	                    }
	                }
	                if (s.isArray(controlled)) {
	                    for (i = 0; i < controlled.length; i++) {
	                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                            setControlledTransition(controlled[i]);
	                        }
	                    }
	                }
	                else if (controlled instanceof Swiper && byController !== controlled) {
	                    setControlledTransition(controlled);
	                }
	            }
	        };

	        /*=========================
	          Hash Navigation
	          ===========================*/
	        s.hashnav = {
	            init: function () {
	                if (!s.params.hashnav) return;
	                s.hashnav.initialized = true;
	                var hash = document.location.hash.replace('#', '');
	                if (!hash) return;
	                var speed = 0;
	                for (var i = 0, length = s.slides.length; i < length; i++) {
	                    var slide = s.slides.eq(i);
	                    var slideHash = slide.attr('data-hash');
	                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
	                        var index = slide.index();
	                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
	                    }
	                }
	            },
	            setHash: function () {
	                if (!s.hashnav.initialized || !s.params.hashnav) return;
	                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
	            }
	        };

	        /*=========================
	          Keyboard Control
	          ===========================*/
	        function handleKeyboard(e) {
	            if (e.originalEvent) e = e.originalEvent; //jquery fix
	            var kc = e.keyCode || e.charCode;
	            // Directions locks
	            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
	                return false;
	            }
	            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
	                return false;
	            }
	            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
	                return;
	            }
	            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
	                return;
	            }
	            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
	                var inView = false;
	                //Check that swiper should be inside of visible area of window
	                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
	                    return;
	                }
	                var windowScroll = {
	                    left: window.pageXOffset,
	                    top: window.pageYOffset
	                };
	                var windowWidth = window.innerWidth;
	                var windowHeight = window.innerHeight;
	                var swiperOffset = s.container.offset();
	                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
	                var swiperCoord = [
	                    [swiperOffset.left, swiperOffset.top],
	                    [swiperOffset.left + s.width, swiperOffset.top],
	                    [swiperOffset.left, swiperOffset.top + s.height],
	                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
	                ];
	                for (var i = 0; i < swiperCoord.length; i++) {
	                    var point = swiperCoord[i];
	                    if (
	                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
	                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
	                    ) {
	                        inView = true;
	                    }
	        
	                }
	                if (!inView) return;
	            }
	            if (s.isHorizontal()) {
	                if (kc === 37 || kc === 39) {
	                    if (e.preventDefault) e.preventDefault();
	                    else e.returnValue = false;
	                }
	                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
	                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
	            }
	            else {
	                if (kc === 38 || kc === 40) {
	                    if (e.preventDefault) e.preventDefault();
	                    else e.returnValue = false;
	                }
	                if (kc === 40) s.slideNext();
	                if (kc === 38) s.slidePrev();
	            }
	        }
	        s.disableKeyboardControl = function () {
	            s.params.keyboardControl = false;
	            $(document).off('keydown', handleKeyboard);
	        };
	        s.enableKeyboardControl = function () {
	            s.params.keyboardControl = true;
	            $(document).on('keydown', handleKeyboard);
	        };
	        

	        /*=========================
	          Mousewheel Control
	          ===========================*/
	        s.mousewheel = {
	            event: false,
	            lastScrollTime: (new window.Date()).getTime()
	        };
	        if (s.params.mousewheelControl) {
	            try {
	                new window.WheelEvent('wheel');
	                s.mousewheel.event = 'wheel';
	            } catch (e) {
	                if (window.WheelEvent || (s.container[0] && 'wheel' in s.container[0])) {
	                    s.mousewheel.event = 'wheel';
	                }
	            }
	            if (!s.mousewheel.event && window.WheelEvent) {
	        
	            }
	            if (!s.mousewheel.event && document.onmousewheel !== undefined) {
	                s.mousewheel.event = 'mousewheel';
	            }
	            if (!s.mousewheel.event) {
	                s.mousewheel.event = 'DOMMouseScroll';
	            }
	        }
	        function handleMousewheel(e) {
	            if (e.originalEvent) e = e.originalEvent; //jquery fix
	            var we = s.mousewheel.event;
	            var delta = 0;
	            var rtlFactor = s.rtl ? -1 : 1;
	        
	            //WebKits
	            if (we === 'mousewheel') {
	                if (s.params.mousewheelForceToAxis) {
	                    if (s.isHorizontal()) {
	                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX * rtlFactor;
	                        else return;
	                    }
	                    else {
	                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
	                        else return;
	                    }
	                }
	                else {
	                    delta = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? - e.wheelDeltaX * rtlFactor : - e.wheelDeltaY;
	                }
	            }
	            //Old FireFox
	            else if (we === 'DOMMouseScroll') delta = -e.detail;
	            //New FireFox
	            else if (we === 'wheel') {
	                if (s.params.mousewheelForceToAxis) {
	                    if (s.isHorizontal()) {
	                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX * rtlFactor;
	                        else return;
	                    }
	                    else {
	                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
	                        else return;
	                    }
	                }
	                else {
	                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX * rtlFactor : - e.deltaY;
	                }
	            }
	            if (delta === 0) return;
	        
	            if (s.params.mousewheelInvert) delta = -delta;
	        
	            if (!s.params.freeMode) {
	                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
	                    if (delta < 0) {
	                        if ((!s.isEnd || s.params.loop) && !s.animating) s.slideNext();
	                        else if (s.params.mousewheelReleaseOnEdges) return true;
	                    }
	                    else {
	                        if ((!s.isBeginning || s.params.loop) && !s.animating) s.slidePrev();
	                        else if (s.params.mousewheelReleaseOnEdges) return true;
	                    }
	                }
	                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
	        
	            }
	            else {
	                //Freemode or scrollContainer:
	                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
	                var wasBeginning = s.isBeginning,
	                    wasEnd = s.isEnd;
	        
	                if (position >= s.minTranslate()) position = s.minTranslate();
	                if (position <= s.maxTranslate()) position = s.maxTranslate();
	        
	                s.setWrapperTransition(0);
	                s.setWrapperTranslate(position);
	                s.updateProgress();
	                s.updateActiveIndex();
	        
	                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
	                    s.updateClasses();
	                }
	        
	                if (s.params.freeModeSticky) {
	                    clearTimeout(s.mousewheel.timeout);
	                    s.mousewheel.timeout = setTimeout(function () {
	                        s.slideReset();
	                    }, 300);
	                }
	                else {
	                    if (s.params.lazyLoading && s.lazy) {
	                        s.lazy.load();
	                    }
	                }
	        
	                // Return page scroll on edge positions
	                if (position === 0 || position === s.maxTranslate()) return;
	            }
	            if (s.params.autoplay) s.stopAutoplay();
	        
	            if (e.preventDefault) e.preventDefault();
	            else e.returnValue = false;
	            return false;
	        }
	        s.disableMousewheelControl = function () {
	            if (!s.mousewheel.event) return false;
	            s.container.off(s.mousewheel.event, handleMousewheel);
	            return true;
	        };
	        
	        s.enableMousewheelControl = function () {
	            if (!s.mousewheel.event) return false;
	            s.container.on(s.mousewheel.event, handleMousewheel);
	            return true;
	        };
	        

	        /*=========================
	          Parallax
	          ===========================*/
	        function setParallaxTransform(el, progress) {
	            el = $(el);
	            var p, pX, pY;
	            var rtlFactor = s.rtl ? -1 : 1;
	        
	            p = el.attr('data-swiper-parallax') || '0';
	            pX = el.attr('data-swiper-parallax-x');
	            pY = el.attr('data-swiper-parallax-y');
	            if (pX || pY) {
	                pX = pX || '0';
	                pY = pY || '0';
	            }
	            else {
	                if (s.isHorizontal()) {
	                    pX = p;
	                    pY = '0';
	                }
	                else {
	                    pY = p;
	                    pX = '0';
	                }
	            }
	        
	            if ((pX).indexOf('%') >= 0) {
	                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
	            }
	            else {
	                pX = pX * progress * rtlFactor + 'px' ;
	            }
	            if ((pY).indexOf('%') >= 0) {
	                pY = parseInt(pY, 10) * progress + '%';
	            }
	            else {
	                pY = pY * progress + 'px' ;
	            }
	        
	            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
	        }
	        s.parallax = {
	            setTranslate: function () {
	                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                    setParallaxTransform(this, s.progress);
	        
	                });
	                s.slides.each(function () {
	                    var slide = $(this);
	                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
	                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
	                        setParallaxTransform(this, progress);
	                    });
	                });
	            },
	            setTransition: function (duration) {
	                if (typeof duration === 'undefined') duration = s.params.speed;
	                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                    var el = $(this);
	                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
	                    if (duration === 0) parallaxDuration = 0;
	                    el.transition(parallaxDuration);
	                });
	            }
	        };
	        

	        /*=========================
	          Plugins API. Collect all and init all plugins
	          ===========================*/
	        s._plugins = [];
	        for (var plugin in s.plugins) {
	            var p = s.plugins[plugin](s, s.params[plugin]);
	            if (p) s._plugins.push(p);
	        }
	        // Method to call all plugins event/method
	        s.callPlugins = function (eventName) {
	            for (var i = 0; i < s._plugins.length; i++) {
	                if (eventName in s._plugins[i]) {
	                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	        };

	        /*=========================
	          Events/Callbacks/Plugins Emitter
	          ===========================*/
	        function normalizeEventName (eventName) {
	            if (eventName.indexOf('on') !== 0) {
	                if (eventName[0] !== eventName[0].toUpperCase()) {
	                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
	                }
	                else {
	                    eventName = 'on' + eventName;
	                }
	            }
	            return eventName;
	        }
	        s.emitterEventListeners = {
	        
	        };
	        s.emit = function (eventName) {
	            // Trigger callbacks
	            if (s.params[eventName]) {
	                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	            }
	            var i;
	            // Trigger events
	            if (s.emitterEventListeners[eventName]) {
	                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	            // Trigger plugins
	            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        };
	        s.on = function (eventName, handler) {
	            eventName = normalizeEventName(eventName);
	            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
	            s.emitterEventListeners[eventName].push(handler);
	            return s;
	        };
	        s.off = function (eventName, handler) {
	            var i;
	            eventName = normalizeEventName(eventName);
	            if (typeof handler === 'undefined') {
	                // Remove all handlers for such event
	                s.emitterEventListeners[eventName] = [];
	                return s;
	            }
	            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
	            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
	            }
	            return s;
	        };
	        s.once = function (eventName, handler) {
	            eventName = normalizeEventName(eventName);
	            var _handler = function () {
	                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
	                s.off(eventName, _handler);
	            };
	            s.on(eventName, _handler);
	            return s;
	        };

	        // Accessibility tools
	        s.a11y = {
	            makeFocusable: function ($el) {
	                $el.attr('tabIndex', '0');
	                return $el;
	            },
	            addRole: function ($el, role) {
	                $el.attr('role', role);
	                return $el;
	            },
	        
	            addLabel: function ($el, label) {
	                $el.attr('aria-label', label);
	                return $el;
	            },
	        
	            disable: function ($el) {
	                $el.attr('aria-disabled', true);
	                return $el;
	            },
	        
	            enable: function ($el) {
	                $el.attr('aria-disabled', false);
	                return $el;
	            },
	        
	            onEnterKey: function (event) {
	                if (event.keyCode !== 13) return;
	                if ($(event.target).is(s.params.nextButton)) {
	                    s.onClickNext(event);
	                    if (s.isEnd) {
	                        s.a11y.notify(s.params.lastSlideMessage);
	                    }
	                    else {
	                        s.a11y.notify(s.params.nextSlideMessage);
	                    }
	                }
	                else if ($(event.target).is(s.params.prevButton)) {
	                    s.onClickPrev(event);
	                    if (s.isBeginning) {
	                        s.a11y.notify(s.params.firstSlideMessage);
	                    }
	                    else {
	                        s.a11y.notify(s.params.prevSlideMessage);
	                    }
	                }
	                if ($(event.target).is('.' + s.params.bulletClass)) {
	                    $(event.target)[0].click();
	                }
	            },
	        
	            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
	        
	            notify: function (message) {
	                var notification = s.a11y.liveRegion;
	                if (notification.length === 0) return;
	                notification.html('');
	                notification.html(message);
	            },
	            init: function () {
	                // Setup accessibility
	                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
	                    s.a11y.makeFocusable(s.nextButton);
	                    s.a11y.addRole(s.nextButton, 'button');
	                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
	                }
	                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
	                    s.a11y.makeFocusable(s.prevButton);
	                    s.a11y.addRole(s.prevButton, 'button');
	                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
	                }
	        
	                $(s.container).append(s.a11y.liveRegion);
	            },
	            initPagination: function () {
	                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
	                    s.bullets.each(function () {
	                        var bullet = $(this);
	                        s.a11y.makeFocusable(bullet);
	                        s.a11y.addRole(bullet, 'button');
	                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
	                    });
	                }
	            },
	            destroy: function () {
	                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
	            }
	        };
	        

	        /*=========================
	          Init/Destroy
	          ===========================*/
	        s.init = function () {
	            if (s.params.loop) s.createLoop();
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            s.updatePagination();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	                if (s.params.scrollbarDraggable) {
	                    s.scrollbar.enableDraggable();
	                }
	            }
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                if (!s.params.loop) s.updateProgress();
	                s.effects[s.params.effect].setTranslate();
	            }
	            if (s.params.loop) {
	                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
	            }
	            else {
	                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
	                if (s.params.initialSlide === 0) {
	                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
	                    if (s.lazy && s.params.lazyLoading) {
	                        s.lazy.load();
	                        s.lazy.initialImageLoaded = true;
	                    }
	                }
	            }
	            s.attachEvents();
	            if (s.params.observer && s.support.observer) {
	                s.initObservers();
	            }
	            if (s.params.preloadImages && !s.params.lazyLoading) {
	                s.preloadImages();
	            }
	            if (s.params.autoplay) {
	                s.startAutoplay();
	            }
	            if (s.params.keyboardControl) {
	                if (s.enableKeyboardControl) s.enableKeyboardControl();
	            }
	            if (s.params.mousewheelControl) {
	                if (s.enableMousewheelControl) s.enableMousewheelControl();
	            }
	            if (s.params.hashnav) {
	                if (s.hashnav) s.hashnav.init();
	            }
	            if (s.params.a11y && s.a11y) s.a11y.init();
	            s.emit('onInit', s);
	        };
	        
	        // Cleanup dynamic styles
	        s.cleanupStyles = function () {
	            // Container
	            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
	        
	            // Wrapper
	            s.wrapper.removeAttr('style');
	        
	            // Slides
	            if (s.slides && s.slides.length) {
	                s.slides
	                    .removeClass([
	                      s.params.slideVisibleClass,
	                      s.params.slideActiveClass,
	                      s.params.slideNextClass,
	                      s.params.slidePrevClass
	                    ].join(' '))
	                    .removeAttr('style')
	                    .removeAttr('data-swiper-column')
	                    .removeAttr('data-swiper-row');
	            }
	        
	            // Pagination/Bullets
	            if (s.paginationContainer && s.paginationContainer.length) {
	                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
	            }
	            if (s.bullets && s.bullets.length) {
	                s.bullets.removeClass(s.params.bulletActiveClass);
	            }
	        
	            // Buttons
	            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	        
	            // Scrollbar
	            if (s.params.scrollbar && s.scrollbar) {
	                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
	                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
	            }
	        };
	        
	        // Destroy
	        s.destroy = function (deleteInstance, cleanupStyles) {
	            // Detach evebts
	            s.detachEvents();
	            // Stop autoplay
	            s.stopAutoplay();
	            // Disable draggable
	            if (s.params.scrollbar && s.scrollbar) {
	                if (s.params.scrollbarDraggable) {
	                    s.scrollbar.disableDraggable();
	                }
	            }
	            // Destroy loop
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            // Cleanup styles
	            if (cleanupStyles) {
	                s.cleanupStyles();
	            }
	            // Disconnect observer
	            s.disconnectObservers();
	            // Disable keyboard/mousewheel
	            if (s.params.keyboardControl) {
	                if (s.disableKeyboardControl) s.disableKeyboardControl();
	            }
	            if (s.params.mousewheelControl) {
	                if (s.disableMousewheelControl) s.disableMousewheelControl();
	            }
	            // Disable a11y
	            if (s.params.a11y && s.a11y) s.a11y.destroy();
	            // Destroy callback
	            s.emit('onDestroy');
	            // Delete instance
	            if (deleteInstance !== false) s = null;
	        };
	        
	        s.init();
	        

	    
	        // Return swiper instance
	        return s;
	    };
	    

	    /*==================================================
	        Prototype
	    ====================================================*/
	    Swiper.prototype = {
	        isSafari: (function () {
	            var ua = navigator.userAgent.toLowerCase();
	            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
	        })(),
	        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
	        isArray: function (arr) {
	            return Object.prototype.toString.apply(arr) === '[object Array]';
	        },
	        /*==================================================
	        Browser
	        ====================================================*/
	        browser: {
	            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
	            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
	        },
	        /*==================================================
	        Devices
	        ====================================================*/
	        device: (function () {
	            var ua = navigator.userAgent;
	            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	            return {
	                ios: ipad || iphone || ipod,
	                android: android
	            };
	        })(),
	        /*==================================================
	        Feature Detection
	        ====================================================*/
	        support: {
	            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	            })(),
	    
	            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	                var div = document.createElement('div').style;
	                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	            })(),
	    
	            flexbox: (function () {
	                var div = document.createElement('div').style;
	                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
	                for (var i = 0; i < styles.length; i++) {
	                    if (styles[i] in div) return true;
	                }
	            })(),
	    
	            observer: (function () {
	                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
	            })()
	        },
	        /*==================================================
	        Plugins
	        ====================================================*/
	        plugins: {}
	    };
	    

	    /*===========================
	    Dom7 Library
	    ===========================*/
	    var Dom7 = (function () {
	        var Dom7 = function (arr) {
	            var _this = this, i = 0;
	            // Create array-like object
	            for (i = 0; i < arr.length; i++) {
	                _this[i] = arr[i];
	            }
	            _this.length = arr.length;
	            // Return collection with methods
	            return this;
	        };
	        var $ = function (selector, context) {
	            var arr = [], i = 0;
	            if (selector && !context) {
	                if (selector instanceof Dom7) {
	                    return selector;
	                }
	            }
	            if (selector) {
	                // String
	                if (typeof selector === 'string') {
	                    var els, tempParent, html = selector.trim();
	                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
	                        var toCreate = 'div';
	                        if (html.indexOf('<li') === 0) toCreate = 'ul';
	                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
	                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
	                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
	                        if (html.indexOf('<option') === 0) toCreate = 'select';
	                        tempParent = document.createElement(toCreate);
	                        tempParent.innerHTML = selector;
	                        for (i = 0; i < tempParent.childNodes.length; i++) {
	                            arr.push(tempParent.childNodes[i]);
	                        }
	                    }
	                    else {
	                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
	                            // Pure ID selector
	                            els = [document.getElementById(selector.split('#')[1])];
	                        }
	                        else {
	                            // Other selectors
	                            els = (context || document).querySelectorAll(selector);
	                        }
	                        for (i = 0; i < els.length; i++) {
	                            if (els[i]) arr.push(els[i]);
	                        }
	                    }
	                }
	                // Node/element
	                else if (selector.nodeType || selector === window || selector === document) {
	                    arr.push(selector);
	                }
	                //Array of elements or instance of Dom
	                else if (selector.length > 0 && selector[0].nodeType) {
	                    for (i = 0; i < selector.length; i++) {
	                        arr.push(selector[i]);
	                    }
	                }
	            }
	            return new Dom7(arr);
	        };
	        Dom7.prototype = {
	            // Classes and attriutes
	            addClass: function (className) {
	                if (typeof className === 'undefined') {
	                    return this;
	                }
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.add(classes[i]);
	                    }
	                }
	                return this;
	            },
	            removeClass: function (className) {
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.remove(classes[i]);
	                    }
	                }
	                return this;
	            },
	            hasClass: function (className) {
	                if (!this[0]) return false;
	                else return this[0].classList.contains(className);
	            },
	            toggleClass: function (className) {
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.toggle(classes[i]);
	                    }
	                }
	                return this;
	            },
	            attr: function (attrs, value) {
	                if (arguments.length === 1 && typeof attrs === 'string') {
	                    // Get attr
	                    if (this[0]) return this[0].getAttribute(attrs);
	                    else return undefined;
	                }
	                else {
	                    // Set attrs
	                    for (var i = 0; i < this.length; i++) {
	                        if (arguments.length === 2) {
	                            // String
	                            this[i].setAttribute(attrs, value);
	                        }
	                        else {
	                            // Object
	                            for (var attrName in attrs) {
	                                this[i][attrName] = attrs[attrName];
	                                this[i].setAttribute(attrName, attrs[attrName]);
	                            }
	                        }
	                    }
	                    return this;
	                }
	            },
	            removeAttr: function (attr) {
	                for (var i = 0; i < this.length; i++) {
	                    this[i].removeAttribute(attr);
	                }
	                return this;
	            },
	            data: function (key, value) {
	                if (typeof value === 'undefined') {
	                    // Get value
	                    if (this[0]) {
	                        var dataKey = this[0].getAttribute('data-' + key);
	                        if (dataKey) return dataKey;
	                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
	                        else return undefined;
	                    }
	                    else return undefined;
	                }
	                else {
	                    // Set value
	                    for (var i = 0; i < this.length; i++) {
	                        var el = this[i];
	                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
	                        el.dom7ElementDataStorage[key] = value;
	                    }
	                    return this;
	                }
	            },
	            // Transforms
	            transform : function (transform) {
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	                }
	                return this;
	            },
	            transition: function (duration) {
	                if (typeof duration !== 'string') {
	                    duration = duration + 'ms';
	                }
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	                }
	                return this;
	            },
	            //Events
	            on: function (eventName, targetSelector, listener, capture) {
	                function handleLiveEvent(e) {
	                    var target = e.target;
	                    if ($(target).is(targetSelector)) listener.call(target, e);
	                    else {
	                        var parents = $(target).parents();
	                        for (var k = 0; k < parents.length; k++) {
	                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
	                        }
	                    }
	                }
	                var events = eventName.split(' ');
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof targetSelector === 'function' || targetSelector === false) {
	                        // Usual events
	                        if (typeof targetSelector === 'function') {
	                            listener = arguments[1];
	                            capture = arguments[2] || false;
	                        }
	                        for (j = 0; j < events.length; j++) {
	                            this[i].addEventListener(events[j], listener, capture);
	                        }
	                    }
	                    else {
	                        //Live events
	                        for (j = 0; j < events.length; j++) {
	                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
	                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
	                            this[i].addEventListener(events[j], handleLiveEvent, capture);
	                        }
	                    }
	                }
	    
	                return this;
	            },
	            off: function (eventName, targetSelector, listener, capture) {
	                var events = eventName.split(' ');
	                for (var i = 0; i < events.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        if (typeof targetSelector === 'function' || targetSelector === false) {
	                            // Usual events
	                            if (typeof targetSelector === 'function') {
	                                listener = arguments[1];
	                                capture = arguments[2] || false;
	                            }
	                            this[j].removeEventListener(events[i], listener, capture);
	                        }
	                        else {
	                            // Live event
	                            if (this[j].dom7LiveListeners) {
	                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
	                                    if (this[j].dom7LiveListeners[k].listener === listener) {
	                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                return this;
	            },
	            once: function (eventName, targetSelector, listener, capture) {
	                var dom = this;
	                if (typeof targetSelector === 'function') {
	                    targetSelector = false;
	                    listener = arguments[1];
	                    capture = arguments[2];
	                }
	                function proxy(e) {
	                    listener(e);
	                    dom.off(eventName, targetSelector, proxy, capture);
	                }
	                dom.on(eventName, targetSelector, proxy, capture);
	            },
	            trigger: function (eventName, eventData) {
	                for (var i = 0; i < this.length; i++) {
	                    var evt;
	                    try {
	                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
	                    }
	                    catch (e) {
	                        evt = document.createEvent('Event');
	                        evt.initEvent(eventName, true, true);
	                        evt.detail = eventData;
	                    }
	                    this[i].dispatchEvent(evt);
	                }
	                return this;
	            },
	            transitionEnd: function (callback) {
	                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                    i, j, dom = this;
	                function fireCallBack(e) {
	                    /*jshint validthis:true */
	                    if (e.target !== this) return;
	                    callback.call(this, e);
	                    for (i = 0; i < events.length; i++) {
	                        dom.off(events[i], fireCallBack);
	                    }
	                }
	                if (callback) {
	                    for (i = 0; i < events.length; i++) {
	                        dom.on(events[i], fireCallBack);
	                    }
	                }
	                return this;
	            },
	            // Sizing/Styles
	            width: function () {
	                if (this[0] === window) {
	                    return window.innerWidth;
	                }
	                else {
	                    if (this.length > 0) {
	                        return parseFloat(this.css('width'));
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            outerWidth: function (includeMargins) {
	                if (this.length > 0) {
	                    if (includeMargins)
	                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
	                    else
	                        return this[0].offsetWidth;
	                }
	                else return null;
	            },
	            height: function () {
	                if (this[0] === window) {
	                    return window.innerHeight;
	                }
	                else {
	                    if (this.length > 0) {
	                        return parseFloat(this.css('height'));
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            outerHeight: function (includeMargins) {
	                if (this.length > 0) {
	                    if (includeMargins)
	                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
	                    else
	                        return this[0].offsetHeight;
	                }
	                else return null;
	            },
	            offset: function () {
	                if (this.length > 0) {
	                    var el = this[0];
	                    var box = el.getBoundingClientRect();
	                    var body = document.body;
	                    var clientTop  = el.clientTop  || body.clientTop  || 0;
	                    var clientLeft = el.clientLeft || body.clientLeft || 0;
	                    var scrollTop  = window.pageYOffset || el.scrollTop;
	                    var scrollLeft = window.pageXOffset || el.scrollLeft;
	                    return {
	                        top: box.top  + scrollTop  - clientTop,
	                        left: box.left + scrollLeft - clientLeft
	                    };
	                }
	                else {
	                    return null;
	                }
	            },
	            css: function (props, value) {
	                var i;
	                if (arguments.length === 1) {
	                    if (typeof props === 'string') {
	                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
	                    }
	                    else {
	                        for (i = 0; i < this.length; i++) {
	                            for (var prop in props) {
	                                this[i].style[prop] = props[prop];
	                            }
	                        }
	                        return this;
	                    }
	                }
	                if (arguments.length === 2 && typeof props === 'string') {
	                    for (i = 0; i < this.length; i++) {
	                        this[i].style[props] = value;
	                    }
	                    return this;
	                }
	                return this;
	            },
	    
	            //Dom manipulation
	            each: function (callback) {
	                for (var i = 0; i < this.length; i++) {
	                    callback.call(this[i], i, this[i]);
	                }
	                return this;
	            },
	            html: function (html) {
	                if (typeof html === 'undefined') {
	                    return this[0] ? this[0].innerHTML : undefined;
	                }
	                else {
	                    for (var i = 0; i < this.length; i++) {
	                        this[i].innerHTML = html;
	                    }
	                    return this;
	                }
	            },
	            text: function (text) {
	                if (typeof text === 'undefined') {
	                    if (this[0]) {
	                        return this[0].textContent.trim();
	                    }
	                    else return null;
	                }
	                else {
	                    for (var i = 0; i < this.length; i++) {
	                        this[i].textContent = text;
	                    }
	                    return this;
	                }
	            },
	            is: function (selector) {
	                if (!this[0]) return false;
	                var compareWith, i;
	                if (typeof selector === 'string') {
	                    var el = this[0];
	                    if (el === document) return selector === document;
	                    if (el === window) return selector === window;
	    
	                    if (el.matches) return el.matches(selector);
	                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
	                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
	                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
	                    else {
	                        compareWith = $(selector);
	                        for (i = 0; i < compareWith.length; i++) {
	                            if (compareWith[i] === this[0]) return true;
	                        }
	                        return false;
	                    }
	                }
	                else if (selector === document) return this[0] === document;
	                else if (selector === window) return this[0] === window;
	                else {
	                    if (selector.nodeType || selector instanceof Dom7) {
	                        compareWith = selector.nodeType ? [selector] : selector;
	                        for (i = 0; i < compareWith.length; i++) {
	                            if (compareWith[i] === this[0]) return true;
	                        }
	                        return false;
	                    }
	                    return false;
	                }
	    
	            },
	            index: function () {
	                if (this[0]) {
	                    var child = this[0];
	                    var i = 0;
	                    while ((child = child.previousSibling) !== null) {
	                        if (child.nodeType === 1) i++;
	                    }
	                    return i;
	                }
	                else return undefined;
	            },
	            eq: function (index) {
	                if (typeof index === 'undefined') return this;
	                var length = this.length;
	                var returnIndex;
	                if (index > length - 1) {
	                    return new Dom7([]);
	                }
	                if (index < 0) {
	                    returnIndex = length + index;
	                    if (returnIndex < 0) return new Dom7([]);
	                    else return new Dom7([this[returnIndex]]);
	                }
	                return new Dom7([this[index]]);
	            },
	            append: function (newChild) {
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof newChild === 'string') {
	                        var tempDiv = document.createElement('div');
	                        tempDiv.innerHTML = newChild;
	                        while (tempDiv.firstChild) {
	                            this[i].appendChild(tempDiv.firstChild);
	                        }
	                    }
	                    else if (newChild instanceof Dom7) {
	                        for (j = 0; j < newChild.length; j++) {
	                            this[i].appendChild(newChild[j]);
	                        }
	                    }
	                    else {
	                        this[i].appendChild(newChild);
	                    }
	                }
	                return this;
	            },
	            prepend: function (newChild) {
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof newChild === 'string') {
	                        var tempDiv = document.createElement('div');
	                        tempDiv.innerHTML = newChild;
	                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
	                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
	                        }
	                        // this[i].insertAdjacentHTML('afterbegin', newChild);
	                    }
	                    else if (newChild instanceof Dom7) {
	                        for (j = 0; j < newChild.length; j++) {
	                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
	                        }
	                    }
	                    else {
	                        this[i].insertBefore(newChild, this[i].childNodes[0]);
	                    }
	                }
	                return this;
	            },
	            insertBefore: function (selector) {
	                var before = $(selector);
	                for (var i = 0; i < this.length; i++) {
	                    if (before.length === 1) {
	                        before[0].parentNode.insertBefore(this[i], before[0]);
	                    }
	                    else if (before.length > 1) {
	                        for (var j = 0; j < before.length; j++) {
	                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
	                        }
	                    }
	                }
	            },
	            insertAfter: function (selector) {
	                var after = $(selector);
	                for (var i = 0; i < this.length; i++) {
	                    if (after.length === 1) {
	                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
	                    }
	                    else if (after.length > 1) {
	                        for (var j = 0; j < after.length; j++) {
	                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
	                        }
	                    }
	                }
	            },
	            next: function (selector) {
	                if (this.length > 0) {
	                    if (selector) {
	                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
	                        else return new Dom7([]);
	                    }
	                    else {
	                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
	                        else return new Dom7([]);
	                    }
	                }
	                else return new Dom7([]);
	            },
	            nextAll: function (selector) {
	                var nextEls = [];
	                var el = this[0];
	                if (!el) return new Dom7([]);
	                while (el.nextElementSibling) {
	                    var next = el.nextElementSibling;
	                    if (selector) {
	                        if($(next).is(selector)) nextEls.push(next);
	                    }
	                    else nextEls.push(next);
	                    el = next;
	                }
	                return new Dom7(nextEls);
	            },
	            prev: function (selector) {
	                if (this.length > 0) {
	                    if (selector) {
	                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
	                        else return new Dom7([]);
	                    }
	                    else {
	                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
	                        else return new Dom7([]);
	                    }
	                }
	                else return new Dom7([]);
	            },
	            prevAll: function (selector) {
	                var prevEls = [];
	                var el = this[0];
	                if (!el) return new Dom7([]);
	                while (el.previousElementSibling) {
	                    var prev = el.previousElementSibling;
	                    if (selector) {
	                        if($(prev).is(selector)) prevEls.push(prev);
	                    }
	                    else prevEls.push(prev);
	                    el = prev;
	                }
	                return new Dom7(prevEls);
	            },
	            parent: function (selector) {
	                var parents = [];
	                for (var i = 0; i < this.length; i++) {
	                    if (selector) {
	                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
	                    }
	                    else {
	                        parents.push(this[i].parentNode);
	                    }
	                }
	                return $($.unique(parents));
	            },
	            parents: function (selector) {
	                var parents = [];
	                for (var i = 0; i < this.length; i++) {
	                    var parent = this[i].parentNode;
	                    while (parent) {
	                        if (selector) {
	                            if ($(parent).is(selector)) parents.push(parent);
	                        }
	                        else {
	                            parents.push(parent);
	                        }
	                        parent = parent.parentNode;
	                    }
	                }
	                return $($.unique(parents));
	            },
	            find : function (selector) {
	                var foundElements = [];
	                for (var i = 0; i < this.length; i++) {
	                    var found = this[i].querySelectorAll(selector);
	                    for (var j = 0; j < found.length; j++) {
	                        foundElements.push(found[j]);
	                    }
	                }
	                return new Dom7(foundElements);
	            },
	            children: function (selector) {
	                var children = [];
	                for (var i = 0; i < this.length; i++) {
	                    var childNodes = this[i].childNodes;
	    
	                    for (var j = 0; j < childNodes.length; j++) {
	                        if (!selector) {
	                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
	                        }
	                        else {
	                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
	                        }
	                    }
	                }
	                return new Dom7($.unique(children));
	            },
	            remove: function () {
	                for (var i = 0; i < this.length; i++) {
	                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
	                }
	                return this;
	            },
	            add: function () {
	                var dom = this;
	                var i, j;
	                for (i = 0; i < arguments.length; i++) {
	                    var toAdd = $(arguments[i]);
	                    for (j = 0; j < toAdd.length; j++) {
	                        dom[dom.length] = toAdd[j];
	                        dom.length++;
	                    }
	                }
	                return dom;
	            }
	        };
	        $.fn = Dom7.prototype;
	        $.unique = function (arr) {
	            var unique = [];
	            for (var i = 0; i < arr.length; i++) {
	                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
	            }
	            return unique;
	        };
	    
	        return $;
	    })();
	    

	    /*===========================
	     Get Dom libraries
	     ===========================*/
	    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
	    for (var i = 0; i < swiperDomPlugins.length; i++) {
	    	if (window[swiperDomPlugins[i]]) {
	    		addLibraryPlugin(window[swiperDomPlugins[i]]);
	    	}
	    }
	    // Required DOM Plugins
	    var domLib;
	    if (typeof Dom7 === 'undefined') {
	    	domLib = window.Dom7 || window.Zepto || window.jQuery;
	    }
	    else {
	    	domLib = Dom7;
	    }

	    /*===========================
	    Add .swiper plugin from Dom libraries
	    ===========================*/
	    function addLibraryPlugin(lib) {
	        lib.fn.swiper = function (params) {
	            var firstInstance;
	            lib(this).each(function () {
	                var s = new Swiper(this, params);
	                if (!firstInstance) firstInstance = s;
	            });
	            return firstInstance;
	        };
	    }
	    
	    if (domLib) {
	        if (!('transitionEnd' in domLib.fn)) {
	            domLib.fn.transitionEnd = function (callback) {
	                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                    i, j, dom = this;
	                function fireCallBack(e) {
	                    /*jshint validthis:true */
	                    if (e.target !== this) return;
	                    callback.call(this, e);
	                    for (i = 0; i < events.length; i++) {
	                        dom.off(events[i], fireCallBack);
	                    }
	                }
	                if (callback) {
	                    for (i = 0; i < events.length; i++) {
	                        dom.on(events[i], fireCallBack);
	                    }
	                }
	                return this;
	            };
	        }
	        if (!('transform' in domLib.fn)) {
	            domLib.fn.transform = function (transform) {
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	                }
	                return this;
	            };
	        }
	        if (!('transition' in domLib.fn)) {
	            domLib.fn.transition = function (duration) {
	                if (typeof duration !== 'string') {
	                    duration = duration + 'ms';
	                }
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	                }
	                return this;
	            };
	        }
	    }

	    window.Swiper = Swiper;
	})();
	/*===========================
	Swiper AMD Export
	===========================*/
	if (true)
	{
	    module.exports = window.Swiper;
	}
	else if (typeof define === 'function' && define.amd) {
	    define([], function () {
	        'use strict';
	        return window.Swiper;
	    });
	}
	//# sourceMappingURL=maps/swiper.js.map


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUI1NTZFRjk0OTkwMTFFNkI2NEJCOUZFMjcwQUQ3MTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUI1NTZFRkE0OTkwMTFFNkI2NEJCOUZFMjcwQUQ3MTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQjU1NkVGNzQ5OTAxMUU2QjY0QkI5RkUyNzBBRDcxMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQjU1NkVGODQ5OTAxMUU2QjY0QkI5RkUyNzBBRDcxMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpVYa/kAAAFNSURBVHjaYvz//z8DhUABiNcC8TkgnsRCoWEmQLwZiCWA2BCIHzCAXEgm9gHiL/8h4CcQx4B9S6ZhmUD8B2rYOyB2hMmRahAjEHf+R4AHQKyNrIYUw9iBeAWSYWeBWBJdHbGGCQHxISTDtgIxDza1xBimCMQ3kAybCcQsuNQTMswMiF9ADfoHxBWEHIBP0g8pWfwA4ihiggeXRDZasrAnNvKwJYsepPC6D8SapCQtZA4HEK9CMuw0EEuQmuhhDGEgPoJk2BYg5iYnF4EIZSC+iWTYNCBmJjePg4gzSIbto6CwQHHhLWq6EBaGR6kVhsixvJpasQzDTNRMh8g4l1o5BRn7A/FXauVl5NLmJbVKGxhWomZ5iFxiH6ZWiY2crFZSq05BLt66qFXrIeMsatXLyNiXmi0HGDYF4udIyaqakQqtL0Vo6+ssqPUFEGAAoNf6Vei0MLIAAAAASUVORK5CYII="

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, ENV_OPT) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dialog = __webpack_require__(22);

	var _dialog2 = _interopRequireDefault(_dialog);

	__webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
		function _class() {
			_classCallCheck(this, _class);

			this.cfg = {
				type: 'create' };
		}

		_createClass(_class, [{
			key: 'initInfo',
			value: function initInfo() {
				var cfg = this.cfg,
				    that = this;

				//如果有blockId，则为编辑
				if (cfg.blockId) {
					$.post(ENV_OPT.baseApi + 'mantuoluo/block/getBlock', { blockId: cfg.blockId }, function (r) {
						if (r.error) {
							that.error(r.error);
						} else {
							that.initInfoDom(r.data);
						}
					});
				} else {
					that.initInfoDom({});
				}
			}
		}, {
			key: 'initInfoDom',
			value: function initInfoDom(data) {
				var cfg = this.cfg;

				if (cfg.type == 'create') {
					$('#project-name').val(data.blockName || '');
					$('#project-desc').val(data.blockInfo || '');
				} else {
					$('.modal-content .preview').show();
					$('.project-name-p').text(data.blockName);
					$('.project-desc-p').text(data.blockInfo);

					var imgList = data.imgList;

					$('.project-imgs').empty();

					if (imgList && imgList.length != 0) {
						$.each(imgList, function (index, val) {
							var img = $('<img src="' + val + '"/>'),
							    li = $('<li></li>');

							li.append(img).appendTo('.project-imgs');
						});
					}
				}
			}
		}, {
			key: 'initClose',
			value: function initClose() {
				var that = this;

				$('.modal-content .close').click(function () {
					that.dialog.hide();
				});
			}
		}, {
			key: 'addPic',
			value: function addPic() {
				$('.add-img').click(function () {
					var _this = $(this);

					$('#add-img').trigger('click');
				});
			}
		}, {
			key: 'addVideo',
			value: function addVideo() {
				$('.add-video').click(function () {
					var _this = $(this);

					$('#add-video').trigger('click');
				});
			}
		}, {
			key: 'submitData',
			value: function submitData() {
				var cfg = this.cfg,
				    that = this;

				var data = new FormData($('#form')[0]);

				data.append('layerId', cfg.layerId);

				if (cfg.blockId) {
					data.append('blockId', cfg.blockId);
				}

				var xhr = new XMLHttpRequest();

				xhr.open("POST", ENV_OPT.baseApi + 'mantuoluo/block/edit', true);

				xhr.send(data);

				xhr.onload = function (oEvent) {
					if (xhr.status == 200) {
						try {
							var json = $.parseJSON(xhr.responseText);
						} catch (e) {
							// statements
							console.log(e);
						}

						if (json.error) {
							that.error(json.error);
						} else {
							cfg.callbackFn && cfg.callbackFn({
								blockId: json.data.blockId,
								text: $('#project-name').val()
							});
							that.dialog.hide();
						}
					} else {
						console.log('error');
					}
				};
			}
		}, {
			key: 'show',
			value: function show(cfg) {
				this.dialog.show();
				this.cfg = cfg;
				this.initInfo();
			}
		}, {
			key: 'bindUI',
			value: function bindUI() {
				var that = this;

				this.initClose();
				this.addPic();
				this.addVideo();

				$('#sub').click(function () {
					that.submitData();
				});
			}
		}, {
			key: 'error',
			value: function error(r) {
				alert(r.message);
			}
		}, {
			key: 'init',
			value: function init() {
				this.dialog = $(_dialog2.default).clone();

				$('body').append(this.dialog);

				this.bindUI();

				return this;
			}
		}]);

		return _class;
	}();

	exports.default = _class;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, ENV_OPT) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.List = undefined;

	var _swiper = __webpack_require__(9);

	var _swiper2 = _interopRequireDefault(_swiper);

	var _base = __webpack_require__(5);

	var _createProject = __webpack_require__(6);

	var _index = __webpack_require__(7);

	var _mantuoluo = __webpack_require__(3);

	var _mantuoluo2 = _interopRequireDefault(_mantuoluo);

	__webpack_require__(19);

	__webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//用户信息
	var userInfo = {
		userId: 1
	};

	var curManTuo = {};

	//列表部分
	var List = exports.List = {
		cfg: {
			curPage: 1
		},

		getUserInfo: function getUserInfo() {
			// userInfo.userId = getUserInfo();
		},

		initSwiper: function initSwiper() {
			var that = this;

			this.swiper = new _swiper2.default('.swiper-container', {
				onInit: function onInit() {
					that.getManTuoLuo(that.cfg.curPage);
					$('.swiper-button-disabled').removeClass('swiper-button-disabled');
				},
				onSlideNextStart: function onSlideNextStart(swiper) {
					alert('事件触发了;');
				}
			});

			$('.swiper-button-next').click(function () {
				that.cfg.curPage += 1;
				that.getManTuoLuo(that.cfg.curPage);
			});

			$('.swiper-button-prev').click(function () {
				if (that.cfg.curPage < 1) {
					alert('已经到第一个！');
					return false;
				}
				that.cfg.curPage -= 1;
				that.getManTuoLuo(that.cfg.curPage);
			});
		},

		init: function init(isShare) {
			this.getUserInfo();
			this.initSwiper();
			this.isShare = isShare;
		},

		getManTuoLuo: function getManTuoLuo(page) {
			var that = this;

			$.post(ENV_OPT.baseApi + 'mantuoluo/task/preview', {
				userId: userInfo.userId,
				isShare: that.isShare,
				curPage: page
			}, function (r) {

				if (r.data.length < 1) {
					$('.p-content').html('您还没有项目哦！点击创建一个吧！');
					$('.swiper-button-next,.swiper-button-prev').hide();
				}

				var man = new _mantuoluo2.default({
					data: r.data[0],
					type: 'list'
				});

				curManTuo = r.data[0];

				man.create();
			});
		}
	};

	var newProject = {
		bindUI: function bindUI() {
			var that = this;

			//新建按钮弹框
			$('.btn-new').click(function (event) {
				$('.modal').fadeIn();
			});

			//提交按钮
			$('.cancel,.sub').click(function (event) {
				$('.modal').fadeOut();
				var data = that.getData();

				if (!data) {
					return false;
				} else {
					that.startCommit(data);
				}
			});
		},

		getData: function getData() {
			var name = $('#project-name').val(),
			    desc = $('#project-desc').val() || '';

			if (!name) {
				alert('项目名称不能为空！');
				return false;
			}

			return {
				taskName: name,
				taskInfo: desc,
				userId: userInfo.userId,
				taskSize: 1
			};
		},

		startCommit: function startCommit(data) {
			$.post(ENV_OPT.baseApi + 'mantuoluo/task/add', data, function (r) {
				var data = r.data;

				if (!data.result) {
					alert('创建失败！请重试');
				} else {
					var newP = new _createProject.createProject(data);

					newP.init();
				}
			});
		},

		init: function init() {
			this.bindUI();
		}
	};

	newProject.init();

	var Set = {
		bindUI: function bindUI() {
			var that = this;

			$('.btn-set').click(function () {
				$('.setting-list').slideToggle();
				return false;
			});

			$(document).click(function (event) {
				$('.setting-list').slideUp();
			});

			this.startEdit();

			$('.li-right').click(function () {
				that.startPreview();
			});
		},

		startEdit: function startEdit() {
			$('.start-edit').click(function () {

				var newP = new _createProject.createProject(curManTuo);

				newP.edit(curManTuo);
			});
		},

		startPreview: function startPreview() {

			$.post(ENV_OPT.baseApi + 'mantuoluo/task/preview', { taskId: curManTuo.taskId }, function (r) {
				var data = r.data;

				var newP = new _index.previewProject(data);

				newP.init(data);
			});
		},

		init: function init() {
			this.bindUI();
		}
	};

	Set.init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"container\">\n\t<div class=\"nav-left\">\n\t\t<div class=\"logo\"></div>\n\t\t<div class=\"intro-wrap\">\n\t\t\t<a class=\"btn-back\"><img src=\"" + __webpack_require__(10) + "\" height=\"31\" width=\"20\" alt=\"\"></a>\n\t\t\t<div class=\"circle-count\">\n\t\t\t\t<span class=\"label\">当前圈层</span>\n\t\t\t\t<span class=\"number\">6</span>\n\t\t\t\t<a class=\"btn-add-circle\">添加圈层</a>\n\t\t\t</div>\n\t\t\t<h2 class=\"p-title\">文化磁极</h2>\n\t\t\t<div class=\"p-desc\">\n\t\t\t\t<p class=\"detail\"><span class=\"title\">描述</span><span id=\"desc\">花单生于枝叉间或叶腋，直立，有短梗；花萼筒状。蒴果直立生，卵状表面生有坚硬针刺或有时无刺而近平滑，成熟后淡黄色，规则4瓣列，种子卵圆形，稍偏黑色</span></p>\n\t\t\t\t<textarea id=\"p-desc-input\" cols=\"30\" rows=\"10\"></textarea>\n\t\t\t\t<a class=\"btn-edit-desc\">修改描述</a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"content right\">\n\t\t<ul class=\"edit-list\">\n\t\t\t<li>\n\t\t\t\t<a class=\"btn-tab\">项目数量</a>\n\t\t\t\t<div class=\"edit-block\">\n\t\t\t\t\t<label for=\"input-p-number\">填写数量</label>\n\t\t\t\t\t<input type=\"number\" id=\"input-p-number\">\n\t\t\t\t\t<a class=\"btn-sub btn-add-number\">确定</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<a class=\"btn-tab\">项目颜色</a>\n\t\t\t\t<div class=\"edit-block\">\n\t\t\t\t\t<label for=\"input-p-color\">圈层颜色</label>\n\t\t\t\t\t<input type=\"range\" min=\"0\" max=\"100\" id=\"input-p-color\">\n\t\t\t\t\t<a class=\"btn-sub btn-set-color\">确定</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<a class=\"btn-tab\">圈层样式</a>\n\t\t\t\t<div class=\"edit-block\">\n\t\t\t\t\t<ul class=\"p-icon-list\">\n\t\t\t\t\t\t<li><img src=\"" + __webpack_require__(26) + "\" data-icon=\"1\" alt=\"\"></li>\n\t\t\t\t\t\t<li><img src=\"" + __webpack_require__(27) + "\" data-icon=\"2\" alt=\"\"></li>\n\t\t\t\t\t\t<li><img src=\"" + __webpack_require__(28) + "\" data-icon=\"3\" alt=\"\"></li>\n\t\t\t\t\t\t<li><img src=\"" + __webpack_require__(29) + "\" data-icon=\"4\" alt=\"\"></li>\n\t\t\t\t\t\t<li><img src=\"" + __webpack_require__(30) + "\" data-icon=\"5\" alt=\"\"></li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<label for=\"input-p-icon-color\" class=\"icon-set\">颜色透明度</label>\n\t\t\t\t\t<input type=\"range\" min=\"0\" max=\"100\" id=\"input-p-icon-color\">\n\t\t\t\t\t<a class=\"btn-sub btn-set-icon\">确定</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t\t<div class=\"p-content\">\n\t\t\t<div class=\"each-c c-0\">地域建筑</div>\n\t\t</div>\n\t\t<a class=\"delete left\"><img src=\"" + __webpack_require__(25) + "\"></a>\n\t\t<a class=\"ok right\"><img src=\"" + __webpack_require__(24) + "\"></a>\n\t</div>\n</div>\n";

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal\">\n\t<div class=\"modal-content info\">\n\t\t<a class=\"close\"></a>\n\t\t<form id=\"form\" enctype=\"multipart/form-data\" name=\"form\">\n\t\t\t<h2 class=\"title\">请在如下框中填入文字信息</h2>\n\t\t\t<label for=\"project-name\">名称</label>\n\t\t\t<input type=\"text\" name=\"blockName\" id=\"project-name\">\n\t\t\t<a class=\"btn-add add-img\">加入图片</a>\n\t\t\t<input type=\"file\" id=\"add-img\" name=\"blockImgs\" class=\"hide\">\n\t\t\t<a class=\"btn-add add-video\">加入视频</a>\n\t\t\t<input type=\"file\" name=\"blockVideos\" name=\"blockVideos\" id=\"add-video\" class=\"hide\">\n\t\t\t<a class=\"btn-add sub\" id=\"sub\">确定</a>\n\t\t\t<label for=\"project-desc\">描述</label>\n\t\t\t<textarea id=\"project-desc\" cols=\"30\" rows=\"10\" name=\"blockInfo\"></textarea>\n\t\t</form>\n\t\t<div class=\"preview\">\n\t\t\t<h2 class=\"project-name-p\"></h2>\n\t\t\t<p class=\"project-desc-p\"></p>\n\t\t\t<ul class=\"project-imgs\"></ul>\n\t\t</div>\n\t</div>\n</div>";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"container\">\n\t<div class=\"nav-left\">\n\t\t<div class=\"logo\"></div>\n\t\t<div class=\"intro-wrap\">\n\t\t\t<a class=\"btn-back\"><img src=\"" + __webpack_require__(10) + "\"></a>\n\t\t</div>\n\t\t<ul class=\"btn-eidt-list\">\n\t\t\t<li class=\"preview-btn start-edit\">编辑</li>\n\t\t\t<li class=\"preview-btn download\">下载</li>\n\t\t\t<li class=\"preview-btn \">分享</li>\n\t\t</ul>\n\t</div>\n\t<div class=\"content right\">\n\t\t<div class=\"p-content\">\n\t\t\t<div class=\"each-c c-0\">地域建筑</div>\n\t\t</div>\n\t\t<a class=\"preview-btn preview-btn-delete\">删除</a>\n\t</div>\n</div>\n";

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAvCAYAAABOtfLKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUNDQTFCN0Q1NTU0MTFFNkI2NDVFRjlCQkJEMUNBQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUNDQTFCN0U1NTU0MTFFNkI2NDVFRjlCQkJEMUNBQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQ0NBMUI3QjU1NTQxMUU2QjY0NUVGOUJCQkQxQ0FCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQ0NBMUI3QzU1NTQxMUU2QjY0NUVGOUJCQkQxQ0FCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi14sn4AAAR5SURBVHjazJp9TE9RGMdvL2pIeU8jzSaJxZrFlMjUKsPMyx/+YDP6w2iSmVD+YDOTWpiXzUgzmmXTJrOZt1rDLJEhzEQaijC/mCg/z5nnbtfZPW/3Lc/2+ef3O+fc8z3nnnOe8zw3QHPGxgJpwEwgHhgDDAXCAD/wDegAWoBm4DZQB7TbfbDf73dEAOlwAfAQO6xKL1APrAci7IjRsWITgXLgp0URZviAUmCkV2LCgRLgl4MizERtAYIFfRkHlJFyVsSkAK9dFEFzD4hl9GU80IrlqoAQFTF5Ls8Giw+4iRgtDmijyl3QBQVwRATge5yn8Co+xUX9DEfPh78PAaKBBGAWECNopxtYClwy/EZ2yWtAlEn5GizPtDLJESSv33aJDhqNiCoGOk3a+w5kUeUnA+8F/bjAethWCRHk3FgL9LOxvQ8CilCAfh5lUGWm4rN4fSH1Ms0ekA70CCqfAwZrzhnZna4Ac6nfE4GPEkLmmW0Aw/BU5h10mzRvbBrwSSCkC5jD2s1OcCr+BlZ5JGQG8EUg5CvZTFjnTBJ2mFV5o0dCUiSEkP+TeR7ARU7lSo+EpOKI84R8Bqbz3JkEzqx0mBxeblgargGekE5cS1zfrJjTQI4HQtJxVxJ5BIkiRzMQeMc5EENcFpJpOGd4Z9oUql68mZgkTiM7XRYyH/ghEEJO/klUvSxcWxG0mHxOQ7ESHQqyOHuL0AfjCXmL9yejLTDUy6bFnGE01CLRoWD0BqoVBS2RENKGXrLRFlP1CmkxDRyXhWek8+cN5YnnGiohZLnELbUV7y1GW2YyABW0GJY3uksgpNqkzmWgP6feCgm/7xX6avRMmt2prtNiWKOUy+hQKM4CqzPEYRxgUm+lhJCXjKvEEUb5RqOYQI4L382KIeAAsCwDxRoFrcYgSBCn3gviNOJxQJuPs2b/MdWZ0XAAqgSjXItxsxyBz+fHG+pozvNYM3PXiTWjb8mVEp0UCXnCuAobjTVwV53azXRBp20ELR4BkRLPaWLUP+XkOaMLKrcg5AEwQvJqzVoKBbSYzTY9AN2/O64gpBFvtTK2kNNOtlu+GQlNHZUQ0oChJ1k7y2iHzFaYm14zEXSII+SOYpB8FMejvunFfUYPHtLt1FuI9peI+qV602y3eNPcZ2ijDheyik3gXA98GMhnxgBqXIgB7AFuAAMV64XgK8nqz35RSkMUncm1KMjKXeeYIOgXKZOfOfkfxM12C3bDQtlk03CJiGaeSyLI4XtQIKSJnmlRsimjD2LNMbi2RBHMOFF0xk4WYI3NLADxqndIxMt6WPkX2TTgAUnXhNwMt2l/0+eyRvItexn5GTPWsRoyinEyc6Z7wSTH/xx4g69GEJ4JMShitoLwXoxxH+aJUbF8rW9ymj68+/NH0EK2OVXzNtt832yxOyVGQ7+qVHP/O4AilYPWiS80KjRnv9DoQqcySrUzdsXoRlLhJMv82KIA4lHcAjYo3m8s7WYqpn/VlIwzF40dDMcdSf+qicTFmtGJrMXfbJlxRv4IMADynB8L5rVL/gAAAABJRU5ErkJggg=="

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAnCAYAAAD3h5P5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUNDQTFCNzk1NTU0MTFFNkI2NDVFRjlCQkJEMUNBQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUNDQTFCN0E1NTU0MTFFNkI2NDVFRjlCQkJEMUNBQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQ0NBMUI3NzU1NTQxMUU2QjY0NUVGOUJCQkQxQ0FCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQ0NBMUI3ODU1NTQxMUU2QjY0NUVGOUJCQkQxQ0FCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ptn7oEYAAACnSURBVHjaYmAgDrAB8WMg/k8EBqlj+///PwMhTCzIJNJiGM4kxnIWoMI0IiyvZCANVDAyMv4lpIgR6tIBAUwMAwhGruWgBHd2oCxnpNQAUvLroAp2ZJ/bA3EUHexcBgytg5SWYuRieOk3ms9HLR+1fNTyUctHLR+1fNTyUctHLR+1fGhZ/odOdmK1RxMqQcveCsh8DVwDQhFA/IhGFoPMjUAeEAIIMADCcLnqv6r61QAAAABJRU5ErkJggg=="

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/icon-line-01.d3100ed.png";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/icon-line-02.491e122.png";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/icon-line-03.b94c6a2.png";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/icon-line-04.5a85371.png";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/icon-line-05.ff0ef52.png";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/line-1.7a0466d.png";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/line-2.664f2c2.png";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/line-3.17a97ae.png";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/line-4.1cb8f89.png";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/line-5.8301a02.png";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets_default/img/line-default.cf19447.png";

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/*
	  html2canvas 0.5.0-beta4 <http://html2canvas.hertzen.com>
	  Copyright (c) 2016 Niklas von Hertzen

	  Released under  License
	*/

	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.html2canvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	(function (global){
	/*! https://mths.be/punycode v1.4.0 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			typeof define == 'function' &&
			typeof define.amd == 'object' &&
			define.amd
		) {
			define('punycode', function() {
				return punycode;
			});
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],2:[function(_dereq_,module,exports){
	var log = _dereq_('./log');

	function restoreOwnerScroll(ownerDocument, x, y) {
	    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
	        ownerDocument.defaultView.scrollTo(x, y);
	    }
	}

	function cloneCanvasContents(canvas, clonedCanvas) {
	    try {
	        if (clonedCanvas) {
	            clonedCanvas.width = canvas.width;
	            clonedCanvas.height = canvas.height;
	            clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
	        }
	    } catch(e) {
	        log("Unable to copy canvas content from", canvas, e);
	    }
	}

	function cloneNode(node, javascriptEnabled) {
	    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

	    var child = node.firstChild;
	    while(child) {
	        if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
	            clone.appendChild(cloneNode(child, javascriptEnabled));
	        }
	        child = child.nextSibling;
	    }

	    if (node.nodeType === 1) {
	        clone._scrollTop = node.scrollTop;
	        clone._scrollLeft = node.scrollLeft;
	        if (node.nodeName === "CANVAS") {
	            cloneCanvasContents(node, clone);
	        } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
	            clone.value = node.value;
	        }
	    }

	    return clone;
	}

	function initNode(node) {
	    if (node.nodeType === 1) {
	        node.scrollTop = node._scrollTop;
	        node.scrollLeft = node._scrollLeft;

	        var child = node.firstChild;
	        while(child) {
	            initNode(child);
	            child = child.nextSibling;
	        }
	    }
	}

	module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
	    var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
	    var container = containerDocument.createElement("iframe");

	    container.className = "html2canvas-container";
	    container.style.visibility = "hidden";
	    container.style.position = "fixed";
	    container.style.left = "-10000px";
	    container.style.top = "0px";
	    container.style.border = "0";
	    container.width = width;
	    container.height = height;
	    container.scrolling = "no"; // ios won't scroll without it
	    containerDocument.body.appendChild(container);

	    return new Promise(function(resolve) {
	        var documentClone = container.contentWindow.document;

	        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
	         if window url is about:blank, we can assign the url to current by writing onto the document
	         */
	        container.contentWindow.onload = container.onload = function() {
	            var interval = setInterval(function() {
	                if (documentClone.body.childNodes.length > 0) {
	                    initNode(documentClone.documentElement);
	                    clearInterval(interval);
	                    if (options.type === "view") {
	                        container.contentWindow.scrollTo(x, y);
	                        if ((/(iPad|iPhone|iPod)/g).test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
	                            documentClone.documentElement.style.top = (-y) + "px";
	                            documentClone.documentElement.style.left = (-x) + "px";
	                            documentClone.documentElement.style.position = 'absolute';
	                        }
	                    }
	                    resolve(container);
	                }
	            }, 50);
	        };

	        documentClone.open();
	        documentClone.write("<!DOCTYPE html><html></html>");
	        // Chrome scrolls the parent document for some reason after the write to the cloned window???
	        restoreOwnerScroll(ownerDocument, x, y);
	        documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
	        documentClone.close();
	    });
	};

	},{"./log":13}],3:[function(_dereq_,module,exports){
	// http://dev.w3.org/csswg/css-color/

	function Color(value) {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = null;
	    var result = this.fromArray(value) ||
	        this.namedColor(value) ||
	        this.rgb(value) ||
	        this.rgba(value) ||
	        this.hex6(value) ||
	        this.hex3(value);
	}

	Color.prototype.darken = function(amount) {
	    var a = 1 - amount;
	    return  new Color([
	        Math.round(this.r * a),
	        Math.round(this.g * a),
	        Math.round(this.b * a),
	        this.a
	    ]);
	};

	Color.prototype.isTransparent = function() {
	    return this.a === 0;
	};

	Color.prototype.isBlack = function() {
	    return this.r === 0 && this.g === 0 && this.b === 0;
	};

	Color.prototype.fromArray = function(array) {
	    if (Array.isArray(array)) {
	        this.r = Math.min(array[0], 255);
	        this.g = Math.min(array[1], 255);
	        this.b = Math.min(array[2], 255);
	        if (array.length > 3) {
	            this.a = array[3];
	        }
	    }

	    return (Array.isArray(array));
	};

	var _hex3 = /^#([a-f0-9]{3})$/i;

	Color.prototype.hex3 = function(value) {
	    var match = null;
	    if ((match = value.match(_hex3)) !== null) {
	        this.r = parseInt(match[1][0] + match[1][0], 16);
	        this.g = parseInt(match[1][1] + match[1][1], 16);
	        this.b = parseInt(match[1][2] + match[1][2], 16);
	    }
	    return match !== null;
	};

	var _hex6 = /^#([a-f0-9]{6})$/i;

	Color.prototype.hex6 = function(value) {
	    var match = null;
	    if ((match = value.match(_hex6)) !== null) {
	        this.r = parseInt(match[1].substring(0, 2), 16);
	        this.g = parseInt(match[1].substring(2, 4), 16);
	        this.b = parseInt(match[1].substring(4, 6), 16);
	    }
	    return match !== null;
	};


	var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

	Color.prototype.rgb = function(value) {
	    var match = null;
	    if ((match = value.match(_rgb)) !== null) {
	        this.r = Number(match[1]);
	        this.g = Number(match[2]);
	        this.b = Number(match[3]);
	    }
	    return match !== null;
	};

	var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

	Color.prototype.rgba = function(value) {
	    var match = null;
	    if ((match = value.match(_rgba)) !== null) {
	        this.r = Number(match[1]);
	        this.g = Number(match[2]);
	        this.b = Number(match[3]);
	        this.a = Number(match[4]);
	    }
	    return match !== null;
	};

	Color.prototype.toString = function() {
	    return this.a !== null && this.a !== 1 ?
	    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
	    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
	};

	Color.prototype.namedColor = function(value) {
	    value = value.toLowerCase();
	    var color = colors[value];
	    if (color) {
	        this.r = color[0];
	        this.g = color[1];
	        this.b = color[2];
	    } else if (value === "transparent") {
	        this.r = this.g = this.b = this.a = 0;
	        return true;
	    }

	    return !!color;
	};

	Color.prototype.isColor = true;

	// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
	var colors = {
	    "aliceblue": [240, 248, 255],
	    "antiquewhite": [250, 235, 215],
	    "aqua": [0, 255, 255],
	    "aquamarine": [127, 255, 212],
	    "azure": [240, 255, 255],
	    "beige": [245, 245, 220],
	    "bisque": [255, 228, 196],
	    "black": [0, 0, 0],
	    "blanchedalmond": [255, 235, 205],
	    "blue": [0, 0, 255],
	    "blueviolet": [138, 43, 226],
	    "brown": [165, 42, 42],
	    "burlywood": [222, 184, 135],
	    "cadetblue": [95, 158, 160],
	    "chartreuse": [127, 255, 0],
	    "chocolate": [210, 105, 30],
	    "coral": [255, 127, 80],
	    "cornflowerblue": [100, 149, 237],
	    "cornsilk": [255, 248, 220],
	    "crimson": [220, 20, 60],
	    "cyan": [0, 255, 255],
	    "darkblue": [0, 0, 139],
	    "darkcyan": [0, 139, 139],
	    "darkgoldenrod": [184, 134, 11],
	    "darkgray": [169, 169, 169],
	    "darkgreen": [0, 100, 0],
	    "darkgrey": [169, 169, 169],
	    "darkkhaki": [189, 183, 107],
	    "darkmagenta": [139, 0, 139],
	    "darkolivegreen": [85, 107, 47],
	    "darkorange": [255, 140, 0],
	    "darkorchid": [153, 50, 204],
	    "darkred": [139, 0, 0],
	    "darksalmon": [233, 150, 122],
	    "darkseagreen": [143, 188, 143],
	    "darkslateblue": [72, 61, 139],
	    "darkslategray": [47, 79, 79],
	    "darkslategrey": [47, 79, 79],
	    "darkturquoise": [0, 206, 209],
	    "darkviolet": [148, 0, 211],
	    "deeppink": [255, 20, 147],
	    "deepskyblue": [0, 191, 255],
	    "dimgray": [105, 105, 105],
	    "dimgrey": [105, 105, 105],
	    "dodgerblue": [30, 144, 255],
	    "firebrick": [178, 34, 34],
	    "floralwhite": [255, 250, 240],
	    "forestgreen": [34, 139, 34],
	    "fuchsia": [255, 0, 255],
	    "gainsboro": [220, 220, 220],
	    "ghostwhite": [248, 248, 255],
	    "gold": [255, 215, 0],
	    "goldenrod": [218, 165, 32],
	    "gray": [128, 128, 128],
	    "green": [0, 128, 0],
	    "greenyellow": [173, 255, 47],
	    "grey": [128, 128, 128],
	    "honeydew": [240, 255, 240],
	    "hotpink": [255, 105, 180],
	    "indianred": [205, 92, 92],
	    "indigo": [75, 0, 130],
	    "ivory": [255, 255, 240],
	    "khaki": [240, 230, 140],
	    "lavender": [230, 230, 250],
	    "lavenderblush": [255, 240, 245],
	    "lawngreen": [124, 252, 0],
	    "lemonchiffon": [255, 250, 205],
	    "lightblue": [173, 216, 230],
	    "lightcoral": [240, 128, 128],
	    "lightcyan": [224, 255, 255],
	    "lightgoldenrodyellow": [250, 250, 210],
	    "lightgray": [211, 211, 211],
	    "lightgreen": [144, 238, 144],
	    "lightgrey": [211, 211, 211],
	    "lightpink": [255, 182, 193],
	    "lightsalmon": [255, 160, 122],
	    "lightseagreen": [32, 178, 170],
	    "lightskyblue": [135, 206, 250],
	    "lightslategray": [119, 136, 153],
	    "lightslategrey": [119, 136, 153],
	    "lightsteelblue": [176, 196, 222],
	    "lightyellow": [255, 255, 224],
	    "lime": [0, 255, 0],
	    "limegreen": [50, 205, 50],
	    "linen": [250, 240, 230],
	    "magenta": [255, 0, 255],
	    "maroon": [128, 0, 0],
	    "mediumaquamarine": [102, 205, 170],
	    "mediumblue": [0, 0, 205],
	    "mediumorchid": [186, 85, 211],
	    "mediumpurple": [147, 112, 219],
	    "mediumseagreen": [60, 179, 113],
	    "mediumslateblue": [123, 104, 238],
	    "mediumspringgreen": [0, 250, 154],
	    "mediumturquoise": [72, 209, 204],
	    "mediumvioletred": [199, 21, 133],
	    "midnightblue": [25, 25, 112],
	    "mintcream": [245, 255, 250],
	    "mistyrose": [255, 228, 225],
	    "moccasin": [255, 228, 181],
	    "navajowhite": [255, 222, 173],
	    "navy": [0, 0, 128],
	    "oldlace": [253, 245, 230],
	    "olive": [128, 128, 0],
	    "olivedrab": [107, 142, 35],
	    "orange": [255, 165, 0],
	    "orangered": [255, 69, 0],
	    "orchid": [218, 112, 214],
	    "palegoldenrod": [238, 232, 170],
	    "palegreen": [152, 251, 152],
	    "paleturquoise": [175, 238, 238],
	    "palevioletred": [219, 112, 147],
	    "papayawhip": [255, 239, 213],
	    "peachpuff": [255, 218, 185],
	    "peru": [205, 133, 63],
	    "pink": [255, 192, 203],
	    "plum": [221, 160, 221],
	    "powderblue": [176, 224, 230],
	    "purple": [128, 0, 128],
	    "rebeccapurple": [102, 51, 153],
	    "red": [255, 0, 0],
	    "rosybrown": [188, 143, 143],
	    "royalblue": [65, 105, 225],
	    "saddlebrown": [139, 69, 19],
	    "salmon": [250, 128, 114],
	    "sandybrown": [244, 164, 96],
	    "seagreen": [46, 139, 87],
	    "seashell": [255, 245, 238],
	    "sienna": [160, 82, 45],
	    "silver": [192, 192, 192],
	    "skyblue": [135, 206, 235],
	    "slateblue": [106, 90, 205],
	    "slategray": [112, 128, 144],
	    "slategrey": [112, 128, 144],
	    "snow": [255, 250, 250],
	    "springgreen": [0, 255, 127],
	    "steelblue": [70, 130, 180],
	    "tan": [210, 180, 140],
	    "teal": [0, 128, 128],
	    "thistle": [216, 191, 216],
	    "tomato": [255, 99, 71],
	    "turquoise": [64, 224, 208],
	    "violet": [238, 130, 238],
	    "wheat": [245, 222, 179],
	    "white": [255, 255, 255],
	    "whitesmoke": [245, 245, 245],
	    "yellow": [255, 255, 0],
	    "yellowgreen": [154, 205, 50]
	};

	module.exports = Color;

	},{}],4:[function(_dereq_,module,exports){
	var Support = _dereq_('./support');
	var CanvasRenderer = _dereq_('./renderers/canvas');
	var ImageLoader = _dereq_('./imageloader');
	var NodeParser = _dereq_('./nodeparser');
	var NodeContainer = _dereq_('./nodecontainer');
	var log = _dereq_('./log');
	var utils = _dereq_('./utils');
	var createWindowClone = _dereq_('./clone');
	var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;
	var getBounds = utils.getBounds;

	var html2canvasNodeAttribute = "data-html2canvas-node";
	var html2canvasCloneIndex = 0;

	function html2canvas(nodeList, options) {
	    var index = html2canvasCloneIndex++;
	    options = options || {};
	    if (options.logging) {
	        log.options.logging = true;
	        log.options.start = Date.now();
	    }

	    options.async = typeof(options.async) === "undefined" ? true : options.async;
	    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
	    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
	    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
	    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
	    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
	    options.strict = !!options.strict;

	    if (typeof(nodeList) === "string") {
	        if (typeof(options.proxy) !== "string") {
	            return Promise.reject("Proxy must be used when rendering url");
	        }
	        var width = options.width != null ? options.width : window.innerWidth;
	        var height = options.height != null ? options.height : window.innerHeight;
	        return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
	            return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
	        });
	    }

	    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
	    node.setAttribute(html2canvasNodeAttribute + index, index);
	    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
	        if (typeof(options.onrendered) === "function") {
	            log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
	            options.onrendered(canvas);
	        }
	        return canvas;
	    });
	}

	html2canvas.CanvasRenderer = CanvasRenderer;
	html2canvas.NodeContainer = NodeContainer;
	html2canvas.log = log;
	html2canvas.utils = utils;

	var html2canvasExport = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
	    return Promise.reject("No canvas support");
	} : html2canvas;

	module.exports = html2canvasExport;

	if (typeof(define) === 'function' && define.amd) {
	    define('html2canvas', [], function() {
	        return html2canvasExport;
	    });
	}

	function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
	    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
	        log("Document cloned");
	        var attributeName = html2canvasNodeAttribute + html2canvasIndex;
	        var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
	        document.querySelector(selector).removeAttribute(attributeName);
	        var clonedWindow = container.contentWindow;
	        var node = clonedWindow.document.querySelector(selector);
	        var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
	        return oncloneHandler.then(function() {
	            return renderWindow(node, container, options, windowWidth, windowHeight);
	        });
	    });
	}

	function renderWindow(node, container, options, windowWidth, windowHeight) {
	    var clonedWindow = container.contentWindow;
	    var support = new Support(clonedWindow.document);
	    var imageLoader = new ImageLoader(options, support);
	    var bounds = getBounds(node);
	    var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
	    var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
	    var renderer = new options.renderer(width, height, imageLoader, options, document);
	    var parser = new NodeParser(node, renderer, support, imageLoader, options);
	    return parser.ready.then(function() {
	        log("Finished rendering");
	        var canvas;

	        if (options.type === "view") {
	            canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
	        } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
	            canvas = renderer.canvas;
	        } else {
	            canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});
	        }

	        cleanupContainer(container, options);
	        return canvas;
	    });
	}

	function cleanupContainer(container, options) {
	    if (options.removeContainer) {
	        container.parentNode.removeChild(container);
	        log("Cleaned up container");
	    }
	}

	function crop(canvas, bounds) {
	    var croppedCanvas = document.createElement("canvas");
	    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
	    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
	    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
	    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
	    croppedCanvas.width = bounds.width;
	    croppedCanvas.height =  bounds.height;
	    var width = x2-x1;
	    var height = y2-y1;
	    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
	    log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
	    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
	    return croppedCanvas;
	}

	function documentWidth (doc) {
	    return Math.max(
	        Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
	        Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
	        Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
	    );
	}

	function documentHeight (doc) {
	    return Math.max(
	        Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
	        Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
	        Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
	    );
	}

	function absoluteUrl(url) {
	    var link = document.createElement("a");
	    link.href = url;
	    link.href = link.href;
	    return link;
	}

	},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(_dereq_,module,exports){
	var log = _dereq_('./log');
	var smallImage = _dereq_('./utils').smallImage;

	function DummyImageContainer(src) {
	    this.src = src;
	    log("DummyImageContainer for", src);
	    if (!this.promise || !this.image) {
	        log("Initiating DummyImageContainer");
	        DummyImageContainer.prototype.image = new Image();
	        var image = this.image;
	        DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
	            image.onload = resolve;
	            image.onerror = reject;
	            image.src = smallImage();
	            if (image.complete === true) {
	                resolve(image);
	            }
	        });
	    }
	}

	module.exports = DummyImageContainer;

	},{"./log":13,"./utils":26}],6:[function(_dereq_,module,exports){
	var smallImage = _dereq_('./utils').smallImage;

	function Font(family, size) {
	    var container = document.createElement('div'),
	        img = document.createElement('img'),
	        span = document.createElement('span'),
	        sampleText = 'Hidden Text',
	        baseline,
	        middle;

	    container.style.visibility = "hidden";
	    container.style.fontFamily = family;
	    container.style.fontSize = size;
	    container.style.margin = 0;
	    container.style.padding = 0;

	    document.body.appendChild(container);

	    img.src = smallImage();
	    img.width = 1;
	    img.height = 1;

	    img.style.margin = 0;
	    img.style.padding = 0;
	    img.style.verticalAlign = "baseline";

	    span.style.fontFamily = family;
	    span.style.fontSize = size;
	    span.style.margin = 0;
	    span.style.padding = 0;

	    span.appendChild(document.createTextNode(sampleText));
	    container.appendChild(span);
	    container.appendChild(img);
	    baseline = (img.offsetTop - span.offsetTop) + 1;

	    container.removeChild(span);
	    container.appendChild(document.createTextNode(sampleText));

	    container.style.lineHeight = "normal";
	    img.style.verticalAlign = "super";

	    middle = (img.offsetTop-container.offsetTop) + 1;

	    document.body.removeChild(container);

	    this.baseline = baseline;
	    this.lineWidth = 1;
	    this.middle = middle;
	}

	module.exports = Font;

	},{"./utils":26}],7:[function(_dereq_,module,exports){
	var Font = _dereq_('./font');

	function FontMetrics() {
	    this.data = {};
	}

	FontMetrics.prototype.getMetrics = function(family, size) {
	    if (this.data[family + "-" + size] === undefined) {
	        this.data[family + "-" + size] = new Font(family, size);
	    }
	    return this.data[family + "-" + size];
	};

	module.exports = FontMetrics;

	},{"./font":6}],8:[function(_dereq_,module,exports){
	var utils = _dereq_('./utils');
	var getBounds = utils.getBounds;
	var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

	function FrameContainer(container, sameOrigin, options) {
	    this.image = null;
	    this.src = container;
	    var self = this;
	    var bounds = getBounds(container);
	    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
	        if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
	            container.contentWindow.onload = container.onload = function() {
	                resolve(container);
	            };
	        } else {
	            resolve(container);
	        }
	    })).then(function(container) {
	        var html2canvas = _dereq_('./core');
	        return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
	    }).then(function(canvas) {
	        return self.image = canvas;
	    });
	}

	FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
	    var container = this.src;
	    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
	};

	module.exports = FrameContainer;

	},{"./core":4,"./proxy":16,"./utils":26}],9:[function(_dereq_,module,exports){
	function GradientContainer(imageData) {
	    this.src = imageData.value;
	    this.colorStops = [];
	    this.type = null;
	    this.x0 = 0.5;
	    this.y0 = 0.5;
	    this.x1 = 0.5;
	    this.y1 = 0.5;
	    this.promise = Promise.resolve(true);
	}

	GradientContainer.TYPES = {
	    LINEAR: 1,
	    RADIAL: 2
	};

	// TODO: support hsl[a], negative %/length values
	// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
	GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

	module.exports = GradientContainer;

	},{}],10:[function(_dereq_,module,exports){
	function ImageContainer(src, cors) {
	    this.src = src;
	    this.image = new Image();
	    var self = this;
	    this.tainted = null;
	    this.promise = new Promise(function(resolve, reject) {
	        self.image.onload = resolve;
	        self.image.onerror = reject;
	        if (cors) {
	            self.image.crossOrigin = "anonymous";
	        }
	        self.image.src = src;
	        if (self.image.complete === true) {
	            resolve(self.image);
	        }
	    });
	}

	module.exports = ImageContainer;

	},{}],11:[function(_dereq_,module,exports){
	var log = _dereq_('./log');
	var ImageContainer = _dereq_('./imagecontainer');
	var DummyImageContainer = _dereq_('./dummyimagecontainer');
	var ProxyImageContainer = _dereq_('./proxyimagecontainer');
	var FrameContainer = _dereq_('./framecontainer');
	var SVGContainer = _dereq_('./svgcontainer');
	var SVGNodeContainer = _dereq_('./svgnodecontainer');
	var LinearGradientContainer = _dereq_('./lineargradientcontainer');
	var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');
	var bind = _dereq_('./utils').bind;

	function ImageLoader(options, support) {
	    this.link = null;
	    this.options = options;
	    this.support = support;
	    this.origin = this.getOrigin(window.location.href);
	}

	ImageLoader.prototype.findImages = function(nodes) {
	    var images = [];
	    nodes.reduce(function(imageNodes, container) {
	        switch(container.node.nodeName) {
	        case "IMG":
	            return imageNodes.concat([{
	                args: [container.node.src],
	                method: "url"
	            }]);
	        case "svg":
	        case "IFRAME":
	            return imageNodes.concat([{
	                args: [container.node],
	                method: container.node.nodeName
	            }]);
	        }
	        return imageNodes;
	    }, []).forEach(this.addImage(images, this.loadImage), this);
	    return images;
	};

	ImageLoader.prototype.findBackgroundImage = function(images, container) {
	    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
	    return images;
	};

	ImageLoader.prototype.addImage = function(images, callback) {
	    return function(newImage) {
	        newImage.args.forEach(function(image) {
	            if (!this.imageExists(images, image)) {
	                images.splice(0, 0, callback.call(this, newImage));
	                log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
	            }
	        }, this);
	    };
	};

	ImageLoader.prototype.hasImageBackground = function(imageData) {
	    return imageData.method !== "none";
	};

	ImageLoader.prototype.loadImage = function(imageData) {
	    if (imageData.method === "url") {
	        var src = imageData.args[0];
	        if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
	            return new SVGContainer(src);
	        } else if (src.match(/data:image\/.*;base64,/i)) {
	            return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
	        } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
	            return new ImageContainer(src, false);
	        } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
	            return new ImageContainer(src, true);
	        } else if (this.options.proxy) {
	            return new ProxyImageContainer(src, this.options.proxy);
	        } else {
	            return new DummyImageContainer(src);
	        }
	    } else if (imageData.method === "linear-gradient") {
	        return new LinearGradientContainer(imageData);
	    } else if (imageData.method === "gradient") {
	        return new WebkitGradientContainer(imageData);
	    } else if (imageData.method === "svg") {
	        return new SVGNodeContainer(imageData.args[0], this.support.svg);
	    } else if (imageData.method === "IFRAME") {
	        return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
	    } else {
	        return new DummyImageContainer(imageData);
	    }
	};

	ImageLoader.prototype.isSVG = function(src) {
	    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
	};

	ImageLoader.prototype.imageExists = function(images, src) {
	    return images.some(function(image) {
	        return image.src === src;
	    });
	};

	ImageLoader.prototype.isSameOrigin = function(url) {
	    return (this.getOrigin(url) === this.origin);
	};

	ImageLoader.prototype.getOrigin = function(url) {
	    var link = this.link || (this.link = document.createElement("a"));
	    link.href = url;
	    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
	    return link.protocol + link.hostname + link.port;
	};

	ImageLoader.prototype.getPromise = function(container) {
	    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
	        var dummy = new DummyImageContainer(container.src);
	        return dummy.promise.then(function(image) {
	            container.image = image;
	        });
	    });
	};

	ImageLoader.prototype.get = function(src) {
	    var found = null;
	    return this.images.some(function(img) {
	        return (found = img).src === src;
	    }) ? found : null;
	};

	ImageLoader.prototype.fetch = function(nodes) {
	    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
	    this.images.forEach(function(image, index) {
	        image.promise.then(function() {
	            log("Succesfully loaded image #"+ (index+1), image);
	        }, function(e) {
	            log("Failed loading image #"+ (index+1), image, e);
	        });
	    });
	    this.ready = Promise.all(this.images.map(this.getPromise, this));
	    log("Finished searching images");
	    return this;
	};

	ImageLoader.prototype.timeout = function(container, timeout) {
	    var timer;
	    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
	        timer = setTimeout(function() {
	            log("Timed out loading image", container);
	            reject(container);
	        }, timeout);
	    })]).then(function(container) {
	        clearTimeout(timer);
	        return container;
	    });
	    promise['catch'](function() {
	        clearTimeout(timer);
	    });
	    return promise;
	};

	module.exports = ImageLoader;

	},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(_dereq_,module,exports){
	var GradientContainer = _dereq_('./gradientcontainer');
	var Color = _dereq_('./color');

	function LinearGradientContainer(imageData) {
	    GradientContainer.apply(this, arguments);
	    this.type = GradientContainer.TYPES.LINEAR;

	    var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test( imageData.args[0] ) ||
	        !GradientContainer.REGEXP_COLORSTOP.test( imageData.args[0] );

	    if (hasDirection) {
	        imageData.args[0].split(/\s+/).reverse().forEach(function(position, index) {
	            switch(position) {
	            case "left":
	                this.x0 = 0;
	                this.x1 = 1;
	                break;
	            case "top":
	                this.y0 = 0;
	                this.y1 = 1;
	                break;
	            case "right":
	                this.x0 = 1;
	                this.x1 = 0;
	                break;
	            case "bottom":
	                this.y0 = 1;
	                this.y1 = 0;
	                break;
	            case "to":
	                var y0 = this.y0;
	                var x0 = this.x0;
	                this.y0 = this.y1;
	                this.x0 = this.x1;
	                this.x1 = x0;
	                this.y1 = y0;
	                break;
	            case "center":
	                break; // centered by default
	            // Firefox internally converts position keywords to percentages:
	            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
	            default: // percentage or absolute length
	                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
	                var ratio = parseFloat(position, 10) * 1e-2;
	                if (isNaN(ratio)) { // invalid or unhandled value
	                    break;
	                }
	                if (index === 0) {
	                    this.y0 = ratio;
	                    this.y1 = 1 - this.y0;
	                } else {
	                    this.x0 = ratio;
	                    this.x1 = 1 - this.x0;
	                }
	                break;
	            }
	        }, this);
	    } else {
	        this.y0 = 0;
	        this.y1 = 1;
	    }

	    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
	        var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
	        var value = +colorStopMatch[2];
	        var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
	        return {
	            color: new Color(colorStopMatch[1]),
	            // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
	            stop: unit === "%" ? value / 100 : null
	        };
	    });

	    if (this.colorStops[0].stop === null) {
	        this.colorStops[0].stop = 0;
	    }

	    if (this.colorStops[this.colorStops.length - 1].stop === null) {
	        this.colorStops[this.colorStops.length - 1].stop = 1;
	    }

	    // calculates and fills-in explicit stop positions when omitted from rule
	    this.colorStops.forEach(function(colorStop, index) {
	        if (colorStop.stop === null) {
	            this.colorStops.slice(index).some(function(find, count) {
	                if (find.stop !== null) {
	                    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
	                    return true;
	                } else {
	                    return false;
	                }
	            }, this);
	        }
	    }, this);
	}

	LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

	// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
	LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

	module.exports = LinearGradientContainer;

	},{"./color":3,"./gradientcontainer":9}],13:[function(_dereq_,module,exports){
	var logger = function() {
	    if (logger.options.logging && window.console && window.console.log) {
	        Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - logger.options.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
	    }
	};

	logger.options = {logging: false};
	module.exports = logger;

	},{}],14:[function(_dereq_,module,exports){
	var Color = _dereq_('./color');
	var utils = _dereq_('./utils');
	var getBounds = utils.getBounds;
	var parseBackgrounds = utils.parseBackgrounds;
	var offsetBounds = utils.offsetBounds;

	function NodeContainer(node, parent) {
	    this.node = node;
	    this.parent = parent;
	    this.stack = null;
	    this.bounds = null;
	    this.borders = null;
	    this.clip = [];
	    this.backgroundClip = [];
	    this.offsetBounds = null;
	    this.visible = null;
	    this.computedStyles = null;
	    this.colors = {};
	    this.styles = {};
	    this.backgroundImages = null;
	    this.transformData = null;
	    this.transformMatrix = null;
	    this.isPseudoElement = false;
	    this.opacity = null;
	}

	NodeContainer.prototype.cloneTo = function(stack) {
	    stack.visible = this.visible;
	    stack.borders = this.borders;
	    stack.bounds = this.bounds;
	    stack.clip = this.clip;
	    stack.backgroundClip = this.backgroundClip;
	    stack.computedStyles = this.computedStyles;
	    stack.styles = this.styles;
	    stack.backgroundImages = this.backgroundImages;
	    stack.opacity = this.opacity;
	};

	NodeContainer.prototype.getOpacity = function() {
	    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
	};

	NodeContainer.prototype.assignStack = function(stack) {
	    this.stack = stack;
	    stack.children.push(this);
	};

	NodeContainer.prototype.isElementVisible = function() {
	    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
	        this.css('display') !== "none" &&
	        this.css('visibility') !== "hidden" &&
	        !this.node.hasAttribute("data-html2canvas-ignore") &&
	        (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
	    );
	};

	NodeContainer.prototype.css = function(attribute) {
	    if (!this.computedStyles) {
	        this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
	    }

	    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
	};

	NodeContainer.prototype.prefixedCss = function(attribute) {
	    var prefixes = ["webkit", "moz", "ms", "o"];
	    var value = this.css(attribute);
	    if (value === undefined) {
	        prefixes.some(function(prefix) {
	            value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
	            return value !== undefined;
	        }, this);
	    }
	    return value === undefined ? null : value;
	};

	NodeContainer.prototype.computedStyle = function(type) {
	    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
	};

	NodeContainer.prototype.cssInt = function(attribute) {
	    var value = parseInt(this.css(attribute), 10);
	    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
	};

	NodeContainer.prototype.color = function(attribute) {
	    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
	};

	NodeContainer.prototype.cssFloat = function(attribute) {
	    var value = parseFloat(this.css(attribute));
	    return (isNaN(value)) ? 0 : value;
	};

	NodeContainer.prototype.fontWeight = function() {
	    var weight = this.css("fontWeight");
	    switch(parseInt(weight, 10)){
	    case 401:
	        weight = "bold";
	        break;
	    case 400:
	        weight = "normal";
	        break;
	    }
	    return weight;
	};

	NodeContainer.prototype.parseClip = function() {
	    var matches = this.css('clip').match(this.CLIP);
	    if (matches) {
	        return {
	            top: parseInt(matches[1], 10),
	            right: parseInt(matches[2], 10),
	            bottom: parseInt(matches[3], 10),
	            left: parseInt(matches[4], 10)
	        };
	    }
	    return null;
	};

	NodeContainer.prototype.parseBackgroundImages = function() {
	    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
	};

	NodeContainer.prototype.cssList = function(property, index) {
	    var value = (this.css(property) || '').split(',');
	    value = value[index || 0] || value[0] || 'auto';
	    value = value.trim().split(' ');
	    if (value.length === 1) {
	        value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
	    }
	    return value;
	};

	NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
	    var size = this.cssList("backgroundSize", index);
	    var width, height;

	    if (isPercentage(size[0])) {
	        width = bounds.width * parseFloat(size[0]) / 100;
	    } else if (/contain|cover/.test(size[0])) {
	        var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
	        return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
	    } else {
	        width = parseInt(size[0], 10);
	    }

	    if (size[0] === 'auto' && size[1] === 'auto') {
	        height = image.height;
	    } else if (size[1] === 'auto') {
	        height = width / image.width * image.height;
	    } else if (isPercentage(size[1])) {
	        height =  bounds.height * parseFloat(size[1]) / 100;
	    } else {
	        height = parseInt(size[1], 10);
	    }

	    if (size[0] === 'auto') {
	        width = height / image.height * image.width;
	    }

	    return {width: width, height: height};
	};

	NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
	    var position = this.cssList('backgroundPosition', index);
	    var left, top;

	    if (isPercentage(position[0])){
	        left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
	    } else {
	        left = parseInt(position[0], 10);
	    }

	    if (position[1] === 'auto') {
	        top = left / image.width * image.height;
	    } else if (isPercentage(position[1])){
	        top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
	    } else {
	        top = parseInt(position[1], 10);
	    }

	    if (position[0] === 'auto') {
	        left = top / image.height * image.width;
	    }

	    return {left: left, top: top};
	};

	NodeContainer.prototype.parseBackgroundRepeat = function(index) {
	    return this.cssList("backgroundRepeat", index)[0];
	};

	NodeContainer.prototype.parseTextShadows = function() {
	    var textShadow = this.css("textShadow");
	    var results = [];

	    if (textShadow && textShadow !== 'none') {
	        var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
	        for (var i = 0; shadows && (i < shadows.length); i++) {
	            var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
	            results.push({
	                color: new Color(s[0]),
	                offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
	                offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
	                blur: s[3] ? s[3].replace('px', '') : 0
	            });
	        }
	    }
	    return results;
	};

	NodeContainer.prototype.parseTransform = function() {
	    if (!this.transformData) {
	        if (this.hasTransform()) {
	            var offset = this.parseBounds();
	            var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
	            origin[0] += offset.left;
	            origin[1] += offset.top;
	            this.transformData = {
	                origin: origin,
	                matrix: this.parseTransformMatrix()
	            };
	        } else {
	            this.transformData = {
	                origin: [0, 0],
	                matrix: [1, 0, 0, 1, 0, 0]
	            };
	        }
	    }
	    return this.transformData;
	};

	NodeContainer.prototype.parseTransformMatrix = function() {
	    if (!this.transformMatrix) {
	        var transform = this.prefixedCss("transform");
	        var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
	        this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
	    }
	    return this.transformMatrix;
	};

	NodeContainer.prototype.parseBounds = function() {
	    return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
	};

	NodeContainer.prototype.hasTransform = function() {
	    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
	};

	NodeContainer.prototype.getValue = function() {
	    var value = this.node.value || "";
	    if (this.node.tagName === "SELECT") {
	        value = selectionValue(this.node);
	    } else if (this.node.type === "password") {
	        value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
	    }
	    return value.length === 0 ? (this.node.placeholder || "") : value;
	};

	NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
	NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
	NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
	NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

	function selectionValue(node) {
	    var option = node.options[node.selectedIndex || 0];
	    return option ? (option.text || "") : "";
	}

	function parseMatrix(match) {
	    if (match && match[1] === "matrix") {
	        return match[2].split(",").map(function(s) {
	            return parseFloat(s.trim());
	        });
	    } else if (match && match[1] === "matrix3d") {
	        var matrix3d = match[2].split(",").map(function(s) {
	          return parseFloat(s.trim());
	        });
	        return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
	    }
	}

	function isPercentage(value) {
	    return value.toString().indexOf("%") !== -1;
	}

	function removePx(str) {
	    return str.replace("px", "");
	}

	function asFloat(str) {
	    return parseFloat(str);
	}

	module.exports = NodeContainer;

	},{"./color":3,"./utils":26}],15:[function(_dereq_,module,exports){
	var log = _dereq_('./log');
	var punycode = _dereq_('punycode');
	var NodeContainer = _dereq_('./nodecontainer');
	var TextContainer = _dereq_('./textcontainer');
	var PseudoElementContainer = _dereq_('./pseudoelementcontainer');
	var FontMetrics = _dereq_('./fontmetrics');
	var Color = _dereq_('./color');
	var StackingContext = _dereq_('./stackingcontext');
	var utils = _dereq_('./utils');
	var bind = utils.bind;
	var getBounds = utils.getBounds;
	var parseBackgrounds = utils.parseBackgrounds;
	var offsetBounds = utils.offsetBounds;

	function NodeParser(element, renderer, support, imageLoader, options) {
	    log("Starting NodeParser");
	    this.renderer = renderer;
	    this.options = options;
	    this.range = null;
	    this.support = support;
	    this.renderQueue = [];
	    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
	    var parent = new NodeContainer(element, null);
	    if (options.background) {
	        renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
	    }
	    if (element === element.ownerDocument.documentElement) {
	        // http://www.w3.org/TR/css3-background/#special-backgrounds
	        var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
	        renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
	    }
	    parent.visibile = parent.isElementVisible();
	    this.createPseudoHideStyles(element.ownerDocument);
	    this.disableAnimations(element.ownerDocument);
	    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
	        return container.visible = container.isElementVisible();
	    }).map(this.getPseudoElements, this));
	    this.fontMetrics = new FontMetrics();
	    log("Fetched nodes, total:", this.nodes.length);
	    log("Calculate overflow clips");
	    this.calculateOverflowClips();
	    log("Start fetching images");
	    this.images = imageLoader.fetch(this.nodes.filter(isElement));
	    this.ready = this.images.ready.then(bind(function() {
	        log("Images loaded, starting parsing");
	        log("Creating stacking contexts");
	        this.createStackingContexts();
	        log("Sorting stacking contexts");
	        this.sortStackingContexts(this.stack);
	        this.parse(this.stack);
	        log("Render queue created with " + this.renderQueue.length + " items");
	        return new Promise(bind(function(resolve) {
	            if (!options.async) {
	                this.renderQueue.forEach(this.paint, this);
	                resolve();
	            } else if (typeof(options.async) === "function") {
	                options.async.call(this, this.renderQueue, resolve);
	            } else if (this.renderQueue.length > 0){
	                this.renderIndex = 0;
	                this.asyncRenderer(this.renderQueue, resolve);
	            } else {
	                resolve();
	            }
	        }, this));
	    }, this));
	}

	NodeParser.prototype.calculateOverflowClips = function() {
	    this.nodes.forEach(function(container) {
	        if (isElement(container)) {
	            if (isPseudoElement(container)) {
	                container.appendToDOM();
	            }
	            container.borders = this.parseBorders(container);
	            var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
	            var cssClip = container.parseClip();
	            if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
	                clip.push([["rect",
	                        container.bounds.left + cssClip.left,
	                        container.bounds.top + cssClip.top,
	                        cssClip.right - cssClip.left,
	                        cssClip.bottom - cssClip.top
	                ]]);
	            }
	            container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
	            container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
	            if (isPseudoElement(container)) {
	                container.cleanDOM();
	            }
	        } else if (isTextNode(container)) {
	            container.clip = hasParentClip(container) ? container.parent.clip : [];
	        }
	        if (!isPseudoElement(container)) {
	            container.bounds = null;
	        }
	    }, this);
	};

	function hasParentClip(container) {
	    return container.parent && container.parent.clip.length;
	}

	NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
	    asyncTimer = asyncTimer || Date.now();
	    this.paint(queue[this.renderIndex++]);
	    if (queue.length === this.renderIndex) {
	        resolve();
	    } else if (asyncTimer + 20 > Date.now()) {
	        this.asyncRenderer(queue, resolve, asyncTimer);
	    } else {
	        setTimeout(bind(function() {
	            this.asyncRenderer(queue, resolve);
	        }, this), 0);
	    }
	};

	NodeParser.prototype.createPseudoHideStyles = function(document) {
	    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
	        '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
	};

	NodeParser.prototype.disableAnimations = function(document) {
	    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
	        '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
	};

	NodeParser.prototype.createStyles = function(document, styles) {
	    var hidePseudoElements = document.createElement('style');
	    hidePseudoElements.innerHTML = styles;
	    document.body.appendChild(hidePseudoElements);
	};

	NodeParser.prototype.getPseudoElements = function(container) {
	    var nodes = [[container]];
	    if (container.node.nodeType === Node.ELEMENT_NODE) {
	        var before = this.getPseudoElement(container, ":before");
	        var after = this.getPseudoElement(container, ":after");

	        if (before) {
	            nodes.push(before);
	        }

	        if (after) {
	            nodes.push(after);
	        }
	    }
	    return flatten(nodes);
	};

	function toCamelCase(str) {
	    return str.replace(/(\-[a-z])/g, function(match){
	        return match.toUpperCase().replace('-','');
	    });
	}

	NodeParser.prototype.getPseudoElement = function(container, type) {
	    var style = container.computedStyle(type);
	    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
	        return null;
	    }

	    var content = stripQuotes(style.content);
	    var isImage = content.substr(0, 3) === 'url';
	    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
	    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

	    for (var i = style.length-1; i >= 0; i--) {
	        var property = toCamelCase(style.item(i));
	        pseudoNode.style[property] = style[property];
	    }

	    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

	    if (isImage) {
	        pseudoNode.src = parseBackgrounds(content)[0].args[0];
	        return [pseudoContainer];
	    } else {
	        var text = document.createTextNode(content);
	        pseudoNode.appendChild(text);
	        return [pseudoContainer, new TextContainer(text, pseudoContainer)];
	    }
	};


	NodeParser.prototype.getChildren = function(parentContainer) {
	    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
	        var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
	        return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
	    }, this));
	};

	NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
	    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
	    container.cloneTo(stack);
	    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
	    parentStack.contexts.push(stack);
	    container.stack = stack;
	};

	NodeParser.prototype.createStackingContexts = function() {
	    this.nodes.forEach(function(container) {
	        if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
	            this.newStackingContext(container, true);
	        } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
	            this.newStackingContext(container, false);
	        } else {
	            container.assignStack(container.parent.stack);
	        }
	    }, this);
	};

	NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
	    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
	};

	NodeParser.prototype.isRootElement = function(container) {
	    return container.parent === null;
	};

	NodeParser.prototype.sortStackingContexts = function(stack) {
	    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
	    stack.contexts.forEach(this.sortStackingContexts, this);
	};

	NodeParser.prototype.parseTextBounds = function(container) {
	    return function(text, index, textList) {
	        if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
	            if (this.support.rangeBounds && !container.parent.hasTransform()) {
	                var offset = textList.slice(0, index).join("").length;
	                return this.getRangeBounds(container.node, offset, text.length);
	            } else if (container.node && typeof(container.node.data) === "string") {
	                var replacementNode = container.node.splitText(text.length);
	                var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
	                container.node = replacementNode;
	                return bounds;
	            }
	        } else if(!this.support.rangeBounds || container.parent.hasTransform()){
	            container.node = container.node.splitText(text.length);
	        }
	        return {};
	    };
	};

	NodeParser.prototype.getWrapperBounds = function(node, transform) {
	    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
	    var parent = node.parentNode,
	        backupText = node.cloneNode(true);

	    wrapper.appendChild(node.cloneNode(true));
	    parent.replaceChild(wrapper, node);
	    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
	    parent.replaceChild(backupText, wrapper);
	    return bounds;
	};

	NodeParser.prototype.getRangeBounds = function(node, offset, length) {
	    var range = this.range || (this.range = node.ownerDocument.createRange());
	    range.setStart(node, offset);
	    range.setEnd(node, offset + length);
	    return range.getBoundingClientRect();
	};

	function ClearTransform() {}

	NodeParser.prototype.parse = function(stack) {
	    // http://www.w3.org/TR/CSS21/visuren.html#z-index
	    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
	    var descendantElements = stack.children.filter(isElement);
	    var descendantNonFloats = descendantElements.filter(not(isFloating));
	    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
	    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
	    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
	    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
	    var text = stack.children.filter(isTextNode).filter(hasText);
	    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
	    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
	        .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
	            this.renderQueue.push(container);
	            if (isStackingContext(container)) {
	                this.parse(container);
	                this.renderQueue.push(new ClearTransform());
	            }
	        }, this);
	};

	NodeParser.prototype.paint = function(container) {
	    try {
	        if (container instanceof ClearTransform) {
	            this.renderer.ctx.restore();
	        } else if (isTextNode(container)) {
	            if (isPseudoElement(container.parent)) {
	                container.parent.appendToDOM();
	            }
	            this.paintText(container);
	            if (isPseudoElement(container.parent)) {
	                container.parent.cleanDOM();
	            }
	        } else {
	            this.paintNode(container);
	        }
	    } catch(e) {
	        log(e);
	        if (this.options.strict) {
	            throw e;
	        }
	    }
	};

	NodeParser.prototype.paintNode = function(container) {
	    if (isStackingContext(container)) {
	        this.renderer.setOpacity(container.opacity);
	        this.renderer.ctx.save();
	        if (container.hasTransform()) {
	            this.renderer.setTransform(container.parseTransform());
	        }
	    }

	    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
	        this.paintCheckbox(container);
	    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
	        this.paintRadio(container);
	    } else {
	        this.paintElement(container);
	    }
	};

	NodeParser.prototype.paintElement = function(container) {
	    var bounds = container.parseBounds();
	    this.renderer.clip(container.backgroundClip, function() {
	        this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
	    }, this);

	    this.renderer.clip(container.clip, function() {
	        this.renderer.renderBorders(container.borders.borders);
	    }, this);

	    this.renderer.clip(container.backgroundClip, function() {
	        switch (container.node.nodeName) {
	        case "svg":
	        case "IFRAME":
	            var imgContainer = this.images.get(container.node);
	            if (imgContainer) {
	                this.renderer.renderImage(container, bounds, container.borders, imgContainer);
	            } else {
	                log("Error loading <" + container.node.nodeName + ">", container.node);
	            }
	            break;
	        case "IMG":
	            var imageContainer = this.images.get(container.node.src);
	            if (imageContainer) {
	                this.renderer.renderImage(container, bounds, container.borders, imageContainer);
	            } else {
	                log("Error loading <img>", container.node.src);
	            }
	            break;
	        case "CANVAS":
	            this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
	            break;
	        case "SELECT":
	        case "INPUT":
	        case "TEXTAREA":
	            this.paintFormValue(container);
	            break;
	        }
	    }, this);
	};

	NodeParser.prototype.paintCheckbox = function(container) {
	    var b = container.parseBounds();

	    var size = Math.min(b.width, b.height);
	    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
	    var r = [3, 3];
	    var radius = [r, r, r, r];
	    var borders = [1,1,1,1].map(function(w) {
	        return {color: new Color('#A5A5A5'), width: w};
	    });

	    var borderPoints = calculateCurvePoints(bounds, radius, borders);

	    this.renderer.clip(container.backgroundClip, function() {
	        this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
	        this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
	        if (container.node.checked) {
	            this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
	            this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
	        }
	    }, this);
	};

	NodeParser.prototype.paintRadio = function(container) {
	    var bounds = container.parseBounds();

	    var size = Math.min(bounds.width, bounds.height) - 2;

	    this.renderer.clip(container.backgroundClip, function() {
	        this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
	        if (container.node.checked) {
	            this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
	        }
	    }, this);
	};

	NodeParser.prototype.paintFormValue = function(container) {
	    var value = container.getValue();
	    if (value.length > 0) {
	        var document = container.node.ownerDocument;
	        var wrapper = document.createElement('html2canvaswrapper');
	        var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
	            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
	            'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
	            'boxSizing', 'whiteSpace', 'wordWrap'];

	        properties.forEach(function(property) {
	            try {
	                wrapper.style[property] = container.css(property);
	            } catch(e) {
	                // Older IE has issues with "border"
	                log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
	            }
	        });
	        var bounds = container.parseBounds();
	        wrapper.style.position = "fixed";
	        wrapper.style.left = bounds.left + "px";
	        wrapper.style.top = bounds.top + "px";
	        wrapper.textContent = value;
	        document.body.appendChild(wrapper);
	        this.paintText(new TextContainer(wrapper.firstChild, container));
	        document.body.removeChild(wrapper);
	    }
	};

	NodeParser.prototype.paintText = function(container) {
	    container.applyTextTransform();
	    var characters = punycode.ucs2.decode(container.node.data);
	    var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
	        return punycode.ucs2.encode([character]);
	    });

	    var weight = container.parent.fontWeight();
	    var size = container.parent.css('fontSize');
	    var family = container.parent.css('fontFamily');
	    var shadows = container.parent.parseTextShadows();

	    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
	    if (shadows.length) {
	        // TODO: support multiple text shadows
	        this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
	    } else {
	        this.renderer.clearShadow();
	    }

	    this.renderer.clip(container.parent.clip, function() {
	        textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
	            if (bounds) {
	                this.renderer.text(textList[index], bounds.left, bounds.bottom);
	                this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
	            }
	        }, this);
	    }, this);
	};

	NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
	    switch(container.css("textDecoration").split(" ")[0]) {
	    case "underline":
	        // Draws a line at the baseline of the font
	        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
	        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
	        break;
	    case "overline":
	        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
	        break;
	    case "line-through":
	        // TODO try and find exact position for line-through
	        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
	        break;
	    }
	};

	var borderColorTransforms = {
	    inset: [
	        ["darken", 0.60],
	        ["darken", 0.10],
	        ["darken", 0.10],
	        ["darken", 0.60]
	    ]
	};

	NodeParser.prototype.parseBorders = function(container) {
	    var nodeBounds = container.parseBounds();
	    var radius = getBorderRadiusData(container);
	    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
	        var style = container.css('border' + side + 'Style');
	        var color = container.color('border' + side + 'Color');
	        if (style === "inset" && color.isBlack()) {
	            color = new Color([255, 255, 255, color.a]); // this is wrong, but
	        }
	        var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
	        return {
	            width: container.cssInt('border' + side + 'Width'),
	            color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
	            args: null
	        };
	    });
	    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

	    return {
	        clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
	        borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
	    };
	};

	function calculateBorders(borders, nodeBounds, borderPoints, radius) {
	    return borders.map(function(border, borderSide) {
	        if (border.width > 0) {
	            var bx = nodeBounds.left;
	            var by = nodeBounds.top;
	            var bw = nodeBounds.width;
	            var bh = nodeBounds.height - (borders[2].width);

	            switch(borderSide) {
	            case 0:
	                // top border
	                bh = borders[0].width;
	                border.args = drawSide({
	                        c1: [bx, by],
	                        c2: [bx + bw, by],
	                        c3: [bx + bw - borders[1].width, by + bh],
	                        c4: [bx + borders[3].width, by + bh]
	                    }, radius[0], radius[1],
	                    borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
	                break;
	            case 1:
	                // right border
	                bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
	                bw = borders[1].width;

	                border.args = drawSide({
	                        c1: [bx + bw, by],
	                        c2: [bx + bw, by + bh + borders[2].width],
	                        c3: [bx, by + bh],
	                        c4: [bx, by + borders[0].width]
	                    }, radius[1], radius[2],
	                    borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
	                break;
	            case 2:
	                // bottom border
	                by = (by + nodeBounds.height) - (borders[2].width);
	                bh = borders[2].width;
	                border.args = drawSide({
	                        c1: [bx + bw, by + bh],
	                        c2: [bx, by + bh],
	                        c3: [bx + borders[3].width, by],
	                        c4: [bx + bw - borders[3].width, by]
	                    }, radius[2], radius[3],
	                    borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
	                break;
	            case 3:
	                // left border
	                bw = borders[3].width;
	                border.args = drawSide({
	                        c1: [bx, by + bh + borders[2].width],
	                        c2: [bx, by],
	                        c3: [bx + bw, by + borders[0].width],
	                        c4: [bx + bw, by + bh]
	                    }, radius[3], radius[0],
	                    borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
	                break;
	            }
	        }
	        return border;
	    });
	}

	NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
	    var backgroundClip = container.css('backgroundClip'),
	        borderArgs = [];

	    switch(backgroundClip) {
	    case "content-box":
	    case "padding-box":
	        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
	        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
	        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
	        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
	        break;

	    default:
	        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
	        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
	        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
	        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
	        break;
	    }

	    return borderArgs;
	};

	function getCurvePoints(x, y, r1, r2) {
	    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
	    var ox = (r1) * kappa, // control point offset horizontal
	        oy = (r2) * kappa, // control point offset vertical
	        xm = x + r1, // x-middle
	        ym = y + r2; // y-middle
	    return {
	        topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
	        topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
	        bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
	        bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
	    };
	}

	function calculateCurvePoints(bounds, borderRadius, borders) {
	    var x = bounds.left,
	        y = bounds.top,
	        width = bounds.width,
	        height = bounds.height,

	        tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
	        tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
	        trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
	        trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
	        brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
	        brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
	        blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
	        blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;

	    var topWidth = width - trh,
	        rightHeight = height - brv,
	        bottomWidth = width - brh,
	        leftHeight = height - blv;

	    return {
	        topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
	        topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
	        topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
	        topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
	        bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
	        bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
	        bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
	        bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
	    };
	}

	function bezierCurve(start, startControl, endControl, end) {
	    var lerp = function (a, b, t) {
	        return {
	            x: a.x + (b.x - a.x) * t,
	            y: a.y + (b.y - a.y) * t
	        };
	    };

	    return {
	        start: start,
	        startControl: startControl,
	        endControl: endControl,
	        end: end,
	        subdivide: function(t) {
	            var ab = lerp(start, startControl, t),
	                bc = lerp(startControl, endControl, t),
	                cd = lerp(endControl, end, t),
	                abbc = lerp(ab, bc, t),
	                bccd = lerp(bc, cd, t),
	                dest = lerp(abbc, bccd, t);
	            return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
	        },
	        curveTo: function(borderArgs) {
	            borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
	        },
	        curveToReversed: function(borderArgs) {
	            borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
	        }
	    };
	}

	function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
	    var borderArgs = [];

	    if (radius1[0] > 0 || radius1[1] > 0) {
	        borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
	        outer1[1].curveTo(borderArgs);
	    } else {
	        borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
	    }

	    if (radius2[0] > 0 || radius2[1] > 0) {
	        borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
	        outer2[0].curveTo(borderArgs);
	        borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
	        inner2[0].curveToReversed(borderArgs);
	    } else {
	        borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
	        borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
	    }

	    if (radius1[0] > 0 || radius1[1] > 0) {
	        borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
	        inner1[1].curveToReversed(borderArgs);
	    } else {
	        borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
	    }

	    return borderArgs;
	}

	function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
	    if (radius1[0] > 0 || radius1[1] > 0) {
	        borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
	        corner1[0].curveTo(borderArgs);
	        corner1[1].curveTo(borderArgs);
	    } else {
	        borderArgs.push(["line", x, y]);
	    }

	    if (radius2[0] > 0 || radius2[1] > 0) {
	        borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
	    }
	}

	function negativeZIndex(container) {
	    return container.cssInt("zIndex") < 0;
	}

	function positiveZIndex(container) {
	    return container.cssInt("zIndex") > 0;
	}

	function zIndex0(container) {
	    return container.cssInt("zIndex") === 0;
	}

	function inlineLevel(container) {
	    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	}

	function isStackingContext(container) {
	    return (container instanceof StackingContext);
	}

	function hasText(container) {
	    return container.node.data.trim().length > 0;
	}

	function noLetterSpacing(container) {
	    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
	}

	function getBorderRadiusData(container) {
	    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
	        var value = container.css('border' + side + 'Radius');
	        var arr = value.split(" ");
	        if (arr.length <= 1) {
	            arr[1] = arr[0];
	        }
	        return arr.map(asInt);
	    });
	}

	function renderableNode(node) {
	    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
	}

	function isPositionedForStacking(container) {
	    var position = container.css("position");
	    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
	    return zIndex !== "auto";
	}

	function isPositioned(container) {
	    return container.css("position") !== "static";
	}

	function isFloating(container) {
	    return container.css("float") !== "none";
	}

	function isInlineBlock(container) {
	    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	}

	function not(callback) {
	    var context = this;
	    return function() {
	        return !callback.apply(context, arguments);
	    };
	}

	function isElement(container) {
	    return container.node.nodeType === Node.ELEMENT_NODE;
	}

	function isPseudoElement(container) {
	    return container.isPseudoElement === true;
	}

	function isTextNode(container) {
	    return container.node.nodeType === Node.TEXT_NODE;
	}

	function zIndexSort(contexts) {
	    return function(a, b) {
	        return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
	    };
	}

	function hasOpacity(container) {
	    return container.getOpacity() < 1;
	}

	function asInt(value) {
	    return parseInt(value, 10);
	}

	function getWidth(border) {
	    return border.width;
	}

	function nonIgnoredElement(nodeContainer) {
	    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
	}

	function flatten(arrays) {
	    return [].concat.apply([], arrays);
	}

	function stripQuotes(content) {
	    var first = content.substr(0, 1);
	    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
	}

	function getWords(characters) {
	    var words = [], i = 0, onWordBoundary = false, word;
	    while(characters.length) {
	        if (isWordBoundary(characters[i]) === onWordBoundary) {
	            word = characters.splice(0, i);
	            if (word.length) {
	                words.push(punycode.ucs2.encode(word));
	            }
	            onWordBoundary =! onWordBoundary;
	            i = 0;
	        } else {
	            i++;
	        }

	        if (i >= characters.length) {
	            word = characters.splice(0, i);
	            if (word.length) {
	                words.push(punycode.ucs2.encode(word));
	            }
	        }
	    }
	    return words;
	}

	function isWordBoundary(characterCode) {
	    return [
	        32, // <space>
	        13, // \r
	        10, // \n
	        9, // \t
	        45 // -
	    ].indexOf(characterCode) !== -1;
	}

	function hasUnicode(string) {
	    return (/[^\u0000-\u00ff]/).test(string);
	}

	module.exports = NodeParser;

	},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,"punycode":1}],16:[function(_dereq_,module,exports){
	var XHR = _dereq_('./xhr');
	var utils = _dereq_('./utils');
	var log = _dereq_('./log');
	var createWindowClone = _dereq_('./clone');
	var decode64 = utils.decode64;

	function Proxy(src, proxyUrl, document) {
	    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
	    if (!proxyUrl) {
	        return Promise.reject("No proxy configured");
	    }
	    var callback = createCallback(supportsCORS);
	    var url = createProxyUrl(proxyUrl, src, callback);

	    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
	        return decode64(response.content);
	    }));
	}
	var proxyCount = 0;

	function ProxyURL(src, proxyUrl, document) {
	    var supportsCORSImage = ('crossOrigin' in new Image());
	    var callback = createCallback(supportsCORSImage);
	    var url = createProxyUrl(proxyUrl, src, callback);
	    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
	        return "data:" + response.type + ";base64," + response.content;
	    }));
	}

	function jsonp(document, url, callback) {
	    return new Promise(function(resolve, reject) {
	        var s = document.createElement("script");
	        var cleanup = function() {
	            delete window.html2canvas.proxy[callback];
	            document.body.removeChild(s);
	        };
	        window.html2canvas.proxy[callback] = function(response) {
	            cleanup();
	            resolve(response);
	        };
	        s.src = url;
	        s.onerror = function(e) {
	            cleanup();
	            reject(e);
	        };
	        document.body.appendChild(s);
	    });
	}

	function createCallback(useCORS) {
	    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
	}

	function createProxyUrl(proxyUrl, src, callback) {
	    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
	}

	function documentFromHTML(src) {
	    return function(html) {
	        var parser = new DOMParser(), doc;
	        try {
	            doc = parser.parseFromString(html, "text/html");
	        } catch(e) {
	            log("DOMParser not supported, falling back to createHTMLDocument");
	            doc = document.implementation.createHTMLDocument("");
	            try {
	                doc.open();
	                doc.write(html);
	                doc.close();
	            } catch(ee) {
	                log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
	                doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
	            }
	        }

	        var b = doc.querySelector("base");
	        if (!b || !b.href.host) {
	            var base = doc.createElement("base");
	            base.href = src;
	            doc.head.insertBefore(base, doc.head.firstChild);
	        }

	        return doc;
	    };
	}

	function loadUrlDocument(src, proxy, document, width, height, options) {
	    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
	        return createWindowClone(doc, document, width, height, options, 0, 0);
	    });
	}

	exports.Proxy = Proxy;
	exports.ProxyURL = ProxyURL;
	exports.loadUrlDocument = loadUrlDocument;

	},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(_dereq_,module,exports){
	var ProxyURL = _dereq_('./proxy').ProxyURL;

	function ProxyImageContainer(src, proxy) {
	    var link = document.createElement("a");
	    link.href = src;
	    src = link.href;
	    this.src = src;
	    this.image = new Image();
	    var self = this;
	    this.promise = new Promise(function(resolve, reject) {
	        self.image.crossOrigin = "Anonymous";
	        self.image.onload = resolve;
	        self.image.onerror = reject;

	        new ProxyURL(src, proxy, document).then(function(url) {
	            self.image.src = url;
	        })['catch'](reject);
	    });
	}

	module.exports = ProxyImageContainer;

	},{"./proxy":16}],18:[function(_dereq_,module,exports){
	var NodeContainer = _dereq_('./nodecontainer');

	function PseudoElementContainer(node, parent, type) {
	    NodeContainer.call(this, node, parent);
	    this.isPseudoElement = true;
	    this.before = type === ":before";
	}

	PseudoElementContainer.prototype.cloneTo = function(stack) {
	    PseudoElementContainer.prototype.cloneTo.call(this, stack);
	    stack.isPseudoElement = true;
	    stack.before = this.before;
	};

	PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

	PseudoElementContainer.prototype.appendToDOM = function() {
	    if (this.before) {
	        this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
	    } else {
	        this.parent.node.appendChild(this.node);
	    }
	    this.parent.node.className += " " + this.getHideClass();
	};

	PseudoElementContainer.prototype.cleanDOM = function() {
	    this.node.parentNode.removeChild(this.node);
	    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
	};

	PseudoElementContainer.prototype.getHideClass = function() {
	    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
	};

	PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
	PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

	module.exports = PseudoElementContainer;

	},{"./nodecontainer":14}],19:[function(_dereq_,module,exports){
	var log = _dereq_('./log');

	function Renderer(width, height, images, options, document) {
	    this.width = width;
	    this.height = height;
	    this.images = images;
	    this.options = options;
	    this.document = document;
	}

	Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
	    var paddingLeft = container.cssInt('paddingLeft'),
	        paddingTop = container.cssInt('paddingTop'),
	        paddingRight = container.cssInt('paddingRight'),
	        paddingBottom = container.cssInt('paddingBottom'),
	        borders = borderData.borders;

	    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
	    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
	    this.drawImage(
	        imageContainer,
	        0,
	        0,
	        imageContainer.image.width || width,
	        imageContainer.image.height || height,
	        bounds.left + paddingLeft + borders[3].width,
	        bounds.top + paddingTop + borders[0].width,
	        width,
	        height
	    );
	};

	Renderer.prototype.renderBackground = function(container, bounds, borderData) {
	    if (bounds.height > 0 && bounds.width > 0) {
	        this.renderBackgroundColor(container, bounds);
	        this.renderBackgroundImage(container, bounds, borderData);
	    }
	};

	Renderer.prototype.renderBackgroundColor = function(container, bounds) {
	    var color = container.color("backgroundColor");
	    if (!color.isTransparent()) {
	        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
	    }
	};

	Renderer.prototype.renderBorders = function(borders) {
	    borders.forEach(this.renderBorder, this);
	};

	Renderer.prototype.renderBorder = function(data) {
	    if (!data.color.isTransparent() && data.args !== null) {
	        this.drawShape(data.args, data.color);
	    }
	};

	Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
	    var backgroundImages = container.parseBackgroundImages();
	    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
	        switch(backgroundImage.method) {
	        case "url":
	            var image = this.images.get(backgroundImage.args[0]);
	            if (image) {
	                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
	            } else {
	                log("Error loading background-image", backgroundImage.args[0]);
	            }
	            break;
	        case "linear-gradient":
	        case "gradient":
	            var gradientImage = this.images.get(backgroundImage.value);
	            if (gradientImage) {
	                this.renderBackgroundGradient(gradientImage, bounds, borderData);
	            } else {
	                log("Error loading background-image", backgroundImage.args[0]);
	            }
	            break;
	        case "none":
	            break;
	        default:
	            log("Unknown background-image type", backgroundImage.args[0]);
	        }
	    }, this);
	};

	Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
	    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
	    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
	    var repeat = container.parseBackgroundRepeat(index);
	    switch (repeat) {
	    case "repeat-x":
	    case "repeat no-repeat":
	        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
	        break;
	    case "repeat-y":
	    case "no-repeat repeat":
	        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
	        break;
	    case "no-repeat":
	        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
	        break;
	    default:
	        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
	        break;
	    }
	};

	module.exports = Renderer;

	},{"./log":13}],20:[function(_dereq_,module,exports){
	var Renderer = _dereq_('../renderer');
	var LinearGradientContainer = _dereq_('../lineargradientcontainer');
	var log = _dereq_('../log');

	function CanvasRenderer(width, height) {
	    Renderer.apply(this, arguments);
	    this.canvas = this.options.canvas || this.document.createElement("canvas");
	    if (!this.options.canvas) {
	        this.canvas.width = width;
	        this.canvas.height = height;
	    }
	    this.ctx = this.canvas.getContext("2d");
	    this.taintCtx = this.document.createElement("canvas").getContext("2d");
	    this.ctx.textBaseline = "bottom";
	    this.variables = {};
	    log("Initialized CanvasRenderer with size", width, "x", height);
	}

	CanvasRenderer.prototype = Object.create(Renderer.prototype);

	CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
	    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
	    return this.ctx;
	};

	CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
	    this.setFillStyle(color).fillRect(left, top, width, height);
	};

	CanvasRenderer.prototype.circle = function(left, top, size, color) {
	    this.setFillStyle(color);
	    this.ctx.beginPath();
	    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
	    this.ctx.closePath();
	    this.ctx.fill();
	};

	CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
	    this.circle(left, top, size, color);
	    this.ctx.strokeStyle = strokeColor.toString();
	    this.ctx.stroke();
	};

	CanvasRenderer.prototype.drawShape = function(shape, color) {
	    this.shape(shape);
	    this.setFillStyle(color).fill();
	};

	CanvasRenderer.prototype.taints = function(imageContainer) {
	    if (imageContainer.tainted === null) {
	        this.taintCtx.drawImage(imageContainer.image, 0, 0);
	        try {
	            this.taintCtx.getImageData(0, 0, 1, 1);
	            imageContainer.tainted = false;
	        } catch(e) {
	            this.taintCtx = document.createElement("canvas").getContext("2d");
	            imageContainer.tainted = true;
	        }
	    }

	    return imageContainer.tainted;
	};

	CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
	    if (!this.taints(imageContainer) || this.options.allowTaint) {
	        this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
	    }
	};

	CanvasRenderer.prototype.clip = function(shapes, callback, context) {
	    this.ctx.save();
	    shapes.filter(hasEntries).forEach(function(shape) {
	        this.shape(shape).clip();
	    }, this);
	    callback.call(context);
	    this.ctx.restore();
	};

	CanvasRenderer.prototype.shape = function(shape) {
	    this.ctx.beginPath();
	    shape.forEach(function(point, index) {
	        if (point[0] === "rect") {
	            this.ctx.rect.apply(this.ctx, point.slice(1));
	        } else {
	            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
	        }
	    }, this);
	    this.ctx.closePath();
	    return this.ctx;
	};

	CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
	    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
	};

	CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
	    this.setVariable("shadowColor", color.toString())
	        .setVariable("shadowOffsetY", offsetX)
	        .setVariable("shadowOffsetX", offsetY)
	        .setVariable("shadowBlur", blur);
	};

	CanvasRenderer.prototype.clearShadow = function() {
	    this.setVariable("shadowColor", "rgba(0,0,0,0)");
	};

	CanvasRenderer.prototype.setOpacity = function(opacity) {
	    this.ctx.globalAlpha = opacity;
	};

	CanvasRenderer.prototype.setTransform = function(transform) {
	    this.ctx.translate(transform.origin[0], transform.origin[1]);
	    this.ctx.transform.apply(this.ctx, transform.matrix);
	    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
	};

	CanvasRenderer.prototype.setVariable = function(property, value) {
	    if (this.variables[property] !== value) {
	        this.variables[property] = this.ctx[property] = value;
	    }

	    return this;
	};

	CanvasRenderer.prototype.text = function(text, left, bottom) {
	    this.ctx.fillText(text, left, bottom);
	};

	CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
	    var shape = [
	        ["line", Math.round(left), Math.round(top)],
	        ["line", Math.round(left + width), Math.round(top)],
	        ["line", Math.round(left + width), Math.round(height + top)],
	        ["line", Math.round(left), Math.round(height + top)]
	    ];
	    this.clip([shape], function() {
	        this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
	    }, this);
	};

	CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
	    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
	    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
	    this.ctx.translate(offsetX, offsetY);
	    this.ctx.fill();
	    this.ctx.translate(-offsetX, -offsetY);
	};

	CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
	    if (gradientImage instanceof LinearGradientContainer) {
	        var gradient = this.ctx.createLinearGradient(
	            bounds.left + bounds.width * gradientImage.x0,
	            bounds.top + bounds.height * gradientImage.y0,
	            bounds.left +  bounds.width * gradientImage.x1,
	            bounds.top +  bounds.height * gradientImage.y1);
	        gradientImage.colorStops.forEach(function(colorStop) {
	            gradient.addColorStop(colorStop.stop, colorStop.color.toString());
	        });
	        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
	    }
	};

	CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
	    var image = imageContainer.image;
	    if(image.width === size.width && image.height === size.height) {
	        return image;
	    }

	    var ctx, canvas = document.createElement('canvas');
	    canvas.width = size.width;
	    canvas.height = size.height;
	    ctx = canvas.getContext("2d");
	    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
	    return canvas;
	};

	function hasEntries(array) {
	    return array.length > 0;
	}

	module.exports = CanvasRenderer;

	},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(_dereq_,module,exports){
	var NodeContainer = _dereq_('./nodecontainer');

	function StackingContext(hasOwnStacking, opacity, element, parent) {
	    NodeContainer.call(this, element, parent);
	    this.ownStacking = hasOwnStacking;
	    this.contexts = [];
	    this.children = [];
	    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
	}

	StackingContext.prototype = Object.create(NodeContainer.prototype);

	StackingContext.prototype.getParentStack = function(context) {
	    var parentStack = (this.parent) ? this.parent.stack : null;
	    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
	};

	module.exports = StackingContext;

	},{"./nodecontainer":14}],22:[function(_dereq_,module,exports){
	function Support(document) {
	    this.rangeBounds = this.testRangeBounds(document);
	    this.cors = this.testCORS();
	    this.svg = this.testSVG();
	}

	Support.prototype.testRangeBounds = function(document) {
	    var range, testElement, rangeBounds, rangeHeight, support = false;

	    if (document.createRange) {
	        range = document.createRange();
	        if (range.getBoundingClientRect) {
	            testElement = document.createElement('boundtest');
	            testElement.style.height = "123px";
	            testElement.style.display = "block";
	            document.body.appendChild(testElement);

	            range.selectNode(testElement);
	            rangeBounds = range.getBoundingClientRect();
	            rangeHeight = rangeBounds.height;

	            if (rangeHeight === 123) {
	                support = true;
	            }
	            document.body.removeChild(testElement);
	        }
	    }

	    return support;
	};

	Support.prototype.testCORS = function() {
	    return typeof((new Image()).crossOrigin) !== "undefined";
	};

	Support.prototype.testSVG = function() {
	    var img = new Image();
	    var canvas = document.createElement("canvas");
	    var ctx =  canvas.getContext("2d");
	    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

	    try {
	        ctx.drawImage(img, 0, 0);
	        canvas.toDataURL();
	    } catch(e) {
	        return false;
	    }
	    return true;
	};

	module.exports = Support;

	},{}],23:[function(_dereq_,module,exports){
	var XHR = _dereq_('./xhr');
	var decode64 = _dereq_('./utils').decode64;

	function SVGContainer(src) {
	    this.src = src;
	    this.image = null;
	    var self = this;

	    this.promise = this.hasFabric().then(function() {
	        return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
	    }).then(function(svg) {
	        return new Promise(function(resolve) {
	            window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
	        });
	    });
	}

	SVGContainer.prototype.hasFabric = function() {
	    return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
	};

	SVGContainer.prototype.inlineFormatting = function(src) {
	    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
	};

	SVGContainer.prototype.removeContentType = function(src) {
	    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
	};

	SVGContainer.prototype.isInline = function(src) {
	    return (/^data:image\/svg\+xml/i.test(src));
	};

	SVGContainer.prototype.createCanvas = function(resolve) {
	    var self = this;
	    return function (objects, options) {
	        var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
	        self.image = canvas.lowerCanvasEl;
	        canvas
	            .setWidth(options.width)
	            .setHeight(options.height)
	            .add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
	            .renderAll();
	        resolve(canvas.lowerCanvasEl);
	    };
	};

	SVGContainer.prototype.decode64 = function(str) {
	    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
	};

	module.exports = SVGContainer;

	},{"./utils":26,"./xhr":28}],24:[function(_dereq_,module,exports){
	var SVGContainer = _dereq_('./svgcontainer');

	function SVGNodeContainer(node, _native) {
	    this.src = node;
	    this.image = null;
	    var self = this;

	    this.promise = _native ? new Promise(function(resolve, reject) {
	        self.image = new Image();
	        self.image.onload = resolve;
	        self.image.onerror = reject;
	        self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
	        if (self.image.complete === true) {
	            resolve(self.image);
	        }
	    }) : this.hasFabric().then(function() {
	        return new Promise(function(resolve) {
	            window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
	        });
	    });
	}

	SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

	module.exports = SVGNodeContainer;

	},{"./svgcontainer":23}],25:[function(_dereq_,module,exports){
	var NodeContainer = _dereq_('./nodecontainer');

	function TextContainer(node, parent) {
	    NodeContainer.call(this, node, parent);
	}

	TextContainer.prototype = Object.create(NodeContainer.prototype);

	TextContainer.prototype.applyTextTransform = function() {
	    this.node.data = this.transform(this.parent.css("textTransform"));
	};

	TextContainer.prototype.transform = function(transform) {
	    var text = this.node.data;
	    switch(transform){
	        case "lowercase":
	            return text.toLowerCase();
	        case "capitalize":
	            return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
	        case "uppercase":
	            return text.toUpperCase();
	        default:
	            return text;
	    }
	};

	function capitalize(m, p1, p2) {
	    if (m.length > 0) {
	        return p1 + p2.toUpperCase();
	    }
	}

	module.exports = TextContainer;

	},{"./nodecontainer":14}],26:[function(_dereq_,module,exports){
	exports.smallImage = function smallImage() {
	    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	};

	exports.bind = function(callback, context) {
	    return function() {
	        return callback.apply(context, arguments);
	    };
	};

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */

	exports.decode64 = function(base64) {
	    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

	    var output = "";

	    for (i = 0; i < len; i+=4) {
	        encoded1 = chars.indexOf(base64[i]);
	        encoded2 = chars.indexOf(base64[i+1]);
	        encoded3 = chars.indexOf(base64[i+2]);
	        encoded4 = chars.indexOf(base64[i+3]);

	        byte1 = (encoded1 << 2) | (encoded2 >> 4);
	        byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	        byte3 = ((encoded3 & 3) << 6) | encoded4;
	        if (encoded3 === 64) {
	            output += String.fromCharCode(byte1);
	        } else if (encoded4 === 64 || encoded4 === -1) {
	            output += String.fromCharCode(byte1, byte2);
	        } else{
	            output += String.fromCharCode(byte1, byte2, byte3);
	        }
	    }

	    return output;
	};

	exports.getBounds = function(node) {
	    if (node.getBoundingClientRect) {
	        var clientRect = node.getBoundingClientRect();
	        var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
	        return {
	            top: clientRect.top,
	            bottom: clientRect.bottom || (clientRect.top + clientRect.height),
	            right: clientRect.left + width,
	            left: clientRect.left,
	            width:  width,
	            height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
	        };
	    }
	    return {};
	};

	exports.offsetBounds = function(node) {
	    var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

	    return {
	        top: node.offsetTop + parent.top,
	        bottom: node.offsetTop + node.offsetHeight + parent.top,
	        right: node.offsetLeft + parent.left + node.offsetWidth,
	        left: node.offsetLeft + parent.left,
	        width: node.offsetWidth,
	        height: node.offsetHeight
	    };
	};

	exports.parseBackgrounds = function(backgroundImage) {
	    var whitespace = ' \r\n\t',
	        method, definition, prefix, prefix_i, block, results = [],
	        mode = 0, numParen = 0, quote, args;
	    var appendResult = function() {
	        if(method) {
	            if (definition.substr(0, 1) === '"') {
	                definition = definition.substr(1, definition.length - 2);
	            }
	            if (definition) {
	                args.push(definition);
	            }
	            if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
	                prefix = method.substr(0, prefix_i);
	                method = method.substr(prefix_i);
	            }
	            results.push({
	                prefix: prefix,
	                method: method.toLowerCase(),
	                value: block,
	                args: args,
	                image: null
	            });
	        }
	        args = [];
	        method = prefix = definition = block = '';
	    };
	    args = [];
	    method = prefix = definition = block = '';
	    backgroundImage.split("").forEach(function(c) {
	        if (mode === 0 && whitespace.indexOf(c) > -1) {
	            return;
	        }
	        switch(c) {
	        case '"':
	            if(!quote) {
	                quote = c;
	            } else if(quote === c) {
	                quote = null;
	            }
	            break;
	        case '(':
	            if(quote) {
	                break;
	            } else if(mode === 0) {
	                mode = 1;
	                block += c;
	                return;
	            } else {
	                numParen++;
	            }
	            break;
	        case ')':
	            if (quote) {
	                break;
	            } else if(mode === 1) {
	                if(numParen === 0) {
	                    mode = 0;
	                    block += c;
	                    appendResult();
	                    return;
	                } else {
	                    numParen--;
	                }
	            }
	            break;

	        case ',':
	            if (quote) {
	                break;
	            } else if(mode === 0) {
	                appendResult();
	                return;
	            } else if (mode === 1) {
	                if (numParen === 0 && !method.match(/^url$/i)) {
	                    args.push(definition);
	                    definition = '';
	                    block += c;
	                    return;
	                }
	            }
	            break;
	        }

	        block += c;
	        if (mode === 0) {
	            method += c;
	        } else {
	            definition += c;
	        }
	    });

	    appendResult();
	    return results;
	};

	},{}],27:[function(_dereq_,module,exports){
	var GradientContainer = _dereq_('./gradientcontainer');

	function WebkitGradientContainer(imageData) {
	    GradientContainer.apply(this, arguments);
	    this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
	}

	WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

	module.exports = WebkitGradientContainer;

	},{"./gradientcontainer":9}],28:[function(_dereq_,module,exports){
	function XHR(url) {
	    return new Promise(function(resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url);

	        xhr.onload = function() {
	            if (xhr.status === 200) {
	                resolve(xhr.responseText);
	            } else {
	                reject(new Error(xhr.statusText));
	            }
	        };

	        xhr.onerror = function() {
	            reject(new Error("Network Error"));
	        };

	        xhr.send();
	    });
	}

	module.exports = XHR;

	},{}]},{},[4])(4)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(15);

	_index.List.init(1);

/***/ }
]);