import React from 'react-native';
let {StyleSheet} = React;

export default StyleSheet.create({

  // default styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf2e8',
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#1f5080',
  },

  // Styles for cards in newsfeed
  card: {
    flex: 1,
    height: 300,
    backgroundColor: '#fcdfa9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccaa91',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowRadius: 50,
    shadowColor: '#000000',
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: '#994950'
  },
  instrument: {
    alignSelf: 'flex-end',
    fontSize: 15,
    color: '#994950'
  },
});
