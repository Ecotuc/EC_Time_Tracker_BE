const app = require('./config/server');
require('./app/route/task_category')(app);
require('./app/route/task_description')(app);
require('./app/route/project')(app);
require('./app/route/focal_point')(app);
require('./app/route/user')(app);
require('./app/route/task')(app);


app.listen(app.get('PORT'), () => console.log(`Server Running on port ${app.get('PORT')}`));