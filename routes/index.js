var express = require("express");
var router = express.Router();

const Citation = require("../models/citations");

// function deleteCitation(id) {
//   Citation.deleteOne({ _id: id }).then(() => {
//     Citation.find().then(data => {
//       console.log(data);
//     });
//   });
// }

// deleteCitation('65b3da9bfd65a86b76f7a352')

router.get("/v1/quotes/:category", (req, res) => {
  fetch(`https://api.api-ninjas.com/v1/quotes?category=${req.params.category}`, {
    headers: {
      "X-Api-Key": process.env.VITE_APP_API_KEY
    }
  })
    .then(response => response.json())
    .then(apiData => {

      const newCita = new Citation({
        proverbe: apiData[0].quote,
        auteur: apiData[0].author,
        theme: apiData[0].category,
      });

      newCita.save().then(() => {
        res.json({ result: true, citation: newCita });
      });
    });
});





module.exports = router;
