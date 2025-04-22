// material-ui
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';

// assets
import { Add } from 'iconsax-react';
import AccountCard1 from 'assets/images/finance/account-card-1.png';
import AccountCard2 from 'assets/images/finance/account-card-2.png';

// table data
function createData(image: string, currency: string, amount: number, status: string) {
  return { image, currency, amount, status };
}

const AccountData = [createData(AccountCard1, 'US Dollar', 12920, 'Active'), createData(AccountCard2, 'US Dollar', 10250, 'Active')];

// ===========================|| FINANCE - ACCOUNT ||=========================== //

export default function AccountsCard() {
  return (
    <MainCard>
      <Stack sx={{ gap: 1.5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Accounts
        </Typography>
        {AccountData.map((account, index) => (
          <MainCard key={index} content={false} sx={{ p: 1.75 }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <CardMedia component="img" sx={{ width: 82, height: 55 }} image={account.image} alt={`Card Image ${index + 1}`} />
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1, color: 'success.main', fontWeight: 500 }}>
                <Dot size={5} color="success" /> {account.status}
              </Stack>
              <Stack>
                <Typography variant="body1">{account.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {account.currency}
                </Typography>
              </Stack>
            </Stack>
          </MainCard>
        ))}
        <MainCard content={false} sx={{ p: 2, borderStyle: 'dashed', '&:hover': { cursor: 'pointer', borderColor: 'secondary.light' } }}>
          <Stack sx={{ gap: 1, alignItems: 'center' }}>
            <IconButton
              variant="contained"
              size="small"
              color="secondary"
              sx={{ p: 0.5, '& svg': { width: 24, height: 24, color: 'background.default' } }}
            >
              <Add size={24} />
            </IconButton>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Add to Account
            </Typography>
          </Stack>
        </MainCard>
      </Stack>
    </MainCard>
  );
}
