import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {commonStyles} from '../styles';

class ResultScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            game: null,
            player1: null,
            player2: null
        }
    }

    componentDidMount = async () => {
        let turn = await api.CheckGameTurn();
        this.setState({message: turn["message"]});
        let game = await api.GetGameStatus();
        this.setState({game: game});
        let player1 = await api.GetUserInfo(game.player1);
        let player2 = await api.GetUserInfo(game.player2);
        this.setState({player1: player1, player2: player2});
    }

    finish = () => {
        api.gameID = null;
        this.props.navigation.replace('Join');
    }

    render() {
        if (this.state.game === null) return <View />
        else return (
            <View style={commonStyles.container}>
                <View>
                    <Text style={commonStyles.screenTitle}>{this.state.message}</Text>
                    {this.state.player1 && this.state.player2 ?
                    <View>
                        <Text style={commonStyles.secondaryText}>
                            {this.state.player1.username + ": " + this.state.game["player1_score"]}
                        </Text>
                        <Text style={commonStyles.secondaryText}>
                            {this.state.player2.username + ": " + this.state.game["player2_score"]}
                        </Text>
                    </View> :
                    <View />
                    }
                    <View style={commonStyles.divider} />

                    <TouchableOpacity
                        style={commonStyles.orangeButton}
                        onPress={() => this.finish()}
                    >
                        <Text style={commonStyles.buttonText}>Finish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ResultScreen;
