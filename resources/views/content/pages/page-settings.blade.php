@extends('layouts/contentLayoutMaster')

@section('title', 'Pengaturan')

@section('vendor-style')
  <!-- vendor css files -->
  <link rel='stylesheet' href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
  <link rel='stylesheet' href="{{ asset(mix('vendors/css/animate/animate.min.css')) }}">
  <link rel='stylesheet' href="{{ asset(mix('vendors/css/extensions/sweetalert2.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
@endsection
@section('page-style')
  <!-- Page css files -->
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<div class="row match-height">
  <div class="col-12">
    <!-- profile -->
    <div class="card">
      <div class="card-header border-bottom">
        <h4 class="card-title">Pengaturan Aplikasi</h4>
      </div>
      <div class="card-body py-2 my-25">
        <!-- form -->
          <div class="row">
            <div class="col-12 col-sm-6 mb-1">
              <form class="validate-form pt-50">
                <label class="form-label" for="officePhone">No Telepon Kantor</label>
                <input
                  type="number"
                  class="form-control"
                  id="officePhone"
                  name="officePhone"
                  placeholder="021839129834"
                  value=""
                  data-msg="Harap isi nomor telepon kantor"
                />

                <label class="form-label mt-2 " for="officeAddress">Alamat Kantor</label>
                <textarea
                  class="form-control"
                  id="officeAddress"
                  name="officeAddress"
                  data-msg="Harap isi alamat"
                  rows="10"
                ></textarea>

                <div class="col-12">
                  <button type="submit" class="btn btn-primary mt-1 me-1">Simpan</button>
                  <button type="button" class="btn btn-outline-secondary mt-1 button-cancel">Batal</button>
                </div>
              </form>
            </div>
            <div class="col-12 col-sm-6 mb-1 p-2">
              <div class="card border mb-5 bg-body rounded">
                <div class="card-body">
                  <div class="text-center fw-bolder mb-2">Informasi Aplikasi</div>
                  SIRUPAT (Sistem Ruang Rapat) adalah layanan unggulan yang ditawarkan oleh Kementerian Kelautan dan Perikanan (KKP) Indonesia untuk memenuhi kebutuhan sewa ruangan meeting yang berkualitas. Dengan SIRUPAT, Anda dapat dengan mudah menyewa ruangan meeting yang sesuai dengan kebutuhan Anda. <br><br> Kementerian Kelautan dan Perikanan (KKP) Indonesia telah mengembangkan SIRUPAT sebagai solusi yang efisien dan praktis bagi individu, perusahaan, atau organisasi yang memerlukan fasilitas ruang rapat yang nyaman dan modern. Dengan SIRUPAT, Anda dapat menjalankan pertemuan, konferensi, pelatihan, atau berbagai acara penting lainnya dengan lancar dan sukses.
                </div>
              </div>
            </div>
          </div>
        <!--/ form -->
      </div>
    </div>
  </div>
</div>
@endsection

@section('vendor-script')
  <!-- vendor files -->
  <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/cleave/cleave.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/cleave/addons/cleave-phone.us.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
@endsection
@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/pages/page-account-settings-account.js')) }}"></script>
@endsection
