@php
$configData = Helper::applClasses();
@endphp
@extends('layouts/fullLayoutMaster')

@section('title', 'Jadwal Ruangan')

@section('page-style')
<link rel="stylesheet" href="{{asset(mix('css/base/pages/page-misc.css'))}}">
@endsection

@section('content')
<div class="loading-overlay">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<!-- Not authorized-->
<div class="bg-body position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center d-none" id="state-invalid" style="z-index: 9999">
  <div class="d-flex justify-content-center">
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
    </svg>                
    <h2 class="fw-bolder text-primary ms-1 pe-2">Sirupat</h2>
  </div>
  <span class="display-5 fw-bolder mt-3 text-muted">Ruangan Tidak Ditemukan</span>
  <a href="{{ route('auth-login') }}">
    <button class="btn btn-primary mt-3">Kembali</button>
  </a>
</div>
<div class="d-flex flex-column">
  <div class="px-2 w-100 d-flex justify-content-between flex-md-row flex-sm-column">
    <div class="d-flex align-items-center w-50">
      <div class="d-flex justify-content-center">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
        </svg>                
        <h2 class="fw-bolder text-primary ms-1 pe-2">Sirupat</h2>
      </div>
      <h2  class="px-3 py-3 m-0 border-start flex-grow-1 text-uppercase fw-bolder" id="room-name"></h2>
    </div>
    <div class="d-flex align-items-center w-50 justify-content-end">
      <h3 class="px-3 py-3 m-0 border-end flex-grow-1 text-end" id="room-datetime"></h3>
      <div class="d-flex justify-content-center ps-2" href="#">
        <h1>
          <span class="badge px-2 py-1 bg-primary rounded-pill">Pukul <span id="time-now">00:00</span></span>
        </h1>
      </div>
    </div>
  </div>
  <div class="p-2 border-top bg-body w-100">
    <div class="card shadow-lg">
      <div class="card-body bg-primary text-white" id="event-current-container">
        <div class="row" id="event-current">
          <div class="col-xl-9 col-lg-8 col-md-7">
            <span class="display-5" id="event-title-current"></span>
            <hr>
            <p id="event-desc-current">
              
            </p>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-5 d-flex justify-content-center align-items-center flex-column">
            <div>
              <span class="display-5 fw-bolder text-white" id="event-start-current"> - </span>
              <span class="display-5 fw-bolder text-white">&nbsp;-&nbsp;</span>
              <span class="display-5 fw-bolder text-white" id="event-end-current"> - </span> 
            </div>
            <div>
              <span id="event-sub-current d-none"></span>
            </div>
          </div>
        </div>
        <div class="row text-center py-2 d-none" id="event-current-none">
          <span class="display-4 text-uppercase fw-bolder w-100">
            sedang tidak ada agenda
          </span>
        </div>
      </div>
    </div>
    
    <div class="col mt-2">
      <div class="row pt-1">
        <div class="col-xl-9 col-lg-8 col-md-7 d-flex justify-content-center align-items-center">
          <div class="card w-100 h-100">
            <div class="card-body bg-white px-0">
              <div class="">
                <h3 class="m-0">
                  <span class="badge bg-primary text-uppercase p-1 px-2 rounded-pill" style="border-top-left-radius: 0px!important; border-bottom-left-radius:0px!important">jadwal berikutnya</span>
                </h3>
              </div>
              <hr>
              <div class="area-schedule text-nowarp overflow-auto" style="max-height: 430px">
                <ul class="timeline p-3 m-0">
                  <div class='text-center fw-bold'>
                    Loading...
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-5 d-flex justify-content-center align-items-center">
          <div class="card w-100 h-100">
            <div class="card-body bg-white d-flex align-items-center justify-content-center">
              <img id="room-qrcode" class="w-100 p-4" src="" alt="qr-room">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- / Not authorized-->
</section>
<!-- maintenance end -->
<style>
  .area-schedule::-webkit-scrollbar {
    width: 0.5em; /* Width of the scrollbar */
  }

  .area-schedule::-webkit-scrollbar-track {
    background-color: transparent; /* Track color (background) */
  }

  .area-schedule::-webkit-scrollbar-thumb {
    background-color: transparent; /* Thumb color (the draggable part) */
    border: none; /* Remove the border around the thumb */
  }

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
</style>
@endsection

@section('vendor-script')
  <!-- Vendor js files -->
  <script src="{{ asset(mix('vendors/js/extensions/moment.min.js')) }}"></script>
@endsection

@section('page-script')
  <script>
    const G_BACKEND_API = "{{ env('BACKEND_URL') }}";
    const ROOM_ID = "{{ $room_id }}";
  </script>
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/miscellaneous/page-room-schedule.js')) }}"></script>
@endsection

