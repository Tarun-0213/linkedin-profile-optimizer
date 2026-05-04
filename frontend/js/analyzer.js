// Client-side analysis functions

class ProfileAnalyzer {
    constructor() {
        this.minHeadlineLength = 30;
        this.maxHeadlineLength = 220;
        this.minSummaryLength = 100;
        this.maxSummaryLength = 2600;
    }

    // Analyze headline
    analyzeHeadline(headline) {
        let score = 0;
        const feedback = [];

        if (!headline) {
            return { score: 0, feedback: ['Headline is missing'] };
        }

        // Length check
        if (headline.length < this.minHeadlineLength) {
            score += 30;
            feedback.push('Headline is too short. Aim for 30-220 characters.');
        } else if (headline.length > this.maxHeadlineLength) {
            score += 40;
            feedback.push('Headline is too long. Keep it under 220 characters.');
        } else {
            score += 60;
        }

        // Contains keywords
        const keywords = ['engineer', 'manager', 'developer', 'specialist', 'analyst', 'designer'];
        if (keywords.some(kw => headline.toLowerCase().includes(kw))) {
            score += 20;
        }

        // Professional tone
        if (!headline.match(/[!@#$%^&*]/)) {
            score += 20;
        }

        return { score: Math.min(score, 100), feedback };
    }

    // Analyze summary
    analyzeSummary(summary) {
        let score = 0;
        const feedback = [];

        if (!summary) {
            return { score: 0, feedback: ['Summary is missing'] };
        }

        // Length check
        if (summary.length < this.minSummaryLength) {
            score += 30;
            feedback.push('Summary is too short. Aim for at least 100 characters.');
        } else if (summary.length > this.maxSummaryLength) {
            score += 40;
            feedback.push('Summary is too long. Keep it under 2600 characters.');
        } else {
            score += 50;
        }

        // Word count
        const wordCount = summary.split(/\s+/).length;
        if (wordCount >= 50) {
            score += 25;
        }

        // Check for action verbs
        const actionVerbs = ['develop', 'create', 'lead', 'manage', 'design', 'build', 'achieve', 'implement'];
        const verbCount = actionVerbs.filter(verb => summary.toLowerCase().includes(verb)).length;
        if (verbCount > 0) {
            score += 15;
        }

        // Check for specific achievements
        if (summary.match(/\d+%|\d+\+|million|thousand/i)) {
            score += 10;
        }

        return { score: Math.min(score, 100), feedback };
    }

    // Calculate completeness
    calculateCompleteness(profileData) {
        let completeness = 0;
        const maxPoints = 100;

        if (profileData.fullName) completeness += 15;
        if (profileData.currentTitle) completeness += 15;
        if (profileData.industry) completeness += 15;
        if (profileData.headline) completeness += 20;
        if (profileData.summary) completeness += 20;
        if (profileData.skills) completeness += 15;

        return Math.min(completeness, maxPoints);
    }

    // Extract and score keywords
    analyzeKeywords(text, industry) {
        const industryKeywords = {
            'Technology': ['python', 'javascript', 'machine learning', 'api', 'database', 'software', 'coding', 'agile'],
            'Finance': ['financial analysis', 'accounting', 'investment', 'trading', 'compliance', 'risk management'],
            'Marketing': ['digital marketing', 'seo', 'content', 'social media', 'campaign', 'analytics'],
            'Sales': ['sales', 'negotiation', 'customer', 'pipeline', 'revenue', 'closing'],
            'Healthcare': ['patient care', 'clinical', 'diagnosis', 'medical', 'healthcare', 'treatment'],
        };

        const keywords = industryKeywords[industry] || [];
        const foundKeywords = [];
        let keywordScore = 0;

        keywords.forEach(keyword => {
            if (text.toLowerCase().includes(keyword.toLowerCase())) {
                foundKeywords.push(keyword);
                keywordScore += 10;
            }
        });

        return {
            score: Math.min(keywordScore, 100),
            found: foundKeywords,
            missing: keywords.filter(k => !foundKeywords.includes(k))
        };
    }

    // Generate recommendations
    generateRecommendations(profileData, metrics) {
        const recommendations = [];

        // Headline recommendations
        if (metrics.headlineScore < 70) {
            recommendations.push({
                title: 'Improve Your Headline',
                description: 'Add your key skills and value proposition to your headline. Make it specific and compelling.'
            });
        }

        // Summary recommendations
        if (metrics.summaryScore < 70) {
            recommendations.push({
                title: 'Enhance Your Summary',
                description: 'Use action verbs, quantify achievements, and clearly articulate your value. Include specific examples.'
            });
        }

        // Skills recommendations
        if (!profileData.skills) {
            recommendations.push({
                title: 'Add Your Skills',
                description: 'List at least 5-10 relevant skills to improve discoverability and credibility.'
            });
        }

        // Experience recommendations
        if (profileData.experience === 0) {
            recommendations.push({
                title: 'Highlight Your Experience',
                description: 'Include years of experience and major achievements in your current role.'
            });
        }

        // Keywords recommendations
        const keywordAnalysis = this.analyzeKeywords(
            (profileData.summary + ' ' + profileData.headline),
            profileData.industry
        );
        
        if (keywordAnalysis.missing.length > 0) {
            recommendations.push({
                title: 'Add Industry Keywords',
                description: `Include these industry-relevant keywords: ${keywordAnalysis.missing.slice(0, 3).join(', ')}`
            });
        }

        // Professional photo recommendation
        recommendations.push({
            title: 'Use Professional Profile Photo',
            description: 'A clear, professional headshot increases profile views by up to 21x.'
        });

        // Profile customization recommendation
        recommendations.push({
            title: 'Customize Your Profile URL',
            description: 'Create a custom LinkedIn URL using your name for easier sharing and better SEO.'
        });

        return recommendations;
    }
}
