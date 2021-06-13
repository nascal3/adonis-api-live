import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
  public async index() {
    return Todo.all();
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

    todo.save()
    return response.status(202).json({'ID': todo})
  }
}
