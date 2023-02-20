const express = require('express')
const app = express()

const mongoose = require('mongoose')
const axios = require('axios')

const cron = require("node-cron");



app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/id', require('./id'))

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://nikhil:nikhil@cluster0.ey4cw2x.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) {
        return console.log(err, 'connection failed')
    }
    app.listen(3000, () => {
        console.log('connected to port 3000')
    })
})
let task = (val) => cron.schedule(val, async function () {
    console.log('ffff')
    // let result = await axios.get('http://localhost:3000/id')
    // console.log(result.data)

    
});
task('0 30 9 * * *')
task('0 25 01 * * *')


// function ready() {
//     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//         registration_ids: ['cCJ4vwVeT6Ww3uUtcZ1fue:APA91bHHAAZNCFQXUgCmEE0y9iDmmJmulfOVjEgZjuOW1j8HsLCCsYgCbrPcxN_UbDU9wRxAHGyHfGJUQAepXGQUD9hoPoCOvUeyq4drYMwbDJ8E9tcxlD1svcjPN92pdN-CHVBcGVfR',
//             'dXAWn36gSROw9AdaxQV11C:APA91bG5rvki0HKaniJeYc7dYfkDqaIg406v-BodubAFGCZHm0GF4b-nPLFSD5-Yk9LMyxuAbW0UwTszGBntzjoeFYrLWGonz8dBvIETxvZQAJJ4qr5IF6--TYoIR7XzsN2z7OfUDlI8'
//         ],
//         colapse_key:'com.keka',
//         notification: {
//             title: 'Title of your  nvbotification',
//             body: 'Body of your push notgbfnification'
//         },
//     }


//     fcm.send(message, function (err, response) {
//         if (err) {
//             console.log(err, "Something has gone wrong!")
//         } else {
//             console.log("Successfully sent with response: ", response)
//         }
//     })
// }
// ready()



