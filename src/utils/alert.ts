import Swal from "sweetalert2";
const Alert = Swal.mixin({
  customClass: { popup: "alert-popup", title: "alert-title" },
  confirmButtonText: "好的",
});
const TimerAlert = Swal.mixin({
  customClass: { popup: "alert-popup", title: "alert-title" },
  timer: 600,
  confirmButtonText: "好的",
});
export { Alert, TimerAlert };
