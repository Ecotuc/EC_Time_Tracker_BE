const conn = require('../../config/database');

module.exports = (app) => {
    app.get('/user', (req, res, next) => {
        let query = "SELECT id, user_login, user_name, password, projects, coins, icon, position, employeeid FROM timetracker.user";
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: result.rows });
            }
        });
    });

    app.post('/login', (req, res, next) => {
        let query = `SELECT id, user_login, user_name, password, projects, coins, icon, position, employeeid FROM timetracker.user WHERE user_login = '${req.body.user}' AND password = '${req.body.password}'`;
        conn.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ status: 0, message: 'Its not possible to login', values: [], error: err });
            } else {
                if (result.rowCount > 0) {
                    res.json({ status: 1, message: 'Login successful', values: result.rows });
                } else {
                    res.json({ status: 0, message: 'There is no user with that credentials', values: [] });
                }
            }
        });
    });
}