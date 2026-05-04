# LinkedIn Profile Optimizer

A comprehensive web application that analyzes and optimizes LinkedIn profiles with AI-powered recommendations and scoring.

## Features

- **Profile Analysis & Scoring**: Analyze LinkedIn profiles and generate detailed scores based on multiple metrics
- **Improvement Suggestions**: Get actionable recommendations to enhance your profile
- **Smart Recommendations**: Receive personalized suggestions for headlines, summaries, and content optimization
- **Grammar & Tone Analysis**: Check grammar, spelling, and professional tone
- **Keyword Optimization**: Identify industry-relevant keywords to boost visibility
- **Visual Dashboard**: User-friendly interface to track profile improvements

## Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with modern styling
- **JavaScript**: Interactive UI and client-side logic

### Backend
- **Python**: Flask for REST API
- **MongoDB**: NoSQL database for storing profiles and analysis data

## Project Structure

```
linkedin-profile-optimizer/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   └── js/
│       ├── main.js
│       ├── analyzer.js
│       └── api.js
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── models/
│   │   ├── profile.py
│   │   └── analysis.py
│   ├── routes/
│   │   ├── analyze.py
│   │   └── recommendations.py
│   └── utils/
│       ├── nlp_analyzer.py
│       └── scoring.py
├── config/
│   └── config.py
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Python 3.8+
- MongoDB
- Node.js (optional, for frontend build tools)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Tarun-0213/linkedin-profile-optimizer.git
cd linkedin-profile-optimizer
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Configure MongoDB connection in `backend/config/config.py`

5. Run the backend server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Open `index.html` in a web browser or serve with a local server:
```bash
python -m http.server 8000
```

## API Endpoints

### Profile Analysis
- `POST /api/analyze` - Analyze a LinkedIn profile
- `GET /api/analysis/<id>` - Get analysis results

### Recommendations
- `GET /api/recommendations/<profile_id>` - Get personalized recommendations
- `POST /api/recommendations` - Generate new recommendations

### Profile Data
- `POST /api/profile` - Create a new profile entry
- `GET /api/profile/<id>` - Get profile data
- `PUT /api/profile/<id>` - Update profile data

## Usage

1. Open the application in your browser
2. Enter or paste your LinkedIn profile information
3. Click "Analyze Profile" to generate analysis
4. Review your score and recommendations
5. Implement suggestions to improve your profile
6. Track improvements over time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Created by **Tarun-0213**

For issues and questions, please open an issue on the GitHub repository.

---

**Made with ❤️ to help you optimize your LinkedIn presence**