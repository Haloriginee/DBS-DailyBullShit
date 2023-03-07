import React from 'react'

import { Button } from '@pankod/refine-mui'

import { CustomButtonProps } from 'interfaces/common'


const CustomButton = ({ type, title, backgroundColor, color, fullWidth, icon, handleClick, disabled }: CustomButtonProps) => {
  return (

    <Button

    disabled={disabled}
      type={type === 'submit' ? 'submit' : 'button'}
      sx={{
        flex: fullWidth? 1 : 'unset',
        padding: '10px 15px',
        width: fullWidth? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor: backgroundColor,
        color: color,
        gap: '10px',
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 5,
        '&:hover': {
          backgroundColor: backgroundColor,
          color: color,
          opacity: 0.6,
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>

  )
}

export default CustomButton
