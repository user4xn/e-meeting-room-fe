@extends('layouts/contentLayoutMaster')

@section('title', 'Sewa Ruang Rapat')

@section('vendor-style')
  <!-- Vendor css files -->
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/calendars/fullcalendar.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
@endsection

@section('page-style')
  <!-- Page css files -->
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-flat-pickr.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/app-calendar.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
@endsection

@section('content')
<!-- Full calendar start -->
<section>
  <div class="app-calendar overflow-hidden border">
    <div class="row g-0">
      <!-- Sidebar -->
      <div class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column" id="app-calendar-sidebar">
        <div class="sidebar-wrapper">
          <div class="card-body d-flex justify-content-center">
            <button
              class="btn btn-primary btn-toggle-sidebar w-100"
              data-bs-toggle="modal"
              data-bs-target="#add-new-sidebar"
            >
              <span class="align-middle">Ajukan Sewa</span>
            </button>
          </div>
          <div class="card-body pb-0">
            <h5 class="section-label mb-1">
              <span class="align-middle">Filter</span>
            </h5>
            <div class="form-check mb-1">
              <input type="checkbox" class="form-check-input select-all" id="select-all" />
              <label class="form-check-label" for="select-all">Lihat Semua</label>
            </div>
            <div class="calendar-events-filter">
              <div class="form-check form-check-info mb-1">
                <input type="checkbox" class="form-check-input input-filter" id="internal" data-value="internal" checked />
                <label class="form-check-label" for="internal">KKP Internal</label>
              </div>
              <div class="form-check form-check-success mb-1">
                <input type="checkbox" class="form-check-input input-filter" id="eksternal" data-value="eksternal" checked />
                <label class="form-check-label" for="eksternal">Eksternal</label>
              </div>
              <div class="form-check form-check-secondary mb-1">
                <input type="checkbox" class="form-check-input input-filter" id="unapproved" data-value="unapproved" checked />
                <label class="form-check-label" for="unapproved">Belum Disetujui</label>
              </div>
              <div class="form-check form-check-warning mb-1">
                <input type="checkbox" class="form-check-input input-filter" id="expired" data-value="expired" />
                <label class="form-check-label" for="expired">Kadaluarsa</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-auto">
          <img
            src="{{asset('images/pages/calendar-illustration.png')}}"
            alt="Calendar illustration"
            class="img-fluid"
          />
        </div>
      </div>
      <!-- /Sidebar -->

      <!-- Calendar -->
      <div class="col position-relative">
        <div class="card shadow-none border-0 mb-0 rounded-0">
          <div class="card-body pb-0">
            <div id="calendar"></div>
          </div>
        </div>
      </div>
      <!-- /Calendar -->
      <div class="body-content-overlay"></div>
    </div>
  </div>
  <!-- Calendar Add/Update/Delete event modal-->
  <div class="modal modal-slide-in event-sidebar fade" id="add-new-sidebar">
    <div class="modal-dialog sidebar-lg">
      <div class="modal-content p-0">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
        <div class="modal-header mb-1">
          <h5 class="modal-title event-sidebar-title">Ajukan Sewa Baru</h5>
        </div>
        <div class="modal-body flex-grow-1 pb-sm-0 pb-3">
          <form class="event-form needs-validation" data-ajax="false" novalidate>
            <div class="mb-1">
              <label for="title" class="form-label">Nama Agenda</label>
              <input type="text" class="form-control" id="title" name="title" placeholder="Nama Agenda" required />
            </div>
            <div class="">
              <label for="select-responsible-user" class="form-responsible-user">Penanggung Jawab</label>
              <select class="select2 select-responsible-user form-select w-100" id="select-responsible-user" name="select-responsible-user">
                <!-- Options will be appended here -->
              </select>
            </div>
            <div class="mb-1 mt-1">
              <label for="select-label" class="form-label">Divisi / Organisasi</label>
              <select class="select2 select-label form-select w-100" id="select-label" name="select-label">
                <option data-label="info" value="Internal">KKP Internal</option>
                <option data-label="success" value="Eksternal">Eksternal</option>
              </select>
            </div>
            <div class="mb-1 position-relative">
              <label for="start-date" class="form-label">Tanggal Mulai</label>
              <input type="text" class="form-control" id="start-date" name="start-date" placeholder="Start Date" />
            </div>
            <div class="mb-1 position-relative">
              <label for="end-date" class="form-label">Tanggal Selesai</label>
              <input type="text" class="form-control" id="end-date" name="end-date" placeholder="End Date" />
            </div>
            <div class="mb-1">
              <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input allDay-switch" id="customSwitch3" />
                <label class="form-check-label" for="customSwitch3">Sepanjang Hari</label>
              </div>
            </div>
            <div class="">
              <label for="select-room" class="form-room">Ruangan</label>
              <select class="select2 select-room form-select w-100" id="select-room" name="select-room">
                <!-- Options will be appended here -->
              </select>
            </div>
            <div class="mb-1 mt-1">
              <label class="form-label">Deskripsi</label>
              <textarea name="event-description-editor" id="event-description-editor" class="form-control"></textarea>
            </div>
            <div id="badge-area" class="mb-1 d-flex justify-content-between d-none">
              <span>Status : </span>
              <span class="badge bg-success rounded-pill badge-approve">Disetujui</span>
              <span class="badge bg-danger rounded-pill badge-expired">Kadaluarsa</span>
              <span class="badge bg-secondary rounded-pill badge-unapprove">Belum Disetujui</span>
            </div>
            <div class="mb-1 d-flex">
              <button type="submit" class="btn btn-primary add-event-btn me-1">Tambah</button>
              <button type="button" class="btn btn-outline-secondary btn-cancel" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-primary update-event-btn d-none me-1">Update</button>
              <button class="btn btn-outline-danger btn-delete-event d-none" id="btn-delete-event">Hapus</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--/ Calendar Add/Update/Delete event modal-->
</section>
<!-- Full calendar end -->
@endsection

@section('vendor-script')
  <!-- Vendor js files -->
  <script src="{{ asset(mix('vendors/js/calendar/fullcalendar.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/moment.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
    
@endsection

@section('page-script')
  <!-- Page js files -->
  <script>
    const ROOM_ID = "{{ $room_id }}";
  </script>
  <script src="{{ asset(mix('js/scripts/pages/app-calendar.js')) }}"></script>
@endsection
