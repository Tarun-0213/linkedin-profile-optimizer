"""NLP Analysis Module"""

class NLPAnalyzer:
    """
    Analyzes text content for keywords and suggestions
    """
    
    INDUSTRY_KEYWORDS = {
        'Technology': ['python', 'javascript', 'java', 'machine learning', 'ai', 'api', 
                      'database', 'software', 'coding', 'agile', 'devops', 'cloud', 'aws'],
        'Finance': ['financial analysis', 'accounting', 'investment', 'trading', 'compliance', 
                   'risk management', 'portfolio', 'audit', 'financial planning'],
        'Marketing': ['digital marketing', 'seo', 'content', 'social media', 'campaign', 
                     'analytics', 'branding', 'market research', 'advertising'],
        'Sales': ['sales', 'negotiation', 'customer', 'pipeline', 'revenue', 'closing', 
                 'relationship', 'prospecting', 'crm'],
        'Healthcare': ['patient care', 'clinical', 'diagnosis', 'medical', 'healthcare', 
                      'treatment', 'nursing', 'surgery', 'pharmacology'],
        'Education': ['teaching', 'curriculum', 'learning', 'student', 'education', 
                     'training', 'mentoring', 'academic', 'research'],
        'Design': ['ui/ux', 'graphics', 'design', 'photoshop', 'figma', 'prototyping', 
                  'wireframing', 'branding', 'illustration']
    }
    
    def analyze_keywords(self, text, industry):
        """
        Analyze text for industry-relevant keywords
        
        Args:
            text (str): Text to analyze
            industry (str): Industry category
        
        Returns:
            dict: Analysis results with found and missing keywords
        """
        if not text or not industry:
            return {'score': 0, 'found': [], 'missing': []}
        
        # Get industry keywords
        keywords = self.INDUSTRY_KEYWORDS.get(industry, [])
        
        # Find present keywords
        found_keywords = []
        for keyword in keywords:
            if keyword.lower() in text.lower():
                found_keywords.append(keyword)
        
        # Find missing keywords
        missing_keywords = [kw for kw in keywords if kw not in found_keywords]
        
        # Calculate score
        if len(keywords) > 0:
            keyword_score = (len(found_keywords) / len(keywords)) * 100
        else:
            keyword_score = 0
        
        return {
            'score': int(keyword_score),
            'found': found_keywords,
            'missing': missing_keywords[:10]  # Return top 10 missing
        }
    
    def extract_skills(self, text):
        """
        Extract skills from text
        
        Args:
            text (str): Text to analyze
        
        Returns:
            list: Extracted skills
        """
        common_skills = [
            'python', 'javascript', 'java', 'c++', 'management', 'leadership',
            'communication', 'problem solving', 'teamwork', 'project management',
            'data analysis', 'microsoft office', 'sql', 'html', 'css'
        ]
        
        found_skills = []
        for skill in common_skills:
            if skill.lower() in text.lower():
                found_skills.append(skill)
        
        return found_skills
    
    def analyze_tone(self, text):
        """
        Analyze the professional tone of text
        
        Returns:
            dict: Tone analysis results
        """
        negative_words = ['hate', 'terrible', 'awful', 'stupid', 'dumb', 'annoyed']
        positive_words = ['excellent', 'passionate', 'dedicated', 'driven', 'enthusiastic']
        
        negative_count = sum(1 for word in negative_words if word in text.lower())
        positive_count = sum(1 for word in positive_words if word in text.lower())
        
        tone_score = 50 + (positive_count * 10) - (negative_count * 15)
        tone_score = max(0, min(100, tone_score))
        
        return {
            'score': tone_score,
            'professional': negative_count == 0
        }
