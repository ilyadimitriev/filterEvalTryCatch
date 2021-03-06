
// Сама функция фильтрации данных, сверяем тип данных, переданных input'ом, с выбранным в селекторе
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// Скрываем предыдущий блок оповещения
	hideAllResponseBlocks = () => {
		// Находим все блоки с оповещением
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// Скрываем их
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// Скрываем предыдущий блок оповещения
		hideAllResponseBlocks();
		// Включаем отображение блока оповещения нужного типа
		document.querySelector(blockSelector).style.display = 'block';
		// Если есть текст для помещения в оповещение, то 
		if (spanSelector) {
			// Добавляем этот текст в блок
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// Создаем блок для оповещения об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// Создаем блок для оповещения о результате (если было что фильтровать)
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// Создаем блок для оповещения о результате (если input был пустой)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// Делаем попытку отфильтровать полученные данные
	tryFilterByType = (type, values) => {
		try {
			// Запускаем фильтрацию, объединяем возвращенные функцией значения в одну строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// Проверяем результат фильстрации, если есть данные указанного типа,
			const alertMsg = (valuesArray.length) ?
			// то выводим, какие данные есть
				`Данные с типом ${type}: ${valuesArray}` :
				// Если такого типа нет, то выводим:
				`Отсутствуют данные типа ${type}`;
			// Запускаем функцию для демонстрации результата, передаем ей наш вывод
			showResults(alertMsg);
		// Если возникла ошибка, то
		} catch (e) {
			// Выводим сообщение с типом ошибки
			showError(`Ошибка: ${e}`);
		}
	};

	// Находим на странице кнопку для запуска фильтрации
const filterButton = document.querySelector('#filter-btn');

	// Вешаем на кнопку событие "click", при клике запускается функция, которой передаем event
filterButton.addEventListener('click', e => {
	// находим селектор, в котором выбераем, какой тип данных будем искать
	const typeInput = document.querySelector('#type');
	// находим input, в который вводится текст для фильтрации
	const dataInput = document.querySelector('#data');

	// Если input не содержит текста, то
	if (dataInput.value === '') {
		// Передаем предупреждение с текстом 'Поле не должно быть пустым!'
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// Вызов функции showNoResults()
		showNoResults();
	// Если input не пуст, то
	} else {
		// чищаем кастомное предупреждение
		dataInput.setCustomValidity('');
		// Предотвращаем стандартное поведение формы
		e.preventDefault();
		// Запускаем tryFilterByType(), передаем тип данных, который будем искать и строку, в которой будем искать
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

