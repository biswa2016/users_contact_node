const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");
// @des Get all contacts
//@route Get /api/contacts
//@acesss private


const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({
        user_id: req.user.id
    });
    res.status(200).json(contact)
});

// @des creat  contacts
//@route post /api/contacts
//@acesss private


const creatContact = asyncHandler(async (req, res) => {
    console.log("the req body", req.body);
    const {
        name,
        email,
        phone,
    } = req.body;
    console.log('name,email,phone: ', name, email, phone);
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All filed is mandotory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
});

// @des get  contact
//@route get /api/contacts
//@acesss private


const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log('contact: ', contact);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
});


// @des update  contacts
//@route update /api/contacts
//@acesss private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log('contact: ', contact);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user don't have permisson")
}
    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updateContact)
});

// @des delete  contacts
//@route delete /api/contacts
//@acesss private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log('contact: ', contact);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permisson")
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedContact)
});

module.exports = {
    getContacts,
    creatContact,
    getContact,
    updateContact,
    deleteContact


}