import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  invoiceDetails: {
    fontSize: 12,
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  billingShippingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billingSection: {
    width: "48%",
  },
  shippingSection: {
    width: "48%",
  },
  bold: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#d3d3d3",
    padding: 8,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  cell: {
    width: "50%", 
    padding: 4,
  },
  totalSection: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalLabel: {
    fontWeight: "bold",
  },
});


const InvoiceDocument = ({ order, products, invoiceId }) => {

  const billingInfo = order.user?.address?.billing[0] || {};
  const shippingInfo = order.user?.address?.shipping[0] || {};

  const productDetails = order.productId.map((productId, index) => {
    const product = products.find((prod) => prod._id === productId);
    return {
      description: product ? product.name : `Product ${index + 1}`,
      quantity: order.quantities[index]?.$numberInt || 1,
      sellerName: product ? product.seller_name : "Unknown Seller",
      storeName: product ? product.store_name : "Unknown Store",
    };
  });
  console.log('bill',productDetails)

  const amount = parseFloat(order.amount?.$numberDecimal || order.amount) || 0;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <View style={styles.invoiceDetails}>
            <Text>Invoice Number: {invoiceId}</Text>
            <Text>Invoice Date: {new Date(order.date).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Billing and Shipping Information */}
        <View style={styles.section}>
          <View style={styles.billingShippingContainer}>
            {/* Billing Information */}
            <View style={styles.billingSection}>
              <Text style={styles.bold}>Billing Information</Text>
              <Text>Company: {billingInfo.companyName}</Text>
              <Text>Name: {billingInfo.firstName} {billingInfo.lastName}</Text>
              <Text>Address: {billingInfo.streetAddress}, {billingInfo.district}, {billingInfo.division} {billingInfo.zipCode}</Text>
              <Text>Email: {order.cus_email}</Text>
            </View>
            {/* Shipping Information */}
            <View style={styles.shippingSection}>
              <Text style={styles.bold}>Shipping Information</Text>
              <Text>Name: {shippingInfo.firstName} {shippingInfo.lastName}</Text>
              <Text>Address: {shippingInfo.streetAddress}, {shippingInfo.district}, {shippingInfo.division} {shippingInfo.zipCode}</Text>
              <Text>Email: {shippingInfo.email}</Text>
            </View>
          </View>
        </View>

        {/* Products Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.bold]}>Description</Text>
            <Text style={[styles.cell, styles.bold]}>Quantity</Text>
            <Text style={[styles.cell, styles.bold]}>SellerName</Text>
            <Text style={[styles.cell, styles.bold]}>StoreName</Text>
          </View>

          {/* Table Rows */}
          {productDetails.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{product.description}</Text>
              <Text style={styles.cell}>{product.quantity}</Text>
              <Text style={styles.cell}>{product.sellerName}</Text>
              <Text style={styles.cell}>{product.storeName}</Text>
            </View>
          ))}
        </View>

        {/* Totals Section in Table */}
        <View style={styles.totalSection}>
          {/* Subtotal Row */}
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text style={styles.totalLabel}>${amount.toFixed(2)}</Text>
          </View>

          {/* Shipping Row */}
          <View style={styles.totalRow}>
            <Text>Shipping:</Text>
            <Text>$0.00</Text> {/* Assuming no shipping */}
          </View>

          {/* Tax Row */}
          <View style={styles.totalRow}>
            <Text>Tax:</Text>
            <Text>$0.00</Text> {/* Assuming no tax */}
          </View>

          {/* Total Row */}
          <View style={[styles.totalRow, { borderTop: "2px solid black", marginTop: 5 }]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalLabel}>${amount.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
