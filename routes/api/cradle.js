// Models
const CradleBox     = require('../../models').CradleBox;
const CradleBoxItem = require('../../models').CradleBoxItem;

export function cradleBoxes(req, res) {
  CradleBox.find({}, (err, boxes) => {
    if (err) {
       return res.json(err);
    }
    res.json(boxes);
  });
}

export function createBox(req, res) {
  const data      = req.body;
  const cradleBox = new CradleBox(data);

  cradleBox.save(function() {
    res.json(data);
  });
}