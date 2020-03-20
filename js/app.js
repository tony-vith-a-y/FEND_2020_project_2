const scrollToTopButton = document.querySelector('#scroll_to_top_btn');

// Below code is based on tutorial from https://www.youtube.com/watch?v=FK5DEa1Hvco
scrollToTopButton.addEventListener('click', function() {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
});

// Below code is based on tutorial from https://www.youtube.com/watch?v=gphMli74Chk
window.addEventListener('scroll', ifPageIsScrolling);

function ifPageIsScrolling() {
	if (window.pageYOffset > 1200) {
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
