import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { blue } from '../helpers/colors'

const Title = ({ children, style = {} }) => (
  <Text style={[style, styles.title]}>{children}</Text>
)

const styles = StyleSheet.create({
  title: {
    color: blue,
  }
})

export default Title;