// app/pages/ServiceCategories.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, CircularProgress, styled } from '@mui/material';
import { BottomMenu } from '../components/MainPageComponents/BottomMenu';
import useRequest from '../helpers/useRequest';
import PersonRangeDialog from '../components/PersonRangeDialog';

interface ServiceCategory {
  id: number;
  name: string;
}

const categoryImages: { [key: number]: string } = {
  1: 'src/assets/img/icon-table.png',
  2: 'src/assets/img/icon-pergola.png',
  3: 'src/assets/img/icon-umbrella-beach.png',
  4: 'src/assets/img/icon-camping-tent.png',
  5: 'src/assets/img/icon-catamaran.png',
  6: 'src/assets/img/icon-docki.png',
  7: 'src/assets/img/icon-car.png'
};

const CategoryCard = styled(Box)(({ }) => ({
  width: '100%',
  maxWidth: 200,
  height: 160,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-3px)'
  }
}));

export default function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { responseData: categories, error } = useRequest<ServiceCategory[]>({
    method: 'GET',
    url: '/service-categories/'
  });

  if (!categories && !error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <Typography color="error">Ошибка загрузки: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        height: 80,
        backgroundImage: 'url(src/assets/img/Top.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h5" sx={{
          color: '#fff',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          КАТЕГОРИИ УСЛУГ
        </Typography>
      </Box>

      <Box sx={{
        pt: '80px',
        pb: '64px',
        minHeight: 'calc(100vh - 144px)',
        position: 'relative',
        zIndex: 500
      }}>
        <Grid 
          container 
          spacing={2}
          sx={{
            maxWidth: 480,
            margin: '0 auto',
            padding: 2
          }}
        >
          {categories?.map((category) => (
            <Grid 
              item 
              xs={6}
              key={category.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '8px!important'
              }}
            >
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category.id);
                }}
                style={{ 
                  textDecoration: 'none',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <CategoryCard>
                  <img
                    src={categoryImages[category.id]}
                    alt={category.name}
                    style={{
                      width: 48,
                      height: 48,
                      marginBottom: 12
                    }}
                  />
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: '#4a4a4a',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      lineHeight: 1.2,
                      width: '100%',
                      paddingX: 1
                    }}
                  >
                    {category.name.toUpperCase()}
                  </Typography>
                </CategoryCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      <PersonRangeDialog 
        open={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        categoryId={selectedCategory || 0}
      />

      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 1000,
        backgroundColor: '#343A40',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <BottomMenu />
      </Box>
    </Box>
  );
}