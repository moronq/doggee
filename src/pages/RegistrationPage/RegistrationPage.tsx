import React from 'react'

import { FillLoginDataStep } from './wizards/steps/FillLoginDataStep/FillLoginDataStep'
import { FillProfileDataStep } from './wizards/steps/FillProfileDataStep/FillProfileDataStep'

export const RegistrationPage: React.FC = () => {
  const [step, setStep] = React.useState<'fillLoginData' | 'fillProfileData' | 'pets' | 'check'>(
    'fillLoginData'
  )

  return (
    <>
      {step === 'fillLoginData' && <FillLoginDataStep setStep={() => setStep('fillProfileData')} />}
      {step === 'fillProfileData' && <FillProfileDataStep setStep={() => setStep('pets')} />}
    </>
  )
}
