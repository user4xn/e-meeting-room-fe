@extends('layouts/contentLayoutMaster')

@section('title', 'Detail Laporan')

@section('vendor-style')
<link rel="stylesheet" href="{{asset('vendors/css/pickers/flatpickr/flatpickr.min.css')}}">
<link rel="stylesheet" href="{{ asset(mix('vendors/css/file-uploaders/dropzone.min.css')) }}">
@endsection
@section('page-style')
<link rel="stylesheet" href="{{asset('css/base/plugins/forms/pickers/form-flat-pickr.css')}}">
<link rel="stylesheet" href="{{asset('css/base/pages/app-invoice.css')}}">
<link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-file-uploader.css')) }}">
@endsection

@section('content')
<section class="invoice-preview-wrapper">
  <div class="row invoice-preview">
    <!-- Invoice -->
    <div class="col-xl-9 col-md-8 col-12">
      <div class="card invoice-preview-card">
        <div class="card-body invoice-padding pb-0">
          <!-- Header starts -->
          <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <div>
              <div class="logo-wrapper">
                <span class="brand-logo">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181"/>
                  </svg>
                </span>
                <h3 class="text-primary invoice-logo">SIRUPAT</h3>
              </div>
              <p class="card-text mb-25 w-75" id="officeAddress">loading..</p>
              <p class="card-text mb-0" id="officePhone">loading..</p>
            </div>
            <div class="mt-md-0 mt-2">
              <h4 class="invoice-title">
                Agenda
                <span class="invoice-number" id="crashId">#123</span>
              </h4>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Laporan Dibuat:</p>
                <p class="invoice-date" id="createdAt">loading..</p>
              </div>
            </div>
          </div>
          <!-- Header ends -->
        </div>

        <hr class="invoice-spacing" />

        <!-- Address and Contact starts -->
        <div class="card-body invoice-padding pt-0">
          <div class="row invoice-spacing">
            <div class="col-xl-4 p-0 border-end px-1 ps-0">
              <h6 class="mb-2">Detail Agenda</h6>
              <table>
                <tbody>
                  <tr>
                    <td><span class="fw-bold" id="eventName">loading..</span></td>
                  </tr>
                  <tr>
                    <td id="eventDate">loading..</td>
                  </tr>
                  <tr>
                    <td id="eventTime">loading..</td>
                  </tr>
                  <tr>
                    <td id="eventGuest">loading..</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-xl-4 p-0 mt-xl-0 border-end px-1">
              <h6 class="mb-2">Penanggung Jawab</h6>
              <table>
                <tbody>
                  <tr>
                    <td><span class="fw-bold" id="userResponsible">loading..</span></td>
                  </tr>
                  <tr>
                    <td id="nipResponsible">NIP: loading..</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-xl-4 p-0 mt-xl-0 px-1 pe-0">
              <h6 class="mb-2">Validator</h6>
              <table>
                <tbody>
                  <tr>
                    <td colspan="1"><span class="fw-bold" id="userVerificator">loading..</span></td>
                  </tr>
                  <tr>
                    <td id="dateVerificator">loading..</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Address and Contact ends -->

        <!-- Invoice Description starts -->
        <div class="border-top invoice-padding">
          <div class="row invoice-spacing">
            <div class="col-12 p-0">
              <h6 class="mb-2">Keterangan:</h6>
              <p id="eventDescription">
                loading..
              </p>
            </div>
          </div>
        </div>

        <div class="card-body invoice-padding pb-0 border-top">
          <div class="row invoice-sales-total-wrapper d-flex justify-content-center" id="areaImg">
            <div class="col-3 text-center">
              loading..
            </div>
          </div>
        </div>
        <!-- Invoice Description ends -->

        <hr class="invoice-spacing" />

        <!-- Invoice Note starts -->
        <div class="card-body invoice-padding pt-0">
          <div class="row">
            <div class="col-12 text-center">
              <i>dokumen ini resmi di generate secara otomatis dari situs ({{ env('APP_URL') }})</i>
            </div>
          </div>
        </div>
        <!-- Invoice Note ends -->
      </div>
    </div>
    <!-- /Invoice -->

    <!-- CARD FILES -->
    <div class="col-xl-3 col-md-4 col-12 invoice-actions mt-md-0 mt-2">
      <div class="card">
        <div class="card-body">
          <button class="btn btn-primary w-100 mb-75" data-bs-toggle="modal" data-bs-target="#fileUploadForm">Upload Dokumentasi</button>
          <a class="btn btn-outline-secondary w-100 mb-75" href="{{ route('app-report-rent-print', $eventId) }}" target="_blank"> Print </a>
        </div>
      </div>
      <div class="col-xl-3 w-100 col-md-4 col-12 invoice-actions mt-md-0 mt-2 d-none" id="cardFiles">
        <div class="card">
          <div class="card-body">
            <h6 class="files-section-title mb-75">Berkas Terupload</h6>
            <div id="areaFile">
              
            </div>  
          </div>
        </div>
      </div>
    </div>
    <!-- /Invoice Actions -->
  </div>
</section>
<div class="modal fade" id="fileUploadForm" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered modal-add-new-role">
    <div class="modal-content">
      <div class="modal-header bg-transparent border-bottom">
        <h4 class="modal-title">Upload Foto & Dokumen Meeting</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="z-index:9999"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12">
            <form action="#" enctype="multipart/form-data" class="dropzone dropzone-area" id="dpz-multiple-files">
              <div class="dz-message text-primary">
                <h3 class="text-primary">Letakkan file di sini atau klik untuk mengunggah.</h3>
              </div>
            </form>
            <button class="btn btn-success w-100 btn-process-upload mt-2">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .dropzone .dz-preview .dz-error-message {
    top: 150px!important;
  }

  .delete-button {
    position: absolute; /* Position the button relative to its parent (.image-wrapper) */
    top: 0; /* Position it at the top edge of the parent */
    right: 0; /* Position it at the right edge of the parent */
  }
</style>
@endsection

@section('vendor-script')
<script src="{{asset('vendors/js/forms/repeater/jquery.repeater.min.js')}}"></script>
<script src="{{asset('vendors/js/pickers/flatpickr/flatpickr.min.js')}}"></script>
<script src="{{asset(mix('vendors/js/file-uploaders/dropzone.min.js'))}}"></script>
@endsection

@section('page-script')
<script>
  const EVENT_ID = '{{ $eventId }}';
  const ASSET_DOC = '{{ asset("images/icons/doc.png") }}';
</script>
<script src="{{asset('js/scripts/pages/app-report-detail.js')}}"></script>
@endsection
