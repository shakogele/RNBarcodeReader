import { StyleSheet, Dimensions } from 'react-native'
import { scale, moderateScale, verticalScale} from '../../utility/scaling';
const landmarkSize = 2;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'teal',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    padding: scale(12)
  },
  modalLayout: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalInner: {
    width: "90%",
    height: "90%",
    marginVertical: "5%",
    marginHorizontal: "5%",
    backgroundColor: "white",
    padding: scale(20)
  },
  modalTop: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalHeader: {
    fontSize: scale(18),
    textAlign: "center",
    width: "85%"
  },
  modalCloseButton: {
    padding: scale(12),
    width: "15%",
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center"
  },
  mainButton: {
    backgroundColor: "teal",
    padding: scale(10),
    width: "100%",
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
