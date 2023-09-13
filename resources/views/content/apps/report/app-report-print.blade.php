@extends('layouts/fullLayoutMaster')

@section('title', 'Laporan Print')

@section('page-style')
<link rel="stylesheet" href="{{asset(mix('css/base/pages/app-invoice-print.css'))}}">
@endsection

@section('content')
<div class="invoice-print p-3">
  <div class="invoice-header d-flex justify-content-between flex-md-row flex-column pb-2">
    <div>
      <div class="d-flex mb-1">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Define a filter with a grayscale effect -->
          <filter id="grayscale">
            <feColorMatrix
              type="matrix"
              values="0.3333 0.3333 0.3333 0 0
                      0.3333 0.3333 0.3333 0 0
                      0.3333 0.3333 0.3333 0 0
                      0      0      0      1 0"
            />
          </filter>
        
          <!-- Apply the filter to the paths -->
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.107 19.6081C23.373 18.3406 23.3013 16.2321 21.8867 15.0624C20.654 14.0431 18.8267 14.1952 17.6954 15.3264L16.5099 16.5118L15.2614 17.7601C13.8293 19.192 11.9479 19.9088 10.0664 19.9088C8.185 19.9088 6.30355 19.192 4.87148 17.7601C2.00734 14.8963 2.00734 10.237 4.87148 7.37321L6.1217 6.12315C8.38084 3.86429 6.78091 0.00219727 3.58629 0.00219727C1.60518 0.00219727 0 1.60718 0 3.58805V26.4144C0 28.3935 1.60518 30.0003 3.58629 30.0003H10.2291C11.1803 30.0003 12.0913 29.6226 12.7645 28.9495L22.107 19.6081Z" fill="#CF5C5C" filter="url(#grayscale)"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7709 0.00174834C18.8197 0.00174834 17.9087 0.37939 17.2355 1.05075L7.89295 10.3922C6.69519 11.5915 6.69519 13.5409 7.89295 14.7385C9.09071 15.9361 11.0421 15.9361 12.2399 14.7385L13.4883 13.4902V13.4885L14.6284 12.3503C17.4541 9.52497 22.058 9.34489 24.9676 12.0845C27.9909 14.9326 28.0433 19.7126 25.1267 22.6288L23.8783 23.8771C21.6191 26.136 23.2191 29.9981 26.4137 29.9981C28.393 29.9981 30 28.3931 30 26.4122V3.58585C30 1.60673 28.3948 0 26.4137 0H19.7709V0.00174834Z" fill="#EF8181" filter="url(#grayscale)"/>
        </svg>
        
        <h3 class="text-primary font-weight-bold ml-1 ps-1">SIRUPAT</h3>
      </div>
      <p class="mb-25 w-50" id="officeAddress">loading..</p>
      <p class="mb-0" id="officePhone">loading..</p>
    </div>
    <div class="mt-md-0 mt-2">
      <h4 class="font-weight-bold text-right mb-1">AGENDA <span id="crashId">loading..</span></h4>
      <div class="invoice-date-wrapper mb-50">
        <span class="invoice-date-title">Laporan Dibuat:</span>
        <span class="font-weight-bold" id="createdAt"> loading..</span>
      </div>
    </div>
  </div>

  <hr class="my-2" />

  <div class="row pb-2">
    <div class="col-4 border-end px-1">
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
    <div class="col-4 mt-sm-0 border-end px-1">
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
    <div class="col-4 mt-sm-0 px-1">
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

  <div class="mt-2">
    <div class="border-top">
      <div class="row">
        <div class="col-12 px-1">
          <h6 class="mb-2 mt-2">Keterangan:</h6>
          <p id="eventDescription">
            loading..
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-2">
    <div class="border-top border-bottom pt-1 pb-2">
      <div class="row w-100">
        <div class="col-12 px-1">
          <div class="row invoice-sales-total-wrapper d-flex justify-content-center" id="areaImg">
            <div class="col-3 text-center pt-2">
              loading..
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12 text-center">
      <i>dokumen ini resmi di generate secara otomatis dari situs ({{ env('APP_URL') }})</i>
    </div>
  </div>
</div>
@endsection

@section('page-script')
<script>
  const EVENT_ID = '{{ $eventId }}';
</script>
<script src="{{asset('js/scripts/pages/app-invoice-print.js')}}"></script>
@endsection
