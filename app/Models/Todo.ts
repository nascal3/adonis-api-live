import { DateTime } from 'luxon'
import { string } from '@ioc:Adonis/Core/Helpers'
import {BaseModel, column, computed} from '@ioc:Adonis/Lucid/Orm'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @computed()
  public get excerpt() {
    return string.truncate(this.title, 5)
  }

  @column()
  public is_completed: Boolean

  @column.dateTime(
    {
      autoCreate: true,
      serialize: (value: DateTime | null) => {
        return value ? value.toFormat('yyyy LLL dd') : value
      }
    },
  )
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
