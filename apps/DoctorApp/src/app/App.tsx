/* eslint-disable jsx-a11y/accessible-emoji */
import { InputProps, Layout, Text } from '@ui-kitten/components';
import { ApplicationProvider } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import * as eva from '@eva-design/eva';
import { customTheme } from '@nx-apps/ui-components';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { KitButton } from '@nx-apps/ui-kit-theme';
import { decrement, increment, useAppDispatch, useAppSelector } from '@nx-apps/store';



export const App = () => {
  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);
  const [activeChecked, setActiveChecked] = React.useState(true);


  const onActiveCheckedChange = (isChecked): void => {
    setActiveChecked(isChecked);
  };
  const useInputState = (initialValue = ''): InputProps => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
  };


  const value = useAppSelector((state) => state.persistedReducer.test.value);
  const dispatch = useAppDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement())
  }


  return (

    <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar barStyle="default" />
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            ref={(ref) => {
              scrollViewRef.current = ref;
            }}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.section}>

              <Text
                style={[styles.textXL, styles.appTitleText]}
                testID="heading"
                role="heading"
              >
                DoctorApp 👋
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.hero}>
                <View style={styles.heroTitle}>
                  <Svg
                    width={32}
                    height={32}
                    stroke="hsla(162, 47%, 50%, 1)"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </Svg>
                  <Text style={[styles.textLg, styles.heroTitleText]}>
                    You're up and running
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.whatsNextButton}
                  onPress={() => {
                    scrollViewRef.current?.scrollTo({
                      x: 0,
                      y: whatsNextYCoord,
                    });
                  }}
                >
                  <Text style={[styles.textMd, styles.textCenter]}>
                    What's next?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>



            <KitButton
              title="Increment"
              status="success"
              appearance="outline"
              onPress={handleIncrement}
            />
            <Text status='success' category='h1' style={{ textAlign: 'center' }} >{value}</Text>
            <KitButton
              title="Decrement"
              status="warning"
              appearance="outline"
              onPress={handleDecrement}
            />


          </ScrollView>
        </SafeAreaView>
      </Layout>
    </ApplicationProvider>

  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12,
  },

  connectToCloudButton: {
    backgroundColor: 'rgba(20, 48, 85, 1)',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    width: '50%',
  },

  connectToCloudButtonText: {
    color: '#ffffff',
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
});

export default App;
