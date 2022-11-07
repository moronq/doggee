import React from 'react'

import { Button } from '@common/buttons'
import { Stepper } from '@common/wizard'
import { IntlText } from '@features'

import styles from './RegistrationWizardContainer.module.css'

interface RegistrationWizardContainerProps {
  activeStep?: number
  form: {
    title: React.ReactNode | string
    backButton?: React.ReactNode
    content: React.ReactNode
  }
  panel: {
    footer: React.ReactNode
    data: React.ReactNode
  }
}

export const RegistrationWizardContainer: React.FC<RegistrationWizardContainerProps> = ({
  form,
  panel,
  activeStep
}) => (
  <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.header_container}>
        <h1 className={styles.form_title}>{form.title}</h1>
        {activeStep && (
          <div className={styles.stepper_container}>
            <Stepper activeStep={activeStep} stepLables={['Your profile', 'Your pets', 'Woof!']} />
          </div>
        )}
        {form.backButton && <div className={styles.back_container}>{form.backButton}</div>}
        {form.content}
      </div>
      <div className={styles.panel_container}>
        <div className={styles.panel_header}>doggee</div>
        {panel.data && <div className={styles.panel_data}>{panel.data}</div>}
        <div className={styles.panel_footer}>{panel.footer}</div>
      </div>
    </div>
  </div>
)
