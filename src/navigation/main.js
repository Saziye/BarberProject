import React from "react";
import { Icon } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import { BaseColor, useTheme, useFont } from "@config";


const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function Main() {
    return (
        <MainStack.Navigator
            headerMode="none"
            initialRouteName="BottomTabNavigator"
        >
            <MainStack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator} />

            {/* <MainStack.Screen name="" component={} /> */}

        </MainStack.Navigator>
    )
}

function BottomTabNavigator() {
    const { t } = useTranslation();
    // const { colors } = useTheme();
    // const font = useFont();
    // const auth = useSelector((state) => state.auth);
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            headerMode="none"
            tabBarOptions={{
                showIcon: true,
                showLabel: true,
                //activeTintColor: colors.primary,
                //inactiveTintColor: BaseColor.grayColor,
                style: { borderTopWidth: 1 },
                labelStyle: {
                    fontSize: 12,
                    // fontFamily: font,
                },
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={ }
                options={{
                    title: t("home"),
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name=""
                component={ }
                options={{
                    title: t(""),
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon

                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name=""
                component={ }
                options={{
                    title: t(""),
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon

                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name=""
                // component={login ? Profile : Walkthrough}
                options={{
                    title: t(""),
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon

                            />
                        );
                    },
                }}
            />
        </BottomTab.Navigator>
    )
}

export default Main;