import React from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';


export default class LoginForm extends React.Component {
    state= { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
           firebase.auth().createUserWithEmailAndPassword(email, password)
           .then(this.onLoginSuccess.bind(this))
           .catch(this.onLoginFail.bind(this));
           });
    }
    
    onLoginSuccess() {
            this.setState({ 
            email: '',
            password: '',
            loading: false,
            error: ''
         });
    }
    onLoginFail() {
        this.setState({ loading: false, error: 'Authentication Failed' });
    }
    renderButton() {
        if (this.state.loading) {
          return <Spinner />;
            }
          return (<Button onPress={this.onButtonPress.bind(this)}>
            Log in
        </Button>);
    }

    render() {
        return (
           <Card>
               <CardSection>
                <Input 
                label={'Email'}
                placeHolder={'user@gmail.com'}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })} 
                />
               </CardSection>
               <CardSection>
               <Input 
                secureTextEntry
                label={'Password'}
                placeHolder={'password'}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })} 
               />
               </CardSection>
               <Text style={styles.errorTextStyle}>
                   {this.state.error}
               </Text>
               <CardSection>
                  {this.renderButton()}
               </CardSection>
           </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
      color: 'red',
      alignSelf: 'center',
      fontSize: 20,
    }
  });

