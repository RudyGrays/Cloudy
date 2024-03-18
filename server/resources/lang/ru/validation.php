<?php

return [
	'custom' => [
			'email' => [
					'unique' => 'Пользователь с такой почтой уже существует!',
					'email' => 'Неверный формат почты!'
			],
			'password' => [
					'required' => 'Введите пароль!',
					'min' => 'Пароль должен содержать минимум 2 символа!',
			],
			'first_name' => [
				'required' => 'Поле обязательно для заполнения!',
			],
			'last_name' => [
				'required' => 'Поле обязательно для заполнения!',
			]
	],
];