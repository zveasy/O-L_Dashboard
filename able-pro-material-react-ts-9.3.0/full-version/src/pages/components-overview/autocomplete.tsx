// material-ui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

// project-imports
import ComponentHeader from 'components/cards/ComponentHeader';
import { GRID_COMMON_SPACING } from 'config';

import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';
import BasicAutocomplete from 'sections/components-overview/autocomplete/BasicAutocomplete';
import CountryAutocomplete from 'sections/components-overview/autocomplete/CountryAutocomplete';
import CreatableAutocomplete from 'sections/components-overview/autocomplete/CreatableAutocomplete';
import GroupedAutocomplete from 'sections/components-overview/autocomplete/GroupedAutocomplete';
import DisabledAutocomplete from 'sections/components-overview/autocomplete/DisabledAutocomplete';
import AsynchronousAutocomplete from 'sections/components-overview/autocomplete/AsynchronousAutocomplete';
import CustomizedAutocomplete from 'sections/components-overview/autocomplete/CustomizedAutocomplete';
import MultipleAutocomplete from 'sections/components-overview/autocomplete/MultipleAutocomplete';
import FixedTagsAutocomplete from 'sections/components-overview/autocomplete/FixedTagsAutocomplete';
import CheckboxesAutocomplete from 'sections/components-overview/autocomplete/CheckboxesAutocomplete';
import LimitAutocomplete from 'sections/components-overview/autocomplete/LimitAutocomplete';
import SizesAutocomplete from 'sections/components-overview/autocomplete/SizesAutocomplete';
import GitHubAutocomplete from 'sections/components-overview/autocomplete/GitHubAutocomplete';

// ==============================|| COMPONENTS - AUTOCOMPLETE ||============================== //

export default function ComponentAutocomplete() {
  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Autocomplete"
        caption="The autocomplete is a normal text input enhanced by a panel of suggested options."
        directory="src/pages/components-overview/autocomplete"
        link="https://mui.com/material-ui/react-autocomplete/"
      />
      <ComponentWrapper>
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: GRID_COMMON_SPACING }}>
              <BasicAutocomplete />
              <CountryAutocomplete />
              <CreatableAutocomplete />
              <GroupedAutocomplete />
              <DisabledAutocomplete />
              <AsynchronousAutocomplete />
              <CustomizedAutocomplete />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: GRID_COMMON_SPACING }}>
              <MultipleAutocomplete />
              <FixedTagsAutocomplete />
              <CheckboxesAutocomplete />
              <LimitAutocomplete />
              <SizesAutocomplete />
              <GitHubAutocomplete />
            </Stack>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
