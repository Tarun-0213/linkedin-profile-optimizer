// Main application logic

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profileForm');
    const urlForm = document.getElementById('urlForm');
    
    // Manual form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await analyzeProfile();
    });

    // URL form submission
    urlForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        await analyzeProfileFromURL();
    });
});

// Switch between tabs
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Analyze profile from URL
async function analyzeProfileFromURL() {
    const url = document.getElementById('linkedinUrl').value;

    // Validate URL format
    if (!isValidLinkedInURL(url)) {
        showError('Please enter a valid LinkedIn profile URL');
        return;
    }

    showLoadingSpinner();

    try {
        // Extract profile data from URL
        const profileData = await extractLinkedInProfile(url);
        
        if (!profileData) {
            showError('Unable to extract profile data. Please try the Manual Input tab.');
            return;
        }

        // Analyze the extracted profile
        const response = await analyzeProfileAPI(profileData);
        displayResults(response);
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
        showError('Error analyzing profile. Please try again.');
    } finally {
        hideLoadingSpinner();
    }
}

// Validate LinkedIn URL
function isValidLinkedInURL(url) {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/i;
    return linkedinRegex.test(url);
}

// Extract LinkedIn profile data from URL (using LinkedIn's public API or scraping simulation)
async function extractLinkedInProfile(url) {
    try {
        // In a real scenario, you would:
        // 1. Use LinkedIn API (requires OAuth)
        // 2. Or use a scraping library
        // 3. Or ask user to paste their profile data

        // For now, we'll use a backend endpoint that handles this
        const response = await fetch('http://localhost:5000/api/extract-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });

        if (response.ok) {
            return await response.json();
        } else {
            // Fallback: Show a helpful message
            showError('To analyze a LinkedIn profile:\n1. Open your LinkedIn profile\n2. Copy your About section, headline, and skills\n3. Use the Manual Input tab');
            return null;
        }
    } catch (error) {
        console.error('Extract profile error:', error);
        // Fallback: Use manual input
        return null;
    }
}

// Analyze profile function (manual input)
async function analyzeProfile() {
    // Get form data
    const profileData = {
        full_name: document.getElementById('fullName').value,
        current_title: document.getElementById('currentTitle').value,
        industry: document.getElementById('industry').value,
        headline: document.getElementById('headline').value,
        summary: document.getElementById('summary').value,
        experience: parseInt(document.getElementById('experience').value),
        skills: document.getElementById('skills').value
    };

    // Validate form
    if (!profileData.full_name || !profileData.current_title || !profileData.industry || 
        !profileData.summary || !profileData.experience) {
        showError('Please fill in all required fields!');
        return;
    }

    // Show loading spinner
    showLoadingSpinner();

    try {
        // Send data to backend
        const response = await analyzeProfileAPI(profileData);

        // Display results
        displayResults(response);
    } catch (error) {
        console.error('Error:', error);
        showError('Error analyzing profile. Please try again.');
    } finally {
        // Hide loading spinner
        hideLoadingSpinner();
    }
}

// Display results
function displayResults(data) {
    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    
    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    // Update overall score
    const overallScore = data.overallScore || 0;
    document.getElementById('overallScore').textContent = overallScore;
    
    // Update score message
    let scoreMessage = '';
    if (overallScore >= 80) {
        scoreMessage = '🎉 Excellent! Your profile is well-optimized.';
    } else if (overallScore >= 60) {
        scoreMessage = '👍 Good! Follow recommendations to improve further.';
    } else if (overallScore >= 40) {
        scoreMessage = '💡 Fair. Implement recommendations to boost your profile.';
    } else {
        scoreMessage = '⚠️ Needs improvement. Follow the recommendations below.';
    }
    document.getElementById('scoreMessage').textContent = scoreMessage;

    // Update metric scores
    updateMetricScore('headlineScore', 'headlineText', data.metrics?.headlineScore || 0);
    updateMetricScore('summaryScore', 'summaryText', data.metrics?.summaryScore || 0);
    updateMetricScore('completenessScore', 'completenessText', data.metrics?.completenessScore || 0);
    updateMetricScore('keywordScore', 'keywordText', data.metrics?.keywordScore || 0);

    // Display recommendations
    displayRecommendations(data.recommendations || []);

    // Display keywords
    displayKeywords(data.suggestedKeywords || []);
}

// Update metric score display
function updateMetricScore(scoreId, textId, score) {
    const element = document.getElementById(scoreId);
    element.style.width = score + '%';
    document.getElementById(textId).textContent = Math.round(score) + '/100';
}

// Display recommendations
function displayRecommendations(recommendations) {
    const list = document.getElementById('recommendationsList');
    list.innerHTML = '';

    if (recommendations.length === 0) {
        list.innerHTML = '<p>No recommendations at this time. Your profile is well-optimized!</p>';
        return;
    }

    recommendations.forEach((rec, index) => {
        const div = document.createElement('div');
        div.className = 'recommendation-item';
        div.innerHTML = `
            <h5>${index + 1}. ${rec.title}</h5>
            <p>${rec.description}</p>
        `;
        list.appendChild(div);
    });
}

// Display keywords
function displayKeywords(keywords) {
    const list = document.getElementById('keywordsList');
    list.innerHTML = '';

    if (keywords.length === 0) {
        list.innerHTML = '<p>No keyword suggestions at this time.</p>';
        return;
    }

    keywords.forEach(keyword => {
        const span = document.createElement('span');
        span.className = 'keyword-badge';
        span.textContent = keyword;
        list.appendChild(span);
    });
}

// Show loading spinner
function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

// Hide loading spinner
function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// Show error alert
function showError(message) {
    const errorAlert = document.getElementById('errorAlert');
    document.getElementById('errorMessage').textContent = message;
    errorAlert.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeAlert();
    }, 5000);
}

// Close error alert
function closeAlert() {
    document.getElementById('errorAlert').style.display = 'none';
}

// Reset form
function resetForm() {
    document.getElementById('profileForm').reset();
    document.getElementById('urlForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
