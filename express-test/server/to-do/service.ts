import { dbClient, query, transactionQuery } from "../database";


export async function getAllTodos() {
    const todos = await query(`
        select
        *
        from
        to_do
    `)
    return todos.rows
}


export async function getTodoById(todoId: string) {
    const todo = await query(`
        select
        *
        from
        to_do
        where
        "id" = $1
    `, [todoId])


    if (todo.rowCount === 0) {
        throw new Error(`Todo with ${todoId} doesn't exist.`)
    }
    return todo.rows[0]
}

export async function insertTodo(title: string, description: string, isDone: boolean) {
    await transactionQuery(async (client) => {
        await client.query(`
            insert into
            to_do
            ("title", "description", "date_created", "is_done")
            values
            ($1, $2, CURRENT_DATE, $3)
            returning *
        `, [title, description, isDone])
    })
}

export async function updateTodo(id: string, title: string, description: string, isDone: boolean) {
    await transactionQuery(async (client) => {
        await client.query(`
            update to_do
            set
            "title" = $2,
            "description" = $3,
            "is_done" = $4,
            "date_updated" = CURRENT_DATE
            where
            "id" = $1
            returning *
        `, [id, title, description, isDone])
    })
}

export async function deleteTodo(id: string) {
    await transactionQuery(async (client) => {
        await client.query(`
            delete
            from to_do
            where
            "id" = $1    
        `, [id])
    })
}