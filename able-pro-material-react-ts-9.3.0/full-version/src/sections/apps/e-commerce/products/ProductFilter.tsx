import { useEffect, useState } from 'react';

// material-ui
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// types
import { ProductsFilter } from 'types/e-commerce';

// project-imports
import Colors from './Colors';

// ==============================|| PRODUCT - GENDER FILTER ||============================== //

function Gender({ gender, handelFilter }: { gender: string[]; handelFilter: (type: string, params: string) => void }) {
  const [isGenderLoading, setGenderLoading] = useState(true);
  useEffect(() => {
    setGenderLoading(false);
  }, []);

  return (
    <Stack>
      {isGenderLoading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
          <Typography variant="h5">Gender</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={gender.some((item) => item === 'male')} />}
                onChange={() => handelFilter('gender', 'male')}
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender.some((item) => item === 'female')}
                    onChange={() => handelFilter('gender', 'female')}
                    color="secondary"
                  />
                }
                label="Female"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender.some((item) => item === 'kids')}
                    onChange={() => handelFilter('gender', 'kids')}
                    color="error"
                  />
                }
                label="Kids"
              />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
}

// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

function Categories({ categories, handelFilter }: { categories: string[]; handelFilter: (type: string, params: string) => void }) {
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    setCategoriesLoading(false);
  }, []);

  return (
    <Stack>
      {isCategoriesLoading ? (
        <Grid size={12}>
          <Skeleton variant="rectangular" width="100%" height={96} />
        </Grid>
      ) : (
        <>
          <Typography variant="h5">Categories</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'all')} />}
                onChange={() => handelFilter('categories', 'all')}
                label="All"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'electronics')} />}
                onChange={() => handelFilter('categories', 'electronics')}
                label="Electronics"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'fashion')} />}
                onChange={() => handelFilter('categories', 'fashion')}
                label="Fashion"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'books')} />}
                onChange={() => handelFilter('categories', 'books')}
                label="Book"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'toys')} />}
                onChange={() => handelFilter('categories', 'toys')}
                label="Toys"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'kitchen')} />}
                onChange={() => handelFilter('categories', 'kitchen')}
                label="Home & Kitchen"
              />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
}

// ==============================|| PRODUCT GRID - PRICE FILTER ||============================== //

function Price({ handelFilter }: { handelFilter: (type: string, params: string) => void }) {
  const [isPriceLoading, setPriceLoading] = useState(true);
  useEffect(() => {
    setPriceLoading(false);
  }, []);

  const valuetext = (value: number) => `${value}`;

  const [value, setValue] = useState<number[]>([0, 300]);
  const handleSlider = (event: Event, newValue: any) => {
    setValue(newValue);
    const data = `${newValue[0]}-${newValue[1]}`;
    handelFilter('price', data);
  };

  return (
    <>
      {isPriceLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h5">Price</Typography>
          <Stack direction="row" sx={{ gap: 2 }}>
            <Stack sx={{ gap: 1 }}>
              <Typography sx={{ color: 'text.secondary' }}>Min</Typography>
              <TextField value={value[0]} slotProps={{ input: { readOnly: true } }} />
            </Stack>
            <Stack sx={{ gap: 1 }}>
              <Typography sx={{ color: 'text.secondary' }}>Max</Typography>
              <TextField value={value[1]} slotProps={{ input: { readOnly: true } }} />
            </Stack>
          </Stack>
          <Box sx={{ px: 0.75 }}>
            <Slider min={0} max={1000} value={value} onChange={handleSlider} valueLabelDisplay="auto" getAriaValueText={valuetext} />
          </Box>
        </Stack>
      )}
    </>
  );
}

// ==============================|| PRODUCT GRID - RATING FILTER ||============================== //

function RatingSection({ rating, handelFilter }: { rating: number; handelFilter: (type: string, params: string, rating: number) => void }) {
  const [isRatingLoading, setRatingLoading] = useState(true);
  useEffect(() => {
    setRatingLoading(false);
  }, []);

  return (
    <>
      {isRatingLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h5">Rating</Typography>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Rating
              precision={0.5}
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => handelFilter('rating', '', newValue!)}
            />
            <Typography component="legend">({rating})</Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}

// ==============================|| PRODUCT GRID - FILTER ||============================== //

export default function ProductFilter({
  filter,
  handelFilter
}: {
  filter: ProductsFilter;
  handelFilter: (type: string, params: string, rating?: number) => void;
}) {
  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid>
        <Gender gender={filter.gender} handelFilter={handelFilter} />
      </Grid>
      <Grid>
        <Categories categories={filter.categories} handelFilter={handelFilter} />
      </Grid>
      <Grid>
        <Colors colors={filter.colors} handelFilter={handelFilter} />
      </Grid>
      <Grid>
        <Price handelFilter={handelFilter} />
      </Grid>
      <Grid>
        <RatingSection rating={filter.rating} handelFilter={handelFilter} />
      </Grid>
    </Grid>
  );
}
