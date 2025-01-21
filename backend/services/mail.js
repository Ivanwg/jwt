const nodemailer = require('nodemailer')

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivation(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_LOGIN,
      to,
      subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
      text: '',
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <br/>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }
}

module.exports = new MailService()