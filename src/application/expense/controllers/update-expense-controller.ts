import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'

export type UpdateExpenseInputController = {
  description?: string
  value?: number
}
export type UpdateExpenseOutPutController = {
  expense_id: string
  description: string
  data: Date
  user_owner: any
  value: number
}

export class UpdateExpenseController implements Controller {
  constructor (
    private readonly useCase: UseCase<UpdateExpenseInputController, UpdateExpenseOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto: UpdateExpenseInputController = request.body

    const updated = await this.useCase.execute(expenseDto)
    return response.status(201).json(updated)
  }
}
