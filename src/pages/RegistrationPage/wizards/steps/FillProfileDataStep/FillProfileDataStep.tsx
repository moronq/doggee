import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { DateInput, Input, InputPassword, Select } from '@common/fields'
import { IntlText, useIntl } from '@features'
import { validateIsEmpty } from '@pages'
import { api, useForm, useMutation } from '@utils'

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer'

import styles from './FillProfileDataStep.module.css'

interface RegistrationFormValues {
  username: string
  password: string
  passwordAgain: string
  birthDate: Date
}

interface FillProfileDataStepProps {
  setStep: () => void
}

const registrationFormValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value)
}

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({ setStep }) => {
  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation<
    Omit<RegistrationFormValues, 'passwordAgain'>,
    ApiResponse<User[]>
  >((values) => api.post('registration', values))

  const { values, errors, setFieldValues, handleSubmit } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: '',
      birthDate: new Date(new Date().getTime())
    },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('values', values)
      const response = await registrationMutation({
        password: values.password,
        username: values.username,
        birthDate: values.birthDate
      })

      console.log(response)
    }
  })
  const { translateMessage } = useIntl()

  return (
    <RegistrationWizardContainer
      form={{
        title: <IntlText path='page.registration.fillYourLoginData' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <Input
                disabled={registrationLoading}
                isError={!!errors?.username}
                helperText={errors?.username ?? undefined}
                value={values.username}
                label={translateMessage('field.input.username.label')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const username = e.target.value
                  setFieldValues('username', username)
                }}
              />
            </div>
            <div className={styles.input_container}>
              <InputPassword
                disabled={registrationLoading}
                isError={!!errors?.password}
                helperText={errors?.password ?? undefined}
                value={values.password}
                label={translateMessage('field.input.password.label')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const password = e.target.value
                  setFieldValues('password', password)
                }}
              />
            </div>
            <div className={styles.input_container}>
              <DateInput
                disabled={registrationLoading}
                label='data'
                value={values.birthDate}
                onChange={(date) => {
                  setFieldValues('birthDate', date)
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <Select
                disabled={registrationLoading}
                label='data'
                option={{ label: '1', option: '1', value: '1' }}
                onChange={(date) => {
                  setFieldValues('birthDate', date)
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
                  })}
              />
            </div>
            <Button type='submit' isLoading={registrationLoading}>
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        )
      }}
      panel={{
        data: <div>dskfj</div>,
        footer: (
          <Link to='/auth'>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </Link>
        )
      }}
    />
  )
}
