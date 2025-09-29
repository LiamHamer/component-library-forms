import React, { useMemo } from 'react';
import { Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RevenueLineChart = () => {
  const revenueData = useMemo(
    () => [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 },
      { month: 'Jul', revenue: 73000 },
      { month: 'Aug', revenue: 69000 },
      { month: 'Sep', revenue: 78000 },
      { month: 'Oct', revenue: 82000 },
      { month: 'Nov', revenue: 76000 },
      { month: 'Dec', revenue: 89000 },
    ],
    []
  );

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Monthly Revenue
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}K`}
          />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default RevenueLineChart;
