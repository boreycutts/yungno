const camelToSnake = string => {
    return string.replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "-" + m[1];
    }).toLowerCase();
}

const removeFirstAndLastChar = string => {
    return string.slice(1, -1);
}

export default class WebComponent extends HTMLElement {
    component;
    constructor() {
        super();
        const name = this.constructor.name
        this.component = name.charAt(0).toLowerCase() + name.slice(1);
        this.loaded = false;
    }

    #removeMarkupComments = innerHTML => {
        return innerHTML.replace(/<\!--.*?-->/g, "");
    }

    #parseMarkupAttributes = innerHTML => {
        let newHTML = innerHTML;
        const expressions = innerHTML.match(/={([^}]+)}/g);
        
        for(const e in expressions) {
            const expression = expressions[e];
            let replaceString;

            if(expression.includes('this.')) {
                const fields = removeFirstAndLastChar(expression.replace('this', '').replace('=', '')).split('.');
                let value;
                for(const f in fields) {
                    if(value) {
                        value = value[fields[f]];
                    } else {
                        value = this[fields[f]];
                    }
                }
                replaceString = '=' + JSON.stringify(value);
            } else {
                const key = camelToSnake(expressions[e].replace(/[{}]/g, ""));
                replaceString = '=' + this.getAttribute(key);
            }
            
            newHTML = newHTML.replace(/={([^}]+)}/, replaceString);
        }

        return newHTML;
    }

    #parseMarkupForLoops = innerHTML => {
        let newHTML = innerHTML;
        const experssions = innerHTML.match(/{\(for([^}]+)}/g);
        for(const e in experssions) {
            const expression = experssions[e].match(/\(([^)]+)\)/g);
            const forExp = removeFirstAndLastChar(expression[0].replace(/\s/g, '')).split(':');
            const markup = removeFirstAndLastChar(expression[1]);

            const key = forExp[1];
            let list;
            if(forExp[2].includes('this.')) {
                const field = forExp[2].replace('this.', '');
                list = this[field];
            } else {
                list = JSON.parse(this.getAttribute(camelToSnake(forExp[2])).replace(/'/g, '"'));
            }

            let replaceString = '';
            for(const i in list) {
                const item = list[i];
                const placeholders = markup.match(/\[(.*?)\]/g);
                let newMarkup = markup;

                for(const p in placeholders) {
                    const placeholder = removeFirstAndLastChar(placeholders[p]);

                    if(placeholder.includes('.')) {
                        let value = item;
                        const fields = placeholder.split('.');
                        for(const f in fields) {
                            const field = fields[f];
                            if(field === key) {
                                continue;
                            } else {
                                value = value[field];
                            }
                        }
                        if(value === Object(value)) {
                            newMarkup = newMarkup.replace(/\[(.*?)\]/, '"' + JSON.stringify(value).replace(/"/g, '\'') + '"');
                        } else {
                            newMarkup = newMarkup.replace(/\[(.*?)\]/, '"' + value + '"');
                        }
                    } else {
                        if(item === Object(item)) {
                            newMarkup = newMarkup.replace(/\[(.*?)\]/, JSON.stringify(item));
                        } else {
                            newMarkup = newMarkup.replace(/\[(.*?)\]/, item);
                        }
                    }
                }
                replaceString += newMarkup;
            }

            newHTML = newHTML.replace(/{\(for([^}]+)}/g, replaceString);
        }

        return newHTML;
    }

    #parseMarkupVariables = innerHTML => {
        let newHTML = innerHTML;
        const expressions = innerHTML.match(/{([^}]+)}/g);
        
        for(const e in expressions) {
            const expression = expressions[e];
            let replaceString;

            if(expression.includes('this.')) {
                const field = removeFirstAndLastChar(expression.replace('this.', ''));
                replaceString = JSON.stringify(this[field]);
            } else {
                const key = camelToSnake(expressions[e].replace(/[{}]/g, ""));
                replaceString = this.getAttribute(key);
            }
            
            newHTML = newHTML.replace(/{([^}]+)}/, replaceString);
        }

        return newHTML;
    }

    #parseMarkupEventHandlers = () => {
        let elements = this.getElementsByTagName('*');
        for(const e in elements) {
            const attributes = elements[e].attributes;
            if(attributes) {
                const listeners = Array.from(attributes).filter(attribute => { return attribute.name.substr(0,2) === 'on' });
                for(const l in listeners) {
                    elements[e][listeners[l].name] = this[listeners[l].nodeValue];
                }
            }
        }
    }

    async connectedCallback() {
        return new Promise((resolve, reject) => {
            fetch('/components/' + this.component + '/' + this.component + '.html')
            .then(result => {
                result.text()
                    .then(innerHTML => {
                        let newHTML = innerHTML;
                        newHTML = this.#removeMarkupComments(newHTML);
                        newHTML = this.#parseMarkupForLoops(newHTML);
                        newHTML = this.#parseMarkupAttributes(newHTML);
                        newHTML = this.#parseMarkupVariables(newHTML);
                        this.innerHTML = newHTML;
                        this.#parseMarkupEventHandlers();
                        resolve();
                    }) 
            })
        });
    }

    get root() {
        let el = this;
        while(el.parentNode) {
            el = el.parentNode;
            if(el.tagName.includes('-')) {
                return el;
            }
        }
    }
}

export function defineComponents(components) {
    for(const c in components) {
        const component = components[c];
        const name = "x-" + camelToSnake(component);
        const path = "/components/" + component + "/" + component + ".js";
        import(path).then(result => {
            customElements.define(name, result.default);
        })
    }
}