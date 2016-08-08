$('label.btn').click(function () {
	var _this = $(this);

	_this.parent().addClass('active');
	_this.siblings('input').focus();
})