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
	threshold: 0.59,
	rootMargin: '0px'
};

const callback = (entries) => {
	entries.forEach((entry) => {
		const eachNavItem = document.querySelector(`[data-link='${entry.target.id}']`);
		if (entry.isIntersecting) {
			eachNavItem.classList.add('navbar__active');
		} else {
			if (eachNavItem.classList.contains('navbar__active')) {
				eachNavItem.classList.remove('navbar__active');
			}
		}
	});
};

const observer = new IntersectionObserver(callback, options);
sections.forEach((section) => {
	observer.observe(document.getElementById(section.id));
});

// Show and Hide the Scroll To Top button
function ifPageIsScrolling() {
	if (window.pageYOffset > 800) {
		scrollToTopButton.style.bottom = '70px';
		if (!scrollToTopButton.classList.contains('btn__enter')) {
			scrollToTopButton.classList.remove('btn__exit');
			scrollToTopButton.classList.add('btn__enter');
		}
	} else {
		if (scrollToTopButton.classList.contains('btn__enter')) {
			scrollToTopButton.classList.remove('btn__enter');
			scrollToTopButton.classList.add('btn__exit');
		}
		setTimeout(function() {
			scrollToTopButton.style.bottom = '-55px';
		}, 400);
	}
}

window.addEventListener('scroll', ifPageIsScrolling);

// scroll to the beginning when Scroll To Top Button is pressed
scrollToTopButton.addEventListener('click', function() {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
});
