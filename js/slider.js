const Slider = {
    current: 0,
    slides: undefined,
    leftArrow: undefined,
    rightArrow: undefined,

    init() {
        this.slides = Array.from(document.querySelectorAll('.carousel-item'));
        this.leftArrow = document.querySelector('.carousel-control-prev-icon');
        this.rightArrow = document.querySelector('.carousel-control-next-icon');

        this.leftArrow.addEventListener('click', () => {
            this.slideLeft();
        });
        this.rightArrow.addEventListener('click', () => {
            this.slideRight();
        });

        document.addEventListener('keydown', (e) => {
            if (e.which === 37) {
                this.slideLeft();
            }

            if (e.which === 39) {
                this.slideRight();
            }
        });

        setInterval(() => {
            this.slideRight();
        }, 5000);
    },

    hideActiveSlide() {
        const activeSlide = this.slides.find((slide) => slide.classList.contains('active'));

        activeSlide.classList.remove('active');
    },

    slideRight() {
        this.hideActiveSlide();

        this.current++;
        if (this.current >= this.slides.length) {
            this.current = 0;
        }
        this.slides[this.current].classList.add('active');
    },

    slideLeft() {
        this.hideActiveSlide();

        this.current--;
        if (this.current < 0) {
            this.current = this.slides.length -1;
        }
        this.slides[this.current].classList.add('active');
    },
};

export default Slider;
