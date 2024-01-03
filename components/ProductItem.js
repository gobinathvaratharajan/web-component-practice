export class ProductItem extends HTMLElement {
    constructor() {
        super();
    }

    // creating the component to the DOM
    connectedCallback() {
        const template = document.getElementById('product-item-template');
        const templateContent = template.content.cloneNode(true);
        this.appendChild(templateContent);
        const product = JSON.parse(this.dataset.product);
        this.querySelector('h4').textContent = product.name;
        this.querySelector('p.price').textContent = `$${product.price.toFixed(2)}`;
        this.querySelector("img").src = `data/images/${product.image}`;
        this.querySelector("a").addEventListener("click", e => {
            console.log(e.target.value)
            // e.currentTarget; // a
            // e.target; // button
            if(e.target.tagName.toLowerCase() == 'button') {
                console.log('button is clicked');
            } else {
                glass.router.go(`/product/${product.id}`)
            }
            e.preventDefault();
        })
    }
}

customElements.define('product-item', ProductItem)
