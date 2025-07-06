const imgs = document.querySelectorAll('img')

const videos = document.querySelectorAll('video')

imgs.forEach(el =>
	el.addEventListener('click', () => {
		const closeEvent = (imgWrapper, el) => {
			const grandParent = imgWrapper.parentNode
			grandParent.insertBefore(el, imgWrapper) // вставляем img обратно на место обёртки
			imgWrapper.remove() // удаляем обёртку
			el.classList.remove('active')
		}

		if (!el.classList.contains('active')) {
			const imgWrapper = document.createElement('div')
			imgWrapper.classList.add('imgOrVideo_wrapper')

			el.parentNode.insertBefore(imgWrapper, el)

			imgWrapper.appendChild(el)
			imgWrapper.addEventListener('click', () => closeEvent(imgWrapper, el))

			el.classList.add('active')
		} else {
			const imgWrapper = el.parentNode

			if (imgWrapper.classList.contains('imgOrVideo_wrapper')) {
				imgWrapper.removeEventListener('click', () =>
					closeEvent(imgWrapper, el)
				)

				closeEvent(imgWrapper, el)
			}
		}
	})
)

videos.forEach(el =>
	el.addEventListener('click', () => {
		const closeEvent = (videoWrapper, el) => {
			const grandParent = videoWrapper.parentNode
			grandParent.insertBefore(el, videoWrapper) // вставляем img обратно на место обёртки
			videoWrapper.remove() // удаляем обёртку
			el.classList.remove('active')

			el.muted = true

			// 2. Убеждаемся, что видео снова будет зациклено.
			el.loop = true

			// 3. Вместо .pause(), снова запускаем видео.
			// Так как оно беззвучное, браузер не будет блокировать .play()
			el.play()
		}

		if (!el.classList.contains('active')) {
			el.removeAttribute('muted')
			el.currentTime = 0 
			el.muted = false

			el.play().catch(err => {
				console.warn('Ошибка воспроизведения с включённым звуком:', err)
			})

			const videoWrapper = document.createElement('div')
			videoWrapper.classList.add('imgOrVideo_wrapper')

			el.parentNode.insertBefore(videoWrapper, el)

			videoWrapper.appendChild(el)
			videoWrapper.addEventListener('click', () => closeEvent(videoWrapper, el))

			el.classList.add('active')
		} else {
			const videoWrapper = el.parentNode

			if (videoWrapper.classList.contains('imgOrVideo_wrapper')) {
				videoWrapper.removeEventListener('click', () =>
					closeEvent(videoWrapper, el)
				)

				closeEvent(videoWrapper, el)
			}
		}
	})
)
// //
const logoImgs = document.querySelectorAll('.slider__img')

const setRandomLogo = () => {
	const randomNumber = Math.floor(Math.random() * 3 + 1)
	logoImgs.forEach(logo => {
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
