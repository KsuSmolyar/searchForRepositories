"use strict";

/**
 * Валидация формы
 * @param {String} value значение, введенное в инпут
 * @returns {Srting} текст ошибки
 */

export function validateForm(value) {
	let errorText = "";
	if (value.length <= 3) {
		errorText = "!! Поисковый запрос не может быть короче трех символов";
	}
	return errorText;
}
