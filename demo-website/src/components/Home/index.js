import {useState,useEffect,Redirect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import {UlContainer,HomeContainer,LiItem,LiPara,HomeHeading,NavigationButton,Page,NanButtonContainer} from './styledComponents'
import './index.css'

const Home=()=>{
    const[user,setUser]=useState();
    const[characters,setCharacters]=useState(null)
    const [pageNo,setPageNo]=useState(1)
    
    const navigate=useNavigate()
    const token=Cookies.get("jwt_token")

    useEffect(()=>{
        if(token===undefined){
            navigate('/login')
        }else{
            const getDetails= async()=>{
                const response=await fetch(`https://swapi.dev/api/people/?page=${pageNo}`)
                if(response.ok){
                    const data= await response.json()
                    console.log(data)
                    const details=data.results.map(eachOne=>(
                        {
                            url:eachOne.url,
                            name:eachOne.name,
                        }
                    ))
                    setCharacters(details)
                }
            }
            getDetails()
        }
    },[pageNo])

    const onPrevBuuton=()=>{
        setPageNo(prevPage=>{
            if(prevPage>1){
                return prevPage-1
            }else{
                return prevPage
            }
        })
    }

    const OnNextButton=()=>{
        setPageNo(prevPage=>(prevPage+1))
    }

    return(
        characters !==null &&
        <HomeContainer>
            <Header userName={user}/>
            <HomeHeading>Star Wars Characters</HomeHeading>
            <UlContainer>
                {characters.map(eachOne=>(
                    <LiItem key={eachOne.url}>
                        <Link className='link-ele' to={`/character-details/${eachOne.url[eachOne.url.length-2]}`}>
                            <LiPara>{eachOne.name}</LiPara>
                        </Link>
                    </LiItem>
                    ))}
            </UlContainer>
            <NanButtonContainer>
                <NavigationButton onClick={onPrevBuuton}>Previous Page</NavigationButton>
                <Page>{pageNo}</Page>
                <NavigationButton onClick={OnNextButton}>Next Page</NavigationButton>
            </NanButtonContainer>
        </HomeContainer>
    )
}

export default Home
