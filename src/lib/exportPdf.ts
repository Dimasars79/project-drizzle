import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Utility untuk mengekspor elemen HTML menjadi file PDF
 * 
 * @param elementId ID dari elemen HTML pembungkus template
 * @param filename Nama file yang akan diunduh
 */
export const exportElementToPdf = async (elementId: string, filename: string = 'Document.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemen dengan ID ${elementId} tidak ditemukan.`);
    return false;
  }

  try {
    // Tampilkan elemen sementara jika disembunyikan
    const originalStyle = element.style.display;
    element.style.display = 'block';

    const canvas = await html2canvas(element, {
      scale: 2, // Kualitas tinggi
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    element.style.display = originalStyle;

    const imgData = canvas.toDataURL('image/png');
    
    // Konfigurasi PDF ukuran A4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error('Error saat membuat PDF:', error);
    return false;
  }
};
