@extends('layouts/fullLayoutMaster')

@section('title', 'Forgot Password')

@section('page-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/authentication.css')) }}">
@endsection

@section('content')
<div class="auth-wrapper auth-basic px-2">
  <div class="auth-inner my-2">
    <!-- Forgot Password basic -->
    <div class="card mb-0">
      <div class="card-body">
        <a href="#" class="brand-logo">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
          </svg>
          <h2 class="brand-text text-primary ms-1">Sirupat</h2>
        </a>

        <h4 class="card-title mb-1">Forgot Password? 🔒</h4>
        <p class="card-text mb-2">Enter your email and we'll send you instructions to reset your password</p>

        <form class="auth-forgot-password-form mt-2" action="/auth/reset-password-basic" method="GET">
          <div class="mb-1">
            <label for="forgot-password-email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="forgot-password-email"
              name="forgot-password-email"
              placeholder="john@example.com"
              aria-describedby="forgot-password-email"
              tabindex="1"
              autofocus
            />
          </div>
          <button class="btn btn-primary w-100" tabindex="2">Send reset link</button>
        </form>

        <p class="text-center mt-2">
          <a href="{{url('auth/login-basic')}}"> <i data-feather="chevron-left"></i> Back to login </a>
        </p>
      </div>
    </div>
    <!-- /Forgot Password basic -->
  </div>
</div>
@endsection

@section('vendor-script')
<script src="{{asset(mix('vendors/js/forms/validation/jquery.validate.min.js'))}}"></script>
@endsection

@section('page-script')
<script src="{{asset(mix('js/scripts/pages/auth-forgot-password.js'))}}"></script>
@endsection
