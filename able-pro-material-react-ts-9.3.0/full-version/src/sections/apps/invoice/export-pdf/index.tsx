// third-party
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';

// project-imports
import Content from './Content';
import Header from './Header';

// types
import { InvoiceList } from 'types/invoice';

const styles = StyleSheet.create({
  page: { padding: 30 },
  container: { flex: 1, flexDirection: 'row', '@media max-width: 400': { flexDirection: 'column' } }
});

interface Props {
  list: InvoiceList | any;
}
// ==============================|| INVOICE EXPORT  ||============================== //

export default function ExportPDFView({ list }: Props) {
  let title = list?.invoiceId || list?.invoice_id;
  let customer_name = list?.customer_name || list?.from?.name || list?.customerInfo?.name;

  return (
    <Document title={`${title} ${customer_name}`}>
      <Page size="A4" style={styles.page}>
        <Header list={list} />
        <View style={styles.container}>
          <Content list={list} />
        </View>
      </Page>
    </Document>
  );
}
