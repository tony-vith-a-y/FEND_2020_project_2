const sectionList = document.querySelectorAll('section');
const scrollToTopButton = document.querySelector('#scroll_to_top_btn');
const navBar = document.querySelector('#navbar');

// Dynamically create a navbar
(function makeNavBar() {
	const unorderedList = document.createElement('ul');

	for (i = 0; i < sectionList.length; i++) {
		const listItems = document.createElement('li');
		const createLink = document.createElement('a');
		createLink.setAttribute('href', `#${sectionList[i].id}`);
		let linkName = sectionList[i].id;
		let removeUnderscore = linkName.toUpperCase().replace(/_/g, ' ');

		createLink.innerText = removeUnderscore;
		listItems.append(createLink);
		unorderedList.append(listItems);
	}
	unorderedList.setAttribute('class', 'nav_link_container');
	navBar.append(unorderedList);
})();

// what the Scroll To Top button does
scrollToTopButton.addEventListener('click', function() {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
});

window.addEventListener('scroll', function() {
	ifPageIsScrolling();
	showNavBar();
	showActive();
});

// when to show the Scroll To Top button
// based on the tutorial from https://www.youtube.com/watch?v=gphMli74Chk
function ifPageIsScrolling() {
	if (window.pageYOffset > 1100) {
		if (!scrollToTopButton.classList.contains('btn_enter')) {
			scrollToTopButton.classList.remove('btn_exit');
			scrollToTopButton.classList.add('btn_enter');
		}
		scrollToTopButton.style.display = 'block';
	} else {
		if (scrollToTopButton.classList.contains('btn_enter')) {
			scrollToTopButton.classList.remove('btn_enter');
			scrollToTopButton.classList.add('btn_exit');
		}
		setTimeout(function() {
			scrollToTopButton.style.display = 'none';
		}, 400);
	}
}

// on screens over 600px navbar hidden if scrollbar is at the top
const innerNavContianer = document.querySelector('.nav_link_container');
function showNavBar() {
	if (window.innerWidth > 600) {
		innerNavContianer.style.display = 'flex';
		if (window.pageYOffset > 130) {
			navBar.style.top = 0;
		} else {
			navBar.style.top = '-60px';
		}
	}
}

// hide navbar on mobile until clicked
navBar.addEventListener('click', hideNavBar);
function hideNavBar() {
	if (window.innerWidth <= 600) {
		if (innerNavContianer.style.display === 'flex') {
			innerNavContianer.style.display = 'none';
		} else {
			innerNavContianer.style.display = 'flex';
		}
	}
}

// set active state in navbar
// based on the tutorial by Ivan Mendieta (https://codepen.io/ivanmt07/pen/pxONrw?editors=0010)
function showActive() {
	let navLinks = innerNavContianer.querySelectorAll('a');
	let scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	for (let i = 0; i < navLinks.length; i++) {
		let currLink = navLinks[i];
		let hrefValue = currLink.getAttribute('href');
		let thatSection = document.querySelector(hrefValue);
		if (
			thatSection.offsetTop <= scrollPosition &&
			thatSection.offsetTop + thatSection.offsetHeight > scrollPosition
		) {
			document.querySelector('.nav_link_container li a').parentElement.classList.remove('active_section');
			currLink.parentElement.classList.add('active_section');
		} else {
			currLink.parentElement.classList.remove('active_section');
		}
	}
}
