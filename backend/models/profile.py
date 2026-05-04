from datetime import datetime
from bson.objectid import ObjectId

class Profile:
    """LinkedIn Profile Model"""
    
    def __init__(self, full_name, current_title, industry, headline='', summary='', 
                 experience=0, skills='', profile_id=None, created_at=None):
        self.profile_id = profile_id or str(ObjectId())
        self.full_name = full_name
        self.current_title = current_title
        self.industry = industry
        self.headline = headline
        self.summary = summary
        self.experience = experience
        self.skills = skills
        self.created_at = created_at or datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    def to_dict(self):
        """Convert profile to dictionary"""
        return {
            'profile_id': self.profile_id,
            'full_name': self.full_name,
            'current_title': self.current_title,
            'industry': self.industry,
            'headline': self.headline,
            'summary': self.summary,
            'experience': self.experience,
            'skills': self.skills,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def from_dict(data):
        """Create profile from dictionary"""
        return Profile(
            full_name=data.get('full_name'),
            current_title=data.get('current_title'),
            industry=data.get('industry'),
            headline=data.get('headline', ''),
            summary=data.get('summary', ''),
            experience=data.get('experience', 0),
            skills=data.get('skills', ''),
            profile_id=data.get('profile_id'),
            created_at=data.get('created_at')
        )
