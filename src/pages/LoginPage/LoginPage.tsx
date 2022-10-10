import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { CheckBox, Input, InputPassword } from '@common/fields'
import { IntlText, useTheme } from '@features'
import { api } from '@utils/api'
import { setCookie } from '@utils/helpers'
import { useMutation } from '@utils/hooks'

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

interface User {
  username: string
  password: string
  id: string
}

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    isNotMyDevice: false
  })
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: null | string }>({
    username: null,
    password: null
  })

  const { isLoading: authIsLoading, mutationAsync: authMutation } = useMutation<
    typeof formValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values))

  const { theme, setTheme } = useTheme()
  console.log(theme)

  return (
    <div className={styles.page}>
      <button
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
      >
        change theme
      </button>
      <div className={styles.container}>
        <div className={styles.header_container}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const response = await authMutation(formValues)
            if (response && formValues.isNotMyDevice) {
              setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000)
            }
          }}
        >
          <div className={styles.input_container}>
            <Input
              disabled={authIsLoading}
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
              disabled={authIsLoading}
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
              checked={formValues.isNotMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked
                setFormValues({ ...formValues, isNotMyDevice })
              }}
            />
          </div>
          <div>
            <Button type='submit' isLoading={authIsLoading}>
              <IntlText path='button.signIn' values={{ test: 213124 }} />
            </Button>
          </div>
        </form>
        <div className={styles.sign_up_container}>
          <Link to='/registration'>
            <IntlText path='page.login.createNewAccount' />
          </Link>
        </div>
      </div>
    </div>
  )
}
