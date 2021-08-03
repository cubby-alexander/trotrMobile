import { theme } from 'galio-framework';
import { Dimensions, Platform } from 'react-native';
import { HeaderHeight } from '../../constants/utils';
import { nowTheme } from '../../constants';

const { height, width } = Dimensions.get('screen');

export const onboardingStyles = {
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  registerContainer: {
    marginTop: height * 0.05,
    width: width * 0.87,
    height: height < 812 ? height * 0.5 : height * 0.55,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 8
  },
  logo: { width: 365, height: 124, bottom: 10, left: 0, right: 0, position: 'absolute' },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 30
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
}
