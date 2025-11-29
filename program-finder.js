// Program Finder Logic
const userSubjects = [];

// UWC Programs Database with Requirements and Career Info
const uwcPrograms = [
    {
        id: 'bcom-accounting',
        title: 'BCom Accounting',
        code: 'BCOM-ACC',
        icon: '💼',
        faculty: 'Economic and Management Sciences',
        description: 'Become a chartered accountant (CA) with this professional accounting degree.',
        requirements: {
            math: 60,
            english: 50,
            required: ['math', 'accounting'],
            recommended: ['economics']
        },
        whatYoullStudy: 'Financial Accounting, Auditing, Taxation, Management Accounting, Business Law, Economics',
        careers: ['Chartered Accountant (CA)', 'Auditor', 'Tax Consultant', 'Financial Manager', 'Business Analyst', 'CFO'],
        salaryRange: 'R350,000 - R1,200,000/year',
        furtherStudy: 'Honours in Accounting, CA(SA) Articles, Masters in Taxation',
        duration: '3-4 years',
        nqfLevel: 7
    },
    {
        id: 'bcom-economics',
        title: 'BCom Economics',
        code: 'BCOM-ECO',
        icon: '📈',
        faculty: 'Economic and Management Sciences',
        description: 'Analyze markets, policies, and economic trends to shape business and government decisions.',
        requirements: {
            math: 50,
            english: 50,
            recommended: ['economics', 'accounting']
        },
        whatYoullStudy: 'Microeconomics, Macroeconomics, Econometrics, Development Economics, Financial Economics, Economic Policy',
        careers: ['Economist', 'Policy Analyst', 'Investment Analyst', 'Economic Researcher', 'Financial Advisor', 'Data Analyst'],
        salaryRange: 'R300,000 - R900,000/year',
        furtherStudy: 'Honours in Economics, MCom, PhD in Economics',
        duration: '3 years',
        nqfLevel: 7
    },
    {
        id: 'badmin',
        title: 'Bachelor of Administration',
        code: 'BADMIN',
        icon: '🏢',
        faculty: 'Economic and Management Sciences',
        description: 'Learn business management, leadership, and administration skills.',
        requirements: {
            math: 40, // Can use Math Lit
            english: 50,
            recommended: ['business-studies', 'economics', 'accounting']
        },
        whatYoullStudy: 'Business Management, Human Resources, Marketing, Financial Management, Operations Management, Entrepreneurship',
        careers: ['Business Manager', 'HR Manager', 'Operations Manager', 'Marketing Manager', 'Entrepreneur', 'Project Manager'],
        salaryRange: 'R250,000 - R800,000/year',
        furtherStudy: 'Honours in Business Administration, MBA',
        duration: '3 years',
        nqfLevel: 7
    },
    {
        id: 'bsc-it',
        title: 'BSc Information Systems',
        code: 'BSC-IS',
        icon: '💻',
        faculty: 'Natural Sciences',
        description: 'Build software, apps, and digital solutions that power the modern world.',
        requirements: {
            math: 60,
            english: 50,
            required: ['math'],
            recommended: ['physical-science', 'cat', 'it']
        },
        whatYoullStudy: 'Programming, Database Systems, Web Development, Software Engineering, Cybersecurity, AI & Machine Learning',
        careers: ['Software Developer', 'Data Scientist', 'IT Consultant', 'Systems Analyst', 'Web Developer', 'Cybersecurity Specialist'],
        salaryRange: 'R300,000 - R1,000,000/year',
        furtherStudy: 'Honours in IT, MSc Computer Science, Certifications (AWS, Azure)',
        duration: '3 years',
        nqfLevel: 7
    },
    {
        id: 'bsc-chemistry',
        title: 'BSc Chemistry',
        code: 'BSC-CHEM',
        icon: '🧪',
        faculty: 'Natural Sciences',
        description: 'Explore the building blocks of matter and create solutions to global challenges.',
        requirements: {
            math: 60,
            english: 50,
            required: ['math', 'physical-science'],
            recommended: ['life-science']
        },
        whatYoullStudy: 'Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Biochemistry, Chemical Engineering',
        careers: ['Chemist', 'Chemical Engineer', 'Pharmaceutical Scientist', 'Quality Control Analyst', 'Environmental Scientist', 'Researcher'],
        salaryRange: 'R280,000 - R750,000/year',
        furtherStudy: 'Honours in Chemistry, MSc Chemistry, PhD, Professional Chemist (SACNASP)',
        duration: '3 years',
        nqfLevel: 7
    },
    {
        id: 'bsc-life-sciences',
        title: 'BSc Life Sciences & Biotechnology',
        code: 'BSC-BIO',
        icon: '🔬',
        faculty: 'Natural Sciences',
        description: 'Study living organisms and develop biotechnology solutions for health and environment.',
        requirements: {
            math: 50,
            english: 50,
            required: ['life-science'],
            recommended: ['physical-science', 'math']
        },
        whatYoullStudy: 'Biology, Genetics, Microbiology, Molecular Biology, Biotechnology, Ecology, Biochemistry',
        careers: ['Biotechnologist', 'Microbiologist', 'Medical Scientist', 'Genetic Counselor', 'Environmental Consultant', 'Researcher'],
        salaryRange: 'R250,000 - R700,000/year',
        furtherStudy: 'Honours in Biotechnology, MSc, PhD, Medical School',
        duration: '3 years',
        nqfLevel: 7
    },
    {
        id: 'ba-psychology',
        title: 'BA Psychology',
        code: 'BA-PSY',
        icon: '🧠',
        faculty: 'Community and Health Sciences',
        description: 'Understand human behavior and help people improve their mental health and wellbeing.',
        requirements: {
            math: 40, // Can use Math Lit
            english: 50,
            recommended: ['life-science', 'history']
        },
        whatYoullStudy: 'Developmental Psychology, Social Psychology, Abnormal Psychology, Research Methods, Counseling, Psychopathology',
        careers: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Research Psychologist', 'Educational Psychologist', 'Social Worker'],
        salaryRange: 'R200,000 - R650,000/year',
        furtherStudy: 'Honours in Psychology, Masters in Clinical/Counseling Psychology, PhD',
        duration: '3 years (+ Honours + Masters for clinical)',
        nqfLevel: 7
    },
    {
        id: 'ba-social-work',
        title: 'Bachelor of Social Work',
        code: 'BSW',
        icon: '🤝',
        faculty: 'Community and Health Sciences',
        description: 'Make a difference in communities by helping vulnerable individuals and families.',
        requirements: {
            math: 40, // Can use Math Lit
            english: 50,
            recommended: ['life-science', 'geography', 'history']
        },
        whatYoullStudy: 'Social Work Practice, Community Development, Social Policy, Child & Family Welfare, Substance Abuse, Trauma Counseling',
        careers: ['Social Worker', 'Community Development Officer', 'Child Protection Officer', 'Hospital Social Worker', 'NGO Manager', 'Youth Worker'],
        salaryRange: 'R180,000 - R450,000/year',
        furtherStudy: 'Masters in Social Work, PhD in Social Development',
        duration: '4 years (includes practical work)',
        nqfLevel: 8
    },
    {
        id: 'llb-law',
        title: 'LLB (Bachelor of Laws)',
        code: 'LLB',
        icon: '⚖️',
        faculty: 'Law',
        description: 'Become a lawyer and advocate for justice in courts, corporations, or government.',
        requirements: {
            math: 50,
            english: 60,
            required: ['english'],
            recommended: ['history', 'geography', 'accounting']
        },
        whatYoullStudy: 'Constitutional Law, Criminal Law, Law of Contract, Human Rights Law, Commercial Law, Legal Practice',
        careers: ['Advocate', 'Attorney', 'Magistrate', 'State Prosecutor', 'Corporate Lawyer', 'Legal Advisor', 'Judge'],
        salaryRange: 'R250,000 - R1,500,000+/year',
        furtherStudy: 'Pupillage, LLM, Admission as Attorney/Advocate',
        duration: '4 years',
        nqfLevel: 8
    },
    {
        id: 'bed-foundation-phase',
        title: 'BEd Foundation Phase Teaching',
        code: 'BED-FP',
        icon: '👶',
        faculty: 'Education',
        description: 'Teach and shape young minds in grades R-3.',
        requirements: {
            math: 50,
            english: 50,
            recommended: ['any-language']
        },
        whatYoullStudy: 'Early Childhood Development, Teaching Methods, Curriculum Design, Educational Psychology, Literacy Development',
        careers: ['Foundation Phase Teacher', 'School Principal', 'Curriculum Developer', 'Education Consultant', 'Remedial Therapist'],
        salaryRange: 'R200,000 - R550,000/year',
        furtherStudy: 'Honours in Education, MEd, Educational Leadership',
        duration: '4 years',
        nqfLevel: 7
    },
    {
        id: 'ba-english',
        title: 'BA English & Communication',
        code: 'BA-ENG',
        icon: '📝',
        faculty: 'Arts and Humanities',
        description: 'Master language, literature, and communication for media, writing, and teaching.',
        requirements: {
            math: 40,
            english: 60,
            required: ['english'],
            recommended: ['history', 'afrikaans']
        },
        whatYoullStudy: 'English Literature, Creative Writing, Journalism, Media Studies, Communication Theory, Linguistics',
        careers: ['Journalist', 'Content Writer', 'Editor', 'Communications Manager', 'Copywriter', 'English Teacher', 'Publisher'],
        salaryRange: 'R180,000 - R600,000/year',
        furtherStudy: 'Honours in English, MA in Journalism, PGCE for Teaching',
        duration: '3 years',
        nqfLevel: 7
    },
    {
        id: 'bsc-nursing',
        title: 'BSc Nursing',
        code: 'BSC-NURS',
        icon: '👨‍⚕️',
        faculty: 'Community and Health Sciences',
        description: 'Provide essential healthcare and save lives as a professional nurse.',
        requirements: {
            math: 50,
            english: 50,
            required: ['life-science', 'physical-science'],
            recommended: ['math']
        },
        whatYoullStudy: 'Anatomy, Physiology, Pharmacology, Clinical Nursing, Community Health, Midwifery, Nursing Ethics',
        careers: ['Professional Nurse', 'Midwife', 'Theatre Nurse', 'ICU Nurse', 'Nursing Manager', 'Community Health Nurse'],
        salaryRange: 'R220,000 - R600,000/year',
        furtherStudy: 'Honours in Nursing, Masters in Advanced Nursing, Nursing Specializations',
        duration: '4 years',
        nqfLevel: 8
    },
    {
        id: 'ba-sport-recreation',
        title: 'BA Sport, Recreation & Exercise Science',
        code: 'BA-SPORT',
        icon: '⚽',
        faculty: 'Community and Health Sciences',
        description: 'Combine passion for sport with science to improve human performance and health.',
        requirements: {
            math: 40,
            english: 50,
            recommended: ['life-science', 'physical-science']
        },
        whatYoullStudy: 'Exercise Physiology, Sports Psychology, Biomechanics, Sports Management, Coaching, Nutrition',
        careers: ['Sports Coach', 'Biokineticist', 'Sports Scientist', 'Fitness Consultant', 'Sports Manager', 'PE Teacher'],
        salaryRange: 'R180,000 - R500,000/year',
        furtherStudy: 'Honours in Sports Science, Masters in Biokinetics, Coaching Certifications',
        duration: '3 years',
        nqfLevel: 7
    }
];

