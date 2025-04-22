// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project-imports
import { editItem } from 'api/kanban';
import { openSnackbar } from 'api/snackbar';
import AnimateButton from 'components/@extended/AnimateButton';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';
import { DropzopType } from 'config';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// types
import { KanbanItem, KanbanProfile, KanbanUserStory, KanbanColumn } from 'types/kanban';
import { SnackbarProps } from 'types/snackbar';

interface Props {
  item: KanbanItem;
  profiles: KanbanProfile[];
  userStory: KanbanUserStory[];
  columns: KanbanColumn[];
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  title: yup.string().required('Task title is required'),
  dueDate: yup.date()
});

// ==============================|| KANBAN BOARD - ITEM EDIT ||============================== //

export default function EditItem({ item, profiles, userStory, columns, handleDrawerOpen }: Props) {
  const itemUserStory = userStory.filter((story) => story.itemIds.filter((itemId: string) => itemId === item.id)[0])[0];
  const itemColumn = columns.filter((column) => column.itemIds.filter((itemId) => itemId === item.id)[0])[0];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item.id,
      title: item.title,
      assign: item.assign,
      priority: item.priority,
      dueDate: item.dueDate ? new Date(item.dueDate) : new Date(),
      description: item.description,
      commentIds: item.commentIds,
      image: item.image,
      storyId: itemUserStory ? itemUserStory.id : '',
      columnId: itemColumn ? itemColumn.id : '',
      files: item.attachments
    },
    validationSchema,
    onSubmit: (values) => {
      const itemToEdit = {
        id: values.id,
        title: values.title,
        assign: values.assign,
        priority: values.priority,
        dueDate: values.dueDate ? new Date(values.dueDate) : new Date(),
        description: values.description,
        commentIds: values.commentIds,
        image: values.image,
        attachments: values.files
      };
      editItem(values.columnId, itemToEdit, values.storyId);
      openSnackbar({
        open: true,
        message: 'Submit Success',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);

      handleDrawerOpen();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2.5}>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Title</InputLabel>
              <TextField
                fullWidth
                id="title"
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Assign to</InputLabel>
              <Autocomplete
                id="assign"
                fullWidth
                autoHighlight
                options={profiles}
                value={profiles.find((profile: KanbanProfile) => profile.id === formik.values.assign)}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option) => option.id === formik.values.assign}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <CardMedia
                      component="img"
                      loading="lazy"
                      sx={{ width: 20 }}
                      src={getImageUrl(`${option.avatar}`, ImagePath.USERS)}
                      alt="avatar"
                    />
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="assign"
                    placeholder="Choose a assignee"
                    slotProps={{
                      htmlInput: {
                        ...params.inputProps,
                        autoComplete: 'new-password' // disable autocomplete and autofill
                      }
                    }}
                  />
                )}
                onChange={(event, value) => {
                  formik.setFieldValue('assign', value?.id);
                }}
              />
            </Stack>
          </Grid>

          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Prioritize</InputLabel>
              <FormControl>
                <RadioGroup
                  row
                  aria-label="color"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  name="priority"
                  id="priority"
                >
                  <FormControlLabel value="low" control={<Radio color="primary" sx={{ color: 'primary.main' }} />} label="Low" />
                  <FormControlLabel value="medium" control={<Radio color="warning" sx={{ color: 'warning.main' }} />} label="Medium" />
                  <FormControlLabel value="high" control={<Radio color="error" sx={{ color: 'error.main' }} />} label="High" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Due date</InputLabel>
              <DesktopDatePicker
                value={formik.values.dueDate}
                format="dd/MM/yyyy"
                onChange={(date) => {
                  formik.setFieldValue('dueDate', date);
                }}
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Description</InputLabel>
              <TextField
                fullWidth
                id="description"
                name="description"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>User Story</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="storyId"
                  name="storyId"
                  displayEmpty
                  value={formik.values.storyId}
                  onChange={formik.handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {userStory.map((story: KanbanUserStory, index: number) => (
                    <MenuItem key={index} value={story.id}>
                      {story.id} - {story.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>State</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="columnId"
                  name="columnId"
                  displayEmpty
                  value={formik.values.columnId}
                  onChange={formik.handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {columns.map((column: KanbanColumn, index: number) => (
                    <MenuItem key={index} value={column.id}>
                      {column.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <InputLabel sx={{ mt: 0.5 }}>Attachments:</InputLabel>
              </Grid>
              <Grid size={12}>
                <UploadMultiFile
                  type={DropzopType.STANDARD}
                  showList={true}
                  setFieldValue={formik.setFieldValue}
                  files={formik.values.files}
                  error={formik.touched.files && !!formik.errors.files}
                />
              </Grid>
              {formik.touched.files && formik.errors.files && (
                <Grid size={12}>
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.files}
                  </FormHelperText>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid size={12}>
            <AnimateButton>
              <Button fullWidth variant="contained" type="submit">
                Save
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </form>
  );
}
