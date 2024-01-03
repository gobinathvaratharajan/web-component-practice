// import work only when type module is apply
import API from './services/API.js';
import { loadData } from './services/Menu.js';
import Router from './services/Router.js';
import Store from './services/Store.js';

// Link the web component to the app.js
import { DetailsPage } from './components/DetailsPage.js';
import { MenuPage } from './components/MenuPage.js';
import { OrderPage } from './components/OrderPage.js';
import { ProductItem } from './components/ProductItem.js';

// I am assigning Store to window.glass.store
window.glass = {}
glass.store = Store;
glass.router = Router;

window.addEventListener('DOMContentLoaded', async () => {
    loadData();
    glass.router.init();
})

/*
* =======================================
helper function to reduce reuse code
const $ = function(args){ return document.querySelector(args);}
const $$ = function(args){ return document.querySelectorAll(args);}

const $ = () => document.querySelector.call(this, args)
const $$ = () => document.querySelectorAll.call(this, args)

HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
HTMLElement.prototype.off = (a, b) => this.addEventListener(a, b);
HTMLElement.prototype.$ = (s) => this.querySelector(s);
HTMLElement.prototype.$$ = (s) => this.querySelectorAll(s);

*/

// load -> used to wait for everything including style, script, DOM
// window.addEventListener('load', () => {

// why event -> It's better wait for event to manipulated
// onevent properties -> has onload and onclick
// every case are lower case
// window.addEventListener('DOMContentLoaded', () => {
//     const nav = document.querySelector('nav');
//     console.log(nav);
//     nav.innerHTML = `<h2>Hello VG</h2><p>I am highly motivated</p>`
// })
