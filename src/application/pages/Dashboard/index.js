import React from 'react';
import Timeline from './Timeline';
import TimelineEntry from './TimelineEntry';

const Dashboard = () => {
  const dummyData = [
    {
      what: '',
      when: '',
      location: '',
      type: 'breakfast',
    },
    {
      what: '',
      when: '',
      location: '',
      type: 'dinner',
    },
    {
      what: 'Coffee',
      when: '2020-07-31 07:15:00',
      location: 'Paul',
      type: 'drink',
    },
  ];

  return (
    <>
      <h1>dashboard</h1>
      <Timeline>
        {dummyData.map((m) => (
          <TimelineEntry meal={m} />
        ))}
      </Timeline>
    </>
  );
};

export default Dashboard;
