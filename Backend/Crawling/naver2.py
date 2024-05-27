# -*- coding: utf-8 -*-
import requests
import json
from bs4 import BeautifulSoup
import re

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"}

def extract_from_table(table, targets):
    rows = table.find_all('tr')
    if not rows:
        print("테이블에 행이 없습니다.")
        return None

    # 첫 번째 <tr>을 헤더로 사용
    headers = rows[0].find_all('th')
    target_indices = {target: -1 for target in targets}

    for i, header in enumerate(headers):
        header_text = header.get_text()
        for target in targets:
            if target in header_text:
                target_indices[target] = i

    # 모든 대상 헤더의 인덱스가 유효한지 확인
    if any(idx == -1 for idx in target_indices.values()):
        print("  필요한 열을 찾을 수 없습니다.")
        print(f"  찾지 못한 열: {', '.join([target for target, idx in target_indices.items() if idx == -1])}")
        # print(f"테이블 코드 :\n {table}")
        return None

    # 나머지 <tr> 요소에서 데이터 추출
    data = []
    for row in rows[1:]:  # 첫 번째 행은 헤더이므로 제외
        cols = row.find_all('td')
        row_data = {}
        for target, idx in target_indices.items():
            row_data[target] = cols[idx].get_text(strip=True)
        data.append(row_data)

    return data
    

def extract_info(url):
    res = requests.get(url)
    res.raise_for_status()

    soup = BeautifulSoup(res.text, "lxml")

    # 이름, url 추출
    names = []
    request_urls = []
    methods = []
    name_tag = soup.find(string=re.compile(r"\.\s*API\s*기본\s*정보"))
    if name_tag:
        name_table = name_tag.find_parent().find_next('table')
        targets = ["메서드", "설명", "요청 URL"]
        temp = extract_from_table(name_table, targets)

        if temp:
            for item in temp:
                methods.append(item["메서드"])
                names.append(item["설명"])
                request_urls.append(item["요청 URL"])
    else:
        print("not found: 1")
    
    # 설명 추출
    head_tag = soup.find('h1')
    if(head_tag):
        description_tag = head_tag.find_next('p')
        if(description_tag):
            description = description_tag.get_text(strip=True)
    
    # 파라미터 추출
    parameters = []
    parameter_tag = soup.find(string=re.compile(r"\.\s*요청\s*변수"))
    if (parameter_tag):
        param_table = parameter_tag.find_next('table')
        for i in range(len(names)):
            if param_table:
                param_list = []
                targets = ["요청 변수명", "타입", "설명"]
                temp = extract_from_table(param_table, targets)
                if temp:
                    for item in temp:
                        parameter = {
                            "parameter": item["요청 변수명"],
                            "type" : item["타입"],
                            "description": item["설명"]
                        }
                        param_list.append(parameter)
            parameters.append(param_list)
            param_table = param_table.find_next('table')

    # 응답 추출
    responses = []
    response_tag = soup.find(string=re.compile(r"\.\s*출력\s*결과"))
    if (response_tag):
        response_table = response_tag.find_next('table')
        for i in range(len(names)):
            if response_table:
                response_list =[]
                targets = ["필드", "타입", "설명"]
                temp = extract_from_table(response_table, targets)
                if temp:
                    for item in temp:
                        response = {
                            "response": item["필드"],
                            "type": item["타입"],
                            "description": item["설명"]
                        }
                        response_list.append(response)
            responses.append(response_list)
            response_table = response_table.find_next('table')
    else:
        print("에러")


    result = {
        'name': names,
        'method': methods,
        'description': description,
        'request_url': request_urls,
        'parameters': parameters,
        'responses': responses
    }
    return result

api_info = [
    {"id": "로그인 API 명세", "url": "https://developers.naver.com/docs/login/api/api.md"},
    {"id": "회원 프로필 조회 API 명세", "url": "https://developers.naver.com/docs/login/profile/profile.md"},
    {"id": "카페 API 명세", "url": "https://developers.naver.com/docs/login/cafe-api/cafe-api.md"},
    {"id": "캘린더 API 명세", "url": "https://developers.naver.com/docs/login/calendar-api/calendar-api.md"},
    {"id": "네이버페이 배송지 정보 API 명세", "url": "https://developers.naver.com/docs/login/payaddress-api/payaddress-api.md"},
]

results = []
for info in api_info:
    print(f"[ EXTRACT FROM {info['id']} ]")
    results.append(extract_info(info['url']))

with open('result2.txt', 'w', encoding='utf-8') as txt_file:
    for n, result in enumerate(results, start=1):
        txt_file.write(f"\n[{n}] {', '.join(result['name'])}\n")
        txt_file.write(f"    설명: {result['description']}\n")
        txt_file.write(f"    요청 URL:\n")
        for url in result['request_url']:
            txt_file.write(f"    - {url}\n")
        txt_file.write(f"    메서드:\n")
        for method in result.get('method', []):
            txt_file.write(f"    - {method}\n\n")
        for i, param_list in enumerate(result['parameters'], start=1):
            txt_file.write(f"    ({i}) 요청: \n")
            for j, param in enumerate(param_list, start=1):
                txt_file.write(f"        {j}. {param['parameter']} / {param['type']} / {param['description']}\n")
        for i, response_list in enumerate(result['responses'], start=1):
            txt_file.write(f"    ({i}) 응답\n")
            for j, response in enumerate(response_list, start=1):
                txt_file.write(f"        {j}. {response['response']} / {response['type']} / {response['description']}\n")