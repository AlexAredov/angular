# -*- coding: utf-8 -*-
import json
import time
import urllib.parse

import requests
import base64
import webbrowser
from bs4 import BeautifulSoup
from PIL import Image
import qrcode
from requests_toolbelt import MultipartEncoder
import datetime

client_id = '2ba40caca9544994a58ce2612dee3682'
client_secret = 'be601141c5424bb0a33667c7e09aab85'

VK_user = {
    'USERNAME': None,
    'PASSWORD': None,
    'TOKEN': None,
    'UID': None
}

YM_user = {
    'USERNAME': None,
    'PASSWORD': None,
    'TOKEN': None,
    'UID': None
}


def get_link_AM(string: str):
    url = f"https://amp-api.music.apple.com/v1/catalog/ru/search?term={string}&types=activities%2Csongs%2Cstations%2Ctv-episodes%2Cuploaded-videos&limit=25&relate%5Balbums%5D=artists&relate%5Beditorial-items%5D=contents&include%5Beditorial-items%5D=contents&extend=artistUrl&fields%5Bartists%5D=url%2Cname%2Cartwork&fields%5Balbums%5D=artistName%2CartistUrl%2Cartwork%2CcontentRating%2CeditorialArtwork%2CeditorialNotes%2Cname%2CplayParams%2CreleaseDate%2Curl&with=serverBubbles%2Clyrics&l=en-gb&platform=web&art%5Burl%5D=f&omit%5Bresource%5D=autos"
    payload = {}
    headers = {
        'authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNjE0ODE5OTU4LCJleHAiOjE2MzAzNzE5NTh9.a6ng_rkuWoGMdLIeJXLi_m52QWpeXAIAEi1pJrl6AwgZnAS0LBSZswvmUYSSvBFJtfCngUcUjdYsKTyVw7EPTg',
        'Referer': 'https://music.apple.com/'
    }
    response = requests.request("GET", url, headers=headers, data=payload)

    r = response.json()
    link = r['results']['top']['data'][0]['attributes']['url']

    return link






def save_playlist_Spotify(user_id: str, title: str, description: str, access_token: str):
    url = f'https://api.spotify.com/v1/users/{user_id}/playlists'
    headers = {
        'Authorization': f"Bearer {access_token}",
        'Content-Type': 'application/json'
    }
    payload = {
        'name': title,
        'description': description
    }
    response = requests.request("POST", url, headers=headers, data=payload)

    return response


def get_access_token_Spotify():
    token_url = 'https://accounts.spotify.com/api/token'
    token_data = {
        'grant_type': 'client_credentials'
    }

    client_creds = f"{client_id}:{client_secret}"
    client_creds_b64 = base64.b64encode(client_creds.encode()).decode()
    token_headers = {
        'Authorization': f'Basic {client_creds_b64}'
    }

    response = requests.post(
        token_url,
        data=token_data,
        headers=token_headers
    )
    r = response.json()
    access_token = r['access_token']

    return access_token


def get_link_Spotify(string: str, access_token: str):
    api_url = f"https://api.spotify.com/v1/search?type=track&q={string}&best_match=true&market=US"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.request("GET", api_url, headers=headers)

    r = response.json()
    link = r['best_match']['items'][0]['external_urls']['spotify']

    return link






def save_playlist_VK(owner_id: int, title: str, description: str, access_token: str, audio_ids_to_add=''):
    payload = f'dialog_id=0&playlist_id=0&title={title}&description={description}&owner_id={owner_id}&audio_ids_to_add={audio_ids_to_add}&func_v=6&access_token={access_token}&v=5.151'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    response = requests.post(f'https://api.vk.com/method/execute.savePlaylist', headers=headers, data=payload)
    r = response.json()


def get_access_token_VK(username: str, password: str):
    token_url = f'https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username={username}&password={password}'
    response = requests.get(token_url)

    r = response.json()
    print(r)
    access_token = r['access_token']
    user_id = r['user_id']

    return [access_token, user_id]


def get_song_id_VK(string: str, access_token: str):
    url = "https://api.vk.com/method/catalog.getAudioSearch"

    payload = f"query={string}&need_blocks=1&lang=ru&v=5.151&https=1&access_token={access_token}"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    response = requests.request("POST", url, headers=headers, data=payload)

    r = response.json()
    # print(r)
    try:
        id = r['response']['audios'][0]['ads']['content_id']
    except KeyError:
        print('НЕ ПОЛУЧИЛОСЬ, НЕ ФАРТАНУЛО')
        return 0

    return id


def get_link_VK(string: str, access_token: str):
    url_template = 'https://vk.com/audio'
    id = get_song_id_VK(string, access_token)
    if id == 0:
        return string

    link = url_template + id

    return link






def get_access_token_YM(username: str, password: str):
    url = 'https://oauth.mobile.yandex.net/1/token?'
    payload = {
        'grant_type': 'password',
        'username': username,
        'password': password,
        'client_id': '23cabbbdc6cd418abb4b39c32c41195d',
        'client_secret': '53bc75238f0c4d08a118e51fe9203300'
    }
    response = requests.request("POST", url, data=payload)

    r = response.json()
    access_token = r['access_token']
    user_id = r['uid']

    return [access_token, user_id]


