import { StyleSheet, Dimensions } from 'react-native'
import { scale, moderateScale, verticalScale} from '../../utility/scaling';

const styles = StyleSheet.create({

  centerBlock: {
    fontSize: scale(16),
    textAlign: "center",
    color: "teal"
  },
  buttonContainer: {
    padding: scale(12)
  }
})

export default styles;
