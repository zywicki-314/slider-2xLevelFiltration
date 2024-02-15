const slider = document.querySelectorAll('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')

// ==============================================

const selectElement = document.getElementById("kat-prod");
const allItems = document.querySelectorAll("div.prod");
const allCategorys =  document.querySelectorAll("div.category-item");
const boxOfCategorys =  document.querySelector("div.cat-filteredCat");
const catArr = ['swetry', 'skarpety', 'kocyki', 'zima-on', 'zima-ona', 'zima-kids']
let activeSlides = [...allItems];
let testActiveSlides = [];
let SETtestActiveSlides = []
let ostatniPoziomFiltracjiFoto = [];
let SETostatniPoziomFiltracjiFoto = [];
let odfiltrowaneKlucze = [];
let aktywneKlucze = [];
let SETwidoczneKategorie = [];
let widoczneKategorie = [];
    
const inPutSelect = function(){
    selectElement.addEventListener("change", (event) => {    
        const selectedOption = event.target.value;
        SETtestActiveSlides = []
        testActiveSlides = []
        pierwszyEtapFiltracji(selectedOption)  
        filtracjaPoWybranuiKategorii()
        wubranyInPutWszystko(selectedOption)
        creatDotsForActiveSlides(activeSlides)
        return activeSlides
    });
}

inPutSelect();

const pierwszyEtapFiltracji = function(selectedOption){
    SETostatniPoziomFiltracjiFoto = [];
    testActiveSlides = [];
    activeSlides = [];
    allItems.forEach(i=>{
    i.classList.remove("display-none");
    i.classList.add("display-none");
    if(i.classList.contains(`${selectedOption}`)) {
       i.classList.remove("display-none");
       testActiveSlides.push(i)
       filtracjaKategoriiPoInpucie()
    }
    activeSlides = testActiveSlides;
    startFromFirstSlide()
       return ostatniPoziomFiltracjiFoto;
})
}

const filtracjaKategoriiPoInpucie = function(){
    odfiltrowaneKlucze = [];
    SETwidoczneKategorie=[];
    allCategorys.forEach(c=>{
        c.classList.add("display-none");      
        catArr.forEach(el => {
            testActiveSlides.forEach(ti=>{
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
        c.addEventListener('click', function() {            
            allItems.forEach(i=>{
                i.classList.add('display-none')
            })
            allCategorys.forEach(cat=>{
                cat.classList.remove('category-item__On-Click');
            })
            c.classList.add('category-item__On-Click');
            SETtestActiveSlides = []
            wybranaGrupaFoto = []
            activeSlides = []
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
            startFromFirstSlide()
            return activeSlides            
        })
    })    
}

const wubranyInPutWszystko = function(selectedOption){
    if (selectedOption === "all") {
        activeSlides = []
        document.querySelectorAll('div.prod').forEach(s => {
            s.classList.remove('display-none')
            activeSlides.push(s)
        })
        document.querySelectorAll('div.category-item').forEach(c => {
            c.classList.remove('display-none');
            c.classList.remove('category-item__On-Click')
        })
        creatDotsForActiveSlides(activeSlides)
        return activeSlides
    }
}

//  filtracja slidów poza / przed użyciem InPut-a
const clickNaKategorie = function(){
    allCategorys.forEach(c => {
        c.addEventListener('click', function(){
            activeSlides = [];
            allCategorys.forEach(cat=>{
                cat.classList.remove('category-item__On-Click');
            })
            c.classList.add('category-item__On-Click')
            allItems.forEach(i=>{
                    i.classList.add('display-none')
                })
            catArr.forEach(key => {                   
                if(c.classList.contains(`${key}`)){
                    allItems.forEach(i=>{
                        if(i.classList.contains(`${key}`)){
                            i.classList.remove('display-none')
                            activeSlides.push(i)
                        }
                    })
                }
            })
            startFromFirstSlide()
            creatDotsForActiveSlides(activeSlides)
            return activeSlides
        })
    })
}
clickNaKategorie()

//  KONIC FILTRA
// *****************************************

// SLIDER

let currentSlide = 0;

const creatDotsForActiveSlides = function(){
        dotContainer.innerHTML = " ";
        activeSlides.forEach(function(_, index){
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
    })
}

creatDotsForActiveSlides()

const activateCurrentDot = function(currentSlide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide ="${currentSlide}"]`).classList.add('dots__dot--active')
}

const startFromFirstSlide = function(){
    activeSlides.forEach((s, index) => {
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

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

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