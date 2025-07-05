// const logoImg = document.querySelector('.slider__img')

// const setRandomLogo = () => {
// 	const randomNumber = Math.floor(Math.random() * 3 + 1)
// 	logoImg.style.backgroundImage = `url('./images/logo${randomNumber}.png')`
// }
// setRandomLogo()

// const mainSlider = new Swiper('.slider-main', {
// 	direction: 'vertical',
// 	speed: 800,
// 	// Включаем управление колесом, мы будем им управлять вручную
// 	mousewheel: true,
// 	// Отключаем на время инициализации, чтобы избежать багов
// 	allowTouchMove: false,
// })

// // Находим наш контейнер с прокруткой
// const scrollContainer = document.querySelector('.scrolling-container')

// // Сразу после инициализации разрешаем свайпы
// mainSlider.allowTouchMove = true

// // Главная логика при смене слайдов
// mainSlider.on('slideChange', function () {
// 	if (this.activeIndex === 1) {
// 		// Мы перешли на второй слайд.
// 		// Сразу блокируем возможность вернуться назад.
// 		setTimeout(setRandomLogo, 1000)

// 		this.allowTouchMove = false
// 		this.mousewheel.disable()
// 	} else {
// 		// Мы вернулись на первый слайд.
// 		// Убедимся, что все разблокировано.
// 		this.allowTouchMove = true
// 		this.mousewheel.enable()
// 	}
// })

// // Ключевая часть: слушаем прокрутку ВНУТРИ второго слайда
// scrollContainer.addEventListener('scroll', () => {
// 	// Проверяем, находимся ли мы на втором слайде
// 	if (mainSlider.activeIndex === 1) {
// 		if (scrollContainer.scrollTop === 0) {
// 			// Если мы докрутили до самого верха...
// 			// ...РАЗРЕШАЕМ вернуться на первый слайд.
// 			mainSlider.allowTouchMove = true
// 			mainSlider.mousewheel.enable()
// 		} else {
// 			// Если мы начали скроллить вниз...
// 			// ...ЗАПРЕЩАЕМ возврат на первый слайд, чтобы не было ложных срабатываний.
// 			mainSlider.allowTouchMove = false
// 			mainSlider.mousewheel.disable()
// 		}
// 	}
// })

const logoImgs = document.querySelectorAll('.slider__img')

const setRandomLogo = () => {
	const randomNumber = Math.floor(Math.random() * 3 + 1)
	logoImgs.forEach( logo => {
		logo.style.backgroundImage = `url('./images/logo${randomNumber}.png')`

	})
}

// const logoImg = document.querySelector('.slider__img')

// const setRandomLogo = () => {
// 	const randomNumber = Math.floor(Math.random() * 3 + 1)
// 	logoImg.style.backgroundImage = `url('./images/logo${randomNumber}.png')`
// }
setRandomLogo()

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
		// Мы перешли на второй (центральный) слайд с контентом.
		// Сразу блокируем возможность свайпа, чтобы управлять ею вручную.
		this.allowTouchMove = false
		this.mousewheel.disable()

		// Эта часть осталась от вашего кода, она меняет логотип на первом слайде
		// после перехода на второй.
		setTimeout(setRandomLogo, 1000)
	} else {
		// Мы находимся на первом или третьем слайде.
		// Убедимся, что все разблокировано для возврата на центральный слайд.
		this.allowTouchMove = true
		this.mousewheel.enable()
	}
})

// Ключевая часть: слушаем прокрутку ВНУТРИ второго слайда
scrollContainer.addEventListener('scroll', () => {
	// Проверяем, находимся ли мы на втором (центральном) слайде
	if (mainSlider.activeIndex === 1) {
		// Проверяем, находимся ли мы в самом верху контейнера
		const atTop = scrollContainer.scrollTop === 0

		// НОВОЕ: Проверяем, находимся ли мы в самом низу контейнера.
		// Используем небольшую погрешность (1-2px) на случай дробных значений высоты.
		const atBottom =
			scrollContainer.scrollTop + scrollContainer.clientHeight >=
			scrollContainer.scrollHeight - 2

		if (atTop || atBottom) {
			// Если мы докрутили до самого верха ИЛИ до самого низа...
			// ...РАЗРЕШАЕМ свайп на соседние слайды.
			mainSlider.allowTouchMove = true
			mainSlider.mousewheel.enable()
		} else {
			// Если мы скроллим где-то в середине контента...
			// ...ЗАПРЕЩАЕМ свайп, чтобы слайдер не переключался случайно.
			mainSlider.allowTouchMove = false
			mainSlider.mousewheel.disable()
		}
	}
})
