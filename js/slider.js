const Slider = {
    current: 0,
    slides: undefined,
    leftArrow: undefined,
    rightArrow: undefined,
    pauseButton: undefined,
    playButton: undefined,
    playing: undefined,
    interval: undefined,

    init() {
        this.slides = Array.from(document.querySelectorAll('.carousel-item'));
        this.leftArrow = document.querySelector('.carousel-control-prev-icon');
        this.rightArrow = document.querySelector('.carousel-control-next-icon');
        this.pauseButton = document.getElementById('pauseButton');
        this.playButton = document.getElementById('playButton');
        this.playing = false;

        this.leftArrow.addEventListener('click', () => {
            this.slideLeft();
        });

        this.rightArrow.addEventListener('click', () => {
            this.slideRight();
        });

        this.pauseButton.addEventListener('click', () => {
                clearInterval(this.interval);
                this.pauseButton.style.display = 'none';
                this.playButton.style.display = 'block';
        });

        this.playButton.addEventListener('click', () => {
            this.interval = setInterval(() => {
                this.slideRight();
            }, 5000);
            this.playButton.style.display = 'none';
            this.pauseButton.style.display = 'block';
        });

        document.addEventListener('keydown', (e) => {
            if (e.which === 37) {
                this.slideLeft();
            }

            if (e.which === 39) {
                this.slideRight();
            }
        });

        this.interval = setInterval(() => {
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
