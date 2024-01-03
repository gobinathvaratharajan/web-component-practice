const $ = (args) => document.querySelector.call(document, args)
const $$ = (args) => document.querySelectorAll.call(document, args)
const Router = {
    init: () => {
        $$('a.navlink').forEach((a) => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('link is clicked');
                // the below will help us to get the url place in the href
                const url = a.getAttribute('href');
                // or you can target with event target
                // const url = e.target.getAttribute('href');
                Router.go(url);
            })
        })
        // Event Handler for the back and forward button
        window.addEventListener('popstate', (e) => {
            Router.go(e.state.route, false);
        });
        // check the initial url
        Router.go(location.pathname);
        console.log(`Router is initialized ${location.pathname}`);
    },
    go: (route, addToHistory = true) => {
        console.log(`Navigating to ${route}`);

        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement('h1');
                pageElement.textContent = 'Home';
                break;
            case "/order":
                pageElement = document.createElement('h1');
                pageElement.textContent = 'Order';
                break;
            default:
                if (route.startsWith('/product/')) {
                    pageElement = document.createElement('h1');
                    pageElement.textContent = 'Product';
                    pageElement.dataset.id = route.substring(route.lastIndexOf('/') + 1);
                }
                break;
        }
        // clear the main element
        const cache = $('main');
        cache.innerHTML = '';
        // $('main').childNodes = ''; // this will append the comment node and space also so use children
        // append the new page element
        cache.appendChild(pageElement)
        window.scrollX = 0;
        window.scrollY = 0;
    }
}

export default Router;
