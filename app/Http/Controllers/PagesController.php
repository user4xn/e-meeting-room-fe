<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function settings()
    {
        $pageConfigs = [
            'pageHeader' => false
        ];
        return view('/content/pages/page-settings', ['pageConfigs' => $pageConfigs]);
    }
}
