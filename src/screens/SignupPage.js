import React, { useState } from 'react';
import { ConfigData } from '../data/config';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';

//New Line
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

const config = ConfigData();
const url = `${config.backend.ipAddress}:${config.backend.port}/api/auth/register`

const SignupPage = ({ navigation }) => {
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  //New Line Google sign-in effect
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1049159207399-bj8596r36juqjrnssd8k2bspsng7dfpr.apps.googleusercontent.com', // the one under "OAuth 2.0 Client IDs" in Firebase
    });
  }, []);


  const handleEmailSignup = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, password, email }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful sign-up
        console.log('✅ Sign-up successful', data);
        Alert.alert('✅ Sign Up', "Success"
                  [{text: 'Ok', onPress: () => navigation.navigate("Signin")}]);
      } else {
        // Handle sign-up error
        Alert.alert('❌ Sign Up', ` ${data.message}`,[{text: 'Ok'}]);
        console.log('Sign-up failed', data.message);
      }
    } catch (error) {
      Alert.alert('❌ Sign Up', ` ${error}`,[{text: 'Ok'}]);
      console.error('Error signing up:', error);
    }
  };

   //New Line Google Signup
  const handleGoogleSignup = async () => {
    try {
      // Initiate Google Sign-in
      const userInfo = await GoogleSignin.signIn();

      // Log user info
      console.log('Google User Info: ', userInfo);

      // Extract user details from Google Sign-in
      const { idToken, user: { name, email } } = userInfo;

      // Prepare the user details to send to your backend
      const userDetails = {
        "fullName": "Milly",
          "email": "example@deakin.edu.au",
          "password": "password123", // You can set a random password or generate one securely
      };

      // Call your backend API to register the user
      const response = await fetch('https://evat.ddns.net:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        console.log('Signup successful', data);
        Alert.alert('Signup Success', 'You have been registered successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('MapPage') },
        ]);
      } else {
        // Handle registration failure (e.g., email already exists)
        console.error('Signup failed:', data.message);
        Alert.alert('Signup Failed', data.message || 'Something went wrong.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Google Signup Error: ', error);
      Alert.alert('Signup failed', 'An error occurred during the signup process.');
    }
  }

  const handleAppleSignup = () => {
    // Implement Apple sign up logic
  };

  const toggleSubscription = () => {
    setIsSubscribed(previousState => !previousState);
  };

  const clearName = () => setName('');
  const clearEmail = () => setEmail('');
  const clearPassword = () => setPassword('');

  return (
    <View style={styles.container}>
      <Image source={require('./logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#777"
          value={fullName}
          onChangeText={setName}
        />
        {fullName !== '' && (
          <TouchableOpacity onPress={clearName} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
        />
        {email !== '' && (
          <TouchableOpacity onPress={clearEmail} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {password !== '' && (
          <TouchableOpacity onPress={clearPassword} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.subscriptionContainer}>
        <Text style={styles.subscriptionText}>
          I’d like to hear from PlugShare for research, news, and marketing
          offers.
        </Text>
        <Switch value={isSubscribed} onValueChange={toggleSubscription} />
      </View>



      {
      //Uncomment for Google Signup
      <TouchableOpacity style={styles.appleButton} onPress={handleGoogleSignup}>
        <Text style={styles.emailButtonText}>Sign Up with Google</Text>
      </TouchableOpacity>

        /*
      <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignup}>
        <Text style={styles.emailButtonText}>Sign Up with Apple</Text>
      </TouchableOpacity>
      */}

      <TouchableOpacity style={styles.appleButton} onPress={handleEmailSignup}>
        <Text style={styles.emailButtonText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.appleButton}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.emailButtonText}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>

      <View style={styles.legalContainer}>
        <TouchableOpacity
          onPress={() => {
            /* Implement Privacy Policy logic */
          }}>
          <Text style={styles.legalText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.termsButton}
          onPress={() => {
            /* Implement Terms & Conditions logic */
          }}>
          <Text style={styles.legalText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Inknut Antiqua',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: "black"
  },
  clearButton: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 0,
  },
  clearButtonText: {
    fontSize: 18,
    color: 'red',
    fontWeight: "bold"
  },
  subscriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  legalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  legalText: {
    fontSize: 14,
    color: '#2e9963',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  appleButton: {
    backgroundColor: '#2e9963',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  termsButton: {
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  emailButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },

  //New Styiling for signup google
  googleButton: {
    backgroundColor: '#db4437', // Google red color
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});



export default SignupPage;
