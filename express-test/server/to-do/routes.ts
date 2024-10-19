import { Router, Request, Response, NextFunction } from 'express'
import { deleteTodo, getAllTodos, getTodoById, insertTodo, updateTodo } from './service'

const router = Router()


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await getAllTodos())
    } catch (e) {
        next(e)
    }
})


router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        res.json(await getTodoById(id))
    } catch (e) {
        next(e)
    }
})

router.post("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { title, description, dateCreated, isDone } = req.body
        res.json(await insertTodo(title, description, dateCreated, isDone))
        console.log(`Added new todo with values: ${title}, ${description}, ${dateCreated} and ${isDone}.`)
    } catch (e) {
        next(e)
    }
})

router.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const { title, description, isDone } = req.body
        res.json(await updateTodo(id, title, description, isDone))
        console.log(`Updated todo with id: ${id}. Updated values: ${title}, ${description}, ${isDone}.`)
    } catch (e) {
        next(e)
    }
})

router.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        await deleteTodo(id)
        res.sendStatus(200)
        console.log(`Deleted todo with id: ${id}.`)
    } catch (e) {
        next(e)
    }
})

module.exports = router