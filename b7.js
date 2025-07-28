const form = document.getElementById("formThem");
const tb = document.getElementById("thongBao");
const table = document.getElementById("bangSinhVien");
const btnSubmit = document.getElementById("btnSubmit");

let editingRow = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const maSV = document.getElementById("MaSV").value.trim();
  const hoTen = document.getElementById("hoten").value.trim();
  const email = document.getElementById("email").value.trim();
  const ngaySinh = document.getElementById("ngaysinh").value;
  const gioiTinh = document.querySelector("input[name='gioitinh']:checked")?.value || "";
  const ghiChu = document.getElementById("ghichu").value.trim();

  // Kiểm tra dữ liệu đầu vào
  if (!maSV || !hoTen || !email || !ngaySinh || !gioiTinh) {
    alert("❌ Vui lòng nhập đầy đủ thông tin bắt buộc!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("❌ Email không hợp lệ!");
    return;
  }

  if (editingRow) {
    editingRow.cells[0].innerText = maSV;
    editingRow.cells[1].innerText = hoTen;
    editingRow.cells[2].innerText = email;
    editingRow.cells[3].innerText = ngaySinh;
    editingRow.cells[4].innerText = gioiTinh;
    editingRow.cells[5].innerText = ghiChu;

    showMessage("✅ Cập nhật sinh viên thành công!");
    editingRow = null;
    btnSubmit.innerText = "Thêm";
  } else {
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = maSV;
    newRow.insertCell(1).innerText = hoTen;
    newRow.insertCell(2).innerText = email;
    newRow.insertCell(3).innerText = ngaySinh;
    newRow.insertCell(4).innerText = gioiTinh;
    newRow.insertCell(5).innerText = ghiChu;
    newRow.insertCell(6).innerHTML = `
      <button class="btn btn-sm btn-warning me-1" onclick="suaDong(this)">Sửa</button>
      <button class="btn btn-sm btn-danger" onclick="xoaDong(this)">Xóa</button>
    `;

    showMessage("✅ Thêm sinh viên thành công!");
  }

  form.reset();
});

function showMessage(msg) {
  tb.innerText = msg;
  tb.classList.remove("d-none");
  setTimeout(() => {
    tb.classList.add("d-none");
  }, 3000);
}

function xoaDong(btn) {
  if (confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
    const row = btn.closest("tr");
    row.remove();
    if (row === editingRow) {
      editingRow = null;
      form.reset();
      btnSubmit.innerText = "Thêm";
    }
  }
}

function suaDong(btn) {
  editingRow = btn.closest("tr");

  document.getElementById("MaSV").value = editingRow.cells[0].innerText;
  document.getElementById("hoten").value = editingRow.cells[1].innerText;
  document.getElementById("email").value = editingRow.cells[2].innerText;
  document.getElementById("ngaysinh").value = editingRow.cells[3].innerText;

  const gioiTinh = editingRow.cells[4].innerText.toLowerCase();
  if (gioiTinh === "nam" || gioiTinh === "nữ") {
    document.getElementById(gioiTinh).checked = true;
  }

  document.getElementById("ghichu").value = editingRow.cells[5].innerText;
  btnSubmit.innerText = "Cập nhật";
}
