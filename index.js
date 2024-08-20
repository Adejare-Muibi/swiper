const swipeable = document.querySelector('.swipeable');
const dots = document.querySelectorAll('.dot');
let autoScroll;
let currentIndex = 0;

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function scrollToIndex(index) {
    swipeable.style.transform = `translateX(-${index * 300}px)`;
    currentIndex = index;
    updateDots();
}

function startAutoScroll() {
    autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        scrollToIndex(currentIndex);
    }, 3000); // Adjust the interval as needed
}

swipeable.addEventListener('mousedown', () => clearInterval(autoScroll));
swipeable.addEventListener('mouseup', startAutoScroll);
swipeable.addEventListener('touchstart', () => clearInterval(autoScroll));
swipeable.addEventListener('touchend', startAutoScroll);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(autoScroll);
        scrollToIndex(index);
        startAutoScroll();
    });
});

startAutoScroll(); // Start auto scrolling when the page loads
