import { theme } from 'galio-framework';
import nowTheme from '../../constants/Theme';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get("screen");

export const setupStyles = {
  container: {
    backgroundColor: theme.COLORS.WHITE
  },
  padded: {
    top: 270,
      paddingHorizontal: theme.SIZES.BASE * 2,
      position: 'absolute',
      bottom: theme.SIZES.BASE,
      zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
      height: theme.SIZES.BASE * 3,
      shadowRadius: 0,
      shadowOpacity: 0
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20
  },
  pro: {
    backgroundColor: nowTheme.COLORS.BLACK,
      paddingHorizontal: 8,
      marginLeft: 3,
      borderRadius: 4,
      height: 22,
      marginTop: 0
  },
  font: {
    fontFamily: 'proxima-nova'
  }
}
