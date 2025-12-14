import React from 'react'
import { View, StyleSheet } from 'react-native'

interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: object
}

export default function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 6,
  style = {},
}: SkeletonProps) {
  return (
    <View style={[styles.skeleton, { width, height, borderRadius }, style]} />
  )
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#444',
    opacity: 0.25,
    marginVertical: 4,
  },
})
