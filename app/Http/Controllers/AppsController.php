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

    public function user_view_account()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/user/app-user-view-account', ['pageConfigs' => $pageConfigs]);
    }

    public function user_view_security()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/user/app-user-view-security', ['pageConfigs' => $pageConfigs]);
    }

    public function user_view_billing()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/user/app-user-view-billing', ['pageConfigs' => $pageConfigs]);
    }

    public function user_view_notifications()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/user/app-user-view-notifications', ['pageConfigs' => $pageConfigs]);
    }

    public function user_view_connections()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/content/apps/user/app-user-view-connections', ['pageConfigs' => $pageConfigs]);
    }

    public function chatApp()
    {
        $pageConfigs = [
            'pageHeader' => false,
            'contentLayout' => "content-left-sidebar",
            'pageClass' => 'chat-application',
        ];

        return view('/content/apps/chat/app-chat', [
            'pageConfigs' => $pageConfigs
        ]);
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
    
    public function file_manager()
    {
        $pageConfigs = [
            'pageHeader' => false,
            'contentLayout' => "content-left-sidebar",
            'pageClass' => 'file-manager-application',
        ];

        return view('/content/apps/fileManager/app-file-manager', ['pageConfigs' => $pageConfigs]);
    }

    public function access_roles()
    {
        $pageConfigs = ['pageHeader' => false,];

        return view('/content/apps/rolesPermission/app-access-roles', ['pageConfigs' => $pageConfigs]);
    }

    public function access_permission()
    {
        $pageConfigs = ['pageHeader' => false,];

        return view('/content/apps/rolesPermission/app-access-permission', ['pageConfigs' => $pageConfigs]);
    }

    public function bookingIndex()
    {
        $pageConfigs = [
            'pageHeader' => false,
            'pageClass' => 'booking-application',
        ];

        return view('/content/apps/booking/app-booking', ['pageConfigs' => $pageConfigs]);
    }

    public function ecommerce_shop()
    {
        $pageConfigs = [
            'contentLayout' => "content-detached-left-sidebar",
            'pageClass' => 'ecommerce-application',
        ];

        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "eCommerce"], ['name' => "Shop"]
        ];

        return view('/content/apps/ecommerce/app-ecommerce-shop', [
            'pageConfigs' => $pageConfigs,
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function ecommerce_details()
    {
        $pageConfigs = [
            'pageClass' => 'ecommerce-application',
        ];

        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "eCommerce"], ['link' => "/app/ecommerce/shop", 'name' => "Shop"], ['name' => "Details"]
        ];

        return view('/content/apps/ecommerce/app-ecommerce-details', [
            'pageConfigs' => $pageConfigs,
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function ecommerce_wishlist()
    {
        $pageConfigs = [
            'pageClass' => 'ecommerce-application',
        ];

        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "eCommerce"], ['name' => "Wish List"]
        ];

        return view('/content/apps/ecommerce/app-ecommerce-wishlist', [
            'pageConfigs' => $pageConfigs,
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function ecommerce_checkout()
    {
        $pageConfigs = [
            'pageClass' => 'ecommerce-application',
        ];

        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "eCommerce"], ['name' => "Checkout"]
        ];

        return view('/content/apps/ecommerce/app-ecommerce-checkout', [
            'pageConfigs' => $pageConfigs,
            'breadcrumbs' => $breadcrumbs
        ]);
    }
}
