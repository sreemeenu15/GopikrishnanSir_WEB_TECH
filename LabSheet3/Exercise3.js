// 1. Data Structure: Store questions and validation rules
const surveyQuestions = [
    {
        id: "q1",
        label: "Full Name",
        type: "text",
        required: true,
        minLength: 3
    },
    {
        id: "q2",
        label: "How did you hear about us?",
        type: "radio",
        options: ["Social Media", "Friend", "Ad"],
        required: true
    },
    {
        id: "q3",
        label: "Interests (Select at least 2)",
        type: "checkbox",
        options: ["Coding", "Design", "Marketing", "Gaming"],
        minSelections: 2
    }
];

const container = document.getElementById('survey-container');
const form = document.getElementById('survey-form');

// 2. Generator: Dynamically create form fields
function generateForm() {
    surveyQuestions.forEach(q => {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';
        wrapper.setAttribute('data-id', q.id);

        const label = document.createElement('label');
        label.className = 'question-label';
        label.innerText = q.label;
        wrapper.appendChild(label);

        // Handle different input types
        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = q.id;
            wrapper.appendChild(input);
        } 
        else if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                const optWrapper = document.createElement('div');
                const input = document.createElement('input');
                input.type = q.type;
                input.name = q.id;
                input.value = opt;
                
                const optLabel = document.createTextNode(opt);
                optWrapper.appendChild(input);
                optWrapper.appendChild(optLabel);
                wrapper.appendChild(optWrapper);
            });
        }

        // Placeholder for error messages
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-msg';
        wrapper.appendChild(errorSpan);

        container.appendChild(wrapper);
    });
}

// 3. Validator: Validate before submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    surveyQuestions.forEach(q => {
        const wrapper = document.querySelector(`[data-id="${q.id}"]`);
        const errorSpan = wrapper.querySelector('.error-msg');
        errorSpan.innerText = ""; // Reset errors
        
        let isValid = true;
        let errorMessage = "";

        if (q.type === 'text') {
            const input = wrapper.querySelector('input');
            if (q.required && !input.value.trim()) {
                isValid = false;
                errorMessage = "This field is required.";
            } else if (q.minLength && input.value.length < q.minLength) {
                isValid = false;
                errorMessage = `Minimum ${q.minLength} characters required.`;
            }
        } 
        else if (q.type === 'radio') {
            const checked = wrapper.querySelector('input:checked');
            if (q.required && !checked) {
                isValid = false;
                errorMessage = "Please select an option.";
            }
        }
        else if (q.type === 'checkbox') {
            const checkedCount = wrapper.querySelectorAll('input:checked').length;
            if (q.minSelections && checkedCount < q.minSelections) {
                isValid = false;
                errorMessage = `Please select at least ${q.minSelections} options.`;
            }
        }

        if (!isValid) {
            errorSpan.innerText = errorMessage;
            isFormValid = false;
        }
    });

    if (isFormValid) {
        alert("Survey submitted successfully!");
        form.reset();
    }
});

// Run the generator
generateForm();