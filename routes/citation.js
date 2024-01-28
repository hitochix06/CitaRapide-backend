var express = require("express");
var router = express.Router();

// afficher toutes les citations
router.get('/citations', async (req, res) => {
    try {
      const citations = await Citation.find({});
      res.json(citations);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

// supprimer une citation
router.delete('/citations/:id', async (req, res) => {
    try {
      const citation = await Citation.findByIdAndDelete(req.params.id);
      res.json(citation);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

// obtenir une citation spécifique par son id
router.get('/citations/:id', async (req, res) => {
    try {
      const citation = await Citation.findById(req.params.id);
      if (citation) {
        res.json(citation);
      } else {
        res.status(404).send('Citation not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

// mettre à jour une citation spécifique par son id
router.put('/citations/:id', async (req, res) => {
    try {
      const citation = await Citation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (citation) {
        res.json(citation);
      } else {
        res.status(404).send('Citation not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

module.exports = router;