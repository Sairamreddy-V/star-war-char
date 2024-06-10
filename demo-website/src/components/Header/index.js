import { useState,useEffect } from 'react'
import{useNavigate,Link} from 'react-router-dom'
import cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'
import { HomeNav,NavButton,NavLogoName,PopupCard,PopupContent,LogoutPopupContainer,ButtonContainer,CancelButton,ConfirmButton,UserNameHeading} from './styledComponents'


const Header=(props)=>{
    const[isLoginButton,setLoginButton]=useState();
    const [isLogin,setLoginUpdate]=useState()
    const navigate=useNavigate()
    useEffect(()=>{
        const token=cookies.get("jwt_token")
        if(token===undefined){
            setLoginButton("LOGIN")
            setLoginUpdate(false)
        }else{
            setLoginButton("LOGOUT")
            setLoginUpdate(true)
        }
    },[])
    const onNavButton=event=>{
        const value=event.target.value
        if(value==="LOGOUT"){
            cookies.remove('jwt_token')
            navigate('/login')
        }else{
            navigate('/login')
        }
    }
    return(
        <HomeNav>
            <NavLogoName>Star War Characters</NavLogoName>
            <div className='home-log-container'>
            <Link className='link-elememt' to='/'>
                <p className='link-p'>Home</p>
            </Link>
            {isLogin&& props.userName!==undefined &&<UserNameHeading>Hello {props.userName}</UserNameHeading>}
            {isLoginButton==="LOGIN" ? <NavButton onClick={onNavButton} value={isLoginButton} $isLoginButton={isLoginButton}>{isLoginButton}</NavButton>:
                <Popup
                    modal
                    trigger={
                        <NavButton  $isLoginButton={isLoginButton}>{isLoginButton}</NavButton>
                    }
                >
                    {close => (
                    <>
                        <LogoutPopupContainer>
                            <PopupCard>
                                <PopupContent>Are you Sure!</PopupContent>
                                <ButtonContainer>
                                    <CancelButton onClick={() => close()}>Cancel</CancelButton>
                                    <ConfirmButton value={isLoginButton} onClick={onNavButton}>Confirm</ConfirmButton>
                                </ButtonContainer>
                            </PopupCard>
                        </LogoutPopupContainer>
                    </>
                    )}
                </Popup>
            }
            </div>
        </HomeNav>
    )
}

export default Header