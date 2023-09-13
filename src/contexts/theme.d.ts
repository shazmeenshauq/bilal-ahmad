import { ThemeOptions } from "@mui/material/styles";
import React from 'react';

declare module '@mui/material/styles' {
    interface Theme {
        colors: {
            background:string;
        }
    }
    interface PaletteOptions {
        colors?:PalleteColorOptions;
        customGreen:string;
      
    }
}