import React from 'react'
import { register } from '../../../../store/asyncActionCreators/authCreator'
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

function Register() {
	const firstName = useInput('')
	const lastName = useInput('')
	const email = useInput('')
	const password = useInput('')

	const dispatch = useAppDispatch()
	const { isLoading, errors } = useAppSelector(state => state.authReducer)
	const submitForm = e => {
		e.preventDefault()
		dispatch(
			register(firstName.value, lastName.value, email.value, password.value)
		)
	}

	return (
		<form
			onSubmit={submitForm}
			className=' bg-[#2c2c2c] h-min p-4 px-[50px] flex flex-col rounded-xl gap-2 min-w-[30%]'
		>
			<LabeledInput text='Имя'>
				<MyInput
					{...firstName}
					placeholder={'Введите имя...'}
					type={'text'}
					errorVariant={'first_name'}
				/>
			</LabeledInput>
			<LabeledInput text='Фамилия'>
				<MyInput
					{...lastName}
					placeholder={'Введите фамилию...'}
					type={'text'}
					errorVariant={'last_name'}
				/>
			</LabeledInput>
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
				Зарегистрироваться
			</Button>
		</form>
	)
}

export default Register
