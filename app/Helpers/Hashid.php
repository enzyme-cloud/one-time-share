<?php

namespace App\Helpers;

use Config;
use Exception;
use Hashids\Hashids;

class Hashid
{
    protected $hashids;

    public function __construct()
    {
        $this->hashids = new Hashids(Config::get('ots.hashid_seed'), 16);
    }

    public function encode($data)
    {
        return $this->hashids->encode($data);
    }

    public function decode($data)
    {
        $data = $this->hashids->decode($data);

        if ($data === '' || count($data) < 1) {
            throw new Exception('Hashid could not be decoded.');
        }

        return $data[0];
    }
}
