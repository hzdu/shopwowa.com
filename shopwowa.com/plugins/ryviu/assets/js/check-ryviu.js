/**
 (C) Copryright https://www.ryviu.com
**/

// Ajax to check connect Ryviu
jQuery(document).ready(function ($) {
	if ($('a.ryviu-check-connect').length) {
		$('a.ryviu-check-connect').on('click', function () {
			$.ajax({
				url: ajaxurl,
				method: "POST",
				data: {
					action: 'ryviu_check_connect'
				},
				dataType: "json",

				success: function (res) {
					if (res.status == 'success') {
						$('.r-cl-connect.notice-error').hide();
						$('.r-cl-connect.notice-success').show();
					}
					alert(res.mes);
				}
			});
		});
	}
});