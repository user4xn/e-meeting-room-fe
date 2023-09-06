@extends('layouts/contentLayoutMaster')

@section('title', 'Data Pengguna')

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
      <h4 class="card-title mb-0">Data Pengguna</h4>
    </div>
    <div class="card-datatable table-responsive pt-0">
      <table class="user-list-table table table-hover">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- Modal to add new user starts-->
    <div class="modal modal-slide-in new-user-modal fade" id="modals-slide-in">
      <div class="modal-dialog">
        <form class="add-new-user modal-content pt-0" onsubmit="false" id="jquery-val-form">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
          <div class="modal-header mb-1">
            <h5 class="modal-add-title" id="exampleModalLabel">Tambah User</h5>
          </div>
          <div class="modal-body flex-grow-1">
            <div class="mb-1">
              <label class="form-label" for="add-user-nip">NIP</label>
              <input
                type="text"
                class="form-control add-user-nip"
                id="add-user-nip"
                placeholder="33712987312"
                name="add-user-nip"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-username">Username</label>
              <input
                type="text"
                class="form-control add-user-username"
                id="add-user-username"
                placeholder="johndoe"
                name="add-user-username"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-name">Nama Lengkap</label>
              <input
                type="text"
                class="form-control add-user-name"
                id="add-user-name"
                placeholder="John Doe"
                name="add-user-name"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-phone">Nomor Telepon</label>
              <input
                type="text"
                id="add-user-phone"
                class="form-control add-user-phone"
                placeholder="08123231232"
                name="add-user-phone"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-email">Email</label>
              <input
                type="email"
                id="add-user-email"
                class="form-control add-user-email"
                placeholder="johndoe@gmail.com"
                name="add-user-email"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-email">Alamat</label>
              <textarea 
                id="add-user-address"
                class="form-control add-user-address" 
                placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                name="add-user-address" 
                cols="30" rows="10" 
              ></textarea>
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-password">Password</label>
              <input
                type="password"
                id="add-user-password"
                class="form-control add-user-password"
                placeholder=""
                name="add-user-password"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-user-password-confirm">Konfirmasi Password</label>
              <input
                type="password"
                id="add-user-password-confirm"
                class="form-control add-user-password-confirm"
                placeholder=""
                name="add-user-password-confirm"
              />
            </div>
            <div type="submit" class="btn btn-primary me-1 data-submit">Simpan</div>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Batal</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal to add new user Ends-->

    <!-- Modal to detail user starts-->
    <div class="modal modal-slide-in new-user-modal fade" id="modals-slide-in-detail">
      <div class="modal-dialog">
        <form class="add-new-user modal-content pt-0" onsubmit="false">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
          <div class="modal-header mb-1">
            <h5 class="modal-title" id="exampleModalLabel">Detail of -</h5>
          </div>
          <div class="modal-body flex-grow-1">
            <div class="mb-1">
              <label class="form-label" for="user-nip">NIP</label>
              <input
                type="text"
                class="form-control user-nip"
                id="user-nip"
                placeholder="33712987312"
                name="user-nip"
                disabled
              />
              <input type="hidden" id="user-id">
            </div>
            <div class="mb-1">
              <label class="form-label" for="user-name">Nama Lengkap</label>
              <input
                type="text"
                class="form-control user-name"
                id="user-name"
                placeholder="John Doe"
                name="user-name"
                disabled
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="user-username">Username</label>
              <input
                type="text"
                class="form-control user-username"
                id="user-username"
                placeholder="John Doe"
                name="user-username"
                disabled
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="user-phone">Nomor Telepon</label>
              <input
                type="text"
                id="user-phone"
                class="form-control user-phone"
                placeholder="08123231232"
                name="user-phone"
                disabled
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="user-email">Email</label>
              <input
                type="email"
                id="user-email"
                class="form-control user-email"
                placeholder="johndoe@gmail.com"
                name="user-email"
                disabled
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="user-email">Alamat</label>
              <textarea 
                id="user-address"
                class="form-control user-address" 
                placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                name="user-address" 
                cols="30" rows="10" 
                disabled
              ></textarea>
            </div>
            <div id="area-hidden" class="mb-1 d-none">
              <label class="form-label" for="user-password">Ganti Password</label>
              <input
                type="password"
                id="user-password"
                class="form-control user-password"
                placeholder=""
                name="user-password"
              />
            </div>
            <div class="btn btn-primary me-1 data-save" data-state="edit">Edit</div>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Batal</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal to detail user Ends-->
  </div>
  <!-- list and filter end -->
</section>
<!-- users list ends -->
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
  <script src="{{ asset(mix('js/scripts/pages/app-user-list.js')) }}"></script>
@endsection
