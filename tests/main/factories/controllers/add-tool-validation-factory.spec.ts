import { makeAddToolValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddToolValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddToolValidation()
    const validations: Validation[] = []
    for (const field of ['title', 'link', 'description', 'tags']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
