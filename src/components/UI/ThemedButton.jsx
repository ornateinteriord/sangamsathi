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
        backgroundColor: '#0B192C',
        '&:hover': { backgroundColor: '#0B192C' },
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