const express = require("express");
const router = express.Router();
const {
    getContacts,
    creatContact,
    deleteContact,
    updateContact,
    getContact

} = require("../controllers/contactController");
const validateToken = require("../middlewar/validateTokenHandeler");

router.use(validateToken);
router.route('/').get(getContacts).post(creatContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;