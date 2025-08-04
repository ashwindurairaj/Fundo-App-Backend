import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service.js';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNote = async (req, res, next) => {
  try {
    // Get user ID from auth middleware
    const userId = res.locals.user.id;
    
    // Use validated body from validator middleware
    const data = await noteService.createNote(req.validateBody, userId);
    
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    // Get user ID from auth middleware
    const userId = res.locals.user.id;
    
    // Use validated body from validator middleware
    const data = await noteService.getNotes(userId);
    
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleNote = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const noteId = req.params.noteId;
    
    const data = await noteService.getSingleNote(noteId, userId);
    
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const noteId = req.params.noteId;
    
    const data = await noteService.updateNote(noteId, req.validateBody, userId);
    
    res.status(data.code).json({
      code: data.code,
      data: data.data,  
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const noteId = req.params.noteId;
    
    const data = await noteService.deleteNote(noteId, userId);
    
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const archiveNote = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const noteId = req.params.noteId;
    
    const data = await noteService.archiveNote(noteId, userId);
    
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};