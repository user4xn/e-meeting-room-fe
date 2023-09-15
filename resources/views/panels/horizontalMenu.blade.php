@php
$configData = Helper::applClasses();
@endphp
{{-- Horizontal Menu --}}
<div class="horizontal-menu-wrapper">
  <div class="header-navbar navbar-expand-sm navbar navbar-horizontal
  {{$configData['horizontalMenuClass']}}
  {{($configData['theme'] === 'dark') ? 'navbar-dark' : 'navbar-light' }}
  navbar-shadow menu-border
  {{ ($configData['layoutWidth'] === 'boxed' && $configData['horizontalMenuType']  === 'navbar-floating') ? 'container-xxl' : '' }}"
  role="navigation"
  data-menu="menu-wrapper"
  data-menu-type="floating-nav">
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item me-auto">
          <a class="navbar-brand" href="{{url('/')}}">
            <span class="brand-logo">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
              </svg>
            </span>
            <h2 class="brand-text mb-0">SIRUPAT</h2>
          </a>
        </li>
        <li class="nav-item nav-toggle">
          <a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">
            <i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="shadow-bottom"></div>
    <!-- Horizontal menu content-->
    <div class="navbar-container main-menu-content" data-menu="menu-container">
      @php
        $masterSlug = [["slug" => "dashboard", "menu" => "Dasbor"], ["slug" => "app-user-list", "menu" => "Pengguna"], ["slug" => "app-room-list", "menu" => "Master Data"], ["slug" => "app-report-rent", "menu" => "Berkas"], ["slug" => "app-rent", "menu" => "Sewa Ruang Rapat"], ["slug" => "app-booking", "menu" => "Daftar Pengajuan"], ["slug" => "app-participant-ongoing", "menu" => "Peserta Meeting"], ["slug" => "app-participant-history", "menu" => "Peserta Meeting"], ["slug" => "page-setting", "menu" => "Pengaturan"]];
        if (isset($_COOKIE['userAbility'])) {
            $userAbility = json_decode($_COOKIE['userAbility'], true);
            if ($userAbility !== null) {
                $selectedMenu = $userAbility;

                $selectedMenuSlug = array_map(function($menu) use ($masterSlug) {
                    $key = array_search($menu, array_column($masterSlug, 'menu'));
                    return $key !== false ? $masterSlug[$key]['slug'] : null;
                }, $userAbility);

                if(!in_array(Route::currentRouteName(), $selectedMenuSlug)) {
                  echo "<script>window.location.href = '" . route($selectedMenuSlug[0]) . "';</script>";
                  exit;
                }
            } else {
              echo "<script>localStorage.removeItem('jwtToken');localStorage.removeItem('userData');localStorage.removeItem('nextCheckToken');localStorage.removeItem('isOtp');window.location.href = '" . route('auth-login') . "';</script>";
              exit;
            }
        } else {
          echo "<script>localStorage.removeItem('jwtToken');localStorage.removeItem('userData');localStorage.removeItem('nextCheckToken');localStorage.removeItem('isOtp');window.location.href = '" . route('auth-login') . "';</script>";
          exit;
        }
      @endphp
      <ul class="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
      {{-- Foreach menu item starts --}}
        @if(isset($menuData[1]))
        @foreach($menuData[1]->menu as $menu)
        @php
        $custom_classes = "";
        if(isset($menu->classlist)) {
        $custom_classes = $menu->classlist;
        }
        @endphp
        @if(in_array($menu->name, $selectedMenu))
        <li class="nav-item @if(isset($menu->submenu)){{'dropdown'}}@endif {{ $custom_classes }} {{ Route::currentRouteName() === $menu->slug ? 'active' : ''}}"
         @if(isset($menu->submenu)){{'data-menu=dropdown'}}@endif>
          <a href="{{isset($menu->url)? url($menu->url):'javascript:void(0)'}}" class="nav-link d-flex align-items-center @if(isset($menu->submenu)){{'dropdown-toggle'}}@endif" target="{{isset($menu->newTab) ? '_blank':'_self'}}"  @if(isset($menu->submenu)){{'data-bs-toggle=dropdown'}}@endif>
            <i data-feather="{{ $menu->icon }}"></i>
            <span>{{ __($menu->name) }}</span>
          </a>
          @if(isset($menu->submenu))
          @include('panels/horizontalSubmenu', ['menu' => $menu->submenu])
          @endif
        </li>
        @endif
        @endforeach
        @endif
        {{-- Foreach menu item ends --}}
      </ul>
    </div>
  </div>
</div>
