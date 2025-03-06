// app/components/TimePickerDialog.tsx
import { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

export default function TimePickerDialog({ 
  open,
  onClose,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (start: string, end: string) => void;
}) {
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('16:00');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Выберите время</DialogTitle>
      <DialogContent>
        <TextField
          label="Начало"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="Конец"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          fullWidth
          sx={{ mt: 3 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button 
          onClick={() => onConfirm(startTime, endTime)}
          variant="contained"
        >
          Далее
        </Button>
      </DialogActions>
    </Dialog>
  );
}