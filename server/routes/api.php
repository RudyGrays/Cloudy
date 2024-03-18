<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/checkToken', [AuthController::class, 'checkToken'])->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function (){
	Route::post('/files/access/{file_id}', [FileController::class, 'addAccessToFile']);
	Route::delete('/files/access/{file_id}', [FileController::class, 'deleteAccessToFile']);
	Route::post('/files', [FileController::class, 'uploadFiles']);
	Route::patch('/files/{file_id}', [FileController::class, 'updateFile']);
	Route::get('/files/disk', [FileController::class, 'getAllAccessFiles']);
	Route::get('/files/shared', [FileController::class, 'getNotMineFiles']);
	Route::get('/files/{file_id}', [FileController::class, 'downloadFile']);
	Route::delete('/files/{file_id}', [FileController::class, 'deleteFile']);
});