#Note: Flask and requests library serve different purposes
from flask import Flask, request ,url_for, session, redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import time
import requests
import json

app = Flask(__name__) #Creates Flask application

app.secret_key = "replace-with-cryptographic-hash" #TODO
app.config['SESSION_COOKIE_NAME'] = 'Andrews Cookie' #Session prevents user from re-logging in each time they leave the page
TOKEN_INFO = "token_info"

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
    spotify_oauth = create_spotify_oauth()
    session.clear()
    url_code = request.args.get('code') #Retrieves value associated with query parameter 'code' e.g. http://127.0.0.1:5000/redirect-page?code=12345 will return '12345'
    token_info = spotify_oauth.get_access_token(url_code)
    session[TOKEN_INFO] = token_info # Saves the token_info to that session
    return redirect(url_for('getTopSongs', _external=True))

@app.route('/top-songs')
def getTopSongs(): #TODO: Add timeframe parameter for interaction with front end
    try:
        token_info = get_token()
    except ValueError as e:
        print("User not logged in")
        return redirect(url_for('login', _external=True)) # Redirect to login page if no token_infoo for that session is found

    sp = spotipy.Spotify(auth=token_info['access_token'])
    
    top_tracks = []
    count = 0
    while count < 5:
        top_tracks.append(sp.current_user_top_tracks(limit=50, offset=0, time_range='short_term')['items'][count]['name'])
        print(sp.current_user_top_tracks(limit=50, offset=0, time_range='short_term')['items'][count]['name'])
        count += 1

    return top_tracks

def timeframeSelection(timeframe):
    #TODO Timeframe = String of button selected on ui E.G. 'last month' - use document.getElementById
    if timeframe == 'Last Month':
         return 'short_term'
    elif timeframe == 'Last 6 Months':
         return 'medium_term'
    else:
         return 'long_term'


def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if token_info is None or 'access_token' not in token_info:
        raise ValueError("Token is None or missing 'access_token'")

    current_time = int(time.time()) # Gets current time
    
    # Check if 'expires_at' key is present in the token_info dictionary
    if 'expires_at' in token_info: # Only executes below code if expires_at exists in token_info dictionary returned by API - sometimes, its excluded and causes 'NoneType' error to be thrown
        is_expired = token_info['expires_at'] - current_time < 60
        if is_expired:
            spotify_oauth = create_spotify_oauth()
            token_info = spotify_oauth.refresh_access_token(token_info['refresh_token'])
            session[TOKEN_INFO] = token_info  # Update the session with the refreshed token

    return token_info


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=os.getenv("CLIENT_ID"),
        client_secret=os.getenv("CLIENT_SECRET"),
        redirect_uri=url_for('redirectPage', _external=True), #url_for changes beginning part of URL as needed e.g. from localHost to www.bbc.co.uk #external=true means it creates the absolute path
        scope="user-top-read user-read-recently-played"
    )

app.run() # Creates development server and runs flask app
