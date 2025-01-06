import React, { useState, useEffect } from "react";
import { Button, Spinner, Box, Text, VStack, useToast } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import axiosHeader from "../axiosHeader"; // Replace with your Axios setup

const CertificateGenerator = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get("/startups/getStartupById");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast({
          title: "Error fetching data.",
          description: "Please check your connection or try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const generatePDF = () => {
    if (!data || data.status !== "approved") {
      toast({
        title: "Data not available.",
        description: "No startup data available to generate the certificate.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const doc = new jsPDF("portrait", "pt", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Background
      doc.setFillColor(224, 245, 224); // Light green
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Title
      doc.setFontSize(24);
      doc.setTextColor(76, 175, 80); // Green
      doc.text("CERTIFICATE OF RECOGNITION", pageWidth / 2, 100, {
        align: "center",
      });

      // Certificate Number
      doc.setFontSize(12);
      doc.text(`CERTIFICATE NO: ${data._id.slice(-6)}`, pageWidth - 60, 130, {
        align: "right",
      });

      // Main Text
      doc.setFontSize(14);
      doc.setTextColor(51, 51, 51); // Dark gray
      const content = `
This is to certify that ${
        data?.name || "Name of the Company"
      }, incorporated as a Private Limited Company on ${new Date().toLocaleDateString()}, is recognized as a startup by the Department for Promotion of Industry and Internal Trade. The startup is working in AYUSH Industry and ${
        data?.sector || "Sector Name"
      } sector as self-certified by them.

This certificate shall only be valid for the Entity up to Ten years from the date of its incorporation only if its turnover for any of the financial years has not exceeded ₹ 100 Cr.
      `;
      doc.text(content, 60, 170, {
        maxWidth: pageWidth - 120,
        align: "justify",
      });

      // Dates
      doc.setFontSize(12);
      doc.text("28-06-2021\nDATE OF ISSUE", 60, pageHeight - 100);
      doc.text("20-05-2028\nVALID UPTO", pageWidth - 120, pageHeight - 100, {
        align: "right",
      });

      // Footer
      doc.setFontSize(16);
      doc.setTextColor(76, 175, 80); // Green
      doc.text("#startupAyush", pageWidth - 60, pageHeight - 40, {
        align: "right",
      });

      // Download the PDF
      doc.save("certificate.pdf");

      toast({
        title: "Certificate generated!",
        description: "The certificate has been successfully downloaded.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error generating PDF:", err);
      toast({
        title: "Error generating certificate.",
        description: "An error occurred while generating the certificate.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={5}>
      <Box>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        ) : (
          <Button
            onClick={generatePDF}
            colorScheme="teal"
            borderRadius="md"
            size="lg"
            _hover={{ bg: "teal.600" }}
          >
            Generate Certificate
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default CertificateGenerator;
