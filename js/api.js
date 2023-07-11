"use strict";

/**
 * Получает массив с объектами репозиториев
 * @param {String} request
 * @returns {Array} массив с объектами репозиториев
 */
export async function getRepositories(request) {
	const query = encodeURIComponent(`${request} in:name`);
	const responseRepositories = await fetch(
		`https://api.github.com/search/repositories?q=${query}&per_page=10`
	);
	const repositories = await responseRepositories.json();
	return repositories.items;
}
