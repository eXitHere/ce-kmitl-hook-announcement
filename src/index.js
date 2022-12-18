const axios = require('axios');
const cron = require('node-cron');
const _ = require('lodash');

const sendMessage = require('./sendMessageViaWebhook');

async function fetchData() {
	try {
		const res = await axios({
			method: 'GET',
			url: 'https://www.ce.kmitl.ac.th/api/announcement',
		});

		const { ANNOUNCE: announce } = res.data;

		// filter only isNew === true
		const newAnnounce = _.filter(announce, function (e, idx) {
			return e.isNew;
		});

		newAnnounce.forEach(async (e) => {
			// get announcement details
			const _res = await axios({
				method: 'GET',
				url: `https://www.ce.kmitl.ac.th/api/announcement/detail/${e.ANNOUNCE_ID}`,
			});

			const {
				ANNOUNCE_TOPIC: topic,
				ANNOUNCE_DATA: data,
				ANNOUNCE_TYPE: type,
				ANNOUNCE_OWNER: owner,
				ANNOUNCE_TIME: time,
			} = _res.data;

			await sendMessage({ topic, data, type, owner, time, id: e.ANNOUNCE_ID });
		});
	} catch (error) {
		console.log(error);
	}
}

cron.schedule('0 * * * *', async function () {
	console.log('Running a job every hour');
	await fetchData();
});