// Add Subject Function
function addSubject() {
    const subjectSelect = document.getElementById('subjectSelect');
    const percentageInput = document.getElementById('percentageInput');

    const subjectValue = subjectSelect.value;
    const subjectName = subjectSelect.options[subjectSelect.selectedIndex].text;
    const percentage = parseInt(percentageInput.value);

    // Validation
    if (!subjectValue) {
        alert('⚠️ Please select a subject');
        return;
    }

    if (!percentage || percentage < 0 || percentage > 100) {
        alert('⚠️ Please enter a valid percentage (0-100)');
        return;
    }

    // Check if subject already added
    if (userSubjects.find(s => s.value === subjectValue)) {
        alert('⚠️ This subject has already been added');
        return;
    }

    // Add to array
    userSubjects.push({
        value: subjectValue,
        name: subjectName,
        percentage: percentage
    });

    // Clear inputs
    subjectSelect.value = '';
    percentageInput.value = '';

    // Update UI
    renderSubjects();
    updateRecommendationsButton();
}

// Remove Subject Function
function removeSubject(subjectValue) {
    const index = userSubjects.findIndex(s => s.value === subjectValue);
    if (index > -1) {
        userSubjects.splice(index, 1);
        renderSubjects();
        updateRecommendationsButton();
    }
}

