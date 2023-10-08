import express from "express"
import notesRouter from "./routes/notesRoutes.js";

const app = express()
app.use(express.json())
const port = Bun.env.PORT || 4000

app.get('/', (req, res) => {
  res.status(200).json({message: "Hello bun", body: []})
})

app.use('/api/notes', notesRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`)
})

