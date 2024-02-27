const slider = document.querySelector('div.slider');
const slidesColection = document.querySelector('div.slides-wrapper')
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')
let currentSlide = 0;

// ==============================================

const selectElement = document.getElementById("kat-prod");
const allItems = document.querySelectorAll("div.prod");
const allCategorys =  document.querySelectorAll("div.category-item");
const boxOfCategorys =  document.querySelector("div.cat-filteredCat");
const catArr = ['swetry', 'skarpety', 'kocyki', 'zima-on', 'zima-ona', 'zima-kids']
let activeSlides = [...allItems];
let testActiveSlides = [];
let ostatniPoziomFiltracjiFoto = [];
let SETostatniPoziomFiltracjiFoto = [];
let odfiltrowaneKlucze = [];
let aktywneKlucze = [];
let SETwidoczneKategorie = [];
let widoczneKategorie = [...allCategorys];

// Dodanie-kasowanie klasy 'display-none' ze wszystkich slidów

const hideAllSlides = function(){
    allItems.forEach(i=>{
        i.classList.add('display-none')
    })
}

const showAllSlides = function(){
    allItems.forEach(i=>{
        i.classList.remove('display-none')
    })
}

//  kasowanie klasy 'display-none' ze wszystkich aktywnych slidów
const showActiveSlides = function(){
    activeSlides.forEach(s=>{
        s.classList.remove('display-none')
    })
}

// Dodanie-kasowanie klasy 'display-none' ze wszystkich kategorii

const hideAllCategories = function(){
    allCategorys.forEach(c=>{
        c.classList.add('display-none')
    })
}
const showAllCategories = function(){
    allCategorys.forEach(c=>{
        c.classList.remove('display-none')
    })    
}
// Kasowanie klasy 'category-item__On-Click' ze wszystkich kategorii
const hideAllActiveCategories = function(){
    allCategorys.forEach(c=>{
        c.classList.remove('category-item__On-Click')
    }) 
}

// 
   
const inPutSelect = function(){
    currentSlide = 0
    selectElement.addEventListener("change", (event) => {
        event.preventDefault()
        event.stopPropagation()
        const selectedOption = event.target.value;
        testActiveSlides = []
        hideAllActiveCategories()
        pierwszyEtapFiltracji(selectedOption)  
        filtracjaPoWybranuiKategorii()
        wubranyInPutWszystko(selectedOption)
        creatDotsForActiveSlides(activeSlides)
        activateCurrentDot(currentSlide)
        return activeSlides
    });
}

inPutSelect();

const pierwszyEtapFiltracji = function(selectedOption){
    SETostatniPoziomFiltracjiFoto = [];
    testActiveSlides = [];
    activeSlides = [];
    showAllSlides()
    hideAllSlides()
    allItems.forEach(i=>{
    if(i.classList.contains(`${selectedOption}`)) {
       i.classList.remove("display-none");
       testActiveSlides.push(i)
       filtracjaKategoriiPoInpucie()
    }
    activeSlides = testActiveSlides;
    startFromFirstSlide(currentSlide)
    activateCurrentDot(currentSlide)
    return ostatniPoziomFiltracjiFoto;
})
}

const filtracjaKategoriiPoInpucie = function(){
    odfiltrowaneKlucze = [];
    SETwidoczneKategorie=[];
    widoczneKategorie = [];
    hideAllCategories()
    allCategorys.forEach(c=>{     
        catArr.forEach(el => {
            activeSlides.forEach(ti=>{
                if (ti.classList.contains(`${el}`)) {
                    odfiltrowaneKlucze.push(el)
                    SETostatniPoziomFiltracjiFoto.push(ti)
                    ostatniPoziomFiltracjiFoto = [...new Set(SETostatniPoziomFiltracjiFoto)]
                }
            })  
        })
        aktywneKlucze = [...new Set(odfiltrowaneKlucze)];
        aktywneKlucze.forEach(elem => {
            if(c.classList.contains(`${elem}`)) {
                c.classList.remove("display-none");
                SETwidoczneKategorie.push(c)
            }
        });
        widoczneKategorie = [...new Set(SETwidoczneKategorie)]
    })
}

