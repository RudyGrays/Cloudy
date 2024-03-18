<?php

namespace App\Http\Controllers;

use App\Models\FileAccess;
use App\Models\UserFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function uploadFiles(Request $request){
        $files = $request->file('files');

        $uploadedFiles = [];

        if(!$request->hasFile('files')){
            return response()->json(['success' => false, 'message' => ['Добавьте файлы!']], 422);
        }

        foreach($files as $file){
            $fileName = $file->getClientOriginalName();
            $allowedExtensions = ['doc','png','jpeg','pdf','docx','zip','jpg'];
            $fileExtension = $file->getClientOriginalExtension();

            if($file->getSize() > 1024 * 2 * 1024 ){
                $uploadedFiles[] = [
                    'success' => false,
                    'message' => ['File not loaded'],
                    'name' => $fileName
                ];
                continue;
            }

            if(!in_array($fileExtension, $allowedExtensions)){
                $uploadedFiles[] = [
                    'success' => false,
                    'message' => ['File not loaded'],
                    'name' => $fileName
                ];
                continue;
            }
            
            $fileId = bin2hex(random_bytes(5));
            $baseName = pathinfo($fileName, PATHINFO_FILENAME);
            

            $existingFilesCountAfterOne = UserFile::where('file_name', 'like', $baseName . '(%')->count();
            $existingFilesCountBeforeOne = UserFile::where('file_name', $fileName)->count();

            if($existingFilesCountBeforeOne > 0 && $existingFilesCountAfterOne == 0){
                $fileName = $this->generateNewFileName($fileName, $existingFilesCountBeforeOne, $fileExtension);
            }
            if($existingFilesCountAfterOne == 1){
                $fileName = $this->generateNewFileName($fileName, 2, $fileExtension);
            }
            if($existingFilesCountAfterOne > 1){
                $fileName = $this->generateNewFileName($fileName, $existingFilesCountAfterOne + 1, $fileExtension);
            }

            $url = config('app.url') . '/api' . '/' . $fileId;

            $uploadedFiles[] = [
                'success' => true,
                'message' => ['File loaded'],
                'name' => $fileName,
                'url' => $url,
                'file_id'=>$fileId
            ];

            $filePath = Storage::disk('public')->put('files', $file);

            $file = UserFile::create([
                'file_id' => $fileId,
                'file_name'=> $fileName,
                'file_path' => $filePath,
                'user_id' => auth()->user()->id
            ]);
            $access = FileAccess::create([
                'user_id'=> auth()->user()->id,
                'file_id' => $fileId,
                'type' => 'author'
            ]);

        }
        return response()->json(['success' => true, 'message' => $uploadedFiles], 200);
    }

    private function generateNewFileName($originalName, $count, $extension)
    {
        $baseName = pathinfo($originalName, PATHINFO_FILENAME);
        return $baseName . '(' . $count . ').' . $extension;
    }

    public function updateFile(Request $request, $file_id){
        
        $file = UserFile::where('file_id', $file_id)->first();
        
        if(!$file) return response()->json(['success' => false, 'message' => ['File does not exist']], 400);
        if(!isset($request->fileName)) return response()->json(['success' => false, 'message' => 'Name'], 400);
        if($file->user_id != auth()->user()->id) return response()->json(['success' => false, 'message' => ['Access denied']], 422);

        $baseName = $request->fileName; 
        $prevFileName = $file->file_name;
        
        $fileExtension = pathinfo($prevFileName, PATHINFO_EXTENSION);
       
        $fileName = $baseName . '.' . $fileExtension;
        $existingFilesCountAfterOne = UserFile::where('file_name', 'like', $baseName . '(%')->count();
        $existingFilesCountBeforeOne = UserFile::where('file_name', $fileName)->count();
        $foundedFile = UserFile::where('file_name', $fileName)->first();

        if($existingFilesCountBeforeOne > 0 && $existingFilesCountAfterOne == 0 && $file->file_id != $foundedFile->file_id){
            $fileName = $this->generateNewFileName($fileName, $existingFilesCountBeforeOne, $fileExtension);
        }
        if($existingFilesCountAfterOne == 1){
            $fileName = $this->generateNewFileName($fileName, 2, $fileExtension);
        }
        if($existingFilesCountAfterOne > 1){
            $fileName = $this->generateNewFileName($fileName, $existingFilesCountAfterOne + 1, $fileExtension);
        }

        $file->file_name = $fileName;
        $file->save();
        return response()->json(['success' => true, 'message' => ['File renamed', $fileName]], 200);
    }

    public function deleteFile($file_id){
        $file = UserFile::where('file_id', $file_id)->first();
        if(!$file) return response()->json(['success' => false, 'message' => ['File does not exist']], 422);
        if(!$file) return response()->json(['success' => false, 'message' => ['File does not exist']], 422);
        
        if($file->user_id != auth()->user()->id) return response()->json(['success' => false, 'message' => ['Access denied']], 422);
        $accesses = FileAccess::where('file_id', $file->file_id)->get();
        Storage::disk('public')->delete($file->file_path);

        foreach($accesses as $access){
            $access->delete();
        }

        $file->delete();
        
        return response()->json(['success' => true, 'message' => ['File deleted']]);
    }
    public function downloadFile($file_id){
        $userId = auth()->user()->id;
        $file = UserFile::where('file_id', $file_id)->first();
        if(!$file) return response()->json(['success' => false, 'message' => ['File does not exist']], 422);

        $access = FileAccess::where('file_id', $file_id)->where('user_id', $userId)->first();
        if(!$access) return response()->json(['success' => false, 'message' => ['Access denied']], 422);
        
        return Storage::download($file->file_path, $file->file_name);
    }

    public function getAllAccessFiles(){
        $userId = auth()->user()->id;
        $accessFiles = FileAccess::where('user_id', $userId)->where('type', 'author')->get();
        if(!$accessFiles) return response()->json(['success' => false, 'message' => 'Files does not exist'], 422);
        
        $response = collect($accessFiles)->map(function($access){
            $file = UserFile::where('file_id',$access->file_id)->first();
            $user = User::find($file->user_id);
            $accesses = FileAccess::where('file_id', $access->file_id)->where('type', 'co-author')->get();
            return [
                'file_id' => $file->file_id,
                'file_name' => $file->file_name,
                'author' => $user->email,
                'accesses' => collect($accesses)->map(function ($item) use ($file){
                    $user = User::where('id', $item->user_id)->first();
                    $fullname = $user->first_name . $user->last_name;
                    $email = $user->email;
                    $type = $item->type;
                    return [
                        'fullname' => $fullname,
                        'email' => $email,
                        'type' => $type,
                    ];
                })->toArray()
            ];
        })->toArray();
        return response()->json(['success' => true, 'message' => $response], 200 );
    }


    public function addAccessToFile(Request $request, $file_id){
        $file = UserFile::where('file_id', $file_id)->first();
        $authorUserId = $file->user_id;
        $currentUserId = auth()->user()->id;
        $forUserId = User::where('email', $request->email)->first()->id;
        $access = FileAccess::where('user_id', $forUserId)->where('file_id', $file->file_id)->first();
        if($currentUserId != $authorUserId && $forUserId == $authorUserId) return response()->json(['success' => false, 'message' => ['Access denied']], 422);
        if($access) return response()->json(['success' => false, 'message' => ['Access exist']], 422);
        if(!$file || !$forUserId) return response()->json(['success' => false, 'message' =>['File or user does not exist']], 422);
        
        $access = FileAccess::create([
            'user_id' => $forUserId,
            'file_id' => $file->file_id,
            'type' => 'co-author'
        ]);

        $userAccesses = FileAccess::where('file_id', $file->file_id)->get();

        $response = collect($userAccesses)->map(function ($access){
            $user = User::where('id', $access->user_id)->first();
            $fullname = $user->first_name . $user->last_name;
            $email = $user->email;
            $type = $access->type;
            return [
                'fullname' => $fullname,
                'email'=> $email,
                'type' => $type,
            ];
        })->toArray();

        return response()->json(['success' => true, 'message' => $response], 200);
    }

    public function deleteAccessToFile(Request $request, $file_id){
        $file = UserFile::where('file_id', $file_id)->first();
        $authorUserId = $file->user_id;
        $currentUserId = auth()->user()->id;
        $forUserId = User::where('email', $request->email)->first()->id;
        $access = FileAccess::where('user_id', $forUserId)->where('file_id', $file->file_id)->first();

        if($currentUserId != $authorUserId || $forUserId == $authorUserId) return response()->json(['success' => false, 'message' => ['Access denied']], 422);
        if(!$access) return response()->json(['success' => false, 'message' => ['Access does not exist']], 422);
        if(!$file || !$forUserId) return response()->json(['success' => false, 'message' =>['File or user does not exist']], 422);

        $access->delete();

        $userAccesses = FileAccess::where('file_id', $file->file_id)->get();

        $response = collect($userAccesses)->map(function ($access){
            $user = User::where('id', $access->user_id)->first();
            $fullname = $user->first_name . $user->last_name;
            $email = $user->email;
            $type = $access->type;
            return [
                'fullname' => $fullname,
                'email'=> $email,
                'type' => $type,
            ];
        })->toArray();

        return response()->json(['success' => true, 'message' => $response]);

    }


    public function getNotMineFiles(Request $request){
        $userId = auth()->user()->id;
        $accesses = FileAccess::where('user_id', $userId)->where('type', 'co-author')->get();
        if(!$accesses) return response()->json(['success' => false, 'message' => ['Files does not exist']], 422);
        $response = collect($accesses)->map(function ($access){
            $file = UserFile::where('file_id', $access->file_id)->first();
            $authorId = FileAccess::where('file_id', $file->file_id)->where('type', 'author')->first()->user_id;
            $author = User::where('id', $authorId)->first();
            $fileId = $file->file_id;
            $url = config('app.url') . '/api' . '/' . $fileId;
            $name = $file->file_name;
            return [
                'type' => $access->type,
                'name'=> $name,
                'file_id' => $fileId,
                'url' => $url,
            ];
        })->toArray();

        return response()->json(['success' => true, 'message' => $response]);
    }
}
