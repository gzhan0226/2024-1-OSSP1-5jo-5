import React from 'react';
import { BannerContainer, BannerContent, BannerImage, BannerText, BannerButton } from './Style';
import { FaEnvelope, FaGlobe } from 'react-icons/fa';


const Banner = () => {
  return (
    <BannerContainer>
        <BannerImage src="/img/hedgehog.png" alt="Dochi" />
        <BannerText>
          <h1>당신의 API를 공유해주세요!</h1>
          <p>당신이 사용중인 API를 공유하고,<br />이를 통해 해당 웹사이트를 보다 효율적으로 활용해보아요</p>
          <p><FaEnvelope /> dochi@email.com &nbsp; <FaGlobe /> dochi.site.com</p>
        </BannerText>
        <BannerButton>API 등록하러가기 →</BannerButton>
    </BannerContainer>
  );
};

export default Banner;
