/**
 * @file This is the server-side controller for the Items
 */

/** @module Item Controller */

const Item = require('./itemModel.js');
const imageUtil = require('./../imageUtil.js');
const dbUtil = require('./../dbUtil.js');



exports.handleNewItem = (req, res, next) => {
  var photoData = req.body.image;
  photoData = photoData.replace(/^data:image\/(jpeg|png|jpg);base64,/, "");
  const filePath = 'images/logo.png';
  const move_id = req.body.moveId;
  imageUtil.saveAndUpload(filePath, photoData)
  .then((imageUrl) =>{
    const itemObj = {
      url: imageUrl,
      move_id: move_id,
      name: req.body.name,
      room: req.body.room,
      cft: req.body.cft,
      pbo: req.body.pbo,
      quantity: req.body.quantity,
      going: req.body.going,
      comment: req.body.comment
    };
    Item.create(itemObj).then( newItem => {
      dbUtil.getMoveItems(move_id).then( moveItems => {
        res.send({moveItems});
      });
    });
  }, err => {
    res.status(500).end(err);
  }).catch( err => {
    console.log('handleNewItem err', err);
    throw err;
  });
};