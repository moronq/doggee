import { DateInput, Input, Select } from '@common/fields'
import { useIntl, useQuery } from '@features'
import { requestBreeds, useForm } from '@utils'
import { validateIsEmpty } from 'pages/LoginPage/LoginPage'
import React from 'react'

import styles from '../../FillProfileDataStep/FillProfileDataStep.module.css'

interface PetFormValues {
  dogName: string
  dogWeight: string
  breed: Breed
  digBirthday: Date
}

interface PetFormProps {
  pet: Pet
  isLoading: boolean
  onChange: (field: keyof PetFormValues, values: PetFormValues[keyof PetFormValues]) => void
}

const petFormValidationSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value)
}

export const PetForm: React.FC<PetFormProps> = ({ pet, isLoading, onChange }) => {
  const intl = useIntl()

  const { data: breedsData } = useQuery('breeds', () => requestBreeds({ params: null }), {
    cacheTime: 300000
  })

  const { values, errors, setFieldValues, handleSubmit, resetForm } = useForm<PetFormValues>({
    initialValues: pet,
    validateSchema: petFormValidationSchema,
    validateOnChange: false
    // onSubmit: async (values) => {
    // const response = await profileMutation(values)
    // if (!response?.success) return
    // setStore({ user: response.data })
    //   nextStep(pets)
    // }
  })

  React.useEffect(() => {
    resetForm(pet)
  }, [pet.id])

  const WeightIcon = React.useCallback(() => <div className={styles.weight_postfix}>kg</div>, [])

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <Input
          disabled={isLoading}
          value={values.dogName}
          label={intl.translateMessage('field.input.dogName.label')}
          // onFocus={() => setCurrentField('dogName')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const dogName = e.target.value
            setFieldValues('dogName', dogName)
          }}
          {...(!!errors &&
            !!errors.dogName && { isError: !!errors.dogName, helperText: errors.dogName })}
        />
      </div>
      <div className={styles.input_container}>
        <Select
          value={values.breed}
          label={intl.translateMessage('field.input.breed.label')}
          options={
            breedsData?.map((breed) => ({
              label: breed.name,
              id: breed.id,
              value: breed
            })) ?? []
          }
          onChange={(option) => {
            setFieldValues('breed', option)
          }}
        />
      </div>
      <div className={styles.input_container}>
        <DateInput
          disabled={isLoading}
          label={intl.translateMessage('field.input.dogBirthday.label')}
          value={values.dogBirthday}
          onChange={(date) => {
            setFieldValues('dogBirthday', date)
          }}
          {...(!!errors &&
            !!errors.dogBirthday && {
              isError: !!errors.dogBirthday,
              helperText: errors.dogBirthday
            })}
        />
      </div>
      <div className={styles.input_container}>
        <Input
          disabled={isLoading}
          value={values.dogWeight}
          label={intl.translateMessage('field.input.dogWeight.label')}
          // onFocus={() => setCurrentField('dogName')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const dogWeight = e.target.value
            setFieldValues('dogWeight', dogWeight)
          }}
          {...(!!errors &&
            !!errors.dogWeight && {
              isError: !!errors.dogWeight,
              helperText: errors.dogWeight
            })}
        />
      </div>
    </form>
  )
}
