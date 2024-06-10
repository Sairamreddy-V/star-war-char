import style from 'styled-components'

export const HomeContainer=style.div`
    min-height:100vh;
    padding-bottom:100px;
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    background-color:#000000;
`

export const HomeNav=style.nav` 
    padding:10px;
    height:8vh;
    background-color:#11161c;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
export const NavLogoName=style.h1`
    color:#b58a3a;
    font-weight:bold;
    font-size:32px;
`
export const NavButton=style.button`
    color:${props=>(props.isLoginButton==="LOGIN" ? "#0b8f04":"#b81a24")};
    border: 2px solid ${props=>(props.isLoginButton==="LOGIN" ? "#0b8f04":"#b81a24")};
    background-color:transparent;
    outlet:none;
    cursor:pointer;
    font-size:14px;
    padding:5px;
    border-radius:4px;
    font-weight:bold;
`
export const UlContainer=style.ul`
    list-style-type:none;
    display:flex;
    background-color:#000000;
    margin-top:0px;
    padding:20px;
    flex-direction:column;

`
export const LogoutPopupContainer=style.div`
    background-color:transparent;
    display:flex;
    justify-content:center;
    align-items:center;
`
export const PopupCard=style.div`
    border-radius:10px;
    padding:10px;
    display:flex;
    width:180px;
    height:90px;
    flex-direction:column;
    background-color:#11161c;
`
export const PopupContent=style.p`
    color:#ffffff;
    font-size:15px;
    font-weight:bold;
    margin-bottom:18px;
    align-self:center;
`
export const ButtonContainer=style.div`
    display:flex;
    justify-content:space-around;
`
export const CancelButton=style.button`
    border:2px solid #8c0d0d;
    color:#8c0d0d;
    font-size:12px;
    background-color:transparent;
    font-weight:bold;
    padding:5px;
    border-radius:7px;
    cursor:pointer;
    outline:none;
`
export const ConfirmButton=style.button`
    border:none;
    color:#11161c;
    font-size:12px;
    background-color:#ffffff;
    font-weight:bold;
    padding:5px;
    border-radius:7px;
    cursor:pointer;
    outline:none;
`
export const LiItem=style.li`
    text-decoration:none;
    color:#ffffff;
    background-image:linear-gradient(to bottom,#6a6e75,#7f858f,#5a5d61);
    height:50px;
    border-radius:7px;
    box-shadow:1px 1px 1px 1px grey;
    margin-bottom:10px;
    @media(min-width:512px;){
        width:50%;
    }
    @media(min-width:512px;){
        width:100%;
    }
`

export const LiPara=style.p`
    color:#11161c;
    font-size:22px;
    font-weight:bold;
    align-self:center;
`
export const HomeHeading=style.h1`
    color:#ffffff;
    font-sixe:32px;
    font-weight:bold;
    text-align:center;
`

export const NavigationButton=style.button`
    color:#000000;
    background-color:grey;
    padiing:8px;
    border:none;
    border-radius:4px;
    pointer:cursor;
`
export const Page=style.span`
    background-color:transparent;
    font-size:22px;
    font-weight:bold;
    height:20px;
    color:#ffffff;
`

export const NanButtonContainer=style.div`
    padding:10px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
