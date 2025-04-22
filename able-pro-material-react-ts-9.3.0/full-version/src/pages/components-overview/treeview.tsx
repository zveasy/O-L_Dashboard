// material-ui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

// project-imports
import ComponentHeader from 'components/cards/ComponentHeader';
import { GRID_COMMON_SPACING } from 'config';

import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';
import BasicTreeView from 'sections/components-overview/tree-view/BasicTreeView';
import MultiSelectTreeView from 'sections/components-overview/tree-view/MultiSelectTreeView';
import ControlledTreeView from 'sections/components-overview/tree-view/ControlledTreeView';
import RichObjectTreeView from 'sections/components-overview/tree-view/RichObjectTreeView';
import DisabledTreeView from 'sections/components-overview/tree-view/DisabledTreeView';
import CustomizedTreeView from 'sections/components-overview/tree-view/CustomizedTreeView';
import GmailTreeView from 'sections/components-overview/tree-view/GmailTreeView';

// ==============================|| COMPONENTS - TREE VIEW ||============================== //

export default function ComponentTreeView() {
  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Tree View"
        caption="A tree view widget presents a hierarchical list."
        directory="src/pages/components-overview/treeview"
        link="https://mui.com/material-ui/react-tree-view/"
      />
      <ComponentWrapper>
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: GRID_COMMON_SPACING }}>
              <BasicTreeView />
              <MultiSelectTreeView />
              <ControlledTreeView />
              <RichObjectTreeView />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: GRID_COMMON_SPACING }}>
              <DisabledTreeView />
              <CustomizedTreeView />
              <GmailTreeView />
            </Stack>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
