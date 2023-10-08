import express from "express"
import {getNotes, addNote, editNote, deleteNote} from "../controllers/notesController.js"

const notesRouter = express.Router()

notesRouter.route('/').get(getNotes).post(addNote)
notesRouter.route('/:title').patch(editNote).delete(deleteNote)

export default notesRouter