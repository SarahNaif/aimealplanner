import { Meal } from '@/types/types';
import jsPDF from 'jspdf';

export const generatePDF = (recipe: Meal) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const {
    dishName,
    description,
    imageUrl,
    recipe: { ingredients, instructions, nutrition, prepTime, cookTime },
  } = recipe;

  let currentY = 20; // Track Y Position

  // Set font
  doc.setFont('helvetica', 'bold');

  // Add title (Centered)
  doc.setFontSize(24);
  doc.text(dishName, pageWidth / 2, currentY, { align: 'center' });

  currentY += 10; // Move down for description

  // Add description
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const descriptionLines = doc.splitTextToSize(description, 180);
  doc.text(descriptionLines, 15, currentY);
  
  currentY += descriptionLines.length * 7 + 10; // Move down for next section


  // Add image (Centered Below Text)
  const imgWidth = 200;
  const imgHeight = 80;
  const imgX = (pageWidth - imgWidth) / 2; // Center horizontally
  doc.addImage(imageUrl, "JPEG", imgX, currentY, imgWidth, imgHeight);

  currentY += imgHeight + 10; // Move down for next section

    // Add prep and cook time
    doc.setFontSize(10);
    doc.text(`Prep Time: ${prepTime} min | Cook Time: ${cookTime} min`, 15, currentY);
    
    currentY += 10; // Move down for nutrition info
  
    // Add nutrition info
    doc.text(`Calories: ${nutrition.calories} Cal per serving`, 15, currentY);
    
    currentY += 15; // Move down before image
  
  // Add ingredients
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Ingredients:', 15, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  
  currentY += 10;
  ingredients.forEach((ingredient: any, index: number) => {
    doc.text(`• ${ingredient}`, 20, currentY);
    currentY += 7;
  });

  currentY += 10; // Move down for instructions

  // Add instructions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Instructions:', 15, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  currentY += 10;

  instructions.forEach((instruction: any, index: number) => {
    const lines = doc.splitTextToSize(` ${instruction}`, 170);
    doc.text(lines, 20, currentY);
    currentY += 7 * lines.length; 
  });

  // Save the PDF
  doc.save(`${dishName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};
