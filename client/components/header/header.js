import WebComponent from '/components/webComponent.js';

export default class Header extends WebComponent {
    async connectedCallback() {
        super.connectedCallback().then(() => {
            let links = this.getElementsByClassName("nav__link");
            for(let i = 0; i < links.length; i++) {
                links[i].addEventListener("click", event => {
                    const setPageEvent = new CustomEvent('setpage', {
                        bubbles: true,
                        detail: {target: event.target}
                    });
                    document.dispatchEvent(setPageEvent);
                });
            }

            const loadedEvent = new CustomEvent('loaded', {
                bubbles: true,
                detail: {}
            });
            document.dispatchEvent(loadedEvent);
        });
    }
}