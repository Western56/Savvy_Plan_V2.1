import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {setIncome_action, setKeyVariable_action, removeItem_action, calculateCpp_action, setPensionStartAge_action, setRetirementIncome_action} from "./actions"
import {setMaxContribution_action} from "../SavingsPlan/actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import LifetimeIncomeBarChart from "./Charts/LifetimeIncomeBarChart"
import {payment}from "../..//services/financialFunctions"
import { setMaxContributions, determineMaxRegisteredPayments} from "./services/localFunctions" 
import {stackedChartData,  retirementPensionIncome} from "./reducers/lifetimIncome_selectors"
import {rate1 , rate2} from "../SavingsPlan/reducers/savingsPlan_selectors"
import {renderCPPandOASIncome, adjustOas} from  "./services/CPPfunctions"
import {calculateOptimumIncomeStreams, addRetirementIncome} from  "./services/RRSPandTFSAfunctions"

const LifetimeIncomeAppRefactor = ({setIncome_action, calculateCpp_action, setPensionStartAge_action,                                    // destructure out variables
    incomePerYear_reducer, removeItem_action, pensionStartAges_reducer, setRetirementIncome_action,  stackedChartData,
    setMaxContribution_action, keyVariables_reducer, savingsPerYear_reducer, rate1, rate2, retirementPensionIncome,
    pensionStartAges_reducer: {cppStartAge: {rangeBarValue: cppStartAge}},
    pensionStartAges_reducer: {oasStartAge: {rangeBarValue: oasStartAge }}}) => {

        const [fromAge, setFromAge] = useState(18)
        const [toAge, setToAge] = useState(65)    

        const {pensionStartAges_reducer: {rrifStartAge: {rangeBarValue: rrifStartAge}}} = {pensionStartAges_reducer}
        const {pensionStartAges_reducer: {tfsaStartAge: {rangeBarValue: tfsaStartAge}}} = {pensionStartAges_reducer}
        const {retirementIncome: {financialValue: retirementIncome}} = keyVariables_reducer
   
        const {maxTfsaPayment, maxRrspPayment, highestIncomes, } = determineMaxRegisteredPayments(incomePerYear_reducer, rrifStartAge, savingsPerYear_reducer, tfsaStartAge, rate1, rate2) 

        const incomeStreams = calculateOptimumIncomeStreams((retirementPensionIncome + maxRrspPayment.toString()), highestIncomes, maxRrspPayment, maxTfsaPayment, retirementPensionIncome, retirementIncome)



//INCOME INPUT
    const setIncome = (financialValue, rangeBarValue, {contributeToCpp, label, name}) => {                                                 //used by rangebars to set income in incomeByYear reducer
    const cacheKey = financialValue + name +  (fromAge.toString()) + (toAge.toString())                                                   //creates a unique cacheKey which will be used to check if the function has been run before and return the last answer if it was - memoization
        for (let age = fromAge; age < toAge; age++ ) {                                                           
            setIncome_action(age, contributeToCpp, financialValue, label, name, rangeBarValue)                                            //sets the income for each of the years between the selected ranges
        }    
            contributeToCpp && renderCPPandOASIncome(cacheKey, calculateCpp_action, cppStartAge, oasStartAge, setIncome_action)    
                                                                                                                            //only recalculates CPP if contributions to CPP are made on the income                                                        
    }


    const addItemToList = (financialValue, rangeBarValue, {isChecked, label, name}) => {
        let contributeToCpp = isChecked
        for(let age = 18; age < 95; age++) {
        setIncome_action(age, isChecked, 0, label, name, 0)
        }
        setIncome (financialValue, rangeBarValue, {contributeToCpp, label, name})
    }

//CHANGE INCOME LABEL
    const handleChangeLabel = (e,  {financialValue, rangeBarValue, contributeToCpp, label, name}) => {                                   // eg. the user changes label from "Employment income" to "Wal mart Income"
    for (let age = fromAge; age < toAge; age++ ) {
        setIncome_action(age, contributeToCpp, financialValue, e.target.value, name, rangeBarValue) 
    }
    }

//PENSION INCOME CALCULATION
    const setPensionIncome = (x, value, {name})  => {   
        setPensionStartAge_action(name, value)                                                                                           //Takes value from rangeBar and sets it into the pension start age reducer 
        const cacheKey = value+name
        if  (name === "cppStartAge") {                                                                                                   //Checks name of value being changed and sets it into the lifetimeIncomeYearList 
            for (let age = value; age <=95; age ++) {                                                                                    //Runs from the age selected in the rangeBar to age 95 and inserts the income into the reducer
                calculateCpp_action(age, value, cacheKey)
            }
            for (let age = 59; age < value; age++) {
                setIncome_action(age, false, 0, "CPP Income", "cppIncome")  
            }}
        else if  (name === "oasStartAge") {
            const oasPayment = adjustOas(value, value, 7300)
            for (let age = value; age <=95; age ++) {                                                                                     //Runs from the age selected in the rangeBar to age 95 and inserts the income into the reducer
                setIncome_action(age, false, oasPayment, "OAS Income", "oasIncome") 
            }
            for (let age = 64; age < value; age++) {
                setIncome_action(age, false, 0, "OAS Income", "oasIncome")  
            }}
        else if (name === "tfsaStartAge") {
            setKeyVariable_action(name, value)
            setMaxContributions(birthYear, incomePerYear_reducer, rrifStartAge, setMaxContribution_action, value) 
            addRetirementIncome((incomeStreams.tfsa + incomeStreams.rrsp.toString() + value), incomeStreams, rrifStartAge, value, setIncome_action)
        }
        else if (name === "rrifStartAge") {
            setKeyVariable_action(name, value)
            setMaxContributions(birthYear, incomePerYear_reducer, rrifStartAge, setMaxContribution_action, value) 
            addRetirementIncome((incomeStreams.tfsa + incomeStreams.rrsp.toString() + value), incomeStreams, value, tfsaStartAge, setIncome_action)
        }

       }

//REMOVE INCOME TYPE
const handleRemoveItem = ({name}) => {          
    console.log(name);                                                                                            //used to remove income types from reducer
    for (let age = 18; age < 95; age++ ) {
      removeItem_action(age, name)
    }
}

const {birthYear} = keyVariables_reducer



//SET TOTAL RETIREMENT PENSION INCOME IN KEY VARIABLES REDUCER



const setReccomendedRetirementIncome = (financialValue, rangeBarValue) => {

    setRetirementIncome_action(financialValue, rangeBarValue)
    setMaxContributions(birthYear, incomePerYear_reducer, rrifStartAge, setMaxContribution_action, tfsaStartAge) 
    addRetirementIncome((incomeStreams.tfsa + incomeStreams.rrsp.toString()), incomeStreams, rrifStartAge, tfsaStartAge, setIncome_action)
} 
        return (
            <UserInterfaceWrapper>
                <Header
                     incomePerYear_reducer={incomePerYear_reducer}
                />
                <ChartPlaceHolder>
                <LifetimeIncomeBarChart/>
                </ChartPlaceHolder>    
            <ControlPanel
                    handleChangeLabel = {handleChangeLabel}
                    handleRemoveItem={handleRemoveItem}
                    addItemToList={addItemToList}
                    setFromAge={setFromAge}
                    setToAge={setToAge}
                    fromAge={fromAge}
                    toAge={toAge}
                    savingsPerYear_reducer={savingsPerYear_reducer}
                    setIncome_action={setIncome_action}
                    setIncome={setIncome}
                    setPensionIncome={setPensionIncome}
                    pensionStartAges_reducer={pensionStartAges_reducer}
                    incomePerYear_reducer={incomePerYear_reducer}
                    setRetirementIncome_action={setRetirementIncome_action}
                    keyVariables_reducer={keyVariables_reducer}
                    setMaxContribution_action={setMaxContribution_action}
                    data={stackedChartData}
                    setKeyVariable_action={setKeyVariable_action}
                    setReccomendedRetirementIncome={setReccomendedRetirementIncome}
            />

            </UserInterfaceWrapper>
        )
}

const mapStateToProps = (state) => {
    return {
        incomePerYear_reducer: state.incomePerYear_reducer,
        keyVariables_reducer: state.keyVariables_reducer,
        pensionStartAges_reducer: state.pensionStartAges_reducer,
        savingsPerYear_reducer: state.savingsPerYear_reducer,
        stackedChartData: stackedChartData(state),
        rate1: rate1(state),
        rate2: rate2(state),
        retirementPensionIncome: retirementPensionIncome(state),
    }
}

export default connect(mapStateToProps, {setIncome_action,  setKeyVariable_action, setMaxContribution_action, calculateCpp_action, setPensionStartAge_action,  removeItem_action, setRetirementIncome_action})(LifetimeIncomeAppRefactor)


//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.ice};
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: minmax(8rem, 14rem) minmax(18rem, 22rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'c c c c c c c c c c c c'
    'd d d d d d d d d d d d'
`
const ChartPlaceHolder = styled.div`
    grid-area: c;
    width: 90%;
    margin-left: 5%;
    height: 100%;

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/