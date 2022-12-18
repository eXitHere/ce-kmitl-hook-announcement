const { WEBHOOK } = require('./config');
const { convert } = require('html-to-text');
const sanitizeHtml = require('sanitize-html');

const axios = require('axios');

async function sendMessage({ topic, data, owner, time, id }) {
	// date time
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const timeFormat = new Date(time).toLocaleDateString('en-US', options);

	// XSS protection
	const newData = sanitizeHtml(data);
	const text = convert(newData, {
		// wordwrap: 130,
	}).replace(/\n\n\n/g, '\n');

	await axios(WEBHOOK, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: JSON.stringify({
			content: null,
			embeds: [
				{
					title: `**${sanitizeHtml(topic) || '-'}**`,
					description: text.slice(0, 4090) || '-',
					url: `https://ce.kmitl.ac.th/Announcement/Detail?AnnounceId=${id || ''}`,
					color: null,
					author: {
						name: `โดย ${sanitizeHtml(owner) || '-'}  เมื่อ ${timeFormat || '-'}`,
					},
					footer: {
						text: 'This script was designed to prevent XSS by using sanitize-html and html-to-text.\nPlease be careful kubbbb.',
					},
				},
			],
			attachments: [],
		}),
	});
}

module.exports = sendMessage;
