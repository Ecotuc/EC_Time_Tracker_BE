const conn = require('../../config/database');

module.exports = (app) => {
    app.get('/task_description/:category_id', (req, res, next) => {
        let query = `SELECT id, category_id, description_name FROM timetracker.task_description WHERE category_id = ${req.params.category_id}`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({status: 0, message: 'Query Error', values: []});
            } else {
                res.json({status: 1, message: 'Query Success', values: result.rows});
            }
        });
    });
}