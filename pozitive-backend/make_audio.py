import requests

def make_audio(response_text, filename):
    req = requests.get('https://translate.tatar/synthesize_tatar?', params = {'text': response_text})
    content = req.content

    with open(filename+'.wav', mode='bx') as f:
        f.write(content)