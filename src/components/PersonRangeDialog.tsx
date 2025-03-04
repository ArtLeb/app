// app/components/PersonRangeDialog.tsx
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  CircularProgress 
} from '@mui/material';
import useRequest from '../helpers/useRequest';

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

export default function PersonRangeDialog({ open, onClose, categoryId }: Props) {
  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const { responseData: ranges, error, loading } = useRequest<PersonRange[]>({
    method: 'GET',
    url: `/person-ranges?category_id=${categoryId}`
  });

  useEffect(() => {
    setSelectedRange(null);
  }, [categoryId]);

  const handleSelectDate = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ 
        textAlign: 'center', 
        fontWeight: 700,
        fontSize: 20,
        color: '#707070',
        letterSpacing: '0.06em',
        pt: 4,
        pb: 2
      }}>
        Выберите вместительность
      </DialogTitle>
      
      <DialogContent>
        {loading ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Ошибка загрузки данных
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
                  gap: 1
                }}
              >
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  border: '1px solid #707070',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selectedRange === range.range_id ? '#334e77' : '#fff',
                  transition: '0.3s'
                }}>
                  <Typography variant="h6" sx={{ 
                    color: selectedRange === range.range_id ? '#fff' : '#3d444a',
                    fontWeight: 700,
                    fontSize: 14
                  }}>
                    {range.max_persons}
                  </Typography>
                  <Typography sx={{ 
                    color: selectedRange === range.range_id ? '#fff' : '#3d444a',
                    fontWeight: 700,
                    fontSize: 14,
                    mt: 0.5
                  }}>
                    ЧЕЛ
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ 
          textAlign: 'center', 
          mt: 3,
          mb: 2,
          px: 2,
          py: 1,
          backgroundColor: '#f5f5f5',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ 
            color: '#464242',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.06em'
          }}>
            6 ЧАСОВ 1500 РУБ
          </Typography>
        </Box>
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
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.06em',
            width: 150,
            height: 30,
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
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: '0.06em',
    width: 160, // Увеличено с 118px
    height: 30,
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
  );
}