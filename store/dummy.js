let db = {
    users: [
        {id: 1, nombre: "Luis Berenguer"},
        {id: 2, nombre: "Jorge Dominguez"}
    ]
}

async function list(tabla) {
    return db[tabla] || [];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id == id)[0] || null;
}

async function upsert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }
    await db[tabla].push(data);
    console.log(db);
    return data;
}

async function remove(tabla, id) {
    const index = db[tabla].findIndex(item => item.id == id);
    db[tabla].splice(index, 1);
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] == q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}