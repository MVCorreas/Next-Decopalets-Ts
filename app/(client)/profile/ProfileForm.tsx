/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
  image: FileList 
}

const ProfileForm = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session && session.user) {
      setValue('name', session.user.name!)
      setValue('email', session.user.email!)
    }
  }, [router, session, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password, image } = form
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    if (password) formData.append('password', password)
    if (image && image[0]) formData.append('image', image[0])

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        body: formData,
      })
      if (res.status === 200) {
        toast.success('Profile updated successfully')
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        }
        await update(newSession)
      } else {
        const data = await res.json()
        toast.error(data.message || 'error')
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message
      toast.error(error)
    }
  }

  return (
    <div className="card sm:card-side bg-base-100 shadow-xl mt-4 w-3/4 mx-auto">
      <figure className='w-1/2 p-8'>
        {preview ? (
          <img src={preview as string} alt="Profile" className='w-80 h-100 object-cover rounded-md'/>
        ) : (
          <img src="/assets/profileAvatar.jpeg" alt="Profile" className='w-80 h-100 object-cover rounded-md'/>
        )}
      </figure>

      <div className="card-body">
        <h1 className="card-title text-[#244999] text-2xl justify-center">Edit Profile</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Name is required',
              })}
              className="input input-bordered w-full max-w-2xl"
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Email is invalid',
                },
              })}
              className="input input-bordered w-full max-w-2xl"
            />
            {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {})}
              className="input input-bordered w-full max-w-2xl"
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                validate: (value) => {
                  const { password } = getValues()
                  return password === value || 'Passwords should match!'
                },
              })}
              className="input input-bordered w-full max-w-2xl"
            />
            {errors.confirmPassword?.message && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="image">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              {...register('image')}
              className="input input-bordered w-full max-w-2xl"
              onChange={handleImageChange}
            />
          </div>
          <div className="my-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full bg-[#244999] hover:bg-[#2B5F9E] text-white md:text-md sm:text-sm"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm
