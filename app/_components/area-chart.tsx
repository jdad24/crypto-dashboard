'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { Tabs, Tab } from '@mui/material';
import { myPriceFormatter } from '@/app/_lib/utils';

type AreaData = {
    time: string,
    value: number
}

export default function AreaChart({ chartData }: {
    chartData: {
        prices: Array<Array<number>>,
        market_caps: Array<Array<number>>
    }
}) {

    // const [data, setData] = useState<Array<CandleData>>([])
    const [tabIndex, setTabIndex] = useState(0);
    const chartRef = useRef(null)

    const formatData = (data: Array<Array<number>>) => {
        const formattedData: Array<AreaData> = []

        data.slice(0, 365).map(record => { //First 365 records
            const dataPoint: AreaData = {
                time: new Date(record[0]).toISOString().split('T')[0],
                value: record[1]
            }
            formattedData.push(dataPoint)
        })        
        return formattedData
    }

    useEffect(() => {
        if (!chartRef.current) return
        let data;

        const bgThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
        const fgThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim();

        tabIndex == 0 ? data = formatData(chartData?.['prices']) : data = formatData(chartData?.['market_caps'])

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

    }, [tabIndex, chartData])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div className='border-2 border-gray-400' ref={chartRef}>
            <Tabs style={{ backgroundColor: "white" }} value={tabIndex} onChange={handleTabChange}>
                <Tab label="Price" />
                <Tab label="Market Cap" />
            </Tabs>
        </div>
    )
}