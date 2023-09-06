@extends('layouts/fullLayoutMaster')

@section('title', 'Two Steps Authentication')

@section('page-style')
<link rel="stylesheet" href="{{ asset(mix('css/base/pages/authentication.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<div class="auth-wrapper auth-basic px-2">
  <div class="auth-inner my-2">
    <!-- two steps verification basic-->
    <div class="card mb-0">
      <div class="card-body">
        <a href="#" class="brand-logo">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
          </svg>
          <h2 class="brand-text text-primary ms-1">Sirupat</h2>
        </a>

        <h2 class="card-title fw-bolder mb-1">Verifikasi OTP 💬</h2>
        <p class="card-text mb-75">
          Kami mengirimkan kode verifikasi ke email Anda. Masukkan kode dari email pada kolom di bawah.
        </p>
        <p class="card-text fw-bolder mb-2" id="emailText"></p>

        <form class="mt-2" onsubmit="false">
          <h6>Masukan 6 digit kode otp</h6>
          <div class="auth-input-wrapper d-flex align-items-center justify-content-between">
            <input type="text" class="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1 otp-input"
              maxlength="1" autofocus="" />

            <input type="text" class="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1 otp-input"
              maxlength="1" />

            <input type="text" class="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1 otp-input"
              maxlength="1" />

            <input type="text" class="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1 otp-input"
              maxlength="1" />

            <input type="text" class="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1 otp-input"
              maxlength="1" />

            <input type="text" class="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1 otp-input"
              maxlength="1" />
          </div>
          
          <button type="submit" class="btn btn-primary w-100 button-verify" tabindex="4" disabled="true">Verifikasi</button>
          <button class="btn btn-primary w-100 button-loading d-none" tabindex="4" disabled>
            <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
            Loading...
          </button>
          
        </form>

        <p class="text-center mt-2">
          <span>Belum mendapat kode?</span><a href="Javascript:void(0)" class="resend-button"><span>&nbsp;Kirim Ulang</span></a>
        </p>
      </div>
    </div>
    <!-- /two steps verification basic -->
  </div>
</div>
@endsection

@section('vendor-script')
<script src="{{asset(mix('vendors/js/forms/cleave/cleave.min.js'))}}"></script>
@endsection

@section('page-script')
<script>
  const DASHBOARD_ROUTE = "{{ route('dashboard') }}";
  const LOGIN_ROUTE = "{{ route('auth-login') }}";
</script>
<script src="{{asset(mix('js/scripts/pages/auth-two-steps.js'))}}"></script>
<script src="{{asset(mix('vendors/js/extensions/toastr.min.js'))}}"></script>
@endsection
