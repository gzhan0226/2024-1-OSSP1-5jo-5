from urllib.parse import quote_plus
from bs4 import BeautifulSoup
from selenium import webdriver
import time

# 검색어 입력
plusUrl = input('검색어를 입력하세요: ')
baseUrl = 'https://www.google.com/search?q='
url = baseUrl + quote_plus(plusUrl)

# Chrome WebDriver 설정
driver = webdriver.Chrome()  # chromedriver의 경로가 환경변수에 설정되어 있는 경우
driver.implicitly_wait(10)

# 결과 파일 열기
with open('Result.txt', 'w', encoding='utf-8') as file:
    # 최대 페이지 설정 (10페이지)
    max_pages = 10

    # 크롤링 루프
    for page in range(max_pages):
        page_url = url + '&start=' + str(page * 10)
        driver.get(page_url)
        time.sleep(2)  # 페이지 로딩을 기다리기 위해 잠시 대기

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        v = soup.select('.yuRUbf')

        for i in v:
            title = i.select_one('.LC20lb.DKV0Md').text
            link = i.a.attrs['href']
            
            # "api" 혹은 "dev" 단어가 url에 포함된 경우에만 파일에 기록
            if 'api' in link or 'dev' in link:
                file.write(title + '\n')
                file.write(link + '\n')
                file.write('\n')

    print('done')

# 브라우저 종료
driver.quit()