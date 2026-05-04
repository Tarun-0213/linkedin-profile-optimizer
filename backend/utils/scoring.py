"""Profile Scoring Module"""

class ProfileScorer:
    """
    Scores different components of a LinkedIn profile
    """
    
    MIN_HEADLINE_LENGTH = 30
    MAX_HEADLINE_LENGTH = 220
    MIN_SUMMARY_LENGTH = 100
    MAX_SUMMARY_LENGTH = 2600
    
    def score_headline(self, headline):
        """
        Score the headline (0-100)
        """
        if not headline:
            return 0
        
        score = 0
        
        # Length scoring
        if self.MIN_HEADLINE_LENGTH <= len(headline) <= self.MAX_HEADLINE_LENGTH:
            score += 40
        elif len(headline) < self.MIN_HEADLINE_LENGTH:
            score += max(0, 20 - (self.MIN_HEADLINE_LENGTH - len(headline)) // 2)
        else:
            score += max(0, 20 - (len(headline) - self.MAX_HEADLINE_LENGTH) // 10)
        
        # Contains professional keywords
        professional_keywords = ['engineer', 'manager', 'developer', 'specialist', 'analyst', 
                               'consultant', 'architect', 'lead', 'director', 'founder']
        if any(keyword in headline.lower() for keyword in professional_keywords):
            score += 30
        
        # No excessive punctuation
        if headline.count('!') <= 1 and headline.count('?') <= 1:
            score += 20
        
        # Contains numbers or specifics
        if any(char.isdigit() for char in headline):
            score += 10
        
        return min(score, 100)
    
    def score_summary(self, summary):
        """
        Score the summary/about section (0-100)
        """
        if not summary:
            return 0
        
        score = 0
        
        # Length scoring
        if self.MIN_SUMMARY_LENGTH <= len(summary) <= self.MAX_SUMMARY_LENGTH:
            score += 30
        elif len(summary) < self.MIN_SUMMARY_LENGTH:
            score += max(0, 15 - (self.MIN_SUMMARY_LENGTH - len(summary)) // 20)
        else:
            score += max(0, 15)
        
        # Word count
        word_count = len(summary.split())
        if word_count >= 50:
            score += 20
        elif word_count >= 30:
            score += 10
        
        # Action verbs
        action_verbs = ['develop', 'create', 'lead', 'manage', 'design', 'build', 
                       'achieve', 'implement', 'drive', 'improve', 'optimize']
        verb_count = sum(1 for verb in action_verbs if verb in summary.lower())
        if verb_count >= 3:
            score += 25
        elif verb_count >= 1:
            score += 15
        
        # Specific achievements/metrics
        if any(metric in summary for metric in ['%', '+', 'million', 'thousand', 'achieved', 'increased']):
            score += 15
        
        # Personal touch
        if any(word in summary.lower() for word in ['passionate', 'enthusiastic', 'dedicated', 'driven']):
            score += 10
        
        return min(score, 100)
    
    def score_completeness(self, profile_data):
        """
        Score profile completeness (0-100)
        """
        score = 0
        fields_filled = 0
        total_fields = 7
        
        if profile_data.get('full_name'):
            fields_filled += 1
        if profile_data.get('current_title'):
            fields_filled += 1
        if profile_data.get('industry'):
            fields_filled += 1
        if profile_data.get('headline'):
            fields_filled += 1
        if profile_data.get('summary'):
            fields_filled += 1
        if profile_data.get('experience'):
            fields_filled += 1
        if profile_data.get('skills'):
            fields_filled += 1
        
        score = (fields_filled / total_fields) * 100
        
        return int(score)
