//api나타내는 표
import styled from "styled-components";

export const Container = styled.div`
  background-color: rgb(245, 245, 251);
  width: 84vw;
  min-height: 100vh;
`;

export const AboutApi = styled.div`
  margin-top: 3%;
  background-color: white;
  width: 50vw;
  min-height: 20vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  padding: 20px 20px;
`;

export const Favicon = styled.img`
  width: 100px;
  height: 100px;
`;

export const Example = styled.div`
  background-color: ${(props) => (props.isProvided ? "#00d44c" : "#888888")};
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  width: max-content;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  
`;

export const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.isLiked ? "red" : "gray")};
  transition: color 0.3s ease;

  &:focus {
    outline: none;
  }
`;

export const GoButton = styled.button`
  width: 100%;
  height: 20%;
  background-color: #5060ff;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4050d4;
  }

  &:focus {
    outline: none;
  }
`;

export const ColDiv = styled.div`

  display: flex;
  flex-direction: column;
  &:nth-child(1){
    width:20%;
  }
  &:nth-child(2){
    width:60%;
  }
  &:nth-child(3){
    width:20%;
    margin-left: 20px;
    align-items:flex-end;
    padding-bottom:20px;
    
    > :nth-child(2) {
      margin-top: 30px;
    }

  > :last-child{
     margin-top:75px;
    }
  }
  
`;

export const InfoContainer = styled.div`
  display: flex;
  margin-top: 30px;

`;

export const P = styled.p`
border-bottom: 1px solid;
padding-bottom: 20px;
margin-top:100px;
`


export const PP = styled.p`
font-size: 20px;
`

export const Endpoint = styled.div`
  border-radius: 8px;
  width: fit-content;
  margin-left: 100px;
  color: #5060ff;
  font-size: 25px;
  font-weight: 700;
  padding: 10px 20px;
  padding-bottom:30px;
  
`;

export const EndpointBox = styled.div`
  width: max-content;
  height: fit-content;
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
  padding: 20px 10px;
  display: flex;
  margin-top: 0;

  p {
    margin: 5px 0px 0px 15px;
    font-size: 15px;
    color: black;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:not(:first-child) {
    margin-top: 30px;
  }
`;

export const Method = styled.div`
  width: 20%;
  height: fit-content;
  border-radius: 8px;
  padding: 5px 10px;
  background-color: #61AFFE;
  color:white;
  font-size: 16px;
  
`;
export const Description= styled.p`
font-size:20px;
color: black; 
`

// 테이블
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Table = styled.table`
  width: 45%;
  background-color: black;
  border-collapse: collapse;
  margin: 25px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  table-layout: auto;
`;

export const Thead = styled.thead`
  background-color: #f9fafb;
  border-bottom: 2px solid #e8e8e8;
  border-radius: 20px;
  white-space: nowrap;
`;

export const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 500;
  color: #1f2937;
  text-transform: uppercase;
  font-size: 16px;
`;

export const Tbody = styled.tbody`
  white-space: nowrap;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: black;
  }
`;

export const Td = styled.td`
  padding: 15px;
  color: white;
  font-size: 15px;
`;

export const StatusTag = styled.span`
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 0.875em; // 14px
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 10px;
  color: ${props => props.textColor};
  background-color: ${props => props.bgColor};
`;

export const RequiredTag = styled(StatusTag)`
  color: ${props => (props.required ? '#742A2A' : 'rgb(34,84,61)')};
  background-color: ${props => (props.required ? 'rgba(254,235,235,1)' : 'rgb(198, 246, 213)')};
`;

const statusColors = {
  required: {
    true: { textColor: '#fff', bgColor: '#e53e3e' }, // red for required
    false: { textColor: '#fff', bgColor: '#48bb78' } // green for optional
  },
  type: {
    string: { textColor: '#fff', bgColor: '#ed8936' }, // orange for string
    integer: { textColor: '#fff', bgColor: '#4299e1' }, // blue for integer
    default: { textColor: '#fff', bgColor: '#718096' } // gray for others
  }
};

export const getStatusColor = (type, value) => {
  if (!value) {
    value = "null";
  }

  if (type === 'required') {
    return statusColors.required[value];
  } else if (type === 'type') {
    return statusColors.type[value.toLowerCase()] || statusColors.type.default;
  }
};
