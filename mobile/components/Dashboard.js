import React from 'react';
import moment from 'moment';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';
import helper from '../utils/helper';
import Survey from './Survey';
import Inventory from './Inventory';
import Chat from './Chat';
import Information from './Information';
import myTheme from '../themes/myTheme';

const getItem = async (item, cb) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      cb(value);
    }
  } catch (error) {
    console.log('Error submitting new move info:', error);
  }
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'MoveKick',
      moveItems: [],
      moveData: null,
      inventoryTab: false,
      surveyInfoTab: false,
      chatTab: false,
    };

    this.goToNext = this.goToNext.bind(this);
    this.toggleInventoryTab = this.toggleInventoryTab.bind(this);
    this.toggleSurveyInfoTab = this.toggleSurveyInfoTab.bind(this);
    this.toggleChatTab = this.toggleChatTab.bind(this);
  }

  componentWillMount() {
    this._getMoveItems();

    getItem('moveData', (moveData) => {
      this.moveData = JSON.parse(moveData);
      this.setState({ surveyInfoTab: true });
    });
  }


  _getMoveItems() {
    helper.getMoveItems()
    .then((response) => {
      this.setState({ moveItems: response.data.moveItems });
    })
    .catch(error => console.log('Error getting move items', error));
  }

  goToNext(type) {
    if (type === 'survey') {
      this.props.navigator.push({
        component: Survey,
      });
    } else if (type === 'info') {
      this.props.navigator.push({
        component: Information,
      });
    }
  }

  _renderContent() {
    if (this.state.surveyInfoTab) {
      return (
        <Content justifyContent="flex-start">
          <View style={styles.info}>
            <Title style={styles.title}>{this.moveData.name}</Title>
            <Text>{this.moveData.phone}</Text>
          </View>
          <View style={styles.info}>
            <Title style={styles.title}>Current Address</Title>
            <Text>{this.moveData.currentAddress}</Text>
          </View>
          <View style={styles.info}>
            <Title style={styles.title}>Future Address</Title>
            <Text>{this.moveData.futureAddress}</Text>
          </View>
          <View style={styles.appointment} justifyContent="center" alignItems="center">
            <Title style={styles.title}>Appointment Time</Title>
            <Text>{moment(this.moveData.surveyTime).calendar()}</Text>
            <View style={styles.appointButton}>
              <Button danger onPress={() => this.goToNext('survey')}>
                Begin Survey
              </Button>
            </View>
          </View>
        </Content>
      );
    } else if (this.state.inventoryTab) {
      return (
        <Content justifyContent={this.state.moveItems.length ? null : "center"}>
          <Inventory moveItems={this.state.moveItems} />
        </Content>
      );
    } else if (this.state.chatTab) {
      return (
        <Content justifyContent="flex-end">
          <Chat />
        </Content>
      );
    }

    return <Content />;
  }

  toggleInventoryTab() {
    this.setState({
      title: 'Inventory',
      inventoryTab: true,
      surveyInfoTab: false,
      chatTab: false,
    });
  }

  toggleSurveyInfoTab() {
    this.setState({
      title: 'MoveKick',
      inventoryTab: false,
      surveyInfoTab: true,
      chatTab: false,
    });
  }

  toggleChatTab() {
    this.setState({
      title: 'Chat',
      inventoryTab: false,
      surveyInfoTab: false,
      chatTab: true,
    });
  }

  render() {
    return (
      <Container>
        <Header theme={myTheme} flexDirection="row-reverse">
          <Title theme={myTheme} style={styles.main}>{this.state.title}</Title>
          {
            this.state.surveyInfoTab ?
              <Button transparent onPress={() => this.goToNext('info')}>
                <Icon style={styles.icon} name="md-settings" />
              </Button>
              :
              <Button transparent>
                <Icon style={styles.icon} name="md-cube" />
              </Button>
          }
        </Header>

        {this._renderContent()}

        <Footer theme={myTheme}>
          <FooterTab theme={myTheme}>
            <Button active={this.state.inventoryTab} onPress={this.toggleInventoryTab}>
              Inventory
              <Icon name={this.state.inventoryTab ? 'ios-list-box' : 'ios-list-box-outline'} />
            </Button>
            <Button  active={this.state.surveyInfoTab} onPress={this.toggleSurveyInfoTab}>
              Survey
              <Icon name={this.state.surveyInfoTab ? 'ios-camera' : 'ios-camera-outline'} />
            </Button>
            <Button active={this.state.chatTab} onPress={this.toggleChatTab}>
              Chat
              <Icon name={this.state.chatTab ? 'ios-chatboxes' : 'ios-chatboxes-outline'} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  info: {
    alignItems: 'flex-start',
    paddingBottom: 40,
    paddingLeft: 5,
    top: 20,
  },
  icon: {
    color: '#FF5252',
  },
  appointment: {
    top: 90,
  },
  appointButton: {
    top: 20,
  }
});
