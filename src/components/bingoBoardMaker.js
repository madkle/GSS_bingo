import React from "react";
import {
  Page,
  View,
  Text,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
const labelHeight = 297;
const labelWidth = 210;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-between",
  },
  label: {
    width: labelWidth,
    height: labelHeight,
    maxWidth: labelWidth,
    maxHeight: labelHeight,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    //border: "1px solid #000",
  },
  singleBoard:{
    width: labelWidth - 20,
    height: labelHeight/2 - 20,
    border: "1px solid #000",
  }
});
const BingoBoard = ({items}) => {
  console.log(items);
  
  return (
    <View style={styles.label}>
      <Text>
        Øl, Viser & Dram
      </Text>
    </View>
  );
};

//Create preview Component
/*
export const CreateSingleFrontLabel = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.flexContainer]}>
          <BingoBoard/>
        </View>
      </Page>
    </Document>
  );
};
*/
// Create Document Component
export const PDFDocument = (items) => {
  console.log(items);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.flexContainer]}>
          <BingoBoard items={items.props}/>
        </View>
      </Page>
    </Document>
  );
};

