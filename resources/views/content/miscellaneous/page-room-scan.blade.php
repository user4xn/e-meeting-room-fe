@php
$configData = Helper::applClasses();
@endphp
@extends('layouts/fullLayoutMaster')

@section('title', 'Scan Ruangan')

@section('page-style')
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/page-misc.css')) }}">
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
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="card-header border-bottom">
          <h3 class="card-title">Informasi Ruangan</h3>
          <a href="#" class="text-danger booking-button">Booking Cepat Ruangan</a>
        </div>
        <div class="card-body text-start py-2">
          <h1 class="fw-bolder" id="room-name">-</h1>
          
          <div class="mt-1" id="room-desc">
            -
          </div>
          <div class="mt-1">Jumlah Peserta : <span class="badge rounded-pill bg-primary" id="room-participant-max">0/0 Peserta</span></div>
          <div class="mt-1 text-center p-2 bg-body">
            <div>
              <span class="mb-1">Agenda Berlangsung:</span><br>
              <span class="fw-bold" id="event-title-current"></span>
            </div>
            <button class="btn btn-primary mt-3 w-50 form-button" disabled>Absen</button>
          </div>
        </div>
        <div class="card-footer border-top">
          <div class="mb-3 bg-body border rounded-pill p-2" id="room-datetime">-</div>
          <ul class="timeline">
            
          </ul>
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

  .fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
</style>
<!-- / Coming soon page-->
@endsection

<script>
  const G_BACKEND_API = "{{ env('BACKEND_URL') }}";
  const ROOM_ID = "{{ $room_id }}";
  const RENT_ROUTE = "{{ route('app-rent', $room_id) }}"
  const LOGIN_ROUTE = "{{ route('auth-login') }}"
  const FORM_ROUTE = "{{ route('app-guest-form', $room_id) }}"
</script>

@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/miscellaneous/page-room-scan.js')) }}"></script>
@endsection
