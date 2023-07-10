import { Box, Card, IconButton, TextField, Typography, CircularProgress } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react'
import { getMessageReply } from '../api/message';
import OpenAILogo from '../assets/OpenAILogo';
import { useRef } from 'react';

interface Props {
  user: string
}

export default function Prompt({ user }: Props) {
  const [text, setText] = useState<string>('')
  const [typedReply, setTypedReply] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [err, setError] = useState(false)
  // I use useRef to store values that need to persist across re-renders, such as the previous reply and the timer for printing render.
  const replyRef = useRef<string | null>(null) // Stores reply
  const printingRenderRef = useRef<NodeJS.Timer | null>(null) // Stores the timer for printing render

  const handleReset = () => {
    setText('')
    setTypedReply('')
    replyRef.current = ''
  }

  const handleSendText = async () => {
    try {
      if (!text || !user || loading) {
        return
      }

      setLoading(true)
      setError(false)
      const newReply = await getMessageReply({ text, user })
      setTypedReply('')
      replyRef.current = newReply
      if (printingRenderRef.current) {
        clearInterval(printingRenderRef.current)
        printingRenderRef.current = null
      }
      if (replyRef.current) {
        typingRender()
      }
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const typingRender = () => {
    let localTypingIndex = 0
    let localTyping = ""

    const printer = setInterval(() => {
      if (replyRef.current && localTypingIndex < replyRef.current.length) {
        setTypedReply((localTyping += replyRef.current[localTypingIndex]))
        localTypingIndex += 1
      } else {
        localTypingIndex = 0
        localTyping = ""
        clearInterval(printer)
        printingRenderRef.current = null
      }
    }, 100)
    console.log('printer', printer)
    printingRenderRef.current = printer
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4 }}>
        <TextField
          value={text}
          multiline
          rows={3}
          fullWidth
          color="secondary"
          variant="standard"
          onChange={e => setText(e.target.value)}
          sx={{
            textarea: {
              color: "white",
            },
            '& .MuiInput-root:before': {
              borderBottomColor: '#ffc226 !important'
            },
          }}
        />
        <IconButton onClick={handleSendText} color="secondary" title="Send">
          <SendIcon />
        </IconButton>
        <IconButton onClick={handleReset} color="secondary" title="Reset">
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box sx={{ minHeight: '300px', display: 'flex' }}>
        <Box sx={{ pr: 2 }}>
          <OpenAILogo />
        </Box>
        {loading ? <CircularProgress /> : (
          <Typography variant="body1" color="primary">
            {err ? 'There is an error for generating reply. Try again later.' : replyRef.current === '' ? `Sorry, we don't have reply for this question. Please ask another question.` : typedReply}
          </Typography>
        )}
      </Box>
    </Card>
  )
}
