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

document.addEventListener("loaded", () => {
    let page = HOME;
    let url = window.location.href;
    if(url.includes("#")) {
        page = url.split("#")[1];
    }

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
        let home = document.getElementById("home");
        let homeRect = home.getBoundingClientRect();
        let bio = document.getElementById("bio");
        let bioRect = bio.getBoundingClientRect();
        let work = document.getElementById("work");
        let workRect = work.getBoundingClientRect();
        let contact = document.getElementById("contact");
        let contactRect = contact.getBoundingClientRect();
        let links = document.getElementsByClassName("nav__link");
        let header = document.getElementById("header");
        let headerMobile = document.getElementById("header-mobile");
        let inputs = document.getElementsByClassName("i");
        let message = document.getElementsByClassName("im")[0];

        if(bioRect.top < 100 && workRect.top > 100) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[1].classList.add("nav__link--selected");
            links[5].classList.add("nav__link--selected");

            document.body.classList.add("theme--dark");
            document.body.classList.remove("theme--light");

            header.classList.add("main__header--scrolling");
            header.classList.remove("main__header--top");

            headerMobile.classList.add("main__header-mobile--scrolling");
            headerMobile.classList.remove("main__header-mobile--top");

            for(let i = 0; i < inputs.length; i++) {
                inputs[i].classList.add("input--dark");
                inputs[i].classList.remove("input");
            }

            message.classList.add("input--message--dark");
            message.classList.remove("input--message");
        } else if(workRect.top < 100 && contactRect.top > 100) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[2].classList.add("nav__link--selected");
            links[6].classList.add("nav__link--selected");

            document.body.classList.add("theme--dark");
            document.body.classList.remove("theme--light");

            header.classList.add("main__header--scrolling");
            header.classList.remove("main__header--top");

            headerMobile.classList.add("main__header-mobile--scrolling");
            headerMobile.classList.remove("main__header-mobile--top");

            for(let i = 0; i < inputs.length; i++) {
                inputs[i].classList.add("input--dark");
                inputs[i].classList.remove("input");
            }

            message.classList.add("input--message--dark");
            message.classList.remove("input--message");
        } else if(contactRect.top < 100) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[3].classList.add("nav__link--selected");
            links[7].classList.add("nav__link--selected");

            document.body.classList.remove("theme--dark");
            document.body.classList.add("theme--light");

            header.classList.add("main__header--scrolling");
            header.classList.remove("main__header--top");

            headerMobile.classList.add("main__header-mobile--scrolling");
            headerMobile.classList.remove("main__header-mobile--top");

            for(let i = 0; i < inputs.length; i++) {
                inputs[i].classList.add("input");
                inputs[i].classList.remove("input--dark");
            }

            message.classList.add("input--message");
            message.classList.remove("input--message--dark");
        } else {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove("nav__link--selected");
            }
            links[0].classList.add("nav__link--selected");
            links[4].classList.add("nav__link--selected");

            document.body.classList.add("theme--dark")
            document.body.classList.remove("theme--light")
            
            header.classList.remove("main__header--scrolling");
            header.classList.add("main__header--top");

            headerMobile.classList.remove("main__header-mobile--scrolling");
            headerMobile.classList.add("main__header-mobile--top");

            for(let i = 0; i < inputs.length; i++) {
                inputs[i].classList.add("input--dark");
                inputs[i].classList.remove("input");
            }

            message.classList.add("input--message--dark");
            message.classList.remove("input--message");
        }
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
        let hamburger = document.getElementById("hamburger");
        let headerMobile = document.getElementById("nav-mobile");
        headerMobile.classList.remove("nav-mobile");
        headerMobile.classList.add("nav-mobile--hidden");
        hamburger.checked = false;
    }
});
