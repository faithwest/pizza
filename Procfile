web: PORT=3001 npm start --prefix client
api: gunicorn -b 127.0.0.1:6000 --chdir ./server app:app