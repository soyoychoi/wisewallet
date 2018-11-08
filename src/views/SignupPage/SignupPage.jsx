import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import InsertChart from "@material-ui/icons/InsertChart";
import ListIcon from "@material-ui/icons/List";
import Loyalty from "@material-ui/icons/Loyalty";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/bg8.jpg";

class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  onSignUp() {
    const {email, password, firstName, lastName} = this.state;
    fetch("https://tldpv6umn7.execute-api.us-east-1.amazonaws.com/default/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, lastName: lastName, password: password, firstName: firstName})
    }).then(response => response.json()).then(json => {
      console.log('json', json);
      if (json.success) {
        console.log("success " + json.userID);
        sessionStorage.setItem('userID', json.userID);
      }
    }).then(this.props.history.push('/link'));
  }
  render() {
    const {
      classes,
      ...rest
    } = this.props;
    return (<div>
      <Header absolute="absolute" color="transparent" brand="WiseWallet" links={<HeaderLinks dropdownHoverColor = "rose" />} {...rest}/>
      <div className={classes.pageHeader} style={{
          backgroundColor: "#FFFFFF",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Register</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea className={classes.infoArea} title="Personal Impact Score" description="Get personal scores based on your impact on people, the planet, and policy through your transactions." icon={InsertChart} iconColor="primary"/>
                      <InfoArea className={classes.infoArea} title="Suggested Alternatives" description="WiseWallet curates recommendations to guide you towards more sustainable and ethical purchases within your budget." icon={ListIcon} iconColor="primary"/>
                      <InfoArea className={classes.infoArea} title="Rewards" description="Benefit from discounts and giveaways through our responsible business partners for exemplary performance. It’s a win-win!" icon={Loyalty} iconColor="info"/>
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <form className={classes.form}>
                        <TextField id="firstName" label="First Name" className={classes.textField} value={this.state.firstName} onChange={this.handleChange("firstName")} margin="normal"/>
                        <TextField id="lastName" label="Last Name" className={classes.textField} value={this.state.lastName} onChange={this.handleChange("lastName")} margin="normal"/>
                        <TextField id="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange("email")} margin="normal"/>
                        <TextField id="password" label="Password" className={classes.textField} type="password" value={this.state.password} onChange={this.handleChange("password")} autoComplete="current-password" margin="normal"/>
                        <Button color="primary" onClick={this.onSignUp}>
                          Get started
                        </Button>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer content={<div > {
            " "
          }
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="https://medium.com/@wisewallet" className={classes.block}>
                  Blog
                </a>
              </ListItem>
            </List>
          </div>
          <div className={classes.right}>
            WiseWallet, Inc. &copy; 2018 All Rights Reserved.
          </div>
        </div>
}/>
      </div>
    </div>);
  }
}

export default withStyles(signupPageStyle)(Components);
