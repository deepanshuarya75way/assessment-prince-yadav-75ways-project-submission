const express = require("express");
const eventRouter = express.Router();

const Event = require("../models/Event");
const userAuth = require("../middlewares/auth");

eventRouter.post("/events/create", userAuth, 
  async(req, res) => {
    try{
      const {title, description, date} = req.body;

      const event = await Event.create({
        title,
        description,
        date,
        createdBy: req.user._id,
        members: [req.user._id],
      });
      res.status(201).json({
        message: "Event Created",
        event,
      });
    } catch (err) {
    res.status(400).json({
      message: err.message,
    })
  }
  }
)

eventRouter.post("/events/:eventId/join", userAuth, async(req, res) => {
  try{
    const event = await Event.findById(req.params.eventId);

    if(!event) {
      return res.status(404).json({
        message: "Event not found",
      })
    }
    if(event.member.includes(req.user._id)){
      return res.status(400).json({
        message: "Already joined",
      })
    }
    event.member.push(req.user._id);
    await event.save();

    res.json({
      message: "Joined event",
    })
  } catch (err){
    res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = eventRouter;