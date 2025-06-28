let products = [];
let nextId = 1;

function getAll() {
    return products;
}

function create(product) {
    product.id = nextId++;
    products.push(product);
    return product;
}

function remove(id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
        products.splice(idx, 1);
        return true;
    }
    return false;
}

module.exports = { getAll, create, remove };
