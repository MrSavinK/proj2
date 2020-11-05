$(document).ready(function(){

	$('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i){
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_mini').each(function(i){
		$(this).on('click',function(){
			$('#order .modal__descr'). text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});
	
	function valideForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				emaile: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символа")
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свой email",
				  email: "Неправильно введен адрес почты"
				}
			  }
		});
	};
	valideForms('#order form');
	valideForms('#consultation-form');
	valideForms('#consultation form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e){ //обращение ко всем form, когдаони будут submit, e-event
		e.preventDefault();//отмена стандартного поведения браузера(обычно он обновляет страницу , а потом отправляет форму)
		$.ajax({
			type: "POST", // будем отдавать данные
			url: "mailer/smart.php", // куда мы будем отправлять наш запрос
			data: $(this).serialize(), // сейчас работаем с this- имнно этими данными
		}).done(function(){
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	//smooth scroll and pageup

	$(window).scroll(function(){
		if($(this).scrollTop()>1600){
			$('.pageup').fadeIn();
		} else{
			$('.pageup').fadeOut();
		}
	});

    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
	});

	new WOW().init();
});

const slider = tns({
		container: '.carousel__inner',
		items: 1,
		slideBy: 'page',
		autoplay: true,
		controls: false,
		nav: false,
		autoplayButtonOutput: false,
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev') ;
  });

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next') ;
  });
