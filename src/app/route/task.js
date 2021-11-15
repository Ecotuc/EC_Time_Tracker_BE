const conn = require('../../config/database');

module.exports = (app) => {
    app.get('/api/tasks/:date/:user', (req, res, next) => {
        let query = `SELECT A.id, A.hours, A.project, B.name project_text, A.focal_point, C.name focal_point_text, A.date_assigned, 
        A.category, D.category_name category_text, A.description, E.description_name description_text, A.comments, 
        A.user_id FROM timetracker.task A JOIN timetracker.project B ON B.id = A.project JOIN timetracker.focal_point C ON A.focal_point = C.id
        JOIN timetracker.task_category D ON A.category = D.id JOIN timetracker.task_description E ON A.description = E.id 
        WHERE user_id = '${req.params.user}' AND date_assigned = '${req.params.date}'::date`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: result.rows });
            }
        });
    });

    app.post('/api/tasks', (req, res, next) => {
        let query = "INSERT INTO timetracker.task (hours, project, focal_point, date_assigned, category, description, comments,user_id) VALUES " +
            `(${req.body.hours}, ${req.body.project}, ${req.body.focal_point}, '${req.body.date_assigned}', ${req.body.category}, ${req.body.description},'${req.body.comments}',${req.body.user_id}) RETURNING *`;
        console.log(query);
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: [result.rows[0]] });
            }
        });
    });

    app.put('/api/tasks/:id', (req, res, next) => {
        let query = `UPDATE timetracker.task SET hours = ${req.body.hours}, project = ${req.body.project}, focal_point = ${req.body.focal_point}, category=${req.body.category}, description = ${req.body.description}, comments='${req.body.comments}'
        WHERE id = ${req.params.id}`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: [] });
            }
        });
    });

    app.delete('/api/tasks/:id', (req, res, next) => {
        let query = `DELETE FROM timetracker.task WHERE id = ${req.params.id}`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: [] });
            }
        })
    });

    app.get('/api/hours_per_month/:year/:month/:last', (req, res, next) => {
        let query = `SELECT count(*) AS total_days
         FROM   generate_series(timestamp '${req.params.year}-${req.params.month}-01'
                             , timestamp '${req.params.year}-${req.params.month}-${req.params.last}'
                             , interval  '1 day') the_day
            WHERE  extract('ISODOW' FROM the_day) < 6;`;
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                res.json({ status: 1, message: 'Query Success', values: result.rows[0].total_days * 8 });
            }
        });
    });

    app.get('/api/total_hours_worked/:year/:month/:user', (req, res, next) => {
        let query = `SELECT sum(hours) total_hours from timetracker.task WHERE EXTRACT(MONTH from date_assigned) = ${req.params.month} AND 
        EXTRACT(YEAR FROM date_assigned) = ${req.params.year} AND user_id = ${req.params.user}`
        console.log(query);
        conn.query(query, (err, result) => {
            if (err) {
                res.json({ status: 0, message: 'Query Error', values: [] });
            } else {
                if (result.rowCount == 0) {
                    res.json({ status: 1, message: 'Query Success', values: 0 });
                } else {
                    res.json({ status: 1, message: 'Query Success', values: result.rows[0].total_hours });
                }
            }
        });
    });
}