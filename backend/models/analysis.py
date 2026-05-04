from datetime import datetime
from bson.objectid import ObjectId

class Analysis:
    """Profile Analysis Model"""
    
    def __init__(self, profile_id, overall_score=0, metrics=None, recommendations=None, 
                 suggested_keywords=None, analysis_id=None, created_at=None):
        self.analysis_id = analysis_id or str(ObjectId())
        self.profile_id = profile_id
        self.overall_score = overall_score
        self.metrics = metrics or {}
        self.recommendations = recommendations or []
        self.suggested_keywords = suggested_keywords or []
        self.created_at = created_at or datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    def to_dict(self):
        """Convert analysis to dictionary"""
        return {
            'analysis_id': self.analysis_id,
            'profile_id': self.profile_id,
            'overall_score': self.overall_score,
            'metrics': self.metrics,
            'recommendations': self.recommendations,
            'suggested_keywords': self.suggested_keywords,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def from_dict(data):
        """Create analysis from dictionary"""
        return Analysis(
            profile_id=data.get('profile_id'),
            overall_score=data.get('overall_score', 0),
            metrics=data.get('metrics', {}),
            recommendations=data.get('recommendations', []),
            suggested_keywords=data.get('suggested_keywords', []),
            analysis_id=data.get('analysis_id'),
            created_at=data.get('created_at')
        )
