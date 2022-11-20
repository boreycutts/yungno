import { defineComponents } from "/components/webComponent.js";

const   HEADER = "header",
        HOME = "home",
        BIO = "bio",
        PHOTOS = "photos",
        CONTACT = "contact";
let components = [
    HEADER,
    HOME,
    BIO,
    PHOTOS,
    CONTACT
]
defineComponents(components);

let setContent = (event, page) => {
    let content = document.getElementById("content");
    let newPage = page;
    if(!page) {
        newPage = event.detail.target.getAttribute("data-page");
    }
    content.classList.remove("main__content");
    content.classList.add("main__content--hidden");
    if(newPage === CONTACT) {
        document.body.classList.remove("theme--dark");
        document.body.classList.add("theme--light");

        let header = document.getElementById("header");
        header.classList.remove("main__header--top")
        header.classList.add("main__header--scrolling")
    } else {
        document.body.classList.remove("theme--light");
        document.body.classList.add("theme--dark");

        let header = document.getElementById("header");
        header.classList.remove("main__header--scrolling")
        header.classList.add("main__header--top")
    }
    setTimeout(() => {
        window.scrollTo(0, 0);
        content.innerHTML = "<x-" + newPage + "></x-" + newPage + ">";
        content.classList.remove("main__content--hidden");
        content.classList.add("main__content");
    }, 1000);
}

window.addEventListener("scroll", () => {
    let header = document.getElementById("header");
    if(!window.location.href.includes(CONTACT)) {
        if(window.scrollY < 20) {
            header.classList.remove("main__header--scrolling");
            header.classList.add("main__header--top");
        } else {
            header.classList.add("main__header--scrolling");
            header.classList.remove("main__header--top");
        }
    }
});

document.addEventListener("loaded", () => {
    let page = HOME;
    let url = window.location.href;
    if(url.includes("#")) {
        page = url.split("#")[1];
    }
    setContent(null, page); 

    let links = document.getElementsByClassName("nav__link");
    for(let i = 0; i < links.length; i++) {
        if(links[i].getAttribute("data-page") === page) {
            links[i].classList.add("nav__link--selected");
        } else {
            links[i].classList.remove("nav__link--selected");
        }
    }
});

document.addEventListener("setpage", event => {
    if(event.detail.target.getAttribute("data-page") != window.location.href.split("#")[1]) {
        setContent(event)
        let links = document.getElementsByClassName("nav__link");
        for(let i = 0; i < links.length; i++) {
            if(links[i].getAttribute("data-page") === event.detail.target.getAttribute("data-page")) {
                links[i].classList.add("nav__link--selected");
            } else {
                links[i].classList.remove("nav__link--selected");
            }
        }
    }
});
