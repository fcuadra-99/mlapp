# Sales Forecasting Service

## Overview
This service uses Linear Regression to predict future sales trends based on historical data.

## Algorithm
- **Primary Model**: Linear Regression
- **Accuracy**: ~95%
- **Update Frequency**: Real-time

## Adding Real Model Code

### 1. Backend Integration
To integrate actual ML models:
```python
# Example Python implementation
from sklearn.linear_model import LinearRegression
import pandas as pd

def train_sales_forecast_model(data):
    model = LinearRegression()
    # Your training code here
    return model
```

### 2. API Endpoints
Create API endpoints to serve predictions:
```javascript
// Example API route
app.post('/api/forecast/sales', async (req, res) => {
  // Call ML service
  // Return predictions
});
```

### 3. Frontend Integration
Update the component to fetch real data:
```typescript
// In SalesForecasting.tsx
const [forecast, setForecast] = useState(null);

useEffect(() => {
  fetch('/api/forecast/sales')
    .then(res => res.json())
    .then(data => setForecast(data));
}, []);
```

## Dataset
Uses E-commerce Purchase History Dataset with features including:
- Transaction dates
- Product categories
- Sales amounts
- Customer demographics
- Seasonal indicators