def get_song_id_YM(string: str):
    url = f"https://api.music.yandex.net/search?text={urllib.parse.quote_plus(string)}&type=all&from=search_history&inputType=keyboard&page=0&nocorrect=false"
    headers = {
        'Host': 'api.music.yandex.net',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/4.9.0',
        'Accept': 'application/json',
        'X-Yandex-Music-Client': 'YandexMusicAndroid/24021302',
        'X-Yandex-Music-Device': 'os=Android; os_version=7.1.2; manufacturer=google; model=G011A; clid=google-play; uuid=fbf52c680d504d739ecdb3dcd49e8e32; display_size=5.7; dpi=266; mcc=250; mnc=02; device_id=cf371c691369a9f9b69fcee3dd7c6c49',
        'X-Yandex-Music-Client-Now': '2021-06-08T17:06:09+08:00',
        'X-Yandex-Music-Content-Type': 'adult',
        'Accept-Language': 'ru',
        'Authorization': 'OAuth 1.684931014.113758.1654678740.1623142740138.37678.ZtRRvSBp_2PtUrwa.UfgoMgvJbD8nKyi6k4UBInDbCRwlexSkXnWOm-v3gX_UoVUcTCTLetcUmwfuU34zBUHa1tF31c0tRS9tc6-Li9FqFfP6mdqYoBZIn2wq62fr.5HJz1ACgv9j6vOoTq9XAqg'
    }
    response = requests.request("GET", url, headers=headers)

    r = response.json()

    song_id = r["result"]["tracks"]["results"][0]["id"]
    album_id = r["result"]["tracks"]["results"][0]["albums"][0]["id"]

    return [song_id, album_id]


def get_link_YM(string: str):
    url_template = 'https://music.yandex.ru/track/'

    song_id = get_song_id_YM(string)[0]
    link = url_template + str(song_id)

    return link


def save_playlist_YM(owner_id: int, title: str, access_token: str, song_names: list = []):
    url_template = 'https://api.music.yandex.net'

    headers = {
        'Authorization': f'OAuth {access_token}'
    }
    url = f'{url_template}/users/{owner_id}/playlists/create?title={title}&visibility=public'
    response = requests.post(url, headers=headers)

    r = response.json()
    playlist_id = r['result']['kind']

    if len(song_names) != 0:
        add_tracks_YM(owner_id, playlist_id, song_names, access_token)


def add_tracks_YM(owner_id: int, playlist_id: int, song_names: list, access_token: str):
    url_template = 'https://api.music.yandex.net'
    payload_template = {
        'diff': '',
        'revision': 0
    }
    some_data = [
        {
            'op': 'insert',
            'at': 0,
            'tracks': []
        }
    ]

    url = f'{url_template}/users/{owner_id}/playlists/{playlist_id}/change-relative'
    headers = {
        'Authorization': f'OAuth {access_token}'
    }
    payload = payload_template
    payload['diff'] = json.dumps(some_data, separators=(',', ':'))
    response = requests.request("POST", url, headers=headers, data=payload_template)

    r = response.json()
    revision = r['error']['message'].split(' ')[-1]
    payload_template['revision'] = revision

    for song_name in song_names:
        song = get_song_id_YM(song_name)
        some_data[0]['tracks'].append(
            {
                'id': song[0],
                'album_id': song[1]
            }
        )
    payload_template['diff'] = json.dumps(some_data, separators=(',', ':'))

    requests.request("POST", url, headers=headers, data=payload_template)


# song = input()
#
# [YM_user['TOKEN'], YM_user['UID']] = get_access_token_YM(YM_user['USERNAME'], YM_user['PASSWORD'])
# [VK_user['TOKEN'], VK_user['UID']] = get_access_token_VK(VK_user['USERNAME'], VK_user['PASSWORD'])
#
# print(get_link_Spotify(song, get_access_token_Spotify()))
# print(get_link_AM(song))
#
# print(get_link_VK(song, VK_user['TOKEN']))
# print(get_link_YM(song), YM_user['TOKEN'])


def import_to_VK():
    access_token = VK_user['TOKEN']
    f = open('NightCap.txt', 'r', encoding='utf-16', errors='ignore')
    lines = f.readlines()[1:]
    song_ids = []
    not_in_audio = []
    for line in lines:
        data = line.split('\t')
        query = data[1] + ' ' + data[0]
        print(query)
        song_id = get_song_id_VK(urllib.parse.quote_plus(query), access_token)
        if song_id == 0:
            not_in_audio.append(query)
            continue
        song_ids.append(song_id)
    print(song_ids)
    print('НЕ НАШЕЛ: ', not_in_audio)
    ids_to_add = ','.join(song_ids)
    print(ids_to_add)
    save_playlist_VK(348377682, 'test', '', access_token, ids_to_add)


def import_to_YM():
    pass


access_token = get_access_token_Spotify()
print(access_token)
print(save_playlist_Spotify('31xleb4kkczoswuic4rapvceb2mq', 'test', '', access_token).text)

aaa = {
    "access_token": "AQAAAAA1xBLQAAG8XhAo2cc9H0I6roQP_WEPZ5I",
    "expires_in": 31536000,
    "token_type": "bearer",
    "uid": 902042320
}
# var request = ApiRequest.get()
#       .setPath('/users/' + _config.user.UID + '/playlists/' + playlistKind + '/change-relative')
#       .addHeaders(_getAuthHeader())
#       .setBodyData({
#         'diff': JSON.stringify([{
#           'op': 'insert',
#           'at': opts.at || 0,
#           'tracks': tracks
#         }]),
#         'revision': revision
#       });


# save_playlist_YM(aaa['uid'], 'test', aaa['access_token'], ['drake what\'s next', 'hardy caprio super soaker'])