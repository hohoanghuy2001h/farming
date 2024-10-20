import React, { useEffect, useState } from "react";
import stageDefault from '@/constants/stage.template'
import axios from "axios";

export default function useStage(date: number) {
  const [loading, setLoading] = useState(true);
  const [daysPlant, setDaysPlant] = useState<plant>({day: 0});
  const [stagePlant, setStagePlant] = useState<stagePlant>()
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {
        setDaysPlant({
            day: date,
        });
        setLoading(false);
        await stageDefault.forEach((stage, index) => {
            if(daysPlant?.day >= stage.days) {
              if( index < stageDefault.length - 1 && daysPlant?.day < stageDefault[index + 1].days) {
                setStagePlant(stage);
              }
              else if(index == stageDefault.length - 1) {
                setStagePlant(stage);
              }
            }
        })
    };
    subscription();
  }, [refetch, date]);

  return { loading, stagePlant, error, setRefetch, refetch };
}