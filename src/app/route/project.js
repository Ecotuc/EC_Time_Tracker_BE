const conn = require('../../config/database');

module.exports = (app) => {
    app.get('/project/:array', (req, res, next) => {
        let options = String(req.params.array);
        options = options.replace('[','(').replace(']',')');
        let query = `SELECT id, name, active FROM timetracker.project where active = true AND id IN ${options}`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({status: 0, message: 'Query Error', values: []});
            } else {
                res.json({status: 1, message: 'Query Success', values: result.rows});
            }
        });
    });
}