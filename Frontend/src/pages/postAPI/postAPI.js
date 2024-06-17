import React, { useState } from 'react';
import * as S from './postAPIStyle';

const PostAPI = () => {
  const categories = ["AI", "IT", "SNS", "건강", "게임", "과학", "교육", "교통", "금융", "날씨", "뉴스 & 미디어", "부동산", "비디오 & 이미지", "쇼핑", "스포츠", "식음료", "에너지", "여행", "예술 & 엔터테인먼트", "기타"];

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
  }

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponse({ ...response, [name]: value });
  }

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
  }

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
  }

  const handleEdit = (index, type) => {
    if (type === 'request') {
      setRequest(apiDetails.requests[index]);
      setEditType('request');
    } else {
      setResponse(apiDetails.responses[index]);
      setEditType('response');
    }
    setEditIndex(index);
  }

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
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = checkEmptyFields(apiDetails);
    if (emptyFields.length > 0) {
      alert(`다음 필드를 입력해주세요: ${emptyFields.join(', ')}`);
      return;
    }
    // API 등록 로직을 여기에 추가하십시오. 예:
    // axios.post('/api/register', apiDetails)
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
    console.log(apiDetails);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        // 여기에 필요한 데이터를 json에서 추출하여 apiDetails에 채워 넣는 로직을 추가하십시오.
        setApiDetails({
          ...apiDetails,
          name: json.info.title || '',
          description: json.info.description || '',
          url: json.servers && json.servers.length > 0 ? json.servers[0].url : '',
          requests: json.paths ? Object.keys(json.paths).map(path => ({ 
            name: path,
            type: 'path',
            required: 'yes',
            description: json.paths[path].description || ''
          })) : [],
          responses: json.paths ? Object.keys(json.paths).flatMap(path => Object.keys(json.paths[path]).map(method => ({
            name: `${method.toUpperCase()} ${path}`,
            type: 'response',
            description: json.paths[path][method].responses['200'] ? json.paths[path][method].responses['200'].description : ''
          }))) : []
        });
      } catch (error) {
        alert('잘못된 JSON 파일입니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
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
              <label>
                예시코드:
                <br />
                <textarea name="examplecode" value={apiDetails.examplecode} onChange={handleInputChange}></textarea>
              </label>
              <label>
                Method:
                <S.RadioGroup>
                  <label><input type="radio" name="method" value="get" checked={apiDetails.method === 'get'} onChange={handleInputChange} /> GET</label>
                  <label><input type="radio" name="method" value="post" checked={apiDetails.method === 'post'} onChange={handleInputChange} /> POST</label>
                  <label><input type="radio" name="method" value="put" checked={apiDetails.method === 'put'} onChange={handleInputChange} /> PUT</label>
                  <label><input type="radio" name="method" value="patch" checked={apiDetails.method === 'patch'} onChange={handleInputChange} /> PATCH</label>
                  <label><input type="radio" name="method" value="delete" checked={apiDetails.method === 'delete'} onChange={handleInputChange} /> DELETE</label>
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
            <S.SubmitButton className="submit-button" type="submit">등록</S.SubmitButton>
            </form>
          </S.FormContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
}

export default PostAPI;
