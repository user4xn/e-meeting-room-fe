
@extends('layouts/contentLayoutMaster')

@section('title', 'Dasbor')

@section('vendor-style')
  {{-- vendor css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/charts/apexcharts.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
@endsection
@section('page-style')
  {{-- Page css files --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/dashboard-ecommerce.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/charts/chart-apex.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<!-- Dashboard Ecommerce Starts -->
<section id="dashboard-ecommerce">
  <div class="row match-height">
    <!-- Bar Chart - Orders -->
    <div class="col-xl-2 col-md-6 col-12">
      <div class="card">
        <div class="card-body pb-50">
          <h6>Total Ruangan</h6>
          <h2 class="fw-bolder mb-1" id="total-room">loading..</h2>
          <div id="statistics-order-chart"></div>
        </div>
      </div>
    </div>
    <!--/ Bar Chart - Orders -->

    <!-- Line Chart - Profit -->
    <div class="col-xl-2 col-md-6 col-12">
      <div class="card card-tiny-line-stats">
        <div class="card-body pb-50">
          <h6>Total Agenda</h6>
          <h2 class="fw-bolder mb-1" id="total-event">loading..</h2>
          <div id="statistics-profit-chart"></div>
        </div>
      </div>
    </div>
    <!--/ Line Chart - Profit -->

    <!-- Statistics Card -->
    <div class="col-xl-8 col-md-12 col-12">
      <div class="card card-statistics">
        <div class="card-header pb-0">
          <h4 class="card-title">Statistik</h4>
        </div>
        <div class="card-body statistics-body">
          <div class="row">
            <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
              <div class="d-flex flex-row">
                <div class="avatar bg-light-secondary me-2">
                  <div class="avatar-content">
                    <i data-feather="clock" class="avatar-icon"></i>
                  </div>
                </div>
                <div class="my-auto">
                  <h4 class="fw-bolder mb-0" id="total-waiting">loading..</h4>
                  <p class="card-text font-small-3 mb-0">Menunggu</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
              <div class="d-flex flex-row">
                <div class="avatar bg-light-info me-2">
                  <div class="avatar-content">
                    <i data-feather="user" class="avatar-icon"></i>
                  </div>
                </div>
                <div class="my-auto">
                  <h4 class="fw-bolder mb-0" id="total-user">loading..</h4>
                  <p class="card-text font-small-3 mb-0">User</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
              <div class="d-flex flex-row">
                <div class="avatar bg-light-warning me-2">
                  <div class="avatar-content">
                    <i data-feather="alert-circle" class="avatar-icon"></i>
                  </div>
                </div>
                <div class="my-auto">
                  <h4 class="fw-bolder mb-0" id="total-expired">loading..</h4>
                  <p class="card-text font-small-3 mb-0">Expired</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="d-flex flex-row">
                <div class="avatar bg-light-success me-2">
                  <div class="avatar-content">
                    <i data-feather="check-circle" class="avatar-icon"></i>
                  </div>
                </div>
                <div class="my-auto">
                  <h4 class="fw-bolder mb-0" id="total-done">loading..</h4>
                  <p class="card-text font-small-3 mb-0">Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ Statistics Card -->
  </div>

  <div class="row match-height">
    <!-- Company Table Card -->
    <div class="col-lg-8 col-12 d-none" id="table-today-event">
      <div class="card card-company-table">
        <div class="card-body p-0">
          <div class="text-center bg-primary text-uppercase py-1">
            <h3 class="m-0 text-white fw-bolder">Agenda Hari Ini</h3>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Pengampu</th>
                  <th>Agenda</th>
                  <th>Waktu</th>
                  <th>Ruangan</th>
                  <th>Peserta</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="area-today-event">
                <tr>
                  <td colspan="6" class="text-center text-muted">Loading..</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--/ Company Table Card -->

    <!-- Developer Meetup Card -->
    <div class="col-lg-4 col-md-6 col-12 d-none" id="card-nearly-expired">
      <div class="card card-developer-meetup">
        <div class="meetup-img-wrapper rounded-top text-center bg-light-warning">
          <img src="{{asset('images/illustration/email.svg')}}" alt="Meeting Pic" height="170" />
        </div>
        <div class="card-body">
          <div class="meetup-header d-flex align-items-center">
            <div class="meetup-day">
              <h3 class="mb-0" id="nearly-expired-count">0</h3>
            </div>
            <div class="my-auto">
              <h4 class="card-title mb-25">Akan Kadaluarsa</h4>
              <p class="card-text mb-0">Dalam 3 hari kedepan</p>
            </div>
          </div>
          <div class="mt-0 mb-1" id="area-nearly-expired">
            <div class="text-center">
              loading..
            </div>
          </div>
          <a href="{{ route('app-booking') }}" class="d-none" id="button-nearly-expired">Lihat Selengkapnya</a>
        </div>
      </div>
    </div>
    <!--/ Developer Meetup Card -->
  </div>
</section>
<!-- Dashboard Ecommerce ends -->
@endsection

@section('vendor-script')
  {{-- vendor files --}}
  <script src="{{ asset(mix('vendors/js/charts/apexcharts.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
@endsection
@section('page-script')
  {{-- Page js files --}}
  <script src="{{ asset(mix('js/scripts/pages/dashboard-sirupat.js')) }}"></script>
@endsection
