<?php

namespace App\Http\Controllers;

use Response;
use Exception;
use App\Secret;
use App\Helpers\Log;
use App\Helpers\Hashid;
use Illuminate\Http\Request;
use Mbarwick83\Shorty\Facades\Shorty;

class SecretsController extends Controller
{
    public function store(Request $request, Hashid $hashid, Log $log)
    {
        if (false === $request->has('payload')) {
            return Response::json([
                'message' => 'Payload required.',
            ], 400);
        }

        if (false === $request->has('fetch_code')) {
            return Response::json([
                'message' => 'Unlock code required.',
            ], 400);
        }

        $secret = new Secret;
        $secret->payload = $request->get('payload');
        $secret->fetch_code = $request->get('fetch_code');
        $secret->save();

        $token = $hashid->encode($secret->id);

        $url = route('view', [
            'token'       => $token,
            'fetch_code'  => $secret->fetch_code,
        ]);

        $log->entry(['Secret', $token, 'has been created']);

        return Response::json([
            'url'   => $url,
            'short' => Shorty::shorten($url),
        ]);
    }

    public function view(Hashid $hashid, Log $log, $uuid, $fetch_code)
    {
        $payload = null;

        try {
            $id = $hashid->decode($uuid);
            $secret = Secret::findOrFail($id);
            $payload = $secret->payload;
            $secret->delete();
        } catch (Exception $e) {
            return Response::json([
                'message' => 'Secret does not exist.',
            ], 410);
        }

        // Make sure the unlock code's match.
        if ($secret->fetch_code === $fetch_code) {
            $log->entry(['Secret', $uuid, 'has been extracted']);

            return Response::json([
                'payload' => $payload,
            ]);
        }

        $log->entry(['Secret', $uuid, 'failed extraction']);

        return Response::json([
            'message' => 'Secret failed to unlock and has been destroyed.',
        ], 422);
    }
}
