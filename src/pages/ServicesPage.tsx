import { useEffect } from 'react'
import Request from '../helpers/Request'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'

interface Category {
  id: number
  name: string
  description: string
  image: string
}

export default function ServicesPage() {
  const navigate = useNavigate()
  const { responseData: categories, error } = Request<Category[]>({
    method: 'GET',
    url: '/service_categories' // Уточните эндпоинт в вашем API
  })

  useEffect(() => {
    if (error) {
      console.error('Ошибка загрузки категорий:', error)
    }
  }, [error])

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Наши услуги
      </Typography>

      {categories ? (
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} key={category.id}>
              <Box 
                sx={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s'
                  }
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    filter: 'brightness(0.7)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    color: 'white',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                  }}
                >
                  <Typography variant="h5">{category.name}</Typography>
                  <Typography variant="body2">{category.description}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {error ? 'Ошибка загрузки данных' : 'Загрузка категорий...'}
        </Typography>
      )}

      {/* Кнопка возврата */}
      <Box sx={{ position: 'fixed', top: 20, left: 20 }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#343A40',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Назад
        </button>
      </Box>
    </div>
  )
}