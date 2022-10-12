import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { Input, InputPassword } from '@common/fields'
import { IntlText, useIntl } from '@features'
import { useForm } from '@utils'

import styles from './RegistrationPage.module.css'

interface RegistrationFormValues {
  username: string
  password: string
  passwordAgain: string
}

interface RegistrationRulesProps {
  password: string
  passwordAgain: string
}

export const RegistrationRules: React.FC<RegistrationRulesProps> = ({
  password,
  passwordAgain
}) => {
  const [rules, setRules] = React.useState({
    containNumbers: true,
    containUpercase: true,
    containLowercase: true,
    contain8Characters: true
  })
  return (
    <div className={styles.panel_data}>
      <div>Password must:</div>
      <div>
        contain <span className={styles.password_correct_rule}>numbers</span>
      </div>
      <div>
        contain <span className={styles.password_incorrect_rule}>uppercase</span> letter
      </div>
      <div>
        contain <span className={styles.password_incorrect_rule}>lowercase</span> letter
      </div>
      <div>
        contain at least <span className={styles.password_incorrect_rule}>8</span> characters
      </div>
      <div>
        password must <span className={styles.password_incorrect_rule}>match</span>
      </div>
    </div>
  )
}

export const RegistrationPage: React.FC = () => {
  const { values, errors, setFieldValues, handleSubmit } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: ''
    }
  })
  const { translateMessage } = useIntl()

  const authIsLoading = false

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
                disabled={authIsLoading}
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
                disabled={authIsLoading}
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
                disabled={authIsLoading}
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
            <Button type='submit' isLoading={authIsLoading}>
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        </div>
        <div className={styles.panel_container}>
          <div className={styles.panel_header}>doggee</div>
          <RegistrationRules password={values.password} passwordAgain={values.passwordAgain} />
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
