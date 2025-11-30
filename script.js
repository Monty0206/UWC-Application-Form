// ========================================
// UWC Application Portal - JavaScript
// ========================================

// State Management
const appState = {
    currentSection: 1,
    totalSections: 5,
    formData: {},
    emailVerified: false,
    phoneVerified: false,
    lowDataMode: false
};

// Sample ranking data (in real app, this would come from server)
const programRankings = {
    'bcom-accounting': { applicants: 514, places: 240, yourRank: 310 },
    'badmin': { applicants: 229, places: 130, yourRank: 92 },
    'ba-psychology': { applicants: 445, places: 180, yourRank: 125 },
    'ba-social-work': { applicants: 312, places: 150, yourRank: 88 },
    'bsc-it': { applicants: 389, places: 200, yourRank: 167 },
    'bsc-chemistry': { applicants: 178, places: 100, yourRank: 45 }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadSavedProgress();
    setupEventListeners();
    updateProgress();
});

// Initialize Application
function initializeApp() {
    console.log('UWC Application Portal initialized');
    showSection(1);

    // Load low-data mode preference
    const savedLowDataMode = localStorage.getItem('uwc_low_data_mode');
    if (savedLowDataMode === 'true') {
        toggleLowDataMode();
    }
}


// Setup Event Listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('nextBtn').addEventListener('click', nextSection);
    document.getElementById('prevBtn').addEventListener('click', prevSection);
    document.getElementById('submitBtn').addEventListener('click', submitApplication);

    // Save progress
    document.getElementById('saveProgress').addEventListener('click', saveProgress);

    // Help modal
    document.getElementById('helpBtn').addEventListener('click', () => showModal('helpModal'));
    document.getElementById('closeHelp').addEventListener('click', () => hideModal('helpModal'));

    // Low data mode toggle
    document.getElementById('lowDataToggle').addEventListener('click', toggleLowDataMode);

    // Email verification
    document.getElementById('verifyEmail').addEventListener('click', () => sendVerification('email'));
    document.getElementById('confirmEmailOtp').addEventListener('click', () => confirmVerification('email'));

    // Phone verification
    document.getElementById('verifyPhone').addEventListener('click', () => sendVerification('phone'));
    document.getElementById('confirmPhoneOtp').addEventListener('click', () => confirmVerification('phone'));

    // Form inputs - auto-save
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', () => {
            saveFormData();
            updateProgress();
        });
        input.addEventListener('blur', validateField);
    });

    // Program selection - show rankings
    ['program1', 'program2', 'program3'].forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.addEventListener('change', (e) => showRanking(e.target.value, id));
        }
    });

    // Conditional sections
    document.querySelectorAll('input[name="needResidence"]').forEach(radio => {
        radio.addEventListener('change', toggleConditionalSection);
    });

    document.querySelectorAll('input[name="needFinancialAid"]').forEach(radio => {
        radio.addEventListener('change', toggleConditionalSection);
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    hideModal(modal.id);
                }
            });
        }
    });
}

// Section Navigation
function showSection(sectionNumber) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show current section
    const currentSection = document.getElementById(`section${sectionNumber}`);
    if (currentSection) {
        currentSection.classList.add('active');
    }

    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < sectionNumber) {
            step.classList.add('completed');
        } else if (index + 1 === sectionNumber) {
            step.classList.add('active');
        }
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.disabled = sectionNumber === 1;

    if (sectionNumber === appState.totalSections) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        populateReviewSection();
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    appState.currentSection = sectionNumber;
    updateProgress();
}

function nextSection() {
    if (validateCurrentSection()) {
        if (appState.currentSection < appState.totalSections) {
            showSection(appState.currentSection + 1);
        }
    }
}

function prevSection() {
    if (appState.currentSection > 1) {
        showSection(appState.currentSection - 1);
    }
}

// Validation
function validateCurrentSection() {
    const currentSection = document.getElementById(`section${appState.currentSection}`);
    const requiredFields = currentSection.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });

    // Section-specific validation
    if (appState.currentSection === 1) {
        if (!appState.emailVerified) {
            showError('email', 'Please verify your email address');
            isValid = false;
        }
        if (!appState.phoneVerified) {
            showError('phone', 'Please verify your phone number');
            isValid = false;
        }
    }

    if (!isValid) {
        showNotification('Please complete all required fields', 'error');
    }

    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearError(field.id);

    // Required field check
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^(\+27|0)[0-9]{9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            errorMessage = 'Please enter a valid South African phone number';
            isValid = false;
        }
    }

    // ID number validation (basic)
    if (fieldName === 'idNumber' && value) {
        const idTypeRadio = document.querySelector('input[name="idType"]:checked');
        if (idTypeRadio && idTypeRadio.value === 'sa-id') {
            if (value.length !== 13 || !/^\d+$/.test(value)) {
                errorMessage = 'SA ID number must be 13 digits';
                isValid = false;
            }
        }
    }

    if (!isValid) {
        showError(field.id, errorMessage);
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('error');
    }
}

