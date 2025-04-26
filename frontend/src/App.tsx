import { ChakraProvider, Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { CardForm, CardFormData } from './components/CardForm'
import { CardPreview } from './components/CardPreview'
import { api, GeneratedCard } from './services/api'

const queryClient = new QueryClient()

function App() {
  const [generatedCard, setGeneratedCard] = useState<GeneratedCard | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerateCard = async (data: CardFormData) => {
    try {
      setIsGenerating(true)
      const card = await api.generateCard(data)
      setGeneratedCard(card)
    } catch (error) {
      console.error('Error generating card:', error)
      // TODO: Add error handling UI
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveCard = async () => {
    if (!generatedCard) return

    try {
      setIsSaving(true)
      await api.saveToAnki(generatedCard)
      setGeneratedCard(null)
      // TODO: Add success notification
    } catch (error) {
      console.error('Error saving card:', error)
      // TODO: Add error handling UI
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Box minH="100vh" bg="gray.50">
          <Container maxW="container.xl" py={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading as="h1" size="xl" mb={4}>
                  Anki-LangCraft
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Create high-quality language learning cards with ease
                </Text>
              </Box>

              <CardForm onSubmit={handleGenerateCard} isLoading={isGenerating} />

              {generatedCard && (
                <CardPreview
                  card={generatedCard}
                  onSave={handleSaveCard}
                  isLoading={isSaving}
                />
              )}
            </VStack>
          </Container>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
