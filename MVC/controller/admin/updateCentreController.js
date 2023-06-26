const mongoose = require('mongoose');
const centreSchema = require('../../models/centreSchema');

exports.showUpdatePage = async (req, res) => {
  res.render('updateCentre', {error:""});
};

exports.handleUpdateCentre = async (req, res) => {
  const hospID = req.body.id;
   
  try {
    const centre = await centreSchema.findOne({ id: hospID });
    console.log(centre+" "+centre.length)
    if (centre) {
      // Update the centre here
      // For example, you can update the name, street, district, and state fields
      centre.name = req.body.name;
      centre.street = req.body.street;
      centre.district = req.body.district;
      centre.state = req.body.state;
      centre.workingHours = req.body.workingHours
      // Save the updated centre
      await centre.save();

      // Redirect to a success page or display a success message
      res.render('updateCentre', {error:'Updated successfully'});
    } else {
      // Display an alert for incorrect Hospital ID
      res.render('updateCentre', { error: 'Incorrect Hospital ID' });
    }
  } catch (error) {
    // Handle any other errors that occurred
    res.status(500).send('An error occurred');
  }
};
