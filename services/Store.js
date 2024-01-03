const Store = {
    menu: null,
    cart: []
}

// proxy is used to intercept the object so that we can customize the object using trap like set, get etc

const proxyStore = new Proxy(Store, {
    set(target, property, value) {
        // we want to target the value with property
        target[property] = value;

        if(property === 'menu') {
            // we want to dispatch it to the window object
            window.dispatchEvent(new Event('menuUpdated'));
            // we are using window instead of document because we have two document
        }
        if(property === 'cart') {
            window.dispatchEvent(new Event('cartUpdated'));
        }
        return true;
    }
})

export default proxyStore

// proxyStore is a consumer of the Store we can use it to get the value of the Store
