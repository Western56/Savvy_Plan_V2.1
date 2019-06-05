import styled from "styled-components"
import {fontSizeSmallest, fontSizeMedium, fontSizeLargest} from "../../../Shared/Styles"
import {BackgroundLightBlueGrey,BackgroundDarkerLightBlueGrey, colorSlateBlueGrey, ShadowLight, ShadowLifted} from "../../../Shared/Styles"

export const TileTheme = styled.div`
    border-radius: 6px
    background-color: #D6E2EC;
    ${colorSlateBlueGrey}
    ${ShadowLight}; 
    &:hover {
        cursor: pointer;
        transform: scale(1.0008);
        transition: all .3s ease;
        ${ShadowLifted}
    }
`


export const SquareTileStyled = styled(TileTheme)`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;

${fontSizeMedium}
`
export const TileHeadingStyled = styled.div`
display: block;
float: left;
padding: 1rem;
${fontSizeMedium}
`
export const TileSubHeadingStyled = styled.div`
display: block;
float: left;
font-weight: 300;
${fontSizeSmallest}
margin-bottom: 1rem;
`
export const TileMainStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;
float: left;
${fontSizeLargest}
font-weight: 800;
justify-content: center;
border-bottom: 1px solid white;
`
export const TileChartStyled = styled.div`
display: flex;
flex-direction: column;
height: 100%;
align-items: center;
float: left;
${fontSizeLargest}
font-weight: 800;
justify-content: center;
`