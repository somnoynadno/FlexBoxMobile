import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../styles';

class RegisterOrLoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={commonStyles.container}>
                <View>
                    <TouchableOpacity
                        style={commonStyles.orangeButton}
                        onPress={() => this.props.navigation.replace('Register')}
                    >
                        <Text style={commonStyles.buttonText}>Registration</Text>
                    </TouchableOpacity>
                    <View style={commonStyles.divider} />
                    <View style={commonStyles.divider} />
                    <TouchableOpacity
                        style={commonStyles.blueButton}
                        onPress={() => this.props.navigation.replace('Login')}
                    >
                        <Text style={commonStyles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default RegisterOrLoginScreen;
