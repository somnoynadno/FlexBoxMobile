import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FIELD_NUM, FIELD_SIZE} from '../globals';

const colorPicker = {
    '-2': '#89d0ff',
    '-1': '#ffe787',
    '0': 'white',
    '1': 'orange',
    '2': 'blue',
};

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map
        }
    }

    // update anyway
    componentWillUpdate(nextProps, nextState) {
        nextState.map = nextProps.map;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexbox}>
                    {this.state.map.map((row, i) => {
                        return <View key={i} style={styles.row}>
                            {row.map((column, i) => {
                                return <View key={i}
                                             style={styles.field}
                                             backgroundColor={colorPicker[column.toString()]}>
                                </View>;
                            })}
                        </View>;
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red', // debug
    },
    flexbox: {
        flex: 1,
        flexDirection: 'row',

        width: FIELD_SIZE * FIELD_NUM,
        height: FIELD_SIZE * FIELD_NUM,
    },
    row: {
        height: FIELD_SIZE,
    },
    field: {
        height: FIELD_SIZE,
        width: FIELD_SIZE,
    },
});

export default GameField;
