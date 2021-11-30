const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: "smtp.gmail.com",
    // true for 465, false for other ports
    // port: 25,
    // secure: false,
    // // requireTLS: true,
    // tls:{
    //     rejectUnauthorized:false
    // },
    auth: {
        user: "pasha17061987@gmail.com", // generated ethereal user
        pass: "shpoks7654", // generated ethereal password
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
//
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})