// Verification
function sendVerification(type) {
    const field = type === 'email' ? document.getElementById('email') : document.getElementById('phone');
    const value = field.value.trim();

    if (!validateField({ target: field })) {
        return;
    }

    // Simulate sending OTP
    showNotification(`Verification code sent to your ${type}`, 'success');

    // Show OTP input
    const otpGroup = document.getElementById(`${type}OtpGroup`);
    if (otpGroup) {
        otpGroup.classList.remove('hidden');
    }

    // In real app, this would call an API
    console.log(`Sending ${type} verification to:`, value);
}

function confirmVerification(type) {
    const otpInput = document.getElementById(`${type}Otp`);
    const otp = otpInput.value.trim();

    if (otp.length !== 6) {
        showNotification('Please enter a valid 6-digit code', 'error');
        return;
    }

    // Simulate verification (in real app, verify with server)
    if (otp === '123456' || otp.length === 6) {
        if (type === 'email') {
            appState.emailVerified = true;
            document.getElementById('emailVerified').classList.remove('hidden');
            document.getElementById('verifyEmail').disabled = true;
        } else {
            appState.phoneVerified = true;
            document.getElementById('phoneVerified').classList.remove('hidden');
            document.getElementById('verifyPhone').disabled = true;
        }

        document.getElementById(`${type}OtpGroup`).classList.add('hidden');
        showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully!`, 'success');
        saveFormData();
    } else {
        showNotification('Invalid verification code', 'error');
    }
}

// Program Rankings
function showRanking(programCode, selectId) {
    const rankingDiv = document.getElementById(`ranking${selectId.slice(-1)}`);
    if (!rankingDiv || !programCode) {
        if (rankingDiv) rankingDiv.innerHTML = '';
        return;
    }

    const data = programRankings[programCode];
    if (!data) {
        rankingDiv.innerHTML = '';
        return;
    }

    const isCompetitive = data.yourRank > data.places;
    const className = isCompetitive ? 'warning' : '';

    rankingDiv.className = `ranking-info ${className}`;
    rankingDiv.innerHTML = `
        <strong>📊 Application Status</strong>
        <p><strong>${data.applicants}</strong> total applicants for <strong>${data.places}</strong> available places</p>
        <p>Your current ranking: <strong>#${data.yourRank}</strong></p>
        <p class="small">
            ${isCompetitive
                ? '⚠️ This program is highly competitive. Consider improving your marks or selecting an alternative program.'
                : '✅ You are currently in a good position for this program. Final rankings will be based on your NSC results.'}
        </p>
    `;
}

// Conditional Sections
function toggleConditionalSection() {
    const residenceRadio = document.querySelector('input[name="needResidence"]:checked');
    const financialAidRadio = document.querySelector('input[name="needFinancialAid"]:checked');

    const residenceDetails = document.getElementById('residenceDetails');
    const financialAidDetails = document.getElementById('financialAidDetails');

    if (residenceRadio && residenceDetails) {
        if (residenceRadio.value === 'yes') {
            residenceDetails.classList.remove('hidden');
            document.getElementById('residenceReason').setAttribute('required', 'required');
        } else {
            residenceDetails.classList.add('hidden');
            document.getElementById('residenceReason').removeAttribute('required');
        }
    }

    if (financialAidRadio && financialAidDetails) {
        if (financialAidRadio.value === 'yes') {
            financialAidDetails.classList.remove('hidden');
        } else {
            financialAidDetails.classList.add('hidden');
        }
    }
}

// Review Section
function populateReviewSection() {
    const reviewContent = document.getElementById('reviewContent');
    const formData = getFormData();

    let html = '';

    // Personal Information
    html += `
        <div class="review-card">
            <div class="review-card-header">
                <i data-lucide="user"></i>
                <h3>Personal Information</h3>
            </div>
            <div class="review-card-body">
                <div class="review-row">
                    <span class="review-label">Full Name:</span>
                    <span class="review-value">${formData.firstName || ''} ${formData.surname || ''}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">Email:</span>
                    <span class="review-value">${formData.email || ''} ${appState.emailVerified ? '<span class="verified-badge-inline"><i data-lucide="check-circle"></i> Verified</span>' : ''}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">Phone:</span>
                    <span class="review-value">${formData.phone || ''} ${appState.phoneVerified ? '<span class="verified-badge-inline"><i data-lucide="check-circle"></i> Verified</span>' : ''}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">ID Number:</span>
                    <span class="review-value">${formData.idNumber || ''}</span>
                </div>
            </div>
        </div>
    `;

    // Academic Information
    const program1 = document.getElementById('program1');
    const program2 = document.getElementById('program2');
    const program3 = document.getElementById('program3');

    html += `
        <div class="review-card">
            <div class="review-card-header">
                <i data-lucide="graduation-cap"></i>
                <h3>Academic Information</h3>
            </div>
            <div class="review-card-body">
                <div class="review-row">
                    <span class="review-label">Applicant Type:</span>
                    <span class="review-value">${document.getElementById('studentType')?.selectedOptions[0]?.text || 'Not selected'}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">First Choice:</span>
                    <span class="review-value">${program1?.selectedOptions[0]?.text || 'Not selected'}</span>
                </div>
                ${program2?.value ? `
                <div class="review-row">
                    <span class="review-label">Second Choice:</span>
                    <span class="review-value">${program2.selectedOptions[0].text}</span>
                </div>` : ''}
                ${program3?.value ? `
                <div class="review-row">
                    <span class="review-label">Third Choice:</span>
                    <span class="review-value">${program3.selectedOptions[0].text}</span>
                </div>` : ''}
            </div>
        </div>
    `;

    // Residence
    const needResidence = document.querySelector('input[name="needResidence"]:checked')?.value;
    html += `
        <div class="review-card">
            <div class="review-card-header">
                <i data-lucide="home"></i>
                <h3>Residence</h3>
            </div>
            <div class="review-card-body">
                <div class="review-row">
                    <span class="review-label">Residence Required:</span>
                    <span class="review-value">${needResidence === 'yes' ? 'Yes' : 'No'}</span>
                </div>
                ${needResidence === 'yes' && formData.residenceReason ? `
                <div class="review-row">
                    <span class="review-label">Reason:</span>
                    <span class="review-value">${formData.residenceReason}</span>
                </div>` : ''}
            </div>
        </div>
    `;

    // Financial Aid
    const needFinancialAid = document.querySelector('input[name="needFinancialAid"]:checked')?.value;
    html += `
        <div class="review-card">
            <div class="review-card-header">
                <i data-lucide="dollar-sign"></i>
                <h3>Financial Aid</h3>
            </div>
            <div class="review-card-body">
                <div class="review-row">
                    <span class="review-label">Financial Aid Required:</span>
                    <span class="review-value">${needFinancialAid === 'yes' ? 'Yes' : 'No'}</span>
                </div>
                ${needFinancialAid === 'yes' && formData.nsfas ? '<div class="review-row"><span class="review-label"></span><span class="review-value"><i data-lucide="check"></i> NSFAS application requested</span></div>' : ''}
                ${needFinancialAid === 'yes' && formData.bursaries ? '<div class="review-row"><span class="review-label"></span><span class="review-value"><i data-lucide="check"></i> UWC Bursaries requested</span></div>' : ''}
                ${needFinancialAid === 'yes' && formData.scholarships ? '<div class="review-row"><span class="review-label"></span><span class="review-value"><i data-lucide="check"></i> Academic Scholarships requested</span></div>' : ''}
            </div>
        </div>
    `;

    reviewContent.innerHTML = html;

    // Re-initialize Lucide icons for dynamically added content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Form Data Management
function getFormData() {
    const form = document.getElementById('applicationForm');
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    return data;
}

function saveFormData() {
    const formData = getFormData();
    appState.formData = formData;
    localStorage.setItem('uwc_application_draft', JSON.stringify({
        formData,
        emailVerified: appState.emailVerified,
        phoneVerified: appState.phoneVerified,
        currentSection: appState.currentSection,
        timestamp: new Date().toISOString()
    }));

    showAutosaveIndicator();
}

function loadSavedProgress() {
    const saved = localStorage.getItem('uwc_application_draft');
    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        // Restore form data
        Object.keys(data.formData).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    const matchingField = document.querySelector(`[name="${key}"][value="${data.formData[key]}"]`);
                    if (matchingField) matchingField.checked = true;
                } else {
                    field.value = data.formData[key];
                }
            }
        });

        // Restore verification status
        appState.emailVerified = data.emailVerified || false;
        appState.phoneVerified = data.phoneVerified || false;

        if (appState.emailVerified) {
            document.getElementById('emailVerified').classList.remove('hidden');
            document.getElementById('verifyEmail').disabled = true;
        }
        if (appState.phoneVerified) {
            document.getElementById('phoneVerified').classList.remove('hidden');
            document.getElementById('verifyPhone').disabled = true;
        }

        showNotification('Previous progress restored', 'success');
    } catch (error) {
        console.error('Error loading saved progress:', error);
    }
}

function saveProgress() {
    saveFormData();
    showNotification('Progress saved successfully!', 'success');
}

// Submit Application
function submitApplication(e) {
    e.preventDefault();

    // Final validation
    const declaration = document.getElementById('declaration');
    const popia = document.getElementById('popia');

    if (!declaration.checked || !popia.checked) {
        showNotification('Please accept the declaration and POPIA consent', 'error');
        return;
    }

    // Simulate submission
    const formData = getFormData();

    showNotification('Submitting your application...', 'info');

    // Simulate API call
    setTimeout(() => {
        console.log('Application submitted:', formData);

        // Clear saved draft
        localStorage.removeItem('uwc_application_draft');

        // Show success message
        alert('✅ Application Submitted Successfully!\n\nYour application has been received. You will receive a confirmation email shortly.\n\nApplication Reference: UWC' + Date.now());

        // In real app, redirect to confirmation page
        // window.location.href = '/confirmation';
    }, 2000);
}

// Progress Tracking
function updateProgress() {
    const totalFields = document.querySelectorAll('input[required], select[required], textarea[required]').length;
    const completedFields = Array.from(document.querySelectorAll('input[required], select[required], textarea[required]'))
        .filter(field => field.value.trim() !== '').length;

    const progress = Math.round((completedFields / totalFields) * 100);

    const progressBar = document.getElementById('progressBar');
    progressBar.style.setProperty('--progress', `${progress}%`);
    progressBar.querySelector('.progress-text').textContent = `${progress}% Complete`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// Low Data Mode
function toggleLowDataMode() {
    appState.lowDataMode = !appState.lowDataMode;

    const dataSaved = document.getElementById('dataSaved');
    const toggleBtn = document.getElementById('lowDataToggle');

    if (appState.lowDataMode) {
        document.body.classList.add('low-data-mode');
        dataSaved.textContent = '✓ Low-data mode active (Saving ~70% data)';
        dataSaved.style.color = '#27AE60';
        dataSaved.style.fontWeight = '600';
        toggleBtn.textContent = 'Switch to normal version';

        // Disable Google Fonts
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => link.disabled = true);

        // Hide floating particles
        const particleContainer = document.querySelector('.floating-particles');
        if (particleContainer) {
            particleContainer.style.display = 'none';
        }

        showNotification('✅ Low-data mode enabled!\n\n• Images hidden\n• Animations disabled\n• Gradients simplified\n• System fonts used\n• Floating particles hidden\n\nData usage reduced by ~70%', 'success');
    } else {
        document.body.classList.remove('low-data-mode');
        dataSaved.textContent = '';
        toggleBtn.textContent = 'Switch to low-data version';

        // Re-enable Google Fonts
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => link.disabled = false);

        // Show floating particles again
        let particleContainer = document.querySelector('.floating-particles');
        if (particleContainer) {
            particleContainer.style.display = '';
        } else {
            // Recreate particles if they don't exist
            createFloatingParticles();
        }

        showNotification('Normal mode restored. Full features and animations enabled.', 'info');
    }

    // Save preference
    localStorage.setItem('uwc_low_data_mode', appState.lowDataMode);
}

// UI Helpers
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        // Trap focus in modal
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'error' ? '#E74C3C' : type === 'success' ? '#27AE60' : '#3498DB'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showAutosaveIndicator() {
    const indicator = document.getElementById('autosaveIndicator');
    indicator.classList.remove('hidden');

    setTimeout(() => {
        indicator.classList.add('hidden');
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProgress();
    }

    // Ctrl/Cmd + Arrow keys to navigate
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        nextSection();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSection();
    }
});

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', (e) => {
    const hasUnsavedChanges = Object.keys(getFormData()).length > 0;
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});

console.log('🎓 UWC Application Portal loaded successfully');