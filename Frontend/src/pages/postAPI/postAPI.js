import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SearchBar from "../../component/common/SearchBar";
import * as S from './postAPIStyle';

const PostAPI = () => {
  const categories = ["AI", "IT", "SNS", "건강", "게임", "과학", "교육", "교통", "금융", "날씨", "뉴스 & 미디어", "부동산", "비디오 & 이미지", "쇼핑", "스포츠", "식음료", "에너지", "여행", "예술 & 엔터테인먼트", "기타"];
  const userId = Cookies.get('user_id');

  const [apiDetails, setApiDetails] = useState({
    name: '',
    description: '',
    category: '',
    url: '',
    pricing: '',
    codeProvided: '',
    examplecode: '',
    endpoint: '',
    method: '',
    requests: [],
    responses: [],
  });

  const [request, setRequest] = useState({
    name: '',
    type: '',
    required: '',
    description: '',
  });

  const [response, setResponse] = useState({
    name: '',
    type: '',
    description: '',
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApiDetails({
      ...apiDetails,
      [name]: type === 'radio' ? (checked ? value : apiDetails[name]) : value
    });
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponse({ ...response, [name]: value });
  };

  const addRequest = () => {
    if (editType === 'request' && editIndex !== null) {
      const updatedRequests = [...apiDetails.requests];
      updatedRequests[editIndex] = request;
      setApiDetails({
        ...apiDetails,
        requests: updatedRequests,
      });
      setEditIndex(null);
      setEditType('');
    } else {
      setApiDetails({
        ...apiDetails,
        requests: [...apiDetails.requests, request],
      });
    }
    setRequest({
      name: '',
      type: '',
      required: '',
      description: '',
    });
  };

  const addResponse = () => {
    if (editType === 'response' && editIndex !== null) {
      const updatedResponses = [...apiDetails.responses];
      updatedResponses[editIndex] = response;
      setApiDetails({
        ...apiDetails,
        responses: updatedResponses,
      });
      setEditIndex(null);
      setEditType('');
    } else {
      setApiDetails({
        ...apiDetails,
        responses: [...apiDetails.responses, response],
      });
    }
    setResponse({
      name: '',
      type: '',
      description: '',
    });
  };

  const handleEdit = (index, type) => {
    if (type === 'request') {
      setRequest(apiDetails.requests[index]);
      setEditType('request');
    } else {
      setResponse(apiDetails.responses[index]);
      setEditType('response');
    }
    setEditIndex(index);
  };

  const handleDelete = (index, type) => {
    if (type === 'request') {
      const updatedRequests = [...apiDetails.requests];
      updatedRequests.splice(index, 1);
      setApiDetails({
        ...apiDetails,
        requests: updatedRequests,
      });
    } else {
      const updatedResponses = [...apiDetails.responses];
      updatedResponses.splice(index, 1);
      setApiDetails({
        ...apiDetails,
        responses: updatedResponses,
      });
    }
  };

  const checkEmptyFields = (apiDetails) => {
    const emptyFields = [];
    if (apiDetails.name.trim() === '') emptyFields.push('이름');
    if (apiDetails.description.trim() === '') emptyFields.push('설명');
    if (apiDetails.category.trim() === '') emptyFields.push('카테고리');
    if (apiDetails.url.trim() === '') emptyFields.push('URL');
    if (apiDetails.pricing.trim() === '') emptyFields.push('가격 정책');
    if (apiDetails.codeProvided.trim() === '') emptyFields.push('예시코드 제공 여부');
    if (apiDetails.codeProvided === '제공' && apiDetails.examplecode.trim() === '') emptyFields.push('예시코드');
    if (apiDetails.method.trim() === '') emptyFields.push('메소드');
    if (apiDetails.endpoint.trim() === '') emptyFields.push('엔드포인트');
    if (apiDetails.requests.length === 0) emptyFields.push('요청');
    if (apiDetails.responses.length === 0) emptyFields.push('응답');
    return emptyFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = checkEmptyFields(apiDetails);
    if (emptyFields.length > 0) {
      alert(`다음 필드를 입력해주세요: ${emptyFields.join(', ')}`);
      return;
    }
  
    setIsSubmitting(true);
  
    // API 등록 로직
    try {
      const requestBody = {
        user_id: Cookies.get('user_id'),
        name: apiDetails.name,
        description: apiDetails.description,
        category: apiDetails.category,
        service_url: apiDetails.url,
        price: apiDetails.pricing.toLowerCase(),
        example_code_provided: apiDetails.codeProvided === '제공',
        endpoints: [
          {
            endpoint: apiDetails.endpoint,
            method: apiDetails.method.toUpperCase(),
            example_code: apiDetails.examplecode,
            description: apiDetails.description,
            request: apiDetails.requests.map(req => ({
              parameter: req.name,
              type: req.type,
              required: req.required === 'yes',
              description: req.description
            })),
            response: apiDetails.responses.map(res => ({
              field: res.name,
              type: res.type,
              description: res.description
            }))
          }
        ]
      };
  
      console.log("Request Body: ", requestBody); // 요청 본문을 콘솔에 출력하여 확인
  
      const response = await axios.post('http://localhost:8080/api/data', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.code === 200) {
        alert(response.data.message);
        setApiDetails({
          name: '',
          description: '',
          category: '',
          url: '',
          pricing: '',
          codeProvided: '',
          examplecode: '',
          endpoint: '',
          method: '',
          requests: [],
          responses: [],
        });
      } else {
        alert('API 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('API 등록 오류:', error);
      alert('API 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false); // Enable the button after the request is done
    }
  };
    

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setApiDetails({
          ...apiDetails,
          name: json.apis[0].name || '',
          description: json.apis[0].description || '',
          url: json.apis[0].service_url || '',
          endpoint: json.apis[0].base_url || '',
          method: json.apis[0].method || '',
          category: json.apis[0].category || '',
          pricing: json.apis[0].price || '',
          codeProvided: json.apis[0].example_code_provided ? '제공' : '미제공',
          examplecode: json.apis[0].examplecode || '',
          requests: json.apis[0].request ? json.apis[0].request.map(req => ({
            name: req.parameter,
            type: req.type,
            required: req.required ? 'yes' : 'no',
            description: req.description
          })) : [],
          responses: json.apis[0].response ? json.apis[0].response.map(res => ({
            name: res.field,
            type: res.type,
            description: res.description
          })) : []
        });
      } catch (error) {
        alert('잘못된 JSON 파일입니다.');
      }
    };
    reader.readAsText(file);
  };

  // API 호출 함수 추가
  const getFisheryValueFutureOceanicData = async (serviceKey, longitude, latitude, date, responseType = 'json') => {
    const baseUrl = apiDetails.endpoint;
    
    const url = new URL(baseUrl);
    url.searchParams.append('serviceKey', serviceKey);
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('latitude', latitude);
    url.searchParams.append('date', date);
    if (responseType) {
        url.searchParams.append('_type', responseType);
    }

    try {
        const response = await fetch(url.toString(), {
            method: apiDetails.method.toUpperCase()
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (responseType === 'json') {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('Error fetching the API:', error);
        throw error;
    }
  }

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.FormContainer>
            <h2>API 등록</h2>
            <form onSubmit={handleSubmit}>
              <label>
                JSON 파일 업로드:
                <br />
                <input type="file" accept=".json" onChange={handleFileUpload} />
              </label>
              <label>
                API 이름:
                <br />
                <input type="text" name="name" value={apiDetails.name} onChange={handleInputChange} />
              </label>
              <label>
                API 설명:
                <br />
                <textarea name="description" value={apiDetails.description} onChange={handleInputChange}></textarea>
              </label>
              <label>
                API 카테고리:
                <br />
                <select name="category" value={apiDetails.category} onChange={handleInputChange}>
                  <option value="" disabled>선택하세요</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                API URL:
                <br />
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
              {apiDetails.codeProvided === '제공' && (
                <label>
                  예시코드:
                  <br />
                  <textarea name="examplecode" value={apiDetails.examplecode} onChange={handleInputChange}></textarea>
                </label>
              )}
              <label>
                Method:
                <S.RadioGroup>
                  <label><input type="radio" name="method" value="GET" checked={apiDetails.method === 'GET'} onChange={handleInputChange} /> GET</label>
                  <label><input type="radio" name="method" value="POST" checked={apiDetails.method === 'POST'} onChange={handleInputChange} /> POST</label>
                  <label><input type="radio" name="method" value="PUT" checked={apiDetails.method === 'PUT'} onChange={handleInputChange} /> PUT</label>
                  <label><input type="radio" name="method" value="PATCH" checked={apiDetails.method === 'PATCH'} onChange={handleInputChange} /> PATCH</label>
                  <label><input type="radio" name="method" value="DELETE" checked={apiDetails.method === 'DELETE'} onChange={handleInputChange} /> DELETE</label>
                </S.RadioGroup>
              </label>
              <label>
                Endpoint:
                <br />
                <input type="text" name="endpoint" value={apiDetails.endpoint} onChange={handleInputChange} />
              </label>
              <h3>API 요청 등록</h3>
              <label>
                Name:
                <br />
                <input type="text" name="name" value={request.name} onChange={handleRequestChange} />
              </label>
              <label>
                Type:
                <br />
                <input type="text" name="type" value={request.type} onChange={handleRequestChange} />
              </label>
              <label>
                Required?
                <S.RadioGroup>
                  <label><input type="radio" name="required" value="yes" checked={request.required === 'yes'} onChange={handleRequestChange} /> Yes</label>
                  <label><input type="radio" name="required" value="no" checked={request.required === 'no'} onChange={handleRequestChange} /> No</label>
                </S.RadioGroup>
              </label>
              <label>
                설명:
                <br />
                <textarea name="description" value={request.description} onChange={handleRequestChange}></textarea>
              </label>
              <button type="button" onClick={addRequest}>{editType === 'request' && editIndex !== null ? '수정' : '추가'}</button>
              <div className='request-list'>
                <h3>등록 요청 목록</h3>
                {apiDetails.requests.map((ep, index) => (
                  <S.Item key={index}>
                    <span>{ep.name}</span>
                    <button type="button" onClick={() => handleEdit(index, 'request')}>수정</button>
                    <button type="button" onClick={() => handleDelete(index, 'request')}>삭제</button>
                  </S.Item>
                ))}
              </div>
              <h3>API 응답 등록</h3>
              <label>
                Name:
                <br />
                <input type="text" name="name" value={response.name} onChange={handleResponseChange} />
              </label>
              <label>
                Type:
                <br />
                <input type="text" name="type" value={response.type} onChange={handleResponseChange} />
              </label>
              <label>
                설명:
                <br />
                <textarea name="description" value={response.description} onChange={handleResponseChange}></textarea>
              </label>
              <button type="button" onClick={addResponse}>{editType === 'response' && editIndex !== null ? '수정' : '추가'}</button>
              <div className='response-list'>
                <h3>등록 응답 목록</h3>
                {apiDetails.responses.map((ep, index) => (
                  <S.Item key={index}>
                    <span>{ep.name}</span>
                    <button type="button" onClick={() => handleEdit(index, 'response')}>수정</button>
                    <button type="button" onClick={() => handleDelete(index, 'response')}>삭제</button>
                  </S.Item>
                ))}
              </div>
              <S.SubmitButton className="submit-button" type="submit" disabled={isSubmitting}>등록</S.SubmitButton>
            </form>
          </S.FormContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
}

export default PostAPI;
