const router = require('express').Router();
const EventController = require('../controllers/events.controllers');

router.post("/create", EventController.CreateEvent);
router.get("/:id", EventController.GetEvent);
router.get("/", EventController.GetAllEvents);
router.put("/:id", EventController.UpdateEvent);
router.delete("/:id", EventController.DeleteEvent);

module.exports = router;