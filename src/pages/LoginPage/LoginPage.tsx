import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { CheckBox, Input, InputPassword } from '@common/fields'
import { IntlText, useIntl, useTheme } from '@features'
import { useForm } from '@utils'
import { api } from '@utils/api'
import { setCookie } from '@utils/helpers'
import { useMutation } from '@utils/hooks'

import styles from './LoginPage.module.css'

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required'
  return null
}

const validateUsername = (value: string) => validateIsEmpty(value)

const validatePassword = (value: string) => validateIsEmpty(value)

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword
}

interface User {
  username: string
  password: string
  id: string
}

interface FormValues {
  username: string
  password: string
  isNotMyDevice: boolean
}

export const LoginPage = () => {
  const { isLoading: authIsLoading, mutationAsync: authMutation } = useMutation<
    FormValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values))

  const { values, errors, setFieldValues, handleSubmit } = useForm<FormValues>({
    initialValues: {
      username: '',
      password: '',
      isNotMyDevice: false
    },
    validateSchema: loginFormValidateSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log('values', values)
      const response = await authMutation(values)
      if (response && values.isNotMyDevice) {
        setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000)
      }
      console.log(response)
    }
  })

  const { theme, setTheme } = useTheme()
  const { translateMessage } = useIntl()

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
            <CheckBox
              checked={values.isNotMyDevice}
              label={translateMessage('field.checkbox.isNotMyDevice.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked
                setFieldValues('isNotMyDevice', isNotMyDevice)
              }}
            />
          </div>
          <Button type='submit' isLoading={authIsLoading}>
            <IntlText path='button.signIn' values={{ test: 213124 }} />
          </Button>
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
