// ThemeProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

// Define your themes
// const lightTheme = createTheme({
//     palette: {
//         mode: 'light',
//         colors: {
//             backgroundColor: 'white'
//         }
//     },
// });

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#FFA726',
      },
      customGreen: '#4CAF50',  // Custom green color
    },
    text: {
      primary: '#FFFFFF', // Primary text color
      secondary: '#B0B0B0', // Secondary text color
    //   customGreen: '#4CAF50',  // Custom green color for text
    },
    // ... other theme configurations
  });

// Create a context to manage the theme
type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
type ThemeProviderProps = {
    children: ReactNode;
};
// Create a ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    // Pass the theme value and toggle function to the context
    const contextValue: ThemeContextType = {
        theme: currentTheme,
        toggleTheme,
    };

    // Determine which theme to use based on the currentTheme state
    const theme = currentTheme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to access the theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
