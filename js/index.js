"use strict";
import { getRepositories } from "./api.js";
import { validateForm } from "./utils/validateForm.js";

const form = document.forms.form;
const inputSearch = form.elements.search;
const repositoriesList = document.querySelector(".resultsList");
const preLoader = document.querySelector(".preloader");
const errorContainer = document.querySelector(".errorContainer");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const searchValue = inputSearch.value.trim();
	const error = validateForm(searchValue);
	if (error) {
		errorContainer.classList.add("show");
		errorContainer.textContent = error;
		return;
	}
	preLoader.classList.add("show");
	repositoriesList.innerHTML = "";

	try {
		const repositories = await getRepositories(searchValue);
		const repositoriesElements = repositories.map((repository) =>
			createEl({
				avatar: repository.owner.avatar_url,
				name: repository.name,
				link: repository.html_url,
				ownerLink: repository.owner.html_url,
				owner: repository.owner.login,
				description: repository.description ?? "-",
				language: repository.language ?? "-",
			})
		);
		preLoader.classList.remove("show");
		if (repositoriesElements.length === 0) {
			repositoriesList.innerHTML = `<li class="notFound">Ничего не найдено...</li>`;
		} else {
			repositoriesList.append(...repositoriesElements);
		}
	} catch (err) {
		preLoader.classList.remove("show");
		repositoriesList.innerHTML = `<li class="error">Упс, что-то пошло не так...Попробуйте позже</li>`;
	}
});

/**
 * Создает элемент разметки HTML
 * @param {Repository} объект репозитория
 * @returns {Node} элемент разметки HTML
 */
function createEl({
	avatar,
	name,
	link,
	ownerLink,
	owner,
	description,
	language,
}) {
	const repository = document.createElement("li");
	repository.className = "repositoriesList__item";
	repository.innerHTML = `
	<div class="itemWrap">
  	<div class="ownerAvatar">
      <img class="avatar"src=${avatar}/>
    </div>
    <div class="repositoryCard">
      <a class="linkName" target="_blank" href=${link}>${name}</a>
      <p><b>Владелец репозитория:</b><a href=${ownerLink}> ${owner}</a></p>
      <p><b>Описание:</b> ${description}</p>
      <p><b>Язык программирования:</b> ${language}</p>
    </div>
  </div>`;

	return repository;
}

inputSearch.addEventListener("input", () => {
	if (errorContainer.classList.contains("show")) {
		errorContainer.classList.remove("show");
		errorContainer.textContent = "";
	}
});
