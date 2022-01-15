import { gql, useQuery } from '@apollo/client';
import LessonItem from './LessonItem';

//MUI Imports
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

export default function LessonsList() {
  const { loading, data } = useQuery(FETCH_LESSONS_QUERY);

  // MUI Accordion helpers
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    console.log('handleChange');
    setExpanded(newExpanded ? panel : false);
  };

  // MUI Component return
  return (
    <div>
      <h1>Lessons List</h1>
      {loading
        ? 'Loading lessons...'
        : data.getLessons.map((lesson, idx) => (
            <Accordion
              key={lesson.id}
              expanded={expanded === `panel${idx}`}
              onChange={handleChange(`panel${idx}`)}>
              <AccordionSummary
                aria-controls={`panel${idx}d-content`}
                id={`panel${idx}d-header`}>
                <Typography>{lesson.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Description: {lesson.description};</Typography>
                <Typography>Time: {lesson.time};</Typography>
                <Typography>Place: {lesson.location}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
    </div>
  );
}

// original list
//   return (
//     <div>
//       <h1>Lessons List</h1>
//       {loading ? (
//         <p>Loading Lessons</p>
//       ) : (
//         data.getLessons.map((lesson) => (
//           <LessonItem key={lesson.id} lesson={lesson} />
//         ))
//       )}
//     </div>
//   );
// }

const FETCH_LESSONS_QUERY = gql`
  {
    getLessons {
      id
      title
      description
      location
      time
      teachers {
        username
      }
    }
  }
`;
