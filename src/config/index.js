let SERVER_URL;

if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'https://localhost:5000';
} else {
  SERVER_URL = 'https://api.twofacetime.xyz';
}

export default SERVER_URL;
