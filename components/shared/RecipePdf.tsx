 // eslint-disable-next-line jsx-a11y/alt-text
'use client'; // Mark this as a client component

import { Document, Page, Text, View, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Meal } from '@/types/types';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    objectFit: 'cover',
  },
});

interface RecipePDFProps {
  recipe: Meal;
}

const RecipePDF: React.FC<RecipePDFProps> = ({ recipe }) => {
  const { dishName, description, imageUrl, recipe: { ingredients, instructions, nutrition, prepTime, cookTime } } = recipe;
 
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{dishName}</Text>
        <Text style={styles.text}>{description}</Text>
        {imageUrl && (
          <Image
            src={imageUrl}
            style={styles.image}
           
          />
        )}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Nutrition</Text>
          <Text style={styles.text}>
            Calories: {nutrition.calories} Cal per serving
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
              {ingredient}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Instructions</Text>
          {instructions.map((instruction, index) => (
            <Text key={index} style={styles.text}>
              {instruction}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const PDFView: React.FC<RecipePDFProps> = ({ recipe }) => {

    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return(

        <RecipePDF recipe={recipe}/>

    )
}
export default PDFView
