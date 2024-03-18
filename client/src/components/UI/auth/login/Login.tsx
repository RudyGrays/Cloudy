import React from 'react'
import { login } from '../../../../store/asyncActionCreators/authCreator'
import {
	Button,
	InputErrors,
	LabeledInput,
	MyInput,
} from '../../../componentsStore'
import {
	useAppDispatch,
	useAppSelector,
} from '../../../helpers/hooks/storeHooks'
import useInput from '../../../helpers/hooks/useInput'

function Login() {
	const firstName = useInput('')
	const lastName = useInput('')
	const email = useInput('')
	const password = useInput('')

	const dispatch = useAppDispatch()
	const { isLoading, errors } = useAppSelector(state => state.authReducer)
	const submitForm = e => {
		e.preventDefault()
		dispatch(login(email.value, password.value))
	}

	return (
		<form
			onSubmit={submitForm}
			className=' h-min bg-[#2c2c2c] p-4 px-[50px] flex flex-col rounded-xl gap-2 min-w-[30%]'
		>
			<LabeledInput text='Почта'>
				<MyInput
					{...email}
					placeholder={'Введите почту...'}
					type={'email'}
					errorVariant={'email'}
				/>
			</LabeledInput>
			<LabeledInput text='Пароль'>
				<MyInput
					{...password}
					placeholder={'Введите пароль...'}
					type={'password'}
					errorVariant={'password'}
				/>
			</LabeledInput>
			{!!errors && Array.isArray(errors) && <InputErrors errors={errors} />}
			<Button style={{ marginTop: '10px' }} type='submit'>
				Войти
			</Button>
		</form>
	)
}

export default Login
