import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Dimensions, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import CornerLabel from 'react-native-smart-corner-label'

const pastelColors = [
  '#EF5350',
  '#EC407A',
  '#CE93D8',
  '#F48FB1',
  '#64B5F6',
  '#4DB6AC',
  '#66BB6A',
  '#FFD54F',
  '#BCAAA4',
  '#B0BEC5'
]


// TODO: handle box dimensions using flexbox algorithm
const boxStyle = (box) => ({
  backgroundColor: box.quota > 0 ? 'transparent' : pastelColors[box.id],
  width: Dimensions.get('window').width / 3 - 2,
  height: Dimensions.get('window').width / 3 - 2,
  justifyContent: 'center',
  alignItems: 'center'
})

export default class Box extends Component {

  _handlePress () {
    this.props.onPressAction(this.props.box)
  }

  _renderText () {
    if (this.props.box.quota > 0) {
      return <Text><Icon name='lock-outline' iconStyle={{marginTop: 10}} size={30} color='black' />{`\n${this.props.box.quota}`}</Text>
    } else {
      return this.props.box.text.toUpperCase()
    }
  }

  _renderTabLabel () {
    if (this.props.box.recently_unlocked) {
      return (
        <CornerLabel
                  alignment='right'
                  cornerRadius={40}
                  style={{backgroundColor: 'white', borderRadius: 20}}
        >
          <Icon name='lock-open' iconStyle={{marginTop: 10}} size={20} color='black' />
        </CornerLabel>
      )
    }
    return
  }

  render () {
    return (
      <TouchableHighlight
        underlayColor='white'
        onPress={this._handlePress.bind(this)}
      >
        <View style={boxStyle(this.props.box)}>
          {this._renderTabLabel()}
          <Text style={styles.text}>{this._renderText()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

Box.propTypes = {
  onPressAction: React.PropTypes.func,
  box: React.PropTypes.object
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginLeft: 3,
    marginRight: 3,
    fontFamily: 'Bangers-Regular',
    color: 'black',
    fontSize: 20
  }
})
