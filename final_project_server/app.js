const { join } = require('node:path');
const cors = require("cors")
const express = require('express');

const { connectToDatabase } = require('./database/database-connection');
const { AppError } = require('./utils/app-error');
const { addAdmin } = require('./utils/add-admin');

const apiRouter = require('./routers/api-router');

const app = express();


app.use(cors({
	origin : '*'
}))

// database Connection
connectToDatabase().then(() => addAdmin());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static
app.use(express.static(join(__dirname, './public')));

app.use('/api', apiRouter);



// 404 handler
app.all('*', (req, res, next) => {
	next(new AppError(404, `can't find ${req.method} ${req.originalUrl}`));
});

// global error handler
app.use(cors);

module.exports = { app };
