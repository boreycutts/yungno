import WebComponent from '/components/webComponent.js';

export default class Home extends WebComponent {
    async connectedCallback() {
        super.connectedCallback().then(() => {
            let button = document.getElementById("learnmore");
            button.addEventListener("click", event => {
                const setPageEvent = new CustomEvent('setpage', {
                    bubbles: true,
                    detail: {target: event.target}
                });
                document.dispatchEvent(setPageEvent);
            });
        });
    }
}