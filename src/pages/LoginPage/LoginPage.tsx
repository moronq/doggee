import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { CheckBox, Input, InputPassword } from '@common/fields'

import styles from './LoginPage.module.css'

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required'
  return null
}

const validateUsername = (value: string) => {
  return validateIsEmpty(value)
}
const validatePassword = (value: string) => {
  return validateIsEmpty(value)
}

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword
}

const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value)
}

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    notMyComputer: false
  })
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: null | string }>({
    username: null,
    password: null
  })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header_container}>DOGGEE</div>
        <div className={styles.form_container}>
          <div className={styles.input_container}>
            <Input
              isError={!!formErrors.username}
              helperText={formErrors.username ?? undefined}
              value={formValues.username}
              label='username'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const username = e.target.value
                setFormValues({ ...formValues, username })
                const error = validateLoginForm('username', username)
                setFormErrors({ ...formErrors, username: error })
              }}
            />
          </div>
          <div className={styles.input_container}>
            <InputPassword
              isError={!!formErrors.password}
              helperText={formErrors.password ?? undefined}
              value={formValues.password}
              label='password'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const password = e.target.value
                setFormValues({ ...formValues, password })
                const error = validateLoginForm('password', password)
                setFormErrors({ ...formErrors, password: error })
              }}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              checked={formValues.notMyComputer}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyComputer = event.target.checked
                setFormValues({ ...formValues, notMyComputer })
              }}
            />
          </div>
          <div>
            <Button>Sign in</Button>
          </div>
        </div>
        <div className={styles.sign_up_container}>
          <Link to='/registration'>Create new account</Link>
        </div>
      </div>
    </div>
  )
}
