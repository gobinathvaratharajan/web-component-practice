export class MenuPage extends HTMLElement {
    constructor() {
        super();

        // const template = document.getElementById('menu-page-template');
        // once selecting the template, you can clone it
        // why cloneNode(true) -> it will clone the whole content of the template
        // const templateContent = template.content.cloneNode(true);
        // this.appendChild(templateContent);
        // Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children
        //  connectedCallback()  solve this issue

        // attach the shadow DOM
        // this will be a isolated DOM for the component
        this.root = this.attachShadow({ mode: 'open' });

        // you can use function in constructor in javascript
        const styles = document.createElement('style');
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch('./components/MenuPage.css');
            const css = await request.text();
            styles.textContent = css;
        }
        loadCSS();
    }

    // help to attached the component to the DOM
    connectedCallback() {
        const template = document.getElementById('menu-page-template');
        const templateContent = template.content.cloneNode(true);
        this.root.appendChild(templateContent);

        window.addEventListener('menuUpdated', () => {
            this.render();
        })
    }

    render() {
        if (glass.store.menu) {
            // this will help to clear the menu
            this.root.querySelector('#menu').innerHTML = '';
            for (let categories of glass.store.menu) {
                const listCategory = document.createElement('li');
                listCategory.innerHTML = `
                    <h3>${categories.name}</h3>
                    <ul class='category'></ul>
                `;
                this.root.querySelector('#menu').appendChild(listCategory);
                categories.products.forEach((product) => {
                    const item = document.createElement('product-item');
                    item.dataset.product = JSON.stringify(product);
                    // [object Object] -> JSON.stringify(product)
                    listCategory.querySelector('ul').appendChild(item);
                })
            }
        } else {
            this.root.querySelector('#menu').innerHTML = '<p>Loading...</p>'
        }
    }
}

// this is the way to define custom element in the browser
customElements.define('menu-page', MenuPage);
