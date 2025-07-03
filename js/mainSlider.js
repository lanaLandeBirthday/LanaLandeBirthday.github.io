// const mainSlider = new Swiper('.slider-main', {
// 	direction: 'vertical',

// 	speed: 800,

// 	mousewheel: {
// 		releaseOnEdges: true,
// 	},

// 	touchReleaseOnEdges: true,
// })

const mainSlider = new Swiper('.slider-main', {
	direction: 'vertical',
	speed: 800,
	// Включаем управление колесом, мы будем им управлять вручную
	mousewheel: true,
	// Отключаем на время инициализации, чтобы избежать багов
	allowTouchMove: false,
})

// Находим наш контейнер с прокруткой
const scrollContainer = document.querySelector('.scrolling-container')

// Сразу после инициализации разрешаем свайпы
mainSlider.allowTouchMove = true

// Главная логика при смене слайдов
mainSlider.on('slideChange', function () {
	if (this.activeIndex === 1) {
		// Мы перешли на второй слайд.
		// Сразу блокируем возможность вернуться назад.
		this.allowTouchMove = false
		this.mousewheel.disable()
	} else {
		// Мы вернулись на первый слайд.
		// Убедимся, что все разблокировано.
		this.allowTouchMove = true
		this.mousewheel.enable()
	}
})

// Ключевая часть: слушаем прокрутку ВНУТРИ второго слайда
scrollContainer.addEventListener('scroll', () => {
	// Проверяем, находимся ли мы на втором слайде
	if (mainSlider.activeIndex === 1) {
		if (scrollContainer.scrollTop === 0) {
			// Если мы докрутили до самого верха...
			// ...РАЗРЕШАЕМ вернуться на первый слайд.
			mainSlider.allowTouchMove = true
			mainSlider.mousewheel.enable()
		} else {
			// Если мы начали скроллить вниз...
			// ...ЗАПРЕЩАЕМ возврат на первый слайд, чтобы не было ложных срабатываний.
			mainSlider.allowTouchMove = false
			mainSlider.mousewheel.disable()
		}
	}
})
