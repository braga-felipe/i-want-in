// --- GO TO LINE 53 FOR THE COMPONENET ---
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/auth';

import { gql, useMutation } from '@apollo/client';

import {
  styled,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Button,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
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

export default function AccordionComponent({ lesson, idx }) {
  const [expanded, setExpanded] = React.useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log('lesson id: ' + lesson.id);
  const [deleteLesson] = useMutation(DELETE_LESSON, {
    variables: { lessonId: lesson.id },
    update(_, result) {
      console.log('lesson ID: ', lesson.id);
      console.log(result);
      alert(result.data.deleteLesson);
    },
    onError(err) {
      console.log({ err });
    },
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
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
          <Button
            onClick={() => navigate(`/card/${lesson.id}`, { replace: true })}
            variant='contained'
            sx={{ mt: 1, mb: 2 }}>
            More info
          </Button>
          {user &&
            lesson.teachers
              .flatMap((teacher) => teacher.username)
              .includes(user.username) && (
              <Button
                onClick={deleteLesson}
                variant='contained'
                sx={{ ml: 21, mt: 1, mb: 2 }}>
                Delete
              </Button>
            )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const DELETE_LESSON = gql`
  mutation deleteLesson($lessonId: ID!) {
    deleteLesson(lessonId: $lessonId)
  }
`;
