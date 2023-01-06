const fs = require('fs');
const path = require('path');

function readNote() {
	try {
		const data = fs.readFileSync(path.resolve(__dirname, '../note.json'), 'utf-8');
		const jsonData = JSON.parse(data);

		return jsonData;
	} catch (error) {
		return [];
	}
}

function writeNote(newData) {
	try {
		fs.writeFileSync(path.resolve(__dirname, '../note.json'), JSON.stringify(newData));
	} catch (error) {
		return [];
	}
}

module.exports = {
	writeNote,
	readNote,
};
