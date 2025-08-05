import express from 'express'
import * as noteController from '../controllers/note.controller.js'
import { createNoteValidator, updateNoteValidator } from '../validators/note.validator.js'
import { userAuth } from '../middlewares/auth.middleware.js'

const router = express.Router()


router.post('', userAuth, createNoteValidator, noteController.newNote)


router.get('/getall', userAuth, noteController.getAllNotes)


router.get('/:noteId', userAuth, noteController.getSingleNote)


router.put('/:noteId', userAuth, updateNoteValidator, noteController.updateNote)


router.delete('/:noteId', userAuth, noteController.deleteNote)


router.patch('/:noteId/archive', userAuth, noteController.archiveNote)

export default router