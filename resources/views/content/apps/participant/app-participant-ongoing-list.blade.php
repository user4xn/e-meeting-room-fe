@extends('layouts/contentLayoutMaster')

@section('title', 'Peserta History')

@section('vendor-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/rowGroup.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
@endsection

@section('page-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<!-- users list start -->
<section class="app-user-list">
  <!-- list and filter start -->
  <div class="card">
    <div class="card-body border-bottom">
      <h4 class="card-title mb-0">Data Peserta Meeting (Sedang Berlangsung)</h4>
    </div>
    <div class="card-datatable table-responsive pt-0">
      <table class="user-list-table table table-hover">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Agenda</th>
            <th>Ruangan</th>
            <th>Pengampu</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Jumlah Tamu</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  <!-- list and filter end -->
</section>
<!-- users list ends -->
<div class="modal faded" id="detailParticipant" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-loading-overlay">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="modal-header bg-transparent pb-0">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="z-index:9999"></button>
      </div>
      <div class="modal-body px-md-5 pb-md-5 px-2 pb-2">
        <div class="row">
          <div class="col-12 p-2 d-flex justify-content-between align-items-center pt-0">
            <div>
              <h2>Daftar Tamu</h2>
              <span id="event-title">loading..</span>
            </div>
          </div>
          <hr>
          <div class="col-12 p-2">
            <div class="d-flex align-items-center justify-content-end">
              <div class="p-1 bg-body rounded w-100 d-flex justify-content-between align-items-center">
                <div class="avatar avatar-lg shadow me-2">
                  <div class="avatar-content">
                    <img src="{{ asset('images/portrait/small/avatar-s-11.jpg') }}" alt="">
                  </div>
                </div>
                <div class="d-flex flex-column me-2">
                  <span id="user-res-name" class="h5 fw-bold m-0">loading..</span>
                  <span id="user-res-nip" class="text-muted">NIP : loading..</span>
                </div>
                <div class="">
                  <span class="badge bg-light-secondary px-2 py-1 rounded-pill" data-bs-toggle="tooltip" data-bs-placement="right" id="user-res-phone" title="user_res_phone">
                    <i class="font-large-1" data-feather="phone"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="h5 my-2">
              <span class="text-primary" id="guest-count">0</span> Tamu dari Total <span class="text-primary" id="max-capacity">0</span> Tamu
            </div>
            <hr>
            <div class="table-responsive">
              <table class="w-100 table table-border">
                <thead>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>Unit Kerja</th>
                  <th>Waktu Absen</th>
                  <th>Tanda Tangan</th>
                </thead>
                <tbody id="area-guest">

                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
<style>
  .modal-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }

  .dropdown-menu {
    transition: ease 0.3s;
  }
</style>
@endsection

@section('vendor-script')
  {{-- Vendor js files --}}
  <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.bootstrap5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap5.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.buttons.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/jszip.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/pdfmake.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/vfs_fonts.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.html5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.print.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.rowGroup.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
@endsection

@section('page-script')
  {{-- Page js files --}}
  <script src="{{ asset(mix('js/scripts/pages/app-participant-ongoing-list.js')) }}"></script>
@endsection
