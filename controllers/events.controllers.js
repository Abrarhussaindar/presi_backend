const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const Event = require('../models/Event')


const CreateEvent = async (req, res) => {
  console.log(req.body);
  const newEvent = new Event(req.body);
  console.log("new eve", newEvent);
  try {
    const event = await newEvent.save();
    console.log("event: ", event);
    res.status(201).json(event);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const GetEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
}
const GetAllEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
}

const UpdateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (req.body.isAdmin === true) {
      await event.updateOne({ $set: req.body });
      res.status(200).json("The event has been updated");
    } else {
      res.status(403).json("You cannot update this event!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const DeleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (req.body.isAdmin === true) {
      await event.deleteOne();
      res.status(200).json("The event has been deleted");
    } else {
      res.status(403).json("You cannot delete this event!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  CreateEvent, GetAllEvents, GetEvent, UpdateEvent, DeleteEvent
}