import React from 'react';
import { Card, Board,Header,BoardContainer } from './Style';
/api/forums/top?type={type}


const PostBoard = ({ url }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get(url)
        .then(response => {
          if (Array.isArray(response.data.result)) {
            setData(response.data.result);
            console.log('Fetched data:', response.data.result); 
          } else {
            console.error('Unexpected response data format:', response.data);
            setError('Unexpected response data format.');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('데이터를 가져오는 중 오류 발생:', error);
          setError('서버에서 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
          setLoading(false);
        });
    }, [url]);
  
    if (loading) {
      return <div>로딩 중...</div>;
    }
  
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <pre>{error.toString()}</pre>
        </div>
      );
    }

    return (
        <BoardContainer>
          <Header>Q & A 게시판</Header>
          <Board>
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index}>
                {index + 1}. API 이유가 왜 뜨는지 궁금해요
              </Card>
            ))}
          </Board>
        </BoardContainer>
      );
    };
  
  export default PostBoard;