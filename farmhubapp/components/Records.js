import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PieChartComponent from '../charts/piechart';
import { user } from '../data/userData';
import { COLORS } from '../charts/colors'; // Adjust the path as needed
import tw from 'twrnc'; // Importing TWRNC

const Records = () => {
  const chartData = user.total_cashflow.map((total_cashflow) => ({
    value: total_cashflow.amount,
    label: total_cashflow.name,
    color: COLORS[total_cashflow.name], // Ensure the key matches the color object
  }));

  return (
    <View style={tw`flex-1 items-center bg-gray-100`}>
      <View>
        <PieChartComponent data={chartData} />
      </View>
    </View>
  );
};

export default Records;
