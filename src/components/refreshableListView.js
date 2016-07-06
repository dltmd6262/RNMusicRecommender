'use strict';

import Promise from 'bluebird';
import React, {Component} from 'react';
import ReactNative from 'react-native';

let {
  ListView,
  RefreshControl,
} = ReactNative;

class RefreshableListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    Promise.promisify(this.props.onRefresh)()
      .timeout(1000)
      .catch(Promise.TimeoutError, e => console.log('Timeout error in fetching newsfeed data'))
      .finally(() => {
        this.setState({refreshing: false});
      });
  }

  render() {
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
        renderRow={this.props.renderRow}
        style={{width: 400}}
      />
    )
  }
}

export default RefreshableListView;
