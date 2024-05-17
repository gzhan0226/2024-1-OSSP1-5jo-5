# -*- coding: utf-8 -*-
import requests
import json
from bs4 import BeautifulSoup

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"}

def extract_info(url):
    res = requests.get(url, headers=headers)
    res.raise_for_status()  # 문제 있으면 종료

    # 파싱
    soup = BeautifulSoup(res.text, "lxml") #모든 html을 객체로

    # 이름 추출
    name_tag = soup.find('h1')
    if name_tag:
        name = name_tag.text
    else:
        name = "Description not found"

    # 설명 추출
    description_tag = soup.find('h4', id='설명')
    if description_tag:
        description = description_tag.find_next_sibling('p').text
    else:
        description = "Description not found"

    # 요청 URL 추출
    request_url_tag = soup.find('h4', id='요청-url')
    if request_url_tag:
        request_url = request_url_tag.find_next('code').text
    else:
        request_url = "Request URL not found"

    # 파라미터 추출
    parameters = []
    parameter_table = soup.find('h4', id='파라미터')
    if parameter_table:
        parameter_table = parameter_table.find_next('table')
        for row in parameter_table.find_all('tr')[1:]:
            cols = row.find_all('td')
            parameter = {
                'parameter': cols[0].text,
                'type': cols[1].text,
                'required': cols[2].text.strip() == 'Y',
                'description': cols[3].text
            }
            parameters.append(parameter)
    else:
        parameters.append({
            'parameter': 'N/A',
            'type': 'N/A',
            'required': 'N/A',
            'description': 'Parameter information not found'
        })

    # 응답 추출
    responses = []
    response_table = soup.find('h4', id='응답')
    if response_table:
        response_table = response_table.find_next('table')
        for row in response_table.find_all('tr')[1:]:
            cols = row.find_all('td')
            response = {
                'response': cols[0].text,
                'type': cols[1].text,
                'description': cols[2].text
            }
            responses.append(response)
    else:
        responses.append({
            'response': 'N/A',
            'type': 'N/A',
            'description': 'Response information not found'
        })

    # 결과를 JSON 형식으로 출력
    result = {
        'name': name,
        'description': description,
        'request_url': request_url,
        'parameters': parameters,
        'responses': responses
    }
    return result

api_info = [
    {"id": "통합 검색어 트렌드", "url": "https://developers.naver.com/docs/serviceapi/datalab/search/search.md#%ED%86%B5%ED%95%A9-%EA%B2%80%EC%83%89%EC%96%B4-%ED%8A%B8%EB%A0%8C%EB%93%9C"},
    # 검색
    {"id": "블로그 검색", "url": "https://developers.naver.com/docs/serviceapi/search/blog/blog.md#%EB%B8%94%EB%A1%9C%EA%B7%B8"},
    {"id": "뉴스 검색", "url": "https://developers.naver.com/docs/serviceapi/search/news/news.md#%EB%89%B4%EC%8A%A4"},
    {"id": "책 검색", "url": "https://developers.naver.com/docs/serviceapi/search/book/book.md#%EC%B1%85"},
    {"id": "성인 검색어 판별 검색", "url": "https://developers.naver.com/docs/serviceapi/search/adult/adult.md#%EC%84%B1%EC%9D%B8%EA%B2%80%EC%83%89%EC%96%B4%ED%8C%90%EB%B3%84"},
    {"id": "백과사전 검색", "url": "https://developers.naver.com/docs/serviceapi/search/encyclopedia/encyclopedia.md#%EB%B0%B1%EA%B3%BC%EC%82%AC%EC%A0%84"},
    {"id": "카페글 검색", "url": "https://developers.naver.com/docs/serviceapi/search/cafearticle/cafearticle.md#%EC%B9%B4%ED%8E%98%EA%B8%80"},
    {"id": "지식iN 검색", "url": "https://developers.naver.com/docs/serviceapi/search/kin/kin.md#%EC%A7%80%EC%8B%9DiN"},
    {"id": "지역 검색", "url": "https://developers.naver.com/docs/serviceapi/search/local/local.md#%EC%A7%80%EC%97%AD"},
    {"id": "오타변환 검색", "url": "https://developers.naver.com/docs/serviceapi/search/errata/errata.md#%EC%98%A4%ED%83%80%EB%B3%80%ED%99%98"},
    {"id": "웹문서 검색", "url": "https://developers.naver.com/docs/serviceapi/search/web/web.md#%EC%9B%B9%EB%AC%B8%EC%84%9C"},
    {"id": "이미지 검색", "url": "https://developers.naver.com/docs/serviceapi/search/image/image.md#%EC%9D%B4%EB%AF%B8%EC%A7%80"},
    {"id": "쇼핑 검색", "url": "https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md#%EC%87%BC%ED%95%91"},
    {"id": "전문자료 검색", "url": "https://developers.naver.com/docs/serviceapi/search/doc/doc.md#%EC%A0%84%EB%AC%B8%EC%9E%90%EB%A3%8C"},
    #
    {"id": "단축 URL", "url": "https://developers.naver.com/docs/utils/shortenurl/"},
    {"id": "이미지 캡차", "url": "https://developers.naver.com/docs/utils/captcha/overview/"},
    {"id": "음성 캡차", "url": "https://developers.naver.com/docs/utils/scaptcha/overview/"},
    {"id": "네이버 공유하기", "url": "https://developers.naver.com/docs/share/navershare/"},
    {"id": "네이버 앱 연동", "url": "https://developers.naver.com/docs/utils/mobileapp/"},
    {"id": "네이버 오픈메인", "url": "https://developers.naver.com/docs/openmain/"},
    # 로그인
    {"id": "네이버 로그인", "url": "https://developers.naver.com/docs/login/api/api.md"},
]
results = [extract_info(info['url']) for info in api_info]

# print(json.dumps(result, indent=4, ensure_ascii=False))
# 출력
with open('result.txt', 'w', encoding='utf-8') as txt_file:
    for n, result in enumerate(results, start=1):
        txt_file.write(f"\n[{n}] {result['name']}\n")
        txt_file.write(f"    설명: {result['description']}\n")
        txt_file.write(f"    요청 URL: {result['request_url']}")
        for i, param in enumerate(result['parameters'], start=1):
            txt_file.write(f"    {i}. Parameter: {param['parameter']}")
            txt_file.write(f"        Type: {param['type']}")
            txt_file.write(f"        Required: {'Yes' if param['required'] else 'No'}")
            txt_file.write(f"        Description: {param['description']}\n")
        for i, response in enumerate(result['responses'], start=1):
            txt_file.write(f"    {i}. Response: {response['response']}")
            txt_file.write(f"        Type: {response['type']}")
            txt_file.write(f"        Description: {response['description']}\n")
