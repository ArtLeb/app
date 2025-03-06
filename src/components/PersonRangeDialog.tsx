// app/components/PersonRangeDialog.tsx
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogActions, 
  Button,
  DialogContent,
  Box,
  Typography,
  CircularProgress 
} from '@mui/material';
import useRequest from '../helpers/useRequest';
import DatePickerDialog from './DatePickerDialog';
import TimePickerDialog from './TimePickerDialog';

interface PersonRange {
  range_id: number;
  name: string;
  min_persons: number;
  max_persons: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId: number;
}

const TIME_SELECT_CATEGORIES = [5, 6, 7];

export default function PersonRangeDialog({ open, onClose, categoryId }: Props) {
  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{ start: string; end: string } | null>(null);
  
  const { responseData: ranges, error, loading } = useRequest<PersonRange[]>({
    method: 'GET',
    url: `/person-ranges?category_id=${categoryId}`
  });

  useEffect(() => {
    setSelectedRange(null);
    setSelectedDate(null);
    setSelectedTime(null);
  }, [categoryId]);

  const handleSelectDate = () => {
    setDateDialogOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    if (TIME_SELECT_CATEGORIES.includes(categoryId)) {
      setTimeDialogOpen(true);
    } else {
      handleBooking();
    }
  };

  const handleTimeConfirm = (start: string, end: string) => {
    setSelectedTime({ start, end });
    handleBooking();
  };

  const handleBooking = () => {
    console.log('Бронирование:', {
      categoryId,
      persons: selectedRange,
      date: selectedDate,
      time: TIME_SELECT_CATEGORIES.includes(categoryId) ? selectedTime : null
    });
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogContent>
          {loading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">
             
            </Typography>
          ) : (
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              py: 3
            }}>
              {ranges?.map((range) => (
  <Box
  key={range.range_id}
  onClick={() => setSelectedRange(range.range_id)}
  sx={{
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    border: selectedRange === range.range_id ? '2px solid #334e77' : '1px solid #ddd',
    borderRadius: 2,
    padding: 2,
    minWidth: 100
  }}
>
  <Typography variant="h6" sx={{ color: '#334e77', fontWeight: 700 }}>
    {range.max_persons}
  </Typography>
  <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
    чел
  </Typography>
</Box>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ 
          justifyContent: 'space-between', 
          p: 3,
          pt: 0 
        }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#464242',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.06em',
              width: 114,
              height: 28,
              borderRadius: 3,
              border: '1px solid #707070'
            }}
          >
            Отменить
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSelectDate}
            disabled={!selectedRange || loading}
            sx={{ 
              backgroundColor: '#334e77',
              color: '#f3e7e7',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.06em',
              width: 140,
              height: 28,
              borderRadius: 3,
              '&:hover': { 
                backgroundColor: '#2a4060',
                boxShadow: 'none'
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            Выбрать дату
          </Button>
        </DialogActions>
      </Dialog>

      <DatePickerDialog 
        open={dateDialogOpen}
        onClose={() => setDateDialogOpen(false)}
        onDateSelect={handleDateSelect}
        onConfirm={handleBooking}
      />

      <TimePickerDialog
        open={timeDialogOpen}
        onClose={() => setTimeDialogOpen(false)}
        onConfirm={handleTimeConfirm}
      />
    </>
  );
}