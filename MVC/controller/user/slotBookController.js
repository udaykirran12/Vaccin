const slotBook = require('../../models/slotBookSchema')
const dateSchema = require('../../models/dateSchema')
const centreShema = require('../../models/centreSchema')
exports.bookSlot = async (req,res)=>{
    const exist = await dateSchema.findOne({})
}

