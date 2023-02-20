const router = require('express').Router()
const ID = require('./idSchema')
const FCM = require('fcm-node')

var fcm = new FCM('AAAAH9TWZp0:APA91bG5HmgsHk9pdtI9CbWec8vRdL_AvGDnMwzjeGRIJr6qle2nVdK7-M7MZ8Vyc5L8tltS1sPUHVhiMoMxnTWy6RWMz1FkC0IVvd2veE_ytO9rPniqv_h09RnvEhYrKQA91liCgkJB')
router.post('/', async (req, res) => {
    try {
        const { id, username } = req.body
        console.log(req.body);
        if (!id || !username) {
            return res.status(400).json({ status: false, error: 'id or name missing' })
        }
        let result = new ID({
            id,
            username
        })
        await result.save()
        return res.status(200).json({ status: true, message: 'successfully saved data' })

    }
    catch (e) {
        res.status(500).json({ status: false, error: 'internal server error' })
    }
})

router.get('/', async (req, res) => {
    try {
        let result = await ID.find({})
        return res.status(200).json({ status: true, data: result })
    }
    catch (e) {
        res.status(500).json({ status: false, error: 'internal server error' })
    }
})

router.post('/run', async () => {
    try {
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: ['cCJ4vwVeT6Ww3uUtcZ1fue:APA91bHHAAZNCFQXUgCmEE0y9iDmmJmulfOVjEgZjuOW1j8HsLCCsYgCbrPcxN_UbDU9wRxAHGyHfGJUQAepXGQUD9hoPoCOvUeyq4drYMwbDJ8E9tcxlD1svcjPN92pdN-CHVBcGVfR',
                'dXAWn36gSROw9AdaxQV11C:APA91bG5rvki0HKaniJeYc7dYfkDqaIg406v-BodubAFGCZHm0GF4b-nPLFSD5-Yk9LMyxuAbW0UwTszGBntzjoeFYrLWGonz8dBvIETxvZQAJJ4qr5IF6--TYoIR7XzsN2z7OfUDlI8'
            ],
            colapse_key: 'com.keka',
            notification: {
                title: 'Title of your push nvbotification',
                body: 'Body of your push notgbfnification'
            },
        }
        fcm.send(message, function (err, response) {
            if (err) {
                console.log(err, "Something has gone wrong!")
            } else {
                console.log("Successfully sent with response: ", response)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})
module.exports = router