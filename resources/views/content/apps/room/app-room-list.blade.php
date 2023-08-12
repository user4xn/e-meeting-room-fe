@extends('layouts/contentLayoutMaster')

@section('title', 'Room List')

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
<!-- rooms list start -->
<section class="app-room-list">
  <!-- list and filter start -->
  <div class="card">
    <div class="card-body border-bottom">
      <h4 class="card-title mb-0">Master Room</h4>
    </div>
    <div class="card-datatable table-responsive pt-0">
      <table class="room-list-table table table-hover">
        <thead class="table-light">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Created</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- Modal to add new room starts-->
    <div class="modal modal-slide-in new-room-modal fade" id="modals-slide-in">
      <div class="modal-dialog">
        <form class="add-new-room modal-content pt-0" onsubmit="false">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
          <div class="modal-header mb-1">
            <h5 class="modal-add-title" id="exampleModalLabel">Add Room</h5>
          </div>
          <div class="modal-body flex-grow-1">
            <div class="mb-1">
              <label class="form-label" for="add-room-name">Room Name</label>
              <input
                type="text"
                class="form-control dt-name"
                id="add-room-name"
                placeholder="Ruang DPR"
                name="add-room-name"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-room-capacity">Max Capacity</label>
              <input
                type="number"
                id="add-room-capacity"
                class="form-control dt-capacity"
                placeholder="99"
                name="add-room-capacity"
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="add-room-description">Description</label>
              <textarea 
                id="add-room-description"
                class="form-control dt-description" 
                placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                name="add-room-description" 
                cols="30" rows="10" 
              ></textarea>
            </div>
            <div type="submit" class="btn btn-primary me-1 data-submit">Submit</div>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal to add new room Ends-->

    <!-- Modal to detail room starts-->
    <div class="modal modal-slide-in new-room-modal fade" id="modals-slide-in-detail">
      <div class="modal-dialog">
        <form class="add-new-room modal-content pt-0" onsubmit="false">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
          <div class="modal-header mb-1">
            <h5 class="modal-title" id="exampleModalLabel">Detail of -</h5>
          </div>
          <div class="modal-body flex-grow-1">
            <div class="mb-1">
              <label class="form-label" for="room-name">Room Name</label>
              <input
                type="text"
                class="form-control dt-name"
                id="room-name"
                placeholder="Ruang DPR"
                name="room-name"
                disabled
              />
              <input type="hidden" id="room-id">
            </div>
            <div class="mb-1">
              <label class="form-label" for="room-capacity">Max Capacity</label>
              <input
                type="number"
                id="room-capacity"
                class="form-control dt-capacity"
                placeholder="99"
                name="room-capacity"
                disabled
              />
            </div>
            <div class="mb-1">
              <label class="form-label" for="room-description">Description</label>
              <textarea 
                id="room-description"
                class="form-control dt-description" 
                placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                name="room-description" 
                cols="30" rows="10" 
                disabled
              ></textarea>
            </div>
            <div class="btn btn-primary me-1 data-save" data-state="edit">Edit</div>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal to detail room Ends-->
  </div>
  <!-- list and filter end -->
</section>
<!-- rooms list ends -->
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
  <script src="{{ asset(mix('js/scripts/pages/app-room-list.js')) }}"></script>
@endsection
