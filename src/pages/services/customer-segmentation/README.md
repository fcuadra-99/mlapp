# Customer Segmentation Service

## Overview
This service uses Naive Bayes and Decision Tree algorithms to segment customers into distinct groups based on behavior and characteristics.

## Algorithms
- **Primary Models**: Naive Bayes, Decision Tree
- **Segments Identified**: 3-7 distinct customer groups
- **Update Frequency**: Weekly

## Adding Real Model Code

### 1. Backend Integration
```python
# Example Python implementation
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
import pandas as pd

def segment_customers(customer_data):
    # Naive Bayes for probabilistic classification
    nb_model = GaussianNB()
    
    # Decision Tree for interpretable rules
    dt_model = DecisionTreeClassifier()
    
    # Your training and prediction code here
    return segments
```

### 2. API Endpoints
```javascript
app.post('/api/segment/customers', async (req, res) => {
  // Call segmentation service
  // Return customer segments
});
```

### 3. Visualization
Update the component to display real segment data with charts:
```typescript
import { PieChart, Pie, Cell } from 'recharts';

// Render actual segmentation results
```

## Features Used
- Purchase frequency
- Recency of last purchase
- Average order value
- Product category preferences
- Customer lifetime value
- Engagement metrics
