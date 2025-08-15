function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
    /*
    return [...Array(4)].map(() =>
        Math.random().toString(36).substring(2, 4).toUpperCase()
    ).join('-');
    */
}

module.exports = { generateCode };

