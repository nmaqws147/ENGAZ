'use client';
import {useChart} from './ChartLogic/page';
import { useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer
} from 'recharts';

const ProductiveOverView = () => {

    const {setIsMounted,isMounted,combinedData} = useChart();

    useEffect(() => { setIsMounted(true); }, []);

    if (!isMounted) return null;

    return (
        <div className="w-full h-[400px] p-6 bg-[#0f172a]/50 backdrop-blur-3xl rounded-24 border border-white/5 flex flex-col">
            <h2 className="text-white mb-8 font-bold text-xl">Productivity Trends</h2>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={combinedData} margin={{ left: -20, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />         
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#f43f5e', fontSize: 12}} />                  
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6366f1', fontSize: 12}} />
                        
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                        <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="sessions" 
                            stroke="#f43f5e" 
                            strokeWidth={4} 
                            dot={{ r: 4, fill: '#f43f5e' }}
                            activeDot={{ r: 8 }}
                        />

                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="focusHours" 
                            stroke="#6366f1" 
                            strokeWidth={4} 
                            dot={{ r: 4, fill: '#6366f1' }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProductiveOverView;