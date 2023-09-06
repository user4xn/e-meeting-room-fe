@extends('layouts/contentLayoutMaster')

@section('title', 'Daftar Pengajuan')

@section('vendor-style')
  <!-- Vendor css files -->
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
@endsection
@section('page-style')
  <!-- Page css files -->
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-flat-pickr.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="assets/vendor/libs/spinkit/spinkit.css" />
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<section class="app-booking-wrapper">
  <div class="card text-center">
    <div class="card-header d-flex justify-content-center">
      <ul class="nav nav-pills card-header-pills" role="tablist">
        <li class="nav-item">
          <button type="button" class="nav-link active" data-bs-toggle="tab" data-bs-target="#navs-unconfirmed" role="tab">
            <span class="bullet bullet-warning bullet-sm me-50"></span>
            Menunggu&nbsp;<span id="count-unconfirmed"></span>
          </button>
        </li>
        <li class="nav-item">
          <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#navs-approved" role="tab">
            <span class="bullet bullet-success bullet-sm me-50"></span>
            Disetujui&nbsp;<span id="count-approved"></span>
          </button>
        </li>
        <li class="nav-item">
          <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#navs-rejected" role="tab">
            <span class="bullet bullet-danger bullet-sm me-50"></span>
            Ditolak&nbsp;<span id="count-rejected"></span>
          </button>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-end mb-1">
        <input type="text" class="form-control me-1 search-filter" placeholder="Cari...">
        <button type="button" class="btn bg-light-danger btn-glow" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="font-medium-1" data-feather="filter"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li class="px-2 py-2">
            <div class="mb-1 position-relative">
              <label for="start-date" class="form-label">Tanggal Mulai</label>
              <input type="text" class="form-control" id="start-filter-date" name="start-filter-date" placeholder="Masukan Tanggal" />
            </div>
            <div class="mb-1 position-relative">
              <label for="end-date" class="form-label">Tanggal Selesai</label>
              <input type="text" class="form-control" id="end-filter-date" name="end-filter-date" placeholder="Masukan Tanggal" />
            </div>
            <hr>
            <div class="position-relative w-100">
              <button type="button" class="btn btn-danger btn-glow w-100 apply-filter">
                Terapkan
              </button>
              <button type="button" class="btn bg-light-secondary w-100 mt-1 reset-filter">
                Reset
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="tab-content p-0">
        <div class="tab-pane fade show active" id="navs-unconfirmed" role="tabpanel">
          <div class="loading-state row p-5 d-flex justify-content-center text-muted rounded mx-0">
            Loading ...
          </div>
          <div class="row d-none" id="area-unconfirmed">
            <span class="text-muted py-4">(Belum ada data)</span>
          </div>
        </div>
        <div class="tab-pane fade" id="navs-approved" role="tabpanel">
          <div class="loading-state row p-5 d-flex justify-content-center text-muted rounded mx-0">
            Loading ...
          </div>
          <div class="row d-none" id="area-approved">
            <span class="text-muted py-4">(Belum ada data)</span>
          </div>
        </div>
        <div class="tab-pane fade" id="navs-rejected" role="tabpanel">
          <div class="loading-state row p-5 d-flex justify-content-center text-muted rounded mx-0">
            Loading ...
          </div>
          <div class="row d-none" id="area-rejected">
            <span class="text-muted py-4">(Belum ada data)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="modal fade" id="detailRent" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered modal-add-new-role">
    <div class="modal-content">
      <div class="modal-loading-overlay">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="modal-header bg-transparent pb-0">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="z-index:9999"></button>
      </div>
      <div class="modal-body px-5 pb-5">
        <div class="row">
          <div class="col-12 p-2 d-flex justify-content-between align-items-center pt-0">
            <div>
              <h2>Detail Pengajuan</h2>
              <span>Diajukan Tanggal : <span id="modal-rent-created">rent_created</span></span>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <div class="p-1 bg-body rounded w-100 d-flex justify-content-between align-items-center">
                <div class="avatar avatar-lg shadow me-2">
                  <div class="avatar-content">
                    <img src="http://localhost:8000/images/portrait/small/avatar-s-11.jpg" alt="">
                  </div>
                </div>
                <div class="d-flex flex-column me-2">
                  <span id="modal-user-res-name" class="h5 fw-bold m-0">user_res_name</span>
                  <span id="modal-user-res-nip" class="text-muted">NIP : user_res_nip</span>
                </div>
                <div class="">
                  <span class="badge bg-light-secondary px-2 py-1 rounded-pill" data-bs-toggle="tooltip" data-bs-placement="right" id="modal-user-res-phone" title="user_res_phone">
                    <i class="font-large-1" data-feather="phone"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="col-12 p-2">
            <table class="w-100">
              <tr>
                <td class="w-25">Nama Agenda</td>
                <td>:</td>
                <td id="modal-rent-title">rent_title</td>
              </tr>
              <tr>
                <td class="w-25">Tanggal</td>
                <td>:</td>
                <td id="modal-rent-date">rent_date</td>
              </tr>
              <tr>
                <td class="w-25">Waktu</td>
                <td>:</td>
                <td id="modal-rent-time">rent_time</td>
              </tr>
              <tr>
                <td class="w-25">Penjelasan Acara</td>
                <td>:</td>
                <td></td>
              </tr>
            </table>
            <textarea class="form-control mt-1" id="modal-rent-desc" cols="20" rows="10" readonly>rent_desc</textarea>
            <div class="alert alert-danger mt-1 p-2 d-none mb-0" id="modal-rent-notes">
              Catatan Penolakan : asdad
            </div>
          </div>
          <div class="col-12 px-2 d-flex justify-content-between">
            <button class="btn btn-outline-danger flex-grow-1" data-rent-id="0" id="modal-button-delete">HAPUS</button>
            <button class="btn btn-success flex-grow-1 me-2" data-rent-id="0" id="modal-button-approve">SETUJUI</button>
            <button class="btn btn-outline-danger" data-rent-id="0" id="modal-button-decline">TOLAK</button>
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
    transition: transform 0.2s;
  }

  .dropdown-menu {
    transition: ease 0.3s;
  }

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
</style>
@endsection

@section('vendor-script')
  <!-- Vendor js files -->
  <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
@endsection
@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/pages/app-booking.js')) }}"></script>
@endsection
