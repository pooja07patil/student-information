document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    function renderTable() {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.classList.add('fade-in');
            row.insertCell(0).innerText = student.name;
            row.insertCell(1).innerText = student.age;
            row.insertCell(2).innerText = student.course;
            row.insertCell(3).innerText = student.address;
            row.insertCell(4).innerText = student.contact;
            const actions = row.insertCell(5);
            actions.innerHTML = `
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            `;
        });
    }

    function saveStudent(event) {
        event.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const course = document.getElementById('course').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;
        const student = { name, age, course, address, contact };

        if (studentId) {
            students[studentId] = student;
        } else {
            students.push(student);
        }

        localStorage.setItem('students', JSON.stringify(students));
        studentForm.reset();
        renderTable();
    }

    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('studentId').value = index;
        document.getElementById('name').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('course').value = student.course;
        document.getElementById('address').value = student.address;
        document.getElementById('contact').value = student.contact;
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    studentForm.addEventListener('submit', saveStudent);
    renderTable();
});
