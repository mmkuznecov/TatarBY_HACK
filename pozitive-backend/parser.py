from bs4 import BeautifulSoup
import urllib.request

def get_tat_cult():
    
    events = {}

    url = 'https://tatcult.ru/'

    page = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(page)


    all_divs = soup.find_all("div", class_='articles_main_item_title')

    for div in all_divs:
        links = div.find_all('a', href=True)
        for link in links:
            print(link.text)
            print(link['href'])
            events[link.text] = link['href']

    return events 