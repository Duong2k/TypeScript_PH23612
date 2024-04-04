import React from 'react'
import { User } from '~/common/User'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import instance from '~/apis'
import { useNavigate } from 'react-router-dom'
const userSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required().min(6)
})
const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    resolver: joiResolver(userSchema)
  })

  const onSubmit = (user: User) => {
    (async () => {
      const { data } = await instance.post('/register', user)
      console.log(data)
      if (data.accessToken) {
        window.confirm('Register success') && navigate('/login')
      }
    })()
  }
  return (
    <div className='flex flex-col items-center p-5'>
      <h1 className='text-2xl font-bold mb-5'>Register</h1>
      <form className='w-full max-w-lg' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='email'
            type='email'
            placeholder='Email...'
            {...register('email', { required: true, minLength: 3, maxLength: 100 })}
          />
          {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='password'
            type='password'
            placeholder='Password...'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
