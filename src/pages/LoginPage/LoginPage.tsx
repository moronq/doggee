import React from 'react'

import { Input } from '../../common/fields'

import './LoginPage.css'

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({ username: '213', password: '435' })

  return (
    <div className='login_page'>
      <div className='login_page_container'>
        <div>header</div>
        <div className='login_page_form_container'>
          <div className='login_page_input_container'>
            <Input value={formValues.username} />
            <span>validation</span>
          </div>
          <div className='login_page_input_container'>
            <Input value={formValues.password} />
          </div>
          <div>
            <button>sign in</button>
          </div>
        </div>
      </div>
    </div>
  )
}
