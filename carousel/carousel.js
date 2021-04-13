class Slider {
    constructor(config){
        this.setConfig(config);
        this.initialize();
        console.log(this.slider.clientWidth);
    }

    setConfig(config){
        const {
            ClasSelector,
            animationSpeed = 500,
            autoplay = false,
            responsive = {
                0: {
                    items: 1
                }
            }
                
        } = config;

        this.config = {
            ClasSelector,
            animationSpeed,
            autoplay,
            responsive
        };
    }

    initialize(){
        this.sliderXPosition = 0;
        this.slideIndex = 0;
        this.slider = document.querySelector(this.config.ClasSelector);
        this.sliderContainer = this.slider.querySelector(".slider__slides");
        this.sliderItems = this.sliderContainer.querySelectorAll(".slide-item");
        this.nextButton = this.slider.querySelector("#next");
        this.prevButton = this.slider.querySelector("#prev");
        this.sliding = false;
        // console.log(this.slider.clientWidth);
        // Set Slider item width.
        this.setSliderItemWidth();

        // Clone Item for inifinite loop.
        this.cloneSliderItem();

        // Event bindings.
        this.eventBindings();
    }

    eventBindings(){

        this.nextButton.addEventListener("click", () => {
            const position = this.sliderXPosition - (this.slider.clientWidth / this.responsiveItemCount());
            this.slide(position, this.slideIndex + 1);
        });

        this.prevButton.addEventListener("click", () => {
            const position = this.sliderXPosition + (this.slider.clientWidth / this.responsiveItemCount());
            this.slide(position, this.slideIndex-1);
        });

        this.sliderContainer.addEventListener("transitionend", () => {
            if(this.slideIndex >= this.sliderItems.length){
                this.resetSlide(-this.slider.clientWidth, 0);
                console.log(this.slideIndex, this.sliderXPosition);
            }

            if(this.slideIndex < 0){
                
                const position = this.sliderXPosition * (this.sliderItems.length + 1);
                this.resetSlide(position, this.sliderItems.length-1);
                console.log(this.slideIndex, this.sliderXPosition);
            }
           
        });
    }

    slide(position, index){
       
        if(this.sliding) return;

        this.sliding = true;
        let sliding = setTimeout(()=>{
            this.sliding = false;
            clearTimeout(sliding);
        }, this.config.animationSpeed );
        
        this.slideIndex = index;
        this.sliderXPosition = position;
        this.sliderContainer.style.transition = `transform ease-in-out ${this.config.animationSpeed/1000}s`;
        this.sliderContainer.style.transform = `translateX(${position}px)`;
        console.log(this.slideIndex, this.sliderXPosition);
    }

    resetSlide(position, index){
        this.slideIndex = index;
        this.sliderXPosition = position;
        this.sliderContainer.style.transition = `none`;
        this.sliderContainer.style.transform = `translateX(${position}px)`;
    }

    setSliderItemWidth(){
        this.sliderItems.forEach(slide => {
            slide.style.width = `${this.slider.clientWidth / this.responsiveItemCount()}px`;
        });
    }

    cloneSliderItem(){
        if(this.responsiveItemCount() <= this.sliderItems.length) {
            // Clone first of slides.
            this.sliderItems.forEach((item, index) => {
                if(index < this.responsiveItemCount()){
                    const firstCloned = item.cloneNode(true);
                    firstCloned.classList.add("cloned")
                    this.sliderContainer.append(firstCloned);
                }
            });

            // Clone End of slides.
            const revSliderItems = [].slice.call(this.sliderItems, 0).reverse();
            revSliderItems.forEach((item, index) => {
                if(index < this.responsiveItemCount()){
                    const lastCloned = item.cloneNode(true);
                    lastCloned.classList.add("cloned")
                    this.sliderContainer.prepend(lastCloned);
                }
            })

            // Reset Slider position.
            this.resetSlide(-this.slider.clientWidth, 0);
        }
    }

    responsiveItemCount(){
        const resp = Object.keys(this.config.responsive);
        const items = resp.filter(item => {
            if(item <= document.body.clientWidth){
                return item;
            }
        });

        return this.config.responsive[items.pop()].items;
    }
}

new Slider({
    ClasSelector: ".slider",
    animationSpeed: 300,
    autoplay: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1100: {
            items: 5
        }
    }
});