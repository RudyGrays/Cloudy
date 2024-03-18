<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function register(Request $request){
        $rules = [
            'email' => ['required', 'unique:users,email', 'email'],
            'first_name' => ['required', 'string', 'max:45'],
            'last_name' => ['required', 'string', 'max:45'],
            'password' => ['required', 'string', 'max:50', 'min:2'],
        ];

        $messages = [
            'email.required' => 'Введите почту!',
            'email.unique' => 'Пользователь с такой почтой уже существует!',
            'email.email' => 'Введите почту в правильном формате!',
            'first_name.required' => 'Введите имя!',
            'first_name.max' => 'Максимум 45 символов!',
            'last_name.required' => 'Введите фамилию!',
            'last_name.max' => 'Максимум 45 символов!',
            'password.required' => 'Введите пароль!',
            'password.min' => 'Минимум 2 символа!',
            'password.max' => 'Максимум 50 символов!',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $formattedErrors = [];

            foreach ($errors as $field => $messages) {
                foreach ($messages as $message) {
                    $formattedErrors[$field][] = "$message";
                }
            }

            return response()->json([
                'success' => false,
                'message' => $formattedErrors,
            ], 422);
        }

        
        $newUser = User::create([
            'first_name'=> $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $newUser->createToken(config('app.secret_key'))->plainTextToken;


        return response()->json(['success'=> true, 'token'=> $token], 200);
    }

    public function login(Request $request){
        $rules = [
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'max:50', 'min:2'],
        ];

        $messages = [
            'email.required' => 'Введите почту!',
            'email.unique' => 'Пользователь с такой почтой уже существует!',
            'email.email' => 'Введите почту в правильном формате!',
            'password.required' => 'Введите пароль!',
            'password.min' => 'Минимум 2 символа!',
            'password.max' => 'Максимум 50 символов!',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $formattedErrors = [];

            foreach ($errors as $field => $messages) {
                foreach ($messages as $message) {
                    $formattedErrors[$field][] = "$message";
                }
            }

            return response()->json([
                'success' => false,
                'message' => $formattedErrors,
            ], 422);
        }

        $user = User::where('email', $request->email)->first(); 

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['success'=> false, 'message'=> ['login or password incorrect']], 422);
        }

        $token = $user->createToken(config('app.secret_key'))->plainTextToken;

        
        return response()->json(['success'=> true, 'token'=> $token, 'userDTO' => $user], 200);
    }


    public function logout(Request $request){
        try{
            auth()->user()->tokens()->delete();
        }catch(\Throwable $e){
            return response(['success' => false, 'message' => ['logout failed']]);
        }

        return response(['success' => true, 'message'=> ['logged out']]);
    }

    
    public function checkToken(Request $request){
        $user = $request->user();
        auth()->user()->tokens()->delete();
        return response(['userDTO' => $user, 'token' =>  $user->createToken('secret123')->plainTextToken, 'message' => ['Success']], 200);
       
    }
    
}
