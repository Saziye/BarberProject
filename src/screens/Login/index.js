import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {
  HeaderLine,
  PrimaryButton,
  Separator,
  TextInput,
  KeyboardView,
  Text,
} from "../components";
import { AuthenticationContext } from "../context";
import { useLocalization } from "../localization";
import NavigationNames from "../navigations/NavigationNames";
import { AuthService } from "../services";
import { useTheme } from "../theme";

export const LoginScreen = () => {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const { colors } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = () => {
    if (username === "" || password === "") {
      Alert.alert(getString("required_login_inputs"));
      return;
    }
    AuthService.login(username, password)
      .then(async (user: any) => {
        await authContext.login(user);
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };

  const onClickRegister = () => {
    navigation.navigate(NavigationNames.RegisterScreen);
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <HeaderLine />
      <KeyboardView style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text
            style={[
              styles.titleText,
              {
                color: colors.primaryColor,
              },
            ]}
          >
            {getString("login_title")}
          </Text>
          <TextInput
            inputProps={{
              placeholder: getString("username"),
              value: username,
              onChangeText: setUsername,
            }}
          />
          <Separator height={16} />
          <TextInput
            inputProps={{
              placeholder: getString("password"),
              secureTextEntry: true,
              textContentType: "none",
              autoCorrect: false,
              value: password,
              onChangeText: setPassword,
            }}
          />
          <Separator height={32} />
          <PrimaryButton
            title={getString("login_upper")}
            onPress={onClickLogin}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onClickRegister}
          >
            <Text style={{ color: colors.gray }}>
              {getString("register_upper")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 42,
    fontFamily: "default-light",
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});
