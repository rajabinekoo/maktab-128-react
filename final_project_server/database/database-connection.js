const { connect, connection } = require('mongoose');

const connectToDatabase = async () => {
	try {
		await connect(process.env.DATABASE_URL);
	} catch (error) {
		console.log(`[-] database connection > ${error}`);
		console.info(`[i] proccess terminated`);
		process.exit(1);
	}
};

connection.once('connected', () => {
	console.log(`[+] database connected`);
});

connection.on('disconnected', () => {
	console.info(`[i] database disconnceted`);
});

connection.on('reconnected', () => {
	console.info(`[i] database reconnected`);
});

connection.on('error', error => {
	console.error(`[-] database error > ${error}`);
});

module.exports = { connectToDatabase };
