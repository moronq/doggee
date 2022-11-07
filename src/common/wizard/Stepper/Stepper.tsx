import React from 'react'

import styles from './Stepper.module.css'

interface StepperProps {
  activeStep: number
  stepLables: string[]
}

export const Stepper: React.FC<StepperProps> = ({ activeStep, stepLables }) => (
  <div className={styles.steps_container}>
    {stepLables.map((label, index) => {
      const stepNumber = index + 1
      return (
        <div key={index} className={styles.step_container}>
          <div
            className={`${styles.step_index_container} ${
              stepNumber === activeStep ? styles.active_step_index_container : ''
            } ${stepNumber === stepLables.length ? styles.last_step_index_container : ''}`}
          >
            {stepNumber === stepLables.length ? '' : stepNumber}
          </div>
          <div className={styles.step_label_container}>{label}</div>
        </div>
      )
    })}
  </div>
)
