import { defineComponents } from "/components/webComponent.js";

const   HEADER = "header",
        HOME = "home",
        BIO = "bio",
        PHOTOS = "photos",
        CONTACT = "contact",
        ALBUMS = "albums";
let components = [
    HEADER,
    HOME,
    BIO,
    PHOTOS,
    CONTACT,
    ALBUMS
]
defineComponents(components);

let setContent = (event, page) => {
    let content = document.getElementById("content");
    let newPage = page;
    if(!page) {
        newPage = event.detail.target.getAttribute("data-page");
    }
    // content.classList.remove("main__content");
    // content.classList.add("main__content--hidden");
    if(newPage === CONTACT) {
        // document.body.classList.remove("theme--dark");
        // document.body.classList.add("theme--light");

        let header = document.getElementById("header");
        header.classList.remove("main__header--top")
        header.classList.add("main__header--scrolling")
    } else {
        // document.body.classList.remove("theme--light");
        // document.body.classList.add("theme--dark");

        let header = document.getElementById("header");
        header.classList.remove("main__header--scrolling")
        header.classList.add("main__header--top")
    }
    // setTimeout(() => {
    //     window.scrollTo(0, 0);
    //     content.innerHTML = "<x-" + newPage + "></x-" + newPage + ">";
    //     content.classList.remove("main__content--hidden");
    //     content.classList.add("main__content");
    // }, 1000);
}

document.addEventListener("loaded", () => {
    let page = HOME;
    let url = window.location.href;
    if(url.includes("#")) {
        page = url.split("#")[1];
    }
    // setContent(null, page); 

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    let hamburger = document.getElementById("hamburger");
    let headerMobile = document.getElementById("nav-mobile");
    hamburger.addEventListener("click", (event) => {
        if(event.target.checked) {
            headerMobile.classList.remove("nav-mobile--hidden");
            headerMobile.classList.add("nav-mobile");
        } else {
            headerMobile.classList.remove("nav-mobile");
            headerMobile.classList.add("nav-mobile--hidden");
        }
    });

    window.addEventListener("scroll", () => {
        let header = document.getElementById("header");
        if(window.scrollY < 20) {
            header.classList.remove("main__header--scrolling");
            header.classList.add("main__header--top");
        } else {
            header.classList.add("main__header--scrolling");
            header.classList.remove("main__header--top");
        }

        if (window.scrollY > 2250 && window.innerWidth > 750 || window.scrollY > 5250 && window.innerWidth < 750) {
            
        } else {
            
        }

        let home = document.getElementById("home");
        let homeRect = home.getBoundingClientRect();
        let bio = document.getElementById("bio");
        let bioRect = bio.getBoundingClientRect();
        let work = document.getElementById("work");
        let workRect = work.getBoundingClientRect();
        let contact = document.getElementById("contact");
        let contactRect = contact.getBoundingClientRect();

        let links = document.getElementsByClassName("nav__link");
        
        if(bioRect.top < 100 && workRect.top > 100) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[1].classList.add("nav__link--selected");
            links[5].classList.add("nav__link--selected");

            document.body.classList.add("theme--dark")
            document.body.classList.remove("theme--light")
        } else if(workRect.top < 100 && contactRect.top > 100) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[2].classList.add("nav__link--selected");
            links[6].classList.add("nav__link--selected");

            document.body.classList.add("theme--dark")
            document.body.classList.remove("theme--light")
        } else if(contactRect.top < 100) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[3].classList.add("nav__link--selected");
            links[7].classList.add("nav__link--selected");

            document.body.classList.remove("theme--dark")
            document.body.classList.add("theme--light")
        } else {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[0].classList.add("nav__link--selected");
            links[4].classList.add("nav__link--selected");

            document.body.classList.add("theme--dark")
            document.body.classList.remove("theme--light")
        }

        console.log("\n")
        console.log(window.scrollY);
        console.log(homeRect.top);
        console.log(bioRect.top);
        console.log(workRect.top);
        console.log(contactRect.top);


    });

    let links = document.getElementsByClassName("nav__link");
    for(let i = 0; i < links.length; i++) {
        if(links[i].getAttribute("data-page") === HOME) {
            links[i].classList.add("nav__link--selected");
        } else {
            links[i].classList.remove("nav__link--selected");
        }
    }
    window.scrollTo(0, 0);
});

document.addEventListener("setpage", event => {
    if(event.detail.target.getAttribute("data-page") != window.location.href.split("#")[1]) {
        // let links = document.getElementsByClassName("nav__link");
        // for(let i = 0; i < links.length; i++) {
        //     if(links[i].getAttribute("data-page") === event.detail.target.getAttribute("data-page")) {
        //         links[i].classList.add("nav__link--selected");
        //     } else {
        //         links[i].classList.remove("nav__link--selected");
        //     }
        // }
        let hamburger = document.getElementById("hamburger");
        let headerMobile = document.getElementById("nav-mobile");
        headerMobile.classList.remove("nav-mobile");
        headerMobile.classList.add("nav-mobile--hidden");
        hamburger.checked = false;
    }
});
