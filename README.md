# express_basic_api

## Run Locally  
Clone the project  

~~~bash  
  git clone https://github.com/dqmdz/express_basic_api.git
~~~

Go to the project directory  

~~~bash  
  cd express_basic_api
~~~

Install dependencies  

~~~bash  
npm install
~~~

Check `.env`file *NODE_ENV must be different than **test***

~~~bash  
FILENAME=database.sqlite
PORT=5000
NODE_ENV=dev
~~~

Start the server  

~~~bash  
npm run dev
~~~

### Run test

Check `.env`file *NODE_ENV must be **test***

~~~bash  
FILENAME=database.sqlite
PORT=5000
NODE_ENV=test
~~~

Make test  

~~~bash  
npm test
~~~
