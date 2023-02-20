const router = require('express').Router()
const ID = require('./idSchema')
const FCM = require('fcm-node')
const moment = require('moment')
let body = ''

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
        let result = await ID.find({}, { id: 1, _id: 0 })
        if (!result.length) {
            return
        }
        result = result.map(val => val?.id)
        var now = new Date();
        var hour = now.getHours();
        var minutes = now.getMinutes();
        if (hour == 09 && minutes == 30) {
            body = 'Please clock-in '
        }
        if (hour == 18 && minutes == 30) {
            body = 'Please clock-out'
        }
        var message = {
            registration_ids: result,
            colapse_key: 'com.keka',
            notification: {
                title: 'KEKA ATTENDANCE NOTIFICATION',
                body: body
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