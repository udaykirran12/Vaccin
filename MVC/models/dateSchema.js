const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
  dosages: { type: Number, required: true },
  username: { type: String, required: true }
});

dateSchema.methods.add = async function(id, date, dosages, username) {
  try {
    const newRecord = new this.model({
      id,
      date,
      dosages,
      username
    });
    await newRecord.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = mongoose.model("DateModel", dateSchema);
