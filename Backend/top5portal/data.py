# 공공행정  : 기타
# 과학기술  : 과학
# 교육      : 교육
# 교통물류  : 교통
# 국토관리  : 기타
# 농축수산  : 기타
# 문화관광  : 여행
# 법률      : 기타
# 보건의료  : 건강
# 사회복지  : 기타
# 산업고용  : 기타
# 식품건강  : 건강
# 재난안전  : 기타
# 재정금융  : 금융
# 통일외교안보  : 기타
# 환경기상  : 날씨

# 1. 모든 api들의 링크 수집
#   한 페이지에 모든 목록이 들어간 링크에서 수집
#       [1] 모든 api 개수 수집(get_text)
#           <div class="tit-group"> <h3 class="tit float-l color-purple">오픈 API (11,297건)</h3> </div>
#       [2] 공공데이터포털 url에 개수 삽입
#       [3] <div class="result-list"><ul><li><...><a> (class="btn-preview"가 아닌 a태그)
# 2. 정보 수집



# -*- coding: utf-8 -*-
import requests
import re
from bs4 import BeautifulSoup

def get_num(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "lxml")
    num_tag = soup.find("#apiDataList h3.tit")
    if num_tag:
        num = re.search(r'\(([\d,]+)건\)', num_tag.text)
        if num:
            return num.group(1).replace(',', '')
    print("Failed to retrieve the number of Apis")
    return None

def collect_apis(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "lxml")
    data = soup.find("div", "result-list")
    apis = []
    for li_tag in data.find_all("li"):
        a_tag = li_tag.find("dt").find("a")
        apis.append(a_tag.get('href'))
    return apis

def extract_info(url):
    # res = requests.get("https://www.data.go.kr" + url)
    res =requests.get("https://www.data.go.kr/data/15122166/openapi.do")
    soup = BeautifulSoup(res.text, "lxml")

    data = soup.find("div", "data-search-view")
    name = data.find("p", "open-api-title").get_text()
    table = data.find("table", "dataset-table")
    service_url = table.find("th", )
    print(name)

    # result = {
    #     "name": name,
    #     "service_url": service_url,
    #     "description": description,
    #     "endpoints": endpoints
    # }
    # return result
# endpoints([{method, base_url, request, response}])
# request([{parameter, type, description}])
# response([{field, type, description}])

def main():
    url = "https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=API&keyword=&operator=AND&detailKeyword=&publicDataPk=&recmSe=&detailText=&relatedKeyword=&commaNotInData=&commaAndData=&commaOrData=&must_not=&tabId=&dataSetCoreTf=&coreDataNm=&sort=&relRadio=&orgFullName=&orgFilter=&org=&orgSearch=&currentPage=1&perPage=10&brm=&instt=&svcType=&kwrdArray=&extsn=&coreDataNmArray=&pblonsipScopeCode="
    # num = get_num(url)
    num = 1
    updated_url = f"https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=API&keyword=&operator=AND&detailKeyword=&publicDataPk=&recmSe=&detailText=&relatedKeyword=&commaNotInData=&commaAndData=&commaOrData=&must_not=&tabId=&dataSetCoreTf=&coreDataNm=&sort=&relRadio=&orgFullName=&orgFilter=&org=&orgSearch=&currentPage=1&perPage={num}&brm=&instt=&svcType=&kwrdArray=&extsn=&coreDataNmArray=&pblonsipScopeCode="
    apis = collect_apis(updated_url)
    print(apis)

    for api in apis:
        info = extract_info(api)
        print(info)

if __name__ == "__main__":
    main()