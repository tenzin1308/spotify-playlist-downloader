# libaries
from __future__ import unicode_literals
import os
import sys
import ssl
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import youtube_dl


song_name = sys.argv[1]
song_artist = sys.argv[2]


def retriveYTLink(song_name, song_artist):
    # path for chromedriver
    PATH = "/Users/tenzintashi/Downloads/chromedriver"
    print(song_artist)
    print(song_name)

    # use headless Chrome as the browser
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.binary_location = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    driver = webdriver.Chrome(executable_path=PATH,
                              options=chrome_options)

    # Website to access
    driver.get(
        "https://www.youtube.com/results?search_query=+"+song_name+"+"+song_artist+"+official+music+video")

    hrefs = [video.get_attribute('href')
             for video in driver.find_elements_by_id("video-title")]

    link = None
    List = []
    for href in hrefs:
        if href is not None:
            link = href
            break
    print(link)
    return link


def download(song_name, song_artist):
    ssl._create_default_https_context = ssl._create_unverified_context
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([retriveYTLink(song_name, song_artist)])


download(song_name, song_artist)
exit()
