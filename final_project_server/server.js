const { join } = require('node:path');
const { createServer } = require('node:http');
const dotenv = require('dotenv');

const dotenvConfig = dotenv.config({ path: join(__dirname, './config.env') });

if (!!dotenvConfig.error) {
	console.error(`[-] dotenv config > ${dotenvConfig.error}`);

	console.info('[i] proccess terminated');
	process.exit(1);
}

const port = process.env.PORT;
const host = process.env.HOST;
const { app } = require('./app');

const server = createServer(app);

server.listen(port, () => {
	console.info(`[i] server running on ${host}:${port}...`);
});
