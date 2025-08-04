import Note from '../models/note.model.js'

export const createNote = async (body, userId) => {
  try {
    const noteData = {
      ...body,
      createdBy: userId
    }

    const newNote = await Note.create(noteData)

    return { code: 201, data: newNote, message: "Note created successfully!" }
  } catch (err) {
    console.error(err)
    return { code: 500, data: [], message: "Error creating note" }
  }
}

export const getNotes = async (userId) => {
  try {
    const notes = await Note.find({ 
      createdBy: userId,
      trash: false 
    }).populate('createdBy', 'firstName lastName email')

    return { 
      code: 200, 
      data: notes, 
      message: "Notes retrieved successfully!" 
    }
  } catch (err) {
    console.error(err)
    return { 
      code: 500, 
      data: [], 
      message: "Error retrieving notes" 
    }
  }
}

export const getSingleNote = async (noteId, userId) => {
  try {
    const note = await Note.findOne({ 
      _id: noteId, 
      createdBy: userId,
      trash: false 
    }).populate('createdBy', 'firstName lastName email')
    
    if (!note) {
      return { 
        code: 404, 
        data: null, 
        message: "Note not found or unauthorized" 
      }
    }

    return { 
      code: 200, 
      data: note, 
      message: "Note retrieved successfully!" 
    }
  } catch (err) {
    console.error(err)
    return { 
      code: 500, 
      data: null, 
      message: "Error retrieving note" 
    }
  }
}

export const updateNote = async (noteId, body, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, createdBy: userId })
    
    if (!note) {
      return { 
        code: 404, 
        data: null, 
        message: "Note not found or unauthorized" 
      }
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId, 
      body, 
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email')

    return { 
      code: 200, 
      data: updatedNote, 
      message: "Note updated successfully!" 
    }
  } catch (err) {
    console.error(err)
    return { 
      code: 500, 
      data: null, 
      message: "Error updating note" 
    }
  }
}

export const deleteNote = async (noteId, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, createdBy: userId })
    
    if (!note) {
      return { 
        code: 404, 
        data: null, 
        message: "Note not found or unauthorized" 
      }
    }

    // Move to trash instead of permanent delete
    const deletedNote = await Note.findByIdAndUpdate(
      noteId, 
      { trash: true }, 
      { new: true }
    ).populate('createdBy', 'firstName lastName email')

    return { 
      code: 200, 
      data: deletedNote, 
      message: "Note moved to trash successfully!" 
    }
  } catch (err) {
    console.error(err)
    return { 
      code: 500, 
      data: null, 
      message: "Error deleting note" 
    }
  }
}

export const archiveNote = async (noteId, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, createdBy: userId })
    
    if (!note) {
      return { 
        code: 404, 
        data: null, 
        message: "Note not found or unauthorized" 
      }
    }

    const archivedNote = await Note.findByIdAndUpdate(
      noteId, 
      { isArchive: !note.isArchive }, 
      { new: true }
    ).populate('createdBy', 'firstName lastName email')

    return { 
      code: 200, 
      data: archivedNote, 
      message: `Note ${note.isArchive ? 'unarchived' : 'archived'} successfully!` 
    }
  } catch (err) {
    console.error(err)
    return { 
      code: 500, 
      data: null, 
      message: "Error archiving note" 
    }
  }
}