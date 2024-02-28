import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInput } from '../../../shared/validate/zod-validation'
import { findUser } from '../../../shared/helper/find-user-by-token'

export type DeleteExpenseInputController = {
  expense_id: string
  user_id?: string
}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type DeleteExpenseOutPutController = void
@injectable()
export class DeleteExpenseController implements Controller {
  constructor (
    @inject('DeleteExpenseUseCase')
    private readonly useCase: UseCase<DeleteExpenseInputController, DeleteExpenseOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto = FindInput.parse(request.params.expense_id)
    const user_id = findUser(request)
    await this.useCase.execute({ expense_id: expenseDto, user_id })
    return response.status(201).json({ message: 'Deleted with success' })
  }
}
