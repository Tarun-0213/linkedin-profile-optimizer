// Main application logic

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profileForm');
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await analyzeProfile();
    });
});

// Analyze profile function
async function analyzeProfile() {
    // Get form data
    const profileData = {
        fullName: document.getElementById('fullName').value,
        currentTitle: document.getElementById('currentTitle').value,
        industry: document.getElementById('industry').value,
        headline: document.getElementById('headline').value,
        summary: document.getElementById('summary').value,
        experience: parseInt(document.getElementById('experience').value),
        skills: document.getElementById('skills').value
    };

    // Validate form
    if (!profileData.fullName || !profileData.currentTitle || !profileData.industry || 
        !profileData.summary || !profileData.experience) {
        alert('Please fill in all required fields!');
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
        alert('Error analyzing profile. Please try again.');
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

// Reset form
function resetForm() {
    document.getElementById('profileForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
