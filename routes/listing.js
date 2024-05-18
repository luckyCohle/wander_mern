const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,bodyCheck} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../CloudConfig.js")
const upload = multer({storage});



//1
router.route("/")
.get(wrapAsync(listingController.index))
.post(
isLoggedIn,
// validateListing,
upload.single("listing[image]"),
wrapAsync(listingController.createListing)



);
//(2)new route
router.get("/new",isLoggedIn,listingController.renderNewForm)

//search route
router.route("/search")
.get(
    wrapAsync
    (listingController.searchListing)
)

//show route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
isLoggedIn
,isOwner
,upload.single("listing[image]")
,validateListing
,wrapAsync(listingController.updateListing))
.delete(
isLoggedIn,
isOwner,
wrapAsync
(listingController.destroyListing));
module.exports = router;

//edit route
router.route("/:id/edit")
.get(
 isLoggedIn
,isOwner
,wrapAsync
(listingController.renderEditForm));
