const swipeable = document.querySelector('.swipeable');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoScroll;
let isDragging = false;
let startX;
let scrollLeft;

// Function to update active dots
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Function to scroll to a specific index
function scrollToIndex(index) {
    currentIndex = index;
    swipeable.style.transform = `translateX(-${index * 300}px)`;
    updateDots();
}

// Function to start auto-scroll
function startAutoScroll() {
    autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        scrollToIndex(currentIndex);
    }, 3000); // Adjust the interval as needed
}

// Start auto scrolling when the page loads
startAutoScroll();

// Handle manual swiping (mouse and touch)
swipeable.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - swipeable.offsetLeft;
    scrollLeft = swipeable.scrollLeft;
    clearInterval(autoScroll);
});

swipeable.addEventListener('mouseleave', () => {
    isDragging = false;
    startAutoScroll();
});

swipeable.addEventListener('mouseup', () => {
    isDragging = false;
    startAutoScroll();
});

swipeable.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - swipeable.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the scroll sensitivity
    swipeable.scrollLeft = scrollLeft - walk;
});

swipeable.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - swipeable.offsetLeft;
    scrollLeft = swipeable.scrollLeft;
    clearInterval(autoScroll);
});

swipeable.addEventListener('touchend', () => {
    isDragging = false;
    startAutoScroll();
});

swipeable.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - swipeable.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the scroll sensitivity
    swipeable.scrollLeft = scrollLeft - walk;
});

// Allow manual dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(autoScroll);
        scrollToIndex(index);
        startAutoScroll();
    });
});

