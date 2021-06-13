import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodoController {
  public async index({request}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 2)

    const todos = await Todo.query().paginate(page, limit);

    return todos.serialize({
      fields: {
        omit: ['updated_at']
      }
    })
  }

  public async store({request, response}: HttpContextContract) {
    await Todo.create({
      title: request.input('title'),
      is_completed: false
    })

    return response.status(201).json({ 'message': 'Created' })
  }

  public async update({request, response, params}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    todo.is_completed = request.input('is_completed')

    await todo.save()
    return response.status(202).json({'ID': todo})
  }
}
