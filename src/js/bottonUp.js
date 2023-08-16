$(document).ready(function(){

	$('.buttonUp').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.buttonUp').slideDown(300);
		} else {
			$('.buttonUp').slideUp(300);
		}
	});
});