import swal from 'sweetalert2'
window.swal = swal
window.Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
})
