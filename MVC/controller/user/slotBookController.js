const slotBook = require('../../models/slotBookSchema')
const dateSchema = require('../../models/dateSchema')
const centreShema = require('../../models/centreSchema')
const querystring = require("querystring");
exports.bookSlot = async (req,res)=>{
    console.log(req.body);
    const centres = await centreShema.find({});
    let centreList=[]
    for (let i = 0; i < centres.length; i++) {
        const obj = {
            id: centres[i].id,
            name: centres[i].name,
            address: 
                centres[i].street + " " + centres[i].district + " " + centres[i].state,
            doses: centres[i].doses,
            workingHours : centres[i].workingHours
        };
        centreList.push(obj);
    }
    console.log(centreList)
    // try{
        var queryObject ={}
        var queryString="";
        // var queryObject = {
        //     list: JSON.stringify(centreList),
        //     error: ""
        // };
        // const queryString = "?" + querystring.stringify(queryObject);
        const id = parseInt(req.body.id)
        const date = req.body.date
        const username = req.session.username.username
        const count = await slotBook.countDocuments({ id: id, date: date });
        var idExist = false;
        for(let i=0;i<centreList.length;i++){
            console.log(centreList[i].id+" "+req.body.id)
            if(centreList[i].id===id){
                idExist=true;break;
            }
        }
        console.log(count+" "+idExist);
        if(!idExist){
            console.log("first if");
            queryObject = {
                list: JSON.stringify(centreList),
                error: "Hospital ID does not exist"
            };
            queryString = "?" + querystring.stringify(queryObject);
        }
        else if(count>=10){
            console.log("second if");
            queryObject = {
                list: JSON.stringify(centreList),
                error: "Sorry! No slots completely booked"
            };
            queryString = "?" + querystring.stringify(queryObject);
        }
        else {
            console.log("else if");
            queryObject = {
                list: JSON.stringify(centreList),
                error: "Successfully, slot booked"
            };
            queryString = "?" + querystring.stringify(queryObject);
            const newSlot = new slotBook({id,date,username})
            await newSlot.save()
        }
        console.log(queryObject)
        console.log(queryString)
        res.redirect("/vac" + queryString);
    // }
    // catch(err){
    //     res.send(err)
    // }
}

