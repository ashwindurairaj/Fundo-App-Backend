import express from 'express'
import * as noteController from '../controllers/note.controller.js'
import { createNoteValidator, updateNoteValidator } from '../validators/note.validator.js'
import { userAuth } from '../middlewares/auth.middleware.js'

const router = express.Router()

// Create note (CREATE) - Validation needed
router.post('', userAuth, createNoteValidator, noteController.newNote)

// Get all notes (READ) - No validation needed
router.get('/getall', userAuth, noteController.getAllNotes)

// Get single note (READ) - No validation needed
router.get('/:noteId', userAuth, noteController.getSingleNote)

// Update note (EDIT) - Validation needed
router.put('/:noteId', userAuth, updateNoteValidator, noteController.updateNote)

// Delete note (move to trash) - No validation needed
router.delete('/:noteId', userAuth, noteController.deleteNote)

// Archive/Unarchive note - No validation needed
router.patch('/:noteId/archive', userAuth, noteController.archiveNote)

export default router