import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import {Route} from "react-router-dom"
import Dashboard from "page/dashboard/Dashboard"
import TaxApp from "page/taxPosition/TaxApp"
import NetWorthApp from "page/netWorth/NetWorthApp"
import CreditScoreApp from "page/credit/CreditScoreApp"
import Income from "page/income/Income"
import Savings from "page/savings/Savings"
import SpendingApp from "page/expenses/SpendingApp"
import PropertyApp from "page/property/PropertyApp"
import Assumptions from "page/assumptions/Assumptions"
import Login from "page/login/Login"
import LandingPage from "page/landingPage/LandingPage"
import OnboardingProcess from "page/onboarding/OnboardingProcess"
import SignUp from "page/login/SignUp"
import {ThemeProvider} from "styled-components"
import { lightTheme} from "style/Themes"
import styled from "styled-components"
import LeftNavBar from "./navigation/LeftNavBar"
import RightVideoSelector from "./navigation/RightVideoSelector"
import WithSpinner from "HOC/withSpinner/WithSpinner"
import {connect} from "react-redux"

const DashboardWithSpinner = WithSpinner(Dashboard);
const TaxAppWithSpinner = WithSpinner(TaxApp);
// const SavingsWithSpinner = WithSpinner(Savings);
// const IncomeWithSpinner = WithSpinner(Income);

const Layout = ({auth, state}) => {
        return (
            <ThemeProvider theme={lightTheme}>
                <>
                <Header auth={auth}/>
                <LeftNavBar/>

                <GridContainer>  
                        <Route path="/Assumptions" component={Assumptions}/>
                        <Route path="/Onboarding" component={OnboardingProcess}/>
                        <Route exact path="/" render={props => (<DashboardWithSpinner isLoading={auth} {...props}/>)} />
                        <Route path="/NetWorth" component={NetWorthApp}/>
                        <Route path="/Tax" render={props => (<TaxAppWithSpinner isLoading={auth} {...props}/>)}/>
                        <Route path="/LifeTimeIncome" component={Income}/>  
                        <Route path="/SavingsPlan" component={Savings}/>              
                        <Route path="/CreditScore" component={CreditScoreApp}/>              
                        <Route path="/Spending" component={SpendingApp}/>
                        <Route path="/Property" component={PropertyApp}/>
                            <Route exact path="/landingpage" component={LandingPage}/>
                            <Route path="/Login" component={Login}/>
                            <Route path="/SignUp" component={SignUp}/>
                </GridContainer>


                        
                <RightVideoSelector/>
                <Footer/>
                </>
            </ThemeProvider>
        )

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        state: state,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Layout)
//
//------------------style---------------------------------------------------------------
 const GridContainer = styled.div`
    height: 100%;
    margin: 4px auto;
    width: 80vw;
    display: grid;
    grid-template-rows: 98vh;
    overflow: scroll;
    grid-template-areas: 

    "m"

    /* The Grid container holds the grid item "m" for "main" and "f" for footer. When a sub-app is clicked
     on its grid location becomes m placing it in the "main position" */
`


    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the switch board of the app. The header and footer are rendred and always present. Then the 
    // center panel can be changed using routing to move through and visit various sub apps such as the net worth
    // calculator. 