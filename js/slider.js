const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},
	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},

	autoplay: {
		delay: 3000,
	},
});