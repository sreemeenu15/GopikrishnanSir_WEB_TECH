// 1. Temporary Storage for User Input
let formData = {
    username: "",
    email: "",
    interest: ""
};

let currentStage = 1;
const totalStages = 4;

// DOM Elements
const stages = document.querySelectorAll('.form-stage');
const progressFill = document.getElementById('progress-fill');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const summaryText = document.getElementById('summary-text');

// 2. Navigation Control
function updateUI() {
    // Show/Hide Stages
    stages.forEach(stage => {
        stage.classList.toggle('active', parseInt(stage.dataset.stage) === currentStage);
    });

    // Update Progress Bar
    const progressPercent = (currentStage / totalStages) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Button Labels/Visibility
    prevBtn.style.visibility = currentStage === 1 ? 'hidden' : 'visible';
    nextBtn.innerText = currentStage === totalStages ? 'Submit' : 'Next';

    // If final stage, show summary
    if (currentStage === 4) {
        summaryText.innerHTML = `
            <strong>Name:</strong> ${formData.username}<br>
            <strong>Email:</strong> ${formData.email}<br>
            <strong>Interest:</strong> ${formData.interest}
        `;
    }
}

// 3. Strict Validation Logic per Stage
function validateStage() {
    const activeStage = document.querySelector('.form-stage.active');
    const errorMsg = activeStage.querySelector('.error-text');
    let isValid = true;

    if (currentStage === 1) {
        const val = document.getElementById('username').value.trim();
        isValid = val.length >= 3;
        if (isValid) formData.username = val;
    } 
    else if (currentStage === 2) {
        const val = document.getElementById('email').value;
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (isValid) formData.email = val;
    }
    else if (currentStage === 3) {
        const val = document.getElementById('interest').value.trim();
        isValid = val.length > 0;
        if (isValid) formData.interest = val;
    }

    errorMsg.style.display = isValid ? 'none' : 'block';
    return isValid;
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (validateStage()) {
        if (currentStage < totalStages) {
            currentStage++;
            updateUI();
        } else {
            alert("Form Submitted! \nData: " + JSON.stringify(formData));
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStage > 1) {
        currentStage--;
        updateUI();
    }
});

// Initial UI load
updateUI();