// Render Subjects List
function renderSubjects() {
    const subjectsList = document.getElementById('subjectsList');

    if (userSubjects.length === 0) {
        subjectsList.innerHTML = '<p class="empty-state">No subjects added yet. Add your first subject above!</p>';
        return;
    }

    subjectsList.innerHTML = userSubjects.map(subject => {
        const percentageClass = subject.percentage >= 70 ? 'high' : subject.percentage >= 50 ? 'medium' : 'low';

        return `
            <div class="subject-item">
                <div class="subject-info">
                    <span class="subject-name">${subject.name}</span>
                    <span class="percentage-badge ${percentageClass}">${subject.percentage}%</span>
                </div>
                <button class="btn-remove" onclick="removeSubject('${subject.value}')" title="Remove subject">
                    ✖
                </button>
            </div>
        `;
    }).join('');
}

// Update Get Recommendations Button
function updateRecommendationsButton() {
    const btn = document.getElementById('getRecommendationsBtn');
    btn.disabled = userSubjects.length < 3; // Require at least 3 subjects

    if (userSubjects.length < 3) {
        btn.textContent = `🎯 Add ${3 - userSubjects.length} more subject(s) to continue`;
    } else {
        btn.textContent = '🎯 Get My Recommendations';
    }
}

// Calculate Match Score
function calculateMatch(program) {
    let score = 0;
    let maxScore = 100;
    let qualifies = true;
    let reasons = [];

    // Check Math requirement
    if (program.requirements.math) {
        const mathSubject = userSubjects.find(s => s.value === 'math');
        const mathLitSubject = userSubjects.find(s => s.value === 'math-lit');

        if (mathSubject && mathSubject.percentage >= program.requirements.math) {
            score += 30;
        } else if (mathLitSubject && program.requirements.math <= 40) {
            score += 25; // Math Lit acceptable for some programs
        } else {
            qualifies = false;
            reasons.push(`Need Mathematics: ${program.requirements.math}%+ (you have ${mathSubject ? mathSubject.percentage + '%' : 'none'})`);
        }
    }

    // Check English requirement
    if (program.requirements.english) {
        const englishSubject = userSubjects.find(s => s.value === 'english' || s.value === 'english-fal');

        if (englishSubject && englishSubject.percentage >= program.requirements.english) {
            score += 25;
        } else {
            qualifies = false;
            reasons.push(`Need English: ${program.requirements.english}%+ (you have ${englishSubject ? englishSubject.percentage + '%' : 'none'})`);
        }
    }

    // Check required subjects
    if (program.requirements.required) {
        program.requirements.required.forEach(req => {
            const hasSubject = userSubjects.find(s => s.value === req);
            if (hasSubject) {
                score += 20;
            } else if (req !== 'math' && req !== 'english') { // Already checked above
                qualifies = false;
                reasons.push(`Missing required subject: ${req}`);
            }
        });
    }

    // Check recommended subjects (bonus points)
    if (program.requirements.recommended) {
        program.requirements.recommended.forEach(rec => {
            const hasSubject = userSubjects.find(s => s.value === rec);
            if (hasSubject) {
                score += 10;
            }
        });
    }

    // Overall grade bonus
    const avgGrade = userSubjects.reduce((sum, s) => sum + s.percentage, 0) / userSubjects.length;
    if (avgGrade >= 70) score += 15;
    else if (avgGrade >= 60) score += 10;
    else if (avgGrade >= 50) score += 5;

    return {
        score: Math.min(score, 100),
        qualifies,
        reasons,
        level: score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'fair'
    };
}

