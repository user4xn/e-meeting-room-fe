<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MiscellaneousController extends Controller
{
  public function room_scan($id)
  {
    $pageConfigs = ['blankPage' => true];

    return view('/content/miscellaneous/page-room-scan', ['pageConfigs' => $pageConfigs, 'room_id' => $id]);
  }
  
  public function room_schedule($id = '')
  {
    $pageConfigs = ['blankPage' => true];

    return view('/content/miscellaneous/page-room-schedule', ['pageConfigs' => $pageConfigs, 'room_id' => $id]);
  }

  public function room_form($id)
  {
    $pageConfigs = ['blankPage' => true];

    return view('/content/miscellaneous/page-room-form', ['pageConfigs' => $pageConfigs, 'room_id' => $id]);
  }

  // Error
  public function error()
  {
    $pageConfigs = ['blankPage' => true];

    return view('/content/miscellaneous/error', ['pageConfigs' => $pageConfigs]);
  }

  // Not-authorized
  public function not_authorized()
  {
    $pageConfigs = ['blankPage' => true];

    return view('/content/miscellaneous/page-not-authorized', ['pageConfigs' => $pageConfigs]);
  }

  // Maintenance
  public function maintenance()
  {
    $pageConfigs = ['blankPage' => true];

    return view('/content/miscellaneous/page-maintenance', [
      'pageConfigs' => $pageConfigs
    ]);
  }
}
