@php
$configData = Helper::applClasses();
@endphp
@extends('layouts/fullLayoutMaster')

@section('title', 'Form Absensi Peserta')

@section('vendor-style')
  <!-- Vendor css files -->
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
@endsection

@section('page-style')
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/page-misc.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<!-- Coming soon page-->
<div class="misc-wrapper">
  <div class="misc-inner p-2 p-sm-3 w-100">
    <div class="w-100 text-center">
      <a class="d-flex justify-content-center mb-2" href="#">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
        </svg>                
        <h2 class="fw-bolder text-primary ms-1">Sirupat</h2>
      </a>
      <div class="card">
        <div class="loading-overlay">
          <svg class="checkmark d-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="card-header border-bottom">
          <div class="card-title d-flex flex-column w-100">
            <span class="h1 fw-bolder">Form Absensi</span>
            <h6 class="event-title">Loading..</h6>
          </div>
        </div>
        <div class="card-body text-start py-2">
          <div class="mb-1 border bg-body p-2">
            <span class="mb-1">Tata Tertib Ruangan :</span>
            <ul class="mt-1">
              <li>Selalu booking ruang meeting sebelum menggunakannya</li>
              <li>Tinggalkan ruang meeting sebersih mungkin</li>
              <li>Menjaga ketenangan semaksimal mungkin</li>
              <li>Meninggalkan ruangan sesuai jam booking</li>
              <li>hindari mengonsumsi makanan berbau menyengat</li>
            </ul>
          </div>
          <div class="mt-3">
            <form class="guest-form needs-validation" data-ajax="false" novalidate>
              <div class="mb-1">
                <label for="title" class="form-label">Nama</label>
                <input type="text" class="form-control" id="guest-name" name="guest-name" placeholder="Masukan nama anda.." required />
              </div>
              <div class="mb-1">
                <label for="title" class="form-label">No Handphone</label>
                <input type="text" class="form-control" id="guest-phone" name="guest-phone" placeholder="Masukan nomor handphone anda.." required />
              </div>
              <div class="mb-1">
                <label for="title" class="form-label">Jabatan</label>
                <input type="text" class="form-control" id="guest-position" name="guest-position" placeholder="Masukan jabatan anda.." required />
              </div>
              <div class="mb-1">
                <label for="title" class="form-label">Unit Kerja</label>
                <input type="text" class="form-control" id="work-unit" name="work-unit" placeholder="Masukan unit kerja anda.." required />
              </div>
              <div class="mb-1">
                <label for="title" class="form-label">Tanda Tangan</label>
                <div class="text-center p-2 pb-0">
                  <div id="signature-container">
                      <canvas class="border rounded" id="signature-pad" height="200"></canvas>
                  </div>
                  <span class="text-danger d-none error-signature">Tanda tangan wajib diisi</span>
                  <button class="btn w-100 mt-1" id="clear-signature">Ulangi</button>
                </div>
                <input type="hidden" id="signature" name="signature" value="">
              </div>
            </form>
          </div>
        </div>
        <div class="card-footer border-top">
          <button class="btn btn-primary w-100 store-button">Kirim</button>
        </div>
      </div>
      <div class="mt-2 text-center">
        Copyright J-TECH@2023
      </div>
    </div>
  </div>
</div>

<style>
  .loading-overlay {
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

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }

  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: green;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: green;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #7ac142;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%, 100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #fff;
    }
  }
</style>
<!-- / Coming soon page-->
@endsection

<script>
  const G_BACKEND_API = "{{ env('BACKEND_URL') }}";
  const ROOM_ID = "{{ $room_id }}";
  const LOGIN_ROUTE = "{{ route('auth-login') }}"
</script>

@section('vendor-script')
  <!-- Vendor js files -->
  <script src="{{ asset(mix('vendors/js/extensions/moment.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
    
@endsection

@section('page-script')
  <!-- Page js files -->
  <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
  <script src="{{ asset(mix('js/scripts/miscellaneous/page-room-form.js')) }}"></script>
@endsection
