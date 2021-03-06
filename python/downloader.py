# libaries
from __future__ import unicode_literals
import os
import ssl
import sys
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import youtube_dl
import time


ssl._create_default_https_context = ssl._create_unverified_context

# path for chromedriver
PATH = "/Users/tenzintashi/Downloads/chromedriver"

# File path
file_path = '/Users/tenzintashi/Colz/Coding Files/spotify-playlist-downloader/'
file_name = 'dataset.txt'


def download(file_path, file_name, PATH):
    contains = ''
    with open(os.path.join(file_path, file_name), 'r') as file_reader:
        contains = file_reader.read()

    contains = json.loads(contains)

    songs = list(contains.keys())
    artists = list(contains.values())

    # use headless Chrome as the browser
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.binary_location = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    driver = webdriver.Chrome(executable_path=PATH,
                              options=chrome_options)

    for index in range(len(songs)):
        song = songs[index]
        artist = ' '.join(artists[index])

        # Website to access
        driver.get(
            "https://www.youtube.com/results?search_query=+"+song+"+"+artist+"+official+music+video")

        hrefs = [video.get_attribute('href')
                 for video in driver.find_elements_by_id("video-title")]

        link = None
        for href in hrefs:
            if href is not None:
                link = href
                break

        if link is not None:
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': '/Users/tenzintashi/Downloads/Music/ %(title)s - %(artist)s.%(ext)s',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
            }

            print(link)
            try:
                with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([link])
            except Exception as err:
                sys.stderr.write(str(err))
        time.sleep(1)


try:
    download(file_path=file_path, file_name=file_name, PATH=PATH)
except Exception as exc:
    print('[!!!] {err}'.format(err=exc))

finally:
    os.system("youtube-dl --rm-cache-dir")
exit()
