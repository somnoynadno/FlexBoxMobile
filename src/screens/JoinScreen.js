import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {commonStyles} from '../styles';

class JoinScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount = async () => {
        let users = await api.GetTopTenUsers();
        this.setState({users: users});
    }

    startGame = async () => {
        await api.StartGame();
        this.props.navigation.replace('Game');
    };

    render() {
        return (
            <View style={commonStyles.container}>
                <View>
                    <Text style={commonStyles.screenTitle}>Top 10</Text>
                    <View style={{padding: 20, maxHeight: "70%"}}>
                    {
                        this.state.users.map((u, i) => {
                            let rate;
                            if (u["games_num"] === 0) rate = 0;
                            else rate = (u["victories_num"]/u["games_num"]*100).toFixed(1);
                            return <Text style={commonStyles.secondaryText}>
                                {`${i+1}. ${u.username}: ${u["total_score"]} (${rate}%)`}
                            </Text>
                        })
                    }
                    </View>
                    <View style={commonStyles.divider} />
                    <TouchableOpacity
                        style={commonStyles.blueButton}
                        onPress={() => this.startGame()}
                    >
                        <Text style={commonStyles.buttonText}>Start game</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default JoinScreen;
