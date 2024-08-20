const swipeable = document.querySelector('.swipeable');
let isDown = false;
let startX;
let scrollLeft;

// Handle mouse dragging
swipeable.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - swipeable.offsetLeft;
    scrollLeft = swipeable.scrollLeft;
});

swipeable.addEventListener('mouseleave', () => {
    isDown = false;
});

swipeable.addEventListener('mouseup', () => {
    isDown = false;
});

swipeable.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - swipeable.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    swipeable.scrollLeft = scrollLeft - walk;
});

// Handle touch events
swipeable.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - swipeable.offsetLeft;
    scrollLeft = swipeable.scrollLeft;
});

swipeable.addEventListener('touchend', () => {
    isDown = false;
});

swipeable.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - swipeable.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    swipeable.scrollLeft = scrollLeft - walk;
});

// Handle touchpad scrolling
swipeable.addEventListener('wheel', (e) => {
    e.preventDefault();
    swipeable.scrollLeft += e.deltaY > 0 ? 100 : -100;
});

