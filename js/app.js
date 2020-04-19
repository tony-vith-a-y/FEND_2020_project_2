const sections = document.querySelectorAll('section');
const navListContainer = document.getElementById('navbar__list__container');

// Dynamically create navbar's links
sections.forEach((section) => {
	const createLI = document.createElement('li');
	createLI.setAttribute('class', 'menu__link');
	createLI.setAttribute('data-link', section.id);
	const createLink = document.createElement('a');
	createLink.setAttribute('href', `#${section.id}`);
	createLink.innerText = section.dataset.nav;
	createLI.appendChild(createLink);
	navListContainer.appendChild(createLI);
});

// Section scrolls into view smoothly
navListContainer.addEventListener('click', (e) => {
	e.preventDefault();
	const clickedLink = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement;
	const scrollToSection = document.getElementById(clickedLink.dataset.link);
	scrollToSection.scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	});
});
