'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { Tabs, Tab } from '@mui/material';
import { myPriceFormatter } from '@/utils';

type AreaData = {
    time: number,
    value: number
}

export default function AreaChart({ historicalData }: { 
    historicalData: { prices: Array<Array<number>>,
    market_caps: Array<Array<number>>
 } }) {

    // const [data, setData] = useState<Array<CandleData>>([])
    const [tabIndex, setTabIndex] = useState(0);
    const chartRef = useRef(null)

    const formatData = (data: Array<Array<number>>) => {
        const formattedData: Array<AreaData> = []

        data.map(record => {
            const dataPoint: AreaData = {
                time: record[0] / 1000,
                value: record[1]
            }
            formattedData.push(dataPoint)
        })
        console.log(formattedData)
        return formattedData
    }

    useEffect(() => {
        if (!chartRef.current) return
        let data;

        const bgThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
        const fgThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim();

        tabIndex == 0 ? data = formatData(historicalData?.['prices']) : data = formatData(historicalData?.['market_caps'])

        const chartOptions = { width: 800, height: 600, layout: { textColor: fgThemeColor, background: { color: bgThemeColor } } };
        const chart = createChart(chartRef.current, chartOptions);
        chart.applyOptions({
                localization: {
                    priceFormatter: myPriceFormatter
                }
            })
        const areaSeries = chart.addSeries(AreaSeries, { lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' });
        areaSeries.setData(data);

        chart.timeScale().fitContent();

        return () => {
            chart.remove()
        }

    }, [tabIndex])

    const handleTabChange = (event, newValue: number) => {        
        setTabIndex(newValue);
    };

    return (
        <div className='border-2 border-gray-400' ref={chartRef}>
            <Tabs style={{backgroundColor: "white"}} value={tabIndex} onChange={handleTabChange}>
                <Tab label="Price" />
                <Tab label="Market Cap" />
            </Tabs>
        </div>
    )
}