import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fd;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(135deg, #4a90e2, #6a5eff);
  color: white;
  padding: 50px 100px;
`;

export const Box = styled.div`
  text-align: right;
  max-width: 1200px;
  width: 100%;
`;

export const InnerBox = styled.div`
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  cursor: pointer;
  background-color: #7f88f8;
  color: white;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
`;

export const HorizontalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 35px;
    cursor: pointer;
  }
`;

export const Register = styled.div`
  text-align: right;
  flex-grow: 1;
`;

export const RegisterText = styled.div`
  font-size: 14px;
  color: black;
  text-align: right;
`;

export const RegisterLink = styled.a`
  background-color: transparent;
  border: none;
  color: black;
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  line-height: 1.5;
  text-align: right;
`;

export const StartButton = styled.button`
  background-color: white;
  color: #4a90e2;
  border: none;
  margin-top: 20px;
  padding: 18px 36px;
  cursor: pointer;
  border-radius: 5px;
`;

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 120px; 
`;

export const Subtitle = styled.h2`
  font-size: 40px;
  margin-bottom: 120px; 
`;

export const Text = styled.h3`
  font-size: 36px;
  margin-bottom: 120px; 
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 20px;
`;
