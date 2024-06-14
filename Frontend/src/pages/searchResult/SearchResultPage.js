import React, { useState } from "react";
import ApiCard from "../../component/searchResult/ApiCard";
import DetailResult from "../../pages/searchResult/DetailResult";
import * as S from "./Style";

const SearchResultPage = () => {
  const [selectedApi, setSelectedApi] = useState(null);

  const apiData = [
    {
      icon: "/img/dochi.png",
      views: 2800,
      title: "Twitter API",
      description:
        "Twitter의 게시물, 인기 검색어 등 핵심 요소를 활용할 수 있는 API",
    },
    {
      icon: "/img/instagram.png",
      views: 2231,
      title: "Instagram API",
      description:
        "Instagram의 사진, 비디오 및 프로필 데이터에 접근할 수 있는 API",
    },
    {
      icon: "/img/tiktok.png",
      views: 2012,
      title: "Tiktok API",
      description:
        "TikTok의 동영상 콘텐츠와 사용자 인터랙션을 활용할 수 있는 API",
    },
    {
      icon: "/img/youtube.png",
      views: 1800,
      title: "Youtube API",
      description:
        "YouTube의 동영상, 채널, 댓글 등의 데이터를 관리할 수 있는 API",
    },
    {
      icon: "/img/kakaotalk.png",
      views: 1780,
      title: "KakaoTalk API",
      description: "카카오톡 메시지를 보내고, 채팅방 관리 등을 할 수 있는 API",
    },
    {
      icon: "/img/naverblog.png",
      views: 900,
      title: "NaverBlog API",
      description: "네이버 블로그의 글을 작성하고, 관리할 수 있는 API",
    },
    {
      icon: "/img/slack.png",
      views: 632,
      title: "Slack API",
      description: "Slack의 메시지 전송, 채널 관리 등의 기능을 제공하는 API",
    },
    {
      icon: "/img/snapchat.png",
      views: 629,
      title: "Snapchat API",
      description: "Snapchat의 스토리, 광고 등을 생성하고 관리할 수 있는 API",
    },
    {
      icon: "/img/kakaostory.png",
      views: 56,
      title: "KaKaoStory API",
      description: "카카오스토리의 게시물을 공유하고, 관리할 수 있는 API",
    },
  ];

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const handleCloseDetailView = () => {
    setSelectedApi(null);
  };

  return (
    <S.SearchResultPageContainer>
      {selectedApi && (
        <DetailResult api={selectedApi} onClose={handleCloseDetailView} />
      )}
      <S.CardGrid>
        {apiData.map((api, index) => (
          <S.CardGridItem key={index} onClick={() => handleApiClick(api)}>
            <ApiCard
              icon={api.icon}
              views={api.views}
              title={api.title}
              description={api.description}
            />
          </S.CardGridItem>
        ))}
      </S.CardGrid>
    </S.SearchResultPageContainer>
  );
};

export default SearchResultPage;
