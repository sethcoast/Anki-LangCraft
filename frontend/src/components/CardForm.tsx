import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  FormHelperText,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { useState } from 'react'

interface CardFormProps {
  onSubmit: (data: CardFormData) => void
  isLoading?: boolean
}

export interface CardFormData {
  word: string
  baseLanguage: string
  targetLanguage: string
  isCloze: boolean
}

export function CardForm({ onSubmit, isLoading = false }: CardFormProps) {
  const [formData, setFormData] = useState<CardFormData>({
    word: '',
    baseLanguage: 'en',
    targetLanguage: 'es',
    isCloze: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Box as="form" onSubmit={handleSubmit} p={6} bg="white" borderRadius="lg" shadow="sm">
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Word</FormLabel>
          <Input
            value={formData.word}
            onChange={(e) => setFormData({ ...formData, word: e.target.value })}
            placeholder="Enter a word to translate"
          />
        </FormControl>

        <HStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Base Language</FormLabel>
            <Select
              value={formData.baseLanguage}
              onChange={(e) => setFormData({ ...formData, baseLanguage: e.target.value })}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Target Language</FormLabel>
            <Select
              value={formData.targetLanguage}
              onChange={(e) => setFormData({ ...formData, targetLanguage: e.target.value })}
            >
              <option value="es">Spanish</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
            </Select>
          </FormControl>
        </HStack>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Create Cloze Card</FormLabel>
          <Switch
            isChecked={formData.isCloze}
            onChange={(e) => setFormData({ ...formData, isCloze: e.target.checked })}
          />
          <FormHelperText ml={2}>
            Create a fill-in-the-blank style card
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Generating..."
        >
          Generate Card
        </Button>
      </VStack>
    </Box>
  )
} 