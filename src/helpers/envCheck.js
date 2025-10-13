export const checkEnvVariables = () => {
  const requiredEnvVars = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  };

  const missingVars = [];
  const envStatus = {};

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      missingVars.push(key);
      envStatus[key] = '❌ MISSING';
    } else {
      envStatus[key] = `✅ ${value}`;
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Environment Variables Status:');
    console.table(envStatus);
  }

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars);
    console.error('📝 Create .env file with: REACT_APP_API_URL=http://localhost:8080');
  }

  return {
    isValid: missingVars.length === 0,
    missing: missingVars,
    status: envStatus
  };
};

export const getApiUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  if (!apiUrl) {
    console.warn('⚠️ REACT_APP_API_URL not set, using default: http://localhost:8080');
    return 'http://localhost:8080';
  }
  
  return apiUrl;
};
