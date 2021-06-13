import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {

  public async register({request, response}: HttpContextContract ) {
    const validations = await schema.create({
      email: schema.string({trim: true}, [
        rules.email(),
        rules.unique({table: 'users', column: 'email'})
      ]),
      password: schema.string({}, [
        rules.confirmed()
      ])
    })

    const data = await request.validate({schema: validations})

    const user = await User.create(data)
    return response.status(201).json({'data': user})
  }

  public async login({request, response, auth}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.attempt(email, password)
      return token.toJSON()
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

}
