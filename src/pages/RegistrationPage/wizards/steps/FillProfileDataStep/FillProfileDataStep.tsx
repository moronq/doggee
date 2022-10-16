import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { DateInput, Input, InputPassword, Select } from '@common/fields'
import { IntlText, useIntl } from '@features'
import { validateIsEmpty } from '@pages'
import { api, useForm, useMutation, useStore } from '@utils'

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer'

import styles from './FillProfileDataStep.module.css'

interface ProfileFormValues {
  name: string
  registrationAddress: string
  birthDate: Date
}

interface FillProfileDataStepProps {
  nextStep: () => void
}

const profileFormValidateSchema = {
  name: (value: string) => validateIsEmpty(value),
  registrationAddress: (value: string) => validateIsEmpty(value),
  birthDate: (value: string) => validateIsEmpty(value)
}

type Steps = 'name' | 'registrationAddress' | 'birthDate' | 'test' | null

interface FillProfilePanelDataProps {
  focusedField: Steps
}

const FillProfilePanelData: React.FC<FillProfilePanelDataProps> = ({ focusedField }) => {
  if (!focusedField) return null
  return (
    <div>
      {focusedField === 'registrationAddress' && (
        <div>
          We want to know your address so that we can suggest good places for walks with your pet,
          the nearest veterinary clinics, etc.
        </div>
      )}
      {focusedField === 'birthDate' && <div>birthDate</div>}
      {focusedField === 'name' && <div>name</div>}
      {focusedField === 'test' && <div>test</div>}
    </div>
  )
}

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({ nextStep }) => {
  const { setStore, user } = useStore()
  const [currentField, setCurrentField] = React.useState<Steps>(null)

  const { mutationAsync: profileMutation, isLoading: profileLoading } = useMutation<
    ProfileFormValues,
    ApiResponse<User>
  >((values) => api.put(`users/${user?.id}`, values))

  const { values, errors, setFieldValues, handleSubmit } = useForm<ProfileFormValues>({
    initialValues: {
      name: '',
      registrationAddress: '',
      birthDate: new Date(new Date().getTime())
    },
    // validateSchema: profileFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const response = await profileMutation(values)
      if (!response?.success) return
      setStore({ user: response.data })
      nextStep()
    }
  })
  const { translateMessage } = useIntl()

  return (
    <RegistrationWizardContainer
      activeStep={1}
      form={{
        title: <IntlText path='page.registration.fillYourLoginData' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <Input
                disabled={profileLoading}
                value={values.name}
                label={translateMessage('field.input.name.label')}
                onFocus={() => setCurrentField('name')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const username = e.target.value
                  // setFieldValues('username', username)
                }}
              />
            </div>
            <div className={styles.input_container}>
              <Input
                disabled={profileLoading}
                value={values.name}
                label={translateMessage('field.input.registrationAddress.label')}
                onFocus={() => setCurrentField('registrationAddress')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const username = e.target.value
                  // setFieldValues('username', username)
                }}
              />
            </div>
            <div className={styles.input_container}>
              <DateInput
                disabled={profileLoading}
                label={translateMessage('field.input.birthDay.label')}
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
              {/* <Select
                disabled={profileLoading}
                label='data'
                option={{ label: values.test, option: values.test, value: values.test }}
                onChange={(option) => {
                  setFieldValues('test', option)
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
                  })}
              /> */}
            </div>
            <Button type='submit' isLoading={profileLoading}>
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        )
      }}
      panel={{
        data: <FillProfilePanelData focusedField={currentField} />,
        footer: (
          <Link to='/auth'>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </Link>
        )
      }}
    />
  )
}
