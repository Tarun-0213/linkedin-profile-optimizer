"""Profile Analysis Utilities"""

from .scoring import ProfileScorer
from .nlp_analyzer import NLPAnalyzer

def analyze_profile(profile_data):
    """
    Main profile analysis function
    
    Args:
        profile_data (dict): Profile information
    
    Returns:
        dict: Analysis results with scores and recommendations
    """
    
    # Initialize analyzers
    scorer = ProfileScorer()
    nlp = NLPAnalyzer()
    
    # Extract data
    full_name = profile_data.get('full_name', '')
    current_title = profile_data.get('current_title', '')
    industry = profile_data.get('industry', '')
    headline = profile_data.get('headline', '')
    summary = profile_data.get('summary', '')
    experience = profile_data.get('experience', 0)
    skills = profile_data.get('skills', '')
    
    # Analyze each component
    headline_score = scorer.score_headline(headline)
    summary_score = scorer.score_summary(summary)
    completeness_score = scorer.score_completeness(profile_data)
    keyword_analysis = nlp.analyze_keywords(summary + ' ' + headline, industry)
    
    # Calculate overall score
    overall_score = (
        headline_score * 0.2 +
        summary_score * 0.3 +
        completeness_score * 0.2 +
        keyword_analysis['score'] * 0.3
    )
    
    # Generate recommendations
    recommendations = generate_recommendations(
        profile_data,
        {
            'headline_score': headline_score,
            'summary_score': summary_score,
            'completeness_score': completeness_score,
            'keyword_score': keyword_analysis['score']
        }
    )
    
    # Prepare response
    return {
        'overallScore': int(overall_score),
        'metrics': {
            'headlineScore': headline_score,
            'summaryScore': summary_score,
            'completenessScore': completeness_score,
            'keywordScore': keyword_analysis['score']
        },
        'recommendations': recommendations,
        'suggestedKeywords': keyword_analysis.get('missing', [])
    }

def generate_recommendations(profile_data, metrics):
    """
    Generate recommendations based on analysis
    
    Args:
        profile_data (dict): Original profile data
        metrics (dict): Calculated metrics
    
    Returns:
        list: List of recommendations
    """
    
    recommendations = []
    
    # Headline recommendations
    if metrics['headline_score'] < 70:
        recommendations.append({
            'title': 'Improve Your Headline',
            'description': 'Add your key skills and value proposition to your headline. Make it specific and compelling.'
        })
    
    # Summary recommendations
    if metrics['summary_score'] < 70:
        recommendations.append({
            'title': 'Enhance Your Summary',
            'description': 'Use action verbs, quantify achievements, and clearly articulate your value. Include specific examples.'
        })
    
    # Skills recommendations
    if not profile_data.get('skills'):
        recommendations.append({
            'title': 'Add Your Skills',
            'description': 'List at least 5-10 relevant skills to improve discoverability and credibility.'
        })
    
    # Experience recommendations
    if profile_data.get('experience', 0) == 0:
        recommendations.append({
            'title': 'Highlight Your Experience',
            'description': 'Include years of experience and major achievements in your current role.'
        })
    
    # Completeness recommendations
    if metrics['completeness_score'] < 80:
        recommendations.append({
            'title': 'Complete Your Profile',
            'description': 'Fill in all sections of your profile for better visibility and credibility.'
        })
    
    # Keyword recommendations
    if metrics['keyword_score'] < 60:
        recommendations.append({
            'title': 'Add Industry Keywords',
            'description': 'Include industry-relevant keywords in your headline and summary to improve searchability.'
        })
    
    # Professional photo recommendation
    recommendations.append({
        'title': 'Use Professional Profile Photo',
        'description': 'A clear, professional headshot increases profile views by up to 21x.'
    })
    
    # Engagement recommendations
    recommendations.append({
        'title': 'Increase Your Engagement',
        'description': 'Post regularly, comment on industry discussions, and share insights to build your professional network.'
    })
    
    return recommendations
