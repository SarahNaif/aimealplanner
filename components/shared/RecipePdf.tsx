// components/RecipePDF.tsx
import { Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import { Meal } from '@/types/types';

const styles = StyleSheet.create({
    page: {
        padding: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
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
    recipe: Meal
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
                        Calories: {recipe.recipe.nutrition.calories} Cal per serving
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Ingredients</Text>
                    {recipe.recipe.ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.text}>
                            {ingredient}
                        </Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Instructions</Text>
                    {recipe.recipe.instructions.map((instruction, index) => (
                        <Text key={index} style={styles.text}>
                            {instruction}
                        </Text>
                    ))}
                </View>

               
            </Page>
        </Document>
    );
}

export default RecipePDF;