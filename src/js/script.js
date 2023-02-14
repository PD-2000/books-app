/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
	'use strict';

	const select = {
		booksList: '.books-list',
		bookImage: '.book__image',
		templateBook: '#template-book',
		form: '.filters'
	};

	const classNames = {
		favorite: 'favorite',
		hidden: 'hidden'
	};

	const templates = {
		books: Handlebars.compile(document.querySelector(select.templateBook).innerHTML)
	};

	const filters = [];

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
			const thisBooks = this;

			for(let book of dataSource.books){
				const generatedHTML = templates.books(book);
				const generatedDOM = utils.createDOMFromHTML(generatedHTML);
				const booksContainer = document.querySelector(select.booksList);
				const ratingBgc = thisBooks.determineRatingBgc(book.rating);
				const ratingWidth = 10 * book.rating;
				
				book.ratingBgc = ratingBgc;
				book.ratingWidth = ratingWidth;
				console.log('book.ratingBgc', book.ratingBgc);
				console.log('book.ratingWidth', book.ratingWidth);

				booksContainer.appendChild(generatedDOM);
			}
		}
		initActions(){
			const thisBooks = this;
			const favoriteBooks = [];
			
			thisBooks.booksContainer.addEventListener('dblclick', function(event){
				event.preventDefault();
				const eventTargetOffset = event.target.offsetParent;
				const bookId = eventTargetOffset.getAttribute('data-id');

				if(!favoriteBooks.includes(bookId)){
					eventTargetOffset.classList.add(classNames.favorite);
					favoriteBooks.push(bookId);
				}else{
					eventTargetOffset.classList.remove(classNames.favorite);
					favoriteBooks.pop(bookId);
				}
			});

			thisBooks.booksForm.addEventListener('click', function(event){
				const eventTarget = event.target;
				const checked = eventTarget.checked; 

				if(eventTarget.tagName == 'INPUT' && eventTarget.type == 'checkbox' && eventTarget.name == 'filter'){
					if(checked)
						filters.push(eventTarget.value);
					else
						filters.splice(filters.indexOf(eventTarget.value), 1);
				}

				thisBooks.filterBooks();
			});
		}
		filterBooks(){
			for(let book of dataSource.books){
				let shouldBeHidden = false;
				const selected = document.querySelector('.book__image[data-id="' + book.id + '"]');
		
				for(const filter of filters){
					if(!book.details[filter]){
						shouldBeHidden = true;
						break;
					}
				}

				if(shouldBeHidden == true)
					selected.classList.add(classNames.hidden);
				else
					selected.classList.remove(classNames.hidden);
			}
		}
		determineRatingBgc(rating){
			if(rating < 6)
				return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
			else if(rating > 6 && rating <= 8)
				return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
			else if(rating > 8 && rating <= 9)
				return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
			else
				return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
		}
	}

	const app = new Books();
	console.log(app);
}