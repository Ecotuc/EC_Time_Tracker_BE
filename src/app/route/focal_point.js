const conn = require('../../config/database');

module.exports = (app) => {
    app.get('/api/focal_point/:id_project', (req, res, next) => {
        let query = `SELECT id, id_project, name FROM timetracker.focal_point WHERE id_project = ${req.params.id_project}`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: result.rows });
            }
        });
    });

    app.post('/api/focal_point/:id_project', (req, res, next) => {
        let query = `INSERT INTO timetracker.focal_point (id_project, name) VALUES (${req.params.id_project}, ${req.body.name})`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: [] });
            }
        });
    });
}