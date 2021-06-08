# -*- coding: utf-8 -*-
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

username = '79104510492'
password = 'Dusya1454'


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
        'Authorization': access_token,
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

    return access_token


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


def get_link_YM(string: str):
    url = f"https://api.music.yandex.net/search?text={urllib.parse.quote_plus(string)}&type=all&from=search_history&inputType=keyboard&page=0&nocorrect=false"
    url_template = 'https://music.yandex.ru/track/'

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
    link = url_template + str(song_id)

    return link

# song = input()
# print(get_link_VK(song, get_access_token_VK(username, password)))
# print(get_link_Spotify(song, get_access_token_Spotify()))
# print(get_link_AM(song))


# import requests
#
# url = "https://pu.vk.com/c517536/ss2242/upload.php?act=audio_playlist_cover&ajx=1&hash=f3c8b83ed3a67e3d7d&mid=348377682&upldr=1"
#
# payload={
#     'MIME-тип': 'multipart/form-data',
#     'Предел': '----WebKitFormBoundary6PmbbevHRtmig7LY',
#     'Данные запроса': '------WebKitFormBoundary6PmbbevHRtmig7LY\nContent-Disposition: form-data; name="photo"; filename="Снимок экрана 2021-05-18 в 16.54.13.png"\nContent-Type: image/png\n\n\n------WebKitFormBoundary6PmbbevHRtmig7LY--'
# }
# files=[
#
# ]
# headers = {
#   'Accept': '*/*',
#   'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary6PmbbevHRtmig7LY',
#   'Origin': 'https://vk.com',
#   'Accept-Language': 'ru',
#   'Host': 'pu.vk.com',
#   'Referer': 'https://vk.com/audios348377682?section=all',
#   'Accept-Encoding': 'gzip, deflate, br',
#   'Connection': 'keep-alive',
#   'Cookie': 'remixlang=0; remixstid=1985661351_pPjZGhMnyqOWy814F0MUPzzqZDDKgMw6ljkAyZRwSV8; remixua=-1%7C-1%7C-1%7C804903990'
# }
#
# response = requests.request("POST", url, headers=headers, data=payload, files=files)
#
# print(response.text)

# a = qrcode.make('https://www.lit.msu.ru').get_image()
# a.save('test.png')


# a = 'https://pu.vk.com/c850116/ss2100/upload.php?act=audio_playlist_cover&ajx=1&hash=22fefa03784de9b676&mid=348377682&upldr=1'
# h = {
#     'Accept': '*/*',
#     'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary6PmbbevHRtmig7LY',
#     'Origin': 'https://vk.com',
#     'Accept-Language': 'ru',
#     'Host': 'pu.vk.com',
#     'Referer': 'https://vk.com/audios348377682?section=all',
#     'Accept-Encoding': 'gzip, deflate, br',
#     'Connection': 'keep-alive'
# }
# payload = MultipartEncoder(
#     fields={
#         'MIME-тип': 'multipart/form-data',
#         'Предел': '----WebKitFormBoundary6PmbbevHRtmig7LY',
#         'files': ('amogus.jpg', open('amogus.jpg', 'rb'), 'image/jpg')
#     }
# )
# r = requests.post(a, headers=h, data=payload)
# print(r.text)


# import requests
# import requests_toolbelt
#
# file = {'photo': ('amogus.jpg', open('amogus.jpg', 'rb'), 'image/jpeg')}
# encoder = requests_toolbelt.MultipartEncoder(fields=file)
# resp = requests.post(
#     url='https://pu.vk.com/c850116/ss2100/upload.php?act=audio_playlist_cover&ajx=1&hash=22fefa03784de9b676&mid=348377682&upldr=1',
#     headers={'Content-Type': encoder.content_type}, data=encoder)
#
# print(resp.text)


