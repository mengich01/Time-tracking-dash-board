
const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

let students = [];
let editIndex = -1;

// grade function
function getGrade(mark){
    if(mark >= 70) return "A";
    if(mark >= 60) return "B";
    if(mark >= 50) return "C";
    if(mark >= 40) return "D";
    return "E";
}

// render table
function renderTable(){
    tableBody.innerHTML = "";

    students.forEach((s, index)=>{
        const avgCat = (s.cat1 + s.cat2)/2;
        const finalMark = avgCat + s.exam;
        const grade = getGrade(finalMark);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.regno}</td>
            <td>${s.cat1}</td>
            <td>${s.cat2}</td>
            <td>${s.exam}</td>
            <td>${avgCat.toFixed(2)}</td>
            <td>${finalMark.toFixed(2)}</td>
            <td>${grade}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// submit form
form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const regno = document.getElementById("regno").value.trim();
    const cat1 = Number(document.getElementById("cat1").value);
    const cat2 = Number(document.getElementById("cat2").value);
    const exam = Number(document.getElementById("exam").value);

    // check duplicates
    const duplicate = students.find((s, i)=>
        (s.name === name || s.regno === regno) && i !== editIndex
    );

    if(duplicate){
        alert("Student already exists!");
        return;
    }

    const studentData = {name, regno, cat1, cat2, exam};

    if(editIndex === -1){
        students.push(studentData);
    }else{
        students[editIndex] = studentData;
        editIndex = -1;
    }

    renderTable();
    form.reset();
});

// edit
function editStudent(index){
    const s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("regno").value = s.regno;
    document.getElementById("cat1").value = s.cat1;
    document.getElementById("cat2").value = s.cat2;
    document.getElementById("exam").value = s.exam;

    editIndex = index;
}

// delete
function deleteStudent(index){
    if(confirm("Delete this student?")){
        students.splice(index,1);
        renderTable();
    }
}