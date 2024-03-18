<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class FileAccess extends Model
{
    use HasFactory;

    protected $fillable = ['file_id', 'user_id', 'type'];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public static function getUsersWithAccessToFile($file_id) {
        return static::where('file_id', $file_id)->with('user')->get()->pluck('user'); 
    }

    public static function getFiles($user_id) {
        return static::where('user_id', $user_id)->with('userFile')->get()->pluck('userFile'); 
    }
}
