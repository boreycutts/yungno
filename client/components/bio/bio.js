import WebComponent from '/components/webComponent.js';

export default class Bio extends WebComponent {
    async connectedCallback() {
        super.connectedCallback().then(() => {
            let button = document.getElementById("contactme");
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