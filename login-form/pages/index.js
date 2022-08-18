import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { useIntl } from 'react-intl'
import { useCallback, useState } from 'react'
import Input from '../components/Input'
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { RequestMethod, StatusCode } from '../constants'

const Home = () => {
  const { formatMessage } = useIntl()
  const format = useCallback((id, values) => formatMessage({ id }, { ...values }))

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState()

  const { handleSubmit, register, formState: { errors } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldUnregister: true
  })

  const signIn = async (data) => {
    const { username, password } = data
    const options = {
      method: RequestMethod.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    }
    fetch('/api/auth/', options).then(({ status }) => {
      switch(status) {
        case StatusCode.OK:
          setIsLoggedIn(true)
          setUsername(username)
          toast(format('toast.signIn.success'))
          return
        case StatusCode.UNAUTHORIZED:
          toast(format('toast.signIn.failure'))
      }
    })
  }

  const signOut = () => {
    setIsLoggedIn(false)
    toast(format('toast.signOut.success'))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{format('app.title')}</title>
        <meta name='description' content={format('app.description')} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {isLoggedIn ? (
          <>
            <h1 className={styles.title}>
              <FormattedMessage id='welcome' values={{ username }} />
            </h1>
            <button onClick={signOut}>
              <FormattedMessage id='signOut' />
            </button>
          </>
        ) : (
          <>
            <h1 className={styles.title}>
              <FormattedMessage id='signIn' />
            </h1>
            <div className={styles.card}>
              <form onSubmit={handleSubmit(signIn)}>
                <div className={styles.grid}>
                  <div className='form-field'>
                    <Input
                      {...register('username', { required: format('validation.required') })}
                      placeholder={format('username')}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='username'
                      render={({ message }) => <p className='validation-error'>{message}</p>}
                    />
                  </div>
                  <div className='form-field'>
                    <Input
                      {...register('password', { required: format('validation.required') })}
                      type='password'
                      placeholder={format('password')}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='password'
                      render={({ message }) => <p className='validation-error'>{message}</p>}
                    />
                  </div>
                  <button type='submit'>
                    <FormattedMessage id='submit' />
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <a href='https://github.com/rstencel/'>
          <FormattedMessage id='app.author' />
        </a>
      </footer>
    </div>
  )
}

export default Home
