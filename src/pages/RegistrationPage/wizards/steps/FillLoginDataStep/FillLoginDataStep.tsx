import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { Input, InputPassword } from '@common/fields'
import { IntlText, useIntl, useMutation } from '@features'
import { PasswordRules, validateIsEmpty } from '@pages'
import { createRegistration, useForm, useStore } from '@utils'

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer'

import styles from './FillLoginDataStep.module.css'

interface RegistrationFormValues {
  username: string
  password: string
  passwordAgain: string
}

interface FillLoginDataStepProps {
  nextStep: () => void
}

const registrationFormValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value)
}

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({ nextStep }) => {
  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation(
    'createRegistration',
    (params: RegistrationReqPostParams) => createRegistration({ params })
  )

  const { translateMessage } = useIntl()
  const { setStore } = useStore()

  const { values, errors, setFieldValues, handleSubmit } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: ''
    },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const response = await registrationMutation({
        password: values.password,
        username: values.username
      })
      if (!response.success) return
      setStore({ user: response.data })
      nextStep()
    }
  })

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
              <InputPassword
                disabled={registrationLoading}
                isError={!!errors?.passwordAgain}
                helperText={errors?.passwordAgain ?? undefined}
                value={values.passwordAgain}
                label={translateMessage('field.input.passwordAgain.label')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const passwordAgain = e.target.value
                  setFieldValues('passwordAgain', passwordAgain)
                }}
              />
            </div>
            <Button type='submit' isLoading={registrationLoading}>
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        )
      }}
      panel={{
        data: (
          <PasswordRules
            password={values.password}
            passwordAgain={values.passwordAgain}
            hasPasswordErrors={!!errors?.password}
          />
        ),
        footer: (
          <Link to='/auth'>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </Link>
        )
      }}
    />
  )
}
