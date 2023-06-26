const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
});
//primary key : id+date
// dateSchema.medhos.update = async function(id,date,dosages,username){

// };

module.exports = mongoose.model("DateModel", dateSchema);
