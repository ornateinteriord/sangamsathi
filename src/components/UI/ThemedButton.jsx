import React from 'react'
import Button from '@mui/material/Button'

const ThemedButton = ({
  title,
  onClick,
  sx,
  style,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        color:'#fff',
        backgroundColor: '#39af5e',
        '&:hover': { backgroundColor: '#39af5e' },
        borderRadius: '8px',
        textTransform: 'capitalize',
        ...sx,
      }}
      style={style}
      {...rest}
    >
      {title}
    </Button>
  )
}

export default ThemedButton