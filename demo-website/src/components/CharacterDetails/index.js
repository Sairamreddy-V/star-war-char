import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Header from '../Header'
import {CharacterContainer,CharacterCard,CharacterHeader,CharacterInfo,InfoItem} from './styledComponents';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const token=Cookies.get('jwt_token')
  const navigate=useNavigate()

  useEffect( () => {
    if(token!==undefined){
        const getDetails= async ()=>{
            const response= await fetch(`https://swapi.dev/api/people/${id}/`)
            if(response.ok){
                const data=await response.json()
                console.log(data)
                setCharacter(data)
            }
        }
        getDetails()
    }else{
        navigate('/login')
    }
  }, []);

  return (
    <>
    <Header/>
    <CharacterContainer>
      {character && (
        <CharacterCard>
          <CharacterHeader>{character.name}</CharacterHeader>
          <CharacterInfo>
            <InfoItem><strong>Height:</strong> {character.height} cm</InfoItem>
            <InfoItem><strong>Mass:</strong> {character.mass} kg</InfoItem>
            <InfoItem><strong>Hair Color:</strong> {character.hair_color}</InfoItem>
            <InfoItem><strong>Skin Color:</strong> {character.skin_color}</InfoItem>
            <InfoItem><strong>Eye Color:</strong> {character.eye_color}</InfoItem>
            <InfoItem><strong>Birth Year:</strong> {character.birth_year}</InfoItem>
            <InfoItem><strong>Gender:</strong> {character.gender}</InfoItem>
            <InfoItem><strong>Homeworld:</strong> <a href={character.homeworld} target="_blank" rel="noopener noreferrer">View Homeworld</a></InfoItem>
            <InfoItem><strong>Films:</strong> {character.films.map(film => (
              <div key={film}><a href={film} target="_blank" rel="noopener noreferrer">Film {film.match(/\d+/)[0]}</a></div>
            ))}</InfoItem>
            <InfoItem><strong>Species:</strong> {character.species.length > 0 ? character.species.map(species => (
              <div key={species}><a href={species} target="_blank" rel="noopener noreferrer">Species {species.match(/\d+/)[0]}</a></div>
            )) : 'N/A'}</InfoItem>
            <InfoItem><strong>Vehicles:</strong> {character.vehicles.length > 0 ? character.vehicles.map(vehicle => (
              <div key={vehicle}><a href={vehicle} target="_blank" rel="noopener noreferrer">Vehicle {vehicle.match(/\d+/)[0]}</a></div>
            )) : 'N/A'}</InfoItem>
            <InfoItem><strong>Starships:</strong> {character.starships.length > 0 ? character.starships.map(starship => (
              <div key={starship}><a href={starship} target="_blank" rel="noopener noreferrer">Starship {starship.match(/\d+/)[0]}</a></div>
            )) : 'N/A'}</InfoItem>
          </CharacterInfo>
        </CharacterCard>
      )}
    </CharacterContainer>
    </>
  );
};

export default CharacterDetails;
