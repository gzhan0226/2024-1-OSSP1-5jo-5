import React, { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import SearchBar from '../../components/common/SearchBar';
import * as S from './postAPIStyle';

const PostAPI = () => {
  const [apiDetails, setApiDetails] = useState({
    name: '',
    description: '',
    category: '',
    url: '',
    pricing: '',
    codeProvided: '',
    endpoints: [],
  });

  const [endpoint, setEndpoint] = useState({
    name: '',
    requestParameter: '',
    responseParameter: '',
    codeExample: '',
  });

  const categories = ["AI", "IT", "SNS", "건강", "게임", "과학", "교육", "교통", "금융", "날씨", "뉴스 & 미디어", "부동산", "비디오 & 이미지", "쇼핑", "스포츠", "식음료", "에너지", "여행", "예술 & 엔터테인먼트", "기타"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApiDetails({ 
      ...apiDetails, 
      [name]: type === 'radio' ? (checked ? value : apiDetails[name]) : value 
    });
  };

  const handleEndpointChange = (e) => {
    const { name, value } = e.target;
    setEndpoint({ ...endpoint, [name]: value });
  };

  const addEndpoint = () => {
    setApiDetails({
      ...apiDetails,
      endpoints: [...apiDetails.endpoints, endpoint],
    });
    setEndpoint({
      name: '',
      requestParameter: '',
      responseParameter: '',
      codeExample: '',
    });
  };

  return (
    <S.AppContainer>
      <NavBar />
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.FormContainer>
            <h2>API 등록</h2>
            <form>
              <label>
                API 이름:
                <input type="text" name="name" value={apiDetails.name} onChange={handleInputChange} />
              </label>
              <label>
                API 설명:
                <textarea name="description" value={apiDetails.description} onChange={handleInputChange}></textarea>
              </label>
              <label>
                API 카테고리:
                <select name="category" value={apiDetails.category} onChange={handleInputChange}>
                  <option value="" disabled>선택하세요</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                API URL:
                <input type="text" name="url" value={apiDetails.url} onChange={handleInputChange} />
              </label>
              <label>
                API 가격 정책:
                <S.RadioGroup>
                  <label><input type="radio" name="pricing" value="무료" checked={apiDetails.pricing === '무료'} onChange={handleInputChange} /> 무료</label>
                  <label><input type="radio" name="pricing" value="유료" checked={apiDetails.pricing === '유료'} onChange={handleInputChange} /> 유료</label>
                </S.RadioGroup>
              </label>
              <label>
                예시코드 제공:
                <S.RadioGroup>
                  <label><input type="radio" name="codeProvided" value="제공" checked={apiDetails.codeProvided === '제공'} onChange={handleInputChange} /> 제공</label>
                  <label><input type="radio" name="codeProvided" value="미제공" checked={apiDetails.codeProvided === '미제공'} onChange={handleInputChange} /> 미제공</label>
                </S.RadioGroup>
              </label>
              <h3>API EndPoint</h3>
              <label>
                Name:
                <input type="text" name="name" value={endpoint.name} onChange={handleEndpointChange} />
              </label>
              <label>
                Request Parameter:
                <input type="text" name="requestParameter" value={endpoint.requestParameter} onChange={handleEndpointChange} />
              </label>
              <label>
                Response Parameter:
                <input type="text" name="responseParameter" value={endpoint.responseParameter} onChange={handleEndpointChange} />
              </label>
              <label>
                Code Example:
                <textarea name="codeExample" value={endpoint.codeExample} onChange={handleEndpointChange}></textarea>
              </label>
              <button type="button" onClick={addEndpoint}>추가</button>
            </form>
            <div className="endpoints-list">
              <h3>등록 엔드포인트 목록</h3>
              {apiDetails.endpoints.map((ep, index) => (
                <S.EndpointItem key={index}>
                  <span>{ep.name}</span>
                </S.EndpointItem>
              ))}
            </div>
            <S.SubmitButton className="submit-button" type="submit">등록</S.SubmitButton>
          </S.FormContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
}

export default PostAPI;
