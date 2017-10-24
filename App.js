import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state ={ loggedIn: null }
  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCs7EyTcD46_Z7le_y8mxxPZER9kFfDwXQ',
        authDomain: 'auth-a6163.firebaseapp.com',
        databaseURL: 'https://auth-a6163.firebaseio.com',
        projectId: 'auth-a6163',
        storageBucket: 'auth-a6163.appspot.com',
        messagingSenderId: '948315515488'
      
    });
    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
        this.setState({ loggedIn: true });
       } else {
        this.setState({ loggedIn: false });
       }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>;
      case false:
      return <LoginForm />;
      default :
      return <Spinner size={'large'} />;
    }
  }
  render() {
    return (
      <View >
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

