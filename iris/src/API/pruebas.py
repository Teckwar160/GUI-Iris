import requests


def download():
    url = "http://127.0.0.1:8000/"

    payload = {
            "csv": "pruebaAPI.csv",
        }
    headers = {
        'Content-type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(url, headers=headers, data=payload)

    print(response.text)

download()