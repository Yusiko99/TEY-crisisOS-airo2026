"use client";
import React from 'react';
import SegmentedGauge from '../ui/SegmentedGauge';

export default function RiskGauge({ score }: { score: number }) {
  return (
    <SegmentedGauge 
      value={score} 
      label="Risk Score" 
      valueSuffix="%" 
    />
  );
}
