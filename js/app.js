const sections = document.querySelectorAll('section');
const navListContainer = document.getElementById('navbar__list__container');
const scrollToTopButton = document.querySelector('.scroll__to__top__btn');

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

// Sets the active nav link using the IntersectionObserver
const options = {
	root: null, // it's the viewport
	threshold: 0.58,
	rootMargin: '0px'
};

const callback = (entries) => {
	entries.forEach((entry) => {
		const eachNavItem = document.querySelector(`[data-link='${entry.target.id}']`);
		if (entry && entry.isIntersecting) {
			eachNavItem.classList.add('active');
		} else {
			if (eachNavItem.classList.contains('active')) {
				eachNavItem.classList.remove('active');
			}
		}
	});
};

const observer = new IntersectionObserver(callback, options);
sections.forEach((section) => {
	observer.observe(document.getElementById(section.id));
});
