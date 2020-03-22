const sectionList = document.querySelectorAll('section');
const scrollToTopButton = document.querySelector('#scroll_to_top_btn');
const navBar = document.querySelector('#navbar');

// Dynamically create navbar
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
		console.log(createLink);
	}
	unorderedList.setAttribute('class', 'nav_link_container');
	navBar.append(unorderedList);
})();

// scroll button
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
});

// show scrollToTopButton -- based on tutorial from https://www.youtube.com/watch?v=gphMli74Chk
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

const innerNavContianer = document.querySelector('.nav_link_container');
// when to show the nav bar
function showNavBar() {
	if (window.innerWidth > 600) {
		innerNavContianer.style.display = 'flex';
		if (window.pageYOffset > 142) {
			navBar.style.top = 0;
		} else {
			navBar.style.top = '-50px';
		}
	}
}

// hide navbar on mobile until clicked
function hideNavBar() {
	if (window.innerWidth <= 600) {
		if (innerNavContianer.style.display === 'none') {
			innerNavContianer.style.display = 'flex';
		} else {
			innerNavContianer.style.display = 'none';
		}
	}
}
