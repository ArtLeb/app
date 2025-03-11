// app/components/DatePickerDialog.tsx
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isBefore } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  IconButton
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import useRequest from '../helpers/Request';

interface BookingDate {
  start: string;
  end: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  onConfirm: () => void;
}

export default function DatePickerDialog({ open, onClose, onDateSelect, onConfirm }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { responseData: bookings, loading } = useRequest<BookingDate[]>({
    method: 'GET',
    url: '/bookings'
  });

  const getBookedDates = () => {
    const bookedDays: Date[] = [];
    bookings?.forEach(booking => {
      const start = new Date(booking.start);
      const end = new Date(booking.end);
      const days = eachDayOfInterval({ start, end });
      bookedDays.push(...days);
    });
    return bookedDays;
  };

  const handleMonthChange = (direction: 'next' | 'prev') => {
    setCurrentMonth(prev => addMonths(prev, direction === 'next' ? 1 : -1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const bookedDates = getBookedDates();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        fontWeight: 700,
        color: '#707070',
        py: 2
      }}>
        <IconButton onClick={() => handleMonthChange('prev')}>
          <ChevronLeft />
        </IconButton>
        
        <Typography variant="h6" component="div">
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </Typography>
        
        <IconButton onClick={() => handleMonthChange('next')}>
          <ChevronRight />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
          textAlign: 'center',
          mb: 2
        }}>
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
            <Typography key={`weekday-${index}`} variant="body2" color="#707070">
              {day}
            </Typography>
          ))}
        </Box>

        {loading ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1
          }}>
            {daysInMonth.map(day => {
              const isBooked = bookedDates.some(d => 
                d.toDateString() === day.toDateString()
              );
              const isDisabled = isBooked || isBefore(day, new Date());

              return (
                <Button
                  key={day.toString()}
                  disabled={isDisabled}
                  onClick={() => onDateSelect(day)}
                  sx={{
                    minWidth: 0,
                    height: 40,
                    borderRadius: 1,
                    color: isDisabled ? '#bdbdbd' : '#334e77',
                    backgroundColor: isDisabled ? '#f5f5f5' : 'transparent',
                    '&:hover': {
                      backgroundColor: isDisabled ? '#f5f5f5' : '#e3f2fd'
                    }
                  }}
                >
                  {format(day, 'd')}
                </Button>
              );
            })}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: '#464242',
            fontWeight: 700,
            border: '1px solid #707070'
          }}
        >
          Отменить
        </Button>
        <Button 
          variant="contained"
          onClick={onConfirm}
          sx={{ 
            backgroundColor: '#334e77',
            color: '#fff',
            fontWeight: 700
          }}
        >
          Забронировать
        </Button>
      </DialogActions>
    </Dialog>
  );
}