import { useEffect, useState, ReactNode } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { updateAddress } from 'api/address';
import { removeCartProduct, setBackStep, setBillingAddress, setCheckoutStep, setNextStep, updateCartProduct } from 'api/cart';
import { openSnackbar } from 'api/snackbar';
import { GRID_COMMON_SPACING } from 'config';

import BillingAddress from 'sections/apps/e-commerce/checkout/BillingAddress';
import Cart from 'sections/apps/e-commerce/checkout/Cart';
import CartEmpty from 'sections/apps/e-commerce/checkout/CartEmpty';
import Payment from 'sections/apps/e-commerce/checkout/Payment';

// types
import { CartCheckoutStateProps } from 'types/cart';
import { Address, TabsProps } from 'types/e-commerce';
import { SnackbarProps } from 'types/snackbar';

// assets
import { TickCircle } from 'iconsax-react';

interface StyledProps {
  value: number;
  cart: CartCheckoutStateProps;
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
}

interface TabOptionProps {
  label: string;
}

const StyledTab = styled((props) => <Tab {...props} />)<StyledProps>(({ theme }) => ({
  minHeight: 'auto',
  minWidth: 250,
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  textAlign: 'left',
  justifyContent: 'flex-start',
  '&:after': { backgroundColor: 'transparent !important' },
  '& > svg': {
    marginBottom: '0px !important',
    marginRight: 10,
    marginTop: 2,
    height: 20,
    width: 20
  },
  [theme.breakpoints.down('md')]: { minWidth: 'auto' }
}));

// tabs option
const tabsOption: TabOptionProps[] = [{ label: 'Cart' }, { label: 'Shipping Information' }, { label: 'Payment' }];

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

export default function CheckoutTab({ cart }: { cart: CartCheckoutStateProps }) {
  const isCart = cart.products && cart.products.length > 0;

  const [value, setValue] = useState(cart.step > 2 ? 2 : cart.step);
  const [billing, setBilling] = useState(cart.billing);

  const editBillingAddress = (addressEdit: Address) => {
    updateAddress(addressEdit.id, addressEdit).then(() => setBillingAddress(addressEdit));
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
    setCheckoutStep(newValue);
  };

  useEffect(() => {
    setValue(cart.step > 2 ? 2 : cart.step);
  }, [cart.step]);

  const removeProduct = (id: string | number | undefined) => {
    removeCartProduct(id!, cart.products);
    openSnackbar({
      open: true,
      message: 'Cart updated successfully',
      variant: 'alert',
      alert: { color: 'success' }
    } as SnackbarProps);
  };

  const updateQuantity = (id: string | number | undefined, quantity: number) => {
    updateCartProduct(id!, quantity, cart.products);
  };

  const onNext = () => {
    setNextStep();
  };

  const onBack = () => {
    setBackStep();
  };

  const billingAddressHandler = (addressBilling: Address | null) => {
    if (billing !== null || addressBilling !== null) {
      if (addressBilling !== null) {
        setBilling(addressBilling);
      }

      setBillingAddress(addressBilling !== null ? addressBilling : billing);
      onNext();
    } else {
      openSnackbar({
        open: true,
        message: 'Please select delivery address',
        variant: 'alert',
        alert: { color: 'error' }
      } as SnackbarProps);
    }
  };

  return (
    <Stack sx={{ gap: GRID_COMMON_SPACING }}>
      <MainCard content={false}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={12}>
            <Tabs
              value={value}
              onChange={(e, newValue) => handleChange(newValue)}
              aria-label="icon label tabs example"
              variant="scrollable"
              sx={{
                '& .MuiTabs-flexContainer': { borderBottom: 'none' },
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiButtonBase-root + .MuiButtonBase-root': {
                  position: 'relative',
                  overflow: 'visible',
                  ml: 2,
                  '&:after': {
                    content: '""',
                    bgcolor: '#ccc',
                    width: 1,
                    height: 'calc(100% - 16px)',
                    position: 'absolute',
                    top: 8,
                    left: -8
                  }
                }
              }}
            >
              {tabsOption.map((tab, index) => (
                <StyledTab
                  value={index}
                  cart={cart}
                  disabled={index > cart.step}
                  key={index}
                  label={
                    <Grid container>
                      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                        <Avatar
                          type={index !== cart.step ? 'combined' : 'filled'}
                          size="xs"
                          color={index > cart.step ? 'secondary' : 'primary'}
                          sx={{ p: 0, border: 'none', '& svg': { width: 24, height: 24 } }}
                        >
                          {index === cart.step ? index + 1 : <TickCircle />}
                        </Avatar>
                        <Typography color={index > cart.step ? 'text.secondary' : 'inherit'}>{tab.label}</Typography>
                      </Stack>
                    </Grid>
                  }
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </MainCard>
      <TabPanel value={value} index={0}>
        {isCart && <Cart checkout={cart} onNext={onNext} removeProduct={removeProduct} updateQuantity={updateQuantity} />}
        {!isCart && <CartEmpty />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BillingAddress checkout={cart} onBack={onBack} billingAddressHandler={billingAddressHandler} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Payment checkout={cart} onBack={onBack} onNext={onNext} removeProduct={removeProduct} editAddress={editBillingAddress} />
      </TabPanel>
    </Stack>
  );
}
