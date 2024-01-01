from flask import Flask, request ,url_for, session, redirect, jsonify
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import time
import requests
import json
from flask_cors import CORS

app = Flask(__name__) #Creates Flask application
CORS(app)

@app.route('/test')
def testPage():
    return jsonify('Test')

app.run()