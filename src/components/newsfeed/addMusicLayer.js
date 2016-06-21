import React, {Component} from 'react';
import ReactNative from 'react-native';
import Shapes from '../../shapes/cssShapes';
import AddMusicForm from './addMusicForm';

var {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
} = ReactNative;

class AddMusicLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingLayer: false,
      bottom: 10,
      right: 10,
      width: 60,
      height: 60,
      borderRadius: 30,
    };
  }

  showAddMusicForm(show) {
    if (this.state.isShowingLayer === !!show) {
      return true;
    }

    let dim = Dimensions.get('window');

    let newBottom = this.state.isShowingLayer ? 10 : 0;
    let newRight = this.state.isShowingLayer ? 10 : 0;
    let newHeight = this.state.isShowingLayer ? 60 : dim.height;
    let newWidth = this.state.isShowingLayer ? 60 : dim.width;
    let newBorderRadius = this.state.isShowingLayer ? 30 : null;

    LayoutAnimation.configureNext(animation.spring);
    this.setState({
      isShowingLayer: show,
      bottom: newBottom,
      right: newRight,
      height: newHeight,
      width: newWidth,
      borderRadius: newBorderRadius
    })
  }

  render() {
    let plusSign = <Text style={Shapes.plusSign}>+</Text>;
    let content = this.state.isShowingLayer ?
      <AddMusicForm
        hideForm={this.showAddMusicForm.bind(this, false)}
        addNewMusic={this.props.addNewMusic}
        addNewsfeedResult={this.props.addNewsfeedResult}
      /> : plusSign;

    return (
      <TouchableOpacity onPress={this.showAddMusicForm.bind(this, true)} activeOpacity={255} style={[Shapes.circle, {
        position: 'absolute',
        bottom: this.state.bottom,
        right: this.state.right,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
        backgroundColor: '#ee9459'}]}>
        {content}
      </TouchableOpacity>
    )
  }
}

var animation = {
  spring: {
    duration: 300,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.85,
    },
  },
}

export default AddMusicLayer
