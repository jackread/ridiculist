fansi-html5
===========

BackboneJS/HTML5 responsive web client for https://www.fan.si

TO SWITCH API BETWEEN DEBUG(LOCAL)/DEV/PROD

**local debug @ localhost:13080:**
<pre>
  <code>
			boneboiler = {
				'views'       : {},
				'models'      : {},
				'collections' : {},
				'msg'         : {},
				'err'         : {},
				'config'      : {
					'api_url' 	  : 'http://localhost:8080',
					'api_version' : 'prod',
					'app_version' : '0.0.1',
					'app_mode'    : 'debug',
					'title'       : 'XO',
					'description' : 'Join the XO movement',
					'web_url'     : 'http://localhost:13080',
					'stripe_key'  : 'pk_test_4ObuvKrPHRA5tFWNpi2MB1pk'
				}
			}
  </code>
</pre>

**remote dev @ VERSION.centering-helix-748.appspot.com**
<pre>
  <code>
			boneboiler = {
				'views'       : {},
				'models'      : {},
				'collections' : {},
				'msg'         : {},
				'err'         : {},
				'config'      : {
					'api_url' 	  : 'http://localhost:8080',
					'api_version' : 'VERSION',
					'app_version' : '0.0.1',
					'app_mode'    : 'dev',
					'title'       : 'XO',
					'description' : 'Join the XO movement',
					'web_url'     : 'http://localhost:13080',
					'stripe_key'  : 'pk_test_4ObuvKrPHRA5tFWNpi2MB1pk'
				}
			}
  </code>
</pre>

**remote production @ xo-api.theweeknd.com**
<pre>
  <code>
			boneboiler = {
				'views'       : {},
				'models'      : {},
				'collections' : {},
				'msg'         : {},
				'err'         : {},
				'config'      : {
					'api_url' 	  : 'http://localhost:8080',
					'api_version' : 'prod',
					'app_version' : '0.0.1',
					'app_mode'    : 'prod',
					'title'       : 'XO',
					'description' : 'Join the XO movement',
					'web_url'     : 'http://localhost:13080',
					'stripe_key'  : 'pk_test_4ObuvKrPHRA5tFWNpi2MB1pk'
				}
			}
  </code>
</pre>


TO RUN LOCALLY

if you haven't installed node dependancies

    npm install
    
start the server

    npm start


TO DEPLOY

add remote if not added yet

    git remote add heroku git@heroku.com:fansi-html5.git
    
push to heroku

    git push heroku master
