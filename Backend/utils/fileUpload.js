// const multer = require('multer');

// const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, './temp')
//       },
//       filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//       }
//     })
    
//     const upload = multer({ storage: storage })

// module.exports = { upload };

const multer = require("multer");
const path = require("path");

// Set storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });




const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {

        cb(null, Date.now() + path.extname(file.originalname));
      }
     })




const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
 
});

module.exports = { upload };
