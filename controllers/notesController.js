export const getNotes = async (req, res) => {
  const result = Bun.file('notes.json', { type: "application/json" })
  const notes = await result.json()
  res.status(200).json({message: "Notes", body: { notes }})
}

export const addNote = async (req, res) => {
  const result = Bun.file('notes.json', { type: "application/json" })
  const notes = await result.json()

  notes.push(req.body)

  await Bun.write('notes.json', JSON.stringify(notes))

  res.status(200).json({message: "Note was added"})
}

export const editNote = async (req, res) => {
  const result = Bun.file('notes.json', { type: "application/json" })
  const notes = await result.json()
  const newData = req.body

  const targetNote = notes.find(n => n.title === req.params.title)
  const targetNoteIndex = notes.findIndex(n => n.title === req.params.title)

  if(!targetNote) {
    res.status(400).json({ message: "Note doesnt exist" })
    return
  }

  for(const [key, value] of Object.entries(newData)) {
    targetNote[key] = value
  }
  notes[targetNoteIndex] = targetNote

  await Bun.write('notes.json', JSON.stringify(notes))

  res.status(200).json({message: "Note was changed"})
}

export const deleteNote = async (req, res) => {
  const result = Bun.file('notes.json', { type: "application/json" })
  const notes = await result.json()

  const targetNoteIndex = notes.findIndex(n => n.title === req.params.title)

  if(!targetNoteIndex) {
    return res.status(400).json({ message: "Note doesnt exist" })
  }
  notes.splice(targetNoteIndex, 1)

  await Bun.write('notes.json', JSON.stringify(notes))

  res.status(200).json({message: "Note was deleted"})
}