module.exports = {
    list: async function (pool, userId, func) {
        await pool.query('SELECT * FROM links WHERE user_id = ?', [userId], func);
    },

    add: async function(pool, userId, data, func) {
        const { title, url, description } = data;
        const newLink = {
            title,
            url,
            description,
            user_id: userId
        };
        //console.log(newLink);
        await pool.query('INSERT INTO links SET ?', [newLink], func);
    },

    delete: async function(pool, linkId, func) {
        await pool.query('DELETE FROM links WHERE id = ?', [linkId], func);
    },

    getById: async function(pool, linkId, func) {
        await pool.query('SELECT * FROM links WHERE id = ?', [linkId], func);
    },

    edit: async function(pool, linkId, data, func) {
        const newLink = {
            title: data.title,
            url: data.url,
            description: data.description
        };
        //console.log(newLink);
        await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, linkId], func);
    }
};