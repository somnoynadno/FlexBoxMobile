import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Draggable from 'react-native-draggable';
import {api} from '../http/API';
import GameField from '../components/GameField';
import {FIELD_NUM, FIELD_SIZE} from '../globals';
import {commonStyles} from '../styles';

const SLEEP_TIME = 2500;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class GameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
            constraintX: 0,
            constraintY: 0,
            blockX: FIELD_SIZE * FIELD_NUM / 2 - 50,
            blockY: FIELD_SIZE * FIELD_NUM + 20,
            message: ''
        }
    }

    componentDidMount = async () => {
        let game = await this.waitForTurn();
        this.setState({game: game});
    }

    waitForTurn = async () => {
        while (true) {
            let res = await api.CheckGameTurn();
            this.setState({message: res["message"]});
            if (res["message"] === "your turn") {
                return await api.GetGameStatus();
            } else if (res["message"] === "not your turn" || res["message"] === "game pending") {
                await sleep(SLEEP_TIME);
            } else {
                // win, lose, timeout or something
                break;
            }
        }
        this.props.navigation.replace('Result');
    };

    makeMove = async (move) => {
        await api.MakeMove(move);
        let game = await api.GetGameStatus();
        this.setState({game: game});
    }

    dispatchBlock = async (bounds) => {
        let move = this.calculatePosition(bounds.left, bounds.top);
        console.log("Move: ", move);
        await this.makeMove(move);
        this.hideBlock();
        let game = await this.waitForTurn();
        this.setState({game: game});
        this.resetBlock();
    }

    calculatePosition = (pageX, pageY) => {
        let x = pageX - this.state.constraintX;
        let y = pageY - this.state.constraintY;
        let x1 = x / FIELD_SIZE;
        let y1 = y / FIELD_SIZE;
        let x2 = x1 + this.state.game.dices[0] - 1;
        let y2 = y1 + this.state.game.dices[1] - 1;

        return([
            [Math.round(x1), Math.round(y1)],
            [Math.round(x2), Math.round(y2)]]
        );
    }

    resetBlock = () => {
        this.setState({
            blockX: this.state.constraintX + FIELD_SIZE * FIELD_NUM / 2 - 50,
            blockY: this.state.constraintY + FIELD_SIZE * FIELD_NUM + 20,
        });
    }

    rotateBlock = () => {
        let d = this.state.game.dices;

        let tmp = d[0];
        d[0] = d[1];
        d[1] = tmp;

        let game = this.state.game;
        game.dices = d;

        this.setState({
            game: game
        })
    }

    hideBlock = () => {
        this.setState({
            blockX: null,
            blockY: null,
        });
    }

    concede = async () => {
        await api.ConcedeGame();
        this.props.navigation.replace('Result');
    }

    render() {
        if (!this.state.game) return <View>
            <Text>Waiting for your opponent....</Text>
        </View>
        else return (
            <View style={{height: "100%", width: "100%"}}>
                <View style={styles.gameFieldContainer}>
                    <View
                        style={{maxWidth: FIELD_SIZE * FIELD_NUM, maxHeight: FIELD_NUM * FIELD_SIZE}}
                        ref={(ref) => { this.marker = ref }}
                        onLayout={() => {
                            if (this.marker) {
                                this.marker.measure((x, y, width, height, pageX, pageY) => {
                                    this.setState({
                                        constraintX: pageX, constraintY: pageY,
                                        blockX: pageX + this.state.blockX,
                                        blockY: pageY + this.state.blockY,
                                    });
                                })
                            }
                        }}>
                        <GameField map={this.state.game.map} />
                    </View>
                    {this.state.blockX !== null && this.state.blockY !== null ?
                        <Draggable
                            renderColor={api.userID === this.state.game.player1 ? "orange" : "blue"}
                            minX={this.state.constraintX}
                            minY={this.state.constraintY}
                            maxX={this.state.constraintX + FIELD_SIZE*FIELD_NUM}
                            x={this.state.blockX}
                            y={this.state.blockY}
                            onDragRelease={async (e,gs, bounds) => {
                                await this.dispatchBlock(bounds);
                            }}
                            children={<View style={{
                                height: this.state.game.dices[1] * FIELD_SIZE,
                                width: this.state.game.dices[0] * FIELD_SIZE,
                            }} />}
                        />
                        : <View />
                    }
                    <Text>{this.state.message}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={commonStyles.blueButton}
                            onPress={() => this.rotateBlock()}
                        >
                            <Text style={commonStyles.buttonText}>Rotate block</Text>
                        </TouchableOpacity>
                        <View style={commonStyles.divider} />
                        <TouchableOpacity
                            style={commonStyles.redButton}
                            onPress={() => this.concede()}
                        >
                            <Text style={commonStyles.buttonText}>Concede</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameFieldContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: "auto",
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: "column",
        marginTop: "32%",
    }
});


export default GameScreen;
