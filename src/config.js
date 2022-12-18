const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
	WEBHOOK: process.env.WEBHOOK,
};
