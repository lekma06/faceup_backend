"use strict";

var express = require('express');

var router = express.Router();

var uniqid = require('uniqid');

var cloudinary = require('cloudinary').v2;

var fs = require('fs');

router.post('/upload', function _callee(req, res) {
  var photoPath, resultMove, resultCloudinary;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          photoPath = "./tmp/".concat(uniqid(), ".jpg");
          _context.next = 3;
          return regeneratorRuntime.awrap(req.files.photoFromFront.mv(photoPath));

        case 3:
          resultMove = _context.sent;

          if (resultMove) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload('./tmp/photo.jpg'));

        case 7:
          resultCloudinary = _context.sent;
          res.json({
            result: true,
            url: resultCloudinary.secure_url
          });
          _context.next = 12;
          break;

        case 11:
          res.json({
            result: false,
            error: resultMove
          });

        case 12:
          fs.unlinkSync('./tmp/photo.jpg');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;