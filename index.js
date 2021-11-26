const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/app');
const db = require('./config/mongoose');
const senateMiddleware = require('./routers/senate');
const facultyMiddleware = require('./routers/faculty');
const departmentMiddleware = require('./routers/department');
const lecturerMiddleware = require('./routers/lecturer');
const studentMiddleware = require('./routers/student');
db.databaseConnection();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/ums/senate/api/', senateMiddleware());
app.use('/ums/faculty/api/', facultyMiddleware());
app.use('/ums/department/api/', departmentMiddleware());
app.use('/ums/lecturer/api/', lecturerMiddleware());
app.use('/ums/student/api/', studentMiddleware());

app.listen(config.appPort, function(){
    console.log('server running on port: '+ config.appPort)
})