import React from 'react';

export default function LessonItem({ lesson }) {
  return (
    <div className='lesson-item'>
      <h1>{lesson.title}</h1>
      <h2>
        Teachers: {lesson.teachers.map((teacher) => `${teacher.username} `)}
      </h2>
      <h2>Location: {lesson.location}</h2>
      <h2>Time: {lesson.time}</h2>
    </div>
  );
}
