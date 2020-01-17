import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/forms1/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rate1, rate2, investmentReturnsArray} from "redux/assumptions/assumptions_selectors"
import minirangebar1 from "UI/miniRangeBar1/MiniRangeBar"
import {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action} from "redux/savings/savings_actions"

const PreRetirementRate = ({count, user_reducer, setInvestmentFactor_action, investmentReturnsArray}) => {

    const setInvestmentFactor = (value, nothing, {name}) => {
        setInvestmentFactor_action(name, value) 

    }
    const position = count - 6
return (
    <>
        <Title>We need to make some assumptions.</Title>
                {
                    count === 6 ? 
                          <Dialogue>
                              What rate of return would you like to use for your savings projections? 
                             <span> The Financial Planning Standards Council recccomends 6.4% </span> 
                          </Dialogue>

                    :
                    count === 7 ? 
                        <Dialogue>
                           After entering retirement, you’ll want to protect
                            your savings. You’ll do this by reducing risk which
                            can also reduce your return.   
                        <span> The Financial Planning Standards Council recccomends 5% </span> 
                        </Dialogue>
                    :
                    count === 8 ? 
                        <Dialogue>
                            You’re likely paying someone to manage 
                            your money. This expense also has to be reduced 
                            from your rate of return. 
                        <span> The average Canadian is paying around 2.1%. If you use a Robo-Advisor like Wealthsimple it can be closer to 0.5%. </span> 
                        </Dialogue>
                    :
                    count === 9 ? 
                        <Dialogue>
                            We’d like to keep all our future prediction numbers
                            in todays dollars. We do this by subtracting inflation
                            from the rate of return. 
                        <span> The Financial Planning Standards Council recccomends 2% </span> 
                        </Dialogue>
                    :
                    null
                }
             

        {

                 <minirangebar1 
                                            id={investmentReturnsArray[position].name}
                                            key={investmentReturnsArray[position].name}
                                            setValue={setInvestmentFactor}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={investmentReturnsArray[position]}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />
            }

    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    investmentReturnsArray: investmentReturnsArray(state),
})

export default connect(mapStateToProps, {setInvestmentFactor_action, })(PreRetirementRate)

//-----------------------------------------------style-----------------------------------------------//

const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 10rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`

const Dialogue = styled.div`   
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 60rem;
    height: 16rem;
    padding-top: 1rem;
    color: ${props => props.theme.color.slate}
    & span {
        padding: 1rem;
        font-size: 1.4rem;
        font-style: italic;
        text-align: left;
    }
`