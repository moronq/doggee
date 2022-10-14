import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { Calendar } from '@common/Calendar'
import { DateInput, Input, InputPassword } from '@common/fields'
import { IntlText, useIntl } from '@features'
import { PasswordRules, validateIsEmpty } from '@pages'
import { api, useForm, useMutation } from '@utils'

import styles from '../../RegistrationPage.module.css'

interface RegistrationFormValues {
  username: string
  password: string
  passwordAgain: string
  birthDate: string
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
      birthDate: ''
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
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <h1 className={styles.form_title}>
            <IntlText path='page.registration.fillYourLoginData' />
          </h1>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const birthDate = e.target.value
                  setFieldValues('birthDate', birthDate)
                }}
              />
            </div>
            <Button type='submit' isLoading={registrationLoading}>
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        </div>
        <div className={styles.panel_container}>
          <div className={styles.panel_header}>doggee</div>
          <div className={styles.panel_data}>12312</div>
          <div className={styles.panel_have_account}>
            <Link to='/auth'>
              <IntlText path='page.registration.iAlreadyHaveAnAccount' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
