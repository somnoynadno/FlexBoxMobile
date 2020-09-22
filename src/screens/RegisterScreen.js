import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {commonStyles} from '../styles';

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleRegistration = async () => {
        await api.RegisterUser(this.state.username, this.state.password)
            .then(() => this.props.navigation.replace('Login'))
            .catch(error => this.setState({error: error.toString()}));
    };

    render() {
        return (
            <View style={commonStyles.container}>
                <View>
                    <Text style={commonStyles.screenTitle}>Registration</Text>
                    <TextInput
                        style={commonStyles.textInput}
                        placeholder="username"
                        onChangeText={(text) => this.setState({username: text})}
                        defaultValue={this.state.username}
                    />
                    <TextInput
                        style={commonStyles.textInput}
                        secureTextEntry={true}
                        placeholder="password"
                        onChangeText={(text) => this.setState({password: text})}
                        defaultValue={this.state.password}
                    />
                    <Text style={commonStyles.errorDisplay}>{this.state.error}</Text>
                    <View style={commonStyles.divider} />
                    <TouchableOpacity
                        style={commonStyles.orangeButton}
                        onPress={() => this.handleRegistration()}
                    >
                        <Text style={commonStyles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default RegisterScreen;
