import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { IntlProvider } from '@features'
import { LoginPage, NotFoundPage, RegistrationPage } from '@pages'
import { deleteCookie, getCookie, getLocale, getMessages } from '@utils/helpers'

import './App.css'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/auth' element={<LoginPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='*' element={<Navigate to='/auth' />} />
    </Routes>
  )
}

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [messages, setMessages] = React.useState<Record<string, string>>({})

  const locale = getLocale()

  React.useEffect(() => {
    const authCookie = getCookie('doggee-auth-token')
    const isNotMyDevice = getCookie('doggee-isNotMyDevice')

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(isNotMyDevice).getTime()

    if (authCookie && deviceExpire) {
      deleteCookie('doggee-auth-token')
      deleteCookie('doggee-isNotMyDevice')
    }
    if (authCookie && !isNotMyDevice) {
      setIsAuth(true)
    }
    getMessages(locale).then((messages) => {
      setMessages(messages)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return null

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
    </IntlProvider>
  )
}

export default App
