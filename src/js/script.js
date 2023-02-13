/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
	'use strict';

	const select = {
		booksList: '.books-list',
		bookImage: '.book__image',
		templateBook: '#template-book'
	};

	const classNames = {
		favorite: 'favorite'
	};

	const templates = {
		books: Handlebars.compile(document.querySelector(select.templateBook).innerHTML)
	};

	const favoriteBooks = [];

	class Books{
		constructor(){
			const thisBooks = this;

			thisBooks.render();
			thisBooks.getElements();
			thisBooks.initActions();
		}
		getElements(){
			const thisBooks = this;

			thisBooks.booksContainer = document.querySelector(select.booksList);
			thisBooks.booksForm = document.querySelector(select.form);
		}
		render(){
			// const thisBooks = this;

			for(let book of dataSource.books){
				const generatedHTML = templates.books(book);
				const generatedDOM = utils.createDOMFromHTML(generatedHTML);
				const booksContainer = document.querySelector(select.booksList);

				booksContainer.appendChild(generatedDOM);
			}
		}
		initActions(){
			const thisBooks = this;
			const images = document.querySelectorAll(select.bookImage);

			for(let image of images){
				thisBooks.booksContainer.addEventListener('dblclick', function(event){
					event.preventDefault();
					const bookId = image.getAttribute('data-id');

					if(!favoriteBooks.includes(bookId)){
						image.classList.add(classNames.favorite);
						favoriteBooks.push(bookId);
					}else{
						image.classList.remove(classNames.favorite);
						favoriteBooks.pop(bookId);
					}
				});
			}
		}
	}

	const app = new Books();
	console.log(app);
}