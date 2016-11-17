const express = require('express');
const moveController = require('./../db/moves/moveController');


const router = new express.Router();

router.post('/newMove', moveController.handleNewMove);
router.get('/allMoves', moveController.getAllMoves);


module.exports = router;