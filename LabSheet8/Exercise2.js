const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};


const { id, name, department, marks } = student;
console.log(`Extracted: ${name} (ID: ${id}) from ${department}`);

let grade = marks >= 90 ? "A" : "B";

const updatedStudent = { 
    ...student, 
    grade: grade 
};

console.log("Updated Student Object:", updatedStudent);