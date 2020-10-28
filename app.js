// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
    // *** method 1: hard code solution
    // linksContainer.classList.toggle('show-links');

    // *** method 2: dynamic height solution
    const containerHeight = linksContainer.getBoundingClientRect().height;
    // console.log(containerHeight);
    const linksHeight = links.getBoundingClientRect().height;
    // console.log(linksHeight);
    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
})

// ********** fixed navbar and top link button ************
const nav = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function(){
    // console.log(window.pageYOffset);
    const scrollHeight = window.pageYOffset;
    const navHeight = nav.getBoundingClientRect().height;
    
    // *** fixed navbar
    if(scrollHeight > navHeight){
        nav.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav');
    }

    // *** fixed top link button
    if(scrollHeight > 500){
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
});

// ********** smooth scroll ************
// *** select links
const scrollLink = document.querySelectorAll('.scroll-link');

scrollLink.forEach(function(link){
    link.addEventListener('click', function(e){
        // *** prevent default
        e.preventDefault();

        // *** navigate to specific spot
        const id = link.getAttribute("href").slice(1);
        // console.log(id);
        const element = document.getElementById(id);
        
        // *** calculate the heights
        const navHeight = nav.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        // console.log(containerHeight);
        
        // *** fixedNav return true or false
        const fixedNav = nav.classList.contains('fixed-nav');
        // console.log(fixedNav); 

        // *** minus #nav height from element's offsetTop value
        let position = element.offsetTop - navHeight;
        // console.log(position);

        // *** 1. when #nav is fixed, it is toke out of the web page
        // *** 2. if the #nav is not fixed, it is included in the
        // web page height, so we need to reduce position further!!!
        // if we didn't reduce position, it will scroll too far...
        if(!fixedNav){
            position = position - navHeight;
        }
        
        // *** #nav height is 82px
        // *** when #nav links are open in smaller screen
        // console.log(navHeight);
        if(navHeight > 82){
            position = position + containerHeight;
        }

        window.scrollTo({
            top: position,
            left: 0
        });

        // *** in smaller screen, close links when user click a link
        linksContainer.style.height = 0;
    });
});