import API from "./API.js";

export async function loadData() {
    glass.store.menu = await API.fetchMenu();
}
