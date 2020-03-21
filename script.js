//SCROLL ACTIVE MENU

document.addEventListener('scroll', onScroll);

function onScroll(event) {

    const curPos = window.scrollY;
    const links = document.querySelectorAll('#menu a');
    const anchor = document.querySelectorAll('div.anchor');

    anchor.forEach((el) => {
        let offsetTop = el.offsetParent.offsetTop - 100;
        let offsetHeight = el.offsetParent.offsetHeight;
        if (offsetTop < curPos && offsetTop + offsetHeight > curPos) {
            links.forEach((a) => {
                a.classList.remove('navigation__link_active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('navigation__link_active');
                }
            });
        }
    });
}

const MENU = document.getElementById('menu');

const ACTIVE_MENU = document.querySelectorAll('#menu a').forEach(el => {
    el.addEventListener('click', (event) => {
        //MENU.querySelectorAll('a').forEach(elem => elem.classList.remove('navigation__link_active'));
        event.target.classList.add('navigation__link_active');
        //document.removeEventListener('scroll', onScroll);
    })
});

// OFF/ON SCREEN MOBILE
const MOBILEVERTICAL = document.getElementById('mobileOne');
const MOBILEGORIZONTAL = document.getElementById('mobileTwo');

function modifyDisplayOne() {
    let mobileDisplay = document.getElementById('mobile-1');
    if (mobileDisplay.style.display == "") {
        mobileDisplay.style.display = "none";
    } else {
        mobileDisplay.style.display = "";
    }
}

function modifyDisplayTwo() {
    let mobileDisplay = document.getElementById('mobile-2');
    if (mobileDisplay.style.display == "") {
        mobileDisplay.style.display = "none";
    } else {
        mobileDisplay.style.display = "";
    }
}

MOBILEVERTICAL.addEventListener('click', modifyDisplayOne, false);
MOBILEGORIZONTAL.addEventListener('click', modifyDisplayTwo, false);

// SLIDER
const SLIDER = document.getElementById('slider');
const ARROW = document.getElementById('slider-button')
let item = document.querySelectorAll('.slide__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + item.length) % item.length;
}

function hideItem(direction) {
	isEnabled = false;
	item[currentItem].classList.add(direction);
	item[currentItem].addEventListener('animationend', function() {
		this.classList.remove('slide__item_active', direction);
	});
}

function showItem(direction) {
	item[currentItem].classList.add('slide__next', direction);
	item[currentItem].addEventListener('animationend', function() {
		this.classList.remove('slide__next', direction);
		this.classList.add('slide__item_active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('slide__to-left');
	changeCurrentItem(n + 1);
	showItem('slide__from-right');
}

function previousItem(n) {
	hideItem('slide__to-right');
	changeCurrentItem(n - 1);
	showItem('slide__from-left');
}

document.querySelector('.slide__arrow_left').addEventListener('click', function() {
	if (isEnabled) {
        previousItem(currentItem);
	}
});

document.querySelector('.slide__arrow_right').addEventListener('click', function() {
	if (isEnabled) {
        nextItem(currentItem);
	}
});

// Active TEGS AND PORTFOLIO CHANGES AND GALLERY IMG BORDER
const TEG = document.getElementById('portfolio__tags');
const FLEX_ITEM = document.querySelectorAll('.img-item');
const GALLERY = document.getElementById('gallery');

TEG.addEventListener('click', (event) => {
    TEG.querySelectorAll('span').forEach(el => el.classList.remove('tag_selected'));
    event.target.classList.add('tag_selected');
    if (event.target.classList[1] == 'change1') {
        FLEX_ITEM[0].style.display = 'block';
        FLEX_ITEM[1].style.display = 'block';
        FLEX_ITEM[2].style.display = 'block';
        GALLERY.querySelectorAll('img').forEach(el => el.classList.remove('active'));
    };
    if (event.target.classList[2] == 'change2') {
        FLEX_ITEM[1].style.display = 'block';
        FLEX_ITEM[2].style.display = 'block';
        FLEX_ITEM[0].style.display = 'none';
        GALLERY.querySelectorAll('img').forEach(el => el.classList.remove('active'));
    };
    if (event.target.classList[2] == 'change3') {
        FLEX_ITEM[2].style.display = 'block';
        FLEX_ITEM[0].style.display = 'none';
        FLEX_ITEM[1].style.display = 'none';
        GALLERY.querySelectorAll('img').forEach(el => el.classList.remove('active'));
    };
    if (event.target.classList[2] == 'change4') {
        FLEX_ITEM[0].style.display = 'none';
        FLEX_ITEM[1].style.display = 'none';
        FLEX_ITEM[2].style.display = 'none';
        GALLERY.querySelectorAll('img').forEach(el => el.classList.remove('active'));
    };
});

GALLERY.addEventListener('click', (event) => {
    GALLERY.querySelectorAll('img').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

// MODAL WINDOW
const BUTTON = document.getElementById('submit');
const CLOSE_BUTTON = document.getElementById('close-button');
const FORM = document.getElementById('form');

FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('subject').value.toString();
    const message = document.getElementById('message').value.toString();

    if (subject != '' && message != '') {
        document.getElementById('subject-modal').innerText = 'Тема:' + subject;
        document.getElementById('message-modal').innerText = 'Описание:' + message;
        document.getElementById('notheme').classList.add('hidden');
        document.getElementById('notheme-1').classList.add('hidden');
    } else if (subject != '' && message == '') {
        document.getElementById('subject-modal').innerText = 'Тема:' + subject;
        document.getElementById('notheme').classList.add('hidden');
        document.getElementById('notheme-1').classList.remove('hidden');
    } else if (message != '' && subject == '') {
        document.getElementById('message-modal').innerText = 'Описание:' + message;
        document.getElementById('notheme-1').classList.add('hidden');
        document.getElementById('notheme').classList.remove('hidden');
    } else if (message === '' && subject === '') {
        document.getElementById('notheme').classList.remove('hidden');
        document.getElementById('notheme-1').classList.remove('hidden');
    }

    document.getElementById('modal').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('subject-modal').innerText = '';
    document.getElementById('message-modal').innerText = '';

    document.getElementById('modal').classList.add('hidden');
    FORM.reset();
});