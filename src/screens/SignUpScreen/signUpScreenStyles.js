import { StyleSheet, Dimensions } from 'react-native'
import { scale, moderateScale, verticalScale} from '../../utility/scaling';

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  buttonContainer: {
    padding: scale(12)
  },
  mainContainer: {
    height: Dimensions.get('window').height - 60,
    justifyContent: "center"
  },
  welcomeText: {
    fontSize: scale(20),
    color: "teal",
    width: "70%",
    marginLeft: "15%",
    paddingVertical: scale(30)
  },
  registerButton: {
    backgroundColor: "teal",
    padding: scale(10),
    width: "100%",
    marginVertical: scale(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red'
  },
  inputsContainer: {
    width: "70%",
    marginLeft: "15%"
  },
  mainButtonText: {
    fontSize: scale(18),
    color: "white",
    textAlign: "center"
  },
  input:{
    borderWidth: scale(1),
    borderTopWidth: scale(1),
    borderColor: '#c3c5c5',
    backgroundColor: '#fffef7',
    height: scale(55),
    marginTop: scale(8),
    fontSize: scale(15),
    color: '#000',
    textAlign: 'left',
    padding: 0,
    paddingHorizontal: scale(20),
  },

})

export default styles;