# access_token = get_access_token_VK(username, password)
# f = open('Sweet Cloud Rap.txt', 'r', encoding='utf-16', errors='ignore')
# lines = f.readlines()[1:]
# ids = []
# not_in_audio = []
# for line in lines:
#     data = line.split('\t')
#     print(data[1], data[0])
#     query = data[1] + ' ' + data[0]
#     id = get_song_id_VK(query.encode('utf-8'), access_token)
#     if id == 0:
#         not_in_audio.append(query)
#         continue
#     ids.append(id)
# print(ids)
# print('НЕ НАШЕЛ: ', not_in_audio)
# ids_to_add = ','.join(ids)
# print(ids_to_add)
# # ia = '-2001141461_90141461,348377682_456240211,474499276_456508424,474499145_456491074,-2001755344_69755344,348377682_456240215,-2001590415_73590415,-2001268387_64268387,348377682_456240219,8705092_456239179,474499180_456486183,-2001676491_63676491,348377682_456240223,-2001947002_83947002,474499154_456427919,-2001227047_76227047,474499158_456511287,474499319_456475071,-2001873557_87873557,348377682_456240230,-2001414785_70414785,-34963069_456270041,-2001839136_62839136,348377682_456240234,348377682_456240235,474499127_456444832,474499150_456429193,-2001435842_88435842,474499245_456421817,474499320_456457501,-118638941_456240454,-2001805078_54805078,-2001943927_53943927,167938622_456243839,474499282_456445017,348377682_456240247,348377682_456240440,-2001063684_60063684,474499202_456418576,474499286_456484158,-2001365843_66365843,-2001009168_62009168,-2001823616_58823616,474499251_456407386,348377682_456240256,474499185_456527565,474499233_456408074,-16120134_456288844,3253606_456239502,-2001741741_52741741,-2001330143_48330143,-2001987670_71987670,-2001008453_64008453,-2001759577_48759577,-2001822329_63822329,348377682_456240288,474499199_456470312,474499237_456373391,-2001620346_51620346,474499197_456401625,348377682_456240435,474499189_456567908,348377682_456240437,-2001427432_53427432,474499159_456466211,348377682_456240440,-2001625494_54625494,348377682_456240442,474499313_456401752,-2001223994_58223994,348377682_456240445,348377682_456240453,348377682_456240454,474499184_456365680,-2001382414_55382414,-2001381505_58381505,-2001428904_56428904,348377682_456240459,-2001768478_59768478,348377682_456240461,-2001784865_61784865,137188971_456243633,-2001844013_50844013,474499152_456401888,-2001059452_56059452,-2001516250_57516250,-34305706_456239334,-2001884254_57884254,-2001800986_50800986,-2001682768_54682768,-2001769058_53769058,-2001657705_64657705,474499285_456430258,-2001280829_48280829,474499291_456553566,-2001302726_64302726,-2001685941_83685941,-2001656345_69656345,371745431_456640481,-2001742334_69742334,-2001559965_75559965,474499268_456446061,-2001223994_58223994,-2001365843_66365843,371745439_456569875,-2001913495_66913495,474499243_456445759,474499218_456500504,371745445_456559934,474499164_456451872,474499241_456545026,348377682_456240335,474499244_456510531,474499261_456452905,474499268_456447502,474499316_456492887,474499155_456428131,-2001602954_69602954,474499328_456438489,-2001055028_67055028,474499317_456480081,474499285_456430311,-2001095006_75095006,-2001370962_67370962,474499298_456506179,474499229_456347030,-2001763670_72763670,-2001966818_74966818,-2001969273_75969273,-2001730307_85730307,-2001722360_67722360,-2001831646_59831646,2000090770_456239327,37233308_273307692,474499312_456567508,-2001637705_68637705,474499202_456418576,-2001774352_80774352,-2001182188_47182188,-2001047492_87047492,70068258_456240226,-2001389270_66389270,474499319_456434527,-2001637705_68637705,474499156_456464274,-2001868698_70868698,-2001028943_71028943,-2001217709_68217709,-2001605227_69605227,474499305_456491747,-2001019876_71019876,474499249_456553753,-2001166729_72166729,-2001370944_67370944,143146516_456239157,-2001269433_71269433,-2001186558_72186558,-2001621415_70621415,-2001161267_74161267,474499160_456460908,-2001630874_72630874,474499140_456491005,-2001120147_76120147,474499270_456477392,474499156_456477553,-2001054216_44054216,474499285_456430258,371745465_456463842,-2001689512_75689512,474499264_456490924,-2001835767_75835767,-2001828783_52828783,474499211_456461485,474499243_456513531,474499156_456464274,474499227_456491224,474499186_456500572,474499250_456482995,-2001656345_69656345,474499217_456494007,-2001574648_77574648,474499259_456500117,-2001965692_75965692,-2001077499_75077499,474499311_456498899,474499119_456498656,608605927_456241298,-2001327828_67327828,474499257_456552165,474499308_456494374,474499318_456508113,-2001618173_74618173,474499258_456471636,-2001898712_62898712,13274623_456242547,-2001661561_82661561,-2001982936_75982936,-2001985111_9985111,-2001213823_83213823,474499156_456503277,-2001782650_74782650,-2001542725_81542725,474499184_456568853,474499181_456517750,-2001657554_80657554,474499246_456422949,474499284_456490924,348377682_456240194,-2001897527_77897527,474499186_456500572,-2001707780_81707780,474499220_456512136,-2001040880_82040880,-2001850910_81850910,474499184_456568853,474499186_456500572,-2001835644_83835644,474499227_456568304,-106161403_456252988,474499239_456528480,-2001304451_78304451,-2001541771_86541771,-2001827438_82827438,-2001966060_88966060,474499164_456451872,474499184_456568853,-2001060782_85060782,-2001714863_84714863,-2001171356_84171356,-2001020399_84020399,474499223_456453919,-197111210_456251160,-2001134642_84134642,-16120134_456292200,474499164_456451872,166714137_456241545,-2001028486_84028486,474499320_456542777,-2001678953_84678953,-2001042035_85042035,-2001752727_85752727,-2001060782_85060782,474499164_456451872,-2001143881_85143881,-2001309091_88309091,-2001737435_86737435,230184733_456242005,-2001519547_85519547,-2001886798_87886798,474499287_456522139,-2001486588_86486588,-2001531390_88531390,-2001049217_87049217,-51498019_456294833,10104348_456239597,-2001541771_86541771'
# print(save_playlist_VK(348377682, 'test', '', access_token, ids_to_add))

# print(get_link_VK('The Marías Hold It Together', access_token))

# print(get_access_token_VK(username, password))


# print(get_access_token_VK(username, password))
#
# access_token = get_access_token_Spotify()
# print(access_token)
# print(save_playlist_Spotify('31xleb4kkczoswuic4rapvceb2mq', 'test', '', access_token).text)

print(get_link_YM('AMA Ocean of Tears'))