import React, { Component } from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native'
import Box from './components/Box'

import Sound from 'react-native-sound'
import _ from 'lodash'

import Separator from './components/Separator'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const playSound = (soundName) => {
    const sound = new Sound(soundName, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e)
      } else {
        sound.play()
        console.log(`Sound '${soundName}' played`)
      }
    })
}

export default class App extends Component {

	constructor (props) {
    super(props)
    this.state = {
    	boxes: [],
      clicks: 0
    }
  }

  componentDidMount () {
    const data = require('./mock.json')
    this.setState({ boxes: data })
  }


  _updateQuota () {
    const updatedBoxes = _.forEach(this.state.boxes, (obj) => {
      if (obj.quota > 0) obj.quota = obj.quota - 1
    })
    this.setState({boxes: updatedBoxes})
  }


  onBoxPress (box) {
    console.log(box.text)
    this._updateQuota(box.id)
    playSound(box.sound)
  	this.setState({clicks: this.state.clicks + 1})
  }

  render () {
  	return (
  		<View>
    		<View style={styles.container}>
    			<ListView
  					contentContainerStyle={styles.list}
            dataSource={ds.cloneWithRows(this.state.boxes)}
            enableEmptySections
            renderRow={(box) => (
            	<Box
                box={box}
                onPressAction={this.onBoxPress.bind(this)}
              />
            )}
            renderSeparator={(sectionId, rowId) => <Separator key={rowId} />}
          />
    		</View>
    		<Text>{`Clicks: ${this.state.clicks}`}</Text>
  		</View>
  	)
  }
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20
	},
  list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between'

  }
})
