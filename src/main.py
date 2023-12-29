#Note: Flask and requests library serve different purposes
from flask import Flask, request ,url_for, session, redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os

app = Flask(__name__) #Creates Flask application

app.secret_key = "replace-with-cryptographic-hash" 
app.config['SESSION_COOKIE_NAME'] = 'Andrews Cookie' #Session prevents user from re-logging in each time they leave the page

    # Example Route #
# @app.route('/test') --> Decorator 
# def testFunc(): --> Endpoint
#     return 'test Page Works'

@app.route('/') #app.route = path that needs to be taken to execute code below
def login():
    spotify_oauth = create_spotify_oauth()
    auth_url = spotify_oauth.get_authorize_url() #Gets the URL to use to authorize this app
    return redirect(auth_url) #redirect = in-built flask function

@app.route('/redirect-page')
def redirectPage():
    return 'redirect Page'

@app.route('/test')
def testFunc():
    return 'test Page Works'

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=os.getenv("CLIENT_ID"),
        client_secret=os.getenv("CLIENT_SECRET"),
        redirect_uri=url_for('redirectPage', _external=True), #url_for changes beginning part of URL as needed e.g. from localHost to www.bbc.co.uk #external
        scope="user-top-read"
    )

app.run() # Creates development server and runs flask app