import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const data = {
    labels: [],
    datasets: [{ data: [20, 45, 35, 27, 65] }],
};

const UserBarChart = () => {
    const gradient = useSelector((state: any) => state.theme.gradient);

    const chartConfig = {
        backgroundGradientFrom: gradient?.colors[0],
        backgroundGradientTo: gradient?.colors[2],
        color: (opacity = 1) => `#fff`,
        strokeWidth: 2
    };
    
    return (
        <View>
            {data?.datasets?.[0]?.data?.length ? (
                <LineChart
                    data={data}
                    width={screenWidth - 40}
                    height={200}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    style={{ borderRadius: 20, paddingTop: 40 }}
                    bezier
                    withInnerLines={false}
                    withOuterLines={false}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    )
};

export default UserBarChart;
