import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {commonStyles} from '../styles';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleLogin = async () => {
        this.setState({error: ''});
        await api.LoginUser(this.state.username, this.state.password)
            .then(() => {
                this.props.navigation.replace('Join');
            })
            .catch(error => {
                this.setState({error: error.toString()});
        })
    };

    render() {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.screenTitle}>Login</Text>
                <TextInput
                    style={commonStyles.textInput}
                    placeholder="username"
                    onChangeText={(text) => this.setState({username: text})}
                    defaultValue={this.state.username}
                />
                <TextInput
                    style={commonStyles.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    defaultValue={this.state.password}
                />
                <Text style={commonStyles.errorDisplay}>{this.state.error}</Text>
                <View style={commonStyles.divider} />
                <TouchableOpacity
                    style={commonStyles.blueButton}
                    onPress={() => this.handleLogin()}
                >
                    <Text style={commonStyles.buttonText}>Let's go</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginScreen;
