import API from "./API.js";

export async function loadData() {
    glass.store.menu = await API.fetchMenu();
}

export async function loadProduct() {
    if (glass.store.menu === null) {
        await loadData();
    }
    for (let c of glass.store.menu) {
        for (let p of c.products) {
            if (p.id == id) {
                return p;
            }
        }
    }
    return null;
}
