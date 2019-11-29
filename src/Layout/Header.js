import React from 'react'
import ButtonLight from "../UI/Buttons/ButtonLight"
import { NavLink} from "react-router-dom"
import styled from "styled-components"
import logoLight from "../assets/svgs/SavvyPlan_logo_final_justlogo.svg"

export default function Header(props) {
    return (
        <HeaderContainer>
            <Left>
                <Logo>
                    <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
                </Logo>
                <Header3>
                    Savvy Plan
                </Header3>

            </Left>
            <Right>
            <StyledNavLink to="/Home" activeClassName="active">
                <PageSelect>
                    HOME
                </PageSelect>
            </StyledNavLink>
            <Hr/>
            <StyledNavLink to="/Dashboard" activeClassName="active">
                <PageSelect>
                        DASHBOARD
                </PageSelect>
            </StyledNavLink>
            <Hr/>
            <StyledNavLink to="/Learn" activeClassName="active">
                    <PageSelect>
                       ACCOUNT
                    </PageSelect>
            </StyledNavLink>
            <Hr/>
            <StyledNavLink to="/Learn" activeClassName="active">
                    <PageSelect>
                       ASSUMPTIONS
                    </PageSelect>
            </StyledNavLink>     
            <ButtonLight text={"Login"}/>    
            <ButtonLight text={"Sign Up"}/>    
            </Right>
                
        </HeaderContainer>
    )
}




//--------HEADER GRID LAYOUT---------------------------------------------------------------//

export const HeaderContainer = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    height: 6rem;
    background: ${props => props.theme.color.background3};
    font-weight: 200;
    margin-bottom: 3rem;
    
`
const Logo = styled.div`
        width: 10rem;
        height: 10rem;


`

const Left = styled.div`
        flex: 1;
        display: flex;
        width: 10%;
        align-content: center;
        flex-direction: row;
        align-items: center
        justify-content: left;
`

const Header3 = styled.div`
        font-size: ${props => props.theme.fontSize.medium};
        color: ${props => props.theme.color.text1};
        font-weight: 300;
     
`
const Right = styled.div`
     display: flex;
     jusitfy-content: space-between;
     width: 50%;
     align-items: center;
     font-weight: 300;

`
export const PagePointer = styled.div`
        height: 5rem;
        width: 5rem;
        background: transparent;
        clip-path: polygon(25% 73%, 0% 100%, 100% 100%);
        position: absolute;
        top: -2rem;
        z-index: 3;
`
export const PageSelect = styled.div`
       padding: 1rem;
       margin: 1rem;
       font-size: ${props => props.theme.fontSize.small};
       ${props => props.theme.flexContent.center};
       height: 100%;
       cursor: pointer;
       position: relative
       border-radius: 1px;
       transition: all .1s ease-in;
       &:hover {
           background: ${props => props.theme.color.text1};
           color:  ${props => props.theme.color.background3};
       }
`
const Hr = styled.hr`
    width: 1rem;
    color: white;
`


export const StyledNavLink = styled(NavLink)`
       text-decoration: none;
       color: white;
    &.active ${PagePointer} {
        background-color: ${props => props.theme.color.dullSteelblue};
    } 
  } 
  `

//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Website header rendering the website title, buttons that change the theme, and a login button. 