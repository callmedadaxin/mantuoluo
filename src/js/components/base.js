/**
 * @param {
 *  url: '表单提交地址'
 *  form: '表单选择器',
 * 	subBtn: '提交按钮选择器',
 * 	onSuccess: '发布成功回调',
 * 	onError: '发布失败回调'
 * 	infoFn: '消息提示方法  || 默认alert'
 * }
 */
export const FormPost = function (cfg) {
	this.cfg = $.extend({}, cfg);
}

FormPost.prototype = {

	validate: function () {
		var result = this.validateNotEmpty();

		if(!result.isOK){
			this.infoFn ? this.infoFn(result.info) : alert(result.info)
		}else{
			this.startSubmit(result.data);
		}
	},

	//简单非空验证
	validateNotEmpty: function () {
		var cfg = this.cfg,
				aInput = $(cfg.form).find('input[type!=button]'),
				aResult = {},
				msg = {
					isOK: true,
				};

		$.each(aInput, function(index, input) {
			var target = $(input),
					tipName = target.data('name'),
					name = target.attr('name'),
					val = target.val();

			if( !name ){
				return true;
			}

			if(input.hasAttribute('required')){

				if(!val){
					msg = {
 					isOK: false,
 					info: tipName + '不能为空！'
 				}

 				return false;
				}
			}

			aResult[name] = val;
		});

		msg.data = aResult;
		
		return msg;
	},

	startSubmit: function (data) {
		var cfg = this.cfg;

		console.log(cfg);

		$.post( ENV_OPT.baseApi + cfg.url, data, function(r) {
			cfg.onSuccess && cfg.onSuccess(r);
		});
	},

	bindUI: function () {
		var cfg = this.cfg,
				that = this;

		//点击提交按钮
		$(cfg.subBtn).click(function() {
			that.validate();

			return false;
		});
	},

	init: function () {
		this.bindUI();
	}
}

export const getUserInfo = function (callback) {
	$.get( ENV_OPT.baseApi + 'mantuoluo/isLogin', function(r) {
		var data = r.data;

		if(!data.result){
			//用户未登陆
			window.location.href = 'index.html';
		}else{
			callback(data.userId);
		}
	});
}