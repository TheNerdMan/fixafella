var canScroll = true,
	scrollTimeout = null,
	pageNavChildren = null,
	contentChildren = null;

document.addEventListener('DOMContentLoaded', function () {
	pageNavChildren = [...document.getElementsByClassName('page-nav')[0].children];
	contentChildren = [...document.getElementsByClassName('page-content')[0].children];

	// scroll Events DOMMouseScroll included for firefox support
	document.addEventListener('mousewheel', handleScroll, { passive: false });
	document.addEventListener('DOMMouseScroll', handleScroll, { passive: false });

	// nav click events
	[...document.getElementsByClassName('nav-item')].forEach(el => {
		el.addEventListener('click', handleNavClick);
	})
});

function handleNavClick(e) {
	e.preventDefault();
	if (!(this.classList.contains('nav-active'))) {

		var curPos = pageNavChildren.findIndex(c => c.classList.contains('nav-active')),
			nextPos = pageNavChildren.findIndex(c => c == this),
			lastItem = pageNavChildren.length - 1;

		updateNav(nextPos);
		updateContent(curPos, nextPos, lastItem);

	}
}

function handleScroll(e) {
	var pageNav = document.getElementsByClassName('page-nav')[0];
	if (!(pageNav.classList.contains('is-vis'))) {
		e.preventDefault();

		var delta = (e.wheelDelta) ? -e.wheelDelta : e.detail * 20;

		if (delta > 50 && canScroll) {
			canScroll = false;
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function () {
				canScroll = true;
			}, 800);
			updateHelper(1);
		}
		else if (delta < -50 && canScroll) {
			canScroll = false;
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function () {
				canScroll = true;
			}, 800);
			updateHelper(-1);
		}

	}
}

// determine scroll, swipe, and arrow key direction
function updateHelper(param) {

	var curPos = pageNavChildren.findIndex(c => c.classList.contains('nav-active')),
		lastItem = pageNavChildren.length - 1,
		nextPos = 0;

	if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
		if (curPos !== lastItem) {
			nextPos = curPos + 1;
			updateNav(nextPos);
			updateContent(nextPos);
		}
		else {
			updateNav(nextPos);
			updateContent(nextPos);
		}
	}
	else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
		if (curPos !== 0) {
			nextPos = curPos - 1;
			updateNav(nextPos);
			updateContent(nextPos);
		}
		else {
			nextPos = lastItem;
			updateNav(nextPos);
			updateContent(nextPos);
		}
	}
}

function updateNav(nextPos) {
	pageNavChildren.forEach(child => {
		child.classList.remove('nav-active')
	});
	pageNavChildren[nextPos].classList.add('nav-active');
}

function updateContent(nextPos) {
	contentChildren.forEach(child => {
		child.classList.remove('content-active')
	});
	contentChildren[nextPos].classList.add('content-active');
}
