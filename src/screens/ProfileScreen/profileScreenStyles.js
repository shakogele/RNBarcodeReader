import { StyleSheet, Dimensions } from 'react-native'
import { scale, moderateScale, verticalScale} from '../../utility/scaling';

const styles = StyleSheet.create({

  background: {
    flex: 1
  },
  mainContainer: { flex: 1, justifyContent: 'space-between' },
  barcodeItem: {
    padding: scale(10),
    backgroundColor: '#ccc',
    color: "white",
    margin: scale(2),
    fontWeight: "bold",
    fontSize: scale(18),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "red"
  },
  centerBlock: {
    fontSize: scale(16),
    textAlign: "center",
    color: "teal"
  },
  block: {
    flex: 1,
  },
  scrollView: {
    minHeight: scale(100),
    backgroundColor: "#eee",
    width: "80%",
    marginLeft: "10%"
  },
  blockHeader:{
    fontSize: scale(16),
    color: "teal",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: scale(20)
  },
  buttonContainer: {
    padding: scale(12)
  },
  mainButton: {
    backgroundColor: "teal",
    padding: scale(10),
    width: "80%",
    marginLeft: "10%",
    marginVertical: scale(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red'
  },
  mainButtonText: {
    fontSize: scale(18),
    color: "white",
    textAlign: "center"
  },
})

export default styles;
