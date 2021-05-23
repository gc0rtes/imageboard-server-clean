To CREATE with POST go to the POST endpoints created on the routers. Ex:

    http -v POST :4000/users email=gui@gui.com password=123 fullName="Guilherme Cortes"

    http -v POST :4000/images title="Beach The Hague" url=https://dutchreview.com/wp-content/uploads/TheBeautyTheHague-1-3.jpg

On routes where was configured a `limit` and `offset` try to show a limited number of results with this command:

    http -v GET :4000/images offset==0 limit==2

To a request for a new JWToken:

Go the route where login was configured, like this

    http -v POST :4000/auth/login email=jesus@nazare.com password=123

Take note of the token and try access your secured path, ex:

    http -v GET :4000/images Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyMTc1MTEwNCwiZXhwIjoxNjIxNzU4MzA0fQ.7hzq3R8sHs_O-tPcosDZr851yd6cOiBBz0WpECDy1jM"
