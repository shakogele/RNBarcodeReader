import { Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';

const gotoScreen = (componentId, screen, props) => {
  Keyboard.dismiss();
  if(screen === 'back'){
    Navigation.pop(componentId);
    return true;
  };

  if(screen === 'sidebar'){
    Navigation.mergeOptions('leftSideMenu', {
        sideMenu: {
          left: {
            visible: true
          }
        }
    });
    return true;
  };

  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: {
        ...props
      }
    }
  });

  Navigation.mergeOptions('leftSideMenu', {
      sideMenu: {
        left: {
          visible: false
        }
      }
  });

}

export default gotoScreen;
