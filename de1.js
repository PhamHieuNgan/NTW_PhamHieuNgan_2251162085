
document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('employee-table-body');
    const addForm = document.getElementById('add-employee-form');
    const addEmployeeModal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));

    function renderTable() {
        tableBody.innerHTML = ''; 

        employees.forEach(employee => {
            const row = `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.address}</td>
                    <td>${employee.phone}</td>
                    <td>
                        <a href="#" class="edit"><i class="fas fa-pencil-alt text-warning"></i></a>
                        <a href="#" class="delete"><i class="fas fa-trash-alt text-danger"></i></a>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        document.getElementById('showing-entries').textContent = employees.length;
        document.getElementById('total-entries').textContent = employees.length;
    }

    addForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const name = document.getElementById('add-name').value.trim();
        const email = document.getElementById('add-email').value.trim();
        const address = document.getElementById('add-address').value.trim();
        const phone = document.getElementById('add-phone').value.trim();


        if (!name || !email || !address || !phone) {
            alert('Phản hồi: Vui lòng không để trống bất kỳ trường thông tin nào.');
            return; 
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Phản hồi: Số điện thoại không hợp lệ. Phải có đúng 10 ký tự và bắt đầu bằng số 0.');
            return; 
        }
                const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;

        const newEmployee = {
            id: newId,
            name: name,
            email: email,
            address: address,
            phone: phone
        };

        employees.push(newEmployee);
        renderTable();
        addForm.reset();
        addEmployeeModal.hide();
        alert('Thêm nhân viên mới thành công!');
    });

    renderTable();
});