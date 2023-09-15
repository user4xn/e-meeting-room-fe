<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppsController extends Controller
{
    public function reportRentIndex()
    {
        $pageConfigs = ['pageHeader' => false];

        return view('/content/apps/report/app-report-list', ['pageConfigs' => $pageConfigs]);
    }

    public function reportRentDetail($id)
    {
        $pageConfigs = ['pageHeader' => false];

        return view('/content/apps/report/app-report-detail', [
            'pageConfigs' => $pageConfigs,
            'eventId' => $id
        ]);
    }

    public function reportRentPrint($id)
    {
        $pageConfigs = ['pageHeader' => false];

        return view('/content/apps/report/app-report-print', [
            'pageConfigs' => $pageConfigs,
            'eventId' => $id
        ]);
    }

    public function user_list()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/user/app-user-list', ['pageConfigs' => $pageConfigs]);
    }

    public function room_list()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/room/app-room-list', ['pageConfigs' => $pageConfigs]);
    }

    public function rentIndex($room_id = '')
    {   
        $pageConfigs = [
            'pageHeader' => false
        ];

        return view('/content/apps/calendar/app-calendar', [
            'pageConfigs' => $pageConfigs,
            'room_id' => $room_id
        ]);
    }

    public function emailApp()
    {
        $pageConfigs = [
            'pageHeader' => false,
            'contentLayout' => "content-left-sidebar",
            'pageClass' => 'email-application',
        ];

        return view('/content/apps/email/app-email', ['pageConfigs' => $pageConfigs]);
    }

    public function participantOngoing()
    {
        $pageConfigs = [
            'pageHeader' => false,
        ];

        return view('/content/apps/participant/app-participant-ongoing-list', ['pageConfigs' => $pageConfigs]);
    }

    public function participantHistory()
    {
        $pageConfigs = [
            'pageHeader' => false,
        ];

        return view('/content/apps/participant/app-participant-history-list', ['pageConfigs' => $pageConfigs]);
    }
}
