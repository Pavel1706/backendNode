const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || '---'
let smtp_password = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password,  // generated ethereal password
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    let {message, contacts, name}=req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'HR Wants Me', // sender address
        to: "pavel1706test@gmail.com", // list of receivers
        subject: "Test send message", // Subject line
        // text: "Hello everyone!!! How`re you doing?", // plain text body
        html: `<b>Message from Portfolio</b>
        <div>
            name: ${name}
        </div>
        <div>
        contacts: ${contacts}
</div>
<div>
${message}
</div>
`
    });
    res.send('ok')
        .catch(err=>console.log(err))
})

let port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})