const filtracjaPoWybranuiKategorii = function(){
    widoczneKategorie.forEach(c=>{
        c.addEventListener('click', function(event) {   
            event.preventDefault()
            event.stopPropagation()
            hideAllSlides()
            hideAllActiveCategories()
            c.classList.add('category-item__On-Click');
            wybranaGrupaFoto = []
            activeSlides = []
            currentSlide = 0
            aktywneKlucze.forEach(activeC=>{              
                if (c.classList.contains(`${activeC}`)) {
                   ostatniPoziomFiltracjiFoto.forEach(f=>{
                            f.classList.add('display-none')
                        if(f.classList.contains(`${activeC}`)){
                            f.classList.remove('display-none')
                            activeSlides.push(f)                            
                        }
                    })                                     
                }
            })
            creatDotsForActiveSlides(activeSlides)
            activateCurrentDot(currentSlide)
            startFromFirstSlide(currentSlide)
            return currentSlide            
        })
    })    
}

const wubranyInPutWszystko = function(selectedOption){
    if (selectedOption === "all") {
        activeSlides = [...allItems]
        showActiveSlides()
        document.querySelectorAll('div.category-item').forEach(c => {
            c.classList.remove('display-none');
            c.classList.remove('category-item__On-Click')
        })
        creatDotsForActiveSlides(activeSlides)
        startFromFirstSlide()
        clickNaKategorie()
        return activeSlides
    }
}

//  filtracja slidów poza / przed użyciem InPut-a
const clickNaKategorie = function(){    
    allCategorys.forEach(c => {
        c.addEventListener('click', function(event){
            event.preventDefault()
            event.stopPropagation()
            currentSlide = 0
            activeSlides = [];
            aktywneKlucze = [];
            hideAllActiveCategories()
            c.classList.add('category-item__On-Click')
            hideAllSlides()
            catArr.forEach(key => {
                if(c.classList.contains(`${key}`)){
                    aktywneKlucze.push(key)
                }
            })
            allItems.forEach(i=>{
                if(i.classList.contains(`${[...aktywneKlucze]}`)){
                    activeSlides.push(i)
                }
            })
            showActiveSlides()
            startFromFirstSlide(activeSlides)
            creatDotsForActiveSlides(activeSlides)
            return activeSlides
        })
    })
}

clickNaKategorie()

//  KONIC FILTRA
// *****************************************

// SLIDER

const removeDotActiveFromAll = function(){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
}

const addDotActiveForCurrentDot = function(index){
    document.querySelector(`.dots__dot[data-slide ="${index}"]`).classList.add('dots__dot--active')
}

const creatDotsForActiveSlides = function(){
        dotContainer.innerHTML = " ";
        activeSlides.forEach(function(_, index){
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
    })
    addDotActiveForCurrentDot(currentSlide)
}

creatDotsForActiveSlides()

const activateCurrentDot = function(currentSlide) {
    if(currentSlide >= 0){
        removeDotActiveFromAll()
        addDotActiveForCurrentDot(currentSlide)   
    } else {
        dotContainer.innerHTML = " ";
    }
}

const startFromFirstSlide = function(){
    activeSlides.forEach((s, index) => {
        if(s.style.transform === `translateX(0%)`){
            s.style.transform = `translateX(${index * 100}%)`
        }
        if(index === 0) {
            s.style.transform = `translateX(${index}%)`
        }        
    })
}

const moveToSlide = function(slide) {
    activeSlides.forEach((s, index) => {s.style.transform = `translateX(${(index - slide) * 100}%)`});
}

const nextSlide = function(){
    if(currentSlide === (activeSlides.length - 1)) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    moveToSlide(currentSlide);
   activateCurrentDot(currentSlide)
}

const previousSlide = function(){
    if(currentSlide === 0) {
        currentSlide = (activeSlides.length - 1);
    } else {
        currentSlide--;
    }
    moveToSlide(currentSlide)
   activateCurrentDot(currentSlide)
}

moveToSlide(0);

btnRight.addEventListener('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    nextSlide()
});

btnLeft.addEventListener('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    previousSlide()
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
})

dotContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        moveToSlide(slide)
        activateCurrentDot(slide)
    }
})
