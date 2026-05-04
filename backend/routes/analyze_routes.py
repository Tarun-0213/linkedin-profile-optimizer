from flask import Blueprint, request, jsonify
from utils.analyzer import analyze_profile
from datetime import datetime

bp = Blueprint('analyze', __name__, url_prefix='/api')

@bp.route('/analyze', methods=['POST'])
def analyze():
    """Analyze a LinkedIn profile"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['full_name', 'current_title', 'industry', 'summary']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Analyze profile
        analysis_result = analyze_profile(data)
        
        return jsonify(analysis_result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/analysis/<analysis_id>', methods=['GET'])
def get_analysis(analysis_id):
    """Get analysis results"""
    try:
        # This would fetch from MongoDB in a full implementation
        return jsonify({'error': 'Not implemented yet'}), 501
    except Exception as e:
        return jsonify({'error': str(e)}), 500
