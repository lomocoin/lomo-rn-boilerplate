import { StyleSheet } from 'react-native';
import { VType } from './base';

export default (V: VType) =>
  StyleSheet.create({
    // page
    pgWidth: {
      width: V.pgWidth,
    },
    pgHeight: {
      height: V.pgHeight,
    },
    // background colors
    bgDefault: {
      backgroundColor: V.defaultBgColor,
    },
    bgPrimary: {
      backgroundColor: V.primaryColor,
    },
    bgSecondary: {
      backgroundColor: V.secondaryBgColor,
    },
    bgWarn: {
      backgroundColor: V.warningColor,
    },
    bgWhite: {
      backgroundColor: V.whiteColor,
    },
    bgTransparent: {
      backgroundColor: 'transparent',
    },
    // text colors
    colorPrimary: {
      color: V.primaryColor,
    },
    colorSecondary: {
      color: V.secondaryColor,
    },
    colorWarn: {
      color: V.warningColor,
    },
    colorSucces: {
      color: V.successColor,
    },
    colorWhite: {
      color: V.whiteColor,
    },
    // text alignments
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textCenter: {
      textAlign: 'center',
    },
    textUnderline: {
      textDecorationLine: 'underline',
    },
    // text element styles
    textDefault: {
      color: V.defaultColor,
      fontSize: V.defaultFontSize,
    },
    textDefaultLight: {
      color: V.secondaryColor,
      fontSize: V.defaultFontSize,
    },
    textDefaultBold: {
      color: V.defaultColor,
      fontSize: V.defaultFontSize,
      fontWeight: 'bold',
    },
    textTitle: {
      color: V.defaultColor,
      fontSize: V.titleFontSize,
      fontWeight: 'bold',
    },
    textSecondary: {
      color: V.secondaryColor,
      fontSize: V.secondaryFontSize,
    },
    // image
    resizeStretch: {
      resizeMode: 'stretch',
    },
    resizeCover: {
      resizeMode: 'cover',
    },
    resizeContain: {
      resizeMode: 'contain',
    },
    resizeRepeat: {
      resizeMode: 'repeat',
    },
    resizeCenter: {
      resizeMode: 'center',
    },
    // borders
    borderNone: {
      borderWidth: 0,
    },
    border: {
      borderColor: V.borderColor,
      borderWidth: V.borderWidth,
    },
    borderLeft: {
      borderLeftColor: V.borderColor,
      borderLeftWidth: V.borderWidth,
    },
    borderTop: {
      borderTopColor: V.borderColor,
      borderTopWidth: V.borderWidth,
    },
    borderRight: {
      borderRightColor: V.borderColor,
      borderRightWidth: V.borderWidth,
    },
    borderBottom: {
      borderBottomColor: V.borderColor,
      borderBottomWidth: V.borderWidth,
    },
    borderRadius0: {
      borderRadius: 0,
    },
    borderRadius5: {
      borderRadius: V.borderRadius5,
    },
    // positions
    positionAbsolute: {
      position: 'absolute',
    },
    positionRelative: {
      position: 'relative',
    },
    // overflow
    overflowVisible: {
      overflow: 'visible',
    },
    overflowHidden: {
      overflow: 'hidden',
    },
    // flex
    flex: {
      flex: 1,
    },
    flexZero: {
      flex: 0,
    },
    flexRow: {
      flexDirection: 'row',
    },
    flexColumn: {
      flexDirection: 'column',
    },
    flexRowReverse: {
      flexDirection: 'row-reverse',
    },
    flexColumnReverse: {
      flexDirection: 'column-reverse',
    },
    flexWrap: {
      flexWrap: 'wrap',
    },
    flexNoWrap: {
      flexWrap: 'nowrap',
    },
    flexJustifyStart: {
      justifyContent: 'flex-start',
    },
    flexJustifyEnd: {
      justifyContent: 'flex-end',
    },
    flexJustifyCenter: {
      justifyContent: 'center',
    },
    flexJustifyBetween: {
      justifyContent: 'space-between',
    },
    flexJustifyAround: {
      justifyContent: 'space-around',
    },
    flexAlignStart: {
      alignItems: 'flex-start',
    },
    flexAlignCenter: {
      alignItems: 'center',
    },
    flexAlignEnd: {
      alignItems: 'flex-end',
    },
    flexAlignStretch: {
      alignItems: 'stretch',
    },
    flexAlignSelfAuto: {
      alignSelf: 'auto',
    },
    flexAlignSelfStart: {
      alignSelf: 'flex-start',
    },
    flexAlignSelfEnd: {
      alignSelf: 'flex-end',
    },
    flexAlignSelfCenter: {
      alignSelf: 'center',
    },
    flexAlignSelfStretch: {
      alignSelf: 'stretch',
    },
    // padding and margin
    padding: {
      padding: V.paddingBase,
    },
    padding0: {
      padding: V.gap0,
    },
    padding5: {
      padding: V.gap5,
    },
    padding10: {
      padding: V.gap10,
    },

    paddingLeft0: {
      paddingLeft: V.gap0,
    },
    paddingLeft5: {
      paddingLeft: V.gap5,
    },
    paddingLeft10: {
      paddingLeft: V.gap10,
    },

    paddingRight0: {
      paddingRight: V.gap0,
    },
    paddingRight5: {
      paddingRight: V.gap5,
    },
    paddingRight10: {
      paddingRight: V.gap10,
    },

    paddingTop0: {
      paddingTop: V.gap0,
    },
    paddingTop5: {
      paddingTop: V.gap5,
    },
    paddingTop10: {
      paddingTop: V.gap10,
    },

    paddingBottom0: {
      paddingBottom: V.gap0,
    },
    paddingBottom5: {
      paddingBottom: V.gap5,
    },
    paddingBottom10: {
      paddingBottom: V.gap10,
    },

    paddingVertical: {
      paddingVertical: V.paddingBase,
    },
    paddingVertical0: {
      paddingVertical: V.gap0,
    },
    paddingVertical5: {
      paddingVertical: V.gap5,
    },
    paddingVertical10: {
      paddingVertical: V.gap10,
    },

    paddingHorizontal: {
      paddingHorizontal: V.paddingBase,
    },
    paddingHorizontal0: {
      paddingHorizontal: V.gap0,
    },
    paddingHorizontal5: {
      paddingHorizontal: V.gap5,
    },
    paddingHorizontal10: {
      paddingHorizontal: V.gap10,
    },

    margin: {
      margin: V.paddingBase,
    },
    margin0: {
      margin: V.gap0,
    },
    margin5: {
      margin: V.gap5,
    },
    margin10: {
      margin: V.gap10,
    },

    marginLeft0: {
      marginLeft: V.gap0,
    },
    marginLeft5: {
      marginLeft: V.gap5,
    },
    marginLeft10: {
      marginLeft: V.gap10,
    },

    marginRight0: {
      marginRight: V.gap0,
    },
    marginRight5: {
      marginRight: V.gap5,
    },
    marginRight10: {
      marginRight: V.gap10,
    },

    marginTop: {
      marginTop: V.paddingBase,
    },
    marginTop0: {
      marginTop: V.gap0,
    },
    marginTop5: {
      marginTop: V.gap5,
    },
    marginTop10: {
      marginTop: V.gap10,
    },

    marginBottom: {
      marginBottom: V.paddingBase,
    },
    marginBottom0: {
      marginBottom: V.gap0,
    },
    marginBottom5: {
      marginBottom: V.gap5,
    },
    marginBottom10: {
      marginBottom: V.gap10,
    },

    marginVertical: {
      marginVertical: V.paddingBase,
    },
    marginVertical0: {
      marginVertical: V.gap0,
    },
    marginVertical5: {
      marginVertical: V.gap5,
    },
    marginVertical10: {
      marginVertical: V.gap10,
    },

    marginHorizontal: {
      marginHorizontal: V.paddingBase,
    },
    marginHorizontal0: {
      marginHorizontal: V.gap0,
    },
    marginHorizontal5: {
      marginHorizontal: V.gap5,
    },
    marginHorizontal10: {
      marginHorizontal: V.gap10,
    },
  });
