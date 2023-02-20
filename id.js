const router = require('express').Router()
const ID = require('./idSchema')


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
        return res.status(200).json({status:true, data: result })
    }
    catch (e) {
        res.status(500).json({ status: false, error: 'internal server error' })
    }
})
module.exports = router