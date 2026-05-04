// API communication functions

const API_BASE_URL = 'http://localhost:5000/api';

// Analyze profile API call
async function analyzeProfileAPI(profileData) {
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        
        // Fallback to client-side analysis if backend is not available
        console.log('Using client-side analysis...');
        return clientSideAnalysis(profileData);
    }
}

// Client-side fallback analysis
function clientSideAnalysis(profileData) {
    const analyzer = new ProfileAnalyzer();

    // Analyze individual components
    const headlineAnalysis = analyzer.analyzeHeadline(profileData.headline);
    const summaryAnalysis = analyzer.analyzeSummary(profileData.summary);
    const completenessScore = analyzer.calculateCompleteness(profileData);
    const keywordAnalysis = analyzer.analyzeKeywords(
        profileData.summary + ' ' + profileData.headline,
        profileData.industry
    );

    // Calculate overall score
    const overallScore = Math.round(
        (headlineAnalysis.score * 0.2 +
         summaryAnalysis.score * 0.3 +
         completenessScore * 0.2 +
         keywordAnalysis.score * 0.3) / 1
    );

    // Generate recommendations
    const metrics = {
        headlineScore: headlineAnalysis.score,
        summaryScore: summaryAnalysis.score,
        completenessScore: completenessScore,
        keywordScore: keywordAnalysis.score
    };

    const recommendations = analyzer.generateRecommendations(profileData, metrics);

    return {
        overallScore: overallScore,
        metrics: metrics,
        recommendations: recommendations,
        suggestedKeywords: keywordAnalysis.missing.slice(0, 10)
    };
}

// Save profile
async function saveProfileAPI(profileData) {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Save Profile Error:', error);
        throw error;
    }
}

// Get recommendations
async function getRecommendationsAPI(profileId) {
    try {
        const response = await fetch(`${API_BASE_URL}/recommendations/${profileId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Get Recommendations Error:', error);
        throw error;
    }
}
