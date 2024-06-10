import style from 'styled-components'


export const CharacterContainer = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:#000000;
`;

export  const CharacterCard = style.div`
  background-image:linear-gradient(#a1bdbf,#89a1a3);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
`;

export  const CharacterHeader = style.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

export  const CharacterInfo = style.div`
  display: flex;
  flex-direction: column;
`;

export  const InfoItem = style.p`
  margin: 5px 0;
  font-size: 16px;

  a {
    color: #007bff;
    text-decoration: none;
  }
`;
