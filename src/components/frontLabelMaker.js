import React from "react";
import {
  Page,
  View,
  Image,
  Text,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
const labelHeight = 105 * (72 / 25.6);
const labelWidth = 72 * (72 / 25.6);

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
  mainImg: {
    maxWidth: "50mm",
    maxHeight: "50mm",
    borderRadius:"100%",
    marginBottom: "10pt",
  },
  logoImg: {
    width: "10mm",
    height: "10mm",
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  textBox: {
    marginBottom: "20pt",
    //border: "1px solid #000",
    width: "47mm",
    textAlign: "center",
  },
});
const textFormatter = (text) => {
  let formattedText = text.replace(" - ", "\n");

  return formattedText;
};
const FrontLabel = ({ FrontLabelObj }) => {
  let beerName = textFormatter(FrontLabelObj.beerName);
  let beerType = textFormatter(FrontLabelObj.beerType);

  return (
    <View style={styles.label}>
      <Text
        style={[
          styles.textBox,
          { fontSize: "18pt", marginTop: "5pt",
             fontWeight:"semibold" },
        ]}
      >
        Øl, Viser & Dram
      </Text>
      {FrontLabelObj.file && (
        <Image src={FrontLabelObj.file} style={styles.mainImg} />
      )}
      <Text style={[styles.textBox, { fontSize: "16pt" }]}>{beerName}</Text>
      <Text
        style={[styles.textBox, { fontSize: "12pt", marginBottom: "10pt" }]}
      >
        {beerType}
      </Text>
      <Text
        style={[
          styles.textBox,
          { fontSize: "10pt", height: "40pt", marginBottom: "5pt" },
        ]}
      >
        Brygget av: {"\n" + FrontLabelObj.brewers}
      </Text>
    </View>
  );
};

//Create preview Component

export const CreateSingleFrontLabel = ({ FrontLabelInfo }) => {
  return (
    <Document>
      <Page size="A7" style={styles.page}>
        <View style={[styles.flexContainer]}>
          <FrontLabel FrontLabelObj={FrontLabelInfo} />
        </View>
      </Page>
    </Document>
  );
};

// Create Document Component
export const PDFFile = ({ FrontLabelInfo }) => {
  let lablesArr = [];
  for (let i = 0; i < 8; i++) {
    lablesArr.push(<FrontLabel key={i} FrontLabelObj={FrontLabelInfo} />);
  }
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={[styles.flexContainer]}>{lablesArr}</View>
      </Page>
    </Document>
  );
};