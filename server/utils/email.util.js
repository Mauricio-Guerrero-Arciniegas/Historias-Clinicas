const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
	constructor(to) {
		this.to = to;
	}

	// Connect to mail service
	newTransport() {

		return nodemailer.createTransport({
			host: 'smtp://smtp.mailtrap.io:2525',
			port: 2525,
			auth: {
				type: "login", // default
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASSWORD,
			},
	   
		 });
	}dzb

	
	
	async send(template, subject, mailData) {
		const html = pug.renderFile(
			path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
			mailData
		);

		await this.newTransport().sendMail({
			from: process.env.MAIL_FROM,
			to: this.to,
			subject,
			html,
			text: htmlToText(html),
		});
	}

	async sendWelcome(name) {
		await this.send('welcome', 'Welcome to our app', { name });
	}

	async sendNewRequest(name, identification) {
		await this.send('newPost', 'You have created a new post', {
			name,
			identification,
		});
	}
}

module.exports = { Email };
