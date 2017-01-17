<?php

namespace App\Http\Controllers;

use Exception;
use App\Secret;
use App\Helpers\Hashid;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function index(Hashid $hashid, $uuid, $fetch_code)
    {
        $destroyed = true;

        try {
            $id = (int) $hashid->decode($uuid);
            $secret = Secret::findOrFail($id);

            // If they don't match, bail out.
            if ($secret->fetch_code !== $fetch_code) {
                throw new Exception;
            }

            $destroyed = false;
        } catch (Exception $e) {
            // As we already assume that this secret has been destroyed or
            // never existed by default, this does not require logic.
        }

        return view('view', compact('destroyed', 'uuid', 'fetch_code'));
    }
}
