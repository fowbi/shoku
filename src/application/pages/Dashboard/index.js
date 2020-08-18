import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Timeline from './Timeline';
import TimelineEntry from './TimelineEntry';
import api from '../../../api';

const Dashboard = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.meals(moment());
      setMeals(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>dashboard</h1>
      <Timeline>
        {meals.map((meal) => (
          <TimelineEntry meal={meal} key={meal.id} />
        ))}
      </Timeline>
    </>
  );
};

export default Dashboard;
