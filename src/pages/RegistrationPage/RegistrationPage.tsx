import React from 'react'

import { FillLoginDataStep } from './wizards/steps/FillLoginDataStep/FillLoginDataStep'
import { FillProfileDataStep } from './wizards/steps/FillProfileDataStep/FillProfileDataStep'

export const RegistrationPage: React.FC = () => {
  const [step, setStep] = React.useState<
    'fillLoginData' | 'fillProfileData' | 'addPetsData' | 'check'
  >('fillLoginData')

  return (
    <>
      {step === 'fillLoginData' && (
        <FillLoginDataStep nextStep={() => setStep('fillProfileData')} />
      )}
      {step === 'fillProfileData' && (
        <FillProfileDataStep nextStep={() => setStep('addPetsData')} />
      )}
      {step === 'addPetsData' && <FillProfileDataStep nextStep={() => setStep('check')} />}
    </>
  )
}
