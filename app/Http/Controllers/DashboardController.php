<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function dashboardSirupat()
  {
    $pageConfigs = ['pageHeader' => false];

    return view('/content/dashboard/dashboard-sirupat', ['pageConfigs' => $pageConfigs]);
  }
}
