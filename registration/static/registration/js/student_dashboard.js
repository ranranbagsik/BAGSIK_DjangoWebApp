document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});

async function loadStudents() {
    const loadingMessage = document.getElementById("loading-message");
    const errorMessage = document.getElementById("error-message");
    const studentCount = document.getElementById("student-count");
    const tableBody = document.getElementById("student-table-body");

    try {
        // Clear previous state and content before appending
        loadingMessage.textContent = "Loading students...";
        errorMessage.textContent = "";
        tableBody.innerHTML = ""; // <--- CRITICAL: Clears existing rows

        const response = await fetch("/api/students/");

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Authentication required. Please log in.");
            }
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        studentCount.textContent = data.count;

        if (!data.students || data.students.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="5" style="text-align: center;">No Student records found.</td>`;
            tableBody.appendChild(row);
        } else {
            // Append each student record to tableBody
            data.students.forEach(student => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.student_name}</td>
                    <td>${student.program}</td>
                    <td>${student.year_level}</td>
                    <td>${student.email}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        loadingMessage.textContent = "";

    } catch (error) {
        loadingMessage.textContent = "";
        errorMessage.textContent = error.message;
        console.error("Student loading error:", error);
    }
}