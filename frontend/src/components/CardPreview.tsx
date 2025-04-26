import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { FaPlay, FaImage } from 'react-icons/fa'

interface CardPreviewProps {
  card: {
    word: string
    targetWord: string
    exampleSentence: string
    literalTranslation: string
    semanticTranslation: string
    audioUrl?: string
    imageUrl?: string
  }
  onSave: () => void
  isLoading?: boolean
}

export function CardPreview({ card, onSave, isLoading = false }: CardPreviewProps) {
  const toast = useToast()

  const handlePlayAudio = () => {
    if (card.audioUrl) {
      const audio = new Audio(card.audioUrl)
      audio.play()
    } else {
      toast({
        title: 'Audio not available',
        status: 'warning',
        duration: 3000,
      })
    }
  }

  return (
    <Box p={6} bg="white" borderRadius="lg" shadow="sm">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            {card.word}
          </Text>
          <HStack>
            <IconButton
              aria-label="Play audio"
              icon={<FaPlay />}
              onClick={handlePlayAudio}
              isDisabled={!card.audioUrl}
            />
            {card.imageUrl && (
              <IconButton
                aria-label="View image"
                icon={<FaImage />}
                onClick={() => window.open(card.imageUrl, '_blank')}
              />
            )}
          </HStack>
        </HStack>

        <Box>
          <Text fontSize="lg" color="blue.600">
            {card.targetWord}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="medium">Example Sentence:</Text>
          <Text>{card.exampleSentence}</Text>
        </Box>

        <Box>
          <Text fontWeight="medium">Literal Translation:</Text>
          <Text color="gray.600">{card.literalTranslation}</Text>
        </Box>

        <Box>
          <Text fontWeight="medium">Semantic Translation:</Text>
          <Text color="gray.600">{card.semanticTranslation}</Text>
        </Box>

        <Button
          colorScheme="green"
          onClick={onSave}
          isLoading={isLoading}
          loadingText="Saving..."
        >
          Save to Anki
        </Button>
      </VStack>
    </Box>
  )
} 