// Get Recommendations
function getRecommendations() {
    if (userSubjects.length < 3) {
        alert('⚠️ Please add at least 3 subjects to get recommendations');
        return;
    }

    // Calculate matches for all programs
    const matches = uwcPrograms.map(program => ({
        ...program,
        match: calculateMatch(program)
    })).sort((a, b) => b.match.score - a.match.score); // Sort by match score

    // Render results
    renderResults(matches);

    // Scroll to results
    document.getElementById('resultsSection').classList.remove('hidden');
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// Render Results
function renderResults(matches) {
    const resultsGrid = document.getElementById('resultsGrid');

    resultsGrid.innerHTML = matches.map(program => {
        const match = program.match;
        const statusClass = match.qualifies ? 'qualified' : 'not-qualified';
        const statusIcon = match.qualifies ? '✅' : '⚠️';
        const statusText = match.qualifies
            ? `You qualify! Match: ${match.score}%`
            : `Requirements not met`;

        return `
            <div class="program-card">
                <div class="match-score ${match.level}">${match.score}% Match</div>

                <div class="program-header">
                    <div class="program-icon">${program.icon}</div>
                    <h3 class="program-title">${program.title}</h3>
                    <p class="program-code">${program.code} • ${program.duration}</p>
                </div>

                <div class="requirements-status ${statusClass}">
                    <div class="status-text">
                        <span>${statusIcon}</span>
                        <span>${statusText}</span>
                    </div>
                    ${!match.qualifies ? `<ul style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--error);">
                        ${match.reasons.map(r => `<li>${r}</li>`).join('')}
                    </ul>` : ''}
                </div>

                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">${program.description}</p>

                <div class="detail-item">
                    <div class="detail-icon">📚</div>
                    <div class="detail-content">
                        <h4>What You'll Study:</h4>
                        <p>${program.whatYoullStudy}</p>
                    </div>
                </div>

                <div class="salary-info">
                    <h4>💰 Potential Salary:</h4>
                    <div class="salary-range">${program.salaryRange}</div>
                </div>

                <div class="career-paths">
                    <h4>💼 Career Opportunities:</h4>
                    <div class="career-list">
                        ${program.careers.slice(0, 4).map(career =>
                            `<span class="career-tag">${career}</span>`
                        ).join('')}
                    </div>
                </div>

                <div class="detail-item" style="margin-top: 1rem;">
                    <div class="detail-icon">🎓</div>
                    <div class="detail-content">
                        <h4>Further Study:</h4>
                        <p>${program.furtherStudy}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Reset Finder
function resetFinder() {
    userSubjects.length = 0;
    renderSubjects();
    updateRecommendationsButton();
    document.getElementById('resultsSection').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Allow Enter key to add subject
document.addEventListener('DOMContentLoaded', () => {
    const percentageInput = document.getElementById('percentageInput');
    percentageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addSubject();
        }
    });
});
